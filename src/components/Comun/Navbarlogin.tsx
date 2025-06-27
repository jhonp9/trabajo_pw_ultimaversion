import { Link } from 'react-router-dom';

const Navbarlogin = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-transparent py-3">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img 
            src="https://via.placeholder.com/40x40/00ff88/000000?text=GH" 
            alt="GameHub Logo" 
            className="me-2"
            style={{ borderRadius: '50%' }}
          />
          <span className="fs-4 fw-bold" style={{ color: '#00ff88' }}>GameHub</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbarlogin;