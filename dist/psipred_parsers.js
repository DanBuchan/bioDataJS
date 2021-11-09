"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchData = fetchData;
exports.readData = readData;
exports.parseHFormat = parseHFormat;
exports.parseSS2Format = parseSS2Format;
exports.parseCombFormat = parseCombFormat;
exports.parsePbdatFormat = parsePbdatFormat;
exports.parseMemsatSVMFormat = parseMemsatSVMFormat;
exports.parsePResultsFormat = parsePResultsFormat;
exports.parseDomThPResultsFormat = parseDomThPResultsFormat;
exports.parseAlignFormat = parseAlignFormat;
exports.parsePsicovFormat = parsePsicovFormat;
exports.parseDMPFormat = parseDMPFormat;
exports.parseMPLipidFormat = parseMPLipidFormat;
exports.parseMPContactFormat = parseMPContactFormat;
exports.parseDompredFormat = parseDompredFormat;
exports.parseFeatcfgFormat = parseFeatcfgFormat;
exports.parseFFPredGOFormat = parseFFPredGOFormat;
exports.parseMetpredFormat = parseMetpredFormat;
exports.parseHSPredFormat = parseHSPredFormat;

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

var _sequence = require("../src/sequence.js");

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function fetchData(_x) {
  return _fetchData.apply(this, arguments);
}

