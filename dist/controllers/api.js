"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateTestimony = exports.CreateFeedback = exports.GetTestimonies = exports.GetFeedback = exports.GetParticipants = exports.AuthMe = exports.DownloadFile = exports.GetFiles = exports.CreateParticipant = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _regeneratorRuntime = require("regenerator-runtime");

var _regeneratorRuntime2 = _interopRequireDefault(_regeneratorRuntime);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _mime = require("mime");

var _mime2 = _interopRequireDefault(_mime);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _participants = require("../models/participants");

var _participants2 = _interopRequireDefault(_participants);

var _feedback = require("../models/feedback");

var _feedback2 = _interopRequireDefault(_feedback);

var _files = require("../models/files");

var _files2 = _interopRequireDefault(_files);

var _testimonies = require("../models/testimonies");

var _testimonies2 = _interopRequireDefault(_testimonies);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var CreateParticipant = exports.CreateParticipant = function CreateParticipant(req, res) {
  var email = req.body.email;
  if (!email) {
    email = Math.random();
  }
  _participants2.default.create(_extends({}, req.body, { email: email })).then(function (data) {
    return res.json({
      message: "Congrats " + (req.body.fullName || "")
    });
  }).catch(function (err) {
    console.log(err);
    return res.status(500).json({
      err: err,
      message: err.message,
      customMessage: "Error Registering Participant"
    });
  });
};

var GetFiles = exports.GetFiles = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime2.default.mark(function _callee(req, res) {
    var _ref2, _ref3, fileCollection, count;

    return _regeneratorRuntime2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return Promise.all([_files2.default.find().sort("-created"), _files2.default.find().count()]);

          case 3:
            _ref2 = _context.sent;
            _ref3 = _slicedToArray(_ref2, 2);
            fileCollection = _ref3[0];
            count = _ref3[1];
            return _context.abrupt("return", res.json({
              fileCollection: fileCollection,
              count: count
            }));

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](0);

            res.status(500).json({
              message: "Error fetching files",
              err: _context.t0.message
            });

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 10]]);
  }));

  return function GetFiles(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var DownloadFile = exports.DownloadFile = function DownloadFile(req, res) {
  var id = req.params.id;
  _files2.default.find({ _id: id }).then(function (data) {
    var file = _path2.default.join(__dirname, "../" + data[0].filePath);
    console.log(file);
    var filename = _path2.default.basename(file);
    var mimetype = _mime2.default.getType(file);

    res.setHeader("Content-disposition", "attachment; filename=" + filename);
    res.setHeader("Content-type", mimetype);

    var filestream = _fs2.default.createReadStream(file);
    filestream.pipe(res);
    // res.sendFile(file);
  }).catch(function (err) {
    console.log(err);
    res.status(500).json({
      message: "Error fetching files",
      err: err.message
    });
  });
};

var AuthMe = exports.AuthMe = function AuthMe(req, res) {
  var user = req.user;
  console.log(user);
  if (user) {
    return res.json({
      authenticated: true,
      user: user
    });
  }
  return res.json({
    authenticated: false
  });
};

var GetParticipants = exports.GetParticipants = function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime2.default.mark(function _callee2(req, res) {
    var page, searchKey, searchQuery, search, _ref5, _ref6, count, participants;

    return _regeneratorRuntime2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            page = parseInt(Number(req.params.id));
            searchKey = req.body.searchKey;
            searchQuery = {};

            if (searchKey) {
              search = {
                $regex: searchKey || "",
                $options: "i"
              };

              searchQuery = {
                $or: [{
                  sid: search
                }, {
                  fullName: search
                }, {
                  denomination: search
                }, {
                  category: search
                }, {
                  phoneNumber: search
                }, {
                  state: search
                }, {
                  institution: search
                }, {
                  status: search
                }]
              };
            }
            if (!page) {
              page = 1;
            }
            _context2.prev = 5;
            _context2.next = 8;
            return Promise.all([_participants2.default.find(searchQuery).count(), _participants2.default.find(searchQuery).sort("-created").skip(page * 25 - 25).limit(25)]);

          case 8:
            _ref5 = _context2.sent;
            _ref6 = _slicedToArray(_ref5, 2);
            count = _ref6[0];
            participants = _ref6[1];
            return _context2.abrupt("return", res.json({
              count: count,
              participants: participants
            }));

          case 15:
            _context2.prev = 15;
            _context2.t0 = _context2["catch"](5);

            console.log(_context2.t0);
            return _context2.abrupt("return", res.status(500).json({
              message: "Error Loading Participant List",
              error: _context2.t0.message
            }));

          case 19:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[5, 15]]);
  }));

  return function GetParticipants(_x3, _x4) {
    return _ref4.apply(this, arguments);
  };
}();

