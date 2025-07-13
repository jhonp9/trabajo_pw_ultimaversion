import { Modal, Button, Form, Row, Col, Alert } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import type { Juego } from '../types/juego';

interface JuegoFormModalProps {
  show: boolean;
  onHide: () => void;
  juego: Juego | null;
  mode: 'add' | 'edit';
  onSubmit: (juegoData: Partial<Juego>) => Promise<void>;
}

const JuegoFormModal = ({ show, onHide, juego, mode, onSubmit }: JuegoFormModalProps) => {
  const [formData, setFormData] = useState<Partial<Juego>>({
    title: '',
    description: '',
    price: 0,
    images: [''],
    genres: [],
    platforms: [],
    oferta: '',
    requirements: {
      minimum: [''],
      recommended: ['']
    },
    trailerUrl: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Inicializar formulario con datos del juego si está en modo edición
  useEffect(() => {
    if (mode === 'edit' && juego) {
      setFormData({
        title: juego.title,
        description: juego.description,
        price: juego.price,
        images: [...juego.images],
        genres: [...juego.genres],
        platforms: [...juego.platforms],
        oferta: juego.oferta || '',
        requirements: {
          minimum: [...juego.requirements.minimum],
          recommended: [...juego.requirements.recommended]
        },
        trailerUrl: juego.trailerUrl
      });
    } else {
      // Resetear formulario para modo agregar
      setFormData({
        title: '',
        description: '',
        price: 0,
        images: [''],
        genres: [],
        platforms: [],
        oferta: '',
        requirements: {
          minimum: [''],
          recommended: ['']
        },
        trailerUrl: ''
      });
    }
  }, [mode, juego]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (field: 'genres' | 'platforms', value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value.split(',').map(item => item.trim())
    }));
  };

  const handleImageChange = (index: number, value: string) => {
    const newImages = [...formData.images || []];
    newImages[index] = value;
    setFormData(prev => ({ ...prev, images: newImages }));
  };

  const addImageField = () => {
    setFormData(prev => ({
      ...prev,
      images: [...(prev.images || []), '']
    }));
  };

  const removeImageField = (index: number) => {
    const newImages = [...formData.images || []];
    newImages.splice(index, 1);
    setFormData(prev => ({ ...prev, images: newImages }));
  };

  const handleRequirementChange = (type: 'minimum' | 'recommended', index: number, value: string) => {
    setFormData(prev => {
      const requirements = prev.requirements || { minimum: [''], recommended: [''] };
      const updated = [...requirements[type]];
      updated[index] = value;
      
      return {
        ...prev,
        requirements: {
          ...requirements,
          [type]: updated
        }
      };
    });
  };

  const addRequirementField = (type: 'minimum' | 'recommended') => {
    setFormData(prev => {
      const requirements = prev.requirements || { minimum: [''], recommended: [''] };
      return {
        ...prev,
        requirements: {
          ...requirements,
          [type]: [...requirements[type], '']
        }
      };
    });
  };

  const removeRequirementField = (type: 'minimum' | 'recommended', index: number) => {
    setFormData(prev => {
      const requirements = prev.requirements || { minimum: [''], recommended: [''] };
      return {
        ...prev,
        requirements: {
          ...requirements,
          [type]: requirements[type].filter((_, i) => i !== index)
        }
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Validación básica
      if (!formData.title || !formData.description || !formData.trailerUrl) {
        throw new Error('Los campos obligatorios deben completarse');
      }

      if ((formData.images?.length || 0) < 1) {
        throw new Error('Debe agregar al menos una imagen');
      }

      await onSubmit(formData);
      onHide();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al guardar el juego');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{mode === 'add' ? 'Agregar Juego' : 'Editar Juego'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Título *</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={formData.title || ''}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Descripción *</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={formData.description || ''}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Precio *</Form.Label>
                <Form.Control
                  type="number"
                  step="0.01"
                  min="0"
                  name="price"
                  value={formData.price || 0}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Oferta (opcional)</Form.Label>
                <Form.Control
                  type="text"
                  name="oferta"
                  value={formData.oferta || ''}
                  onChange={handleChange}
                  placeholder="Ej: 10%"
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Géneros (separados por comas) *</Form.Label>
            <Form.Control
              type="text"
              value={(formData.genres || []).join(', ')}
              onChange={(e) => handleArrayChange('genres', e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Plataformas (separadas por comas) *</Form.Label>
            <Form.Control
              type="text"
              value={(formData.platforms || []).join(', ')}
              onChange={(e) => handleArrayChange('platforms', e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>URL del Trailer (ID de YouTube) *</Form.Label>
            <Form.Control
              type="text"
              name="trailerUrl"
              value={formData.trailerUrl || ''}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Imágenes (URLs) *</Form.Label>
            {(formData.images || []).map((image, index) => (
              <div key={index} className="d-flex mb-2">
                <Form.Control
                  type="url"
                  value={image}
                  onChange={(e) => handleImageChange(index, e.target.value)}
                  required
                />
                <Button 
                  variant="danger" 
                  onClick={() => removeImageField(index)}
                  className="ms-2"
                  disabled={(formData.images?.length || 0) <= 1}
                >
                  Eliminar
                </Button>
              </div>
            ))}
            <Button 
              variant="secondary" 
              onClick={addImageField}
              size="sm"
            >
              Agregar Imagen
            </Button>
          </Form.Group>

          <h5>Requisitos del Sistema</h5>
          
          <Row>
            <Col md={6}>
              <h6>Mínimos *</h6>
              {(formData.requirements?.minimum || []).map((req, index) => (
                <div key={`min-${index}`} className="d-flex mb-2">
                  <Form.Control
                    type="text"
                    value={req}
                    onChange={(e) => handleRequirementChange('minimum', index, e.target.value)}
                    required
                  />
                  <Button 
                    variant="danger" 
                    onClick={() => removeRequirementField('minimum', index)}
                    className="ms-2"
                    disabled={(formData.requirements?.minimum.length || 0) <= 1}
                  >
                    Eliminar
                  </Button>
                </div>
              ))}
              <Button 
                variant="secondary" 
                onClick={() => addRequirementField('minimum')}
                size="sm"
                className="mb-3"
              >
                Agregar Requisito
              </Button>
            </Col>
            <Col md={6}>
              <h6>Recomendados *</h6>
              {(formData.requirements?.recommended || []).map((req, index) => (
                <div key={`rec-${index}`} className="d-flex mb-2">
                  <Form.Control
                    type="text"
                    value={req}
                    onChange={(e) => handleRequirementChange('recommended', index, e.target.value)}
                    required
                  />
                  <Button 
                    variant="danger" 
                    onClick={() => removeRequirementField('recommended', index)}
                    className="ms-2"
                    disabled={(formData.requirements?.recommended.length || 0) <= 1}
                  >
                    Eliminar
                  </Button>
                </div>
              ))}
              <Button 
                variant="secondary" 
                onClick={() => addRequirementField('recommended')}
                size="sm"
                className="mb-3"
              >
                Agregar Requisito
              </Button>
            </Col>
          </Row>

          <div className="d-flex justify-content-end mt-4">
            <Button variant="secondary" onClick={onHide} className="me-2" disabled={loading}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  {mode === 'add' ? 'Agregando...' : 'Guardando...'}
                </>
              ) : (
                mode === 'add' ? 'Agregar Juego' : 'Guardar Cambios'
              )}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default JuegoFormModal;