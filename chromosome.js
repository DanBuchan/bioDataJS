/*jshint esversion: 6 */
let sequence = require('./sequence.js');

const chromosome = function(genes=[], annotations={}, source='') {

  if(Array.isArray(genes))
  {
    let pass = true;
    let failed = '';
    genes.forEach(function(item, i){
      if(item.identity !== 'gene'){
        failed = failed+" "+i;
        pass = false;
      }
    });
    if(! pass)
    {
      throw("gene array must contain only gene type: error at "+failed);
    }
  }
  else {
    throw("genes must be array of gene objects");
  }

  if(! (typeof source === 'string' || source instanceof String))
  {
     throw("chromosome source must be a string");
  }
  let chromosome_data = {
    identity: "chromosome",
    genes: genes,
    source: source,
    annotations: annotations,
  };
  return(chromosome_data);
};

module.exports = {
  chromosome: chromosome,
};
