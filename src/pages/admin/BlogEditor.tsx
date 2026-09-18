import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Upload } from 'lucide-react';
import api from '../../api/axios';

export default function BlogEditor({ basePath }: { basePath: string }) {
  const { id } = useParams(); // undefined when creating a new blog
  const isEditing = Boolean(id) && id !== 'new';
  const navigate = useNavigate();

  const [form, setForm] = React.useState({
    title: '',
    excerpt: '',
    content: '',
    author: '',
    coverImage: '',
  });
  const [loading, setLoading] = React.useState(isEditing);
  const [saving, setSaving] = React.useState(false);
  const [uploadingCover, setUploadingCover] = React.useState(false);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    if (isEditing) {
      api.get(`/admin/blogs/${id}`).then((res) => {
        const b = res.data;
        setForm({
          title: b.title,
          excerpt: b.excerpt,
          content: b.content,
          author: b.author,
          coverImage: b.coverImage || '',
        });
        setLoading(false);
      });
    }
  }, [id, isEditing]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  // Upload any image straight from the blog editor — it doesn't need to
  // already exist in the shared Image Library first.
  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingCover(true);
    setError('');
    try {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('usage', 'blog');
      const res = await api.post('/admin/images', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setForm((f) => ({ ...f, coverImage: res.data.url }));
    } catch (err: any) {
      setError(err.response?.data?.message || 'Image upload failed');
    } finally {
      setUploadingCover(false);
    }
  };

  const save = async (publishAfter: boolean) => {
    setSaving(true);
    setError('');
    try {
      let blogId = id;
      if (isEditing) {
        await api.put(`/admin/blogs/${id}`, form);
      } else {
        const res = await api.post('/admin/blogs', form);
        blogId = res.data._id;
      }
      if (publishAfter) {
        await api.patch(`/admin/blogs/${blogId}/publish`);
      }
      navigate(`${basePath}/blogs`);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to save blog');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold mb-6">{isEditing ? 'Edit Blog' : 'New Blog'}</h1>

      {error && (
        <div className="bg-red-50 text-red-700 text-sm px-4 py-2 rounded-lg mb-4">
          {error}
        </div>
      )}

      <div className="space-y-4 bg-white p-6 rounded-xl shadow">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image</label>
          {form.coverImage && (
            <img
              src={form.coverImage}
              alt="Cover preview"
              className="w-full h-40 object-cover rounded-lg mb-2"
            />
          )}
          <label className="inline-flex items-center gap-2 px-4 py-2 border rounded-lg cursor-pointer hover:bg-gray-50 text-sm font-medium">
            <Upload className="h-4 w-4" />
            {uploadingCover ? 'Uploading...' : form.coverImage ? 'Replace Image' : 'Upload Image'}
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              className="hidden"
              onChange={handleCoverUpload}
              disabled={uploadingCover}
            />
          </label>
          <p className="text-xs text-gray-500 mt-1">
            Upload any image from your computer — it doesn't need to already be in your Image Library.
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Excerpt (max 300 chars)
          </label>
          <textarea
            name="excerpt"
            value={form.excerpt}
            onChange={handleChange}
            maxLength={300}
            rows={2}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
          <input
            name="author"
            value={form.author}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            rows={12}
            className="w-full px-4 py-2 border rounded-lg font-mono text-sm"
          />
        </div>

        <div className="flex gap-3 pt-2">
          <button
            onClick={() => save(false)}
            disabled={saving}
            className="px-4 py-2 border rounded-lg font-semibold hover:bg-gray-50 disabled:opacity-50"
          >
            Save Draft
          </button>
          <button
            onClick={() => save(true)}
            disabled={saving}
            className="px-4 py-2 bg-yellow-400 text-black rounded-lg font-semibold hover:bg-yellow-300 disabled:opacity-50"
          >
            Save & Publish
          </button>
        </div>
      </div>
    </div>
  );
}
