import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, index: true },
    coverImage: { type: String, default: '' }, // Cloudinary URL
    excerpt: { type: String, required: true, trim: true, maxlength: 300 },
    content: { type: String, required: true },
    author: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'draft',
      index: true,
    },
    publishedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

export default mongoose.model('Blog', blogSchema);
