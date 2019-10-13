const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');

module.exports = function(typeArquive) {
  let bucketName;

  if (typeArquive === 'images') {
    bucketName = process.env.BUCKET_NAME_IMAGES;
  }
  if (typeArquive === 'documents') {
    bucketName = process.env.BUCKET_NAME_DOCUMENTS;
  }

  const storageTypes = {
    local: multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, path.resolve(__dirname, '..', 'uploads', typeArquive));
      },
      filename: (req, file, cb) => {
        crypto.randomBytes(16, (err, hash) => {
          if (err) cb(err);

          file.key = `${hash.toString('hex')}-${file.originalname}`;

          cb(null, file.key);
        });
      }
    }),
    s3: multerS3({
      s3: new aws.S3(),
      bucket: bucketName,
      contentType: multerS3.AUTO_CONTENT_TYPE,
      acl: 'public-read',
      key: (req, file, cb) => {
        crypto.randomBytes(16, (err, hash) => {
          if (err) cb(err);

          const fileName = `${hash.toString('hex')}-${file.originalname}`;

          cb(null, fileName);
        });
      }
    })
  };

  return {
    dest: path.resolve(__dirname, '..', 'uploads', typeArquive),
    storage: storageTypes[process.env.STORAGE_TYPE],
    limits: {
      fileSize: 2 * 1024 * 1024
    },
    fileFilter: (req, file, cb) => {
      let allowedMimes = [];
      if (typeArquive === 'images') {
        allowedMimes = ['image/jpeg', 'image/pjpeg', 'image/png'];
      }
      if (typeArquive === 'documents') {
        allowedMimes = ['application/pdf'];
      }

      if (allowedMimes.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new Error('Invalid file type.'));
      }
    }
  };
};
