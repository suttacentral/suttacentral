import { LitElement, html } from 'lit-element';
import '@material/mwc-icon';
import '@material/mwc-icon-button';
import { store } from '../../redux-store';
import { LitLocalized } from '../addons/localization-mixin'
import { icons } from '../../img/sc-icons';
/*
Base toolbar that appears on the top right in the header of every page.
*/

class SCActionItems extends LitLocalized(LitElement) {
  render() {
    return html`
    <style>
      .white-icon {
        color: var(--sc-tertiary-text-color);
      }

      #tools_menu {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
      }

      .invisible {
        display: none;
      }

      #btnLightTheme,
      #btnDarkTheme,
      #btnViewCompact,
      #btnViewComfy,
      #btnTools,
      #btnInfo,
      #btnShowParallels {
        position: relative;
        box-sizing: border-box;
        border-bottom: 4px solid rgba(0,0,0,0);
        height: 100%;
      }

      #btnLightTheme:after,
      #btnDarkTheme:after,
      #btnViewCompact:after,
      #btnViewComfy:after,
      #btnTools:after,
      #btnInfo:after,
      #btnShowParallels:after {
        font-size: var(--sc-skolar-font-size-xxs);

        position: absolute;
        bottom: 4px;

        width: 100%;

        text-align: center;
      }

      #btnLightTheme:after {
        content: 'colors';
      }

      #btnDarkTheme:after {
        content: 'colors';
      }

      #btnViewCompact:after {
        content: 'spacing';
      }

      #btnViewComfy:after {
        content: 'spacing';
      }
      
      #btnTools:after {
        content: 'views'
      }

      #btnInfo:after {
        content: 'info'
      }

      #btnShowParallels {
        display: flex;
      }

      #btnShowParallels:after {
        content: 'parallels';
      }
    </style>

    <div id="tools_menu">
      <mwc-icon-button 
        class="white-icon toolButtons" 
        id="btnLightTheme" 
        title="Light theme"  
        @click="${this._onBtnLightThemeClick}" 
        slot="actionItems" 
        ?hidden="${this.displayLightThemeButton}">
        ${icons['wb_sunny']}
      </mwc-icon-button>

      <mwc-icon-button
        class="white-icon toolButtons" 
        id="btnDarkTheme" 
        title="Dark theme" 
        @click="${this._onBtnDarkThemeClick}" 
        slot="actionItems" 
        ?hidden="${this.displayDarkThemeButton}">
        ${icons['bedtime']}
      </mwc-icon-button>

      <mwc-icon-button 
        class="white-icon toolButtons" 
        id="btnViewCompact" 
        title="Compact mode" 
        @click="${this._onBtnViewCompactClick}" 
        slot="actionItems" 
        ?hidden="${this.displayCompactButton}">
        ${icons['view_compact']}
      </mwc-icon-button>

      <mwc-icon-button 
        class="white-icon toolButtons" 
        id="btnViewComfy" 
        title="Comfy mode" 
        @click="${this._onBtnViewCompactClick}" 
        slot="actionItems" 
        ?hidden="${this.displayComfyButton}">
        ${icons['view_comfy']}
      </mwc-icon-button>

      <mwc-icon-button 
        class="white-icon toolButtons" 
        id="btnInfo" 
        title="Text info" 
        @click="${this._onBtnInfoClick}" 
        slot="actionItems" 
        ?hidden="${this.displayInfoButton}">
        ${icons['info']}
      </mwc-icon-button>
      
      <mwc-icon-button 
        class="white-icon toolButtons" 
        id="btnTools" 
        title="View options" 
        @click="${this._onBtnToolsClick}" 
        slot="actionItems" 
        ?hidden="${this.displayToolButton}">
        ${icons['visibility']}
      </mwc-icon-button>

      <mwc-icon-button 
        class="white-icon toolButtons" 
        id="btnShowParallels" 
        title="View parallels" 
        @click="${this._onBtnShowParallelsClick}" 
        slot="actionItems" 
        ?hidden="${this.displayToolButton}">
        ${icons['parallels']}
      </mwc-icon-button>
    </div>`;
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
      displayCompactButton: { type: Boolean},
      displayComfyButton: { type: Boolean},
      displayLightThemeButton: { type: Boolean },
      displayDarkThemeButton: { type: Boolean },
      displayViewModeButton: { type: Boolean},
      colorTheme: { type: String },
      suttaMetaText: { type: String }
    }
  }

  constructor() {
    super();
    this.path = '';
    this.suttaplexDisplay = '';
    this.suttaplexListEnabled = store.getState().suttaplexListDisplay;
    this.colorTheme = store.getState().colorTheme;
    this.mode = store.getState().toolbarOptions.mode;
    this.localizedStringsPath = '/localization/elements/sc-action-items';
    this.displaySettingMenu = store.getState().displaySettingMenu;
    this.displayToolButton = store.getState().displayToolButton;
    this.displayInfoButton = store.getState().displayInfoButton;
    this.displayViewModeButton = store.getState().displayViewModeButton;
  }

  get actions() {
    return {
      toggleSuttaplexDisplay(suttaplexdisplay) {
        store.dispatch({
          type: 'SUTTPLEX_LIST_DISPLAY',
          suttaplexdisplay: suttaplexdisplay
        })
      },
      changeToolbarTitle(title) {
        store.dispatch({
          type: "CHANGE_TOOLBAR_TITLE",
          title: title
        })
      },
      saveToolbarTitle(title) {
        store.dispatch({
          type: "SAVE_TOOLBAR_TITLE",
          toolbarTitle: title
        })
      },
      changeDisplaySettingMenuState(display) {
        store.dispatch({
          type: 'CHANGE_DISPLAY_SETTING_MENU_STATE',
          displaySettingMenu: display
        })
      },
      changeDisplayToolButtonState(display) {
        store.dispatch({
          type: 'CHANGE_DISPLAY_TOOL_BUTTON_STATE',
          displayToolButton: display
        })
      },
      toggleSuttaplexDisplay(view) {
        store.dispatch({
          type: 'SUTTPLEX_LIST_DISPLAY',
          suttaplexdisplay: view
        })
      },
      changeAppTheme(theme) {
        store.dispatch({
          type: 'CHANGE_COLOR_THEME',
          theme: theme
        })
      },
      changeDisplaySuttaParallelsState(displayState) {
        store.dispatch({
          type: 'CHANGE_DISPLAY_SUTTA_PARALLELS_STATE',
          displaySuttaParallels: displayState
        })
      },
    }
  }

  firstUpdated() {
    this._displayToolButtonStateChange();
    this._colorThemeChanged();
    this._displayViewModeButtonStateChange();
    this._viewModeChanged();
  }

  _onBtnLightThemeClick() {
    this.actions.changeAppTheme('light');
  }

  _onBtnDarkThemeClick() {
    this.actions.changeAppTheme('dark');
  }

  _onBtnInfoClick(e) {
    this.dispatchEvent(new CustomEvent('show-info-dialog', {
      bubbles: true,
      composed: true
    }));
  }

  _onBtnViewCompactClick(e) {
    this.actions.toggleSuttaplexDisplay(e.currentTarget.id === 'btnViewCompact' ? true : false);
    this._viewModeChanged();
  }

  _displayViewModeButtonStateChange() {
    let displayStyle = this.displayViewModeButton ? 'inherit' : 'none';
    this.shadowRoot.querySelector('#btnViewCompact').style.display = displayStyle;
    this.shadowRoot.querySelector('#btnViewComfy').style.display = displayStyle;
  }

  _viewModeChanged() {
    if (!this.displayViewModeButton) {
      return;
    }
    let isCompactView = store.getState().suttaplexListDisplay;
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
      let displaySuttaParallels = store.getState().displaySuttaParallels;
      if (displaySuttaParallels) {
        this.actions.changeDisplaySuttaParallelsState(false);
        this._hideSuttaParallels();
      }
      this.actions.changeDisplaySettingMenuState(true);
      this._showSettingMenu();
    } else {
      this.actions.changeDisplaySettingMenuState(false);
      this._hideSettingMenu();
    }
  }

  _hideSettingMenu() {
    this.dispatchEvent(new CustomEvent('hide-sc-top-sheet', {
      bubbles: true,
      composed: true
    }));
  }

  _showSettingMenu() {
    this.dispatchEvent(new CustomEvent('show-sc-top-sheet', {
      bubbles: true,
      composed: true
    }));
  }

  _hideSuttaParallels() {
    this.dispatchEvent(new CustomEvent('hide-sc-sutta-parallels', {
      bubbles: true,
      composed: true
    }));
  }

  _showSuttaParallels() {
    this.dispatchEvent(new CustomEvent('show-sc-sutta-parallels', {
      bubbles: true,
      composed: true
    }));
  }

  _onBtnShowParallelsClick() {
    this.displaySuttaParallels = store.getState().displaySuttaParallels;
    if (!this.displaySuttaParallels) {
      let displaySettingMenu = store.getState().displaySettingMenu;
      if (displaySettingMenu) {
        this.actions.changeDisplaySettingMenuState(false);
        this._hideSettingMenu();
      }
      this.actions.changeDisplaySuttaParallelsState(true);
      this._showSuttaParallels();
    } else {
      this.actions.changeDisplaySuttaParallelsState(false);
      this._hideSuttaParallels();
    }
  }

  _stateChanged(state) {
    super._stateChanged(state);
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
    if (this.suttaplexListEnabled !== state.suttaplexListDisplay) {
      this.suttaplexListEnabled = state.suttaplexListDisplay
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
      this._colorThemeChanged();
    }
    if (changedProps.has('suttaplexListEnabled')) {
      this._viewModeChanged();
    }
    if (changedProps.has('suttaMetaText')) {
    this._suttaMetaTextChanged();
    }
  }

  _suttaMetaTextChanged() {
    let displayStyle = this.suttaMetaText ? 'inherit' : 'none';
    this.shadowRoot.querySelector('#btnInfo').style.display = displayStyle;
  }

  _colorThemeChanged() {
    this.displayLightThemeButton = this.colorTheme === 'light' ? true : false;
    this.displayDarkThemeButton = !this.displayLightThemeButton;
    if (this.displayLightThemeButton) {
      this.shadowRoot.querySelector('#btnLightTheme').style.display = 'none';
      this.shadowRoot.querySelector('#btnDarkTheme').style.display = 'inherit';
    } else {
      this.shadowRoot.querySelector('#btnLightTheme').style.display = 'inherit';
      this.shadowRoot.querySelector('#btnDarkTheme').style.display = 'none';
    }
  }

  _displayToolButtonStateChange() {
    if (this.displayToolButton) {
      this.shadowRoot.querySelector('#btnTools').style.display = 'inherit';
      this.shadowRoot.querySelector('#btnInfo').style.display = 'inherit';
      this.shadowRoot.querySelector('#btnShowParallels').style.display = 'inherit';
      this._suttaMetaTextChanged();
    } else {
      this.shadowRoot.querySelector('#btnTools').style.display = 'none';
      this.shadowRoot.querySelector('#btnInfo').style.display = 'none';
      this.shadowRoot.querySelector('#btnShowParallels').style.display = 'none';
    }
  }

  _setToolButtonsVisible(visible) {
    this.shadowRoot.querySelectorAll('.toolButtons').forEach((e) => {
      if (e.style.display !== 'none') {
        if (visible) {
          e.classList.remove('invisible');
        } else {
          e.classList.add('invisible');
        }
      }
    });
  }
}

customElements.define('sc-action-items', SCActionItems);
