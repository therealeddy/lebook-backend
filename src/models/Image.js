const mongoose = require('mongoose');
const aws = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const s3 = new aws.S3();

const ImageSchema = new mongoose.Schema({
  name: String,
  url: String,
  key: String,
  size: String,
  id_user: String,
  createAt: {
    type: Date,
    default: Date.now
  }
});

ImageSchema.pre('save', function() {
  if (!this.url) {
    this.url = `${process.env.APP_URL}/files/images/${this.key}`;
  }
});

ImageSchema.pre('remove', function() {
  if (process.env.STORAGE_TYPE === 's3') {
    return s3
      .deleteObject({
        Bucket: process.env.BUCKET_NAME_IMAGES,
        Key: this.key
      })
      .promise();
  } else {
    return promisify(fs.unlink)(
      path.resolve(__dirname, '..', 'uploads', 'images', this.key)
    );
  }
});

module.exports = mongoose.model('Image', ImageSchema);
