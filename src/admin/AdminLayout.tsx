import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../components/Auth/AuthContext';
import AdminNavbar from './AdminNavbar';

const AdminLayout = () => {
  const { user } = useAuth();

  if (!user || user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="admin-layout">
      <AdminNavbar />
      <div className="admin-content">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;