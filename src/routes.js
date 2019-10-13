const express = require('express');
const routes = express.Router();
const multer = require('multer');
const multerConfig = require('./config/multer');

const BookController = require('./controllers/Book');
const UserController = require('./controllers/User');
const AuthorController = require('./controllers/Author');
const AuthenticationController = require('./controllers/Authentication');
const ImageController = require('./controllers/Image');
const DocumentController = require('./controllers/Document');

// Books
routes.get('/books', BookController.index);
routes.get('/books/author/:id', BookController.show);
routes.post('/books', BookController.store);
routes.put('/books/:id', BookController.update);
routes.delete('/books/:id', BookController.destroy);

// Users
routes.get('/users', UserController.index);
routes.get('/users/:username', UserController.show);
routes.post('/users', UserController.store);

// Authentication
routes.get(
  '/authentication/:username/:password',
  AuthenticationController.show
);

// Author
routes.get('/authors', AuthorController.index);

// Images
routes.get('/images', ImageController.index);
routes.get('/images/:id_user', ImageController.show);
routes.delete('/images/:id', ImageController.destroy);
routes.post(
  '/images',
  multer(multerConfig('images')).single('file'),
  ImageController.store
);

// Documents
routes.get('/documents', DocumentController.index);
routes.get('/documents/:id_user', DocumentController.show);
routes.delete('/documents/:id', DocumentController.destroy);
routes.post(
  '/documents',
  multer(multerConfig('documents')).single('file'),
  DocumentController.store
);

// Main
routes.get('/', (req, res) => res.send('Hello World!'));

module.exports = routes;
