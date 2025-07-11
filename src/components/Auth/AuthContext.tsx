// AuthContext.tsx
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { Usuario } from '../../types/usuarios';
import { apiClient } from '../../api/client';

interface AuthContextType {
  user: Usuario | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (newData: Partial<Usuario>) => Promise<boolean>;
  register: (newUser: Omit<Usuario, 'id'>) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<Usuario | null>(null);

  const login = async (email: string, password: string) => {
  try {
    const data = await apiClient('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      credentials: 'include' // Para manejar cookies
    });

    setUser({
      ...data.user,
      role: data.user.role.toLowerCase() as 'user' | 'admin'
    });
    return true;
  } catch (error) {
    console.error('Login error:', error);
    return false;
  }
};

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
  };

  const updateProfile = async (newData: Partial<Usuario>) => {
    if (!user) return false;
    
    try {
      const response = await fetch(`http://localhost:5000/api/users/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.email}` // Simulación básica
        },
        body: JSON.stringify(newData),
      });
      
      if (!response.ok) {
        return false;
      }
      
      const updatedUser = await response.json();
      setUser(updatedUser);
      return true;
    } catch (error) {
      console.error('Update profile error:', error);
      return false;
    }
  };

  const register = async (newUser: Omit<Usuario, 'id'>) => {
  try {
    const data = await apiClient('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        ...newUser,
        role: 'user' // Asegura que coincida con el backend
      }),
      credentials: 'include'
    });

    setUser({
      ...data.user,
      role: data.user.role.toLowerCase() as 'user' | 'admin'
    });
    return true;
  } catch (error) {
    console.error('Registration error:', error);
    return false;
  }
};

  useEffect(() => {
  const token = localStorage.getItem('authToken');
  if (token) {
    // Verificar token y cargar usuario
    apiClient('/api/auth/me')
      .then(user => setUser(user))
      .catch(() => logout());
  }
}, []);

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