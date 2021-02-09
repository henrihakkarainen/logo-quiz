const AuthRouter = require('./routes/auth.routes');
const CategoryRouter = require('./routes/category.routes');
const QuestionRouter = require('./routes/question.routes');
const UserRouter = require('./routes/user.routes');

module.exports = (app) => {
  app.use('/api/auth', AuthRouter);
  app.use('/api/categories', CategoryRouter);
  app.use('/api/questions', QuestionRouter);
  app.use('/api/users', UserRouter);
};