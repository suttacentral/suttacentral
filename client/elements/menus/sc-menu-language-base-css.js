import { css } from 'lit';

export const languageBaseMenuCss = css`
  :host {
    overflow-y: scroll;
  }

  .language-chooser-header-wrapper {
    background-color: var(--sc-secondary-background-color);
    width: 250px;
    margin-top: 4px;
    margin-bottom: 4px;
  }

  .separator {
    background-color: var(--sc-border-color);
    width: 100%;
    overflow: hidden;
    height: 1px;
    margin-top: var(--sc-size-xxs);
    margin-bottom: var(--sc-size-xxs);
  }

  .language-name::before {
    display: inline-block;
    width: 24px;
    text-align: center;
    margin-right: 16px;
    content: attr(data-uid);
    background-color: var(--sc-icon-color);
    color: white;
    font-weight: 800;
    font-stretch: condensed;
    padding-bottom: 1px;
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

  #jpn::before,
  #sld::before,
  #kln::before,
  #kan::before,
  #haw::before {
    letter-spacing: 0;
    font-size: var(--sc-font-size-xxs);
  }

  .arrow_left {
    fill: var(--sc-icon-color);
  }

  .menu-item-wrapper {
    display: flex;
    align-items: center;
    margin-top: -8px;
  }

  .text-only {
    height: 32px;
  }

  .language-base-menu-head-main {
    font-weight: 700;
    color: var(--sc-on-primary-primary-text-color);
    padding-left: 8px;
  }

  .language-base-menu-head-secondary {
    font-size: var(--sc-font-size-xs);
    color: var(--sc-on-primary-secondary-text-color);
    padding: 0 16px 0 40px;
    line-height: 1.5;
    font-stretch: condensed;
  }

  [role='separator'] {
    background-color: var(--sc-border-color);
    width: 100%;
    overflow: hidden;
    height: 1px;
    margin-top: var(--sc-size-sm);
    margin-bottom: var(--sc-size-xxs);
  }

  .language-name {
    color: var(--sc-on-primary-primary-text-color);
  }

  md-menu-item {
    --md-menu-item-label-text-font: var(--sc-sans-font);
    --md-menu-item-label-text-weight: 500;
    background-color: var(--sc-secondary-background-color);
  }

  .menu-item-wrapper {
    margin-top: 2px;
    margin-bottom: 2px;
  }

  #show-more-menu {
    height: 68px;
    margin-bottom: 12px;
  }
`;
