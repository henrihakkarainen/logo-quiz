const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const config = require('../config/db.config');
const db = require('../models');
const User = db.user;

const register = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({
      message: 'Following fields are required: username, email, password'
    });
  }
  try {
    const user = new User({
      username,
      email,
      password
    });
    const data = await user.save();
    return res.status(201).json(data);
  } catch (err) {
    return res.status(500).json({
      message: err.message || 'Creating new user failed for unknown reason'
    });
  }
}

const login = async (req, res) => {

}

module.exports = {
  register,
  login
};