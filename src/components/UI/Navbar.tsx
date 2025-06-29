import { useNavigate } from "react-router-dom";
import { useCart } from '../../context/CartContext';
import { Button } from "react-bootstrap";
import { useAuth } from '../Auth/AuthContext';
import { useEffect, useRef, useState } from 'react';
import type { Juego } from "../../types/juego";
import { gamesData } from "../../data/gamesData";
import SearchResults from "./SearchResults";

const Navbar = () => {
    const navigate = useNavigate();
    const { itemsCount, setShowCart } = useCart();
    const { user, logout } = useAuth();
    const [showDropdown, setShowDropdown] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<Juego[]>([]);
    const [showResults, setShowResults] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);

    // Manejar búsqueda en tiempo real
    useEffect(() => {
        if (searchQuery.trim() === '') {
            setSearchResults([]);
            return;
        }

        const results = gamesData.filter(juego =>
            juego.title.toLowerCase().includes(searchQuery.toLowerCase())
        ).slice(0, 5); // Mostrar máximo 5 resultados

        setSearchResults(results);
    }, [searchQuery]);

    // Cerrar resultados al hacer clic fuera
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setShowResults(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/busqueda?q=${encodeURIComponent(searchQuery)}`);
            setShowResults(false);
            setSearchQuery('');
        }
    };

    const handleSelectGame = (juego: Juego) => {
        setSearchQuery('');
        setShowResults(false);
    };

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
                        <li className="nav-item"><a className="nav-link" href="#" onClick={(e) => { e.preventDefault(); navigate('/noticias'); }}>Noticias</a></li>
                    </ul>
                    <div className="d-flex">
                        <div className="search-container position-relative" ref={searchRef}>
                            <form className="input-group" onSubmit={handleSearch}>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Buscar juegos..." 
                                    value={searchQuery}
                                    onChange={(e) => {
                                        setSearchQuery(e.target.value);
                                        setShowResults(true);
                                    }}
                                    onFocus={() => setShowResults(true)}
                                />
                                <button className="btn btn-outline-primary" type="submit">
                                    <i className="fas fa-search"></i>
                                </button>
                            </form>
                            {showResults && searchQuery && (
                                <SearchResults 
                                    results={searchResults} 
                                    onSelect={handleSelectGame}
                                    query={searchQuery}
                                />
                            )}
                        </div>
                        <button 
                            className="cart-icon mx-2" 
                            style={{ backgroundColor: "#0a0a0a" }} 
                            onClick={() => setShowCart(true)} 
                            aria-label="Abrir carrito"
                        >
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
                                    {user.role === 'admin' && (
                                    <button 
                                        className="dropdown-item" 
                                        onClick={() => {
                                        navigate('/admin/juegos');
                                        setShowDropdown(false);
                                        }}
                                    >
                                        Panel Admin
                                    </button>
                                    )}
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
                            )
                        }
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;