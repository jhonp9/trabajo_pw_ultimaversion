import { Link } from 'react-router-dom';
import DataChart from '../components/admin/DataChart';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1>Panel de Administración</h1>
      <div className="admin-cards">
        <Link to="/admin/games" className="admin-card">
          <h3>Juegos</h3>
          <p>Administrar catálogo</p>
        </Link>
        <Link to="/admin/users" className="admin-card">
          <h3>Usuarios</h3>
          <p>Gestionar usuarios</p>
        </Link>
        <Link to="/admin/news" className="admin-card">
          <h3>Noticias</h3>
          <p>Publicar noticias</p>
        </Link>
      </div>
      <div className="admin-analytics">
        <DataChart />
      </div>
    </div>
  );
};

export default Dashboard;