import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const sidebarStyle = {
    width: '250px',
    height: '100vh',
    background: '#3F9A9A', 
    color: '#fff',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column', 
  };

  const titleStyle = {
    textAlign: 'center',
    marginBottom: '30px',
    fontFamily: '"Lucida Sans", "Lucida Sans Regular", "Lucida Grande", "Lucida Sans Unicode", sans-serif',
  };

  const linkStyle = {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '18px',
    margin: '10px 0', 
    padding: '10px',
    borderRadius: '5px', 
    transition: 'background-color 0.3s', 
  };

  
  const activeStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.2)', 
  };

  return (
    <div style={sidebarStyle}>
      <h2 style={titleStyle}>Dashboard</h2>
      <NavLink exact to="/" style={linkStyle} activeStyle={activeStyle}>
        Home
      </NavLink>
      <NavLink to="/EmergencyDashboard" style={linkStyle} activeStyle={activeStyle}>
        Emergency Fund Response
      </NavLink>
      <NavLink to="/Dashboard" style={linkStyle} activeStyle={activeStyle}>
        Kitten Dashboard
      </NavLink>
    </div>
  );
};

export default Sidebar;
