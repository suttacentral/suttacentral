import { html } from 'lit-element';

export const languageBaseMenuCss = html`
  <style>
    :host {
      overflow-y: scroll;
      --mdc-menu-min-width: 500px;
      --mdc-theme-text-primary-on-background: var(--sc-primary-text-color);
      --mdc-list-side-padding: 16px
    }

    .separator {
      background-color: var(--sc-border-color);
      width: 100%;
      overflow: hidden;
      height: 1px;
      margin-top: var(--sc-size-xxs);
      margin-bottom: var(--sc-size-xxs);
    }

    .language-menu-dropdown {
      font-size: var(--sc-skolar-font-size-md);
      background-color: transparent;
      --paper-input-container-focus-color: var(--sc-primary-accent-color);
      --paper-dropdown-menu-icon: {
        color: var(--sc-disabled-text-color);
      }

      --paper-input-container-input-color: var(--sc-primary-text-color);
      --paper-input-container-color: var(--sc-secondary-text-color);

      --paper-menu-button-dropdown: {
        box-shadow: var(--sc-shadow-elevation-12dp);
        width: 180px;
        background-color: var(--sc-secondary-background-color);
      }
    }

    .language-menu-list {
      background-color: var(--sc-secondary-background-color);
    }

    .language-name {
      padding-top: var(--sc-size-xxs);
    }

    .language-name::before {
      content: attr(id);
      background-color: var(--sc-disabled-text-color);
      color: white;
      font-weight: 800;
      width: var(--sc-size-md-larger);
      margin-right: var(--sc-size-md);
      line-height: 20px;
      text-transform: uppercase;
      letter-spacing: 0.3px;
      display: inline-block;
      text-align: center;
      font-size: 14px;
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

    #arrow-left {
      padding: 8px 8px 4px 0;
      fill: var(--sc-disabled-text-color);
    }

    #icon-wrapper {
      display: inline-flex;
      align-items: center;
    }
  </style>
`;
