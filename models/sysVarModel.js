const mongoose = require('mongoose')
const Schema = mongoose.Schema

const varSchema = new Schema({
    createdOn: {
        required: true,
        type: Number,
        default: Date.now
    },
    name: {
        type: String,
        required: true,
    },
    value: {
    },
    isBoolean: {
        type: Boolean,
        required: true,
        default: false
    }
})

const varModel = mongoose.model('variable', varSchema)

module.exports = varModel