function _fetchData() {
  _fetchData = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(uri) {
    var uriData, output_data;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            uriData = (0, _nodeFetch["default"])(uri).then(function (response) {
              // console.log(response.status);
              // console.log(uri);
              if (response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' + response.status);
                throw "Unable to find file at provided URL" + response.status;
              } // Examine the text in the response


              if (response.headers.get("Content-Type") === 'application/octet-stream') {
                return response.arrayBuffer();
              } else if (response.headers.get("Content-Type") === 'text/plain') {}
            }).then(function (data) {
              var enc = new TextDecoder("utf-8");
              return enc.decode(data);
            })["catch"](function (err) {
              throw 'Fetch error. Malformed URI?';
            });
            _context.next = 3;
            return uriData;

          case 3:
            output_data = _context.sent;
            return _context.abrupt("return", output_data);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _fetchData.apply(this, arguments);
}

function readData(location) {
  return _fs["default"].readFileSync(location, 'utf8');
}

function parseHFormat(_x2) {
  return _parseHFormat.apply(this, arguments);
}

function _parseHFormat() {
  _parseHFormat = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(location) {
    var data, parsed, lines, conf, pred, aa, seq, seq_data;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!location.startsWith("http")) {
              _context2.next = 6;
              break;
            }

            _context2.next = 3;
            return fetchData(location);

          case 3:
            data = _context2.sent;
            _context2.next = 7;
            break;

          case 6:
            data = readData(location);

          case 7:
            parsed = [];
            lines = data.split("\n");
            conf = '';
            pred = '';
            aa = '';
            seq = '';
            lines.forEach(function (line, i) {
              conf += stripLine(line, "Conf: ");
              pred += stripLine(line, "Pred: ");
              aa += stripLine(line, "  AA: ");
            });
            aa.split("").forEach(function (_char, i) {
              seq += aa[i];
              parsed.push({
                pred: pred[i],
                conf: Number(conf[i])
              });
            });
            seq_data = (0, _sequence.sequence)(aa, undefined, undefined, location, parsed);
            return _context2.abrupt("return", seq_data);

          case 17:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _parseHFormat.apply(this, arguments);
}

function parseSS2Format(_x3) {
  return _parseSS2Format.apply(this, arguments);
}

function _parseSS2Format() {
  _parseSS2Format = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(location) {
    var data, parsed, seq, lines, seq_data;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (!location.startsWith("http")) {
              _context3.next = 6;
              break;
            }

            _context3.next = 3;
            return fetchData(location);

          case 3:
            data = _context3.sent;
            _context3.next = 7;
            break;

          case 6:
            data = readData(location);

          case 7:
            parsed = [];
            seq = '';
            lines = data.split("\n");
            lines.slice(2, lines.length - 1).forEach(function (line, i) {
              line = line.trim();
              var entries = line.split(/\s+/);
              seq += entries[1];
              parsed.push({
                ss: entries[2],
                coilScore: entries[3],
                helixScore: entries[4],
                strandScore: entries[5]
              });
            }); //console.log(seq);

            seq_data = (0, _sequence.sequence)(seq, undefined, undefined, location, parsed);
            return _context3.abrupt("return", seq_data);

          case 13:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _parseSS2Format.apply(this, arguments);
}

function parseCombFormat(_x4) {
  return _parseCombFormat.apply(this, arguments);
}

function _parseCombFormat() {
  _parseCombFormat = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(location) {
    var data, parsed, seq, lines, seq_data;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            if (!location.startsWith("http")) {
              _context4.next = 6;
              break;
            }

            _context4.next = 3;
            return fetchData(location);

          case 3:
            data = _context4.sent;
            _context4.next = 7;
            break;

          case 6:
            data = readData(location);

          case 7:
            parsed = [];
            seq = '';
            lines = data.split("\n");
            lines.slice(3, lines.length - 1).forEach(function (line, i) {
              line = line.trim();
              var entries = line.split(/\s+/); //console.log(entries);

              seq += entries[1];
              parsed.push({
                disorderedState: entries[2],
                disoredScore: entries[3]
              });
            }); //console.log(seq);

            seq_data = (0, _sequence.sequence)(seq, undefined, undefined, location, parsed);
            return _context4.abrupt("return", seq_data);

          case 13:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _parseCombFormat.apply(this, arguments);
}

function parsePbdatFormat(_x5) {
  return _parsePbdatFormat.apply(this, arguments);
}

function _parsePbdatFormat() {
  _parsePbdatFormat = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(location) {
    var data, parsed, seq, lines, seq_data;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            if (!location.startsWith("http")) {
              _context5.next = 6;
              break;
            }

            _context5.next = 3;
            return fetchData(location);

          case 3:
            data = _context5.sent;
            _context5.next = 7;
            break;

          case 6:
            data = readData(location);

          case 7:
            parsed = [];
            seq = '';
            lines = data.split("\n");
            lines.slice(5, lines.length - 1).forEach(function (line, i) {
              line = line.trim();
              var entries = line.split(/\s+/); // console.log(entries);

              seq += entries[1];
              parsed.push({
                bindingState: entries[2],
                bindingScore: entries[3]
              });
            }); //console.log(seq);

            seq_data = (0, _sequence.sequence)(seq, undefined, undefined, location, parsed);
            return _context5.abrupt("return", seq_data);

          case 13:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return _parsePbdatFormat.apply(this, arguments);
}

function parseMemsatSVMFormat(_x6, _x7) {
  return _parseMemsatSVMFormat.apply(this, arguments);
}

function _parseMemsatSVMFormat() {
  _parseMemsatSVMFormat = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(seq, location) {
    var data, parsed, lines, seq_data;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            if (!location.startsWith("http")) {
              _context6.next = 6;
              break;
            }

            _context6.next = 3;
            return fetchData(location);

          case 3:
            data = _context6.sent;
            _context6.next = 7;
            break;

          case 6:
            data = readData(location);

          case 7:
            parsed = [];
            lines = data.split("\n");
            lines.slice(lines.length - 11, lines.length - 2).forEach(function (line, i) {
              var fields = line.split(/\t+/);

              if (fields[0] === 'Signal peptide:') {
                parsed.push({
                  signal_peptide: returnCoords(fields[1])
                });
              }

              if (fields[0] === 'Signal score:') {
                parsed.push({
                  signal_score: fields[1]
                });
              }

              if (fields[0] === 'Topology:') {
                parsed.push({
                  topology: returnCoords(fields[1])
                });
              }

              if (fields[0] === 'Re-entrant helices:') {
                parsed.push({
                  reentrant_helices: returnCoords(fields[1])
                });
              }

              if (fields[0] === 'Pore-lining helices:') {
                parsed.push({
                  pore_lining_helices: returnCoords(fields[1])
                });
              }

              if (fields[0] === 'Helix count:') {
                parsed.push({
                  helix_count: fields[1]
                });
              }

              if (fields[0] === 'N-terminal:') {
                parsed.push({
                  n_terminal: fields[1]
                });
              }

              if (fields[0] === 'Score:') {
                parsed.push({
                  score: fields[1]
                });
              }

              if (fields[0] === 'Pore stoichiometry:') {
                parsed.push({
                  pore_stoichiometry: fields[1]
                });
              }
            });
            seq_data = (0, _sequence.sequence)(seq, undefined, undefined, undefined, parsed);
            return _context6.abrupt("return", seq_data);

          case 12:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return _parseMemsatSVMFormat.apply(this, arguments);
}

function returnCoords(coordinate_string) {
  var coords = [];

  if (coordinate_string === 'Not detected.') {
    return coords;
  }

  var pairs = coordinate_string.split(",");
  pairs.forEach(function (pair) {
    var values = pair.split("-");
    coords.push({
      start: values[0],
      stop: values[1]
    });
  });
  return coords;
}

function stripLine(line, leader) {
  if (line.startsWith(leader)) {
    var re = new RegExp("^" + leader);
    return line.replace(re, "");
  } else {
    return '';
  }
}

function parsePResultsFormat(_x8, _x9) {
  return _parsePResultsFormat.apply(this, arguments);
}

function _parsePResultsFormat() {
  _parsePResultsFormat = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(seq, location) {
    var data, parsed, lines, seq_data;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            if (!location.startsWith("http")) {
              _context7.next = 6;
              break;
            }

            _context7.next = 3;
            return fetchData(location);

          case 3:
            data = _context7.sent;
            _context7.next = 7;
            break;

          case 6:
            data = readData(location);

          case 7:
            parsed = [];
            lines = data.split("\n");
            lines.slice(5, lines.length - 1).forEach(function (line, i) {
              line = line.trim();
              var entries = line.split(/\s+/); //console.log(entries);

              parsed.push({
                conf: entries[0],
                net_score: entries[1],
                p_value: entries[2],
                pairE: entries[3],
                solvE: entries[4],
                aln_score: entries[5],
                aln_length: entries[6],
                target_length: entries[7],
                query_length: entries[8],
                fold: entries[9]
              });
            }); //console.log(seq);

            seq_data = (0, _sequence.sequence)(seq, undefined, parsed, location, undefined);
            return _context7.abrupt("return", seq_data);

          case 12:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));
  return _parsePResultsFormat.apply(this, arguments);
}

function parseDomThPResultsFormat(_x10, _x11) {
  return _parseDomThPResultsFormat.apply(this, arguments);
}

function _parseDomThPResultsFormat() {
  _parseDomThPResultsFormat = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(seq, location) {
    var data, parsed, lines, seq_data;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            if (!location.startsWith("http")) {
              _context8.next = 6;
              break;
            }

            _context8.next = 3;
            return fetchData(location);

          case 3:
            data = _context8.sent;
            _context8.next = 7;
            break;

          case 6:
            data = readData(location);

          case 7:
            parsed = [];
            lines = data.split("\n");
            lines.slice(5, lines.length - 1).forEach(function (line, i) {
              line = line.trim();
              var entries = line.split(/\s+/); //console.log(entries);

              parsed.push({
                conf: entries[0],
                net_score: entries[1],
                p_value: entries[2],
                pairE: entries[3],
                solvE: entries[4],
                aln_score: entries[5],
                aln_length: entries[6],
                target_length: entries[7],
                query_length: entries[8],
                region_start: entries[9],
                region_end: entries[10],
                domain: entries[11]
              });
            }); //console.log(seq);

            seq_data = (0, _sequence.sequence)(seq, undefined, parsed, location, undefined);
            return _context8.abrupt("return", seq_data);

          case 12:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));
  return _parseDomThPResultsFormat.apply(this, arguments);
}

function parseAlignFormat(_x12, _x13) {
  return _parseAlignFormat.apply(this, arguments);
}

function _parseAlignFormat() {
  _parseAlignFormat = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(seq, location) {
    var data, parsed, lines, alignment, seq_data;
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            if (!location.startsWith("http")) {
              _context9.next = 6;
              break;
            }

            _context9.next = 3;
            return fetchData(location);

          case 3:
            data = _context9.sent;
            _context9.next = 7;
            break;

          case 6:
            data = readData(location);

          case 7:
            parsed = [];
            lines = data.split("\n");
            alignment = [];
            lines.forEach(function (line, i) {
              if (line.startsWith(">>>")) {
                //console.log(alignment.slice(0, alignment.length-4));
                var name = alignment.slice(0, 1);
                name = name[0].substring(19, name[0].length - 1);
                var align = alignment.slice(1, alignment.length - 4);
                align = align.filter(function (e) {
                  return e;
                });

                var _seq = Array(align.length / 7).fill().map(function (element, index) {
                  return index;
                });

                var hit_string = '';
                var query_string = '';
                var secondary_structure = '';

                _seq.forEach(function (value, i) {
                  hit_string += align[i * 7 + 2].slice(9);
                  query_string += align[i * 7 + 4].slice(9);
                  secondary_structure += align[i * 7 + 5].slice(9);
                });

                var pi = alignment.slice(alignment.length - 4);
                pi = pi[0].substring(22, pi[0].length - 1);
                var alignment_details = {
                  hit_name: name,
                  hit_string: hit_string,
                  query_string: query_string,
                  percentage_id: pi
                };
                parsed.push(alignment_details);
                alignment = [];
                alignment.push(line); //process alignment and reset;
              } else {
                alignment.push(line);
              }
            });
            seq_data = (0, _sequence.sequence)(seq, undefined, parsed, location, undefined);
            return _context9.abrupt("return", seq_data);

          case 13:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  }));
  return _parseAlignFormat.apply(this, arguments);
}

function parsePsicovFormat(_x14, _x15) {
  return _parsePsicovFormat.apply(this, arguments);
}

function _parsePsicovFormat() {
  _parsePsicovFormat = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(seq, location) {
    var data, parsed, lines, seq_data;
    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            if (!location.startsWith("http")) {
              _context10.next = 6;
              break;
            }

            _context10.next = 3;
            return fetchData(location);

          case 3:
            data = _context10.sent;
            _context10.next = 7;
            break;

          case 6:
            data = readData(location);

          case 7:
            parsed = [];
            lines = data.split("\n");
            lines.slice(5, lines.length - 1).forEach(function (line, i) {
              line = line.trim();
              var entries = line.split(/\s+/); //console.log(entries);

              if (parsed[entries[0]]) {
                parsed[entries[0]].push({
                  contact_id: entries[1],
                  score: entries[4]
                });
              } else {
                parsed[entries[0]] = [{
                  contact_id: entries[1],
                  score: entries[4]
                }];
              }
            }); //console.log(parsed);

            seq_data = (0, _sequence.sequence)(seq, undefined, undefined, location, parsed);
            return _context10.abrupt("return", seq_data);

          case 12:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  }));
  return _parsePsicovFormat.apply(this, arguments);
}

