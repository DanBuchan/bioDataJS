/*jshint esversion: 6 */
const expect = require('chai').expect;
let bd = require('../mrna.js');
let bds = require('../sequence.js');
let bdp = require('../protein.js');

///////////////
// Fixtures //
//////////////
seq_annotations = {GO: ["GO:000012", "GO:1223423"]};
source = "file.csv";
prot = bdp.protein('ARNBD');
mrnaseq = bds.sequence('ATUG', "nucleotide");
mrna = bd.mrna(mrnaseq);
mrna_full = bd.mrna('ATUG', prot, seq_annotations, source);
mrna_prot = bd.mrna('ATUG', "PPP", seq_annotations, source);

///////////
// Tests //
///////////
describe('MRNA: general sequence generation', () => {
  it('should raise invalid mrna_sequence types', () => {
    expect(() => bd.mrna(2)).to.throw("mrna_sequence must be object");
    expect(() => bd.mrna([])).to.throw("Input mrna_sequence object must have sequence identity");
  });

  it('mrna should have a string source', () => {
    expect(() => bd.mrna("ATUG", undefined, undefined, 123)).to.throw("source must be a string");
  });
  it('mrna should have empty annotations', () => {
      expect(mrna.source).to.be.empty;
  });
  it('mrna should have empty annotations', () => {
      expect(mrna.annotations).to.be.empty;
  });
  it('mrna should have populated annotations', () => {
      expect(mrna_full.annotations).to.eql(seq_annotations);
  });
  it('mrna should have populated source', () => {
      expect(mrna_full.source).to.eql(source);
  });
  it('mrna should make a sequence object when given a string', () => {
      expect(mrna_full.sequence.identity).to.equal("sequence");
  });
  it('mrna should make a nucleotide sequence object when given a string', () => {
      expect(mrna_full.sequence.type).to.equal("nucleotide");
  });

  it('mrna should make a protein object when given protein seq', () => {
      expect(mrna_prot.protein.identity).to.equal("protein");
  });

});
