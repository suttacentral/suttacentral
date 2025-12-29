// These tests are for learning only and do not test any SuttaCentral code.

import { html as htmlTesting, fixture } from '@open-wc/testing';
import { assert } from '@esm-bundle/chai';

import { html, LitElement } from "lit";

class TestElement extends LitElement {
  static properties = {
    string_property: { type: String }
  };

  constructor() {
    super();
    this.string_property = 'Initial value';
    this.calledConnectedCallback = false;
  }

  connectedCallback() {
    this.calledConnectedCallback = true;
    super.connectedCallback();
  }

  render() {
    return html`<p>string_property is ${this.string_property}</p>`
  }
}
customElements.define('test-element', TestElement);

describe('TestElement', () => {
  it('Should initialise string_property on construction', () => {
    let sut = new TestElement();
    assert.equal(sut.string_property, 'Initial value');
  });

  it('Should call connectedCallback() when attached to DOM', async () => {
    const element = await fixture(htmlTesting`<test-element></test-element>`)
    assert(element.calledConnectedCallback);
  });
})