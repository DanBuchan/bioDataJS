/*jshint esversion: 6 */
import fetch from 'node-fetch';
import { sequence } from '../src/sequence.js';
import fs from 'fs';

export async function fetchData(uri)
{
  const uriData = fetch(uri)
  .then(
    function(response) {
      // console.log(response.status);
      // console.log(uri);
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        throw("Unable to find file at provided URL" + response.status);
      }
      // Examine the text in the response
      if(response.headers.get("Content-Type") === 'application/octet-stream'){
        return response.arrayBuffer();
      }
      else if(response.headers.get("Content-Type") === 'text/plain'){

      }
    }
  )
  .then(function(data) {
    var enc = new TextDecoder("utf-8");
    return enc.decode(data);
  })
  .catch(function(err) {
    throw('Fetch error. Malformed URI?');
  });

  let output_data = await uriData;
  return output_data;
}

export function readData(location){
    return fs.readFileSync(location, 'utf8');
}

export async function parseHFormat(location)
{
  let data;
  if(location.startsWith("http"))
  {
    data = await fetchData(location);
  }
  else {
    data = readData(location);
  }
  let parsed = [];
  const lines = data.split("\n");
  let conf = '';
  let pred = '';
  let aa = '';
  let seq = '';
  lines.forEach(function(line, i){
    conf += stripLine(line, "Conf: ");
    pred += stripLine(line, "Pred: ");
    aa += stripLine(line, "  AA: ");
  });
  aa.split("").forEach(function(char, i){
    seq += aa[i];
    parsed.push({pred: pred[i], conf: Number(conf[i])});
  });
  let seq_data = sequence(aa, undefined, undefined, location, parsed);
  return(seq_data);
}

export async function parseSS2Format(location)
{
  let data;
  if(location.startsWith("http"))
  {
    data = await fetchData(location);
  }
  else {
    data = readData(location);
  }
  let parsed = [];
  let seq = '';
  const lines = data.split("\n");
  lines.slice(2,lines.length-1).forEach(function(line, i){
    line = line.trim();
    let entries = line.split(/\s+/);
    seq += entries[1];
    parsed.push({ss: entries[2], coilScore: entries[3], helixScore: entries[4], strandScore: entries[5]});
  });
  //console.log(seq);
  let seq_data = sequence(seq, undefined, undefined, location, parsed);
  return(seq_data);
}

export async function parseCombFormat(location)
{
  let data;
  if(location.startsWith("http"))
  {
    data = await fetchData(location);
  }
  else {
    data = readData(location);
  }
  let parsed = [];
  let seq = '';
  const lines = data.split("\n");
  lines.slice(3,lines.length-1).forEach(function(line, i){
    line = line.trim();
    let entries = line.split(/\s+/);
    //console.log(entries);
    seq += entries[1];
    parsed.push({disorderedState: entries[2], disoredScore: entries[3]});
  });
  //console.log(seq);
  let seq_data = sequence(seq, undefined, undefined, location, parsed);
  return(seq_data);
}

export async function parsePbdatFormat(location)
{
  let data;
  if(location.startsWith("http"))
  {
    data = await fetchData(location);
  }
  else {
    data = readData(location);
  }
  let parsed = [];
  let seq = '';
  const lines = data.split("\n");
  lines.slice(5,lines.length-1).forEach(function(line, i){
    line = line.trim();
    let entries = line.split(/\s+/);
    // console.log(entries);
    seq += entries[1];
    parsed.push({bindingState: entries[2], bindingScore: entries[3]});
  });
  //console.log(seq);
  let seq_data = sequence(seq, undefined, undefined, location, parsed);
  return(seq_data);
}

