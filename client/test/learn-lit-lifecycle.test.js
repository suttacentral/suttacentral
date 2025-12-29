// These tests are for learning only and do not test any SuttaCentral code.

import { expect } from '@esm-bundle/chai';

import { html, LitElement } from "lit";

class TestElement extends LitElement {
  static properties = {
    string_property: { type: String }
  };

  constructor() {
    super();
    this.string_property = 'Initial value';
  }

  render() {
    return html`<p>string_property is ${this.string_property}</p>`
  }
}
customElements.define('test-element', TestElement);

describe('TestElement', () => {
  it('Should set the string property when constructed', () => {
    let sut = new TestElement();
    expect(sut.string_property).to.equal('Initial value');
  });

})