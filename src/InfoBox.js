import React from 'react';

const InfoBox = ({ title, count, bgColor }) => {
  
  const transparentBgColor = `${bgColor}80`; 

  const boxStyle = {
    padding: '20px',
    borderRadius: '10px',
    color: '#333',
    backgroundColor: bgColor,
    
  };

  return (
    <div style={boxStyle}>
      <div>{title}</div>
      <div style={{ fontSize: '2em', fontWeight: 'bold' }}>{count}</div>
    </div>
  );
};

export default InfoBox;
