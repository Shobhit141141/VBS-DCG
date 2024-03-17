const { BR_AUDI, RAJ_SOIN, SPS_13 } = require('../constants');
const Booking = require('../models/bookingModel');

const fetchBookedSlots = async (req, res) => {
  try {
    let { venue, date } = req.body;
    if (!venue || !date) {
      return res.status(400).json({ error: 'Venue and date are required' });
    }
    let bookedSlots = await Booking.find({ venue });
    bookedSlots = bookedSlots.filter((item) => {
      return item.startDateTime.toISOString().includes(date);
    });
    bookedSlots = bookedSlots.map((item) => {
      return {
        _id: item._id,
        soc: item.soc,
        venue: item.venue,
        startDateTime: new Date(item.startDateTime).toString().slice(4, 21),
        endDateTime: new Date(item.endDateTime).toString().slice(4, 21),
      };
    });
    res
      .status(200)
      .json({ result: bookedSlots, message: 'Slots fetched successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const handleSlotBooking = async (req, res) => {
  try {
    const { socId, startDateTime, endDateTime, venue } = req.body;
    // return res.send(new Date(startDateTime).getHours().toString());
    if (
      new Date(startDateTime).getHours() < 8 ||
      new Date(endDateTime).getHours() > 20
    ) {
      return res
        .status(400)
        .json({ error: 'Slot can be booked between 8 AM to 8 PM' });
    }
    if (startDateTime > endDateTime) {
      return res
        .status(400)
        .json({ error: 'Start time must be less than end time' });
    }
    const isAvailable = await Booking.findOne({
      venue,
      $or: [
        {
          startDateTime: { $lt: endDateTime },
          endDateTime: { $gt: startDateTime },
        }, // Slot overlaps completely
        { startDateTime: { $gte: startDateTime, $lt: endDateTime } }, // Slot starts within existing slot
        { endDateTime: { $gt: startDateTime, $lte: endDateTime } }, // Slot ends within existing slot
      ],
    });

    if (!isAvailable) {
      let newBooking = await Booking.create({
        soc: socId,
        venue,
        startDateTime,
        endDateTime,
      });

      return res
        .status(201)
        .json({ result: newBooking, message: 'Venue booked successfully' });
    } else {
      return res.status(400).json({
        error: 'Not available',
        bookedslot: isAvailable,
      });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { fetchBookedSlots, handleSlotBooking };
