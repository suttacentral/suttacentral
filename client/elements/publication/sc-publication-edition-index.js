import { LitElement, html, css } from 'lit';

import { LitLocalized } from '../addons/sc-localization-mixin';
import { setNavigation } from '../navigation/sc-navigation-common';
import { SCPublicationStyles } from '../styles/sc-publication-styles';
import { reduxActions } from '../addons/sc-redux-actions';
import { store } from '../../redux-store';

class ScPublicationEditionIndex extends LitLocalized(LitElement) {
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
    reduxActions.changeToolbarTitle('Edition Index');
  }

  _updateNav() {
    const navArray = store.getState().navigationArray;
    const currentPath = store.getState().currentRoute.path;
    navArray.length = 3;
    navArray.push({
      title: 'Publications-Edition Index',
      url: `${currentPath}`,
      type: 'PublicationPage',
    });
    setNavigation(navArray);
  }

  render() {
    return html`
      <main>
        <header>
          <h1>Index</h1>
        </header>
        <article>
          <p>An 'index' (plural: usually indexes, more rarely indices; see below) is a list of words or phrases ('headings')
            and associated pointers ('locators') to where useful material relating to that heading can be found in a
            document or collection of documents. Examples are an index in the back matter of a book and an index that serves
            as a library catalog.</p>

          <p>In a traditional back-of-the-book index, the headings will include names of people, places, events, and
            concepts selected by the indexer as being relevant and of interest to a possible reader of the book. The indexer
            may be the author, the editor, or a professional indexer working as a third party. The pointers are typically
            page numbers, paragraph numbers or section numbers.</p>

          <p>In a library catalog the words are authors, titles, subject headings, etc., and the pointers are call numbers.
            Internet search engines (such as Google) and full-text searching help provide access to information but are not
            as selective as an index, as they provide non-relevant links, and may miss relevant information if it is not
            phrased in exactly the way they expect.</p>

          <p>Perhaps the most advanced investigation of problems related to book indexes is made in the development of topic
            maps, which started as a way of representing the knowledge structures inherent in traditional back-of-the-book
            indexes. The concept embodied by book indexes lent its name to database indexes, which similarly provide an
            abridged way to look up information in a larger collection, albeit one for computer use rather than human use.
          </p>
        </article>
      </main>
    `;
  }
}

customElements.define('sc-publication-edition-index', ScPublicationEditionIndex);