export async function parseMemsatSVMFormat(seq, location)
{
  let data;
  if(location.startsWith("http"))
  {
    data = await fetchData(location);
  }
  else {
    data = readData(location);
  }
  let parsed = [];
  const lines = data.split("\n");
  lines.slice(lines.length-11,lines.length-2).forEach(function(line, i){
    let fields = line.split(/\t+/);
    if(fields[0] === 'Signal peptide:'){
      parsed.push({signal_peptide: returnCoords(fields[1])});
    }
    if(fields[0] === 'Signal score:'){
      parsed.push({signal_score: fields[1]});
    }
    if(fields[0] === 'Topology:'){
      parsed.push({topology: returnCoords(fields[1])});
    }
    if(fields[0] === 'Re-entrant helices:'){
      parsed.push({reentrant_helices: returnCoords(fields[1])});
    }
    if(fields[0] === 'Pore-lining helices:'){
      parsed.push({pore_lining_helices: returnCoords(fields[1])});
    }
    if(fields[0] === 'Helix count:'){
      parsed.push({helix_count: fields[1]});
    }
    if(fields[0] === 'N-terminal:'){
      parsed.push({n_terminal: fields[1]});
    }
    if(fields[0] === 'Score:'){
      parsed.push({score: fields[1]});
    }
    if(fields[0] === 'Pore stoichiometry:'){
      parsed.push({pore_stoichiometry: fields[1]});
    }

  });
  let seq_data = sequence(seq, undefined, undefined, undefined, parsed);
  return(seq_data);
}

function returnCoords(coordinate_string){
  let coords = [];
  if(coordinate_string === 'Not detected.'){
    return(coords);
  }
  let pairs = coordinate_string.split(",");
  pairs.forEach(function(pair){
    let values = pair.split("-");
    coords.push({start: values[0], stop: values[1]});
  });
  return(coords);
}

function stripLine(line, leader)
{
  if(line.startsWith(leader))
  {
    let re = new RegExp("^"+leader);
    return(line.replace(re, ""));
  }
  else {
    return '';
  }
}

export async function parsePResultsFormat(seq, location)
{
  let data;
  if(location.startsWith("http"))
  {
    data = await fetchData(location);
  }
  else {
    data = readData(location);
  }
  let parsed = [];
  const lines = data.split("\n");
  lines.slice(5,lines.length-1).forEach(function(line, i){
    line = line.trim();
    let entries = line.split(/\s+/);
    //console.log(entries);
    parsed.push({conf: entries[0], net_score: entries[1],
                 p_value: entries[2], pairE: entries[3],
                 solvE: entries[4], aln_score: entries[5],
                 aln_length: entries[6], target_length: entries[7],
                 query_length: entries[8], fold: entries[9]});
  });
  //console.log(seq);
  let seq_data = sequence(seq, undefined, parsed, location, undefined);
  return(seq_data);
}

export async function parseDomThPResultsFormat(seq, location)
{
  let data;
  if(location.startsWith("http"))
  {
    data = await fetchData(location);
  }
  else {
    data = readData(location);
  }
  let parsed = [];
  const lines = data.split("\n");
  lines.slice(5,lines.length-1).forEach(function(line, i){
    line = line.trim();
    let entries = line.split(/\s+/);
    //console.log(entries);
    parsed.push({conf: entries[0], net_score: entries[1],
                 p_value: entries[2], pairE: entries[3],
                 solvE: entries[4], aln_score: entries[5],
                 aln_length: entries[6], target_length: entries[7],
                 query_length: entries[8], region_start: entries[9],
                 region_end: entries[10], domain: entries[11]});
  });
  //console.log(seq);
  let seq_data = sequence(seq, undefined, parsed, location, undefined);
  return(seq_data);
}

