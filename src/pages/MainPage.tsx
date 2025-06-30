import Navbar from '../components/UI/Navbar';
import CarritoSidebar from '../components/Carrito/CarritoSidebar';
import Contenido from '../components/Contenido';
import JuegosLista from '../components/Juegos/JuegosLista';
import type { Juego } from '../types/juego';
import { useState } from 'react';

const URL = "http://localhost:5000" // URL Base

const MainPage = () => {

  const [ lista, setLista ] = useState<Juego[]>([])
  
  const httpObtenerTODOs = async () => {
        const response = await fetch(`${URL}/`)
        const data = await response.json()
        setLista(data)
    }

  return (
    <div style={{ backgroundColor: '#0a0a0a' , minHeight: '100vh'}}>
      <Navbar />
      <main className="container">
        <Contenido />
        <JuegosLista juegos={lista}/>
      </main>
      <CarritoSidebar />
      {/* Confirmacion se maneja desde CarritoSidebar */}
    </div>
  );
};

export default MainPage;