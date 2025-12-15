// src/pages/ConfirmBooking.jsx
import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';

const ConfirmBooking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const booking = location.state?.booking;

  if (!booking) {
    return (
      <div style={styles.container}>
        <h2>No booking information found</h2>
        <Link to="/book-slot" style={styles.button}>
          Book a New Slot
        </Link>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.successCard}>
        <div style={styles.checkmark}>✓</div>
        <h2 style={styles.title}>Booking Confirmed!</h2>
        <p style={styles.subtitle}>Your token has been generated successfully</p>

        <div style={styles.tokenDisplay}>
          <span style={styles.tokenLabel}>Your Token Number</span>
          <span style={styles.tokenNumber}>{booking.tokenNumber}</span>
        </div>

        <div style={styles.details}>
          <div style={styles.detailRow}>
            <span style={styles.detailLabel}>Name:</span>
            <span style={styles.detailValue}>{booking.customerName}</span>
          </div>
          <div style={styles.detailRow}>
            <span style={styles.detailLabel}>Phone:</span>
            <span style={styles.detailValue}>{booking.phone}</span>
          </div>
          <div style={styles.detailRow}>
            <span style={styles.detailLabel}>Date:</span>
            <span style={styles.detailValue}>
              {new Date(booking.date).toLocaleDateString()}
            </span>
          </div>
          <div style={styles.detailRow}>
            <span style={styles.detailLabel}>Time Slot:</span>
            <span style={styles.detailValue}>{booking.slot}</span>
          </div>
          <div style={styles.detailRow}>
            <span style={styles.detailLabel}>Status:</span>
            <span style={{...styles.detailValue, ...styles.statusBadge}}>
              {booking.status.toUpperCase()}
            </span>
          </div>
        </div>

        <div style={styles.instructions}>
          <h4>Important Instructions:</h4>
          <ul style={styles.list}>
            <li>Please arrive 10 minutes before your scheduled time</li>
            <li>Keep your token number ready</li>
            <li>You will be called when your token is active</li>
            <li>Check your booking status in "My Bookings"</li>
          </ul>
        </div>

        <div style={styles.actions}>
          <button 
            onClick={() => navigate('/manage-tokens')}
            style={styles.button}
          >
            View My Bookings
          </button>
          <button 
            onClick={() => navigate('/book-slot')}
            style={{...styles.button, backgroundColor: '#95a5a6'}}
          >
            Book Another Slot
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '2rem auto',
    padding: '0 1rem',
  },
  successCard: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    textAlign: 'center',
  },
  checkmark: {
    width: '80px',
    height: '80px',
    backgroundColor: '#27ae60',
    color: 'white',
    fontSize: '3rem',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 1rem',
  },
  title: {
    color: '#2c3e50',
    marginBottom: '0.5rem',
  },
  subtitle: {
    color: '#7f8c8d',
    marginBottom: '2rem',
  },
  tokenDisplay: {
    backgroundColor: '#3498db',
    color: 'white',
    padding: '2rem',
    borderRadius: '8px',
    marginBottom: '2rem',
  },
  tokenLabel: {
    display: 'block',
    fontSize: '1rem',
    marginBottom: '0.5rem',
  },
  tokenNumber: {
    display: 'block',
    fontSize: '3rem',
    fontWeight: 'bold',
  },
  details: {
    backgroundColor: '#ecf0f1',
    padding: '1.5rem',
    borderRadius: '8px',
    marginBottom: '2rem',
    textAlign: 'left',
  },
  detailRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0.5rem 0',
    borderBottom: '1px solid #bdc3c7',
  },
  detailLabel: {
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  detailValue: {
    color: '#7f8c8d',
  },
  statusBadge: {
    backgroundColor: '#f39c12',
    color: 'white',
    padding: '0.25rem 0.75rem',
    borderRadius: '12px',
    fontSize: '0.85rem',
  },
  instructions: {
    backgroundColor: '#fff3cd',
    border: '1px solid #ffc107',
    padding: '1rem',
    borderRadius: '4px',
    marginBottom: '2rem',
    textAlign: 'left',
  },
  list: {
    marginTop: '0.5rem',
    paddingLeft: '1.5rem',
  },
  actions: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
  },
  button: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 'bold',
    textDecoration: 'none',
    display: 'inline-block',
  },
};

export default ConfirmBooking;