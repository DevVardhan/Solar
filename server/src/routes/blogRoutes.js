import { Router } from 'express';
import { getPublishedBlogs, getPublishedBlogBySlug } from '../controllers/blogController.js';

const router = Router();

router.get('/', getPublishedBlogs);
router.get('/:slug', getPublishedBlogBySlug);

export default router;
