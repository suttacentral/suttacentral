import { css } from 'lit';

export const SCSiteLayoutStyles = css`
  sc-site-layout {
    display: flex;
    flex-direction: column;

    min-height: 100%;

    --md-ripple-hover-color: var(--sc-secondary-background-color);
    --md-ripple-pressed-color: var(--md-sys-color-primary);
  }

  /* apply font size here to avoid resizing title when returning to Home */

  .homeTitle {
    display: flex;
    overflow: hidden;
    flex-direction: column;

    box-sizing: border-box;
    height: 180px;
    margin: auto;
    padding-right: 8px;

    white-space: nowrap;
    text-overflow: ellipsis;

    justify-content: center;
  }

  #mainTitle {
    font-size: clamp(2rem, 10vw, 2.8rem);

    display: flex;

    height: 44px;

    justify-content: center;
    align-items: center;
  }

  .homeTitle #mainTitle {
    font-family: var(--sc-serif-font);

    letter-spacing: var(--sc-caps-letter-spacing);

    font-variant-caps: small-caps;
  }

  #mainTitle span {
    margin-top: 4px;
  }

  #subTitle {
    font-size: clamp(0.94rem, 5vw, 1.62rem);
    font-style: italic;

    transition: opacity 0.5s ease-in;

    opacity: 1;
  }

  #universal_toolbar {
    position: sticky;
    z-index: 100;
    top: 0;

    color: var(--sc-inverted-text-color);
    background-color: var(--sc-primary-color);
    box-shadow: none;
  }

  #context_toolbar {
    display: flex;

    height: 60px;
    padding: 0 8px 0 16px;

    justify-content: space-between;
  }

  .generalTitle {
    display: flex;
    overflow: hidden;

    height: 60px;

    white-space: nowrap;
    text-overflow: ellipsis;

    align-items: center;
  }

  /* make footer stick to the bottom */
  #site_footer {
    margin-top: auto;
  }

  /* apply font size here to avoid resizing title when returning to Home */
  .generalTitle span {
    font-size: var(--sc-font-size-l);
    font-weight: 600;
    font-stretch: condensed;
  }

  @media print {
    #universal_toolbar,
    #title,
    #site_footer {
      display: none;
    }
  }

  .sc_logo {
    width: 1.25em;
    height: 1.25em;
  }

  @media only screen and (max-width: 300px) {
    .sc_logo {
      width: 0;
      height: 0;
    }

    #mainTitle {
      justify-content: flex-start;
    }
  }

  @media only screen and (max-width: 600px) {
    #context_toolbar.contextToolbarExpand {
      flex-direction: column;

      height: 112px !important;

      justify-content: center;
    }
  }

  .skip-to-content-link {
    position: absolute;
    left: 50%;

    height: 30px;
    padding: 8px;

    transition: transform 0.3s;
    transform: translateY(-100%);

    background: #e77e23;
  }

  .skip-to-content-link:focus {
    transform: translateY(0%);
  }

  .hidden {
    display: none !important;
  }

  md-filled-button {
    --md-sys-color-primary: var(--sc-primary-accent-color);
    --md-sys-color-on-primary: white;
    --md-filled-button-label-text-font: var(--sc-sans-font);
    --md-filled-button-label-text-size: var(--sc-size-md);
  }

  .highlight {
    color: yellow;
  }
`;
