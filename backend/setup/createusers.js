const db = require('../models');
const User = db.user;

const createUser = async (userConfig) => {
  const admin = await User.findOne({ role: 'admin' }).exec();

  if (admin)
    return 'Admin not created: at least one admin user already found in database.';

  const user = new User(userConfig);
  user.role = 'admin';
  try {
    await user.save();
    return 'Admin user successfully created';
  } catch (err) {
    return 'Admin user setup failed';
  }
}

module.exports = createUser;