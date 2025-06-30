// AdminJuegos.tsx
import { useState, useEffect } from 'react';
import { useAdmin } from '../context/AdminContext';
import JuegoModal from '../components/Juegos/JuegosModal';
import JuegoFormModal from './JuegoFormModal';
import { Button, Table } from 'react-bootstrap';
import type { Juego } from '../types/juego';
import AdminDashboard from '../pages/AdminDashboard';

export const AdminJuegos = () => {
  const { juegos, addJuego, updateJuego, deleteJuego } = useAdmin();
  const [selectedJuego, setSelectedJuego] = useState<Juego | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [formMode, setFormMode] = useState<'add' | 'edit'>('add');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // En un caso real, los juegos se cargarían a través del AdminContext
    setLoading(false);
  }, []);

  const handleEdit = (juego: Juego) => {
    setSelectedJuego(juego);
    setFormMode('edit');
    setShowFormModal(true);
  };

  const handleAdd = () => {
    setSelectedJuego(null);
    setFormMode('add');
    setShowFormModal(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Estás seguro de eliminar este juego?')) {
      const success = await deleteJuego(id);
      if (!success) {
        alert('Error al eliminar el juego');
      }
    }
  };

  if (loading) return <div>Cargando...</div>;

  return (
    <AdminDashboard>
      <div className="admin-juegos mb-5">
        <h2 className="mb-4">Gestión de Juegos</h2>
        
        <Button variant="primary" onClick={handleAdd} className="mb-3">
          Agregar Nuevo Juego
        </Button>
        
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Imagen</th>
              <th>Título</th>
              <th>Precio</th>
              <th>Oferta</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {juegos.map(juego => (
              <tr key={juego.id}>
                <td>{juego.id}</td>
                <td>
                  <img 
                    src={juego.images[0]} 
                    alt={juego.title} 
                    style={{ width: '50px', height: 'auto' }}
                  />
                </td>
                <td>{juego.title}</td>
                <td>${juego.price}</td>
                <td>{juego.oferta || 'No'}</td>
                <td>
                  <Button 
                    variant="info" 
                    size="sm" 
                    onClick={() => {
                      setSelectedJuego(juego);
                      setShowModal(true);
                    }}
                    className="me-2"
                  >
                    Ver
                  </Button>
                  <Button 
                    variant="warning" 
                    size="sm" 
                    onClick={() => handleEdit(juego)}
                    className="me-2"
                  >
                    Editar
                  </Button>
                  <Button 
                    variant="danger" 
                    size="sm" 
                    onClick={() => handleDelete(juego.id)}
                  >
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {selectedJuego && (
          <JuegoModal 
            show={showModal} 
            onHide={() => setShowModal(false)} 
            juego={selectedJuego} 
          />
        )}
        
        <JuegoFormModal 
          show={showFormModal} 
          onHide={() => setShowFormModal(false)} 
          juego={formMode === 'edit' ? selectedJuego : null}
          mode={formMode}
        />
      </div>
    </AdminDashboard>
  );
};