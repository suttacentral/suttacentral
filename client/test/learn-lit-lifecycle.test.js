// These tests are for learning only and do not test any SuttaCentral code.

import {html, LitElement} from "lit";
import {elementUpdated, fixture} from '@open-wc/testing';
import {assert} from '@esm-bundle/chai';

class LifecycleElement extends LitElement {
  static properties = {
    string_property: { type: String },
    callbackLog: { type: Array },
    skipUpdate: { type: Boolean },
  };

  constructor() {
    super();
    this.string_property = 'Initial value';
    this.callbackLog = [];
    this.skipUpdate = false;
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

    if(this.skipUpdate) {
      return false;
    }

    return super.shouldUpdate(_changedProperties);
  }

  willUpdate(_changedProperties) {
    this.callbackLog.push("willUpdate");
    super.willUpdate(_changedProperties);
  }

  render() {
    this.callbackLog.push("render")
    return html`<p>string_property is ${this.string_property}</p>`
  }

  firstUpdated(_changedProperties) {
    this.callbackLog.push("firstUpdated")
    super.firstUpdated(_changedProperties);
  }

  updated(_changedProperties) {
    this.callbackLog.push("updated")
    super.updated(_changedProperties);
  }
}
customElements.define('lifecycle-element', LifecycleElement);

describe('LifecycleElement', () => {
  it('Should initialise string_property on construction', async () => {
    const element = await fixture(html`<lifecycle-element></lifecycle-element>`);
    assert.equal(element.string_property, 'Initial value');
  });

  it('Should call all callbacks when shouldUpdate() is super.shouldUpdate()', async () => {
    const element = await fixture(html`<lifecycle-element></lifecycle-element>`);
    assert.deepEqual(element.callbackLog, [
      "connectedCallback",
      "performUpdate",
      "shouldUpdate",
      "willUpdate",
      "render",
      "firstUpdated",
      "updated",
    ]);
  });

  it('Should not call callbacks when shouldUpdate is false', async () => {
    const element = await fixture(html`<lifecycle-element></lifecycle-element>`);
    element.skipUpdate = true;
    element.callbackLog = [];
    element.string_property = "New value";
    await elementUpdated(element);
    assert.deepEqual(element.callbackLog, [
      "performUpdate",
      "shouldUpdate",
    ]);
  });
})