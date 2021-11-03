/*jshint esversion: 6 */
import { expect } from 'chai';
import { assert } from 'chai';
import { fetchData } from '../src/psipred_parsers.js';
import { parseHFormat } from '../src/psipred_parsers.js';
import { parseSS2Format } from '../src/psipred_parsers.js';
import { parseCombFormat } from '../src/psipred_parsers.js';
import { parsePbdatFormat } from '../src/psipred_parsers.js';
import { parseMemsatSVMFormat } from '../src/psipred_parsers.js';
import { parsePResultsFormat } from '../src/psipred_parsers.js';
import { parseAlignFormat } from '../src/psipred_parsers.js';
import { parsePsicovFormat } from '../src/psipred_parsers.js';
import { parseDMPFormat } from '../src/psipred_parsers.js';
import { parseMPLipidFormat } from '../src/psipred_parsers.js';
import { parseMPContactFormat } from '../src/psipred_parsers.js';
import { parseDomThPResultsFormat } from '../src/psipred_parsers.js';
import { parseDompredFormat } from '../src/psipred_parsers.js';
import { parseFeatcfgFormat } from '../src/psipred_parsers.js';
import { parseFFPredGOFormat } from '../src/psipred_parsers.js';
import { parseMetpredFormat } from '../src/psipred_parsers.js';
import { parseHSPredFormat } from '../src/psipred_parsers.js';

import fs from 'fs';

// fixtures
let test_seq = "MLELLPTAVEGVSQAQITGRPEWIWLALGTALMGLGTLYFLVKGMGVSDPDAKKFYAITTLVPAIAFTMYLSMLLGYGLTMVPFGGEQNPIYWARYADWLFTTPLLLLDLALLVDADQGTILALVGADGIMIGTGLVGALTKVYSYRFVWWAISTAAMLYILYVLFFGFTSKAESMRPEVASTFKVLRNVTVVLWSAYPVVWLI";
let pdb_seq_chain_A = "HKCDITLQEIIKTLNSLTEQKTLCTELTVTDIFAASKNTTEKETFCRAATVLRQFYSHHEKDTRCLGATAQQFHRHKQLIRFLKRLDRNLWGLAGLNSCPVKEANQSTLENFLERLKTIMREKYSKCSS";
let pdb_seq_chain_B = "FKVLQEPTCVSDYMSISTCEWKMNGPTNCSTELRLLYQLVFLLSEAHTCIPENNGGAGCVCHLLMDDVVSADNYTLDLWAGQQLLWKGSFKPSEHVKPRAPGNLTVHTNVSDTLLLTWSNPYPPDNYLYNHLTYAVNIWSENDPADFRIYNVTYLEPSLRIAASTLKSGISYRARVRAWAQAYNTTWSEWSPSTKWHNSYREPFEQH";

let horiz_uri = "http://bioinf.cs.ucl.ac.uk/psipred/api/submissions/4730b94e-2513-11ec-836b-00163e100d53.horiz";
let horiz_path = "./files/4730b94e-2513-11ec-836b-00163e100d53.horiz";
let ss2_uri = "http://bioinf.cs.ucl.ac.uk/psipred/api/submissions/4730b94e-2513-11ec-836b-00163e100d53.ss2";
let ss2_path = "./files/4730b94e-2513-11ec-836b-00163e100d53.ss2";
let comb_path = "./files/eb125942-2a94-11ec-af0e-00163e100d53.comb";
let pbdat_path = "./files/eb125942-2a94-11ec-af0e-00163e100d53.pbdat";
let memsatsvm_path = "./files/d7144d02-2ab1-11ec-a378-00163e100d53.memsat_svm";
let align_path = "./files/313aa70c-2da7-11ec-aa34-00163e100d53.align";
let presults_path = "./files/313aa70c-2da7-11ec-aa34-00163e100d53.presults";
let psicov_path = "./files/b51d08e0-2ffe-11ec-aeb1-00163e100d53.psicov";
let con_path = "./files/b51d08e0-2ffe-11ec-aeb1-00163e100d53.con";
let mp_lipid_path = "./files/619784c2-38cb-11ec-aa34-00163e100d53_LIPID_EXPOSURE.results";
let mp_contact_path = "./files/619784c2-38cb-11ec-aa34-00163e100d53_CONTACT_DEF1.results";
let dom_presults_path = "./files/fe33df72-3af8-11ec-99aa-00163e100d53.presults";
let dompred_path = "./files/2bc9da94-3bd6-11ec-9bef-00163e100d53.boundary";
let featcfg_path = "./files/4b22ec6e-3bdb-11ec-ba13-00163e100d53.featcfg";
let ffpredgo_path = "./files/4b22ec6e-3bdb-11ec-ba13-00163e100d53.full_raw";
let metpred_path = "./files/20eb4812-3c9c-11ec-9faa-00163e100d53.Metpred";
let hspred_path = "./files/5a4ec54c-3ca7-11ec-b12b-00163e100d53_hs-pred.out";

