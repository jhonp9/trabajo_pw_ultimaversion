import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import type { ChartOptions } from 'chart.js';

  export const registerCharts = () => {
    ChartJS.register(
      CategoryScale,
      LinearScale,
      BarElement,
      Title,
      Tooltip,
      Legend
    );
  };
  
  export const chartOptions: ChartOptions<'bar' | 'line'> = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
      labels: {
        color: '#ffffff'
      }
    },
    title: {
      display: true,
      text: 'Ganancias Mensuales',
      color: '#ffffff',
      font: {
        size: 16
      }
    },
    tooltip: {
      backgroundColor: '#0a0a0a',
      titleColor: '#00ff88',
      bodyColor: '#ffffff',
      borderColor: '#00ff88',
      borderWidth: 1,
      padding: 10
    }
  },
  scales: {
    x: {
      ticks: {
        color: '#ffffff'
      },
      grid: {
        color: 'rgba(255, 255, 255, 0.1)'
      }
    },
    y: {
      ticks: {
        color: '#ffffff',
        callback: (value) => '$' + value
      },
      grid: {
        color: 'rgba(255, 255, 255, 0.1)'
      }
    }
  },
  maintainAspectRatio: false
};