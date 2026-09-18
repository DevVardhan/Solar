import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import BlogListPage from './pages/blogs/BlogListPage';
import BlogDetailPage from './pages/blogs/BlogDetailPage';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/admin/LoginPage';
import AdminLayout from './pages/admin/AdminLayout';
import DashboardHome from './pages/admin/DashboardHome';
import BlogList from './pages/admin/BlogList';
import BlogEditor from './pages/admin/BlogEditor';
import ImageLibrary from './pages/admin/ImageLibrary';
import ManageContentAdmins from './pages/admin/ManageContentAdmins';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Existing site — completely unchanged */}
          <Route path="/" element={<App />} />

          {/* Public blog section */}
          <Route path="/blogs" element={<BlogListPage />} />
          <Route path="/blogs/:slug" element={<BlogDetailPage />} />

          {/* Content Admin */}
          <Route
            path="/admin/login"
            element={
              <LoginPage requiredRole="CONTENT_ADMIN" dashboardPath="/admin" title="Content Admin Login" />
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={['CONTENT_ADMIN', 'SUPER_ADMIN']} redirectTo="/admin/login">
                <AdminLayout basePath="/admin" title="SandhyaSolar CMS" />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardHome />} />
            <Route path="blogs" element={<BlogList basePath="/admin" />} />
            <Route path="blogs/new" element={<BlogEditor basePath="/admin" />} />
            <Route path="blogs/:id" element={<BlogEditor basePath="/admin" />} />
            <Route path="images" element={<ImageLibrary />} />
          </Route>

          {/* Super Admin */}
          <Route
            path="/super-admin/login"
            element={
              <LoginPage requiredRole="SUPER_ADMIN" dashboardPath="/super-admin" title="Super Admin Login" />
            }
          />
          <Route
            path="/super-admin"
            element={
              <ProtectedRoute allowedRoles={['SUPER_ADMIN']} redirectTo="/super-admin/login">
                <AdminLayout
                  basePath="/super-admin"
                  title="Super Admin"
                  extraLinks={[{ to: '/super-admin/content-admins', label: 'Content Admins' }]}
                />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardHome />} />
            <Route path="blogs" element={<BlogList basePath="/super-admin" />} />
            <Route path="blogs/new" element={<BlogEditor basePath="/super-admin" />} />
            <Route path="blogs/:id" element={<BlogEditor basePath="/super-admin" />} />
            <Route path="images" element={<ImageLibrary />} />
            <Route path="content-admins" element={<ManageContentAdmins />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
