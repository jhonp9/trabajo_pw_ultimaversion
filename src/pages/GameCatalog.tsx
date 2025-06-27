import { useState } from 'react';
import JuegosLista from '../components/Juegos/JuegosLista';
import FilterSidebar from '../components/Filters/FilterSidebar';
import { gamesData } from '../data/gamesData';

import type { FilterState } from '../types/filter';
import Navbar from '../components/UI/Navbar';
import CarritoSidebar from '../components/Carrito/CarritoSidebar';

const GameCatalog = () => {

  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 100],
    genre: '',
    platform: '',
    rating: 0,
    oferta: ''
  });

  const filteredGames = gamesData.filter(game => {
    return (
      game.price >= filters.priceRange[0] &&
      game.price <= filters.priceRange[1] &&
      (filters.genre === '' || game.genres.includes(filters.genre)) &&
      (filters.platform === '' || game.platforms.includes(filters.platform)) &&
      (filters.oferta === '' || (filters.oferta === 'Si' && game.oferta === 'Si') ) &&
      (filters.rating === 0 || game.rating >= filters.rating)
    );
  });

  return (
    <div style={{ backgroundColor: '#0a0a0a' , minHeight: '100vh'}}>
    <Navbar />
    <div className="catalog-page">
      <div className="container">
        <h1 className="page-title">Catálogo de Juegos</h1>
        
        <div className="catalog-content">
          <FilterSidebar filters={filters} setFilters={setFilters} />
          
          <div className="games-section">
            <JuegosLista juegos={filteredGames} />
          </div>
        </div>
      </div>
    </div>
    <CarritoSidebar />
    </div>
  );
};

export default GameCatalog;