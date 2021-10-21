import { html, LitElement } from 'lit';
import { cache } from 'lit/directives/cache.js';
import { repeat } from 'lit/directives/repeat.js';
import { API_ROOT } from '../../constants';
import { store } from '../../redux-store';
import { partitionAsync } from '../../utils/partitionAsync';
import { LitLocalized } from '../addons/sc-localization-mixin';
import { getURLParam } from '../addons/sc-functions-miscellaneous';
import { suttaplexListCss, suttaplexListTableViewCss } from './sc-suttaplex-list.css.js';
import './sc-suttaplex-section-title';
import '../addons/sc-error-icon';
import { RefreshNavNew } from '../navigation/sc-navigation-common';
import { transformId } from '../../utils/suttaplex';

import '@material/mwc-button';

class SCSuttaplexList extends LitLocalized(LitElement) {
  static get properties() {
    return {
      localizedStringsPath: String,
      categoryId: String,
      suttaplexListDisplay: String,
      suttaplexData: Array,
      networkError: Object,
      parallelsLite: Array,
      expansionData: Array,
    };
  }

  get actions() {
    return {
      changeToolbarTitle(title) {
        store.dispatch({
          type: 'CHANGE_TOOLBAR_TITLE',
          title,
        });
      },
      changeLinearProgressActiveState(active) {
        store.dispatch({
          type: 'CHANGE_LINEAR_PROGRESS_ACTIVE_STATE',
          linearProgressActive: active,
        });
      },
      changeDisplayParallelTableViewState(displayState) {
        store.dispatch({
          type: 'CHANGE_DISPLAY_PARALLEL_TABLE_VIEW_STATE',
          displayParallelTableView: displayState,
        });
      },
      toggleSuttaplexDisplay(suttaplexdisplay) {
        store.dispatch({
          type: 'SUTTPLEX_LIST_DISPLAY',
          suttaplexdisplay,
        });
      }
    };
  }

  get apiUrl() {
    return `${API_ROOT}/suttaplex/${this.categoryId}?language=${this.language}`;
  }

  constructor() {
    super();
    this.localizedStringsPath = '/localization/elements/interface';
    this.siteLanguage = store.getState().siteLanguage;
    this.displayParallelTableView = store.getState().displayParallelTableView;
    this.#showTableViewButton();
    this._setViewState();
  }

