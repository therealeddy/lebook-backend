const Document = require('../models/Document');

module.exports = {
  async index(req, res) {
    const documents = await Document.find({}).sort('-createdAt');

    return res.json(documents);
  },

  async show(req, res) {
    const documents = await Document.findById(req.params.id).sort('-createdAt');

    return res.json(documents);
  },

  async store(req, res) {
    const document = await Document.create(req.body);
    return res.json(document);
  },

  async destroy(req, res) {
    const document = await Document.findById(req.params.id);
    await document.remove();

    return res.send(true);
  }
};
