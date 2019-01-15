import { html } from '@polymer/lit-element';

export const suttaplexListCss = html`<style>
  :host {
    display: block;
  }

  .division-content {
    color: var(--sc-primary-text-color);
    /* Subtract margins and top bar height */
    height: calc(100vh - var(--sc-size-md-larger) * 2 - var(--sc-size-xxl));
    position: relative;
    padding: 0;
    }

  .main {
    margin: var(--sc-size-md-larger) auto;
    max-width: 720px;
  }

  .node {
    padding: var(--sc-size-md) var(--sc-size-md) 0;
    color: var(--sc-secondary-text-color);
  }

  .vagga-node {
    padding: 0 var(--sc-size-md) var(--sc-size-md) var(--sc-size-md);
    color: var(--sc-secondary-text-color);
  }

  .loading-spinner {
    @apply --center;
    z-index: 999;
    --paper-spinner-color: var(--sc-primary-color);
  }
</style>`;
