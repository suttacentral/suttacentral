import { css } from 'lit-element';

export const typographyLegacyStyles = css`

/* styles unique to legacy texts */

/* sutta title */

.subheading
{
    font-style: italic;
}

/*bilingual sutta title*/

.mirror
{
    display: table;

    margin-right: auto;
    margin-left: auto;
}
.mirror > *
{
    display: table-row;
}
.mirror-left
{
    display: table-cell;

    width: 50%;
    padding-right: 1em;

    text-align: right;

    border-right: var(--sc-border);
}
.mirror-right
{
    display: table-cell;

    padding-left: 1em;

    text-align: left;
}
.mirror-middle
{
    position: absolute;

    margin-top: .2em;

    text-align: right;
}

/* descriptive classes */

.suttainfo
{
    display: inline-block;

    padding: 1em;

    color: var(--sc-secondary-text-color);
    border: var(--sc-border);
    border-radius: var(--sc-size-xxs);
    background: var(--sc-primary-background-color);
}

.suppliedmetre
{
    color: var(--sc-secondary-text-color);
}
.gap
{
    color: var(--sc-secondary-text-color);
}
.delscribe
{
    text-decoration: line-through;

    text-decoration-color: var(--sc-secondary-text-color);
}
.del
{
    text-decoration: line-through;

    text-decoration-color: var(--sc-secondary-text-color);
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
    color: var(--sc-secondary-text-color);
}
.allowance
{
    font-weight: bold;
}
.t-note
{
    color: var(--sc-secondary-text-color);
}
.vagga-number
{
    color: var(--sc-secondary-text-color);
}
.counter,
.t-counter
{
    font-family: var(--sc-traditional-chinese-font);
    font-size: var(--sc-dense-font-size-s);
    font-weight: 400;
    line-height: 23px;
    line-height: 20px;

    color: var(--sc-secondary-text-color);
}
.term
{
    font-weight: bold;
}
.rightview
{
    color: var(--sc-secondary-text-color);
}
.wrongview
{
    color: var(--sc-secondary-text-color);
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
    color: var(--sc-secondary-text-color);
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
    color: var(--sc-secondary-text-color);
}

.highlight .metre
{
    font-size: var(--sc-skolar-font-size-xxs);

    position: absolute;

    display: inline-block;

    margin-top: -11px;

    letter-spacing: .2em;

    color: var(--sc-primary-accent-color);
}

`