const express = require('express');
const cors = require('cors');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { mongoConnect, getDb } = require('./Database/database');
const User = require('./Database/User');
const Event = require('./Database/Event');
const sendEmail = require('./Database/sendEmail');

const app = express();
const PORT = 5000;
const JWT_SECRET = 'yourJWTSecret';

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));

// Signup Route
app.post('/api/signup', async (req, res) => {
  const { username, password } = req.body;
  try {
    const db = getDb();
    const existingUser = await db.collection('Users').findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists. Please login.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await db.collection('Users').insertOne({ username, password: hashedPassword, role: 'user' });

    res.status(201).json({ message: 'Signup successful. Please login.' });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Signup failed' });
  }
});

// Login Route
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const db = getDb();
    const user = await db.collection('Users').findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'User not found. Please sign up first.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token, role: user.role });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Login failed' });
  }
});

// JWT Middleware
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(403).json({ message: 'Access denied, no token provided' });

  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

// Book Event Route
app.post('/api/bookings', verifyToken, async (req, res) => {
  const { name, email, eventType, date, message } = req.body;

  if (!name || !email || !eventType || !date) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const newEvent = new Event(name, email, eventType, date, message);
    const result = await newEvent.save();

    if (!result.insertedId) throw new Error('Failed to save event');

    console.log('Event booked successfully:', result);

    const confirmationMessage = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9;">
        <h2 style="color: #4CAF50; text-align: center;">🎉 Event Booking Confirmation 🎉</h2>
        <p style="font-size: 16px;">Dear <strong>${name}</strong>,</p>
        <p>Your <strong>${eventType}</strong> is booked for <strong>${date}</strong>.</p>
        <p>We will contact you soon to discuss further details.</p>
        <p>Thank you for choosing <strong>WedBells</strong>! ❤️</p>
        <hr>
        <div style="text-align: center;">
          <p><strong>Vansh Kundra</strong></p>
          <p>📧 <a href="mailto:vanshkundraofficial@gmail.com">vanshkundraofficial@gmail.com</a></p>
          <p>📞 <a href="tel:+919953060793">+91 99530 60793</a></p>
        </div>
      </div>
    `;

    await sendEmail(email, '🎉 Event Booking Confirmation - WedBells', confirmationMessage);

    res.status(201).json({ message: 'Event booked successfully. Confirmation email sent.' });
  } catch (error) {
    console.error('Event booking error:', error);
    res.status(500).json({ message: 'Failed to book event', error: error.message });
  }
});

// Availability Route: Get all dates with 4 or more bookings
app.get('/api/events/availability', async (req, res) => {
  try {
    const db = getDb();
    const result = await db.collection('Events').aggregate([
      {
        $group: {
          _id: "$date", // already stored as "YYYY-MM-DD"
          count: { $sum: 1 }
        }
      },
      {
        $match: {
          count: { $gte: 4 } // Disable dates with 4 or more bookings
        }
      }
    ]).toArray();

    const disabledDates = result.map(item => item._id);
    res.status(200).json({ disabledDates });
  } catch (error) {
    console.error('Error fetching availability:', error);
    res.status(500).json({ message: 'Failed to fetch event availability' });
  }
});

// Fallback to React SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// MongoDB connection and server start
mongoConnect(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
});
