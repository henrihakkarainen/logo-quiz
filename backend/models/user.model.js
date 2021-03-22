const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;
const Token = require('./token.model');
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;

const userSchema = new Schema({
  username: {
    type: String,
    trim: true,
    minlength: 3,
    maxlength: 25,
    required: true,
    unique: true
  },
  email: {
    type: String,
    trim: true,
    required: false,
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please enter a valid email address'
    ]
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
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
    default: 'normal'
  }
});

userSchema.methods = {
  createAccessToken: async function() {
    try {
      const { _id, username } = this;
      const accessToken = jwt.sign(
        { user: { _id, username } },
        ACCESS_TOKEN_SECRET,
        { algorithm: 'HS256', expiresIn: '30m' }
      );
      return accessToken;
    } catch (err) {
      console.error(err);
      return;
    }
  },

  createRefreshToken: async function(remember) {
    try {
      const { _id, username } = this;
      const refreshToken = jwt.sign(
        { user: { _id, username } },
        REFRESH_TOKEN_SECRET,
        { algorithm: 'HS256', expiresIn: remember ? '30d' : '1d' }
      );
      
      await new Token({ token: refreshToken }).save();
      return refreshToken
    } catch (err) {
      console.error(err);
      return;
    }
  }
}

userSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    delete ret.password;
    delete ret._id;
    delete ret.__v;
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;