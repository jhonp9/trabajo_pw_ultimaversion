// AdminContext.tsx
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { Juego } from '../types/juego';
import type { Noticia } from '../types/noticia';
import type { Usuario } from '../types/usuarios';
import { useAuth } from '../components/Auth/AuthContext';
import { apiClient } from '../api/client';

interface AdminContextType {
  juegos: Juego[];
  noticias: Noticia[];
  usuarios: Usuario[];
  ventasPorMes: { mes: string; total: number }[];
  loading: boolean;
  error: string | null;
  addJuego: (juego: Omit<Juego, 'id'>) => Promise<Juego | null>;
  updateJuego: (id: number, juego: Partial<Juego>) => Promise<Juego | null>;
  deleteJuego: (id: number) => Promise<boolean>;
  addNoticia: (noticia: Omit<Noticia, 'id' | 'fecha'>) => Promise<Noticia | null>;
  updateNoticia: (id: string, noticia: Partial<Noticia>) => Promise<Noticia | null>;
  deleteNoticia: (id: string) => Promise<boolean>;
  addUsuario: (usuario: Omit<Usuario, 'id'>) => Promise<Usuario | null>;
  updateUsuario: (id: number, usuario: Partial<Usuario>) => Promise<Usuario | null>;
  deleteUsuario: (id: number) => Promise<boolean>;
  refreshData: () => Promise<void>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [juegos, setJuegos] = useState<Juego[]>([]);
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Datos simulados para ventas (en producción vendría del backend)
  const ventasPorMes = [
    { mes: 'Enero', total: 12000 },
    { mes: 'Febrero', total: 18000 },
    { mes: 'Marzo', total: 15000 },
    { mes: 'Abril', total: 21000 },
    { mes: 'Mayo', total: 19000 },
    { mes: 'Junio', total: 22000 },
  ];

  const fetchInitialData = async () => {
    if (user?.role !== 'admin') return;
    
    setLoading(true);
    setError(null);
    
    try {
      const [gamesRes, newsRes, usersRes] = await Promise.all([
        apiClient('/api/games'),
        apiClient('/api/news'),
        apiClient('/api/users')
      ]);
      
      setJuegos(gamesRes);
      setNoticias(newsRes);
      setUsuarios(usersRes);
    } catch (err) {
      console.error('Error loading initial data:', err);
      setError('Error al cargar los datos. Por favor intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  const fetchNoticias = async (): Promise<Noticia[]> => {
  try {
    const response = await apiClient('/api/news');
    return response.map((n: any) => ({
      id: n.id,
      title: n.title,
      content: n.content,
      date: n.date,
      image: n.image,
      author: n.author
    }));
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
};

  // Cargar datos iniciales
  useEffect(() => {
    fetchInitialData();
    fetchNoticias();
  }, [user]);

  // Juegos CRUD
  const addJuego = async (juegoData: Omit<Juego, 'id'>): Promise<Juego | null> => {
    try {
      const newJuego = await apiClient('/api/games', {
        method: 'POST',
        body: JSON.stringify(juegoData)
      });
      setJuegos(prev => [...prev, newJuego]);
      return newJuego;
    } catch (err) {
      console.error('Error adding game:', err);
      throw new Error('Error al agregar el juego');
    }
  };

  const updateJuego = async (id: number, juegoData: Partial<Juego>): Promise<Juego | null> => {
    try {
      const updatedJuego = await apiClient(`/api/games/${id}`, {
        method: 'PUT',
        body: JSON.stringify(juegoData)
      });
      setJuegos(prev => prev.map(j => j.id === id ? updatedJuego : j));
      return updatedJuego;
    } catch (err) {
      console.error('Error updating game:', err);
      throw new Error('Error al actualizar el juego');
    }
  };

  const deleteJuego = async (id: number): Promise<boolean> => {
    try {
      await apiClient(`/api/games/${id}`, {
        method: 'DELETE'
      });
      setJuegos(prev => prev.filter(j => j.id !== id));
      return true;
    } catch (err) {
      console.error('Error deleting game:', err);
      throw new Error('Error al eliminar el juego');
    }
  };

  // Noticias CRUD
  const addNoticia = async (noticiaData: Omit<Noticia, 'id' | 'fecha'>): Promise<Noticia | null> => {
    try {
      const newNoticia = await apiClient('/api/news', {
        method: 'POST',
        body: JSON.stringify({
          ...noticiaData,
          autor: user?.name || 'Admin'
        })
      });
      setNoticias(prev => [...prev, newNoticia]);
      return newNoticia;
    } catch (err) {
      console.error('Error adding news:', err);
      throw new Error('Error al agregar la noticia');
    }
  };

  const updateNoticia = async (id: string, noticiaData: Partial<Noticia>): Promise<Noticia | null> => {
    try {
      const updatedNoticia = await apiClient(`/api/news/${id}`, {
        method: 'PUT',
        body: JSON.stringify(noticiaData)
      });
      setNoticias(prev => prev.map(n => n.id === id ? updatedNoticia : n));
      return updatedNoticia;
    } catch (err) {
      console.error('Error updating news:', err);
      throw new Error('Error al actualizar la noticia');
    }
  };

  const deleteNoticia = async (id: string): Promise<boolean> => {
    try {
      await apiClient(`/api/news/${id}`, {
        method: 'DELETE'
      });
      setNoticias(prev => prev.filter(n => n.id !== id));
      return true;
    } catch (err) {
      console.error('Error deleting news:', err);
      throw new Error('Error al eliminar la noticia');
    }
  };

  // Usuarios CRUD
  const addUsuario = async (usuarioData: Omit<Usuario, 'id'>): Promise<Usuario | null> => {
    try {
      const newUsuario = await apiClient('/api/users', {
        method: 'POST',
        body: JSON.stringify(usuarioData)
      });
      setUsuarios(prev => [...prev, newUsuario]);
      return newUsuario;
    } catch (err) {
      console.error('Error adding user:', err);
      throw new Error('Error al agregar el usuario');
    }
  };

  const updateUsuario = async (id: number, usuarioData: Partial<Usuario>): Promise<Usuario | null> => {
    try {
      const updatedUsuario = await apiClient(`/api/users/${id}`, {
        method: 'PUT',
        body: JSON.stringify(usuarioData)
      });
      setUsuarios(prev => prev.map(u => u.id === id ? updatedUsuario : u));
      return updatedUsuario;
    } catch (err) {
      console.error('Error updating user:', err);
      throw new Error('Error al actualizar el usuario');
    }
  };

  const deleteUsuario = async (id: number): Promise<boolean> => {
    try {
      await apiClient(`/api/users/${id}`, {
        method: 'DELETE'
      });
      setUsuarios(prev => prev.filter(u => u.id !== id));
      return true;
    } catch (err) {
      console.error('Error deleting user:', err);
      throw new Error('Error al eliminar el usuario');
    }
  };

  // Función para refrescar todos los datos
  const refreshData = async () => {
    await fetchInitialData();
  };

  return (
    <AdminContext.Provider
      value={{
        juegos,
        noticias,
        usuarios,
        ventasPorMes,
        loading,
        error,
        addJuego,
        updateJuego,
        deleteJuego,
        addNoticia,
        updateNoticia,
        deleteNoticia,
        addUsuario,
        updateUsuario,
        deleteUsuario,
        refreshData
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