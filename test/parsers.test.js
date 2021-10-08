/*jshint esversion: 6 */
import { expect } from 'chai';
import { assert } from 'chai';
import { fetchData } from '../src/psipred_parsers.js';
import { parseHFormat } from '../src/psipred_parsers.js';
import fs from 'fs';

// fixtures
let horiz_uri = "http://bioinf.cs.ucl.ac.uk/psipred/api/submissions/4730b94e-2513-11ec-836b-00163e100d53.horiz";
let ss2_uri = "http://bioinf.cs.ucl.ac.uk/psipred/api/submissions/4730b94e-2513-11ec-836b-00163e100d53.ss2";
let horiz_path = "/home/dbuchan/Code/bioDataJs/files/4730b94e-2513-11ec-836b-00163e100d53.horiz";
let ss2 = "../files/4730b94e-2513-11ec-836b-00163e100d53.ss2";
let horiz_data = fs.readFileSync("./files/horiz_test.txt", 'utf8');
horiz_data = JSON.parse(horiz_data);
//fs.writeFileSync('./test.txt', JSON.stringify(parsed_data, null, 2) , 'utf-8');

//let horiz_data = await fetchData(horiz_uri);
//console.log(horiz_data);

// Hi there are no tests for the fetch stuff in here.
// At the time of writing time was pressed and mocking URLs was
// a bit out of scope
describe('Parsers: parseHFormat tests', () => {
  it('should parse file', () => {
    return parseHFormat(horiz_path).then(result => {assert.deepEqual(result, horiz_data)});
  });
  // I have no idea how to test exceptiohs with chai in async functions
  // it('should fail on bad URI', () => {
  //   await expect(() => parseHFormat("http://thisisadummyurithatisfordummies.com")).to.throw("Fetch error. Malformed URI?");
  // });

});
