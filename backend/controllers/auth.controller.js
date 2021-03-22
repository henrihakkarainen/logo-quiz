const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const db = require('../models');
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;
const { token: Token, user: User } = db;

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
  const { username, password, rememberMe } = req.body;
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
      const accessToken = await user.createAccessToken();
      const refreshToken = await user.createRefreshToken(rememberMe);
      return res.status(200).json({
        accessToken,
        refreshToken,
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

const generateAccessToken = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(403).json({
      message: 'Token missing'
    });
  }
  try {
    const token = await Token.findOne({ token: refreshToken });
    if (!token) {
      return res.status(401).json({
        message: 'Token not found'
      });
    }
    const decoded = jwt.verify(token.token, REFRESH_TOKEN_SECRET);
    const accessToken = jwt.sign(
      { user: decoded.user },
      ACCESS_TOKEN_SECRET,
      { algorithm: 'HS256', expiresIn: '30m' }
    );
    return res.json({ accessToken });
  } catch (err) {
    console.error(err);
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({
        message: 'Token expired'
      });
    }
    return res.status(500).json({
      message: 'Access token generation failed'
    });
  }  
}

const logout = async (req, res) => {
  const { refreshToken } = req.body;
  try {
    await Token.findOneAndDelete({ token: refreshToken });
    return res.json({
      message: 'Succesfully logged out'
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: 'Logout failed?'
    });
  }
}

module.exports = {
  register,
  login,
  generateAccessToken,
  logout
};