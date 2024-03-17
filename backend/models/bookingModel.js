const mongoose = require('mongoose');
const { BR_AUDI, RAJ_SOIN, SPS_13 } = require('../constants');

const bookingSchema = new mongoose.Schema({
  soc: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Soc' },
  venue: { type: String, enum: [BR_AUDI, RAJ_SOIN, SPS_13], required: true },
  startDateTime: { type: Date, required: true },
  endDateTime: { type: Date, required: true },
});

// Indexing to sort the booking data as per dateTime in asc order
bookingSchema.index({ startDateTime: 1 });

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;
