import { useEffect, useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { getSalesData } from '../../api/analyticsApii';
import { chartOptions } from '../../utils/chartConfig';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Registra los componentes necesarios de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const DataChart = () => {
  const [salesData, setSalesData] = useState(null);
  const [chartType, setChartType] = useState<'bar' | 'line'>('bar');

  useEffect(() => {
    const fetchData = async () => {
      const data = await getSalesData();
      setSalesData(data);
    };
    fetchData();
  }, []);

  const chartData = {
    labels: salesData?.months || [],
    datasets: [
      {
        label: 'Ganancias ($)',
        data: salesData?.revenue || [],
        backgroundColor: 'rgba(0, 255, 136, 0.7)',
        borderColor: 'rgba(0, 255, 136, 1)',
        borderWidth: 2,
      },
    ],
  };

  const handleChartTypeChange = () => {
    setChartType(prev => prev === 'bar' ? 'line' : 'bar');
  };

  return (
    <div className="data-chart-container">
      <div className="chart-header">
        <h3>Ganancias Mensuales</h3>
        <button 
          onClick={handleChartTypeChange}
          className="chart-type-toggle"
        >
          Cambiar a {chartType === 'bar' ? 'Líneas' : 'Barras'}
        </button>
      </div>
      
      <div className="chart-wrapper">
        {salesData ? (
          chartType === 'bar' ? (
            <Bar data={chartData} options={chartOptions} />
          ) : (
            <Line data={chartData} options={chartOptions} />
          )
        ) : (
          <p>Cargando datos de ventas...</p>
        )}
      </div>

      <div className="chart-summary">
        <div className="summary-item">
          <span>Total anual:</span>
          <strong>
            ${salesData?.revenue.reduce((a, b) => a + b, 0).toLocaleString() || '0'}
          </strong>
        </div>
        <div className="summary-item">
          <span>Mes con más ventas:</span>
          <strong>
            {salesData?.months[salesData?.revenue.indexOf(Math.max(...salesData?.revenue))] || '-'}
          </strong>
        </div>
        <div className="summary-item">
          <span>Promedio mensual:</span>
          <strong>
            ${salesData?.revenue.length ? 
              (salesData.revenue.reduce((a, b) => a + b, 0) / salesData.revenue.length).toFixed(2).toLocaleString() 
              : '0'}
          </strong>
        </div>
      </div>
    </div>
  );
};

export default DataChart;