function parseDMPFormat(_x16, _x17) {
  return _parseDMPFormat.apply(this, arguments);
}

function _parseDMPFormat() {
  _parseDMPFormat = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(seq, location) {
    var data, parsed, lines, seq_data;
    return regeneratorRuntime.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            if (!location.startsWith("http")) {
              _context11.next = 6;
              break;
            }

            _context11.next = 3;
            return fetchData(location);

          case 3:
            data = _context11.sent;
            _context11.next = 7;
            break;

          case 6:
            data = readData(location);

          case 7:
            parsed = [];
            lines = data.split("\n");
            lines.slice(5, lines.length - 1).forEach(function (line, i) {
              line = line.trim();
              var entries = line.split(/\s+/); //console.log(entries);

              if (parsed[entries[0]]) {
                parsed[entries[0]].push({
                  contact_id: entries[1],
                  score: entries[4]
                });
              } else {
                parsed[entries[0]] = [{
                  contact_id: entries[1],
                  score: entries[4]
                }];
              }
            }); // console.log(parsed);

            seq_data = (0, _sequence.sequence)(seq, undefined, undefined, location, parsed);
            return _context11.abrupt("return", seq_data);

          case 12:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11);
  }));
  return _parseDMPFormat.apply(this, arguments);
}

function parseMPLipidFormat(_x18, _x19) {
  return _parseMPLipidFormat.apply(this, arguments);
}

