import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  TooltipItem,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const TotalSalesChart = ({ timeframe }: { timeframe: string }) => {
  const getDataForTimeframe = (timeframe: string) => {
    switch (timeframe) {
      case 'today':
        return {
          labels: [
            '07:00 AM',
            '08:00 AM',
            '09:00 AM',
            '10:00 AM',
            '11:00 AM',
            '12:00 PM',
            '01:00 PM',
            '02:00 PM',
            '03:00 PM',
            '04:00 PM',
            '05:00 PM',
            '06:00 PM',
            '07:00 PM',
            '08:00 PM',
            '09:00 PM',
            '10:00 PM',
            '11:00 PM',
          ],
          datasets: [
            {
              label: 'Today',
              data: [
                5, 8, 12, 0, 25, 6, 3, 15, 18, 20, 23, 25, 30, 28, 27, 22, 20,
              ],
              borderColor: 'rgba(75,192,192,1)',
              backgroundColor: 'rgba(75,192,192,0.2)',
              fill: true,
            },
            {
              label: 'yesterday',
              data: [
                12, 2, 0, 0, 4, 16, 30, 25, 8, 0, 21, 26, 12, 29, 26, 24, 30,
              ],
              borderColor: 'rgba(255,0,0,1)',
              backgroundColor: 'rgba(255,0,0,0.2)',
              fill: true,
            },
          ],
        };
      case 'this_week':
        return {
          labels: [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday',
          ],
          datasets: [
            {
              label: 'This week',
              data: [50, 60, 70, 80, 90, 100, 110],
              borderColor: 'rgba(75,192,192,1)',
              backgroundColor: 'rgba(75,192,192,0.2)',
              fill: true,
            },
            {
              label: 'Last week',
              data: [29, 26, 30, 60, 70, 80, 90],
              borderColor: 'rgba(255,0,0,1)',
              backgroundColor: 'rgba(255,0,0,0.2)',
              fill: true,
            },
          ],
        };
      case 'this_month':
        return {
          labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
          datasets: [
            {
              label: 'This  month',

              data: [200, 250, 300, 350],
              borderColor: 'rgba(75,192,192,1)',
              backgroundColor: 'rgba(75,192,192,0.2)',
              fill: true,
            },
            {
              label: 'Last  month',

              data: [160, 280, 270, 320],
              borderColor: 'rgba(255,0,0,1)',
              backgroundColor: 'rgba(255,0,0,0.2)',
              fill: true,
            },
          ],
        };
      default:
        return {
          labels: [],
          datasets: [],
        };
    }
  };

  const data = getDataForTimeframe(timeframe);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem: TooltipItem<'line'>) {
            return `Sales: $${tooltipItem.raw}`;
          },
        },
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: 'Sales',
        },
        beginAtZero: true,
      },
    },
  };

  return <Line options={options} data={data} className="w-full" />;
};
export default TotalSalesChart;
