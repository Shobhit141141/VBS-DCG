const express = require('express');

const {
  handleAdminLogin,
  handleApproveBooking,
  handleRejectBooking,
} = require('../controllers/AdminController');
const AdminRouter = express.Router();

AdminRouter.post('/login', handleAdminLogin);
AdminRouter.post('/approve-booking', handleApproveBooking);
AdminRouter.post('/reject-booking', handleRejectBooking);

module.exports = AdminRouter;
