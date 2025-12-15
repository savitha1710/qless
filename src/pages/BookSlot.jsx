






// src/pages/BookSlot.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { bookingAPI } from '../utils/api';
import SlotCard from '../components/SlotCard';
import '../styles/BookSlot.css';

const BookSlot = ({ user }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [bookingData, setBookingData] = useState({
    customerName: user?.name || '',
    phone: user?.phone || '',
    email: user?.email || '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setSelectedDate(today);
  }, []);

  useEffect(() => {
    if (selectedDate) {
      fetchAvailableSlots();
    }
  }, [selectedDate]);

  const fetchAvailableSlots = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await bookingAPI.getAvailableSlots(selectedDate);
      setAvailableSlots(response.data.slots);
    } catch (err) {
      setError('Failed to fetch available slots');
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    setSelectedSlot(null);
  };

  const handleSlotSelect = (slot) => {
    if (!slot.isFull) {
      setSelectedSlot(slot.slot);
    }
  };

  const handleInputChange = (e) => {
    setBookingData({
      ...bookingData,
      [e.target.name]: e.target.value,
    });
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    
    if (!selectedSlot) {
      setError('Please select a time slot');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await bookingAPI.createBooking({
        ...bookingData,
        date: selectedDate,
        slot: selectedSlot,
      });

      navigate('/confirm-booking', { 
        state: { booking: response.data.booking } 
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Booking failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const minDate = new Date().toISOString().split('T')[0];
  const maxDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  return (
    <div className="bookslot-container">
      <h2 className="bookslot-title">Book Your Slot</h2>

      {error && <div className="bookslot-error">{error}</div>}

      <div className="date-selector">
        <label className="date-label">Select Date:</label>
        <input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          min={minDate}
          max={maxDate}
          className="date-input"
        />
      </div>

      {loading && <p className="loading-text">Loading slots...</p>}

      {!loading && availableSlots.length > 0 && (
        <>
          <h3 className="section-subtitle">Available Time Slots</h3>
          <div className="slots-grid">
            {availableSlots.map((slot, index) => (
              <SlotCard
                key={index}
                slot={slot}
                isSelected={selectedSlot === slot.slot}
                onSelect={() => handleSlotSelect(slot)}
              />
            ))}
          </div>
        </>
      )}

      {selectedSlot && (
        <div className="booking-form">
          <h3 className="form-title">Confirm Your Details</h3>
          <form onSubmit={handleBooking}>
            <div className="form-group">
              <label className="form-label">Name</label>
              <input
                type="text"
                name="customerName"
                value={bookingData.customerName}
                onChange={handleInputChange}
                required
                className="form-input"
                placeholder="Enter your name"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Phone</label>
              <input
                type="tel"
                name="phone"
                value={bookingData.phone}
                onChange={handleInputChange}
                required
                pattern="[0-9]{10}"
                className="form-input"
                placeholder="10 digit phone number"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email (Optional)</label>
              <input
                type="email"
                name="email"
                value={bookingData.email}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Enter your email"
              />
            </div>

            <div className="booking-summary">
              <p><strong>Selected Date:</strong> {new Date(selectedDate).toLocaleDateString()}</p>
              <p><strong>Selected Slot:</strong> {selectedSlot}</p>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="booking-button"
            >
              {loading ? 'Booking...' : 'Confirm Booking'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default BookSlot;