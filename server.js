const express = require('express');
const cors = require('cors');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { mongoConnect, getDb } = require('./Database/database');
const User = require('./Database/User');

const app = express();
const PORT = 5000;
const JWT_SECRET = 'yourJWTSecret';

// CORS configuration (allow all origins during development or specify if in production)
app.use(cors({ origin: '*' }));

app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));

// Signup Route
app.post('/api/signup', async (req, res) => {
    const { username, password } = req.body;
    try {
        const db = getDb();
        const existingUser = await db.collection('Users').findOne({ username });
        if (existingUser) return res.status(400).json({ message: 'User already exists. Please login.' });

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
        if (!user) return res.status(400).json({ message: 'User not found. Please sign up first.' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token, role: user.role });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Login failed' });
    }
});

// Middleware to verify JWT token
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

// Contact Message Route (POST /api/contact)
app.post('/api/contact', async (req, res) => {
    const { name, email, message } = req.body;

    // Ensure all necessary fields are provided
    if (!name || !email || !message) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        const db = getDb();
        if (!db) return res.status(500).json({ message: 'Database connection failed' });

        const newContactMessage = {
            name,
            email,
            message,
            date: new Date() // Optionally add a timestamp
        };

        const result = await db.collection('ContactMessages').insertOne(newContactMessage);
        
        if (!result.insertedId) {
            throw new Error('Contact message insertion failed');
        }

        console.log('Contact message saved:', newContactMessage);
        res.status(201).json({ message: 'Message sent successfully', contactId: result.insertedId });
    } catch (error) {
        console.error('Contact message error:', error);
        res.status(500).json({ message: 'Failed to send message', error: error.message });
    }
});

// Redirect all unknown routes to React app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

mongoConnect(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
});