export async function parseAlignFormat(seq, location)
{
  let data;
  if(location.startsWith("http"))
  {
    data = await fetchData(location);
  }
  else {
    data = readData(location);
  }
  let parsed = [];
  const lines = data.split("\n");
  let alignment = [];
  lines.forEach(function(line, i){
     if(line.startsWith(">>>")){
       //console.log(alignment.slice(0, alignment.length-4));
       let name = alignment.slice(0, 1);
       name = name[0].substring(19, name[0].length-1);
       let align = alignment.slice(1, alignment.length-4);
       align = align.filter(e => e);
       let seq = Array(align.length/7).fill().map((element, index) => index);
       let hit_string = '';
       let query_string = '';
       let secondary_structure = '';
       seq.forEach(function(value, i){
         hit_string += align[i*7+2].slice(9);
         query_string += align[i*7+4].slice(9);
         secondary_structure += align[i*7+5].slice(9);
       });
       let pi = alignment.slice(alignment.length-4);
       pi = pi[0].substring(22, pi[0].length-1);
       let alignment_details = {hit_name: name, hit_string: hit_string,
                                query_string: query_string, percentage_id: pi};
       parsed.push(alignment_details);
       alignment=[];
       alignment.push(line);
       //process alignment and reset;
     }
     else
     {
       alignment.push(line);
     }
  });
  let seq_data = sequence(seq, undefined, parsed, location, undefined);
  return(seq_data);
}

export async function parsePsicovFormat(seq, location)
{
  let data;
  if(location.startsWith("http"))
  {
    data = await fetchData(location);
  }
  else {
    data = readData(location);
  }
  let parsed = [];
  const lines = data.split("\n");
  lines.slice(5,lines.length-1).forEach(function(line, i){
    line = line.trim();
    let entries = line.split(/\s+/);
    //console.log(entries);
    if(parsed[entries[0]]){
       parsed[entries[0]].push({contact_id: entries[1], score:entries[4]});
    }
    else    {
      parsed[entries[0]] = [{contact_id: entries[1], score:entries[4]}];
    }
  });
  //console.log(parsed);
  let seq_data = sequence(seq, undefined, undefined, location, parsed);
  return(seq_data);
}

export async function parseDMPFormat(seq, location)
{
  let data;
  if(location.startsWith("http"))
  {
    data = await fetchData(location);
  }
  else {
    data = readData(location);
  }
  let parsed = [];
  const lines = data.split("\n");
  lines.slice(5,lines.length-1).forEach(function(line, i){
    line = line.trim();
    let entries = line.split(/\s+/);
    //console.log(entries);
    if(parsed[entries[0]]){
       parsed[entries[0]].push({contact_id: entries[1], score:entries[4]});
    }
    else    {
      parsed[entries[0]] = [{contact_id: entries[1], score:entries[4]}];
    }
  });
  // console.log(parsed);
  let seq_data = sequence(seq, undefined, undefined, location, parsed);
  return(seq_data);
}

export async function parseMPLipidFormat(seq, location)
{
  let data;
  if(location.startsWith("http"))
  {
    data = await fetchData(location);
  }
  else {
    data = readData(location);
  }
  let parsed = [];
  const lines = data.split("\n");
  lines.slice(5,lines.length-1).forEach(function(line, i){
    line = line.trim();
    let entries = line.split(/\s+/);
    //console.log(entries);
    parsed[entries[0]] = {lipid_exposure_score: entries[2]};
  });
  //console.log(parsed);
  let seq_data = sequence(seq, undefined, undefined, location, parsed);
  return(seq_data);
}

export async function parseMPContactFormat(seq, location)
{
  let data;
  if(location.startsWith("http"))
  {
    data = await fetchData(location);
  }
  else {
    data = readData(location);
  }
  let parsed = [];
  const lines = data.split("\n");
  lines.slice(5,lines.length-1).forEach(function(line, i){
    line = line.trim();
    let entries = line.split(/\s+/);
    //console.log(entries);
    let pair = entries[0].split("-");
    if(parsed[pair[0]]){
       parsed[pair[0]].push({contact_id: pair[1], pairing:entries[1], score:entries[2]});
    }
    else    {
      parsed[pair[0]] = [{contact_id: pair[1], pairing:entries[1], score:entries[2]}];
    }
  });
  //console.log(parsed);
  let seq_data = sequence(seq, undefined, undefined, location, parsed);
  return(seq_data);
}

