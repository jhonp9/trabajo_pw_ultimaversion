import React, { useEffect, useState } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../Auth/AuthContext';
import type { Juego, Review } from '../../types/juego';
import ReactPlayer from 'react-player';
import { apiClient } from '../../api/client';

interface JuegoModalProps {
  show: boolean;
  onHide: () => void;
  juego: Juego | null;
}

const JuegoModal: React.FC<JuegoModalProps> = ({ show, onHide, juego }) => {
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [reviewError, setReviewError] = useState('');
  const { showNotification } = useCart();

  useEffect(() => {
    if (show && juego) {
      fetchGameReviews();
    }
  }, [show, juego]);

  const fetchGameReviews = async () => {
    try {
      setLoadingReviews(true);
      const response = await apiClient(`/api/reviews/${juego?.id}`, {
              method: 'GET',
            });
      setReviews(response.data);
      setReviewError('');
    } catch (error) {
      console.error('Error fetching reviews:', error);
      setReviewError('Error al cargar las reseñas');
    } finally {
      setLoadingReviews(false);
    }
  };

  if (!juego) return null;

  const handleAddToCart = () => {
    addToCart({
      id: juego.id,
      title: juego.title,
      price: juego.price
    });
    onHide();
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user || !comment || rating === 0 || !juego) return;
    
    try {
      // Verificar si el usuario ha comprado el juego
      const hasPurchased = await apiClient(`/api/users/${user.id}/purchases/check-game/${juego.id}`, {
        method: 'GET'
      });

      if (!hasPurchased.success) {
        showNotification('Debes comprar el juego antes de reseñarlo');
        return;
      }

      const data = { rating, comment };
      const response = await apiClient(`/api/reviews/${juego.id}`, {
        method: 'POST',
        body: JSON.stringify(data)
      });
        
      setReviews([response.data, ...reviews]);
      setRating(0);
      setComment('');
      showNotification('Reseña enviada con éxito');
    } catch (error) {
      console.error('Error submitting review:', error);
      showNotification('Error al enviar la reseña');
    }
  };

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      i < rating ? 
        <span key={i} style={{ color: '#ffc107' }}>★</span> : 
        <span key={i}>☆</span>
    ));
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
          <ReactPlayer
    url={`https://www.youtube.com/watch?v=${juego.trailerUrl}`}
    width="100%"
    height="100%"
    controls={true}
  />
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

        {/* Sección de Reseñas */}
       <h4 className="mt-4 mb-3">Reseñas</h4>
      
        {reviewError && (
          <div className="alert alert-danger">{reviewError}</div>
        )}
        
        {loadingReviews ? (
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
          </div>
        ) : reviews.length === 0 ? (
          <p>No hay reseñas todavía. ¡Sé el primero en opinar!</p>
        ) : (
          <div className="reviews-container mb-4">
            {reviews.map((review) => (
              <div key={review.id} className="review-item mb-3 p-3" style={{ backgroundColor: '#1e1e1e', borderRadius: '8px' }}>
                <div className="d-flex justify-content-between mb-2">
                  <strong>{review.author}</strong>
                  <small className="text-muted">
                    {new Date(review.date).toLocaleDateString()}
                  </small>
                </div>
                <div className="mb-2">
                  {renderStars(review.rating)}
                </div>
                <p>{review.comment}</p>
              </div>
            ))}
          </div>
        )}
        
        {/* Formulario de Reseña */}
        {user ? (
          <Form onSubmit={handleSubmitReview} className="review-form">
            <h5>Deja tu reseña</h5>
            <Form.Group className="mb-3">
              <Form.Label>Tu calificación</Form.Label>
              <div className="rating-stars">
                {[...Array(5)].map((_, i) => (
                  <span 
                    key={i} 
                    onClick={() => setRating(i + 1)}
                    style={{ 
                      cursor: 'pointer', 
                      fontSize: '1.5rem',
                      color: i < rating ? '#ffc107' : '#6c757d'
                    }}
                  >
                    ★
                  </span>
                ))}
              </div>
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Tu comentario</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="¿Qué te pareció este juego?"
                required
              />
            </Form.Group>
            
            <Button variant="primary" type="submit" disabled={!comment || rating === 0}>
              Enviar Reseña
            </Button>
          </Form>
        ) : (
          <div className="alert alert-info">
            <i className="fas fa-info-circle me-2"></i>
            Debes <a href="/login" className="alert-link">iniciar sesión</a> para dejar una reseña.
          </div>
        )}

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