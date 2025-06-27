import { useState, useEffect } from 'react';
import { getSalesData } from '../api/analyticsApii';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Analytics = () => {
  const [salesData, setSalesData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await getSalesData();
    setSalesData(data);
  };

  const chartData = {
    labels: salesData?.months || [],
    datasets: [
      {
        label: 'Ganancias por mes',
        data: salesData?.revenue || [],
        backgroundColor: 'rgba(0, 255, 136, 0.5)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Ganancias Mensuales',
      },
    },
  };

  return (
    <div className="analytics">
      <h2>Analíticas de Ventas</h2>
      <div className="chart-container">
        {salesData ? (
          <Bar options={options} data={chartData} />
        ) : (
          <p>Cargando datos...</p>
        )}
      </div>
    </div>
  );
};

export default Analytics;