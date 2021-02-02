const db = require('../models');

const Category = db.categories;

const create = async (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return res.status(400).json({
      message: 'Body must have the following: title, description'
    });
  }

  const existsTitle = await Category.exists({ title });
  if (existsTitle) {
    return res.status(409).json({
      message: `Category with title "${title}" already exists in the database`
    });
  }

  const category = new Category({
    title,
    description
  });

  try {
    const data = await category.save();
    res.json(data);
  } catch (err) {
    res.status(500).json({
      message: err.message || 'Adding the category failed for unknown reason'
    });
  }
}

const findAll = async (req, res) => {
  const { title } = req.body;
  const condition = title ? { title: { $regex: new RegExp(title), $options: 'i' } } : {}
  
  try {
    const data = await Category.find(condition);
    res.json(data);
  } catch (err) {
    res.status(500).json({
      message: err.message || 'Server failed to retrieve categories'
    });
  }  
}

module.exports = {
  create,
  findAll
};