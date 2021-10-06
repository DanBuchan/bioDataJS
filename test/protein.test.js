/*jshint esversion: 6 */
const expect = require('chai').expect;
let bd = require('../src/protein.js');
let bds = require('../src/sequence.js');

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
  it('protein should raise invalid seq types', () => {
    expect(() => bd.protein(2)).to.throw("protein seq must be object");
  });
  it('protein should have a string source', () => {
    expect(() => bd.protein("ARNBD", undefined, 123)).to.throw("protein source must be a string");
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
    expect(() => bd.protein([aaseq, 12])).to.throw("sequence array must contain only sequence type: error at  1");
  });

});
