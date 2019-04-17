"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _v = require("uuid/v4");

var _v2 = _interopRequireDefault(_v);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var testimonySchema = new Schema({
  sid: {
    type: Schema.Types.String,
    required: true,
    default: _v2.default,
    unique: true
  },
  phoneNumber: {
    type: Schema.Types.String,
    required: true
    // unique: true
  },
  fullName: {
    type: Schema.Types.String,
    required: true
  },
  testimony: {
    type: Schema.Types.String,
    required: true
  },
  category: {
    type: Schema.Types.String,
    required: true
  },
  created: {
    type: Date,
    required: true,
    default: Date.now
  }
});

exports.default = _mongoose2.default.model("Testimonies", testimonySchema);