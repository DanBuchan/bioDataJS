/*jshint esversion: 6 */
import { expect } from 'chai';
import { gene } from '../src/gene.js';
import { transcript } from '../src/transcript.js';


let annotations = {GO: ["GO:000012", "GO:1223423"]};
let source = "file.csv";
let trans = transcript('ATUGGGGG');
let gene_test = gene('ATUG');
let gene_full = gene('ATUG', [trans, trans, trans], annotations, source);


///////////
// Tests //
///////////
describe('Gene: general sequence generation', () => {
  it('should raise invalid gene_sequence types', () => {
    expect(() => gene(2)).to.throw("gene_sequence must be object");
  });
  it('should raise invalid transcript types', () => {
    expect(() => gene("ATUGGG", 123)).to.throw("transcripts must be array of transcript objects");
  });
  it('should raise invalid transcript types', () => {
    expect(() => gene("ATUGGG", [123,'ABC'])).to.throw("transcript array must contain only transcript type: error at  0 1");
  });

  it('gene should have a string source', () => {
    expect(() => gene("ATUG", undefined, undefined, 123)).to.throw("gene source must be a string");
  });
  it('gene should have empty annotations', () => {
      expect(gene_test.source).to.be.empty;
  });
  it('genne should have empty annotations', () => {
      expect(gene_test.annotations).to.be.empty;
  });
  it('gene should have populated annotations', () => {
      expect(gene_full.annotations).to.eql(annotations);
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
