const db = require('../models');
const User = db.user;

const findAll = async (req, res) => {
  try {
    const users = await User.find({})
      .sort('username')
      .exec();
    return res.json(users);
  } catch (err) {
    return res.status(500).json({
      message: 'Failed to retrieve users'
    });
  }
}

const findOne = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id).exec();
    if (!user) {
      res.status(404).json({
        message: `User with id: ${id} was not found`
      });
    } else {
      res.json(user);
    }
  } catch (err) {
    res.status(500).json({
      message: err.message || `Error when trying to retrieve User with id: ${id}`
    });
  }
}

const update = async (req, res) => {
  const { id } = req.params;
  const { email, password, role } = req.body;

  try {
    const user = await User.findById(id).exec();
    if (!user) {
      res.status(404).json({
        message: `User with id: ${id} was not found`
      });
    } else {
      if (role && req.user.id == user._id && user.role !== 'admin') {
        res.status(403).json({
          message: 'Normal user can\'t modify their own role'
        });
      } else {
        if (email) user.email = email;
        if (password) user.password = password;
        if (role) user.role = role;

        const data = await user.save();
        res.json(data);
      }
    }
  } catch (err) {
    res.status(500).json({
      message: err.message || `Error when trying to update User with id: ${id}`
    });
  }
}

const remove = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      res.status(404).json({
        message: `Cannot delete User with id: ${id} because that was not found`
      });
    } else {
      res.json({
        message: `User ${user.username} was removed`
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message || `Error when trying to delete User with id: ${id}`
    });
  }
}

module.exports = {
  findAll,
  findOne,
  update,
  remove
};