// JuegosLista.tsx
import { useEffect, useState } from 'react';
import JuegoModal from './JuegosModal';
import type { Juego } from '../../types/juego';
import { apiClient } from '../../api/client';


const JuegosLista = () => {
  const [selectedGame, setSelectedGame] = useState<Juego | null>(null);
  const [showModal, setShowModal] = useState(false);

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

  // Verifica los juegos recibidos
  console.log('Juegos recibidos en JuegosLista:', juegos);

  const handleGameClick = (juego: Juego) => {
    setSelectedGame(juego);
    setShowModal(true);
  };

  return (
    <section className="game-carousel">
      <div className="game-list">
        {juegos.map((juego) => (
          <div key={juego.id} className="col-6 col-md-8"> {/* Mejor estructura de grid */}
            <div 
              className="game-card"
              onClick={() => handleGameClick(juego)}
            >  
              <img 
                src={juego.images[0]} 
                alt={juego.title} 
                className="game-img"
                style={{ height: '200px', objectFit: 'cover', width: '100%' }}
              />
              <div className="p-3">
                <h3 className="game-title">{juego.title}</h3>
                <div className="game-price">${juego.price.toFixed(2)}</div>
                {juego.oferta && (
                  <div className="text-success">Oferta: {juego.oferta}</div>
                )}
                <div className="game-rating">
                  {Array.from({ length: 5 }).map((_, i) => (
                    i < Math.floor(juego.rating) ? '★' : '☆'
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <JuegoModal 
        show={showModal} 
        onHide={() => setShowModal(false)} 
        juego={selectedGame} 
      />
    </section>
  );
};

export default JuegosLista;