export async function parseDompredFormat(seq, location)
{
  let data;
  if(location.startsWith("http"))
  {
    data = await fetchData(location);
  }
  else {
    data = readData(location);
  }
  let parsed = {};
  let residue_parsed = [];
  const lines = data.split("\n");
  let domain_count = lines[1].substring(36);
  domain_count = domain_count.trim();
  let domains_string = lines[2].substring(41);
  domains_string = domains_string.trim();
  let boundaries = domains_string.split(/\s+/);
  //console.log(domain_count);
  //console.log(boundaries);
  boundaries.forEach(function(index){
    residue_parsed[index] = {domain_boundary: true};
  });
  //console.log(residue_parsed);
  parsed = {domain_count: domain_count, domain_boundaries: boundaries}
  let seq_data = sequence(seq, undefined, parsed, location, residue_parsed);
  return(seq_data);
}


export async function parseFeatcfgFormat(location)
{
  let data;
  if(location.startsWith("http"))
  {
    data = await fetchData(location);
  }
  else {
    data = readData(location);
  }
  let parsed = {};
  let residue_parsed = [];
  const lines = data.split("\n");
  let seq_entries = lines[0].split(/\s+/);
  let seq = seq_entries[1].trim();
  lines.forEach(function(line, i){
    line = line.trim();
    let entries = line.split(/\t+/);
    if(line.startsWith("DI")){
      if(parsed.disordered_region){
        parsed.disordered_region.push({start:entries[2], stop:entries[3]});
      }
      else{
        parsed.disordered_region = [{start:entries[2], stop:entries[3]}];
      }
      let iterator = Array.from({length: (entries[3] - entries[2])}, (v, k) => k+parseInt(entries[2])-1);
      iterator.forEach(function(index){
        if(!residue_parsed[index]){
          residue_parsed[index]={};
        }
        residue_parsed[index].disorder = true;
      });
    }
    if(line.startsWith("TM")){
      if(parsed.tm_region){
        parsed.tm_region.push({start:entries[2], stop:entries[3]});
      }
      else{
        parsed.tm_region = [{start:entries[2], stop:entries[3]}];
      }
      let iterator = Array.from({length: (entries[3] - entries[2])}, (v, k) => k+parseInt(entries[2])-1);
      iterator.forEach(function(index){
        if(!residue_parsed[index]){
          residue_parsed[index]={};
        }
        residue_parsed[index].tm_region = true;
      });
    }
    if(line.startsWith("NG")){
      if(parsed.nglyc_region){
        parsed.nglyc_region.push({start:entries[2], stop:entries[3], score: entries[4]});
      }
      else{
        parsed.nglyc_region = [{start:entries[2], stop:entries[3], score: entries[4]}];
      }
      let iterator = Array.from({length: (entries[3] - entries[2])}, (v, k) => k+parseInt(entries[2])-1);
      iterator.forEach(function(index){
        if(!residue_parsed[index]){
          residue_parsed[index]={};
        }
        residue_parsed[index].nglyc_region = true;
        residue_parsed[index].nglyc_region.score = entries[4];
      });
    }
    if(line.startsWith("OG")){
      if(parsed[entries[1]+"_region"]){
        parsed[entries[1]+"_region"].push({start:entries[2], stop:entries[3], score: entries[4]});
      }
      else{
        parsed[entries[1]+"_region"] = [{start:entries[2], stop:entries[3], score: entries[4]}];
      }
      let iterator = Array.from({length: (entries[3] - entries[2])}, (v, k) => k+parseInt(entries[2])-1);
      iterator.forEach(function(index){
        if(!residue_parsed[index]){
          residue_parsed[index]={};
        }
        residue_parsed[index][entries[1]+"_region"] = true;
        residue_parsed[index][entries[1]+"_region"].score = entries[4];
      });
    }
    if(line.startsWith("SS")){
      let type = '';
      if(entries[1] === 'psipredH'){
        type = "helix";
      }
      else
      {
        type = "strand";
      }
      if(parsed[type]){
        parsed[type].push({start:entries[2], stop:entries[3]});
      }
      else{
        parsed[type] = [{start:entries[2], stop:entries[3]}];
      }
      let iterator = Array.from({length: (entries[3] - entries[2])}, (v, k) => k+parseInt(entries[2])-1);
      iterator.forEach(function(index){
        if(!residue_parsed[index]){
          residue_parsed[index]={};
        }
        residue_parsed[index][type] = true;
      });
    }
    if(line.startsWith("PS")){
      if(entries[2] > 0)
      {
        //console.log(entries)
        if(parsed.cellular_location){
          parsed.cellular_location.push({location:entries[1], score: entries[2]});
        }
        else{
          parsed.cellular_location = [{location:entries[1], score: entries[2]}];
        }
      }
    }
    if(line.startsWith("SF")){
      if(parsed.physiochemical_features){
        parsed.physiochemical_features.push({name: entries[1], score: entries[2]});
      }
      else{
        parsed.physiochemical_features = [{name: entries[1], score: entries[2]}];
      }
    }
    if(line.startsWith("AA")){
      if(parsed.aa_percentage){
        parsed.aa_percentage.push({residue: entries[1], percentage: entries[3]});
      }
      else{
        parsed.aa_percentage = [{residue: entries[1], percentage: entries[3]}];
      }
    }
    if(line.startsWith("SP")){
      if(parsed.signal){
        parsed.signal.push(entries);
      }
      else{
        parsed.signal = [entries];
      }
    }
  });
  //console.log(parsed);
//  console.log(residue_parsed);
  let seq_data = sequence(seq, undefined, parsed, location, residue_parsed);
  return(seq_data);
}

