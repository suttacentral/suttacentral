import { LitElement, html, unsafeCSS } from 'lit';
import '@material/web/iconbutton/icon-button';

import { store } from '../../redux-store';
import { LitLocalized } from '../addons/sc-localization-mixin';
import { reduxActions } from '../addons/sc-redux-actions';
import { icon } from '../../img/sc-icon';
import { API_ROOT } from '../../constants';
/*
Base toolbar that appears on the top right in the header of every page.
*/

export class SCActionItems extends LitLocalized(LitElement) {
  static properties = {
    suttaplexListEnabled: { type: Boolean },
    localizedStringsPath: { type: String },
    displaySettingMenu: { type: Boolean },
    displayToolButton: { type: Boolean },
    displayInfoButton: { type: Boolean },
    tableOfContents: { type: Boolean },
    displayCompactButton: { type: Boolean },
    displayComfyButton: { type: Boolean },
    displayViewModeButton: { type: Boolean },
    displaySearchOptionsButton: { type: Boolean },
    displaySpeakerButton: { type: Boolean },
    colorTheme: { type: String },
    suttaMetaText: { type: String },
    suttaPublicationInfo: { type: Object },
    range_uid: { type: String },
    siteLanguage: { type: String },
  };

  constructor() {
    super();
    const state = store.getState();
    this.suttaplexListEnabled = state.suttaplexListDisplay;
    this.colorTheme = state.colorTheme;
    this.activeClass = this.colorTheme === 'light' ? 'active-light' : 'active-dark';
    this.localizedStringsPath = '/localization/elements/interface';
    this.currentRoute = state.currentRoute;
    this.siteLanguage = state.siteLanguage;

    reduxActions.changeDisplaySettingMenuState(false);
    reduxActions.changeDisplaySuttaParallelsState(false);
    reduxActions.changeDisplaySuttaToCState(false);
    reduxActions.changeDisplaySuttaInfoState(false);

    this.tableOfContents = !!state.tableOfContents.items.length;
    this.displaySettingMenu = state.displaySettingMenu;
    this.displayToolButton = state.displayToolButton;
    this.displayInfoButton = state.displayInfoButton;
    this.displayViewModeButton = state.displayViewModeButton;
    this.displayParallelTableView = state.displayParallelTableView;
    this.displaySearchOptionsButton = state.displaySearchOptionsButton;
    this.displaySpeakerButton = false;
    this.displayCompactButton = false;
  }

