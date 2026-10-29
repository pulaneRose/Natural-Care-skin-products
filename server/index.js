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

import { Product } from './models/Product.js';
import { Ingredient } from './models/Ingredient.js';
import { Collection } from './models/Collection.js';
import { Journal } from './models/Journal.js';
import { Contact } from './models/Contact.js';
import { Newsletter } from './models/Newsletter.js';
import { Order } from './models/Order.js';
import { User } from './models/User.js';
import { seedDatabase } from './seed.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

let isMongoConnected = false;
let memoryUsers = []; // Local fallback users
let memoryProducts = [...localProducts];
let memoryOrders = [
  {
    orderId: "AB-882104",
    customer: { firstName: "Aarav", lastName: "Sharma", email: "aarav.sharma@gmail.com", phone: "+91 9876543210", address: "42 Mall Road", city: "Ludhiana", country: "India", postalCode: "141001" },
    items: [{ id: "prod-001", name: "Okra Radiance Vitamin Serum", price: 2499, selectedSize: "30 ml", quantity: 1 }],
    subtotal: 2499,
    shipping: 0,
    total: 2499,
    paymentMethod: "card",
    status: "Delivered",
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString()
  },
  {
    orderId: "AB-914238",
    customer: { firstName: "Priya", lastName: "Patel", email: "priya.p@yahoo.com", phone: "+91 9812345678", address: "18 Rose Avenue", city: "Chandigarh", country: "India", postalCode: "160017" },
    items: [
      { id: "prod-003", name: "Okra & Ceramide Barrier Support Cream", price: 2799, selectedSize: "50 ml", quantity: 1 },
      { id: "prod-004", name: "Gentle Okra Botanical Cleanser", price: 1499, selectedSize: "100 ml", quantity: 1 }
    ],
    subtotal: 4298,
    shipping: 0,
    total: 4298,
    paymentMethod: "upi",
    status: "Processing",
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString()
  }
];
let memoryContacts = [
  {
    _id: "cnt-1",
    name: "Dr. Sunita Rao",
    email: "sunita.rao@healthclinic.org",
    subject: "Formulation Inquiry - Okra Polysaccharides",
    message: "Interested in learning more about the cold-pressed extraction method used for the Okra mucilage serum.",
    createdAt: new Date(Date.now() - 86400000).toISOString()
  }
];
let memoryNewsletters = [
  { email: "masenkanepulane@gmail.com", createdAt: new Date().toISOString() },
  { email: "beauty.enthusiast@gmail.com", createdAt: new Date().toISOString() }
];
let memoryJournal = [...localJournal];

// Connect to MongoDB Atlas
if (MONGODB_URI) {
  mongoose.connect(MONGODB_URI)
    .then(() => {
      isMongoConnected = true;
      console.log('🍃 Successfully connected to MongoDB Atlas!');
    })
    .catch((err) => {
      console.warn('⚠️ Could not connect to MongoDB Atlas. Falling back to local data:', err.message);
    });
}

app.use(cors());
app.use(express.json());

// AUTH ENDPOINTS
// POST /api/auth/signup
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields.' });
    }

    if (isMongoConnected) {
      const existingUser = await User.findOne({ email: email.toLowerCase() });
      if (existingUser) {
        return res.status(400).json({ success: false, message: 'An account with this email already exists.' });
      }

      const newUser = new User({
        name,
        email: email.toLowerCase(),
        password // In production, hash with bcrypt
      });
      await newUser.save();

      return res.json({
        success: true,
        source: 'MongoDB Atlas',
        message: 'Account created successfully!',
        user: { id: newUser._id, name: newUser.name, email: newUser.email }
      });
    }

    // Local Fallback
    const existing = memoryUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      return res.status(400).json({ success: false, message: 'An account with this email already exists.' });
    }

    const newUser = { id: `usr-${Date.now()}`, name, email: email.toLowerCase(), password };
    memoryUsers.push(newUser);

    res.json({
      success: true,
      source: 'Local Memory',
      message: 'Account created successfully!',
      user: { id: newUser.id, name: newUser.name, email: newUser.email }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/auth/login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please enter both email and password.' });
    }

    if (isMongoConnected) {
      const user = await User.findOne({ email: email.toLowerCase() });
      if (!user || user.password !== password) {
        return res.status(401).json({ success: false, message: 'Invalid email or password.' });
      }

      return res.json({
        success: true,
        source: 'MongoDB Atlas',
        message: 'Logged in successfully!',
        user: { id: user._id, name: user.name, email: user.email }
      });
    }

    // Local Fallback
    const user = memoryUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user || user.password !== password) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    res.json({
      success: true,
      source: 'Local Memory',
      message: 'Logged in successfully!',
      user: { id: user.id, name: user.name, email: user.email }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// API Health Check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    status: 'Server is running',
    mongoConnected: isMongoConnected,
    database: isMongoConnected ? 'MongoDB Atlas' : 'Local Fallback'
  });
});

