// components/admin/AdminUsuarios.tsx
import { useAdmin } from '../context/AdminContext';
import { Table, Button } from 'react-bootstrap';
import AdminDashboard from '../pages/AdminDashboard';
import { useState } from 'react';

const AdminUsuarios = () => {
  const { usuarios } = useAdmin();
  const { deleteUsuario } = useAdmin();
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  console.log('Usuarios:', usuarios);

  const handleDelete = async (id: number) => {
  try {
    await deleteUsuario(id);
    // Mostrar mensaje de éxito y refrescar datos
  } catch (error) {
    console.error('Error deleting user:', error);
    // Mostrar mensaje de error
  } finally {
    setDeleteConfirm(null);
  }
};
  return (
    <AdminDashboard>
      <div className="admin-usuarios mb-5">
        <h2 className="mb-4">Gestión de Usuarios</h2>
        
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario, index) => (
              <tr key={index}>
                <td>{usuario.name}</td>
                <td>{usuario.email}</td>
                <td>{usuario.role}</td>
                <td>
                  <Button variant="danger" size="sm" onClick={() => handleDelete(deleteConfirm!)}>
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </AdminDashboard>
  );
};

export default AdminUsuarios;