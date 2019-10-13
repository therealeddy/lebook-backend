const User = require('../models/User');

module.exports = {
  async index(req, res) {
    const users = await User.find({}).sort('-createdAt');

    return res.json(users);
  },

  async show(req, res) {
    const users = await User.find({
      username: req.params.username
    });

    return res.json(users);
  },

  async store(req, res) {
    const user = await User.create(req.body);
    return res.json(user);
  }
};
