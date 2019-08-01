const User = require('../models/User')

module.exports = {
    async getUser(req, res) {
        const user = await User.find({
            username: req.params.username,
            password: req.params.password
        })

        //req.io.emit('getuser', user)

        return res.json(user)
    },
    
    async getUsers(req, res) {
        const user = await User.find({})

        //req.io.emit('getusers', user)

        return res.json(user)
    },

    async getUsername(req, res) {
        const user = await User.find({
            username: req.params.username,
        })

        //req.io.emit('getuserUser', user)

        return res.json(user)
    },

    async postUser(req, res) {
        const user = await User.create(req.body)

        //req.io.emit('postuser', user)

        return res.json(user)
    },

}