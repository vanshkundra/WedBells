import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Events from './Components/Events';
import BookEvent from './Components/BookEvent';
import Contact from './Components/Contact';
import ThankYou from './Components/ThankYou';
import LoginSignup from './Components/LoginSignup';
import EventCalendar from './Components/EventCalendar'; // ✅ Import the calendar
import './CSS/styles.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        {!isAuthenticated ? (
          <>
            <Route path="*" element={<Navigate to="/Login-Signup" />} />
            <Route path="/Login-Signup" element={<LoginSignup setIsAuthenticated={setIsAuthenticated} />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Events />} />
            <Route path="/book-event" element={<BookEvent />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/thank-you" element={<ThankYou />} />
            <Route path="/calendar" element={<EventCalendar />} /> {/* Add the calendar route */}
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
