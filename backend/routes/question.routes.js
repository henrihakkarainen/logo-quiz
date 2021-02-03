const express = require('express');

const router = express.Router();
const QuestionController = require('../controllers/question.controller');

router
  .post('/', QuestionController.create)
  .get('/', QuestionController.findAll)
  .get('/:id', QuestionController.findOne)
  .put('/:id', QuestionController.update)
  .delete('/', QuestionController.removeAll)
  .delete('/:id', QuestionController.remove)

module.exports = router;