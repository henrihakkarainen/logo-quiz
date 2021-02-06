const fs = require('fs');
const path = require('path');

const db = require('../models');

const Category = db.categories;
const Question = db.questions;

const createCategoryData = async () => {
  const rawData = fs.readFileSync(
    path.resolve(__dirname, './category.setup.json')
  );
  const data = JSON.parse(rawData);

  try {
    await Category.create(data);

    return 'Category inserted into database';
  } catch (err) {
    return 'Category already exists in the database';
  }
}

const createQuestionData = async () => {
  const rawData = fs.readFileSync(
    path.resolve(__dirname, './questions.setup.json')
  );
  const data = JSON.parse(rawData);

  try {
    for (const question of data) {
      const category = await Category.findOne({
        $or: [ { 'title.en': question.category }, { 'title.fi': question.category } ]
      }).exec();
      question.categoryID = category._id;
    }
    
    await Question.create(data);

    return 'Questions inserted into database.';
  } catch (err) {
    return 'Questions already exist in the database.';
  }
}

module.exports = {
  createCategoryData,
  createQuestionData
};