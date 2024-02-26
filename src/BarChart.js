import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const MyBarChart = () => {
  const [ageData, setAgeData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/kitten-tracking-ages')
      .then(response => response.json())
      .then(data => {
        // Convert the `age` object to an array format suitable for the bar chart
        const formattedData = Object.keys(data).map(ageWeek => ({
          ageWeek: `Week ${ageWeek}`,
          kittens: data[ageWeek]
        }));
        setAgeData(formattedData);
      }).then(console.log('ageData:', ageData))
      .catch(error => console.error('Error fetching age data:', error));
  }, []);

  return (
    <BarChart width={500} height={325} data={ageData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="ageWeek" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="kittens" fill="lightblue" />
    </BarChart>
  );
};

export default MyBarChart;