function _parseMPLipidFormat() {
  _parseMPLipidFormat = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(seq, location) {
    var data, parsed, lines, seq_data;
    return regeneratorRuntime.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            if (!location.startsWith("http")) {
              _context12.next = 6;
              break;
            }

            _context12.next = 3;
            return fetchData(location);

          case 3:
            data = _context12.sent;
            _context12.next = 7;
            break;

          case 6:
            data = readData(location);

          case 7:
            parsed = [];
            lines = data.split("\n");
            lines.slice(5, lines.length - 1).forEach(function (line, i) {
              line = line.trim();
              var entries = line.split(/\s+/); //console.log(entries);

              parsed[entries[0]] = {
                lipid_exposure_score: entries[2]
              };
            }); //console.log(parsed);

            seq_data = (0, _sequence.sequence)(seq, undefined, undefined, location, parsed);
            return _context12.abrupt("return", seq_data);

          case 12:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12);
  }));
  return _parseMPLipidFormat.apply(this, arguments);
}

function parseMPContactFormat(_x20, _x21) {
  return _parseMPContactFormat.apply(this, arguments);
}

function _parseMPContactFormat() {
  _parseMPContactFormat = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13(seq, location) {
    var data, parsed, lines, seq_data;
    return regeneratorRuntime.wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            if (!location.startsWith("http")) {
              _context13.next = 6;
              break;
            }

            _context13.next = 3;
            return fetchData(location);

          case 3:
            data = _context13.sent;
            _context13.next = 7;
            break;

          case 6:
            data = readData(location);

          case 7:
            parsed = [];
            lines = data.split("\n");
            lines.slice(5, lines.length - 1).forEach(function (line, i) {
              line = line.trim();
              var entries = line.split(/\s+/); //console.log(entries);

              var pair = entries[0].split("-");

              if (parsed[pair[0]]) {
                parsed[pair[0]].push({
                  contact_id: pair[1],
                  pairing: entries[1],
                  score: entries[2]
                });
              } else {
                parsed[pair[0]] = [{
                  contact_id: pair[1],
                  pairing: entries[1],
                  score: entries[2]
                }];
              }
            }); //console.log(parsed);

            seq_data = (0, _sequence.sequence)(seq, undefined, undefined, location, parsed);
            return _context13.abrupt("return", seq_data);

          case 12:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee13);
  }));
  return _parseMPContactFormat.apply(this, arguments);
}