// let hformat_parsed = await parseHFormat(horiz_path);
// fs.writeFileSync('./files/horiz_test.txt', JSON.stringify(hformat_parsed, null, 2) , 'utf-8');
// let ss2_parsed = await parseSS2Format(ss2_path);
// fs.writeFileSync('./files/ss2_test.txt', JSON.stringify(ss2_parsed, null, 2) , 'utf-8');
// let comb_parsed = await parseCombFormat(comb_path);
// fs.writeFileSync('./files/comb_test.txt', JSON.stringify(comb_parsed, null, 2) , 'utf-8');
// let pbdat_parsed = await parsePbdatFormat(pbdat_path);
// fs.writeFileSync('./files/pbdat_test.txt', JSON.stringify(pbdat_parsed, null, 2) , 'utf-8');
// let memsatsvm_parsed = await parseMemsatSVMFormat(test_seq, memsatsvm_path);
// fs.writeFileSync('./files/memsatsvm_test.txt', JSON.stringify(memsatsvm_parsed, null, 2) , 'utf-8');
// let presults_parsed = await parsePResultsFormat(test_seq, presults_path);
// fs.writeFileSync('./files/genthreader_presults_test.txt', JSON.stringify(presults_parsed, null, 2) , 'utf-8');
// let align_parsed = await parseAlignFormat(test_seq, align_path);
// fs.writeFileSync('./files/genthreader_align_test.txt', JSON.stringify(align_parsed, null, 2) , 'utf-8');
// let psicov_parsed = await parsePsicovFormat(test_seq, psicov_path);
// fs.writeFileSync('./files/dmp_test.txt', JSON.stringify(psicov_parsed, null, 2) , 'utf-8');
// let con_parsed = await parsePsicovFormat(test_seq, con_path);
// fs.writeFileSync('./files/con_test.txt', JSON.stringify(con_parsed, null, 2) , 'utf-8');
// let mp_lipid_parsed = await parseMPLipidFormat(test_seq, mp_lipid_path);
// fs.writeFileSync('./files/mp_lipid_test.txt', JSON.stringify(mp_lipid_parsed, null, 2) , 'utf-8');
// let mp_contact_parsed = await parseMPContactFormat(test_seq, mp_contact_path);
// fs.writeFileSync('./files/mp_contact_test.txt', JSON.stringify(mp_contact_parsed, null, 2) , 'utf-8');
// let dom_presults_parsed = await parseDomThPResultsFormat(test_seq, dom_presults_path);
// fs.writeFileSync('./files/dom_presults_test.txt', JSON.stringify(dom_presults_parsed, null, 2) , 'utf-8');
// let dompred_parsed = await parseDompredFormat(test_seq, dompred_path);
// fs.writeFileSync('./files/dompred_test.txt', JSON.stringify(dompred_parsed, null, 2) , 'utf-8');
// let featcfg_parsed = await parseFeatcfgFormat(featcfg_path);
// fs.writeFileSync('./files/featcfg_test.txt', JSON.stringify(featcfg_parsed, null, 2) , 'utf-8');
// let ffpredgo_parsed = await parseFFPredGOFormat(test_seq, ffpredgo_path);
// fs.writeFileSync('./files/ffpredgo_test.txt', JSON.stringify(ffpredgo_parsed, null, 2) , 'utf-8');
// let metpred_parsed = await parseMetpredFormat(pdb_seq_chain_A, "CU", metpred_path);
// fs.writeFileSync('./files/metpred_test.txt', JSON.stringify(metpred_parsed, null, 2) , 'utf-8');
let hspred_parsed = await parseHSPredFormat(pdb_seq_chain_A, "A", hspred_path);
fs.writeFileSync('./files/hspred_test.txt', JSON.stringify(hspred_parsed, null, 2) , 'utf-8');

