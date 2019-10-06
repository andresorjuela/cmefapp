var express = require('express');
var router = express.Router();
const eventCollection = require('../models/eventModel')

router.get('/list', function (req, res, next) {
    eventCollection.find({}, function (err, list) {
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

router.post('/addEvent', function (req, res, next) {
    if (!req.body.title || !req.body.content ) {
        res.json({
            status: 1000,
            message: 'Invalid parameters'
        })
    } else {
        let event = {
            title: req.body.title,
            content: req.body.content
        }
        let newEvent = new eventCollection(event)
        newEvent.save().then(function (event) {
            res.json({
                status: 200,
                message: `New Event Added`,
                data: event
            })
        })
    }
});

router.post('/delete', function (req, res, next) {
    if (!req.body.id) {
        res.json({
            status: 1000,
            message: 'Invalid parameters'
        })
    } else {
        eventCollection.findByIdAndRemove({_id: req.body.id} , function(err){
            if(err) throw err;
            res.json({
              status: 200,
              message: `Event Deleted`,
            })
          })
    }
});

module.exports = router;
