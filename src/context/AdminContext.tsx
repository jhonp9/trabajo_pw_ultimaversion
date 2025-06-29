import { createContext, useContext, useState, type ReactNode, useEffect } from 'react';
import type { Juego, Review } from '../types/juego';
import type { Noticia } from '../types/noticia';
import { gamesData } from '../data/gamesData';
import { noticiasData } from '../data/noticiasData';
import type { Usuario } from '../types/usuarios';
import { usersData } from '../data/usersData';

// AdminContext.tsx
const loadGamesData = () => {
  const savedData = localStorage.getItem('gamesData');
  return savedData ? JSON.parse(savedData) : gamesData;
};

// Función para cargar noticias guardadas
const loadNoticiasData = () => {
  const savedData = localStorage.getItem('noticiasData');
  return savedData ? JSON.parse(savedData) : noticiasData;
};

// Función para guardar datos
const saveGamesData = (data: any) => {
  localStorage.setItem('gamesData', JSON.stringify(data));
};

const saveGamesUser = (data: any) => {
  localStorage.setItem('usersData', JSON.stringify(data));
};

const saveNoticiasData = (data: any) => {
  localStorage.setItem('noticiasData', JSON.stringify(data));
};


interface AdminContextType {
  juegos: Juego[];
  addJuego: (juego: Omit<Juego, 'id'>) => void;
  updateJuego: (id: number, updatedJuego: Partial<Juego>) => void;
  deleteJuego: (id: number) => void;
  noticias: Noticia[];
  addNoticia: (noticia: Omit<Noticia, 'id' | 'fecha'>) => void;
  updateNoticia: (id: string, updatedNoticia: Partial<Noticia>) => void;
  deleteNoticia: (id: string) => void;
  ventasPorMes: { mes: string; total: number }[];
  usuarios: Usuario[];
  addUsuario: (usuario: Omit<Usuario, 'id'>) => void;
  updateUsuario: (email: string, updatedUsuario: Partial<Usuario>) => void;
  deleteUsuario: (email: string) => void;
  loadInitialData: () => void;
  resetData: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [juegos, setJuegos] = useState<Juego[]>(loadGamesData());
  const [noticias, setNoticias] = useState<Noticia[]>(loadNoticiasData());
  const [usuarios, setUsuarios] = useState<Usuario[]>(usersData);
  
  // Carga inicial de datos
  useEffect(() => {
    setJuegos(loadGamesData());
    setNoticias(loadNoticiasData());
    
    // Simular carga de usuarios
    setUsuarios([
      { email: 'admin@example.com', name: 'Admin', role: 'admin' },
      { email: 'user1@example.com', name: 'Usuario 1', role: 'user' },
      { email: 'user2@example.com', name: 'Usuario 2', role: 'user' },
    ]);
  }, []);

  const resetData = () => {
  localStorage.removeItem('gamesData');
  localStorage.removeItem('noticiasData');
  setJuegos(gamesData);
  setNoticias(noticiasData);
};

  // Simular datos de ventas por mes
  const ventasPorMes = [
    { mes: 'Enero', total: 12000 },
    { mes: 'Febrero', total: 18000 },
    { mes: 'Marzo', total: 15000 },
    { mes: 'Abril', total: 21000 },
    { mes: 'Mayo', total: 19000 },
    { mes: 'Junio', total: 22000 },
  ];

  const loadInitialData = () => {
    setJuegos(loadGamesData());
  };

  const addUsuario = (usuario: Omit<Usuario, 'id'>) => {
    const newUsuario: Usuario = {
      ...usuario,
    };
    const updatedUsuario = [...usuarios, newUsuario];
    setUsuarios(updatedUsuario);
    saveGamesUser(updatedUsuario);
  };

  const updateUsuario = (email: string, updatedUsuario: Partial<Usuario>) => {
    setUsuarios(usuarios.map(u => u.email === email ? { ...u, ...updatedUsuario } : u));
  };

  const deleteUsuario = (email: string) => {
    setUsuarios(usuarios.filter(u => u.email !== email));
  };

  const addJuego = (juego: Omit<Juego, 'id'>) => {
    const newId = Math.max(...juegos.map(j => j.id), 0) + 1;
    const newJuego: Juego = {
      ...juego,
      id: newId,
      reviews: [],
      sales: 0
    };
    const updatedJuegos = [...juegos, newJuego];
    setJuegos(updatedJuegos);
    saveGamesData(updatedJuegos);
  };

  const updateJuego = (id: number, updatedJuego: Partial<Juego>) => {
    const updatedJuegos = juegos.map(juego => 
      juego.id === id ? { ...juego, ...updatedJuego } : juego
    );
    setJuegos(updatedJuegos);
    saveGamesData(updatedJuegos);
  };

  const deleteJuego = (id: number) => {
    const updatedJuegos = juegos.filter(juego => juego.id !== id);
    setJuegos(updatedJuegos);
    saveGamesData(updatedJuegos);
  };

  const addNoticia = (noticia: Omit<Noticia, 'id' | 'fecha'>) => {
  const newNoticia: Noticia = {
    ...noticia,
    id: Date.now().toString(),
    fecha: new Date().toLocaleDateString()
  };
  const updatedNoticias = [...noticias, newNoticia];
  setNoticias(updatedNoticias);
  saveNoticiasData(updatedNoticias);
};

const updateNoticia = (id: string, updatedNoticia: Partial<Noticia>) => {
  const updatedNoticias = noticias.map(noticia => 
    noticia.id === id ? { ...noticia, ...updatedNoticia } : noticia
  );
  setNoticias(updatedNoticias);
  saveNoticiasData(updatedNoticias);
};

const deleteNoticia = (id: string) => {
  const updatedNoticias = noticias.filter(noticia => noticia.id !== id);
  setNoticias(updatedNoticias);
  saveNoticiasData(updatedNoticias);
};

  // Simular carga de usuarios
  useEffect(() => {
    // En una app real, esto vendría de una API
    setUsuarios([
      { email: 'admin@example.com', name: 'Admin', role: 'admin' },
      { email: 'user1@example.com', name: 'Usuario 1', role: 'user' },
      { email: 'user2@example.com', name: 'Usuario 2', role: 'user' },
    ]);
  }, []);

  return (
    <AdminContext.Provider value={{
      juegos,
      addJuego,
      updateJuego,
      deleteJuego,
      noticias,
      addNoticia,
      updateNoticia,
      deleteNoticia,
      ventasPorMes,
      usuarios,
      loadInitialData,
      resetData,
      addUsuario,
      updateUsuario,
      deleteUsuario
    }}>
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