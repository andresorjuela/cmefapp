var express = require('express');
var router = express.Router();
const dateCollection = require('../models/dateModel')
const appointCollection = require('../models/appointModel')
const productCollection = require('../models/productModel')
const requestCollection = require('../models/requestModel')
const adminCollection = require('../models/adminModel')

router.get('/getAllDates', function (req, res, next) {
  dateCollection.find({} , function(err , list){
    if(err){
      res.json(err)
    }else{
      res.json({
        status: 200,
        list: list
      })
    }
  })
});

router.get('/getActiveDates', function (req, res, next) {
  dateCollection.find({isActive: true} , function(err , list){
    if(err){
      res.json(err)
    }else{
      res.json({
        status: 200,
        list: list
      })
    }
  })
});

router.get('/getAvailabeDates', function (req, res, next) {
  dateCollection.find({isActive: true, isAvailable: true} , function(err , list){
    if(err){
      res.json(err)
    }else{
      res.json({
        status: 200,
        list: list
      })
    }
  })
});

router.post('/timing' , function(req  , res , next) {
  if(!req.body.date){
    res.json({
      status: 1000,
      message: 'Invalid parameters'
    })
  }else{
    dateCollection.findOne({date: req.body.date} , function(err , date){
      if(err){
        res.json(err)
      }else{
        let timing = []
        console.log(date)
        date.timing.forEach((item) => {
          console.log(item.time , item.isAvailable && item.booking < 2)
          if(item.isAvailable && item.booking < 2){
            timing.push({
              value: item._id,
              label: item.time
            })
          }
        })
        res.json({
          status: 200,
          timing: timing
        })
      }
    })
  }
})

router.post('/addNewDate' , function(req , res , next){
  if(!req.body.date){
    res.json({
      status: 1000,
      message: 'Invalid parameters'
    })
  }else{
    let date = req.body.date
    dateCollection.findOne({date} , function(err , data){
      if(err){
        console.log(err)
        res.json(err)
      }else{
        if(data !== null){
          res.json({
            status: 1001,
            message: 'Date Already registered'
          })
        }else{
          let new_date = new dateCollection({
            createdOn: Date.now(),
            date
          })
          console.log(new_date)
          new_date.save().then((date) => {
            res.json({
              status: 200,
              date: date
            })
          }).catch(err => {
            res.json(err)
          })
        }
      }
    })
  }
})


router.post('/updateDate', function (req, res, next) {
  if(!req.body.id){
    res.json({
      status: 1000,
      message: 'Invalid parameters'
    })
  }else{
    dateCollection.findOneAndUpdate({ _id: req.body.id }, {isActive:req.body.status}, function(err , list){
      if(err){
        res.json(err)
      }else{
        res.json({
          status: 200,
          message: 'Date Updated'
        })
      }
    })
  }
});

router.post('/deleteDate', function (req, res, next) {
  if(!req.body.id){
    res.json({
      status: 1000,
      message: 'Invalid parameters'
    })
  }else{
    dateCollection.findOneAndRemove({_id: req.body.id} , function(err ){
      if(err){
        res.json(err)
      }else{
        res.json({
          status: 200,
          message: 'Date Deleted'
        })
      }
    })
  }
});

/* Get DB States */

router.get('/getStates', function(req , res , next) {
  dateCollection.count(function(err, totalDates) {
    dateCollection.count({isActive: true},function(err, activeDates) {
      dateCollection.count({isActive: true , isAvailable: true},function(err, availableDates) {
        adminCollection.count(function(err, totalAdmin) {
          requestCollection.count(function(err, totalRequest) {
            requestCollection.count({status: 'recived'},function(err, newRequest) {
              requestCollection.count({status: 'inprogress'},function(err, activeRequest) {
                requestCollection.count({status: 'completed'},function(err, completedRequest) {
                  appointCollection.count(function(err, totalAppointments) {
                    res.json({
                      status: 200,
                      stats: {
                        totalDates,
                        activeDates,
                        availableDates,
                        totalAdmin,
                        totalRequest,
                        newRequest,
                        activeRequest,
                        completedRequest,
                        totalAppointments
                      }
                    })
                  });
                });
              });
            });
          });
        });
      });
    });
  });
})


module.exports = router;
