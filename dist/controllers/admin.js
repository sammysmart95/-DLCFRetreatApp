'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DownloadTestimonyList = exports.DownloadFeedbackList = exports.DownloadParticipantList = exports.FileUpload = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _regeneratorRuntime = require('regenerator-runtime');

var _regeneratorRuntime2 = _interopRequireDefault(_regeneratorRuntime);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _json2xls = require('json2xls');

var _json2xls2 = _interopRequireDefault(_json2xls);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _participants = require('../models/participants');

var _participants2 = _interopRequireDefault(_participants);

var _feedback = require('../models/feedback');

var _feedback2 = _interopRequireDefault(_feedback);

var _files = require('../models/files');

var _files2 = _interopRequireDefault(_files);

var _testimonies = require('../models/testimonies');

var _testimonies2 = _interopRequireDefault(_testimonies);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var FileUpload = exports.FileUpload = function FileUpload(req, res) {
  var fileName = req.body.name;
  var audioFile = req.files.file;
  uploadFile(audioFile, fileName).then(function (_ref) {
    var filePath = _ref.filePath,
        originalName = _ref.originalName;

    _files2.default.create({
      fileName: fileName,
      filePath: filePath,
      originalName: originalName
    }).then(function (response) {
      res.json({
        message: 'Uploaded'
      });
    }).catch(function (err) {
      console.log(err);
      res.status(500).json({
        err: err,
        message: err.message
      });
    });
  }).catch(function (err) {
    console.log(err);
    res.status(500).json({
      err: err,
      message: err.message
    });
  });
};

var uploadFile = function uploadFile(imageFile, fileName) {
  return new Promise(function (resolve, reject) {
    var newFilename = '';
    imageFile.mv(_path2.default.join(__dirname, '../public/' + (fileName, newFilename) + '-' + imageFile.name), function (err) {
      if (err) {
        reject(err);
      }
      resolve({ filePath: 'public/' + (fileName, newFilename) + '-' + imageFile.name, originalName: imageFile.name });
    });
  });
};

var DownloadParticipantList = exports.DownloadParticipantList = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime2.default.mark(function _callee(req, res) {
    var _ref3, _ref4, count, participants, formattedParticipants, xls;

    return _regeneratorRuntime2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return Promise.all([_participants2.default.find().count(), _participants2.default.find()]);

          case 3:
            _ref3 = _context.sent;
            _ref4 = _slicedToArray(_ref3, 2);
            count = _ref4[0];
            participants = _ref4[1];

            res.setHeader("Content-Type", "application/vnd.openxmlformats");

            formattedParticipants = participants.map(function (participant, i) {
              if (participant._doc) {
                var participantDetail = {};
                participantDetail["Id"] = i + 1;
                participantDetail["Full Name"] = participant._doc.fullName;
                participantDetail["Gender"] = participant._doc.gender;
                participantDetail["Email"] = !Number(participant._doc.email) ? participant._doc.email : '';
                participantDetail["Phone Number"] = participant._doc.phoneNumber;
                participantDetail["WhatsApp Number"] = participant._doc.whatsAppNumber;
                participantDetail["Category"] = participant._doc.category;
                participantDetail["Institution"] = participant._doc.institution;
                participantDetail["Course"] = participant._doc.course;
                participantDetail['Status'] = participant._doc.status;
                participantDetail["Denomination"] = participant._doc.denomination;
                participantDetail["Address"] = participant._doc.address;
                participantDetail["Group"] = participant._doc.group;
                participantDetail["Age Group"] = participant._doc.ageGroup;
                participantDetail["Date Registered"] = (0, _moment2.default)(participant._doc.created).format('MMM Do YY');
                return participantDetail;
              }
              return participant;
            });
            xls = (0, _json2xls2.default)(formattedParticipants, {
              fields: {
                "Id": "string",
                "Full Name": "string",
                "Gender": "string",
                "Email": "string",
                "Age Group": "string",
                "Phone Number": "string",
                "WhatsApp Number": "string",
                "Institution": "string",
                "Course": "string",
                "Category": "string",
                "Status": "string",
                "Denomination": "string",
                "Address": "string",
                "Group": "string",
                "Date Registered": "string"
              }
            });

            _fs2.default.writeFileSync(_path2.default.join(__dirname, '../public/participantList.xlsx'), xls, "binary");
            return _context.abrupt('return', res.sendFile(_path2.default.join(__dirname, '../public/participantList.xlsx')));

          case 14:
            _context.prev = 14;
            _context.t0 = _context['catch'](0);

            res.status(500).json({
              err: _context.t0,
              message: _context.t0.message,
              customMessage: 'Error downloading particiant list'
            });

          case 17:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 14]]);
  }));

  return function DownloadParticipantList(_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();

var DownloadFeedbackList = exports.DownloadFeedbackList = function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime2.default.mark(function _callee2(req, res) {
    var _ref6, _ref7, count, feedbacks, formattedFeedbackList, xls;

    return _regeneratorRuntime2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return Promise.all([_feedback2.default.find().count(), _feedback2.default.find()]);

          case 3:
            _ref6 = _context2.sent;
            _ref7 = _slicedToArray(_ref6, 2);
            count = _ref7[0];
            feedbacks = _ref7[1];

            console.log('feedbacks');
            res.setHeader("Content-Type", "application/vnd.openxmlformats");
            formattedFeedbackList = feedbacks.map(function (feedback, i) {
              if (feedback._doc) {
                var feedbackDetail = {};
                feedbackDetail["Id"] = i + 1;
                feedbackDetail["Phone Number"] = feedback._doc.phoneNumber;
                feedbackDetail["Category"] = feedback._doc.category;
                feedbackDetail["How did you get to the camp"] = feedback._doc.transport;
                feedbackDetail["What Programme touched you the most"] = feedback._doc.message;
                feedbackDetail["What do you love about the camp"] = feedback._doc.like;
                feedbackDetail["Summarize your experiences"] = feedback._doc.experience;
                feedbackDetail["What should be improved in the camp"] = feedback._doc.improvements;
                console.log(feedbackDetail);
                return feedbackDetail;
              }
              return feedback;
            });
            xls = (0, _json2xls2.default)(formattedFeedbackList, {
              fields: {
                "Id": "string",
                "Phone Number": "string",
                "Category": "string",
                "How did you get to the camp": "string",
                "What programme touched you the most": "string",
                "What do you love about the camp": "string",
                "Summarize your experiences": "string",
                "What should be improved in the camp": "string"
              }
            });

            _fs2.default.writeFileSync(_path2.default.join(__dirname, '../public/feedbackList.xlsx'), xls, "binary");
            return _context2.abrupt('return', res.sendFile(_path2.default.join(__dirname, '../public/feedbackList.xlsx')));

          case 15:
            _context2.prev = 15;
            _context2.t0 = _context2['catch'](0);

            console.log(_context2.t0);
            res.status(500).json({
              err: _context2.t0,
              message: _context2.t0.message,
              customMessage: 'Error downloading feedbacks list'
            });

          case 19:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[0, 15]]);
  }));

  return function DownloadFeedbackList(_x3, _x4) {
    return _ref5.apply(this, arguments);
  };
}();

