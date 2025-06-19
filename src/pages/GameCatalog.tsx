import { useState } from 'react';
import JuegosLista from '../components/Juegos/JuegosLista';
import FilterSidebar from '../components/Filters/FilterSidebar';
import { gamesData } from '../data/gamesData';

import type { FilterState } from '../types/filter';
import Navbar from '../components/UI/Navbar';

const GameCatalog = () => {

  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 100],
    genre: '',
    platform: '',
    rating: 0
  });

  const filteredGames = gamesData.filter(game => {
    return (
      game.price >= filters.priceRange[0] &&
      game.price <= filters.priceRange[1] &&
      (filters.genre === '' || game.genres.includes(filters.genre)) &&
      (filters.rating === 0 || game.rating >= filters.rating)
    );
  });

  return (
    <div style={{ backgroundColor: '#0a0a0a' , minHeight: '100vh'}}>
    <div className="catalog-page">
      <div className="container">
        <Navbar />
        <h1 className="page-title">Catálogo de Juegos</h1>
        
        <div className="catalog-content">
          <FilterSidebar filters={filters} setFilters={setFilters} />
          
          <div className="games-section">
            <JuegosLista juegos={filteredGames} />
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default GameCatalog;