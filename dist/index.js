"use strict";

var _app = require("./app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _process$env = process.env,
    _process$env$PORT = _process$env.PORT,
    PORT = _process$env$PORT === undefined ? 5000 : _process$env$PORT,
    NODE_ENV = _process$env.NODE_ENV;

_app2.default.listen(PORT, function () {
  return console.log("Reg DLCF Listening on port " + PORT + " in " + (NODE_ENV || "development") + " mode");
});