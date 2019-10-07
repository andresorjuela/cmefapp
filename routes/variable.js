var express = require('express');
var router = express.Router();
const variableCollection = require('../models/sysVarModel')

router.get('/', function (req, res, next) {
    variableCollection.find({}, function (err, vars) {
        if (err) {
            res.json(err)
        } else {
            res.json({
                status: 200,
                data: vars
            })
        }
    })
});

router.post('/add', function (req, res, next) {
    if (!req.body.varName) {
        res.json({
            status: 1000,
            message: 'Invalid parameters'
        })
    } else {
        variableCollection.findOne({ name: req.body.varName }, function (err, record) {
            if (err) {
                res.json(err)
            } else {
                if (record) {
                    res.json({
                        status: 1001,
                        message: 'variable already exist '
                    })
                } else {
                    let new_var = new variableCollection({
                        createdOn: Date.now(),
                        name: req.body.varName,
                        value: req.body.value,
                        isBoolean: true
                    })
                    new_var.save().then((newVar) => {
                        res.json({
                            status: 200,
                            newVar
                        })
                    })
                }
            }
        })
    }
});

router.post('/update', function (req, res, next) {
    if (!req.body.id) {
        res.json({
            status: 1000,
            message: 'Invalid parameters'
        })
    } else {
        variableCollection.findById({ _id: req.body.id }, function (err, data) {
            if (err) {
                res.json(err)
            } else {
                data.value = req.body.newValue
                data.save().then(sysVar => {
                    res.json({
                        status: 200,
                        message: 'variable Updated'
                    })
                }).catch(err => {
                    res.json(err)
                })
            }
        })
    }
})
router.post('/byName', function (req, res, next) {
    if (!req.body.varName) {
        res.json({
            status: 1000,
            message: 'Invalid parameters'
        })
    } else {
        variableCollection.findOne({ name: req.body.varName }, function (err, record) {
            if (err) {
                res.json(err)
            } else {
                if (!record) {
                    res.json({
                        status: 1002,
                        message: `variable not found`,
                    })
                } else {
                    res.json({
                        status: 200,
                        variable: record
                    })
                }
            }
        })
    }
})
router.post('/toggleType', function (req, res, next) {
    if (!req.body.name) {
        res.json({
            status: 1000,
            message: 'Invalid parameters'
        })
    } else {
        variableCollection.findOne({ name: req.body.name }, function (err, record) {
            if (err) {
                res.json(err)
            } else {
                if (!record) {
                    res.json({
                        status: 1002,
                        message: `variable not found`,
                    })
                } else {
                    record.isBoolean = req.body.isBoolean
                    record.save().then(sysVar => {
                                res.json({
                                    status: 200,
                                    message: 'variable Updated'
                                })
                            }).catch(err => {
                                res.json(err)
                            })
                        }
            }
        })
    }
})
module.exports = router;
