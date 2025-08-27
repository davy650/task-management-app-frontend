export interface User {
  id: number;
  username: string;
  email: string;
  role: string;
}

export interface AuthContextType {
  token: string | null;
  user: User | null;
  login: (token: string, user: User) => void;
  logout: () => void;
  register: (user: User) => void;
  isAuthenticated: () => boolean;
}