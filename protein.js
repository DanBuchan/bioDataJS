/*jshint esversion: 6 */
let sequence = require('./sequence.js');

// sequence : a sequence object creadted by db.sequence()
// annoations: an objects of key:value pairs. Of annotations for the mRNA
// source: A strong the defines where the data revord came from (i.e. a file
//         name or URI
const protein = function(seq, annotations={}, source='') {
  let prot = seq;

  // TODO: check if seq that has arrived is an array and if so
  // ensure each item has the identity of sequence
  // and then skip the other tests

  if(typeof prot === 'string' || prot instanceof String)
  {//if we got a string try and make a sequence out of it
    prot = sequence.sequence(prot);
  }
  else
  {//otherwise check it is already a seq object
    if(typeof(prot) !== "object"){
      throw("protein seq must be object");
    }
    if(! prot.identity || prot.identity !== 'sequence')
    {
       throw("Input protein seq must have sequence identity");
    }
  }
  if(! (typeof source === 'string' || source instanceof String))
  {
     throw("protein source must be a string");
  }
  let prot_data = {
    identity: "protein",
    sequence: prot,
    source: source,
    annotations: annotations,
  };
  return(prot_data);
};

module.exports = {
  protein: protein,
};
