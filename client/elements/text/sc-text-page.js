import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-a11y-keys/iron-a11y-keys.js';

import { Localized } from '../addons/localization-mixin.js';
import { ReduxMixin } from '../../redux-store.js';


export class SCTextPage extends ReduxMixin(Localized(PolymerElement)) {
  static get properties() {
    return {
      inputElement: {
        type: Object
      },
      showParagraphs: {
        type: Boolean,
      },
      chosenTextView: {
        type: String,
      },
      lang: {
        type: String
      }
    }
  }
}
