/*jshint esversion: 6 */
//let sequence = require('./sequence.js');
import { sequence } from './sequence.js';

export const chromosome = function(genes=[], annotations={}, source='', type="chromosome") {

  let re = /chromosome|plasmid|mitochondrial|chloroplast/ig;
  if(! type.match(re))
  {
    throw("Chromosome type must be one of 'chromosome','plasmid', 'mitochondrial' or 'chloroplast'");
  }

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
    type: type,
    genes: genes,
    source: source,
    annotations: annotations,
  };
  return(chromosome_data);
};
