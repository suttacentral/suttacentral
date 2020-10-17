import { css, html } from "lit-element";

export const SCPageStaticSelectorStyles = css``;

export const SCPageStaticSelectorOriginStyles = html`
  <style>
    h1 {
      font-family: var(--sc-serif-font);
      font-variant-caps: small-caps;
      letter-spacing: var(--sc-caps-letter-spacing);
      font-size: var(--sc-skolar-font-size-static-main-title);
      text-align: left;
      color: var(--sc-tertiary-text-color);
      padding-top: 8px;
      padding-bottom: 4px;
      margin: 0;
      line-height: 1em;
      font-weight: normal;
    }

    [lang="ar"],
    [lang="si"],
    [lang="fa"],
    [lang="he"],
    [lang="hi"],
    [lang="vi"],
    [lang="jpn"],
    [lang="lzh"],
    [lang="zh"],
    [lang="mr"],
    [lang="my"],
    [lang="ta"],
    [lang="th"],
    [lang="xct"],
    [lang="ko"],
    [lang="bn"] {
      font-synthesis: none;
    }

    .page-not-found-container {
      font-size: var(--sc-skolar-font-size-static-subtitle);
      font-family: var(--sc-sans-font);
      color: var(--sc-secondary-text-color);
      margin-top: var(--sc-size-xxl);
      text-align: center;
    }

    .link-anchor {
      position: absolute;
      width: calc(100% + 20px);
      height: 100%;
    }

    @media (max-width: 925px) {
      .subtitle {
        font-size: var(--sc-skolar-font-size-xl);
        margin-bottom: 0.5em;
      }
    }

    @media (max-width: 800px) {
      .title {
        margin-left: initial;
      }
    }

    @media (max-width: 600px) {
      h1 {
        font-size: var(--sc-skolar-font-size-xxl);
        padding-top: 0.2em;
      }
    }

    #pages {
      margin-bottom: 64px;
      position: relative;
    }
  </style>
`;