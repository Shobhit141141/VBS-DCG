const express = require('express');
const connectDB = require('./config/db.js');
const socRouter = require('./routes/socRoute.js');
const AdminRouter = require('./routes/AdminRoute.js');
const authenticateUser = require('./middlewares/authenticateUser.js');
const authorizeUser = require('./middlewares/authorizeUser.js');
const bookingRouter = require('./routes/bookingRoute.js');
require('dotenv').config();
var cors = require('cors')

const app = express();
const PORT = process.env.PORT || 4000;
app.use(cors())
// Function to connect to mongodb database
connectDB();

// This middleware helps parse the JSON data and make it available in the req.body object of your route handlers.
app.use(express.json());

app.get('/test', (req, res) => { // to test whether server is running or not
  res.status(200).json({ msg: 'Server is UP. working perfectly fine' });
});

// User Routes
app.use('/auth', socRouter);

//Booking Route - PROTECTED ROUTE
app.use('/booking', authenticateUser, bookingRouter);

// Apply authentication middleware to protected routes
app.use('/user', authenticateUser, (req, res) => {
  // Handle protected route logic here
});

// Apply authorization middleware to restricted routes
app.use('/admin', AdminRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
