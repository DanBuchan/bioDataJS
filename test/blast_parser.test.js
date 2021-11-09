/*jshint esversion: 6 */
import { expect } from 'chai';
import { assert } from 'chai';
import { parseBlastFormat } from '../src/blast_parser.js';
import fs from 'fs';

let blast_file = "./files/test.pbls";
let seq = "MAFSAEDVLKEYDRRRRMEALLLSLYYPNDRKLLDYKEWSPPRVQVECPKAPVEWNNPPSEKGLIVGHFSGIKYKGEKAQASEVDVNKMCCWVSKFKDAMRRYQGIQTCKIPGKVLSDLDAKIKAYNLTVEGVEGFVRYSRVTKQHVAAFLKELRHSKQYENVNLIHYILTDKRVDIQHLEKDLVKDFKALVESAHRMRQGHMINVKYILYQLLKKHGHGPDGPDILTVKTGSKGVLYDDSFRKIYTDLGWKFTPL"

// let blast_parsed = await parseBlastFormat(seq, blast_file);
// fs.writeFileSync('./files/blast_test.txt', JSON.stringify(blast_parsed, null, 2) , 'utf-8');

let blast_data = fs.readFileSync("./files/blast_test.txt", 'utf8');
blast_data = JSON.parse(blast_data);
//console.log(uniprot_data);
//console.log(uniprot_parsed);
describe('Parsers: parse blast files tests', () => {
  it('should parse blast file', () => {
    return parseBlastFormat(seq, blast_file).then(result => {assert.equal(JSON.stringify(result, null, 2), JSON.stringify(blast_data, null, 2))});
  });
});
