import React from 'react';
import InfoBox from './InfoBox';

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
  };

  return (
    <div style={mainContentStyle}>
      <h1 style={headerStyle}>Welcome to the Cat Dashboard</h1>
      <div style={gridContainerStyle}>
        <InfoBox title="Total Cats" count={26} bgColor="rgba(251, 207, 232, 0.8)" /> 
        <InfoBox title="Needing Vaccinations" count={9} bgColor="rgba(170, 214, 219, 0.8)" /> 
        <InfoBox title="Needing Spay/Neuter" count={7} bgColor="rgba(255, 244, 213, 0.8)" /> 
        <InfoBox title="Kittens Needing Tests" count={12} bgColor="rgba(220, 232, 250, 0.8)" /> 
        {/* Add more components or content here */}
      </div>
    </div>
  );
};

export default MainContent;
