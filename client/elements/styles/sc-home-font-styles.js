import { css } from 'lit';

export const SCCriticalFontStyles = css`
  html {
    --sc-sans-font: sans-serif;
    --sc-serif-font: serif;
    --sc-font-size-xxs: 0.65rem;
    --sc-font-size-xs: 0.78rem;
    --sc-font-size-s: 0.94rem;
    --sc-font-size-md: 1.125rem;
    --sc-font-size-l: 1.35rem;
    --sc-font-size-xl: 1.62rem;
    --sc-font-size-xxl: 1.944rem;
    --sc-font-size-xxxl: 2.33rem;
    --sc-font-size-xxxxl: 2.8rem;
    --sc-caps-letter-spacing: 0.02em;
  }

  /* for small screen, use type scale at 1.125 for larger font sizes, keep smaller sizes the same */

  @media screen and (max-width: 600px) {
    html {
      --sc-font-size-xxs: 0.65rem;
      --sc-font-size-xs: 0.78rem;
      --sc-font-size-s: 0.94rem;
      --sc-font-size-md: 1.125rem;
      --sc-font-size-l: 1.265rem;
      --sc-font-size-xl: 1.424rem;
      --sc-font-size-xxl: 1.6rem;
      --sc-font-size-xxxl: 1.8rem;
      --sc-font-size-xxxxl: 2.03rem;
    }
  }
`;