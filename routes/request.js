var express = require('express');
var router = express.Router();
const requestCollection = require('../models/requestModel')

router.get('/list', function (req, res, next) {
  //get all request's
  requestCollection.find({}, {}, function (err, list) {
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

router.post('/add/phone', function (req, res, next) {
  if (!req.body.countryCode || !req.body.phone) {
    res.json({
      status: 1000,
      message: 'Invalid parameters'
    })
  } else {
    requestCollection.findOne({
      phone: req.body.phone,
      countryCode: req.body.countryCode
    }, function (err, data) {
      if (err) {
        res.json(err)
      } else {
        if (data) {
          res.json({
            status: 1001,
            message: 'Already Active Request'
          })
        } else {
          let new_request = new requestCollection({
            createdOn: Date.now(),
            countryCode: req.body.countryCode,
            phone: req.body.phone
          })
          new_request.save().then((request) => {
            res.json({
              status: 200,
              request
            })
          })
        }
      }
    })
  }
})

router.post('/add/email', function (req, res, next) {
  if (!req.body.email) {
    res.json({
      status: 1000,
      message: 'Invalid parameters'
    })
  } else {
    requestCollection.findOne({ email: req.body.email }, function (err, data) {
      if (err) {
        res.json(err)
      } else {
        if (data) {
          res.json({
            status: 1001,
            message: 'Already Active Request'
          })
        } else {
          let new_request = new requestCollection({
            createdOn: Date.now(),
            email: req.body.email,
            isPhone: false
          })
          new_request.save().then((request) => {
            res.json({
              status: 200,
              request
            })
          })
        }
      }
    })
  }
})
router.post('/track/phone', function (req, res, next) {
  if (!req.body.phone) {
    res.json({
      status: 1000,
      message: 'Invalid parameters'
    })
  } else {
    requestCollection.findOne({ phone: req.body.phone }, function (err, data) {
      if (err) {
        res.json(err)
      } else {
        if (data) {
          res.json({
            status: 200,
            request: data
          })
        } else {
          res.json({
            status: 1010,
            message: 'No such Request'
          })
        }
      }
    })
  }
})

router.post('/track/email', function (req, res, next) {
  if (!req.body.email) {
    res.json({
      status: 1000,
      message: 'Invalid parameters'
    })
  } else {
    requestCollection.findOne({ email: req.body.email }, function (err, data) {
      if (err) {
        res.json(err)
      } else {
        if (data) {
          res.json({
            status: 200,
            request: data
          })
        } else {
          res.json({
            status: 1010,
            message: 'No such Request'
          })
        }
      }
    })
  }
})

router.post('/update', function (req, res, next) {
  if (!req.body.id || !req.body.status) {
    res.json({
      status: 1000,
      message: 'Invalid parameters'
    })
  } else {
    requestCollection.findById({ _id: req.body.id }, function (err, data) {
      if (err) {
        res.json(err)
      } else {
        data.status = req.body.status
        data.save().then(request => {
          res.json({
            status: 200,
            message: 'Request Updated'
          })
        }).catch(err => {
          res.json(err)
        })
      }
    })
  }
})

module.exports = router;
