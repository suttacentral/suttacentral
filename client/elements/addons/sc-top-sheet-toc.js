import {html, css} from 'lit-element';
import SCTopSheetCommon from "./sc-top-sheet-common";
import { typographyCommonStyles } from '../styles/sc-typography-common-styles.js';

const styles = css`
.contents {
  margin: 0 auto !important;
    padding: 0 var(--sc-size-md);
    max-width: 720px;
    display: block;
    border-radius: 2px;
    border-left: 4px solid #F6C200;
    text-align: left;
}

li {
  font-family: var(--sc-paper-font-body_-_font-family); -webkit-font-smoothing: var(--sc-paper-font-body_-_-webkit-font-smoothing); font-feature-settings: var(--sc-paper-font-body_-_font-feature-settings); font-size: var(--sc-paper-font-body_-_font-size); font-weight: var(--sc-paper-font-body_-_font-weight); line-height: var(--sc-paper-font-body_-_line-height);
    margin: 0.5em 0;
    padding: var(--sc-size-xs) 0;
}

ol {
  margin: 1em 0 0 0;
}

.unordered-ol{
  margin: 1em 0 0 0;
  list-style: none;
}

a {
  color: var(--sc-inline-link_-_color); text-decoration: var(--sc-inline-link_-_text-decoration); text-decoration-color: var(--sc-inline-link_-_text-decoration-color); text-decoration-skip-ink: var(--sc-inline-link_-_text-decoration-skip-ink);
    text-decoration: none;
}

a:hover {
  color: var(--sc-inline-link-hover_-_color);
}

a:visited {
  text-decoration-color: var(--sc-inline-link-visited_-_text-decoration-color);
}`;

class SCTopSheetToC extends SCTopSheetCommon {
    static get styles() {
        return [
            super.styles,
            typographyCommonStyles,
            styles,
        ];
    }

  static get properties() {
    return {
      items: {
        type: Object
      },
      disableToCListStyle:{
        type: Boolean
      }
    }
  }

  get actions() {
    return {
      changeDisplaySettingMenuState(display) {
        store.dispatch({
          type: 'CHANGE_DISPLAY_SETTING_MENU_STATE',
          displaySettingMenu: display
        })
      },
    }
  }

  constructor() {
    super();
    this.items = [];
    this.disableToCListStyle = false;
  }

  _stateChanged(state) {
    super._stateChanged(state);
    this.items = state.tableOfContents.items;
    this.disableToCListStyle = state.tableOfContents.disableToCListStyle;
  }

  render() {
    return html`
    <section>
      <nav class="contents">
        <ol class=${this.disableToCListStyle ? "unordered-ol" : ""}>
          ${this.items ? this.items.map(item => html`<li><a @click=${this._hideMenu} href="${'#' + item.link}">${item.name}</a></li>`) : ''}
        </ol>
      </nav>
    </section>
  `
  }

  _hideMenu() {
    const scActionItems = document.querySelector("sc-site-layout").shadowRoot.querySelector("#action_items");
    scActionItems.hideItems();

    this.actions.changeDisplaySettingMenuState(false);
  }
}

customElements.define('sc-top-sheet-toc', SCTopSheetToC);
