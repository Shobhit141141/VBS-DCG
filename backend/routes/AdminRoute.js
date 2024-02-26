const express = require('express');
// const {uploadImg} = require('../config/multerConfig')

const {
  handleAdminLogin
} = require('../controllers/AdminController');
const AdminRouter = express.Router();

AdminRouter.post('/admin/login', handleAdminLogin);
//AdminRouter.post('/signup', uploadImg.single('adminLogo'), handleSignUp);

module.exports = AdminRouter;
