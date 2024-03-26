import { SCPageSearch } from '../elements/sc-page-search.js';

import { expect } from '@esm-bundle/chai';


describe('SCPageSearch', () => {
  it('should return url from urlMap when uid exists in urlMap', () => {
    const instance = new SCPageSearch();
    const item = { uid: 'discourses', url: 'testUrl' };

    const result = instance._calculateLink(item);

    expect(result).to.equal('/discourses-guide-sujato');
  });

  it('should return item.url when uid does not exist in urlMap', () => {
    const instance = new SCPageSearch();
    const item = { uid: 'testUid', url: 'testUrl' };

    const result = instance._calculateLink(item);

    expect(result).to.equal('testUrl');
  });

  it('should return true when suttaId represents multiple suttas', () => {
    const instance = new SCTextBilara();
    const result = instance.checkIfMultiSutta('test.1-10');
    expect(result).to.be.true;
  });

  it('should return false when suttaId represents a single sutta', () => {
    const instance = new SCTextBilara();
    const result = instance.checkIfMultiSutta('test.1');
    expect(result).to.be.false;
  });
});