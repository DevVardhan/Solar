import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// TEMPORARY DEBUG — remove after we confirm credentials are correct.
// Never logs full secrets, only enough to spot a stale/wrong value.
console.log('Cloudinary config check:', {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret_length: process.env.CLOUDINARY_API_SECRET?.length || 0,
  api_secret_preview:
    process.env.CLOUDINARY_API_SECRET?.slice(0, 3) +
    '...' +
    process.env.CLOUDINARY_API_SECRET?.slice(-3),
});

export default cloudinary;
