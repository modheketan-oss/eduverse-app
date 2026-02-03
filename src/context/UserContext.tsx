import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserRole } from '../types';

interface UserContextType {
  user: User | null;
  login: (email: string) => void;
  signup: (name: string, email: string) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  isPremium: boolean; // Helper accessor
  upgradeToPremium: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('eduverse_user');
    return saved ? JSON.parse(saved) : null;
  });

  // Persist user to local storage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('eduverse_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('eduverse_user');
    }
  }, [user]);

  const login = (email: string) => {
    // In a real app, validate password. Here, we simulate login or restore a "demo" user if not found.
    // For "Actual Data" feel, if the user exists in local storage with that email, we use it.
    // Otherwise, we create a mock one.
    
    if (user && user.email === email) {
        // Already loaded via initial state, or just re-setting
        return; 
    }

    // Simulate fetching from DB
    setUser({
        name: 'Learner',
        email: email,
        isPremium: false,
        role: UserRole.Student
    });
  };

  const signup = (name: string, email: string) => {
    setUser({
        name: name,
        email: email,
        isPremium: false
    });
  };

  const logout = () => {
    setUser(null);
  };

  const updateUser = (updates: Partial<User>) => {
    setUser(prev => prev ? { ...prev, ...updates } : null);
  };

  const upgradeToPremium = () => {
    updateUser({ isPremium: true });
  };

  return (
    <UserContext.Provider value={{ 
      user, 
      login, 
      signup, 
      logout, 
      updateUser, 
      isPremium: user?.isPremium || false, 
      upgradeToPremium 
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};