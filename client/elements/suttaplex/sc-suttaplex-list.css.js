import { html } from 'lit-element';

export const suttaplexListCss = html`<style>
  :host {
    display: block;
  }

  .division-content {
    color: var(--sc-primary-text-color);
    position: relative;
    padding: 0;
    }

  .main {
    margin: 0 auto 64px;
    max-width: 720px;
  }

        @media (max-width: 680px) {
      .main {
        margin-top: -40px;
      }
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
    position: absolute;
    margin: 0;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;
  }

</style>`;
