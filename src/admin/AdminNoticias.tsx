// components/admin/AdminNoticias.tsx
import { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import NoticiaFormModal from './NoticiaFormModal';
import { Button, Table } from 'react-bootstrap';
import type { Noticia } from '../types/noticia';
import AdminDashboard from '../pages/AdminDashboard';

const AdminNoticias = () => {
  const { noticias, deleteNoticia } = useAdmin();
  const [showFormModal, setShowFormModal] = useState(false);
  const [selectedNoticia, setSelectedNoticia] = useState<Noticia | null>(null);
  const [formMode, setFormMode] = useState<'add' | 'edit'>('add');

  const handleEdit = (noticia:Noticia) => {
    setSelectedNoticia(noticia);
    setFormMode('edit');
    setShowFormModal(true);
  };

  const handleAdd = () => {
    setSelectedNoticia(null);
    setFormMode('add');
    setShowFormModal(true);
  };

  return (
    <AdminDashboard>
        <div className="admin-noticias mb-5">
        <h2 className="mb-4">Gestión de Noticias</h2>
        
        <Button variant="primary" onClick={handleAdd} className="mb-3">
            Agregar Nueva Noticia
        </Button>
        <div>
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
            {noticias.map(noticia => (
                <tr key={noticia.id}>
                <td>{noticia.titulo}</td>
                <td>{noticia.autor}</td>
                <td>{noticia.fecha}</td>
                <td>
                    <Button 
                    variant="warning" 
                    size="sm" 
                    onClick={() => handleEdit(noticia)}
                    className="me-2"
                    >
                    Editar
                    </Button>
                    <Button 
                    variant="danger" 
                    size="sm" 
                    onClick={() => deleteNoticia(noticia.id)}
                    >
                    Eliminar
                    </Button>
                </td>
                </tr>
            ))}
            </tbody>
        </Table>
        </div>

        <NoticiaFormModal 
            show={showFormModal} 
            onHide={() => setShowFormModal(false)} 
            noticia={formMode === 'edit' ? selectedNoticia : null}
            mode={formMode}
        />
        </div>
    </AdminDashboard>
  );
};

export default AdminNoticias;