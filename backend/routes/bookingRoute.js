const express = require('express');
const { fetchBookedSlots, handleSlotBooking } = require('../controllers/bookingController');
const bookingRouter = express.Router();

bookingRouter.post('/fetch/booked-slots', fetchBookedSlots).post('/book-slot', handleSlotBooking);

module.exports = bookingRouter