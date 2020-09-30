import { LitElement, html, css } from 'lit-element';
import '@polymer/iron-pages/iron-pages.js';
import { store } from '../redux-store';
import { LitLocalized } from '../elements/addons/localization-mixin';
import { SCPageStaticSelectorStyles, SCPageStaticSelectorOriginStyles } from './styles/sc-static-page-selector-styles.js';

class SCStaticPageSelector extends LitLocalized(LitElement) {
  static get styles() {
    return css`
      ${SCPageStaticSelectorStyles}
    `;
  }

  render() {
    return html`
      ${SCPageStaticSelectorOriginStyles}

      ${this._createMetaData()}
      ${this._changeToolbarTitle()}

      <iron-pages id="pages" role="main" .selected="${this.pages}" attr-for-selected="name" fallback-selection="NOT-FOUND">
        <home-page name="HOME"></home-page>
        <sc-donations-page name="DONATIONS"></sc-donations-page>
        <sc-donate-now-page id="donate" name="DONATE-NOW"></sc-donate-now-page>
        <sc-downloads-page name="DOWNLOADS"></sc-downloads-page>
        <sc-offline-page name="OFFLINE"></sc-offline-page>
        <sc-numbering-page name="NUMBERING"></sc-numbering-page>
        <sc-methodology-page name="METHODOLOGY"></sc-methodology-page>
        <sc-acknowledgments-page name="ACKNOWLEDGMENTS"></sc-acknowledgments-page>
        <sc-licensing-page name="LICENSING"></sc-licensing-page>
        <sc-about-page name="ABOUT"></sc-about-page>
        <sc-introduction name="INTRODUCTION"></sc-introduction>
        <sc-start name="START"></sc-start>
        <sc-discourses name="DISCOURSES"></sc-discourses>
        <sc-vinaya name="VINAYA"></sc-vinaya>
        <sc-abhidhamma name="ABHIDHAMMA"></sc-abhidhamma>
        <sc-subjects-page name="SUBJECTS"></sc-subjects-page>
        <sc-a-new-beginning name="A-NEW-BEGINNING"></sc-a-new-beginning>
        <sc-similes-page name="SIMILES"></sc-similes-page>
        <sc-names-page name="NAMES"></sc-names-page>
        <sc-terminology-page name="TERMINOLOGY"></sc-terminology-page>
        <sc-abbreviations-page name="ABBREVIATIONS"></sc-abbreviations-page>
        <sc-donation-success-page name="DONATION-SUCCESS"></sc-donation-success-page>
        <sc-general-guide name="GENERAL-GUIDE-SUJATO"></sc-general-guide>
        <sc-dn-guide name="DN-GUIDE-SUJATO"></sc-dn-guide>
        <sc-mn-guide name="MN-GUIDE-SUJATO"></sc-mn-guide>
        <sc-sn-guide name="SN-GUIDE-SUJATO"></sc-sn-guide>
        <sc-an-guide name="AN-GUIDE-SUJATO"></sc-an-guide>
        <sc-an-introduction name="AN-INTRODUCTION-BODHI"></sc-an-introduction>
        <sc-languages-page name="LANGUAGES"></sc-languages-page>
        <div name="NOT-FOUND" class="page-not-found-container">
          <h2>${this.localize('error404')}</h2>
          <h3>${this.localize('pageNotFound')}</h3>
        </div>
      </iron-pages>
    `;
  }

  static get properties() {
    return {
      selectedPage: { type: String },
      pages: { type: String },
      localizedStringsPath: { type: String },
      shouldShowSecondToolbar: { type: Boolean },
      shouldShowTipitakaToolbar: { type: Boolean },
      shouldShowAcademicToolbar: { type: Boolean },
      shouldShowOrganizationalToolbar: { type: Boolean },
      shouldShowGuidesToolbar: { type: Boolean },
      noToolbarSelected: { type: Boolean },
      resources: { type: Object }
    }
  }

