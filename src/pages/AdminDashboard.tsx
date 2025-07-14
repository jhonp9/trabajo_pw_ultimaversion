import { useAuth } from '../components/Auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect, type ReactNode } from 'react';

type AdminDashboardProps = {
  children: ReactNode;
};

const AdminDashboard = ({ children }: AdminDashboardProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role !== 'admin') {
      navigate('/');
    }
  }, [user, navigate]);

  if (user?.role !== 'admin') {
    return null;
  }

  return (
    <div className="admin-layout">
      <div className="admin-navbar">
        <h2 className="text-center mb-4">Panel de Admin</h2>
        <ul>
          <li><button onClick={() => navigate('/admin/juegos')}>Juegos</button></li>
          <li><button onClick={() => navigate('/admin/noticias')}>Noticias</button></li>
          <li><button onClick={() => navigate('/admin/usuarios')}>Usuarios</button></li>
          <li><button onClick={() => navigate('/admin/ventas')}>Ventas</button></li>
          <li><button onClick={() => navigate('/admin/perfil')}>Mi Perfil</button></li>
        </ul>
        <button className="btn btn-login w-100" onClick={() => {navigate('/');} }> Volver </button>
        <button className="btn btn-login w-100" onClick={() => {navigate('/login');} }> Cerrar sesion </button>
      </div>
      <div className="admin-content">
        {children}
      </div>
    </div>
  );
};

export default AdminDashboard;