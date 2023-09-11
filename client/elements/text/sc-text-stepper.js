import { LitElement, html, css } from 'lit';
import { icon } from '../../img/sc-icon';

export class SCTextStepper extends LitElement {
  static properties = {
    next: { type: Object },
    previous: { type: Object },
    lang: { type: String },
  };

  static styles = css`
    @media print
{
    :host
    {
        display: none;
    }
}

.bar
{
    display: flex;
    overflow: hidden;

    height: 6rem;
    margin: 0 2%;
    padding: 0;

    border-radius: 48px;

    gap: 4%;
    justify-content: space-around;
}

.button-container
{
    position: relative;

    width: 50%;
    height: 100%;
    margin: 0;
}

a
{
    text-decoration: none
}

.button
{
    display: flex;

    width: 100%;
    height: 100%;

    border-radius: 48px;
    background-color: var(--sc-tertiary-background-color);
}

.button:hover
{
    transition: var(--sc-link-transition);
    text-decoration: none;

    background-color: var(--sc-primary-color-light-transparent);
}

button:active
{
    background-color: var(--sc-primary-color-light);
}

.button-right
{
    justify-content: flex-end;
}

.action
{
    font-family: var(--sc-sans-font);
    font-size: var(--sc-font-size-md);

    opacity: .55;
    color: var(--sc-on-tertiary-secondary-text-color);
}

.text-title
{
    font-family: var(--sc-sans-font);
    font-size: var(--sc-font-size-l);

    overflow: hidden;

    white-space: nowrap;
    text-overflow: ellipsis;

    color: var(--sc-on-tertiary-primary-text-color);
}

.link .text-title
{
    box-sizing: border-box;

    transition: var(--sc-link-transition);
}

.text
{
    display: flex;

    margin: auto 0;
}

.text-element
{
    display: inline-grid;

    text-overflow: ellipsis;
}

.text-element-right
{
    text-align: end;
}

.icon
{
    font-size: var(--sc-font-size-l);

    width: var(--sc-size-md-larger);
    min-width: var(--sc-size-md-larger);
    margin-top: 1em;
    margin-right: .5em;
    margin-left: .5em;

    fill: var(--sc-icon-color);
}

@media (min-width: 1280px)
{
    .arrow_right
    {
        margin-left: 1em;
    }

    .arrow_left
    {
        margin-right: 1em;
    }
}

  `;

  render() {
    return html`
      <div class="bar">
        <div class="button-container">
          ${this.previous?.uid
            ? html`
                <a href=${this._getUrl(this.previous)}>
                  <div class="button button-left">
                    <div class="text">
                      ${icon.arrow_left}
                      <div class="text-element">
                        <span class="action">Previous</span>
                        <span class="text-title">${this.previous.name}</span>
                      </div>
                    </div>
                    <md-ripple></md-ripple>
                  </div>
                </a>
              `
            : ''}
          
        </div>

        <div class="button-container">
          ${this.next?.uid
            ? html`
                <a href=${this._getUrl(this.next)}>
                  <div class="button button-right">
                    <div class="text">
                      <div class="text-element text-element-right">
                        <span class="action">Next</span>
                        <span class="text-title">${this.next.name}</span>
                      </div>
                      ${icon.arrow_right}
                    </div>
                    <md-ripple></md-ripple>
                  </div>
                </a>
              `
            : ''}
        </div>
      </div>
    `;
  }

  _getUrl(object) {
    const { author_uid: author, uid, lang } = object;
    return `/${uid}/${lang}/${author}`;
  }
}

customElements.define('sc-text-stepper', SCTextStepper);
