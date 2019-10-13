const Document = require('../models/Document');

module.exports = {
  async index(req, res) {
    const documents = await Document.find({}).sort('-createdAt');

    return res.json(documents);
  },

  async show(req, res) {
    const documents = await Document.find({ id_user: req.params.id_user }).sort(
      '-createdAt'
    );

    return res.json(documents);
  },

  async store(req, res) {
    const { originalname: name, size, key, location: url = '' } = req.file;

    const document = await Document.create({
      name,
      size,
      key,
      url,
      id_user: ''
    });

    return res.json(document);
  },

  async destroy(req, res) {
    const document = await Document.findById(req.params.id);
    await document.remove();

    return res.send(true);
  }
};
