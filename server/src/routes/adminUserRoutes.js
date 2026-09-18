import { Router } from 'express';
import { protect, authorize } from '../middleware/authMiddleware.js';
import {
  listUsers,
  createContentAdmin,
  toggleUserActive,
  resetUserPassword,
  deleteUser,
  createContentAdminValidators,
} from '../controllers/userController.js';

const router = Router();

// Every route here requires SUPER_ADMIN specifically — a Content Admin
// hitting any of these gets a 403, enforced by the backend regardless
// of what the frontend UI shows or hides.
router.use(protect, authorize('SUPER_ADMIN'));

router.get('/', listUsers);
router.post('/', createContentAdminValidators, createContentAdmin);
router.patch('/:id/toggle-active', toggleUserActive);
router.patch('/:id/reset-password', resetUserPassword);
router.delete('/:id', deleteUser);

export default router;
