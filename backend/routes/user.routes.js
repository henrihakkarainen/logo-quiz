const express = require('express');
const { auth } = require('../middleware');
const UserController = require('../controllers/user.controller');

const router = express.Router();

router
  .route('/')
  .all(auth.verifyToken, auth.ensureAdmin)
  .get(UserController.findAll)

router
  .route('/:id([a-f0-9]{24})')
  .all(auth.verifyToken, auth.ensureSelf)
  .get(UserController.findOne)
  .put(UserController.update)
  .delete(UserController.remove)

module.exports = router;