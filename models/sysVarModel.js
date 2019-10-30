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
    type: {
        type: String,
        required: true
    }
})

varSchema.methods.toJSON = function(){
    let variable = this
    let varObj = variable.toObject()
    if(varObj.type == 'boolean'){
        varObj.value = Boolean(varObj.value)
    }
    delete varObj.__v
    delete varObj.createdOn
    return varObj
}

const varModel = mongoose.model('variable', varSchema)

module.exports = varModel