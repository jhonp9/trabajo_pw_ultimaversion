// AdminContext.tsx
import { createContext, useContext, type ReactNode } from 'react';
import type { Juego } from '../types/juego';
import type { Noticia } from '../types/noticia';
import type { Usuario } from '../types/usuarios';
import { useAuth } from '../components/Auth/AuthContext';

interface AdminContextType {
  juegos: Juego[];
  addJuego: (juego: Omit<Juego, 'id'>) => Promise<Juego | null>;
  updateJuego: (id: number, updatedJuego: Partial<Juego>) => Promise<Juego | null>;
  deleteJuego: (id: number) => Promise<boolean>;
  noticias: Noticia[];
  addNoticia: (noticia: Omit<Noticia, 'id' | 'fecha'>) => Promise<Noticia | null>;
  updateNoticia: (id: string, updatedNoticia: Partial<Noticia>) => Promise<Noticia | null>;
  deleteNoticia: (id: string) => Promise<boolean>;
  ventasPorMes: { mes: string; total: number }[];
  usuarios: Usuario[];
  addUsuario: (usuario: Omit<Usuario, 'id'>) => Promise<Usuario | null>;
  updateUsuario: (id: number, updatedUsuario: Partial<Usuario>) => Promise<Usuario | null>;
  deleteUsuario: (id: number) => Promise<boolean>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();

  const fetchJuegos = async (): Promise<Juego[]> => {
    try {
      const response = await fetch('http://localhost:5000/api/games');
      return await response.json();
    } catch (error) {
      console.error('Error fetching games:', error);
      return [];
    }
  };

  const addJuego = async (juego: Omit<Juego, 'id'>): Promise<Juego | null> => {
    try {
      const response = await fetch('http://localhost:5000/api/games', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user?.email}`
        },
        body: JSON.stringify(juego),
      });
      return await response.json();
    } catch (error) {
      console.error('Error adding game:', error);
      return null;
    }
  };

  const updateJuego = async (id: number, updatedJuego: Partial<Juego>): Promise<Juego | null> => {
    try {
      const response = await fetch(`http://localhost:5000/api/games/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user?.email}`
        },
        body: JSON.stringify(updatedJuego),
      });
      return await response.json();
    } catch (error) {
      console.error('Error updating game:', error);
      return null;
    }
  };

  const deleteJuego = async (id: number): Promise<boolean> => {
    try {
      const response = await fetch(`http://localhost:5000/api/games/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${user?.email}`
        },
      });
      return response.ok;
    } catch (error) {
      console.error('Error deleting game:', error);
      return false;
    }
  };

  const fetchNoticias = async (): Promise<Noticia[]> => {
    try {
      const response = await fetch('http://localhost:5000/api/news');
      return await response.json();
    } catch (error) {
      console.error('Error fetching news:', error);
      return [];
    }
  };

  const addNoticia = async (noticia: Omit<Noticia, 'id' | 'fecha'>): Promise<Noticia | null> => {
    try {
      const response = await fetch('http://localhost:5000/api/news', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user?.email}`
        },
        body: JSON.stringify(noticia),
      });
      return await response.json();
    } catch (error) {
      console.error('Error adding news:', error);
      return null;
    }
  };

  const updateNoticia = async (id: string, updatedNoticia: Partial<Noticia>): Promise<Noticia | null> => {
    try {
      const response = await fetch(`http://localhost:5000/api/news/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user?.email}`
        },
        body: JSON.stringify(updatedNoticia),
      });
      return await response.json();
    } catch (error) {
      console.error('Error updating news:', error);
      return null;
    }
  };

  const deleteNoticia = async (id: string): Promise<boolean> => {
    try {
      const response = await fetch(`http://localhost:5000/api/news/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${user?.email}`
        },
      });
      return response.ok;
    } catch (error) {
      console.error('Error deleting news:', error);
      return false;
    }
  };

  const fetchUsuarios = async (): Promise<Usuario[]> => {
    try {
      const response = await fetch('http://localhost:5000/api/users', {
        headers: {
          'Authorization': `Bearer ${user?.email}`
        },
      });
      return await response.json();
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
  };

  const addUsuario = async (usuario: Omit<Usuario, 'id'>): Promise<Usuario | null> => {
    try {
      const response = await fetch('http://localhost:5000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user?.email}`
        },
        body: JSON.stringify(usuario),
      });
      return await response.json();
    } catch (error) {
      console.error('Error adding user:', error);
      return null;
    }
  };

  const updateUsuario = async (id: number, updatedUsuario: Partial<Usuario>): Promise<Usuario | null> => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user?.email}`
        },
        body: JSON.stringify(updatedUsuario),
      });
      return await response.json();
    } catch (error) {
      console.error('Error updating usuario:', error);
      return null;
    }
  };
  // AdminContext.tsx (continuación)
  const deleteUsuario = async (id: number): Promise<boolean> => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${user?.email}`
        },
      });
      return response.ok;
    } catch (error) {
      console.error('Error deleting user:', error);
      return false;
    }
  };

  // Datos simulados para ventas por mes (en un caso real, esto vendría del backend)
  const ventasPorMes = [
    { mes: 'Enero', total: 12000 },
    { mes: 'Febrero', total: 18000 },
    { mes: 'Marzo', total: 15000 },
    { mes: 'Abril', total: 21000 },
    { mes: 'Mayo', total: 19000 },
    { mes: 'Junio', total: 22000 },
  ];

  return (
    <AdminContext.Provider
      value={{
        juegos: [], // Se cargarán dinámicamente
        addJuego,
        updateJuego,
        deleteJuego,
        noticias: [], // Se cargarán dinámicamente
        addNoticia,
        updateNoticia,
        deleteNoticia,
        ventasPorMes,
        usuarios: [], // Se cargarán dinámicamente
        addUsuario,
        updateUsuario,
        deleteUsuario,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};