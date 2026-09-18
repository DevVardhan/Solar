import { Router } from 'express';
import { getPublicImages } from '../controllers/imageController.js';

const router = Router();

router.get('/', getPublicImages);

export default router;
