import React from 'react';
import Sidebar from './SideBar';
import MainContent from './MainContent';

const Dashboard = () => {
  return (
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <MainContent />

    </div>
    
  );
};

export default Dashboard;
