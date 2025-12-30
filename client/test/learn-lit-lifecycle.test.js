// These tests are for learning only and do not test any SuttaCentral code.

import { html as htmlTesting, fixture } from '@open-wc/testing';
import { assert, expect } from '@esm-bundle/chai';

import { html, LitElement } from "lit";

class LifecycleElement extends LitElement {
  static properties = {
    string_property: { type: String }
  };

  constructor() {
    super();
    this.string_property = 'Initial value';
    this.callbackLog = [];
    this.dontPerformUpdate = false;
  }

  connectedCallback() {
    this.callbackLog.push("connectedCallback");
    super.connectedCallback();
  }

  performUpdate() {
    this.callbackLog.push("performUpdate");
    super.performUpdate();
  }

  shouldUpdate(_changedProperties) {
    this.callbackLog.push("shouldUpdate");
    if(this.dontPerformUpdate) return false;
    return super.shouldUpdate(_changedProperties);
  }

  willUpdate(_changedProperties) {
    this.callbackLog.push("willUpdate");
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

  it('Should call all callbacks when shouldUpdate() is super.shouldUpdate()', async () => {
    const element = await fixture(htmlTesting`<lifecycle-element></lifecycle-element>`);
    assert.deepEqual(element.callbackLog, [
      "connectedCallback",
      "performUpdate",
      "shouldUpdate",
      "willUpdate"
    ]);
  });
})