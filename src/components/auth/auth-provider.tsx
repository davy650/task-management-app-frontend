"use-client";
import { User } from "@/utils/definitions";
import { useEffect, useState } from "react";
import { AuthContext } from "./use-auth";

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (newToken: string, newUser: User) => {
    setToken(newToken);
    setUser(newUser);
    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const register = (newUser: User) => {
    setUser(newUser);
  };

  const isAuthenticated = () => !!token;

  return (
    <AuthContext.Provider value={{ token, user, login, logout, register, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider }
