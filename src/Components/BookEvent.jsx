import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/BookEvent.css';

const BookEvent = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    eventType: '',
    date: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('http://localhost:5000/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        navigate('/thank-you');
      } else {
        const errorMessage = await response.text();
        setError(errorMessage || 'Failed to book event.');
      }
    } catch (error) {
      setError('Network error, please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="book-event">
      <h2>Book Your Event Here</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Event Type:</label>
          <select name="eventType" value={formData.eventType} onChange={handleChange} required>
            <option value="">Select Event Type</option>
            <option value="Wedding">Wedding</option>
            <option value="Birthday">Birthday</option>
            <option value="Corporate">Corporate</option>
          </select>
        </div>
        <div className="form-group">
          <label>Date:</label>
          <input type="date" name="date" value={formData.date} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Message:</label>
          <textarea name="message" value={formData.message} onChange={handleChange}></textarea>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Booking...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default BookEvent;