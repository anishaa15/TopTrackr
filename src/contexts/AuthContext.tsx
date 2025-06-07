
import { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  username: string;
  role: 'teacher' | 'student';
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string, role: 'teacher' | 'student') => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo users for testing
const demoUsers = [
  { id: '1', username: 'teacher1', password: 'password', role: 'teacher' as const, name: 'Prof. Sarah Johnson' },
  { id: '2', username: 'student1', password: 'password', role: 'student' as const, name: 'Alex Chen' },
  { id: '3', username: 'student2', password: 'password', role: 'student' as const, name: 'Maria Rodriguez' },
  { id: '4', username: 'student3', password: 'password', role: 'student' as const, name: 'James Wilson' },
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (username: string, password: string, role: 'teacher' | 'student') => {
    const foundUser = demoUsers.find(
      u => u.username === username && u.password === password && u.role === role
    );
    
    if (foundUser) {
      setUser({
        id: foundUser.id,
        username: foundUser.username,
        role: foundUser.role,
        name: foundUser.name
      });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
