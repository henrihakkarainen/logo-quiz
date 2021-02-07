const db = require('../models');

const Category = db.categories;
const Question = db.questions;

const create = async (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return res.status(400).json({
      message: 'Body must have the following: title, description'
    });
  }

  const query = {
    $or : [
      { 'title.en' : { $regex: new RegExp(`^${title.en}$`), $options: 'i' } },
      { 'title.fi' : { $regex: new RegExp(`^${title.en}$`), $options: 'i' } },
      { 'title.en' : { $regex: new RegExp(`^${title.fi}$`), $options: 'i' } },
      { 'title.fi' : { $regex: new RegExp(`^${title.fi}$`), $options: 'i' } }
    ]
  }

  const existsTitle = await Category.exists(query);
  if (existsTitle) {
    return res.status(409).json({
      message: `Category with title "${title.en}" or "${title.fi}" already exists in the database`
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
  const { title } = req.query;
  const query = {
    $or: [
      { 'title.en': { $regex: new RegExp(`^${title}$`), $options: 'i' } },
      { 'title.fi': { $regex: new RegExp(`^${title}$`), $options: 'i' } }
    ]
  }
  const condition = title ? query : {}
  
  try {
    const data = await Category.find(condition);
    res.json(data);
  } catch (err) {
    res.status(500).json({
      message: err.message || 'Server failed to retrieve categories'
    });
  }  
}

const findOne = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Category.findById(id).exec();
    if (!category) {
      res.status(404).json({
        message: `Category with id: ${id} was not found`
      });
    } else {
      res.json(category);
    }
  } catch (err) {
    res.status(500).json({
      message: err.message | `Error when trying to retrieve Category with id: ${id}`
    });
  }  
}

const findPublished = async (req, res) => {
  try {
    const data = await Category.find({ published: true }).exec();
    console.log(data)
    res.json(data);
  } catch (err) {
    res.status(500).json({
      message: err.message || 'Error when trying to retrieve published categories'
    });
  }
}

const update = async (req, res) => {
  const { id } = req.params;
  const { title, description, published } = req.body;

  try {
    const category = await Category.findById(id).exec();
    if (!category) {
      res.status(404).json({
        message: `Category with id: ${id} was not found`
      });
    } else {
      if (title?.en) category.title.en = title.en;
      if (title?.fi) category.title.fi = title.fi;
      if (description?.en) category.description.en = description.en;
      if (description?.fi) category.description.fi = description.fi;
      if (published) category.published = published;
      
      const data = await category.save();
      res.json(data);
    }
  } catch (err) {
    res.status(500).json({
      message: err.message || `Error when trying to update Category with id: ${id}`
    })
  }
}

const remove = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      res.status(404).json({
        message: `Cannot delete Category with id: ${id} because that was not found`
      });
    } else {
      const data = await Question.deleteMany({ categoryID : category._id });
      res.json({
        message: `Category with id: ${category._id} and ` +
                 `${data.deletedCount} questions linked to it were deleted`
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message || `Error when trying to delete Category with id: ${id}`
    })
  }
}

const removeAll = async (req, res) => {
  try {
    const catData = await Category.deleteMany({});
    const queData = await Question.deleteMany({});
    res.json({
      message: `${catData.deletedCount} categories and ` +
               `${queData.deletedCount} questions were deleted`
    });
  } catch (err) {
    res.status(500).json({
      message: err.message || 'Deleting categories did not succeed'
    });
  }
}

module.exports = {
  create,
  findAll,
  findOne,
  findPublished,
  update,
  remove,
  removeAll
};