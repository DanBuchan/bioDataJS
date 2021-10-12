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
  let seq_data = sequence(aa, undefined, undefined, undefined, parsed);
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
  let seq_data = sequence(seq, undefined, undefined, undefined, parsed);
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
  let seq_data = sequence(seq, undefined, undefined, undefined, parsed);
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
    //console.log(entries);
    seq += entries[1];
    parsed.push({bindingState: entries[2], bindingScore: entries[3]});
  });
  //console.log(seq);
  let seq_data = sequence(seq, undefined, undefined, undefined, parsed);
  return(seq_data);
}

export async function parseMemsatSVMFormat(location)
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
  lines.slice(lines.length-11,lines.length-2).forEach(function(line, i){
    let fields = line.split(/\t+/);
    console.log(fields);
  });
  //console.log(seq);
  //let seq_data = sequence(seq, undefined, undefined, undefined, parsed);
  //return(seq_data);
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


function disopred_parse(data)
{

}

function dompred_parse(data)
{

}

function memsat_parse(data)
{

}

function genth_parse(data)
{

}

function ffpred_parse(data)
{

}

function contact_parse(data)
{

}
