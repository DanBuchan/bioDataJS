/*jshint esversion: 6 */
import fetch from 'node-fetch';
import { sequence } from '../src/sequence.js';
import { protein } from '../src/protein.js';
import { fetchData } from '../src/psipred_parsers.js';
import { readData } from '../src/psipred_parsers.js';
import fs from 'fs';

export async function parseUniprotFormat(location)
{
  let data;
  if(location.startsWith("http"))
  {
    data = await fetchData(location);
  }
  else {
    data = readData(location);
  }
  let protein_features = {};
  protein_features.database_refs = {};
  let sequence_features = [];
  let residue_features = [];
  let seq = '';
  let ref_count = -1;
  let feature_count = -1;
  let feat_name = '';
  let feat_start = 0;
  let feat_stop = 0;
  let feat_evidence = '';
  let feat_note = '';
  let seq_found = false;
  const lines = data.split("\n");
  lines.forEach(function(line, i){
    let line_data = line.substring(5);

    if(line.startsWith("ID")){
      let entries = line_data.split(/\s+/);
      protein_features.uniprotID = entries[0];
    }
    if(line.startsWith("AC")){
      line_data = line_data.slice(0, -1);
      let entries = line_data.split(/;\s+/);
      protein_features.accession = entries;
    }
    if(line.startsWith("DT")){}
    if(line.startsWith("DE")){
      if(! protein_features.description){protein_features.description=line_data+"\n";return;}
      protein_features.description+=line_data+"\n";
    }
    if(line.startsWith("GN")){
      if(line_data.startsWith("Name")){
        let matches = line_data.match(/Name=(.+?)\s+.+/);
        protein_features.gene_name = matches[1];
        matches = line_data.match(/\{(.+)\}/);
        if(matches){
          let evidences = matches[1].split(", ");
          protein_features.gene_evidence = evidences;
        }
      }
      if(line_data.startsWith("Synonyms")){
        line_data = line_data.slice(0, -1);
        let matches = line_data.match(/Synonyms=(.+)/);
        if(matches){
          let synonyms = matches[1].split(", ");
          protein_features.gene_synonyms = synonyms;
        }
      }

    }
    if(line.startsWith("OS")){
      line_data = line_data.slice(0, -1);
      protein_features.organism_nane = line_data;
    }
    if(line.startsWith("OG")){
      protein_features.organelle = line_data;
    }
    if(line.startsWith("OC")){
      line_data = line_data.slice(0, -1);
      if(! protein_features.taxonomy){protein_features.taxonomy=line_data+"; "; return;}
      protein_features.taxonomy+=line_data;
    }
    if(line.startsWith("OX")){
      line_data = line_data.slice(0, -1);
      let matches = line_data.match(/NCBI_TaxID=(.+)/);
      if(matches){
        protein_features.ncbi_taxaID = matches[1];
      }
    }
    if(line.startsWith("OH")){
      protein_features.organism_host = line_data;
    }
    if(line.startsWith("RN")){
      if(ref_count == -1){
        protein_features.references = [];
      }
      ref_count+=1;
      protein_features.references[ref_count] = '';
    }
    if(line.startsWith("RP")){
       protein_features.references[ref_count] += line_data+"\n";
    }
    if(line.startsWith("RC")){
      protein_features.references[ref_count] += line_data+"\n";
    }
    if(line.startsWith("RX")){
      protein_features.references[ref_count] += line_data+"\n";
    }
    if(line.startsWith("RG")){
      protein_features.references[ref_count] += line_data+"\n";
    }
    if(line.startsWith("RA")){
      protein_features.references[ref_count] += line_data+"\n";
    }
    if(line.startsWith("RT")){
      protein_features.references[ref_count] += line_data+"\n";
    }
    if(line.startsWith("RL")){
      protein_features.references[ref_count] += line_data+"\n";
    }
    if(line.startsWith("CC")){
      if(! protein_features.comments){protein_features.comments=line_data+"\n"; return;}
      protein_features.comments+=line_data+"\n";
    }
    if(line.startsWith("DR")){
      let entries = line_data.split(/; /);
      if(! protein_features.database_refs[entries[0]]){
        protein_features.database_refs[entries[0]] = []
      }
      protein_features.database_refs[entries[0]].push(entries.slice(1));
    }
    if(line.startsWith("PE")){
      line_data = line_data.slice(0, -1);
      protein_features.protein_existence = line_data;
    }
    if(line.startsWith("KW")){
      line_data = line_data.slice(0, -1);
      if(! protein_features.keywords){protein_features.keywords=line_data+"; "; return;}
      protein_features.keywords+=line_data;
    }
    if(line.startsWith("FT")){
      let entries = line_data.split(/\s+/);
      if(line_data[0] !== " "){
        if(feature_count !== -1){
          sequence_features[feature_count] = {feature_name: feat_name, start: feat_start, stop: feat_stop, evidence: feat_evidence, note: feat_note};
        }
        feat_name = entries[0];
        let coords = entries[1].split("..");
        feat_start = coords[0];
        feat_stop = coords[1];
        feat_evidence = '';
        feat_note = '';
        feature_count+=1;
      }
      else {
        let matches = line_data.match(/\/evidence="(.+)"/);
        if(matches){ feat_evidence=matches[1];}
        matches = line_data.match(/\/note="(.+)"/);
        if(matches){ feat_note=matches[1];}
      }
    }
    if(line.startsWith("SQ")){
      seq_found = true;
      return;
    }
    if(line.startsWith("//")){
      seq_found = false;
    }
    if(seq_found){seq+=line_data;}
    // console.log(line);
  });
  if(feat_name.length > 0){sequence_features[feature_count] = {feature_name: feat_name, start: feat_start, stop: feat_stop, evidence: feat_evidence, note: feat_note};}
  seq = seq.replace(/ /g, '');
  sequence_features.forEach(function(feature){
    for(var i = feature.start-1; i < feature.stop; i+=1){
      residue_features[i] = {annotation: feature.feature_name, evidence: feature.evidence, note: feature.note}
    }
  });
  //console.log(residue_features);
  let seq_data = sequence(seq, undefined, sequence_features, location, residue_features);
  let protein_data = protein(seq_data, protein_features, location);
  return(protein_data);
}
