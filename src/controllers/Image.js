const Image = require('../models/Image');

module.exports = {
  async index(req, res) {
    const images = await Image.find({}).sort('-createdAt');

    return res.json(images);
  },

  async show(req, res) {
    const images = await Image.findById(req.params.id).sort('-createdAt');

    return res.json(images);
  },

  async store(req, res) {
    const image = await Image.create(req.body);
    return res.json(image);
  },

  async destroy(req, res) {
    const image = await Image.findById(req.params.id);
    await image.remove();

    return res.send(true);
  }
};
