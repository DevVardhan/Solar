import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { login, logout, me, loginValidators } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

// Max 10 login attempts per 15 minutes per IP — slows down brute force
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { message: 'Too many login attempts. Please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

router.post('/login', loginLimiter, loginValidators, login);
router.post('/logout', logout);
router.get('/me', protect, me);

export default router;
