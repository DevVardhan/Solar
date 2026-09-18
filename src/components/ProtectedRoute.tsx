import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface Props {
  children: React.ReactNode;
  allowedRoles: Array<'SUPER_ADMIN' | 'CONTENT_ADMIN'>;
  redirectTo: string;
}

export default function ProtectedRoute({ children, allowedRoles, redirectTo }: Props) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  // Note: this only controls what the UI shows. The real security
  // boundary is the backend's `protect` + `authorize` middleware —
  // this just prevents a confusing UI flash for the wrong role.
  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
}
