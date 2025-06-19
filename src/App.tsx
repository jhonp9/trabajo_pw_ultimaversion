import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import MainPage from './pages/MainPage';
import GameCatalog from './pages/GameCatalog';
import BestSellers from './pages/BestSellers';
import TopRated from './pages/TopRated';

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/categorias" element={<GameCatalog />} />
          <Route path="/juegos-mas-vendidos" element={<BestSellers />} />
          <Route path="/mejores-valorados" element={<TopRated />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;