import { LitElement, html, css } from 'lit';

import { LitLocalized } from '../addons/sc-localization-mixin';
import { setNavigation } from '../navigation/sc-navigation-common';
import { SCPublicationStyles } from '../styles/sc-publication-styles';
import { reduxActions } from '../addons/sc-redux-actions';
import { store } from '../../redux-store';

class ScPublicationEditions  extends LitLocalized(LitElement) {
  static get styles() {
    return css`
      ${SCPublicationStyles}
      :host {
        display: block;
      }
    `;
  }

  static get properties() {
    return {};
  }

  // constructor() {
  //   super();
  // }

  firstUpdated() {
    this._updateNav();
    reduxActions.changeToolbarTitle('Publications editions');
  }

  _updateNav() {
    const navArray = store.getState().navigationArray;
    const currentPath = store.getState().currentRoute.path;
    navArray.length = 1;
    navArray.push({
      title: 'Publications editions',
      url: `${currentPath}`,
      type: 'PublicationPage',
    });
    setNavigation(navArray);
  }

  render() {
    return html`
      <dt>
        <li><a href="/publication-dn">Long Discourses</a></li>
        <li><a href="/publication-mn">Middle Discourses</a></li>
        <li><a href="/publication-sn">Linked Discourses</a></li>
        <li><a href="/publication-an">Numbered Discourses</a></li>
        <li><a href="/publication-minor">Minor Discourses</a></li>
      </dt>
    `;
  }
}

customElements.define('sc-publication-editions', ScPublicationEditions);