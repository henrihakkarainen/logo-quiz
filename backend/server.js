const express = require('express');
const helmet = require('helmet');
// const cors = require('cors');
const app = express();

app.use(helmet());

// Middleware for parsing requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

const db = require('./models');
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log('Connected to Mongo database!');
  })
  .catch((err) => {
    console.log('Cannot connect to Mongo database!', err);
    process.exit();
  });


const { createCategoryData, createQuestionData } = require('./setup/createdata');
createCategoryData()
  .then((msg) => {
  console.log(msg)
  })
  .then(createQuestionData)
  .then((msg) => {
    console.log(msg);
  });


require('./router.js')(app);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}.`);
});