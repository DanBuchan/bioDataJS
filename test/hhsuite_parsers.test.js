/*jshint esversion: 6 */
import { expect } from 'chai';
import { assert } from 'chai';
import { parseHHSuiteFormat } from '../src/hhsuite_parsers.js';
import fs from 'fs';

let hhsuite_file = "./files/test_out.hhpred";
let seq = "MSGRGKQGGKARAKAKTRSSRAGLQFPVGRVHRLLRKGNYAERVGAGAPVYLAAVLEYLTAEILELAGNAARDNKKTRIIPRHLQLAIRNDEELNKLLGKVTIAQGGVLPNIQAVLLPKKTESHHKAKG";
// console.log("hi");
// let hhsuite_parsed = await parseHHSuiteFormat(seq, hhsuite_file);
// fs.writeFileSync('./files/hhsuite_test.txt', JSON.stringify(hhsuite_parsed, null, 2) , 'utf-8');
let hhsuite_data = fs.readFileSync("./files/hhsuite_test.txt", 'utf8');
hhsuite_data = JSON.parse(hhsuite_data);

;
describe('Parsers: parse hhsuite files tests', () => {
  it('should parse hhsuite file', () => {
    return parseHHSuiteFormat(seq, hhsuite_file).then(result => {assert.equal(JSON.stringify(result, null, 2), JSON.stringify(hhsuite_data, null, 2))});
  });
});
