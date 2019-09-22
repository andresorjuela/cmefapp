var express = require('express');
var router = express.Router();
const appointCollection = require('../models/appointModel')
const dateCollection = require('../models/dateModel')

router.get('/list', function (req, res, next) {
  appointCollection.find({}, function (err, list) {
    if (err) {
      res.json(err)
    } else {
      res.json({
        status: 200,
        list: list
      })
    }
  })
});

router.post('/makeAppointment', function (req, res, next) {
  if (!req.body.fname || !req.body.lname || !req.body.contact || !req.body.date || !req.body.time || !req.body.timeId) {
    res.json({
      status: 1000,
      message: 'Invalid parameters'
    })
  } else {
    let date = req.body.date
    let timeId = req.body.timeId
    let time = req.body.time
    dateCollection.findOne({ time, date }, function (err, record) {
      if (err) {
        res.json(err)
      }
      if (!record) {
        let new_appointment = new appointCollection({
          createdOn: Date.now(),
          fname: req.body.fname,
          lname: req.body.lname,
          contact: req.body.contact,
          time,
          date
        })
        dateCollection.findOne({ date: date }).then((record) => {
          if (!record) {
            res.json({
              status: 1020,
              message: 'Invalid Date'
            })
          } else {
            let appointmentCount = record.appointmentCount
            if(appointmentCount < 18){
              var currentTiming = record.timing.find(function (element) {
                return element._id == timeId;
              });
              if (currentTiming) {
                let updatedTiming = record.timing.map(item => {
                  if (item._id == timeId) {
                    if (item.isAvailable && item.booking < 2) {
                      item.booking_list.push(new_appointment.id)
                      item.booking++
                      if (item.booking == 2) {
                        item.isAvailable = false
                      }
                      return item
                    } else {
                      res.json({
                        status: 1030,
                        message: 'Both Slot Booked'
                      })
                    }
                  } else {
                    return item
                  }
                })
                let new_count = record.appointmentCount+1
                dateCollection.findOneAndUpdate({ date: date }, {
                  "$set": {
                    "appointmentCount":new_count,
                    "timing": updatedTiming
                  }
                }, function (err, doc) {
                  if (err) {
                    res.json(err)
                  } else {
                    new_appointment.save(() => {
                      res.json({
                        status: 200,
                        message: 'Booking Confirmed'
                      })
                    })
                  }
                }
                );
              } else {
                res.json({
                  status: 1030,
                  message: "invalid Time Slot"
                })
              }
            }else{
              res.json({
                status: 1030,
                message: "All Slots Booked"
              })
            }
          }
        }).catch((e) => {
          return Promise.reject(e)
        })
      } else {
        res.json({
          status: 1001,
          message: 'Already Active Request'
        })
      }
    })
  }
})

router.post('/bytime', function (req, res, next) {
  if(!req.body.date || !req.body.time){
    res.json({
      status: 1000,
      message: 'Invalid parameters'
    })
  }else{ 
    appointCollection.find({date: req.body.date, time: req.body.time}, function (err, list) {
    if (err) {
      res.json(err)
    } else {
      res.json({
        status: 200,
        appointments: list
      })
    }
  })
  }
});

module.exports = router;
