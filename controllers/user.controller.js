var passport = require('passport');
var User = require('../models/user.model')
var jwt = require('jsonwebtoken');
var config = require('../configs/database');
require('../configs/passport')(passport);
var usersService = require('../services/users.service');
var bcrypt = require('bcrypt-nodejs');
var dateService = require ('../services/date.service')







exports.login = async function(req, res, next) {

	

  User.findOne({
    username: req.body.username
  }, function(err, user) {
    if (err) throw err;

    if (!user) {
      res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
    } else {
      // check if password matches
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          // if user is found and password is right create a token
          var token = jwt.sign(user.toJSON(), config.secret);
          // return the information including token as JSON
          res.json({success: true, token: 'JWT ' + token, name : user.username});
        } else {
          res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
        }
      });
    }
  });
}









exports.signup = async function(req, res, next){




	if (!req.body.username || !req.body.password) {
    res.json({success: false, msg: 'Please pass username and password.'});
  } else {
    var newUser = new User({
      username: req.body.username,
      password: req.body.password
    });
    // save the user
    newUser.save(function(err) {
      if (err) {
        return res.json({success: false, msg: 'Username already exists.'});
      }
      res.json({success: true, msg: 'Successful created new user.'});
    });
  }
}

exports.getUsers= async function(req, res, next){


  var page = req.query.page ? req.query.page : 1
  var limit = req.query.limit ? req.query.limit : 10;

  try {

      var users = await usersService.getUsers(req, page, limit)

      // Return the exercises list with the appropriate HTTP Status Code and Message.
      users.total = users.total +1;

      return res.status(200).json({
          status: 200,
          data: users,
          message: "Succesfully exercises Recieved"
      });

  } catch (e) {

      //Return an Error Response Message with Code and the Error Message.

      return res.status(400).json({
          status: 400,
          message: e.message
      });

  }
}

exports.getUser= async function(req, res, next){

  var id = req.params.id;
        console.log(id);


  try {

      var users = await usersService.getUser(id)

      // Return the exercises list with the appropriate HTTP Status Code and Message.


      return res.status(200).json({
          status: 200,
          data: users,
          message: "Succesfully user Recieved"
      });

  } catch (e) {

      //Return an Error Response Message with Code and the Error Message.

      return res.status(400).json({
          status: 400,
          message: e.message
      });

  }
}

exports.createUser = async function(req, res, next) {
    console.log(req.body);

    // Creating a new Mongoose Object by using the new keyword

    var salt = bcrypt.genSaltSync(10);

    console.log(req.body.dateOfBirth.substring(7,11)+"/"+req.body.dateOfBirth.substring(3,5)+"/"+req.body.dateOfBirth.substring(0,2));

    var userToSave = {


        username: req.body.username ? req.body.username : '',
        password: req.body.password ? bcrypt.hashSync(req.body.password, salt) : bcrypt.hashSync('init123', salt),
        name: req.body.name ? req.body.name : '',
        familyName: req.body.familyName ? req.body.familyName : '',
        dateOfBirth: req.body.dateOfBirth ? dateService.stringToDate(req.body.dateOfBirth) : '',
        sex: req.body.sex ? req.body.sex : '',
        weigth: req.body.weigth ? req.body.weigth : '',
        height: req.body.height ? req.body.height : '',


    };

    try {

        // Saving the user 
        var savedUser = await usersService.createUser(userToSave)

         return res.status(201).json({
          status: 201,
          data: savedUser,
          message: "Succesfully user created"
      });
    } catch (e) {

        return res.status(400).json({
            status: 400,
            message: e.message
        });


        // return a Error message describing the reason     
        throw Error("Error while Creating exercise")
    }
}

exports.removeUser = async function(req, res, next){


    var id = req.params.id;

    try {
        var deleted = await usersService.deleteUser(id)
        return res.status(204).json({
            status: 204,
            message: "Succesfully session Deleted"
        })
    } catch (e) {
        return res.status(400).json({
            status: 400,
            message: e.message
        })
    }


}

exports.updateUser = async function(req, res, next){

    if (!req.body._id) {
        return res.status(400).json({
            status: 400.,
            message: "Id must be present"
        })
    }

    var _id = req.body._id;

  

    var user = {
        _id,
        username: req.body.username ? req.body.username : '',
        password: req.body.password ? bcrypt.hashSync(req.body.password, salt) : bcrypt.hashSync('init123', salt),
        name: req.body.name ? req.body.name : '',
        familyName: req.body.familyName ? req.body.familyName : '',
        dateOfBirth: req.body.dateOfBirth ? new Date(req.body.dateOfBirth.substring(6,11), req.body.dateOfBirth.substring(3,5)-1, req.body.dateOfBirth.substring(0,2), ) : '',
        sex: req.body.sex ? req.body.sex : '',
        weigth: req.body.weigth ? req.body.weigth : '',
        height: req.body.height ? req.body.height : '',


    }


    try {
        var updatedSession = await usersService.updateUser(user)
        return res.status(200).json({
            status: 200,
            data: updatedSession,
            message: "Succesfully Updated Session"
        })
    } catch (e) {
        return res.status(400).json({
            status: 400.,
            message: e.message
        })
    }



}
