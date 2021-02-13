import { html } from 'lit-element';

export const languageBaseMenuCss = html`
  <style>
    :host {
      overflow-y: scroll;
      --mdc-menu-min-width: 500px;
      --mdc-theme-text-primary-on-background: var(--sc-primary-text-color);
      --mdc-list-side-padding: 16px;
    }

    .separator {
      background-color: var(--sc-border-color);
      width: 100%;
      overflow: hidden;
      height: 1px;
      margin-top: var(--sc-size-xxs);
      margin-bottom: var(--sc-size-xxs);
    }

    .language-name::before {
      content: attr(id);
      background-color: var(--sc-icon-color);
      color: white;
      font-weight: 800;
      font-stretch: condensed;
      padding: 0 4px 1px 4px;
      margin-right: var(--sc-size-md);
      line-height: 16px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      font-size: var(--sc-skolar-font-size-xs);
      --notchSize: 4px;
      clip-path: polygon(
        0% var(--notchSize),
        var(--notchSize) 0%,
        calc(100% - var(--notchSize)) 0%,
        100% var(--notchSize),
        100% calc(100% - var(--notchSize)),
        calc(100% - var(--notchSize)) 100%,
        var(--notchSize) 100%,
        0% calc(100% - var(--notchSize))
      );
    }

    #jpn::after,
    #sld::after,
    #kln::after {
      letter-spacing: 0;
      font-size: 11px;
    }

    .arrow_left {
      padding: 8px 8px 4px 0;
      fill: var(--sc-icon-color);
    }

    .menu-item-wrapper {
      display: flex;
      align-items: center;
    }
  </style>
`;
