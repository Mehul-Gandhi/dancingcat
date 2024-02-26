import './App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage.js';
import Dashboard from './Dashboard';
import Recommendation from './Recommendation';
import EmergencyDashboard from './EmergencyDashboard';
import Gallery from './Gallery';
import MedicalInfoTable from './MedicalInfoTable';
import TableView from './TableView';
import GalleryConnect from './GalleryConnect';

import { useState } from 'react';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/recommendation" element={<Recommendation/>} />
        <Route path="/EmergencyDashboard" element={<EmergencyDashboard/>} />
        <Route path="/Gallery" element={<Gallery/>} />
        <Route path="/MedicalInfoTable" element={<MedicalInfoTable/>} />
        <Route path="/TableView" element={<TableView/>} />
        <Route path="/GalleryConnect" element={<GalleryConnect/>} />
      </Routes>
    </Router>
  )
}


export default App;
