// These tests are for learning only and do not test any SuttaCentral code.

import { html as htmlTesting, fixture } from '@open-wc/testing';
import { assert } from '@esm-bundle/chai';

import { html, LitElement } from "lit";

class LifecycleElement extends LitElement {
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
customElements.define('lifecycle-element', LifecycleElement);

describe('LifecycleElement', () => {
  it('Should initialise string_property on construction', async () => {
    const element = await fixture(htmlTesting`<lifecycle-element></lifecycle-element>`);
    assert.equal(element.string_property, 'Initial value');
  });

  it('Should call connectedCallback() when attached to DOM', async () => {
    const element = await fixture(htmlTesting`<lifecycle-element></lifecycle-element>`);
    assert(element.calledConnectedCallback);
  });
})