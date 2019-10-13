const User = require('../models/User');

module.exports = {
  async show(req, res) {
    const users = await User.find({
      username: req.params.username,
      password: req.params.password
    });

    return res.json(users);
  }
};
