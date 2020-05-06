import { html } from 'lit-element';

export const textCarouselStyles = html`<style>
    .button {
      font-size: var(--sc-skolar-font-size-s);
      text-transform: uppercase;
        letter-spacing: var(--sc-caps-letter-spacing);
      width: fit-content;
      margin-top: var(--sc-size-md);
      background-color: var(--sc-primary-accent-color);
      color: var(--sc-tertiary-text-color);
      font-weight: bold;
      font-style: normal;
      text-align: center;
    }

    .card-button-middle {
      width: auto;
      position: absolute;
      transform: translate(-50%);
      bottom: var(--sc-size-md-larger);
    }

    .button-link {
      background: none !important;
    }

    .chevron {
      display: flex;
      flex-flow: column;
      justify-content: space-around;
      background: none;
      border: none;
      position: absolute;
      top: 50%;
      height: 100%;
      width: var(--sc-size-lg);
      transform: translate(0, -50%);
      --iron-icon-width: var(--sc-size-md-larger);
      --iron-icon-height: var(--sc-size-md-larger);
      cursor: pointer;
      transition: background-color .2s;
      color: var(--sc-disabled-text-color);
    }

    .chevron:focus {
      outline: none;
    }

    .chevron::-moz-focus-inner {
      border: 0;
      outline: none;
    }

    .chevron:hover {
      background-color: var(--sc-disabled-text-color-opaque);
      --iron-icon-width: calc(var(--sc-size-md-larger) * 1.15);
      --iron-icon-height: calc(var(--sc-size-md-larger) * 1.15);
    }

    .next {
      right: 0;
    }

    .previous {
      left: 0;
    }

    .text {
      position: relative;
      transform: translate(0, -50%);
      top: 50%;
      opacity: 1;
      transition: all .4s ease;
      color: var(--sc-primary-text-color);
      font-family: var(--sc-sans-font);
    }

    .transparent {
      opacity: 0;
    }
</style>`;
