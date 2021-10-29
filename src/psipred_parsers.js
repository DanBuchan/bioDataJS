/*jshint esversion: 6 */
import fetch from 'node-fetch';
import { sequence } from '../src/sequence.js';
import fs from 'fs';

export async function fetchData(uri)
{
  const uriData = fetch(uri)
  .then(
    function(response) {
      console.log(response.status);
      console.log(uri);
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
