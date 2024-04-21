const express = require('express');
const { fetchBookedSlots, handleSlotBooking , deleteBookedSlot} = require('../controllers/bookingController');
const bookingRouter = express.Router();

bookingRouter.post('/fetch/booked-slots', fetchBookedSlots);
bookingRouter.post('/book-slot', handleSlotBooking);
// bookingRouter.get('/booked-slots-by-date', fetchBookedSlotsByDate);
bookingRouter.delete('/delete-slot/:id', deleteBookedSlot);
module.exports = bookingRouter