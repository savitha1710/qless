// src/components/SlotCard.jsx
import React from 'react';

const SlotCard = ({ slot, isSelected, onSelect }) => {
  const getCardStyle = () => {
    if (slot.isFull) {
      return { ...styles.card, ...styles.fullCard };
    }
    if (isSelected) {
      return { ...styles.card, ...styles.selectedCard };
    }
    return styles.card;
  };

  return (
    <div 
      style={getCardStyle()} 
      onClick={onSelect}
    >
      <div style={styles.slotTime}>{slot.slot}</div>
      <div style={styles.availability}>
        {slot.isFull ? (
          <span style={styles.fullText}>FULL</span>
        ) : (
          <>
            <span style={styles.availableText}>
              {slot.available} / {slot.total} Available
            </span>
          </>
        )}
      </div>
    </div>
  );
};

const styles = {
  card: {
    padding: '1.5rem',
    border: '2px solid #ddd',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.3s',
    textAlign: 'center',
  },
  selectedCard: {
    borderColor: '#27ae60',
    backgroundColor: '#e8f5e9',
  },
  fullCard: {
    borderColor: '#e74c3c',
    backgroundColor: '#ffebee',
    cursor: 'not-allowed',
    opacity: 0.6,
  },
  slotTime: {
    fontSize: '1.1rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
    color: '#2c3e50',
  },
  availability: {
    fontSize: '0.9rem',
    color: '#7f8c8d',
  },
  availableText: {
    color: '#27ae60',
    fontWeight: 'bold',
  },
  fullText: {
    color: '#e74c3c',
    fontWeight: 'bold',
  },
};

export default SlotCard;