const express = require('express');

const {
  handleAdminLogin
} = require('../controllers/AdminController');
const AdminRouter = express.Router();

AdminRouter.post('/login', handleAdminLogin);

module.exports = AdminRouter;
