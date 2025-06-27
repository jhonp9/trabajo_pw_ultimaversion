import { createContext, useContext, useState, type ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  createdAt: Date;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  updateProfile: (newData: {name?: string, email?: string, password?: string}) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string) => {
    // Lógica de autenticación (simplificada)
    if (email === 'usuario' && password === 'usuario') {
      setUser({
        id: 'user-1',
        email,
        name: 'Usuario',
        role: 'user',
        createdAt: new Date()
      });
      return true;
    }
    if (email === 'admin@gamehub.com' && password === 'admin123') {
      setUser({
        id: 'admin-1',
        name: 'Administrador',
        email,
        role: 'admin',
        createdAt: new Date()
      });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = (newData: {name?: string, email?: string, password?: string}) => {
    if (user) {
      setUser({
        ...user,
        name: newData.name || user.name,
        email: newData.email || user.email
      });
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateProfile }}>
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