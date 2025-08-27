import { useState } from "react";

const AuthForm: React.FC<{ isLogin: boolean; onLogin: (data: any) => void; onRegister: (data: any) => void }> = ({ isLogin, onLogin, onRegister }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      if (!username || !password) {
        setError('Username/ password is required.');
        return;
      }
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/Auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Login failed.');
        }
        const data = await response.json();
        onLogin(data);
      } catch (err: any) {
        setError(err.message);
      }
    } else {
      if (!username || !email || !password) {
        setError('All fields are required.');
        return;
      }
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/Auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, email, password }),
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Registration failed.');
        }
        const data = await response.json();
        onRegister(data);
      } catch (err: any) {
        setError(err.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold text-center">{isLogin ? 'Login' : 'Register'}</h2>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <div>
        <label className="block text-sm font-medium text-gray-700">Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      {!isLogin && (
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      )}
      <div>
        <label className="block text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
      >
        {isLogin ? 'Login' : 'Register'}
      </button>
    </form>
  );
};

export { AuthForm }