function parseDompredFormat(_x22, _x23) {
  return _parseDompredFormat.apply(this, arguments);
}

function _parseDompredFormat() {
  _parseDompredFormat = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14(seq, location) {
    var data, parsed, residue_parsed, lines, domain_count, domains_string, boundaries, seq_data;
    return regeneratorRuntime.wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            if (!location.startsWith("http")) {
              _context14.next = 6;
              break;
            }

            _context14.next = 3;
            return fetchData(location);

          case 3:
            data = _context14.sent;
            _context14.next = 7;
            break;

          case 6:
            data = readData(location);

          case 7:
            parsed = {};
            residue_parsed = [];
            lines = data.split("\n");
            domain_count = lines[1].substring(36);
            domain_count = domain_count.trim();
            domains_string = lines[2].substring(41);
            domains_string = domains_string.trim();
            boundaries = domains_string.split(/\s+/); //console.log(domain_count);
            //console.log(boundaries);

            boundaries.forEach(function (index) {
              residue_parsed[index] = {
                domain_boundary: true
              };
            }); //console.log(residue_parsed);

            parsed = {
              domain_count: domain_count,
              domain_boundaries: boundaries
            };
            seq_data = (0, _sequence.sequence)(seq, undefined, parsed, location, residue_parsed);
            return _context14.abrupt("return", seq_data);

          case 19:
          case "end":
            return _context14.stop();
        }
      }
    }, _callee14);
  }));
  return _parseDompredFormat.apply(this, arguments);
}

