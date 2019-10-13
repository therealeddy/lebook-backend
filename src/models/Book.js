const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  name: String,
  description: String,
  genre: String,
  publication: String,
  language: String,
  pages: Number,
  id_author: String,
  id_image: String,
  id_document: String,
  createAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Book', BookSchema);
