"use client";

import React from 'react';
import { useAuth } from '@/components/auth/use-auth';
import { LoginPage } from '@/components/auth/login';
import { AuthProvider } from '@/components/auth/auth-provider';
import { Dashboard } from '@/components/dashboard/dashboard';

const App: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const authenticated = isAuthenticated();
  
  if (!authenticated) {
    return <LoginPage />;
  } else {
    return <Dashboard />;
  }
};

const MainApp: React.FC = () => (
    <AuthProvider>
        <App />
    </AuthProvider>
);

export default MainApp;
