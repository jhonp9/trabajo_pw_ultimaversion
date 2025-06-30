import { useState } from 'react';
import JuegosLista from '../components/Juegos/JuegosLista';
import FilterSidebar from '../components/Filters/FilterSidebar';
import type { FilterState } from '../types/filter';
import Navbar from '../components/UI/Navbar';
import CarritoSidebar from '../components/Carrito/CarritoSidebar';
import type { Juego } from '../types/juego';

const URL = "http://localhost:5000" // URL Base

const GameCatalog = () => {

  const [ lista, setLista ] = useState<Juego[]>([])
      
      const httpObtenerTODOs = async () => {
            const response = await fetch(`${URL}/`)
            const data = await response.json()
            setLista(data)
        }

  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 100],
    genre: '',
    platform: '',
    rating: 0,
    oferta: ''
  });

  const filteredGames = lista.filter(game => {
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
      <div className="">
        <h1 className="page-title">Catálogo de Juegos</h1>
        
        <div className="catalog-content row">
          <div  className="col-md-2">
            <FilterSidebar filters={filters} setFilters={setFilters} />
          </div>
          <div className="col-md-8">
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