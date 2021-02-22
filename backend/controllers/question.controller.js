const db = require('../models');
const Question = db.question;
const Category = db.category;

// Create a new question
const create = async (req, res) => {
  const { alias, options, correct, difficulty, imageURL } = req.body;
  const categoryTitle = req.body.category;
  if (!alias || !options || !correct || !difficulty || !categoryTitle) {
    return res.status(400).json({
      message: 'Following fields are required: alias, options, correct, difficulty, category'
    });
  }

  const category = await Category.findOne({ 'alias': categoryTitle }).exec();
  if (!category) {
    return res.status(500).json({
      message: `Category with alias "${categoryTitle}" was not found and question couldn't be added`
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
    categoryID: category._id,
    imageURL
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
  const query =  { 'alias' : { $regex: new RegExp(`^${category}$`), $options: 'i' } }
  let condition = category ? query : {};

  try {
    if (category) {
      const categoryData = await Category.findOne(condition).exec();
      condition = categoryData ? { categoryID: categoryData._id } : { categoryID: 'unknown' };
      if (difficulty) {
        try {
          condition = {
            ...condition,
            difficulty: parseInt(difficulty)
          }
          const data = await Question.find(condition).exec();
          res.json(data);
        } catch (err) {
          return res.status(400).json({
            message: 'Query parameter difficulty must be an integer'
          });
        }
      } else {
        const data = await Question.find(condition).exec();
        res.json(data);
      }
    } else {
      const data = await Question.find({}).exec();
      res.json(data);
    }
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
      res.json({
        message: `Question with id: ${question._id} was deleted`
      });
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