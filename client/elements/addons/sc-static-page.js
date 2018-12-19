import { LitElement } from "@polymer/lit-element/lit-element.js";

import { LitLocalized } from "./localization-mixin.js";

export class SCStaticPage extends LitLocalized(LitElement) {
  static get properties() {
    return {
      currentId: {
        type: String,
        value: ''
      }
    }
  }

  firstUpdated(props) {
    const targetMainElement = this.shadowRoot.querySelector('main');

    if (targetMainElement) {
      targetMainElement.addEventListener('click', () => {
        setTimeout(() => {
          this.currentId = this._scrollToSection(window.location.hash, this.currentId);
        });
      });
    }

    // since url navigation is using pushState, hashchange event fires only when
    // using browser's back/forward functionality, and not when clicking a link
    window.addEventListener('hashchange', () => {
      setTimeout(() => {
        this.currentId = this._scrollToSection(window.location.hash, this.currentId);
      });
    });

    this.currentId = this._scrollToSection(window.location.hash, this.currentId);
  }

  _scrollToSection(sectionId, currentId) {
    if (!sectionId || currentId === sectionId) {
      return currentId;
    }
    const firstSection = this.shadowRoot.querySelector(sectionId);
    if (firstSection) {
      firstSection.scrollIntoView({
        behavior: 'instant',
        block: 'start',
        inline: 'nearest'
      });
    }
    return sectionId;
  }
}
