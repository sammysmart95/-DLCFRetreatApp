'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _api = require('./controllers/api');

var _admin = require('./controllers/admin');

var _auth = require('./controllers/auth');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _auth2 = require('./config/auth');

var _auth3 = _interopRequireDefault(_auth2);

require('./config/passport');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var api = (0, _express.Router)();
var router = (0, _express.Router)();

router.use("/api", api);

api.get("/me", _api.AuthMe);

// Auth
api.post('/auth/register', _auth.CreateUser);
api.post('/auth/login', _auth.Login);

// Get
api.get('/getFiles', _api.GetFiles);
api.get('/downloadParticipantList', _admin.DownloadParticipantList);
api.get("/downloadFeedbackList", _admin.DownloadFeedbackList);
api.get("/downloadTestimonyList", _admin.DownloadTestimonyList);

// Queries
api.post('/getFeedbacks/:id', _api.GetFeedback);
api.post("/getParticipants/:id", _api.GetParticipants);
api.post("/getTestimonies/:id", _api.GetTestimonies);

// Post
api.post("/submitFeedback", _api.CreateFeedback);
api.post("/submitTestimony", _api.CreateTestimony);
api.post('/registerParticipant', _api.CreateParticipant);
api.post('/uploadFile', _admin.FileUpload);

exports.default = router;