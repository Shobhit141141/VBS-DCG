const Booking = require('../models/bookingModel');

const fetchAvailability = (req, res) => {};

const handleSlotBooking = async (req, res) => {
  try {
    const { socId, startDateTime, endDateTime, venue } = req.body;
    const newBooking = {
      soc: socId,
      startDateTime,
      endDateTime,
    };
    const existingVenue = await Booking.findOne({ [venue]: { $exists: true } });
    if (existingVenue) {
      // Venue exists, push the new booking
      existingVenue[venue].push(newBooking);
      await existingVenue.save();
      return res
        .status(201)
        .json({ result: existingVenue[venue], message: 'Venue booked successfully' });
    } else {
      // Venue doesn't exist, create a new document with the venue and the new booking
      const newVenueBooking = new Booking({
        [venue]: [newBooking],
      });
      await newVenueBooking.save();
      return res
        .status(201)
        .json({
          result: newVenueBooking[venue],
          message: 'Venue booked successfully',
        });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { fetchAvailability, handleSlotBooking };
