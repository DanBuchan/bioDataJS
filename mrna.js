/*jshint esversion: 6 */
let residue = require('./protein.js');

// seq : a sequence of nucleotides
// annoations: an objects of key:value pairs. Of annotations for the mRNA
// source: A strong the defines where the data revord came from (i.e. a file
//         name or URI
const mrna = function(seq={}, annotations={}, source='', proteins=[]) {
  if(! Array.isArray(proteins))
  {
    throw("proteins must be an array");
  }
  if(! (typeof source === 'string' || source instanceof String))
  {
     throw("source must be a string");
  }
  if(! /^[A,C,G,T,U,R,Y,S,W,K,M,B,D,H,V,N,X,_,-]+$/.test(seq.toUpperCase())){
    throw("Input seq contains invalid nucleotide characters");
  }

  let seq_data = {
    identity: "mrna",
    sequence: seq,
    source: source,
    annotations: annotations,
    proteins: proteins,
  };
};
