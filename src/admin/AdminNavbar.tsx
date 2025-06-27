import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../components/Auth/AuthContext';

const AdminNavbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="admin-navbar">
      <div className="admin-brand">
        <h3>GameHub Admin</h3>
      </div>
      <ul>
        <li><Link to="/admin">Dashboard</Link></li>
        <li><Link to="/admin/games">Juegos</Link></li>
        <li><Link to="/admin/users">Usuarios</Link></li>
        <li><Link to="/admin/news">Noticias</Link></li>
        <li><Link to="/admin/analytics">Analíticas</Link></li>
        <li><button onClick={handleLogout}>Cerrar Sesión</button></li>
      </ul>
    </nav>
  );
};

export default AdminNavbar;