import React, { useState, useEffect } from 'react';
import InfoBox from './InfoBox';
import MyCalendar from './MyCalender';
import MyBarChart from './BarChart';
import PieChart from "./Pie";

const MainContent = () => {
  const mainContentStyle = {
    flex: 1,
    padding: '20px',
    backgroundColor: '#FEF9EF', // Cat fur color
    color: '#3E3E3E', // Dark color
  };

  const headerStyle = {
    textAlign: 'center',
    color: '#3E3E3E',
    marginBottom: '30px',
    fontFamily: '"Lucida Sans", "Lucida Sans Regular", "Lucida Grande", "Lucida Sans Unicode", sans-serif',
  };

  const gridContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    alignItems: 'stretch',
    marginBottom: '40px',
  };

  const myEvents = [
    {
      title: 'Cat Vaccination',
      start: new Date(2024, 2, 25),
      end: new Date(2024, 2, 25),
    }
  ];

  const [totalCats, setTotalCats] = useState(0);
  const [numVaccinations, setNumVaccinations] = useState(0);
  const [needingSpayNeuter, setNeedingSpayNeuter] = useState(0);
  const [comboTest, setComboTest] = useState(0);
  const [events, setEvents] = useState([]);
  const [statusData, setStatusData] = useState({}); //for the pie chart

  useEffect(() => {
    // Example: Fetching data from the Flask API at '/community-support-numbers' endpoint
    fetch('http://localhost:5000/kitten-tracking-numbers', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setTotalCats(data['Total Cats']);
        setNumVaccinations(data['Vaccinations']); // Example mapping, adjust based on actual API response
        setNeedingSpayNeuter(data['Spay/Neuter']); // Example mapping
        setComboTest(data['Combo Test']); // Example mapping
        // For events, you might need to format them appropriately for your MyCalendar component
        setEvents(data.events); // Assuming 'data.events' is an array of event objects
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);


  useEffect(() => {
    // Example: Fetching data from the Flask API at '/community-support-numbers' endpoint
    fetch('http://localhost:5000/kitten-tracking-status', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setStatusData(data);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);


  return (
    <div style={mainContentStyle}>
      <h1 style={headerStyle}>Welcome to the Cat Dashboard</h1>
      <div style={gridContainerStyle}>
        <InfoBox title="Total Cats" count={totalCats || 0} bgColor="rgba(251, 207, 232, 0.8)" /> 
        <InfoBox title="Needing Vasccinations" count={numVaccinations || 0} bgColor="rgba(170, 214, 219, 0.8)" /> 
        <InfoBox title="Needing Spay/Neuter" count={needingSpayNeuter || 0} bgColor="rgba(255, 244, 213, 0.8)" /> 
        <InfoBox title="Kittens Needing Tests" count={comboTest || 0} bgColor="rgba(220, 232, 250, 0.8)" /> 
        {/* Add more components or content here */}
      </div>
      <MyCalendar events={myEvents} />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ flex: 1 }}>
          <MyBarChart />
        </div>
        <div style={{ flex: 1, paddingLeft: "200px"}}>
          <PieChart data={statusData} />
        </div>
    </div>
    </div>
  );
};

export default MainContent;
