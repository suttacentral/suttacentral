import { html } from 'lit-element';

export const navigationNormalModeStyles = html`
  <style>
    main {
      max-width: 720px;
      margin: 0 auto 64px;
    }

    @media (max-width: 680px) {
      main {
        margin-top: -40px;
      }
    }

    .main-nav {
      display: flex;
      flex-direction: row;

      margin: 0 1vw;

      justify-content: center;
      flex-wrap: nowrap;
    }

    .card {
      position: relative;

      display: flex;
      overflow: hidden;
      flex-direction: column;

      margin-bottom: 0.6667rem;

      border-radius: var(--sc-size-sm);
      background-color: var(--sc-secondary-background-color);
      box-shadow: var(--sc-shadow-elevation-1dp);

      flex: 1;
      justify-content: center;
    }

    .home-card + .home-card {
      margin-left: 1vw;
    }

    @media screen and (max-width: 780px) {
      .main-nav {
        flex-direction: column;

        margin: 0;
      }

      .home-card + .home-card {
        margin-left: 0;
      }
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
      line-height: 1.333;

      padding: 0.25rem 1rem 0rem;

      margin-bottom: 0.667rem;

      cursor: pointer;
    }

    .blurbShrink {
      display: -webkit-box;
      overflow: hidden;

      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
    }

    .blurb:empty {
      margin: 0;
      padding: 0;
    }

    .header-link {
      padding-bottom: 0.25rem;
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

    .navigation-nerdy-row {
      font-size: var(--sc-skolar-font-size-s);

      overflow: hidden;

      white-space: nowrap;
      text-overflow: ellipsis;

      color: var(--sc-secondary-text-color);
    }

    .navigation-nerdy-row span + span {
      margin-left: var(--sc-size-md-larger);
    }

    .subTitle {
      font-weight: 800;

      letter-spacing: var(--sc-caps-letter-spacing);

      font-variant-caps: all-small-caps;
    }

    .show-root-language::before {
      content: attr(lang);
      background-color: var(--sc-disabled-text-color);
      color: white;
      font-weight: 800;
      padding: 0 4px;
      margin-right: 8px;
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

    a {
      cursor: pointer;
      text-decoration: none;

      color: inherit;
    }

    a[href$='/kn/dhp'] .show-root-language::before {
      display: none
    }

    .header-right {
      font-size: var(--sc-skolar-font-size-xxs);
      font-weight: 600;
      line-height: 1;

      display: flex;

    height: 24px;
    min-width: 72px;
    padding: 0 4px;
    box-sizing: border-box;

      color: white;
      background-color: var(--sc-primary-color-dark);

      justify-content: center;
      align-items: center;
    }

    .number-translated {
      white-space: nowrap;
    }

    .essay-link {
      font-family: var(--sc-serif-font);

      margin: 0 0.5rem 0.667rem;
      padding: 0.333rem 0.5rem;

      border-radius: 8px;

      align-self: flex-start;
    }

    .header-link .title,
    .essay-link,
    .shortcut-link {
      text-decoration-color: transparent;
    }

    .header-link:hover,
    .essay-link:hover,
    .shortcut-link:hover {
      transition: all 200ms ease-out;

      background-color: var(--sc-primary-color-light-transparent);
    }

    .header-link:active,
    .essay-link:active,
    .shortcut-link:active {
      transition: all 200ms ease-out;

      background-color: var(--sc-primary-color-light);
    }

    .header-link:hover .title,
    .essay-link:hover,
    .shortcut-link:hover {
      transition: all 200ms ease-out;
      text-decoration: underline;

      text-decoration-color: var(--sc-primary-color);
    }

    .essay::before {
      font-family: var(--sc-sans-font);
      font-weight: 800;
      color: var(--sc-secondary-text-color);

      content: 'Essay: ';
    }

    .shortcut {
      display: flex;

      margin-right: 1rem;

      justify-content: flex-end;
    }

    .shortcut-link {
      font-style: italic;

      display: inline-block;

      padding: 0.333rem 0.5rem;

      border: 2px solid var(--sc-primary-color-light);
      border-radius: 8px;
      margin-bottom: 0.667rem;
    }

    .shortcut-link:before {
      font-weight: 800;

      display: inline-block;

      margin-right: 0.333rem;

      content: '↳';

      color: var(--sc-disabled-text-color);
    }

    .essay-link + .shortcut {
      margin-top: -0.667rem;
    }

    sc-tipitaka {
      min-height: 275px;
    }
  </style>
`;

export const navigationCompactModeStyles = html`
  <style>
    .blurb,
    .essay-link {
      display: none;
    }

    .card {
      min-width: 20em;
      margin-top: 0;
      margin-bottom: 1px;

      border-radius: 0;
    }

    .header-link {
      padding-bottom: 0;
    }

    .header-left {
      padding: 0.667rem 1rem 0.5rem;
    }

    .title {
      font-size: var(--sc-skolar-font-size-l);
      line-height: 1;
    }

    .shortcut-link {
      font-size: var(--sc-skolar-font-size-xs);

      margin-top: 0;
      margin-bottom: 0.5rem;
      border: none;
    }
  </style>
`;
