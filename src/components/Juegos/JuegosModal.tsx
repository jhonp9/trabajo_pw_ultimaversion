import React from 'react';
import { Modal, Button, Row, Col } from 'react-bootstrap';
import { useCart } from '../../context/CartContext';
import type { Juego } from '../../types/juego';

interface JuegoModalProps {
  show: boolean;
  onHide: () => void;
  juego: Juego | null;
}

const JuegoModal: React.FC<JuegoModalProps> = ({ show, onHide, juego }) => {
  const { addToCart } = useCart();

  if (!juego) return null;

  const handleAddToCart = () => {
    addToCart({
      id: juego.id,
      title: juego.title,
      price: juego.price
    });
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered scrollable className="game-modal">
      <Modal.Header closeButton>
        <Modal.Title>{juego.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="mb-4">
          <Col md={8}>
            <h4>{juego.title}</h4>
            <p>{juego.description}</p>
            <p><b>ESTE PRODUCTO PUEDE INCLUIR CONTENIDO NO APTO PARA TODAS LAS EDADES O PARA VERLO EN EL TRABAJO.</b></p>
          </Col>
          <Col md={4} className="text-center">
            <div className="price-tag mb-3">${juego.price.toFixed(2)}</div>
            <div className="rating mb-3">
              {[...Array(5)].map((_, i) => (
                i < Math.floor(juego.rating) ? 
                  <span key={i}>★</span> : 
                  <span key={i}>☆</span>
              ))}
              <span className="ms-2">{juego.rating}/5</span>
            </div>
            <Button variant="primary" onClick={handleAddToCart}>
              <i className="fas fa-cart-plus me-2"></i>Comprar ahora
            </Button>
          </Col>
        </Row>
        
        {/* Trailer del juego */}
        <h4 className="mb-3">Trailer del Juego</h4>
        <div className="game-trailer mb-4 ratio ratio-16x9">
          <iframe 
            src={juego.trailerUrl} 
            title={`${juego.title} Trailer`} 
            allowFullScreen
          ></iframe>
        </div>
        
        {/* Imágenes de gameplay */}
        <h4 className="mb-3">Imágenes del juego</h4>
        <Row className="gameplay-images">
          {juego.images.map((image, index) => (
            <Col key={index} xs={6} md={3}>
              <img 
                src={image} 
                alt={`${juego.title} Screenshot ${index + 1}`} 
                className="img-fluid mb-2"
              />
            </Col>
          ))}
        </Row>
        
        {/* Requisitos del sistema */}
        <h4 className="mt-4 mb-3">Requerimientos del sistema</h4>
        <Row>
          <Col md={6}>
            <h5>Mínimo</h5>
            <ul>
              {juego.requirements.minimum.map((req, i) => (
                <li key={i}>{req}</li>
              ))}
            </ul>
          </Col>
          <Col md={6}>
            <h5>Recomendado</h5>
            <ul>
              {juego.requirements.recommended.map((req, i) => (
                <li key={i}>{req}</li>
              ))}
            </ul>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Cerrar</Button>
        <Button 
          variant="primary" 
          onClick={handleAddToCart}
          className="btn-add-to-cart"
        >
          <i className="fas fa-cart-plus me-2"></i>
          Añadir al Carrito (${juego.price.toFixed(2)})
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default JuegoModal;