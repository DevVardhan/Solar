import multer from 'multer';

const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

const storage = multer.memoryStorage(); // keep file in memory, stream straight to Cloudinary

function fileFilter(_req, file, cb) {
  if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
    return cb(new Error('Only JPEG, PNG, WEBP, or GIF images are allowed'));
  }
  cb(null, true);
}

export const uploadImageMiddleware = multer({
  storage,
  fileFilter,
  limits: { fileSize: MAX_FILE_SIZE, files: 1 },
}).single('image');
