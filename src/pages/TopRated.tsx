import CarritoSidebar from '../components/Carrito/CarritoSidebar';
import JuegosLista from '../components/Juegos/JuegosLista';
import Navbar from '../components/UI/Navbar';
import { gamesData } from '../data/gamesData';

const TopRated = () => {
  const topRated = [...gamesData]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 12);

  return (
    <div style={{ backgroundColor: '#0a0a0a' , minHeight: '100vh'}}>
      <Navbar />
    <div className="top-rated-page">
      <div className="container">
        
        <h1 className="page-title">Mejores Valorados</h1>
        <div className="rating-criteria">
          <p>Juegos con mejor puntuación por nuestros usuarios</p>
        </div>
        <JuegosLista juegos={topRated} />
      </div>
    </div>
    <CarritoSidebar />
    </div>
  );
};

export default TopRated;