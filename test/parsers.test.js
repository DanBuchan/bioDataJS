/*jshint esversion: 6 */
import { expect } from 'chai';
import { assert } from 'chai';
import { fetchData } from '../src/psipred_parsers.js';
import { parseHFormat } from '../src/psipred_parsers.js';
import { parseSS2Format } from '../src/psipred_parsers.js';
import fs from 'fs';

// fixtures
let horiz_uri = "http://bioinf.cs.ucl.ac.uk/psipred/api/submissions/4730b94e-2513-11ec-836b-00163e100d53.horiz";
let ss2_uri = "http://bioinf.cs.ucl.ac.uk/psipred/api/submissions/4730b94e-2513-11ec-836b-00163e100d53.ss2";
let horiz_path = "./files/4730b94e-2513-11ec-836b-00163e100d53.horiz";
let ss2_path = "./files/4730b94e-2513-11ec-836b-00163e100d53.ss2";
let horiz_data = fs.readFileSync("./files/horiz_test.txt", 'utf8');
horiz_data = JSON.parse(horiz_data);
let ss2_data = fs.readFileSync("./files/ss2_test.txt", 'utf8');
ss2_data = JSON.parse(ss2_data);

//fs.writeFileSync('./test.txt', JSON.stringify(parsed_data, null, 2) , 'utf-8');

//let horiz_data = await fetchData(horiz_uri);
//console.log(horiz_data);

//let ss2_data = await fetchData(ss2_uri);

//let ss2_parsed = await parseSS2Format(ss2);
//fs.writeFileSync('./ss2_test.txt', JSON.stringify(ss2_data, null, 2) , 'utf-8');

// Hi there are no tests for the fetch stuff in here.
// At the time of writing time was pressed and mocking URLs was
// a bit out of scope
describe('Parsers: parse PSIPRED files tests', () => {
  it('should parse file', () => {
    return parseHFormat(horiz_path).then(result => {assert.deepEqual(result, horiz_data)});
  });
  it('should parse file', () => {
     return parseSS2Format(ss2_path).then(result => {assert.deepEqual(result, ss2_data)});
  });


  // I have no idea how to test exceptiohs with chai in async functions
  // it('should fail on bad URI', () => {
  //   await expect(() => parseHFormat("http://thisisadummyurithatisfordummies.com")).to.throw("Fetch error. Malformed URI?");
  // });

});
