import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div style={{ width: '250px', height: '100vh', background: '#3FA9A9', color: '#fff', padding: '20px' }}>
      <h2>Dashboard</h2>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        <li><Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>Home</Link></li>
        <li><Link to="/reports" style={{ color: '#fff', textDecoration: 'none' }}>Reports</Link></li>
        {/* Add more navigation links here */}
      </ul>
    </div>
  );
};

export default Sidebar;
