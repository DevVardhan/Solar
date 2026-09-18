import { body, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';

export const createContentAdminValidators = [
  body('name').trim().notEmpty(),
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 8 }),
];

export async function listUsers(_req, res) {
  // Only ever return Content Admins here — Super Admin doesn't need to
  // manage other Super Admins through this UI.
  const users = await User.find({ role: 'CONTENT_ADMIN' }).sort({ createdAt: -1 });
  res.json(users);
}

export async function createContentAdmin(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: 'Invalid input', errors: errors.array() });
  }

  const { name, email, password } = req.body;

  const existing = await User.findOne({ email });
  if (existing) {
    return res.status(409).json({ message: 'A user with this email already exists' });
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const user = await User.create({
    name,
    email,
    passwordHash,
    role: 'CONTENT_ADMIN',
    active: true,
  });

  res.status(201).json(user);
}

export async function toggleUserActive(req, res) {
  const user = await User.findOne({ _id: req.params.id, role: 'CONTENT_ADMIN' });
  if (!user) return res.status(404).json({ message: 'Content Admin not found' });

  user.active = !user.active;
  await user.save();
  res.json(user);
}

export async function resetUserPassword(req, res) {
  const { password } = req.body;
  if (!password || password.length < 8) {
    return res.status(400).json({ message: 'Password must be at least 8 characters' });
  }

  const user = await User.findOne({ _id: req.params.id, role: 'CONTENT_ADMIN' });
  if (!user) return res.status(404).json({ message: 'Content Admin not found' });

  user.passwordHash = await bcrypt.hash(password, 12);
  await user.save();
  res.json({ message: 'Password reset successfully' });
}

export async function deleteUser(req, res) {
  const user = await User.findOneAndDelete({ _id: req.params.id, role: 'CONTENT_ADMIN' });
  if (!user) return res.status(404).json({ message: 'Content Admin not found' });
  res.json({ message: 'Content Admin deleted' });
}
