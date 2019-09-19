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
              dateCollection.findOneAndUpdate({ date: date }, {
                "$set": {
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
            // record.timing.map(item => {
            //   console.log(item._id, timeId , item._id == timeId)
            //   if (item._id == timeId) {
            //     console.log(item)
            //     if (item.isAvailable && item.booking < 2) {
            //       item.booking++
            //       if (item.booking == 2) {
            //         item.isAvailable = false
            //       }
            //       dateCollection.findOneAndUpdate({ date: date, "timing._id": timeId },{
            //           "$set": {
            //             "timing.isAvailable": item.isAvailable,
            //             "timing.booking": item.booking,
            //           }},function (err, doc) {
            //             if(err){
            //               res.json(err)
            //             }else{
            //               res.json(doc)
            //             }
            //         }
            //       );
            //       // record.save(function(err){
            //       //   if(err){
            //       //     res.json(err)
            //       //   }else{
            //       //     new_appointment.save(() => {
            //       //           res.json({
            //       //             status: 200,
            //       //             message: 'Booking Confirmed'
            //       //           })
            //       //         })
            //       //   }
            //       // })
            //     } else {
            //       res.json({
            //         status: 1030,
            //         message: 'No Slot available'
            //       })
            //     }
            //   }
            // });
          }
        }).catch((e) => {
          return Promise.reject(e)
        })
        // dateCollection.updateAvailability(date , time, new_appointment._id).then((resp)=>{
        //   new_appointment.save(() => {
        //     res.json({
        //       status: 200,
        //       message: 'Booking Confirmed'
        //     })
        //   })
        // }).catch((err) => {
        //   res.json({
        //     status: 401,
        //     message: err
        //   })
        // })
      } else {
        res.json({
          status: 1001,
          message: 'Already Active Request'
        })
      }
    })
  }
})


module.exports = router;
