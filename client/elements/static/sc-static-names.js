import { html } from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';

import { layoutSimpleStyles } from '../styles/sc-layout-simple-styles';
import { typographyCommonStyles } from '../styles/sc-typography-common-styles';
import { typographyStaticStyles } from '../styles/sc-typography-static-styles';
import { SCStaticPage } from '../addons/sc-static-page';

class SCStaticNames extends SCStaticPage {
  render() {
    return html`
      <style>
        ${layoutSimpleStyles}
        ${typographyCommonStyles}
        ${typographyStaticStyles}
      </style>
      <main>
        <article>
          <h1>${this.localize('names:1')}</h1>
          <nav class="contents">
            <ul class="entry-list">
              <li>${unsafeHTML(this.localize('names:2'))}</li>
              <li>${unsafeHTML(this.localize('names:3'))}</li>
              <li>${unsafeHTML(this.localize('names:4'))}</li>
              <li>${unsafeHTML(this.localize('names:5'))}</li>
              <li>${unsafeHTML(this.localize('names:6'))}</li>
              <li>${unsafeHTML(this.localize('names:7'))}</li>
              <li>${unsafeHTML(this.localize('names:8'))}</li>
              <li>${unsafeHTML(this.localize('names:9'))}</li>
              <li>${unsafeHTML(this.localize('names:10'))}</li>
              <li>${unsafeHTML(this.localize('names:11'))}</li>
              <li>${unsafeHTML(this.localize('names:12'))}</li>
              <li>${unsafeHTML(this.localize('names:13'))}</li>
              <li>${unsafeHTML(this.localize('names:14'))}</li>
              <li>${unsafeHTML(this.localize('names:15'))}</li>
              <li>${unsafeHTML(this.localize('names:16'))}</li>
              <li>${unsafeHTML(this.localize('names:17'))}</li>
              <li>${unsafeHTML(this.localize('names:18'))}</li>
              <li>${unsafeHTML(this.localize('names:19'))}</li>
              <li>${unsafeHTML(this.localize('names:20'))}</li>
              <li>${unsafeHTML(this.localize('names:21'))}</li>
              <li>${unsafeHTML(this.localize('names:22'))}</li>
              <li>${unsafeHTML(this.localize('names:23'))}</li>
            </ul>
          </nav>
          <h2 id="a">${this.localize('names:24')}</h2>
          <dl>
            <dt>${this.localize('names:25')}</dt>
            <dd>${unsafeHTML(this.localize('names:26'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:27'))}</dd>
            <dt>${this.localize('names:28')}</dt>
            <dd class="type">${this.localize('names:29')}</dd>
            <dd>${unsafeHTML(this.localize('names:30'))}</dd>
            <dt>${this.localize('names:31')}</dt>
            <dd class="type">${this.localize('names:29')}</dd>
            <dd>${unsafeHTML(this.localize('names:32'))}</dd>
            <dt>${this.localize('names:33')}</dt>
            <dd class="type">${this.localize('names:34')}</dd>
            <dd>${unsafeHTML(this.localize('names:35'))}</dd>
            <dt>${this.localize('names:33')}</dt>
            <dd class="type">${this.localize('names:36')}</dd>
            <dd>${unsafeHTML(this.localize('names:37'))}</dd>
            <dt>${this.localize('names:38')}</dt>
            <dd class="type">${this.localize('names:34')}</dd>
            <dd>${unsafeHTML(this.localize('names:35'))}</dd>
            <dt>${this.localize('names:39')}</dt>
            <dd class="type">${this.localize('names:40')}</dd>
            <dd>${unsafeHTML(this.localize('names:41'))}</dd>
            <dt>${this.localize('names:42')}</dt>
            <dd class="type">${this.localize('names:43')}</dd>
            <dd>${unsafeHTML(this.localize('names:44'))}</dd>
            <dt>${this.localize('names:45')}</dt>
            <dd class="type">${this.localize('names:43')}</dd>
            <dd>${unsafeHTML(this.localize('names:46'))}</dd>
            <dt>${this.localize('names:47')}</dt>
            <dd class="type">${this.localize('names:29')}</dd>
            <dd>${unsafeHTML(this.localize('names:48'))}</dd>
            <dt>${this.localize('names:49')}</dt>
            <dd class="type">${this.localize('names:50')}</dd>
            <dd>${unsafeHTML(this.localize('names:51'))}</dd>
            <dt>${this.localize('names:52')}</dt>
            <dd class="type">${this.localize('names:53')}</dd>
            <dd>${unsafeHTML(this.localize('names:54'))}</dd>
            <dt id="ajatasattu">${this.localize('names:55')}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:56'))}</dd>
            <dd>${unsafeHTML(this.localize('names:57'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:58'))}</dd>
            <dt>${this.localize('names:59')}</dt>
            <dd class="type">${this.localize('names:60')}</dd>
            <dd>${unsafeHTML(this.localize('names:61'))}</dd>
            <dt>${this.localize('names:62')}</dt>
            <dd>${unsafeHTML(this.localize('names:63'))}</dd>
            <dt>${this.localize('names:64')}</dt>
            <dd class="type">${this.localize('names:65')}</dd>
            <dd>${unsafeHTML(this.localize('names:66'))}</dd>
            <dt id="akasa">${this.localize('names:67')}</dt>
            <dd class="type">${this.localize('names:68')}</dd>
            <dd>${unsafeHTML(this.localize('names:69'))}</dd>
            <dt id="akkosaka">${this.localize('names:70')}</dt>
            <dd class="type">${this.localize('names:29')}</dd>
            <dd>${unsafeHTML(this.localize('names:71'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:72'))}</dd>
            <dt>${this.localize('names:73')}</dt>
            <dd class="type">${this.localize('names:74')}</dd>
            <dd>${unsafeHTML(this.localize('names:75'))}</dd>
            <dt>${this.localize('names:76')}</dt>
            <dd class="type">${this.localize('names:77')}</dd>
            <dd>${unsafeHTML(this.localize('names:78'))}</dd>
            <dt>${this.localize('names:79')}</dt>
            <dd class="type">${this.localize('names:80')}</dd>
            <dd>${unsafeHTML(this.localize('names:81'))}</dd>
            <dt>${this.localize('names:82')}</dt>
            <dd class="type">${this.localize('names:83')}</dd>
            <dd>${unsafeHTML(this.localize('names:84'))}</dd>
            <dt>${this.localize('names:85')}</dt>
            <dd class="type">${this.localize('names:83')}</dd>
            <dd>${unsafeHTML(this.localize('names:86'))}</dd>
            <dt>${this.localize('names:87')}</dt>
            <dd class="type">${this.localize('names:83')}</dd>
            <dd>${unsafeHTML(this.localize('names:86'))}</dd>
            <dt>${this.localize('names:88')}</dt>
            <dd class="type">${this.localize('names:89')}</dd>
            <dd>${unsafeHTML(this.localize('names:90'))}</dd>
            <dt>${this.localize('names:91')}</dt>
            <dd class="type">${this.localize('names:74')}</dd>
            <dd>${unsafeHTML(this.localize('names:92'))}</dd>
            <dt>${this.localize('names:93')}</dt>
            <dd class="type">${this.localize('names:94')}</dd>
            <dd>${unsafeHTML(this.localize('names:95'))}</dd>
            <dt>${this.localize('names:96')}</dt>
            <dd class="type">${this.localize('names:34')}</dd>
            <dd>${unsafeHTML(this.localize('names:35'))}</dd>
            <dt id="ananda">${this.localize('names:96')}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:97'))}</dd>
            <dd>${unsafeHTML(this.localize('names:98'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:99'))}</dd>
            <dt>${this.localize('names:100')}</dt>
            <dd class="type">${this.localize('names:34')}</dd>
            <dd>${unsafeHTML(this.localize('names:35'))}</dd>
            <dt id="anathapindika">${this.localize('names:101')}</dt>
            <dd class="type">${this.localize('names:102')}</dd>
            <dd>${unsafeHTML(this.localize('names:103'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:104'))}</dd>
            <dt id="anathapindika-park">${this.localize('names:105')}</dt>
            <dd>${unsafeHTML(this.localize('names:106'))}</dd>
            <dt>${this.localize('names:107')}</dt>
            <dd class="type">${this.localize('names:83')}</dd>
            <dd>${unsafeHTML(this.localize('names:108'))}</dd>
            <dt>${this.localize('names:109')}</dt>
            <dd class="type">${this.localize('names:36')}</dd>
            <dd>${unsafeHTML(this.localize('names:37'))}</dd>
            <dt>${this.localize('names:110')}</dt>
            <dd class="type">${this.localize('names:34')}</dd>
            <dd>${unsafeHTML(this.localize('names:35'))}</dd>
            <dt>${this.localize('names:110')}</dt>
            <dd class="type">${this.localize('names:111')}</dd>
            <dd>${unsafeHTML(this.localize('names:112'))}</dd>
            <dt>${this.localize('names:113')}</dt>
            <dd class="type">${this.localize('names:114')}</dd>
            <dd>${unsafeHTML(this.localize('names:115'))}</dd>
            <dt>${this.localize('names:116')}</dt>
            <dd class="type">${this.localize('names:117')}</dd>
            <dd>${unsafeHTML(this.localize('names:118'))}</dd>
            <dt>${this.localize('names:119')}</dt>
            <dd class="type">${this.localize('names:120')}</dd>
            <dd>${unsafeHTML(this.localize('names:121'))}</dd>
            <dt>${this.localize('names:122')}</dt>
            <dd class="type">${this.localize('names:34')}</dd>
            <dd>${unsafeHTML(this.localize('names:35'))}</dd>
            <dt>${this.localize('names:123')}</dt>
            <dd class="type">${this.localize('names:124')}</dd>
            <dd>${unsafeHTML(this.localize('names:125'))}</dd>
            <dt>${this.localize('names:126')}</dt>
            <dd class="type">${this.localize('names:127')}</dd>
            <dd>${unsafeHTML(this.localize('names:128'))}</dd>
            <dt>${this.localize('names:129')}</dt>
            <dd class="type">${this.localize('names:83')}</dd>
            <dd>${unsafeHTML(this.localize('names:130'))}</dd>
            <dt>${this.localize('names:131')}</dt>
            <dd class="type">${this.localize('names:29')}</dd>
            <dd>${unsafeHTML(this.localize('names:132'))}</dd>
            <dt id="anuruddha">${this.localize('names:133')}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:134'))}</dd>
            <dd>${unsafeHTML(this.localize('names:135'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:136'))}</dd>
            <dt>${this.localize('names:137')}</dt>
            <dd class="type">${this.localize('names:138')}</dd>
            <dd>${unsafeHTML(this.localize('names:121'))}</dd>
            <dt>${this.localize('names:139')}</dt>
            <dd class="type">${this.localize('names:34')}</dd>
            <dd>${unsafeHTML(this.localize('names:35'))}</dd>
            <dt>${this.localize('names:140')}</dt>
            <dd class="type">${this.localize('names:141')}</dd>
            <dd>${unsafeHTML(this.localize('names:142'))}</dd>
            <dt>${this.localize('names:143')}</dt>
            <dd class="type">${this.localize('names:36')}</dd>
            <dd>${unsafeHTML(this.localize('names:37'))}</dd>
            <dt>${this.localize('names:144')}</dt>
            <dd>${unsafeHTML(this.localize('names:145'))}</dd>
            <dt>${this.localize('names:146')}</dt>
            <dd class="type">${this.localize('names:29')}</dd>
            <dd>${unsafeHTML(this.localize('names:147'))}</dd>
            <dt>${this.localize('names:146')}</dt>
            <dd class="type">${this.localize('names:34')}</dd>
            <dd>${unsafeHTML(this.localize('names:35'))}</dd>
            <dt>${this.localize('names:146')}</dt>
            <dd class="type">${this.localize('names:80')}</dd>
            <dd>${unsafeHTML(this.localize('names:92'))}</dd>
            <dt>${this.localize('names:148')}</dt>
            <dd class="type">${this.localize('names:34')}</dd>
            <dd>${unsafeHTML(this.localize('names:35'))}</dd>
            <dt>${this.localize('names:149')}</dt>
            <dd class="type">${this.localize('names:150')}</dd>
            <dd>${unsafeHTML(this.localize('names:37'))}</dd>
            <dt>${this.localize('names:151')}</dt>
            <dd class="type">${this.localize('names:34')}</dd>
            <dd>${unsafeHTML(this.localize('names:35'))}</dd>
            <dt>${this.localize('names:152')}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:153'))}</dd>
            <dd>${unsafeHTML(this.localize('names:154'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:155'))}</dd>
            <dt>${this.localize('names:156')}</dt>
            <dd class="type">${this.localize('names:34')}</dd>
            <dd>${unsafeHTML(this.localize('names:35'))}</dd>
            <dt>${this.localize('names:156')}</dt>
            <dd class="type">${this.localize('names:157')}</dd>
            <dd>${unsafeHTML(this.localize('names:158'))}</dd>
            <dt>${this.localize('names:159')}</dt>
            <dd class="type">${this.localize('names:29')}</dd>
            <dd>${unsafeHTML(this.localize('names:160'))}</dd>
            <dt>${this.localize('names:161')}</dt>
            <dd class="type">${this.localize('names:111')}</dd>
            <dd>${unsafeHTML(this.localize('names:162'))}</dd>
            <dt>${this.localize('names:163')}</dt>
            <dd class="type">${this.localize('names:141')}</dd>
            <dd>${unsafeHTML(this.localize('names:164'))}</dd>
            <dt>${this.localize('names:165')}</dt>
            <dd class="type">${this.localize('names:65')}</dd>
            <dd>${unsafeHTML(this.localize('names:166'))}</dd>
            <dt>${this.localize('names:167')}</dt>
            <dd class="type">${this.localize('names:83')}</dd>
            <dd>${unsafeHTML(this.localize('names:37'))}</dd>
            <dt>${this.localize('names:168')}</dt>
            <dd class="type">${this.localize('names:169')}</dd>
            <dd>${unsafeHTML(this.localize('names:170'))}</dd>
            <dt>${this.localize('names:171')}</dt>
            <dd class="type">${this.localize('names:74')}</dd>
            <dd>${unsafeHTML(this.localize('names:92'))}</dd>
            <dt>${this.localize('names:172')}</dt>
            <dd class="type">${this.localize('names:34')}</dd>
            <dd>${unsafeHTML(this.localize('names:35'))}</dd>
            <dt>${this.localize('names:172')}</dt>
            <dd class="type">${this.localize('names:114')}</dd>
            <dd>${unsafeHTML(this.localize('names:115'))}</dd>
            <dt>${this.localize('names:173')}</dt>
            <dd class="type">${this.localize('names:65')}</dd>
            <dd>${unsafeHTML(this.localize('names:174'))}</dd>
            <dt>${this.localize('names:175')}</dt>
            <dd class="type">${this.localize('names:34')}</dd>
            <dd>${unsafeHTML(this.localize('names:35'))}</dd>
            <dt>${this.localize('names:176')}</dt>
            <dd>${unsafeHTML(this.localize('names:177'))}</dd>
            <dt>${this.localize('names:178')}</dt>
            <dd class="type">${this.localize('names:111')}</dd>
            <dd>${unsafeHTML(this.localize('names:179'))}</dd>
            <dt>${this.localize('names:180')}</dt>
            <dd class="type">${this.localize('names:181')}</dd>
            <dd>${unsafeHTML(this.localize('names:182'))}</dd>
            <dt>${this.localize('names:183')}</dt>
            <dd class="type">${this.localize('names:120')}</dd>
            <dd>${unsafeHTML(this.localize('names:184'))}</dd>
          </dl>
          <h2 id="b">${this.localize('names:185')}</h2>
          <dl>
            <dt>${this.localize('names:186')}</dt>
            <dd class="type">${this.localize('names:187')}</dd>
            <dd>${unsafeHTML(this.localize('names:188'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:189'))}</dd>
            <dt>${this.localize('names:190')}</dt>
            <dd class="type">${this.localize('names:43')}</dd>
            <dd>${unsafeHTML(this.localize('names:46'))}</dd>
            <dt>${this.localize('names:191')}</dt>
            <dd class="type">${this.localize('names:43')}</dd>
            <dd>${unsafeHTML(this.localize('names:46'))}</dd>
            <dt>${this.localize('names:192')}</dt>
            <dd class="type">${this.localize('names:29')}</dd>
            <dd>${unsafeHTML(this.localize('names:193'))}</dd>
            <dt>${this.localize('names:194')}</dt>
            <dd class="type">${this.localize('names:50')}</dd>
            <dd>${unsafeHTML(this.localize('names:86'))}</dd>
            <dt>${this.localize('names:195')}</dt>
            <dd>${unsafeHTML(this.localize('names:196'))}</dd>
            <dt>${this.localize('names:197')}</dt>
            <dd class="type">${this.localize('names:198')}</dd>
            <dd>${unsafeHTML(this.localize('names:37'))}</dd>
            <dt>${this.localize('names:199')}</dt>
            <dd class="type">${this.localize('names:34')}</dd>
            <dd>${unsafeHTML(this.localize('names:35'))}</dd>
            <dt>${this.localize('names:200')}</dt>
            <dd>${unsafeHTML(this.localize('names:201'))}</dd>
            <dt>${this.localize('names:202')}</dt>
            <dd>${unsafeHTML(this.localize('names:203'))}</dd>
            <dt>${this.localize('names:204')}</dt>
            <dd class="type">${this.localize('names:29')}</dd>
            <dd>${unsafeHTML(this.localize('names:205'))}</dd>
            <dt>${this.localize('names:206')}</dt>
            <dd class="type">${this.localize('names:207')}</dd>
            <dd>${unsafeHTML(this.localize('names:86'))}</dd>
            <dt>${this.localize('names:208')}</dt>
            <dd>${unsafeHTML(this.localize('names:86'))}</dd>
            <dt id="bhadda">${this.localize('names:209')}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:210'))}</dd>
            <dd>${unsafeHTML(this.localize('names:211'))}</dd>
            <dt>${this.localize('names:212')}</dt>
            <dd class="type">${this.localize('names:213')}</dd>
            <dd>${unsafeHTML(this.localize('names:214'))}</dd>
            <dt id="bhaddiya">${this.localize('names:215')}</dt>
            <dd class="type">${this.localize('names:29')}</dd>
            <dd>${unsafeHTML(this.localize('names:216'))}</dd>
            <dt>${this.localize('names:217')}</dt>
            <dd class="type">${this.localize('names:29')}</dd>
            <dd>${unsafeHTML(this.localize('names:218'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:219'))}</dd>
            <dt>${this.localize('names:220')}</dt>
            <dd>${unsafeHTML(this.localize('names:221'))}</dd>
            <dt>${this.localize('names:222')}</dt>
            <dd class="type">${this.localize('names:60')}</dd>
            <dd>${unsafeHTML(this.localize('names:223'))}</dd>
            <dt>${this.localize('names:224')}</dt>
            <dd class="type">${this.localize('names:120')}</dd>
            <dd>${unsafeHTML(this.localize('names:225'))}</dd>
            <dt>${this.localize('names:226')}</dt>
            <dd class="type">${this.localize('names:227')}</dd>
            <dd>${unsafeHTML(this.localize('names:228'))}</dd>
            <dt>${this.localize('names:229')}</dt>
            <dd class="type">${this.localize('names:114')}</dd>
            <dd>${unsafeHTML(this.localize('names:115'))}</dd>
            <dt>${this.localize('names:230')}</dt>
            <dd class="type">${this.localize('names:29')}</dd>
            <dd>${unsafeHTML(this.localize('names:231'))}</dd>
            <dt>${this.localize('names:232')}</dt>
            <dd class="type">${this.localize('names:207')}</dd>
            <dd>${unsafeHTML(this.localize('names:233'))}</dd>
            <dt>${this.localize('names:234')}</dt>
            <dd>${unsafeHTML(this.localize('names:235'))}</dd>
            <dt>${this.localize('names:236')}</dt>
            <dd class="type">${this.localize('names:34')}</dd>
            <dd>${unsafeHTML(this.localize('names:35'))}</dd>
            <dt>${this.localize('names:237')}</dt>
            <dd>${unsafeHTML(this.localize('names:238'))}</dd>
            <dt>${this.localize('names:239')}</dt>
            <dd>${unsafeHTML(this.localize('names:240'))}</dd>
            <dt>${this.localize('names:241')}</dt>
            <dd>${unsafeHTML(this.localize('names:242'))}</dd>
            <dt>${this.localize('names:243')}</dt>
            <dd>${unsafeHTML(this.localize('names:244'))}</dd>
            <dt>${this.localize('names:245')}</dt>
            <dd>${unsafeHTML(this.localize('names:246'))}</dd>
            <dt>${this.localize('names:247')}</dt>
            <dd>${unsafeHTML(this.localize('names:248'))}</dd>
            <dt>${this.localize('names:236')}</dt>
            <dd class="type">${this.localize('names:249')}</dd>
            <dd>${unsafeHTML(this.localize('names:115'))}</dd>
            <dt>${this.localize('names:236')}</dt>
            <dd class="type">${this.localize('names:68')}</dd>
            <dd>${unsafeHTML(this.localize('names:250'))}</dd>
            <dt>${this.localize('names:236')}</dt>
            <dd class="type">${this.localize('names:80')}</dd>
            <dd>${unsafeHTML(this.localize('names:92'))}</dd>
            <dt>${this.localize('names:251')}</dt>
            <dd class="type">${this.localize('names:34')}</dd>
            <dd>${unsafeHTML(this.localize('names:35'))}</dd>
            <dt>${this.localize('names:252')}</dt>
            <dd class="type">${this.localize('names:253')}</dd>
            <dd>${unsafeHTML(this.localize('names:254'))}</dd>
            <dt>${this.localize('names:255')}</dt>
            <dd class="type">${this.localize('names:83')}</dd>
            <dd>${unsafeHTML(this.localize('names:86'))}</dd>
            <dt>${this.localize('names:256')}</dt>
            <dd class="type">${this.localize('names:257')}</dd>
            <dd>${unsafeHTML(this.localize('names:258'))}</dd>
            <dt>${this.localize('names:259')}</dt>
            <dd class="type">${this.localize('names:29')}</dd>
            <dd>${unsafeHTML(this.localize('names:260'))}</dd>
            <dt>${this.localize('names:261')}</dt>
            <dd class="type">${this.localize('names:29')}</dd>
            <dd>${unsafeHTML(this.localize('names:262'))}</dd>
            <dt>${unsafeHTML(this.localize('names:263'))}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:264'))}</dd>
            <dd>${unsafeHTML(this.localize('names:265'))}</dd>
            <dt>${this.localize('names:266')}</dt>
            <dd class="type">${this.localize('names:34')}</dd>
            <dd>${unsafeHTML(this.localize('names:35'))}</dd>
            <dt>${this.localize('names:267')}</dt>
            <dd>${unsafeHTML(this.localize('names:268'))}</dd>
            <dt>${this.localize('names:269')}</dt>
            <dd class="type">${this.localize('names:29')}</dd>
            <dd>${unsafeHTML(this.localize('names:270'))}</dd>
            <dt>${this.localize('names:269')}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:271'))}</dd>
            <dd>${unsafeHTML(this.localize('names:272'))}</dd>
            <dt>${this.localize('names:273')}</dt>
            <dd class="type">${this.localize('names:68')}</dd>
            <dd>${unsafeHTML(this.localize('names:86'))}</dd>
          </dl>
          <h2 id="c">${this.localize('names:274')}</h2>
          <dl>
            <dt>${this.localize('names:275')}</dt>
            <dd class="type">${this.localize('names:29')}</dd>
            <dd>${unsafeHTML(this.localize('names:276'))}</dd>
            <dt>${this.localize('names:277')}</dt>
            <dd class="type">${this.localize('names:278')}</dd>
            <dd>${unsafeHTML(this.localize('names:279'))}</dd>
            <dt>${this.localize('names:280')}</dt>
            <dd class="type">${this.localize('names:281')}</dd>
            <dd>${unsafeHTML(this.localize('names:282'))}</dd>
            <dt>${this.localize('names:283')}</dt>
            <dd class="type">${this.localize('names:83')}</dd>
            <dd>${unsafeHTML(this.localize('names:284'))}</dd>
            <dt>${this.localize('names:285')}</dt>
            <dd class="type">${this.localize('names:286')}</dd>
            <dd>${unsafeHTML(this.localize('names:287'))}</dd>
            <dt>${this.localize('names:288')}</dt>
            <dd class="type">${this.localize('names:150')}</dd>
            <dd>${unsafeHTML(this.localize('names:289'))}</dd>
            <dt>${this.localize('names:290')}</dt>
            <dd class="type">${this.localize('names:141')}</dd>
            <dd>${unsafeHTML(this.localize('names:291'))}</dd>
            <dt>${this.localize('names:292')}</dt>
            <dd class="type">${this.localize('names:50')}</dd>
            <dd>${unsafeHTML(this.localize('names:86'))}</dd>
            <dt>${this.localize('names:293')}</dt>
            <dd class="type">${this.localize('names:120')}</dd>
            <dd>${unsafeHTML(this.localize('names:294'))}</dd>
            <dt>${this.localize('names:295')}</dt>
            <dd class="type">${this.localize('names:296')}</dd>
            <dd>${unsafeHTML(this.localize('names:297'))}</dd>
            <dt>${this.localize('names:298')}</dt>
            <dd class="type">${this.localize('names:299')}</dd>
            <dd>${unsafeHTML(this.localize('names:300'))}</dd>
            <dt>${this.localize('names:298')}</dt>
            <dd class="type">${this.localize('names:301')}</dd>
            <dd>${unsafeHTML(this.localize('names:302'))}</dd>
            <dt id="ciravasi">${this.localize('names:303')}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:304'))}</dd>
            <dd>${unsafeHTML(this.localize('names:305'))}</dd>
            <dt>${this.localize('names:306')}</dt>
            <dd class="type">${this.localize('names:307')}</dd>
            <dd>${unsafeHTML(this.localize('names:37'))}</dd>
            <dt>${this.localize('names:308')}</dt>
            <dd>${unsafeHTML(this.localize('names:309'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:310'))}</dd>
            <dt>${this.localize('names:311')}</dt>
            <dd class="type">${this.localize('names:312')}</dd>
            <dd>${unsafeHTML(this.localize('names:313'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:314'))}</dd>
            <dt>${this.localize('names:315')}</dt>
            <dd class="type">${this.localize('names:29')}</dd>
            <dd>${unsafeHTML(this.localize('names:316'))}</dd>
            <dt>${this.localize('names:317')}</dt>
            <dd class="type">${this.localize('names:150')}</dd>
            <dd>${unsafeHTML(this.localize('names:289'))}</dd>
            <dt>${this.localize('names:318')}</dt>
            <dd>${unsafeHTML(this.localize('names:319'))}</dd>
            <dt>${this.localize('names:320')}</dt>
            <dd class="type">${this.localize('names:29')}</dd>
            <dd>${unsafeHTML(this.localize('names:321'))}</dd>
            <dt>${this.localize('names:322')}</dt>
            <dd class="type">${this.localize('names:29')}</dd>
            <dd>${unsafeHTML(this.localize('names:323'))}</dd>
            <dt>${this.localize('names:324')}</dt>
            <dd class="type">${this.localize('names:325')}</dd>
            <dd>${unsafeHTML(this.localize('names:326'))}</dd>
            <dt>${this.localize('names:324')}</dt>
            <dd class="type">${this.localize('names:327')}</dd>
            <dd>${unsafeHTML(this.localize('names:328'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:329'))}</dd>
            <dt>${this.localize('names:330')}</dt>
            <dd>${unsafeHTML(this.localize('names:331'))}</dd>
            <dt>${this.localize('names:332')}</dt>
            <dd class="type">${this.localize('names:29')}</dd>
            <dd>${unsafeHTML(this.localize('names:86'))}</dd>
          </dl>
          <h2 id="d">${this.localize('names:333')}</h2>
          <dl>
            <dt>${this.localize('names:334')}</dt>
            <dd class="type">${this.localize('names:29')}</dd>
            <dd>${unsafeHTML(this.localize('names:335'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:336'))}</dd>
            <dt>${this.localize('names:337')}</dt>
            <dd class="type">${this.localize('names:34')}</dd>
            <dd>${unsafeHTML(this.localize('names:35'))}</dd>
            <dt>${this.localize('names:338')}</dt>
            <dd class="type">${this.localize('names:80')}</dd>
            <dd>${unsafeHTML(this.localize('names:92'))}</dd>
            <dt>${this.localize('names:339')}</dt>
            <dd class="type">${this.localize('names:65')}</dd>
            <dd>${unsafeHTML(this.localize('names:340'))}</dd>
            <dt>${this.localize('names:341')}</dt>
            <dd>${unsafeHTML(this.localize('names:342'))}</dd>
            <dt>${this.localize('names:343')}</dt>
            <dd class="type">${this.localize('names:278')}</dd>
            <dd>${unsafeHTML(this.localize('names:344'))}</dd>
            <dt>${this.localize('names:345')}</dt>
            <dd class="type">${this.localize('names:29')}</dd>
            <dd>${unsafeHTML(this.localize('names:346'))}</dd>
            <dt>${this.localize('names:347')}</dt>
            <dd class="type">${this.localize('names:348')}</dd>
            <dd>${unsafeHTML(this.localize('names:174'))}</dd>
            <dt>${this.localize('names:349')}</dt>
            <dd class="type">${this.localize('names:120')}</dd>
            <dd>${unsafeHTML(this.localize('names:350'))}</dd>
            <dt>${this.localize('names:351')}</dt>
            <dd class="type">${this.localize('names:65')}</dd>
            <dd>${unsafeHTML(this.localize('names:352'))}</dd>
            <dt>${this.localize('names:353')}</dt>
            <dd class="type">${this.localize('names:354')}</dd>
            <dd>${unsafeHTML(this.localize('names:355'))}</dd>
            <dt>${this.localize('names:356')}</dt>
            <dd class="type">${this.localize('names:357')}</dd>
            <dd>${unsafeHTML(this.localize('names:164'))}</dd>
            <dt>${this.localize('names:358')}</dt>
            <dd class="type">${this.localize('names:80')}</dd>
            <dd>${unsafeHTML(this.localize('names:92'))}</dd>
            <dt>${this.localize('names:359')}</dt>
            <dd class="type">${this.localize('names:278')}</dd>
            <dd>${unsafeHTML(this.localize('names:360'))}</dd>
            <dt id="dhammadinna">${this.localize('names:361')}</dt>
            <dd class="type">${this.localize('names:362')}</dd>
            <dd>${unsafeHTML(this.localize('names:363'))}</dd>
            <dt>${this.localize('names:364')}</dt>
            <dd class="type">${this.localize('names:29')}</dd>
            <dd>${unsafeHTML(this.localize('names:365'))}</dd>
            <dt>${this.localize('names:364')}</dt>
            <dd>${unsafeHTML(this.localize('names:366'))}</dd>
            <dt>${this.localize('names:367')}</dt>
            <dd class="type">${this.localize('names:141')}</dd>
            <dd>${unsafeHTML(this.localize('names:368'))}</dd>
            <dt>${this.localize('names:369')}</dt>
            <dd class="type">${this.localize('names:370')}</dd>
            <dd>${unsafeHTML(this.localize('names:371'))}</dd>
            <dt>${this.localize('names:372')}</dt>
            <dd class="type">${this.localize('names:127')}</dd>
            <dd>${unsafeHTML(this.localize('names:92'))}</dd>
            <dt>${this.localize('names:373')}</dt>
            <dd class="type">${this.localize('names:374')}</dd>
            <dd>${unsafeHTML(this.localize('names:375'))}</dd>
            <dt>${this.localize('names:373')}</dt>
            <dd class="type">${this.localize('names:376')}</dd>
            <dd>${unsafeHTML(this.localize('names:37'))}</dd>
            <dt>${this.localize('names:377')}</dt>
            <dd class="type">${this.localize('names:65')}</dd>
            <dd>${unsafeHTML(this.localize('names:378'))}</dd>
            <dt>${this.localize('names:379')}</dt>
            <dd class="type">${this.localize('names:60')}</dd>
            <dd>${unsafeHTML(this.localize('names:380'))}</dd>
            <dt id="dighajanu">${this.localize('names:381')}</dt>
            <dd class="type">${this.localize('names:382')}</dd>
            <dd>${unsafeHTML(this.localize('names:383'))}</dd>
            <dt id="dighavu">${this.localize('names:384')}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:385'))}</dd>
            <dd>${unsafeHTML(this.localize('names:272'))}</dd>
            <dt>${this.localize('names:386')}</dt>
            <dd class="type">${this.localize('names:387')}</dd>
            <dd>${unsafeHTML(this.localize('names:388'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:389'))}</dd>
            <dt id="dighiti">${this.localize('names:390')}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:391'))}</dd>
            <dd>${unsafeHTML(this.localize('names:272'))}</dd>
            <dt>${this.localize('names:392')}</dt>
            <dd class="type">${this.localize('names:141')}</dd>
            <dd>${unsafeHTML(this.localize('names:393'))}</dd>
            <dt>${this.localize('names:394')}</dt>
            <dd class="type">${this.localize('names:395')}</dd>
            <dd>${unsafeHTML(this.localize('names:396'))}</dd>
            <dt>${this.localize('names:397')}</dt>
            <dd class="type">${this.localize('names:34')}</dd>
            <dd>${unsafeHTML(this.localize('names:35'))}</dd>
          </dl>
          <h2 id="e">${this.localize('names:398')}</h2>
          <dl>
            <dt>${this.localize('names:399')}</dt>
            <dd class="type">${this.localize('names:207')}</dd>
            <dd>${unsafeHTML(this.localize('names:400'))}</dd>
            <dt>${this.localize('names:401')}</dt>
            <dd class="type">${this.localize('names:29')}</dd>
            <dd>${unsafeHTML(this.localize('names:402'))}</dd>
            <dt>${this.localize('names:403')}</dt>
            <dd class="type">${this.localize('names:29')}</dd>
            <dd>${unsafeHTML(this.localize('names:404'))}</dd>
            <dt>${this.localize('names:405')}</dt>
            <dd class="type">${this.localize('names:296')}</dd>
            <dd>${unsafeHTML(this.localize('names:297'))}</dd>
            <dt>${this.localize('names:406')}</dt>
            <dd class="type">${this.localize('names:376')}</dd>
            <dd>${unsafeHTML(this.localize('names:37'))}</dd>
          </dl>
          <h2 id="f">${this.localize('names:407')}</h2>
          <dl>
            <dt>${this.localize('names:408')}</dt>
            <dd class="type">${this.localize('names:409')}</dd>
            <dd>${unsafeHTML(this.localize('names:410'))}</dd>
          </dl>
          <h2 id="g">${this.localize('names:411')}</h2>
          <dl>
            <dt>${this.localize('names:412')}</dt>
            <dd class="type">${this.localize('names:68')}</dd>
            <dd>${unsafeHTML(this.localize('names:413'))}</dd>
            <dt>${this.localize('names:414')}</dt>
            <dd class="type">${this.localize('names:127')}</dd>
            <dd>${unsafeHTML(this.localize('names:415'))}</dd>
            <dt>${this.localize('names:416')}</dt>
            <dd class="type">${this.localize('names:141')}</dd>
            <dd>${unsafeHTML(this.localize('names:417'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:418'))}</dd>
            <dt id="gandhabhaka">${this.localize('names:419')}</dt>
            <dd class="type">${this.localize('names:420')}</dd>
            <dd>${unsafeHTML(this.localize('names:305'))}</dd>
            <dt>${this.localize('names:421')}</dt>
            <dd class="type">${this.localize('names:34')}</dd>
            <dd>${unsafeHTML(this.localize('names:35'))}</dd>
            <dt>${this.localize('names:421')}</dt>
            <dd class="type">${this.localize('names:111')}</dd>
            <dd>${unsafeHTML(this.localize('names:162'))}</dd>
            <dt>${this.localize('names:422')}</dt>
            <dd class="type">${this.localize('names:423')}</dd>
            <dd>${unsafeHTML(this.localize('names:424'))}</dd>
            <dt>${this.localize('names:425')}</dt>
            <dd class="type">${this.localize('names:29')}</dd>
            <dd>${unsafeHTML(this.localize('names:426'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:427'))}</dd>
            <dt>${this.localize('names:428')}</dt>
            <dd class="type">${this.localize('names:83')}</dd>
            <dd>${unsafeHTML(this.localize('names:429'))}</dd>
            <dt>${this.localize('names:428')}</dt>
            <dd class="type">${this.localize('names:43')}</dd>
            <dd>${unsafeHTML(this.localize('names:46'))}</dd>
            <dt>${this.localize('names:430')}</dt>
            <dd class="type">${this.localize('names:431')}</dd>
            <dd>${unsafeHTML(this.localize('names:432'))}</dd>
            <dt>${this.localize('names:433')}</dt>
            <dd class="type">${this.localize('names:434')}</dd>
            <dd>${unsafeHTML(this.localize('names:435'))}</dd>
            <dt>${this.localize('names:436')}</dt>
            <dd>${unsafeHTML(this.localize('names:437'))}</dd>
            <dt>${this.localize('names:438')}</dt>
            <dd class="type">${this.localize('names:431')}</dd>
            <dd>${unsafeHTML(this.localize('names:35'))}</dd>
            <dt>${this.localize('names:439')}</dt>
            <dd class="type">${this.localize('names:440')}</dd>
            <dd>${unsafeHTML(this.localize('names:441'))}</dd>
            <dt>${this.localize('names:442')}</dt>
            <dd class="type">${this.localize('names:29')}</dd>
            <dd>${unsafeHTML(this.localize('names:443'))}</dd>
            <dt>${this.localize('names:444')}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:445'))}</dd>
            <dd>${unsafeHTML(this.localize('names:446'))}</dd>
            <dt>${this.localize('names:447')}</dt>
            <dd class="type">${this.localize('names:80')}</dd>
            <dd>${unsafeHTML(this.localize('names:92'))}</dd>
            <dt>${this.localize('names:448')}</dt>
            <dd class="type">${this.localize('names:29')}</dd>
            <dd>${unsafeHTML(this.localize('names:449'))}</dd>
            <dt>${this.localize('names:450')}</dt>
            <dd class="type">${this.localize('names:29')}</dd>
            <dd>${unsafeHTML(this.localize('names:451'))}</dd>
            <dt>${this.localize('names:452')}</dt>
            <dd class="type">${this.localize('names:296')}</dd>
            <dd>${unsafeHTML(this.localize('names:297'))}</dd>
            <dt>${this.localize('names:453')}</dt>
            <dd class="type">${this.localize('names:50')}</dd>
            <dd>${unsafeHTML(this.localize('names:454'))}</dd>
            <dt>${this.localize('names:455')}</dt>
            <dd class="type">${this.localize('names:80')}</dd>
            <dd>${unsafeHTML(this.localize('names:92'))}</dd>
            <dt>${this.localize('names:456')}</dt>
            <dd class="type">${this.localize('names:457')}</dd>
            <dd>${unsafeHTML(this.localize('names:458'))}</dd>
            <dt>${this.localize('names:459')}</dt>
            <dd class="type">${this.localize('names:34')}</dd>
            <dd>${unsafeHTML(this.localize('names:35'))}</dd>
            <dt>${this.localize('names:460')}</dt>
            <dd class="type">${this.localize('names:278')}</dd>
            <dd>${unsafeHTML(this.localize('names:461'))}</dd>
          </dl>
          <h2 id="h">${this.localize('names:462')}</h2>
          <dl>
            <dt>${this.localize('names:463')}</dt>
            <dd>${unsafeHTML(this.localize('names:464'))}</dd>
            <dt>${this.localize('names:465')}</dt>
            <dd class="type">${this.localize('names:65')}</dd>
            <dd>${unsafeHTML(this.localize('names:466'))}</dd>
            <dt>${this.localize('names:467')}</dt>
            <dd class="type">${this.localize('names:36')}</dd>
            <dd>${unsafeHTML(this.localize('names:37'))}</dd>
            <dt>${this.localize('names:468')}</dt>
            <dd class="type">${this.localize('names:29')}</dd>
            <dd>${unsafeHTML(this.localize('names:469'))}</dd>
            <dt>${this.localize('names:470')}</dt>
            <dd class="type">${this.localize('names:471')}</dd>
            <dd>${unsafeHTML(this.localize('names:472'))}</dd>
            <dt>${this.localize('names:473')}</dt>
            <dd class="type">${this.localize('names:207')}</dd>
            <dd>${unsafeHTML(this.localize('names:86'))}</dd>
            <dt>${this.localize('names:474')}</dt>
            <dd class="type">${this.localize('names:60')}</dd>
            <dd>${unsafeHTML(this.localize('names:475'))}</dd>
            <dt>${this.localize('names:476')}</dt>
            <dd class="type">${this.localize('names:80')}</dd>
            <dd>${unsafeHTML(this.localize('names:92'))}</dd>
            <dt>${this.localize('names:477')}</dt>
            <dd class="type">${this.localize('names:440')}</dd>
            <dd>${unsafeHTML(this.localize('names:478'))}</dd>
            <dt>${this.localize('names:479')}</dt>
            <dd class="type">${this.localize('names:34')}</dd>
            <dd>${unsafeHTML(this.localize('names:35'))}</dd>
            <dt>${this.localize('names:480')}</dt>
            <dd class="type">${this.localize('names:43')}</dd>
            <dd>${unsafeHTML(this.localize('names:86'))}</dd>
            <dt>${this.localize('names:481')}</dt>
            <dd class="type">${this.localize('names:80')}</dd>
            <dd>${unsafeHTML(this.localize('names:92'))}</dd>
          </dl>
          <h2 id="i">${this.localize('names:482')}</h2>
          <dl>
            <dt>${this.localize('names:483')}</dt>
            <dd class="type">${this.localize('names:207')}</dd>
            <dd>${unsafeHTML(this.localize('names:484'))}</dd>
            <dt>${this.localize('names:485')}</dt>
            <dd class="type">${this.localize('names:486')}</dd>
            <dd>${unsafeHTML(this.localize('names:92'))}</dd>
            <dt>${this.localize('names:487')}</dt>
            <dd class="type">${this.localize('names:150')}</dd>
            <dd>${unsafeHTML(this.localize('names:488'))}</dd>
            <dt>${this.localize('names:489')}</dt>
            <dd class="type">${this.localize('names:490')}</dd>
            <dd>${unsafeHTML(this.localize('names:491'))}</dd>
            <dt>${this.localize('names:492')}</dt>
            <dd class="type">${this.localize('names:29')}</dd>
            <dd>${unsafeHTML(this.localize('names:493'))}</dd>
            <dt>${this.localize('names:494')}</dt>
            <dd class="type">${this.localize('names:431')}</dd>
            <dd>${unsafeHTML(this.localize('names:495'))}</dd>
            <dt>${this.localize('names:496')}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:497'))}</dd>
            <dd>${unsafeHTML(this.localize('names:498'))}</dd>
          </dl>
          <h2 id="j">${this.localize('names:499')}</h2>
          <dl>
            <dt id="jains">${this.localize('names:500')}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:501'))}</dd>
            <dd>${unsafeHTML(this.localize('names:162'))}</dd>
            <dt>${this.localize('names:502')}</dt>
            <dd class="type">${this.localize('names:34')}</dd>
            <dd>${unsafeHTML(this.localize('names:35'))}</dd>
            <dt>${this.localize('names:503')}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:504'))}</dd>
            <dd>${unsafeHTML(this.localize('names:505'))}</dd>
            <dt>${this.localize('names:506')}</dt>
            <dd class="type">${this.localize('names:80')}</dd>
            <dd>${unsafeHTML(this.localize('names:92'))}</dd>
            <dt>${this.localize('names:507')}</dt>
            <dd class="type">${this.localize('names:74')}</dd>
            <dd>${unsafeHTML(this.localize('names:92'))}</dd>
            <dt>${this.localize('names:508')}</dt>
            <dd class="type">${this.localize('names:207')}</dd>
            <dd>${unsafeHTML(this.localize('names:282'))}</dd>
            <dt>${this.localize('names:509')}</dt>
            <dd class="type">${this.localize('names:141')}</dd>
            <dd>${unsafeHTML(this.localize('names:510'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:511'))}</dd>
            <dt id="jata">${this.localize('names:512')}</dt>
            <dd>${unsafeHTML(this.localize('names:513'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:514'))}</dd>
            <dt>${this.localize('names:515')}</dt>
            <dd class="type">${this.localize('names:278')}</dd>
            <dd>${unsafeHTML(this.localize('names:516'))}</dd>
            <dt>${this.localize('names:517')}</dt>
            <dd class="type">${this.localize('names:60')}</dd>
            <dd>${unsafeHTML(this.localize('names:518'))}</dd>
            <dt>${this.localize('names:519')}</dt>
            <dd class="type">${this.localize('names:34')}</dd>
            <dd>${unsafeHTML(this.localize('names:35'))}</dd>
            <dt>${this.localize('names:520')}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:521'))}</dd>
            <dd>${unsafeHTML(this.localize('names:522'))}</dd>
            <dt>${this.localize('names:523')}</dt>
            <dd class="type">${this.localize('names:524')}</dd>
            <dd>${unsafeHTML(this.localize('names:525'))}</dd>
            <dt>${this.localize('names:526')}</dt>
            <dd class="type">${this.localize('names:34')}</dd>
            <dd>${unsafeHTML(this.localize('names:35'))}</dd>
            <dt>${this.localize('names:527')}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:528'))}</dd>
            <dd>${unsafeHTML(this.localize('names:529'))}</dd>
            <dt>${this.localize('names:530')}</dt>
            <dd class="type">${this.localize('names:34')}</dd>
            <dd>${unsafeHTML(this.localize('names:35'))}</dd>
            <dt>${this.localize('names:531')}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:532'))}</dd>
            <dd>${unsafeHTML(this.localize('names:533'))}</dd>
            <dt>${this.localize('names:534')}</dt>
            <dd>${unsafeHTML(this.localize('names:535'))}</dd>
            <dt>${this.localize('names:536')}</dt>
            <dd class="type">${this.localize('names:29')}</dd>
            <dd>${unsafeHTML(this.localize('names:537'))}</dd>
            <dt>${this.localize('names:538')}</dt>
            <dd class="type">${this.localize('names:36')}</dd>
            <dd>${unsafeHTML(this.localize('names:37'))}</dd>
          </dl>
          <h2 id="k">${this.localize('names:539')}</h2>
          <dl>
            <dt>${this.localize('names:540')}</dt>
            <dd class="type">${this.localize('names:541')}</dd>
            <dd>${unsafeHTML(this.localize('names:542'))}</dd>
            <dt>${this.localize('names:543')}</dt>
            <dd class="type">${this.localize('names:29')}</dd>
            <dd>${unsafeHTML(this.localize('names:544'))}</dd>
            <dt>${this.localize('names:545')}</dt>
            <dd class="type">${this.localize('names:120')}</dd>
            <dd>${unsafeHTML(this.localize('names:546'))}</dd>
            <dt>${this.localize('names:547')}</dt>
            <dd>${unsafeHTML(this.localize('names:383'))}</dd>
            <dt>${this.localize('names:548')}</dt>
            <dd class="type">${this.localize('names:549')}</dd>
            <dd>${unsafeHTML(this.localize('names:92'))}</dd>
            <dt>${this.localize('names:550')}</dt>
            <dd class="type">${this.localize('names:43')}</dd>
            <dd>${unsafeHTML(this.localize('names:86'))}</dd>
            <dt>${this.localize('names:551')}</dt>
            <dd class="type">${this.localize('names:34')}</dd>
            <dd>${unsafeHTML(this.localize('names:35'))}</dd>
            <dt>${this.localize('names:552')}</dt>
            <dd class="type">${this.localize('names:434')}</dd>
            <dd>${unsafeHTML(this.localize('names:435'))}</dd>
            <dt>${this.localize('names:553')}</dt>
            <dd class="type">${this.localize('names:554')}</dd>
            <dd>${unsafeHTML(this.localize('names:37'))}</dd>
            <dt>${this.localize('names:555')}</dt>
            <dd class="type">${this.localize('names:556')}</dd>
            <dd>${unsafeHTML(this.localize('names:557'))}</dd>
            <dt>${this.localize('names:558')}</dt>
            <dd class="type">${this.localize('names:559')}</dd>
            <dd>${unsafeHTML(this.localize('names:560'))}</dd>
            <dt>${this.localize('names:561')}</dt>
            <dd>${unsafeHTML(this.localize('names:86'))}</dd>
            <dt>${this.localize('names:562')}</dt>
            <dd class="type">${this.localize('names:83')}</dd>
            <dd>${unsafeHTML(this.localize('names:563'))}</dd>
            <dt>${this.localize('names:564')}</dt>
            <dd class="type">${this.localize('names:29')}</dd>
            <dd>${unsafeHTML(this.localize('names:565'))}</dd>
            <dt>${this.localize('names:566')}</dt>
            <dd class="type">${this.localize('names:150')}</dd>
            <dd>${unsafeHTML(this.localize('names:567'))}</dd>
            <dt>${this.localize('names:568')}</dt>
            <dd class="type">${this.localize('names:80')}</dd>
            <dd>${unsafeHTML(this.localize('names:92'))}</dd>
            <dt>${this.localize('names:569')}</dt>
            <dd class="type">${this.localize('names:83')}</dd>
            <dd>${unsafeHTML(this.localize('names:37'))}</dd>
            <dt>${this.localize('names:570')}</dt>
            <dd class="type">${this.localize('names:111')}</dd>
            <dd>${unsafeHTML(this.localize('names:162'))}</dd>
            <dt>${this.localize('names:571')}</dt>
            <dd class="type">${this.localize('names:65')}</dd>
            <dd>${unsafeHTML(this.localize('names:572'))}</dd>
            <dt>${this.localize('names:573')}</dt>
            <dd class="type">${this.localize('names:34')}</dd>
            <dd>${unsafeHTML(this.localize('names:35'))}</dd>
            <dt>${this.localize('names:574')}</dt>
            <dd class="type">${this.localize('names:29')}</dd>
            <dd>${unsafeHTML(this.localize('names:575'))}</dd>
            <dt>${unsafeHTML(this.localize('names:576'))}</dt>
            <dd class="type">${this.localize('names:577')}</dd>
            <dd>${unsafeHTML(this.localize('names:578'))}</dd>
            <dt>${this.localize('names:579')}</dt>
            <dd class="type">${this.localize('names:580')}</dd>
            <dd>${unsafeHTML(this.localize('names:69'))}</dd>
            <dt>${this.localize('names:581')}</dt>
            <dd class="type">${this.localize('names:582')}</dd>
            <dd>${unsafeHTML(this.localize('names:291'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:583'))}</dd>
            <dt>${this.localize('names:584')}</dt>
            <dd class="type">${this.localize('names:74')}</dd>
            <dd>${unsafeHTML(this.localize('names:92'))}</dd>
            <dt>${this.localize('names:585')}</dt>
            <dd class="type">${this.localize('names:83')}</dd>
            <dd>${unsafeHTML(this.localize('names:586'))}</dd>
            <dt>${this.localize('names:587')}</dt>
            <dd class="type">${this.localize('names:60')}</dd>
            <dd>${unsafeHTML(this.localize('names:588'))}</dd>
            <dt>${this.localize('names:587')}</dt>
            <dd class="type">${this.localize('names:29')}</dd>
            <dd>${unsafeHTML(this.localize('names:589'))}</dd>
            <dt>${this.localize('names:590')}</dt>
            <dd class="type">${this.localize('names:29')}</dd>
            <dd>${unsafeHTML(this.localize('names:591'))}</dd>
            <dt>${this.localize('names:592')}</dt>
            <dd class="type">${this.localize('names:457')}</dd>
            <dd>${unsafeHTML(this.localize('names:316'))}</dd>
            <dt>${this.localize('names:593')}</dt>
            <dd class="type">${this.localize('names:80')}</dd>
            <dd>${unsafeHTML(this.localize('names:92'))}</dd>
            <dt id="kasi">${this.localize('names:594')}</dt>
            <dd class="type">${this.localize('names:111')}</dd>
            <dd>${unsafeHTML(this.localize('names:595'))}</dd>
            <dt id="kasibharadvaja">${this.localize('names:596')}</dt>
            <dd class="type">${this.localize('names:141')}</dd>
            <dd>${unsafeHTML(this.localize('names:400'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:597'))}</dd>
            <dt>${this.localize('names:598')}</dt>
            <dd class="type">${this.localize('names:599')}</dd>
            <dd>${unsafeHTML(this.localize('names:600'))}</dd>
            <dt>${this.localize('names:598')}</dt>
            <dd class="type">${this.localize('names:114')}</dd>
            <dd>${unsafeHTML(this.localize('names:115'))}</dd>
            <dt>${unsafeHTML(this.localize('names:601'))}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:602'))}</dd>
            <dd>${unsafeHTML(this.localize('names:603'))}</dd>
            <dt>${this.localize('names:598')}</dt>
            <dd class="type">${this.localize('names:604')}</dd>
            <dd>${unsafeHTML(this.localize('names:605'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:606'))}</dd>
            <dt>${this.localize('names:607')}</dt>
            <dd>${unsafeHTML(this.localize('names:86'))}</dd>
            <dt>${this.localize('names:608')}</dt>
            <dd class="type">${this.localize('names:36')}</dd>
            <dd>${unsafeHTML(this.localize('names:37'))}</dd>
            <dt>${this.localize('names:609')}</dt>
            <dd class="type">${this.localize('names:83')}</dd>
            <dd>${unsafeHTML(this.localize('names:557'))}</dd>
            <dt>${this.localize('names:610')}</dt>
            <dd class="type">${this.localize('names:34')}</dd>
            <dd>${unsafeHTML(this.localize('names:35'))}</dd>
            <dt>${this.localize('names:610')}</dt>
            <dd class="type">${this.localize('names:611')}</dd>
            <dd>${unsafeHTML(this.localize('names:612'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:613'))}</dd>
            <dt>${this.localize('names:614')}</dt>
            <dd class="type">${this.localize('names:34')}</dd>
            <dd>${unsafeHTML(this.localize('names:35'))}</dd>
            <dt>${this.localize('names:615')}</dt>
            <dd class="type">${this.localize('names:34')}</dd>
            <dd>${unsafeHTML(this.localize('names:35'))}</dd>
            <dt>${this.localize('names:616')}</dt>
            <dd class="type">${this.localize('names:617')}</dd>
            <dd>${unsafeHTML(this.localize('names:618'))}</dd>
            <dt>${this.localize('names:619')}</dt>
            <dd class="type">${this.localize('names:29')}</dd>
            <dd>${unsafeHTML(this.localize('names:620'))}</dd>
            <dt>${this.localize('names:621')}</dt>
            <dd class="type">${this.localize('names:278')}</dd>
            <dd>${unsafeHTML(this.localize('names:622'))}</dd>
            <dt>${this.localize('names:623')}</dt>
            <dd class="type">${this.localize('names:34')}</dd>
            <dd>${unsafeHTML(this.localize('names:35'))}</dd>
            <dt>${this.localize('names:624')}</dt>
            <dd class="type">${this.localize('names:29')}</dd>
            <dd>${unsafeHTML(this.localize('names:346'))}</dd>
            <dt>${this.localize('names:625')}</dt>
            <dd class="type">${this.localize('names:36')}</dd>
            <dd>${unsafeHTML(this.localize('names:37'))}</dd>
            <dt>${this.localize('names:626')}</dt>
            <dd class="type">${this.localize('names:29')}</dd>
            <dd>${unsafeHTML(this.localize('names:627'))}</dd>
            <dt>${this.localize('names:628')}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:629'))}</dd>
            <dt>${this.localize('names:630')}</dt>
            <dd class="type">${this.localize('names:29')}</dd>
            <dd>${unsafeHTML(this.localize('names:631'))}</dd>
            <dt>${this.localize('names:632')}</dt>
            <dd class="type">${this.localize('names:43')}</dd>
            <dd>${unsafeHTML(this.localize('names:282'))}</dd>
            <dt>${this.localize('names:633')}</dt>
            <dd class="type">${this.localize('names:29')}</dd>
            <dd>${unsafeHTML(this.localize('names:634'))}</dd>
            <dt>${this.localize('names:635')}</dt>
            <dd class="type">${this.localize('names:150')}</dd>
            <dd>${unsafeHTML(this.localize('names:289'))}</dd>
            <dt>${this.localize('names:636')}</dt>
            <dd class="type">${this.localize('names:278')}</dd>
            <dd>${unsafeHTML(this.localize('names:637'))}</dd>
            <dt>${this.localize('names:638')}</dt>
            <dd class="type">${this.localize('names:65')}</dd>
            <dd>${unsafeHTML(this.localize('names:639'))}</dd>
            <dt>${this.localize('names:640')}</dt>
            <dd class="type">${this.localize('names:301')}</dd>
            <dd>${unsafeHTML(this.localize('names:641'))}</dd>
            <dt>${this.localize('names:642')}</dt>
            <dd class="type">${this.localize('names:643')}</dd>
            <dd>${unsafeHTML(this.localize('names:644'))}</dd>
            <dt>${this.localize('names:645')}</dt>
            <dd class="type">${this.localize('names:68')}</dd>
            <dd>${unsafeHTML(this.localize('names:646'))}</dd>
            <dt>${this.localize('names:647')}</dt>
            <dd>${unsafeHTML(this.localize('names:648'))}</dd>
            <dt>${this.localize('names:649')}</dt>
            <dd class="type">${this.localize('names:650')}</dd>
            <dd>${unsafeHTML(this.localize('names:92'))}</dd>
            <dt>${this.localize('names:651')}</dt>
            <dd class="type">${this.localize('names:29')}</dd>
            <dd>${unsafeHTML(this.localize('names:652'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:653'))}</dd>
            <dt>${this.localize('names:654')}</dt>
            <dd class="type">${this.localize('names:655')}</dd>
            <dd>${unsafeHTML(this.localize('names:656'))}</dd>
            <dt>${this.localize('names:657')}</dt>
            <dd class="type">${this.localize('names:34')}</dd>
            <dd>${unsafeHTML(this.localize('names:35'))}</dd>
            <dt id="kosala">${this.localize('names:657')}</dt>
            <dd class="type">${this.localize('names:111')}</dd>
            <dd>${unsafeHTML(this.localize('names:658'))}</dd>
            <dt id="kosambi">${this.localize('names:659')}</dt>
            <dd>${unsafeHTML(this.localize('names:660'))}</dd>
            <dt>${this.localize('names:661')}</dt>
            <dd class="type">${this.localize('names:207')}</dd>
            <dd>${unsafeHTML(this.localize('names:86'))}</dd>
            <dt>${this.localize('names:662')}</dt>
            <dd class="type">${this.localize('names:29')}</dd>
            <dd>${unsafeHTML(this.localize('names:663'))}</dd>
            <dt>${this.localize('names:664')}</dt>
            <dd class="type">${this.localize('names:665')}</dd>
            <dd>${unsafeHTML(this.localize('names:174'))}</dd>
            <dt>${this.localize('names:666')}</dt>
            <dd class="type">${this.localize('names:150')}</dd>
            <dd>${unsafeHTML(this.localize('names:37'))}</dd>
            <dt>${this.localize('names:667')}</dt>
            <dd class="type">${this.localize('names:111')}</dd>
            <dd>${unsafeHTML(this.localize('names:668'))}</dd>
            <dt id="kusavati">${this.localize('names:669')}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:670'))}</dd>
            <dd>${unsafeHTML(this.localize('names:86'))}</dd>
            <dt id="kusinara">${this.localize('names:671')}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:672'))}</dd>
            <dd>${unsafeHTML(this.localize('names:673'))}</dd>
            <dt>${this.localize('names:674')}</dt>
            <dd class="type">${this.localize('names:74')}</dd>
            <dd>${unsafeHTML(this.localize('names:92'))}</dd>
            <dt>${this.localize('names:675')}</dt>
            <dd class="type">${this.localize('names:29')}</dd>
            <dd>${unsafeHTML(this.localize('names:676'))}</dd>
            <dt>${this.localize('names:677')}</dt>
            <dd class="type">${this.localize('names:490')}</dd>
            <dd>${unsafeHTML(this.localize('names:289'))}</dd>
          </dl>
          <h2 id="l">${this.localize('names:678')}</h2>
          <dl>
            <dt>${this.localize('names:679')}</dt>
            <dd class="type">${this.localize('names:36')}</dd>
            <dd>${unsafeHTML(this.localize('names:37'))}</dd>
            <dt>${this.localize('names:680')}</dt>
            <dd class="type">${this.localize('names:36')}</dd>
            <dd>${unsafeHTML(this.localize('names:37'))}</dd>
            <dt id="licchavi">${this.localize('names:681')}</dt>
            <dd class="type">${this.localize('names:68')}</dd>
            <dd>${unsafeHTML(this.localize('names:682'))}</dd>
            <dt>${this.localize('names:683')}</dt>
            <dd class="type">${this.localize('names:141')}</dd>
            <dd>${unsafeHTML(this.localize('names:684'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:685'))}</dd>
            <dt>${this.localize('names:686')}</dt>
            <dd class="type">${this.localize('names:34')}</dd>
            <dd>${unsafeHTML(this.localize('names:35'))}</dd>
            <dt>${this.localize('names:687')}</dt>
            <dd class="type">${this.localize('names:688')}</dd>
            <dd>${unsafeHTML(this.localize('names:158'))}</dd>
          </dl>
          <h2 id="m">${this.localize('names:689')}</h2>
          <dl>
            <dt>${this.localize('names:690')}</dt>
            <dd class="type">${this.localize('names:111')}</dd>
            <dd>${unsafeHTML(this.localize('names:162'))}</dd>
            <dt>${this.localize('names:691')}</dt>
            <dd class="type">${this.localize('names:83')}</dd>
            <dd>${unsafeHTML(this.localize('names:692'))}</dd>
            <dt>${this.localize('names:693')}</dt>
            <dd class="type">${this.localize('names:694')}</dd>
            <dd>${unsafeHTML(this.localize('names:695'))}</dd>
            <dt id="magadha">${this.localize('names:696')}</dt>
            <dd class="type">${this.localize('names:111')}</dd>
            <dd>${unsafeHTML(this.localize('names:697'))}</dd>
            <dt>${this.localize('names:698')}</dt>
            <dd class="type">${this.localize('names:65')}</dd>
            <dd>${unsafeHTML(this.localize('names:458'))}</dd>
            <dt>${this.localize('names:699')}</dt>
            <dd class="type">${this.localize('names:301')}</dd>
            <dd>${unsafeHTML(this.localize('names:700'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:701'))}</dd>
            <dt>${this.localize('names:702')}</dt>
            <dd class="type">${this.localize('names:29')}</dd>
            <dd>${unsafeHTML(this.localize('names:703'))}</dd>
            <dt>${this.localize('names:704')}</dt>
            <dd class="type">${this.localize('names:29')}</dd>
            <dd>${unsafeHTML(this.localize('names:705'))}</dd>
            <dt>${this.localize('names:706')}</dt>
            <dd>${unsafeHTML(this.localize('names:707'))}</dd>
            <dt>${this.localize('names:708')}</dt>
            <dd class="type">${this.localize('names:34')}</dd>
            <dd>${unsafeHTML(this.localize('names:35'))}</dd>
            <dt>${this.localize('names:709')}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:710'))}</dd>
            <dd>${unsafeHTML(this.localize('names:711'))}</dd>
            <dt>${this.localize('names:712')}</dt>
            <dd class="type">${this.localize('names:713')}</dd>
            <dd>${unsafeHTML(this.localize('names:714'))}</dd>
            <dt>${this.localize('names:715')}</dt>
            <dd class="type">${this.localize('names:655')}</dd>
            <dd>${unsafeHTML(this.localize('names:86'))}</dd>
            <dt>${this.localize('names:716')}</dt>
            <dd class="type">${this.localize('names:43')}</dd>
            <dd>${unsafeHTML(this.localize('names:44'))}</dd>
            <dt>${this.localize('names:717')}</dt>
            <dd class="type">${this.localize('names:718')}</dd>
            <dd>${unsafeHTML(this.localize('names:378'))}</dd>
            <dt>${this.localize('names:719')}</dt>
            <dd>${unsafeHTML(this.localize('names:125'))}</dd>
            <dt>${this.localize('names:720')}</dt>
            <dd class="type">${this.localize('names:721')}</dd>
            <dd>${unsafeHTML(this.localize('names:63'))}</dd>
            <dt>${this.localize('names:722')}</dt>
            <dd class="type">${this.localize('names:723')}</dd>
            <dd>${unsafeHTML(this.localize('names:86'))}</dd>
            <dt>${this.localize('names:724')}</dt>
            <dd class="type">${this.localize('names:68')}</dd>
            <dd>${unsafeHTML(this.localize('names:725'))}</dd>
            <dt>${this.localize('names:726')}</dt>
            <dd class="type">${this.localize('names:727')}</dd>
            <dd>${unsafeHTML(this.localize('names:728'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:729'))}</dd>
            <dt>${this.localize('names:730')}</dt>
            <dd class="type">${this.localize('names:29')}</dd>
            <dd>${unsafeHTML(this.localize('names:731'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:732'))}</dd>
            <dt>${this.localize('names:733')}</dt>
            <dd class="type">${this.localize('names:34')}</dd>
            <dd>${unsafeHTML(this.localize('names:35'))}</dd>
            <dt>${this.localize('names:734')}</dt>
            <dd class="type">${this.localize('names:80')}</dd>
            <dd>${unsafeHTML(this.localize('names:92'))}</dd>
            <dt>${this.localize('names:735')}</dt>
            <dd class="type">${this.localize('names:34')}</dd>
            <dd>${unsafeHTML(this.localize('names:35'))}</dd>
            <dt>${this.localize('names:736')}</dt>
            <dd>${unsafeHTML(this.localize('names:737'))}</dd>
            <dt>${this.localize('names:738')}</dt>
            <dd class="type">${this.localize('names:34')}</dd>
            <dd>${unsafeHTML(this.localize('names:35'))}</dd>
            <dt>${this.localize('names:739')}</dt>
            <dd class="type">${this.localize('names:740')}</dd>
            <dd>${unsafeHTML(this.localize('names:413'))}</dd>
            <dt>${this.localize('names:741')}</dt>
            <dd class="type">${this.localize('names:36')}</dd>
            <dd>${unsafeHTML(this.localize('names:37'))}</dd>
            <dt id="mara">${this.localize('names:742')}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:743'))}</dd>
            <dd>${unsafeHTML(this.localize('names:744'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:745'))}</dd>
            <dt>${this.localize('names:746')}</dt>
            <dd class="type">${this.localize('names:80')}</dd>
            <dd>${unsafeHTML(this.localize('names:747'))}</dd>
            <dt>${this.localize('names:748')}</dt>
            <dd class="type">${this.localize('names:34')}</dd>
            <dd>${unsafeHTML(this.localize('names:35'))}</dd>
            <dt>${this.localize('names:748')}</dt>
            <dd class="type">${this.localize('names:749')}</dd>
            <dd>${unsafeHTML(this.localize('names:750'))}</dd>
            <dt>${this.localize('names:751')}</dt>
            <dd class="type">${this.localize('names:29')}</dd>
            <dd>${unsafeHTML(this.localize('names:752'))}</dd>
            <dt>${this.localize('names:753')}</dt>
            <dd class="type">${this.localize('names:150')}</dd>
            <dd>${unsafeHTML(this.localize('names:37'))}</dd>
            <dt id="medakathalika">${this.localize('names:754')}</dt>
            <dd class="type">${this.localize('names:755')}</dd>
            <dd>${unsafeHTML(this.localize('names:756'))}</dd>
            <dt>${this.localize('names:757')}</dt>
            <dd class="type">${this.localize('names:34')}</dd>
            <dd>${unsafeHTML(this.localize('names:35'))}</dd>
            <dt>${this.localize('names:758')}</dt>
            <dd class="type">${this.localize('names:29')}</dd>
            <dd>${unsafeHTML(this.localize('names:282'))}</dd>
            <dt>${this.localize('names:759')}</dt>
            <dd class="type">${this.localize('names:431')}</dd>
            <dd>${unsafeHTML(this.localize('names:760'))}</dd>
            <dt>${this.localize('names:761')}</dt>
            <dd class="type">${this.localize('names:34')}</dd>
            <dd>${unsafeHTML(this.localize('names:35'))}</dd>
            <dt>${this.localize('names:762')}</dt>
            <dd class="type">${this.localize('names:60')}</dd>
            <dd>${unsafeHTML(this.localize('names:763'))}</dd>
            <dt>${this.localize('names:764')}</dt>
            <dd class="type">${this.localize('names:765')}</dd>
            <dd>${unsafeHTML(this.localize('names:656'))}</dd>
            <dt>${this.localize('names:766')}</dt>
            <dd class="type">${this.localize('names:29')}</dd>
            <dd>${unsafeHTML(this.localize('names:767'))}</dd>
            <dt id="migara">${this.localize('names:768')}</dt>
            <dd>${unsafeHTML(this.localize('names:769'))}</dd>
            <dt id="migaramom">${this.localize('names:770')}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:771'))}</dd>
            <dd>${unsafeHTML(this.localize('names:772'))}</dd>
            <dt>${this.localize('names:773')}</dt>
            <dd>${unsafeHTML(this.localize('names:774'))}</dd>
            <dt>${this.localize('names:775')}</dt>
            <dd class="type">${this.localize('names:83')}</dd>
            <dd>${unsafeHTML(this.localize('names:776'))}</dd>
            <dt>${this.localize('names:777')}</dt>
            <dd class="type">${this.localize('names:278')}</dd>
            <dd>${unsafeHTML(this.localize('names:778'))}</dd>
            <dt id="moggallana">${this.localize('names:779')}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:780'))}</dd>
            <dd>${unsafeHTML(this.localize('names:781'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:782'))}</dd>
            <dt>${this.localize('names:783')}</dt>
            <dd class="type">${this.localize('names:784')}</dd>
            <dd>${unsafeHTML(this.localize('names:785'))}</dd>
            <dt>${this.localize('names:786')}</dt>
            <dd class="type">${this.localize('names:60')}</dd>
            <dd>${unsafeHTML(this.localize('names:787'))}</dd>
            <dt>${this.localize('names:788')}</dt>
            <dd>${unsafeHTML(this.localize('names:789'))}</dd>
            <dt>${this.localize('names:790')}</dt>
            <dd class="type">${this.localize('names:60')}</dd>
            <dd>${unsafeHTML(this.localize('names:791'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:792'))}</dd>
            <dt>${this.localize('names:793')}</dt>
            <dd class="type">${this.localize('names:68')}</dd>
            <dd>${unsafeHTML(this.localize('names:86'))}</dd>
            <dt>${this.localize('names:794')}</dt>
            <dd class="type">${this.localize('names:795')}</dd>
            <dd>${unsafeHTML(this.localize('names:796'))}</dd>
            <dt>${this.localize('names:797')}</dt>
            <dd>${unsafeHTML(this.localize('names:798'))}</dd>
            <dt>${this.localize('names:799')}</dt>
            <dd class="type">${this.localize('names:29')}</dd>
            <dd>${unsafeHTML(this.localize('names:800'))}</dd>
            <dt>${this.localize('names:801')}</dt>
            <dd class="type">${this.localize('names:278')}</dd>
            <dd>${unsafeHTML(this.localize('names:802'))}</dd>
          </dl>
          <h2 id="n">${this.localize('names:803')}</h2>
          <dl>
            <dt>${this.localize('names:804')}</dt>
            <dd class="type">${this.localize('names:127')}</dd>
            <dd>${unsafeHTML(this.localize('names:37'))}</dd>
            <dt>${this.localize('names:805')}</dt>
            <dd class="type">${this.localize('names:83')}</dd>
            <dd>${unsafeHTML(this.localize('names:806'))}</dd>
            <dt>${this.localize('names:807')}</dt>
            <dd class="type">${this.localize('names:65')}</dd>
            <dd>${unsafeHTML(this.localize('names:808'))}</dd>
            <dt>${this.localize('names:809')}</dt>
            <dd class="type">${this.localize('names:29')}</dd>
            <dd>${unsafeHTML(this.localize('names:810'))}</dd>
            <dt>${this.localize('names:811')}</dt>
            <dd class="type">${this.localize('names:29')}</dd>
            <dd>${unsafeHTML(this.localize('names:812'))}</dd>
            <dt>${this.localize('names:813')}</dt>
            <dd class="type">${this.localize('names:814')}</dd>
            <dd>${unsafeHTML(this.localize('names:815'))}</dd>
            <dt>${this.localize('names:816')}</dt>
            <dd class="type">${this.localize('names:817')}</dd>
            <dd>${unsafeHTML(this.localize('names:818'))}</dd>
            <dt>${this.localize('names:819')}</dt>
            <dd class="type">${this.localize('names:80')}</dd>
            <dd>${unsafeHTML(this.localize('names:289'))}</dd>
            <dt>${this.localize('names:820')}</dt>
            <dd>${unsafeHTML(this.localize('names:158'))}</dd>
            <dt>${this.localize('names:820')}</dt>
            <dd class="type">${this.localize('names:207')}</dd>
            <dd>${unsafeHTML(this.localize('names:821'))}</dd>
            <dt>${this.localize('names:822')}</dt>
            <dd class="type">${this.localize('names:83')}</dd>
            <dd>${unsafeHTML(this.localize('names:823'))}</dd>
            <dt>${this.localize('names:824')}</dt>
            <dd class="type">${this.localize('names:141')}</dd>
            <dd>${unsafeHTML(this.localize('names:825'))}</dd>
            <dt id="namuci">${this.localize('names:826')}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:827'))}</dd>
            <dd>${unsafeHTML(this.localize('names:828'))}</dd>
            <dt>${this.localize('names:826')}</dt>
            <dd class="type">${this.localize('names:198')}</dd>
            <dd>${unsafeHTML(this.localize('names:37'))}</dd>
            <dt>${this.localize('names:829')}</dt>
            <dd class="type">${this.localize('names:34')}</dd>
            <dd>${unsafeHTML(this.localize('names:35'))}</dd>
            <dt>${this.localize('names:830')}</dt>
            <dd class="type">${this.localize('names:831')}</dd>
            <dd>${unsafeHTML(this.localize('names:832'))}</dd>
            <dt>${this.localize('names:829')}</dt>
            <dd class="type">${this.localize('names:833')}</dd>
            <dd>${unsafeHTML(this.localize('names:834'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:835'))}</dd>
            <dt>${this.localize('names:829')}</dt>
            <dd class="type">${this.localize('names:60')}</dd>
            <dd>${unsafeHTML(this.localize('names:836'))}</dd>
            <dt>${this.localize('names:829')}</dt>
            <dd class="type">${this.localize('names:837')}</dd>
            <dd>${unsafeHTML(this.localize('names:66'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:838'))}</dd>
            <dt>${this.localize('names:839')}</dt>
            <dd class="type">${this.localize('names:29')}</dd>
            <dd>${unsafeHTML(this.localize('names:840'))}</dd>
            <dt>${this.localize('names:839')}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:841'))}</dd>
            <dd>${unsafeHTML(this.localize('names:842'))}</dd>
            <dt>${this.localize('names:843')}</dt>
            <dd class="type">${this.localize('names:844')}</dd>
            <dd>${unsafeHTML(this.localize('names:845'))}</dd>
            <dt>${this.localize('names:846')}</dt>
            <dd class="type">${this.localize('names:29')}</dd>
            <dd>${unsafeHTML(this.localize('names:847'))}</dd>
            <dt>${this.localize('names:846')}</dt>
            <dd class="type">${this.localize('names:434')}</dd>
            <dd>${unsafeHTML(this.localize('names:848'))}</dd>
            <dt>${this.localize('names:849')}</dt>
            <dd class="type">${this.localize('names:29')}</dd>
            <dd>${unsafeHTML(this.localize('names:800'))}</dd>
            <dt>${this.localize('names:850')}</dt>
            <dd>${unsafeHTML(this.localize('names:648'))}</dd>
            <dt>${this.localize('names:851')}</dt>
            <dd class="type">${this.localize('names:74')}</dd>
            <dd>${unsafeHTML(this.localize('names:92'))}</dd>
            <dt id="navak">${this.localize('names:852')}</dt>
            <dd class="type">${this.localize('names:141')}</dd>
            <dd>${unsafeHTML(this.localize('names:853'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:854'))}</dd>
            <dt>${this.localize('names:855')}</dt>
            <dd class="type">${this.localize('names:65')}</dd>
            <dd>${unsafeHTML(this.localize('names:856'))}</dd>
            <dt>${this.localize('names:857')}</dt>
            <dd class="type">${this.localize('names:74')}</dd>
            <dd>${unsafeHTML(this.localize('names:92'))}</dd>
            <dt>${this.localize('names:858')}</dt>
            <dd class="type">${this.localize('names:80')}</dd>
            <dd>${unsafeHTML(this.localize('names:92'))}</dd>
            <dt>${this.localize('names:859')}</dt>
            <dd class="type">${this.localize('names:34')}</dd>
            <dd>${unsafeHTML(this.localize('names:35'))}</dd>
            <dt>${this.localize('names:860')}</dt>
            <dd class="type">${this.localize('names:43')}</dd>
            <dd>${unsafeHTML(this.localize('names:861'))}</dd>
            <dt>${this.localize('names:862')}</dt>
            <dd class="type">${this.localize('names:80')}</dd>
            <dd>${unsafeHTML(this.localize('names:92'))}</dd>
            <dt>${this.localize('names:863')}</dt>
            <dd class="type">${this.localize('names:80')}</dd>
            <dd>${unsafeHTML(this.localize('names:92'))}</dd>
            <dt id="nataputta">${this.localize('names:864')}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:865'))}</dd>
            <dd>${unsafeHTML(this.localize('names:866'))}</dd>
            <dt id="nigantha">${this.localize('names:867')}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:868'))}</dd>
            <dd>${unsafeHTML(this.localize('names:869'))}</dd>
            <dt>${this.localize('names:870')}</dt>
            <dd class="type">${this.localize('names:29')}</dd>
            <dd>${unsafeHTML(this.localize('names:871'))}</dd>
            <dt>${this.localize('names:872')}</dt>
            <dd class="type">${this.localize('names:29')}</dd>
            <dd>${unsafeHTML(this.localize('names:873'))}</dd>
            <dt>${this.localize('names:874')}</dt>
            <dd>${unsafeHTML(this.localize('names:875'))}</dd>
            <dt>${this.localize('names:876')}</dt>
            <dd>${unsafeHTML(this.localize('names:86'))}</dd>
            <dt>${this.localize('names:877')}</dt>
            <dd class="type">${this.localize('names:36')}</dd>
            <dd>${unsafeHTML(this.localize('names:878'))}</dd>
            <dt>${this.localize('names:879')}</dt>
            <dd class="type">${this.localize('names:880')}</dd>
            <dd>${unsafeHTML(this.localize('names:881'))}</dd>
            <dt>${this.localize('names:882')}</dt>
            <dd class="type">${this.localize('names:29')}</dd>
            <dd>${unsafeHTML(this.localize('names:883'))}</dd>
            <dt>${this.localize('names:884')}</dt>
            <dd class="type">${this.localize('names:34')}</dd>
            <dd>${unsafeHTML(this.localize('names:35'))}</dd>
          </dl>
          <h2 id="o">${this.localize('names:885')}</h2>
          <dl>
            <dt>${this.localize('names:886')}</dt>
            <dd class="type">${this.localize('names:80')}</dd>
            <dd>${unsafeHTML(this.localize('names:92'))}</dd>
            <dt>${this.localize('names:887')}</dt>
            <dd class="type">${this.localize('names:83')}</dd>
            <dd>${unsafeHTML(this.localize('names:235'))}</dd>
            <dt>${this.localize('names:888')}</dt>
            <dd class="type">${this.localize('names:80')}</dd>
            <dd>${unsafeHTML(this.localize('names:92'))}</dd>
          </dl>
          <h2 id="pq">${this.localize('names:889')}</h2>
          <dl>
            <dt>${this.localize('names:890')}</dt>
            <dd class="type">${this.localize('names:34')}</dd>
            <dd>${unsafeHTML(this.localize('names:35'))}</dd>
            <dt>${this.localize('names:891')}</dt>
            <dd class="type">${this.localize('names:655')}</dd>
            <dd>${unsafeHTML(this.localize('names:892'))}</dd>
            <dt>${this.localize('names:893')}</dt>
            <dd class="type">${this.localize('names:34')}</dd>
            <dd>${unsafeHTML(this.localize('names:35'))}</dd>
            <dt>${this.localize('names:894')}</dt>
            <dd class="type">${this.localize('names:34')}</dd>
            <dd>${unsafeHTML(this.localize('names:35'))}</dd>
            <dt>${this.localize('names:895')}</dt>
            <dd class="type">${this.localize('names:198')}</dd>
            <dd>${unsafeHTML(this.localize('names:37'))}</dd>
            <dt>${this.localize('names:896')}</dt>
            <dd class="type">${this.localize('names:490')}</dd>
            <dd>${unsafeHTML(this.localize('names:897'))}</dd>
            <dt>${this.localize('names:898')}</dt>
            <dd class="type">${this.localize('names:655')}</dd>
            <dd>${unsafeHTML(this.localize('names:785'))}</dd>
            <dt>${this.localize('names:899')}</dt>
            <dd class="type">${this.localize('names:80')}</dd>
            <dd>${unsafeHTML(this.localize('names:289'))}</dd>
            <dt>${this.localize('names:900')}</dt>
            <dd class="type">${this.localize('names:901')}</dd>
            <dd>${unsafeHTML(this.localize('names:902'))}</dd>
            <dt>${this.localize('names:903')}</dt>
            <dd class="type">${this.localize('names:150')}</dd>
            <dd>${unsafeHTML(this.localize('names:37'))}</dd>
            <dt>${this.localize('names:903')}</dt>
            <dd class="type">${this.localize('names:80')}</dd>
            <dd>${unsafeHTML(this.localize('names:92'))}</dd>
            <dt>${this.localize('names:904')}</dt>
            <dd class="type">${this.localize('names:431')}</dd>
            <dd>${unsafeHTML(this.localize('names:905'))}</dd>
            <dt>${this.localize('names:906')}</dt>
            <dd class="type">${this.localize('names:34')}</dd>
            <dd>${unsafeHTML(this.localize('names:35'))}</dd>
            <dt>${this.localize('names:907')}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:908'))}</dd>
            <dd>${unsafeHTML(this.localize('names:909'))}</dd>
            <dt>${this.localize('names:910')}</dt>
            <dd class="type">${this.localize('names:111')}</dd>
            <dd>${unsafeHTML(this.localize('names:162'))}</dd>
            <dt>${this.localize('names:911')}</dt>
            <dd class="type">${this.localize('names:912')}</dd>
            <dd>${unsafeHTML(this.localize('names:913'))}</dd>
            <dt>${this.localize('names:911')}</dt>
            <dd class="type">${this.localize('names:80')}</dd>
            <dd>${unsafeHTML(this.localize('names:92'))}</dd>
            <dt>${this.localize('names:914')}</dt>
            <dd class="type">${this.localize('names:150')}</dd>
            <dd>${unsafeHTML(this.localize('names:37'))}</dd>
            <dt>${this.localize('names:915')}</dt>
            <dd class="type">${this.localize('names:36')}</dd>
            <dd>${unsafeHTML(this.localize('names:37'))}</dd>
            <dt>${this.localize('names:916')}</dt>
            <dd class="type">${this.localize('names:74')}</dd>
            <dd>${unsafeHTML(this.localize('names:92'))}</dd>
            <dt>${this.localize('names:917')}</dt>
            <dd class="type">${this.localize('names:918')}</dd>
            <dd>${unsafeHTML(this.localize('names:37'))}</dd>
            <dt>${this.localize('names:919')}</dt>
            <dd class="type">${this.localize('names:36')}</dd>
            <dd>${unsafeHTML(this.localize('names:878'))}</dd>
            <dt id="parasiri">${this.localize('names:920')}</dt>
            <dd class="type">${this.localize('names:141')}</dd>
            <dd>${unsafeHTML(this.localize('names:546'))}</dd>
            <dt id="pari">${this.localize('names:921')}</dt>
            <dd class="type">${this.localize('names:83')}</dd>
            <dd>${unsafeHTML(this.localize('names:922'))}</dd>
            <dt id="pasenadi">${this.localize('names:923')}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:924'))}</dd>
            <dd>${unsafeHTML(this.localize('names:925'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:926'))}</dd>
            <dt>${this.localize('names:927')}</dt>
            <dd class="type">${this.localize('names:34')}</dd>
            <dd>${unsafeHTML(this.localize('names:35'))}</dd>
            <dt>${this.localize('names:928')}</dt>
            <dd>${unsafeHTML(this.localize('names:929'))}</dd>
            <dt>${this.localize('names:930')}</dt>
            <dd class="type">${this.localize('names:931')}</dd>
            <dd>${unsafeHTML(this.localize('names:932'))}</dd>
            <dt>${this.localize('names:933')}</dt>
            <dd class="type">${this.localize('names:207')}</dd>
            <dd>${unsafeHTML(this.localize('names:86'))}</dd>
            <dt>${this.localize('names:934')}</dt>
            <dd class="type">${this.localize('names:83')}</dd>
            <dd>${unsafeHTML(this.localize('names:935'))}</dd>
            <dt>${this.localize('names:936')}</dt>
            <dd class="type">${this.localize('names:937')}</dd>
            <dd>${unsafeHTML(this.localize('names:938'))}</dd>
            <dt>${this.localize('names:939')}</dt>
            <dd class="type">${this.localize('names:83')}</dd>
            <dd>${unsafeHTML(this.localize('names:940'))}</dd>
            <dt>${this.localize('names:941')}</dt>
            <dd>${unsafeHTML(this.localize('names:942'))}</dd>
            <dt>${this.localize('names:943')}</dt>
            <dd class="type">${this.localize('names:34')}</dd>
            <dd>${unsafeHTML(this.localize('names:35'))}</dd>
            <dt>${this.localize('names:943')}</dt>
            <dd class="type">${this.localize('names:431')}</dd>
            <dd>${unsafeHTML(this.localize('names:944'))}</dd>
            <dt>${this.localize('names:945')}</dt>
            <dd class="type">${this.localize('names:29')}</dd>
            <dd>${unsafeHTML(this.localize('names:800'))}</dd>
            <dt>${this.localize('names:946')}</dt>
            <dd class="type">${this.localize('names:947')}</dd>
            <dd>${unsafeHTML(this.localize('names:948'))}</dd>
            <dd>${unsafeHTML(this.localize('names:949'))}</dd>
            <dd>${unsafeHTML(this.localize('names:769'))}</dd>
            <dt>${this.localize('names:950')}</dt>
            <dd>${unsafeHTML(this.localize('names:951'))}</dd>
            <dt>${this.localize('names:952')}</dt>
            <dd class="type">${this.localize('names:953')}</dd>
            <dd>${unsafeHTML(this.localize('names:954'))}</dd>
            <dt>${this.localize('names:955')}</dt>
            <dd class="type">${this.localize('names:34')}</dd>
            <dd>${unsafeHTML(this.localize('names:35'))}</dd>
            <dt id="pindola">${this.localize('names:956')}</dt>
            <dd class="type">${this.localize('names:29')}</dd>
            <dd>${unsafeHTML(this.localize('names:957'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:958'))}</dd>
            <dt>${this.localize('names:959')}</dt>
            <dd class="type">${this.localize('names:141')}</dd>
            <dd>${unsafeHTML(this.localize('names:960'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:961'))}</dd>
            <dt>${this.localize('names:962')}</dt>
            <dd class="type">${this.localize('names:60')}</dd>
            <dd>${unsafeHTML(this.localize('names:963'))}</dd>
            <dt>${this.localize('names:964')}</dt>
            <dd>${unsafeHTML(this.localize('names:965'))}</dd>
            <dt>${this.localize('names:966')}</dt>
            <dd class="type">${this.localize('names:83')}</dd>
            <dd>${unsafeHTML(this.localize('names:86'))}</dd>
            <dt>${this.localize('names:967')}</dt>
            <dd class="type">${this.localize('names:34')}</dd>
            <dd>${unsafeHTML(this.localize('names:35'))}</dd>
            <dt>${this.localize('names:968')}</dt>
            <dd class="type">${this.localize('names:60')}</dd>
            <dd>${unsafeHTML(this.localize('names:969'))}</dd>
            <dt>${this.localize('names:970')}</dt>
            <dd>${unsafeHTML(this.localize('names:971'))}</dd>
            <dt>${this.localize('names:972')}</dt>
            <dd>${unsafeHTML(this.localize('names:309'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:973'))}</dd>
            <dt>${this.localize('names:974')}</dt>
            <dd>${unsafeHTML(this.localize('names:86'))}</dd>
            <dt>${this.localize('names:975')}</dt>
            <dd class="type">${this.localize('names:29')}</dd>
            <dd>${unsafeHTML(this.localize('names:228'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:976'))}</dd>
            <dt>${this.localize('names:977')}</dt>
            <dd class="type">${this.localize('names:29')}</dd>
            <dd>${unsafeHTML(this.localize('names:639'))}</dd>
            <dt>${this.localize('names:978')}</dt>
            <dd class="type">${this.localize('names:29')}</dd>
            <dd>${unsafeHTML(this.localize('names:979'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:980'))}</dd>
            <dt>${this.localize('names:981')}</dt>
            <dd class="type">${this.localize('names:29')}</dd>
            <dd>${unsafeHTML(this.localize('names:982'))}</dd>
            <dt>${this.localize('names:983')}</dt>
            <dd class="type">${this.localize('names:278')}</dd>
            <dd>${unsafeHTML(this.localize('names:984'))}</dd>
            <dt>${this.localize('names:978')}</dt>
            <dd class="type">${this.localize('names:985')}</dd>
            <dd>${unsafeHTML(this.localize('names:466'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:986'))}</dd>
            <dt>${this.localize('names:987')}</dt>
            <dd class="type">${this.localize('names:80')}</dd>
            <dd>${unsafeHTML(this.localize('names:92'))}</dd>
            <dt>${this.localize('names:987')}</dt>
            <dd class="type">${this.localize('names:60')}</dd>
            <dd>${unsafeHTML(this.localize('names:988'))}</dd>
            <dt>${this.localize('names:989')}</dt>
            <dd class="type">${this.localize('names:29')}</dd>
            <dd>${unsafeHTML(this.localize('names:990'))}</dd>
            <dt>${this.localize('names:991')}</dt>
            <dd class="type">${this.localize('names:278')}</dd>
            <dd>${unsafeHTML(this.localize('names:992'))}</dd>
            <dt>${this.localize('names:993')}</dt>
            <dd class="type">${this.localize('names:901')}</dd>
            <dd>${unsafeHTML(this.localize('names:994'))}</dd>
          </dl>
          <h2 id="r">${this.localize('names:995')}</h2>
          <dl>
            <dt>${this.localize('names:996')}</dt>
            <dd class="type">${this.localize('names:29')}</dd>
            <dd>${unsafeHTML(this.localize('names:997'))}</dd>
            <dt>${this.localize('names:998')}</dt>
            <dd class="type">${this.localize('names:999')}</dd>
            <dd>${unsafeHTML(this.localize('names:1000'))}</dd>
            <dt>${this.localize('names:1001')}</dt>
            <dd class="type">${this.localize('names:1002')}</dd>
            <dd>${unsafeHTML(this.localize('names:1003'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:1004'))}</dd>
            <dt>${this.localize('names:1005')}</dt>
            <dd class="type">${this.localize('names:80')}</dd>
            <dd>${unsafeHTML(this.localize('names:92'))}</dd>
            <dt>${this.localize('names:1006')}</dt>
            <dd class="type">${this.localize('names:29')}</dd>
            <dd>${unsafeHTML(this.localize('names:1007'))}</dd>
            <dt>${this.localize('names:1008')}</dt>
            <dd class="type">${this.localize('names:1009')}</dd>
            <dd>${unsafeHTML(this.localize('names:1010'))}</dd>
            <dt>${this.localize('names:1011')}</dt>
            <dd class="type">${this.localize('names:34')}</dd>
            <dd>${unsafeHTML(this.localize('names:35'))}</dd>
            <dt>${this.localize('names:1012')}</dt>
            <dd class="type">${this.localize('names:207')}</dd>
            <dd>${unsafeHTML(this.localize('names:86'))}</dd>
            <dt>${this.localize('names:1013')}</dt>
            <dd class="type">${this.localize('names:29')}</dd>
            <dd>${unsafeHTML(this.localize('names:1014'))}</dd>
            <dt>${this.localize('names:1015')}</dt>
            <dd class="type">${this.localize('names:141')}</dd>
            <dd>${unsafeHTML(this.localize('names:1016'))}</dd>
            <dt>${this.localize('names:1017')}</dt>
            <dd class="type">${this.localize('names:29')}</dd>
            <dd>${unsafeHTML(this.localize('names:656'))}</dd>
            <dt>${this.localize('names:1018')}</dt>
            <dd>${unsafeHTML(this.localize('names:1019'))}</dd>
            <dt>${this.localize('names:1020')}</dt>
            <dd class="type">${this.localize('names:29')}</dd>
            <dd></dd>
            <dd>${unsafeHTML(this.localize('names:1021'))}</dd>
            <dt>${this.localize('names:1022')}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:1023'))}</dd>
            <dd>${unsafeHTML(this.localize('names:769'))}</dd>
            <dt>${this.localize('names:1024')}</dt>
            <dd class="type">${this.localize('names:278')}</dd>
            <dd>${unsafeHTML(this.localize('names:1025'))}</dd>
            <dt>${this.localize('names:1026')}</dt>
            <dd class="type">${this.localize('names:1027')}</dd>
            <dd>${unsafeHTML(this.localize('names:258'))}</dd>
            <dt>${this.localize('names:1028')}</dt>
            <dd class="type">${this.localize('names:36')}</dd>
            <dd>${unsafeHTML(this.localize('names:37'))}</dd>
            <dt>${this.localize('names:1029')}</dt>
            <dd class="type">${this.localize('names:181')}</dd>
            <dd>${unsafeHTML(this.localize('names:1030'))}</dd>
            <dt>${this.localize('names:1031')}</dt>
            <dd class="type">${this.localize('names:1032')}</dd>
            <dd>${unsafeHTML(this.localize('names:684'))}</dd>
            <dt>${this.localize('names:1033')}</dt>
            <dd class="type">${this.localize('names:36')}</dd>
            <dd>${unsafeHTML(this.localize('names:37'))}</dd>
          </dl>
          <h2 id="s">${this.localize('names:1034')}</h2>
          <dl>
            <dt>${this.localize('names:1035')}</dt>
            <dd class="type">${this.localize('names:29')}</dd>
            <dd>${unsafeHTML(this.localize('names:856'))}</dd>
            <dt>${this.localize('names:1036')}</dt>
            <dd class="type">${this.localize('names:1037')}</dd>
            <dd>${unsafeHTML(this.localize('names:1038'))}</dd>
            <dt>${this.localize('names:1039')}</dt>
            <dd class="type">${this.localize('names:34')}</dd>
            <dd>${unsafeHTML(this.localize('names:35'))}</dd>
            <dt>${this.localize('names:1040')}</dt>
            <dd class="type">${this.localize('names:36')}</dd>
            <dd>${unsafeHTML(this.localize('names:37'))}</dd>
            <dt>${this.localize('names:1041')}</dt>
            <dd class="type">${this.localize('names:36')}</dd>
            <dd>${unsafeHTML(this.localize('names:37'))}</dd>
            <dt>${this.localize('names:1042')}</dt>
            <dd class="type">${this.localize('names:36')}</dd>
            <dd>${unsafeHTML(this.localize('names:37'))}</dd>
            <dt>${this.localize('names:1043')}</dt>
            <dd class="type">${this.localize('names:83')}</dd>
            <dd>${unsafeHTML(this.localize('names:1044'))}</dd>
            <dt>${this.localize('names:1045')}</dt>
            <dd class="type">${this.localize('names:150')}</dd>
            <dd>${unsafeHTML(this.localize('names:37'))}</dd>
            <dt>${this.localize('names:1046')}</dt>
            <dd class="type">${this.localize('names:918')}</dd>
            <dd>${unsafeHTML(this.localize('names:1047'))}</dd>
            <dt>${this.localize('names:1048')}</dt>
            <dd class="type">${this.localize('names:83')}</dd>
            <dd>${unsafeHTML(this.localize('names:1049'))}</dd>
            <dt id="sakka">${this.localize('names:1050')}</dt>
            <dd class="type">${this.localize('names:1051')}</dd>
            <dd>${unsafeHTML(this.localize('names:1052'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:1053'))}</dd>
            <dt>${this.localize('names:1054')}</dt>
            <dd class="type">${this.localize('names:65')}</dd>
            <dd>${unsafeHTML(this.localize('names:1055'))}</dd>
            <dt id="sakula">${this.localize('names:1056')}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:1057'))}</dd>
            <dd>${unsafeHTML(this.localize('names:69'))}</dd>
            <dt>${this.localize('names:434')}</dt>
            <dd class="type">${this.localize('names:68')}</dd>
            <dd>${unsafeHTML(this.localize('names:1058'))}</dd>
            <dt>${this.localize('names:1059')}</dt>
            <dd class="type">${this.localize('names:1060')}</dd>
            <dd>${unsafeHTML(this.localize('names:1061'))}</dd>
            <dt>${this.localize('names:1062')}</dt>
            <dd class="type">${this.localize('names:65')}</dd>
            <dd>${unsafeHTML(this.localize('names:684'))}</dd>
            <dt>${this.localize('names:1063')}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:1064'))}</dd>
            <dd>${unsafeHTML(this.localize('names:769'))}</dd>
            <dt>${this.localize('names:1063')}</dt>
            <dd class="type">${this.localize('names:29')}</dd>
            <dd>${unsafeHTML(this.localize('names:86'))}</dd>
            <dt>${this.localize('names:1065')}</dt>
            <dd class="type">${this.localize('names:36')}</dd>
            <dd>${unsafeHTML(this.localize('names:37'))}</dd>
            <dt>${this.localize('names:1066')}</dt>
            <dd class="type">${this.localize('names:953')}</dd>
            <dd>${unsafeHTML(this.localize('names:1067'))}</dd>
            <dt id="samavati">${this.localize('names:1068')}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:1069'))}</dd>
            <dd>${unsafeHTML(this.localize('names:1070'))}</dd>
            <dt>${this.localize('names:1071')}</dt>
            <dd class="type">${this.localize('names:29')}</dd>
            <dd>${unsafeHTML(this.localize('names:1072'))}</dd>
            <dt>${this.localize('names:1073')}</dt>
            <dd class="type">${this.localize('names:918')}</dd>
            <dd>${unsafeHTML(this.localize('names:1074'))}</dd>
            <dt>${this.localize('names:1075')}</dt>
            <dd class="type">${this.localize('names:29')}</dd>
            <dd>${unsafeHTML(this.localize('names:1076'))}</dd>
            <dt>${this.localize('names:1077')}</dt>
            <dd class="type">${this.localize('names:29')}</dd>
            <dd>${unsafeHTML(this.localize('names:1078'))}</dd>
            <dt>${this.localize('names:1079')}</dt>
            <dd class="type">${this.localize('names:141')}</dd>
            <dd>${unsafeHTML(this.localize('names:1080'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:1081'))}</dd>
            <dt>${this.localize('names:1082')}</dt>
            <dd class="type">${this.localize('names:34')}</dd>
            <dd>${unsafeHTML(this.localize('names:35'))}</dd>
            <dt>${this.localize('names:1083')}</dt>
            <dd class="type">${this.localize('names:431')}</dd>
            <dd>${unsafeHTML(this.localize('names:378'))}</dd>
            <dt>${this.localize('names:1084')}</dt>
            <dd class="type">${this.localize('names:29')}</dd>
            <dd>${unsafeHTML(this.localize('names:1085'))}</dd>
            <dt>${this.localize('names:1086')}</dt>
            <dd class="type">${this.localize('names:34')}</dd>
            <dd>${unsafeHTML(this.localize('names:35'))}</dd>
            <dt>${this.localize('names:1087')}</dt>
            <dd class="type">${this.localize('names:150')}</dd>
            <dd>${unsafeHTML(this.localize('names:618'))}</dd>
            <dt>${this.localize('names:1088')}</dt>
            <dd class="type">${this.localize('names:1089')}</dd>
            <dd>${unsafeHTML(this.localize('names:86'))}</dd>
            <dt>${this.localize('names:1090')}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:1091'))}</dd>
            <dd>${unsafeHTML(this.localize('names:69'))}</dd>
            <dt>${this.localize('names:1092')}</dt>
            <dd class="type">${this.localize('names:1093')}</dd>
            <dd>${unsafeHTML(this.localize('names:1094'))}</dd>
            <dt>${this.localize('names:1095')}</dt>
            <dd class="type">${this.localize('names:29')}</dd>
            <dd>${unsafeHTML(this.localize('names:1096'))}</dd>
            <dt>${this.localize('names:1097')}</dt>
            <dd class="type">${this.localize('names:34')}</dd>
            <dd>${unsafeHTML(this.localize('names:35'))}</dd>
            <dt>${this.localize('names:1098')}</dt>
            <dd class="type">${this.localize('names:43')}</dd>
            <dd>${unsafeHTML(this.localize('names:44'))}</dd>
            <dt>${this.localize('names:1099')}</dt>
            <dd class="type">${this.localize('names:50')}</dd>
            <dd>${unsafeHTML(this.localize('names:86'))}</dd>
            <dt>${this.localize('names:1100')}</dt>
            <dd class="type">${this.localize('names:43')}</dd>
            <dd>${unsafeHTML(this.localize('names:46'))}</dd>
            <dt id="sariputta">${this.localize('names:1101')}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:1102'))}</dd>
            <dd>${unsafeHTML(this.localize('names:1103'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:1104'))}</dd>
            <dt>${this.localize('names:1105')}</dt>
            <dd class="type">${this.localize('names:431')}</dd>
            <dd>${unsafeHTML(this.localize('names:37'))}</dd>
            <dt>${this.localize('names:1106')}</dt>
            <dd class="type">${this.localize('names:80')}</dd>
            <dd>${unsafeHTML(this.localize('names:92'))}</dd>
            <dt>${this.localize('names:1107')}</dt>
            <dd class="type">${this.localize('names:1108')}</dd>
            <dd>${unsafeHTML(this.localize('names:1109'))}</dd>
            <dt>${this.localize('names:1110')}</dt>
            <dd class="type">${this.localize('names:50')}</dd>
            <dd>${unsafeHTML(this.localize('names:86'))}</dd>
            <dt>${this.localize('names:1111')}</dt>
            <dd class="type">${this.localize('names:1112')}</dd>
            <dd>${unsafeHTML(this.localize('names:86'))}</dd>
            <dt>${this.localize('names:1113')}</dt>
            <dd class="type">${this.localize('names:34')}</dd>
            <dd>${unsafeHTML(this.localize('names:35'))}</dd>
            <dt>${this.localize('names:1114')}</dt>
            <dd class="type">${this.localize('names:150')}</dd>
            <dd>${unsafeHTML(this.localize('names:1115'))}</dd>
            <dt id="savatthi">${this.localize('names:1116')}</dt>
            <dd class="type">${this.localize('names:1117')}</dd>
            <dd>${unsafeHTML(this.localize('names:1118'))}</dd>
            <dt>${this.localize('names:1119')}</dt>
            <dd class="type">${this.localize('names:34')}</dd>
            <dd>${unsafeHTML(this.localize('names:35'))}</dd>
            <dt>${this.localize('names:1120')}</dt>
            <dd class="type">${this.localize('names:65')}</dd>
            <dd>${unsafeHTML(this.localize('names:1121'))}</dd>
            <dt>${this.localize('names:1122')}</dt>
            <dd class="type">${this.localize('names:278')}</dd>
            <dd>${unsafeHTML(this.localize('names:1123'))}</dd>
            <dt>${this.localize('names:1124')}</dt>
            <dd class="type">${this.localize('names:1125')}</dd>
            <dd>${unsafeHTML(this.localize('names:466'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:1126'))}</dd>
            <dt>${this.localize('names:1127')}</dt>
            <dd class="type">${this.localize('names:80')}</dd>
            <dd>${unsafeHTML(this.localize('names:92'))}</dd>
            <dt>${this.localize('names:1128')}</dt>
            <dd class="type">${this.localize('names:83')}</dd>
            <dd>${unsafeHTML(this.localize('names:1129'))}</dd>
            <dt>${this.localize('names:1130')}</dt>
            <dd class="type">${this.localize('names:34')}</dd>
            <dd>${unsafeHTML(this.localize('names:35'))}</dd>
            <dt>${this.localize('names:1131')}</dt>
            <dd>${unsafeHTML(this.localize('names:1132'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:1133'))}</dd>
            <dt>${this.localize('names:1134')}</dt>
            <dd class="type">${this.localize('names:1135')}</dd>
            <dd>${unsafeHTML(this.localize('names:1136'))}</dd>
            <dt>${this.localize('names:1137')}</dt>
            <dd class="type">${this.localize('names:1138')}</dd>
            <dd>${unsafeHTML(this.localize('names:92'))}</dd>
            <dt>${this.localize('names:1137')}</dt>
            <dd class="type">${this.localize('names:34')}</dd>
            <dd>${unsafeHTML(this.localize('names:35'))}</dd>
            <dt>${this.localize('names:1139')}</dt>
            <dd class="type">${this.localize('names:457')}</dd>
            <dd>${unsafeHTML(this.localize('names:1140'))}</dd>
            <dt>${this.localize('names:1141')}</dt>
            <dd class="type">${this.localize('names:556')}</dd>
            <dd>${unsafeHTML(this.localize('names:1142'))}</dd>
            <dt>${this.localize('names:1143')}</dt>
            <dd class="type">${this.localize('names:431')}</dd>
            <dd>${unsafeHTML(this.localize('names:1144'))}</dd>
            <dt>${this.localize('names:1145')}</dt>
            <dd class="type">${this.localize('names:29')}</dd>
            <dd>${unsafeHTML(this.localize('names:1146'))}</dd>
            <dt>${this.localize('names:1147')}</dt>
            <dd class="type">${this.localize('names:29')}</dd>
            <dd>${unsafeHTML(this.localize('names:1148'))}</dd>
            <dt>${this.localize('names:1149')}</dt>
            <dd class="type">${this.localize('names:29')}</dd>
            <dd>${unsafeHTML(this.localize('names:1150'))}</dd>
            <dt>${this.localize('names:1151')}</dt>
            <dd class="type">${this.localize('names:278')}</dd>
            <dd>${unsafeHTML(this.localize('names:1152'))}</dd>
            <dt>${this.localize('names:1153')}</dt>
            <dd class="type">${this.localize('names:29')}</dd>
            <dd>${unsafeHTML(this.localize('names:1154'))}</dd>
            <dt>${this.localize('names:1153')}</dt>
            <dd class="type">${this.localize('names:80')}</dd>
            <dd>${unsafeHTML(this.localize('names:1155'))}</dd>
            <dt>${this.localize('names:1156')}</dt>
            <dd class="type">${this.localize('names:34')}</dd>
            <dd>${unsafeHTML(this.localize('names:35'))}</dd>
            <dt id="soma">${this.localize('names:1157')}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:1158'))}</dd>
            <dd>${unsafeHTML(this.localize('names:69'))}</dd>
            <dt>${this.localize('names:1157')}</dt>
            <dd class="type">${this.localize('names:278')}</dd>
            <dd>${unsafeHTML(this.localize('names:1159'))}</dd>
            <dt>${this.localize('names:1160')}</dt>
            <dd class="type">${this.localize('names:80')}</dd>
            <dd>${unsafeHTML(this.localize('names:92'))}</dd>
            <dt>${this.localize('names:1161')}</dt>
            <dd class="type">${this.localize('names:1162')}</dd>
            <dd>${unsafeHTML(this.localize('names:1163'))}</dd>
            <dt>${this.localize('names:1164')}</dt>
            <dd class="type">${this.localize('names:29')}</dd>
            <dd>${unsafeHTML(this.localize('names:1165'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:1166'))}</dd>
            <dt>${this.localize('names:1167')}</dt>
            <dd>${unsafeHTML(this.localize('names:944'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:1168'))}</dd>
            <dt>${this.localize('names:1169')}</dt>
            <dd class="type">${this.localize('names:29')}</dd>
            <dd>${unsafeHTML(this.localize('names:1170'))}</dd>
            <dt>${this.localize('names:1171')}</dt>
            <dd class="type">${this.localize('names:1172')}</dd>
            <dd>${unsafeHTML(this.localize('names:1173'))}</dd>
            <dt>${this.localize('names:1174')}</dt>
            <dd class="type">${this.localize('names:34')}</dd>
            <dd>${unsafeHTML(this.localize('names:35'))}</dd>
            <dt>${this.localize('names:1175')}</dt>
            <dd class="type">${this.localize('names:34')}</dd>
            <dd>${unsafeHTML(this.localize('names:35'))}</dd>
            <dt>${this.localize('names:1176')}</dt>
            <dd class="type">${this.localize('names:34')}</dd>
            <dd>${unsafeHTML(this.localize('names:35'))}</dd>
            <dt>${this.localize('names:1177')}</dt>
            <dd class="type">${this.localize('names:278')}</dd>
            <dd>${unsafeHTML(this.localize('names:1178'))}</dd>
            <dt>${this.localize('names:1176')}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:1179'))}</dd>
            <dd>${unsafeHTML(this.localize('names:1180'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:1181'))}</dd>
            <dt>${this.localize('names:1182')}</dt>
            <dd class="type">${this.localize('names:1183')}</dd>
            <dd>${unsafeHTML(this.localize('names:86'))}</dd>
            <dt>${this.localize('names:1182')}</dt>
            <dd class="type">${this.localize('names:1184')}</dd>
            <dd>${unsafeHTML(this.localize('names:86'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:1185'))}</dd>
            <dt>${this.localize('names:1182')}</dt>
            <dd class="type">${this.localize('names:29')}</dd>
            <dd>${unsafeHTML(this.localize('names:86'))}</dd>
            <dt>${this.localize('names:1186')}</dt>
            <dd class="type">${this.localize('names:457')}</dd>
            <dd>${unsafeHTML(this.localize('names:196'))}</dd>
            <dt>${this.localize('names:1187')}</dt>
            <dd class="type">${this.localize('names:29')}</dd>
            <dd>${unsafeHTML(this.localize('names:1188'))}</dd>
            <dt>${this.localize('names:1189')}</dt>
            <dd class="type">${this.localize('names:918')}</dd>
            <dd>${unsafeHTML(this.localize('names:37'))}</dd>
            <dt>${this.localize('names:1190')}</dt>
            <dd class="type">${this.localize('names:198')}</dd>
            <dd>${unsafeHTML(this.localize('names:37'))}</dd>
            <dt>${this.localize('names:1191')}</dt>
            <dd class="type">${this.localize('names:34')}</dd>
            <dd>${unsafeHTML(this.localize('names:35'))}</dd>
            <dt>${this.localize('names:1191')}</dt>
            <dd class="type">${this.localize('names:1192')}</dd>
            <dd>${unsafeHTML(this.localize('names:1193'))}</dd>
            <dt>${this.localize('names:1194')}</dt>
            <dd class="type">${this.localize('names:34')}</dd>
            <dd>${unsafeHTML(this.localize('names:35'))}</dd>
            <dt>${this.localize('names:1195')}</dt>
            <dd class="type">${this.localize('names:1196')}</dd>
            <dd>${unsafeHTML(this.localize('names:86'))}</dd>
            <dt>${this.localize('names:1195')}</dt>
            <dd>${unsafeHTML(this.localize('names:1197'))}</dd>
            <dt>${this.localize('names:1198')}</dt>
            <dd class="type">${this.localize('names:1199')}</dd>
            <dd>${unsafeHTML(this.localize('names:158'))}</dd>
            <dt>${this.localize('names:1200')}</dt>
            <dd class="type">${this.localize('names:278')}</dd>
            <dd>${unsafeHTML(this.localize('names:1201'))}</dd>
            <dt>${this.localize('names:1200')}</dt>
            <dd class="type">${this.localize('names:1202')}</dd>
            <dd>${unsafeHTML(this.localize('names:86'))}</dd>
            <dt>${this.localize('names:1200')}</dt>
            <dd class="type">${this.localize('names:1203')}</dd>
            <dd>${unsafeHTML(this.localize('names:1204'))}</dd>
            <dt>${this.localize('names:1205')}</dt>
            <dd class="type">${this.localize('names:36')}</dd>
            <dd>${unsafeHTML(this.localize('names:37'))}</dd>
            <dt>${this.localize('names:1206')}</dt>
            <dd class="type">${this.localize('names:29')}</dd>
            <dd>${unsafeHTML(this.localize('names:620'))}</dd>
            <dt>${this.localize('names:1206')}</dt>
            <dd class="type">${this.localize('names:40')}</dd>
            <dd>${unsafeHTML(this.localize('names:128'))}</dd>
            <dt>${this.localize('names:1206')}</dt>
            <dd class="type">${this.localize('names:80')}</dd>
            <dd>${unsafeHTML(this.localize('names:92'))}</dd>
            <dt>${this.localize('names:1207')}</dt>
            <dd class="type">${this.localize('names:34')}</dd>
            <dd>${unsafeHTML(this.localize('names:35'))}</dd>
            <dt>${this.localize('names:1207')}</dt>
            <dd class="type">${this.localize('names:29')}</dd>
            <dd>${unsafeHTML(this.localize('names:1208'))}</dd>
            <dt>${this.localize('names:1209')}</dt>
            <dd>${unsafeHTML(this.localize('names:1210'))}</dd>
            <dt>${this.localize('names:1211')}</dt>
            <dd class="type">${this.localize('names:34')}</dd>
            <dd>${unsafeHTML(this.localize('names:35'))}</dd>
            <dt>${this.localize('names:1211')}</dt>
            <dd class="type">${this.localize('names:120')}</dd>
            <dd>${unsafeHTML(this.localize('names:1121'))}</dd>
            <dt>${this.localize('names:1212')}</dt>
            <dd class="type">${this.localize('names:80')}</dd>
            <dd>${unsafeHTML(this.localize('names:92'))}</dd>
            <dt>${this.localize('names:1213')}</dt>
            <dd class="type">${this.localize('names:29')}</dd>
            <dd>${unsafeHTML(this.localize('names:1214'))}</dd>
            <dt>${this.localize('names:1215')}</dt>
            <dd class="type">${this.localize('names:395')}</dd>
            <dd>${unsafeHTML(this.localize('names:1216'))}</dd>
            <dt>${this.localize('names:1217')}</dt>
            <dd class="type">${this.localize('names:111')}</dd>
            <dd>${unsafeHTML(this.localize('names:979'))}</dd>
            <dt>${this.localize('names:1218')}</dt>
            <dd class="type">${this.localize('names:34')}</dd>
            <dd>${unsafeHTML(this.localize('names:35'))}</dd>
            <dt>${this.localize('names:1219')}</dt>
            <dd class="type">${this.localize('names:29')}</dd>
            <dd>${unsafeHTML(this.localize('names:1220'))}</dd>
            <dt>${this.localize('names:1221')}</dt>
            <dd class="type">${this.localize('names:43')}</dd>
            <dd>${unsafeHTML(this.localize('names:46'))}</dd>
            <dt id="sundarika">${this.localize('names:1222')}</dt>
            <dd class="type">${this.localize('names:29')}</dd>
            <dd>${unsafeHTML(this.localize('names:46'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:1223'))}</dd>
            <dt>${this.localize('names:1224')}</dt>
            <dd class="type">${this.localize('names:141')}</dd>
            <dd>${unsafeHTML(this.localize('names:86'))}</dd>
            <dt>${this.localize('names:1225')}</dt>
            <dd class="type">${this.localize('names:150')}</dd>
            <dd>${unsafeHTML(this.localize('names:618'))}</dd>
            <dt>${this.localize('names:1226')}</dt>
            <dd class="type">${this.localize('names:1227')}</dd>
            <dd>${unsafeHTML(this.localize('names:1228'))}</dd>
            <dt>${this.localize('names:1229')}</dt>
            <dd class="type">${this.localize('names:1230')}</dd>
            <dd>${unsafeHTML(this.localize('names:37'))}</dd>
            <dt>${this.localize('names:1231')}</dt>
            <dd class="type">${this.localize('names:1232')}</dd>
            <dd>${unsafeHTML(this.localize('names:1233'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:1234'))}</dd>
            <dt>${this.localize('names:1235')}</dt>
            <dd class="type">${this.localize('names:80')}</dd>
            <dd>${unsafeHTML(this.localize('names:92'))}</dd>
            <dt>${this.localize('names:1236')}</dt>
            <dd class="type">${this.localize('names:83')}</dd>
            <dd>${unsafeHTML(this.localize('names:188'))}</dd>
            <dt>${this.localize('names:1237')}</dt>
            <dd class="type">${this.localize('names:34')}</dd>
            <dd>${unsafeHTML(this.localize('names:35'))}</dd>
            <dt>${this.localize('names:1238')}</dt>
            <dd class="type">${this.localize('names:29')}</dd>
            <dd>${unsafeHTML(this.localize('names:1239'))}</dd>
            <dt>${this.localize('names:1240')}</dt>
            <dd class="type">${this.localize('names:111')}</dd>
            <dd>${unsafeHTML(this.localize('names:162'))}</dd>
            <dt>${this.localize('names:1241')}</dt>
            <dd class="type">${this.localize('names:150')}</dd>
            <dd>${unsafeHTML(this.localize('names:37'))}</dd>
            <dt>${this.localize('names:1242')}</dt>
            <dd class="type">${this.localize('names:80')}</dd>
            <dd>${unsafeHTML(this.localize('names:92'))}</dd>
            <dt>${this.localize('names:1243')}</dt>
            <dd class="type">${this.localize('names:29')}</dd>
            <dd>${unsafeHTML(this.localize('names:1244'))}</dd>
            <dt>${this.localize('names:1245')}</dt>
            <dd class="type">${this.localize('names:29')}</dd>
            <dd>${unsafeHTML(this.localize('names:1246'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:1247'))}</dd>
            <dt>${this.localize('names:1248')}</dt>
            <dd class="type">${this.localize('names:34')}</dd>
            <dd>${unsafeHTML(this.localize('names:35'))}</dd>
            <dt>${this.localize('names:1249')}</dt>
            <dd class="type">${this.localize('names:29')}</dd>
            <dd>${unsafeHTML(this.localize('names:1250'))}</dd>
            <dt>${this.localize('names:1251')}</dt>
            <dd class="type">${this.localize('names:150')}</dd>
            <dd>${unsafeHTML(this.localize('names:618'))}</dd>
          </dl>
          <h2 id="t">${this.localize('names:1252')}</h2>
          <dl>
            <dt>${this.localize('names:1253')}</dt>
            <dd class="type">${this.localize('names:1254')}</dd>
            <dd>${unsafeHTML(this.localize('names:37'))}</dd>
            <dt>${this.localize('names:1255')}</dt>
            <dd class="type">${this.localize('names:34')}</dd>
            <dd>${unsafeHTML(this.localize('names:35'))}</dd>
            <dt>${this.localize('names:1256')}</dt>
            <dd class="type">${this.localize('names:34')}</dd>
            <dd>${unsafeHTML(this.localize('names:1257'))}</dd>
            <dt>${this.localize('names:1258')}</dt>
            <dd class="type">${this.localize('names:1259')}</dd>
            <dd>${unsafeHTML(this.localize('names:1260'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:1261'))}</dd>
            <dt>${this.localize('names:1262')}</dt>
            <dd class="type">${this.localize('names:1263')}</dd>
            <dd>${unsafeHTML(this.localize('names:1264'))}</dd>
            <dt>${this.localize('names:1265')}</dt>
            <dd>${unsafeHTML(this.localize('names:1266'))}</dd>
            <dt>${this.localize('names:1267')}</dt>
            <dd class="type">${this.localize('names:34')}</dd>
            <dd>${unsafeHTML(this.localize('names:35'))}</dd>
            <dt>${this.localize('names:1268')}</dt>
            <dd class="type">${this.localize('names:80')}</dd>
            <dd>${unsafeHTML(this.localize('names:92'))}</dd>
            <dt>${this.localize('names:1269')}</dt>
            <dd class="type">${this.localize('names:80')}</dd>
            <dd>${unsafeHTML(this.localize('names:92'))}</dd>
            <dt>${this.localize('names:1270')}</dt>
            <dd class="type">${this.localize('names:80')}</dd>
            <dd>${unsafeHTML(this.localize('names:92'))}</dd>
            <dt>${this.localize('names:1271')}</dt>
            <dd class="type">${this.localize('names:80')}</dd>
            <dd>${unsafeHTML(this.localize('names:92'))}</dd>
            <dt>${this.localize('names:1272')}</dt>
            <dd class="type">${this.localize('names:29')}</dd>
            <dd>${unsafeHTML(this.localize('names:1273'))}</dd>
            <dt>${this.localize('names:1274')}</dt>
            <dd class="type">${this.localize('names:83')}</dd>
            <dd>${unsafeHTML(this.localize('names:656'))}</dd>
            <dt>${this.localize('names:1275')}</dt>
            <dd class="type">${this.localize('names:207')}</dd>
            <dd>${unsafeHTML(this.localize('names:1276'))}</dd>
            <dt>${this.localize('names:1277')}</dt>
            <dd class="type">${this.localize('names:150')}</dd>
            <dd>${unsafeHTML(this.localize('names:37'))}</dd>
            <dt>${this.localize('names:1278')}</dt>
            <dd class="type">${this.localize('names:34')}</dd>
            <dd>${unsafeHTML(this.localize('names:35'))}</dd>
            <dt>${this.localize('names:1278')}</dt>
            <dd class="type">${this.localize('names:1279')}</dd>
            <dd>${unsafeHTML(this.localize('names:1280'))}</dd>
            <dt>${this.localize('names:1278')}</dt>
            <dd class="type">${this.localize('names:918')}</dd>
            <dd>${unsafeHTML(this.localize('names:37'))}</dd>
            <dt>${this.localize('names:1281')}</dt>
            <dd class="type">${this.localize('names:60')}</dd>
            <dd>${unsafeHTML(this.localize('names:1282'))}</dd>
            <dt id="todeyya">${this.localize('names:1283')}</dt>
            <dd class="type">${this.localize('names:60')}</dd>
            <dd>${unsafeHTML(this.localize('names:1284'))}</dd>
            <dt>${this.localize('names:1285')}</dt>
            <dd class="type">${this.localize('names:207')}</dd>
            <dd>${unsafeHTML(this.localize('names:622'))}</dd>
            <dt>${this.localize('names:1286')}</dt>
            <dd class="type">${this.localize('names:36')}</dd>
            <dd>${unsafeHTML(this.localize('names:1287'))}</dd>
            <dt>${this.localize('names:1288')}</dt>
            <dd>${unsafeHTML(this.localize('names:86'))}</dd>
          </dl>
          <h2 id="u">${this.localize('names:1289')}</h2>
          <dl>
            <dt id="ubbiri">${this.localize('names:1290')}</dt>
            <dd class="type">${this.localize('names:278')}</dd>
            <dd>${unsafeHTML(this.localize('names:533'))}</dd>
            <dt>${this.localize('names:1291')}</dt>
            <dd class="type">${this.localize('names:34')}</dd>
            <dd>${unsafeHTML(this.localize('names:35'))}</dd>
            <dt>${this.localize('names:1292')}</dt>
            <dd class="type">${this.localize('names:34')}</dd>
            <dd>${unsafeHTML(this.localize('names:35'))}</dd>
            <dt>${this.localize('names:1293')}</dt>
            <dd class="type">${this.localize('names:65')}</dd>
            <dd>${unsafeHTML(this.localize('names:69'))}</dd>
            <dt>${this.localize('names:1294')}</dt>
            <dd class="type">${this.localize('names:60')}</dd>
            <dd>${unsafeHTML(this.localize('names:1295'))}</dd>
            <dt id="udayibhadda">${this.localize('names:1296')}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:1297'))}</dd>
            <dd>${unsafeHTML(this.localize('names:648'))}</dd>
            <dt>${this.localize('names:1298')}</dt>
            <dd class="type">${this.localize('names:1299')}</dd>
            <dd>${unsafeHTML(this.localize('names:1300'))}</dd>
            <dt>${this.localize('names:1301')}</dt>
            <dd class="type">${this.localize('names:1302')}</dd>
            <dd>${unsafeHTML(this.localize('names:1303'))}</dd>
            <dt id="udena">${this.localize('names:1304')}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:1305'))}</dd>
            <dd>${unsafeHTML(this.localize('names:1306'))}</dd>
            <dt>${this.localize('names:1307')}</dt>
            <dd class="type">${this.localize('names:50')}</dd>
            <dd>${unsafeHTML(this.localize('names:86'))}</dd>
            <dt>${this.localize('names:1308')}</dt>
            <dd>${unsafeHTML(this.localize('names:774'))}</dd>
            <dt>${this.localize('names:1309')}</dt>
            <dd>${unsafeHTML(this.localize('names:798'))}</dd>
            <dt>${this.localize('names:1310')}</dt>
            <dd class="type">${this.localize('names:83')}</dd>
            <dd>${unsafeHTML(this.localize('names:1311'))}</dd>
            <dt>${this.localize('names:1312')}</dt>
            <dd class="type">${this.localize('names:141')}</dd>
            <dd>${unsafeHTML(this.localize('names:1313'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:1314'))}</dd>
            <dt>${this.localize('names:1315')}</dt>
            <dd class="type">${this.localize('names:278')}</dd>
            <dd>${unsafeHTML(this.localize('names:1316'))}</dd>
            <dt>${this.localize('names:1317')}</dt>
            <dd class="type">${this.localize('names:1318')}</dd>
            <dd>${unsafeHTML(this.localize('names:1016'))}</dd>
            <dt>${this.localize('names:1319')}</dt>
            <dd class="type">${this.localize('names:34')}</dd>
            <dd>${unsafeHTML(this.localize('names:35'))}</dd>
            <dt>${this.localize('names:1320')}</dt>
            <dd class="type">${this.localize('names:29')}</dd>
            <dd>${unsafeHTML(this.localize('names:1321'))}</dd>
            <dt>${this.localize('names:1322')}</dt>
            <dd class="type">${this.localize('names:34')}</dd>
            <dd>${unsafeHTML(this.localize('names:35'))}</dd>
            <dt>${this.localize('names:1323')}</dt>
            <dd class="type">${this.localize('names:34')}</dd>
            <dd>${unsafeHTML(this.localize('names:35'))}</dd>
            <dt>${this.localize('names:1324')}</dt>
            <dd class="type">${this.localize('names:34')}</dd>
            <dd>${unsafeHTML(this.localize('names:35'))}</dd>
            <dt>${this.localize('names:1325')}</dt>
            <dd class="type">${this.localize('names:34')}</dd>
            <dd>${unsafeHTML(this.localize('names:35'))}</dd>
            <dt>${this.localize('names:1326')}</dt>
            <dd class="type">${this.localize('names:34')}</dd>
            <dd>${unsafeHTML(this.localize('names:35'))}</dd>
            <dt>${this.localize('names:1327')}</dt>
            <dd class="type">${this.localize('names:29')}</dd>
            <dd>${unsafeHTML(this.localize('names:1328'))}</dd>
            <dt>${this.localize('names:1329')}</dt>
            <dd class="type">${this.localize('names:29')}</dd>
            <dd>${unsafeHTML(this.localize('names:1330'))}</dd>
            <dt>${this.localize('names:1331')}</dt>
            <dd class="type">${this.localize('names:34')}</dd>
            <dd>${unsafeHTML(this.localize('names:35'))}</dd>
            <dt>${this.localize('names:1332')}</dt>
            <dd class="type">${this.localize('names:60')}</dd>
            <dd>${unsafeHTML(this.localize('names:1333'))}</dd>
            <dt>${this.localize('names:1334')}</dt>
            <dd class="type">${this.localize('names:34')}</dd>
            <dd>${unsafeHTML(this.localize('names:35'))}</dd>
            <dt>${this.localize('names:1334')}</dt>
            <dd class="type">${this.localize('names:1335')}</dd>
            <dd>${unsafeHTML(this.localize('names:1336'))}</dd>
            <dt>${this.localize('names:1337')}</dt>
            <dd class="type">${this.localize('names:29')}</dd>
            <dd>${unsafeHTML(this.localize('names:86'))}</dd>
            <dt>${this.localize('names:1338')}</dt>
            <dd class="type">${this.localize('names:253')}</dd>
            <dd>${unsafeHTML(this.localize('names:673'))}</dd>
            <dt>${this.localize('names:1339')}</dt>
            <dd class="type">${this.localize('names:34')}</dd>
            <dd>${unsafeHTML(this.localize('names:35'))}</dd>
            <dt>${this.localize('names:1340')}</dt>
            <dd class="type">${this.localize('names:34')}</dd>
            <dd>${unsafeHTML(this.localize('names:35'))}</dd>
            <dt>${this.localize('names:1341')}</dt>
            <dd class="type">${this.localize('names:1342')}</dd>
            <dd>${unsafeHTML(this.localize('names:1343'))}</dd>
            <dt>${this.localize('names:1344')}</dt>
            <dd class="type">${this.localize('names:83')}</dd>
            <dd>${unsafeHTML(this.localize('names:1345'))}</dd>
            <dt>${this.localize('names:1346')}</dt>
            <dd class="type">${this.localize('names:83')}</dd>
            <dd>${unsafeHTML(this.localize('names:1347'))}</dd>
            <dt>${this.localize('names:1348')}</dt>
            <dd class="type">${this.localize('names:34')}</dd>
            <dd>${unsafeHTML(this.localize('names:35'))}</dd>
            <dt>${this.localize('names:1349')}</dt>
            <dd class="type">${this.localize('names:29')}</dd>
            <dd>${unsafeHTML(this.localize('names:378'))}</dd>
            <dt>${this.localize('names:1350')}</dt>
            <dd class="type">${this.localize('names:278')}</dd>
            <dd>${unsafeHTML(this.localize('names:1351'))}</dd>
            <dt>${this.localize('names:1352')}</dt>
            <dd class="type">${this.localize('names:34')}</dd>
            <dd>${unsafeHTML(this.localize('names:35'))}</dd>
            <dt>${this.localize('names:1352')}</dt>
            <dd class="type">${this.localize('names:1353')}</dd>
            <dd>${unsafeHTML(this.localize('names:1354'))}</dd>
            <dt>${this.localize('names:1352')}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:1355'))}</dd>
            <dd>${unsafeHTML(this.localize('names:546'))}</dd>
            <dt>${this.localize('names:1356')}</dt>
            <dd class="type">${this.localize('names:1357')}</dd>
            <dd>${unsafeHTML(this.localize('names:92'))}</dd>
            <dt>${this.localize('names:1358')}</dt>
            <dd class="type">${this.localize('names:301')}</dd>
            <dd>${unsafeHTML(this.localize('names:1359'))}</dd>
          </dl>
          <h2 id="v">${this.localize('names:1360')}</h2>
          <dl>
            <dt>${this.localize('names:1361')}</dt>
            <dd class="type">${this.localize('names:301')}</dd>
            <dd>${unsafeHTML(this.localize('names:1362'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:1363'))}</dd>
            <dt>${this.localize('names:1364')}</dt>
            <dd class="type">${this.localize('names:43')}</dd>
            <dd>${unsafeHTML(this.localize('names:1365'))}</dd>
            <dt>${this.localize('names:1366')}</dt>
            <dd class="type">${this.localize('names:278')}</dd>
            <dd>${unsafeHTML(this.localize('names:1367'))}</dd>
            <dt>${this.localize('names:1368')}</dt>
            <dd class="type">${this.localize('names:80')}</dd>
            <dd>${unsafeHTML(this.localize('names:1369'))}</dd>
            <dt>${this.localize('names:1370')}</dt>
            <dd class="type">${this.localize('names:1371')}</dd>
            <dd></dd>
            <dd>${unsafeHTML(this.localize('names:825'))}</dd>
            <dt>${this.localize('names:1372')}</dt>
            <dd class="type">${this.localize('names:111')}</dd>
            <dd>${unsafeHTML(this.localize('names:1373'))}</dd>
            <dt>${this.localize('names:1374')}</dt>
            <dd class="type">${this.localize('names:617')}</dd>
            <dd>${unsafeHTML(this.localize('names:1375'))}</dd>
            <dt>${this.localize('names:1376')}</dt>
            <dd class="type">${this.localize('names:29')}</dd>
            <dd>${unsafeHTML(this.localize('names:1377'))}</dd>
            <dt>${this.localize('names:1378')}</dt>
            <dd class="type">${this.localize('names:29')}</dd>
            <dd>${unsafeHTML(this.localize('names:1379'))}</dd>
            <dt>${this.localize('names:1380')}</dt>
            <dd class="type">${this.localize('names:114')}</dd>
            <dd>${unsafeHTML(this.localize('names:115'))}</dd>
            <dt>${this.localize('names:1381')}</dt>
            <dd class="type">${this.localize('names:114')}</dd>
            <dd>${unsafeHTML(this.localize('names:115'))}</dd>
            <dt>${this.localize('names:1382')}</dt>
            <dd class="type">${this.localize('names:29')}</dd>
            <dd>${unsafeHTML(this.localize('names:1383'))}</dd>
            <dt>${this.localize('names:1384')}</dt>
            <dd>${unsafeHTML(this.localize('names:1154'))}</dd>
            <dt>${this.localize('names:1385')}</dt>
            <dd class="type">${this.localize('names:1386')}</dd>
            <dd>${unsafeHTML(this.localize('names:1387'))}</dd>
            <dt>${this.localize('names:1388')}</dt>
            <dd class="type">${this.localize('names:111')}</dd>
            <dd>${unsafeHTML(this.localize('names:162'))}</dd>
            <dt id="varanasi">${this.localize('names:1389')}</dt>
            <dd class="type">${this.localize('names:1390')}</dd>
            <dd>${unsafeHTML(this.localize('names:1391'))}</dd>
            <dt>${this.localize('names:1392')}</dt>
            <dd class="type">${this.localize('names:36')}</dd>
            <dd>${unsafeHTML(this.localize('names:37'))}</dd>
            <dt>${this.localize('names:1392')}</dt>
            <dd class="type">${this.localize('names:80')}</dd>
            <dd>${unsafeHTML(this.localize('names:1393'))}</dd>
            <dt>${this.localize('names:1394')}</dt>
            <dd class="type">${this.localize('names:1395')}</dd>
            <dd>${unsafeHTML(this.localize('names:825'))}</dd>
            <dt>${this.localize('names:1396')}</dt>
            <dd class="type">${this.localize('names:150')}</dd>
            <dd>${unsafeHTML(this.localize('names:1397'))}</dd>
            <dt>${this.localize('names:1398')}</dt>
            <dd class="type">${this.localize('names:36')}</dd>
            <dd>${unsafeHTML(this.localize('names:37'))}</dd>
            <dt>${this.localize('names:1399')}</dt>
            <dd class="type">${this.localize('names:150')}</dd>
            <dd>${unsafeHTML(this.localize('names:618'))}</dd>
            <dt>${this.localize('names:1400')}</dt>
            <dd class="type">${this.localize('names:114')}</dd>
            <dd>${unsafeHTML(this.localize('names:115'))}</dd>
            <dt>${this.localize('names:1401')}</dt>
            <dd class="type">${this.localize('names:278')}</dd>
            <dd>${unsafeHTML(this.localize('names:776'))}</dd>
            <dt>${this.localize('names:1402')}</dt>
            <dd>${unsafeHTML(this.localize('names:235'))}</dd>
            <dt>${this.localize('names:1403')}</dt>
            <dd>${unsafeHTML(this.localize('names:1404'))}</dd>
            <dt>${this.localize('names:1405')}</dt>
            <dd class="type">${this.localize('names:34')}</dd>
            <dd>${unsafeHTML(this.localize('names:35'))}</dd>
            <dt>${this.localize('names:1406')}</dt>
            <dd class="type">${this.localize('names:431')}</dd>
            <dd>${unsafeHTML(this.localize('names:1407'))}</dd>
            <dt>${this.localize('names:1408')}</dt>
            <dd class="type">${this.localize('names:1409')}</dd>
            <dd>${unsafeHTML(this.localize('names:560'))}</dd>
            <dt>${this.localize('names:1410')}</dt>
            <dd class="type">${this.localize('names:36')}</dd>
            <dd>${unsafeHTML(this.localize('names:37'))}</dd>
            <dt>${this.localize('names:1411')}</dt>
            <dd class="type">${this.localize('names:65')}</dd>
            <dd>${unsafeHTML(this.localize('names:174'))}</dd>
            <dt>${this.localize('names:1412')}</dt>
            <dd class="type">${this.localize('names:150')}</dd>
            <dd>${unsafeHTML(this.localize('names:37'))}</dd>
            <dt>${this.localize('names:1413')}</dt>
            <dd class="type">${this.localize('names:198')}</dd>
            <dd>${unsafeHTML(this.localize('names:1414'))}</dd>
            <dt>${this.localize('names:1415')}</dt>
            <dd class="type">${this.localize('names:431')}</dd>
            <dd>${unsafeHTML(this.localize('names:1416'))}</dd>
            <dt>${this.localize('names:1417')}</dt>
            <dd class="type">${this.localize('names:1418')}</dd>
            <dd>${unsafeHTML(this.localize('names:1419'))}</dd>
            <dt>${this.localize('names:1420')}</dt>
            <dd class="type">${this.localize('names:1421')}</dd>
            <dd>${unsafeHTML(this.localize('names:1422'))}</dd>
            <dt>${this.localize('names:1423')}</dt>
            <dd class="type">${this.localize('names:198')}</dd>
            <dd>${unsafeHTML(this.localize('names:37'))}</dd>
            <dt>${this.localize('names:1424')}</dt>
            <dd class="type">${this.localize('names:83')}</dd>
            <dd>${unsafeHTML(this.localize('names:1425'))}</dd>
            <dt>${this.localize('names:1426')}</dt>
            <dd class="type">${this.localize('names:1427')}</dd>
            <dd>${unsafeHTML(this.localize('names:92'))}</dd>
            <dt>${this.localize('names:1428')}</dt>
            <dd class="type">${this.localize('names:114')}</dd>
            <dd>${unsafeHTML(this.localize('names:115'))}</dd>
            <dt>${this.localize('names:1428')}</dt>
            <dd class="type">${this.localize('names:80')}</dd>
            <dd>${unsafeHTML(this.localize('names:92'))}</dd>
            <dt>${this.localize('names:1428')}</dt>
            <dd class="type">${this.localize('names:1429')}</dd>
            <dd>${unsafeHTML(this.localize('names:37'))}</dd>
            <dt>${this.localize('names:1430')}</dt>
            <dd class="type">${this.localize('names:655')}</dd>
            <dd>${unsafeHTML(this.localize('names:1431'))}</dd>
            <dt>${this.localize('names:1432')}</dt>
            <dd class="type">${this.localize('names:150')}</dd>
            <dd>${unsafeHTML(this.localize('names:37'))}</dd>
            <dt>${this.localize('names:1433')}</dt>
            <dd class="type">${this.localize('names:1434')}</dd>
            <dd>${unsafeHTML(this.localize('names:86'))}</dd>
            <dt>${this.localize('names:1435')}</dt>
            <dd class="type">${this.localize('names:36')}</dd>
            <dd>${unsafeHTML(this.localize('names:37'))}</dd>
            <dt id="videha">${this.localize('names:1436')}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:1437'))}</dd>
            <dd>${unsafeHTML(this.localize('names:1438'))}</dd>
            <dt>${this.localize('names:1439')}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:1440'))}</dd>
            <dd>${unsafeHTML(this.localize('names:1441'))}</dd>
            <dt>${this.localize('names:1442')}</dt>
            <dd class="type">${this.localize('names:278')}</dd>
            <dd>${unsafeHTML(this.localize('names:1443'))}</dd>
            <dt>${this.localize('names:1444')}</dt>
            <dd class="type">${this.localize('names:34')}</dd>
            <dd>${unsafeHTML(this.localize('names:35'))}</dd>
            <dt>${this.localize('names:1445')}</dt>
            <dd class="type">${this.localize('names:29')}</dd>
            <dd>${unsafeHTML(this.localize('names:1446'))}</dd>
            <dt>${this.localize('names:1447')}</dt>
            <dd class="type">${this.localize('names:34')}</dd>
            <dd>${unsafeHTML(this.localize('names:35'))}</dd>
            <dt>${this.localize('names:1448')}</dt>
            <dd class="type">${this.localize('names:1449')}</dd>
            <dd>${unsafeHTML(this.localize('names:1450'))}</dd>
            <dt>${this.localize('names:1451')}</dt>
            <dd class="type">${this.localize('names:29')}</dd>
            <dd>${unsafeHTML(this.localize('names:1452'))}</dd>
            <dt>${this.localize('names:1453')}</dt>
            <dd class="type">${this.localize('names:1454')}</dd>
            <dd>${unsafeHTML(this.localize('names:92'))}</dd>
            <dt>${this.localize('names:1455')}</dt>
            <dd class="type">${this.localize('names:1456')}</dd>
            <dd>${unsafeHTML(this.localize('names:289'))}</dd>
            <dt>${this.localize('names:1457')}</dt>
            <dd class="type">${this.localize('names:795')}</dd>
            <dd>${unsafeHTML(this.localize('names:1458'))}</dd>
            <dt id="visakha1">${this.localize('names:1459')}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:1460'))}</dd>
            <dd>${unsafeHTML(this.localize('names:1461'))}</dd>
            <dt>${this.localize('names:1462')}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:1463'))}</dd>
            <dd>${unsafeHTML(this.localize('names:363'))}</dd>
            <dt>${this.localize('names:1464')}</dt>
            <dd class="type">${this.localize('names:1465')}</dd>
            <dd>${unsafeHTML(this.localize('names:92'))}</dd>
            <dt>${this.localize('names:1466')}</dt>
            <dd class="type">${this.localize('names:150')}</dd>
            <dd>${unsafeHTML(this.localize('names:37'))}</dd>
            <dt>${this.localize('names:1467')}</dt>
            <dd>${unsafeHTML(this.localize('names:1468'))}</dd>
            <dt>${this.localize('names:1469')}</dt>
            <dd>${unsafeHTML(this.localize('names:1470'))}</dd>
          </dl>
          <h2 id="wxyz">${this.localize('names:1471')}</h2>
          <dl>
            <dt>${this.localize('names:1472')}</dt>
            <dd class="type">${this.localize('names:150')}</dd>
            <dd>${unsafeHTML(this.localize('names:1473'))}</dd>
            <dt>${this.localize('names:1474')}</dt>
            <dd class="type">${this.localize('names:29')}</dd>
            <dd>${unsafeHTML(this.localize('names:1475'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:1476'))}</dd>
            <dt>${this.localize('names:1477')}</dt>
            <dd class="type">${this.localize('names:114')}</dd>
            <dd>${unsafeHTML(this.localize('names:115'))}</dd>
            <dt>${this.localize('names:1478')}</dt>
            <dd class="type">${this.localize('names:43')}</dd>
            <dd>${unsafeHTML(this.localize('names:1479'))}</dd>
            <dt>${this.localize('names:1480')}</dt>
            <dd class="type">${this.localize('names:29')}</dd>
            <dd>${unsafeHTML(this.localize('names:1481'))}</dd>
            <dt>${this.localize('names:1482')}</dt>
            <dd class="type">${this.localize('names:34')}</dd>
            <dd>${unsafeHTML(this.localize('names:35'))}</dd>
            <dt>${this.localize('names:1483')}</dt>
            <dd class="type">${this.localize('names:29')}</dd>
            <dd>${unsafeHTML(this.localize('names:1484'))}</dd>
            <dt>${this.localize('names:1485')}</dt>
            <dd class="type">${this.localize('names:1486')}</dd>
            <dd>${unsafeHTML(this.localize('names:1487'))}</dd>
            <dt>${this.localize('names:1488')}</dt>
            <dd class="type">${this.localize('names:1489')}</dd>
            <dd>${unsafeHTML(this.localize('names:1490'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:1491'))}</dd>
            <dt>${this.localize('names:1492')}</dt>
            <dd class="type">${this.localize('names:80')}</dd>
            <dd>${unsafeHTML(this.localize('names:92'))}</dd>
          </dl>
          <aside class="about-index">
            <p>${unsafeHTML(this.localize('names:1493'))}</p>
            <ul>
              <li>${this.localize('names:1494')}</li>
              <li>${this.localize('names:1495')}</li>
              <li>${this.localize('names:1496')}</li>
              <li>${this.localize('names:1497')}</li>
              <li>${this.localize('names:1498')}</li>
              <li>${unsafeHTML(this.localize('names:1499'))}</li>
            </ul>
            <p>${this.localize('names:1500')}</p>
            <ul>
              <li>${this.localize('names:1501')}</li>
              <li>${this.localize('names:1502')}</li>
              <li>${this.localize('names:1503')}</li>
              <li>${this.localize('names:1504')}</li>
            </ul>
          </aside>
          <aside class="static-copyright">
            <p>${this.localize('names:1505')}</p>
            <blockquote>${unsafeHTML(this.localize('names:1506'))}</blockquote>
            <p>${this.localize('names:1507')}</p>
          </aside>
        </article>
      </main>
    `;
  }

  constructor() {
    super();
    this.localizedStringsPath = '/localization/elements/names';
  }
}

customElements.define('sc-static-names', SCStaticNames);
