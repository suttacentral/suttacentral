import { html } from 'lit';

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

      border-radius: var(--sc-mid-border-radius);
      background-color: var(--sc-secondary-background-color);
      color: var(--sc-on-secondary-primary-text-color);
      box-shadow: var(--sc-shadow-elevation-4dp);

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
      font-size: var(--sc-font-size-md);
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
      font-size: var(--sc-font-size-xl);
      font-weight: 500;

      display: block;

      color: var(--sc-on-secondary-primary-text-color);
    }

    .navigation-nerdy-row {
      display: inline-grid;
      grid-auto-flow: column;
      gap: 1rem;
      font-size: var(--sc-font-size-s);

      overflow: hidden;

      white-space: nowrap;
      text-overflow: ellipsis;

      color: var(--sc-on-secondary-secondary-text-color);
    }

    .subTitle {
      font-weight: 600;

      display: inline-flex;
      align-items: center;

      letter-spacing: var(--sc-caps-letter-spacing);

      font-variant-caps: all-small-caps;
    }

    .show-root-language::before {
      content: attr(lang);
      background-color: var(--sc-icon-color);
      color: white;
      font-weight: 800;
      font-stretch: condensed;
      padding: 0 4px 1px 4px;
      margin-right: 1rem;
      line-height: 16px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      font-size: var(--sc-font-size-xs);
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
      display: none;
    }

    .header-right {
      font-size: var(--sc-font-size-xxs);
      font-weight: 600;
      line-height: 1;

      display: flex;

      height: 24px;
      min-width: 72px;
      padding: 0 8px 0 4px;
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

      font-size: var(--sc-font-size-s);
      font-weight: 500;

      margin: 0 0.5rem 0.667rem;
      padding: 8px 16px;

      border-radius: var(--sc-mid-border-radius);

      align-self: flex-start;
    }

    .header-link,
    .essay-link,
    .shortcut-link {
      transition: var(--sc-link-transition);

      background-color: inherit;
    }

    .header-link:hover,
    .essay-link:hover,
    .shortcut-link:hover {
      transition: var(--sc-link-transition);

      background-color: var(--sc-primary-color-light-transparent);
    }

    .header-link:active,
    .essay-link:active,
    .shortcut-link:active {
      transition: var(--sc-link-transition);

      background-color: var(--sc-primary-color-light);
    }

    .essay::before {
      font-family: var(--sc-sans-font);
      font-weight: 800;
      color: var(--sc-on-secondary-secondary-text-color);

      content: 'Essay: ';
    }

    .shortcut {
      display: flex;

      margin-right: 1rem;

      justify-content: flex-end;
    }

    .shortcut-link {
      box-sizing: border-box;
      font-style: italic;

      display: inline-block;

      padding: 6px 16px;

      border: 2px solid var(--sc-primary-color-light);
      border-radius: 18px;
      margin-bottom: 0.667rem;
      height: 36px;
    }

    .shortcut-link:before {
      font-weight: 800;

      display: inline-block;

      margin-right: 0.333rem;

      content: '↳';

      color: var(--sc-icon-color);
    }

    .essay-link + .shortcut {
      margin-top: -0.667rem;
    }

    sc-navigation-tipitaka {
      min-height: 275px;
    }
  </style>
`;

export const navigationCompactModeStyles = html`
  <style>
    .blurb,
    .essay-link,
    .editions-nav-notice-link {
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
      font-size: var(--sc-font-size-l);
      line-height: 1;
    }

    .shortcut-link {
      font-size: var(--sc-font-size-xs);

      margin-top: 0;
      margin-bottom: 0.5rem;
      border: none;
    }
  </style>
`;

export const navigationPublicationInfoStyles = html`
  <style>
    .editions-nav-notice {
      display: flex;

      height: 160px;
    }

    .editions-nav-notice-text {
      display: flex;
      flex-direction: column;

      width: 100%;
      padding: 1em;
    }

    .editions-nav-notice-lead {
      font-size: var(--sc-font-size-xxs);
      font-weight: 600;

      display: flex;
      flex-direction: row;

      width: 100%;
      padding-bottom: 0.5em;

      text-align: center;

      border-bottom: 2px solid var(--sc-primary-color-light);

      gap: 0.8em;
      justify-content: center;
    }

    .edition-title {
      font-size: var(--sc-font-size-md);
    }

    .editions-nav-notice-by {
      align-self: center;
    }

    .creator {
      font-size: var(--sc-font-size-md);

      letter-spacing: var(--sc-caps-letter-spacing);

      font-variant-caps: small-caps;
    }

    .editions-nav-notice-description {
      padding: 1em 0;
    }

    a.editions-nav-notice-link {
      display: block;
      overflow: hidden;

      margin: 1em 1em 1em 1em;

      text-decoration: none;

      color: inherit;
      border: 1px solid var(--sc-border-color);
      border-radius: 8px;

      transition: var(--sc-link-transition);
    }

    a.editions-nav-notice-link:hover {
      background-color: var(--sc-primary-color-light-transparent);
      transition: var(--sc-link-transition);
    }

    .editions-nav-notice img {
      object-fit: cover;
    }

    .editions-nav-notice-banner {
      font-size: var(--sc-font-size-xs);
      font-weight: 500;
      font-stretch: expanded;

      padding: 0.2em 0;

      letter-spacing: var(--sc-caps-letter-spacing);

      color: var(--sc-primary-color-dark);

      align-self: flex-end;
      font-variant-caps: small-caps;
    }

    @media screen and (max-width: 500px) {
      img {
        display: none;
      }

      .editions-nav-notice {
        height: auto;
      }

      .editions-nav-notice-banner {
        margin-top: 0;
      }
    }
  </style>
`;
