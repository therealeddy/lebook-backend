const routes = require('express').Router()
const multer = require('multer')
const multerImage = require('./config/multerImage')
const multerDocument = require('./config/multerDocument')
const BookController = require('./controllers/BookController')
const UserController = require('./controllers/UserController')
const UploadController = require('./controllers/UploadController')

// Books

routes.get('/books', BookController.getBooks)
routes.get('/books/:id', BookController.getBook)
routes.get('/books/author/:id', BookController.getBooksAuthor)
routes.post('/books', BookController.postBooks)
routes.put('/books/:id', BookController.putBook)
routes.delete('/books/:id', BookController.deleteBooks)

routes.post('/uploads/images', multer(multerImage).single('fileImage'), UploadController.postImage)
routes.post('/uploads/documents', multer(multerDocument).single('fileDocument'), UploadController.postDocument)

// Users

routes.get('/users/:username/:password', UserController.getUser)
routes.get('/users/:username', UserController.getUsername)
routes.get('/users', UserController.getUsers)
routes.post('/users', UserController.postUser)

module.exports = routes