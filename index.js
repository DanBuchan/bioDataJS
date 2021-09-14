/*jshint esversion: 6 */
// import { biod3_psipredxyLineChart } from './line_chart/line_index.js';

const sequence = function(seq, type='aminoacid') {
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
    if(! /^[A,C,G,T,U,R,Y,S,W,K,M,B,D,H,V,N,_,-]+$/.test(seq.toUpperCase())){
      throw("Input seq contains invalid nucleotide characters");
    }
  }
  seq_array = [];
  Array.from(seq).forEach(function(letter, i){
    seq_array[i] = {residue: letter}
  });
  let seq_data = {
    input_sequence: seq,
    type: 'prot',
    sequence: seq_array,
  };
  return(seq_data);
};

module.exports = {
  sequence: sequence,
};
 //ARNDBCEQZGHILKMFPSTWYVX_-
