/*jshint esversion: 6 */
import { expect } from 'chai';
import { assert } from 'chai';
import { parseFastaFormat } from '../src/sequence_parsers.js';
import fs from 'fs';

let fasta_file = "./files/test.fa";

// let fasta_parsed = await parseFastaFormat(fasta_file);
// fs.writeFileSync('./files/fasta_test.txt', JSON.stringify(fasta_parsed, null, 2) , 'utf-8');
let fasta_data = fs.readFileSync("./files/fasta_test.txt", 'utf8');
fasta_data = JSON.parse(fasta_data);
//console.log(uniprot_data);
//console.log(uniprot_parsed);
describe('Parsers: parse sequence files tests', () => {
  it('should parse fasta file', () => {
    return parseFastaFormat(fasta_file).then(result => {assert.equal(JSON.stringify(result, null, 2), JSON.stringify(fasta_data, null, 2))});
  });
});
