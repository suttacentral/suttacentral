import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

import { layoutSimpleStyles } from '../styles/sc-layout-simple-styles';
import { typographyCommonStyles } from '../styles/sc-typography-common-styles';
import { typographyStaticStyles } from '../styles/sc-typography-static-styles';
import { SCStaticPage } from '../addons/sc-static-page';

class SCStaticANIntroductionBodhi extends SCStaticPage {
  render() {
    return html`
      <style>
        ${layoutSimpleStyles}
        ${typographyCommonStyles}
        ${typographyStaticStyles}
      </style>
      <main>
        <article>
          <h1>${this.localize('an-introduction-bodhi:1')}</h1>
          <p class="byline">${this.localize('an-introduction-bodhi:2')}</p>
          <nav class="contents">
            <ol>
              <li>${unsafeHTML(this.localize('an-introduction-bodhi:3'))}</li>
              <li>${unsafeHTML(this.localize('an-introduction-bodhi:4'))}</li>
              <li>${unsafeHTML(this.localize('an-introduction-bodhi:5'))}</li>
              <li>${unsafeHTML(this.localize('an-introduction-bodhi:6'))}</li>
              <li>${unsafeHTML(this.localize('an-introduction-bodhi:7'))}</li>
              <li>${unsafeHTML(this.localize('an-introduction-bodhi:8'))}</li>
              <li>${unsafeHTML(this.localize('an-introduction-bodhi:9'))}</li>
              <li>${unsafeHTML(this.localize('an-introduction-bodhi:10'))}</li>
              <li>${unsafeHTML(this.localize('an-introduction-bodhi:11'))}</li>
              <li>${unsafeHTML(this.localize('an-introduction-bodhi:12'))}</li>
              <li>${unsafeHTML(this.localize('an-introduction-bodhi:13'))}</li>
              <li>${unsafeHTML(this.localize('an-introduction-bodhi:14'))}</li>
              <li>${unsafeHTML(this.localize('an-introduction-bodhi:15'))}</li>
            </ol>
          </nav>
          <p>${unsafeHTML(this.localize('an-introduction-bodhi:16'))}</p>
          <p>${this.localize('an-introduction-bodhi:17')}</p>
          <p>${this.localize('an-introduction-bodhi:18')}</p>
          <p>${this.localize('an-introduction-bodhi:19')}</p>
          <p>${unsafeHTML(this.localize('an-introduction-bodhi:20'))}</p>
          <p>${unsafeHTML(this.localize('an-introduction-bodhi:21'))}</p>
          <p>${this.localize('an-introduction-bodhi:22')}</p>
          <h2 id="item1">${this.localize('an-introduction-bodhi:23')}</h2>
          <p>${this.localize('an-introduction-bodhi:24')}</p>
          <p>${this.localize('an-introduction-bodhi:25')}</p>
          <p>${this.localize('an-introduction-bodhi:26')}</p>
          <p>${unsafeHTML(this.localize('an-introduction-bodhi:27'))}</p>
          <p>${unsafeHTML(this.localize('an-introduction-bodhi:28'))}</p>
          <p>${unsafeHTML(this.localize('an-introduction-bodhi:29'))}</p>
          <p>${unsafeHTML(this.localize('an-introduction-bodhi:30'))}</p>
          <h2 id="item2">${this.localize('an-introduction-bodhi:31')}</h2>
          <p>${unsafeHTML(this.localize('an-introduction-bodhi:32'))}</p>
          <p>${unsafeHTML(this.localize('an-introduction-bodhi:33'))}</p>
          <p>${unsafeHTML(this.localize('an-introduction-bodhi:34'))}</p>
          <p>${unsafeHTML(this.localize('an-introduction-bodhi:35'))}</p>
          <p>${unsafeHTML(this.localize('an-introduction-bodhi:36'))}</p>
          <p>${unsafeHTML(this.localize('an-introduction-bodhi:37'))}</p>
          <h2 id="item3">${this.localize('an-introduction-bodhi:38')}</h2>
          <p>${unsafeHTML(this.localize('an-introduction-bodhi:39'))}</p>
          <p>${this.localize('an-introduction-bodhi:40')}</p>
          <p>${unsafeHTML(this.localize('an-introduction-bodhi:41'))}</p>
          <p>${unsafeHTML(this.localize('an-introduction-bodhi:42'))}</p>
          <p>${unsafeHTML(this.localize('an-introduction-bodhi:43'))}</p>
          <p>${unsafeHTML(this.localize('an-introduction-bodhi:44'))}</p>
          <p>${unsafeHTML(this.localize('an-introduction-bodhi:45'))}</p>
          <p>${unsafeHTML(this.localize('an-introduction-bodhi:46'))}</p>
          <p>${unsafeHTML(this.localize('an-introduction-bodhi:47'))}</p>
          <h2 id="item4">${this.localize('an-introduction-bodhi:48')}</h2>
          <p>${unsafeHTML(this.localize('an-introduction-bodhi:49'))}</p>
          <table>
            <caption>
              ${this.localize('an-introduction-bodhi:50')}
            </caption>
            <tbody>
              <tr>
                <th></th>
                <th>${this.localize('an-introduction-bodhi:51')}</th>
                <th>${this.localize('an-introduction-bodhi:52')}</th>
                <th>${this.localize('an-introduction-bodhi:53')}</th>
                <th>${this.localize('an-introduction-bodhi:54')}</th>
                <th>${this.localize('an-introduction-bodhi:55')}</th>
              </tr>
              <tr>
                <td>${this.localize('an-introduction-bodhi:56')}</td>
                <td>${this.localize('an-introduction-bodhi:57')}</td>
                <td>${this.localize('an-introduction-bodhi:58')}</td>
                <td>${this.localize('an-introduction-bodhi:59')}</td>
                <td>${this.localize('an-introduction-bodhi:60')}</td>
                <td>${this.localize('an-introduction-bodhi:61')}</td>
              </tr>
              <tr>
                <td>${this.localize('an-introduction-bodhi:62')}</td>
                <td>${this.localize('an-introduction-bodhi:63')}</td>
                <td>${this.localize('an-introduction-bodhi:64')}</td>
                <td>${this.localize('an-introduction-bodhi:65')}</td>
                <td>${this.localize('an-introduction-bodhi:66')}</td>
                <td>${this.localize('an-introduction-bodhi:67')}</td>
              </tr>
              <tr>
                <td>${this.localize('an-introduction-bodhi:68')}</td>
                <td>${this.localize('an-introduction-bodhi:69')}</td>
                <td>${this.localize('an-introduction-bodhi:70')}</td>
                <td>${this.localize('an-introduction-bodhi:71')}</td>
                <td>${this.localize('an-introduction-bodhi:72')}</td>
                <td>${this.localize('an-introduction-bodhi:73')}</td>
              </tr>
              <tr>
                <td>${this.localize('an-introduction-bodhi:74')}</td>
                <td>${this.localize('an-introduction-bodhi:75')}</td>
                <td>${this.localize('an-introduction-bodhi:76')}</td>
                <td>${this.localize('an-introduction-bodhi:77')}</td>
                <td>${this.localize('an-introduction-bodhi:78')}</td>
                <td>${this.localize('an-introduction-bodhi:79')}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td>${this.localize('an-introduction-bodhi:80')}</td>
              </tr>
            </tfoot>
          </table>
          <p>${unsafeHTML(this.localize('an-introduction-bodhi:81'))}</p>
          <p>${unsafeHTML(this.localize('an-introduction-bodhi:82'))}</p>
          <h2 id="item5">${this.localize('an-introduction-bodhi:83')}</h2>
          <p>${this.localize('an-introduction-bodhi:84')}</p>
          <p>${unsafeHTML(this.localize('an-introduction-bodhi:85'))}</p>
          <p>${unsafeHTML(this.localize('an-introduction-bodhi:86'))}</p>
          <p>${unsafeHTML(this.localize('an-introduction-bodhi:87'))}</p>
          <p>${unsafeHTML(this.localize('an-introduction-bodhi:88'))}</p>
          <p>${unsafeHTML(this.localize('an-introduction-bodhi:89'))}</p>
          <p>${this.localize('an-introduction-bodhi:90')}</p>
          <table>
            <caption>
              ${this.localize('an-introduction-bodhi:91')}
            </caption>
            <tbody>
              <tr>
                <th>${this.localize('an-introduction-bodhi:92')}</th>
                <th>${this.localize('an-introduction-bodhi:93')}</th>
                <th>${this.localize('an-introduction-bodhi:94')}</th>
                <th>${this.localize('an-introduction-bodhi:95')}</th>
                <th>${this.localize('an-introduction-bodhi:96')}</th>
                <th>${this.localize('an-introduction-bodhi:97')}</th>
                <th>${this.localize('an-introduction-bodhi:98')}</th>
              </tr>
              <tr>
                <td>${this.localize('an-introduction-bodhi:99')}</td>
                <td>${this.localize('an-introduction-bodhi:100')}</td>
                <td>${this.localize('an-introduction-bodhi:101')}</td>
                <td>${this.localize('an-introduction-bodhi:102')}</td>
                <td>${this.localize('an-introduction-bodhi:103')}</td>
                <td>${this.localize('an-introduction-bodhi:104')}</td>
                <td>${this.localize('an-introduction-bodhi:105')}</td>
              </tr>
              <tr>
                <td>${this.localize('an-introduction-bodhi:106')}</td>
                <td>${this.localize('an-introduction-bodhi:107')}</td>
                <td>${this.localize('an-introduction-bodhi:108')}</td>
                <td>${this.localize('an-introduction-bodhi:109')}</td>
                <td>${this.localize('an-introduction-bodhi:110')}</td>
                <td>${this.localize('an-introduction-bodhi:111')}</td>
                <td>${this.localize('an-introduction-bodhi:112')}</td>
              </tr>
              <tr>
                <td>${this.localize('an-introduction-bodhi:113')}</td>
                <td>${this.localize('an-introduction-bodhi:114')}</td>
                <td>${this.localize('an-introduction-bodhi:115')}</td>
                <td>${this.localize('an-introduction-bodhi:116')}</td>
                <td>${this.localize('an-introduction-bodhi:117')}</td>
                <td>${this.localize('an-introduction-bodhi:118')}</td>
                <td>${this.localize('an-introduction-bodhi:119')}</td>
              </tr>
              <tr>
                <td>${this.localize('an-introduction-bodhi:120')}</td>
                <td>${this.localize('an-introduction-bodhi:121')}</td>
                <td>${this.localize('an-introduction-bodhi:122')}</td>
                <td>${this.localize('an-introduction-bodhi:123')}</td>
                <td>${this.localize('an-introduction-bodhi:124')}</td>
                <td>${this.localize('an-introduction-bodhi:125')}</td>
                <td>${this.localize('an-introduction-bodhi:126')}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td>${this.localize('an-introduction-bodhi:127')}</td>
              </tr>
            </tfoot>
          </table>
          <p>${unsafeHTML(this.localize('an-introduction-bodhi:128'))}</p>
          <h2 id="item6">${this.localize('an-introduction-bodhi:129')}</h2>
          <p>${unsafeHTML(this.localize('an-introduction-bodhi:130'))}</p>
          <p>${unsafeHTML(this.localize('an-introduction-bodhi:131'))}</p>
          <p>${unsafeHTML(this.localize('an-introduction-bodhi:132'))}</p>
          <p>${unsafeHTML(this.localize('an-introduction-bodhi:133'))}</p>
          <h2 id="item7">${this.localize('an-introduction-bodhi:134')}</h2>
          <p>${unsafeHTML(this.localize('an-introduction-bodhi:135'))}</p>
          <p>${this.localize('an-introduction-bodhi:136')}</p>
          <p>${unsafeHTML(this.localize('an-introduction-bodhi:137'))}</p>
          <p>${unsafeHTML(this.localize('an-introduction-bodhi:138'))}</p>
          <p>${unsafeHTML(this.localize('an-introduction-bodhi:139'))}</p>
          <p>${unsafeHTML(this.localize('an-introduction-bodhi:140'))}</p>
          <p>${unsafeHTML(this.localize('an-introduction-bodhi:141'))}</p>
          <p>${unsafeHTML(this.localize('an-introduction-bodhi:142'))}</p>
          <h2 id="item8">${this.localize('an-introduction-bodhi:143')}</h2>
          <p>${unsafeHTML(this.localize('an-introduction-bodhi:144'))}</p>
          <p>${unsafeHTML(this.localize('an-introduction-bodhi:145'))}</p>
          <p>${unsafeHTML(this.localize('an-introduction-bodhi:146'))}</p>
          <p>${unsafeHTML(this.localize('an-introduction-bodhi:147'))}</p>
          <p>${unsafeHTML(this.localize('an-introduction-bodhi:148'))}</p>
          <p>${unsafeHTML(this.localize('an-introduction-bodhi:149'))}</p>
          <h2 id="item9">${this.localize('an-introduction-bodhi:150')}</h2>
          <p>${this.localize('an-introduction-bodhi:151')}</p>
          <p>${unsafeHTML(this.localize('an-introduction-bodhi:152'))}</p>
          <p>${unsafeHTML(this.localize('an-introduction-bodhi:153'))}</p>
          <p>${unsafeHTML(this.localize('an-introduction-bodhi:154'))}</p>
          <p>${unsafeHTML(this.localize('an-introduction-bodhi:155'))}</p>
          <p>${this.localize('an-introduction-bodhi:156')}</p>
          <p>${unsafeHTML(this.localize('an-introduction-bodhi:157'))}</p>
          <h2 id="item10">${this.localize('an-introduction-bodhi:158')}</h2>
          <p>${unsafeHTML(this.localize('an-introduction-bodhi:159'))}</p>
          <p>${unsafeHTML(this.localize('an-introduction-bodhi:160'))}</p>
          <p>${unsafeHTML(this.localize('an-introduction-bodhi:161'))}</p>
          <p>${unsafeHTML(this.localize('an-introduction-bodhi:162'))}</p>
          <p>${unsafeHTML(this.localize('an-introduction-bodhi:163'))}</p>
          <p>${unsafeHTML(this.localize('an-introduction-bodhi:164'))}</p>
          <p>${unsafeHTML(this.localize('an-introduction-bodhi:165'))}</p>
          <p>${unsafeHTML(this.localize('an-introduction-bodhi:166'))}</p>
          <p>${unsafeHTML(this.localize('an-introduction-bodhi:167'))}</p>
          <h2 id="item11">${this.localize('an-introduction-bodhi:168')}</h2>
          <p>${unsafeHTML(this.localize('an-introduction-bodhi:169'))}</p>
          <p>${unsafeHTML(this.localize('an-introduction-bodhi:170'))}</p>
          <p>${unsafeHTML(this.localize('an-introduction-bodhi:171'))}</p>
          <p>${unsafeHTML(this.localize('an-introduction-bodhi:172'))}</p>
          <p>${unsafeHTML(this.localize('an-introduction-bodhi:173'))}</p>
          <p>${unsafeHTML(this.localize('an-introduction-bodhi:174'))}</p>
          <p>${unsafeHTML(this.localize('an-introduction-bodhi:175'))}</p>
          <p>${unsafeHTML(this.localize('an-introduction-bodhi:176'))}</p>
          <p>${unsafeHTML(this.localize('an-introduction-bodhi:177'))}</p>
          <p>${unsafeHTML(this.localize('an-introduction-bodhi:178'))}</p>
          <h2 id="item12">${this.localize('an-introduction-bodhi:179')}</h2>
          <p>${this.localize('an-introduction-bodhi:180')}</p>
          <p>${this.localize('an-introduction-bodhi:181')}</p>
          <p>${unsafeHTML(this.localize('an-introduction-bodhi:182'))}</p>
          <h2 id="item13">${this.localize('an-introduction-bodhi:183')}</h2>
          <p>${unsafeHTML(this.localize('an-introduction-bodhi:184'))}</p>
          <p>${unsafeHTML(this.localize('an-introduction-bodhi:185'))}</p>
          <p>${unsafeHTML(this.localize('an-introduction-bodhi:186'))}</p>
          <p>${unsafeHTML(this.localize('an-introduction-bodhi:187'))}</p>
          <p>${unsafeHTML(this.localize('an-introduction-bodhi:188'))}</p>
          <p>${unsafeHTML(this.localize('an-introduction-bodhi:189'))}</p>
          <p>${unsafeHTML(this.localize('an-introduction-bodhi:190'))}</p>
          <aside class="static-copyright">
            <p>${this.localize('an-introduction-bodhi:191')}</p>
            <blockquote>
              <p>${this.localize('an-introduction-bodhi:192')}</p>
              <p>${this.localize('an-introduction-bodhi:193')}</p>
            </blockquote>
          </aside>
        </article>
      </main>
    `;
  }

  constructor() {
    super();
    this.localizedStringsPath = '/localization/elements/build/an-introduction-bodhi';
  }
}

customElements.define('sc-static-an-introduction-bodhi', SCStaticANIntroductionBodhi);
