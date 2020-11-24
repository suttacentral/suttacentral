import { html } from "lit-element";

export const navigationNormalModeStyles = html`
  <style>
    main {
      max-width: 720px;
      margin: 0 auto 64px;
    }

    @media (max-width: 680px) {
      main {
        margin-top: -50px;
      }
    }

    .main-nav {
      display: flex;
      flex-direction: row;

      justify-content: center;
      flex-wrap: nowrap;
    }

    .card {
      position: relative;
      overflow: hidden;

      margin-bottom:  0.5rem;
      padding-bottom: 0.5rem;

      cursor: pointer;
      transition: all 200ms ease-out;

      border-radius: var(--sc-size-sm);
      background-color: var(--sc-secondary-background-color);
      box-shadow: var(--sc-shadow-elevation-1dp);

      flex: 1;

      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .home-card + .home-card {
      margin-left: 1vw;
    }

    @media screen and (max-width: 780px) {
      .main-nav {
        flex-direction: column;
      }
      .home-card + .home-card {
        margin-left: 0;
      }
      .header-right {
        width: 90px;
      }
    }

    .card:hover {
      z-index: 10;

      transition: all 200ms ease-out;

      background-color: var(--sc-primary-color-light-transparent);
      box-shadow: var(--sc-shadow-elevation-2dp);
    }

    .card:active {
      box-shadow: var(--sc-shadow-elevation-1dp);
    }

    .nav-card:first-of-type {
      margin-top: 4em;
    }

    .nav-card:last-of-type {
      margin-bottom: 4em;
    }

    .nav-card-content {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      flex: 1;
    }

    .blurb {
      font-size: var(--sc-skolar-font-size-md);
      font-weight: 400;
      line-height: 24px;

      padding: 0.5rem 1rem;
    }

    .blurb:empty {
      margin: 0;
      padding: 0;
    }

    .blurb + .essay {
      margin-top: 1rem;
    }

    .card header {
      display: flex;

      justify-content: space-between;
    }

    .header-left {
      padding: 1rem 1rem 0.333rem;
    }

    .title {
      font-family: var(--sc-serif-font);
      font-size: var(--sc-skolar-font-size-static-subtitle);
      font-weight: 500;

      display: block;

      color: var(--sc-primary-text-color);
    }

    .subTitle {
      font-size: var(--sc-skolar-font-size-s);

      overflow: hidden;

      white-space: nowrap;
      text-overflow: ellipsis;

      color: var(--sc-secondary-text-color);
    }

    a {
      cursor: pointer;
      text-decoration: none;

      color: inherit;
    }

    .header-right {
      font-size: var(--sc-skolar-font-size-xxs);
      font-weight: 600;
      line-height: 1;

      display: flex;
      flex-direction: column;

      height: 36px;
      padding: 0px 8px 4px;

      color: white;
      background-color: var(--sc-primary-color-dark);

      justify-content: center;
      align-items: center;
    }

    .essay {
      padding: 0 1rem 0.5rem 1rem;
    }

    .essay block-link {
      display: inline;
    }

    .essay:before {
      font-weight: 800;

      content: "Essay: ";
    }

    .essay a {
      font-family: var(--sc-serif-font);
    }

    .essay a:hover {
      cursor: pointer;
      text-decoration: underline;

      text-decoration-color: var(--sc-primary-color);
    }

    block-link a:hover {
      cursor: pointer;
      text-decoration: underline;

      text-decoration-color: var(--sc-primary-color);
    }

    .shortcut {
      display: flex;

      margin-right: 1rem;

      justify-content: flex-end;
    }

    .shortcut block-link {
      display: inline;
    }

    .shortcut-link {
      font-style: italic;

      display: inline-block;

      padding: 0.333rem 1rem;

      border-radius: 8px;
      background-color: var(--sc-primary-color-light-transparent);
    }

    .shortcut:before {
      font-weight: 800;
      line-height: 2;

      display: inline-block;

      margin-right: 0.333rem;

      content: "↳";

      color: var(--sc-disabled-text-color);
    }

    .shortcut-link:hover {
      text-decoration: underline;

      text-decoration-color: var(--sc-primary-color);
    }

    morph-ripple {
      --ripple-color: var(--sc-primary-color);
    }

    paper-ripple {
      color: var(--sc-primary-color-medium);
    }

    sc-tipitaka {
      min-height: 275px;
    }
  </style>
`;

export const navigationCompactModeStyles = html`
  <style>
    .blurb,
    .essay {
      display: none;
    }

    .card {
      min-width: 20em;
      margin-top: 0;
      margin-bottom: 1px;
      padding-bottom: 8px;

      cursor: pointer;

      border-radius: 0;
    }

    .header-left {
      padding: 12px 1rem 0;
    }

    .title {
      font-size: var(--sc-skolar-font-size-l);
      line-height: 1;
    }

    .shortcut {
      font-size: var(--sc-skolar-font-size-s);
    }
  </style>
`;
