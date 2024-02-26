const express = require('express');
const { fetchAvailability, handleSlotBooking } = require('../controllers/bookingController');
const bookingRouter = express.Router();

bookingRouter.get('/availability', fetchAvailability).post('/book-slot', handleSlotBooking);

module.exports = bookingRouter