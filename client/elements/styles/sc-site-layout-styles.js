import { css } from 'lit';

export const SCSiteLayoutStyles = css`
  sc-site-layout {
    display: flex;
    flex-direction: column;
    min-height: 100%;
  }

  p a,
  li a {
    text-decoration: underline;

    color: inherit;

    text-decoration-color: var(--sc-primary-color);
  }

  p a:hover,
  li a:hover {
    color: var(--sc-primary-color);
  }

  p a:visited,
  li a:visited {
    text-decoration-color: var(--sc-primary-color-dark);
  }

  /* apply font size here to avoid resizing title when returning to Home */
  #title {
    font-size: clamp(2rem, 8vw, 3em);
  }

  .homeTitle {
    display: flex;
    overflow: hidden;
    flex-direction: column;

    box-sizing: border-box;
    height: 180px;
    margin: auto;

    transition: all 0.1s;
    white-space: nowrap;
    text-overflow: ellipsis;

    justify-content: center;
  }

  #mainTitle {
    display: flex;

    justify-content: center;
    align-items: flex-end;
  }

  .homeTitle #mainTitle {
    font-family: var(--sc-serif-font);
    line-height: 1;

    letter-spacing: var(--sc-caps-letter-spacing);

    font-variant-caps: small-caps;

    height: 60px;
  }

  #subTitle {
    font-size: 0.5em;
    font-style: italic;
  }

  #universal_toolbar {
    position: sticky;
    z-index: 100;
    top: 0;

    color: var(--sc-tertiary-text-color);
    background-color: var(--sc-primary-color);
    box-shadow: var(--sc-shadow-elevation-2dp);
  }

  #context_toolbar {
    display: flex;

    height: 60px;

    padding: 0 8px 0 16px;

    justify-content: space-between;
  }

  .generalTitle {
    display: flex;

    height: 60px;

    align-items: center;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /* apply font size here to avoid resizing title when returning to Home */
  .generalTitle span {
    font-size: calc(20px * var(--sc-skolar-font-scale));
    font-stretch: condensed;
    font-weight: 600;
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

  svg.external {
    width: 15px;
    height: 15px;
    fill: white;
    margin: 6px 0 0 6px;
    visibility: hidden;
  }

  @media only screen and (max-width: 600px) {
    #context_toolbar.contextToolbarExpand {
      flex-direction: column;
      justify-content: center;
      height: 112px !important;
    }
  }

  .skip-to-content-link {
    background: #e77e23;
    height: 30px;
    left: 50%;
    padding: 8px;
    position: absolute;
    transform: translateY(-100%);
    transition: transform 0.3s;
  }

  .skip-to-content-link:focus {
    transform: translateY(0%);
  }

  .hidden {
    display: none !important;
  }
`;
