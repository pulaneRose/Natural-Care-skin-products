import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  customer: {
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    address: String,
    city: String,
    country: String,
    postalCode: String
  },
  items: [{
    id: String,
    name: String,
    price: Number,
    selectedSize: String,
    quantity: Number
  }],
  subtotal: Number,
  shipping: Number,
  total: Number,
  paymentMethod: String,
  status: { type: String, default: 'Processing' }
}, {
  timestamps: true,
  strict: false
});

export const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);
