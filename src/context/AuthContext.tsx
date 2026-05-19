import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  authApi,
  AuthResponse,
  AuthUser,
  clearTokens,
  getStoredUser,
  saveUser,
  setTokens,
} from '../lib/api';

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<AuthUser>;
  register: (name: string, email: string, password: string) => Promise<AuthUser>;
  registerRestaurant: (data: Record<string, unknown>) => Promise<AuthUser>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function applyAuthResponse(res: AuthResponse, setUser: (u: AuthUser) => void) {
  setTokens(res.access, res.refresh);
  const user = { ...res.user, restaurant: res.restaurant };
  saveUser(user);
  setUser(user);
  return user;
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(getStoredUser);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      setLoading(false);
      return;
    }
    authApi
      .me()
      .then((u) => {
        saveUser(u);
        setUser(u);
      })
      .catch(() => {
        clearTokens();
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const res = await authApi.login(email, password);
    return applyAuthResponse(res, setUser);
  }, []);

  const register = useCallback(async (name: string, email: string, password: string) => {
    const res = await authApi.register({ name, email, password });
    return applyAuthResponse(res, setUser);
  }, []);

  const registerRestaurant = useCallback(async (data: Record<string, unknown>) => {
    const res = await authApi.registerRestaurant(data);
    return applyAuthResponse(res, setUser);
  }, []);

  const logout = useCallback(() => {
    clearTokens();
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        registerRestaurant,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
