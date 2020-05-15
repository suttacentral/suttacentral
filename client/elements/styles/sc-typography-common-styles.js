import { css } from 'lit-element';

export const typographyCommonStyles = css`

/* includes all text styles found in one or more of static, legacy, or bilara */

:root
{
    font-family: var(--sc-serif-font);
    font-size: var(--sc-skolar-font-size-md);
    font-weight: 400;
    line-height: 1.5;

    color: var(--sc-primary-text-color);
}

  main {
    display: flex;
    justify-content: center;
    margin: 4em 2em;
  }

/* text block elements */

ul,
ol,
dt,
p,
figure,
pre
{
    margin: .75em 0 0 0;
}
hr
{
    width: 33%;

    border: var(--sc-border);

    margin: 1.5em auto;
}

/* headings */

h1,
h2,
h3,
h4,
h5,
h6
{
    line-height: 1.3333;

    margin: 1em 0 0 0;

    color: var(--sc-secondary-text-color);
}
h1
{
    font-size: 2em;
    font-size: clamp(1.5em, 5vw, 2em);
    font-weight: 300;
}
h2
{
    font-size: 1.5em;
    font-size: clamp(1.125em, 3.75vw, 1.5em);
    font-weight: 400;
}
h3
{
    font-size: 1.333em;
    font-size: clamp(1em, 3.333vw, 1.333em);
    font-weight: 400;
}
h4
{
    font-size: 1.25em;
    font-size: clamp(1em, 5vw, 1.25em);
    font-weight: 400;
}
h5
{
    font-size: 1em;
    font-weight: 600;
}
h6
{
    font-size: 1em;
    font-style: italic;
}

/*sutta title */

header
{
    margin-bottom: 4em;

    text-align: center;

    color: var(--sc-secondary-text-color);
}
header ul
{
    font-family: var(--sc-sans-font);

    list-style-type: none;

    letter-spacing: var(--sc-caps-letter-spacing);

    font-variant-caps: all-small-caps;
}
header h1
{
    margin-top: .5rem;

    letter-spacing: var(--sc-caps-letter-spacing);

    font-variant-caps: small-caps;
}
header + p,
header + blockquote
{
    margin-top: 4em;
}

/* table of contents */

.contents
{
    margin: 4em 0;

    border-left: 4px solid var(--sc-primary-color-light);
}

.contents ul{
     list-style-type: none;
}

.contents li {
padding: 0.5em 1em;
    margin: 0 0 0 1em;
}

.contents a{
    text-decoration: none;
}

/* tables */

table
{
    margin: 2em auto 1em;

    border-collapse: collapse;
}
caption
{
    font-weight: 600;

    padding: 1em;
}
td
{
    padding: .6667em;

    vertical-align: text-top;

    border-top: var(--sc-border);
    border-bottom: var(--sc-border);
}
td:first-child
{
    font-weight: bold;
}

/* lists */

ol,
ul
{
    padding-left: 1em;
}
ol ul,
ul ol,
ul ul,
ol ol
{
    margin: .5em 0 0;
}
li
{
    padding: 0;
}
dt
{
    font-weight: bold;
}
dd
{
    margin-left: 1em;
}
dd ol,
dd ul
{
    padding-left: 0;
}
blockquote
{
    margin-left: 2em;
}

/* links */

a
{
    text-decoration: underline;

    color: inherit;

    text-decoration-color: var(--sc-primary-color);
}
a:hover
{
    color: var(--sc-primary-color);
}
a:visited
{
    text-decoration-color: var(--sc-primary-color-dark);
}

h1 a, h2 a, h3 a, h4 a, h5 a, h6 a{
    text-decoration: none;
}

/* descriptive classes used in bilara and legacy texts */

.evam
{
    letter-spacing: var(--sc-caps-letter-spacing);

    font-variant-caps: all-small-caps;
}
.namo
{
    font-style: italic;

    text-align: center;
}
.speaker
{
    font-style: italic;
}
.pe
{
    font-style: italic;

    color: var(--sc-secondary-text-color);
}
.add
{
    color: var(--sc-secondary-text-color);
}

/* end of section */

.endsection,
.end,
.endsubsection
{
    font-style: italic;

    text-align: center;

    color: var(--sc-secondary-text-color);
}

.endsutta
{
    font-weight: bold;

    text-align: center;

    color: var(--sc-secondary-text-color);
}
.endbook,
.endvagga
{
    text-align: center;
    letter-spacing: var(--sc-caps-letter-spacing);
    text-transform: uppercase;

    color: var(--sc-secondary-text-color);
}

[lang='si'] .endbook,
[lang='zh'] .endbook,
[lang='si'] .endvagga
{
    letter-spacing: normal;
    text-transform: none;

    font-variant-caps: normal;
}

.endbook
{
    font-weight: bold;
}

/* uddana */

.uddana
{
    font-family: var(--sc-sans-font);
    font-size: var(--sc-skolar-font-size-s);
    font-weight: 400;
   
    color: var(--sc-secondary-text-color);
}

.uddana-intro
{
    font-weight: bold;

    color: var(--sc-secondary-text-color);
}

.uddanagatha
{
    font-family: var(--sc-sans-font);
    font-size: var(--sc-skolar-font-size-s);
    font-weight: 400;
    font-style: inherit;
 
    color: var(--sc-secondary-text-color);
}
/* descriptive classes for metadata*/

.author
{
    letter-spacing: var(--sc-caps-letter-spacing);

    font-variant-caps: small-caps;
}

`