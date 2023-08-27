import { LitElement, html, css } from 'lit';
import { icon } from '../../img/sc-icon';

export class SCTextStepper extends LitElement {
  static properties = {
    next: { type: Object },
    previous: { type: Object },
    lang: { type: String },
  };

  static styles = css`
    @media print {
      :host {
        display: none;
      }
    }


.bar {
    display: flex;
    overflow: hidden;
    height: 6rem;
    margin: 0px 2%;
    padding: 0px;
    gap: 4%;
    justify-content: space-around;
    border-radius: 48px;
}
      

        .button-container {
      position: relative;

      width: 50%;
      height: 100%;
      margin: 0;
    }

    .button {
      width: 100%;
      background-color: var(--sc-tertiary-background-color);

      
    }

        .button:hover {
      background-color: var(--sc-primary-color-light-transparent);
      transition: var(--sc-link-transition);
    }


    .button {
      display: flex;

      height: 100%;

      border-radius: 48px
    }

    .button-right {
      justify-content: flex-end;
    }




    .action {
      font-family: var(--sc-sans-font);
      font-size: var(--sc-font-size-md);

      opacity: 0.55;
      color: var(--sc-on-tertiary-secondary-text-color);
    }

    .text-title {
      font-family: var(--sc-sans-font);
      font-size: var(--sc-font-size-l);

      overflow: hidden;

      white-space: nowrap;
      text-overflow: ellipsis;

      color: var(--sc-on-tertiary-primary-text-color);
    }

    .link {
      text-decoration: none;

      color: inherit;
    }

    .link .text-title {

      box-sizing: border-box;

      transition: var(--sc-link-transition);

    }



    .text {
      display: flex;

      margin: auto 0;
    }

    .text-element {
      display: inline-grid;

      text-overflow: ellipsis;
    }

    .text-element-right {
      text-align: end;
    }

    .icon {
      font-size: var(--sc-font-size-l);

      width: var(--sc-size-md-larger);
      min-width: var(--sc-size-md-larger);
      margin-top: 1em;
      margin-right: 0.5em;
      margin-left: 0.5em;

      fill: var(--sc-icon-color);
    }

    @media (min-width: 1280px) {

      .arrow_right {
        margin-left: 1em;
      }

      .arrow_left {
        margin-right: 1em;
      }
    }
  `;

  render() {
    return html`
      <div class="bar">
        <div class="button-container">
          ${this.previous && this.previous.uid
            ? html`
                <a href=${this._getUrl(this.previous)} class="link">
                  <div class="button button-left">
                    <div class="text">
                      ${icon.arrow_left}
                      <div class="text-element">
                        <span class="action">Previous</span>
                        <span class="text-title">${this.previous.name}</span>
                      </div>
                    </div>
                  </div>
                </a>
              `
            : ''}
        </div>

        <div class="button-container">
          ${this.next && this.next.uid
            ? html`
                <a href=${this._getUrl(this.next)} class="link">
                  <div class="button button-right">
                    <div class="text">
                      <div class="text-element text-element-right">
                        <span class="action">Next</span>
                        <span class="text-title">${this.next.name}</span>
                      </div>
                      ${icon.arrow_right}
                    </div>
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
