const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../models/adminUniModel');

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

module.exports = { handleAdminLogin };
