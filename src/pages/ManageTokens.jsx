







// src/pages/ManageTokens.jsx
import React, { useState, useEffect } from 'react';
import { bookingAPI } from '../utils/api';
import TokenDisplay from '../components/TokenDisplay';
import '../styles/ManageTokens.css';

const ManageTokens = ({ user }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await bookingAPI.getMyBookings();
      setBookings(response.data);
    } catch (err) {
      setError('Failed to fetch bookings');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (id) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      try {
        await bookingAPI.cancelBooking(id);
        fetchBookings();
        alert('Booking cancelled successfully');
      } catch (err) {
        alert(err.response?.data?.message || 'Failed to cancel booking');
      }
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: '#f39c12',
      serving: '#3498db',
      completed: '#27ae60',
      skipped: '#95a5a6',
      cancelled: '#e74c3c',
    };
    return colors[status] || '#95a5a6';
  };

  if (loading) {
    return (
      <div className="manage-container">
        <h2 className="loading-title">Loading your bookings...</h2>
      </div>
    );
  }

  return (
    <div className="manage-container">
      <h2 className="manage-title">My Bookings</h2>

      {error && <div className="manage-error">{error}</div>}

      {bookings.length === 0 ? (
        <div className="empty-state">
          <p className="empty-text">You don't have any bookings yet.</p>
          <a href="/book-slot" className="book-first-button">
            Book Your First Slot
          </a>
        </div>
      ) : (
        <div className="bookings-grid">
          {bookings.map((booking) => (
            <div key={booking._id} className="booking-card">
              <div 
                className="card-header"
                style={{ backgroundColor: getStatusColor(booking.status) }}
              >
                <TokenDisplay tokenNumber={booking.tokenNumber} />
                <span className="status-badge">
                  {booking.status.toUpperCase()}
                </span>
              </div>

              <div className="card-body">
                <div className="info-row">
                  <span className="info-label">Name:</span>
                  <span className="info-value">{booking.customerName}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Phone:</span>
                  <span className="info-value">{booking.phone}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Date:</span>
                  <span className="info-value">{new Date(booking.date).toLocaleDateString()}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Time Slot:</span>
                  <span className="info-value">{booking.slot}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Booked On:</span>
                  <span className="info-value">
                    {new Date(booking.createdAt).toLocaleString()}
                  </span>
                </div>
              </div>

              {booking.status === 'pending' && (
                <div className="card-footer">
                  <button 
                    onClick={() => handleCancelBooking(booking._id)}
                    className="cancel-button"
                  >
                    Cancel Booking
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageTokens;