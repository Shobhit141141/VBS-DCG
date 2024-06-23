const express = require('express');
const { fetchBookingById,fetchBookedSlots, handleSlotBooking , deleteBookedSlot, fetchAvailableSlots} = require('../controllers/bookingController');
const { uploadImg } = require('../config/multerConfig');
const bookingRouter = express.Router();

bookingRouter.post('/fetch/booked-slots', fetchBookedSlots);
bookingRouter.get('/fetch/booked-slot/:id', fetchBookingById);
bookingRouter.post('/book-slot',uploadImg.array('images', 10),handleSlotBooking);
// bookingRouter.get('/booked-slots-by-date', fetchBookedSlotsByDate);
bookingRouter.delete('/delete-slot/:id', deleteBookedSlot);
bookingRouter.post('/available-slots', fetchAvailableSlots);

module.exports = bookingRouter