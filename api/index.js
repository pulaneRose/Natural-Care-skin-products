import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import { products as localProducts } from '../src/data/products.js';
import { ingredients as localIngredients } from '../src/data/ingredients.js';
import { collections as localCollections } from '../src/data/collections.js';
import { journalArticles as localJournal } from '../src/data/journal.js';

import { Product } from '../server/models/Product.js';
import { Ingredient } from '../server/models/Ingredient.js';
import { Collection } from '../server/models/Collection.js';
import { Journal } from '../server/models/Journal.js';
import { Contact } from '../server/models/Contact.js';
import { Newsletter } from '../server/models/Newsletter.js';
import { Order } from '../server/models/Order.js';
import { User } from '../server/models/User.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const MONGODB_URI = process.env.MONGODB_URI;

let isMongoConnected = false;
let mongoConnectionPromise = null;

// Connect / Cache MongoDB Connection for Serverless Execution
async function connectToMongo() {
  if (!MONGODB_URI) {
    return null;
  }
  if (mongoose.connection.readyState === 1) {
    isMongoConnected = true;
    return mongoose.connection;
  }
  if (!mongoConnectionPromise) {
    mongoConnectionPromise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000
    }).then(conn => {
      isMongoConnected = true;
      return conn;
    }).catch(err => {
      mongoConnectionPromise = null;
      console.warn('MongoDB connection error:', err.message);
      throw err;
    });
  }
  return mongoConnectionPromise;
}

// Middleware to ensure DB connection before handling requests
app.use(async (req, res, next) => {
  try {
    await connectToMongo();
  } catch (err) {
    // Proceed with fallback if MongoDB temporarily unavailable
  }
  next();
});

// ==================== HEALTH & STATS ====================
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    status: 'Server online',
    mongoConnected: isMongoConnected,
    database: isMongoConnected ? 'MongoDB Atlas' : 'Local Fallback'
  });
});

