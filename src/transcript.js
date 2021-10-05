/*jshint esversion: 6 */
let rna = require('./rna.js');
let sequence = require('./sequence.js');

const transcript = function(transcript_sequence, rna=[], annotations={}, source='') {

  if(Array.isArray(rna))
  {
    let pass = true;
    let failed = '';
    rna.forEach(function(item, i){
      if(item.identity !== 'rna'){
        failed = failed+" "+i;
        pass = false;
      }
    });
    if(! pass)
    {
      throw("rna array must contain only rna type: error at "+failed);
    }
  }
  else {
    throw("rna must be array of rna objects");
  }

  if(typeof transcript_sequence === 'string' || transcript_sequence instanceof String)
  {//if we got a string try and make a sequence out of it
     transcript_sequence = sequence.sequence(transcript_sequence, 'nucleotide');
  }
  else
  {//otherwise check it is already a seq object
    if(typeof(transcript_sequence) !== "object"){
      throw("transcript_sequence must be object");
    }
    if(! transcript_sequence.identity || transcript_sequence.identity !== 'sequence')
    {
       throw("Input transcript_sequence object must have sequence identity");
    }
  }

  if(! (typeof source === 'string' || source instanceof String))
  {
     throw("transcript source must be a string");
  }

  let transcript_data = {
    identity: "transcript",
    sequence: transcript_sequence,
    rnas: rna,
    source: source,
    annotations: annotations,
  };
  return(transcript_data);
};

module.exports = {
  transcript: transcript,
};
