/* eslint-disable import/prefer-default-export */
import { css } from 'lit';

export const staticHomeStyles = css`
  sc-static-home {
    font-family: var(--sc-sans-font);
    font-size: var(--sc-skolar-font-size-md);
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
    font-size: 1.125rem;

    display: flex;
    flex-direction: column;

    padding: 0 0;

    text-align: center;

    align-items: center;
    justify-content: center;
  }

  .quotation {
    padding: 1em 0 1.5em 0;
    background-color: var(--sc-tertiary-background-color);
    width: calc(100vw - var(--scrollbar-width));
    transform: translateX(calc((min(1600px, 100%) - 100%) / 2));
  }

  .quotation h2 {
    font-family: var(--sc-sans-font);
    letter-spacing: var(--sc-caps-letter-spacing);
    color: var(--sc-secondary-text-color);

    font-variant-caps: all-small-caps;
    margin-bottom: 1em;
    font-weight: 300;
    font-stretch: expanded;
  }

  .tipitaka-section {
    font-size: 1.125rem;

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
    font-style: italic;
    font-weight: 500;

    display: inline-block;

    height: 17px;

    vertical-align: middle;
    letter-spacing: normal;

    font-variant-caps: normal;
  }

  blockquote {
    font-family: var(--sc-serif-font);
    font-size: 1.5rem;
    font-size: clamp(1.125em, 3.75vw, 1.5em);
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

    border-radius: 8px;
    box-shadow: var(--sc-shadow-elevation-1dp);
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

  figcaption {
    font-size: 0.8em;
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

  .card-content {
    display: flex;
    flex-direction: column;

    background: var(--sc-secondary-background-color);

    justify-content: space-between;
    flex: 1;
  }

  .card-text {
    padding: 6% 4% 0;
  }

  .card-actions {
    display: flex;

    min-height: 52px;
    padding: 4%;

    align-items: flex-end;
    justify-content: flex-end;
  }

  .link-button {
    font-weight: 600;

    display: inline-flex;

    box-sizing: border-box;
    min-width: 64px;
    height: 36px;
    padding: 0 15px 2px;

    text-decoration: none;
    letter-spacing: var(--sc-caps-letter-spacing);

    color: var(--sc-primary-accent-color-dark);
    border: 1px solid var(--sc-primary-accent-color);
    border-radius: 4px;

    align-items: center;
    justify-content: center;
    font-variant-caps: all-small-caps;
    background-color: inherit;
    transition: background-color 0.2s ease;
  }

  .link-button:hover {
    background-color: var(--sc-primary-accent-color-light-transparent);
    transition: background-color 0.2s ease;
  }

  .link-button:active {
    color: white;
    background-color: var(--sc-primary-accent-color);
    transition: background-color 0.2s ease;
  }

  h2 {
    font-family: var(--sc-serif-font);
    font-size: var(--sc-skolar-font-size-static-subtitle);
    font-weight: 400;
    line-height: 1.3333;

    margin: 0 0 0 0;
  }

  p {
    font-size: var(--sc-skolar-font-size-md);
    line-height: 1.5;

    margin: 0.75em 0 0 0;
  }

  a {
    text-decoration: none;
  }

  .video {
    display: flex;

    height: 360px;

    justify-content: center;
  }

  video {
    border-radius: 8px;
    box-shadow: var(--sc-shadow-elevation-1dp);
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
    color: var(--sc-primary-text-color);
    background-color: var(--sc-secondary-background-color);

    flex: 1;
  }

  .sc-related article header {
    display: flex;

    height: 80px;
    padding: 1rem;

    color: white;

    justify-content: space-between;
  }

  .sc-related a {
    text-decoration: underline;

    text-decoration-color: rgba(255, 255, 255, 0);

    transition: text-decoration-color 0.2s ease;
  }

  .sc-related a:hover {
    transition: text-decoration-color 0.2s ease;

    text-decoration-color: rgba(255, 255, 255, 0.6);
  }

  .sc-related article img {
    width: 72px;
  }

  .sc-related article header h3 {
    font-size: var(--sc-skolar-font-size-l);
    font-family: var(--sc-sans-font);
    font-weight: 600;

    margin: 0;

    text-align: end;

    display: flex;
    flex-direction: column;
  }

  .sc-related-item-subtitle {
    font-weight: 400;
    font-style: italic;
  }

  .related-projects-content {
    margin: 0.5em 0 1.5em 0;
  }

  .sc-related article p {
    padding: 0 1em 0 1em;
  }

  .sc-related article ul {
    margin: 0.75em 0 0 0;
    padding: 0 0 0 2em;
  }

  .sc-related article li::marker {
    color: var(--sc-icon-color);
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

  .dark-accent header {
    background-color: rgb(75, 74, 73);
  }

  .primary-accent header {
    background-color: rgb(59, 118, 59);
  }

  .primary-color header {
    background-color: rgb(161, 108, 0);
  }

  .related-projects-heading {
    margin: 0 1em;
    padding-left: 1em;

    border-bottom: 2px solid var(--sc-border-color);

    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .related-projects-heading h2 {
    font-family: var(--sc-sans-font);
    font-weight: 300;
    font-stretch: expanded;

    letter-spacing: var(--sc-caps-letter-spacing);

    font-variant-caps: all-small-caps;

    color: var(--sc-secondary-text-color);
  }

  .related-projects-heading a {
    display: flex;
    flex-direction: row;
    gap: 1em;
    align-items: center;

    padding-left: 1em;

    color: var(--sc-secondary-text-color);
    transition: all 200ms ease;
    text-decoration: none;

    text-decoration-color: var(--sc-primary-color-light);
    text-decoration-thickness: 0.15em;
    text-underline-offset: 0.06em;
  }

  .related-projects-heading a:hover {
    text-decoration: underline;

    background-color: var(--sc-primary-color-light-transparent);

    text-decoration-color: var(--sc-primary-color);
    text-decoration-thickness: 0.15em;
    text-underline-offset: 0.06em;
  }

  .related-projects-heading a:active {
    background-color: var(--sc-primary-color-light);
  }

  .related-projects-heading a:visited {
    text-decoration-color: var(--sc-primary-color-dark);
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
    fill: white;
    transform: scale(2);
    margin: 1rem;
  }

  .bilara {
    fill: white;
    width: 60px;
    height: 60px;
  }

  sc-navigation-tipitaka {
    min-height: 270px;
  }
`;