  render() {
    return html`
      <style>
        .white-icon {
          color: var(--sc-inverted-text-color);
        }

        #tools_menu {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 4px;
          height: 60px;
        }

        .invisible {
          display: none;
        }

        .toolButtons {
          position: relative;
          box-sizing: border-box;
          border-bottom: 4px solid transparent;
          border-top: 4px solid transparent;
          padding: 2.3px 0 2.3px 0;
          height: 60px;
          width: 48px;
        }

        #btnSearchFilter:after,
        #btnSearchOptions:after,
        #btnViewCompact:after,
        #btnViewComfy:after,
        #btnTools:after,
        #btnInfo:after,
        #btnShowParallels:after,
        #btnShowToC:after,
        #btnShowParallelTableView:after,
        #btnListenThisSutta::after {
          font-size: var(--sc-font-size-xxs);
          font-weight: 600;
          font-stretch: condensed;
          position: absolute;
          bottom: 2px;
          width: 100%;
          text-align: center;
        }

        #btnViewCompact:after {
          content: '${unsafeCSS(this.localize('interface:viewCompactButtonText'))}';
        }

        #btnViewComfy:after {
          content: '${unsafeCSS(this.localize('interface:viewComfyButtonText'))}';
        }

        #btnTools:after {
          content: '${unsafeCSS(this.localize('interface:toolsButtonText'))}';
        }

        #btnInfo:after {
          content: '${unsafeCSS(this.localize('interface:infoButtonText'))}';
        }

        #btnShowParallels:after {
          content: '${unsafeCSS(this.localize('interface:showParallelsButtonText'))}';
        }

        #btnShowToC:after {
          content: '${unsafeCSS(this.localize('interface:showToCButtonText'))}';
        }

        #btnShowParallelTableView:after {
          content: '${unsafeCSS(this.localize('interface:showParallelTableViewButtonText'))}';
        }

        #btnSearchOptions:after {
          content: '${unsafeCSS(this.localize('interface:searchOptionsButtonText'))}';
        }

        #btnSearchFilter:after {
          content: '${unsafeCSS(this.localize('interface:searchFilterButtonText'))}';
        }

        #btnListenThisSutta:after {
          content: 'Voice';
        }

        #btnSearchFilter,
        #btnSearchOptions,
        #btnShowParallels,
        #btnShowParallelTableView,
        #btnListenThisSutta {
          display: flex;
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
        }

        .icon {
          fill: var(--sc-inverted-text-color);
        }
      </style>

      <div id="tools_menu">
        <md-icon-button
          class="white-icon toolButtons"
          id="btnShowToC"
          @click=${this.#onBtnShowToCClick}
          slot="actionItems"
          ?hidden=${this.tableOfContents}
        >
          ${icon.toc}
        </md-icon-button>

        <md-icon-button
          class="white-icon toolButtons"
          id="btnViewCompact"
          @click=${this.#onBtnViewCompactClick}
          slot="actionItems"
          ?hidden=${this.displayCompactButton}
        >
          ${icon.view_compact}
        </md-icon-button>

        <md-icon-button
          class="white-icon toolButtons"
          id="btnViewComfy"
          @click=${this.#onBtnViewCompactClick}
          slot="actionItems"
          ?hidden=${this.displayComfyButton}
        >
          ${icon.view_comfy}
        </md-icon-button>

        <md-icon-button
          class="white-icon toolButtons"
          id="btnInfo"
          @click=${this.#onBtnInfoClick}
          slot="actionItems"
          ?hidden=${this.displayInfoButton}
        >
          ${icon.info}
        </md-icon-button>

        <md-icon-button
          class="white-icon toolButtons"
          id="btnTools"
          @click=${this.#onBtnToolsClick}
          slot="actionItems"
          ?hidden=${this.displayToolButton}
        >
          ${icon.visibility}
        </md-icon-button>

        <md-icon-button
          class="white-icon toolButtons"
          id="btnSearchOptions"
          @click=${this.btnSearchOptionsClick}
          slot="actionItems"
          ?hidden=${this.displaySearchOptionsButton}
        >
          ${icon.language}
        </md-icon-button>

        <md-icon-button
          class="white-icon toolButtons"
          id="btnSearchFilter"
          @click=${this.#onBtnSearchFilterClick}
          slot="actionItems"
          ?hidden=${this.displaySearchOptionsButton}
        >
          ${icon.filter}
        </md-icon-button>

        <md-icon-button
          class="white-icon toolButtons"
          id="btnShowParallels"
          @click=${this.#onBtnShowParallelsClick}
          slot="actionItems"
          ?hidden=${this.displayToolButton}
        >
          ${icon.parallels}
        </md-icon-button>

        <md-icon-button
          class="white-icon toolButtons"
          id="btnShowParallelTableView"
          @click=${this.#onBtnShowParallelTableViewClick}
          slot="actionItems"
        >
          ${this.displayParallelTableView ? icon.tableView_twotone : icon.tableView}
        </md-icon-button>

        <md-icon-button
          class="white-icon toolButtons"
          id="btnListenThisSutta"
          slot="actionItems"
          style="display: none;"
          @click=${this.#btnListenThisSuttaClick}
        >
          ${icon.speaker}
        </md-icon-button>
      </div>
    `;
  }

