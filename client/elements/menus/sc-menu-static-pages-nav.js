import { LitElement, html } from 'lit';
import { LitLocalized } from '../addons/sc-localization-mixin';
import { store } from '../../redux-store';
import { SCMenuStaticPagesNavStyles } from '../styles/sc-menu-static-pages-nav-styles';
import { API_ROOT } from '../../constants';

export class SCMenuStaticPagesNav extends LitLocalized(LitElement) {
  static properties = {
    staticPagesToolbarDisplayState: { type: Object },
    changedRoute: { type: Object },
    editionHome: { type: Object },
    editionMatters: { type: Array },
  };

  constructor() {
    super();
    this.localizedStringsPath = '/localization/elements/interface';
    const state = store.getState();
    this.changedRoute = state.currentRoute;
    this.staticPagesToolbarDisplayState = state.staticPagesToolbarDisplayState;
    if (!this.staticPagesToolbarDisplayState) {
      this.staticPagesToolbarDisplayState = {
        displayFirstToolbar: true,
        displaySecondToolbar: false,
        displayTipitakaToolbar: false,
        displayAcademicToolbar: false,
        displayOrganizationalToolbar: false,
        displayGuidesToolbar: false,
        displayPublicationToolbar: false,
      };
    }
    this.editionHomeInfo = state.editionHomeInfo;
    this.editionMatters = [];
  }

  _initStaticPagesToolbarDisplayState() {
    this.actions.setStaticPagesToolbarDisplayState({
      displayFirstToolbar: true,
      displaySecondToolbar: false,
      displayTipitakaToolbar: false,
      displayAcademicToolbar: false,
      displayOrganizationalToolbar: false,
      displayGuidesToolbar: false,
      displayPublicationToolbar: false,
    });
  }

  get actions() {
    return {
      setStaticPagesToolbarDisplayState(toolbarDisplayState) {
        store.dispatch({
          type: 'CHANGE_STATIC_PAGES_TOOLBAR_DISPLAY_STATE',
          staticPagesToolbarDisplayState: toolbarDisplayState,
        });
      },
    };
  }

