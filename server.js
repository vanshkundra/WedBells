const express = require('express');
const cors = require('cors');
const path = require('path');
const { mongoConnect, getDb } = require('./Database/database'); // Import MongoDB connection functions

const app = express();
const PORT = 5000; // Server runs on port 5000

app.use(cors());
app.use(express.json()); // Middleware to parse JSON

// Serve static files from the correct build folder
app.use(express.static(path.join(__dirname, 'dist')));

// Route to fetch all bookings from MongoDB
app.get('/api/bookings', async (req, res) => {
    try {
        const db = getDb();
        const bookings = await db.collection('Events').find().toArray();
        res.json(bookings);
    } catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Route to submit a new booking to MongoDB
app.post('/api/bookings', async (req, res) => {
    try {
        const db = getDb();
        const newBooking = { ...req.body, status: req.body.status || 'Pending' };
        const result = await db.collection('Events').insertOne(newBooking);

        res.json({ message: 'Booking successful!', id: result.insertedId });
    } catch (error) {
        console.error('Error saving booking:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Route to submit a contact form message
app.post('/api/contact', async (req, res) => {
    try {
        const db = getDb();
        const contactMessage = { ...req.body, date: new Date().toISOString() };
        await db.collection('ContactMessages').insertOne(contactMessage);

        res.json({ message: 'Message received!' });
    } catch (error) {
        console.error('Error saving contact message:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Serve index.html for React routes AFTER API routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// MongoDB connection and server startup
mongoConnect(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
});
