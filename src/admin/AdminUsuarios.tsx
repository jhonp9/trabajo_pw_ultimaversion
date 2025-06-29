// components/admin/AdminUsuarios.tsx
import { useAdmin } from '../context/AdminContext';
import { Table, Button } from 'react-bootstrap';
import AdminDashboard from '../pages/AdminDashboard';

const AdminUsuarios = () => {
  const { usuarios } = useAdmin();

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
                  <Button variant="warning" size="sm" className="me-2">
                    Editar
                  </Button>
                  <Button variant="danger" size="sm">
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