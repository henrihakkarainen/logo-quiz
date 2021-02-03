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

  const category = await Category.findOne({
    $or: [ { 'title.en': categoryTitle }, { 'title.fi': categoryTitle } ]
  }).exec();
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

  try {
    const data = await question.save();
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({
      message: err.message || 'Adding the question failed for unknown reason'
    });
  }
}

// Retrieve all questions
const findAll = async (req, res) => {
  const { category, difficulty } = req.query;
  const query = {
    $or : [
      { 'category.title.en' : { $regex: new RegExp(`^${category}$`), $options: 'i' } },
      { 'category.title.fi' : { $regex: new RegExp(`^${category}$`), $options: 'i' } }
    ]
  }
  let condition = category ? query : {};

  if (category && difficulty) {
    try {
      condition = {
        ...query,
        difficulty: parseInt(difficulty)
      };
    } catch (err) {
      return res.status(400).json({
        message: err.message || 'Query parameter difficulty must be an integer'
      });
    }
  }

  try {
    const data = await Question.find(condition).exec();
    res.json(data);
  } catch (err) {
    res.status(500).json({
      message: err.message || 'Server failed to retrieve questions'
    });
  }
}

const findOne = async (req, res) => {
  const { id } = req.params;

  try {
    const question = await Question.findById(id).exec();
    if (!question) {
      res.status(404).json({
        message: `Question with id: ${id} was not found`
      });
    } else {
      res.json(question);
    }
  } catch (err) {
    res.status(500).json({
      message: `Error when trying to retrieve Question with id: ${id}`
    });
  }  
}

const update = async (req, res) => {
  const { id } = req.params;

  try {
    const question = await Question.findById(id).exec();
    if (!question) {
      res.status(404).json({
        message: `Question with id: ${id} was not found`
      });
    } else {
      for (let field in Question.schema.paths) {
        if ((field !== '_id') && (field !== '__v') && (field !== 'category')) {
          if (req.body[field] !== undefined)
            question[field] = req.body[field];
        }
      }
      if (question.options.includes(question.correct)) {
        return res.status(400).json({
          message: 'Options array must not include the correct answer'
        });
      }
      const data = await question.save();
      res.json(data);
    }
  } catch (err) {
    res.status(500).json({
      message: err.message || `Error when trying to update Question with id: ${id}`
    })
  }
}

const remove = async (req, res) => {
  const { id } = req.params;

  try {
    const question = await Question.findByIdAndDelete(id);
    if (!question) {
      res.status(404).json({
        message: `Cannot delete Question with id: ${id} because that was not found`
      })
    } else {
      res.status(204).json();
    }
  } catch (err) {
    res.status(500).json({
      message: err.message || `Error when trying to delete Question with id: ${id}`
    });
  }
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