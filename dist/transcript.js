"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transcript = void 0;

var _rna = require("./rna.js");

var _sequence = require("./sequence.js");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var transcript = function transcript(transcript_sequence) {
  var rna = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var annotations = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var source = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';

  if (Array.isArray(rna)) {
    var pass = true;
    var failed = '';
    rna.forEach(function (item, i) {
      if (item.identity !== 'rna') {
        failed = failed + " " + i;
        pass = false;
      }
    });

    if (!pass) {
      throw "rna array must contain only rna type: error at " + failed;
    }
  } else {
    throw "rna must be array of rna objects";
  }

  if (typeof transcript_sequence === 'string' || transcript_sequence instanceof String) {
    //if we got a string try and make a sequence out of it
    transcript_sequence = (0, _sequence.sequence)(transcript_sequence, 'nucleotide');
  } else {
    //otherwise check it is already a seq object
    if (_typeof(transcript_sequence) !== "object") {
      throw "transcript_sequence must be object";
    }

    if (!transcript_sequence.identity || transcript_sequence.identity !== 'sequence') {
      throw "Input transcript_sequence object must have sequence identity";
    }
  }

  if (!(typeof source === 'string' || source instanceof String)) {
    throw "transcript source must be a string";
  }

  var transcript_data = {
    identity: "transcript",
    sequence: transcript_sequence,
    rnas: rna,
    source: source,
    annotations: annotations
  };
  return transcript_data;
};

exports.transcript = transcript;