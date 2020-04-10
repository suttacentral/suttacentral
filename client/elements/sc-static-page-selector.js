import { LitElement, html, css } from 'lit-element';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import '@polymer/iron-pages/iron-pages.js';
import '@polymer/paper-tabs/paper-tabs.js';

import { store } from '../redux-store';
import { LitLocalized } from '../elements/addons/localization-mixin';
import { throttle } from 'throttle-debounce';

class SCStaticPageSelector extends LitLocalized(LitElement) {
  render() {
    return html`
      <style>
        app-toolbar {
          background-color: var(--sc-primary-color);
          height: auto;
        }

        h1 {
          @apply --sc-serif-font;
          @apply --sc-mixed-small-caps;
          @apply --sc-skolar-font-size-static-main-title;
          text-align: left;
          color: var(--sc-tertiary-text-color);
          padding-top: 8px;
          padding-bottom: 4px;
          margin: 0;
          line-height: 1em;
          font-weight: normal;
        }

        .subtitle {
          @apply --sc-skolar-font-size-static-subtitle;
          @apply --paper-font-common-base;
          color: var(--sc-tertiary-text-color);
          font-style: italic;
          margin-bottom: 24px;
          margin-top: 0;
          text-align: center;
        }

        [lang="ar"],
        [lang="si"],
        [lang="fa"],
        [lang="he"],
        [lang="hi"],
        [lang="vi"],
        [lang="jpn"],
        [lang="lzh"],
        [lang="zh"],
        [lang="mr"],
        [lang="my"],
        [lang="ta"],
        [lang="th"],
        [lang="xct"],
        [lang="ko"],
        [lang="bn"] {
          font-synthesis: none;
        }

        .title {
          max-width: 100%;
        }

        .title-text {
          text-align: center;
          color: var(--sc-tertiary-text-color);
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .title-logo-icon {
          vertical-align: bottom;
          height: var(--sc-size-xxl);
          width: var(--sc-size-xxl);
          margin: 0 var(--sc-size-sm);
        }

        .page-not-found-container {
          @apply --sc-skolar-font-size-static-subtitle;
          @apply --sc-sans-font;
          color: var(--sc-secondary-text-color);
          margin-top: var(--sc-size-xxl);
          text-align: center;
        }

        .navigation-tabs {
          width: 100%;
          --paper-tabs-selection-bar-color: var(--sc-primary-color-light);
        }

        .nav-link {
          color: var(--sc-tertiary-text-color);
          --paper-tab-ink: var(--sc-primary-color-light);
          padding-left: 10px;
          padding-right: 10px;
          @apply --sc-all-caps;
        }

        #nav_toolbar {
          background-color: var(--sc-primary-color-dark);
          height: auto;
        }

        .link-anchor {
          position: absolute;
          width: calc(100% + 20px);
          height: 100%;
        }

        @media (max-width: 925px) {
          .subtitle {
            @apply --sc-skolar-font-size-xl;
            margin-bottom: 0.5em;
          }
        }

        @media (max-width: 800px) {
          .title {
            margin-left: initial;
          }
        }

        @media (max-width: 600px) {
          h1 {
            @apply --sc-skolar-font-size-xxl;
            padding-top: 0.2em;
          }
          .title-logo-icon {
            height: 40px;
            width: 40px;
          }
          .subtitle {
            @apply --sc-skolar-font-size-md;
            margin-bottom: 0.5em;
          }
        }

        #pages {
          /* Subtract height of top bar */
          min-height: calc(100vh - 145px - var(--sc-size-xxl) - var(--sc-size-xl));
          position: relative;
        }

        #title_toolbar {
          position: absolute;
          padding-top: 58px;
          padding-left: 0;
          padding-right: 0;
          top: 0;
          left: 50%;
          z-index: 999;
          transform: translateX(-50%);
          width: 100%;
        }

        #subtitle_toolbar {
          padding-top: 62px;
          padding-bottom: var(--sc-size-md-larger);
        }

        @media print {
          app-toolbar {
            display: none;
          }
        }

        .title-home-link {
          text-decoration: none;
          background: none;
          height: 100%;
          /* display: flex; */
          align-items: center;
          justify-content: flex-start;
          color: var(--sc-tertiary-text-color);
          pointer-events: auto;
        }

        .title-home-logo-link {
          pointer-events: auto;
        }

        .title-home-link:hover {
          background: none;
        }

        .title-home-link:focus {
          outline: none;
        }

        .hideTitle {
          display: none;
        }
      </style>

      ${this._createMetaData()}
      ${this._changeToolbarTitle()}

      <app-toolbar id="title_toolbar">
        <div class="title" main-title="">
          <span class="title-text">
            <a class="title-home-logo-link" href="/"><iron-icon class="title-logo-icon" icon="sc-svg-icons:sc-logo"></iron-icon></a>
            <a class="title-home-link" href="/"><h1>SuttaCentral</h1></a>
          </span>
        </div>
      </app-toolbar>

      <app-toolbar id="subtitle_toolbar">
        <div class="title" main-title="">
          <p class="subtitle" lang="${this.language}"><a class="title-home-link" href="/">${this.localize('pageSubtitle')}</a></p>
        </div>
      </app-toolbar>

      <app-toolbar id="nav_toolbar" bottom-item="" sticky>
        ${this.toolbarSelectedTemplate}
        ${this.shouldShowSecondToolbarTemplate}
        ${this.shouldShowTipitakaToolbarTemplate}
        ${this.shouldShowAcademicToolbarTemplate}
        ${this.shouldShowOrganizationalToolbarTemplate}
        ${this.shouldShowGuidesToolbarTemplate}
      </app-toolbar>

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

  get toolbarSelectedTemplate() {
    return html`
      ${this._isToolbarSelected() ? html`
        <paper-tabs id="nav_tabs" class="navigation-tabs" selected="0" scrollable="" hide-scroll-buttons="">
            <paper-tab class="nav-link" data-name="INTRODUCTION">
              <div>${this.localize('INTRODUCTION')}</div>
              <a class="link-anchor" aria-label="${this.localize('INTRODUCTION')}" href="/introduction" tabindex="-1"></a>
            </paper-tab>
            <paper-tab class="nav-link" data-name="DONATIONS">
              <div>${this.localize('DONATIONS')}</div>
              <a class="link-anchor" aria-label="${this.localize('DONATIONS')}" href="/donations" tabindex="-1"></a>
            </paper-tab>
            <paper-tab class="nav-link" data-name="OFFLINE">
              <div>${this.localize('USEOFFLINE')}</div>
              <a class="link-anchor" aria-label="${this.localize('USEOFFLINE')}" href="/offline" tabindex="-1"></a>
            </paper-tab>
            <paper-tab class="nav-link" data-name="EXTERNAL_WHAT'S_NEW">
              <div>${this.localize('WHATSNEW')}</div>
              <a class="link-anchor" aria-label="${this.localize('WHATSNEW')}" href="https://discourse.suttacentral.net/c/meta/updates" tabindex="-1" target="_blank" rel="noopener">
              </a>
            </paper-tab>
          </paper-tabs>
      ` : ''}
    `;
  }

  get shouldShowSecondToolbarTemplate() {
    return html`
      ${this.shouldShowSecondToolbar ? html`
        <paper-tabs id="second_nav_tabs" class="navigation-tabs" selected="0" scrollable="" hide-scroll-buttons="">
            <paper-tab class="nav-link" data-name="SUBJECTS">
              <div>${this.localize('SUBJECTS')}</div>
              <a class="link-anchor" aria-label="${this.localize('SUBJECTS')}" href="/subjects" tabindex="-1"></a>
            </paper-tab>
            <paper-tab class="nav-link" data-name="SIMILES">
              <div>${this.localize('SIMILES')}</div>
              <a class="link-anchor" aria-label="${this.localize('SMILES')}" href="/similes" tabindex="-1"></a>
            </paper-tab>
            <paper-tab class="nav-link" data-name="NAMES">
              <div>${this.localize('NAMES')}</div>
              <a class="link-anchor" aria-label="${this.localize('NAMES')}" href="/names" tabindex="-1"></a>
            </paper-tab>
            <paper-tab class="nav-link" data-name="TERMINOLOGY">
              <div>${this.localize('TERMINOLOGY')}</div>
              <a class="link-anchor" aria-label="${this.localize('TERMINOLOGY')}" href="/terminology" tabindex="-1"></a>
            </paper-tab>
          </paper-tabs>
      ` : ''}
    `;
  }

  get shouldShowTipitakaToolbarTemplate() {
    return html`
      ${this.shouldShowTipitakaToolbar ? html`
        <paper-tabs id="tipitaka_nav_tabs" class="navigation-tabs" selected="0" scrollable="" hide-scroll-buttons="">
            <paper-tab class="nav-link" data-name="DISCOURSES">
              <div>${this.localize('DISCOURSES')}</div>
              <a class="link-anchor" aria-label="${this.localize('DISCOURSES')}" href="/discourses" tabindex="-1"></a>
            </paper-tab>
            <paper-tab class="nav-link" data-name="VINAYA">
              <div>${this.localize('VINAYA')}</div>
              <a class="link-anchor" aria-label="${this.localize('VINAYA')}" href="/vinaya" tabindex="-1"></a>
            </paper-tab>
            <paper-tab class="nav-link" data-name="ABHIDHAMMA">
              <div>${this.localize('ABHIDHAMMA')}</div>
              <a class="link-anchor" aria-label="${this.localize('ABHIDHAMMA')}" href="/abhidhamma" tabindex="-1"></a>
            </paper-tab>
          </paper-tabs>
      ` : ''}
    `;
  }

  get shouldShowAcademicToolbarTemplate() {
    return html`
      ${this.shouldShowAcademicToolbar ? html`
        <paper-tabs id="academic_nav_tabs" class="navigation-tabs" selected="0" scrollable="" hide-scroll-buttons="">
            <paper-tab class="nav-link" data-name="NUMBERING">
              <div>${this.localize('NUMBERING')}</div>
              <a class="link-anchor" aria-label="${this.localize('NUMBERING')}" href="/numbering" tabindex="-1"></a>
            </paper-tab>
            <paper-tab class="nav-link" data-name="ABBREVIATIONS">
              <div>${this.localize('ABBREVIATIONS')}</div>
              <a class="link-anchor" aria-label="${this.localize('ABBREVIATIONS')}" href="/abbreviations" tabindex="-1"></a>
            </paper-tab>
            <paper-tab class="nav-link" data-name="METHODOLOGY">
              <div>${this.localize('METHODOLOGY')}</div>
              <a class="link-anchor" aria-label="${this.localize('METHODOLOGY')}" href="/methodology" tabindex="-1"></a>
            </paper-tab>
          </paper-tabs>
      ` : ''}
    `;
  }

  get shouldShowOrganizationalToolbarTemplate() {
    return html`
      ${this.shouldShowOrganizationalToolbar ? html`
        <paper-tabs id="organizational_nav_tabs" class="navigation-tabs" selected="0" scrollable="" hide-scroll-buttons="">
            <paper-tab class="nav-link" data-name="ACKNOWLEDGMENTS">
              <div>${this.localize('ACKNOWLEDGMENTS')}</div>
              <a class="link-anchor" aria-label="${this.localize('ACKNOWLEDGMENTS')}" href="/acknowledgments" tabindex="-1"></a>
            </paper-tab>
            <paper-tab class="nav-link" data-name="LICENSING">
              <div>${this.localize('LICENSING')}</div>
              <a class="link-anchor" aria-label="${this.localize('LICENSING')}" href="/licensing" tabindex="-1"></a>
            </paper-tab>
            <paper-tab class="nav-link" data-name="ABOUT">
              <div>${this.localize('ABOUT')}</div>
              <a class="link-anchor" aria-label="${this.localize('ABOUT')}" href="/about" tabindex="-1"></a>
            </paper-tab>
          </paper-tabs>
      ` : ''}
    `;
  }

  get shouldShowGuidesToolbarTemplate() {
    return html`
      ${this.shouldShowGuidesToolbar ? html`
        <paper-tabs id="guides_nav_tabs" class="navigation-tabs" selected="0" scrollable="" hide-scroll-buttons="">
            <paper-tab class="nav-link" data-name="GENERAL-GUIDE-SUJATO">
              <div>${this.localize('GENERAL')}</div>
              <a class="link-anchor" aria-label="${this.localize('GENERAL')}" href="/general-guide-sujato"></a>
            </paper-tab>
            <paper-tab class="nav-link" data-name="DN-GUIDE-SUJATO">
              <div>${this.localize('LONG')}</div>
              <a class="link-anchor" aria-label="${this.localize('LONG')}"  href="/dn-guide-sujato" tabindex="-1"></a>
            </paper-tab>
            <paper-tab class="nav-link" data-name="MN-GUIDE-SUJATO">
              <div>${this.localize('MIDDLE')}</div>
              <a class="link-anchor" aria-label="${this.localize('MIDDLE')}" href="/mn-guide-sujato" tabindex="-1"></a>
            </paper-tab>
            <paper-tab class="nav-link" data-name="SN-GUIDE-SUJATO">
              <div>${this.localize('LINKED')}</div>
              <a class="link-anchor" aria-label="${this.localize('LINKED')}" href="/sn-guide-sujato" tabindex="-1"></a>
            </paper-tab>
            <paper-tab class="nav-link" data-name="AN-GUIDE-SUJATO">
              <div>${this.localize('NUMBERED')}</div>
              <a class="link-anchor" aria-label="${this.localize('NUMBERED')}" href="/an-guide-sujato" tabindex="-1"></a>
            </paper-tab>
          </paper-tabs>
      ` : ''}
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
  }

