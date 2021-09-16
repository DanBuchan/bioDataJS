/*jshint esversion: 6 */
const expect = require('chai').expect;
let bd = require('../protein.js');
let bds = require('../sequence.js');

///////////////
// Fixtures //
//////////////
seq_annotations = {GO: ["GO:000012", "GO:1223423"]};
source = "file.csv";
prot = bd.protein('ARNBD');
aaseq = bds.sequence('aaseq');
prot2 = bd.protein(aaseq, seq_annotations, source)
///////////
// Tests //
///////////
describe('Protein: general sequence generation', () => {
  it('should raise invalid seq types', () => {
    expect(() => bd.protein(2)).to.throw("seq must be object");
    expect(() => bd.protein([])).to.throw("Input seq must have sequence identity");
  });
  it('should have a string source', () => {
    expect(() => bd.protein("ARNBD", undefined, 123)).to.throw("source must be a string");
  });
  it('should have empty annotations', () => {
      expect(prot.source).to.be.empty;
  });
  it('should have empty annotations', () => {
      expect(prot.annotations).to.be.empty;
  });
  it('should have populated annotations', () => {
      expect(prot2.annotations).to.eql(seq_annotations);
  });
  it('should have populated annotations', () => {
      expect(prot2.source).to.eql(source);
  });
  it('should make a sequence object when given a string', () => {
      expect(prot.sequence.identity).to.equal("sequence");
  });

});
