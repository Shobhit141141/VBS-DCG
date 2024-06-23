const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../models/adminUniModel');
const Booking = require('../models/bookingModel');

const handleAdminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check for all field entered or not
    if (!username || !password) {
      return res.status(400).json({ error: 'All field are required' });
    }

    // Check if the admin exists
    const admin = await Admin.findOne({ username });

    if (!admin) {
      return res.status(401).json({ error: "Admin doesn't exit" });
    }

    // Validate the password
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Wrong password' });
    }

    // Generate a JWT token with payload data
    const token = jwt.sign({ userId: admin._id }, process.env.JWT_SECRET_KEY);

    res
      .status(200)
      .json({ result: admin, token, message: 'Admin logged in successfully' });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: error.message });
  }
};

const handleApproveBooking = async (req, res) => {

  const { bookingId } = req.body;
  if(!bookingId) {
    return res.status(400).json({error : "Booking ID is required"});
  }
  const bookingDetails = await Booking.findById(bookingId);
  bookingDetails.status = 'Approved';
  bookingDetails.save();

  return res.status(200).json({result : bookingDetails, message : "Booking Approved!"});
  
}
const handleRejectBooking = async (req, res) => {
  const { bookingId } = req.body;
  if (!bookingId) {
    return res.status(400).json({ error: 'Booking ID is required' });
  }
  const bookingDetails = await Booking.findById(bookingId);
  bookingDetails.status = 'Rejected';
  bookingDetails.save();

  return res
    .status(200)
    .json({ result: bookingDetails, message: 'Booking Rejected!' });
}

module.exports = { handleAdminLogin, handleApproveBooking, handleRejectBooking };
