// AuthContext.tsx
import { createContext, useContext, useState, type ReactNode } from 'react';
import { usersData } from '../../data/usersData';
import type { Usuario } from '../../types/usuarios';

interface AuthContextType {
  user: Usuario | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  updateProfile: (newData: Partial<Usuario>) => void;
  register: (newUser: Omit<Usuario, 'id'>) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<Usuario | null>(null);
  const [users, setUsers] = useState<Usuario[]>(usersData);

  const login = (email: string, password: string) => {
    const foundUser = users.find(u => u.email === email && u.password === password);
    if (foundUser) {
      setUser(foundUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = (newData: Partial<Usuario>) => {
    if (user) {
      const updatedUser = { ...user, ...newData };
      setUser(updatedUser);
      
      // Actualizar en la lista de usuarios
      setUsers(users.map(u => u.email === user.email ? updatedUser : u));
    }
  };

  const register = (newUser: Omit<Usuario, 'id'>) => {
    if (users.some(u => u.email === newUser.email)) {
      return false; // Usuario ya existe
    }
    
    const userToAdd: Usuario = {
      ...newUser,
      role: 'user' // Por defecto todos son usuarios normales
    };
    
    setUsers([...users, userToAdd]);
    setUser(userToAdd);
    return true;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateProfile, register }}>
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