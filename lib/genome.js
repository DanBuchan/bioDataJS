"use strict";

/*jshint esversion: 6 */
var sequence = require('./sequence.js');

var genome = function genome() {
  var chromosome = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var annotations = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var source = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var genus = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
  var species = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '';

  if (Array.isArray(chromosome)) {
    var pass = true;
    var failed = '';
    chromosome.forEach(function (item, i) {
      if (item.identity !== 'chromosome') {
        failed = failed + " " + i;
        pass = false;
      }
    });

    if (!pass) {
      throw "chromosome array must contain only chromosome type: error at " + failed;
    }
  } else {
    throw "chromosome must be array of chromosome objects";
  }

  if (!(typeof source === 'string' || source instanceof String)) {
    throw "genome source must be a string";
  }

  if (!(typeof genus === 'string' || genus instanceof String)) {
    throw "genome genus must be a string";
  }

  if (!(typeof species === 'string' || species instanceof String)) {
    throw "genome species must be a string";
  }

  var genome_data = {
    identity: "chromosome",
    chromosome: chromosome,
    source: source,
    annotations: annotations,
    genus: genus,
    species: species
  };
  return genome_data;
};

module.exports = {
  genome: genome
};