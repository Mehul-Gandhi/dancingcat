import React from 'react';
import Sidebar from './SideBar';
import MedicalInfoTable from './MedicalInfoTable';

const TableView = () => {
  return (
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <MedicalInfoTable />
    </div>
    
  );
};

export default TableView;
