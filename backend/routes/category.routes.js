const express = require('express');

const router = express.Router();
const CategoryController = require('../controllers/category.controller');
const { auth } = require('../middleware');

router
  .route('/')
  .all(auth.verifyToken, auth.ensureAdmin)
  .post(CategoryController.create)
  .get(CategoryController.findAll)
  .delete(CategoryController.removeAll)

router
  .route('/:id([a-f0-9]{24})')
  .all(auth.verifyToken, auth.ensureAdmin)
  .get(CategoryController.findOne)  
  .put(CategoryController.update)  
  .delete(CategoryController.remove)

router
  .route('/published')
  .get(CategoryController.findPublished)

module.exports = router;