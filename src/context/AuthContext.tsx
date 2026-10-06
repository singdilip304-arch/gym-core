import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { INITIAL_USERS } from '../data/mockData';

interface RegisterData {
  name: string;
  email: string;
  mobile: string;
  password?: string;
  gender?: 'male' | 'female' | 'other';
  age?: number;
  height?: number;
  weight?: number;
  fitnessGoal?: string;
  emergencyName?: string;
  emergencyPhone?: string;
  emergencyRelation?: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password?: string, role?: UserRole) => boolean;
  logout: () => void;
  register: (data: RegisterData) => User;
  switchDemoUser: (role: UserRole) => void;
  updateProfile: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('gymcore_auth_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_USERS[2]; // Default demo member Aman Verma
      }
    }
    return INITIAL_USERS[2]; // Default to demo member for instant experience
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('gymcore_auth_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('gymcore_auth_user');
    }
  }, [user]);

  const login = (email: string, _password?: string, preferredRole?: UserRole): boolean => {
    const usersInStorage: User[] = JSON.parse(
      localStorage.getItem('gymcore_users') || JSON.stringify(INITIAL_USERS)
    );

    let found = usersInStorage.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );

    if (!found && preferredRole) {
      found = usersInStorage.find((u) => u.role === preferredRole);
    }

    if (found) {
      setUser(found);
      return true;
    }

    // Fallback create simple login if demo credentials used
    const fallbackUser: User = {
      id: `usr_${Date.now()}`,
      name: email.split('@')[0],
      email,
      mobile: '+91 98290 00000',
      role: preferredRole || 'member',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80',
      membershipStatus: 'active',
      membershipPlanName: 'PRO ATHLETE (3-Month)',
      memberSince: new Date().toISOString().split('T')[0],
      qrCode: `GYMCORE-MEM-${Date.now()}`,
    };
    setUser(fallbackUser);
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  const register = (data: RegisterData): User => {
    const newUser: User = {
      id: `usr_mem_${Date.now()}`,
      name: data.name,
      email: data.email,
      mobile: data.mobile,
      role: 'member',
      avatar:
        data.avatar ||
        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80',
      gender: data.gender || 'male',
      age: data.age || 25,
      height: data.height || 175,
      weight: data.weight || 72,
      fitnessGoal: data.fitnessGoal || 'General Fitness & Muscle Tone',
      emergencyContact: {
        name: data.emergencyName || 'Primary Contact',
        phone: data.emergencyPhone || '+91 98290 00000',
        relation: data.emergencyRelation || 'Family',
      },
      membershipStatus: 'none',
      memberSince: new Date().toISOString().split('T')[0],
      qrCode: `GYMCORE-MEM-${Date.now().toString().slice(-6)}`,
    };

    const existingUsers: User[] = JSON.parse(
      localStorage.getItem('gymcore_users') || JSON.stringify(INITIAL_USERS)
    );
    const updated = [...existingUsers, newUser];
    localStorage.setItem('gymcore_users', JSON.stringify(updated));

    setUser(newUser);
    return newUser;
  };

  const switchDemoUser = (role: UserRole) => {
    const target = INITIAL_USERS.find((u) => u.role === role);
    if (target) {
      setUser(target);
    }
  };

  const updateProfile = (data: Partial<User>) => {
    setUser((prev) => {
      if (!prev) return null;
      const updated = { ...prev, ...data };
      const usersInStorage: User[] = JSON.parse(
        localStorage.getItem('gymcore_users') || JSON.stringify(INITIAL_USERS)
      );
      const index = usersInStorage.findIndex((u) => u.id === prev.id);
      if (index !== -1) {
        usersInStorage[index] = updated;
        localStorage.setItem('gymcore_users', JSON.stringify(usersInStorage));
      }
      return updated;
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        register,
        switchDemoUser,
        updateProfile,
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
