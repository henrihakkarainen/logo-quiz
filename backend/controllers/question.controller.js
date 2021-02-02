const db = require('../models');
const Question = db.questions;
const Category = db.categories;

// Create a new question
const create = async (req, res) => {
  const { alias, options, correct, difficulty } = req.body;
  const categoryTitle = req.body.category;
  if (!alias || !options || !correct || !difficulty || !categoryTitle) {
    return res.status(400).json({
      message: 'Body must have the following: alias, options, correct, difficulty, category'
    });
  }

  const category = await Category.findOne({ title: categoryTitle }).exec();
  if (!category) {
    return res.status(500).json({
      message: `Category "${categoryTitle}" was not found and question couldn't be added`
    });
  }

  const existsAlias = await Question.exists({ alias })
  if (existsAlias) {
    return res.status(409).json({
      message: `Question with alias "${alias}" already exists in the database`
    });
  }

  if (options.includes(correct)) {
    return res.status(500).json({
      message: 'Options array must not include the correct answer'
    });
  }

  const question = new Question({
    alias,
    options,
    correct,
    difficulty,
    category
  });

  question
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message || 'Adding the question failed for unknown reason'
      });
    });
}

// Retrieve all questions
const findAll = (req, res) => {
  const { category, difficulty } = req.query;
  const condition = category ? { 'category.title' : { $regex: new RegExp(category), $options: 'i' } } : {};

  console.log(condition)
  Question.find(condition)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message || 'Server failed to retrieve questions'
      });
    });
}

const findOne = (req, res) => {

}

const update = (req, res) => {

}

const remove = (req, res) => {

}

const removeAll = async (req, res) => {
  try {
    const data = await Question.deleteMany({});
    res.json({
      message: `${data.deletedCount} questions were deleted.`
    });
  } catch (err) {
    res.status(500).json({
      message: err.message || 'Deleting questions did not succeed.'
    });
  }  
}

module.exports = {
  create,
  findOne,
  findAll,
  update,
  remove,
  removeAll
};