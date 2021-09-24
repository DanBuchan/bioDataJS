/*jshint esversion: 6 */
const expect = require('chai').expect;
let bd = require('../genome.js');
let gbd = require('../chromosome.js');

this.annotations = {GO: ["GO:000012", "GO:1223423"]};
source = "file.csv";
chrome = gbd.chromosome();
genome_test = bd.genome();
genome_full = bd.genome([chrome, chrome, chrome], this.annotations, source, 'homo', 'sapiens');


///////////
// Tests //
///////////
describe('Genome: general sequence generation', () => {
  it('should raise invalid chromosome types', () => {
    expect(() => bd.genome("123")).to.throw("chromosome must be array of chromosome objects");
  });
  it('should raise invalid chromosome types', () => {
    expect(() => bd.genome([123,'ABC'])).to.throw("chromosome array must contain only chromosome type: error at  0 1");
  });

  it('genome should have a string source', () => {
    expect(() => bd.genome(undefined, undefined, 123)).to.throw("genome source must be a string");
  });
  it('genome should have a string source', () => {
    expect(() => bd.genome(undefined, undefined, undefined, 123, 'this')).to.throw("genome genus must be a string");
  });
  it('genome should have a string source', () => {
    expect(() => bd.genome(undefined, undefined, undefined, 'this', 123)).to.throw("genome species must be a string");
  });

  it('genome should have empty annotations', () => {
      expect(genome_test.source).to.be.empty;
  });
  it('genome should have empty annotations', () => {
      expect(genome_test.annotations).to.be.empty;
  });
  it('genome should have populated annotations', () => {
      expect(genome_full.annotations).to.eql(this.annotations);
  });
  it('genome should have populated source', () => {
      expect(genome_full.source).to.eql(source);
  });
  it('genome should have populated genus', () => {
      expect(genome_full.genus).to.eql('homo');
  });
  it('genome should have populated species', () => {
      expect(genome_full.species).to.eql('sapiens');
  });

});