function parseFeatcfgFormat(_x24) {
  return _parseFeatcfgFormat.apply(this, arguments);
}

function _parseFeatcfgFormat() {
  _parseFeatcfgFormat = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15(location) {
    var data, parsed, residue_parsed, lines, seq_entries, seq, seq_data;
    return regeneratorRuntime.wrap(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            if (!location.startsWith("http")) {
              _context15.next = 6;
              break;
            }

            _context15.next = 3;
            return fetchData(location);

          case 3:
            data = _context15.sent;
            _context15.next = 7;
            break;

          case 6:
            data = readData(location);

          case 7:
            parsed = {};
            residue_parsed = [];
            lines = data.split("\n");
            seq_entries = lines[0].split(/\s+/);
            seq = seq_entries[1].trim();
            lines.forEach(function (line, i) {
              line = line.trim();
              var entries = line.split(/\t+/);

              if (line.startsWith("DI")) {
                if (parsed.disordered_region) {
                  parsed.disordered_region.push({
                    start: entries[2],
                    stop: entries[3]
                  });
                } else {
                  parsed.disordered_region = [{
                    start: entries[2],
                    stop: entries[3]
                  }];
                }

                var iterator = Array.from({
                  length: entries[3] - entries[2]
                }, function (v, k) {
                  return k + parseInt(entries[2]) - 1;
                });
                iterator.forEach(function (index) {
                  if (!residue_parsed[index]) {
                    residue_parsed[index] = {};
                  }

                  residue_parsed[index].disorder = true;
                });
              }

              if (line.startsWith("TM")) {
                if (parsed.tm_region) {
                  parsed.tm_region.push({
                    start: entries[2],
                    stop: entries[3]
                  });
                } else {
                  parsed.tm_region = [{
                    start: entries[2],
                    stop: entries[3]
                  }];
                }

                var _iterator = Array.from({
                  length: entries[3] - entries[2]
                }, function (v, k) {
                  return k + parseInt(entries[2]) - 1;
                });

                _iterator.forEach(function (index) {
                  if (!residue_parsed[index]) {
                    residue_parsed[index] = {};
                  }

                  residue_parsed[index].tm_region = true;
                });
              }

              if (line.startsWith("NG")) {
                if (parsed.nglyc_region) {
                  parsed.nglyc_region.push({
                    start: entries[2],
                    stop: entries[3],
                    score: entries[4]
                  });
                } else {
                  parsed.nglyc_region = [{
                    start: entries[2],
                    stop: entries[3],
                    score: entries[4]
                  }];
                }

                var _iterator2 = Array.from({
                  length: entries[3] - entries[2]
                }, function (v, k) {
                  return k + parseInt(entries[2]) - 1;
                });

                _iterator2.forEach(function (index) {
                  if (!residue_parsed[index]) {
                    residue_parsed[index] = {};
                  }

                  residue_parsed[index].nglyc_region = true;
                  residue_parsed[index].nglyc_region.score = entries[4];
                });
              }

              if (line.startsWith("OG")) {
                if (parsed[entries[1] + "_region"]) {
                  parsed[entries[1] + "_region"].push({
                    start: entries[2],
                    stop: entries[3],
                    score: entries[4]
                  });
                } else {
                  parsed[entries[1] + "_region"] = [{
                    start: entries[2],
                    stop: entries[3],
                    score: entries[4]
                  }];
                }

                var _iterator3 = Array.from({
                  length: entries[3] - entries[2]
                }, function (v, k) {
                  return k + parseInt(entries[2]) - 1;
                });

                _iterator3.forEach(function (index) {
                  if (!residue_parsed[index]) {
                    residue_parsed[index] = {};
                  }

                  residue_parsed[index][entries[1] + "_region"] = true;
                  residue_parsed[index][entries[1] + "_region"].score = entries[4];
                });
              }

              if (line.startsWith("SS")) {
                var type = '';

                if (entries[1] === 'psipredH') {
                  type = "helix";
                } else {
                  type = "strand";
                }

                if (parsed[type]) {
                  parsed[type].push({
                    start: entries[2],
                    stop: entries[3]
                  });
                } else {
                  parsed[type] = [{
                    start: entries[2],
                    stop: entries[3]
                  }];
                }

                var _iterator4 = Array.from({
                  length: entries[3] - entries[2]
                }, function (v, k) {
                  return k + parseInt(entries[2]) - 1;
                });

                _iterator4.forEach(function (index) {
                  if (!residue_parsed[index]) {
                    residue_parsed[index] = {};
                  }

                  residue_parsed[index][type] = true;
                });
              }

              if (line.startsWith("PS")) {
                if (entries[2] > 0) {
                  //console.log(entries)
                  if (parsed.cellular_location) {
                    parsed.cellular_location.push({
                      location: entries[1],
                      score: entries[2]
                    });
                  } else {
                    parsed.cellular_location = [{
                      location: entries[1],
                      score: entries[2]
                    }];
                  }
                }
              }

              if (line.startsWith("SF")) {
                if (parsed.physiochemical_features) {
                  parsed.physiochemical_features.push({
                    name: entries[1],
                    score: entries[2]
                  });
                } else {
                  parsed.physiochemical_features = [{
                    name: entries[1],
                    score: entries[2]
                  }];
                }
              }

              if (line.startsWith("AA")) {
                if (parsed.aa_percentage) {
                  parsed.aa_percentage.push({
                    residue: entries[1],
                    percentage: entries[3]
                  });
                } else {
                  parsed.aa_percentage = [{
                    residue: entries[1],
                    percentage: entries[3]
                  }];
                }
              }

              if (line.startsWith("SP")) {
                if (parsed.signal) {
                  parsed.signal.push(entries);
                } else {
                  parsed.signal = [entries];
                }
              }
            }); //console.log(parsed);
            //  console.log(residue_parsed);

            seq_data = (0, _sequence.sequence)(seq, undefined, parsed, location, residue_parsed);
            return _context15.abrupt("return", seq_data);

          case 15:
          case "end":
            return _context15.stop();
        }
      }
    }, _callee15);
  }));
  return _parseFeatcfgFormat.apply(this, arguments);
}

