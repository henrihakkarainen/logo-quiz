const db = require('../models');
const User = db.user;

const checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {
    const userByUsername = await User.findOne({ username: req.body.username }).exec();
    if (userByUsername) {
      return res.status(400).json({
        message: 'Username reserved'
      });
    }

    const userByEmail = await User.findOne({ email: req.body.email }).exec();
    if (userByEmail) {
      return res.status(400).json({
        message: 'Email reserved'
      });
    }
    next();
  } catch (err) {
    return res.status(500).json({
      message: err.message || 'Error when trying to validate username and/or email'
    });
  }
}

const verifyInput = {
  checkDuplicateUsernameOrEmail
};

module.exports = verifyInput;