import 'dotenv/config';
import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { connectDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import adminBlogRoutes from './routes/adminBlogRoutes.js';
import imageRoutes from './routes/imageRoutes.js';
import adminImageRoutes from './routes/adminImageRoutes.js';
import adminUserRoutes from './routes/adminUserRoutes.js';

const app = express();

// Security headers
app.use(helmet());

// Only allow requests from our own frontend
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
    credentials: true,
  })
);

app.use(express.json({ limit: '2mb' }));
app.use(cookieParser());

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/admin/blogs', adminBlogRoutes);
app.use('/api/images', imageRoutes);
app.use('/api/admin/images', adminImageRoutes);
app.use('/api/admin/users', adminUserRoutes);

// Centralized error handler — never leak internals in production
app.use((err, _req, res, _next) => {
  console.error(err);
  const isDev = process.env.NODE_ENV !== 'production';
  res.status(err.status || 500).json({
    message: err.message || 'Internal server error',
    ...(isDev && { stack: err.stack }),
  });
});

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err.message);
    process.exit(1);
  });
