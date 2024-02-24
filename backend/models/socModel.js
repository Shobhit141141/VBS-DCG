const mongoose = require('mongoose');

const socSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  image: { type: String },
  verified: { type: Boolean, default: false },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() },
});

const Soc = mongoose.model('Soc', socSchema);
module.exports = Soc;
