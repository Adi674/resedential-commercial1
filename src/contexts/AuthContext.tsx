// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getCurrentUser, loginApi } from '@/services/api';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'team';
  avatar?: string;
}

interface AuthContextType {
  user: TeamMember | null;
  login: (username: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<TeamMember | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing token on mount
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('access_token');
      
      if (token) {
        try {
          const userData = await getCurrentUser();
          
          if (userData) {
            setUser({
              id: userData.user_id.toString(),
              name: userData.full_name,
              email: userData.username,
              role: userData.role,
            });
          } else {
            localStorage.removeItem('access_token');
          }
        } catch (error) {
          console.error('Error initializing auth:', error);
          localStorage.removeItem('access_token');
        }
      }
      
      setIsLoading(false);
    };
    
    initAuth();
  }, []);

  const login = async (username: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await loginApi(username, password);
      
      if (response.success && response.access_token) {
        localStorage.setItem('access_token', response.access_token);
        
        const userData = await getCurrentUser();
        
        if (userData) {
          setUser({
            id: userData.user_id.toString(),
            name: userData.full_name,
            email: userData.username,
            role: userData.role,
          });
          
          return { success: true };
        } else {
          localStorage.removeItem('access_token');
          return { success: false, error: 'Failed to fetch user data' };
        }
      }
      
      return { success: false, error: response.message || 'Login failed' };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Network error. Please try again.' };
    }
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    setUser(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user, isLoading }}>
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