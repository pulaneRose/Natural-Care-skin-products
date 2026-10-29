import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  type: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, default: 45 },
  sku: { type: String },
  sizes: [{ type: String }],
  rating: { type: Number, default: 5.0 },
  reviewCount: { type: Number, default: 0 },
  shortDescription: { type: String },
  description: { type: String },
  benefits: [{ type: String }],
  ingredientsList: [{
    name: { type: String },
    explanation: { type: String }
  }],
  howToUse: { type: String },
  concerns: [{ type: String }],
  skinTypes: [{ type: String }],
  keyIngredients: [{ type: String }],
  faq: [{
    q: { type: String },
    a: { type: String }
  }],
  availability: { type: String, default: 'Formulation In Progress' },
  placeholderTheme: { type: String, default: 'rose' }
}, {
  timestamps: true
});

export const Product = mongoose.models.Product || mongoose.model('Product', productSchema);
