const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    createdOn: {
        required: true,
        type: Number,
        default: Date.now
    },
    title: {
        type: String,
        required: true,
    },
    imgUrl: {
        type: String,
        required: true
    }
})

const productModel = mongoose.model('product', productSchema)

module.exports = productModel