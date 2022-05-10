import { LitElement, html, css } from 'lit';

import { LitLocalized } from '../addons/sc-localization-mixin';
import { setNavigation } from '../navigation/sc-navigation-common';
import { SCPublicationStyles } from '../styles/sc-publication-styles';
import { reduxActions } from '../addons/sc-redux-actions';
import { store } from '../../redux-store';

class ScPublicationEditionAcknowledgements extends LitLocalized(LitElement) {
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
    reduxActions.changeToolbarTitle('Edition Acknowledgements');
  }

  _updateNav() {
    const navArray = store.getState().navigationArray;
    const currentPath = store.getState().currentRoute.path;
    navArray.length = 3;
    navArray.push({
      title: 'Publications-Edition Acknowledgements',
      url: `${currentPath}`,
      type: 'PublicationPage',
    });
    setNavigation(navArray);
  }

  render() {
    return html`
      <main>
        <article>
          <h1>Acknowledgements</h1>
          <p>In the creative arts and scientific literature, an acknowledgement (also spelled acknowledgment in American and
            Canadian English[1]) is an expression of a gratitude for assistance in creating an original work.
          </p>
          <p>Receiving credit by way of acknowledgement rather than authorship indicates that the person or organization did
            not have a direct hand in producing the work in question, but may have contributed funding, criticism, or
            encouragement to the author(s). Various schemes exist for classifying acknowledgements.
          </p>


          <p>Apart from citation, which is not usually considered to be an acknowledgement, acknowledgement of conceptual
            support is widely considered to be the most important for identifying intellectual debt. Some acknowledgements of
            financial support, on the other hand, may simply be legal formalities imposed by the granting institution.
            Occasionally, bits of science humor can also be found in acknowledgements.[3]
          </p>
          <p>There have been some attempts to extract bibliometric indices from the acknowledgments section (also called
            "acknowledgments paratext")[4] of research papers in order to evaluate the impact of the acknowledged individuals,
            sponsors and funding agencies.[5][6]
          </p>
        </article>
      </main>
    `;
  }
}

customElements.define('sc-publication-edition-acknowledgements', ScPublicationEditionAcknowledgements);
