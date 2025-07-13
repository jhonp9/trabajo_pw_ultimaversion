import { useState, useEffect } from 'react';
import { Button, Table, Alert, Spinner, Modal } from 'react-bootstrap';
import JuegoFormModal from './JuegoFormModal';
import { useAdmin } from '../context/AdminContext';
import type { Juego } from '../types/juego';
import { FaEdit, FaTrash, FaEye, FaPlus } from 'react-icons/fa';
import AdminDashboard from '../pages/AdminDashboard';

const AdminJuegos = () => {
  const {
    juegos,
    loading,
    error,
    addJuego,
    updateJuego,
    deleteJuego,
    refreshData
  } = useAdmin();

  const [selectedJuego, setSelectedJuego] = useState<Juego | null>(null);
  const [showFormModal, setShowFormModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [formMode, setFormMode] = useState<'add' | 'edit'>('add');
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Manejar éxito/error
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const handleAdd = () => {
    setSelectedJuego(null);
    setFormMode('add');
    setShowFormModal(true);
  };

  const handleEdit = (juego: Juego) => {
    setSelectedJuego(juego);
    setFormMode('edit');
    setShowFormModal(true);
  };

  const handleView = (juego: Juego) => {
    setSelectedJuego(juego);
    setShowViewModal(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteJuego(id);
      setSuccessMessage('Juego eliminado correctamente');
      refreshData();
    } catch (error) {
      console.error('Error deleting game:', error);
    } finally {
      setDeleteConfirm(null);
    }
  };

  const handleSubmit = async (juegoData: Partial<Juego>) => {
    try {
      if (formMode === 'add') {
        await addJuego(juegoData as Omit<Juego, 'id'>);
        setSuccessMessage('Juego agregado correctamente');
      } else if (formMode === 'edit' && selectedJuego) {
        await updateJuego(selectedJuego.id, juegoData);
        setSuccessMessage('Juego actualizado correctamente');
      }
      setShowFormModal(false);
      refreshData();
    } catch (error) {
      console.error('Error saving game:', error);
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
    <div className="admin-juegos mb-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Gestión de Juegos</h2>
        <Button variant="primary" onClick={handleAdd}>
          <FaPlus className="me-2" /> Agregar Juego
        </Button>
      </div>

      {successMessage && (
        <Alert variant="success" onClose={() => setSuccessMessage(null)} dismissible>
          {successMessage}
        </Alert>
      )}

      <Table striped bordered hover responsive className="mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Imagen</th>
            <th>Título</th>
            <th>Precio</th>
            <th>Rating</th>
            <th>Ventas</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {juegos.length > 0 ? (
            juegos.map(juego => (
              <tr key={juego.id}>
                <td>{juego.id}</td>
                <td>
                  <img 
                    src={juego.images[0]} 
                    alt={juego.title} 
                    style={{ width: '50px', height: 'auto', objectFit: 'cover' }}
                    className="img-thumbnail"
                  />
                </td>
                <td>{juego.title}</td>
                <td>${juego.price.toFixed(2)}</td>
                <td>{juego.rating}/5</td>
                <td>{juego.sales}</td>
                <td>
                  <div className="d-flex gap-2">
                    <Button 
                      variant="info" 
                      size="sm" 
                      onClick={() => handleView(juego)}
                      title="Ver detalles"
                    >
                      <FaEye />
                    </Button>
                    <Button 
                      variant="warning" 
                      size="sm" 
                      onClick={() => handleEdit(juego)}
                      title="Editar"
                    >
                      <FaEdit />
                    </Button>
                    <Button 
                      variant="danger" 
                      size="sm" 
                      onClick={() => setDeleteConfirm(juego.id)}
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
              <td colSpan={7} className="text-center">
                No hay juegos registrados
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Modal para agregar/editar juegos */}
      <JuegoFormModal
        show={showFormModal}
        onHide={() => setShowFormModal(false)}
        juego={formMode === 'edit' ? selectedJuego : null}
        mode={formMode}
        onSubmit={handleSubmit}
      />

      {/* Modal para ver detalles */}
      <Modal show={showViewModal} onHide={() => setShowViewModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{selectedJuego?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedJuego && (
            <div>
              <div className="mb-3">
                <h5>Descripción</h5>
                <p>{selectedJuego.description}</p>
              </div>
              
              <div className="row mb-3">
                <div className="col-md-6">
                  <h5>Géneros</h5>
                  <ul>
                    {selectedJuego.genres.map((genre, i) => (
                      <li key={i}>{genre}</li>
                    ))}
                  </ul>
                </div>
                <div className="col-md-6">
                  <h5>Plataformas</h5>
                  <ul>
                    {selectedJuego.platforms.map((platform, i) => (
                      <li key={i}>{platform}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mb-3">
                <h5>Imágenes</h5>
                <div className="d-flex flex-wrap gap-2">
                  {selectedJuego.images.map((image, i) => (
                    <img 
                      key={i} 
                      src={image} 
                      alt={`${selectedJuego.title} ${i + 1}`}
                      style={{ width: '100px', height: 'auto' }}
                      className="img-thumbnail"
                    />
                  ))}
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <h5>Requisitos Mínimos</h5>
                  <ul>
                    {selectedJuego.requirements.minimum.map((req, i) => (
                      <li key={`min-${i}`}>{req}</li>
                    ))}
                  </ul>
                </div>
                <div className="col-md-6">
                  <h5>Requisitos Recomendados</h5>
                  <ul>
                    {selectedJuego.requirements.recommended.map((req, i) => (
                      <li key={`rec-${i}`}>{req}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowViewModal(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal de confirmación para eliminar */}
      <Modal show={deleteConfirm !== null} onHide={() => setDeleteConfirm(null)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro que deseas eliminar este juego? Esta acción no se puede deshacer.
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

export default AdminJuegos;