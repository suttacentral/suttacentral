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
      fieldset {
        font-family: var(--sc-sans-font);

        width: 848px;
        margin: 0 1em;
        margin-top: 24px;
        padding: 0;

        border-color: var(--sc-border-color);
      }

      legend {
        margin-left: 18px;
        padding: 0 1em;

        color: var(--sc-secondary-text-color);
        border-radius: 0.8em;
        background-color: var(--sc-border-color);

        font-variant-caps: all-small-caps;
      }

      table {
        width: 100%;
        margin: 24px 0 0 0;

        table-layout: fixed;
        border-collapse: collapse;

        border: none;
      }

      th {
        width: 100%;
        padding: 10px;

        text-align: left;

        background-color: var(--sc-tertiary-background-color);
      }

      td {
        padding: 0.5em;

        text-align: left;
      }

      td:first-child {
        font-family: var(--sc-sans-font);
        font-weight: 400;
      }

      td {
        font-family: monospace;
      }
    `,
  ];

  render() {
    return html`
      <main>
      <fieldset>
      <legend>
        Refine your search with filters
        </legend>
        <table>
        
          <tr>
            <th colspan="2">PTS volume/page search</th>
          </tr>
          <tr>
            <td>Find texts using legacy PTS volume/page references.</td>
            <td>
              volpage:SN ii 4<br>
              volpage:M II 246<br>
              volpage:S.II,236
            </td>
          </tr>
          <tr>
            <th colspan="2">PTS volume search</th>
          </tr>
          <tr>
            <td>Find texts using just the PTS volume.</td>
            <td>
              volpage:SN ii<br>
              volpage:M II
            </td>
          </tr>
          <tr>
            <th colspan="2">author search</th>
          </tr>
          <tr>
            <td>Filter results by <code>author</code>.</td>
            <td>author:brahmali cat<br>
                author:sabbamitta Katze<br>
                author:sabbamitta Buddha OR Sāvatthī<br>
                author:sabbamitta Buddha AND Sāvatthī
            </td>
          </tr>

          <tr>
            <td>List all <code>authors</code>.</td>
            <td>list authors</td>
          </tr>

          <tr>
            <th colspan="2">title search</th>
          </tr>

          <tr>
            <td>List all related suttas by <code>title</title>.</td>
            <td>title:intention</td>
          </tr>

          <tr>
            <th colspan="2">collection search</th>
          </tr>
          <tr>
            <td>Search <code>in</code> a specific collection with SuttaCentral IDs.</td>
            <td>in:dn cat<br>
                in:an dog<br>
                in:an Buddha OR Sāvatthī<br>
                in:an Buddha AND Sāvatthī
            </td>
          </tr>

          <tr>
            <th colspan="2">ebt search</th>
          </tr>
          <tr>
            <td>Narrow search to “early Buddhist texts” (<code>ebt</code>). This is a shortcut and not a definitive list of what is early. Equivalent to the following.<br>
              <code>in:dn da mn ma sn sa an ea ea-2 kp iti ud snp dhp thig thag pli-tv lzh-mg lzh-mi lzh-dg lzh-sarv lzh-mu lzh-ka lzh-upp san-mg san-lo</code>
            </td>
            <td>in:ebt free</td>
          </tr>

          <tr>
            <th colspan="2">operators</th>
          </tr>

          <tr>
            <td>Return one <code>OR</code> the other.</td>
            <td>greed OR desire</td>
          </tr>

          <tr>
            <td>Return one <code>AND</code> the other.</td>
            <td>greed AND desire</td>
          </tr>

          <tr>
            <th colspan="2">combine filters</th>
          </tr>

          <tr>
          <td>Use multiple filters.</td>
            <td colspan="2">
              in:mn author:sujato Buddha OR Monastery<br>
              in:mn author:sujato Buddha AND Monastery
            </td>
          </tr>

          <tr>
            <th colspan="2">chinese</th>
          </tr>

          <tr>
            <td>Use space-separated keywords.</td>
            <td>
              八正道 涅槃<br>
              四神足 三摩地<br>
              八正道 AND 涅槃
            </td>
          </tr>

          <tr>
            <td>Convert simplified/traditional Chinese characters.</td>
            <td>发勤 ，观心生灭<br>
            發勤 ，觀心生滅</td>
          </tr>
        </table>
        </fieldset>
      </main>
    `;
  }
}

customElements.define('sc-top-sheet-search-filter', SCTopSheetSearchFilter);
