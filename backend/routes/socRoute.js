const express = require('express');
const {uploadImg} = require('../config/multerConfig')

const {
  handleSocLogin,
  handleSocSignUp,
  handleResetPassword,
  handleChangePassword,
} = require('../controllers/socController');
const socRouter = express.Router();

socRouter.post('/login', handleSocLogin);
socRouter.post('/signup', uploadImg.single('socLogo'), handleSocSignUp);
socRouter.post('/reset-password', handleResetPassword);
socRouter.post('/change-password', handleChangePassword);

module.exports = socRouter;