function parseFFPredGOFormat(_x25, _x26) {
  return _parseFFPredGOFormat.apply(this, arguments);
}

function _parseFFPredGOFormat() {
  _parseFFPredGOFormat = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee16(seq, location) {
    var data, parsed, lines, seq_data;
    return regeneratorRuntime.wrap(function _callee16$(_context16) {
      while (1) {
        switch (_context16.prev = _context16.next) {
          case 0:
            if (!location.startsWith("http")) {
              _context16.next = 6;
              break;
            }

            _context16.next = 3;
            return fetchData(location);

          case 3:
            data = _context16.sent;
            _context16.next = 7;
            break;

          case 6:
            data = readData(location);

          case 7:
            parsed = {};
            lines = data.split("\n");
            lines.slice(5, lines.length - 1).forEach(function (line, i) {
              line = line.trim();

              if (line.startsWith("#")) {
                return;
              }

              var entries = line.split(/\t/);
              var ontology = entries[3];

              if (parsed[ontology]) {
                parsed[entries[3]].push({
                  GO_term: entries[1],
                  score: entries[0],
                  confidence: entries[2],
                  term: entries[4]
                });
              } else {
                parsed[entries[3]] = [{
                  GO_term: entries[1],
                  score: entries[0],
                  confidence: entries[2],
                  term: entries[4]
                }];
              }
            }); //console.log(parsed);

            seq_data = (0, _sequence.sequence)(seq, undefined, parsed, location, undefined);
            return _context16.abrupt("return", seq_data);

          case 12:
          case "end":
            return _context16.stop();
        }
      }
    }, _callee16);
  }));
  return _parseFFPredGOFormat.apply(this, arguments);
}

