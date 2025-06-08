import React, { useState } from 'react';
import JuegoModal from './JuegosModal';
import type { Juego } from '../../types/juego';

const JuegosLista = () => {
  // Estado para controlar qué juego está seleccionado
  const [selectedGame, setSelectedGame] = useState<Juego | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Datos de ejemplo para los juegos
  const juegos: Juego[] = [
    {
      id: 1,
      title: "The Witcher 3",
      description: "Un juego de rol de mundo abierto con una historia épica...",
      price: 29.99,
      rating: 4.9,
      images: [
        "https://via.placeholder.com/300x200/333333/00ff88?text=Witcher+1",
        "https://via.placeholder.com/300x200/333333/00ff88?text=Witcher+2",
        "https://via.placeholder.com/300x200/333333/00ff88?text=Witcher+3",
        "https://via.placeholder.com/300x200/333333/00ff88?text=Witcher+4"
      ],
      requirements: {
        minimum: [
          "OS: Windows 7/8/10 (64-bit)",
          "Processor: Intel CPU Core i5-2500K 3.3GHz",
          "Memory: 6 GB RAM",
          "Graphics: Nvidia GPU GeForce GTX 660"
        ],
        recommended: [
          "OS: Windows 10 (64-bit)",
          "Processor: Intel CPU Core i7 3770 3.4 GHz",
          "Memory: 8 GB RAM",
          "Graphics: Nvidia GPU GeForce GTX 770"
        ]
      },
      trailerUrl: "https://www.youtube.com/embed/XHrskkHf958"
    },
    {
      id: 2,
      title: "Cyberpunk 2077",
      description: "Un RPG de acción y aventura en el mundo abierto de Night City...",
      price: 49.99,
      rating: 4.5,
      images: [
        "https://via.placeholder.com/300x200/333333/00ff88?text=Cyberpunk+1",
        "https://via.placeholder.com/300x200/333333/00ff88?text=Cyberpunk+2",
        "https://via.placeholder.com/300x200/333333/00ff88?text=Cyberpunk+3",
        "https://via.placeholder.com/300x200/333333/00ff88?text=Cyberpunk+4"
      ],
      requirements: {
        minimum: [
          "OS: Windows 7 or 10",
          "Processor: Intel Core i5-3570K or AMD FX-8310",
          "Memory: 8 GB RAM",
          "Graphics: NVIDIA GeForce GTX 780 or AMD Radeon RX 470"
        ],
        recommended: [
          "OS: Windows 10",
          "Processor: Intel Core i7-4790 or AMD Ryzen 3 3200G",
          "Memory: 12 GB RAM",
          "Graphics: NVIDIA GeForce GTX 1060 or AMD Radeon R9 Fury"
        ]
      },
      trailerUrl: "https://www.youtube.com/embed/LembwKDo1Dk"
    }
    // Puedes agregar más juegos aquí
  ];

  const handleGameClick = (juego: Juego) => {
    setSelectedGame(juego);
    setShowModal(true);
  };

  return (
    <section className="game-carousel">
      <div className="container">
        <h2 className="section-title">Juegos Destacados</h2>
        <div className="game-list">
          {juegos.map((juego) => (
            <div 
              key={juego.id} 
              className="game-card"
              onClick={() => handleGameClick(juego)}
            >
              <img 
                src={`https://via.placeholder.com/300x180/00ff88/000000?text=${juego.title.replace(/\s+/g, '+')}`}
                alt={juego.title}
                className="game-img"
              />
              <div className="game-content">
                <h3 className="game-title">{juego.title}</h3>
                <div className="game-price">${juego.price.toFixed(2)}</div>
              </div>
            </div>
          ))}
        </div>
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