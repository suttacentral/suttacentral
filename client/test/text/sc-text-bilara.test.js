import { SCTextBilara } from '../../elements/text/sc-text-bilara.js';
import { expect } from '@esm-bundle/chai';
import sinon from "../../node_modules/sinon/pkg/sinon-esm.js";

describe('SCTextBilara', () => {
  it('should return "latin" when paliScript does not exist', () => {
    const instance = new SCTextBilara();
    instance.paliScript = null;

    const result = instance._scriptFunctionName();

    expect(result).to.equal('latin');
  });

  it('should return paliScript with the first letter capitalized when paliScript exists', () => {
    const instance = new SCTextBilara();
    instance.paliScript = 'testScript';

    const result = instance._scriptFunctionName();

    expect(result).to.equal('TestScript');
  });

  it('should return true when suttaId represents multiple suttas', () => {
    const instance = new SCTextBilara();
    let result = instance.checkIfMultiSutta('test.1-10');
    expect(result).to.be.true;

    result = instance.checkIfMultiSutta('an2.21-31');
    expect(result).to.be.true;
  });

  it('should return false when suttaId represents a single sutta', () => {
    const instance = new SCTextBilara();
    let result = instance.checkIfMultiSutta('test.1');
    expect(result).to.be.false;

    result = instance.checkIfMultiSutta('pli-tv-vb2.1');
    expect(result).to.be.false;

    result = instance.checkIfMultiSutta('dn1');
    expect(result).to.be.false;

    result = instance.checkIfMultiSutta('mn1');
    expect(result).to.be.false;

    result = instance.checkIfMultiSutta('sn1.1');
    expect(result).to.be.false;
  });
});