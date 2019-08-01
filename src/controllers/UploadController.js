module.exports = {
    async postImage(req, res){

        const { originalname: name, size, key } = req.file
        let { location: url = "" } = req.file

        if(!url){
            url = `${process.env.APP_URL}/files/images/${key}`
        }

        const post = {
            name,
            size,
            key,
            url,
        }

        return res.json(post)
    },
    
    async postDocument(req, res){
        const { originalname: name, size, key } = req.file
        let { location: url = "" } = req.file

        if(!url){
            url = `${process.env.APP_URL}/files/documents/${key}`
        }

        const post = {
            name,
            size,
            key,
            url,
        }

        return res.json(post)
    }
}