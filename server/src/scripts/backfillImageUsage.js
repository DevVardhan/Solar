import 'dotenv/config';
import mongoose from 'mongoose';
import Image from '../models/Image.js';

async function main() {
  await mongoose.connect(process.env.MONGODB_URI);

  // Any image uploaded before the usage field existed gets treated as
  // a gallery image by default — you can re-tag individual ones as
  // 'blog' afterward if needed.
  const result = await Image.updateMany(
    { usage: { $exists: false } },
    { $set: { usage: 'gallery' } }
  );

  console.log(`Updated ${result.modifiedCount} image(s) to usage: 'gallery'.`);
  process.exit(0);
}

main().catch((err) => {
  console.error('Migration failed:', err.message);
  process.exit(1);
});
