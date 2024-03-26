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
});