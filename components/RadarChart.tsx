
import React from 'react';
import { Radar } from 'react-chartjs-2';
import { CategoryScore } from '../types';

interface RadarChartProps {
  data: CategoryScore[];
  partner1Name: string;
  partner2Name: string;
}

const RadarChart: React.FC<RadarChartProps> = ({ data, partner1Name, partner2Name }) => {
  const chartData = {
    labels: data.map(d => d.category.replace(' & ', ' & \n')),
    datasets: [
      {
        label: partner1Name,
        data: data.map(d => d.partner1Score),
        backgroundColor: 'rgba(90, 139, 123, 0.2)',
        borderColor: 'rgba(90, 139, 123, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(90, 139, 123, 1)',
      },
      {
        label: partner2Name,
        data: data.map(d => d.partner2Score),
        backgroundColor: 'rgba(221, 230, 225, 0.6)',
        borderColor: 'rgba(150, 150, 150, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(150, 150, 150, 1)',
      },
    ],
  };

  const options = {
    scales: {
      r: {
        angleLines: {
            color: '#DDE6E1'
        },
        grid: {
            color: '#DDE6E1'
        },
        pointLabels: {
          font: {
            size: 11,
            family: 'Inter, sans-serif'
          },
          color: '#555555'
        },
        suggestedMin: 0,
        suggestedMax: 5,
        ticks: {
          stepSize: 1,
          backdropColor: 'transparent',
          color: '#5A8B7B'
        },
      },
    },
    plugins: {
        legend: {
            position: 'top' as const,
        },
    },
    maintainAspectRatio: true,
  };

  return <Radar data={chartData} options={options} />;
};

export default RadarChart;