import { html } from '@polymer/lit-element';

export const suttaplexSectionTitleCss = html`<style>
  .node-head-container {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }

  .node-top-heading {
    @apply --paper-font-headline;
    display: flex;
    justify-content: space-between;
    border-top: 0;
    margin: 0;
  }

  .node-secondary-heading {
    @apply --paper-font-title;
    margin: 0;
  }

  .node-description {
    @apply --paper-font-body1;
  }

  .grey-icon {
    color: var(--sc-disabled-text-color);
  }
</style>`;
