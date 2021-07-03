import { html, litElement, customElement, property, css } from 'lit-element';
import { API_ROOT } from '../../constants';
import { LitLocalized } from './sc-localization-mixin';
import { store } from '../../redux-store';
import SCTopSheetCommon from './sc-top-sheet-common';

@customElement('sc-top-sheet-parallel-table-view')
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
            <caption>
              <div>${this.categoryId.toUpperCase()}</div>
            </caption>
            <tbody>
              ${this.parallels.map(
                item => html`
                  <tr>
                    <td class="sutta_uid">
                      <a class="uid" href="/${item.from}">${item.fromTitle.toUpperCase()}</a>
                    </td>
                    <td class="sutta_title">${item.name}</td>
                    <td class="parallels">
                      ${item.to.map(
                        to => html`
                          <a class="uid" href="/${to.uid}">${to.toTitle.toUpperCase()}</a>
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
