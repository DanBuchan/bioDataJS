/*jshint esversion: 6 */
let protein = require('./protein.js');
let sequence = require('./sequence.js');

// nrna_sequence : an mrna nucleotide sequence or a sequence object of
//                 type nucleotide creadted by db.sequence()
// protein : a protein aa sequence or a sequence object of
//           type aminoacid creadted by db.sequence()
// annoations: an objects of key:value pairs. Of annotations for the mRNA
// source: A strong the defines where the data revord came from (i.e. a file
//         name or URI
const mrna = function(mrna_sequence, mrna_protein={}, annotations={}, source='') {

  if(typeof mrna_protein === 'string' || mrna_protein instanceof String)
  {//if we got a string try and make a sequence out of it
    mrna_protein = protein.protein(mrna_protein);
  }
  else
  {//otherwise check it is already a seq object
    if(typeof(mrna_protein) !== "object"){
      throw("protein must be object");
    }
    if(!(mrna_protein && Object.keys(mrna_protein).length === 0 && mrna_protein.constructor === Object))
    {
      if(! mrna_protein.identity || mrna_protein.identity !== 'protein')
      {
        throw("Input protein object must have protein identity");
      }
    }
  }

  if(typeof mrna_sequence === 'string' || mrna_sequence instanceof String)
  {//if we got a string try and make a sequence out of it
     mrna_sequence = sequence.sequence(mrna_sequence, 'nucleotide');
  }
  else
  {//otherwise check it is already a seq object
    if(typeof(mrna_sequence) !== "object"){
      throw("mrna_sequence must be object");
    }
    if(! mrna_sequence.identity || mrna_sequence.identity !== 'sequence')
    {
       throw("Input mrna_sequence object must have sequence identity");
    }
  }

  if(! (typeof source === 'string' || source instanceof String))
  {
     throw("source must be a string");
  }
  let prot_data = {
    identity: "mrna",
    sequence: mrna_sequence,
    protein: mrna_protein,
    source: source,
    annotations: annotations,
  };
  return(prot_data);
};

module.exports = {
  mrna: mrna,
};
