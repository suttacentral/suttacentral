import { LitElement, html, css } from 'lit';

import { LitLocalized } from '../addons/sc-localization-mixin';
import { setNavigation } from '../navigation/sc-navigation-common';
import { SCPublicationStyles } from '../styles/sc-publication-styles';
import { reduxActions } from '../addons/sc-redux-actions';
import { store } from '../../redux-store';

class ScPublicationEditionPreface extends LitLocalized(LitElement) {
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
    reduxActions.changeToolbarTitle('Edition Preface');
  }

  _updateNav() {
    const navArray = store.getState().navigationArray;
    const currentPath = store.getState().currentRoute.path;
    navArray.length = 3;
    navArray.push({
      title: 'Publications-Edition Preface',
      url: `${currentPath}`,
      type: 'PublicationPage',
    });
    setNavigation(navArray);
  }

  render() {
    return html`
      <main>
        <article>
          <header>
            <h1>Preface</h1>
          </header>
          <p>
            A preface (/ˈprɛfəs/) or proem (/ˈproʊɛm/) is an introduction to a book or other
            literary work written by the work's author. An introductory essay written by a different
            person is a foreword and precedes an author's preface. The preface often closes with
            acknowledgments of those who assisted in the literary work.
          </p>

          <p>
            It often covers the story of how the book came into being, or how the idea for the book
            was developed; this may be followed by thanks and acknowledgments to people who were
            helpful to the author during the time of writing.
          </p>

          <p>
            A preface is often signed (and the date and place of writing often follow the typeset
            signature); a foreword by another person is always signed. Information essential to the
            main text is generally placed in a set of explanatory notes, or perhaps in an
            "Introduction" that may be paginated with Arabic numerals, rather than in the preface.
            preface. The term preface can also mean any preliminary or introductory statement. It is
            sometimes abbreviated pref.
          </p>

          <p>
            Preface comes from Latin, meaning either "spoken before" (prae and fatia)[1][2] or "made
            before" (prae + factum). While the former source of the word could have preface meaning
            the same as prologue, the latter strongly implies an introduction written before the
            body of the book. With this meaning of stated intention, British publishing up to at
            least the middle of the twentieth century distinguished between preface and
            introduction.
          </p>
        </article>
      </main>
    `;
  }
}

customElements.define('sc-publication-edition-preface', ScPublicationEditionPreface);
