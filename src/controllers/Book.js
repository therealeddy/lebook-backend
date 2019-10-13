const Book = require('../models/Book');

module.exports = {
  async index(req, res) {
    const books = await Book.find({}).sort('-createdAt');

    return res.json(books);
  },

  async show(req, res) {
    const books = await Book.find({ id_author: req.params.id }).sort(
      '-createdAt'
    );

    return res.json(books);
  },

  async store(req, res) {
    const book = await Book.create(req.body);
    return res.json(book);
  },

  async update(req, res) {
    const book = await Book.findById(req.params.id);
    await book.updateOne(req.body);

    return res.send(true);
  },

  async destroy(req, res) {
    const book = await Book.findById(req.params.id);
    await book.remove();

    return res.send(true);
  }
};
