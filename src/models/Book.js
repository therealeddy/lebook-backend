const mongoose = require("mongoose")
const aws = require("aws-sdk")
const fs = require("fs")
const path = require("path")
const { promisify } = require("util")
const s3 = new aws.S3()

const BookSchema = new mongoose.Schema({
    name: String,
    idAuthor: String,
    description: String,
    genre: String,
    publicationDate: String,
    language: String,
    pages: String,
    image: String,
    nameImage: String,
    keyImage: String,
    sizeImage: Number,
    document: String,
    nameDocument: String,
    keyDocument: String,
    sizeDocument: Number,
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

BookSchema.pre("remove", function() {

    if (process.env.STORAGE_TYPE === "s3") {

        s3.deleteObject({
            Bucket: process.env.BUCKET_NAME,
            Key: this.keyImage
        }).promise()

        s3.deleteObject({
            Bucket: process.env.BUCKET_NAME,
            Key: this.keyDocument
        }).promise()

        return
        
    } else {

        promisify(fs.unlink)(
            path.resolve(__dirname, "..", "..", "tmp", "uploads", "images", this.keyImage)
        )

        promisify(fs.unlink)(
            path.resolve(__dirname, "..", "..", "tmp", "uploads", "documents", this.keyDocument)
        )

        return
    }
})

module.exports = mongoose.model('Book', BookSchema)