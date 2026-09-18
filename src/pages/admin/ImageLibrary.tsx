import React from 'react';
import { Trash2, Copy, Upload } from 'lucide-react';
import api from '../../api/axios';

interface ImageItem {
  _id: string;
  title: string;
  url: string;
}

export default function ImageLibrary() {
  const [images, setImages] = React.useState<ImageItem[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [uploading, setUploading] = React.useState(false);
  const [error, setError] = React.useState('');
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const load = async () => {
    setLoading(true);
    const res = await api.get('/admin/images');
    setImages(res.data);
    setLoading(false);
  };

  React.useEffect(() => {
    load();
  }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError('');
    try {
      const formData = new FormData();
      formData.append('image', file);
      await api.post('/admin/images', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      load();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Upload failed');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this image? It will also be removed from Cloudinary.')) return;
    await api.delete(`/admin/images/${id}`);
    load();
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Images</h1>
        <label className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-400 text-black rounded-lg font-semibold hover:bg-yellow-300 cursor-pointer">
          <Upload className="h-4 w-4" />
          {uploading ? 'Uploading...' : 'Upload Image'}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            className="hidden"
            onChange={handleUpload}
            disabled={uploading}
          />
        </label>
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 text-sm px-4 py-2 rounded-lg mb-4">
          {error}
        </div>
      )}

      {loading ? (
        <p>Loading images...</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((img) => (
            <div key={img._id} className="bg-white rounded-xl shadow overflow-hidden">
              <img src={img.url} alt={img.title} className="w-full h-32 object-cover" />
              <div className="p-2 flex items-center justify-between">
                <button
                  onClick={() => copyUrl(img.url)}
                  className="text-xs text-gray-600 hover:text-black flex items-center gap-1"
                  title="Copy URL"
                >
                  <Copy className="h-3 w-3" /> Copy URL
                </button>
                <button
                  onClick={() => handleDelete(img._id)}
                  className="text-red-600 hover:bg-red-50 p-1 rounded"
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              </div>
            </div>
          ))}
          {images.length === 0 && (
            <p className="col-span-full text-gray-500 text-center py-8">
              No images uploaded yet.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
