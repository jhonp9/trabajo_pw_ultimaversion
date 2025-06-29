// components/admin/AdminVentas.tsx
import { useAdmin } from '../context/AdminContext';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Table } from 'react-bootstrap';
import AdminDashboard from '../pages/AdminDashboard';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AdminVentas = () => {
  const { ventasPorMes } = useAdmin();

  const data = {
    labels: ventasPorMes.map(item => item.mes),
    datasets: [
      {
        label: 'Ventas por Mes ($)',
        data: ventasPorMes.map(item => item.total),
        backgroundColor: 'rgba(0, 255, 136, 0.5)',
        borderColor: 'rgba(0, 255, 136, 1)',
        borderWidth: 1
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Ganancias Mensuales',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Monto ($)'
        }
      }
    }
  };

  return (
    <AdminDashboard>
      <div className="admin-ventas mb-5">
      <h2 className="mb-4">Reporte de Ventas</h2>
      
      <div className="chart-container" style={{ height: '400px' }}>
          <Bar data={data} options={options} />
      </div>
      
      <div className="mt-4">
          <h4>Resumen</h4>
          <Table striped bordered hover>
          <thead>
              <tr>
              <th>Mes</th>
              <th>Total ($)</th>
              </tr>
          </thead>
          <tbody>
              {ventasPorMes.map((item, index) => (
              <tr key={index}>
                  <td>{item.mes}</td>
                  <td>${item.total.toLocaleString()}</td>
              </tr>
              ))}
          </tbody>
          </Table>
      </div>
      </div>
    </AdminDashboard>
  );
};

export default AdminVentas;