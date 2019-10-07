const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bookingSchema = new Schema({
    time: {
        required: true,
        type: String,
    },
    date: {
        required: true,
        type: String,
    },
    createdOn: {
        required: true,
        type: Number,
        default: Date.now
    },
    contact: {
        required: true,
        type: String
    },
    fname: {
        required: true,
        type: String
    },
    lname: {
        required: true,
        type: String
    }
})

const bookingModel = mongoose.model('booking', bookingSchema)

module.exports = bookingModel