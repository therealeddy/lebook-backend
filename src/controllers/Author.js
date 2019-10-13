const User = require('../models/User');

module.exports = {
  async index(req, res) {
    const users = await User.find({ role: 'author' }).sort('-createdAt');

    return res.json(users);
  }
};
