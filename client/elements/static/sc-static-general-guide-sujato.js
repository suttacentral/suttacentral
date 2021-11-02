import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

import { layoutSimpleStyles } from '../styles/sc-layout-simple-styles';
import { typographyCommonStyles } from '../styles/sc-typography-common-styles';
import { typographyStaticStyles } from '../styles/sc-typography-static-styles';
import { SCStaticPage } from '../addons/sc-static-page';

class SCStaticGeneralGuideSujato extends SCStaticPage {
  render() {
    return html`
      <style>
        ${layoutSimpleStyles}
        ${typographyCommonStyles}
        ${typographyStaticStyles}
      </style>
      <main>
        <article>
          <h1>${this.localize('general-guide-sujato:1')}</h1>
          <p class="byline">${this.localize('general-guide-sujato:2')}</p>
          <nav class="contents">
            <ol>
              <li>${unsafeHTML(this.localize('general-guide-sujato:3'))}</li>
              <li>${unsafeHTML(this.localize('general-guide-sujato:4'))}</li>
              <li>${unsafeHTML(this.localize('general-guide-sujato:5'))}</li>
              <li>${unsafeHTML(this.localize('general-guide-sujato:6'))}</li>
              <li>${unsafeHTML(this.localize('general-guide-sujato:7'))}</li>
              <li>${unsafeHTML(this.localize('general-guide-sujato:8'))}</li>
              <li>${unsafeHTML(this.localize('general-guide-sujato:9'))}</li>
              <li>${unsafeHTML(this.localize('general-guide-sujato:10'))}</li>
              <li>${unsafeHTML(this.localize('general-guide-sujato:11'))}</li>
              <li>${unsafeHTML(this.localize('general-guide-sujato:12'))}</li>
              <li>${unsafeHTML(this.localize('general-guide-sujato:13'))}</li>
              <li>${unsafeHTML(this.localize('general-guide-sujato:14'))}</li>
            </ol>
          </nav>
          <p>${unsafeHTML(this.localize('general-guide-sujato:15'))}</p>
          <p>${this.localize('general-guide-sujato:16')}</p>
          <p>${this.localize('general-guide-sujato:17')}</p>
          <p>${unsafeHTML(this.localize('general-guide-sujato:18'))}</p>
          <ul>
            <li>${this.localize('general-guide-sujato:19')}</li>
            <li>
              ${this.localize('general-guide-sujato:20')}
              <ul>
                <li>${unsafeHTML(this.localize('general-guide-sujato:21'))}</li>
                <li>${unsafeHTML(this.localize('general-guide-sujato:22'))}</li>
                <li>${unsafeHTML(this.localize('general-guide-sujato:23'))}</li>
                <li>${unsafeHTML(this.localize('general-guide-sujato:24'))}</li>
                <li>${this.localize('general-guide-sujato:25')}</li>
              </ul>
            </li>
            <li>${this.localize('general-guide-sujato:26')}</li>
          </ul>
          <p>${this.localize('general-guide-sujato:27')}</p>
          <p>${this.localize('general-guide-sujato:28')}</p>
          <p>${this.localize('general-guide-sujato:29')}</p>
          <ul>
            <li>${this.localize('general-guide-sujato:30')}</li>
            <li>${this.localize('general-guide-sujato:31')}</li>
            <li>${unsafeHTML(this.localize('general-guide-sujato:32'))}</li>
            <li>${this.localize('general-guide-sujato:33')}</li>
          </ul>
          <p>${this.localize('general-guide-sujato:34')}</p>
          <p>${unsafeHTML(this.localize('general-guide-sujato:35'))}</p>
          <p>${unsafeHTML(this.localize('general-guide-sujato:36'))}</p>
          <h2 id="item1">${this.localize('general-guide-sujato:37')}</h2>
          <p>${unsafeHTML(this.localize('general-guide-sujato:38'))}</p>
          <p>${unsafeHTML(this.localize('general-guide-sujato:39'))}</p>
          <p>${this.localize('general-guide-sujato:40')}</p>
          <p>${this.localize('general-guide-sujato:41')}</p>
          <h2 id="item2">${this.localize('general-guide-sujato:42')}</h2>
          <p>${unsafeHTML(this.localize('general-guide-sujato:43'))}</p>
          <p>${this.localize('general-guide-sujato:44')}</p>
          <p>${this.localize('general-guide-sujato:45')}</p>
          <p>${this.localize('general-guide-sujato:46')}</p>
          <p>${this.localize('general-guide-sujato:47')}</p>
          <p>${this.localize('general-guide-sujato:48')}</p>
          <p>${this.localize('general-guide-sujato:49')}</p>
          <p>${this.localize('general-guide-sujato:50')}</p>
          <p>${this.localize('general-guide-sujato:51')}</p>
          <p>${this.localize('general-guide-sujato:52')}</p>
          <p>${unsafeHTML(this.localize('general-guide-sujato:53'))}</p>
          <h2 id="item3">${this.localize('general-guide-sujato:54')}</h2>
          <p>${unsafeHTML(this.localize('general-guide-sujato:55'))}</p>
          <p>${this.localize('general-guide-sujato:56')}</p>
          <p>${this.localize('general-guide-sujato:57')}</p>
          <p>${this.localize('general-guide-sujato:58')}</p>
          <p>${this.localize('general-guide-sujato:59')}</p>
          <h2 id="item4">${this.localize('general-guide-sujato:60')}</h2>
          <p>${this.localize('general-guide-sujato:61')}</p>
          <p>${unsafeHTML(this.localize('general-guide-sujato:62'))}</p>
          <ul>
            <li>${this.localize('general-guide-sujato:63')}</li>
            <li>${unsafeHTML(this.localize('general-guide-sujato:64'))}</li>
            <li>${unsafeHTML(this.localize('general-guide-sujato:65'))}</li>
          </ul>
          <p>${this.localize('general-guide-sujato:66')}</p>
          <ul>
            <li>${this.localize('general-guide-sujato:67')}</li>
            <li>${this.localize('general-guide-sujato:68')}</li>
            <li>${this.localize('general-guide-sujato:69')}</li>
          </ul>
          <p>${this.localize('general-guide-sujato:70')}</p>
          <p>${this.localize('general-guide-sujato:71')}</p>
          <ul>
            <li>${this.localize('general-guide-sujato:72')}</li>
            <li>${this.localize('general-guide-sujato:73')}</li>
            <li>${this.localize('general-guide-sujato:74')}</li>
            <li>${unsafeHTML(this.localize('general-guide-sujato:75'))}</li>
          </ul>
          <p>${this.localize('general-guide-sujato:76')}</p>
          <p>${unsafeHTML(this.localize('general-guide-sujato:77'))}</p>
          <h2 id="item5">${this.localize('general-guide-sujato:78')}</h2>
          <p>${unsafeHTML(this.localize('general-guide-sujato:79'))}</p>
          <p>${this.localize('general-guide-sujato:80')}</p>
          <p>${this.localize('general-guide-sujato:81')}</p>
          <p>${this.localize('general-guide-sujato:82')}</p>
          <h3>${this.localize('general-guide-sujato:83')}</h3>
          <p>${this.localize('general-guide-sujato:84')}</p>
          <p>${this.localize('general-guide-sujato:85')}</p>
          <p>${this.localize('general-guide-sujato:86')}</p>
          <p>${this.localize('general-guide-sujato:87')}</p>
          <p>${unsafeHTML(this.localize('general-guide-sujato:88'))}</p>
          <h3>${this.localize('general-guide-sujato:89')}</h3>
          <p>${unsafeHTML(this.localize('general-guide-sujato:90'))}</p>
          <p>${unsafeHTML(this.localize('general-guide-sujato:91'))}</p>
          <p>${unsafeHTML(this.localize('general-guide-sujato:92'))}</p>
          <p>${this.localize('general-guide-sujato:93')}</p>
          <p>${this.localize('general-guide-sujato:94')}</p>
          <h3>${this.localize('general-guide-sujato:95')}</h3>
          <p>${unsafeHTML(this.localize('general-guide-sujato:96'))}</p>
          <p>${this.localize('general-guide-sujato:97')}</p>
          <p>${unsafeHTML(this.localize('general-guide-sujato:98'))}</p>
          <blockquote>
            <p>${this.localize('general-guide-sujato:99')}</p>
          </blockquote>
          <p>${this.localize('general-guide-sujato:100')}</p>
          <h3>${this.localize('general-guide-sujato:101')}</h3>
          <p>${this.localize('general-guide-sujato:102')}</p>
          <p>${unsafeHTML(this.localize('general-guide-sujato:103'))}</p>
          <h3>${this.localize('general-guide-sujato:104')}</h3>
          <h4>${this.localize('general-guide-sujato:105')}</h4>
          <p>${unsafeHTML(this.localize('general-guide-sujato:106'))}</p>
          <p>${unsafeHTML(this.localize('general-guide-sujato:107'))}</p>
          <p>${unsafeHTML(this.localize('general-guide-sujato:108'))}</p>
          <p>${unsafeHTML(this.localize('general-guide-sujato:109'))}</p>
          <p>${unsafeHTML(this.localize('general-guide-sujato:110'))}</p>
          <h4>${this.localize('general-guide-sujato:111')}</h4>
          <p>${unsafeHTML(this.localize('general-guide-sujato:112'))}</p>
          <h4>${this.localize('general-guide-sujato:113')}</h4>
          <p>${unsafeHTML(this.localize('general-guide-sujato:114'))}</p>
          <h4>${this.localize('general-guide-sujato:115')}</h4>
          <p>${unsafeHTML(this.localize('general-guide-sujato:116'))}</p>
          <h4>${this.localize('general-guide-sujato:117')}</h4>
          <p>${unsafeHTML(this.localize('general-guide-sujato:118'))}</p>
          <p>${unsafeHTML(this.localize('general-guide-sujato:119'))}</p>
          <p>${unsafeHTML(this.localize('general-guide-sujato:120'))}</p>
          <h2 id="item6">${this.localize('general-guide-sujato:121')}</h2>
          <p>${this.localize('general-guide-sujato:122')}</p>
          <p>${this.localize('general-guide-sujato:123')}</p>
          <p>${this.localize('general-guide-sujato:124')}</p>
          <p>${unsafeHTML(this.localize('general-guide-sujato:125'))}</p>
          <p>${this.localize('general-guide-sujato:126')}</p>
          <h2 id="item7">${this.localize('general-guide-sujato:127')}</h2>
          <p>${this.localize('general-guide-sujato:128')}</p>
          <p>${this.localize('general-guide-sujato:129')}</p>
          <p>${this.localize('general-guide-sujato:130')}</p>
          <p>${this.localize('general-guide-sujato:131')}</p>
          <p>${this.localize('general-guide-sujato:132')}</p>
          <p>${this.localize('general-guide-sujato:133')}</p>
          <h2 id="item8">${this.localize('general-guide-sujato:134')}</h2>
          <p>${this.localize('general-guide-sujato:135')}</p>
          <p>${this.localize('general-guide-sujato:136')}</p>
          <p>${this.localize('general-guide-sujato:137')}</p>
          <p>${this.localize('general-guide-sujato:138')}</p>
          <p>${this.localize('general-guide-sujato:139')}</p>
          <p>${this.localize('general-guide-sujato:140')}</p>
          <dl>
            <dt>${unsafeHTML(this.localize('general-guide-sujato:141'))}</dt>
            <dd>${unsafeHTML(this.localize('general-guide-sujato:142'))}</dd>
            <dt>${unsafeHTML(this.localize('general-guide-sujato:143'))}</dt>
            <dd>${this.localize('general-guide-sujato:144')}</dd>
            <dt>${unsafeHTML(this.localize('general-guide-sujato:145'))}</dt>
            <dd>${this.localize('general-guide-sujato:146')}</dd>
            <dt>${unsafeHTML(this.localize('general-guide-sujato:147'))}</dt>
            <dd>${this.localize('general-guide-sujato:148')}</dd>
          </dl>
          <p>${unsafeHTML(this.localize('general-guide-sujato:149'))}</p>
          <h2 id="item9">${this.localize('general-guide-sujato:150')}</h2>
          <p>${this.localize('general-guide-sujato:151')}</p>
          <p>${unsafeHTML(this.localize('general-guide-sujato:152'))}</p>
          <p>${unsafeHTML(this.localize('general-guide-sujato:153'))}</p>
          <p>${unsafeHTML(this.localize('general-guide-sujato:154'))}</p>
          <p>${this.localize('general-guide-sujato:155')}</p>
          <p>${unsafeHTML(this.localize('general-guide-sujato:156'))}</p>
          <blockquote>
            <p>${this.localize('general-guide-sujato:157')}</p>
          </blockquote>
          <p>${this.localize('general-guide-sujato:158')}</p>
          <blockquote>
            <p>${this.localize('general-guide-sujato:159')}</p>
          </blockquote>
          <p>${this.localize('general-guide-sujato:160')}</p>
          <p>${this.localize('general-guide-sujato:161')}</p>
          <p>${this.localize('general-guide-sujato:162')}</p>
          <p>${this.localize('general-guide-sujato:163')}</p>
          <h3>${this.localize('general-guide-sujato:164')}</h3>
          <p>${this.localize('general-guide-sujato:165')}</p>
          <p>${this.localize('general-guide-sujato:166')}</p>
          <p>${unsafeHTML(this.localize('general-guide-sujato:167'))}</p>
          <h3>${this.localize('general-guide-sujato:168')}</h3>
          <p>${this.localize('general-guide-sujato:169')}</p>
          <p>${this.localize('general-guide-sujato:170')}</p>
          <p>${this.localize('general-guide-sujato:171')}</p>
          <p>${this.localize('general-guide-sujato:172')}</p>
          <p>${this.localize('general-guide-sujato:173')}</p>
          <p>${unsafeHTML(this.localize('general-guide-sujato:174'))}</p>
          <p>${unsafeHTML(this.localize('general-guide-sujato:175'))}</p>
          <h3>${this.localize('general-guide-sujato:176')}</h3>
          <p>${unsafeHTML(this.localize('general-guide-sujato:177'))}</p>
          <p>${unsafeHTML(this.localize('general-guide-sujato:178'))}</p>
          <p>${unsafeHTML(this.localize('general-guide-sujato:179'))}</p>
          <p>${this.localize('general-guide-sujato:180')}</p>
          <h2 id="item10">${this.localize('general-guide-sujato:181')}</h2>
          <p>${this.localize('general-guide-sujato:182')}</p>
          <p>${this.localize('general-guide-sujato:183')}</p>
          <p>${this.localize('general-guide-sujato:184')}</p>
          <ul>
            <li>${this.localize('general-guide-sujato:185')}</li>
            <li>${this.localize('general-guide-sujato:186')}</li>
            <li>${this.localize('general-guide-sujato:187')}</li>
          </ul>
          <p>${this.localize('general-guide-sujato:188')}</p>
          <ol>
            <li>${unsafeHTML(this.localize('general-guide-sujato:189'))}</li>
            <li>${unsafeHTML(this.localize('general-guide-sujato:190'))}</li>
            <li>${this.localize('general-guide-sujato:191')}</li>
          </ol>
          <p>${this.localize('general-guide-sujato:192')}</p>
          <p>${unsafeHTML(this.localize('general-guide-sujato:193'))}</p>
          <p>${unsafeHTML(this.localize('general-guide-sujato:194'))}</p>
          <p>${unsafeHTML(this.localize('general-guide-sujato:195'))}</p>
          <p>${this.localize('general-guide-sujato:196')}</p>
          <p>${unsafeHTML(this.localize('general-guide-sujato:197'))}</p>
          <p>${this.localize('general-guide-sujato:198')}</p>
          <p>${this.localize('general-guide-sujato:199')}</p>
          <p>${this.localize('general-guide-sujato:200')}</p>
          <p>${this.localize('general-guide-sujato:201')}</p>
          <p>${this.localize('general-guide-sujato:202')}</p>
          <dl>
            <dt>${this.localize('general-guide-sujato:203')}</dt>
            <dd>${unsafeHTML(this.localize('general-guide-sujato:204'))}</dd>
            <dt>${this.localize('general-guide-sujato:205')}</dt>
            <dd>${this.localize('general-guide-sujato:206')}</dd>
            <dt>${this.localize('general-guide-sujato:207')}</dt>
            <dd>${this.localize('general-guide-sujato:208')}</dd>
            <dt>${this.localize('general-guide-sujato:209')}</dt>
            <dd>${unsafeHTML(this.localize('general-guide-sujato:210'))}</dd>
          </dl>
          <p>${this.localize('general-guide-sujato:211')}</p>
          <p>${this.localize('general-guide-sujato:212')}</p>
          <p>${unsafeHTML(this.localize('general-guide-sujato:213'))}</p>
          <h2 id="item11">${this.localize('general-guide-sujato:214')}</h2>
          <p>${unsafeHTML(this.localize('general-guide-sujato:215'))}</p>
          <p>${this.localize('general-guide-sujato:216')}</p>
          <p>${this.localize('general-guide-sujato:217')}</p>
          <p>${this.localize('general-guide-sujato:218')}</p>
          <p>${this.localize('general-guide-sujato:219')}</p>
          <p>${this.localize('general-guide-sujato:220')}</p>
          <p>${this.localize('general-guide-sujato:221')}</p>
          <p>${this.localize('general-guide-sujato:222')}</p>
          <p>${this.localize('general-guide-sujato:223')}</p>
          <h2 id="item12">${this.localize('general-guide-sujato:224')}</h2>
          <p>${unsafeHTML(this.localize('general-guide-sujato:225'))}</p>
          <p>${this.localize('general-guide-sujato:226')}</p>
          <p>${this.localize('general-guide-sujato:227')}</p>
          <p>${this.localize('general-guide-sujato:228')}</p>
          <p>${this.localize('general-guide-sujato:229')}</p>
          <p>${unsafeHTML(this.localize('general-guide-sujato:230'))}</p>
          <p>${this.localize('general-guide-sujato:231')}</p>
          <p>${this.localize('general-guide-sujato:232')}</p>
        </article>
      </main>
    `;
  }

  constructor() {
    super();
    this.localizedStringsPath = '/localization/elements/build/general-guide-sujato';
  }
}

customElements.define('sc-static-general-guide-sujato', SCStaticGeneralGuideSujato);
