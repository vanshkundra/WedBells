import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/LoginSignup.css';

const LoginSignup = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        setIsAuthenticated(true);
        navigate('/');
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        alert('Signup successful! Please login.');
        setIsLogin(true);
      } else {
        alert('Signup failed. Try again.');
      }
    } catch (error) {
      console.error('Error during signup:', error);
    }
  };

  return (
    <div className="login-signup">
      <h2>{isLogin ? 'Login Yourself ' : 'Sign Up Here'}</h2>
      <form onSubmit={isLogin ? handleLogin : handleSignup}>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
      </form>
      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
      </button>
    </div>
  );
};

export default LoginSignup;
