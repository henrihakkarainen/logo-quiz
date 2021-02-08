const express = require('express');

const router = express.Router();
const CategoryController = require('../controllers/category.controller');

router
  .route('/')
  .post(CategoryController.create)
  .get(CategoryController.findAll)
  .delete(CategoryController.removeAll)

router
  .route('/:id([a-f0-9]{24})')
  .get(CategoryController.findOne)  
  .put(CategoryController.update)  
  .delete(CategoryController.remove)

router
  .route('/published')
  .get(CategoryController.findPublished)

module.exports = router;