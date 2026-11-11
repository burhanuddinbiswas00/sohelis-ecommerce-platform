import React, { createContext, useContext, useState, useEffect } from 'react';
import { login as apiLogin, getMe, setAuthToken } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('soheli_admin_token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('soheli_admin_token');
      if (storedToken) {
        try {
          setAuthToken(storedToken);
          const data = await getMe(storedToken);
          setUser(data.user);
          setToken(storedToken);
        } catch (error) {
          console.error('Session expired or invalid token:', error.message);
          logout();
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    const data = await apiLogin(email, password);
    const receivedToken = data.user.token;
    const userData = data.user;

    setToken(receivedToken);
    setUser(userData);
    localStorage.setItem('soheli_admin_token', receivedToken);
    setAuthToken(receivedToken);
    return userData;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('soheli_admin_token');
    setAuthToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated: !!token,
        isAdmin: user?.role === 'admin',
        login,
        logout,
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

