import { html } from 'lit-element';

export const suttaplexSectionTitleCss = html`<style>
  .node-head-container {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }

  .node-top-heading {
    font-family: var(--sc-sans-font);
        font-size: var(--sc-skolar-font-size-static-subtitle);
        font-weight: 400;
        line-height: 32px;
    display: flex;
    justify-content: space-between;
    border-top: 0;
    margin: 0;
  }

  .node-secondary-heading {
    font-family: var(--sc-sans-font);
        font-size: var(--sc-skolar-font-size-xl);
        font-weight: 400;
        line-height: 28px;
    margin: 0;
  }

  .node-description {
    font-family: var(--sc-sans-font);
        font-size: var(--sc-skolar-font-size-s);
        font-weight: 400;
        line-height: 20px;
  }

  .grey-icon {
    color: var(--sc-disabled-text-color);
  }
</style>`;
