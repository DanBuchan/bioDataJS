/*jshint esversion: 6 */
const expect = require('chai').expect;
let bd = require('../rna.js');
let bds = require('../sequence.js');
let bdp = require('../protein.js');

///////////////
// Fixtures //
//////////////
seq_annotations = {GO: ["GO:000012", "GO:1223423"]};
source = "file.csv";
prot = bdp.protein('ARNBD');
rnaseq = bds.sequence('ATUG', "nucleotide");
rna = bd.rna(rnaseq);
rna_full = bd.rna('ATUG', prot, seq_annotations, source);
rna_prot = bd.rna('ATUG', "PPP", seq_annotations, source, "trna");

///////////
// Tests //
///////////
describe('RNA: general sequence generation', () => {
  it('should raise invalid rna_sequence types', () => {
    expect(() => bd.rna(2)).to.throw("rna_sequence must be object");
  });

  it('rna should have a string source', () => {
    expect(() => bd.rna("ATUG", undefined, undefined, 123)).to.throw("rna source must be a string");
  });
  it('rna should have empty annotations', () => {
      expect(rna.source).to.be.empty;
  });
  it('rna should have empty annotations', () => {
      expect(rna.annotations).to.be.empty;
  });
  it('rna should have populated annotations', () => {
      expect(rna_full.annotations).to.eql(seq_annotations);
  });
  it('rna should have populated source', () => {
      expect(rna_full.source).to.eql(source);
  });
  it('rna should make a sequence object when given a string', () => {
      expect(rna_full.sequence.identity).to.equal("sequence");
  });
  it('rna should make a nucleotide sequence object when given a string', () => {
      expect(rna_full.sequence.type).to.equal("nucleotide");
  });

  it('rna should make a protein object when given protein seq', () => {
      expect(rna_prot.protein.identity).to.equal("protein");
  });
  it('rna should raise with invalid seq array', () => {
    expect(() => bd.rna([rnaseq, 12])).to.throw("rna_sequence array must contain only sequence type: error at  1");
  });


});
