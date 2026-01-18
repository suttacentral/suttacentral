import { SCPageSearch } from '../elements/sc-page-search.js';

import {html, LitElement} from "lit";
import {elementUpdated, fixture} from '@open-wc/testing';
import { expect } from '@esm-bundle/chai';
import {store} from "../redux-store";
import {SCSearchController} from "../elements/sc-search-controller";

const GENERAL_SEARCH_RESPONSE = {
  "hits": [
    {
      "acronym": "DN 4",
      "uid": "dn4",
      "lang": "en",
      "full_lang": "English",
      "root_lang": "pli",
      "name": "With Soṇadaṇḍa",
      "volpage": null,
      "author": "Bhikkhu Sujato",
      "author_uid": "sujato",
      "author_short": "sujato",
      "is_root": false,
      "heading": {
        "title": "With Soṇadaṇḍa"
      },
      "segmented_uid": null,
      "is_segmented": false,
      "is_bilara_text": true,
      "param_lang": "en",
      "root_uid": "dn",
      "is_article": false,
      "param_query": "Seniya",
      "url": "/dn4/en/sujato",
      "highlight": {
        "content": [
          "<a target=\"_blank\" href=\"/dn4/en/sujato#1.4\" id=\"1.4\"><span class=\"reference\">1.4</span></a> Now at that time the brahmin Soṇadaṇḍa was living in Campā. It was a crown property given by King <strong class=\"highlight\">Seniya</strong> Bimbisāra of Magadha teeming with living creatures full of hay wood water and grain a royal park endowed to a brahmin. <br/>",
          "<a target=\"_blank\" href=\"/dn4/en/sujato#5.19\" id=\"5.19\"><span class=\"reference\">5.19</span></a> You live in Campā a crown property given by King <strong class=\"highlight\">Seniya</strong> Bimbisāra of Magadha teeming with living creatures full of hay wood water and grain a royal park endowed to a brahmin. <br/>",
          "<a target=\"_blank\" href=\"/dn4/en/sujato#6.30\" id=\"6.30\"><span class=\"reference\">6.30</span></a> King <strong class=\"highlight\">Seniya</strong> Bimbisāra of Magadha and his wives and children have gone for refuge for life to the ascetic Gotama. … <br/>"
        ]
      }
    }
  ]
};

const EXPANSION_RESPONSE = [{"pli": ["Pli", "Pāli"]}];

class FakeSearchController extends SCSearchController {

  constructor() {
    super();
    this.fetchCount = 0;
  }

  async fetchResult(requestUrl, selectedLanguages) {
    this.fetchCount++;
    return GENERAL_SEARCH_RESPONSE;
  }
}

class SCPageSearchTesting extends SCPageSearch {
  constructor() {
    super(new FakeSearchController());
  }

  submitByPressingEnter() {
    const search_input = this.shadowRoot.getElementById('search_input');
    search_input.dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter' }));
  }

  setSearchInputValue(value) {
    const search_input = this.shadowRoot.getElementById('search_input');
    search_input.value = value;
  }

  async getExpansionResponse() {
    return EXPANSION_RESPONSE;
  }
}
customElements.define('sc-page-search-spy', SCPageSearchTesting);


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
    expect(element.searchController.fetchCount).to.equal(1);
  });

  it('should change the search query but it is overwritten', async () => {
    const element = await fixture(html`<sc-page-search-spy></sc-page-search-spy>`);
    await elementUpdated(element);
    element.setSearchInputValue('quails')
    element.submitByPressingEnter();
    await elementUpdated(element);
    expect(element.searchQuery).to.equal('the metta sutta');
  });

  it('actually gets changed via redux', async () => {
    const element = await fixture(html`<sc-page-search-spy></sc-page-search-spy>`);
    await elementUpdated(element);
    expect(element.searchQuery).to.equal('the metta sutta');
    store.dispatch({
      type: 'CHANGE_ROUTE',
      payload: { name: 'search', params: { query: 'quails'}, path: '/search'},
    });
    await elementUpdated(element);
    expect(element.searchQuery).to.equal('quails');
  });
});