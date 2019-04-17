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

var participantSchema = new Schema({
  sid: {
    type: Schema.Types.String,
    required: true,
    default: _v2.default,
    unique: true,
    index: true
  },
  fullName: {
    type: Schema.Types.String,
    required: true
  },
  phoneNumber: {
    type: Schema.Types.String,
    required: true,
    unique: true
  },
  whatsAppNumber: {
    type: Schema.Types.String
  },
  gender: {
    type: Schema.Types.String,
    required: true
  },
  address: {
    type: Schema.Types.String,
    required: true
  },
  group: {
    type: Schema.Types.String
  },
  email: {
    type: Schema.Types.String
  },
  status: {
    type: Schema.Types.String,
    required: true
  },
  denomination: {
    type: Schema.Types.String,
    required: true
  },
  institution: {
    type: Schema.Types.String
  },
  course: {
    type: Schema.Types.String
  },
  ageGroup: {
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

var Participant = _mongoose2.default.model("Participant", participantSchema);

Participant.syncIndexes();

exports.default = Participant;