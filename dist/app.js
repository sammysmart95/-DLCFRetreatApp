"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _morgan = require("morgan");

var _morgan2 = _interopRequireDefault(_morgan);

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _dotenv = require("dotenv");

var _dotenv2 = _interopRequireDefault(_dotenv);

var _cors = require("cors");

var _cors2 = _interopRequireDefault(_cors);

var _routes = require("./routes");

var _routes2 = _interopRequireDefault(_routes);

var _expressFileupload = require("express-fileupload");

var _expressFileupload2 = _interopRequireDefault(_expressFileupload);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

var app = (0, _express2.default)();

app.use((0, _morgan2.default)("dev", {
  skip: function skip() {
    return app.get("env") === "test";
  }
}));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/server/public', _express2.default.static(_path2.default.join(__dirname, 'public')));

app.use(_express2.default.static(_path2.default.join(__dirname, "../client/build")));

app.use(_bodyParser2.default.json());

app.use(_bodyParser2.default.urlencoded({
  extended: false
}));

app.use((0, _morgan2.default)("dev"));

_mongoose2.default.connect(process.env.db, function (err) {
  if (err) {
    console.error(err);
    process.exit(1);
    return;
  }
  console.log("Database Connected Successfully!");
});

app.use((0, _expressFileupload2.default)());

// Routes
app.use("/", _routes2.default);

app.get('/*', function (req, res) {
  res.sendFile(_path2.default.join(__dirname, '../client/build/index.html'), function (err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.use(function (err, req, res, next) {
  // eslint-disable-line no-unused-vars
  res.status(err.status || 500).json({
    err: err.status,
    message: err.message
  });
});

exports.default = app;