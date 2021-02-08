const QuestionRouter = require('./routes/question.routes');
const CategoryRouter = require('./routes/category.routes');
const UserRouter = require('./routes/user.routes');

module.exports = (app) => {
  app.use('/api/questions', QuestionRouter);
  app.use('/api/categories', CategoryRouter);
  app.use('/api', UserRouter);
};