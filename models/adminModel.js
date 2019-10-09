const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const Schema = mongoose.Schema

const AdminSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    createdOn: {
        required: true,
        type: Number,
        default: Date.now
    },
    lastLogin: {
        required: true,
        type: Number,
        default: Date.now
    },
    isActive: {
        required: true,
        type: Boolean,
        default: true
    }
})

AdminSchema.pre('save', function (next) {
    let admin = this
    //store password in hash
    if (admin.isModified('password')) {
        bcrypt.genSalt(11, (err, salt) => {
            if (err) throw err;
            bcrypt.hash(admin.password, salt, (err, hash) => {
                if (err) throw err;
                admin.password = hash
                next()
            })
        })
    } else {
        next()
    }
})

const admin = mongoose.model('admin', AdminSchema);

module.exports = admin