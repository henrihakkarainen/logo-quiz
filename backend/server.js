require('dotenv').config();
const express = require('express');
// const debug = require('debug')('logo-quiz:server');
// const path = require('path');
const helmet = require('helmet');
const cors = require('cors');
const config = require('config');
const app = express();

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

// Connect to mongodb
const db = require('./models');
db.connectDB(config.get('mongo').url);

// Setup admin user for the db
const setupAdmin = require('./setup/createusers');
setupAdmin(config.get('admin'))
  .then(msg => {
    console.log(msg);
  });

// Setup 1 category with questions for the db
const createGameData = require('./setup/createdata');
createGameData()
  .then(msg => {
    console.log(msg);
  })
  .catch(err => {
    console.log(err);
  });

// Apply routers
require('./router.js')(app);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}.`);
});