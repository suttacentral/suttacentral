import { css } from 'lit';

export const typographyCommonStyles = css`
  /* includes all text styles found in one or more of static, legacy, or bilara */
  :host {
    font-family: var(--sc-serif-font);
    font-weight: 400;
    line-height: 1.5;

    color: var(--sc-on-primary-primary-text-color);
  }

  main {
    display: flex;
    justify-content: center;
  }

  main > article,
  div > article,
  .range {
    margin: 0 1em;
  }

  /* text block elements */

  ul,
  ol,
  dt,
  p,
  figure,
  pre {
    margin: 0.75em 0 0 0;
  }

  li::marker {
    color: var(--sc-icon-color);
    font-family: var(--sc-sans-font);

    font-weight: 600;

    font-feature-settings: 'tnum', 'onum';
  }

  hr {
    width: 33%;

    border: 0;
    height: 0;
    border-bottom: 1px solid var(--sc-on-primary-secondary-text-color);

    margin: 1.5em auto;
  }

  /* headings */

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.3333;

    margin: 1em 0 0 0;

    color: var(--sc-on-primary-secondary-text-color);
  }

  h1 {
    font-size: var(--sc-font-size-xxxxl);
    
    font-weight: 400;
  }

  h2 {
    font-size: var(--sc-font-size-xxxl);
    
    font-weight: 400;
  }

  h3 {
    font-size: var(--sc-font-size-xxl);
    
    font-weight: 400;
  }

  h4 {
    font-size: var(--sc-font-size-xl);
    
    font-weight: 400;
  }

  h5 {
    font-size: var(--sc-font-size-l);
    font-weight: 600;
  }

  h6 {
    font-size: var(--sc-font-size-md);
    font-style: italic;
  }

  /*sutta title */

  header {
    margin-bottom: 4rem;

    text-align: center;

    color: var(--sc-on-primary-secondary-text-color);
  }

  header ul {
    display: block;
    margin: 0;
    padding: 0;

    list-style-type: none;

    letter-spacing: var(--sc-caps-letter-spacing);

    font-variant-caps: all-small-caps;
    font-weight: 500;
  }

  header h1 {
    margin-top: 0.5rem;

    letter-spacing: var(--sc-caps-letter-spacing);

    font-variant-caps: small-caps;
  }

  /* table of contents */

  .contents {
    margin: 4em 0;

    border-left: 4px solid var(--sc-primary-color-light);

    border-radius: 4px;
  }

  .contents ul {
    list-style-type: none;
  }

  .contents ol {
    margin: 0 0 0 2rem;
    padding: 0 0 0 1rem;
  }

  .contents li {
    font-family: var(--sc-serif-font);
    font-size: var(--sc-font-size-md);
    font-weight: 400;

    margin: 0.5em 0;
    padding: 0.25em 0 0.25em clamp(0rem, 3vw, 1rem);
  }

  .contents a {
    text-decoration: none;
    color: inherit;
  }

  /* tables */

  table {
    margin: 2em auto 1em;

    border-collapse: collapse;
  }

  caption {
    font-weight: 600;

    padding: 1em;
  }

  td {
    padding: 0.6667em;

    vertical-align: text-top;

    border-top: var(--sc-border);
    border-bottom: var(--sc-border);
  }

  td:first-child {
    font-weight: bold;
  }

  /* lists */

  ol,
  ul {
    padding-left: 1em;
  }

  ol ul,
  ul ol,
  ul ul,
  ol ol {
    margin: 0.5em 0 0;
  }

  li {
    padding: 0;
  }

  dt {
    font-weight: bold;
  }

  dd {
    margin-left: 1em;
  }

  dd ol,
  dd ul {
    padding-left: 0;
  }

  /* links */


  h1 a,
  h2 a,
  h3 a,
  h4 a,
  h5 a,
  h6 a {
    text-decoration: none;
  }

  /* static endnotes */

@supports (font-variant-position: super)
{
    a[role='doc-noteref']
    {
        font-family: var(--sc-sans-font);
        font-weight: 600!important;
        font-style: normal!important;

        padding: .1em .2em;

        font-variant-position: super;

        display: inline-block;

        height: .55em;

        line-height: 1;

        text-decoration: none;

        border-radius: 50%;

        border: .15em solid var(--sc-primary-color-light);

        margin-top: -.15em;

        color: var(--sc-on-primary-secondary-text-color)
    }
}

@supports not (font-variant-position: super)
{
    a[role='doc-noteref']
    {
        font-family: var(--sc-sans-font);
        font-size: var(--sc-font-size-xs);
        font-weight: 600!important;
        font-style: normal!important;

        padding: 0 .2em;

        vertical-align: super;

        line-height: 1;

        text-decoration: none;

        border-radius: 50%;

        border: .15em solid var(--sc-primary-color-light);

        color: var(--sc-on-primary-secondary-text-color)
    }
}

a[role='doc-backlink']
{

        font-family: var(--sc-sans-font);
        padding: 0 .2em;

        text-decoration: none;

        color: var(--sc-on-primary-secondary-text-color);

        font-size: 0em;
}

/* use this pseudoelement together with the size 0 font hack because Skolar does not have the backlink character, but it does have a bunch of arrows in the PUA, so use one of them instead */

a[role='doc-backlink']::after{
  content: '󰈀';

  font-size: var(--sc-font-size-l)
}

section[role='doc-endnotes']
{
  margin-top: 3em;

  padding-top: 1em;

  position: relative
}

section[role='doc-endnotes']::before
{
    content: " ";
    position: absolute;
    left: 0px;
    top: 0px;
    height: 1px;
    width: 50%;
    border-top: 1px solid var(--sc-icon-color);
}


  /* descriptive classes used in bilara and legacy texts */

  .evam {
    letter-spacing: var(--sc-caps-letter-spacing);

    font-variant-caps: all-small-caps;
  }

  .namo {
    font-style: italic;

    text-align: center;
  }

  .roman-numerals {
    text-transform: uppercase;
    letter-spacing: var(--sc-caps-letter-spacing);
    text-decoration: underline overline;
    text-decoration-thickness: 0.05em;
    text-underline-offset: 0.2em;
  }

  .speaker {
    font-style: italic;
    text-indent: 3em;
    display: block;
  }

  .pe {
    font-style: italic;

    color: var(--sc-on-primary-secondary-text-color);
  }

  .expansion-instructions {
    font-style: italic;

    color: var(--sc-on-primary-secondary-text-color);
  }

  .add {
    color: var(--sc-on-primary-secondary-text-color);
  }

  /* end of section */

  .endsection,
  .end,
  .endsubsection {
    font-style: italic;

    text-align: center;

    color: var(--sc-on-primary-secondary-text-color);
  }

  .endsutta {
    font-weight: bold;

    text-align: center;

    color: var(--sc-on-primary-secondary-text-color);
  }

  .endbook,
  .endvagga,
  .endkanda {
    text-align: center;
    letter-spacing: var(--sc-caps-letter-spacing);
    text-transform: uppercase;

    color: var(--sc-on-primary-secondary-text-color);
  }

  [lang='si'] .endbook,
  [lang='zh'] .endbook,
  [lang='si'] .endvagga {
    letter-spacing: normal;
    text-transform: none;

    font-variant-caps: normal;
  }

  .endbook {
    font-weight: bold;
  }

  /* uddana */

  .uddana {
    font-family: var(--sc-sans-font);
    font-size: var(--sc-font-size-s);
    font-weight: 400;

    color: var(--sc-on-primary-secondary-text-color);
  }

  .uddana-intro {
    font-weight: bold;

    color: var(--sc-on-primary-secondary-text-color);
  }

  .uddanagatha {
    font-family: var(--sc-sans-font);
    font-size: var(--sc-font-size-s);
    font-weight: 400;
    font-style: inherit;

    color: var(--sc-on-primary-secondary-text-color);
  }

  /* descriptive classes for metadata*/

  .author {
    letter-spacing: var(--sc-caps-letter-spacing);

    font-variant-caps: small-caps;
  }

  .ref {
    font-family: var(--sc-sans-font);
    font-weight: 600;
    font-style: normal;

    white-space: nowrap;
    letter-spacing: normal;

    color: var(--sc-on-primary-secondary-text-color);

    font-variant-caps: normal;
  }

  footer {
    display: none;
  }

  /* style highlighted text, see  zz3/zz/test and zz1/zz/test*/

  /* Vinaya classes */

  .kamma {
    font-weight: 600;
  }

  .highlight .kamma {
    outline: 2px solid var(--sc-secondary-accent-color);
    position: relative;
    padding: 0 0.25em;
    margin: 0 -0.25em;
  }

  .rule {
    font-weight: 800;
  }

  .subrule {
    font-weight: 600;
  }

  .highlight .cakka {
    color: var(--sc-secondary-accent-color);
  }

  .highlight .anapatti {
    font-weight: 500;
  }

  .highlight .nidana {
    color: var(--sc-primary-accent-color);
  }

  .highlight .patimokkha p {
    outline: 2px solid var(--sc-toast-error-color);
    position: relative;
    padding: 0 0.25em;
    margin: 0 -0.25em;
  }

  .highlight :not(.patimokkha) .rule {
    outline: 2px dotted var(--sc-toast-error-color);
    position: relative;
    padding: 0 0.25em;
    margin: 0 -0.25em;
  }

  .highlight .suttanta {
    outline: 2px solid var(--sc-primary-color-light);
    position: relative;
    padding: 0 0.25em;
    margin: 0 -0.25em;
  }

  .highlight .jataka {
    outline: 2px solid var(--sc-primary-accent-color-light);
    position: relative;
    padding: 0 0.25em;
    margin: 0 -0.25em;
  }

  .highlight .patimokkha p::before,
  .highlight :not(.patimokkha) .rule::before,
  .highlight .kamma::before,
  .highlight .suttanta::before,
  .highlight .jataka::before {
    font-family: var(--sc-sans-font);
    font-size: var(--sc-font-size-s);
    font-weight: 400;
    font-style: normal;
    line-height: 1.3333;

    z-index: 10;

    display: inline-block;

    box-sizing: border-box;
    padding: var(--sc-size-sm) var(--sc-size-md);

    color: var(--sc-on-primary-secondary-text-color);

    letter-spacing: normal;

    font-variant-caps: normal;

    text-align: left;
    position: absolute;

    left: 0;

    top: -36px;

    visibility: hidden;

    height: 36px;

    padding: var(--sc-size-sm) var(--sc-size-md);

    white-space: normal;

    color: var(--sc-on-primary-secondary-text-color);
    border-width: 0 0 0 8px;
    border-style: solid;
    border-radius: var(--sc-size-sm);
    border-color: var(--sc-primary-color);
    background-color: var(--sc-secondary-background-color);
    box-shadow: var(--sc-shadow-elevation-8dp);
  }

  .highlight .patimokkha p::before {
    content: 'This text is included in the patimokkha recitation';
  }

  .highlight :not(.patimokkha) .rule::before {
    content: 'This rule is not included in the patimokkha recitation';
  }

  .highlight .kamma::before {
    content: 'This text is a formal legal statement of the Sangha';
  }

  .highlight .suttanta::before {
    content: 'This text is found also in the Discourses (Sutta)';
  }

  .highlight .jataka::before {
    content: 'This text is a story of the Buddha’s past lives (Jātaka)';
  }

  .highlight :hover::before,
  .highlight .patimokkha p:hover::before,
  .highlight :not(.patimokkha) .rule:hover::before {
    visibility: visible;
  }

  .highlight .padabhajaniya {
    background-color: var(--sc-tertiary-background-color);
    padding: 0 0.25em;
    margin: 0 -0.25em;
  }

  .highlight .vinaya-vinita {
    color: var(--sc-primary-accent-color);
  }

  .help-heading {
    font-style: italic;
  }

  /* descriptive classes */

  .xu {
    font-size: var(--sc-dense-font-size-s);

    padding: 1rem;
    margin-bottom: 4rem;

    color: var(--sc-on-primary-secondary-text-color);
    border: var(--sc-border);
    border-radius: var(--sc-size-s);
    background-color: var(--sc-tertiary-background-color);
  }

  .suttainfo {
    display: inline-block;

    padding: 1rem;
    margin-bottom: 2rem;

    color: var(--sc-on-primary-secondary-text-color);
    border: var(--sc-border);
    border-radius: var(--sc-size-s);
    background-color: var(--sc-tertiary-background-color);
  }

  .suppliedmetre {
    color: var(--sc-on-primary-secondary-text-color);
  }

  .gap {
    color: var(--sc-on-primary-secondary-text-color);
  }

  .describe {
    text-decoration: line-through;

    text-decoration-color: var(--sc-on-primary-secondary-text-color);
  }

  .del {
    text-decoration: line-through;

    text-decoration-color: var(--sc-on-primary-secondary-text-color);
  }

  .scribe {
    font-style: italic;
  }

  .alt-title {
    display: none;
  }

  .hidden {
    display: none;
  }

  .metre {
    display: none;
  }

  .t-gaiji {
    color: var(--sc-primary-accent-color);
  }

  .rule-number {
    color: var(--sc-on-primary-secondary-text-color);
  }

  .allowance {
    font-weight: bold;
  }

  .t-note {
    color: var(--sc-on-primary-secondary-text-color);
  }

  .vagga-number {
    color: var(--sc-on-primary-secondary-text-color);
  }

  .counter {
    font-family: var(--sc-sans-font);
    font-size: var(--sc-dense-font-size-s);
    font-weight: 400;
    color: var(--sc-on-primary-secondary-text-color);
  }

  .term {
    font-weight: bold;
  }

  .highlight .orthodox::before {
    content: '☑';
    color: var(--sc-toast-success-color);
  }

  .highlight .heterodox::before {
    content: '☒ ';
    color: var(--sc-toast-error-color);
  }

  .highlight .term {
    color: var(--sc-primary-accent-color);
  }

  .highlight .gloss {
    color: var(--sc-primary-accent-color);
  }

  .highlight .surplus {
    color: var(--sc-secondary-accent-color);
  }

  .highlight .supplied {
    color: var(--sc-primary-color);
  }

  .highlight .expanded {
    color: var(--sc-on-primary-secondary-text-color);
  }

  .highlight .var {
    color: var(--sc-secondary-accent-color);
  }

  .highlight .corr,
  .highlight .corrected {
    color: var(--sc-primary-accent-color);
  }

  .highlight .unclear {
    color: var(--sc-on-primary-secondary-text-color);
  }

  .highlight .metre {
    font-size: var(--sc-font-size-xxs);

    position: absolute;

    display: inline-block;

    margin-top: -11px;

    letter-spacing: 0.2em;

    color: var(--sc-primary-accent-color);
  }

  #simple_text_content .ref {
    display: none;
  }

  #simple_text_content .legacy-reference .ref {
    font-family: var(--sc-sans-font);
    font-size: var(-sc-font-size-s);
    font-weight: 400;
    font-style: normal;
    text-align: left;

    display: inline-block;

    box-sizing: border-box;
    margin: 0 4px;
    padding: 0.1em 4px;

    white-space: nowrap;
    text-decoration: none;
    letter-spacing: normal;

    color: var(--sc-on-primary-secondary-text-color);
    border: 1px solid var(--sc-border-color);
    border-radius: 8px;
    background-color: var(--sc-secondary-background-color);

    font-variant-caps: normal;
  }

  /* helper metadata in HTML data- */

  .highlight [data-counter]::after {
    padding: 0 0.25rem;
    margin: 0 0 0 0.5rem;
    background-color: var(--sc-icon-color);
    color: white;
    font-weight: 600;
    font-family: var(--sc-sans-font);
    font-size: var(--sc-font-size-xs);
    border-radius: 4px;
  }

  .highlight [data-counter]::after {
    content: attr(data-counter);
  }

  .highlight [data-doxy]::before {
    margin: 0 0.5rem 0 0;
    font-weight: 600;
    font-family: sans-serif;
    font-size: var(--sc-font-size-xs);
  }

  .highlight [data-doxy='orthodox']::before {
    content: '👍🏿';
  }

  .highlight [data-doxy='heterodox']::before {
    content: '👎🏽';
  }

  .highlight [data-direction]::before {
    margin: 0 0.5rem 0 0;
    font-weight: 600;
    font-family: sans-serif;
    font-size: var(--sc-font-size-xs);
  }

  .highlight [data-direction='forward']::before {
    content: '👉🏾';
    color: var(--sc-icon-color);
  }

  .highlight [data-direction='reverse']::before {
    content: '👈🏼';
    color: var(--sc-icon-color);
  }
`;
