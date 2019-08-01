require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const cors = require('cors')
const path = require('path')

mongoose.connect(
    process.env.MONGO_URL,
    {
        useNewUrlParser: true
    }
)

app.use((req, res, next) => {
    req.io = io

    return next()
})

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(require('./routes'))
app.use('/files/images', express.static(path.resolve(__dirname, '..', 'tmp', 'uploads', 'images')))
app.use('/files/documents', express.static(path.resolve(__dirname, '..', 'tmp', 'uploads', 'documents')))

server.listen(process.env.PORT || 3000, () => {
    console.log('Server started')
})