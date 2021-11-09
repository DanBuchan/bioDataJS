/*jshint esversion: 6 */
import fetch from 'node-fetch';
import { sequence } from '../src/sequence.js';
import { fetchData } from '../src/psipred_parsers.js';
import { readData } from '../src/psipred_parsers.js';
import fs from 'fs';

export async function parseBlastFormat(seq, location)
{
  let data;
  if(location.startsWith("http"))
  {
    data = await fetchData(location);
  }
  else {
    data = readData(location);
  }
  let parsed = {results: []};

  let results_found = false;
  let align_count = -1;
  const lines = data.split("\n");
  lines.forEach(function(line){
    if(line.startsWith(">")){results_found = false; align_count+=1;}
    if(line.startsWith("Sequences producing significant alignments:")){results_found = true; return;}
    if(results_found && line.length !==0){
      let description = line.substring(0, 70);
      let data = line.substring(70).split(/\s+/);
      let match = description.match(/^(.+?)\s/);
      let hit = '';
      if(match){hit = match[1];}
      parsed.results.push({hit_name: hit, description: description, score: data[0], evalue: data[1], alignment: ''});
    }
    if(align_count > -1){
      parsed.results[align_count].alignment += line+"\n";
    }
  });
  let seq_data = sequence(seq, undefined, parsed, location, undefined);
  return(seq_data);
}
