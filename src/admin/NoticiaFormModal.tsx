// components/admin/NoticiaFormModal.tsx
import { Modal, Button, Form } from 'react-bootstrap';
import { useAdmin } from '..//context/AdminContext';
import { useState, useEffect } from 'react';
import type { Noticia } from '../types/noticia';

interface NoticiaFormModalProps {
  show: boolean;
  onHide: () => void;
  noticia: Noticia | null;
  mode: 'add' | 'edit';
}

const NoticiaFormModal = ({ show, onHide, noticia, mode }: NoticiaFormModalProps) => {
  const { addNoticia, updateNoticia } = useAdmin();
  const [formData, setFormData] = useState<Omit<Noticia, 'id' | 'fecha'>>({
    titulo: '',
    contenido: '',
    imagen: '',
    autor: ''
  });

  useEffect(() => {
    if (mode === 'edit' && noticia) {
      setFormData({
        titulo: noticia.titulo,
        contenido: noticia.contenido,
        imagen: noticia.imagen || '',
        autor: noticia.autor
      });
    } else {
      setFormData({
        titulo: '',
        contenido: '',
        imagen: '',
        autor: ''
      });
    }
  }, [mode, noticia]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'add') {
      addNoticia(formData);
    } else if (mode === 'edit' && noticia) {
      updateNoticia(noticia.id, formData);
    }
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{mode === 'add' ? 'Agregar Noticia' : 'Editar Noticia'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Título</Form.Label>
            <Form.Control
              type="text"
              name="titulo"
              value={formData.titulo}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Contenido</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              name="contenido"
              value={formData.contenido}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>URL de la Imagen (opcional)</Form.Label>
            <Form.Control
              type="text"
              name="imagen"
              value={formData.imagen}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Autor</Form.Label>
            <Form.Control
              type="text"
              name="autor"
              value={formData.autor}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <div className="d-flex justify-content-end">
            <Button variant="secondary" onClick={onHide} className="me-2">
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              {mode === 'add' ? 'Agregar Noticia' : 'Guardar Cambios'}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default NoticiaFormModal;