const mongoose = require('mongoose');
const { BR_AUDI, RAJ_SOIN, SPS_13 } = require('../constants');

const bookingSchema = new mongoose.Schema({
  soc: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Soc' },
  title: {
    type: String,
    required: true,
  },
  slots: [
    {
      type: String,
      enum: ['slot1', 'slot2', 'slot3', 'slot4'],
    },
  ],
  date: {
    type: Date,
    required: true,
  },
  venue: {
    type: String,
    enum: [BR_AUDI, RAJ_SOIN, SPS_13],
    required: true,
  },
  organizer: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  file: {
    type: String,
  },
  status: {
    type: String,
    default: 'PENDING',
    enum: ['PENDING', 'ACCEPTED', 'REJECTED'],
  },
});

/*
Time slots
slot1 = 8 - 11
slot2 = 11 - 13
slot3 = 13 - 17
slot4 = 17 - 20
*/

// Indexing to sort the booking data as per date in asc order
bookingSchema.index({ date: 1 });

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;
