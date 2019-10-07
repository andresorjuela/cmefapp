var express = require('express');
var router = express.Router();
const productCollection = require('../models/productModel')

router.get('/', function (req, res, next) {
    productCollection.find({}, function (err, products) {
        if (err) {
            res.json(err)
        } else {
            res.json({
                status: 200,
                data: products
            })
        }
    })
});

module.exports = router;
