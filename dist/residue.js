"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.residue = void 0;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*jshint esversion: 6 */
// Residue : single letter code for the residue
// type : whether the residue is an aminoacid or nucleotide
// annoations: an object of key:value pairs for any annotations for this residue
var residue = function residue(_residue) {
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'aminoacid';
  var annotations = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  if (_typeof(annotations) !== "object") {
    throw "Residue annotations must be object";
  }

  if (_residue.length > 1 || _residue.length < 1) {
    throw "Residues must be single characters";
  }

  if (!(type === "aminoacid" || type === "nucleotide")) {
    throw "Residue type is not valid. Must be one of 'aminoacid' or 'nucleotide'";
  }

  if (type === "aminoacid") {
    if (!/^[A,B,C,D,E,F,G,H,I,K,L,M,N,P,Q,R,S,T,V,W,X,Y,Z,_,-]+$/.test(_residue.toUpperCase())) {
      throw "Input residue contains invalid amino acid characters";
    }
  }

  if (type === "nucleotide") {
    if (!/^[A,C,G,T,U,R,Y,S,W,K,M,B,D,H,V,N,X,_,-]+$/.test(_residue.toUpperCase())) {
      throw "Input residue contains invalid nucleotide characters";
    }
  } // TODO: Should build an array of atoms here for pdb type use
  //


  var seq_data = {
    identity: "residue",
    residue: _residue,
    type: type,
    annotations: annotations
  };
  return seq_data;
}; // module.exports = {
//   residue: residue,
// };


exports.residue = residue;