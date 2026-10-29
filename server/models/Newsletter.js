import mongoose from 'mongoose';

const newsletterSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true }
}, {
  timestamps: true
});

export const Newsletter = mongoose.models.Newsletter || mongoose.model('Newsletter', newsletterSchema);
