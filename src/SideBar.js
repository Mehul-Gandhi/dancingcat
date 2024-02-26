import React from 'react';
import { Link } from 'react-router-dom';
import MyBarChart from "./BarChart";

const Sidebar = () => {
  const sidebarStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between', // This pushes the chart to the bottom
    width: '250px',
    height: '100vh',
    background: '#3FA9A9',
    color: '#fff',
    padding: '30px'
  };
  return (
    <div style={{ width: '200px', height: '150vh', background: '#3FA9A9', color: '#fff', padding: '20px' }}>
      <h2>Dashboard</h2>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        <li><Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>Home</Link></li>
        <li><Link to="/reports" style={{ color: '#fff', textDecoration: 'none' }}>Reports</Link></li>
        {/* Add more navigation links here */}
      </ul>
      {/* <MyBarChart /> */}
    
    </div>
  );
};

export default Sidebar;
