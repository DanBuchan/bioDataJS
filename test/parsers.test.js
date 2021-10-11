/*jshint esversion: 6 */
import { expect } from 'chai';
import { assert } from 'chai';
import { fetchData } from '../src/psipred_parsers.js';
import { parseHFormat } from '../src/psipred_parsers.js';
import { parseSS2Format } from '../src/psipred_parsers.js';
import { parseCombFormat } from '../src/psipred_parsers.js';
import { parsePbdatFormat } from '../src/psipred_parsers.js';

import fs from 'fs';

// fixtures
let horiz_uri = "http://bioinf.cs.ucl.ac.uk/psipred/api/submissions/4730b94e-2513-11ec-836b-00163e100d53.horiz";
let horiz_path = "./files/4730b94e-2513-11ec-836b-00163e100d53.horiz";
let ss2_uri = "http://bioinf.cs.ucl.ac.uk/psipred/api/submissions/4730b94e-2513-11ec-836b-00163e100d53.ss2";
let ss2_path = "./files/4730b94e-2513-11ec-836b-00163e100d53.ss2";
let comb_path = "./files/eb125942-2a94-11ec-af0e-00163e100d53.comb";
let pbdat_path = "./files/eb125942-2a94-11ec-af0e-00163e100d53.pbdat";

let horiz_data = fs.readFileSync("./files/horiz_test.txt", 'utf8');
horiz_data = JSON.parse(horiz_data);
let ss2_data = fs.readFileSync("./files/ss2_test.txt", 'utf8');
ss2_data = JSON.parse(ss2_data);
let comb_data = fs.readFileSync("./files/comb_test.txt", 'utf8');
comb_data = JSON.parse(comb_data);
let pbdat_data = fs.readFileSync("./files/pbdat_test.txt", 'utf8');
pbdat_data = JSON.parse(pbdat_data);
// let pbdat_parsed = await parsePbdatFormat(pbdat_path);
// console.log(pbdat_parsed);
// fs.writeFileSync('./pbdat_test.txt', JSON.stringify(pbdat_parsed, null, 2) , 'utf-8');


let comb_parsed = await parseCombFormat(comb_path);
// Hi there are no tests for the fetch stuff in here.
// At the time of writing time was pressed and mocking URLs was
// a bit out of scope
describe('Parsers: parse PSIPRED files tests', () => {
  it('should parse horiz file', () => {
    return parseHFormat(horiz_path).then(result => {assert.deepEqual(result, horiz_data)});
  });
  it('should parse ss2 file', () => {
     return parseSS2Format(ss2_path).then(result => {assert.deepEqual(result, ss2_data)});
  });
  it('should parse comb file', () => {
     return parseCombFormat(comb_path).then(result => {assert.deepEqual(result, comb_data)});
  });
  it('should parse pbdat file', () => {
     return parsePbdatFormat(pbdat_path).then(result => {assert.deepEqual(result, pbdat_data)});
  });
  // I have no idea how to test exceptiohs with chai in async functions
  // it('should fail on bad URI', () => {
  //   await expect(() => parseHFormat("http://thisisadummyurithatisfordummies.com")).to.throw("Fetch error. Malformed URI?");
  // });

});
