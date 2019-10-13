const express = require('express');

const routes = express.Router();

const BookController = require('./controllers/Book');
const UserController = require('./controllers/User');
const AuthorController = require('./controllers/Author');
const AuthenticationController = require('./controllers/Authentication');

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

// Main
routes.get('/', (req, res) => res.send('Hello World!'));

module.exports = routes;
