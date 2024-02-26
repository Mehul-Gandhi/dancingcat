import React from 'react';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
  } from 'chart.js';
import { Pie } from 'react-chartjs-2';
ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

const PieChart = ({ data }) => {
  const chartData = {
    labels: Object.keys(data).map(status => status),
    datasets: [
      {
        data: Object.values(data).map(status => status.Values),
        percent: Object.values(data).map(status => status.Percent),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          // add more colors as needed
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          // add more colors as needed
        ]
      }
    ]
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Kitten Tracking Status'
      }
    }
  };

  return (    <div style={{ width: '400px', height: '300px' }}> {/* Adjust the size here */}
  <Pie data={chartData} options={options} style={{ width: '500px', height: '300px' }}/>
  </div>
);
};

export default PieChart;
