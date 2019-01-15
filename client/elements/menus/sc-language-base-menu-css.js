import { html } from '@polymer/lit-element';

export const languageBaseMenuCss = html`
<style>
      :host {
        --primary-color: var(--sc-primary-color);
        --paper-menu-button-content: {
          display: block;
        };
      }

      .language-menu-dropdown {
        @apply --sc-skolar-font-size-md;
        background-color: transparent;
        --paper-input-container-focus-color: var(--sc-primary-accent-color);
        --paper-dropdown-menu-icon: {
          color: var(--sc-disabled-text-color);
        };
        --paper-dropdown-menu-input: {
          --paper-input-container-input-color: var(--sc-primary-text-color);
          --paper-input-container-color: var(--sc-secondary-text-color);
        };
        --paper-menu-button-dropdown: {
          @apply --sc-shadow-elevation-9dp;
          width: 180px;
          background-color: var(--sc-secondary-background-color);
        };
      }

      .language-menu-list {
        background-color: var(--sc-secondary-background-color);
      }

      .iso-code-image {
        fill: var(--sc-disabled-text-color);
        margin-top: var(--sc-size-xs);
        width: var(--sc-size-language-icon);
        height: var(--sc-size-language-icon);
      }

      .language-menu-paper-item {
        @apply --sc-skolar-font-size-md;
        color: var(--sc-primary-text-color);
        /*19px for the icon, 16px for the margin */
        --paper-item-icon-width: calc(var(--sc-size-language-icon) + var(--sc-size-md));
      }

      .language-menu-paper-item:hover {
        background-color: var(--sc-tertiary-background-color);
        cursor: pointer;
      }

      .language-name {
        padding-top: var(--sc-size-xxs);
      }
</style>
`;
