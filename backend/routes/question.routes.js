const express = require('express');

const router = express.Router();
const QuestionController = require('../controllers/question.controller');
const { auth } = require('../middleware');

router
  .route('/')
  .post(auth.verifyToken, auth.ensureAdmin, QuestionController.create)
  .get(QuestionController.findAll)
  .delete(auth.verifyToken, auth.ensureAdmin, QuestionController.removeAll)

router
  .route('/:id([a-f0-9]{24})')
  .all(auth.verifyToken, auth.ensureAdmin)
  .get(QuestionController.findOne)
  .put(QuestionController.update)  
  .delete(QuestionController.remove)

module.exports = router;