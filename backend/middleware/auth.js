const jwt = require('jsonwebtoken');
const db = require('../models');
const User = db.user;
const SECRET = process.env.ACCESS_TOKEN_SECRET;

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.slice(7, authHeader.length);
    if (!token) {
      return res.status(403).json({
        message: 'Authorization token required'
      });
    }

    try {
      const decoded = jwt.verify(token, SECRET);
      req.user = { id: decoded.user._id };
      next();
    } catch (err) {
      switch (err.name) {
        case 'TokenExpiredError':
          return res.status(401).json({
            message: 'Session timed out'
          });
        case 'JsonWebTokenError':
          return res.status(401).json({
            message: 'Invalid token'
          });
        default:
          return res.status(400).json({
            message: 'Unknown error with token verification'
          });
      }
    }
  } else {
    return res.status(401).json({
      message: 'Authorization required'
    });
  }
}

const ensureAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).exec();

    if (user && user.role === 'admin') next();
    else {
      return res.status(401).json({
        message: 'Admin rights required'
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: err.message || 'Ensuring admin rights failed'
    });
  }  
}

const ensureSelf = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).exec();
    if (user && (user.role === 'admin' || user._id == req.params.id)) {
      next();
    } else {
      return res.status(401).json({
        message: 'Owner rights required'
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: err.message || 'Ensuring user rights failed'
    });
  }
}

const auth = {
  verifyToken,
  ensureAdmin,
  ensureSelf
};

module.exports = auth;