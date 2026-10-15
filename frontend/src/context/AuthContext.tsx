import React, { createContext, useContext, useState, useEffect } from 'react';
import type { UserRole } from '../types';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  department?: string;
}

export const ROLE_REDIRECT_PATHS: Record<UserRole, string> = {
  operations: '/dashboard',
  triage: '/patient-prioritisation',
  admin: '/dashboard',
};

export const DEMO_USERS: Record<UserRole, AuthUser> = {
  operations: {
    id: 'USR-OPS',
    name: 'Operations Coordinator',
    email: 'operations@aahoc.health',
    role: 'operations',
    avatar: 'OC',
    department: 'Hospital Operations Command',
  },
  triage: {
    id: 'USR-TRG',
    name: 'Rachel Adams, RN',
    email: 'triage@aahoc.health',
    role: 'triage',
    avatar: 'TR',
    department: 'Emergency Triage Support',
  },
  admin: {
    id: 'USR-ADM',
    name: 'Hospital Administrator',
    email: 'admin@aahoc.health',
    role: 'admin',
    avatar: 'HA',
    department: 'Hospital Management',
  },
};

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (role: UserRole) => void;
  logout: () => void;
  switchRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const saved = localStorage.getItem('aahoc_user');
    return saved ? JSON.parse(saved) : DEMO_USERS.operations;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('aahoc_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('aahoc_user');
    }
  }, [user]);

  const login = (role: UserRole) => {
    setUser(DEMO_USERS[role] || DEMO_USERS.operations);
  };

  const logout = () => {
    setUser(null);
  };

  const switchRole = (role: UserRole) => {
    login(role);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        switchRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
