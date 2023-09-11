import { css } from 'lit';

export const SCSiteLayoutStyles = css`

  sc-site-layout
{
    display: flex;
    flex-direction: column;

    min-height: 100%;

    --md-ripple-hover-color: var(--sc-secondary-background-color);
    --md-ripple-pressed-color: var(--md-sys-color-primary);
}

/* apply font size here to avoid resizing title when returning to Home */
#title
{
    font-size: var(--sc-font-size-xxxxl);
}

.homeTitle
{
    display: flex;
    overflow: hidden;
    flex-direction: column;

    box-sizing: border-box;
    height: 180px;
    margin: auto;

    white-space: nowrap;
    text-overflow: ellipsis;

    justify-content: center;
}

#mainTitle
{
    display: flex;

    justify-content: center;
    align-items: flex-end;
}

.homeTitle #mainTitle
{
    font-family: var(--sc-serif-font);
    line-height: 1;

    height: 60px;

    letter-spacing: var(--sc-caps-letter-spacing);

    font-variant-caps: small-caps;
}

#subTitle
{
    font-size: var(--sc-font-size-l);
    font-style: italic;

    transition: opacity .5s ease-in;

    opacity: 1;
}

#universal_toolbar
{
    position: sticky;
    z-index: 100;
    top: 0;

    color: var(--sc-inverted-text-color);
    background-color: var(--sc-primary-color);
    box-shadow: none;
}

#context_toolbar
{
    display: flex;

    height: 60px;
    padding: 0 8px 0 16px;

    justify-content: space-between;
}

.generalTitle
{
    display: flex;
    overflow: hidden;

    height: 60px;

    white-space: nowrap;
    text-overflow: ellipsis;

    align-items: center;
}

/* make footer stick to the bottom */
#site_footer
{
    margin-top: auto;
}

/* apply font size here to avoid resizing title when returning to Home */
.generalTitle span
{
    font-size: var(--sc-font-size-l);
    font-weight: 600;
    font-stretch: condensed;
}

@media print
{
    #universal_toolbar,
    #title,
    #site_footer
    {
        display: none;
    }
}

.sc_logo
{
    width: 1.25em;
    height: 1.25em;
}

@media only screen and (max-width: 600px)
{
    #context_toolbar.contextToolbarExpand
    {
        flex-direction: column;

        height: 112px !important;

        justify-content: center;
    }
}

.skip-to-content-link
{
    position: absolute;
    left: 50%;

    height: 30px;
    padding: 8px;

    transition: transform .3s;
    transform: translateY(-100%);

    background: #e77e23;
}

.skip-to-content-link:focus
{
    transform: translateY(0%);
}

.hidden
{
    display: none !important;
}

md-filled-button 
{
    --md-sys-color-primary: var(--sc-primary-accent-color);
    --md-sys-color-on-primary: white;
}

  
`;
