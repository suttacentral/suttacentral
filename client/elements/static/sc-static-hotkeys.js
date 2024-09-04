import { html } from 'lit';

import { SCStaticPage } from '../addons/sc-static-page';

export class SCStaticHotkeys extends SCStaticPage {
  constructor() {
    super();
    this.localizedStringsPath = '/localization/elements/interface';
  }

  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <style>
        main {
          display: flex;
          justify-content: center;
        }

        fieldset {
          font-family: var(--sc-sans-font);
          width: 848px;
          margin: 1.5em 1em;
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
        kbd {
        padding: 3px 6px 2px;
        background-color: gray;
        color: white;
        border-radius: 3px;
        margin: 5px;
        }
      </style>
      <main>
        <fieldset>
          <legend>
            Keyboard shortcuts
          </legend>
          <table>
            <tr>
              <td>Open the top search bar and place cursor ready to search</td>
              <td>
                <kbd>S</kbd>
              </td>
            </tr>
            <tr>
              <td>Toggle through three view states for aligned texts (plain/side by side/line by line)</td>
              <td>
                <kbd>V</kbd>
              </td>
            </tr>
            <tr>
              <td>toggle through notes view (on asterisk/side notes/none)</td>
              <td>
                <kbd>N</kbd>
              </td>
            </tr>
            <tr>
              <td>Toggle main references on and off</td>
              <td>
                <kbd>M</kbd>
              </td>
            </tr>
            <tr>
              <td>Toggle all references on and off</td>
              <td>
                <kbd>R</kbd>
              </td>
            </tr>
           

          </table>
        </fieldset>
      </main>
    `;
  }
}

customElements.define('sc-static-hotkeys', SCStaticHotkeys);
