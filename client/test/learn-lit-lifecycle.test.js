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
    this.calledPerformUpdate = false;
    this.calledShouldUpdate = false;
    this.calledWillUpdate = false;
  }

  connectedCallback() {
    this.calledConnectedCallback = true;
    super.connectedCallback();
  }

  performUpdate() {
    this.calledPerformUpdate = true;
    super.performUpdate();
  }

  shouldUpdate(_changedProperties) {
    this.calledShouldUpdate = true;
    return super.shouldUpdate(_changedProperties);
  }

  willUpdate(_changedProperties) {
    this.calledWillUpdate = true;
    super.willUpdate(_changedProperties);
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
    assert.isTrue(element.calledConnectedCallback);
  });

  it('Should call performUpdate() when attached to DOM', async () => {
    const element = await fixture(htmlTesting`<lifecycle-element></lifecycle-element>`);
    assert.isTrue(element.calledPerformUpdate);
  });

  it('Should call shouldUpdate() when attached to DOM', async () => {
    const element = await fixture(htmlTesting`<lifecycle-element></lifecycle-element>`);
    assert.isTrue(element.calledShouldUpdate);
  });

  it('Should call willUpdate() when attached to DOM', async () => {
    const element = await fixture(htmlTesting`<lifecycle-element></lifecycle-element>`);
    assert.isTrue(element.calledWillUpdate);
  });
})