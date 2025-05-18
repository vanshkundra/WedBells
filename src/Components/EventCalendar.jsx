import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import '../CSS/CalendarStyles.css';

const EventCalendar = () => {
  const [value, setValue] = useState(new Date());
  const [disabledDates, setDisabledDates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await axios.get('/api/events/availability');
        if (response.data?.disabledDates) {
          setDisabledDates(response.data.disabledDates);
        } else {
          console.warn('No disabledDates found in API response.');
        }
      } catch (error) {
        console.error('❌ Error fetching event data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEventData();
  }, []);

  const tileClassName = ({ date }) => {
    const formattedDate = date.toISOString().split('T')[0];
    return disabledDates.includes(formattedDate) ? 'disabled-date' : 'available-date';
  };

  const handleDateChange = (date) => {
    setValue(date);
  };

  return (
    <div className="calendar-container">
      <h2>Check Event Availability</h2>
      {loading ? (
        <p>Loading calendar...</p>
      ) : (
        <>
          <Calendar
            onChange={handleDateChange}
            value={value}
            tileClassName={tileClassName}
          />
          <div className="legend">
            <span className="legend-item available">Available</span>
            <span className="legend-item unavailable">Not Available</span>
          </div>
        </>
      )}
    </div>
  );
};

export default EventCalendar;
