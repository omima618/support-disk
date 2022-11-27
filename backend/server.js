const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const PORT = process.env.PORT || 5000;
const connectDB = require('./config/db');

// SERVER INIT
const app = express();

// CONNECT TO DATABASE
connectDB();

// START SERVER ON PORT 5000
app.listen(PORT, () => {
    console.log('hello from server', PORT);
});

// MIDDLE WARE
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ROUTES
app.use('/api/users', require('./routes/userRoutes'));
app.use(errorHandler);

app.get('/', (req, res) => {
    res.json({ message: "it's a mern stack app" });
});
