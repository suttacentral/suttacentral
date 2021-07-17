import { html } from 'lit';

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

    .mdc-list-item__text {
      margin-left: 1.5em;
    }

    .language-name::before {
      width: 24px;
      text-align: center;
      margin-right: 16px;
      content: attr(id);
      background-color: var(--sc-icon-color);
      color: white;
      font-weight: 800;
      font-stretch: condensed;
      padding-bottom: 1px;
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

    #jpn::before,
    #sld::before,
    #kln::before,
    #kan::before {
      letter-spacing: 0;
      font-size: 11px;
    }

    .arrow_left {
      fill: var(--sc-icon-color);
    }

    .menu-item-wrapper {
      display: flex;
      align-items: center;
    }

    .text-only {
      height: 32px;
    }

    .language-base-menu-head-main {
      font-weight: 700;
      padding-left: 8px;
    }

    .language-base-menu-head-secondary {
      font-size: var(--sc-skolar-font-size-xs);
      color: var(--sc-secondary-text-color);
      padding: 0 16px 0 56px;
      line-height: 1.5;
      font-stretch: condensed;
    }

    [role='separator'] {
      background-color: var(--sc-border-color);
      width: 100%;
      overflow: hidden;
      height: 1px;
      margin-top: var(--sc-size-sm);
      margin-bottom: var(--sc-size-xxs);
    }

    .more-menu-return-arrow {
    }
  </style>
`;
