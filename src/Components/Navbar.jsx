import { Link, useNavigate } from 'react-router-dom';
import '../CSS/Navbar.css';

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/Login-Signup');
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <h1>WedBells</h1>
      </div>
      <ul className="nav-links">
        {!isAuthenticated ? (
          <li><Link to="/Login-Signup">Login/Signup</Link></li>
        ) : (
          <>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/events">Events</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/book-event">Book Event</Link></li>
            <li><Link to="/" onClick={handleLogout}>Logout</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
