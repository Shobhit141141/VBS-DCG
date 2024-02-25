const mongoose = require('mongoose');
const { BR_AUDI, RAJ_SOIN, SPS_13 } = require('../constants');

const bookingSchema = new mongoose.Schema({
  [BR_AUDI]: [
    {
      soc: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Soc' },
      dateTime: { type: Date, required: true },
    },
  ],
  [RAJ_SOIN]: [
    {
      soc: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Soc' },
      dateTime: { type: Date, required: true },
    },
  ],
  [SPS_13]: [
    {
      soc: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Soc' },
      dateTime: { type: Date, required: true },
    },
  ],
});
