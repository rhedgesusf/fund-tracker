import React from 'react';
import { Line } from 'react-chartjs-2';

const IndustryTrendChart = ({ data }) => {
  const chartData = {
    labels: data.industries,
    datasets: [
      {
        label: 'Funding Trends',
        data: data.trends,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
    ],
  };

  return <Line data={chartData} />;
};

export default IndustryTrendChart;