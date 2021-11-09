"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseFastaFormat = parseFastaFormat;

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

var _sequence = require("../src/sequence.js");

var _psipred_parsers = require("../src/psipred_parsers.js");

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function parseFastaFormat(_x) {
  return _parseFastaFormat.apply(this, arguments);
}

function _parseFastaFormat() {
  _parseFastaFormat = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(location) {
    var data, seq, parsed, lines, seq_data;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            seq = '';

            if (!location.startsWith("http")) {
              _context.next = 7;
              break;
            }

            _context.next = 4;
            return (0, _psipred_parsers.fetchData)(location);

          case 4:
            data = _context.sent;
            _context.next = 8;
            break;

          case 7:
            data = (0, _psipred_parsers.readData)(location);

          case 8:
            parsed = {};
            lines = data.split("\n");
            lines.forEach(function (line) {
              var info_matches = line.match(/^>(.+?)\s(.*)/); //console.log(info_matches);

              if (info_matches) {
                parsed.seq_id = info_matches[1];

                if (info_matches[2]) {
                  parsed.info = info_matches[2];
                }
              } else {
                seq += line;
              }
            });
            seq_data = (0, _sequence.sequence)(seq, undefined, parsed, location, undefined);
            return _context.abrupt("return", seq_data);

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _parseFastaFormat.apply(this, arguments);
}