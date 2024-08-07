const Booking = require("../models/bookingModel");
const { BR_AUDI, RAJ_SOIN, SPS_13 } = require("../constants");
const Soc = require("../models/socModel");
const { SLOTS } = require("../constants");
const fetchBookedSlots = async (req, res) => {
  try {
    const { venue, date } = req.body;
    if (!date) {
      return res.status(400).json({ error: "Date is required" });
    }
    if (!venue) {
      const bookedSlots = await Booking.find({ date });
      return res
        .status(200)
        .json({ result: bookedSlots, message: "Slots fetched successfully" });
    }
    const bookedSlots = await Booking.find({ venue, date });
    return res
      .status(200)
      .json({ result: bookedSlots, message: "Slots fetched successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const fetchBookingById = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }
    res
      .status(200)
      .json({ result: booking, message: "Booking fetched successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const handleSlotBooking = async (req, res) => {
  try {
    const { soc, title, slots, date, venue, details, files } = req.body;
    if (slots.length === 0) {
      return res.status(400).json({ error: "Slots must be a non-empty array" });
    }
    const slotsArray = Array.isArray(slots) ? slots : [slots];

    const isAvailable = await Booking.findOne({
      venue,
      date,
      slots: { $in: slots },
    });

    let organizer = await Soc.findById(soc);
    organizer = organizer.name;

    if (!isAvailable) {
      const newBooking = await Booking.create({
        soc,
        title,
        slots: slotsArray,
        date,
        venue,
        organizer,
        details,
        file: files,
      });

      return res.status(201).json({
        result: newBooking,
        message: "Slot request for the given venue raised successfully",
      });
    } else {
      return res.status(400).json({
        error: "Requested slot is already booked",
        bookedSlotDetails: isAvailable,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};
const deleteBookedSlot = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBooking = await Booking.findByIdAndDelete(id);
    if (!deletedBooking) {
      return res.status(404).json({ error: "Booking not found" });
    }
    res
      .status(200)
      .json({ message: "Booking deleted successfully", deletedBooking });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const fetchAvailableSlots = async (req, res) => {
  try {
    const { venue, date } = req.body;
    if (!date || !venue) {
      return res.status(400).json({ error: "Date and venue are required" });
    }

    const bookedSlots = await Booking.find({ venue, date }).select("slots");
    const bookedSlotList = bookedSlots.flatMap(booking => booking.slots);

    const allSlots = Object.keys(SLOTS);
    const availableSlots = allSlots.filter(slot => !bookedSlotList.includes(slot));

    return res.status(200).json({ availableSlots });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const fetchBookingsBySocId = async (req, res) => {
  try {
    const { socId } = req.params;
    const bookings = await Booking.find({ soc: socId });
    if (!bookings) {
      return res.status(404).json({ error: "No bookings found for this society" });
    }
    res
      .status(200)
      .json({ result: bookings, message: "Bookings fetched successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  fetchBookedSlots,
  handleSlotBooking,
  deleteBookedSlot,
  fetchBookingById,
  fetchAvailableSlots,
  fetchBookingsBySocId
};