var DownloadTestimonyList = exports.DownloadTestimonyList = function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime2.default.mark(function _callee3(req, res) {
    var _ref9, _ref10, count, testimonies, formatedTestimonyList, xls;

    return _regeneratorRuntime2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return Promise.all([_testimonies2.default.find().count(), _testimonies2.default.find()]);

          case 3:
            _ref9 = _context3.sent;
            _ref10 = _slicedToArray(_ref9, 2);
            count = _ref10[0];
            testimonies = _ref10[1];

            res.setHeader("Content-Type", "application/vnd.openxmlformats");
            formatedTestimonyList = testimonies.map(function (testimony, i) {
              if (testimony._doc) {
                var testimonyDetail = {};
                testimonyDetail["Id"] = i + 1;
                testimonyDetail["Full Name"] = testimony._doc.fullName;
                testimonyDetail["Phone Number"] = testimony._doc.phoneNumber;
                testimonyDetail["Category"] = testimony._doc.category;
                testimonyDetail["Testimony"] = testimony._doc.testimony;
                testimonyDetail["Date Submitted"] = (0, _moment2.default)(testimony._doc.created).format("H:MM Do MMM YY");
                console.log(testimonyDetail);
                return testimonyDetail;
              }
              return testimony;
            });
            xls = (0, _json2xls2.default)(formatedTestimonyList, {
              fields: {
                "Id": "string",
                "Full Name": "string",
                "Phone Number": "string",
                "Category": "string",
                "Testimony": "string",
                "Date Submitted": "string"
              }
            });

            _fs2.default.writeFileSync(_path2.default.join(__dirname, '../public/testimonyList.xlsx'), xls, "binary");
            return _context3.abrupt('return', res.sendFile(_path2.default.join(__dirname, '../public/testimonyList.xlsx')));

          case 14:
            _context3.prev = 14;
            _context3.t0 = _context3['catch'](0);

            console.log(_context3.t0);
            res.status(500).json({
              err: _context3.t0,
              message: _context3.t0.message,
              customMessage: 'Error downloading testimony list'
            });

          case 18:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[0, 14]]);
  }));

  return function DownloadTestimonyList(_x5, _x6) {
    return _ref8.apply(this, arguments);
  };
}();