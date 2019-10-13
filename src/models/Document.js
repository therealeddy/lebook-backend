const mongoose = require('mongoose');

const DocumentSchema = new mongoose.Schema({
  name: String,
  link: String,
  key: String,
  size: String,
  createAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Document', DocumentSchema);
