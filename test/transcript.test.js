/*jshint esversion: 6 */
import { expect } from 'chai';
import { transcript } from '../src/transcript.js';
import { rna } from '../src/rna.js';

let annotations = {GO: ["GO:000012", "GO:1223423"]};
let source = "file.csv";
let test_rna = rna('ATUGGGGG');
let trans = transcript('ATUG');
let trans_full = transcript('ATUG', [test_rna, test_rna, test_rna], annotations, source);


///////////
// Tests //
///////////
describe('Transcript: general sequence generation', () => {
  it('should raise invalid rna_sequence types', () => {
    expect(() => transcript(2)).to.throw("transcript_sequence must be object");
  });
  it('should raise invalid rna types', () => {
    expect(() => transcript("ATUGGG", 123)).to.throw("rna must be array of rna objects");
  });
  it('should raise invalid rna types', () => {
    expect(() => transcript("ATUGGG", [123,'ABC'])).to.throw("rna array must contain only rna type: error at  0 1");
  });

  it('transcript should have a string source', () => {
    expect(() => transcript("ATUG", undefined, undefined, 123)).to.throw("transcript source must be a string");
  });
  it('transcript should have empty annotations', () => {
      expect(trans.source).to.be.empty;
  });
  it('transcript should have empty annotations', () => {
      expect(trans.annotations).to.be.empty;
  });
  it('transcript should have populated annotations', () => {
      expect(trans_full.annotations).to.eql(annotations);
  });
  it('transcript should have populated source', () => {
      expect(trans_full.source).to.eql(source);
  });
  it('transcript should make a sequence object when given a string', () => {
      expect(trans_full.sequence.identity).to.equal("sequence");
  });
  it('transcript should make a nucleotide sequence object when given a string', () => {
      expect(trans_full.sequence.type).to.equal("nucleotide");
  });


});
