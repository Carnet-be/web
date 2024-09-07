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

const RevenueChart = ({ timeframe }: { timeframe: string }) => {
  const getDataForTimeframe = (timeframe: string) => {
    switch (timeframe) {
      case 'today':
        return {
          labels: [
            '07:00 AM', '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
            '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM',
            '07:00 PM', '08:00 PM', '09:00 PM', '10:00 PM', '11:00 PM',
          ],
          datasets: [
            {
              label: 'Today',
              data: [
                150, 230, 310, 0, 400, 250, 180, 320, 290, 360, 420, 500, 470, 530, 480, 460, 390,
              ],
              borderColor: 'rgba(75,192,192,1)',
              backgroundColor: 'rgba(75,192,192,0.2)',
              fill: true,
            },
            {
              label: 'Yesterday',
              data: [
                120, 180, 0, 0, 100, 220, 400, 370, 200, 0, 450, 480, 390, 520, 470, 440, 510,
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
            'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday',
          ],
          datasets: [
            {
              label: 'This Week',
              data: [3500, 4200, 4700, 5000, 6200, 7000, 7500],
              borderColor: 'rgba(75,192,192,1)',
              backgroundColor: 'rgba(75,192,192,0.2)',
              fill: true,
            },
            {
              label: 'Last Week',
              data: [3000, 3600, 4000, 4500, 4800, 5200, 5800],
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
              label: 'This Month',
              data: [15000, 20000, 22000, 27000],
              borderColor: 'rgba(75,192,192,1)',
              backgroundColor: 'rgba(75,192,192,0.2)',
              fill: true,
            },
            {
              label: 'Last Month',
              data: [13000, 18000, 21000, 23000],
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
            return `Revenue: $${tooltipItem.raw}`;
          },
        },
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: 'Revenue',
        },
        beginAtZero: true,
      },
    },
  };

  return <Line options={options} data={data} className="w-full" />;
};

export default RevenueChart;
