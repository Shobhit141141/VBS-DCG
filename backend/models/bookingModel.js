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
        required:true
        
    }],
    date: {
        type: Date,
        required: true
    },
    venue: {
        type: String,
        enum: ['BR_AUDI', 'RAJ_SOIN', 'SPS_13'],
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
    },
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending'
    }
});

// Indexing to sort the booking data as per dateTime in asc order
bookingSchema.index({ date: 1 });

module.exports = mongoose.model('booking', bookingSchema);
