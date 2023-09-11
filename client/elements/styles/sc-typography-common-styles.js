import { css } from 'lit';

export const typographyCommonStyles = css`
  /* includes all text styles found in one or more of static, legacy, or bilara */
  :host
{
    font-family: var(--sc-serif-font);
    font-weight: 400;
    line-height: 1.5;

    color: var(--sc-on-primary-primary-text-color);
}

main
{
    display: flex;

    justify-content: center;
}

main > article,
div > article,
.range
{
    margin: 0 1em;
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

li::marker
{
    font-family: var(--sc-sans-font);
    font-weight: 600;

    color: var(--sc-icon-color);

    font-feature-settings: 'tnum', 'onum';
}

hr
{
    width: 33%;
    height: 0;
    margin: 1.5em auto;

    border: 0;
    border-bottom: 1px solid var(--sc-on-primary-secondary-text-color);
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

    color: var(--sc-on-primary-secondary-text-color);
}

h1
{
    font-size: var(--sc-font-size-xxxxl);
    font-weight: 400;
}

h2
{
    font-size: var(--sc-font-size-xxxl);
    font-weight: 400;
}

h3
{
    font-size: var(--sc-font-size-xxl);
    font-weight: 400;
}

h4
{
    font-size: var(--sc-font-size-xl);
    font-weight: 400;
}

h5
{
    font-size: var(--sc-font-size-l);
    font-weight: 600;
}

h6
{
    font-size: var(--sc-font-size-md);
    font-style: italic;
}

/*sutta title */

header
{
    margin-bottom: 4rem;

    text-align: center;

    color: var(--sc-on-primary-secondary-text-color);
}

header ul
{
    font-weight: 500;

    display: block;

    margin: 0;
    padding: 0;

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

/* table of contents */

.contents
{
    margin: 4em 0;

    border-left: 4px solid var(--sc-primary-color-light);
    border-radius: 4px;
}

.contents ul
{
    list-style-type: none;
}

.contents ol
{
    margin: 0 0 0 2rem;
    padding: 0 0 0 1rem;
}

.contents li
{
    font-family: var(--sc-serif-font);
    font-size: var(--sc-font-size-md);
    font-weight: 400;

    margin: .5em 0;
}

.contents a
{
    padding: 8px 16px 6px;

    text-decoration: none;

    color: inherit;
    border-radius: 18px;
    transition: var(--sc-link-transition);
    background-color: inherit;
}

.contents a:hover
{
    transition: var(--sc-link-transition);
    text-decoration: none;

    background-color: var(--sc-primary-color-light-transparent);
}

.contents a:active
{
    background-color: var(--sc-primary-color-light);
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

/* links */

h1 a,
h2 a,
h3 a,
h4 a,
h5 a,
h6 a
{
    text-decoration: none;
}

/* static endnotes */

@supports (font-variant-position: super)
{
    a[role='doc-noteref']
    {
        font-family: var(--sc-sans-font);
        font-weight: 600 !important;
        font-style: normal !important;
        line-height: 1;

        display: inline-block;

        height: .55em;
        margin-top: -.15em;
        padding: .1em .2em;

        text-decoration: none;

        color: var(--sc-on-primary-secondary-text-color);
        border: .15em solid var(--sc-primary-color-light);
        border-radius: 50%;

        font-variant-position: super;
    }
}

@supports not (font-variant-position: super)
{
    a[role='doc-noteref']
    {
        font-family: var(--sc-sans-font);
        font-size: var(--sc-font-size-xs);
        font-weight: 600 !important;
        font-style: normal !important;
        line-height: 1;

        padding: 0 .2em;

        vertical-align: super;
        text-decoration: none;

        color: var(--sc-on-primary-secondary-text-color);
        border: .15em solid var(--sc-primary-color-light);
        border-radius: 50%;
    }
}

a[role='doc-backlink']
{
    font-family: var(--sc-sans-font);
    font-size: 0;

    padding: 0 .2em;

    text-decoration: none;

    color: var(--sc-on-primary-secondary-text-color);
}

/* use this pseudoelement together with the size 0 font hack because Skolar does not have the backlink character, but it does have a bunch of arrows in the PUA, so use one of them instead */

a[role='doc-backlink']::after
{
    font-size: var(--sc-font-size-l);

    content: '󰈀';
}

section[role='doc-endnotes']
{
    position: relative;

    margin-top: 3em;
    padding-top: 1em;
}

section[role='doc-endnotes']::before
{
    position: absolute;
    top: 0;
    left: 0;

    width: 50%;
    height: 1px;

    content: ' ';

    border-top: 1px solid var(--sc-icon-color);
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

.roman-numerals
{
    text-decoration: underline overline;
    letter-spacing: var(--sc-caps-letter-spacing);
    text-transform: uppercase;

    text-decoration-thickness: .05em;
    text-underline-offset: .2em;
}

.speaker
{
    font-style: italic;

    display: block;

    text-indent: 3em;
}

.pe
{
    font-style: italic;

    color: var(--sc-on-primary-secondary-text-color);
}

.expansion-instructions
{
    font-style: italic;

    color: var(--sc-on-primary-secondary-text-color);
}

.add
{
    color: var(--sc-on-primary-secondary-text-color);
}

/* end of section */

.endsection,
.end,
.endsubsection
{
    font-style: italic;

    text-align: center;

    color: var(--sc-on-primary-secondary-text-color);
}

.endsutta
{
    font-weight: bold;

    text-align: center;

    color: var(--sc-on-primary-secondary-text-color);
}

.endbook,
.endvagga,
.endkanda
{
    text-align: center;
    letter-spacing: var(--sc-caps-letter-spacing);
    text-transform: uppercase;

    color: var(--sc-on-primary-secondary-text-color);
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
    font-size: var(--sc-font-size-s);
    font-weight: 400;

    color: var(--sc-on-primary-secondary-text-color);
}

.uddana-intro
{
    font-weight: bold;

    color: var(--sc-on-primary-secondary-text-color);
}

.uddanagatha
{
    font-family: var(--sc-sans-font);
    font-size: var(--sc-font-size-s);
    font-weight: 400;
    font-style: inherit;

    color: var(--sc-on-primary-secondary-text-color);
}

/* descriptive classes for metadata*/

.author
{
    letter-spacing: var(--sc-caps-letter-spacing);

    font-variant-caps: small-caps;
}

.ref
{
    font-family: var(--sc-sans-font);
    font-weight: 600;
    font-style: normal;

    white-space: nowrap;
    letter-spacing: normal;

    color: var(--sc-on-primary-secondary-text-color);

    font-variant-caps: normal;
}

footer
{
    display: none;
}

/* style highlighted text, see  zz3/zz/test and zz1/zz/test*/

/* Vinaya classes */

.kamma
{
    font-weight: 600;
}

.highlight .kamma
{
    position: relative;

    margin: 0 -.25em;
    padding: 0 .25em;

    outline: 2px solid var(--sc-secondary-accent-color);
}

.rule
{
    font-weight: 800;
}

.subrule
{
    font-weight: 600;
}

.highlight .cakka
{
    color: var(--sc-secondary-accent-color);
}

.highlight .anapatti
{
    font-weight: 500;
}

.highlight .nidana
{
    color: var(--sc-primary-accent-color);
}

.highlight .patimokkha p
{
    position: relative;

    margin: 0 -.25em;
    padding: 0 .25em;

    outline: 2px solid var(--sc-toast-error-color);
}

.highlight :not(.patimokkha) .rule
{
    position: relative;

    margin: 0 -.25em;
    padding: 0 .25em;

    outline: 2px dotted var(--sc-toast-error-color);
}

.highlight .suttanta
{
    position: relative;

    margin: 0 -.25em;
    padding: 0 .25em;

    outline: 2px solid var(--sc-primary-color-light);
}

.highlight .jataka
{
    position: relative;

    margin: 0 -.25em;
    padding: 0 .25em;

    outline: 2px solid var(--sc-primary-accent-color-light);
}

.highlight .patimokkha p::before,
.highlight :not(.patimokkha) .rule::before,
.highlight .kamma::before,
.highlight .suttanta::before,
.highlight .jataka::before
{
    font-family: var(--sc-sans-font);
    font-size: var(--sc-font-size-s);
    font-weight: 400;
    font-style: normal;
    line-height: 1.3333;

    position: absolute;
    z-index: 10;
    top: -36px;
    left: 0;

    display: inline-block;
    visibility: hidden;

    box-sizing: border-box;
    height: 36px;
    padding: var(--sc-size-sm) var(--sc-size-md);
    padding: var(--sc-size-sm) var(--sc-size-md);

    text-align: left;
    white-space: normal;
    letter-spacing: normal;

    color: var(--sc-on-primary-secondary-text-color);
    color: var(--sc-on-primary-secondary-text-color);
    border-width: 0 0 0 8px;
    border-style: solid;
    border-color: var(--sc-primary-color);
    border-radius: var(--sc-size-sm);
    background-color: var(--sc-secondary-background-color);
    box-shadow: var(--sc-shadow-elevation-8dp);

    font-variant-caps: normal;
}

.highlight .patimokkha p::before
{
    content: 'This text is included in the patimokkha recitation';
}

.highlight :not(.patimokkha) .rule::before
{
    content: 'This rule is not included in the patimokkha recitation';
}

.highlight .kamma::before
{
    content: 'This text is a formal legal statement of the Sangha';
}

.highlight .suttanta::before
{
    content: 'This text is found also in the Discourses (Sutta)';
}

.highlight .jataka::before
{
    content: 'This text is a story of the Buddha’s past lives (Jātaka)';
}

.highlight :hover::before,
.highlight .patimokkha p:hover::before,
.highlight :not(.patimokkha) .rule:hover::before
{
    visibility: visible;
}

.highlight .padabhajaniya
{
    margin: 0 -.25em;
    padding: 0 .25em;

    background-color: var(--sc-tertiary-background-color);
}

.highlight .vinaya-vinita
{
    color: var(--sc-primary-accent-color);
}

.help-heading
{
    font-style: italic;
}

/* descriptive classes */

.xu
{
    font-size: var(--sc-dense-font-size-s);

    margin-bottom: 4rem;
    padding: 1rem;

    color: var(--sc-on-primary-secondary-text-color);
    border: var(--sc-border);
    border-radius: var(--sc-size-s);
    background-color: var(--sc-tertiary-background-color);
}

.suttainfo
{
    display: inline-block;

    margin-bottom: 2rem;
    padding: 1rem;

    color: var(--sc-on-primary-secondary-text-color);
    border: var(--sc-border);
    border-radius: var(--sc-size-s);
    background-color: var(--sc-tertiary-background-color);
}

.suppliedmetre
{
    color: var(--sc-on-primary-secondary-text-color);
}

.gap
{
    color: var(--sc-on-primary-secondary-text-color);
}

.describe
{
    text-decoration: line-through;

    text-decoration-color: var(--sc-on-primary-secondary-text-color);
}

.del
{
    text-decoration: line-through;

    text-decoration-color: var(--sc-on-primary-secondary-text-color);
}

.scribe
{
    font-style: italic;
}

.alt-title
{
    display: none;
}

.hidden
{
    display: none;
}

.metre
{
    display: none;
}

.t-gaiji
{
    color: var(--sc-primary-accent-color);
}

.rule-number
{
    color: var(--sc-on-primary-secondary-text-color);
}

.allowance
{
    font-weight: bold;
}

.t-note
{
    color: var(--sc-on-primary-secondary-text-color);
}

.vagga-number
{
    color: var(--sc-on-primary-secondary-text-color);
}

.counter
{
    font-family: var(--sc-sans-font);
    font-size: var(--sc-dense-font-size-s);
    font-weight: 400;

    color: var(--sc-on-primary-secondary-text-color);
}

.term
{
    font-weight: bold;
}

.highlight .orthodox::before
{
    content: '☑';

    color: var(--sc-toast-success-color);
}

.highlight .heterodox::before
{
    content: '☒ ';

    color: var(--sc-toast-error-color);
}

.highlight .term
{
    color: var(--sc-primary-accent-color);
}

.highlight .gloss
{
    color: var(--sc-primary-accent-color);
}

.highlight .surplus
{
    color: var(--sc-secondary-accent-color);
}

.highlight .supplied
{
    color: var(--sc-primary-color);
}

.highlight .expanded
{
    color: var(--sc-on-primary-secondary-text-color);
}

.highlight .var
{
    color: var(--sc-secondary-accent-color);
}

.highlight .corr,
.highlight .corrected
{
    color: var(--sc-primary-accent-color);
}

.highlight .unclear
{
    color: var(--sc-on-primary-secondary-text-color);
}

.highlight .metre
{
    font-size: var(--sc-font-size-xxs);

    position: absolute;

    display: inline-block;

    margin-top: -11px;

    letter-spacing: .2em;

    color: var(--sc-primary-accent-color);
}

#simple_text_content .ref
{
    display: none;
}

#simple_text_content .legacy-reference .ref
{
    font-family: var(--sc-sans-font);
    font-size: var(-sc-font-size-s);
    font-weight: 400;
    font-style: normal;

    display: inline-block;

    box-sizing: border-box;
    margin: 0 4px;
    padding: .1em 4px;

    text-align: left;
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

.highlight [data-counter]::after
{
    font-family: var(--sc-sans-font);
    font-size: var(--sc-font-size-xs);
    font-weight: 600;

    margin: 0 0 0 .5rem;
    padding: 0 .25rem;

    color: white;
    border-radius: 4px;
    background-color: var(--sc-icon-color);
}

.highlight [data-counter]::after
{
    content: attr(data-counter);
}

.highlight [data-doxy]::before
{
    font-family: var(--sc-sans-font);
    font-size: var(--sc-font-size-xs);
    font-weight: 600;

    margin: 0 .5rem 0 0;
}

.highlight [data-doxy='orthodox']::before
{
    content: '👍🏿';
}

.highlight [data-doxy='heterodox']::before
{
    content: '👎🏽';
}

.highlight [data-direction]::before
{
    font-family: var(--sc-sans-font);
    font-size: var(--sc-font-size-xs);
    font-weight: 600;

    margin: 0 .5rem 0 0;
}

.highlight [data-direction='forward']::before
{
    content: '👉🏾';

    color: var(--sc-icon-color);
}

.highlight [data-direction='reverse']::before
{
    content: '👈🏼';

    color: var(--sc-icon-color);
}

`;
