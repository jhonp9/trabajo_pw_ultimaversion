import { BrowserRouter as Router } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import MainPage from './pages/MainPage';

function App() {
  return (
    <Router>
      <CartProvider>
        <MainPage />
      </CartProvider>
    </Router>
  );
}

export default App;