  #showTableViewButton() {
    const scSiteLayout = document.querySelector('sc-site-layout');
    const scActionItems = scSiteLayout?.shadowRoot.querySelector('#action_items');
    const btnShowParallelTableView = scActionItems?.shadowRoot.querySelector(
      '#btnShowParallelTableView'
    );
    if (btnShowParallelTableView) {
      btnShowParallelTableView.style.display = 'inherit';
    }
  }

  #loadSCSuttaplex() {
    import(
      /* webpackMode: "lazy" */
      /* webpackPrefetch: true */
      './card/sc-suttaplex.js'
    ).catch(err => {
      console.log(err);
    });
  }

  connectedCallback() {
    super.connectedCallback();

    this.#loadSCSuttaplex();
    this.addEventListener('click', () => {
      this._hideTopSheets();
    });
    this._fetchExpansionData();
    this._updateURLParams();
  }

  async _fetchExpansionData() {
    this.expansionData = await fetch(`${API_ROOT}/expansion`).then(r => r.json());
  }

  _hideTopSheets() {
    const scActionItems = document
      .querySelector('sc-site-layout')
      .shadowRoot.querySelector('#action_items');
    scActionItems?.hideItems();
  }

  isSuttaplex(item) {
    return item.type === 'leaf';
  }

  isPatimokkha() {
    return this.categoryId?.endsWith('-pm');
  }

  isPatimokkhaRuleCategory(uid) {
    return uid?.includes('-pm-');
  }

  shouldExpandAll() {
    return this.suttaplexData.length <= 3;
  }

  hasError() {
    return this.networkError || (this.suttaplexData && this.suttaplexData.length === 0);
  }

  calculateClass(itemType) {
    return itemType === 'grouping' ? 'node' : 'vagga-node';
  }

  // Close parallels when navigating to new page
  areParallelsOpen() {
    return this.suttaplexData.length === 1;
  }

  computeItemDifficulty(difficulty) {
    if (!difficulty) return;
    if (difficulty.name) {
      return difficulty.name;
    } else {
      const levels = { 1: 'beginner', 2: 'intermediate', 3: 'advanced' };
      return levels[difficulty];
    }
  }

  stateChanged(state) {
    super.stateChanged(state);
    if (
      this.categoryId !== state.currentRoute?.params?.categoryId ||
      this.siteLanguage !== state.siteLanguage
    ) {
      this.categoryId = state.currentRoute.params.categoryId;
      this.siteLanguage = state.siteLanguage;
      if (this.categoryId && state.siteLanguage) {
        this._fetchCategory();
      }

      let forceRefresh = false;
      if (this.siteLanguage !== state.siteLanguage) {
        this.siteLanguage = state.siteLanguage;
        forceRefresh = true;
      }

      RefreshNavNew(this.categoryId, true);
    }

    if (this.suttaplexListDisplay !== state.suttaplexListDisplay) {
      this.suttaplexListDisplay = state.suttaplexListDisplay;
      this._updateURLParams();
    }
    if (this.displayParallelTableView !== state.displayParallelTableView) {
      this.displayParallelTableView = state.displayParallelTableView;
      this._updateURLParams();
      this.requestUpdate();
    }
  }

  async _fetchCategory() {
    this.suttaplexLoading = true;
    this.actions.changeLinearProgressActiveState(this.suttaplexLoading);
    this.networkError = null;

    try {
      const responseData = await fetch(this.apiUrl).then(r => r.json());
      this.suttaplexData = [];
      partitionAsync(
        responseData,
        part => (this.suttaplexData = [...this.suttaplexData, ...part]),
        15,
        100
      ).then(() => this._updateMetaData());
      this.initTableView();
    } catch (e) {
      this.networkError = e;
    }

    this.suttaplexLoading = false;
    this.actions.changeLinearProgressActiveState(this.suttaplexLoading);
  }

  _updateMetaData() {
    if (this.suttaplexData && this.suttaplexData.length) {
      this.actions.changeToolbarTitle(this.suttaplexData[0].original_title);

      let description = this.localize('interface:metaDescriptionText');
      if (this.suttaplexData[0].blurb) {
        description = this.suttaplexData[0].blurb;
      }

      RefreshNavNew(this.categoryId, true);

      document.dispatchEvent(
        new CustomEvent('metadata', {
          detail: {
            pageTitle: `${this.suttaplexData[0].original_title}—Suttas and Parallels`,
            title: `${this.suttaplexData[0].original_title}—Suttas and Parallels`,
            description,
            bubbles: true,
            composed: true,
          },
        })
      );
    }
  }

  async initTableView() {
    this.suttaplexItem = await (
      await fetch(`${API_ROOT}/parallels_lite/${this.categoryId}`)
    ).json();
    this.parallelsLite = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const item of this.suttaplexItem) {
      if (item.parallels?.length === 0) {
        this.parallelsLite.push({
          uid: item.uid,
          from: item.uid,
          fromTitle: item.uid,
          name: item.name,
          acronym: item.acronym,
          to: [],
        });
      } else {
        for (const parallel of item.parallels) {
          const parallels = this.parallelsLite.find(
            x => x.from === parallel.from && x.uid === item.uid
          );
          if (parallels) {
            parallels.to.push({
              to: parallel.to.to,
              toTitle: parallel.to.to
                ? parallel.to.to
                    .replaceAll('#', ':')
                    .replaceAll('-:', '-')
                    .replaceAll('~', '')
                    .replaceAll('-', '–')
                : '',
              uid: parallel.to.uid,
              acronym: parallel.to.acronym
                ? parallel.to.acronym
                : transformId(parallel.to.uid, this.expansionData),
            });
          } else {
            this.parallelsLite.push({
              uid: item.uid,
              from: parallel.from,
              fromTitle: parallel.from
                ? parallel.from?.replaceAll('#', ':').replaceAll('-:', '-').replaceAll('-', '–')
                : '',
              name: item.name,
              acronym: item.acronym,
              to: [
                {
                  to: parallel.to.to,
                  toTitle: parallel.to.to
                    ? parallel.to.to
                        .replaceAll('#', ':')
                        .replaceAll('-:', '-')
                        .replaceAll('~', '')
                        .replaceAll('-', '–')
                    : '',
                  uid: parallel.to.uid,
                  acronym: parallel.to.acronym
                    ? parallel.to.acronym
                    : transformId(parallel.to.uid, this.expansionData),
                },
              ],
            });
          }
        }
      }
    }
  }

  suttaplexTemplate(item) {
    return html`
      <sc-suttaplex
        .item="${item}"
        .parallelsOpened="${this.areParallelsOpen(item)}"
        .difficulty="${this.computeItemDifficulty(item.difficulty)}"
        .suttaplexListStyle="${this.suttaplexListDisplay ? 'compact' : ''}"
        .expansionData="${this.expansionData}"
        .isPatimokkha=${this.isPatimokkha()}
        .isPatimokkhaDetails=${this.isPatimokkha() && item.uid !== this.categoryId}
        class=${this.isPatimokkha() && item.uid !== this.categoryId ? 'hidden' : ''}
      ></sc-suttaplex>
      ${this.isPatimokkha && item.uid === this.categoryId
        ? html`
            <mwc-button
              id="btnShowParallelsAndDetails"
              raised
              fullwidth
              @click=${this.onShowParallelsClick}
              label=${this.localize('interface:showParallelsAndDetails')}
              class=${this._calculateButtonClass()}
            ></mwc-button>
          `
        : ''}
    `;
  }

  _calculateButtonClass() {
    const classList = [];
    if (this.suttaplexListDisplay) {
      classList.push('compact');
    }
    if (!this.isPatimokkha()) {
      classList.push('hidden');
    }
    return classList.join(' ');
  }

  onShowParallelsClick() {
    const hiddenCards = this.shadowRoot.querySelectorAll('.hidden');
    const showedCards = this.shadowRoot.querySelectorAll('.show');
    if (hiddenCards.length > 0 && showedCards.length === 0) {
      this.shadowRoot.querySelectorAll('.hidden').forEach(x => {
        x.classList.remove('hidden');
        x.classList.add('show');
        this.shadowRoot.querySelector('#btnShowParallelsAndDetails').label = this.localize(
          'interface:hideParallelsAndDetails'
        );
      });
    } else {
      this.shadowRoot.querySelectorAll('.show').forEach(x => {
        x.classList.remove('show');
        x.classList.add('hidden');
        this.shadowRoot.querySelector('#btnShowParallelsAndDetails').label = this.localize(
          'interface:showParallelsAndDetails'
        );
      });
    }
  }

  _setViewState() {
    const view = getURLParam(window.location.href, 'view');
    if (view && ['normal', 'dense', 'table'].includes(view.toLowerCase())) {
      if (view === 'normal') {
        this.displayParallelTableView = false;
        this.suttaplexListDisplay = false;
        this.actions.changeDisplayParallelTableViewState(false);
        this.actions.toggleSuttaplexDisplay(false);
      }
      if (view === 'dense') {
        this.displayParallelTableView = false;
        this.suttaplexListDisplay = true;
        this.actions.changeDisplayParallelTableViewState(false);
        this.actions.toggleSuttaplexDisplay(true);
      }
      if (view === 'table') {
        this.displayParallelTableView = true;
        this.actions.changeDisplayParallelTableViewState(true);
      }
    }
  }

  _updateURLParams() {
    const { suttaplexListDisplay, displayParallelTableView } = store.getState();
    if (!displayParallelTableView) {
      const urlParams = `?view=${suttaplexListDisplay ? 'dense' : 'normal'}`
      history.replaceState(null, null, urlParams);
    } else {
      const urlParams = '?view=table';
      history.replaceState(null, null, urlParams);
    }
  }

  sectionTemplate(item) {
    return html`
      <section class="${this.calculateClass(item.type)}">
        <sc-suttaplex-section-title
          .inputTitle="${item.translated_title || item.original_title}"
          .inputText="${item.blurb}"
          .inputType="${item.type}"
          .label="${this.localize('interface:expandSection')}"
          .opened="${this.shouldExpandAll()}"
          .originalTitle=${item.original_title}
          .isPatimokkhaRuleCategory=${this.isPatimokkhaRuleCategory(item.uid)}
          class=${this.isPatimokkha() && item.uid !== this.categoryId ? 'hidden' : ''}
        ></sc-suttaplex-section-title>
      </section>
    `;
  }

  tableViewTemplate() {
    return this.parallelsLite?.length
      ? html`
          ${suttaplexListTableViewCss}
          <table>
            <tbody>
              ${this.parallelsLite.map(
                item => html`
                  <tr>
                    <td class="sutta_uid">
                      <a class="uid" href="/${item.from}"
                        >${item.acronym || item.from}${item.fromTitle.split(':').length > 1
                          ? ':' + item.fromTitle.split(':')[1]
                          : ''}</a
                      >
                    </td>
                    <td class="sutta_title">${item.name}</td>
                    <td class="parallels">
                      ${item.to.map(
                        (to, i) => html`
                          ${item.to.length !== i + 1
                            ? html`<a class="uid" href="/${to.uid}"
                                  >${to.acronym || to.uid}${to.toTitle.split(':').length > 1
                                    ? ':' + to.toTitle.split(':')[1]
                                    : ''}</a
                                >,`
                            : html`
                                <a class="uid" href="/${to.uid}"
                                  >${to.acronym || to.uid}${to.toTitle.split(':').length > 1
                                    ? ':' + to.toTitle.split(':')[1]
                                    : ''}</a
                                >
                              `}
                        `
                      )}
                    </td>
                  </tr>
                `
              )}
            </tbody>
          </table>
        `
      : '';
  }

  normalViewTemplate() {
    return html`
      ${suttaplexListCss}
      <div class="division-content main">
        ${this.hasError() ? html` <sc-error-icon type="no-network"></sc-error-icon> ` : ''}
        ${this.suttaplexData &&
        repeat(
          this.suttaplexData,
          item => item.key,
          item =>
            this.isSuttaplex(item) ||
            (this.isPatimokkha() && !this.isPatimokkhaRuleCategory(item.uid))
              ? this.suttaplexTemplate(item)
              : this.sectionTemplate(item)
        )}
      </div>
    `;
  }

  render() {
    return html`
      ${cache(this.displayParallelTableView ? this.tableViewTemplate() : this.normalViewTemplate())}
    `;
  }
}

customElements.define('sc-suttaplex-list', SCSuttaplexList);
