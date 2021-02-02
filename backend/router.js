const QuestionRouter = require('./routes/question.routes');
const CategoryRouter = require('./routes/category.routes');

module.exports = (app) => {
  app.use('/api/questions', QuestionRouter);
  app.use('/api/categories', CategoryRouter);
};