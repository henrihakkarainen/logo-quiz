const fs = require('fs');
const path = require('path');

const db = require('../models');

const Category = db.category;
const Question = db.question;

const createGameData = async () => {
  const rawCategoryData = fs.readFileSync(
    path.resolve(__dirname, './category.setup.json')
  );
  const rawQuestionData = fs.readFileSync(
    path.resolve(__dirname, './questions.setup.json')
  );
  const categoryData = JSON.parse(rawCategoryData);
  const questionData = JSON.parse(rawQuestionData);

  try {
    await Category.create(categoryData);

    for (const question of questionData) {
      const category = await Category.findOne({ 'alias': question.category }).exec();
      question.categoryID = category._id;
    }
    
    await Question.create(questionData);

    return 'Category and question data inserted into database';
  } catch (err) {
    return err.message;
  }
}

module.exports = createGameData;