import React from 'react';
import Sidebar from './SideBar';
import Gallery from './Gallery';

const GalleryConnect = () => {
  return (
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <Gallery />
    </div>
  );
};

export default GalleryConnect;
