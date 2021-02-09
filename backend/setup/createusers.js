const db = require('../models');
const User = db.user;

const createUser = async (userConfig) => {
  const admin = await User.findOne({ role: 'admin' }).exec();

  if (admin) return;

  const user = new User(userConfig);
  user.role = 'admin';
  try {
    await user.save();
    return;
  } catch (err) {
    console.log('Admin user setup failed');
  }
}

module.exports = createUser;