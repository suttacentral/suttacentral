import { LitElement, html, css } from 'lit';
import '@material/mwc-icon-button';
import { store } from '../../redux-store';
import { LitLocalized } from '../addons/sc-localization-mixin';
import { icon } from '../../img/sc-icon';
import { API_ROOT } from '../../constants';
/*
Base toolbar that appears on the top right in the header of every page.
*/

export class SCActionItems extends LitLocalized(LitElement) {
  static get styles() {
    return css`
      .white-icon {
        color: var(--sc-tertiary-text-color);
      }

      #tools_menu {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        gap: 4px;
      }

      .invisible {
        display: none;
      }

      .toolButtons {
        position: relative;
        box-sizing: border-box;
        border-bottom: 4px solid transparent;
        height: 100%;
      }

      #btnViewCompact:after,
      #btnViewComfy:after,
      #btnTools:after,
      #btnInfo:after,
      #btnShowParallels:after,
      #btnShowToC:after,
      #btnShowParallelTableView:after {
        font-size: var(--sc-skolar-font-size-xxs);
        font-weight: 600;
        font-stretch: condensed;

        position: absolute;
        bottom: 4px;

        width: 100%;

        text-align: center;
      }

      #btnViewCompact:after {
        content: 'spacing';
      }

      #btnViewComfy:after {
        content: 'spacing';
      }

      #btnTools:after {
        content: 'views';
      }

      #btnInfo:after {
        content: 'info';
      }

      #btnShowParallels,
      #btnShowParallelTableView {
        display: flex;
      }

      #btnShowParallels:after {
        content: 'parallels';
      }

      #btnShowToC:after {
        content: 'contents';
      }

      #btnShowParallelTableView:after {
        content: 'TableView';
      }

      .active-light {
        font-weight: 800;
        border-bottom: 4px solid var(--sc-primary-color-light) !important;
      }

      .active-dark {
        font-weight: 800;
        border-bottom: 4px solid var(--sc-primary-color-dark) !important;
      }

      @media only screen and (max-width: 600px) {
        #tools_menu.contextToolbarExpand {
          width: 100%;
          justify-content: space-around;
          align-items: flex-end;
        }

        .toolButtons {
          box-sizing: content-box;
        }
      }

      .icon {
        fill: var(--sc-tertiary-text-color);
      }
    `;
  }

  render() {
    return html`
      <div id="tools_menu">
        <mwc-icon-button
          class="white-icon toolButtons"
          id="btnShowToC"
          title="View Table of Contents"
          @click="${this._onBtnShowToCClick}"
          slot="actionItems"
          ?hidden="${this.tableOfContents}"
        >
          ${icon.toc}
        </mwc-icon-button>

        <mwc-icon-button
          class="white-icon toolButtons"
          id="btnViewCompact"
          title="Compact mode"
          @click="${this._onBtnViewCompactClick}"
          slot="actionItems"
          ?hidden="${this.displayCompactButton}"
        >
          ${icon.view_compact}
        </mwc-icon-button>

        <mwc-icon-button
          class="white-icon toolButtons"
          id="btnViewComfy"
          title="Comfy mode"
          @click="${this._onBtnViewCompactClick}"
          slot="actionItems"
          ?hidden="${this.displayComfyButton}"
        >
          ${icon.view_comfy}
        </mwc-icon-button>

        <mwc-icon-button
          class="white-icon toolButtons"
          id="btnInfo"
          title="Text info"
          @click="${this._onBtnInfoClick}"
          slot="actionItems"
          ?hidden="${this.displayInfoButton}"
        >
          ${icon.info}
        </mwc-icon-button>

        <mwc-icon-button
          class="white-icon toolButtons"
          id="btnTools"
          title="View options"
          @click="${this._onBtnToolsClick}"
          slot="actionItems"
          ?hidden="${this.displayToolButton}"
        >
          ${icon.visibility}
        </mwc-icon-button>

        <mwc-icon-button
          class="white-icon toolButtons"
          id="btnShowParallels"
          title="View parallels"
          @click="${this._onBtnShowParallelsClick}"
          slot="actionItems"
          ?hidden="${this.displayToolButton}"
        >
          ${icon.parallels}
        </mwc-icon-button>

        <mwc-icon-button
          class="white-icon toolButtons"
          id="btnShowParallelTableView"
          title="Parallels table view"
          @click="${this._onBtnShowParallelTableViewClick}"
          slot="actionItems"
        >
          ${this.displayParallelTableView ? icon.tableView_twotone : icon.tableView}
        </mwc-icon-button>
      </div>
    `;
  }

