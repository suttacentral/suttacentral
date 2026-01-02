import { SCPageSearch } from '../elements/sc-page-search.js';

import {html, LitElement} from "lit";
import {elementUpdated, fixture} from '@open-wc/testing';
import { expect } from '@esm-bundle/chai';
import {reduxActions} from "../elements/addons/sc-redux-actions";
import {store} from "../redux-store";

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
    store.dispatch({
      type: 'CHANGE_ROUTE',
      payload: { name: 'search', params: { query: 'ghosts'}, path: '/search'},
    });

    console.debug(store.getState().currentRoute.params.query);
    const element = await fixture(html`<sc-page-search-spy></sc-page-search-spy>`);
    await elementUpdated(element);
    expect(element.fetchCount).to.equal(1);
  });
});

describe('Redux actions', () => {
  it('should set and retrieve some data', () => {
    reduxActions.setInstantSearchDataLanguage('en');
    expect(store.getState().siteLanguage).to.equal('en')
  });
});