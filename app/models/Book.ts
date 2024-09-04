import mongoose from 'mongoose'

const BookSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  author: { type: String, required: true },
  isbn: { type: String },
  categories: [{ type: String }],
  tags: [{ type: String }],
  status: { type: String, enum: ['read', 'unread', 'reading'], default: 'unread' },
  rating: { type: Number, min: 1, max: 5 },
  review: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

export default mongoose.models.Book || mongoose.model('Book', BookSchema)