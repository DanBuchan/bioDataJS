/*jshint esversion: 6 */
const expect = require('chai').expect;
let bd = require('../sequence.js');

///////////////
// Fixtures //
//////////////
annotations = {GO: ["GO:000012", "GO:1223423"]};
source = "file.csv";
residues = [ { residue: 'A', type: 'aminoacid', annotations: {} },
     { residue: 'R', type: 'aminoacid', annotations: {} },
     { residue: 'N', type: 'aminoacid', annotations: {} },
     { residue: 'B', type: 'aminoacid', annotations: {} },
     { residue: 'D', type: 'aminoacid', annotations: {} } ];
residue_annotations = [{},{},{},{}];
aaseq = bd.sequence(seq='ARNBD', type="aminoacid");
nucseq = bd.sequence(seq='ATCG', type="nucleotide",
                     annotations=annotations, source=source);

console.log(aaseq);
///////////
// Tests //
///////////
describe('general sequence generation', () => {
  it('should raise with invalid seq type', () => {
      expect(() => bd.sequence(seq='ARN', type="argle")).to.throw("Sequence type is not valid. Must be one of 'aminoacid' or 'nucleotide'");
  });
  it('should have empty annotations', () => {
      expect(aaseq.annotations).to.be.empty;
  });
  it('should have empty source', () => {
      expect(aaseq.source).to.be.empty;
  });
  it('should have an annotation object', () => {
      expect(nucseq.annotations).to.equal(annotations);
  });
  it('should have empty source', () => {
      expect(nucseq.source).to.equal(source)
  });
  it('should have residue data', () => {
      expect(aaseq.residues).to.eql(residues)
  });
});

describe('amino acid sequence generation', () => {
    it('should return aminoacid', () => {
        expect(aaseq.type).to.equal("aminoacid");
    });
    it('should return ARNBD', () => {
        expect(aaseq.sequence).to.equal("ARNBD");
    });
    it('should raise with invalid aa seq', () => {
        expect(() => bd.sequence(seq='ARNBJ', type="aminoacid")).to.throw("Input seq contains invalid amino acid characters");
    });
});

describe('nucletide sequence generation', () => {
    it('should return nucleotide', () => {
        expect(nucseq.type).to.equal("nucleotide");
    });
    it('should return ATCGCG', () => {
        expect(nucseq.sequence).to.equal("ATCG");
    });
    it('should raise with invalid nuc seq', () => {
        expect(() => bd.sequence(seq='ATCTP', type="nucleotide")).to.throw("Input seq contains invalid nucleotide characters");
    });
});
