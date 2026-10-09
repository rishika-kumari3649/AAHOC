import React from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useAuth, ROLE_REDIRECT_PATHS } from '../context/AuthContext';
import type { UserRole } from '../types';

interface ProtectedRouteProps {
  allowedRoles?: UserRole[];
  children?: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles, children }) => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // If specific roles required and user is not in allowedRoles
  if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    // Admin has superuser oversight over system panels
    if (user.role !== 'admin') {
      const authorizedPath = ROLE_REDIRECT_PATHS[user.role] || '/';
      return <Navigate to={authorizedPath} replace />;
    }
  }

  return children ? <>{children}</> : <Outlet />;
};
