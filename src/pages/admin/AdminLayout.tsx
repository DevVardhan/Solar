import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, FileText, Image as ImageIcon, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface Props {
  basePath: string; // '/admin' or '/super-admin'
  title: string;
  extraLinks?: { to: string; label: string }[];
}

export default function AdminLayout({ basePath, title, extraLinks = [] }: Props) {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate(`${basePath}/login`);
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      <aside className="w-64 bg-white border-r flex flex-col">
        <div className="p-6 border-b">
          <h2 className="text-lg font-bold">{title}</h2>
          {user && <p className="text-xs text-gray-500 mt-1">{user.email}</p>}
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <Link
            to={`${basePath}`}
            className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100"
          >
            <LayoutDashboard className="h-5 w-5" /> Dashboard
          </Link>
          <Link
            to={`${basePath}/blogs`}
            className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100"
          >
            <FileText className="h-5 w-5" /> Blogs
          </Link>
          <Link
            to={`${basePath}/images`}
            className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100"
          >
            <ImageIcon className="h-5 w-5" /> Images
          </Link>
          {extraLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2 rounded-lg text-red-600 hover:bg-red-50 w-full"
          >
            <LogOut className="h-5 w-5" /> Logout
          </button>
        </div>
      </aside>
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}
