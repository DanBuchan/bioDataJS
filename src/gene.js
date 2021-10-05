/*jshint esversion: 6 */
let sequence = require('./sequence.js');

const gene = function(gene_sequence, transcripts=[], annotations={}, source='') {

  if(Array.isArray(transcripts))
  {
    let pass = true;
    let failed = '';
    transcripts.forEach(function(item, i){
      if(item.identity !== 'transcript'){
        failed = failed+" "+i;
        pass = false;
      }
    });
    if(! pass)
    {
      throw("transcript array must contain only transcript type: error at "+failed);
    }
  }
  else {
    throw("transcripts must be array of transcript objects");
  }

  if(typeof gene_sequence === 'string' || gene_sequence instanceof String)
  {//if we got a string try and make a sequence out of it
     gene_sequence = sequence.sequence(gene_sequence, 'nucleotide');
  }
  else
  {//otherwise check it is already a seq object
    if(typeof(gene_sequence) !== "object"){
      throw("gene_sequence must be object");
    }
    if(! gene_sequence.identity || gene_sequence.identity !== 'sequence')
    {
       throw("Input gene_sequence object must have sequence identity");
    }
  }

  if(! (typeof source === 'string' || source instanceof String))
  {
     throw("gene source must be a string");
  }

  let gene_data = {
    identity: "gene",
    sequence: gene_sequence,
    transcripts: transcripts,
    source: source,
    annotations: annotations,
  };
  return(gene_data);
};

module.exports = {
  gene: gene,
};