  static get properties() {
    return {
      path: { type: String },
      suttaplexDisplay: { type: Boolean },
      suttaplexListEnabled: { type: Boolean },
      mode: { type: String },
      localizedStringsPath: { type: String },
      displaySettingMenu: { type: Boolean },
      displayToolButton: { type: Boolean },
      displayInfoButton: { type: Boolean },
      tableOfContents: { type: Boolean },
      displayCompactButton: { type: Boolean },
      displayComfyButton: { type: Boolean },
      displayViewModeButton: { type: Boolean },
      colorTheme: { type: String },
      suttaMetaText: { type: String },
      suttaPublicationInfo: { type: Object },
    };
  }

  constructor() {
    super();
    this.path = '';
    this.suttaplexDisplay = '';
    this.suttaplexListEnabled = store.getState().suttaplexListDisplay;
    this.colorTheme = store.getState().colorTheme;
    this.activeClass = this.colorTheme === 'light' ? 'active-light' : 'active-dark';
    this.mode = store.getState().toolbarOptions.mode;
    this.localizedStringsPath = '/localization/elements/build/interface';
    this.currentRoute = store.getState().currentRoute;

    this.actions.changeDisplaySettingMenuState(false);
    this.actions.changeDisplaySuttaParallelsState(false);
    this.actions.changeDisplaySuttaToCState(false);
    this.actions.changeDisplaySuttaInfoState(false);

    this.tableOfContents = !!store.getState().tableOfContents.items.length;
    this.displaySettingMenu = store.getState().displaySettingMenu;
    this.displayToolButton = store.getState().displayToolButton;
    this.displayInfoButton = store.getState().displayInfoButton;
    this.displayViewModeButton = store.getState().displayViewModeButton;
    this.displayParallelTableView = store.getState().displayParallelTableView;
  }

  get actions() {
    return {
      toggleSuttaplexDisplay(suttaplexdisplay) {
        store.dispatch({
          type: 'SUTTPLEX_LIST_DISPLAY',
          suttaplexdisplay,
        });
      },
      changeToolbarTitle(title) {
        store.dispatch({
          type: 'CHANGE_TOOLBAR_TITLE',
          title,
        });
      },
      saveToolbarTitle(title) {
        store.dispatch({
          type: 'SAVE_TOOLBAR_TITLE',
          toolbarTitle: title,
        });
      },
      changeDisplaySettingMenuState(display) {
        store.dispatch({
          type: 'CHANGE_DISPLAY_SETTING_MENU_STATE',
          displaySettingMenu: display,
        });
      },
      changeDisplayToolButtonState(display) {
        store.dispatch({
          type: 'CHANGE_DISPLAY_TOOL_BUTTON_STATE',
          displayToolButton: display,
        });
      },
      changeDisplaySuttaParallelsState(displayState) {
        store.dispatch({
          type: 'CHANGE_DISPLAY_SUTTA_PARALLELS_STATE',
          displaySuttaParallels: displayState,
        });
      },
      changeDisplaySuttaToCState(displayState) {
        store.dispatch({
          type: 'CHANGE_DISPLAY_SUTTA_TOC_STATE',
          displaySuttaToC: displayState,
        });
      },
      changeDisplaySuttaInfoState(displayState) {
        store.dispatch({
          type: 'CHANGE_DISPLAY_SUTTA_INFO_STATE',
          displaySuttaInfo: displayState,
        });
      },
      changeDisplayParallelTableViewState(displayState) {
        store.dispatch({
          type: 'CHANGE_DISPLAY_PARALLEL_TABLE_VIEW_STATE',
          displayParallelTableView: displayState,
        });
      },
    };
  }

  firstUpdated() {
    this._displayToolButtonStateChange();
    this._displayViewModeButtonStateChange();
    this._viewModeChanged();
    this._displayToCButtonStateChange();
    this.#setBtnShowParallelTableViewDisplayState();
    this.#setBtnShowParallelTableViewIcon();
  }

  hideItems() {
    this._hideSuttaInfo();
    this._hideSuttaParallels();
    this._hideSettingMenu();
    this._hideSuttaToC();
  }

