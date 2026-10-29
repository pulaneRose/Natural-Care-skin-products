import mongoose from 'mongoose';

const collectionSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  subtitle: { type: String },
  description: { type: String },
  concern: { type: String },
  theme: { type: String, default: 'sage' },
  productIds: [{ type: String }]
}, {
  timestamps: true
});

export const Collection = mongoose.models.Collection || mongoose.model('Collection', collectionSchema);
