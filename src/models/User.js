const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: String,
    name: String,
    password: String,
    type: String,
})

module.exports = mongoose.model('User', UserSchema)