// Seed API Endpoint
app.post('/api/seed', async (req, res) => {
  if (!isMongoConnected) {
    return res.status(400).json({
      success: false,
      message: 'MongoDB is not connected. Please configure your real MongoDB Atlas connection string in .env first.'
    });
  }
  await seedDatabase();
  res.json({ success: true, message: 'Database successfully seeded with Okra skincare catalog!' });
});

// GET Products
app.get('/api/products', async (req, res) => {
  try {
    const { concern, type, skinType, search, sort } = req.query;

    if (isMongoConnected) {
      let query = {};
      if (concern) query.concerns = concern;
      if (type) query.type = { $regex: new RegExp(type, 'i') };
      if (skinType) query.skinTypes = skinType;
      if (search) {
        query.$or = [
          { name: { $regex: new RegExp(search, 'i') } },
          { description: { $regex: new RegExp(search, 'i') } }
        ];
      }

      let sortOption = {};
      if (sort === 'price-low') sortOption.price = 1;
      if (sort === 'price-high') sortOption.price = -1;
      if (sort === 'rating') sortOption.rating = -1;

      const productsList = await Product.find(query).sort(sortOption);
      if (productsList.length > 0) {
        return res.json({ success: true, source: 'MongoDB Atlas', count: productsList.length, data: productsList });
      }
    }

    // Local Fallback
    let filtered = [...localProducts];
    if (concern) filtered = filtered.filter(p => p.concerns.includes(concern));
    if (type) filtered = filtered.filter(p => p.type.toLowerCase() === type.toLowerCase());
    if (skinType) filtered = filtered.filter(p => p.skinTypes.includes(skinType));
    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    }
    if (sort === 'price-low') filtered.sort((a, b) => a.price - b.price);
    if (sort === 'price-high') filtered.sort((a, b) => b.price - a.price);
    if (sort === 'rating') filtered.sort((a, b) => b.rating - a.rating);

    res.json({ success: true, source: 'Local Data', count: filtered.length, data: filtered });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET Product by ID
app.get('/api/products/:id', async (req, res) => {
  try {
    if (isMongoConnected) {
      const product = await Product.findOne({ id: req.params.id });
      if (product) return res.json({ success: true, source: 'MongoDB Atlas', data: product });
    }
    const product = localProducts.find(p => p.id === req.params.id);
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
    res.json({ success: true, source: 'Local Data', data: product });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET Ingredients
app.get('/api/ingredients', async (req, res) => {
  try {
    if (isMongoConnected) {
      const list = await Ingredient.find({});
      if (list.length > 0) return res.json({ success: true, source: 'MongoDB Atlas', data: list });
    }
    res.json({ success: true, source: 'Local Data', data: localIngredients });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET Collections
app.get('/api/collections', async (req, res) => {
  try {
    if (isMongoConnected) {
      const list = await Collection.find({});
      if (list.length > 0) return res.json({ success: true, source: 'MongoDB Atlas', data: list });
    }
    res.json({ success: true, source: 'Local Data', data: localCollections });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET Journal Articles
app.get('/api/journal', async (req, res) => {
  try {
    if (isMongoConnected) {
      const list = await Journal.find({});
      if (list.length > 0) return res.json({ success: true, source: 'MongoDB Atlas', data: list });
    }
    res.json({ success: true, source: 'Local Data', data: localJournal });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ADMIN & CRUD ENDPOINTS

// Admin Dashboard Summary Stats
app.get('/api/admin/stats', async (req, res) => {
  try {
    let productsCount = 0;
    let lowStockCount = 0;
    let totalOrders = 0;
    let totalRevenue = 0;
    let subscriberCount = 0;
    let inquiryCount = 0;

    if (isMongoConnected) {
      productsCount = await Product.countDocuments();
      lowStockCount = await Product.countDocuments({ stock: { $lte: 15 } });
      const ordersList = await Order.find({});
      totalOrders = ordersList.length;
      totalRevenue = ordersList.reduce((sum, o) => sum + (o.total || 0), 0);
      subscriberCount = await Newsletter.countDocuments();
      inquiryCount = await Contact.countDocuments();
    } else {
      productsCount = memoryProducts.length;
      lowStockCount = memoryProducts.filter(p => (p.stock || 0) <= 15).length;
      totalOrders = memoryOrders.length;
      totalRevenue = memoryOrders.reduce((sum, o) => sum + (o.total || 0), 0);
      subscriberCount = memoryNewsletters.length;
      inquiryCount = memoryContacts.length;
    }

    res.json({
      success: true,
      stats: {
        productsCount,
        lowStockCount,
        totalOrders,
        totalRevenue,
        subscriberCount,
        inquiryCount
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/products - Create a new product
app.post('/api/products', async (req, res) => {
  try {
    const newProductData = {
      ...req.body,
      id: req.body.id || `prod-${Date.now()}`,
      rating: req.body.rating || 5.0,
      reviewCount: req.body.reviewCount || 0,
      stock: req.body.stock !== undefined ? Number(req.body.stock) : 45
    };

    if (isMongoConnected) {
      const created = new Product(newProductData);
      await created.save();
      return res.status(201).json({ success: true, message: 'Product created successfully in MongoDB Atlas!', data: created });
    }

    memoryProducts.unshift(newProductData);
    res.status(201).json({ success: true, message: 'Product created successfully!', data: newProductData });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PUT /api/products/:id - Update product & inventory
app.put('/api/products/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = req.body;

    if (isMongoConnected) {
      const updated = await Product.findOneAndUpdate(
        { $or: [{ id }, { _id: mongoose.isValidObjectId(id) ? id : null }] },
        { $set: updateData },
        { new: true }
      );
      if (updated) {
        return res.json({ success: true, message: 'Product updated successfully in MongoDB Atlas!', data: updated });
      }
    }

    const idx = memoryProducts.findIndex(p => p.id === id);
    if (idx !== -1) {
      memoryProducts[idx] = { ...memoryProducts[idx], ...updateData };
      return res.json({ success: true, message: 'Product updated successfully!', data: memoryProducts[idx] });
    }

    res.status(404).json({ success: false, message: 'Product not found' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// DELETE /api/products/:id - Delete product
app.delete('/api/products/:id', async (req, res) => {
  try {
    const id = req.params.id;
    if (isMongoConnected) {
      await Product.findOneAndDelete({ $or: [{ id }, { _id: mongoose.isValidObjectId(id) ? id : null }] });
    }
    memoryProducts = memoryProducts.filter(p => p.id !== id);
    res.json({ success: true, message: 'Product deleted successfully!' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/orders - List all orders
app.get('/api/orders', async (req, res) => {
  try {
    if (isMongoConnected) {
      const ordersList = await Order.find({}).sort({ createdAt: -1 });
      return res.json({ success: true, source: 'MongoDB Atlas', count: ordersList.length, data: ordersList });
    }
    res.json({ success: true, source: 'Local Data', count: memoryOrders.length, data: memoryOrders });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PUT /api/orders/:id - Update order status (Processing, Shipped, Delivered, Cancelled)
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

    const order = memoryOrders.find(o => o.orderId === id || o._id === id);
    if (order) {
      order.status = status;
      return res.json({ success: true, message: 'Order status updated successfully!', data: order });
    }

    res.status(404).json({ success: false, message: 'Order not found' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// DELETE /api/orders/:id - Cancel/Delete order
app.delete('/api/orders/:id', async (req, res) => {
  try {
    const id = req.params.id;
    if (isMongoConnected) {
      await Order.findOneAndDelete({ $or: [{ orderId: id }, { _id: mongoose.isValidObjectId(id) ? id : null }] });
    }
    memoryOrders = memoryOrders.filter(o => o.orderId !== id && o._id !== id);
    res.json({ success: true, message: 'Order deleted successfully!' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/customers - List all customers and orders metrics
app.get('/api/customers', async (req, res) => {
  try {
    if (isMongoConnected) {
      const users = await User.find({}).sort({ createdAt: -1 });
      const orders = await Order.find({});
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

// POST /api/customers - Record new customer
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

// DELETE /api/customers/:id
app.delete('/api/customers/:id', async (req, res) => {
  try {
    const id = req.params.id;
    if (isMongoConnected && mongoose.isValidObjectId(id)) {
      await User.findByIdAndDelete(id);
    }
    res.json({ success: true, message: 'Customer removed from MongoDB Atlas!' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/journal - Create new blog article
app.post('/api/journal', async (req, res) => {
  try {
    const articleData = {
      ...req.body,
      id: req.body.id || `art-${Date.now()}`,
      date: req.body.date || new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    };

    if (isMongoConnected) {
      const newArticle = new Journal(articleData);
      await newArticle.save();
      return res.status(201).json({ success: true, message: 'Article created in MongoDB Atlas!', data: newArticle });
    }

    memoryJournal.unshift(articleData);
    res.status(201).json({ success: true, message: 'Article created successfully!', data: articleData });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PUT /api/journal/:id - Update article
app.put('/api/journal/:id', async (req, res) => {
  try {
    const id = req.params.id;
    if (isMongoConnected) {
      const updated = await Journal.findOneAndUpdate(
        { $or: [{ id }, { _id: mongoose.isValidObjectId(id) ? id : null }] },
        { $set: req.body },
        { new: true }
      );
      if (updated) {
        return res.json({ success: true, message: 'Article updated in MongoDB Atlas!', data: updated });
      }
    }

    const idx = memoryJournal.findIndex(a => a.id === id);
    if (idx !== -1) {
      memoryJournal[idx] = { ...memoryJournal[idx], ...req.body };
      return res.json({ success: true, message: 'Article updated successfully!', data: memoryJournal[idx] });
    }

    res.status(404).json({ success: false, message: 'Article not found' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// DELETE /api/journal/:id - Delete article
app.delete('/api/journal/:id', async (req, res) => {
  try {
    const id = req.params.id;
    if (isMongoConnected) {
      await Journal.findOneAndDelete({ $or: [{ id }, { _id: mongoose.isValidObjectId(id) ? id : null }] });
    }
    memoryJournal = memoryJournal.filter(a => a.id !== id);
    res.json({ success: true, message: 'Article deleted successfully!' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/contact - List all contact messages
app.get('/api/contact', async (req, res) => {
  try {
    if (isMongoConnected) {
      const messages = await Contact.find({}).sort({ createdAt: -1 });
      return res.json({ success: true, source: 'MongoDB Atlas', count: messages.length, data: messages });
    }
    res.json({ success: true, source: 'Local Data', count: memoryContacts.length, data: memoryContacts });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// DELETE /api/contact/:id - Delete inquiry
app.delete('/api/contact/:id', async (req, res) => {
  try {
    const id = req.params.id;
    if (isMongoConnected) {
      await Contact.findByIdAndDelete(id);
    }
    memoryContacts = memoryContacts.filter(c => c._id !== id && c.id !== id);
    res.json({ success: true, message: 'Contact message deleted!' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/newsletter - List all newsletter subscribers
app.get('/api/newsletter', async (req, res) => {
  try {
    if (isMongoConnected) {
      const subscribers = await Newsletter.find({}).sort({ createdAt: -1 });
      return res.json({ success: true, source: 'MongoDB Atlas', count: subscribers.length, data: subscribers });
    }
    res.json({ success: true, source: 'Local Data', count: memoryNewsletters.length, data: memoryNewsletters });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// DELETE /api/newsletter/:id - Remove subscriber
app.delete('/api/newsletter/:id', async (req, res) => {
  try {
    const id = req.params.id;
    if (isMongoConnected) {
      await Newsletter.findByIdAndDelete(id);
    }
    memoryNewsletters = memoryNewsletters.filter(s => s._id !== id && s.email !== id);
    res.json({ success: true, message: 'Subscriber removed!' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST Orders (Save to MongoDB Atlas)
app.post('/api/orders', async (req, res) => {
  try {
    const orderData = {
      ...req.body,
      createdAt: req.body.createdAt || new Date().toISOString()
    };
    if (isMongoConnected) {
      const newOrder = new Order(orderData);
      await newOrder.save();
      return res.json({ success: true, source: 'MongoDB Atlas', message: 'Order saved successfully!', order: newOrder });
    }
    memoryOrders.unshift(orderData);
    res.json({ success: true, source: 'Local Preview', message: 'Order created in preview mode.', order: orderData });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST Newsletter Subscription
app.post('/api/newsletter', async (req, res) => {
  const { email } = req.body;
  if (!email || !email.includes('@')) {
    return res.status(400).json({ success: false, message: 'Please provide a valid email address' });
  }
  try {
    if (isMongoConnected) {
      await Newsletter.findOneAndUpdate({ email }, { email }, { upsert: true });
    }
    res.json({ success: true, message: 'Thank you for subscribing to SkinCare Brand.' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST Contact Form Message
app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'Please complete all required fields.' });
  }
  try {
    if (isMongoConnected) {
      const newContact = new Contact({ name, email, subject, message });
      await newContact.save();
    }
    res.json({ success: true, message: 'Your message has been received. Our team will get back to you shortly.' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 SkinCare Brand MERN API Server running on port ${PORT}`);
});
