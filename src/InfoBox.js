import React from 'react';

const InfoBox = ({ title, count, bgColor }) => {
  // Set the alpha value for transparency on the background color
  const transparentBgColor = `${bgColor}80`; // '80' is the alpha value for 50% transparency

  const boxStyle = {
    padding: '20px',
    borderRadius: '10px',
    color: '#333',
    backgroundColor: bgColor,
    // Add more styles as needed
  };

  return (
    <div style={boxStyle}>
      <div>{title}</div>
      <div style={{ fontSize: '2em', fontWeight: 'bold' }}>{count}</div>
    </div>
  );
};

export default InfoBox;
