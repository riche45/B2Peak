import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'organization' | 'user';
  organization?: {
    id: string;
    name: string;
  };
}

interface AuthContextType {
  user: User | null;
  login: (type: 'wallet' | 'organization') => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (type: 'wallet' | 'organization') => {
    setIsLoading(true);
    
    // Simulate authentication
    setTimeout(() => {
      if (type === 'organization') {
        setUser({
          id: '1',
          name: 'John Doe',
          email: 'john@university.edu',
          role: 'organization',
          organization: {
            id: 'org1',
            name: 'Tech University'
          }
        });
      } else {
        setUser({
          id: '2',
          name: 'Alice Smith',
          email: 'alice@example.com',
          role: 'user'
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};