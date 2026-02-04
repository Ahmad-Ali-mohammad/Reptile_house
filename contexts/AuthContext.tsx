
import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { User, UserRole } from '../types';
import { useDatabase } from './DatabaseContext';

interface AuthContextType {
  user: User | null;
  login: (email: string, pass: string) => boolean;
  logout: () => void;
  register: (name: string, email: string, pass: string) => void;
  updateProfile: (data: Partial<User>) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USER_STORAGE_KEY = 'rh_current_user';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { users, updateUser } = useDatabase();
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem(USER_STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(USER_STORAGE_KEY);
    }
  }, [user]);

  const login = (email: string, pass: string): boolean => {
    // Search for user in the dynamic database list
    const foundUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    // Simple mock password logic: 
    // If it's the default admin/user or any new user with '123' at the end
    // In a real app, you'd verify hashed passwords.
    if (foundUser && (pass === 'admin123' || pass === 'user123' || pass.length >= 6)) {
      setUser(foundUser);
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const register = (name: string, email: string, pass: string) => {
    const newUser: User = { 
        id: `user-${Math.random().toString(36).substr(2, 9)}`, 
        name, 
        email, 
        role: 'user',
        avatarUrl: `https://i.pravatar.cc/150?u=${email}` 
    };
    
    // 1. Add to the global database (this makes them appear in the admin dashboard)
    updateUser(newUser);
    
    // 2. Set as current logged in user
    setUser(newUser);
  };

  const updateProfile = (data: Partial<User>) => {
    if (user) {
        const updated = { ...user, ...data };
        setUser(updated);
        updateUser(updated); // Sync with Database
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
