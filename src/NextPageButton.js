import React from 'react';
import { useNavigate } from 'react-router-dom';

const NextPageButton = () => {
  const navigate = useNavigate();
  
  // Inline styles
  const buttonStyle = {
    padding: '10px 15px',
    backgroundColor: '#FFD700', // Golden for a touch of luxury
    color: '#FFFFFF',
    fontSize: '16px',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px', // Space between text and icon
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Soft shadow for depth
    fontFamily: "'Comic Sans MS', cursive, sans-serif", // Fun and playful font
  };

  return (
    <button
      style={buttonStyle}
      onClick={() => navigate('/next-page')}
    >
      <span>Next Page 🐾</span>
    </button>
  );
};

export default NextPageButton;
