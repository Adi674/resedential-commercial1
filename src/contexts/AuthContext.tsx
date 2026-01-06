import React, { createContext, useContext, useState, ReactNode } from 'react';
import { TeamMember, teamMembers } from '@/data/mockData';

interface AuthContextType {
  user: TeamMember | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<TeamMember | null>(null);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        if (!email || !password) {
          resolve({ success: false, error: 'Please enter email and password' });
          return;
        }

        let role: 'admin' | 'team' = 'team';
        let foundMember: TeamMember | undefined;

        if (email.toLowerCase().includes('admin')) {
          role = 'admin';
          foundMember = teamMembers.find(m => m.role === 'admin');
        } else if (email.toLowerCase().includes('team')) {
          role = 'team';
          foundMember = teamMembers.find(m => m.role === 'team');
        } else {
          resolve({ success: false, error: 'Invalid credentials. Use email containing "admin" or "team"' });
          return;
        }

        if (foundMember) {
          setUser(foundMember);
          resolve({ success: true });
        } else {
          resolve({ success: false, error: 'User not found' });
        }
      }, 800);
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
