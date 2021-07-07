import { html, litElement, customElement, property, css } from 'lit-element';
import { API_ROOT } from '../../constants';
import { LitLocalized } from '../addons/sc-localization-mixin';
import { store } from '../../redux-store';
import SCTopSheetCommon from '../addons/sc-top-sheet-common';

@customElement('sc-parallel-table-view')
class SCTopSheetParallelTableView extends SCTopSheetCommon {
  static get styles() {
    return [
      super.styles,
      css`
        table {
          margin: 3vw;
          border-collapse: collapse;
        }
        .sutta_uid {
          white-space: nowrap;
        }

        tr {
          border-bottom: 1px solid #ccc;
          vertical-align: baseline;
        }

        td,
        th {
          padding: 0.5em;
          border-bottom: 1px solid #d7d7d7;
        }

        .sutta_uid .uid {
          color: inherit;
          text-decoration: none;
        }

        caption {
          font-weight: bold;
          margin-bottom: 1em;
        }
      `,
    ];
  }

  @property() suttaplexItem = [];
  @property() categoryId = '';
  @property() localizedStringsPath = '/localization/elements/sc-parallel-list';

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('click', () => {
      this.style.display = 'none';
    });
  }

  async init(categoryId) {
    this.suttaplexItem = await (await fetch(`${API_ROOT}/parallels_lite/${categoryId}`)).json();
    this.categoryId = categoryId;
    this.parallels = [];
    for (const item of this.suttaplexItem) {
      const parallels = this.parallels.find(x => x.from === item.from);
      if (parallels) {
        parallels.to.push({
          to: item.to.to,
          toTitle: item.to.to.replaceAll('#', ':').replaceAll('-:', '-').replaceAll('~', ''),
          uid: item.to.uid,
          acronym: item.to.acronym,
        });
      } else {
        this.parallels.push({
          from: item.from,
          fromTitle: item.from.replaceAll('#', ':').replaceAll('-:', '-'),
          name: item.name,
          acronym: item.acronym,
          to: [
            {
              to: item.to.to,
              toTitle: item.to.to.replaceAll('#', ':').replaceAll('-:', '-').replaceAll('~', ''),
              uid: item.to.uid,
              acronym: item.to.acronym,
            },
          ],
        });
      }
    }
  }

  render() {
    return this.parallels?.length
      ? html`
          <table>
            <tbody>
              ${this.parallels.map(
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
                                >
                                ,`
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
}
