/*jshint esversion: 6 */
import fetch from 'node-fetch';
import { sequence } from '../src/sequence.js';
import { fetchData } from '../src/psipred_parsers.js';
import { readData } from '../src/psipred_parsers.js';
import fs from 'fs';

export async function parseHHSuiteFormat(seq, location)
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
  let seq_found = false;
  let seq_count = 0;
  lines.forEach(function(line){
    if(line.startsWith("Query")){
      let datum = line.substring(14,line.length);
      parsed.query = datum;
      parsed.hits = [];
    }
    if(line.startsWith("Match_columns")){
      let datum = line.substring(14,line.length);
      parsed.match_columns = datum;
    }
    if(line.startsWith("No_of_seqs")){
      let datum = line.substring(14,line.length);
      parsed.no_of_seqs = datum;
    }
    if(line.startsWith("Neff")){
      let datum = line.substring(14,line.length);
      parsed.neff = datum;
    }
    if(line.startsWith("Searched_HMMs")){
      let datum = line.substring(14,line.length);
      parsed.searched_hmms = datum;
    }
    if(line.startsWith("Date")){
      let datum = line.substring(14,line.length);
      parsed.date = datum;
    }
    if(line.startsWith("Command")){
      let datum = line.substring(14,line.length);
      parsed.command = datum;
    }
    if(line.match(/^\s*\d+\s/)){
       //console.log(line);
       let count = line.substring(0,4);
       count = count.replace(/\s+/, '');
       let hit_name = line.substring(4,36);
       let line_stats = line.substring(36);
       let stats = line_stats.split(/\s+/);
       let query_coords = stats[6].split("-");
       let template_coords = stats[7].split("-");
       parsed.hits[count-1] = {hit_name: hit_name, prob: stats[0],
                               e_value: stats[1], p_value: stats[2],
                               score: stats[3], ss: stats[4],
                               cols: stats[5], query_start: query_coords[0],
                               query_stop: query_coords[1],
                               template_start: template_coords[0],
                               template_stop: template_coords[1],
                               hmm: stats[8], alignment: ''};
    }
    if(line.startsWith("No ")){
      let seq_number = line.split(/\s+/);
      seq_count = seq_number[1]-1;
      seq_found = true;
      // console.log(line, seq_count);
      return;
    }
    if(seq_found){
      parsed.hits[seq_count].alignment+=line+"\n";
    }
  });

  //console.log(parsed);
  let seq_data = sequence(seq, undefined, parsed, location, undefined);
  return(seq_data);
}
