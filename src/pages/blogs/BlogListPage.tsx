import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import api from '../../api/axios';
import { setPageMeta } from '../../utils/seo';

interface BlogSummary {
  _id: string;
  title: string;
  slug: string;
  coverImage: string;
  excerpt: string;
  author: string;
  publishedAt: string;
}

export default function BlogListPage() {
  const [blogs, setBlogs] = React.useState<BlogSummary[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    api.get('/blogs').then((res) => {
      setBlogs(res.data);
      setLoading(false);
    });
  }, []);

  React.useEffect(() => {
    const cleanup = setPageMeta({
      title: 'Blog | SandhyaSolar',
      description: 'Tips, updates, and insights on solar energy from SandhyaSolar.',
    });
    return cleanup;
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold mb-3">SandhyaSolar Blog</h1>
          <p className="text-gray-600">Tips, updates, and insights on solar energy</p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : blogs.length === 0 ? (
          <p className="text-center text-gray-500">No blog posts yet. Check back soon.</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <article
                key={blog._id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition"
              >
                {blog.coverImage && (
                  <img
                    src={blog.coverImage}
                    alt={blog.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <p className="text-xs text-gray-500 mb-2">
                    {new Date(blog.publishedAt).toLocaleDateString()} · {blog.author}
                  </p>
                  <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
                  <p className="text-gray-600 mb-4 line-clamp-3">{blog.excerpt}</p>
                  <Link
                    to={`/blogs/${blog.slug}`}
                    className="inline-flex items-center text-yellow-600 font-semibold hover:text-yellow-700"
                  >
                    Read More <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
