import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (userData: { email: string; password: string; firstName: string; lastName: string; }) => Promise<boolean>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Static credentials from environment variables
const TEST_USER_EMAIL = process.env.REACT_APP_TEST_USER_EMAIL;
const TEST_USER_PASSWORD = process.env.REACT_APP_TEST_USER_PASSWORD;
const TEST_USER_FIRSTNAME = process.env.REACT_APP_TEST_USER_FIRSTNAME || 'Test';
const TEST_USER_LASTNAME = process.env.REACT_APP_TEST_USER_LASTNAME || 'User';

// Local storage key for user session
const USER_SESSION_KEY = 'authenticated_user';

// Helper to simulate loading delay
const simulateLoading = (minMs: number = 2000, maxMs: number = 4000): Promise<void> => {
  const delay = Math.floor(Math.random() * (maxMs - minMs + 1)) + minMs;
  return new Promise(resolve => setTimeout(resolve, delay));
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check for existing session on mount
  useEffect(() => {
    const initAuth = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Check localStorage for existing session
        const storedUser = localStorage.getItem(USER_SESSION_KEY);
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          // Restore any valid user session
          if (parsedUser.email && parsedUser.id) {
            setUser(parsedUser);
          } else {
            // Clear invalid session
            localStorage.removeItem(USER_SESSION_KEY);
          }
        }
      } catch (err) {
        console.error('Session restoration failed:', err);
        localStorage.removeItem(USER_SESSION_KEY);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    
    try {
      // Check if credentials match the test user
      if (email === TEST_USER_EMAIL && password === TEST_USER_PASSWORD) {
        // Simulate loading (2-4 seconds)
        await simulateLoading(2000, 4000);
        
        const authenticatedUser: User = {
          id: '1',
          email: TEST_USER_EMAIL,
          firstName: TEST_USER_FIRSTNAME,
          lastName: TEST_USER_LASTNAME
        };
        
        // Save to localStorage
        localStorage.setItem(USER_SESSION_KEY, JSON.stringify(authenticatedUser));
        setUser(authenticatedUser);
        setLoading(false);
        return true;
      } else {
        // Simulate loading for failed attempts too (to prevent timing attacks)
        await simulateLoading(1000, 2000);
        setError('Invalid email or password');
        setLoading(false);
        return false;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
      setLoading(false);
      return false;
    }
  };

  const register = async (userData: { email: string; password: string; firstName: string; lastName: string; }): Promise<boolean> => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate loading (2-4 seconds)
      await simulateLoading(2000, 4000);
      
      // Prevent registration with test user email (already exists)
      if (userData.email === TEST_USER_EMAIL) {
        setError('This email is already registered. Please sign in or use a different email.');
        setLoading(false);
        return false;
      }
      
      // Allow registration for any other email
      // Generate a unique ID based on timestamp
      const newUser: User = {
        id: Date.now().toString(),
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName
      };
      
      // Save to localStorage
      localStorage.setItem(USER_SESSION_KEY, JSON.stringify(newUser));
      setUser(newUser);
      setLoading(false);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
      setLoading(false);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem(USER_SESSION_KEY);
    setUser(null);
    setError(null);
  };

  const clearError = () => {
    setError(null);
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    loading,
    error,
    login,
    logout,
    register,
    clearError
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};