export async function parseFFPredGOFormat(seq, location)
{
  let data;
  if(location.startsWith("http"))
  {
    data = await fetchData(location);
  }
  else {
    data = readData(location);
  }
  let parsed = {};
  const lines = data.split("\n");
  lines.slice(5,lines.length-1).forEach(function(line, i){
    line = line.trim();
    if(line.startsWith("#")){return;}
    let entries = line.split(/\t/);
    let ontology = entries[3];
    if(parsed[ontology]){
      parsed[entries[3]].push({GO_term: entries[1], score: entries[0], confidence: entries[2], term: entries[4] });
    }
    else
    {
      parsed[entries[3]] = [{GO_term: entries[1], score: entries[0], confidence: entries[2], term: entries[4]}];
    }
  });
  //console.log(parsed);
  let seq_data = sequence(seq, undefined, parsed, location, undefined);
  return(seq_data);
}

export async function parseMetpredFormat(seq, metal_ion, location)
{
  let data;
  if(location.startsWith("http"))
  {
    data = await fetchData(location);
  }
  else {
    data = readData(location);
  }
  let parsed = [];
  const lines = data.split("\n");
  let entries = lines[0].split(/\s/);
  for(var i = 0; i < entries.length; i+=3){
    let set = entries.slice(i, i+3);
    var num = set[2].match(/\d+/g);
    var letr = set[2].match(/[a-zA-Z]+/g);
    parsed[num[0]] = {metal_ion: metal_ion, score: set[1], residue_id: letr[0]}
  }
  let seq_data = sequence(seq, undefined, undefined, location, parsed);
  return(seq_data);
}

export async function parseHSPredFormat(seq, chain, location)
{
  let data;
  if(location.startsWith("http"))
  {
    data = await fetchData(location);
  }
  else {
    data = readData(location);
  }
  let parsed = [];
  const lines = data.split("\n");
  lines.forEach(function(line){
     let entries = line.split(/\s+/);
     if(entries.length < 3){return;}
     var num = entries[0].match(/\d+/g);
     var letr = entries[0].match(/[a-zA-Z]+/g);
     if(letr[0] === chain){
       parsed[num[0]] = {residue: entries[1], score: entries[2]};
     }
  });
  //console.log(parsed);
  let seq_data = sequence(seq, undefined, undefined, location, parsed);
  return(seq_data);
}