  constructor() {
    super();
    this.selectedPage = store.getState().currentRoute.name;
    this.localizedStringsPath = '/localization/elements/sc-static-page-selector';
    this.shouldShowSecondToolbar = false;
    this.shouldShowTipitakaToolbar = false;
    this.shouldShowAcademicToolbar = false;
    this.shouldShowOrganizationalToolbar = false;
    this.shouldShowGuidesToolbar = false;
    this.noToolbarSelected = true;
    this.resources = {};
  }

  _stateChanged(state) {
    super._stateChanged(state);
    if (this.selectedPage !== state.currentRoute.name) {
      this.selectedPage = state.currentRoute.name;
    }
  }

  firstUpdated() {
    this.selectedPage = store.getState().currentRoute.name;
    this._changeView();
    this._updateNav();
  }

  updated(changedProps) {
    super.updated(changedProps);
    if (changedProps.has('selectedPage')) {
      this._changeView();
      this._updateNav();
    }
    if (changedProps.has('resources')) {
      //
    }
    if (changedProps.has('pages')) {
      this.selectedPage = this.pages;
    }
  }

  _isToolbarSelected() {
    return !(this.shouldShowSecondToolbar
              || this.shouldShowTipitakaToolbar
                || this.shouldShowAcademicToolbar
                  || this.shouldShowOrganizationalToolbar
                    || this.shouldShowGuidesToolbar);
  }

  _changeView() {
    if (this.selectedPage.substr(0, 5) === "SUTTA" || this.selectedPage === "SEARCH") {
      return;
    }
    this._setVisibleToolbar();
    this.shadowRoot.querySelector('#pages').selected = this.selectedPage;

    switch (this.selectedPage.toLowerCase()) {
      case 'abbreviations':            import('./static/abbreviations-page.js'); break;
      case 'abhidhamma':               import('./static/abhidhamma-page.js'); break;
      case 'about':                    import('./static/about-page.js'); break;
      case 'acknowledgments':          import('./static/acknowledgments-page.js'); break;
      case 'a-new-beginning':          import('./static/a-new-beginning-page.js'); break;
      case 'an-guide-sujato':          import('./static/an-guide-sujato-page.js'); break;
      case 'an-introduction-bodhi':    import('./static/an-introduction-bodhi-page.js'); break;
      case 'discourses':               import('./static/discourses-page.js'); break;
      case 'dn-guide-sujato':          import('./static/dn-guide-sujato-page.js'); break;
      case 'donate-now':               import('./static/donate-now-page.js'); break;
      case 'donations':                import('./static/donations-page.js'); break;
      case 'donation-success':         import('./static/donation-success-page.js'); break;
      case 'downloads':                import('./static/downloads-page.js'); break;
      case 'general-guide-sujato':     import('./static/general-guide-sujato-page.js'); break;
      case 'home':                     import('./static/home-page.js'); break;
      case 'introduction':             import('./static/introduction-page.js'); break;
      case 'languages':                import('./static/languages-page.js'); break;
      case 'licensing':                import('./static/licensing-page.js'); break;
      case 'methodology':              import('./static/methodology-page.js'); break;
      case 'mn-guide-sujato':          import('./static/mn-guide-sujato-page.js'); break;
      case 'names':                    import('./static/names-page.js'); break;
      case 'numbering':                import('./static/numbering-page.js'); break;
      case 'offline':                  import('./static/offline-page.js'); break;
      case 'similes':                  import('./static/similes-page.js'); break;
      case 'sn-guide-sujato':          import('./static/sn-guide-sujato-page.js'); break;
      case 'start':                    import('./static/start-page.js'); break;
      case 'subjects':                 import('./static/subjects-page.js'); break;
      case 'terminology':              import('./static/terminology-page.js'); break;
      case 'vinaya':                   import('./static/vinaya-page.js'); break;
    }

    this._resetDonationForm();
  }