  _onBtnInfoClick() {
    this.displaySuttaInfo = store.getState().displaySuttaInfo;
    if (!this.displaySuttaInfo) {
      const { displaySettingMenu, displaySuttaParallels, displaySuttaToC } = store.getState();
      if (displaySettingMenu) {
        this.actions.changeDisplaySettingMenuState(false);
        this._hideSettingMenu();
      }
      if (displaySuttaParallels) {
        this.actions.changeDisplaySuttaParallelsState(false);
        this._hideSuttaParallels();
      }
      if (displaySuttaToC) {
        this.actions.changeDisplaySuttaToCState(false);
        this._hideSuttaToC();
      }
      this.actions.changeDisplaySuttaInfoState(true);
      this._showSuttaInfo();
    } else {
      this.actions.changeDisplaySuttaInfoState(false);
      this._hideSuttaInfo();
    }
  }

  _showSuttaInfo() {
    this.dispatchEvent(
      new CustomEvent('show-sc-sutta-info', {
        detail: {
          isSegmentedText: !this.suttaMetaText,
        },
        bubbles: true,
        composed: true,
      })
    );
    this.shadowRoot.querySelector('#btnInfo')?.classList.add(this.activeClass);
  }

  _onBtnViewCompactClick(e) {
    this.actions.toggleSuttaplexDisplay(e.currentTarget.id === 'btnViewCompact');
    this._viewModeChanged();
  }

  _displayViewModeButtonStateChange() {
    const displayStyle = this.displayViewModeButton ? 'inherit' : 'none';
    this.shadowRoot.querySelector('#btnViewCompact').style.display = displayStyle;
    this.shadowRoot.querySelector('#btnViewComfy').style.display = displayStyle;
    this._viewModeChanged();
  }

