'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'student' | 'admin';
}

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  login: (email: string, pass: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<boolean>;
  register: (name: string, email: string, pass: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load from local storage
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('ai_academy_user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (e) {
      console.error('Failed to load user session', e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, _pass: string): Promise<boolean> => {
    const loggedUser: AuthUser = {
      id: 'usr_' + Date.now(),
      name: email.split('@')[0].toUpperCase(),
      email,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      role: email.includes('admin') ? 'admin' : 'student'
    };
    setUser(loggedUser);
    localStorage.setItem('ai_academy_user', JSON.stringify(loggedUser));
    return true;
  };

  const loginWithGoogle = async (): Promise<boolean> => {
    const loggedUser: AuthUser = {
      id: 'usr_gg_' + Date.now(),
      name: 'Học Viên AI Pro',
      email: 'hocvien.ai@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      role: 'student'
    };
    setUser(loggedUser);
    localStorage.setItem('ai_academy_user', JSON.stringify(loggedUser));
    return true;
  };

  const register = async (name: string, email: string, _pass: string): Promise<boolean> => {
    const newUser: AuthUser = {
      id: 'usr_' + Date.now(),
      name: name.trim() || 'Học Viên Mới',
      email,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      role: 'student'
    };
    setUser(newUser);
    localStorage.setItem('ai_academy_user', JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ai_academy_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        loginWithGoogle,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
