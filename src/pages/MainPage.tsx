import Navbar from '../components/UI/Navbar';
import CarritoSidebar from '../components/Carrito/CarritoSidebar';
import Contenido from '../components/Contenido';
import JuegosLista from '../components/Juegos/JuegosLista';
import { useEffect, useState } from 'react';
import { apiClient } from '../api/client';
import type { Juego } from '../types/juego';

const MainPage = () => {

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

  return (
    <div style={{ backgroundColor: '#0a0a0a' , minHeight: '100vh'}}>
      <Navbar />
      <main className="container">
        <Contenido />
        <JuegosLista juegos={juegos}/>
      </main>
      <CarritoSidebar />
      {/* Confirmacion se maneja desde CarritoSidebar */}
    </div>
  );
};

export default MainPage;