// src/components/TokenDisplay.jsx
import React from 'react';

const TokenDisplay = ({ tokenNumber, size = 'medium' }) => {
  const getSizeStyles = () => {
    const sizes = {
      small: {
        container: { width: '50px', height: '50px', fontSize: '1.2rem' },
        label: { fontSize: '0.6rem' },
      },
      medium: {
        container: { width: '70px', height: '70px', fontSize: '1.8rem' },
        label: { fontSize: '0.7rem' },
      },
      large: {
        container: { width: '100px', height: '100px', fontSize: '2.5rem' },
        label: { fontSize: '0.8rem' },
      },
    };
    return sizes[size] || sizes.medium;
  };

  const sizeStyles = getSizeStyles();

  return (
    <div style={{...styles.container, ...sizeStyles.container}}>
      <div style={{...styles.label, ...sizeStyles.label}}>TOKEN</div>
      <div style={styles.number}>{tokenNumber}</div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: 'white',
    borderRadius: '50%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    border: '3px solid white',
    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
  },
  label: {
    color: '#7f8c8d',
    marginBottom: '2px',
  },
  number: {
    color: '#2c3e50',
  },
};

export default TokenDisplay;