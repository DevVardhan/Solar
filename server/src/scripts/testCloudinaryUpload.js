import 'dotenv/config';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Pass the path to any real image file on your computer as an argument:
// node src/scripts/testCloudinaryUpload.js "C:\path\to\image.png"
const filePath = process.argv[2];

if (!filePath) {
  console.error('Usage: node src/scripts/testCloudinaryUpload.js <path-to-image>');
  process.exit(1);
}

cloudinary.uploader
  .upload(filePath)
  .then((result) => {
    console.log('SUCCESS');
    console.log(result);
  })
  .catch((err) => {
    console.log('FAILED — full error object below:');
    console.log(JSON.stringify(err, Object.getOwnPropertyNames(err), 2));
  });
