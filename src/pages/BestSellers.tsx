import { useState } from 'react';
import CarritoSidebar from '../components/Carrito/CarritoSidebar';
import JuegosLista from '../components/Juegos/JuegosLista';
import Navbar from '../components/UI/Navbar';
import type { Juego } from '../types/juego';

const URL = "http://localhost:5000" // URL Base

const BestSellers = () => {

  const [ lista, setLista ] = useState<Juego[]>([])
    
    const httpObtenerTODOs = async () => {
          const response = await fetch(`${URL}/`)
          const data = await response.json()
          setLista(data)
      }
  // Ordenar por ventas (de mayor a menor)
  const bestSellers = [...lista]
    .sort((a, b) => b.sales - a.sales)
    .slice(0, 12); // Mostrar los 12 más vendidos

  return (
    <div style={{ backgroundColor: '#0a0a0a', minHeight: '100vh' }}>
      <Navbar />
      <div className="best-sellers-page">
        <div className="container">
          <h1 className="page-title">Juegos Más Vendidos</h1>
          <div className="sales-info mb-4">
            <p style={{ color: '#00ff88' }}>Los juegos más populares según nuestras ventas</p>
          </div>
          <JuegosLista juegos={bestSellers} />
        </div>
      </div>
      <CarritoSidebar />
    </div>
  );
};

export default BestSellers;