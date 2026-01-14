
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { CategoryScore } from '../types';

interface BarComparisonChartProps {
  data: CategoryScore[];
  partner1Name: string;
  partner2Name: string;
}

const BarComparisonChart: React.FC<BarComparisonChartProps> = ({ data, partner1Name, partner2Name }) => {
  const chartData = {
    labels: data.map(d => d.category),
    datasets: [
      {
        label: partner1Name,
        data: data.map(d => d.partner1Score),
        backgroundColor: '#5A8B7B',
        borderColor: '#5A8B7B',
        borderWidth: 1,
        borderRadius: 4,
      },
      {
        label: partner2Name,
        data: data.map(d => d.partner2Score),
        backgroundColor: '#E98097',
        borderColor: '#E98097',
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  };

  const options = {
    indexAxis: 'y' as const,
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        beginAtZero: true,
        max: 5,
        grid: {
          display: true,
          color: '#F1F5F2',
        },
        ticks: {
          stepSize: 1,
          font: {
            family: 'Inter, sans-serif',
          },
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            family: 'Inter, sans-serif',
            size: 11,
          },
          color: '#333333',
        },
      },
    },
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          boxWidth: 12,
          usePointStyle: true,
          pointStyle: 'circle',
          font: {
            family: 'Inter, sans-serif',
            weight: '600' as const,
          },
        },
      },
      tooltip: {
        backgroundColor: '#333333',
        padding: 12,
        titleFont: {
          family: 'Inter, sans-serif',
          size: 14,
        },
        bodyFont: {
          family: 'Inter, sans-serif',
          size: 13,
        },
      },
    },
  };

  return (
    <div className="w-full h-[600px]">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default BarComparisonChart;