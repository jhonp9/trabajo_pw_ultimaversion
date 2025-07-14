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
      const response = await apiClient('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        credentials: 'include'
      });

      if (!response.success) {
        return false;
      }

      setUser({
        ...response.user,
        role: response.user.role.toLowerCase() as 'user' | 'admin'
      });

      // Guardar token en localStorage
      localStorage.setItem('authToken', response.token || '');
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
    apiClient('/api/auth/logout', { method: 'POST' }).catch(console.error);
  };

  const updateProfile = async (newData: Partial<Usuario>) => {
    if (!user) return false;
    
    try {
      const response = await apiClient(`/api/users/${user.id}`, {
        method: 'PUT',
        body: JSON.stringify(newData),
        credentials: 'include'
      });
      
      if (response) {
        setUser({ ...user, ...newData });
        return true;
      }
      return false;
    } catch (error) {
      console.error('Update profile error:', error);
      return false;
    }
  };

  const register = async (newUser: Omit<Usuario, 'id'>) => {
    try {
      const response = await apiClient('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          ...newUser,
          role: 'user'
        }),
        credentials: 'include'
      });

      if (response.success) {
        setUser({
          ...response.user,
          role: response.user.role.toLowerCase() as 'user' | 'admin'
        });
        localStorage.setItem('authToken', response.token || '');
        return true;
      }
      return false;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      apiClient('/api/auth/me')
        .then(userData => {
          setUser({
            ...userData,
            role: userData.role.toLowerCase() as 'user' | 'admin'
          });
        })
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