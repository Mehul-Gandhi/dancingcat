import React from 'react';
import cat1 from './images/cat1.jpg';
import cat2what from './images/cat-shadow.jpg'
import cat3 from './images/cat3.JPEG';
// import cat5 from './images/cat5.jpg';
import cat7 from './images/cat7.jpeg';
import cat8 from './images/cat8.jpg';
import cat9 from './images/cat9.jpg';


const Gallery = () => {
  const catData = [
    {
      photo: cat1,
      name: 'Thomas',
      age: '1-2 years',
      status: 'Closed',
      requestType: 'Spray/Neuter Assistance',
      totalCost: '$100',
    },
    {
      photo: cat2what,
      name: 'Two Face',
      age: '9 months',
      status: 'Closed',
      requestType: 'Spray/Neuter Assistance',
      totalCost: '$150',
    },
    {
        photo: cat3,
        name: 'Buffy',
        age: '2 years',
        status: 'Closed',
        requestType: 'Sick/injured own cat',
        totalCost: '$150',
      },
      {
        photo: cat2what,
        name: 'Chico',
        age: 'N/A',
        status: 'Closed',
        requestType: 'Sick/injured own cat',
        totalCost: '$150',
      },
      {
        photo: cat2what,
        name: 'Gabby',
        age: '4 months',
        status: 'Closed',
        requestType: 'Spray/Neuter Assistance',
        totalCost: '$150',
      },
      {
        photo: cat2what,
        name: 'Milo',
        age: '1 years',
        status: 'Open',
        requestType: 'Sick/injured own cat',
        totalCost: '$150',
      },
      {
        photo: cat7,
        name: 'Little',
        age: '8 months',
        status: 'Closed',
        requestType: 'Spray/Neuter Assistance',
        totalCost: '$150',
      },
      {
        photo: cat8,
        name: 'Valentina/Titi',
        age: 'N/A',
        status: 'Closed',
        requestType: 'Sick/injured own cat',
        totalCost: '$150',
      },
      {
        photo: cat9,
        name: 'Luca',
        age: '2 years',
        status: 'Open',
        requestType: 'Sick/injured own cat',
        totalCost: '$150',
      },
  ];

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {catData.map((cat, index) => (
        <div key={index} style={styles.card}>
          <img src={cat.photo} alt={cat.name} style={styles.image} />
          <div style={styles.details}>
            <h3>{cat.name}</h3>
            <p><strong>Age:</strong> {cat.age}</p>
            <p><strong>Status:</strong> {cat.status}</p>
            <p><strong>Type of Request:</strong> {cat.requestType}</p>
            <p><strong>Total Cost:</strong> {cat.totalCost}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

const styles = {
  card: {
    width: '300px',
    margin: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  image: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
  },
  details: {
    padding: '20px',
  },
};

export default Gallery;
