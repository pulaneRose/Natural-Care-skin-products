import mongoose from 'mongoose';

const ingredientSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  type: { type: String },
  shortDescription: { type: String },
  description: { type: String },
  function: { type: String },
  roleInFormulation: { type: String },
  benefits: [{ type: String }],
  productsContaining: [{ type: String }]
}, {
  timestamps: true
});

export const Ingredient = mongoose.models.Ingredient || mongoose.model('Ingredient', ingredientSchema);
