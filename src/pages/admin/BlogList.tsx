import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import api from '../../api/axios';

interface Blog {
  _id: string;
  title: string;
  status: 'draft' | 'published';
  author: string;
  updatedAt: string;
}

export default function BlogList({ basePath }: { basePath: string }) {
  const [blogs, setBlogs] = React.useState<Blog[]>([]);
  const [loading, setLoading] = React.useState(true);

  const load = async () => {
    setLoading(true);
    const res = await api.get('/admin/blogs');
    setBlogs(res.data);
    setLoading(false);
  };

  React.useEffect(() => {
    load();
  }, []);

  const togglePublish = async (id: string) => {
    await api.patch(`/admin/blogs/${id}/publish`);
    load();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this blog permanently?')) return;
    await api.delete(`/admin/blogs/${id}`);
    load();
  };

  if (loading) return <p>Loading blogs...</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Blogs</h1>
        <Link
          to={`${basePath}/blogs/new`}
          className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-400 text-black rounded-lg font-semibold hover:bg-yellow-300"
        >
          <Plus className="h-4 w-4" /> New Blog
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100 text-sm text-gray-600">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Author</th>
              <th className="px-4 py-3">Updated</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => (
              <tr key={blog._id} className="border-t">
                <td className="px-4 py-3 font-medium">{blog.title}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      blog.status === 'published'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    {blog.status}
                  </span>
                </td>
                <td className="px-4 py-3">{blog.author}</td>
                <td className="px-4 py-3 text-sm text-gray-500">
                  {new Date(blog.updatedAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Link
                      to={`${basePath}/blogs/${blog._id}`}
                      className="p-2 rounded-lg hover:bg-gray-100"
                      title="Edit"
                    >
                      <Pencil className="h-4 w-4" />
                    </Link>
                    <button
                      onClick={() => togglePublish(blog._id)}
                      className="text-sm px-3 py-1 rounded-lg border hover:bg-gray-50"
                    >
                      {blog.status === 'published' ? 'Unpublish' : 'Publish'}
                    </button>
                    <button
                      onClick={() => handleDelete(blog._id)}
                      className="p-2 rounded-lg hover:bg-red-50 text-red-600"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {blogs.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                  No blogs yet. Create your first one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
