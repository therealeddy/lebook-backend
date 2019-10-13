const Image = require('../models/Image');

module.exports = {
  async index(req, res) {
    const images = await Image.find({}).sort('-createdAt');

    return res.json(images);
  },

  async show(req, res) {
    const images = await Image.find({ id_user: req.params.id_user }).sort(
      '-createdAt'
    );

    return res.json(images);
  },

  async store(req, res) {
    const { originalname: name, size, key, location: url = '' } = req.file;

    const image = await Image.create({
      name,
      size,
      key,
      url,
      id_user: ''
    });

    return res.json(image);
  },

  async destroy(req, res) {
    const image = await Image.findById(req.params.id);
    await image.remove();

    return res.send(true);
  }
};
