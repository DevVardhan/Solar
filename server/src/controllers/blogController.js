import { body, validationResult } from 'express-validator';
import slugify from 'slugify';
import Blog from '../models/Blog.js';

export const blogValidators = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('excerpt').trim().notEmpty().isLength({ max: 300 }),
  body('content').trim().notEmpty().withMessage('Content is required'),
  body('author').trim().notEmpty().withMessage('Author is required'),
  body('coverImage').optional().trim(),
];

async function generateUniqueSlug(title, excludeId = null) {
  const base = slugify(title, { lower: true, strict: true });
  let slug = base;
  let counter = 1;

  // Keep trying slug-1, slug-2, etc. until we find one that's free
  while (
    await Blog.exists({ slug, ...(excludeId && { _id: { $ne: excludeId } }) })
  ) {
    slug = `${base}-${counter++}`;
  }
  return slug;
}

// ---------- PUBLIC ----------

export async function getPublishedBlogs(_req, res) {
  const blogs = await Blog.find({ status: 'published' })
    .sort({ publishedAt: -1 })
    .select('title slug coverImage excerpt author publishedAt');
  res.json(blogs);
}

export async function getPublishedBlogBySlug(req, res) {
  const blog = await Blog.findOne({ slug: req.params.slug, status: 'published' });
  if (!blog) {
    return res.status(404).json({ message: 'Blog not found' });
  }
  res.json(blog);
}

// ---------- ADMIN ----------

export async function getAdminBlogs(_req, res) {
  const blogs = await Blog.find().sort({ updatedAt: -1 });
  res.json(blogs);
}

export async function getAdminBlogById(req, res) {
  const blog = await Blog.findById(req.params.id);
  if (!blog) return res.status(404).json({ message: 'Blog not found' });
  res.json(blog);
}

const BLOG_LIMIT = 10;

export async function createBlog(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: 'Invalid input', errors: errors.array() });
  }

  const count = await Blog.countDocuments();
  if (count >= BLOG_LIMIT) {
    return res.status(403).json({ message: `Blog limit reached (${BLOG_LIMIT} max). Delete an existing blog to add a new one.` });
  }

  const { title, excerpt, content, author, coverImage } = req.body;
  const slug = await generateUniqueSlug(title);

  const blog = await Blog.create({
    title,
    slug,
    excerpt,
    content,
    author,
    coverImage: coverImage || '',
    status: 'draft',
  });

  res.status(201).json(blog);
}

export async function updateBlog(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: 'Invalid input', errors: errors.array() });
  }

  const blog = await Blog.findById(req.params.id);
  if (!blog) return res.status(404).json({ message: 'Blog not found' });

  const { title, excerpt, content, author, coverImage } = req.body;

  // Regenerate slug only if the title actually changed
  if (title && title !== blog.title) {
    blog.slug = await generateUniqueSlug(title, blog._id);
  }

  blog.title = title ?? blog.title;
  blog.excerpt = excerpt ?? blog.excerpt;
  blog.content = content ?? blog.content;
  blog.author = author ?? blog.author;
  if (coverImage !== undefined) blog.coverImage = coverImage;

  await blog.save();
  res.json(blog);
}

export async function deleteBlog(req, res) {
  const blog = await Blog.findByIdAndDelete(req.params.id);
  if (!blog) return res.status(404).json({ message: 'Blog not found' });
  res.json({ message: 'Blog deleted' });
}

export async function togglePublish(req, res) {
  const blog = await Blog.findById(req.params.id);
  if (!blog) return res.status(404).json({ message: 'Blog not found' });

  if (blog.status === 'published') {
    blog.status = 'draft';
    blog.publishedAt = null;
  } else {
    blog.status = 'published';
    blog.publishedAt = new Date();
  }

  await blog.save();
  res.json(blog);
}
