import React from 'react';
import api from '../../api/axios';

interface ContentAdmin {
  _id: string;
  name: string;
  email: string;
  active: boolean;
}

export default function ManageContentAdmins() {
  const [admins, setAdmins] = React.useState<ContentAdmin[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [form, setForm] = React.useState({ name: '', email: '', password: '' });
  const [error, setError] = React.useState('');
  const [creating, setCreating] = React.useState(false);

  const load = async () => {
    setLoading(true);
    const res = await api.get('/admin/users');
    setAdmins(res.data);
    setLoading(false);
  };

  React.useEffect(() => {
    load();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setCreating(true);
    try {
      await api.post('/admin/users', form);
      setForm({ name: '', email: '', password: '' });
      load();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create Content Admin');
    } finally {
      setCreating(false);
    }
  };

  const toggleActive = async (id: string) => {
    await api.patch(`/admin/users/${id}/toggle-active`);
    load();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this Content Admin account permanently?')) return;
    await api.delete(`/admin/users/${id}`);
    load();
  };

  const handleResetPassword = async (id: string) => {
    const newPassword = prompt('Enter a new password for this account (min 8 characters):');
    if (!newPassword) return;
    if (newPassword.length < 8) {
      alert('Password must be at least 8 characters.');
      return;
    }
    await api.patch(`/admin/users/${id}/reset-password`, { password: newPassword });
    alert('Password reset successfully. Share it with them securely.');
  };

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold mb-6">Content Admins</h1>

      <div className="bg-white p-6 rounded-xl shadow mb-8">
        <h2 className="font-semibold mb-4">Create New Content Admin</h2>
        {error && (
          <div className="bg-red-50 text-red-700 text-sm px-4 py-2 rounded-lg mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleCreate} className="grid md:grid-cols-3 gap-3">
          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
            className="px-4 py-2 border rounded-lg"
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="px-4 py-2 border rounded-lg"
          />
          <input
            name="password"
            type="password"
            placeholder="Password (min 8 chars)"
            value={form.password}
            onChange={handleChange}
            required
            className="px-4 py-2 border rounded-lg"
          />
          <button
            type="submit"
            disabled={creating}
            className="md:col-span-3 bg-yellow-400 text-black font-semibold py-2 rounded-lg hover:bg-yellow-300 disabled:opacity-50"
          >
            {creating ? 'Creating...' : 'Create Content Admin'}
          </button>
        </form>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100 text-sm text-gray-600">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {!loading &&
              admins.map((admin) => (
                <tr key={admin._id} className="border-t">
                  <td className="px-4 py-3">{admin.name}</td>
                  <td className="px-4 py-3">{admin.email}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        admin.active ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-700'
                      }`}
                    >
                      {admin.active ? 'Active' : 'Disabled'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => toggleActive(admin._id)}
                        className="text-sm px-3 py-1 rounded-lg border hover:bg-gray-50"
                      >
                        {admin.active ? 'Disable' : 'Enable'}
                      </button>
                      <button
                        onClick={() => handleResetPassword(admin._id)}
                        className="text-sm px-3 py-1 rounded-lg border hover:bg-gray-50"
                      >
                        Reset Password
                      </button>
                      <button
                        onClick={() => handleDelete(admin._id)}
                        className="text-sm px-3 py-1 rounded-lg border border-red-300 text-red-600 hover:bg-red-50"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            {!loading && admins.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-gray-500">
                  No Content Admins yet. Create one above.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
