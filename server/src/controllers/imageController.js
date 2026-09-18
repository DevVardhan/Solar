import cloudinary from '../config/cloudinary.js';
import Image from '../models/Image.js';

function uploadBufferToCloudinary(buffer) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: 'sandhyasolar' },
      (err, result) => (err ? reject(err) : resolve(result))
    );
    stream.end(buffer);
  });
}

// ---------- PUBLIC ----------

export async function getPublicImages(_req, res) {
  // Only images tagged for the gallery — blog cover images stay in their posts
  const images = await Image.find({ usage: 'gallery' }).sort({ createdAt: -1 });
  res.json(images);
}

// ---------- ADMIN ----------

export async function getAdminImages(_req, res) {
  const images = await Image.find().sort({ createdAt: -1 });
  res.json(images);
}

const IMAGE_LIMIT = 20;

export async function uploadImage(req, res) {
  if (!req.file) {
    return res.status(400).json({ message: 'No image file provided' });
  }

  const count = await Image.countDocuments();
  if (count >= IMAGE_LIMIT) {
    return res.status(403).json({ message: `Image limit reached (${IMAGE_LIMIT} max). Delete an existing image to upload a new one.` });
  }

  const result = await uploadBufferToCloudinary(req.file.buffer);

  const image = await Image.create({
    title: req.body.title || '',
    description: req.body.description || '',
    url: result.secure_url,
    publicId: result.public_id,
    usage: req.body.usage === 'blog' ? 'blog' : 'gallery',
  });

  res.status(201).json(image);
}

// Replace the actual image file and/or update title/description
export async function updateImage(req, res) {
  const image = await Image.findById(req.params.id);
  if (!image) return res.status(404).json({ message: 'Image not found' });

  if (req.file) {
    // Upload the new file first, then remove the old one from Cloudinary
    // only after the new upload succeeds — avoids losing the image if
    // the new upload fails.
    const result = await uploadBufferToCloudinary(req.file.buffer);
    const oldPublicId = image.publicId;

    image.url = result.secure_url;
    image.publicId = result.public_id;

    await cloudinary.uploader.destroy(oldPublicId).catch((err) => {
      console.error('Failed to remove old Cloudinary image:', err.message);
    });
  }

  if (req.body.title !== undefined) image.title = req.body.title;
  if (req.body.description !== undefined) image.description = req.body.description;

  await image.save();
  res.json(image);
}

export async function deleteImage(req, res) {
  const image = await Image.findById(req.params.id);
  if (!image) return res.status(404).json({ message: 'Image not found' });

  // Remove from Cloudinary first; only remove the DB record if that succeeds,
  // so we don't end up with a DB entry pointing at a deleted file, or vice versa.
  await cloudinary.uploader.destroy(image.publicId);
  await image.deleteOne();

  res.json({ message: 'Image deleted' });
}