function parseMetpredFormat(_x27, _x28, _x29) {
  return _parseMetpredFormat.apply(this, arguments);
}

function _parseMetpredFormat() {
  _parseMetpredFormat = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee17(seq, metal_ion, location) {
    var data, parsed, lines, entries, i, set, num, letr, seq_data;
    return regeneratorRuntime.wrap(function _callee17$(_context17) {
      while (1) {
        switch (_context17.prev = _context17.next) {
          case 0:
            if (!location.startsWith("http")) {
              _context17.next = 6;
              break;
            }

            _context17.next = 3;
            return fetchData(location);

          case 3:
            data = _context17.sent;
            _context17.next = 7;
            break;

          case 6:
            data = readData(location);

          case 7:
            parsed = [];
            lines = data.split("\n");
            entries = lines[0].split(/\s/);

            for (i = 0; i < entries.length; i += 3) {
              set = entries.slice(i, i + 3);
              num = set[2].match(/\d+/g);
              letr = set[2].match(/[a-zA-Z]+/g);
              parsed[num[0]] = {
                metal_ion: metal_ion,
                score: set[1],
                residue_id: letr[0]
              };
            }

            seq_data = (0, _sequence.sequence)(seq, undefined, undefined, location, parsed);
            return _context17.abrupt("return", seq_data);

          case 13:
          case "end":
            return _context17.stop();
        }
      }
    }, _callee17);
  }));
  return _parseMetpredFormat.apply(this, arguments);
}

function parseHSPredFormat(_x30, _x31, _x32) {
  return _parseHSPredFormat.apply(this, arguments);
}

function _parseHSPredFormat() {
  _parseHSPredFormat = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee18(seq, chain, location) {
    var data, parsed, lines, seq_data;
    return regeneratorRuntime.wrap(function _callee18$(_context18) {
      while (1) {
        switch (_context18.prev = _context18.next) {
          case 0:
            if (!location.startsWith("http")) {
              _context18.next = 6;
              break;
            }

            _context18.next = 3;
            return fetchData(location);

          case 3:
            data = _context18.sent;
            _context18.next = 7;
            break;

          case 6:
            data = readData(location);

          case 7:
            parsed = [];
            lines = data.split("\n");
            lines.forEach(function (line) {
              var entries = line.split(/\s+/);

              if (entries.length < 3) {
                return;
              }

              var num = entries[0].match(/\d+/g);
              var letr = entries[0].match(/[a-zA-Z]+/g);

              if (letr[0] === chain) {
                parsed[num[0]] = {
                  residue: entries[1],
                  score: entries[2]
                };
              }
            }); //console.log(parsed);

            seq_data = (0, _sequence.sequence)(seq, undefined, undefined, location, parsed);
            return _context18.abrupt("return", seq_data);

          case 12:
          case "end":
            return _context18.stop();
        }
      }
    }, _callee18);
  }));
  return _parseHSPredFormat.apply(this, arguments);
}