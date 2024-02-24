const express = require('express');
const {uploadImg} = require('../config/multerConfig')

const {
  handleSocLogin,
  handleSocSignUp,
} = require('../controllers/socController');
const socRouter = express.Router();

socRouter.post('/login', handleSocLogin);
socRouter.post('/signup', uploadImg.single('socLogo'), handleSocSignUp);

module.exports = socRouter;
