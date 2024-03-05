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
});