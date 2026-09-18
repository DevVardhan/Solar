import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Verifies the JWT (read from an httpOnly cookie) and attaches the
// authenticated user to req.user. Rejects if missing/invalid/expired.
export async function protect(req, res, next) {
  try {
    const token = req.cookies?.token;
    if (!token) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user || !user.active) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    req.user = user; // trusted, comes from DB — never from client input
    next();
  } catch (_err) {
    return res.status(401).json({ message: 'Not authenticated' });
  }
}

// Restricts a route to specific roles. Role always comes from req.user,
// which was set by `protect` from the verified token + DB lookup —
// never trusted from anything the client sends.
export function authorize(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    next();
  };
}
