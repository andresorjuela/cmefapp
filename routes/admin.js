var express = require('express');
var router = express.Router();
const adminCollection = require('../models/adminModel')
const bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken')

router.get('/list', function (req, res, next) {
  adminCollection.find({}  ,  (err , list) => {
    if(err) throw err;
    res.json({
      status: 200,
      list
    })
  })
});


/* Post Login */
router.post('/login', function (req, res, next) {
  if (!req.body.username || !req.body.password) {
    res.json({
      status: 1001,
      message: `Invalid Parameters`
    })
  } else {
    let username = req.body.username
    let password = req.body.password
    adminCollection.findOne({ username: username }, function (err, record) {
      if (!record) {
        res.json({
          status: 1002,
          message: `User not found`,
        })
      } else {
        bcrypt.compare(password, record.password, (err, isMatch) => {
          if (err) throw err;
          if (!isMatch) {
            res.json({
              status: 1004,
              message: `Invalid Password`
            })
          } else {
            let admin = {
              name: record.name,
              username: record.username,
              isActive: record.isActive,
              createdOn: record.createdOn,
              lastLogin: record.lastLogin,
            }
            if (admin.isActive) {
              record.lastLogin = Date.now(),
              record.save().then(updatedAdmin => {
                jwt.sign({ updatedAdmin }, 'secretKey', (err, token) => {
                  res.json({
                    status: 200,
                    message: "Login Successful",
                    token,
                    admin: updatedAdmin,
                  })
                })
              })
            } else {
              res.json({
                status: 1010,
                message: `User Restricted from system , Please contact Admin`
              })
            }
          }
        })
      }
    })
  }
});

/* Add new user from Admin panel */
router.post('/register', function (req, res, next) {
  if (!req.body.name && !req.body.username && !req.body.password) {
    res.json({
      status: 1001,
      message: `Invalid Parameters`
    })
  } else {
    let admin = {
      name: req.body.name,
      username: req.body.username,
      password: req.body.password,
      createdOn: Date.now(),
      lastLogin: Date.now(),
    }
    adminCollection.findOne({ username: admin.username }, function (err, record) {
      if (!record) {
        adminCollection.findOne({ name: admin.name }, function (err, record) {
          if (!record) {
            let newAdmin = new adminCollection(admin)
            newAdmin.save().then(function (data) {
              res.json({
                status: 200,
                message: `New Admin Added`,
                data
              })
            })
          } else {
            res.json({
              status: 1000,
              message: `Name already exist...`,
            })
          }
        })
      } else {
        res.json({
          status: 1000,
          message: `Username already exist...`,
        })
      }
    })
  }
})
router.post('/delete' , function(req , res , next) {
  if(!req.body.id){
    res.json({
      status: 1001,
      message: `Invalid Parameters`
    })
  }else{
    adminCollection.findByIdAndRemove({_id: req.body.id} , function(err){
      if(err) throw err;
      res.json({
        status: 200,
        message: `Admin Deleted`,
      })
    })
  }
})
module.exports = router;
