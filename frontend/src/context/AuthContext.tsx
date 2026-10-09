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
  admin: '/admin',
  operations: '/operations',
  doctor: '/doctor',
  nurse: '/nurse',
  reception: '/reception',
  laboratory: '/laboratory',
  pharmacy: '/pharmacy',
  billing: '/billing',
  patient: '/patient',
};

export const DEMO_USERS: Record<UserRole, AuthUser> = {
  admin: {
    id: 'USR-ADM',
    name: 'Hospital Administrator',
    email: 'admin@aahoc.health',
    role: 'admin',
    avatar: 'HA',
    department: 'Hospital Management'
  },
  operations: {
    id: 'USR-OPS',
    name: 'Operations Coordinator',
    email: 'operations@aahoc.health',
    role: 'operations',
    avatar: 'OC',
    department: 'AAHOC AI Command'
  },
  doctor: {
    id: 'USR-DOC',
    name: 'Dr. Sarah Jenkins, MD',
    email: 'doctor@aahoc.health',
    role: 'doctor',
    avatar: 'SJ',
    department: 'Cardiology'
  },
  nurse: {
    id: 'USR-NUR',
    name: 'Rachel Adams, RN',
    email: 'nurse@aahoc.health',
    role: 'nurse',
    avatar: 'RA',
    department: 'Emergency & Trauma'
  },
  reception: {
    id: 'USR-REC',
    name: 'Front Desk Lead',
    email: 'reception@aahoc.health',
    role: 'reception',
    avatar: 'FD',
    department: 'Patient Intake'
  },
  laboratory: {
    id: 'USR-LAB',
    name: 'Diagnostic Specialist',
    email: 'lab@aahoc.health',
    role: 'laboratory',
    avatar: 'DS',
    department: 'Clinical Pathology'
  },
  pharmacy: {
    id: 'USR-PHAR',
    name: 'Chief Pharmacist',
    email: 'pharmacy@aahoc.health',
    role: 'pharmacy',
    avatar: 'CP',
    department: 'Central Dispensary'
  },
  billing: {
    id: 'USR-BILL',
    name: 'Accounts Director',
    email: 'billing@aahoc.health',
    role: 'billing',
    avatar: 'AD',
    department: 'Revenue Cycle'
  },
  patient: {
    id: 'USR-PAT',
    name: 'Eleanor Vance',
    email: 'patient@aahoc.health',
    role: 'patient',
    avatar: 'EV',
    department: 'Patient Portal'
  }
};

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (role: UserRole, email?: string, password?: string) => Promise<string>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'aahoc_auth_user';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(() => {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored) as AuthUser;
      }
    } catch {
      // ignore JSON parse error
    }
    return null;
  });

  const isAuthenticated = Boolean(user);

  const login = async (role: UserRole, email?: string): Promise<string> => {
    const demoProfile = DEMO_USERS[role] || DEMO_USERS.admin;
    const authUser: AuthUser = {
      ...demoProfile,
      email: email && email.includes('@') ? email : demoProfile.email
    };

    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authUser));
    setUser(authUser);
    return ROLE_REDIRECT_PATHS[role] || '/';
  };

  const logout = () => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setUser(null);
  };

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === AUTH_STORAGE_KEY) {
        try {
          setUser(e.newValue ? JSON.parse(e.newValue) : null);
        } catch {
          setUser(null);
        }
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
