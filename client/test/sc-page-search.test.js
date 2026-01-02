import { SCPageSearch } from '../elements/sc-page-search.js';

import {html, LitElement} from "lit";
import {elementUpdated, fixture} from '@open-wc/testing';
import { expect } from '@esm-bundle/chai';
import {store} from "../redux-store";
import {API_ROOT} from "../constants";
import fetchMock from "fetch-mock";

class SCPageSearchSpy extends SCPageSearch {
  constructor() {
    super();
    this.fetchCount = 0;
  }

  async fetchSearchResult() {
    this.fetchCount++;
    return await super.fetchSearchResult();
  }
}
customElements.define('sc-page-search-spy', SCPageSearchSpy);


describe('SCPageSearch', () => {
  beforeEach(() => {

    store.dispatch({
      type: 'CHANGE_ROUTE',
      payload: { name: 'search', params: { query: 'the metta sutta'}, path: '/search'},
    });
  });

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

  it('should call fetchSearchResult once when created', async () => {
    const element = await fixture(html`<sc-page-search-spy></sc-page-search-spy>`);
    await elementUpdated(element);
    expect(element.fetchCount).to.equal(1);
  });

  it('should call startNewSearch once when enter pressed', async () => {
    const element = await fixture(html`<sc-page-search-spy></sc-page-search-spy>`);
    await elementUpdated(element);
    element.fetchCount = 0;
    expect(element.fetchCount).to.equal(1);
  });
});