import React from 'react';
import Sidebar from './SideBar';
import Emergency from './Emergency';

const EmergencyDashboard = () => {
  return (
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <Emergency />
    </div>
    
  );
};

export default EmergencyDashboard;
