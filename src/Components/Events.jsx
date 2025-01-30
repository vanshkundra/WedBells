import React from "react";
import { Link } from 'react-router-dom';
import "../CSS/Events.css"; 
import wedding from '../assets/wedding3.jpg';
import birthday from '../assets/Birthdays2.jpg';
import corporate from '../assets/Corporate Events3.jpg';
import concert from '../assets/Concerts.jpg';



const Events = () => {
  const eventsList = [
    {
      title: "Wedding Ceremonies",
      description: "Make your special day unforgettable with our complete wedding planning services, tailored to your needs.",
      image: wedding, // Demo image URL
    },
    {
      title: "Corporate Events",
      description: "Organize successful corporate events, from meetings to team-building activities, with professionalism and creativity.",
      image: corporate, // Demo image URL
    },
    {
      title: "Birthday Parties",
      description: "Celebrate your birthday in style with our custom party planning services, ensuring fun and memorable experiences.",
      image: birthday, // Demo image URL
    },
    {
      title: "Concerts",
      description: "Experience live music like never before with our concert organization services, featuring top artists and stunning venues.",
      image: concert, // Demo image URL
    },
  ];

  return (
    <div className="events-container">
      <h2>Events Offered</h2>
      <div className="event-list">
        {eventsList.map((event, index) => (
          <div className="event-card" key={index}>
            <img src={event.image} alt={event.title} />
            <h3>{event.title}</h3>
            <p>{event.description}</p>
            <div className="event-button"><Link to="/book-event">Book an Event</Link></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;
