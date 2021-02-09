const db = require('../models');
const User = db.user;

const findAll = async (req, res) => {
  try {
    const users = await User.find({})
      .sort('_id')
      .exec();
    return res.json(users);
  } catch (err) {
    return res.status(500).json({
      message: 'Failed to retrieve users'
    });
  }
}

module.exports = {
  findAll
};