  firstUpdated() {
    this.#displayToolButtonStateChange();
    this.#displayViewModeButtonStateChange();
    this.#viewModeChanged();
    this.#displayToCButtonStateChange();
    this.#setBtnShowParallelTableViewDisplayState();
    this.#setBtnShowParallelTableViewIcon();
    this.#displaySearchOptionsButtonStateChange();
    this.scSiteLayout = document.querySelector('sc-site-layout');
  }

  hideTopSheets() {
    this.#hideSettingMenu();
    this.#hideSuttaInfo();
    this.#hideSuttaParallels();
    this.#hideSuttaToC();
    this.#hideSearchOptions();
    this.#hideSearchFilter();
  }

  #onBtnInfoClick() {
    this.displaySuttaInfo = store.getState().displaySuttaInfo;
    if (!this.displaySuttaInfo) {
      this.#closeAllTopSheetsOfTextPage();
      reduxActions.changeDisplaySuttaInfoState(true);
      this.#showSuttaInfo();
    } else {
      reduxActions.changeDisplaySuttaInfoState(false);
      this.#hideSuttaInfo();
    }
  }

  #showSuttaInfo() {
    const isSegmentedText = !this.suttaMetaText;
    if (isSegmentedText) {
      this.scSiteLayout.querySelector('#bilara-sutta-info').show?.();
    } else {
      this.scSiteLayout.querySelector('#sutta-info').show?.();
    }
    this.shadowRoot.querySelector('#btnInfo')?.classList.add(this.activeClass);
  }

  #onBtnViewCompactClick(e) {
    reduxActions.toggleSuttaplexDisplay(e.currentTarget.id === 'btnViewCompact');
    this.#viewModeChanged();
  }

  #displayViewModeButtonStateChange() {
    this.#toggleElementVisibility('btnViewCompact', this.displayViewModeButton);
    this.#toggleElementVisibility('btnViewComfy', this.displayViewModeButton);
    this.#viewModeChanged();
  }

  #setBtnShowParallelTableViewDisplayState() {
    const displayStyle = this.currentRoute.name?.toUpperCase() === 'SUTTAPLEX' ? 'inherit' : 'none';
    const btnShowParallelTableView = this.shadowRoot.querySelector('#btnShowParallelTableView');
    if (btnShowParallelTableView) {
      btnShowParallelTableView.style.display = displayStyle;
    }
  }

  #viewModeChanged() {
    if (!this.displayViewModeButton) {
      return;
    }
    const isCompactView = store.getState().suttaplexListDisplay;
    this.displayCompactButton = !isCompactView;
    this.displayComfyButton = isCompactView;
    this.#toggleElementVisibility('btnViewComfy', isCompactView);
    this.#toggleElementVisibility('btnViewCompact', !isCompactView);
    this.requestUpdate();
  }

  #onBtnToolsClick(e) {
    this.displaySettingMenu = store.getState().displaySettingMenu;
    if (!this.displaySettingMenu) {
      this.#closeAllTopSheetsOfTextPage();
      reduxActions.changeDisplaySettingMenuState(true);
      this.#showSettingMenu();
    } else {
      reduxActions.changeDisplaySettingMenuState(false);
      this.#hideSettingMenu();
    }
  }

  #closeAllTopSheetsOfTextPage() {
    const { displaySettingMenu, displaySuttaParallels, displaySuttaInfo, displaySuttaToC } = store.getState();
    if (displaySettingMenu) {
      reduxActions.changeDisplaySettingMenuState(false);
      this.#hideSettingMenu();
    }
    if (displaySuttaParallels) {
      reduxActions.changeDisplaySuttaParallelsState(false);
      this.#hideSuttaParallels();
    }
    if (displaySuttaInfo) {
      reduxActions.changeDisplaySuttaInfoState(false);
      this.#hideSuttaInfo();
    }
    if (displaySuttaToC) {
      reduxActions.changeDisplaySuttaToCState(false);
      this.#hideSuttaToC();
    }
  }

  btnSearchOptionsClick(e) {
    this.#hideSearchFilter();
    const searchOptionsTopSheet = this.scSiteLayout.querySelector('#search-options');
    searchOptionsTopSheet.toggle();
    this.shadowRoot.querySelector('#btnSearchOptions')?.classList.toggle(this.activeClass);
  }

  #onBtnSearchFilterClick(e) {
    this.#hideSearchOptions();
    const searchFilterTopSheet = this.scSiteLayout.querySelector('#search-filter');
    searchFilterTopSheet.toggle();
    this.shadowRoot.querySelector('#btnSearchFilter')?.classList.toggle(this.activeClass);
  }

  #hideSettingMenu() {
    this.scSiteLayout.querySelector('#setting_menu')?.hide?.();
    reduxActions.changeDisplaySettingMenuState(false);
    this.shadowRoot.querySelector('#btnTools')?.classList.remove(this.activeClass);
  }

  #showSettingMenu() {
    this.scSiteLayout.querySelector('#setting_menu')?.show?.();
    this.shadowRoot.querySelector('#btnTools')?.classList.add(this.activeClass);
  }

  #hideSuttaParallels() {
    this.scSiteLayout.querySelector('#sutta_parallels')?.hide?.();
    reduxActions.changeDisplaySuttaParallelsState(false);
    this.shadowRoot.querySelector('#btnShowParallels')?.classList.remove(this.activeClass);
  }

  #hideSuttaToC() {
    this.scSiteLayout.querySelector('#sutta_toc')?.hide?.();
    reduxActions.changeDisplaySuttaToCState(false);
    this.shadowRoot.querySelector('#btnShowToC')?.classList.remove(this.activeClass);
  }

  #hideSuttaInfo() {
    this.scSiteLayout.querySelector('#sutta-info')?.hide?.();
    this.scSiteLayout.querySelector('#bilara-sutta-info')?.hide?.();
    reduxActions.changeDisplaySuttaInfoState(false);
    this.shadowRoot.querySelector('#btnInfo')?.classList.remove(this.activeClass);
  }

  #hideSearchOptions() {
    const searchOptions = this.scSiteLayout.querySelector('#search-options');
    if (searchOptions) {
      searchOptions.hide?.();
    }
    this.shadowRoot.querySelector('#btnSearchOptions')?.classList.remove(this.activeClass);
  }

  #hideSearchFilter() {
    const searchFilter = this.scSiteLayout.querySelector('#search-filter');
    if (searchFilter) {
      searchFilter.hide?.();
    }
    this.shadowRoot.querySelector('#btnSearchFilter')?.classList.remove(this.activeClass);
  }

  #showSuttaParallels() {
    this.scSiteLayout.querySelector('#sutta_parallels')?.show?.();
    this.shadowRoot.querySelector('#btnShowParallels')?.classList.add(this.activeClass);
  }

  #showSuttaToC() {
    this.scSiteLayout.querySelector('#sutta_toc')?.show?.();
    this.shadowRoot.querySelector('#btnShowToC')?.classList.add(this.activeClass);
  }

  #onBtnShowParallelsClick() {
    this.bindDataToSCSuttaParallels(this.range_uid || store.getState().currentRoute.params.suttaId);
    this.displaySuttaParallels = store.getState().displaySuttaParallels;
    if (!this.displaySuttaParallels) {
      this.#closeAllTopSheetsOfTextPage();
      reduxActions.changeDisplaySuttaParallelsState(true);
      this.#showSuttaParallels();
    } else {
      reduxActions.changeDisplaySuttaParallelsState(false);
      this.#hideSuttaParallels();
    }
  }

  bindDataToSCSuttaParallels(uid) {
    if (!uid) {
      return;
    }
    const url = `${API_ROOT}/suttaplex/${uid}?language=${this.siteLanguage}`;
    fetch(url)
      .then(r => r.json())
      .then(suttaplex => {
        this.scSiteLayout.querySelector('#sutta_parallels').suttaplexItem = suttaplex[0];
      })
      .catch(e => console.error(e));
  }

  #onBtnShowParallelTableViewClick() {
    reduxActions.changeDisplayParallelTableViewState(!this.displayParallelTableView);
  }

  #setBtnShowParallelTableViewIcon() {
    this.requestUpdate();
  }

  showParallelsTopSheet() {
    this.#onBtnShowParallelsClick();
  }

  #onBtnShowToCClick() {
    this.displaySuttaToC = store.getState().displaySuttaToC;
    if (!this.displaySuttaToC) {
      this.#closeAllTopSheetsOfTextPage();
      reduxActions.changeDisplaySuttaToCState(true);
      this.#showSuttaToC();
    } else {
      reduxActions.changeDisplaySuttaToCState(false);
      this.#hideSuttaToC();
    }
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
    if (this.siteLanguage !== state.siteLanguage) {
      this.siteLanguage = state.siteLanguage;
    }
    if (this.displaySearchOptionsButton !== state.displaySearchOptionsButton) {
      this.displaySearchOptionsButton = state.displaySearchOptionsButton;
      this.#displaySearchOptionsButtonStateChange();
    }
  }

  updated(changedProps) {
    if (changedProps.has('displayToolButton')) {
      this.#displayToolButtonStateChange();
    }
    if (changedProps.has('displayViewModeButton')) {
      this.#displayViewModeButtonStateChange();
    }
    if (changedProps.has('colorTheme')) {
      this.activeClass = this.colorTheme === 'light' ? 'active-light' : 'active-dark';
      this.#resetToolButtonsActiveClass();
    }
    if (changedProps.has('suttaplexListEnabled')) {
      this.#viewModeChanged();
    }
    if (changedProps.has('suttaMetaText') || changedProps.has('suttaPublicationInfo')) {
      this.#suttaMetaTextChanged();
    }
    if (changedProps.has('tableOfContents')) {
      this.#displayToCButtonStateChange();
    }
  }

  #suttaMetaTextChanged() {
    this.#toggleElementVisibility('btnInfo', this.suttaMetaText || this.suttaPublicationInfo);
  }

  #toggleElementVisibility(elementId, isVisible) {
    const element = this.shadowRoot.querySelector(`#${elementId}`);
    if (element) {
      element.style.display = isVisible ? 'inherit' : 'none';
    }
  }

  #displayToCButtonStateChange() {
    this.#toggleElementVisibility('btnShowToC', this.tableOfContents);
  }

  #displaySearchOptionsButtonStateChange() {
    this.#toggleElementVisibility('btnSearchOptions', this.displaySearchOptionsButton);
    this.#toggleElementVisibility('btnSearchFilter', this.displaySearchOptionsButton);
  }

  #displayToolButtonStateChange() {
    this.#suttaMetaTextChanged();
    this.shadowRoot.querySelector('#tools_menu').classList
      .toggle('contextToolbarExpand', this.displayToolButton);
    this.#toggleElementVisibility('btnTools', this.displayToolButton);
    this.#toggleElementVisibility('btnInfo', this.displayToolButton);
    this.#toggleElementVisibility('btnShowParallels', this.displayToolButton);
  }

  #resetToolButtonsActiveClass() {
    this.shadowRoot.querySelectorAll('.toolButtons').forEach(e => {
      if (e.classList.contains('active-light') || e.classList.contains('active-dark')) {
        e.classList.remove('active-light');
        e.classList.remove('active-dark');
        e.classList.add(this.activeClass);
      }
    });
  }

  showSpeakerButton() {
    this.shadowRoot.querySelector('#btnListenThisSutta').style.display = 'inherit';
  }

  hideSpeakerButton() {
    this.shadowRoot.querySelector('#btnListenThisSutta').style.display = 'none';
  }

  #btnListenThisSuttaClick() {
    const textBilara = document.querySelector('sc-text-bilara');
    textBilara?.listenThisSutta();
  }
}

customElements.define('sc-action-items', SCActionItems);
