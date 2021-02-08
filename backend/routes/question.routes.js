const express = require('express');

const router = express.Router();
const QuestionController = require('../controllers/question.controller');

router
  .route('/')
  .post(QuestionController.create)
  .get(QuestionController.findAll)
  .delete(QuestionController.removeAll)

router
  .route('/:id([a-f0-9]{24})')
  .get(QuestionController.findOne)
  .put(QuestionController.update)  
  .delete(QuestionController.remove)

module.exports = router;