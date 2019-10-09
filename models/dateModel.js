const mongoose = require('mongoose')
const Schema = mongoose.Schema

const dateSchema = new Schema({
    createdOn: {
        required: true,
        type: Number,
        default: Date.now
    },
    date: {
        required: true,
        type: String,
        unique: true
    },
    isAvailable: {
        required: true,
        type: Boolean,
        default: true,
    },
    isActive: {
        required: true,
        type: Boolean,
        default: true,
    },
    appointmentCount: {
        required: true,
        type: Number,
        default: 0
    },
    day:{
        required: true,
        type: Number
    },
    month:{
        required: true,
        type: Number
    },
    year: {
        required: true,
        type: Number
    },
    timing: [{
        time: {},
        isAvailable: {},
        booking: {
            type: Number,
            default: 0,
            min: 0, 
            max: 2
        },
        booking_list: [{
            booking_id:{}
        }]
    }]
})

dateSchema.pre('save', function () {
    let date = this
    date.timing = [
        {
            time: '11:00 AM',
            isAvailable: true,
            booking: []
        },
        {
            time: '11:30 AM',
            isAvailable: true,
            booking: []
        },
        {
            time: '12:00 PM',
            isAvailable: true,
            booking: []
        },
        {
            time: '12:30 PM',
            isAvailable: true,
            booking: []
        },
        {
            time: '01:30 PM',
            isAvailable: true,
            booking: []
        },
        {
            time: '02:00 PM',
            isAvailable: true,
            booking: []
        },
        {
            time: '02:30 PM',
            isAvailable: true,
            booking: []
        },
        {
            time: '03:00 PM',
            isAvailable: true,
            booking: []
        },
        {
            time: '03:30 PM',
            isAvailable: true,
            booking: []
        }
    ]
})

dateSchema.statics.updateAvailability = function (date, time, bookingId) {
    let currentDate = this
    try {
        return currentDate.findOne({ date: date }).then((record) => {
            if (!record) {
                return Promise.reject()
            }
            return new Promise((resolve, reject) => {
                record.timing.forEach(function (item) {
                    if (item.time == time) {
                        if (item.isAvailable && item.booking.length < 2) {
                            item.booking.push({id: bookingId})
                            if (item.booking.length == 2) {
                                item.isAvailable = false
                            }
                            record.save().then((updated) => {
                                console.log('updated ' , updated)
                                resolve('Updated')
                            })
                        } else {
                            reject("No slot available")
                        }
                    }
                })
            })
        }).catch((e) => {
            return Promise.reject(e)
        })
    } catch (error) {
        return Promise.reject(error)
    }
}
const dateModel = mongoose.model('date', dateSchema)


module.exports = dateModel