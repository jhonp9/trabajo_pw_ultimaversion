import { Routes, Route, BrowserRouter} from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import MainPage from './pages/MainPage';
import GameCatalog from './pages/GameCatalog';
import BestSellers from './pages/BestSellers';
import TopRated from './pages/TopRated';
import { Login } from './pages/Login';
import  Register  from './pages/Register';
import { VerifyWithEmail } from './pages/VerifyWithEmail';
import { VerifyUser } from './pages/VerifyUser';
import { ResetPassword } from './pages/ResetPassword';
import  ForgotPassword  from './pages/ForgotPassword';
import ProfilePage from './pages/Perfil';
import MyGamesPage from './pages/MisJuegos';
import SearchPage from './pages/Search';
import NoticiasPage from './pages/NoticiasPage';
import AdminNoticias from './admin/AdminNoticias';
import AdminUsuarios from './admin/AdminUsuarios';
import AdminVentas from './admin/AdminVentas';
import  AdminJuegos  from './admin/AdminJuegos';
import AdminPerfil from './pages/AdminPerfil';
import { ProtectedRoute } from './components/Auth/ProtectedRoute';
function App() {
  return (
    <CartProvider>
      <BrowserRouter basename='/trabajo_pw_ultimaversion'>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/categorias" element={<GameCatalog />} />
          <Route path="/juegos-mas-vendidos" element={<BestSellers />} />
          <Route path="/mejores-valorados" element={<TopRated />} />
          <Route path="/login" element={<Login />} />
          <Route path="/perfil" element={<ProfilePage />} />
          <Route path="/mis-juegos" element={<MyGamesPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-with-email" element={<VerifyWithEmail />} />
          <Route path="/verify-user" element={<VerifyUser />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/busqueda" element={<SearchPage />} />
          <Route path="/noticias" element={<NoticiasPage />} />
          <Route 
            path="/admin/juegos" 
            element={
              <ProtectedRoute adminOnly>
                <AdminJuegos />
              </ProtectedRoute>
            } 
          />
          <Route path="/admin/noticias" element={<AdminNoticias />} />
          <Route path="/admin/usuarios" element={<AdminUsuarios />} />
          <Route path="/admin/ventas" element={<AdminVentas />} />
          <Route path="/admin/perfil" element={<AdminPerfil />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;