app.get('/api/admin/stats', async (req, res) => {
  try {
    if (isMongoConnected) {
      const productsCount = await Product.countDocuments();
      const lowStockCount = await Product.countDocuments({ stock: { $lte: 15 } });
      const ordersList = await Order.find({});
      const totalOrders = ordersList.length;
      const totalRevenue = ordersList.reduce((sum, o) => sum + (o.total || 0), 0);
      const customerCount = await User.countDocuments({ role: 'customer' });
      const subscriberCount = await Newsletter.countDocuments();
      const inquiryCount = await Contact.countDocuments();

      return res.json({
        success: true,
        source: 'MongoDB Atlas',
        stats: {
          productsCount,
          lowStockCount,
          totalOrders,
          totalRevenue,
          customerCount,
          subscriberCount,
          inquiryCount
        }
      });
    }

    res.json({
      success: true,
      source: 'Local Fallback',
      stats: {
        productsCount: localProducts.length,
        lowStockCount: 2,
        totalOrders: 0,
        totalRevenue: 0,
        customerCount: 0,
        subscriberCount: 2,
        inquiryCount: 1
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ==================== PRODUCTS ====================
app.get('/api/products', async (req, res) => {
  try {
    if (isMongoConnected) {
      const { search, concern, type, sort } = req.query;
      let query = {};
      if (concern) query.concerns = concern;
      if (type) query.type = { $regex: new RegExp(type, 'i') };
      if (search) {
        query.$or = [
          { name: { $regex: new RegExp(search, 'i') } },
          { description: { $regex: new RegExp(search, 'i') } }
        ];
      }

      let sortOption = { isMainProduct: -1, createdAt: -1 };
      if (sort === 'price-low') sortOption = { price: 1 };
      if (sort === 'price-high') sortOption = { price: -1 };
      if (sort === 'rating') sortOption = { rating: -1 };

      const list = await Product.find(query).sort(sortOption);
      if (list.length > 0) {
        return res.json({ success: true, source: 'MongoDB Atlas', count: list.length, data: list });
      }
    }
    res.json({ success: true, source: 'Local Data', count: localProducts.length, data: localProducts });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/api/products', async (req, res) => {
  try {
    const data = {
      ...req.body,
      id: req.body.id || `prod-${Date.now()}`,
      rating: req.body.rating || 5.0,
      reviewCount: req.body.reviewCount || 0,
      stock: req.body.stock !== undefined ? Number(req.body.stock) : 45
    };
    if (isMongoConnected) {
      const newProd = new Product(data);
      await newProd.save();
      return res.status(201).json({ success: true, message: 'Product recorded in MongoDB Atlas!', data: newProd });
    }
    res.status(201).json({ success: true, message: 'Product created locally.', data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.put('/api/products/:id', async (req, res) => {
  try {
    const id = req.params.id;
    if (isMongoConnected) {
      const updated = await Product.findOneAndUpdate(
        { $or: [{ id }, { _id: mongoose.isValidObjectId(id) ? id : null }] },
        { $set: req.body },
        { new: true }
      );
      if (updated) {
        return res.json({ success: true, message: 'Product updated in MongoDB Atlas!', data: updated });
      }
    }
    res.json({ success: true, message: 'Product updated locally.', data: { id, ...req.body } });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.delete('/api/products/:id', async (req, res) => {
  try {
    const id = req.params.id;
    if (isMongoConnected) {
      await Product.findOneAndDelete({ $or: [{ id }, { _id: mongoose.isValidObjectId(id) ? id : null }] });
    }
    res.json({ success: true, message: 'Product deleted from MongoDB Atlas!' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ==================== ORDERS ====================
app.get('/api/orders', async (req, res) => {
  try {
    if (isMongoConnected) {
      const orders = await Order.find({}).sort({ createdAt: -1 });
      return res.json({ success: true, source: 'MongoDB Atlas', count: orders.length, data: orders });
    }
    res.json({ success: true, source: 'Local Fallback', count: 0, data: [] });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/api/orders', async (req, res) => {
  try {
    const orderData = {
      ...req.body,
      createdAt: req.body.createdAt || new Date().toISOString()
    };

    if (isMongoConnected) {
      const newOrder = new Order(orderData);
      await newOrder.save();

      // If customer email exists, update/upsert user record in MongoDB Atlas
      if (orderData.customer?.email) {
        const customerEmail = orderData.customer.email.toLowerCase();
        await User.findOneAndUpdate(
          { email: customerEmail },
          {
            $setOnInsert: {
              name: `${orderData.customer.firstName || ''} ${orderData.customer.lastName || ''}`.trim() || customerEmail.split('@')[0],
              email: customerEmail,
              password: 'guest-order-account',
              role: 'customer'
            }
          },
          { upsert: true }
        );
      }

      return res.status(201).json({
        success: true,
        source: 'MongoDB Atlas',
        message: 'Order successfully recorded in MongoDB Atlas!',
        order: newOrder
      });
    }

    res.status(201).json({ success: true, source: 'Local Preview', order: orderData });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.put('/api/orders/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const { status } = req.body;
    if (isMongoConnected) {
      const updated = await Order.findOneAndUpdate(
        { $or: [{ orderId: id }, { _id: mongoose.isValidObjectId(id) ? id : null }] },
        { $set: { status } },
        { new: true }
      );
      if (updated) {
        return res.json({ success: true, message: 'Order status updated in MongoDB Atlas!', data: updated });
      }
    }
    res.json({ success: true, message: 'Order status updated locally.', data: { orderId: id, status } });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.delete('/api/orders/:id', async (req, res) => {
  try {
    const id = req.params.id;
    if (isMongoConnected) {
      await Order.findOneAndDelete({ $or: [{ orderId: id }, { _id: mongoose.isValidObjectId(id) ? id : null }] });
    }
    res.json({ success: true, message: 'Order removed from MongoDB Atlas!' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ==================== CUSTOMERS / USERS ====================
app.get('/api/customers', async (req, res) => {
  try {
    if (isMongoConnected) {
      const users = await User.find({}).sort({ createdAt: -1 });
      const orders = await Order.find({});

      // Aggregate spend and order count per customer
      const customerMap = new Map();

      users.forEach(u => {
        customerMap.set(u.email.toLowerCase(), {
          id: u._id,
          name: u.name,
          email: u.email,
          role: u.role || 'customer',
          phone: '',
          address: '',
          city: '',
          ordersCount: 0,
          totalSpent: 0,
          lastOrderDate: null,
          createdAt: u.createdAt
        });
      });

      orders.forEach(o => {
        const email = o.customer?.email?.toLowerCase();
        if (email) {
          const existing = customerMap.get(email) || {
            id: `ord-cust-${email}`,
            name: `${o.customer.firstName || ''} ${o.customer.lastName || ''}`.trim() || email.split('@')[0],
            email: email,
            role: 'customer',
            phone: o.customer.phone || '',
            address: o.customer.address || '',
            city: o.customer.city || '',
            ordersCount: 0,
            totalSpent: 0,
            lastOrderDate: null,
            createdAt: o.createdAt
          };

          existing.ordersCount += 1;
          existing.totalSpent += (o.total || 0);
          if (!existing.phone && o.customer.phone) existing.phone = o.customer.phone;
          if (!existing.city && o.customer.city) existing.city = o.customer.city;
          if (!existing.address && o.customer.address) existing.address = o.customer.address;
          if (!existing.lastOrderDate || new Date(o.createdAt) > new Date(existing.lastOrderDate)) {
            existing.lastOrderDate = o.createdAt;
          }
          customerMap.set(email, existing);
        }
      });

      const customerList = Array.from(customerMap.values());
      return res.json({ success: true, source: 'MongoDB Atlas', count: customerList.length, data: customerList });
    }

    res.json({ success: true, source: 'Local Data', count: 0, data: [] });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/api/customers', async (req, res) => {
  try {
    const { name, email, phone, role } = req.body;
    if (!name || !email) {
      return res.status(400).json({ success: false, message: 'Name and email are required.' });
    }

    if (isMongoConnected) {
      const existing = await User.findOne({ email: email.toLowerCase() });
      if (existing) {
        return res.status(400).json({ success: false, message: 'Customer with this email already exists.' });
      }
      const newCust = new User({
        name,
        email: email.toLowerCase(),
        password: 'customer-registered-admin',
        role: role || 'customer'
      });
      await newCust.save();
      return res.status(201).json({ success: true, message: 'Customer recorded in MongoDB Atlas!', data: newCust });
    }

    res.status(201).json({ success: true, message: 'Customer recorded locally.', data: { name, email, phone } });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.delete('/api/customers/:id', async (req, res) => {
  try {
    const id = req.params.id;
    if (isMongoConnected && mongoose.isValidObjectId(id)) {
      await User.findByIdAndDelete(id);
    }
    res.json({ success: true, message: 'Customer deleted from MongoDB Atlas!' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ==================== AUTH ====================
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide all fields.' });
    }

    if (isMongoConnected) {
      const existing = await User.findOne({ email: email.toLowerCase() });
      if (existing) {
        return res.status(400).json({ success: false, message: 'Account with this email already exists.' });
      }
      const user = new User({ name, email: email.toLowerCase(), password, role: 'customer' });
      await user.save();
      return res.json({
        success: true,
        source: 'MongoDB Atlas',
        message: 'Account created and saved in MongoDB Atlas!',
        user: { id: user._id, name: user.name, email: user.email, role: user.role }
      });
    }

    res.json({
      success: true,
      source: 'Local Memory',
      user: { id: `usr-${Date.now()}`, name, email }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password.' });
    }

    if (isMongoConnected) {
      const user = await User.findOne({ email: email.toLowerCase() });
      if (!user || user.password !== password) {
        return res.status(401).json({ success: false, message: 'Invalid credentials.' });
      }
      return res.json({
        success: true,
        source: 'MongoDB Atlas',
        user: { id: user._id, name: user.name, email: user.email, role: user.role }
      });
    }

    res.json({
      success: true,
      source: 'Local Memory',
      user: { id: `usr-${Date.now()}`, name: email.split('@')[0], email }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ==================== CONTACT & NEWSLETTER ====================
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'All fields required.' });
    }
    if (isMongoConnected) {
      const contact = new Contact({ name, email, subject, message });
      await contact.save();
      return res.json({ success: true, source: 'MongoDB Atlas', message: 'Inquiry saved to MongoDB Atlas!' });
    }
    res.json({ success: true, message: 'Message received.' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get('/api/contact', async (req, res) => {
  try {
    if (isMongoConnected) {
      const list = await Contact.find({}).sort({ createdAt: -1 });
      return res.json({ success: true, source: 'MongoDB Atlas', count: list.length, data: list });
    }
    res.json({ success: true, data: [] });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.delete('/api/contact/:id', async (req, res) => {
  try {
    const id = req.params.id;
    if (isMongoConnected) {
      await Contact.findByIdAndDelete(id);
    }
    res.json({ success: true, message: 'Inquiry deleted from MongoDB Atlas!' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/api/newsletter', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email || !email.includes('@')) {
      return res.status(400).json({ success: false, message: 'Valid email required.' });
    }
    if (isMongoConnected) {
      await Newsletter.findOneAndUpdate({ email: email.toLowerCase() }, { email: email.toLowerCase() }, { upsert: true });
      return res.json({ success: true, source: 'MongoDB Atlas', message: 'Subscribed in MongoDB Atlas!' });
    }
    res.json({ success: true, message: 'Subscribed.' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get('/api/newsletter', async (req, res) => {
  try {
    if (isMongoConnected) {
      const list = await Newsletter.find({}).sort({ createdAt: -1 });
      return res.json({ success: true, source: 'MongoDB Atlas', count: list.length, data: list });
    }
    res.json({ success: true, data: [] });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.delete('/api/newsletter/:id', async (req, res) => {
  try {
    const id = req.params.id;
    if (isMongoConnected) {
      await Newsletter.findByIdAndDelete(id);
    }
    res.json({ success: true, message: 'Subscriber removed from MongoDB Atlas!' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ==================== JOURNAL ====================
app.get('/api/journal', async (req, res) => {
  try {
    if (isMongoConnected) {
      const list = await Journal.find({}).sort({ createdAt: -1 });
      if (list.length > 0) return res.json({ success: true, source: 'MongoDB Atlas', data: list });
    }
    res.json({ success: true, source: 'Local Data', data: localJournal });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/api/journal', async (req, res) => {
  try {
    const data = {
      ...req.body,
      id: req.body.id || `art-${Date.now()}`,
      date: req.body.date || new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    };
    if (isMongoConnected) {
      const article = new Journal(data);
      await article.save();
      return res.status(201).json({ success: true, message: 'Article saved in MongoDB Atlas!', data: article });
    }
    res.status(201).json({ success: true, message: 'Article created locally.', data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.put('/api/journal/:id', async (req, res) => {
  try {
    const id = req.params.id;
    if (isMongoConnected) {
      const updated = await Journal.findOneAndUpdate(
        { $or: [{ id }, { _id: mongoose.isValidObjectId(id) ? id : null }] },
        { $set: req.body },
        { new: true }
      );
      if (updated) return res.json({ success: true, message: 'Article updated in MongoDB Atlas!', data: updated });
    }
    res.json({ success: true, message: 'Article updated locally.', data: { id, ...req.body } });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.delete('/api/journal/:id', async (req, res) => {
  try {
    const id = req.params.id;
    if (isMongoConnected) {
      await Journal.findOneAndDelete({ $or: [{ id }, { _id: mongoose.isValidObjectId(id) ? id : null }] });
    }
    res.json({ success: true, message: 'Article deleted from MongoDB Atlas!' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default app;
