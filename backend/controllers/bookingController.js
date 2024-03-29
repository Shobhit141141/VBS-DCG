const Booking = require('../models/bookingModel');
const { BR_AUDI, RAJ_SOIN, SPS_13 } = require('../constants');
const Soc = require('../models/socModel');

const fetchBookedSlots = async (req, res) => {
  try {
    const { venue, date } = req.body;
    if (!venue || !date) {
      return res.status(400).json({ error: 'Venue and date are required' });
    }

    const bookedSlots = await Booking.find({ venue, date });
    res.status(200).json({ result: bookedSlots, message: 'Slots fetched successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const handleSlotBooking = async (req, res) => {
  try {
    const { soc, title, slots, date, venue, details, file } = req.body;

    if (!Array.isArray(slots) || slots.length === 0) {
      return res.status(400).json({ error: 'Slots must be a non-empty array' });
    }

    const isAvailable = await Booking.findOne({ venue, date, slots: { $in: slots } });

    let organizer = await Soc.findById(soc);
    organizer = organizer.name;

    if (!isAvailable) {
      const newBooking = await Booking.create({
        soc,
        title,
        slots,
        date,
        venue,
        organizer,
        details,
        file
      });

      return res.status(201).json({ result: newBooking, message: 'Slot request for the given venue raised successfully' });
    } else {
      return res.status(400).json({
        error: 'Requested slot is already booked',
        bookedSlotDetails: isAvailable,
      });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { fetchBookedSlots, handleSlotBooking };
