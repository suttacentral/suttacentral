import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-ajax/iron-ajax.js';
import Viewer from 'viewerjs';

import { API_ROOT, IMAGES_ROOT } from '../../constants.js';


const style = document.createElement('template');
style.innerHTML = '<link href="/node_modules/viewerjs/dist/viewer.min.css" rel="stylesheet">';
document.head.appendChild(style.content);


class SCTextImage extends PolymerElement {
  static get template() {
    return html`
    <style>
      .hide {
        display: none;
      }
    </style>

    <iron-ajax id="ajax" debounce-duration="500" handle-as="json" loading="{{isLoading}}" last-error="{{lastError}}" last-response="{{imageData}}" on-response="_handleResponse"></iron-ajax>

    <ul id="images" class="hide">
      <template is="dom-repeat" items="[[imageData]]" as="image">
        <li><img class="image" data-url="[[_getImageUrl(image.name)]]" alt="[[image.name]]"></li>
      </template>
    </ul>`;
  }

  static get properties() {
    return {
      division: {
        type: String
      },
      vol: {
        type: String
      },
      pageNumber: {
        type: Number
      },
      isLoading: {
        type: Boolean,
        value: false
      },
      lastError: {
        type: Object
      },
      imageData: {
        type: Array
      },
      viewer: {
        type: Object
      },
      lastDetail: {
        type: Object
      }
    }
  }

  showImage(detail) {
    if (!detail || this._didDetailChange(detail)) {
      return;
    }
    this.lastDetail = detail;
    this.division = detail.division;
    this.vol = detail.vol;
    this.pageNumber = detail.pageNumber;
    this.$.ajax.url = this._getUrl();
    this.$.ajax.generateRequest();
  }

  _didDetailChange(detail) {
    return !!(this.lastDetail &&
      detail.vol === this.lastDetail.vol &&
      detail.division === this.lastDetail.division &&
      detail.pageNumber === this.lastDetail.pageNumber);
  }

  _getUrl() {
    return `${API_ROOT}/images/${this.division}/${this.vol}/${this.pageNumber}`;
  }

  _getImageUrl(name) {
    return `${IMAGES_ROOT}/${name}`;
  }

  _handleResponse() {
    if (!this.imageData || !this.imageData[0]) {
      return;
    }
    let viewerIndex = 0;
    // We need to have the indexnumber of the imageData array as the
    // starting point for the viewer.
    for (let page = 0; page < this.imageData.length; page++) {
      if (this.imageData[page].pageNumber === this.pageNumber) {
        viewerIndex = page;
      }
    }
    requestAnimationFrame(() => {
      const options = {
        url: (e) => e.dataUrl,
        navbar: false,
        transition: false,
        toolbar: {
          zoomIn: 1,
          zoomOut: 1,
          oneToOne: 2,
          reset: 0,
          prev: 1,
          play: 0,
          next: 1,
          rotateLeft: 0,
          rotateRight: 0,
          flipHorizontal: 0,
          flipVertical: 0,
        }
      };
      if (this.viewer) {
        this.viewer.update();
      } else {
        this.viewer = new Viewer(this.$.images, options);
      }
      this.viewer.index = viewerIndex;
      this.viewer.show();
      this.lastDetail = {};
    });
  }
}

customElements.define('sc-text-image', SCTextImage);