  #setBtnShowParallelTableViewDisplayState() {
    const displayStyle = this.currentRoute.name === 'SUTTAPLEX' ? 'inherit' : 'none';
    const btnShowParallelTableView = this.shadowRoot.querySelector('#btnShowParallelTableView');
    if (btnShowParallelTableView) {
      btnShowParallelTableView.style.display = displayStyle;
    }
  }

  _viewModeChanged() {
    if (!this.displayViewModeButton) {
      return;
    }
    const isCompactView = store.getState().suttaplexListDisplay;
    if (isCompactView) {
      this.displayCompactButton = false;
      this.displayComfyButton = true;
      this.shadowRoot.querySelector('#btnViewCompact').style.display = 'none';
      this.shadowRoot.querySelector('#btnViewComfy').style.display = 'inherit';
    } else {
      this.displayCompactButton = true;
      this.displayComfyButton = false;
      this.shadowRoot.querySelector('#btnViewCompact').style.display = 'inherit';
      this.shadowRoot.querySelector('#btnViewComfy').style.display = 'none';
    }
    this.requestUpdate();
  }

  _onBtnToolsClick(e) {
    this.displaySettingMenu = store.getState().displaySettingMenu;
    if (!this.displaySettingMenu) {
      const { displaySuttaParallels, displaySuttaInfo, displaySuttaToC } = store.getState();
      if (displaySuttaParallels) {
        this.actions.changeDisplaySuttaParallelsState(false);
        this._hideSuttaParallels();
      }
      if (displaySuttaInfo) {
        this.actions.changeDisplaySuttaInfoState(false);
        this._hideSuttaInfo();
      }
      if (displaySuttaToC) {
        this.actions.changeDisplaySuttaToCState(false);
        this._hideSuttaToC();
      }
      this.actions.changeDisplaySettingMenuState(true);
      this._showSettingMenu();
    } else {
      this.actions.changeDisplaySettingMenuState(false);
      this._hideSettingMenu();
    }
  }

  _hideSettingMenu() {
    this.dispatchEvent(
      new CustomEvent('hide-sc-top-sheet', {
        bubbles: true,
        composed: true,
      })
    );
    this.shadowRoot.querySelector('#btnTools')?.classList.remove(this.activeClass);
  }

  _showSettingMenu() {
    this.dispatchEvent(
      new CustomEvent('show-sc-top-sheet', {
        bubbles: true,
        composed: true,
      })
    );
    this.shadowRoot.querySelector('#btnTools')?.classList.add(this.activeClass);
  }

  _hideSuttaParallels() {
    this.dispatchEvent(
      new CustomEvent('hide-sc-sutta-parallels', {
        bubbles: true,
        composed: true,
      })
    );
    this.shadowRoot.querySelector('#btnShowParallels')?.classList.remove(this.activeClass);
  }

  _hideSuttaToC() {
    this.dispatchEvent(
      new CustomEvent('hide-sc-sutta-toc', {
        bubbles: true,
        composed: true,
      })
    );
    this.shadowRoot.querySelector('#btnShowToC')?.classList.remove(this.activeClass);
  }

  _hideSuttaInfo() {
    this.dispatchEvent(
      new CustomEvent('hide-sc-sutta-info', {
        bubbles: true,
        composed: true,
      })
    );
    this.shadowRoot.querySelector('#btnInfo')?.classList.remove(this.activeClass);
  }

  _showSuttaParallels() {
    this.dispatchEvent(
      new CustomEvent('show-sc-sutta-parallels', {
        bubbles: true,
        composed: true,
      })
    );
    this.shadowRoot.querySelector('#btnShowParallels')?.classList.add(this.activeClass);
  }

  _showSuttaToC() {
    this.dispatchEvent(
      new CustomEvent('show-sc-sutta-toc', {
        bubbles: true,
        composed: true,
      })
    );
    this.shadowRoot.querySelector('#btnShowToC')?.classList.add(this.activeClass);
  }

  _onBtnShowParallelsClick() {
    this.#bindDataToSCSuttaParallels(store.getState().currentRoute.params.suttaId);
    this.displaySuttaParallels = store.getState().displaySuttaParallels;
    if (!this.displaySuttaParallels) {
      const { displaySettingMenu, displaySuttaInfo, displaySuttaToC } = store.getState();
      if (displaySettingMenu) {
        this.actions.changeDisplaySettingMenuState(false);
        this._hideSettingMenu();
      }
      if (displaySuttaInfo) {
        this.actions.changeDisplaySuttaInfoState(false);
        this._hideSuttaInfo();
      }
      if (displaySuttaToC) {
        this.actions.changeDisplaySuttaToCState(false);
        this._hideSuttaToC();
      }
      this.actions.changeDisplaySuttaParallelsState(true);
      this._showSuttaParallels();
    } else {
      this.actions.changeDisplaySuttaParallelsState(false);
      this._hideSuttaParallels();
    }
  }

  #bindDataToSCSuttaParallels(uid) {
    if (!uid) {
      return;
    }
    const url = `${API_ROOT}/suttaplex/${uid}?language=${this.siteLanguage}`;
    fetch(url)
      .then(r => r.json())
      .then(suttaplex => {
        this.dispatchEvent(
          new CustomEvent('bind-data-to-sc-sutta-parallels', {
            detail: {
              suttaplexItem: suttaplex[0],
            },
            bubbles: true,
            composed: true,
          })
        );
      })
      .catch(e => console.error(e));
  }

  _onBtnShowParallelTableViewClick() {
    this.actions.changeDisplayParallelTableViewState(!this.displayParallelTableView);
  }

  #setBtnShowParallelTableViewIcon() {
    this.requestUpdate();
  }

  showParallelsTopSheet() {
    this._onBtnShowParallelsClick();
  }

  _onBtnShowToCClick() {
    this.displaySuttaToC = store.getState().displaySuttaToC;
    if (!this.displaySuttaToC) {
      const { displaySettingMenu, displaySuttaInfo, displaySuttaParallels } = store.getState();
      if (displaySettingMenu) {
        this.actions.changeDisplaySettingMenuState(false);
        this._hideSettingMenu();
      }
      if (displaySuttaInfo) {
        this.actions.changeDisplaySuttaInfoState(false);
        this._hideSuttaInfo();
      }
      if (displaySuttaParallels) {
        this.actions.changeDisplaySuttaParallelsState(false);
        this._hideSuttaParallels();
      }
      this.actions.changeDisplaySuttaToCState(true);
      this._showSuttaToC();
    } else {
      this.actions.changeDisplaySuttaToCState(false);
      this._hideSuttaToC();
    }
  }

  hideTopSheets() {
    this._hideSettingMenu();
    this._hideSuttaInfo();
    this._hideSuttaParallels();
    this._hideSuttaToC();
  }

  stateChanged(state) {
    super.stateChanged(state);
    if (this.displaySettingMenu !== state.displaySettingMenu) {
      this.displaySettingMenu = state.displaySettingMenu;
    }
    if (this.displayToolButton !== state.displayToolButton) {
      this.displayToolButton = state.displayToolButton;
    }
    if (this.displayViewModeButton !== state.displayViewModeButton) {
      this.displayViewModeButton = state.displayViewModeButton;
    }
    if (this.colorTheme !== state.colorTheme) {
      this.colorTheme = state.colorTheme;
    }
    if (this.suttaMetaText !== state.suttaMetaText) {
      this.suttaMetaText = state.suttaMetaText;
    }
    if (this.suttaPublicationInfo !== state.suttaPublicationInfo) {
      this.suttaPublicationInfo = state.suttaPublicationInfo;
    }
    if (this.suttaplexListEnabled !== state.suttaplexListDisplay) {
      this.suttaplexListEnabled = state.suttaplexListDisplay;
    }
    if (this.tableOfContents !== !!state.tableOfContents.items.length) {
      this.tableOfContents = !!state.tableOfContents.items.length;
    }
    if (this.displayParallelTableView !== state.displayParallelTableView) {
      this.displayParallelTableView = state.displayParallelTableView;
      this.#setBtnShowParallelTableViewIcon();
    }
    if (this.currentRoute !== state.currentRoute) {
      this.currentRoute = state.currentRoute;
      this.#setBtnShowParallelTableViewDisplayState();
    }
  }

  updated(changedProps) {
    if (changedProps.has('displayToolButton')) {
      this._displayToolButtonStateChange();
    }
    if (changedProps.has('displayViewModeButton')) {
      this._displayViewModeButtonStateChange();
    }
    if (changedProps.has('colorTheme')) {
      this.activeClass = this.colorTheme === 'light' ? 'active-light' : 'active-dark';
      this._resetToolButtonsActiveClass();
    }
    if (changedProps.has('suttaplexListEnabled')) {
      this._viewModeChanged();
    }
    if (changedProps.has('suttaMetaText') || changedProps.has('suttaPublicationInfo')) {
      this._suttaMetaTextChanged();
    }
    if (changedProps.has('tableOfContents')) {
      this._displayToCButtonStateChange();
    }
  }

  _suttaMetaTextChanged() {
    const displayStyle = this.suttaMetaText || this.suttaPublicationInfo ? 'inherit' : 'none';
    const btnInfo = this.shadowRoot.querySelector('#btnInfo');
    if (btnInfo) {
      btnInfo.style.display = displayStyle;
    }
  }

  _displayToCButtonStateChange() {
    if (this.tableOfContents)
      this.shadowRoot.querySelector('#btnShowToC').style.display = 'inherit';
    else this.shadowRoot.querySelector('#btnShowToC').style.display = 'none';
  }

  _displayToolButtonStateChange() {
    if (this.displayToolButton) {
      this.shadowRoot.querySelector('#btnTools').style.display = 'inherit';
      this.shadowRoot.querySelector('#btnInfo').style.display = 'inherit';
      this.shadowRoot.querySelector('#btnShowParallels').style.display = 'inherit';
      this._suttaMetaTextChanged();
      this._displayToCButtonStateChange();
      this.shadowRoot.querySelector('#tools_menu').classList.add('contextToolbarExpand');
    } else {
      this.shadowRoot.querySelector('#btnTools').style.display = 'none';
      this.shadowRoot.querySelector('#btnInfo').style.display = 'none';
      this.shadowRoot.querySelector('#btnShowParallels').style.display = 'none';
      this.shadowRoot.querySelector('#btnShowToC').style.display = 'none';
      this.shadowRoot.querySelector('#tools_menu').classList.remove('contextToolbarExpand');
    }
  }

  _setToolButtonsVisible(visible) {
    this.shadowRoot.querySelectorAll('.toolButtons').forEach(e => {
      if (e.style.display !== 'none') {
        visible ? e.classList.remove('invisible') : e.classList.add('invisible');
      }
    });
  }

  _resetToolButtonsActiveClass() {
    this.shadowRoot.querySelectorAll('.toolButtons').forEach(e => {
      if (e.classList.contains('active-light') || e.classList.contains('active-dark')) {
        e.classList.remove('active-light');
        e.classList.remove('active-dark');
        e.classList.add(this.activeClass);
      }
    });
  }
}

customElements.define('sc-action-items', SCActionItems);
