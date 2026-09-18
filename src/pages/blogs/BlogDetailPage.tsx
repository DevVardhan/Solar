import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import api from '../../api/axios';
import { setPageMeta } from '../../utils/seo';

interface Blog {
  title: string;
  coverImage: string;
  author: string;
  publishedAt: string;
  content: string;
  excerpt: string;
}

export default function BlogDetailPage() {
  const { slug } = useParams();
  const [blog, setBlog] = React.useState<Blog | null>(null);
  const [notFound, setNotFound] = React.useState(false);

  React.useEffect(() => {
    api
      .get(`/blogs/${slug}`)
      .then((res) => setBlog(res.data))
      .catch(() => setNotFound(true));
  }, [slug]);

  // Update the tab title, meta description, and social-share preview
  // for this specific blog post. Reset back to site defaults when the
  // visitor navigates away.
  React.useEffect(() => {
    if (!blog) return;
    const cleanup = setPageMeta({
      title: `${blog.title} | SandhyaSolar Blog`,
      description: blog.excerpt,
      image: blog.coverImage,
      url: window.location.href,
    });
    return cleanup;
  }, [blog]);

  if (notFound) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-gray-600 mb-4">This blog post doesn't exist or isn't published.</p>
        <Link to="/blogs" className="text-yellow-600 font-semibold">
          ← Back to Blogs
        </Link>
      </div>
    );
  }

  if (!blog) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      {blog.coverImage && (
        <div className="w-full h-80">
          <img src={blog.coverImage} alt={blog.title} className="w-full h-full object-cover" />
        </div>
      )}
      <div className="container mx-auto px-6 py-12 max-w-3xl">
        <Link
          to="/blogs"
          className="inline-flex items-center text-gray-500 hover:text-gray-800 mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-1" /> Back to Blogs
        </Link>
        <h1 className="text-4xl font-bold mb-3">{blog.title}</h1>
        <p className="text-sm text-gray-500 mb-8">
          {new Date(blog.publishedAt).toLocaleDateString()} · {blog.author}
        </p>
        <div className="prose max-w-none whitespace-pre-wrap text-gray-700 leading-relaxed">
          {blog.content}
        </div>
      </div>
    </div>
  );
}
