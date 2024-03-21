const mongoose = require('mongoose');
const { BR_AUDI, RAJ_SOIN, SPS_13 } = require('../constants');

const bookingSchema = new mongoose.Schema({
    soc: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Soc' },
    title: {
        type: String,
        required: true
    },
    slots: [{
        type: String,
        enum: ['slot1', 'slot2', 'slot3', 'slot4'],
        
    }],
    date: {
        type: Date,
        required: true
    },
    venue: {
        type: String,
        enum: ['Venue 1', 'Venue 2', 'Venue 3'],
        required: true
    },
    organizer: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true
    },
    file: {
        type: String,
        required: false
    }
});

// Indexing to sort the booking data as per dateTime in asc order
bookingSchema.index({ date: 1 });

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;
