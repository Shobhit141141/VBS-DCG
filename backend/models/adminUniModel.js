const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  name: { type: String, required: true ,unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: { type: String },
  createdAt: { type: Date, default: Date.now() },
});

const admin = mongoose.model('Admin', adminSchema);
module.exports = admin;
