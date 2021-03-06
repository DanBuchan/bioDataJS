/*jshint esversion: 6 */
import { expect } from 'chai';
import { residue } from '../src/residue.js';
///////////////
// Fixtures //
//////////////
let annotations_input = {DISOPRED: true};
let aares = residue('W', "aminoacid");
let nucres = residue('A', "nucleotide", annotations_input);

///////////
// Tests //
///////////
describe('Residue: general residue generation', () => {
  it('should raise with invalid seq type', () => {
      expect(() => residue('A', "argle")).to.throw("Residue type is not valid. Must be one of 'aminoacid' or 'nucleotide'");
  });
  it('should raise with too many characters', () => {
      expect(() => residue('AB', "aminoacid")).to.throw("Residues must be single characters");
  });
  it('should raise with too few chracters', () => {
      expect(() => residue('', "aminoacid")).to.throw("Residues must be single characters");
  });

  it('should raise with incorrect annotation types', () => {
      expect(() => residue('A', "aminoacid", "hi")).to.throw("Residue annotations must be object");
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

describe('Residue: amino acid residue generation', () => {
    it('should return aminoacid', () => {
        expect(aares.type).to.equal("aminoacid");
    });
    it('should return W', () => {
        expect(aares.residue).to.equal("W");
    });
    it('should raise with invalid aa seq', () => {
        expect(() => residue('J', "aminoacid")).to.throw("Input residue contains invalid amino acid characters");
    });
});

describe('Residue: nucletide residue generation', () => {
    it('should return nucleotide', () => {
        expect(nucres.type).to.equal("nucleotide");
    });
    it('should return ATCGCG', () => {
        expect(nucres.residue).to.equal("A");
    });
    it('should raise with invalid nuc seq', () => {
        expect(() => residue('P', "nucleotide")).to.throw("Input residue contains invalid nucleotide characters");
    });
});
