import type { Juego } from '../../types/juego';
import { useNavigate } from 'react-router-dom';

interface SearchResultsProps {
  results: Juego[];
  onSelect: (juego: Juego) => void;
  query: string;
}

const SearchResults = ({ results, onSelect, query }: SearchResultsProps) => {
  const navigate = useNavigate();

  if (results.length === 0 && query) {
    return (
      <div className="search-results">
        <div className="no-results">
          No se encontraron juegos para "{query}"
        </div>
      </div>
    );
  }

  return (
    <div className="search-results">
      {results.map((juego) => (
        <div 
          key={juego.id} 
          className="search-item"
          onClick={() => {
            onSelect(juego);
            navigate(`/juego/${juego.id}`);
          }}
        >
          <img src={juego.images[0]} alt={juego.title} className="search-item-img" />
          <div className="search-item-info">
            <h5>{juego.title}</h5>
            <div className="search-item-price">${juego.price.toFixed(2)}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;