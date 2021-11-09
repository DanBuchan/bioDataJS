"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.protein = void 0;

var _sequence = require("./sequence.js");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

// sequence : a sequence object creadted by bd.sequence()
//            or an array of sequences to support inteins
// annoations: an objects of key:value pairs. Of annotations for the mRNA
// source: A strong the defines where the data revord came from (i.e. a file
//         name or URI
var protein = function protein(seq) {
  var annotations = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var source = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var prot = seq; // check if seq that has arrived is an array and if so
  // ensure each item has the identity of sequence
  // and then skip the other tests

  if (Array.isArray(seq)) {
    var pass = true;
    var failed = '';
    seq.forEach(function (item, i) {
      if (item.identity !== 'sequence') {
        failed = failed + " " + i;
        pass = false;
      }
    });

    if (!pass) {
      throw "sequence array must contain only sequence type: error at " + failed;
    }
  } else {
    if (typeof prot === 'string' || prot instanceof String) {
      //if we got a string try and make a sequence out of it
      prot = (0, _sequence.sequence)(prot);
    } else {
      //otherwise check it is already a seq object
      if (_typeof(prot) !== "object") {
        throw "protein seq must be object";
      }

      if (!prot.identity || prot.identity !== 'sequence') {
        throw "Input protein seq must have sequence identity";
      }
    }
  }

  if (!(typeof source === 'string' || source instanceof String)) {
    throw "protein source must be a string";
  }

  var prot_data = {
    identity: "protein",
    sequence: prot,
    source: source,
    annotations: annotations
  };
  return prot_data;
};

exports.protein = protein;