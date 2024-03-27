const express = require('express');
const { fetchBookedSlots, handleSlotBooking } = require('../controllers/bookingController');
const bookingRouter = express.Router();

bookingRouter.get('/fetch/booked-slots', fetchBookedSlots);
bookingRouter.post('/book-slot', handleSlotBooking);

module.exports = bookingRouter