// components/admin/JuegoFormModal.tsx
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { useAdmin } from '../context/AdminContext';
import { useState, useEffect } from 'react';
import type { Juego } from '../types/juego';

interface JuegoFormModalProps {
  show: boolean;
  onHide: () => void;
  juego: Juego | null;
  mode: 'add' | 'edit';
}

const JuegoFormModal = ({ show, onHide, juego, mode }: JuegoFormModalProps) => {
  const { addJuego, updateJuego } = useAdmin();
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

  useEffect(() => {
    if (mode === 'edit' && juego) {
      setFormData(juego);
    } else {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (field: string, value: string) => {
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
      const prevRequirements = prev.requirements ?? { minimum: [''], recommended: [''] };
      const updatedType = [...(prevRequirements[type] ?? [''])];
      updatedType[index] = value;
      return {
        ...prev,
        requirements: {
          ...prevRequirements,
          [type]: updatedType
        }
      };
    });
  };

  const addRequirementField = (type: 'minimum' | 'recommended') => {
    setFormData(prev => {
      const prevRequirements = prev.requirements ?? { minimum: [''], recommended: [''] };
      return {
        ...prev,
        requirements: {
          ...prevRequirements,
          [type]: [...(prevRequirements[type] ?? []), '']
        }
      };
    });
  };

  const removeRequirementField = (type: 'minimum' | 'recommended', index: number) => {
    setFormData(prev => {
      const prevRequirements = prev.requirements ?? { minimum: [''], recommended: [''] };
      return {
        ...prev,
        requirements: {
          ...prevRequirements,
          [type]: (prevRequirements[type] ?? []).filter((_, i) => i !== index)
        }
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'add') {
      addJuego(formData as Omit<Juego, 'id'>);
    } else if (mode === 'edit' && juego) {
      updateJuego(juego.id, formData);
    }
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{mode === 'add' ? 'Agregar Juego' : 'Editar Juego'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Título</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={formData.title || ''}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Descripción</Form.Label>
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
                <Form.Label>Precio</Form.Label>
                <Form.Control
                  type="number"
                  step="0.01"
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
            <Form.Label>Géneros (separados por comas)</Form.Label>
            <Form.Control
              type="text"
              value={(formData.genres || []).join(', ')}
              onChange={(e) => handleArrayChange('genres', e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Plataformas (separadas por comas)</Form.Label>
            <Form.Control
              type="text"
              value={(formData.platforms || []).join(', ')}
              onChange={(e) => handleArrayChange('platforms', e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>URL del Trailer (ID de YouTube)</Form.Label>
            <Form.Control
              type="text"
              name="trailerUrl"
              value={formData.trailerUrl || ''}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Imágenes (URLs)</Form.Label>
            {(formData.images || []).map((image, index) => (
              <div key={index} className="d-flex mb-2">
                <Form.Control
                  type="text"
                  value={image}
                  onChange={(e) => handleImageChange(index, e.target.value)}
                  required
                />
                <Button 
                  variant="danger" 
                  onClick={() => removeImageField(index)}
                  className="ms-2"
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
              <h6>Mínimos</h6>
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
                  >
                    Eliminar
                  </Button>
                </div>
              ))}
              <Button 
                variant="secondary" 
                onClick={() => addRequirementField('minimum')}
                size="sm"
              >
                Agregar Requisito
              </Button>
            </Col>
            <Col md={6}>
              <h6>Recomendados</h6>
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
                  >
                    Eliminar
                  </Button>
                </div>
              ))}
              <Button 
                variant="secondary" 
                onClick={() => addRequirementField('recommended')}
                size="sm"
              >
                Agregar Requisito
              </Button>
            </Col>
          </Row>

          <div className="d-flex justify-content-end mt-4">
            <Button variant="secondary" onClick={onHide} className="me-2">
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              {mode === 'add' ? 'Agregar Juego' : 'Guardar Cambios'}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default JuegoFormModal;