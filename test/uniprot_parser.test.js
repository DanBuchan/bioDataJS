/*jshint esversion: 6 */
import { expect } from 'chai';
import { assert } from 'chai';
import { parseUniprotFormat } from '../src/uniprot_parser.js';
import fs from 'fs';

let uniprot_file = "./files/P12544.txt";

let uniprot_parsed = await parseUniprotFormat(uniprot_file);
fs.writeFileSync('./files/uniprot_test.txt', JSON.stringify(uniprot_parsed, null, 2) , 'utf-8');
let uniprot_data = fs.readFileSync("./files/uniprot_test.txt", 'utf8');
uniprot_data = JSON.parse(uniprot_data);

describe('Parsers: parse UNIPROT files tests', () => {
  it('should parse uniprot file', () => {
    return parseUniprotFormat(uniprot_file).then(result => {assert.deepEqual(result, uniprot_data)});
  });
});
