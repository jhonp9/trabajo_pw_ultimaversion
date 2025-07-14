import { useEffect, useState } from 'react';
import CarritoSidebar from '../components/Carrito/CarritoSidebar';
import JuegosLista from '../components/Juegos/JuegosLista';
import Navbar from '../components/UI/Navbar';
import type { Juego } from '../types/juego';
import { apiClient } from '../api/client';

const TopRated = () => {
  const [ juegos, setLista ] = useState<Juego[]>([])
      
  const httpObtenerJuegos = async () => {
      const data = await apiClient('/api/games/', {
            method: 'GET',
          });
      setLista(data)
  }
  useEffect(() => {
    httpObtenerJuegos();
  }, []);
  // Ordenar por rating (de mayor a menor)
  const topRated = [...juegos]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 12); // Mostrar los 12 mejor valorados

  return (
    <div style={{ backgroundColor: '#0a0a0a', minHeight: '100vh' }}>
      <Navbar />
      <div className="top-rated-page">
        <div className="container">
          <h1 className="page-title">Mejores Valorados</h1>
          <div className="rating-criteria">
            <p>Juegos con mejor puntuación por nuestros usuarios</p>
            <div className="rating-info">
              <small>Basado en {juegos.reduce((sum, game) => sum + game.reviews.length, 0)} reseñas</small>
            </div>
          </div>
          <JuegosLista juegos={topRated} />
        </div>
      </div>
      <CarritoSidebar />
    </div>
  );
};

export default TopRated;