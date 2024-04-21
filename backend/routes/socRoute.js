const express = require('express');
const { uploadImg } = require('../config/multerConfig');

const {
  handleSocLogin,
  handleSocSignUp,
  handleResetPassword,
  handleChangePassword,
} = require('../controllers/socController');
const authenticateUser = require('../middlewares/authenticateUser');
const socRouter = express.Router();

socRouter.post('/login', handleSocLogin);
socRouter.post('/signup', uploadImg.single('socLogo'), handleSocSignUp);
socRouter.post('/reset-password', handleResetPassword);
socRouter.post('/change-password', handleChangePassword);
socRouter.get('/verify-jwt', authenticateUser, (req, res) =>
  res.status(200).json({ msg: 'JWT Verified!' })
);

module.exports = socRouter;
