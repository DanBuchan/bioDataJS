/*jshint esversion: 6 */
import fetch from 'node-fetch';
import { sequence } from '../src/sequence.js';
import { fetchData } from '../src/psipred_parsers.js';
import { readData } from '../src/psipred_parsers.js';
import fs from 'fs';

export async function parseFastaFormat(location)
{
  let data;
  let seq = '';
  if(location.startsWith("http"))
  {
    data = await fetchData(location);
  }
  else {
    data = readData(location);
  }
  let parsed = {};
  const lines = data.split("\n");
  lines.forEach(function(line){
    let info_matches = line.match(/^>(.+?)\s(.*)/);
    //console.log(info_matches);
    if(info_matches){
      parsed.seq_id = info_matches[1];
      if(info_matches[2]){
        parsed.info = info_matches[2];
      }
    }
    else{
      seq += line;
    }
  });
  let seq_data = sequence(seq, undefined, parsed, location, undefined);
  return(seq_data);
}
