"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseHHSuiteFormat = parseHHSuiteFormat;

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

var _sequence = require("../src/sequence.js");

var _psipred_parsers = require("../src/psipred_parsers.js");

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function parseHHSuiteFormat(_x, _x2) {
  return _parseHHSuiteFormat.apply(this, arguments);
}

function _parseHHSuiteFormat() {
  _parseHHSuiteFormat = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(seq, location) {
    var data, parsed, lines, seq_found, seq_count, seq_data;
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
            parsed = {};
            lines = data.split("\n");
            seq_found = false;
            seq_count = 0;
            lines.forEach(function (line) {
              if (line.startsWith("Query")) {
                var datum = line.substring(14, line.length);
                parsed.query = datum;
                parsed.hits = [];
              }

              if (line.startsWith("Match_columns")) {
                var _datum = line.substring(14, line.length);

                parsed.match_columns = _datum;
              }

              if (line.startsWith("No_of_seqs")) {
                var _datum2 = line.substring(14, line.length);

                parsed.no_of_seqs = _datum2;
              }

              if (line.startsWith("Neff")) {
                var _datum3 = line.substring(14, line.length);

                parsed.neff = _datum3;
              }

              if (line.startsWith("Searched_HMMs")) {
                var _datum4 = line.substring(14, line.length);

                parsed.searched_hmms = _datum4;
              }

              if (line.startsWith("Date")) {
                var _datum5 = line.substring(14, line.length);

                parsed.date = _datum5;
              }

              if (line.startsWith("Command")) {
                var _datum6 = line.substring(14, line.length);

                parsed.command = _datum6;
              }

              if (line.match(/^\s*\d+\s/)) {
                //console.log(line);
                var count = line.substring(0, 4);
                count = count.replace(/\s+/, '');
                var hit_name = line.substring(4, 36);
                var line_stats = line.substring(36);
                var stats = line_stats.split(/\s+/);
                var query_coords = stats[6].split("-");
                var template_coords = stats[7].split("-");
                parsed.hits[count - 1] = {
                  hit_name: hit_name,
                  prob: stats[0],
                  e_value: stats[1],
                  p_value: stats[2],
                  score: stats[3],
                  ss: stats[4],
                  cols: stats[5],
                  query_start: query_coords[0],
                  query_stop: query_coords[1],
                  template_start: template_coords[0],
                  template_stop: template_coords[1],
                  hmm: stats[8],
                  alignment: ''
                };
              }

              if (line.startsWith("No ")) {
                var seq_number = line.split(/\s+/);
                seq_count = seq_number[1] - 1;
                seq_found = true; // console.log(line, seq_count);

                return;
              }

              if (seq_found) {
                parsed.hits[seq_count].alignment += line + "\n";
              }
            }); //console.log(parsed);

            seq_data = (0, _sequence.sequence)(seq, undefined, parsed, location, undefined);
            return _context.abrupt("return", seq_data);

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _parseHHSuiteFormat.apply(this, arguments);
}