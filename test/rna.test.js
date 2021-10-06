/*jshint esversion: 6 */
import { expect } from 'chai';
import { rna } from '../src/rna.js';
import { sequence } from '../src/sequence.js';
import { protein } from '../src/protein.js';

///////////////
// Fixtures //
//////////////
let seq_annotations = {GO: ["GO:000012", "GO:1223423"]};
let source = "file.csv";
let prot = protein('ARNBD');
let rnaseq = sequence('ATUG', "nucleotide");
let test_rna = rna(rnaseq);
let rna_full = rna('ATUG', prot, seq_annotations, source);
let rna_prot = rna('ATUG', "PPP", seq_annotations, source, "trna");

///////////
// Tests //
///////////
describe('RNA: general sequence generation', () => {
  it('should raise invalid rna_sequence types', () => {
    expect(() => rna(2)).to.throw("rna_sequence must be object");
  });

  it('rna should have a string source', () => {
    expect(() => rna("ATUG", undefined, undefined, 123)).to.throw("rna source must be a string");
  });
  it('rna should have empty annotations', () => {
      expect(test_rna.source).to.be.empty;
  });
  it('rna should have empty annotations', () => {
      expect(test_rna.annotations).to.be.empty;
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
    expect(() => rna([rnaseq, 12])).to.throw("rna_sequence array must contain only sequence type: error at  1");
  });


});
