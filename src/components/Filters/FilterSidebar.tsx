import type { FilterProps } from '../../types/filter';

const FilterSidebar = ({ filters, setFilters }: FilterProps) => {
  const genres = ['Aventura', 'RPG', 'Shooter', 'Estrategia', 'Deportes'];
  const platforms = ['PC', 'PlayStation', 'Xbox', 'Nintendo'];
  const oferta = ["Si"];

  return (
    <div className="filter-sidebar">
      <div className="filter-group">
        <h3>Precio</h3>
        <div className="price-range">
          <span>${filters.priceRange[0]} - ${filters.priceRange[1]}</span>
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={filters.priceRange[1]} 
            onChange={(e) => setFilters({
              ...filters, 
              priceRange: [filters.priceRange[0], parseInt(e.target.value)]
            })}
          />
        </div>
      </div>

      <div className="filter-group">
        <h3>Género</h3>
        <select 
          value={filters.genre}
          onChange={(e) => setFilters({...filters, genre: e.target.value})}
        >
          <option value="">Todos</option>
          {genres.map(genre => (
            <option key={genre} value={genre}>{genre}</option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <h3>Plataforma</h3>
        {platforms.map(platform => (
          <div key={platform} className="checkbox-item">
            <input
              type="checkbox"
              id={platform}
              checked={filters.platform === platform}
              onChange={() => setFilters({
                ...filters,
                platform: filters.platform === platform ? '' : platform
              })}
            />
            <label htmlFor={platform}>{platform}</label>
          </div>
        ))}
      </div>

      <div className="filter-group">
        <h3>Mostrar ofertas</h3>
        {oferta.map(oferta => (
          <div key={oferta} className="checkbox-item">
            <input
              type="checkbox"
              id={oferta}
              checked={filters.oferta === oferta}
              onChange={() => setFilters({
                ...filters,
                oferta: filters.oferta === oferta ? '' : oferta
              })}
            />
            <label htmlFor={oferta}>{oferta}</label>
          </div>
        ))}
      </div>


      <div className="filter-group">
        <h3>Valoración mínima</h3>
        <div className="rating-filter">
          {[1, 2, 3, 4, 5].map(star => (
            <span 
              key={star}
              className={star <= filters.rating ? 'active' : ''}
              onClick={() => setFilters({
                ...filters,
                rating: filters.rating === star ? 0 : star
              })}
            >
              ★
            </span>
          ))}
        </div>
      </div>

      <button 
        className="btn btn-clear"
        onClick={() => setFilters({
          priceRange: [0, 100],
          genre: '',
          platform: '',
          rating: 0,
          oferta: ''
        })}
      >
        Limpiar Filtros
      </button>
    </div>
  );
};

export default FilterSidebar;