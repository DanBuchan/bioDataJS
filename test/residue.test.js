/*jshint esversion: 6 */
const expect = require('chai').expect;
let bd = require('../residue.js');

///////////////
// Fixtures //
//////////////
annotations_input = {DISOPRED: true};
aares = bd.residue(residue='W', type="aminoacid");
nucres = bd.residue(residue='A', type="nucleotide",
                     annotations=annotations_input);

///////////
// Tests //
///////////
describe('general residue generation', () => {
  it('should raise with invalid seq type', () => {
      expect(() => bd.residue(residue='A', type="argle")).to.throw("Residue type is not valid. Must be one of 'aminoacid' or 'nucleotide'");
  });
  it('should raise with too many characters', () => {
      expect(() => bd.residue(residue='AB', type="aminoacid")).to.throw("Residues must be single characters");
  });
  it('should raise with too few chracters', () => {
      expect(() => bd.residue(residue='', type="aminoacid")).to.throw("Residues must be single characters");
  });

  it('should raise with too few chracters', () => {
      expect(() => bd.residue(residue='', type="aminoacid")).to.throw("Residues must be single characters");
  });

  it('should raise with incorrect annotation types', () => {
      expect(() => bd.residue(residue='A', type="aminoacid", annotations="hi")).to.throw("Residues must be single characters");
  });

  it('should have empty annotations', () => {
      expect(aares.annotations).to.be.empty;
  });
  it('should have as annotation object', () => {
      expect(nucres.annotations).to.equal(annotations_input);
  });
  it('annotations must be object', () => {
      expect(nucres.annotations).to.be.an("object");
  });
});

describe('amino acid residue generation', () => {
    it('should return aminoacid', () => {
        expect(aares.type).to.equal("aminoacid");
    });
    it('should return W', () => {
        expect(aares.residue).to.equal("W");
    });
    it('should raise with invalid aa seq', () => {
        expect(() => bd.residue(residue='J', type="aminoacid")).to.throw("Input residue contains invalid amino acid characters");
    });
});

describe('nucletide residue generation', () => {
    it('should return nucleotide', () => {
        expect(nucres.type).to.equal("nucleotide");
    });
    it('should return ATCGCG', () => {
        expect(nucres.residue).to.equal("A");
    });
    it('should raise with invalid nuc seq', () => {
        expect(() => bd.residue(residue='P', type="nucleotide")).to.throw("Input residue contains invalid nucleotide characters");
    });
});
