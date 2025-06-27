import { useNavigate } from "react-router-dom";
import { useCart } from '../../context/CartContext';
import { Button } from "react-bootstrap";
import { useAuth } from '../Auth/AuthContext';
import { useState } from 'react';

const Navbar = () => {
    const navigate = useNavigate();
    const { itemsCount, setShowCart } = useCart();
    const { user, logout } = useAuth();
    const [showDropdown, setShowDropdown] = useState(false);

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
                        
                        {user ? (
                            <div className="user-dropdown position-relative">
                                <button 
                                    className="user-avatar d-flex align-items-center" 
                                    onClick={() => setShowDropdown(!showDropdown)}
                                >
                                    <div className="avatar-circle me-2">
                                        <img 
                                            src="/default-avatar.png" 
                                            alt={user.name} 
                                            className="avatar-img"
                                        />
                                    </div>
                                    <span className="user-name">{user.name}</span>
                                </button>
                                
                                {showDropdown && (
                                    <div className="dropdown-menu show">
                                        <button 
                                            className="dropdown-item" 
                                            onClick={() => {
                                                navigate('/perfil');
                                                setShowDropdown(false);
                                            }}
                                        >
                                            Mi Perfil
                                        </button>
                                        <button 
                                            className="dropdown-item" 
                                            onClick={() => {
                                                navigate('/mis-juegos');
                                                setShowDropdown(false);
                                            }}
                                        >
                                            Mis Juegos
                                        </button>
                                        <div className="dropdown-divider"></div>
                                        <button 
                                            className="dropdown-item" 
                                            onClick={() => {
                                                logout();
                                                navigate('/');
                                                setShowDropdown(false);
                                            }}
                                        >
                                            Cerrar Sesión
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Button variant="primary" onClick={() => navigate('/login')}>
                                Iniciar Sesión
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;