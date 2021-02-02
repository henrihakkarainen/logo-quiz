const express = require('express');

const router = express.Router();
const QuestionController = require('../controllers/question.controller');

router
  .post('/', QuestionController.create)
  .get('/', QuestionController.findAll)
  .delete('/', QuestionController.removeAll)

module.exports = router;