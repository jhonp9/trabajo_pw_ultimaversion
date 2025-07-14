import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import type { Noticia } from '../types/noticia';
import { useAuth } from '../components/Auth/AuthContext';

interface NoticiaFormModalProps {
  show: boolean;
  onHide: () => void;
  noticia: Noticia | null;
  mode: 'add' | 'edit';
  onSubmit: (noticiaData: Partial<Noticia>) => Promise<void>;
}

const NoticiaFormModal = ({ show, onHide, noticia, mode, onSubmit }: NoticiaFormModalProps) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState<Partial<Noticia>>({
    title: '',
    content: '',
    image: '',
    author: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (mode === 'edit' && noticia) {
      setFormData({
        title: noticia.title,
        content: noticia.content,
        image: noticia.image || '',
        author: noticia.author
      });
    } else {
      setFormData({
        title: '',
        content: '',
        image: '',
        author: user?.name || 'Admin'
      });
    }
  }, [mode, noticia, user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (!formData.title || !formData.content) {
        throw new Error('Título y contenido son obligatorios');
      }

      await onSubmit({
        ...formData,
        author: formData.author|| user?.name || 'Admin'
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al guardar la noticia');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{mode === 'add' ? 'Agregar Noticia' : 'Editar Noticia'}</Modal.Title>
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
            <Form.Label>Contenido *</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              name="content" 
              value={formData.content || ''}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>URL de la Imagen (opcional)</Form.Label>
            <Form.Control
              type="url"
              name="image" 
              value={formData.image || ''}
              onChange={handleChange}
              placeholder="https://ejemplo.com/imagen.jpg"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Autor *</Form.Label>
            <Form.Control
              type="text"
              name="author" 
              value={formData.author || ''}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <div className="d-flex justify-content-end">
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
                mode === 'add' ? 'Agregar Noticia' : 'Guardar Cambios'
              )}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default NoticiaFormModal;