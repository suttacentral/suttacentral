import { css } from 'lit';

export const languageBaseMenuCss = css`
  :host {
    overflow-y: scroll;
  }

  .language-chooser-header-wrapper {
    margin-top: 4px;
    margin-bottom: 4px;
    padding-top: 8px;
  }

  .separator {
    overflow: hidden;

    width: 100%;
    height: 1px;
    margin-top: var(--sc-size-xxs);
    margin-bottom: var(--sc-size-xxs);

    background-color: var(--sc-border-color);
  }

  .language-name::before {
    font-size: var(--sc-font-size-xxs);
    font-weight: 800;
    font-stretch: condensed;
    line-height: 16px;

    display: inline-block;

    width: 24px;
    margin-right: 16px;
    padding-bottom: 1px;

    content: attr(data-uid);
    text-align: center;
    letter-spacing: 0.5px;
    text-transform: uppercase;

    color: white;
    background-color: var(--sc-icon-color);

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

  [data-uid='jpn']::before,
  [data-uid='sld']::before,
  [data-uid='kln']::before,
  [data-uid='kan']::before,
  [data-uid='haw']::before {
    letter-spacing: 0;
  }

  .arrow_left {
    fill: var(--sc-icon-color);
  }

  .menu-item-wrapper {
    display: flex;

    align-items: center;
  }

  .language-base-menu-head-main {
    font-weight: 700;

    padding-left: 8px;

    color: var(--sc-on-primary-primary-text-color);
  }

  .language-base-menu-head-secondary {
    font-size: var(--sc-font-size-xs);
    font-stretch: condensed;
    line-height: 1.2;

    padding: 0 16px 8px 32px;

    color: var(--sc-on-primary-secondary-text-color);
  }

  [role='separator'] {
    overflow: hidden;

    width: 100%;
    height: 1px;
    margin-top: var(--sc-size-sm);
    margin-bottom: var(--sc-size-xxs);

    background-color: var(--sc-border-color);
  }

  .language-name {
    color: var(--sc-on-primary-primary-text-color);
  }

  md-menu-item {
    margin: 0 8px;

    border-radius: 28px;
    background-color: var(--sc-secondary-background-color);

    --md-menu-item-label-text-font: var(--sc-sans-font);
    --md-menu-item-label-text-weight: 500;
  }

  #show-more-menu {
    height: 68px;
    margin-bottom: 12px;
  }
`;
