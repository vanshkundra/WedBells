import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import wedding from '../assets/Weddings.jpg';
import birthday from '../assets/Birthdays.jpg';
import corporate from '../assets/Corporate Events.jpg';
import '../CSS/Home.css';

const Home = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const handleCheckAvailability = () => {
    console.log('Navigating to calendar...');
    navigate('/calendar');
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/VanshKundra.pdf';
    link.download = 'VanshKundra.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to WedBells</h1>
          <p>Your perfect event planning partner. From weddings to corporate events, we make every occasion special.</p>
          
          {/* Button group */}
          <div className="hero-buttons">
            <button className="hero-button" onClick={() => navigate('/events')}>
              Explore Events
            </button>
            {isAuthenticated && (
              <button className="check-availability-button" onClick={handleCheckAvailability}>
                Check Availability
              </button>
            )}
          </div>
        </div>
      </section>

      {/* About Us section */}
      <section className="about-us">
        <h2>Why Choose Us?</h2>
        <p>With years of experience in organizing memorable events, we guarantee an event you will never forget. Our team is dedicated to crafting unique experiences tailored to your preferences and budget.</p>
      </section>

      {/* Featured Events */}
      <section className="featured-events">
        <div className="featured-title">Our Featured Events</div>
        <div className="events-grid">
          <div className="event-card">
            <img src={wedding} alt="Wedding Event" />
            <h3>Weddings</h3>
            <p>Plan your dream wedding with us for an unforgettable experience.</p>
          </div>
          <div className="event-card">
            <img src={birthday} alt="Birthday Event" />
            <h3>Birthdays</h3>
            <p>Celebrate your special day with friends and family in style.</p>
          </div>
          <div className="event-card">
            <img src={corporate} alt="Corporate Event" />
            <h3>Corporate Events</h3>
            <p>Professional and elegant setups for your corporate needs.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>
          <span className="resume-link" onClick={handleDownload}>Developed by Vansh Kundra</span>
        </p>
        <p>
          Reach me out:
          <a href="https://www.linkedin.com/in/vansh-kundra-a5b6501b1/" target="_blank" rel="noopener noreferrer"> LinkedIn </a>|
          <a href="https://github.com/vanshkundra" target="_blank" rel="noopener noreferrer"> GitHub </a>
        </p>
      </footer>
    </div>
  );
};

export default Home;
