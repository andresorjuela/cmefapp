const mongoose = require('mongoose')
const Schema = mongoose.Schema

const eventSchema = new Schema({
    createdOn: {
        required: true,
        type: Number,
        default: Date.now
    },
    title: {
        required: true,
        type: String
    },
    content: {
        required: true,
        type: String
    },
    time: {
        type: String,
    },
    date: {
        type: String,
    },
    isActive: {
        required: true,
        type: Boolean,
        default: true
    }
})

const eventModel = mongoose.model('event', eventSchema)

module.exports = eventModel