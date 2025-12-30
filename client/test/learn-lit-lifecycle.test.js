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
    this.eventLog = [];
    this.calledPerformUpdate = false;
    this.calledShouldUpdate = false;
    this.calledWillUpdate = false;
    this.dontPerformUpdate = false;
  }

  connectedCallback() {
    this.eventLog.push("connectedCallback") ;
    super.connectedCallback();
  }

  performUpdate() {
    this.calledPerformUpdate = true;
    this.eventLog.push("performUpdate") ;
    super.performUpdate();
  }

  shouldUpdate(_changedProperties) {
    this.calledShouldUpdate = true;
    if(this.dontPerformUpdate) return false;
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
    assert.deepEqual(element.eventLog, ["connectedCallback", "performUpdate"]);
  });

  it('Should call performUpdate() when attached to DOM', async () => {
    const element = await fixture(htmlTesting`<lifecycle-element></lifecycle-element>`);
    assert.equal(element.eventLog[0], "connectedCallback");
    assert.equal(element.eventLog[1], "performUpdate");
  });

  it('Should call shouldUpdate() when attached to DOM', async () => {
    const element = await fixture(htmlTesting`<lifecycle-element></lifecycle-element>`);
    assert.isTrue(element.calledShouldUpdate);
  });

  it('Should call willUpdate() when attached to DOM', async () => {
    const element = await fixture(htmlTesting`<lifecycle-element></lifecycle-element>`);
    assert.isTrue(element.calledWillUpdate);
  });

  // it('Should not call willUpdate() when shouldUpdate() returns false', async () => {
  //   const element = await fixture(htmlTesting`<lifecycle-element></lifecycle-element>`);
  //   element.dontPerformUpdate = true;
  //   assert.isFalse(element.calledWillUpdate);
  // });
})