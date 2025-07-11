import { useAuth } from '../components/Auth/AuthContext';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import type { Juego } from '../types/juego';
import { useState } from 'react';

const URL = "http://localhost:3000" // URL Base

const MyGamesPage = () => {
    const { user } = useAuth();
    const { purchasedGames } = useCart(); // Asume que has extendido tu CartContext para manejar juegos comprados
    const navigate = useNavigate();

    const [ lista, setLista ] = useState<Juego[]>([])
      
      const httpObtenerTODOs = async () => {
            const response = await fetch(`${URL}/`)
            const data = await response.json()
            setLista(data)
        }

    // Filtra los juegos comprados
    const myGames = lista.filter(game => 
        purchasedGames.includes(game.id) || 
        (user?.email === 'admin' && game.id <= 3) // Ejemplo: admin ve algunos juegos por defecto
    );

    return (
        <div style={{ backgroundColor: '#0a0a0a', minHeight: '100vh', padding: '2rem 0' }}>
            <div className="container">
                <h1 className="page-title">Mis Juegos</h1>
                
                {myGames.length === 0 ? (
                    <div className="empty-games text-center">
                        <i className="fas fa-gamepad fa-4x mb-3" style={{ color: '#00ff88' }}></i>
                        <h3>No tienes juegos todavía</h3>
                        <p>Compra algunos juegos para empezar tu colección</p>
                        <button 
                            className="btn btn-primary mt-3"
                            onClick={() => navigate('/')}
                        >
                            Explorar Juegos
                        </button>
                    </div>
                ) : (
                    <div className="games-grid">
                        {myGames.map(game => (
                            <div key={game.id} className="game-card">
                                <img src={game.images[0]} alt={game.title} className="game-img" />
                                <div className="game-info">
                                    <h3 className="game-title">{game.title}</h3>
                                    <button className="btn btn-outline-primary">
                                        Descargar
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyGamesPage;