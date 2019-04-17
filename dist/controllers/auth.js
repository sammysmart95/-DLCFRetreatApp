"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Login = exports.CreateUser = undefined;

var _passport = require("passport");

var _passport2 = _interopRequireDefault(_passport);

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _Users = require("../models/Users");

var _Users2 = _interopRequireDefault(_Users);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var User = _mongoose2.default.model('Users');

var CreateUser = exports.CreateUser = function CreateUser(req, res) {
  var user = req.body.user;

  if (!user.username) {
    return res.status(422).json({
      errors: {
        username: "is required"
      }
    });
  }

  if (!user.password) {
    return res.status(422).json({
      errors: {
        password: "is required"
      }
    });
  }

  var finalUser = new User(user);

  finalUser.setPassword(user.password);
  return finalUser.save().then(function () {
    return res.json({ user: finalUser.toAuthJSON() });
  }).catch(function (err) {
    return res.status(422).json({
      err: err,
      message: 'Username already in use'
    });
  });
};

//POST login route (optional, everyone has access)
var Login = exports.Login = function Login(req, res) {
  var user = req.body.user;

  if (!user.username) {
    return res.status(422).json({
      err: "username is required"
    });
  }

  if (!user.password) {
    return res.status(422).json({
      errors: "Password is required"
    });
  }

  return _passport2.default.authenticate("local", { session: false }, function (err, passportUser, info) {
    if (err) {}
    if (passportUser) {
      var _user = passportUser;
      _user.token = passportUser.generateJWT();

      return res.json({ user: _user.toAuthJSON() });
    }
    return res.status(401).json({
      message: 'Invalid credentials'
    });
  })(req, res);
};