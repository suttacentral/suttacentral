import { html, css } from 'lit';
import SCTopSheetCommon from './sc-top-sheet-common';
import { typographyCommonStyles } from '../styles/sc-typography-common-styles';

export class SCTopSheetSearchFilter extends SCTopSheetCommon {
  static properties = {
    displayedLanguages: { type: Array },
  };

  static styles = [
    super.styles,
    typographyCommonStyles,
    css`
      table {
        border-collapse: collapse;
        width: 100%;
      }
      th {
        background-color: #f0f0f0;
        padding: 10px;
        text-align: left;
      }
      td {
        padding: 10px;
        text-align: left;
      }
    `,
  ];

  render() {
    return html`
      <main>
        <table border="1">
          <tr>
            <th colspan="2">volume/page search</th>
          </tr>
          <tr>
            <td>Find texts using legacy PTS references.</td>
            <td>
              match page: volpage:SN ii 4 , volpage:M II 246<br />match entire volume: volpage:SN
              ii, volpage:M II
            </td>
          </tr>
          <tr>
            <th colspan="2">author search</th>
          </tr>
          <tr>
            <td>Filter results by author.</td>
            <td>author:brahmali cat<br />author:sabbamitta Katze</td>
          </tr>

          <tr>
            <td>List all author</td>
            <td>list authors</td>
          </tr>

          <tr>
            <th colspan="2">suttaplex search</th>
          </tr>

          <tr>
            <td>List all related suttaplex</td>
            <td>title:the prime net</td>
          </tr>

          <tr>
            <th colspan="2">collection search</th>
          </tr>
          <tr>
            <td>Narrow search to within a specific collection, as defined by SC IDs.</td>
            <td>in:dn cat<br />in:snp dog</td>
          </tr>

          <tr>
            <td>
              ebt includes "dn", "da", "mn", "ma", "sn", "sa", "an", "ea", "ea-2", <br />
              "kp", "iti", "ud", "snp", "dhp","thig", "thag", "pli-tv", "lzh-mg", "lzh-mi", <br />
              "lzh-dg", "lzh-sarv", "lzh-mu", "lzh-ka","lzh-upp", "san-mg", "san-lo"
            </td>
            <td>in:ebt free</td>
          </tr>

          <tr>
            <th colspan="2">operators</th>
          </tr>

          <tr>
            <td>return one OR the other:</td>
            <td>greed OR desire</td>
          </tr>

          <tr>
            <td>return one AND the other:</td>
            <td>greed AND desire</td>
          </tr>

          <tr>
            <th colspan="2">combine filters</th>
          </tr>

          <tr>
            <td colspan="2">in:mn author:sujato cat OR dog</td>
          </tr>

          <tr>
            <th colspan="2">chinese</th>
          </tr>

          <tr>
            <td>space-separated keywords:</td>
            <td>八正道 涅槃， 四神足 三摩地</td>
          </tr>

          <tr>
            <td>simplified/traditional Chinese conversion:</td>
            <td>发勤 ，观心生灭<br />(simplified)<br />發勤 ，觀心生滅<br />(traditional)</td>
          </tr>
        </table>
      </main>
    `;
  }
}

customElements.define('sc-top-sheet-search-filter', SCTopSheetSearchFilter);
