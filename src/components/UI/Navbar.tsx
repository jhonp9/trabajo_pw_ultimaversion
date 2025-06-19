import { useNavigate } from "react-router-dom";
import { useCart } from '../../context/CartContext';

const Navbar = () => {
    const navigate = useNavigate();
    const { itemsCount, setShowCart } = useCart();
    return (
        <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container">
          <a className="navbar-brand" href="#" onClick={(e) => { e.preventDefault(); navigate('/'); }}>
            <img src="#" alt="Logo" />
            GameHub
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item"><a className="nav-link" href="#" onClick={(e) => { e.preventDefault(); navigate('/'); }}>Casa</a></li>
              <li className="nav-item"><a className="nav-link" href="#" onClick={(e) => { e.preventDefault(); navigate('/categorias'); }}>Categorias</a></li>
              <li className="nav-item"><a className="nav-link" href="#" onClick={(e) => { e.preventDefault(); navigate('/juegos-mas-vendidos'); }}>Juegos mas vendidos</a></li>
              <li className="nav-item"><a className="nav-link" href="#" onClick={(e) => { e.preventDefault(); navigate('/mejores-valorados'); }}>Mejores valorados</a></li>
            </ul>
            <div className="d-flex">
              <div className="input-group">
                <input type="text" className="form-control" placeholder="Buscar" />
                <button className="btn btn-outline-primary" type="button">
                  <i className="fas fa-search"></i>
                </button>
              </div>
              <button className="cart-icon mx-2" style={{ backgroundColor: "#0a0a0a" }} onClick={() => setShowCart(true)} aria-label="Abrir carrito">
                <i className="fas fa-shopping-cart"></i>
                {itemsCount > 0 && (
                  <span className="cart-count">{itemsCount}</span>
                )}
              </button>
              <div className="ms-auto">
                <a href="#" className="btn btn-outline-light" onClick={(e) => { e.preventDefault(); navigate('/'); }}>
                  <i className="fas fa-sign-in-alt me-2"></i> Cerrar Sesion
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    )
}

export default Navbar;