  stateChanged(state) {
    super.stateChanged(state);
    if (this.staticPagesToolbarDisplayState !== state.staticPagesToolbarDisplayState) {
      this.staticPagesToolbarDisplayState = state.staticPagesToolbarDisplayState;
    }
    if (this.changedRoute !== state.currentRoute) {
      this.changedRoute = state.currentRoute;
      this._fetchMatter();
      this.requestUpdate();
    }
    if (this.editionHomeInfo !== state.currentEditionHomeInfo) {
      this.editionHomeInfo = state.currentEditionHomeInfo;
      this._fetchMatter();
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this._addStaticPageLinkEventListener();
  }

  firstUpdated() {
    this._initStaticPagesToolbarDisplayState();
    this._setStaticPageMenuItemSelected();
    this._fetchMatter();
  }

  updated(changedProps) {
    if (changedProps.has('changedRoute')) {
      this._setStaticPageMenuItemSelected();
    }
    if (changedProps.has('staticPagesToolbarDisplayState')) {
      this._addStaticPageLinkEventListener();
      this._setStaticPageMenuItemSelected();
    }
  }

  _addStaticPageLinkEventListener() {
    this.shadowRoot.querySelectorAll('#static_pages_nav_menu nav li a').forEach(element => {
      element.addEventListener('click', () => {
        this._removeSelectedClass();
        this._addSelectedClass(element);
      });
    });
  }

  _setStaticPageMenuItemSelected() {
    this._removeSelectedClass();
    const element = this.shadowRoot.querySelector(
      `nav a[href="${this.changedRoute.path.toLowerCase()}"]`
    );
    element?.classList.add('staticPageSelected');
  }

  _removeSelectedClass() {
    this.shadowRoot.querySelectorAll('.staticPageSelected').forEach(e => {
      e.classList.remove('staticPageSelected');
    });
  }

  _addSelectedClass(e) {
    e?.classList.add('staticPageSelected');
  }

  static styles = [SCMenuStaticPagesNavStyles];

  render() {
    return html`
      <div id="static_pages_nav_menu">
        <nav>
          <ul>
            ${this.toolbarSelectedTemplate} ${this.shouldShowSecondToolbarTemplate}
            ${this.shouldShowTipitakaToolbarTemplate} ${this.shouldShowAcademicToolbarTemplate}
            ${this.shouldShowOrganizationalToolbarTemplate} ${this.shouldShowGuidesToolbarTemplate}
            ${this.shouldShowPublicationToolbarTemplate}
          </ul>
        </nav>
      </div>
    `;
  }

  get toolbarSelectedTemplate() {
    return html`
      ${this.staticPagesToolbarDisplayState?.displayFirstToolbar
        ? html`
            <li>
              <a href="/introduction">${this.localize('interface:introduction')}</a>
            </li>
            <li>
              <a href="/donations">${this.localize('interface:donations')}</a>
            </li>
            <li>
              <a href="/map">${this.localize('interface:map')}</a>
            </li>
            <li>
              <a href="/offline">${this.localize('interface:useOffline')}</a>
            </li>
            <li>
              <a
                href="https://discourse.suttacentral.net/c/meta/updates"
                class="external"
                title="See updates on SuttaCentral forum"
                target="_blank"
                rel="noopener"
              >
                ${this.localize('interface:whatsnew')}
              </a>
            </li>
          `
        : ''}
    `;
  }

  get shouldShowSecondToolbarTemplate() {
    return html`
      ${this.staticPagesToolbarDisplayState?.displaySecondToolbar
        ? html`
            <li>
              <a href="/subjects">${this.localize('interface:subjects')}</a>
            </li>
            <li>
              <a href="/similes">${this.localize('interface:similes')}</a>
            </li>
            <li>
              <a href="/names">${this.localize('interface:names')}</a>
            </li>
            <li>
              <a href="/terminology">${this.localize('interface:terminology')}</a>
            </li>
          `
        : ''}
    `;
  }

  get shouldShowTipitakaToolbarTemplate() {
    return html`
      ${this.staticPagesToolbarDisplayState?.displayTipitakaToolbar
        ? html`
            <li>
              <a href="/discourses-guide-sujato">${this.localize('interface:discourses')}</a>
            </li>
            <li>
              <a href="/vinaya-guide-brahmali">${this.localize('interface:vinaya')}</a>
            </li>
            <li>
              <a href="/abhidhamma-guide-sujato">${this.localize('interface:abhidhamma')}</a>
            </li>
            <li>
              <a href="/pali-tipitaka">Pali Canon Overview</a>
            </li>
          `
        : ''}
    `;
  }

  get shouldShowAcademicToolbarTemplate() {
    return html`
      ${this.staticPagesToolbarDisplayState?.displayAcademicToolbar
        ? html`
            <li>
              <a href="/numbering">${this.localize('interface:numbering')}</a>
            </li>
            <li>
              <a href="/abbreviations">${this.localize('interface:abbreviations')}</a>
            </li>
            <li>
              <a href="/methodology">${this.localize('interface:methodology')}</a>
            </li>
          `
        : ''}
    `;
  }

  get shouldShowOrganizationalToolbarTemplate() {
    return html`
      ${this.staticPagesToolbarDisplayState?.displayOrganizationalToolbar
        ? html`
            <li>
              <a href="/acknowledgments">${this.localize('interface:acknowledgments')}</a>
            </li>
            <li>
              <a href="/licensing">${this.localize('interface:licensing')}</a>
            </li>
            <li>
              <a href="/about">${this.localize('interface:about')}</a>
            </li>
          `
        : ''}
    `;
  }

  get shouldShowGuidesToolbarTemplate() {
    return html`
      ${this.staticPagesToolbarDisplayState?.displayGuidesToolbar
        ? html`
            <li>
              <a href="/general-guide-sujato">${this.localize('interface:general')}</a>
            </li>
            <li>
              <a href="/dn-guide-sujato">${this.localize('interface:long')}</a>
            </li>
            <li>
              <a href="/mn-guide-sujato">${this.localize('interface:middle')}</a>
            </li>
            <li>
              <a href="/sn-guide-sujato">${this.localize('interface:linked')}</a>
            </li>
            <li>
              <a href="/an-guide-sujato">${this.localize('interface:numbered')}</a>
            </li>
          `
        : ''}
    `;
  }

  async _fetchMatter() {
    try {
      this.editionFiles = await (
        await fetch(`${API_ROOT}/publication/edition/${store.getState().currentEditionId}/files`)
      ).json();
      this.editionMatters.length = 0;
      for (const key in this.editionFiles) {
        if (!key.toLowerCase().includes('test')) {
          this.editionMatters.push(key.replace('./matter/', '').replace('.html', ''));
        }
      }
      this.requestUpdate();
    } catch (error) {
      console.error(error);
    }
  }

  get shouldShowPublicationToolbarTemplate() {
    return html`
      ${this.staticPagesToolbarDisplayState?.displayPublicationToolbar && this.editionMatters
        ? html`
            <li>
              <a href=${this.editionHomeInfo?.url}>${this.editionHomeInfo?.title}</a>
            </li>
            ${this.editionMatters.map(
              matter =>
                html`
                  <li>
                    <a href="${this.editionHomeInfo?.url}/${matter}"
                      >${matter.replace('general_introduction', 'general introduction')}</a
                    >
                  </li>
                `
            )}
          `
        : ''}
    `;
  }
}

customElements.define('sc-menu-static-pages-nav', SCMenuStaticPagesNav);
