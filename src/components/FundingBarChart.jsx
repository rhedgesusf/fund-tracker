import React from 'react';
import { Bar } from 'react-chartjs-2';

const FundingBarChart = ({ data }) => {
  const chartData = {
    labels: data.years,
    datasets: [
      {
        label: 'Total Funding',
        data: data.totals,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  return <Bar data={chartData} />;
};

export default FundingBarChart;