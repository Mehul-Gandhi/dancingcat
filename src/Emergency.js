import React from 'react';
import InfoBox from './InfoBox';
import { Link } from 'react-router-dom';

const Emergency = () => {
  const pageStyle = {
    flex: 1,
    padding: '20px',
    backgroundColor: '#FEF9EF', // Cat fur color
    color: '#3E3E3E', // Dark color
  };

  const gridContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    marginBottom: '40px', 
  };

  const dataSummary = [
    { title: 'Total Cases', count: 122 },
    { title: 'Open Medical Cases', count: 4 },
    { title: 'Closed Medical Cases', count: 23 },
    { title: 'Cases eligible for Graham Grant', count: 9 },
    { title: 'Spray/neuters paid by PAHS - adult cats ', count: 17},
    { title: 'Spray/neuters paid by PAHS - kittens ', count: 16},
    { title: 'Number of cats assisted ', count: 134},
    { title: 'Number of kittens assisted', count: 64}
  ];

  return (
    <div style={pageStyle}>
      <h1 style={{ textAlign: 'center', margin: '20px 0' }}>Community Support and Emergency Fund Requests 2024</h1>
      <div style={gridContainerStyle}>
        {dataSummary.map((item, index) => (
          <div key={index}>
            {item.title === 'Cases eligible for Graham Grant' ? (
              <Link to="/GalleryConnect">
                <InfoBox title={item.title} count={item.count} bgColor="#3F9A9A"/>
              </Link>
            ) : item.title === 'Open Medical Cases' ? (
              <Link to="/TableView">
                <InfoBox title={item.title} count={item.count} bgColor="#3F9A9A"/>
              </Link>
            ) : (
              <InfoBox title={item.title} count={item.count} bgColor="#3F9A9A" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Emergency;
