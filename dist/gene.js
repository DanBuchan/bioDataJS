"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gene = void 0;

var _sequence = require("./sequence.js");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var gene = function gene(gene_sequence) {
  var transcripts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var annotations = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var source = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';

  if (Array.isArray(transcripts)) {
    var pass = true;
    var failed = '';
    transcripts.forEach(function (item, i) {
      if (item.identity !== 'transcript') {
        failed = failed + " " + i;
        pass = false;
      }
    });

    if (!pass) {
      throw "transcript array must contain only transcript type: error at " + failed;
    }
  } else {
    throw "transcripts must be array of transcript objects";
  }

  if (typeof gene_sequence === 'string' || gene_sequence instanceof String) {
    //if we got a string try and make a sequence out of it
    gene_sequence = (0, _sequence.sequence)(gene_sequence, 'nucleotide');
  } else {
    //otherwise check it is already a seq object
    if (_typeof(gene_sequence) !== "object") {
      throw "gene_sequence must be object";
    }

    if (!gene_sequence.identity || gene_sequence.identity !== 'sequence') {
      throw "Input gene_sequence object must have sequence identity";
    }
  }

  if (!(typeof source === 'string' || source instanceof String)) {
    throw "gene source must be a string";
  }

  var gene_data = {
    identity: "gene",
    sequence: gene_sequence,
    transcripts: transcripts,
    source: source,
    annotations: annotations
  };
  return gene_data;
};

exports.gene = gene;