let horiz_data = fs.readFileSync("./files/horiz_test.txt", 'utf8');
horiz_data = JSON.parse(horiz_data);
let ss2_data = fs.readFileSync("./files/ss2_test.txt", 'utf8');
ss2_data = JSON.parse(ss2_data);
let comb_data = fs.readFileSync("./files/comb_test.txt", 'utf8');
comb_data = JSON.parse(comb_data);
let pbdat_data = fs.readFileSync("./files/pbdat_test.txt", 'utf8');
pbdat_data = JSON.parse(pbdat_data);
let memsatsvm_data = fs.readFileSync("./files/memsatsvm_test.txt", 'utf8');
memsatsvm_data = JSON.parse(memsatsvm_data);
let presults_data = fs.readFileSync("./files/genthreader_presults_test.txt", 'utf8');
presults_data = JSON.parse(presults_data);
let align_data = fs.readFileSync("./files/genthreader_align_test.txt", 'utf8');
align_data = JSON.parse(align_data);
let psicov_data = fs.readFileSync("./files/dmp_test.txt", 'utf8');
psicov_data = JSON.parse(psicov_data);
let con_data = fs.readFileSync("./files/con_test.txt", 'utf8');
con_data = JSON.parse(con_data);
let mp_lipid_data = fs.readFileSync("./files/mp_lipid_test.txt", 'utf8');
mp_lipid_data = JSON.parse(mp_lipid_data);
let mp_contact_data = fs.readFileSync("./files/mp_contact_test.txt", 'utf8');
mp_contact_data = JSON.parse(mp_contact_data);
let dom_presults_data = fs.readFileSync("./files/dom_presults_test.txt", 'utf8');
dom_presults_data = JSON.parse(dom_presults_data);
let dompred_data = fs.readFileSync("./files/dompred_test.txt", 'utf8');
dompred_data = JSON.parse(dompred_data);
let featcfg_data = fs.readFileSync("./files/featcfg_test.txt", 'utf8');
featcfg_data = JSON.parse(featcfg_data);
let ffpredgo_data = fs.readFileSync("./files/ffpredgo_test.txt", 'utf8');
ffpredgo_data = JSON.parse(ffpredgo_data);
let metpred_data = fs.readFileSync("./files/metpred_test.txt", 'utf8');
metpred_data = JSON.parse(metpred_data);
let hspred_data = fs.readFileSync("./files/hspred_test.txt", 'utf8');
hspred_data = JSON.parse(hspred_data);

// let memsatsvm_parsed = await parseMemsatSVMFormat(memsatsvm_path);
// Hi there are no tests for the fetch stuff in here.
// At the time of writing time was pressed and mocking URLs was
// a bit out of scope
describe('Parsers: parse PSIPRED files tests', () => {
  // it('should parse horiz file', () => {
  //   return parseHFormat(horiz_path).then(result => {assert.deepEqual(result, horiz_data)});
  // });
  // it('should parse ss2 file', () => {
  //    return parseSS2Format(ss2_path).then(result => {assert.deepEqual(result, ss2_data)});
  // });
  // it('should parse comb file', () => {
  //    return parseCombFormat(comb_path).then(result => {assert.deepEqual(result, comb_data)});
  // });
  // it('should parse pbdat file', () => {
  //    return parsePbdatFormat(pbdat_path).then(result => {assert.deepEqual(result, pbdat_data)});
  // });
  // it('should parse memsatsvm file', () => {
  //    return parseMemsatSVMFormat(test_seq, memsatsvm_path).then(result => {assert.deepEqual(result, memsatsvm_data)});
  // });
  // it('should parse presults file', () => {
  //    return parsePResultsFormat(test_seq, presults_path).then(result => {assert.deepEqual(result, presults_data)});
  // });
  // it('should parse align file', () => {
  //   return parseAlignFormat(test_seq, align_path).then(result => {assert.deepEqual(result, align_data)});
  // });
  // it('should parse psicov file', () => {
  //   return parsePsicovFormat(test_seq, psicov_path).then(result => {assert.deepEqual(result, psicov_data)});
  // });
  // it('should parse dmp con file', () => {
  //   return parseDMPFormat(test_seq, psicov_path).then(result => {assert.deepEqual(result, psicov_data)});
  // });
  // it('should parse MP lipid exposure file', () => {
  //   return parseMPLipidFormat(test_seq, mp_lipid_path).then(result => {assert.deepEqual(result, mp_lipid_data)});
  // });
  // it('should parse MP Contact exposire file', () => {
  //   return parseMPContactFormat(test_seq, mp_contact_path).then(result => {assert.deepEqual(result, mp_contact_data)});
  // });
  // it('should parse DOM presults file', () => {
  //    return parseDomThPResultsFormat(test_seq, dom_presults_path).then(result => {assert.deepEqual(result, dom_presults_data)});
  // });
  // it('should parse Dompred file', () => {
  //    return parseDompredFormat(test_seq, dompred_path).then(result => {assert.deepEqual(result, dompred_data)});
  // });
  // it('should parse Featcfg file', () => {
  //    return parseFeatcfgFormat(featcfg_path).then(result => {assert.deepEqual(result, featcfg_data)});
  // });
  // it('should parse ffpredgo file', () => {
  //    return parseFFPredGOFormat(test_seq, ffpredgo_path).then(result => {assert.deepEqual(result, ffpredgo_data)});
  // });
  // it('should parse metpred file', () => {
  //    return parseMetpredFormat(pdb_seq_chain_A, "CU", metpred_path).then(result => {assert.deepEqual(result, metpred_data)});
  // });
  it('should parse HSPred file', () => {
     return parseHSPredFormat(pdb_seq_chain_A, "A", hspred_path).then(result => {assert.deepEqual(result, hspred_data)});
  });

  // have no idea how to test exceptiohs with chai in async functions
  // it('should fail on bad URI', () => {
  //   await expect(() => parseHFormat("http://thisisadummyurithatisfordummies.com")).to.throw("Fetch error. Malformed URI?");
  // });

});