var GetFeedback = exports.GetFeedback = function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime2.default.mark(function _callee3(req, res) {
    var page, searchKey, searchQuery, search, _ref8, _ref9, count, feedbacks;

    return _regeneratorRuntime2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            page = parseInt(Number(req.params.id));
            searchKey = req.body.searchKey;
            searchQuery = {};

            if (searchKey) {
              search = {
                $regex: searchKey || "",
                $options: "i"
              };

              searchQuery = {
                $or: [{
                  sid: search
                }, {
                  phoneNumber: search
                }, {
                  message: search
                }, {
                  transport: search
                }, {
                  like: search
                }, {
                  experience: search
                }, {
                  improvements: search
                }, {
                  category: search
                }]
              };
            }
            if (!page) {
              page = 1;
            }
            _context3.prev = 5;
            _context3.next = 8;
            return Promise.all([_feedback2.default.find(searchQuery).count(), _feedback2.default.find(searchQuery).sort("-created").skip(page * 25 - 25).limit(25)]);

          case 8:
            _ref8 = _context3.sent;
            _ref9 = _slicedToArray(_ref8, 2);
            count = _ref9[0];
            feedbacks = _ref9[1];
            return _context3.abrupt("return", res.json({
              count: count,
              feedbacks: feedbacks
            }));

          case 15:
            _context3.prev = 15;
            _context3.t0 = _context3["catch"](5);

            console.log(_context3.t0);
            return _context3.abrupt("return", res.status(500).json({
              message: "Error Loading Participant List",
              error: _context3.t0.message
            }));

          case 19:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[5, 15]]);
  }));

  return function GetFeedback(_x5, _x6) {
    return _ref7.apply(this, arguments);
  };
}();

var GetTestimonies = exports.GetTestimonies = function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime2.default.mark(function _callee4(req, res) {
    var page, searchKey, searchQuery, search, _ref11, _ref12, count, testimonies;

    return _regeneratorRuntime2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            page = parseInt(Number(req.params.id));
            searchKey = req.body.searchKey;
            searchQuery = {};

            if (searchKey) {
              search = {
                $regex: searchKey || "",
                $options: "i"
              };

              searchQuery = {
                $or: [{
                  phoneNumber: search
                }, {
                  fullName: search
                }, {
                  testimony: search
                }, {
                  category: search
                }]
              };
            }
            if (!page) {
              page = 1;
            }
            _context4.prev = 5;
            _context4.next = 8;
            return Promise.all([_testimonies2.default.find(searchQuery).count(), _testimonies2.default.find(searchQuery).sort("-created").skip(page * 25 - 25).limit(25)]);

          case 8:
            _ref11 = _context4.sent;
            _ref12 = _slicedToArray(_ref11, 2);
            count = _ref12[0];
            testimonies = _ref12[1];
            return _context4.abrupt("return", res.json({
              count: count,
              testimonies: testimonies
            }));

          case 15:
            _context4.prev = 15;
            _context4.t0 = _context4["catch"](5);

            console.log(_context4.t0);
            return _context4.abrupt("return", res.status(500).json({
              message: "Error Loading Participant List",
              error: _context4.t0.message
            }));

          case 19:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, undefined, [[5, 15]]);
  }));

  return function GetTestimonies(_x7, _x8) {
    return _ref10.apply(this, arguments);
  };
}();

var CreateFeedback = exports.CreateFeedback = function CreateFeedback(req, res) {
  _feedback2.default.create(req.body).then(function (data) {
    return res.json({
      message: "Created"
    });
  }).catch(function (err) {
    console.log(err);
    return res.status(500).json({
      err: err,
      message: err.message,
      customMessage: "Error Creating Feedback"
    });
  });
};

var CreateTestimony = exports.CreateTestimony = function CreateTestimony(req, res) {
  _testimonies2.default.create(req.body).then(function (data) {
    return res.json({
      message: "Created"
    });
  }).catch(function (err) {
    console.log(err);
    return res.status(500).json({
      err: err,
      message: err.message,
      customMessage: "Error Creating Feedback"
    });
  });
};