import React from 'react';
import { Carousel } from 'react-bootstrap';

const Contenido = () => {
  return (
    <div className="carousel-container">
      <Carousel interval={5000} pause={false} controls indicators className="custom-carousel">
        <Carousel.Item>
          <div className="carousel-image-container">
            <img
              src="https://media.es.wired.com/photos/67890fcf8803b47ac6879177/3:2/pass/Nintendo_Lead.jpg"
              alt="Nintendo Switch"
            />
          </div>
          <Carousel.Caption>
            <h3>Nuevos Lanzamientos</h3>
            <p>Descubre los últimos juegos para Nintendo Switch</p>
          </Carousel.Caption>
        </Carousel.Item>
        
        <Carousel.Item>
          <div className="carousel-image-container">
            <img
              src="https://via.placeholder.com/800x600/FF0000"
              alt="Ofertas Especiales"
            />
          </div>
          <Carousel.Caption>
            <h3>Ofertas Exclusivas</h3>
            <p>Descuentos especiales esta semana</p>
          </Carousel.Caption>
        </Carousel.Item>
        
        <Carousel.Item>
          <div className="carousel-image-container">
            <img
              src="https://via.placeholder.com/600x400/00FF00"
              alt="Próximos Lanzamientos"
            />
          </div>
          <Carousel.Caption>
            <h3>Próximamente</h3>
            <p>Los juegos más esperados del año</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default Contenido;