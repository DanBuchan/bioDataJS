"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseBlastFormat = parseBlastFormat;

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

var _sequence = require("../src/sequence.js");

var _psipred_parsers = require("../src/psipred_parsers.js");

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function parseBlastFormat(_x, _x2) {
  return _parseBlastFormat.apply(this, arguments);
}

function _parseBlastFormat() {
  _parseBlastFormat = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(seq, location) {
    var data, parsed, results_found, align_count, lines, seq_data;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!location.startsWith("http")) {
              _context.next = 6;
              break;
            }

            _context.next = 3;
            return (0, _psipred_parsers.fetchData)(location);

          case 3:
            data = _context.sent;
            _context.next = 7;
            break;

          case 6:
            data = (0, _psipred_parsers.readData)(location);

          case 7:
            parsed = {
              results: []
            };
            results_found = false;
            align_count = -1;
            lines = data.split("\n");
            lines.forEach(function (line) {
              if (line.startsWith(">")) {
                results_found = false;
                align_count += 1;
              }

              if (line.startsWith("Sequences producing significant alignments:")) {
                results_found = true;
                return;
              }

              if (results_found && line.length !== 0) {
                var description = line.substring(0, 70);

                var _data = line.substring(70).split(/\s+/);

                var match = description.match(/^(.+?)\s/);
                var hit = '';

                if (match) {
                  hit = match[1];
                }

                parsed.results.push({
                  hit_name: hit,
                  description: description,
                  score: _data[0],
                  evalue: _data[1],
                  alignment: ''
                });
              }

              if (align_count > -1) {
                parsed.results[align_count].alignment += line + "\n";
              }
            });
            seq_data = (0, _sequence.sequence)(seq, undefined, parsed, location, undefined);
            return _context.abrupt("return", seq_data);

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _parseBlastFormat.apply(this, arguments);
}