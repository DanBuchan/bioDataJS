/*jshint esversion: 6 */
let sequence = require('./sequence.js');

const genome = function(chromosome=[], annotations={}, source='', genus='', species='') {

  if(Array.isArray(chromosome))
  {
    let pass = true;
    let failed = '';
    chromosome.forEach(function(item, i){
      if(item.identity !== 'chromosome'){
        failed = failed+" "+i;
        pass = false;
      }
    });
    if(! pass)
    {
      throw("chromosome array must contain only chromosome type: error at "+failed);
    }
  }
  else {
    throw("chromosome must be array of chromosome objects");
  }

  if(! (typeof source === 'string' || source instanceof String))
  {
     throw("genome source must be a string");
  }
  if(! (typeof genus === 'string' || genus instanceof String))
  {
     throw("genome genus must be a string");
  }
  if(! (typeof species === 'string' || species instanceof String))
  {
     throw("genome species must be a string");
  }
  let genome_data = {
    identity: "chromosome",
    chromosome: chromosome,
    source: source,
    annotations: annotations,
    genus: genus,
    species: species,
  };
  return(genome_data);
};

module.exports = {
  genome: genome,
};
