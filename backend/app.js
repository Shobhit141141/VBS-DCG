const express = require('express');
const connectDB = require('./config/db.js');
const socRouter = require('./routes/socRoute.js');
const AdminRouter = require('./routes/AdminRoute.js');
const authenticateUser = require('./middlewares/authenticateUser.js');
const authorizeUser = require('./middlewares/authorizeUser.js');
const bookingRouter = require('./routes/booking.Route.js');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

// Function to connect to mongodb database
connectDB();

// This middleware helps parse that JSON data and make it available in the req.body object of your route handlers.
app.use(express.json());

app.get('/test', (req, res) => {
  res.status(200).json({ msg: 'Server is UP. working perfectly fine' });
});

// User Routes
app.use('/auth', socRouter);

//Booking Route
app.use('/booking', bookingRouter);

// Apply authentication middleware to protected routes
app.use('/user', authenticateUser, (req, res) => {
  // Handle protected route logic here
});

// Apply authorization middleware to restricted routes
app.use('/admin', authenticateUser, authorizeUser('admin'), (req, res) => {
  // Handle admin-only route logic here
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀Server is running on port ${PORT}`);
});
