import { createContext, useContext, useState, type ReactNode } from 'react';

interface User {
  email: string;
  name: string;
  role: string;
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
    if ((email === 'usuario' && password === 'usuario') || 
        (email === 'admin' && password === 'admin')) {
      setUser({
        email,
        name: email === 'admin' ? 'Administrador' : 'Usuario',
        role: email === 'admin' ? 'admin' : 'user'
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