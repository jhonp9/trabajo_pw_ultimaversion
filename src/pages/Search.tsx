// pages/SearchPage.tsx
import { useLocation } from 'react-router-dom';
import JuegosLista from '../components/Juegos/JuegosLista';
import Navbar from '../components/UI/Navbar';
import CarritoSidebar from '../components/Carrito/CarritoSidebar';
import type { Juego } from '../types/juego';
import { useEffect, useState } from 'react';
import { apiClient } from '../api/client';

const SearchPage = () => {
    const location = useLocation();

    const [ juegos, setLista ] = useState<Juego[]>([])
          
    const httpObtenerJuegos = async () => {
        const data = await apiClient('/api/games/', {
            method: 'GET',
            });
        setLista(data)
    }
    useEffect(() => {
    httpObtenerJuegos();
    }, []);
    const query = new URLSearchParams(location.search).get('q') || '';
    
    const filteredGames = juegos.filter(juego =>
        juego.title.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div style={{ backgroundColor: '#0a0a0a', minHeight: '100vh' }}>
            <Navbar />
            <div className="container py-4">
                <h1 className="page-title">
                    Resultados de búsqueda: "{query}"
                </h1>
                {filteredGames.length > 0 ? (
                    <JuegosLista juegos={filteredGames} />
                ) : (
                    <div className="text-center py-5">
                        <i className="fas fa-search fa-3x mb-3" style={{ color: '#00ff88' }}></i>
                        <h3>No se encontraron juegos</h3>
                        <p>No hay resultados para "{query}"</p>
                    </div>
                )}
            </div>
            <CarritoSidebar />
        </div>
    );
};

export default SearchPage;