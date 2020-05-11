import { css } from 'lit-element';

export const typographyBilaraStyles = css`

/* styles unique to bilara texts */

/* lookup */

.spanFocused
{
    color: var(--sc-paper-tooltip-color);
    background-color: var(--sc-primary-color-light);
}

/* notes */

/* Anchor tooltips. */
article
{
    position: relative;
}

.comment,
.variant
{
    font-family: var(--sc-sans-font);
    font-size: var(--sc-skolar-font-size-s);
    line-height: 1.3333;

    z-index: 10;

    display: inline-block;

    box-sizing: border-box;
    padding: var(--sc-size-sm) var(--sc-size-md);

    color: var(--sc-secondary-text-color);
    border-width: 0 0 0 8px;
    border-style: solid;
    border-color: transparent;
    border-radius: var(--sc-size-sm);
    background-color: var(--sc-secondary-background-color);
}
.comment
{
    border-color: var(--sc-primary-accent-color);
}
.variant
{
    border-color: var(--sc-secondary-accent-color);
}

/* click on notes to raise obscured note when they overlap. this should be replaced by JS  */

.comment:active,
.variant:active
{
    z-index: 1000;

    box-shadow: var(--sc-shadow-elevation-8dp);
}

.comment:hover,
.variant:hover
{
    cursor: help;
}

/* Set shared styles for the tooltip, but don't show it. Specify classes, avoid unattributed attribute selector for performance.*/
.comment[data-tooltip]::after,
.variant[data-tooltip]::after
{
    position: absolute;
    z-index: 10;
    left: 50%;

    display: none;

    box-sizing: border-box;
    width: 300px;
    margin-left: -150px;
    padding: var(--sc-size-sm) var(--sc-size-md);

    content: attr(data-tooltip);
    white-space: normal;

    color: var(--sc-secondary-text-color);
    border-width: 0 0 0 8px;
    border-style: solid;
    border-radius: var(--sc-size-sm);
    background-color: var(--sc-secondary-background-color);
    box-shadow: var(--sc-shadow-elevation-8dp);
}

.comment[data-tooltip]::after
{
    border-color: var(--sc-primary-accent-color);
}

.variant[data-tooltip]::after
{
    border-color: var(--sc-secondary-accent-color);
}

[data-tooltip]:hover
{
    cursor: help;
}

/* references */

a
{
    font-family: var(--sc-sans-font);

    z-index: 10;

    display: inline-block;

    box-sizing: border-box;

    color: var(--sc-secondary-text-color);
}

.reference a
{
    font-weight: 500;
    font-style: normal;

    white-space: nowrap;
    text-decoration: none;

    color: var(--sc-secondary-text-color);

    font-feature-settings: 'dnom';
    font-variant-caps: normal;
}

.reference a:after
{
    content: ' ';
    white-space: pre;
}

header .reference a,
h2 .reference a,
h3 .reference a,
h4 .reference a,
h5 .reference a,
h6 .reference a
{
    display: none;
}

.pts:before
{
    content: 'pts';

    font-variant-caps: all-small-caps;
    font-feature-settings: 'ordn';
}

`