"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseUniprotFormat = parseUniprotFormat;

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

var _sequence = require("../src/sequence.js");

var _protein = require("../src/protein.js");

var _psipred_parsers = require("../src/psipred_parsers.js");

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function parseUniprotFormat(_x) {
  return _parseUniprotFormat.apply(this, arguments);
}

function _parseUniprotFormat() {
  _parseUniprotFormat = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(location) {
    var data, protein_features, sequence_features, residue_features, seq, ref_count, feature_count, feat_name, feat_start, feat_stop, feat_evidence, feat_note, seq_found, lines, seq_data, protein_data;
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
            protein_features = {};
            protein_features.database_refstou = {};
            sequence_features = [];
            residue_features = [];
            seq = '';
            ref_count = -1;
            feature_count = -1;
            feat_name = '';
            feat_start = 0;
            feat_stop = 0;
            feat_evidence = '';
            feat_note = '';
            seq_found = false;
            lines = data.split("\n");
            lines.forEach(function (line, i) {
              var line_data = line.substring(5);
              line_data = line_data.replace(/\.$/, '');
              line_data = line_data.replace(/;$/, '');

              if (line.startsWith("ID")) {
                var entries = line_data.split(/\s+/);
                protein_features.uniprotID = entries[0];
              }

              if (line.startsWith("AC")) {
                var _entries = line_data.split(/;\s+/);

                protein_features.accession = _entries;
              }

              if (line.startsWith("DT")) {}

              if (line.startsWith("DE")) {
                if (!protein_features.description) {
                  protein_features.description = line_data + "\n";
                  return;
                }

                protein_features.description += line_data + "\n";
              }

              if (line.startsWith("GN")) {
                if (line_data.startsWith("Name")) {
                  var matches = line_data.match(/Name=(.+?)\s+.+/);
                  protein_features.gene_name = matches[1];
                  matches = line_data.match(/\{(.+)\}/);

                  if (matches) {
                    var evidences = matches[1].split(", ");
                    protein_features.gene_evidence = evidences;
                  }
                }

                if (line_data.startsWith("Synonyms")) {
                  var _matches = line_data.match(/Synonyms=(.+)/);

                  if (_matches) {
                    var synonyms = _matches[1].split(", ");

                    protein_features.gene_synonyms = synonyms;
                  }
                }
              }

              if (line.startsWith("OS")) {
                protein_features.organism_nane = line_data;
              }

              if (line.startsWith("OG")) {
                protein_features.organelle = line_data;
              }

              if (line.startsWith("OC")) {
                if (!protein_features.taxonomy) {
                  protein_features.taxonomy = line_data + "; ";
                  return;
                }

                protein_features.taxonomy += line_data;
              }

              if (line.startsWith("OX")) {
                var _matches2 = line_data.match(/NCBI_TaxID=(.+)/);

                if (_matches2) {
                  protein_features.ncbi_taxaID = _matches2[1];
                }
              }

              if (line.startsWith("OH")) {
                protein_features.organism_host = line_data;
              }

              if (line.startsWith("RN")) {
                if (ref_count == -1) {
                  protein_features.references = [];
                }

                ref_count += 1;
                protein_features.references[ref_count] = '';
              }

              if (line.startsWith("RP")) {
                protein_features.references[ref_count] += line_data + "\n";
              }

              if (line.startsWith("RC")) {
                protein_features.references[ref_count] += line_data + "\n";
              }

              if (line.startsWith("RX")) {
                protein_features.references[ref_count] += line_data + "\n";
              }

              if (line.startsWith("RG")) {
                protein_features.references[ref_count] += line_data + "\n";
              }

              if (line.startsWith("RA")) {
                protein_features.references[ref_count] += line_data + "\n";
              }

              if (line.startsWith("RT")) {
                protein_features.references[ref_count] += line_data + "\n";
              }

              if (line.startsWith("RL")) {
                protein_features.references[ref_count] += line_data + "\n";
              }

              if (line.startsWith("CC")) {
                if (!protein_features.comments) {
                  protein_features.comments = line_data + "\n";
                  return;
                }

                protein_features.comments += line_data + "\n";
              }

              if (line.startsWith("DR")) {
                var _entries2 = line_data.split(/; /);

                if (!protein_features.database_refs[_entries2[0]]) {
                  protein_features.database_refs[_entries2[0]] = [];
                }

                protein_features.database_refs[_entries2[0]].push(_entries2.slice(1));
              }

              if (line.startsWith("PE")) {
                protein_features.protein_existence = line_data;
              }

              if (line.startsWith("KW")) {
                if (!protein_features.keywords) {
                  protein_features.keywords = line_data + "; ";
                  return;
                }

                protein_features.keywords += line_data;
              }

              if (line.startsWith("FT")) {
                var _entries3 = line_data.split(/\s+/);

                if (line_data[0] !== " ") {
                  if (feature_count !== -1) {
                    sequence_features[feature_count] = {
                      feature_name: feat_name,
                      start: feat_start,
                      stop: feat_stop,
                      evidence: feat_evidence,
                      note: feat_note
                    };
                  }

                  feat_name = _entries3[0];

                  var coords = _entries3[1].split("..");

                  feat_start = coords[0];
                  feat_stop = coords[1];
                  feat_evidence = '';
                  feat_note = '';
                  feature_count += 1;
                } else {
                  var _matches3 = line_data.match(/\/evidence="(.+)"/);

                  if (_matches3) {
                    feat_evidence = _matches3[1];
                  }

                  _matches3 = line_data.match(/\/note="(.+)"/);

                  if (_matches3) {
                    feat_note = _matches3[1];
                  }
                }
              }

              if (line.startsWith("SQ")) {
                seq_found = true;
                return;
              }

              if (line.startsWith("//")) {
                seq_found = false;
              }

              if (seq_found) {
                seq += line_data;
              } // console.log(line);

            });

            if (feat_name.length > 0) {
              sequence_features[feature_count] = {
                feature_name: feat_name,
                start: feat_start,
                stop: feat_stop,
                evidence: feat_evidence,
                note: feat_note
              };
            }

            seq = seq.replace(/ /g, '');
            sequence_features.forEach(function (feature) {
              for (var i = feature.start - 1; i < feature.stop; i += 1) {
                residue_features[i] = {
                  annotation: feature.feature_name,
                  evidence: feature.evidence,
                  note: feature.note
                };
              }
            }); //console.log(residue_features);

            seq_data = (0, _sequence.sequence)(seq, undefined, sequence_features, location, residue_features);
            protein_data = (0, _protein.protein)(seq_data, protein_features, location);
            return _context.abrupt("return", protein_data);

          case 28:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _parseUniprotFormat.apply(this, arguments);
}