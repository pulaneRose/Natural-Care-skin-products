import mongoose from 'mongoose';

const journalSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  category: { type: String },
  date: { type: String },
  readTime: { type: String },
  shortDescription: { type: String },
  content: { type: String },
  theme: { type: String, default: 'rose' }
}, {
  timestamps: true
});

export const Journal = mongoose.models.Journal || mongoose.model('Journal', journalSchema);
