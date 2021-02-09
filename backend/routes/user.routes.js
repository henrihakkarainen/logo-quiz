const express = require('express');
const { auth } = require('../middleware');
const UserController = require('../controllers/user.controller');

const router = express.Router();

router
  .route('/')
  .all(auth.verifyToken, auth.ensureAdmin)
  .get(UserController.findAll)

module.exports = router;