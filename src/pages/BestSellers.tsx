import JuegosLista from '../components/Juegos/JuegosLista';
import Navbar from '../components/UI/Navbar';
import { gamesData } from '../data/gamesData';

const BestSellers = () => {
  const bestSellers = [...gamesData]
    .sort((a, b) => b.sales - a.sales)
    .slice(0, 12);

  return (
    <div style={{ backgroundColor: '#0a0a0a' , minHeight: '100vh'}}>
    <div className="best-sellers-page">
      <div className="container">
        <Navbar />
        <h1 className="page-title">Juegos Más Vendidos</h1>
        <JuegosLista juegos={bestSellers} />
      </div>
    </div>
    </div>
  );
};

export default BestSellers;