"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.chromosome = void 0;

var _sequence = require("./sequence.js");

/*jshint esversion: 6 */
//let sequence = require('./sequence.js');
var chromosome = function chromosome() {
  var genes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var annotations = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var source = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var type = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "chromosome";
  var re = /chromosome|plasmid|mitochondrial|chloroplast/ig;

  if (!type.match(re)) {
    throw "Chromosome type must be one of 'chromosome','plasmid', 'mitochondrial' or 'chloroplast'";
  }

  if (Array.isArray(genes)) {
    var pass = true;
    var failed = '';
    genes.forEach(function (item, i) {
      if (item.identity !== 'gene') {
        failed = failed + " " + i;
        pass = false;
      }
    });

    if (!pass) {
      throw "gene array must contain only gene type: error at " + failed;
    }
  } else {
    throw "genes must be array of gene objects";
  }

  if (!(typeof source === 'string' || source instanceof String)) {
    throw "chromosome source must be a string";
  }

  var chromosome_data = {
    identity: "chromosome",
    type: type,
    genes: genes,
    source: source,
    annotations: annotations
  };
  return chromosome_data;
};

exports.chromosome = chromosome;