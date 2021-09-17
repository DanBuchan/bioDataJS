/*jshint esversion: 6 */
const expect = require('chai').expect;
let bd = require('../sequence.js');

///////////////
// Fixtures //
//////////////
seq_annotations = {GO: ["GO:000012", "GO:1223423"]};
source = "file.csv";
residues = [ { residue: 'A', type: 'aminoacid', annotations: {}, identity: "residue" },
     { residue: 'R', type: 'aminoacid', annotations: {}, identity: "residue" },
     { residue: 'N', type: 'aminoacid', annotations: {}, identity: "residue" },
     { residue: 'B', type: 'aminoacid', annotations: {}, identity: "residue" },
     { residue: 'D', type: 'aminoacid', annotations: {}, identity: "residue" } ];
res_annotations = [{disorder: true},{Helix: true},{strand: true},{coil: true}]
aaseq = bd.sequence('ARNBD', "aminoacid");
nucseq = bd.sequence('ATCG', "nucleotide", seq_annotations, source,
                     res_annotations);

///////////
// Tests //
///////////
describe('Sequence: general sequence generation', () => {
  it('should raise with invalid seq type', () => {
      expect(() => bd.sequence('ARN', "argle")).to.throw("Sequence type is not valid. Must be one of 'aminoacid' or 'nucleotide'");
  });
  it('should raise with invalid residue_annotations', () => {
      expect(() => bd.sequence('AR', undefined, undefined, undefined, {})).to.throw("sequence residue_annotations must be an array");
  });
  it('should raise with invalid residue_annotations', () => {
      expect(() => bd.sequence('AR', undefined, undefined, 12, undefined)).to.throw("sequence source must be a string");
  });

  it('should have empty annotations', () => {
      expect(aaseq.annotations).to.be.empty;
  });
  it('should have empty source', () => {
      expect(aaseq.source).to.be.empty;
  });
  it('should have an annotation object', () => {
      expect(nucseq.annotations).to.equal(seq_annotations);
  });
  it('should have empty source', () => {
      expect(nucseq.source).to.equal(source);
  });
  it('should have residue data', () => {
      expect(aaseq.residues).to.eql(residues);
  });
  it('should populate residue annotatsion correctly', () => {
      expect(nucseq.residues[2].annotations).to.eql({ strand: true });
  });
  it('should have matching sequence and residue types, nuc', () => {
      expect(nucseq.type).to.eql(nucseq.residues[3].type);
  });
});

describe('Sequence: amino acid sequence generation', () => {
    it('should return aminoacid', () => {
        expect(aaseq.type).to.equal("aminoacid");
    });
    it('should return ARNBD', () => {
        expect(aaseq.sequence).to.equal("ARNBD");
    });
    it('should raise with invalid aa seq', () => {
        expect(() => bd.sequence('ARNBJ', "aminoacid")).to.throw("Input seq contains invalid amino acid characters");
    });
});

describe('Sequence: nucletide sequence generation', () => {
    it('should return nucleotide', () => {
        expect(nucseq.type).to.equal("nucleotide");
    });
    it('should return ATCGCG', () => {
        expect(nucseq.sequence).to.equal("ATCG");
    });
    it('should raise with invalid nuc seq', () => {
        expect(() => bd.sequence('ATCTP', "nucleotide")).to.throw("Input seq contains invalid nucleotide characters");
    });
});