  updated(changedProps) {
    super.updated(changedProps);
    if (changedProps.has('selectedPage')) {
      this._changeView();
    }
    if (changedProps.has('resources')) {
      this.__resourcesChanged();
    }
    if (changedProps.has('pages')) {
      this.selectedPage = this.pages;
    }
  }

  __resourcesChanged(newValue, oldValue) {
    const tabs = this.shadowRoot.querySelector(this._getNavTabsSelector());
    if (tabs) {
      tabs.notifyResize();
    }
  }

  _isToolbarSelected() {
    return !(this.shouldShowSecondToolbar
              || this.shouldShowTipitakaToolbar
                || this.shouldShowAcademicToolbar
                  || this.shouldShowOrganizationalToolbar
                    || this.shouldShowGuidesToolbar);
  }

  _selectNavbarLink() {
    const selector = this._getNavTabsSelector();
    const tabs_element = this.shadowRoot.querySelector(selector);
    const tabs = tabs_element.querySelectorAll('paper-tab');
    for (let i = 0; i < tabs.length; i++) {
      if (tabs[i].dataset.name === this.selectedPage) {
        tabs_element.selectIndex(i);
        return;
      }
    }
    tabs_element.selectIndex(-1);
  }

  _getNavTabsSelector() {
    let selector = '#nav_tabs';
    if (this.shouldShowSecondToolbar) {
      selector = '#second_nav_tabs';
    } else if (this.shouldShowTipitakaToolbar) {
      selector = '#tipitaka_nav_tabs';
    } else if (this.shouldShowAcademicToolbar) {
      selector = '#academic_nav_tabs';
    } else if (this.shouldShowOrganizationalToolbar) {
      selector = '#organizational_nav_tabs';
    } else if (this.shouldShowGuidesToolbar) {
      selector = '#guides_nav_tabs';
    }
    return selector;
  }

  _changeView() {
    if (this.selectedPage.substr(0, 5) === "SUTTA" || this.selectedPage === "SEARCH") {
      return;
    }
    this._setVisibleToolbar();
    setTimeout(() => { this._selectNavbarLink() });
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
    const pageNameTitle = this.localize(`${this.selectedPage}-TITLE`);
    this.actions.changeToolbarTitle(pageNameTitle);
  }

  get actions() {
    return {
      changeToolbarTitle(title) {
        store.dispatch({
          type: "CHANGE_TOOLBAR_TITLE",
          title: title
        })
      }
    }
  }
}

customElements.define('sc-static-page-selector', SCStaticPageSelector);
