import { Router } from 'express';
import { protect, authorize } from '../middleware/authMiddleware.js';
import {
  getAdminBlogs,
  getAdminBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
  togglePublish,
  blogValidators,
} from '../controllers/blogController.js';

const router = Router();

// Both SUPER_ADMIN and CONTENT_ADMIN can manage blogs
const canManageBlogs = authorize('SUPER_ADMIN', 'CONTENT_ADMIN');

router.use(protect, canManageBlogs);

router.get('/', getAdminBlogs);
router.get('/:id', getAdminBlogById);
router.post('/', blogValidators, createBlog);
router.put('/:id', blogValidators, updateBlog);
router.delete('/:id', deleteBlog);
router.patch('/:id/publish', togglePublish);

export default router;
