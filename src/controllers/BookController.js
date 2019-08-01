const Book = require('../models/Book')

module.exports = {
    async getBooks(req, res) {
        const books = await Book.find({}).sort('-createdAt')
        //req.io.emit('getBooks', book)
        return res.json(books)
    },

    async getBook(req, res) {
        const books = await Book.find({
            _id: req.params.id
        }).sort('-createdAt')
        //req.io.emit('getBooks', book)
        return res.json(books)
    },

    async getBooksAuthor(req, res) {
        const books = await Book.find({
            idAuthor: req.params.id
        }).sort('-createdAt')
        //req.io.emit('getBooksAuthor', book)
        return res.json(books)
    },

    async postBooks(req, res) {
        const book = await Book.create(req.body)
        //req.io.emit('postBooks', book)
        return res.json(book)
    },

    async deleteBooks(req, res) {
        const book = await Book.findById(req.params.id)
        await book.remove()
        //req.io.emit('deleteBooks', book)
        return res.json(book)
    },

    async putBook(req, res) {
        const book = await Book.findById(req.params.id)
        await book.updateOne(req.body)
        //req.io.emit('putBook', book)
        return res.send()
    },
}