/*jshint esversion: 6 */
import { expect } from 'chai';
import { chromosome } from '../src/chromosome.js';
import { gene } from '../src/gene.js';

//let bd = require('../lib/chromosome.js');
//let gbd = require('../lib/gene.js');

let local_annotations = {GO: ["GO:000012", "GO:1223423"]};
let source = "file.csv";
let test_gene = gene('ATUGGGGG');
let chrome_test = chromosome();
let chrome_full = chromosome([test_gene, test_gene, test_gene], local_annotations, source, 'plasmid');


///////////
// Tests //
///////////
describe('Chromosome: general sequence generation', () => {
  it('should raise invalid gene types', () => {
    expect(() => chromosome("123")).to.throw("genes must be array of gene objects");
  });
  it('should raise invalid gene types', () => {
    expect(() => chromosome([123,'ABC'])).to.throw("gene array must contain only gene type: error at  0 1");
  });
  it('should raise invalid chromosome types', () => {
    expect(() => chromosome(undefined, undefined, undefined, "argle")).to.throw("Chromosome type must be one of 'chromosome','plasmid', 'mitochondrial' or 'chloroplast'");
  });

  it('chromosome should have a string source', () => {
    expect(() => chromosome(undefined, undefined, 123)).to.throw("chromosome source must be a string");
  });
  it('chromosome should have empty annotations', () => {
      expect(chrome_test.source).to.be.empty;
  });
  it('chromosome should have empty annotations', () => {
      expect(chrome_test.annotations).to.be.empty;
  });
  it('chromosome should have populated annotations', () => {
      expect(chrome_full.annotations).to.eql(local_annotations);
  });
  it('chromosome should have populated source', () => {
      expect(chrome_full.source).to.eql(source);
  });

});
