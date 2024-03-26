const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/socModel');

const handleSocSignUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check whether the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Check for all field entered or not
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'All field are required' });
    }

    // Check for valid name
    if (!/^[a-zA-Z\s]+$/.test(name)) {
      return res
        .status(400)
        .json({ error: 'Name must contain alphabets only' });
    }

    // Check for valid email
    if (!/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    // Check for password length
    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: 'Password must have a minimum length of 6 characters' });
    }
    let imagePath = ''; // Default empty path
    if (req.file && req.file.filename) {
      imagePath = `/uploads/${req.file.filename}`;
    }
    // Genrating a hash for password with salt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new User({ name, email, password: hashedPassword, image: imagePath });
    await newUser.save();

    res
      .status(201)
      .json({ result: newUser, message: 'Society registered successfully' });

  } catch (error) {
    console.error('Error registering society:', error);
    res.status(500).json({ error: error.message });
  }
};

const handleSocLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });

    // Check for valid email
    if (!/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    if (!user) {
      return res.status(401).json({ error: "Society doesn't exit" });
    }

    // Check for all field entered or not
    if (!email || !password) {
      return res.status(400).json({ error: 'All field are required' });
    }

    // Validate the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Wrong password' });
    }

    // Generate a JWT token with payload data
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY);

    res
      .status(200)
      .json({ result: user, token, message: 'Society logged in successfully' });

  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { handleSocLogin, handleSocSignUp };
