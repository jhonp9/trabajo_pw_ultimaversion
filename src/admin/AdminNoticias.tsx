import { useState, useEffect } from 'react';
import { useAdmin } from '../context/AdminContext';
import NoticiaFormModal from './NoticiaFormModal';
import { Button, Table, Alert, Spinner, Modal } from 'react-bootstrap';
import type { Noticia } from '../types/noticia';
import AdminDashboard from '../pages/AdminDashboard';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const AdminNoticias = () => {
  const { 
    noticias, 
    loading, 
    error,
    addNoticia, 
    updateNoticia, 
    deleteNoticia,
    refreshData
  } = useAdmin();

  const [selectedNoticia, setSelectedNoticia] = useState<Noticia | null>(null);
  const [showFormModal, setShowFormModal] = useState(false);
  const [formMode, setFormMode] = useState<'add' | 'edit'>('add');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Manejar éxito/error
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const handleAdd = () => {
    setSelectedNoticia(null);
    setFormMode('add');
    setShowFormModal(true);
  };

  const handleEdit = (noticia: Noticia) => {
    setSelectedNoticia(noticia);
    setFormMode('edit');
    setShowFormModal(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteNoticia(id);
      setSuccessMessage('Noticia eliminada correctamente');
      refreshData();
    } catch (error) {
      console.error('Error deleting news:', error);
    } finally {
      setDeleteConfirm(null);
    }
  };

  const handleSubmit = async (noticiaData: Partial<Noticia>) => {
    try {
      if (formMode === 'add') {
        await addNoticia(noticiaData as Omit<Noticia, 'id' | 'fecha'>);
        setSuccessMessage('Noticia agregada correctamente');
      } else if (formMode === 'edit' && selectedNoticia) {
        await updateNoticia(selectedNoticia.id, noticiaData);
        setSuccessMessage('Noticia actualizada correctamente');
      }
      setShowFormModal(false);
      refreshData();
    } catch (error) {
      console.error('Error saving news:', error);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <AdminDashboard>
    <div className="admin-noticias mb-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Gestión de Noticias</h2>
        <Button variant="primary" onClick={handleAdd}>
          <FaPlus className="me-2" /> Agregar Noticia
        </Button>
      </div>

      {successMessage && (
        <Alert variant="success" onClose={() => setSuccessMessage(null)} dismissible>
          {successMessage}
        </Alert>
      )}

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Título</th>
            <th>Autor</th>
            <th>Fecha</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {noticias.length > 0 ? (
            noticias.map(noticia => (
              <tr key={noticia.id}>
                <td>{noticia.title}</td>
                <td>{noticia.author}</td>
                <td>{new Date(noticia.date).toLocaleDateString()}</td>
                <td>
                  <div className="d-flex gap-2">
                    <Button 
                      variant="warning" 
                      size="sm" 
                      onClick={() => handleEdit(noticia)}
                      title="Editar"
                    >
                      <FaEdit />
                    </Button>
                    <Button 
                      variant="danger" 
                      size="sm" 
                      onClick={() => setDeleteConfirm(noticia.id)}
                      title="Eliminar"
                    >
                      <FaTrash />
                    </Button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="text-center">
                No hay noticias registradas
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Modal para agregar/editar noticias */}
      <NoticiaFormModal 
        show={showFormModal}
        onHide={() => setShowFormModal(false)}
        noticia={formMode === 'edit' ? selectedNoticia : null}
        mode={formMode}
        onSubmit={handleSubmit}
      />

      {/* Modal de confirmación para eliminar */}
      <Modal show={deleteConfirm !== null} onHide={() => setDeleteConfirm(null)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro que deseas eliminar esta noticia? Esta acción no se puede deshacer.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setDeleteConfirm(null)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={() => handleDelete(deleteConfirm!)}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
    </AdminDashboard>
  );
};

export default AdminNoticias;