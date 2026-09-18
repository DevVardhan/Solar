import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema(
  {
    title: { type: String, trim: true, default: '' },
    description: { type: String, trim: true, default: '' },
    url: { type: String, required: true }, // Cloudinary secure_url
    publicId: { type: String, required: true }, // Cloudinary public_id, needed to delete later
    usage: {
      type: String,
      enum: ['gallery', 'blog'],
      default: 'gallery',
      index: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Image', imageSchema);
