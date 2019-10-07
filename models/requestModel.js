const mongoose = require('mongoose')
const Schema = mongoose.Schema

const requestSchema = new Schema({
    createdOn: {
        required: true,
        type: Number,
        default: Date.now
    },
    email: {
        type: String
    },
    // countryCode: {
    //     type: String
    // },
    phone: {
        type: String
    },
    status: {
        type: String,
        required: true,
        default: 'recived'
    },
    isPhone: {
        type: Boolean,
        required: true,
        default: true
    }
})

const requestModel = mongoose.model('request' , requestSchema)

module.exports = requestModel