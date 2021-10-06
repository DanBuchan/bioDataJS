/*jshint esversion: 6 */
import { expect } from 'chai';
import { protein } from '../src/protein.js';
import { sequence } from '../src/sequence.js';

///////////////
// Fixtures //
//////////////
let seq_annotations = {GO: ["GO:000012", "GO:1223423"]};
let source = "file.csv";
let prot = protein('ARNBD');
let aaseq = sequence('aaseq');
let prot2 = protein(aaseq, seq_annotations, source);
///////////
// Tests //
///////////
describe('Protein: general sequence generation', () => {
  it('protein should raise invalid seq types', () => {
    expect(() => protein(2)).to.throw("protein seq must be object");
  });
  it('protein should have a string source', () => {
    expect(() => protein("ARNBD", undefined, 123)).to.throw("protein source must be a string");
  });
  it('protein should have empty annotations', () => {
      expect(prot.source).to.be.empty;
  });
  it('protein should have empty annotations', () => {
      expect(prot.annotations).to.be.empty;
  });
  it('protein should have populated annotations', () => {
      expect(prot2.annotations).to.eql(seq_annotations);
  });
  it('protein should have populated annotations', () => {
      expect(prot2.source).to.eql(source);
  });
  it('protein should make a sequence object when given a string', () => {
      expect(prot.sequence.identity).to.equal("sequence");
  });
  it('protein should raise with invalid seq array', () => {
    expect(() => protein([aaseq, 12])).to.throw("sequence array must contain only sequence type: error at  1");
  });

});
