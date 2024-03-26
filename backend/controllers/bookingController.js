const Booking = require('../models/bookingModel');
const { BR_AUDI, RAJ_SOIN, SPS_13 } = require('../constants');

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
    const { soc, title, slots, date, venue, organizer, details, file } = req.body;

    if (
      new Date(date).getHours() < 8 ||
      new Date(date).getHours() >= 20
    ) {
      return res.status(400).json({ error: 'Slot can be booked between 8 AM to 8 PM' });
    }

    if (!Array.isArray(slots) || slots.length === 0) {
      return res.status(400).json({ error: 'Slots must be a non-empty array' });
    }

    // Log request data for debugging
    console.log('Received request:', { soc, title, slots, date, venue, organizer, details, file });

    const isAvailable = await Booking.findOne({ venue, date, slots: { $in: slots } });

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

      return res.status(201).json({ result: newBooking, message: 'Venue booked successfully' });
    } else {
      return res.status(400).json({
        error: 'Slot already booked',
        bookedSlot: isAvailable,
      });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { fetchBookedSlots, handleSlotBooking };
