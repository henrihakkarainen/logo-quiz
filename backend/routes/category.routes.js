const express = require('express');

const router = express.Router();
const CategoryController = require('../controllers/category.controller');

router
  .post('/', CategoryController.create)
  .get('/', CategoryController.findAll)
  .get('/:id', CategoryController.findOne)
  .put('/:id', CategoryController.update)
  .delete('/', CategoryController.removeAll)
  .delete('/:id', CategoryController.remove)

module.exports = router;