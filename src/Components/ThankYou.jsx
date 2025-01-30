import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/ThankYou.css';

const ThankYou = () => {
  const navigate = useNavigate();

  return (
    <div className="book-event"> 
      <h2>Thank You!</h2>
      <p>We will connect with you shortly regarding your event.</p>
      <button onClick={() => navigate('/')}>Back to Home</button>
    </div>
  );
};

export default ThankYou;
