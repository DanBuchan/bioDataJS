/*jshint esversion: 6 */
let residue = require('./residue.js');

// seq : A biological sequence
// type : whether the residue is an aminoacid or nucleotide
// annoations: an objects of key:value pairs. Of annotations for the whole
//             sequence
//             Each position in the array maps 1:1 to a positon in the Sequence
// residue_annotations: an array of objects which are key:value pairs of
//                      annotations. Each position in the array maps 1:1 to the
//                      sequence
// source: A strong the defines where the data revord came from (i.e. a file
//         name or URI
const sequence = function(seq, type='aminoacid', annotations={}, source='', residue_annotations=[]) {
  if(! Array.isArray(residue_annotations))
  {
    throw("sequence residue_annotations must be an array");
  }
  if(! (typeof source === 'string' || source instanceof String))
  {
     throw("sequence source must be a string");
  }
  if(!(type === "aminoacid" || type === "nucleotide"))
  {
     throw("Sequence type is not valid. Must be one of 'aminoacid' or 'nucleotide'");
  }
  if(type === "aminoacid") {
      if(! /^[A,B,C,D,E,F,G,H,I,K,L,M,N,P,Q,R,S,T,V,W,X,Y,Z,_,-]+$/.test(seq.toUpperCase())){
        throw("Input seq contains invalid amino acid characters");
    }
  }
  if(type === "nucleotide") {
    if(! /^[A,B,C,D,G,H,K,M,N,R,S,T,U,V,W,X,Y,_,-]+$/.test(seq.toUpperCase())){
      throw("Input seq contains invalid nucleotide characters");
    }
  }
  let residue_array = [];
  Array.from(seq).forEach(function(letter, i){
    residue_array[i] = residue.residue(letter, type);
    residue_array[i].type = type;
    if(residue_annotations[i]){
        residue_array[i].annotations = residue_annotations[i];
    }
  });
  let seq_data = {
    identity: "sequence",
    sequence: seq,
    type: type,
    source: source,
    residues: residue_array,
    annotations: annotations,
  };
  return(seq_data);
};

module.exports = {
  sequence: sequence,
};
