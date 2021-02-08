const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    trim: true,
    minlength: 2,
    maxlength: 25,
    required: true,
    unique: true
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please enter a valid email address'
    ]
  },
  password: {
    type: String,
    required: true,
    minlength: 1,
    set: (password) => {
      if (!password || password.length === 0) return password;
      // encrypt password before storing it to database
      return bcrypt.hashSync(password, 10);
    }
  },
  role: {
    type: String,
    trim: true,
    lowercase: true,
    enum: ['admin', 'normal'],
    default: ['normal']
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;