"use client";
import { useState } from "react";

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const [isLoginMode, setIsLoginMode] = useState(true);

  const handleAuthSuccess = (data: any) => {
    // Assuming the API returns a user object on registration for immediate login
    login(data.token, data.user || data);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <AuthForm
          isLogin={isLoginMode}
          onLogin={handleAuthSuccess}
          onRegister={handleAuthSuccess}
        />
        <button
          onClick={() => setIsLoginMode(!isLoginMode)}
          className="mt-4 w-full text-center text-sm text-blue-600 hover:text-blue-800 transition-colors"
        >
          {isLoginMode ? 'Need to create an account? Register' : 'Already have an account? Login'}
        </button>
      </div>
    </div>
  );
};