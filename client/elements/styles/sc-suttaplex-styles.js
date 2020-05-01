import { html } from 'lit-element';

export const suttaplexStyles = html`
<style>
  paper-button a {
    color: var(--sc-primary-accent-color);
    text-decoration: none;
    text-transform: uppercase;
        letter-spacing: var(--sc-caps-letter-spacing);
    font-weight:bold;
  }

  paper-button {
    --paper-button-ink-color: var(--sc-primary-accent-color);
  }

  paper-button.dense {
    font-size: var(--sc-skolar-font-size-s);
    padding-bottom: var(--sc-size-sm);
  }

  iron-icon,
  paper-icon-button {
    color: var(--sc-disabled-text-color);
  }

  .book iron-icon {
    --iron-icon-height: var(--sc-size-md);
    --iron-icon-width: var(--sc-size-md);
  }
</style>`;
