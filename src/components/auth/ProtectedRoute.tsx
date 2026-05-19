import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

type Role = 'customer' | 'restaurant_owner' | 'admin';

interface Props {
  children: React.ReactNode;
  roles?: Role[];
  redirectTo?: string;
}

export default function ProtectedRoute({ children, roles, redirectTo = '/login' }: Props) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-32">
        <p className="text-app-text/40 font-mono text-xs uppercase tracking-widest">Loading...</p>
      </div>
    );
  }

  if (!user) return <Navigate to={redirectTo} replace />;
  if (roles && !roles.includes(user.role as Role)) {
    if (user.role === 'admin') return <Navigate to="/admin" replace />;
    if (user.role === 'restaurant_owner') return <Navigate to="/restaurant-dashboard" replace />;
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
