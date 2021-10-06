"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rna = void 0;

var _protein = require("./protein.js");

var _sequence = require("./sequence.js");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

// nrna_sequence : an rna nucleotide sequence or a sequence object of
//                 type nucleotide creadted by db.sequence()
// protein : a protein aa sequence or a sequence object of
//           type aminoacid creadted by db.sequence()
// annoations: an objects of key:value pairs. Of annotations for the rna
// source: A strong the defines where the data revord came from (i.e. a file
//         name or URI
// type: default type of rna is mrna, overrrde for other classes
// to handle mapping of multiple rna-sequences to multiple proteins it is worth
// ordering your rna_seqs with the same order as your protein_seqs
var rna = function rna(rna_sequence) {
  var rna_protein = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var annotations = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var source = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
  var type = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "mrna";

  // TODO: check if rna_sequence that has arrived is an array and if so
  // ensure each item has the identity of sequence
  // and then skip the other tests
  if (typeof rna_protein === 'string' || rna_protein instanceof String) {
    //if we got a string try and make a sequence out of it
    rna_protein = (0, _protein.protein)(rna_protein);
  } else {
    //otherwise check it is already a seq object
    if (_typeof(rna_protein) !== "object") {
      throw "protein must be object";
    }

    if (!(rna_protein && Object.keys(rna_protein).length === 0 && rna_protein.constructor === Object)) {
      if (!rna_protein.identity || rna_protein.identity !== 'protein') {
        throw "Input protein object must have protein identity";
      }
    }
  }

  if (Array.isArray(rna_sequence)) {
    var pass = true;
    var failed = '';
    rna_sequence.forEach(function (item, i) {
      if (item.identity !== 'sequence') {
        failed = failed + " " + i;
        pass = false;
      }
    });

    if (!pass) {
      throw "rna_sequence array must contain only sequence type: error at " + failed;
    }
  } else {
    if (typeof rna_sequence === 'string' || rna_sequence instanceof String) {
      //if we got a string try and make a sequence out of it
      rna_sequence = (0, _sequence.sequence)(rna_sequence, 'nucleotide');
    } else {
      //otherwise check it is already a seq object
      if (_typeof(rna_sequence) !== "object") {
        throw "rna_sequence must be object";
      }

      if (!rna_sequence.identity || rna_sequence.identity !== 'sequence') {
        throw "Input rna_sequence object must have sequence identity";
      }
    }
  }

  if (!(typeof source === 'string' || source instanceof String)) {
    throw "rna source must be a string";
  }

  var prot_data = {
    identity: "rna",
    type: type,
    sequence: rna_sequence,
    protein: rna_protein,
    source: source,
    annotations: annotations
  };
  return prot_data;
};

exports.rna = rna;