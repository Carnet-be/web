import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import type { ChartOptions } from 'chart.js';

// Register components for Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Define TypeScript interface for the props
interface CustomerActivityProps {
  data: {
    customerActivity: {
      label: string;
      count: number;
    }[];
  };
}

// Define the CustomerActivityChart component
const CustomerActivityChart: React.FC<CustomerActivityProps> = ({ data }) => {
  // Prepare data for Chart.js
  const chartData = {
    labels: data.customerActivity.map(activity => activity.label),
    datasets: [
      {
        label: 'Customer Activity',
        data: data.customerActivity.map(activity => activity.count),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Chart options with more specific typing
  const options: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.label}: ${context.toLocaleString()}`;
          },
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return value.toLocaleString();
          },
        },
      },
    },
  };

  return (
    <div className=" w-full">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default CustomerActivityChart;
