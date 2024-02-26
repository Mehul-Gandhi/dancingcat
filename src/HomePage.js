import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

// Import your images here
import image1 from './images/image1.png';
import image3 from './images/image3.jpg';
import image4 from './images/image4.JPG';
import image5 from './images/image5.jpg';
import image6 from './images/image6.jpg';
import image7 from './images/image7.jpg';
import image8 from './images/image8.JPG';
import image9 from './images/image9.jpg';
import image10 from './images/image10.jpg';
import image11 from './images/image11.jpeg';
import image12 from './images/image12.jpeg';
import image13 from './images/image13.jpeg';
import image14 from './images/image14.png';
import image15 from './images/image15.jpg';

const images = [image1, image3, image4, image5, image6, image7, image8, image9, image10, image11, image12, image13, image14, image15];

const HomePage = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [pawPosition, setPawPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImage((currentImage) => (currentImage + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    // Cleanup function
    return () => clearInterval(intervalId);
  }, []);

  // Function to update paw position based on mouse movement
  const handleMouseMove = (event) => {
    const viewportWidth = document.documentElement.clientWidth;
    const viewportHeight = document.documentElement.clientHeight;

    // Calculate the position of the paw relative to the image size
    const pawX = (event.clientX / viewportWidth) * 100;
    const pawY = (event.clientY / viewportHeight) * 100;

    setPawPosition({ x: pawX, y: pawY });
  };

  return (
    <div className="image-container" onMouseMove={handleMouseMove} style={{ position: 'relative' }}>
      <h1 className="title">Welcome to the Dancing Cat!</h1>
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`image${index + 1}`}
          className={`image ${index === currentImage ? 'active' : ''}`}
        />
      ))}
      <Link to="/dashboard" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        <button className="dashboard-button">🐱 Go to Dashboard</button>
      </Link>
      {/* Cat paw animation */}
      <div className="cat-paw" style={{ left: `${pawPosition.x}%`, top: `${pawPosition.y}%` }}></div>
    </div>
  );
};

export default HomePage;
