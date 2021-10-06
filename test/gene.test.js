/*jshint esversion: 6 */
const expect = require('chai').expect;
let bd = require('../src/gene.js');
let tbd = require('../src/transcript.js');

this.annotations = {GO: ["GO:000012", "GO:1223423"]};
source = "file.csv";
trans = tbd.transcript('ATUGGGGG');
gene_test = bd.gene('ATUG');
gene_full = bd.gene('ATUG', [trans, trans, trans], this.annotations, source);


///////////
// Tests //
///////////
describe('Gene: general sequence generation', () => {
  it('should raise invalid gene_sequence types', () => {
    expect(() => bd.gene(2)).to.throw("gene_sequence must be object");
  });
  it('should raise invalid transcript types', () => {
    expect(() => bd.gene("ATUGGG", 123)).to.throw("transcripts must be array of transcript objects");
  });
  it('should raise invalid transcript types', () => {
    expect(() => bd.gene("ATUGGG", [123,'ABC'])).to.throw("transcript array must contain only transcript type: error at  0 1");
  });

  it('gene should have a string source', () => {
    expect(() => bd.gene("ATUG", undefined, undefined, 123)).to.throw("gene source must be a string");
  });
  it('gene should have empty annotations', () => {
      expect(gene_test.source).to.be.empty;
  });
  it('genne should have empty annotations', () => {
      expect(gene_test.annotations).to.be.empty;
  });
  it('gene should have populated annotations', () => {
      expect(gene_full.annotations).to.eql(this.annotations);
  });
  it('gene should have populated source', () => {
      expect(gene_full.source).to.eql(source);
  });
  it('gene should make a sequence object when given a string', () => {
      expect(gene_full.sequence.identity).to.equal("sequence");
  });
  it('gene should make a nucleotide sequence object when given a string', () => {
      expect(gene_full.sequence.type).to.equal("nucleotide");
  });


});
