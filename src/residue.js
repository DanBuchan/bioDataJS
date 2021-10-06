/*jshint esversion: 6 */

// Residue : single letter code for the residue
// type : whether the residue is an aminoacid or nucleotide
// annoations: an object of key:value pairs for any annotations for this residue
export const residue = function(residue, type='aminoacid', annotations={}) {

  if(typeof(annotations) !== "object"){
    throw("Residue annotations must be object");
  }
  if(residue.length > 1 || residue.length < 1)
  {
    throw("Residues must be single characters");
  }
  if(!(type === "aminoacid" || type === "nucleotide"))
  {
     throw("Residue type is not valid. Must be one of 'aminoacid' or 'nucleotide'");
  }
  if(type === "aminoacid") {
    if(! /^[A,B,C,D,E,F,G,H,I,K,L,M,N,P,Q,R,S,T,V,W,X,Y,Z,_,-]+$/.test(residue.toUpperCase())){
      throw("Input residue contains invalid amino acid characters");
    }
  }
  if(type === "nucleotide") {
    if(! /^[A,C,G,T,U,R,Y,S,W,K,M,B,D,H,V,N,X,_,-]+$/.test(residue.toUpperCase())){
      throw("Input residue contains invalid nucleotide characters");
    }
  }
  // TODO: Should build an array of atoms here for pdb type use
  //
  let seq_data = {
    identity: "residue",
    residue: residue,
    type: type,
    annotations: annotations,
  };
  return(seq_data);
};

// module.exports = {
//   residue: residue,
// };
