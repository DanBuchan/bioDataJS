/*jshint esversion: 6 */
const expect = require('chai').expect;
let bd = require('../chromosome.js');
let gbd = require('../gene.js');

this.annotations = {GO: ["GO:000012", "GO:1223423"]};
source = "file.csv";
gene = gbd.gene('ATUGGGGG');
chrome_test = bd.chromosome();
chrome_full = bd.chromosome([gene, gene, gene], this.annotations, source);


///////////
// Tests //
///////////
describe('Chromosome: general sequence generation', () => {
  it('should raise invalid gene types', () => {
    expect(() => bd.chromosome("123")).to.throw("genes must be array of gene objects");
  });
  it('should raise invalid gene types', () => {
    expect(() => bd.chromosome([123,'ABC'])).to.throw("gene array must contain only gene type: error at  0 1");
  });

  it('chromosome should have a string source', () => {
    expect(() => bd.chromosome(undefined, undefined, 123)).to.throw("chromosome source must be a string");
  });
  it('chromosome should have empty annotations', () => {
      expect(chrome_test.source).to.be.empty;
  });
  it('chromosome should have empty annotations', () => {
      expect(chrome_test.annotations).to.be.empty;
  });
  it('chromosome should have populated annotations', () => {
      expect(chrome_full.annotations).to.eql(this.annotations);
  });
  it('chromosome should have populated source', () => {
      expect(chrome_full.source).to.eql(source);
  });

});
