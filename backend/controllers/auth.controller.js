const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const db = require('../models');
const SECRET = require('config').get('session').secret;
const User = db.user;

const register = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({
      message: 'Following fields are required: username, password'
    });
  }
  try {
    const user = new User({
      username,
      email: email ? email : '',
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
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({
      message: 'Username and password are required for login'
    });
  }

  try {
    const user = await User.findOne({ username }).exec();
    if (!user) {
      return res.status(404).json({
        message: `User: ${username} not found`
      });
    }
    const result = await bcrypt.compare(password, user.password);
    if (result) {
      const token = await jwt.sign({ id: user._id }, SECRET, { algorithm: 'HS256' })
      return res.status(200).json({
        token,
        role: user.role,
        id: user._id
      });
    } else {
      return res.status(401).json({
        message: 'Invalid credentials'
      });
    }
  } catch (err) {
    return res.status(401).json({
      message: err.message || 'Login failed'
    });
  }
}

module.exports = {
  register,
  login
};