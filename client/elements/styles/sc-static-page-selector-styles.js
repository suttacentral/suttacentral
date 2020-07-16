import { css, html } from "lit-element";

export const SCPageStaticSelectorStyles = css`
  #titlebar {
    background-color: var(--sc-primary-color);
    height: 210px; 
    display: flex;
    justify-content: space-between;
    align-items: flex-start; /* This makes it easier to change to the Home page layout. Otherwise use center and no padding.*/
    padding-top: 16px;
    box-sizing: border-box;

    align-item: center;
    justify-content: center;
    color: white;
  }


  #titlebarSitetitle {
    font-size: 48px;
    font-family: "skolar pe";
    font-variant-caps: small-caps;
    text-align: center;
    line-height: 0.9;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;/* This only takes effect when the sidebar is closed. I haven't figured out how to apply it when the icons have been transformed.*/

    display: flex;
    align-item: center;
    justify-content: center;
  }

  #titlebarSubtitle{
		text-align: center;
		font-style: italic;
    font-size: 22.6px;
    display: flex;
    align-item: center;
    justify-content: center;
  }

  #topbar {
    color: white;
    position: sticky;
    top: 0;
    box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.05), 2px 2px 2px rgba(0, 0, 0, 0.05), 4px 4px 4px rgba(0, 0, 0, 0.05), 8px 8px 8px rgba(0, 0, 0, 0.05);
    z-index: 10;
    /* Ensure main content does not show on animation */
  }

  #titlebarCenter {
    transform: translateY(60px);
    min-width: 0;
  }

  #titlebarSitetitle {
    transform: scale(1);
  }

  #titlebarSubtitle {
    opacity: 1;
    transform: scale(1);
  }

  

`;

export const SCPageStaticSelectorOriginStyles = html`
      <style>
        app-toolbar {
          background-color: var(--sc-primary-color);
          height: auto;
        }

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

        .subtitle {
          font-size: var(--sc-skolar-font-size-static-subtitle);
          font-family: var(--sc-sans-font);
          color: var(--sc-tertiary-text-color);
          font-style: italic;
          margin-bottom: 24px;
          margin-top: 0;
          text-align: center;
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

        .title {
          max-width: 100%;
        }

        .title-text {
          text-align: center;
          color: var(--sc-tertiary-text-color);
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .title-logo-icon {
          vertical-align: bottom;
          height: var(--sc-size-xxl);
          width: var(--sc-size-xxl);
          margin: 0 var(--sc-size-sm);
        }

        .page-not-found-container {
          font-size: var(--sc-skolar-font-size-static-subtitle);
          font-family: var(--sc-sans-font);
          color: var(--sc-secondary-text-color);
          margin-top: var(--sc-size-xxl);
          text-align: center;
        }

        .navigation-tabs {
          width: 100%;
          --paper-tabs-selection-bar-color: var(--sc-primary-color-light);
        }

        .nav-link {
          color: var(--sc-tertiary-text-color);
          --paper-tab-ink: var(--sc-primary-color-light);
          padding-left: 10px;
          padding-right: 10px;
          text-transform: uppercase;
        letter-spacing: var(--sc-caps-letter-spacing);
        }

        #nav_toolbar {
          background-color: var(--sc-primary-color-dark);
          height: auto;
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
          .title-logo-icon {
            height: 40px;
            width: 40px;
          }
          .subtitle {
            font-size: var(--sc-skolar-font-size-md);
            margin-bottom: 0.5em;
          }
        }

        #pages {
          /* Subtract height of top bar */
          min-height: calc(100vh - 145px - var(--sc-size-xxl) - var(--sc-size-xl));
          position: relative;
        }

        #title_toolbar {
          position: absolute;
          padding-top: 58px;
          padding-left: 0;
          padding-right: 0;
          top: 0;
          left: 50%;
          z-index: 999;
          transform: translateX(-50%);
          width: 100%;
        }

        #subtitle_toolbar {
          padding-top: 62px;
          padding-bottom: var(--sc-size-md-larger);
        }

        @media print {
          app-toolbar {
            display: none;
          }
        }

        .title-home-link {
          text-decoration: none;
          background: none;
          height: 100%;
          /* display: flex; */
          align-items: center;
          justify-content: flex-start;
          color: var(--sc-tertiary-text-color);
          pointer-events: auto;
        }

        .title-home-logo-link {
          pointer-events: auto;
        }

        .title-home-link:hover {
          background: none;
        }

        .title-home-link:focus {
          outline: none;
        }

        .hideTitle {
          display: none;
        }
      </style>

`;