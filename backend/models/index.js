const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const connectDB = (url) => {
  mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
    .then(() => {
      console.log('Connected to Mongo database!')
      mongoose.connection.on('error', (err) => {
        console.log(err);
      });

      mongoose.connection.on('reconnectFailed', handleCriticalError);
    })
    .catch(handleCriticalError)
}

const handleCriticalError = (err) => {
  console.log(err);
  process.exit();
}

const db = {
  connectDB,
  question: require('./question.model'),
  category: require('./category.model'),
  user: require('./user.model')
};

module.exports = db;