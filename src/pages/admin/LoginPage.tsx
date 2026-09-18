import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface Props {
  requiredRole: 'SUPER_ADMIN' | 'CONTENT_ADMIN';
  dashboardPath: string;
  title: string;
}

export default function LoginPage({ requiredRole, dashboardPath, title }: Props) {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [submitting, setSubmitting] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const user = await login(email, password);
      if (user.role !== requiredRole) {
        setError(`This login is for ${requiredRole === 'SUPER_ADMIN' ? 'Super Admin' : 'Content Admin'} only.`);
        return;
      }
      navigate(dashboardPath);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">{title}</h1>
        {error && (
          <div className="bg-red-50 text-red-700 text-sm px-4 py-2 rounded-lg mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-yellow-400 text-black font-semibold py-3 rounded-lg hover:bg-yellow-300 transition disabled:opacity-50"
          >
            {submitting ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}
