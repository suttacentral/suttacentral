import { css } from 'lit';

export const staticHomeStyles = css`
  sc-static-home {
    font-family: var(--sc-sans-font);
    font-size: var(--sc-font-size-md);
    font-weight: 400;

    content-visibility: auto;
  }

  main {
    max-width: 1600px;
    margin: 0 auto;
  }

  section + section {
    margin-top: 4%;
  }

  .plain {
    font-size: var(--sc-font-size-l);

    display: flex;
    flex-direction: column;

    padding: 0 0;

    text-align: center;

    align-items: center;
    justify-content: center;
  }

  .quotation {
    width: calc(100vw - var(--scrollbar-width));
    padding: 1em 0 1.5em 0;

    transform: translateX(calc((min(1600px, 100%) - 100%) / 2));

    background-color: var(--sc-tertiary-background-color);
  }

  .quotation h2 {
    font-family: var(--sc-sans-font);
    font-weight: 300;
    font-stretch: expanded;

    margin-bottom: 1em;

    letter-spacing: var(--sc-caps-letter-spacing);

    color: var(--sc-on-primary-secondary-text-color);

    font-variant-caps: all-small-caps;
  }

  .editions {
    width: calc(100vw - var(--scrollbar-width));
    margin-top: 2rem;
    padding: 1em 0;

    transform: translateX(calc((min(1600px, 100%) - 100%) / 2));

    background-color: var(--sc-tertiary-background-color);
  }

  .editions a {
    margin: 0 1em;
    padding: 1em 1em;

    border-radius: var(--sc-big-border-radius);
  }

  .editions h2 {
    font-family: var(--sc-sans-font);
    font-size: var(--sc-font-size-xxxl);
    font-weight: 600;
    font-weight: 300;
    font-stretch: expanded;

    margin: 0 0 1rem 0;

    letter-spacing: var(--sc-caps-letter-spacing);

    color: var(--sc-on-tertiary-secondary-text-color);

    font-variant-caps: small-caps;
  }

  .editions .call-to-action {
    font-size: var(--sc-font-size-xl);
    font-style: italic;

    padding: 1rem 0 0 0;

    text-align: center;

    color: var(--sc-on-tertiary-secondary-text-color);
  }

  .editions figure {
    height: 240px;
  }

  .tipitaka-section {
    font-size: var(--sc-font-size-l);

    display: flex;
    flex-direction: column;

    box-sizing: border-box;
    min-height: 39px;
    margin: 0 6vw 24px;
    padding-bottom: 3px;

    text-align: center;

    border-bottom: 2px solid var(--sc-primary-color-light);

    align-items: center;
  }

  .tipitaka-section h2 {
    font-size: var(--sc-font-size-xxl);
    line-height: 1;

    box-sizing: border-box;
    width: 100%;
    padding-bottom: 12px;

    letter-spacing: var(--sc-caps-letter-spacing);

    border-bottom: 1px solid var(--sc-primary-color-light);

    font-variant-caps: all-small-caps;
  }

  .tipitaka-section h2 em {
    font-size: 0.6667em;
    font-weight: 500;
    font-style: italic;

    display: inline-block;

    height: 0.9em;

    vertical-align: middle;
    letter-spacing: normal;

    font-variant-caps: normal;
  }

  blockquote {
    font-family: var(--sc-serif-font);
    font-size: var(--sc-font-size-xl);
    font-weight: 300;
    font-style: italic;
    line-height: 1.5;

    position: relative;

    width: 80%;
    margin: 0 0 2% 0;
    padding: 0;

    text-align: center;
  }

  /* ensure a consistent spacing for the quote decoration */
  blockquote span {
    position: relative;
  }

  blockquote span:before {
    font-size: 4em;
    line-height: 1;

    position: absolute;
    left: -0.5em;

    content: '“';

    color: var(--sc-icon-color);
  }

  article {
    display: flex;
    overflow: hidden;
    flex-direction: column;

    margin-bottom: 16px;

    border-radius: var(--sc-big-border-radius);
  }

  .two-cards {
    display: grid;

    margin-right: 1vw;
    margin-left: 1vw;

    justify-content: center;
    grid-template-columns: repeat(2, minmax(240px, 1fr));
    gap: 3% 2%;
  }

  figure {
    position: relative;

    overflow: hidden;

    height: 480px;
    margin: 0;
  }

  img {
    height: 100%;

    object-fit: cover;
  }

  .buddhismnet-image-container img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  figcaption {
    font-size: var(--sc-font-size-s);
    font-weight: 600;

    position: absolute;
    right: 0;
    bottom: 0;

    box-sizing: border-box;
    width: 100%;
    padding: 16px;

    text-align: right;
    letter-spacing: 0.5px;

    color: white;
    background-color: rgba(0, 0, 0, 0.5);

    backdrop-filter: blur(2px);
  }

  .card {
    position: relative;

    --md-elevation-level: 3;
  }

  .card .block-link {
    height: -moz-available; /* WebKit-based browsers will ignore this. */
    height: -webkit-fill-available; /* Mozilla-based browsers will ignore this. */
    height: stretch;
  }

  .two-cards .card {
    color: var(--sc-on-secondary-primary-text-color);
    background-color: var(--sc-tertiary-background-color);
  }

  .card-content {
    display: flex;
    flex-direction: column;

    height: 100%;

    justify-content: space-between;
    flex: 1;
  }

  .card-text {
    padding: 1.5em;
  }

  .card-actions {
    display: flex;

    margin: 8px 0;

    align-items: flex-end;
    justify-content: flex-end;
  }

  h2 {
    font-family: var(--sc-serif-font);
    font-size: var(--sc-font-size-xl);
    font-weight: 500;

    margin: 0 0 0 0;
  }

  p {
    font-size: var(--sc-font-size-md);
    line-height: 1.5;

    margin: 0.5em 0 0 0;
  }

  .video {
    display: flex;

    height: 360px;

    justify-content: center;
  }

  video {
    border-radius: var(--sc-mid-border-radius);
    box-shadow: var(--sc-shadow-elevation-2dp);
  }

  @media (max-width: 680px) {
    .two-cards {
      display: flex;
      flex-direction: column;

      margin-right: 0;
      margin-left: 0;

      gap: 0;
    }

    video {
      width: 100%;
    }

    br {
      content: '';
    }

    h2 {
      font-weight: 500;
    }
  }

  .top-two {
    display: flex;
    flex-direction: row;

    min-height: 360px;
    margin: 48px 1vw;

    flex-wrap: nowrap;
    justify-content: space-around;
    gap: 1em;
  }

  @media (max-width: 1120px) {
    .top-two {
      flex-wrap: wrap;
    }
  }

  .top-two .plain {
    margin-top: 0;
  }

  .sc-related {
    display: flex;
    flex-direction: column;

    margin: 4% 1vw;

    gap: 1vw;
  }

  .sc-related article {
    color: var(--sc-on-primary-primary-text-color);

    flex: 1;
  }

  .sc-related article header {
    display: flex;

    height: 80px;
    padding: 1rem;

    color: white;

    justify-content: space-between;
  }

  .sc-related article img {
    width: 72px;
  }

  .sc-related article header h3 {
    font-family: var(--sc-sans-font);
    font-size: var(--sc-font-size-l);
    font-weight: 600;

    display: flex;
    flex-direction: column;

    margin: 0;

    text-align: end;
  }

  .sc-related-item-subtitle {
    font-weight: 400;
    font-style: italic;
  }

  .sc-related-item-subtitle.readingFaithfully {
    font-size: var(--sc-font-size-md);
  }

  .related-projects-content {
    position: relative;

    margin: 1em 1em 1.5em;

    color: var(--sc-on-secondary-primary-text-color);
  }

  .sc-related article p {
    margin-top: 0;
  }

  .sc-related article ul {
    margin: 0.75em 0 0 0;
    padding: 0 0 0 2em;
  }

  li::marker {
    font-family: var(--sc-sans-font);
    font-weight: 600;

    color: var(--sc-icon-color);

    font-feature-settings: 'tnum', 'onum';
  }

  .sc-related-items-wrapper {
    display: flex;
    flex-direction: row;

    justify-content: center;
    flex-wrap: wrap;
    gap: 1em;
  }

  .secondary-accent header {
    background-color: var(--sc-secondary-accent-color);
  }

  .secondary-accent {
    outline: 2px solid var(--sc-secondary-accent-color);
  }

  .dark-accent header {
    background-color: var(--sc-on-primary-secondary-text-color);
  }

  .dark-accent {
    outline: 2px solid var(--sc-on-primary-secondary-text-color);
  }

  .primary-accent header {
    background-color: var(--sc-primary-accent-color);
  }

  .primary-accent {
    outline: 2px solid var(--sc-primary-accent-color);
  }

  .primary-color header {
    background-color: var(--sc-primary-color);
  }

  .primary-color {
    outline: 2px solid var(--sc-primary-color);
  }

  .related-projects-heading {
    display: flex;
    flex-direction: row;

    margin: 0 1em;
    padding-left: 1em;

    border-bottom: 2px solid var(--sc-border-color);

    justify-content: space-between;
  }

  .related-projects-heading h2 {
    font-family: var(--sc-sans-font);
    font-weight: 300;
    font-stretch: expanded;

    letter-spacing: var(--sc-caps-letter-spacing);

    color: var(--sc-on-primary-secondary-text-color);

    font-variant-caps: all-small-caps;
  }

  .related-projects-heading a {
    display: flex;
    flex-direction: row;

    padding: 8px 16px;

    color: var(--sc-on-primary-secondary-text-color);
    border-radius: 20px;

    gap: 1em;
    align-items: center;
  }

  .sc-related-items-wrapper a {
    height: 100%;

    color: var(--sc-on-secondary-primary-text-color);
    background-color: var(--sc-secondary-background-color);
  }

  .related-projects-heading a:active {
    background-color: var(--sc-primary-color-light);
  }

  .related-projects-heading .icon {
    fill: var(--sc-icon-color);
  }

  @media (max-width: 1120px) {
    .sc-related article {
      min-width: 40%;
    }
  }

  @media (max-width: 560px) {
    .sc-related article {
      min-width: 80%;
    }
  }

  .people,
  .speaker {
    margin: 1rem;

    transform: scale(2);

    fill: white;
  }

  .bilara {
    width: 60px;
    height: 60px;

    fill: white;
  }

  sc-navigation-tipitaka {
    min-height: 270px;
  }

  md-outlined-button {
    --md-outlined-button-outline-color: white;
    --md-outlined-button-label-text-color: white;
    --md-outlined-button-label-text-font: var(--sc-sans-font);
    --md-outlined-button-label-text-size: 16px;
    --md-outlined-button-outline-width: 2px;
    --md-outlined-button-hover-label-text-color: white;
    --md-outlined-button-focus-label-text-color: white;
    --md-outlined-button-pressed-label-text-color: white;
  }

  md-outlined-icon-button {
    float: right;
    --md-sys-color-outline: white;
    --md-outlined-icon-button-outline-width: 2px;
  }

  .fundraising-banner {
    cursor: pointer;
  }

  .fundraising-banner .icon {
    fill: white;
  }

  .home-page-pirivena-notice {
    margin-top: 1em;
    width:50%;
    padding:1em;
    border: 4px dashed var(--sc-primary-accent-color);
    border-radius: 2em;
    position: relative;
    margin-left: auto;
    margin-right: auto;
    width: 50%;
  }

  .home-page-pirivena-notice p {
    padding-bottom: 2em;
  }

  .editions-card {
    position: relative;
  }
`;
