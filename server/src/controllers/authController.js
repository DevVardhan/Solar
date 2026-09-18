import { body, validationResult } from 'express-validator';
import User from '../models/User.js';
import { generateToken } from '../utils/generateToken.js';

export const loginValidators = [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }),
];

export async function login(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: 'Invalid input' });
  }

  const { email, password } = req.body;

  const user = await User.findOne({ email });
  // Same generic message whether the email doesn't exist or the
  // password is wrong — avoids leaking which emails are registered.
  if (!user || !user.active) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  const token = generateToken(user);

  res
    .cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    })
    .json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
}

export function logout(_req, res) {
  res.clearCookie('token').json({ message: 'Logged out' });
}

export function me(req, res) {
  res.json({
    id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    role: req.user.role,
  });
}
