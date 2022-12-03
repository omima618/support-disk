const express = require('express');
const path = require('path');
const colors = require('colors');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const PORT = process.env.PORT || 5000;
const connectDB = require('./config/db');

// SERVER INIT
const app = express();

// CONNECT TO DATABASE
connectDB();

// MIDDLE WARE
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ROUTES
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/tickets', require('./routes/ticketRoutes'));
app.use('/api/tickets', require('./routes/ticketRoutes'));

// SERVE FRONTEND
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/build')));
    app.get('*', (req, res) =>
        res.sendFile(__dirname, '../', 'frontend', 'build', 'index.html')
    );
} else {
    // START SERVER ON PORT 5000
    app.listen(PORT, () => {
        console.log('hello from server', PORT);
    });
}

app.use(errorHandler);

app.get('/', (req, res) => {
    res.json({ message: "it's a mern stack app" });
});