  _resetDonationForm() {
    const donationForm = this.shadowRoot.querySelector('#donate');
    if (donationForm.hasOwnProperty('resetForm')) {
      donationForm.resetForm();
    }
  }

  _setVisibleToolbar() {
    this.shouldShowSecondToolbar = ['SUBJECTS', 'SIMILES', 'NAMES', 'TERMINOLOGY'].includes(this.selectedPage);
    this.shouldShowTipitakaToolbar = ['DISCOURSES', 'VINAYA', 'ABHIDHAMMA'].includes(this.selectedPage);
    this.shouldShowAcademicToolbar = ['NUMBERING', 'ABBREVIATIONS', 'METHODOLOGY'].includes(this.selectedPage);
    this.shouldShowOrganizationalToolbar = ['ACKNOWLEDGMENTS', 'LICENSING', 'ABOUT'].includes(this.selectedPage);
    this.shouldShowGuidesToolbar = ['GENERAL-GUIDE-SUJATO', 'DN-GUIDE-SUJATO', 'MN-GUIDE-SUJATO', 'SN-GUIDE-SUJATO', 'AN-GUIDE-SUJATO', 'AN-INTRODUCTION-BODHI'].includes(this.selectedPage);

    this.actions.setStaticPagesToolbarDisplayState({
      displayFirstToolbar: this._isToolbarSelected(),
      displaySecondToolbar: this.shouldShowSecondToolbar,
      displayTipitakaToolbar: this.shouldShowTipitakaToolbar,
      displayAcademicToolbar: this.shouldShowAcademicToolbar,
      displayOrganizationalToolbar: this.shouldShowOrganizationalToolbar,
      displayGuidesToolbar: this.shouldShowGuidesToolbar,
    });
  }

  _createMetaData() {
    if (!this.localize) return;
    const description = this.localize('metaDescriptionText');
    const pageName = this.localize(`${this.selectedPage}`);
    document.dispatchEvent(new CustomEvent('metadata', {
      detail: {
        pageTitle: `SuttaCentral—${pageName.toLowerCase()}`,
        title: `SuttaCentral—${pageName.toLowerCase()}`,
        description: description,
        bubbles: true,
        composed: true
      }
    }));
  }

  _changeToolbarTitle() {
    if (!this.localize) return;
    if (this.selectedPage.toLowerCase() === 'home') return;
    const pageNameTitle = this.localize(`${this.selectedPage}-TITLE`);
    this.actions.changeToolbarTitle(pageNameTitle);
  }

  _updateNav() {
    let navArray = store.getState().navigationArray;
    let currentPath = store.getState().currentRoute.path;
    navArray.length = 1;
    const pageName = this.localize(`${this.selectedPage}`);
    if (currentPath !== '/' && (!navArray[1] || navArray[1].type !== 'staticPage')) {
      navArray.push(
        {
          'title': pageName,
          'url': currentPath,
          'type': 'staticPage',
        }
      );
      this.actions.setNavigation(navArray);
      this.actions.setCurrentNavPosition(1);
    }
  }

  get actions() {
    return {
      changeToolbarTitle(title) {
        store.dispatch({
          type: "CHANGE_TOOLBAR_TITLE",
          title: title
        })
      },
      setNavigation(navArray) {
        store.dispatch({
          type: 'SET_NAVIGATION',
          navigationArray: navArray
        })
      },
      setCurrentNavPosition(position) {
        store.dispatch({
          type: 'CHANGE_CURRENT_NAV_POSITION_STATE',
          currentNavPosition: position
        })
      },
      setStaticPagesToolbarDisplayState(toolbarDisplayState) {
        store.dispatch({
          type: 'CHANGE_STATIC_PAGES_TOOLBAR_DISPLAY_STATE',
          staticPagesToolbarDisplayState: toolbarDisplayState
        })
      },
    }
  }
}

customElements.define('sc-static-page-selector', SCStaticPageSelector);
