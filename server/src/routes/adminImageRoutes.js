import { Router } from 'express';
import { protect, authorize } from '../middleware/authMiddleware.js';
import { uploadImageMiddleware } from '../middleware/uploadMiddleware.js';
import {
  getAdminImages,
  uploadImage,
  updateImage,
  deleteImage,
} from '../controllers/imageController.js';

const router = Router();

const canManageImages = authorize('SUPER_ADMIN', 'CONTENT_ADMIN');

router.use(protect, canManageImages);

router.get('/', getAdminImages);
router.post('/', uploadImageMiddleware, uploadImage);
router.put('/:id', uploadImageMiddleware, updateImage);
router.delete('/:id', deleteImage);

export default router;
