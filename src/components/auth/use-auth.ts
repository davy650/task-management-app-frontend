import { createContext, useContext, useEffect, useState } from "react";
import { AuthContextType, User } from "../../utils/definitions";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { useAuth, AuthContext }