const express = require('express');
const { verifyRegister } = require('../middleware');
const AuthController = require('../controllers/auth.controller');

const router = express.Router();

router
  .route('/register')
  .all(verifyRegister.checkDuplicateUsernameOrEmail)
  .post(AuthController.register)

router
  .route('/login')
  .post(AuthController.login)

router
  .route('/logout')
  .delete(AuthController.logout)

router
  .route('/refresh')
  .post(AuthController.generateAccessToken)

module.exports = router;