import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

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
              <li>${unsafeHTML(this.localize('names:24'))}</li>
              <li>${unsafeHTML(this.localize('names:25'))}</li>
              <li>${unsafeHTML(this.localize('names:26'))}</li>
              <li>${unsafeHTML(this.localize('names:27'))}</li>
              <li>${unsafeHTML(this.localize('names:28'))}</li>
              <li>${unsafeHTML(this.localize('names:29'))}</li>
              <li>${unsafeHTML(this.localize('names:30'))}</li>
              <li>${unsafeHTML(this.localize('names:31'))}</li>
              <li>${unsafeHTML(this.localize('names:32'))}</li>
              <li>${unsafeHTML(this.localize('names:33'))}</li>
              <li>${unsafeHTML(this.localize('names:34'))}</li>
              <li>${unsafeHTML(this.localize('names:35'))}</li>
            </ul>
          </nav>
          <h2 id="a">${this.localize('names:36')}</h2>
          <dl>
            <dt>${this.localize('names:37')}</dt>
            <dd>${unsafeHTML(this.localize('names:38'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:39'))}</dd>
            <dt>${this.localize('names:40')}</dt>
            <dd class="type">${this.localize('names:41')}</dd>
            <dd>${unsafeHTML(this.localize('names:42'))}</dd>
            <dt>${this.localize('names:43')}</dt>
            <dd class="type">${this.localize('names:41')}</dd>
            <dd>${unsafeHTML(this.localize('names:44'))}</dd>
            <dt>${this.localize('names:45')}</dt>
            <dd class="type">${this.localize('names:46')}</dd>
            <dd>${unsafeHTML(this.localize('names:47'))}</dd>
            <dt>${this.localize('names:45')}</dt>
            <dd class="type">${this.localize('names:48')}</dd>
            <dd>${unsafeHTML(this.localize('names:49'))}</dd>
            <dt>${this.localize('names:50')}</dt>
            <dd class="type">${this.localize('names:46')}</dd>
            <dd>${unsafeHTML(this.localize('names:47'))}</dd>
            <dt>${this.localize('names:51')}</dt>
            <dd class="type">${this.localize('names:52')}</dd>
            <dd>${unsafeHTML(this.localize('names:53'))}</dd>
            <dt>${this.localize('names:54')}</dt>
            <dd class="type">${this.localize('names:55')}</dd>
            <dd>${unsafeHTML(this.localize('names:56'))}</dd>
            <dt>${this.localize('names:57')}</dt>
            <dd class="type">${this.localize('names:55')}</dd>
            <dd>${unsafeHTML(this.localize('names:58'))}</dd>
            <dt>${this.localize('names:59')}</dt>
            <dd class="type">${this.localize('names:41')}</dd>
            <dd>${unsafeHTML(this.localize('names:60'))}</dd>
            <dt>${this.localize('names:61')}</dt>
            <dd class="type">${this.localize('names:62')}</dd>
            <dd>${unsafeHTML(this.localize('names:63'))}</dd>
            <dt>${this.localize('names:64')}</dt>
            <dd class="type">${this.localize('names:65')}</dd>
            <dd>${unsafeHTML(this.localize('names:66'))}</dd>
            <dt id="ajatasattu">${this.localize('names:67')}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:68'))}</dd>
            <dd>${unsafeHTML(this.localize('names:69'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:70'))}</dd>
            <dt>${this.localize('names:71')}</dt>
            <dd class="type">${this.localize('names:72')}</dd>
            <dd>${unsafeHTML(this.localize('names:73'))}</dd>
            <dt>${this.localize('names:74')}</dt>
            <dd>${unsafeHTML(this.localize('names:75'))}</dd>
            <dt>${this.localize('names:76')}</dt>
            <dd class="type">${this.localize('names:77')}</dd>
            <dd>${unsafeHTML(this.localize('names:78'))}</dd>
            <dt id="akasa">${this.localize('names:79')}</dt>
            <dd class="type">${this.localize('names:80')}</dd>
            <dd>${unsafeHTML(this.localize('names:81'))}</dd>
            <dt id="akkosaka">${this.localize('names:82')}</dt>
            <dd class="type">${this.localize('names:41')}</dd>
            <dd>${unsafeHTML(this.localize('names:83'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:84'))}</dd>
            <dt>${this.localize('names:85')}</dt>
            <dd class="type">${this.localize('names:86')}</dd>
            <dd>${unsafeHTML(this.localize('names:87'))}</dd>
            <dt>${this.localize('names:88')}</dt>
            <dd class="type">${this.localize('names:89')}</dd>
            <dd>${unsafeHTML(this.localize('names:90'))}</dd>
            <dt>${this.localize('names:91')}</dt>
            <dd class="type">${this.localize('names:92')}</dd>
            <dd>${unsafeHTML(this.localize('names:93'))}</dd>
            <dt>${this.localize('names:94')}</dt>
            <dd class="type">${this.localize('names:95')}</dd>
            <dd>${unsafeHTML(this.localize('names:96'))}</dd>
            <dt>${this.localize('names:97')}</dt>
            <dd class="type">${this.localize('names:95')}</dd>
            <dd>${unsafeHTML(this.localize('names:98'))}</dd>
            <dt>${this.localize('names:99')}</dt>
            <dd class="type">${this.localize('names:95')}</dd>
            <dd>${unsafeHTML(this.localize('names:98'))}</dd>
            <dt>${this.localize('names:100')}</dt>
            <dd class="type">${this.localize('names:101')}</dd>
            <dd>${unsafeHTML(this.localize('names:102'))}</dd>
            <dt>${this.localize('names:103')}</dt>
            <dd class="type">${this.localize('names:86')}</dd>
            <dd>${unsafeHTML(this.localize('names:104'))}</dd>
            <dt>${this.localize('names:105')}</dt>
            <dd class="type">${this.localize('names:106')}</dd>
            <dd>${unsafeHTML(this.localize('names:107'))}</dd>
            <dt>${this.localize('names:108')}</dt>
            <dd class="type">${this.localize('names:46')}</dd>
            <dd>${unsafeHTML(this.localize('names:47'))}</dd>
            <dt id="ananda">${this.localize('names:108')}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:109'))}</dd>
            <dd>${unsafeHTML(this.localize('names:110'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:111'))}</dd>
            <dt>${this.localize('names:112')}</dt>
            <dd class="type">${this.localize('names:46')}</dd>
            <dd>${unsafeHTML(this.localize('names:47'))}</dd>
            <dt id="anathapindika">${this.localize('names:113')}</dt>
            <dd class="type">${this.localize('names:114')}</dd>
            <dd>${unsafeHTML(this.localize('names:115'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:116'))}</dd>
            <dt id="anathapindika-park">${this.localize('names:117')}</dt>
            <dd>${unsafeHTML(this.localize('names:118'))}</dd>
            <dt>${this.localize('names:119')}</dt>
            <dd class="type">${this.localize('names:95')}</dd>
            <dd>${unsafeHTML(this.localize('names:120'))}</dd>
            <dt>${this.localize('names:121')}</dt>
            <dd class="type">${this.localize('names:48')}</dd>
            <dd>${unsafeHTML(this.localize('names:49'))}</dd>
            <dt>${this.localize('names:122')}</dt>
            <dd class="type">${this.localize('names:46')}</dd>
            <dd>${unsafeHTML(this.localize('names:47'))}</dd>
            <dt>${this.localize('names:122')}</dt>
            <dd class="type">${this.localize('names:123')}</dd>
            <dd>${unsafeHTML(this.localize('names:124'))}</dd>
            <dt>${this.localize('names:125')}</dt>
            <dd class="type">${this.localize('names:126')}</dd>
            <dd>${unsafeHTML(this.localize('names:127'))}</dd>
            <dt>${this.localize('names:128')}</dt>
            <dd class="type">${this.localize('names:129')}</dd>
            <dd>${unsafeHTML(this.localize('names:130'))}</dd>
            <dt>${this.localize('names:131')}</dt>
            <dd class="type">${this.localize('names:132')}</dd>
            <dd>${unsafeHTML(this.localize('names:133'))}</dd>
            <dt>${this.localize('names:134')}</dt>
            <dd class="type">${this.localize('names:46')}</dd>
            <dd>${unsafeHTML(this.localize('names:47'))}</dd>
            <dt>${this.localize('names:135')}</dt>
            <dd class="type">${this.localize('names:136')}</dd>
            <dd>${unsafeHTML(this.localize('names:137'))}</dd>
            <dt>${this.localize('names:138')}</dt>
            <dd class="type">${this.localize('names:139')}</dd>
            <dd>${unsafeHTML(this.localize('names:140'))}</dd>
            <dt>${this.localize('names:141')}</dt>
            <dd class="type">${this.localize('names:95')}</dd>
            <dd>${unsafeHTML(this.localize('names:142'))}</dd>
            <dt>${this.localize('names:143')}</dt>
            <dd class="type">${this.localize('names:41')}</dd>
            <dd>${unsafeHTML(this.localize('names:144'))}</dd>
            <dt id="anuruddha">${this.localize('names:145')}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:146'))}</dd>
            <dd>${unsafeHTML(this.localize('names:147'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:148'))}</dd>
            <dt>${this.localize('names:149')}</dt>
            <dd class="type">${this.localize('names:150')}</dd>
            <dd>${unsafeHTML(this.localize('names:133'))}</dd>
            <dt>${this.localize('names:151')}</dt>
            <dd class="type">${this.localize('names:46')}</dd>
            <dd>${unsafeHTML(this.localize('names:47'))}</dd>
            <dt>${this.localize('names:152')}</dt>
            <dd class="type">${this.localize('names:153')}</dd>
            <dd>${unsafeHTML(this.localize('names:154'))}</dd>
            <dt>${this.localize('names:155')}</dt>
            <dd class="type">${this.localize('names:48')}</dd>
            <dd>${unsafeHTML(this.localize('names:49'))}</dd>
            <dt>${this.localize('names:156')}</dt>
            <dd>${unsafeHTML(this.localize('names:157'))}</dd>
            <dt>${this.localize('names:158')}</dt>
            <dd class="type">${this.localize('names:41')}</dd>
            <dd>${unsafeHTML(this.localize('names:159'))}</dd>
            <dt>${this.localize('names:158')}</dt>
            <dd class="type">${this.localize('names:46')}</dd>
            <dd>${unsafeHTML(this.localize('names:47'))}</dd>
            <dt>${this.localize('names:158')}</dt>
            <dd class="type">${this.localize('names:92')}</dd>
            <dd>${unsafeHTML(this.localize('names:104'))}</dd>
            <dt>${this.localize('names:160')}</dt>
            <dd class="type">${this.localize('names:46')}</dd>
            <dd>${unsafeHTML(this.localize('names:47'))}</dd>
            <dt>${this.localize('names:161')}</dt>
            <dd class="type">${this.localize('names:162')}</dd>
            <dd>${unsafeHTML(this.localize('names:49'))}</dd>
            <dt>${this.localize('names:163')}</dt>
            <dd class="type">${this.localize('names:46')}</dd>
            <dd>${unsafeHTML(this.localize('names:47'))}</dd>
            <dt>${this.localize('names:164')}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:165'))}</dd>
            <dd>${unsafeHTML(this.localize('names:166'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:167'))}</dd>
            <dt>${this.localize('names:168')}</dt>
            <dd class="type">${this.localize('names:46')}</dd>
            <dd>${unsafeHTML(this.localize('names:47'))}</dd>
            <dt>${this.localize('names:168')}</dt>
            <dd class="type">${this.localize('names:169')}</dd>
            <dd>${unsafeHTML(this.localize('names:170'))}</dd>
            <dt>${this.localize('names:171')}</dt>
            <dd class="type">${this.localize('names:41')}</dd>
            <dd>${unsafeHTML(this.localize('names:172'))}</dd>
            <dt>${this.localize('names:173')}</dt>
            <dd class="type">${this.localize('names:123')}</dd>
            <dd>${unsafeHTML(this.localize('names:174'))}</dd>
            <dt>${this.localize('names:175')}</dt>
            <dd class="type">${this.localize('names:153')}</dd>
            <dd>${unsafeHTML(this.localize('names:176'))}</dd>
            <dt>${this.localize('names:177')}</dt>
            <dd class="type">${this.localize('names:77')}</dd>
            <dd>${unsafeHTML(this.localize('names:178'))}</dd>
            <dt>${this.localize('names:179')}</dt>
            <dd class="type">${this.localize('names:95')}</dd>
            <dd>${unsafeHTML(this.localize('names:49'))}</dd>
            <dt>${this.localize('names:180')}</dt>
            <dd class="type">${this.localize('names:181')}</dd>
            <dd>${unsafeHTML(this.localize('names:182'))}</dd>
            <dt>${this.localize('names:183')}</dt>
            <dd class="type">${this.localize('names:86')}</dd>
            <dd>${unsafeHTML(this.localize('names:104'))}</dd>
            <dt>${this.localize('names:184')}</dt>
            <dd class="type">${this.localize('names:46')}</dd>
            <dd>${unsafeHTML(this.localize('names:47'))}</dd>
            <dt>${this.localize('names:184')}</dt>
            <dd class="type">${this.localize('names:126')}</dd>
            <dd>${unsafeHTML(this.localize('names:127'))}</dd>
            <dt>${this.localize('names:185')}</dt>
            <dd class="type">${this.localize('names:77')}</dd>
            <dd>${unsafeHTML(this.localize('names:186'))}</dd>
            <dt>${this.localize('names:187')}</dt>
            <dd class="type">${this.localize('names:46')}</dd>
            <dd>${unsafeHTML(this.localize('names:47'))}</dd>
            <dt>${this.localize('names:188')}</dt>
            <dd>${unsafeHTML(this.localize('names:189'))}</dd>
            <dt>${this.localize('names:190')}</dt>
            <dd class="type">${this.localize('names:123')}</dd>
            <dd>${unsafeHTML(this.localize('names:191'))}</dd>
            <dt>${this.localize('names:192')}</dt>
            <dd class="type">${this.localize('names:193')}</dd>
            <dd>${unsafeHTML(this.localize('names:194'))}</dd>
            <dt>${this.localize('names:195')}</dt>
            <dd class="type">${this.localize('names:132')}</dd>
            <dd>${unsafeHTML(this.localize('names:196'))}</dd>
          </dl>
          <h2 id="b">${this.localize('names:197')}</h2>
          <dl>
            <dt>${this.localize('names:198')}</dt>
            <dd class="type">${this.localize('names:199')}</dd>
            <dd>${unsafeHTML(this.localize('names:200'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:201'))}</dd>
            <dt>${this.localize('names:202')}</dt>
            <dd class="type">${this.localize('names:55')}</dd>
            <dd>${unsafeHTML(this.localize('names:58'))}</dd>
            <dt>${this.localize('names:203')}</dt>
            <dd class="type">${this.localize('names:55')}</dd>
            <dd>${unsafeHTML(this.localize('names:58'))}</dd>
            <dt>${this.localize('names:204')}</dt>
            <dd class="type">${this.localize('names:41')}</dd>
            <dd>${unsafeHTML(this.localize('names:205'))}</dd>
            <dt>${this.localize('names:206')}</dt>
            <dd class="type">${this.localize('names:62')}</dd>
            <dd>${unsafeHTML(this.localize('names:98'))}</dd>
            <dt>${this.localize('names:207')}</dt>
            <dd>${unsafeHTML(this.localize('names:208'))}</dd>
            <dt>${this.localize('names:209')}</dt>
            <dd class="type">${this.localize('names:210')}</dd>
            <dd>${unsafeHTML(this.localize('names:49'))}</dd>
            <dt>${this.localize('names:211')}</dt>
            <dd class="type">${this.localize('names:46')}</dd>
            <dd>${unsafeHTML(this.localize('names:47'))}</dd>
            <dt>${this.localize('names:212')}</dt>
            <dd>${unsafeHTML(this.localize('names:213'))}</dd>
            <dt>${this.localize('names:214')}</dt>
            <dd>${unsafeHTML(this.localize('names:215'))}</dd>
            <dt>${this.localize('names:216')}</dt>
            <dd class="type">${this.localize('names:41')}</dd>
            <dd>${unsafeHTML(this.localize('names:217'))}</dd>
            <dt>${this.localize('names:218')}</dt>
            <dd class="type">${this.localize('names:219')}</dd>
            <dd>${unsafeHTML(this.localize('names:98'))}</dd>
            <dt>${this.localize('names:220')}</dt>
            <dd>${unsafeHTML(this.localize('names:98'))}</dd>
            <dt id="bhadda">${this.localize('names:221')}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:222'))}</dd>
            <dd>${unsafeHTML(this.localize('names:223'))}</dd>
            <dt>${this.localize('names:224')}</dt>
            <dd class="type">${this.localize('names:225')}</dd>
            <dd>${unsafeHTML(this.localize('names:226'))}</dd>
            <dt id="bhaddiya">${this.localize('names:227')}</dt>
            <dd class="type">${this.localize('names:41')}</dd>
            <dd>${unsafeHTML(this.localize('names:228'))}</dd>
            <dt>${this.localize('names:229')}</dt>
            <dd class="type">${this.localize('names:41')}</dd>
            <dd>${unsafeHTML(this.localize('names:230'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:231'))}</dd>
            <dt>${this.localize('names:232')}</dt>
            <dd>${unsafeHTML(this.localize('names:233'))}</dd>
            <dt>${this.localize('names:234')}</dt>
            <dd class="type">${this.localize('names:72')}</dd>
            <dd>${unsafeHTML(this.localize('names:235'))}</dd>
            <dt>${this.localize('names:236')}</dt>
            <dd class="type">${this.localize('names:132')}</dd>
            <dd>${unsafeHTML(this.localize('names:237'))}</dd>
            <dt>${this.localize('names:238')}</dt>
            <dd class="type">${this.localize('names:239')}</dd>
            <dd>${unsafeHTML(this.localize('names:240'))}</dd>
            <dt>${this.localize('names:241')}</dt>
            <dd class="type">${this.localize('names:126')}</dd>
            <dd>${unsafeHTML(this.localize('names:127'))}</dd>
            <dt>${this.localize('names:242')}</dt>
            <dd class="type">${this.localize('names:41')}</dd>
            <dd>${unsafeHTML(this.localize('names:243'))}</dd>
            <dt>${this.localize('names:244')}</dt>
            <dd class="type">${this.localize('names:219')}</dd>
            <dd>${unsafeHTML(this.localize('names:245'))}</dd>
            <dt>${this.localize('names:246')}</dt>
            <dd>${unsafeHTML(this.localize('names:247'))}</dd>
            <dt>${this.localize('names:248')}</dt>
            <dd class="type">${this.localize('names:46')}</dd>
            <dd>${unsafeHTML(this.localize('names:47'))}</dd>
            <dt>${this.localize('names:249')}</dt>
            <dd>${unsafeHTML(this.localize('names:250'))}</dd>
            <dt>${this.localize('names:251')}</dt>
            <dd>${unsafeHTML(this.localize('names:252'))}</dd>
            <dt>${this.localize('names:253')}</dt>
            <dd>${unsafeHTML(this.localize('names:254'))}</dd>
            <dt>${this.localize('names:255')}</dt>
            <dd>${unsafeHTML(this.localize('names:256'))}</dd>
            <dt>${this.localize('names:257')}</dt>
            <dd>${unsafeHTML(this.localize('names:258'))}</dd>
            <dt>${this.localize('names:259')}</dt>
            <dd>${unsafeHTML(this.localize('names:260'))}</dd>
            <dt>${this.localize('names:248')}</dt>
            <dd class="type">${this.localize('names:261')}</dd>
            <dd>${unsafeHTML(this.localize('names:127'))}</dd>
            <dt>${this.localize('names:248')}</dt>
            <dd class="type">${this.localize('names:80')}</dd>
            <dd>${unsafeHTML(this.localize('names:262'))}</dd>
            <dt>${this.localize('names:248')}</dt>
            <dd class="type">${this.localize('names:92')}</dd>
            <dd>${unsafeHTML(this.localize('names:104'))}</dd>
            <dt>${this.localize('names:263')}</dt>
            <dd class="type">${this.localize('names:46')}</dd>
            <dd>${unsafeHTML(this.localize('names:47'))}</dd>
            <dt>${this.localize('names:264')}</dt>
            <dd class="type">${this.localize('names:265')}</dd>
            <dd>${unsafeHTML(this.localize('names:266'))}</dd>
            <dt>${this.localize('names:267')}</dt>
            <dd class="type">${this.localize('names:95')}</dd>
            <dd>${unsafeHTML(this.localize('names:98'))}</dd>
            <dt>${this.localize('names:268')}</dt>
            <dd class="type">${this.localize('names:269')}</dd>
            <dd>${unsafeHTML(this.localize('names:270'))}</dd>
            <dt>${this.localize('names:271')}</dt>
            <dd class="type">${this.localize('names:41')}</dd>
            <dd>${unsafeHTML(this.localize('names:272'))}</dd>
            <dt>${this.localize('names:273')}</dt>
            <dd class="type">${this.localize('names:41')}</dd>
            <dd>${unsafeHTML(this.localize('names:274'))}</dd>
            <dt>${unsafeHTML(this.localize('names:275'))}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:276'))}</dd>
            <dd>${unsafeHTML(this.localize('names:277'))}</dd>
            <dt>${this.localize('names:278')}</dt>
            <dd class="type">${this.localize('names:46')}</dd>
            <dd>${unsafeHTML(this.localize('names:47'))}</dd>
            <dt>${this.localize('names:279')}</dt>
            <dd>${unsafeHTML(this.localize('names:280'))}</dd>
            <dt>${this.localize('names:281')}</dt>
            <dd class="type">${this.localize('names:41')}</dd>
            <dd>${unsafeHTML(this.localize('names:282'))}</dd>
            <dt>${this.localize('names:281')}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:283'))}</dd>
            <dd>${unsafeHTML(this.localize('names:284'))}</dd>
            <dt>${this.localize('names:285')}</dt>
            <dd class="type">${this.localize('names:80')}</dd>
            <dd>${unsafeHTML(this.localize('names:98'))}</dd>
          </dl>
          <h2 id="c">${this.localize('names:286')}</h2>
          <dl>
            <dt>${this.localize('names:287')}</dt>
            <dd class="type">${this.localize('names:41')}</dd>
            <dd>${unsafeHTML(this.localize('names:288'))}</dd>
            <dt>${this.localize('names:289')}</dt>
            <dd class="type">${this.localize('names:290')}</dd>
            <dd>${unsafeHTML(this.localize('names:291'))}</dd>
            <dt>${this.localize('names:292')}</dt>
            <dd class="type">${this.localize('names:293')}</dd>
            <dd>${unsafeHTML(this.localize('names:294'))}</dd>
            <dt>${this.localize('names:295')}</dt>
            <dd class="type">${this.localize('names:95')}</dd>
            <dd>${unsafeHTML(this.localize('names:296'))}</dd>
            <dt>${this.localize('names:297')}</dt>
            <dd class="type">${this.localize('names:298')}</dd>
            <dd>${unsafeHTML(this.localize('names:299'))}</dd>
            <dt>${this.localize('names:300')}</dt>
            <dd class="type">${this.localize('names:162')}</dd>
            <dd>${unsafeHTML(this.localize('names:301'))}</dd>
            <dt>${this.localize('names:302')}</dt>
            <dd class="type">${this.localize('names:153')}</dd>
            <dd>${unsafeHTML(this.localize('names:303'))}</dd>
            <dt>${this.localize('names:304')}</dt>
            <dd class="type">${this.localize('names:62')}</dd>
            <dd>${unsafeHTML(this.localize('names:98'))}</dd>
            <dt>${this.localize('names:305')}</dt>
            <dd class="type">${this.localize('names:132')}</dd>
            <dd>${unsafeHTML(this.localize('names:306'))}</dd>
            <dt>${this.localize('names:307')}</dt>
            <dd class="type">${this.localize('names:308')}</dd>
            <dd>${unsafeHTML(this.localize('names:309'))}</dd>
            <dt>${this.localize('names:310')}</dt>
            <dd class="type">${this.localize('names:311')}</dd>
            <dd>${unsafeHTML(this.localize('names:312'))}</dd>
            <dt>${this.localize('names:310')}</dt>
            <dd class="type">${this.localize('names:313')}</dd>
            <dd>${unsafeHTML(this.localize('names:314'))}</dd>
            <dt id="ciravasi">${this.localize('names:315')}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:316'))}</dd>
            <dd>${unsafeHTML(this.localize('names:317'))}</dd>
            <dt>${this.localize('names:318')}</dt>
            <dd class="type">${this.localize('names:319')}</dd>
            <dd>${unsafeHTML(this.localize('names:49'))}</dd>
            <dt>${this.localize('names:320')}</dt>
            <dd>${unsafeHTML(this.localize('names:321'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:322'))}</dd>
            <dt>${this.localize('names:323')}</dt>
            <dd class="type">${this.localize('names:324')}</dd>
            <dd>${unsafeHTML(this.localize('names:325'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:326'))}</dd>
            <dt>${this.localize('names:327')}</dt>
            <dd class="type">${this.localize('names:41')}</dd>
            <dd>${unsafeHTML(this.localize('names:328'))}</dd>
            <dt>${this.localize('names:329')}</dt>
            <dd class="type">${this.localize('names:162')}</dd>
            <dd>${unsafeHTML(this.localize('names:301'))}</dd>
            <dt>${this.localize('names:330')}</dt>
            <dd>${unsafeHTML(this.localize('names:331'))}</dd>
            <dt>${this.localize('names:332')}</dt>
            <dd class="type">${this.localize('names:41')}</dd>
            <dd>${unsafeHTML(this.localize('names:333'))}</dd>
            <dt>${this.localize('names:334')}</dt>
            <dd class="type">${this.localize('names:41')}</dd>
            <dd>${unsafeHTML(this.localize('names:335'))}</dd>
            <dt>${this.localize('names:336')}</dt>
            <dd class="type">${this.localize('names:337')}</dd>
            <dd>${unsafeHTML(this.localize('names:338'))}</dd>
            <dt>${this.localize('names:336')}</dt>
            <dd class="type">${this.localize('names:339')}</dd>
            <dd>${unsafeHTML(this.localize('names:340'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:341'))}</dd>
            <dt>${this.localize('names:342')}</dt>
            <dd>${unsafeHTML(this.localize('names:343'))}</dd>
            <dt>${this.localize('names:344')}</dt>
            <dd class="type">${this.localize('names:41')}</dd>
            <dd>${unsafeHTML(this.localize('names:98'))}</dd>
          </dl>
          <h2 id="d">${this.localize('names:345')}</h2>
          <dl>
            <dt>${this.localize('names:346')}</dt>
            <dd class="type">${this.localize('names:41')}</dd>
            <dd>${unsafeHTML(this.localize('names:347'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:348'))}</dd>
            <dt>${this.localize('names:349')}</dt>
            <dd class="type">${this.localize('names:46')}</dd>
            <dd>${unsafeHTML(this.localize('names:47'))}</dd>
            <dt>${this.localize('names:350')}</dt>
            <dd class="type">${this.localize('names:92')}</dd>
            <dd>${unsafeHTML(this.localize('names:104'))}</dd>
            <dt>${this.localize('names:351')}</dt>
            <dd class="type">${this.localize('names:77')}</dd>
            <dd>${unsafeHTML(this.localize('names:352'))}</dd>
            <dt>${this.localize('names:353')}</dt>
            <dd>${unsafeHTML(this.localize('names:354'))}</dd>
            <dt>${this.localize('names:355')}</dt>
            <dd class="type">${this.localize('names:290')}</dd>
            <dd>${unsafeHTML(this.localize('names:356'))}</dd>
            <dt>${this.localize('names:357')}</dt>
            <dd class="type">${this.localize('names:41')}</dd>
            <dd>${unsafeHTML(this.localize('names:358'))}</dd>
            <dt>${this.localize('names:359')}</dt>
            <dd class="type">${this.localize('names:360')}</dd>
            <dd>${unsafeHTML(this.localize('names:186'))}</dd>
            <dt>${this.localize('names:361')}</dt>
            <dd class="type">${this.localize('names:132')}</dd>
            <dd>${unsafeHTML(this.localize('names:362'))}</dd>
            <dt>${this.localize('names:363')}</dt>
            <dd class="type">${this.localize('names:77')}</dd>
            <dd>${unsafeHTML(this.localize('names:364'))}</dd>
            <dt>${this.localize('names:365')}</dt>
            <dd class="type">${this.localize('names:366')}</dd>
            <dd>${unsafeHTML(this.localize('names:367'))}</dd>
            <dt>${this.localize('names:368')}</dt>
            <dd class="type">${this.localize('names:369')}</dd>
            <dd>${unsafeHTML(this.localize('names:176'))}</dd>
            <dt>${this.localize('names:370')}</dt>
            <dd class="type">${this.localize('names:92')}</dd>
            <dd>${unsafeHTML(this.localize('names:104'))}</dd>
            <dt>${this.localize('names:371')}</dt>
            <dd class="type">${this.localize('names:290')}</dd>
            <dd>${unsafeHTML(this.localize('names:372'))}</dd>
            <dt id="dhammadinna">${this.localize('names:373')}</dt>
            <dd class="type">${this.localize('names:374')}</dd>
            <dd>${unsafeHTML(this.localize('names:375'))}</dd>
            <dt>${this.localize('names:376')}</dt>
            <dd class="type">${this.localize('names:41')}</dd>
            <dd>${unsafeHTML(this.localize('names:377'))}</dd>
            <dt>${this.localize('names:376')}</dt>
            <dd>${unsafeHTML(this.localize('names:378'))}</dd>
            <dt>${this.localize('names:379')}</dt>
            <dd class="type">${this.localize('names:153')}</dd>
            <dd>${unsafeHTML(this.localize('names:380'))}</dd>
            <dt>${this.localize('names:381')}</dt>
            <dd class="type">${this.localize('names:382')}</dd>
            <dd>${unsafeHTML(this.localize('names:383'))}</dd>
            <dt>${this.localize('names:384')}</dt>
            <dd class="type">${this.localize('names:139')}</dd>
            <dd>${unsafeHTML(this.localize('names:104'))}</dd>
            <dt>${this.localize('names:385')}</dt>
            <dd class="type">${this.localize('names:386')}</dd>
            <dd>${unsafeHTML(this.localize('names:387'))}</dd>
            <dt>${this.localize('names:385')}</dt>
            <dd class="type">${this.localize('names:388')}</dd>
            <dd>${unsafeHTML(this.localize('names:49'))}</dd>
            <dt>${this.localize('names:389')}</dt>
            <dd class="type">${this.localize('names:77')}</dd>
            <dd>${unsafeHTML(this.localize('names:390'))}</dd>
            <dt>${this.localize('names:391')}</dt>
            <dd class="type">${this.localize('names:72')}</dd>
            <dd>${unsafeHTML(this.localize('names:392'))}</dd>
            <dt id="dighajanu">${this.localize('names:393')}</dt>
            <dd class="type">${this.localize('names:394')}</dd>
            <dd>${unsafeHTML(this.localize('names:395'))}</dd>
            <dt id="dighavu">${this.localize('names:396')}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:397'))}</dd>
            <dd>${unsafeHTML(this.localize('names:284'))}</dd>
            <dt>${this.localize('names:398')}</dt>
            <dd class="type">${this.localize('names:399')}</dd>
            <dd>${unsafeHTML(this.localize('names:400'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:401'))}</dd>
            <dt id="dighiti">${this.localize('names:402')}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:403'))}</dd>
            <dd>${unsafeHTML(this.localize('names:284'))}</dd>
            <dt>${this.localize('names:404')}</dt>
            <dd class="type">${this.localize('names:153')}</dd>
            <dd>${unsafeHTML(this.localize('names:405'))}</dd>
            <dt>${this.localize('names:406')}</dt>
            <dd class="type">${this.localize('names:407')}</dd>
            <dd>${unsafeHTML(this.localize('names:408'))}</dd>
            <dt>${this.localize('names:409')}</dt>
            <dd class="type">${this.localize('names:46')}</dd>
            <dd>${unsafeHTML(this.localize('names:47'))}</dd>
          </dl>
          <h2 id="e">${this.localize('names:410')}</h2>
          <dl>
            <dt>${this.localize('names:411')}</dt>
            <dd class="type">${this.localize('names:219')}</dd>
            <dd>${unsafeHTML(this.localize('names:412'))}</dd>
            <dt>${this.localize('names:413')}</dt>
            <dd class="type">${this.localize('names:41')}</dd>
            <dd>${unsafeHTML(this.localize('names:414'))}</dd>
            <dt>${this.localize('names:415')}</dt>
            <dd class="type">${this.localize('names:41')}</dd>
            <dd>${unsafeHTML(this.localize('names:416'))}</dd>
            <dt>${this.localize('names:417')}</dt>
            <dd class="type">${this.localize('names:308')}</dd>
            <dd>${unsafeHTML(this.localize('names:309'))}</dd>
            <dt>${this.localize('names:418')}</dt>
            <dd class="type">${this.localize('names:388')}</dd>
            <dd>${unsafeHTML(this.localize('names:49'))}</dd>
          </dl>
          <h2 id="f">${this.localize('names:419')}</h2>
          <dl>
            <dt>${this.localize('names:420')}</dt>
            <dd class="type">${this.localize('names:421')}</dd>
            <dd>${unsafeHTML(this.localize('names:422'))}</dd>
          </dl>
          <h2 id="g">${this.localize('names:423')}</h2>
          <dl>
            <dt>${this.localize('names:424')}</dt>
            <dd class="type">${this.localize('names:80')}</dd>
            <dd>${unsafeHTML(this.localize('names:425'))}</dd>
            <dt>${this.localize('names:426')}</dt>
            <dd class="type">${this.localize('names:139')}</dd>
            <dd>${unsafeHTML(this.localize('names:427'))}</dd>
            <dt>${this.localize('names:428')}</dt>
            <dd class="type">${this.localize('names:153')}</dd>
            <dd>${unsafeHTML(this.localize('names:429'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:430'))}</dd>
            <dt id="gandhabhaka">${this.localize('names:431')}</dt>
            <dd class="type">${this.localize('names:432')}</dd>
            <dd>${unsafeHTML(this.localize('names:317'))}</dd>
            <dt>${this.localize('names:433')}</dt>
            <dd class="type">${this.localize('names:46')}</dd>
            <dd>${unsafeHTML(this.localize('names:47'))}</dd>
            <dt>${this.localize('names:433')}</dt>
            <dd class="type">${this.localize('names:123')}</dd>
            <dd>${unsafeHTML(this.localize('names:174'))}</dd>
            <dt>${this.localize('names:434')}</dt>
            <dd class="type">${this.localize('names:435')}</dd>
            <dd>${unsafeHTML(this.localize('names:436'))}</dd>
            <dt>${this.localize('names:437')}</dt>
            <dd class="type">${this.localize('names:41')}</dd>
            <dd>${unsafeHTML(this.localize('names:438'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:439'))}</dd>
            <dt>${this.localize('names:440')}</dt>
            <dd class="type">${this.localize('names:95')}</dd>
            <dd>${unsafeHTML(this.localize('names:441'))}</dd>
            <dt>${this.localize('names:440')}</dt>
            <dd class="type">${this.localize('names:55')}</dd>
            <dd>${unsafeHTML(this.localize('names:58'))}</dd>
            <dt>${this.localize('names:442')}</dt>
            <dd class="type">${this.localize('names:443')}</dd>
            <dd>${unsafeHTML(this.localize('names:444'))}</dd>
            <dt>${this.localize('names:445')}</dt>
            <dd class="type">${this.localize('names:446')}</dd>
            <dd>${unsafeHTML(this.localize('names:447'))}</dd>
            <dt>${this.localize('names:448')}</dt>
            <dd>${unsafeHTML(this.localize('names:449'))}</dd>
            <dt>${this.localize('names:450')}</dt>
            <dd class="type">${this.localize('names:443')}</dd>
            <dd>${unsafeHTML(this.localize('names:47'))}</dd>
            <dt>${this.localize('names:451')}</dt>
            <dd class="type">${this.localize('names:452')}</dd>
            <dd>${unsafeHTML(this.localize('names:453'))}</dd>
            <dt>${this.localize('names:454')}</dt>
            <dd class="type">${this.localize('names:41')}</dd>
            <dd>${unsafeHTML(this.localize('names:455'))}</dd>
            <dt>${this.localize('names:456')}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:457'))}</dd>
            <dd>${unsafeHTML(this.localize('names:458'))}</dd>
            <dt>${this.localize('names:459')}</dt>
            <dd class="type">${this.localize('names:92')}</dd>
            <dd>${unsafeHTML(this.localize('names:104'))}</dd>
            <dt>${this.localize('names:460')}</dt>
            <dd class="type">${this.localize('names:41')}</dd>
            <dd>${unsafeHTML(this.localize('names:461'))}</dd>
            <dt>${this.localize('names:462')}</dt>
            <dd class="type">${this.localize('names:41')}</dd>
            <dd>${unsafeHTML(this.localize('names:463'))}</dd>
            <dt>${this.localize('names:464')}</dt>
            <dd class="type">${this.localize('names:308')}</dd>
            <dd>${unsafeHTML(this.localize('names:309'))}</dd>
            <dt>${this.localize('names:465')}</dt>
            <dd class="type">${this.localize('names:62')}</dd>
            <dd>${unsafeHTML(this.localize('names:466'))}</dd>
            <dt>${this.localize('names:467')}</dt>
            <dd class="type">${this.localize('names:92')}</dd>
            <dd>${unsafeHTML(this.localize('names:104'))}</dd>
            <dt>${this.localize('names:468')}</dt>
            <dd class="type">${this.localize('names:469')}</dd>
            <dd>${unsafeHTML(this.localize('names:470'))}</dd>
            <dt>${this.localize('names:471')}</dt>
            <dd class="type">${this.localize('names:46')}</dd>
            <dd>${unsafeHTML(this.localize('names:47'))}</dd>
            <dt>${this.localize('names:472')}</dt>
            <dd class="type">${this.localize('names:290')}</dd>
            <dd>${unsafeHTML(this.localize('names:473'))}</dd>
          </dl>
          <h2 id="h">${this.localize('names:474')}</h2>
          <dl>
            <dt>${this.localize('names:475')}</dt>
            <dd>${unsafeHTML(this.localize('names:476'))}</dd>
            <dt>${this.localize('names:477')}</dt>
            <dd class="type">${this.localize('names:77')}</dd>
            <dd>${unsafeHTML(this.localize('names:478'))}</dd>
            <dt>${this.localize('names:479')}</dt>
            <dd class="type">${this.localize('names:48')}</dd>
            <dd>${unsafeHTML(this.localize('names:49'))}</dd>
            <dt>${this.localize('names:480')}</dt>
            <dd class="type">${this.localize('names:41')}</dd>
            <dd>${unsafeHTML(this.localize('names:481'))}</dd>
            <dt>${this.localize('names:482')}</dt>
            <dd class="type">${this.localize('names:483')}</dd>
            <dd>${unsafeHTML(this.localize('names:484'))}</dd>
            <dt>${this.localize('names:485')}</dt>
            <dd class="type">${this.localize('names:219')}</dd>
            <dd>${unsafeHTML(this.localize('names:98'))}</dd>
            <dt>${this.localize('names:486')}</dt>
            <dd class="type">${this.localize('names:72')}</dd>
            <dd>${unsafeHTML(this.localize('names:487'))}</dd>
            <dt>${this.localize('names:488')}</dt>
            <dd class="type">${this.localize('names:92')}</dd>
            <dd>${unsafeHTML(this.localize('names:104'))}</dd>
            <dt>${this.localize('names:489')}</dt>
            <dd class="type">${this.localize('names:452')}</dd>
            <dd>${unsafeHTML(this.localize('names:490'))}</dd>
            <dt>${this.localize('names:491')}</dt>
            <dd class="type">${this.localize('names:46')}</dd>
            <dd>${unsafeHTML(this.localize('names:47'))}</dd>
            <dt>${this.localize('names:492')}</dt>
            <dd class="type">${this.localize('names:55')}</dd>
            <dd>${unsafeHTML(this.localize('names:98'))}</dd>
            <dt>${this.localize('names:493')}</dt>
            <dd class="type">${this.localize('names:92')}</dd>
            <dd>${unsafeHTML(this.localize('names:104'))}</dd>
          </dl>
          <h2 id="i">${this.localize('names:494')}</h2>
          <dl>
            <dt>${this.localize('names:495')}</dt>
            <dd class="type">${this.localize('names:219')}</dd>
            <dd>${unsafeHTML(this.localize('names:496'))}</dd>
            <dt>${this.localize('names:497')}</dt>
            <dd class="type">${this.localize('names:498')}</dd>
            <dd>${unsafeHTML(this.localize('names:104'))}</dd>
            <dt>${this.localize('names:499')}</dt>
            <dd class="type">${this.localize('names:162')}</dd>
            <dd>${unsafeHTML(this.localize('names:500'))}</dd>
            <dt>${this.localize('names:501')}</dt>
            <dd class="type">${this.localize('names:502')}</dd>
            <dd>${unsafeHTML(this.localize('names:503'))}</dd>
            <dt>${this.localize('names:504')}</dt>
            <dd class="type">${this.localize('names:41')}</dd>
            <dd>${unsafeHTML(this.localize('names:505'))}</dd>
            <dt>${this.localize('names:506')}</dt>
            <dd class="type">${this.localize('names:443')}</dd>
            <dd>${unsafeHTML(this.localize('names:507'))}</dd>
            <dt>${this.localize('names:508')}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:509'))}</dd>
            <dd>${unsafeHTML(this.localize('names:510'))}</dd>
          </dl>
          <h2 id="j">${this.localize('names:511')}</h2>
          <dl>
            <dt id="jains">${this.localize('names:512')}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:513'))}</dd>
            <dd>${unsafeHTML(this.localize('names:174'))}</dd>
            <dt>${this.localize('names:514')}</dt>
            <dd class="type">${this.localize('names:46')}</dd>
            <dd>${unsafeHTML(this.localize('names:47'))}</dd>
            <dt>${this.localize('names:515')}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:516'))}</dd>
            <dd>${unsafeHTML(this.localize('names:517'))}</dd>
            <dt>${this.localize('names:518')}</dt>
            <dd class="type">${this.localize('names:92')}</dd>
            <dd>${unsafeHTML(this.localize('names:104'))}</dd>
            <dt>${this.localize('names:519')}</dt>
            <dd class="type">${this.localize('names:86')}</dd>
            <dd>${unsafeHTML(this.localize('names:104'))}</dd>
            <dt>${this.localize('names:520')}</dt>
            <dd class="type">${this.localize('names:219')}</dd>
            <dd>${unsafeHTML(this.localize('names:294'))}</dd>
            <dt>${this.localize('names:521')}</dt>
            <dd class="type">${this.localize('names:153')}</dd>
            <dd>${unsafeHTML(this.localize('names:522'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:523'))}</dd>
            <dt id="jata">${this.localize('names:524')}</dt>
            <dd>${unsafeHTML(this.localize('names:525'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:526'))}</dd>
            <dt>${this.localize('names:527')}</dt>
            <dd class="type">${this.localize('names:290')}</dd>
            <dd>${unsafeHTML(this.localize('names:528'))}</dd>
            <dt>${this.localize('names:529')}</dt>
            <dd class="type">${this.localize('names:72')}</dd>
            <dd>${unsafeHTML(this.localize('names:530'))}</dd>
            <dt>${this.localize('names:531')}</dt>
            <dd class="type">${this.localize('names:46')}</dd>
            <dd>${unsafeHTML(this.localize('names:47'))}</dd>
            <dt>${this.localize('names:532')}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:533'))}</dd>
            <dd>${unsafeHTML(this.localize('names:534'))}</dd>
            <dt>${this.localize('names:535')}</dt>
            <dd class="type">${this.localize('names:536')}</dd>
            <dd>${unsafeHTML(this.localize('names:537'))}</dd>
            <dt>${this.localize('names:538')}</dt>
            <dd class="type">${this.localize('names:46')}</dd>
            <dd>${unsafeHTML(this.localize('names:47'))}</dd>
            <dt>${this.localize('names:539')}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:540'))}</dd>
            <dd>${unsafeHTML(this.localize('names:541'))}</dd>
            <dt>${this.localize('names:542')}</dt>
            <dd class="type">${this.localize('names:46')}</dd>
            <dd>${unsafeHTML(this.localize('names:47'))}</dd>
            <dt>${this.localize('names:543')}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:544'))}</dd>
            <dd>${unsafeHTML(this.localize('names:545'))}</dd>
            <dt>${this.localize('names:546')}</dt>
            <dd>${unsafeHTML(this.localize('names:547'))}</dd>
            <dt>${this.localize('names:548')}</dt>
            <dd class="type">${this.localize('names:41')}</dd>
            <dd>${unsafeHTML(this.localize('names:549'))}</dd>
            <dt>${this.localize('names:550')}</dt>
            <dd class="type">${this.localize('names:48')}</dd>
            <dd>${unsafeHTML(this.localize('names:49'))}</dd>
          </dl>
          <h2 id="k">${this.localize('names:551')}</h2>
          <dl>
            <dt>${this.localize('names:552')}</dt>
            <dd class="type">${this.localize('names:553')}</dd>
            <dd>${unsafeHTML(this.localize('names:554'))}</dd>
            <dt>${this.localize('names:555')}</dt>
            <dd class="type">${this.localize('names:41')}</dd>
            <dd>${unsafeHTML(this.localize('names:556'))}</dd>
            <dt>${this.localize('names:557')}</dt>
            <dd class="type">${this.localize('names:132')}</dd>
            <dd>${unsafeHTML(this.localize('names:558'))}</dd>
            <dt>${this.localize('names:559')}</dt>
            <dd>${unsafeHTML(this.localize('names:395'))}</dd>
            <dt>${this.localize('names:560')}</dt>
            <dd class="type">${this.localize('names:561')}</dd>
            <dd>${unsafeHTML(this.localize('names:104'))}</dd>
            <dt>${this.localize('names:562')}</dt>
            <dd class="type">${this.localize('names:55')}</dd>
            <dd>${unsafeHTML(this.localize('names:98'))}</dd>
            <dt>${this.localize('names:563')}</dt>
            <dd class="type">${this.localize('names:46')}</dd>
            <dd>${unsafeHTML(this.localize('names:47'))}</dd>
            <dt>${this.localize('names:564')}</dt>
            <dd class="type">${this.localize('names:446')}</dd>
            <dd>${unsafeHTML(this.localize('names:447'))}</dd>
            <dt>${this.localize('names:565')}</dt>
            <dd class="type">${this.localize('names:566')}</dd>
            <dd>${unsafeHTML(this.localize('names:49'))}</dd>
            <dt>${this.localize('names:567')}</dt>
            <dd class="type">${this.localize('names:568')}</dd>
            <dd>${unsafeHTML(this.localize('names:569'))}</dd>
            <dt>${this.localize('names:570')}</dt>
            <dd class="type">${this.localize('names:571')}</dd>
            <dd>${unsafeHTML(this.localize('names:572'))}</dd>
            <dt>${this.localize('names:573')}</dt>
            <dd>${unsafeHTML(this.localize('names:98'))}</dd>
            <dt>${this.localize('names:574')}</dt>
            <dd class="type">${this.localize('names:95')}</dd>
            <dd>${unsafeHTML(this.localize('names:575'))}</dd>
            <dt>${this.localize('names:576')}</dt>
            <dd class="type">${this.localize('names:41')}</dd>
            <dd>${unsafeHTML(this.localize('names:577'))}</dd>
            <dt>${this.localize('names:578')}</dt>
            <dd class="type">${this.localize('names:162')}</dd>
            <dd>${unsafeHTML(this.localize('names:579'))}</dd>
            <dt>${this.localize('names:580')}</dt>
            <dd class="type">${this.localize('names:92')}</dd>
            <dd>${unsafeHTML(this.localize('names:104'))}</dd>
            <dt>${this.localize('names:581')}</dt>
            <dd class="type">${this.localize('names:95')}</dd>
            <dd>${unsafeHTML(this.localize('names:49'))}</dd>
            <dt>${this.localize('names:582')}</dt>
            <dd class="type">${this.localize('names:123')}</dd>
            <dd>${unsafeHTML(this.localize('names:174'))}</dd>
            <dt>${this.localize('names:583')}</dt>
            <dd class="type">${this.localize('names:77')}</dd>
            <dd>${unsafeHTML(this.localize('names:584'))}</dd>
            <dt>${this.localize('names:585')}</dt>
            <dd class="type">${this.localize('names:46')}</dd>
            <dd>${unsafeHTML(this.localize('names:47'))}</dd>
            <dt>${this.localize('names:586')}</dt>
            <dd class="type">${this.localize('names:41')}</dd>
            <dd>${unsafeHTML(this.localize('names:587'))}</dd>
            <dt>${unsafeHTML(this.localize('names:588'))}</dt>
            <dd class="type">${this.localize('names:589')}</dd>
            <dd>${unsafeHTML(this.localize('names:590'))}</dd>
            <dt>${this.localize('names:591')}</dt>
            <dd class="type">${this.localize('names:592')}</dd>
            <dd>${unsafeHTML(this.localize('names:81'))}</dd>
            <dt>${this.localize('names:593')}</dt>
            <dd class="type">${this.localize('names:594')}</dd>
            <dd>${unsafeHTML(this.localize('names:303'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:595'))}</dd>
            <dt>${this.localize('names:596')}</dt>
            <dd class="type">${this.localize('names:86')}</dd>
            <dd>${unsafeHTML(this.localize('names:104'))}</dd>
            <dt>${this.localize('names:597')}</dt>
            <dd class="type">${this.localize('names:95')}</dd>
            <dd>${unsafeHTML(this.localize('names:598'))}</dd>
            <dt>${this.localize('names:599')}</dt>
            <dd class="type">${this.localize('names:72')}</dd>
            <dd>${unsafeHTML(this.localize('names:600'))}</dd>
            <dt>${this.localize('names:599')}</dt>
            <dd class="type">${this.localize('names:41')}</dd>
            <dd>${unsafeHTML(this.localize('names:601'))}</dd>
            <dt>${this.localize('names:602')}</dt>
            <dd class="type">${this.localize('names:41')}</dd>
            <dd>${unsafeHTML(this.localize('names:603'))}</dd>
            <dt>${this.localize('names:604')}</dt>
            <dd class="type">${this.localize('names:469')}</dd>
            <dd>${unsafeHTML(this.localize('names:328'))}</dd>
            <dt>${this.localize('names:605')}</dt>
            <dd class="type">${this.localize('names:92')}</dd>
            <dd>${unsafeHTML(this.localize('names:104'))}</dd>
            <dt id="kasi">${this.localize('names:606')}</dt>
            <dd class="type">${this.localize('names:123')}</dd>
            <dd>${unsafeHTML(this.localize('names:607'))}</dd>
            <dt id="kasibharadvaja">${this.localize('names:608')}</dt>
            <dd class="type">${this.localize('names:153')}</dd>
            <dd>${unsafeHTML(this.localize('names:412'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:609'))}</dd>
            <dt>${this.localize('names:610')}</dt>
            <dd class="type">${this.localize('names:611')}</dd>
            <dd>${unsafeHTML(this.localize('names:612'))}</dd>
            <dt>${this.localize('names:610')}</dt>
            <dd class="type">${this.localize('names:126')}</dd>
            <dd>${unsafeHTML(this.localize('names:127'))}</dd>
            <dt>${unsafeHTML(this.localize('names:613'))}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:614'))}</dd>
            <dd>${unsafeHTML(this.localize('names:615'))}</dd>
            <dt>${this.localize('names:610')}</dt>
            <dd class="type">${this.localize('names:616')}</dd>
            <dd>${unsafeHTML(this.localize('names:617'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:618'))}</dd>
            <dt>${this.localize('names:619')}</dt>
            <dd>${unsafeHTML(this.localize('names:98'))}</dd>
            <dt>${this.localize('names:620')}</dt>
            <dd class="type">${this.localize('names:48')}</dd>
            <dd>${unsafeHTML(this.localize('names:49'))}</dd>
            <dt>${this.localize('names:621')}</dt>
            <dd class="type">${this.localize('names:95')}</dd>
            <dd>${unsafeHTML(this.localize('names:569'))}</dd>
            <dt>${this.localize('names:622')}</dt>
            <dd class="type">${this.localize('names:46')}</dd>
            <dd>${unsafeHTML(this.localize('names:47'))}</dd>
            <dt>${this.localize('names:622')}</dt>
            <dd class="type">${this.localize('names:623')}</dd>
            <dd>${unsafeHTML(this.localize('names:624'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:625'))}</dd>
            <dt>${this.localize('names:626')}</dt>
            <dd class="type">${this.localize('names:46')}</dd>
            <dd>${unsafeHTML(this.localize('names:47'))}</dd>
            <dt>${this.localize('names:627')}</dt>
            <dd class="type">${this.localize('names:46')}</dd>
            <dd>${unsafeHTML(this.localize('names:47'))}</dd>
            <dt>${this.localize('names:628')}</dt>
            <dd class="type">${this.localize('names:629')}</dd>
            <dd>${unsafeHTML(this.localize('names:630'))}</dd>
            <dt>${this.localize('names:631')}</dt>
            <dd class="type">${this.localize('names:41')}</dd>
            <dd>${unsafeHTML(this.localize('names:632'))}</dd>
            <dt>${this.localize('names:633')}</dt>
            <dd class="type">${this.localize('names:290')}</dd>
            <dd>${unsafeHTML(this.localize('names:634'))}</dd>
            <dt>${this.localize('names:635')}</dt>
            <dd class="type">${this.localize('names:46')}</dd>
            <dd>${unsafeHTML(this.localize('names:47'))}</dd>
            <dt>${this.localize('names:636')}</dt>
            <dd class="type">${this.localize('names:41')}</dd>
            <dd>${unsafeHTML(this.localize('names:358'))}</dd>
            <dt>${this.localize('names:637')}</dt>
            <dd class="type">${this.localize('names:48')}</dd>
            <dd>${unsafeHTML(this.localize('names:49'))}</dd>
            <dt>${this.localize('names:638')}</dt>
            <dd class="type">${this.localize('names:41')}</dd>
            <dd>${unsafeHTML(this.localize('names:639'))}</dd>
            <dt>${this.localize('names:640')}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:641'))}</dd>
            <dt>${this.localize('names:642')}</dt>
            <dd class="type">${this.localize('names:41')}</dd>
            <dd>${unsafeHTML(this.localize('names:643'))}</dd>
            <dt>${this.localize('names:644')}</dt>
            <dd class="type">${this.localize('names:55')}</dd>
            <dd>${unsafeHTML(this.localize('names:294'))}</dd>
            <dt>${this.localize('names:645')}</dt>
            <dd class="type">${this.localize('names:41')}</dd>
            <dd>${unsafeHTML(this.localize('names:646'))}</dd>
            <dt>${this.localize('names:647')}</dt>
            <dd class="type">${this.localize('names:162')}</dd>
            <dd>${unsafeHTML(this.localize('names:301'))}</dd>
            <dt>${this.localize('names:648')}</dt>
            <dd class="type">${this.localize('names:290')}</dd>
            <dd>${unsafeHTML(this.localize('names:649'))}</dd>
            <dt>${this.localize('names:650')}</dt>
            <dd class="type">${this.localize('names:77')}</dd>
            <dd>${unsafeHTML(this.localize('names:651'))}</dd>
            <dt>${this.localize('names:652')}</dt>
            <dd class="type">${this.localize('names:313')}</dd>
            <dd>${unsafeHTML(this.localize('names:653'))}</dd>
            <dt>${this.localize('names:654')}</dt>
            <dd class="type">${this.localize('names:655')}</dd>
            <dd>${unsafeHTML(this.localize('names:656'))}</dd>
            <dt>${this.localize('names:657')}</dt>
            <dd class="type">${this.localize('names:80')}</dd>
            <dd>${unsafeHTML(this.localize('names:658'))}</dd>
            <dt>${this.localize('names:659')}</dt>
            <dd>${unsafeHTML(this.localize('names:660'))}</dd>
            <dt>${this.localize('names:661')}</dt>
            <dd class="type">${this.localize('names:662')}</dd>
            <dd>${unsafeHTML(this.localize('names:104'))}</dd>
            <dt>${this.localize('names:663')}</dt>
            <dd class="type">${this.localize('names:41')}</dd>
            <dd>${unsafeHTML(this.localize('names:664'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:665'))}</dd>
            <dt>${this.localize('names:666')}</dt>
            <dd class="type">${this.localize('names:667')}</dd>
            <dd>${unsafeHTML(this.localize('names:668'))}</dd>
            <dt>${this.localize('names:669')}</dt>
            <dd class="type">${this.localize('names:46')}</dd>
            <dd>${unsafeHTML(this.localize('names:47'))}</dd>
            <dt id="kosala">${this.localize('names:669')}</dt>
            <dd class="type">${this.localize('names:123')}</dd>
            <dd>${unsafeHTML(this.localize('names:670'))}</dd>
            <dt id="kosambi">${this.localize('names:671')}</dt>
            <dd>${unsafeHTML(this.localize('names:672'))}</dd>
            <dt>${this.localize('names:673')}</dt>
            <dd class="type">${this.localize('names:219')}</dd>
            <dd>${unsafeHTML(this.localize('names:98'))}</dd>
            <dt>${this.localize('names:674')}</dt>
            <dd class="type">${this.localize('names:41')}</dd>
            <dd>${unsafeHTML(this.localize('names:675'))}</dd>
            <dt>${this.localize('names:676')}</dt>
            <dd class="type">${this.localize('names:677')}</dd>
            <dd>${unsafeHTML(this.localize('names:186'))}</dd>
            <dt>${this.localize('names:678')}</dt>
            <dd class="type">${this.localize('names:162')}</dd>
            <dd>${unsafeHTML(this.localize('names:49'))}</dd>
            <dt>${this.localize('names:679')}</dt>
            <dd class="type">${this.localize('names:123')}</dd>
            <dd>${unsafeHTML(this.localize('names:680'))}</dd>
            <dt id="kusavati">${this.localize('names:681')}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:682'))}</dd>
            <dd>${unsafeHTML(this.localize('names:98'))}</dd>
            <dt id="kusinara">${this.localize('names:683')}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:684'))}</dd>
            <dd>${unsafeHTML(this.localize('names:685'))}</dd>
            <dt>${this.localize('names:686')}</dt>
            <dd class="type">${this.localize('names:86')}</dd>
            <dd>${unsafeHTML(this.localize('names:104'))}</dd>
            <dt>${this.localize('names:687')}</dt>
            <dd class="type">${this.localize('names:41')}</dd>
            <dd>${unsafeHTML(this.localize('names:688'))}</dd>
            <dt>${this.localize('names:689')}</dt>
            <dd class="type">${this.localize('names:502')}</dd>
            <dd>${unsafeHTML(this.localize('names:301'))}</dd>
          </dl>
          <h2 id="l">${this.localize('names:690')}</h2>
          <dl>
            <dt>${this.localize('names:691')}</dt>
            <dd class="type">${this.localize('names:48')}</dd>
            <dd>${unsafeHTML(this.localize('names:49'))}</dd>
            <dt>${this.localize('names:692')}</dt>
            <dd class="type">${this.localize('names:48')}</dd>
            <dd>${unsafeHTML(this.localize('names:49'))}</dd>
            <dt id="licchavi">${this.localize('names:693')}</dt>
            <dd class="type">${this.localize('names:80')}</dd>
            <dd>${unsafeHTML(this.localize('names:694'))}</dd>
            <dt>${this.localize('names:695')}</dt>
            <dd class="type">${this.localize('names:153')}</dd>
            <dd>${unsafeHTML(this.localize('names:696'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:697'))}</dd>
            <dt>${this.localize('names:698')}</dt>
            <dd class="type">${this.localize('names:46')}</dd>
            <dd>${unsafeHTML(this.localize('names:47'))}</dd>
            <dt>${this.localize('names:699')}</dt>
            <dd class="type">${this.localize('names:700')}</dd>
            <dd>${unsafeHTML(this.localize('names:170'))}</dd>
          </dl>
          <h2 id="m">${this.localize('names:701')}</h2>
          <dl>
            <dt>${this.localize('names:702')}</dt>
            <dd class="type">${this.localize('names:123')}</dd>
            <dd>${unsafeHTML(this.localize('names:174'))}</dd>
            <dt>${this.localize('names:703')}</dt>
            <dd class="type">${this.localize('names:95')}</dd>
            <dd>${unsafeHTML(this.localize('names:704'))}</dd>
            <dt>${this.localize('names:705')}</dt>
            <dd class="type">${this.localize('names:706')}</dd>
            <dd>${unsafeHTML(this.localize('names:707'))}</dd>
            <dt id="magadha">${this.localize('names:708')}</dt>
            <dd class="type">${this.localize('names:123')}</dd>
            <dd>${unsafeHTML(this.localize('names:709'))}</dd>
            <dt>${this.localize('names:710')}</dt>
            <dd class="type">${this.localize('names:77')}</dd>
            <dd>${unsafeHTML(this.localize('names:470'))}</dd>
            <dt>${this.localize('names:711')}</dt>
            <dd class="type">${this.localize('names:313')}</dd>
            <dd>${unsafeHTML(this.localize('names:712'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:713'))}</dd>
            <dt>${this.localize('names:714')}</dt>
            <dd class="type">${this.localize('names:41')}</dd>
            <dd>${unsafeHTML(this.localize('names:715'))}</dd>
            <dt>${this.localize('names:716')}</dt>
            <dd class="type">${this.localize('names:41')}</dd>
            <dd>${unsafeHTML(this.localize('names:717'))}</dd>
            <dt>${this.localize('names:718')}</dt>
            <dd>${unsafeHTML(this.localize('names:719'))}</dd>
            <dt>${this.localize('names:720')}</dt>
            <dd class="type">${this.localize('names:46')}</dd>
            <dd>${unsafeHTML(this.localize('names:47'))}</dd>
            <dt>${this.localize('names:721')}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:722'))}</dd>
            <dd>${unsafeHTML(this.localize('names:723'))}</dd>
            <dt>${this.localize('names:724')}</dt>
            <dd class="type">${this.localize('names:725')}</dd>
            <dd>${unsafeHTML(this.localize('names:726'))}</dd>
            <dt>${this.localize('names:727')}</dt>
            <dd class="type">${this.localize('names:667')}</dd>
            <dd>${unsafeHTML(this.localize('names:98'))}</dd>
            <dt>${this.localize('names:728')}</dt>
            <dd class="type">${this.localize('names:55')}</dd>
            <dd>${unsafeHTML(this.localize('names:56'))}</dd>
            <dt>${this.localize('names:729')}</dt>
            <dd class="type">${this.localize('names:730')}</dd>
            <dd>${unsafeHTML(this.localize('names:390'))}</dd>
            <dt>${this.localize('names:731')}</dt>
            <dd>${unsafeHTML(this.localize('names:137'))}</dd>
            <dt>${this.localize('names:732')}</dt>
            <dd class="type">${this.localize('names:733')}</dd>
            <dd>${unsafeHTML(this.localize('names:75'))}</dd>
            <dt>${this.localize('names:734')}</dt>
            <dd class="type">${this.localize('names:735')}</dd>
            <dd>${unsafeHTML(this.localize('names:98'))}</dd>
            <dt>${this.localize('names:736')}</dt>
            <dd class="type">${this.localize('names:80')}</dd>
            <dd>${unsafeHTML(this.localize('names:737'))}</dd>
            <dt>${this.localize('names:738')}</dt>
            <dd class="type">${this.localize('names:739')}</dd>
            <dd>${unsafeHTML(this.localize('names:740'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:741'))}</dd>
            <dt>${this.localize('names:742')}</dt>
            <dd class="type">${this.localize('names:41')}</dd>
            <dd>${unsafeHTML(this.localize('names:743'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:744'))}</dd>
            <dt>${this.localize('names:745')}</dt>
            <dd class="type">${this.localize('names:46')}</dd>
            <dd>${unsafeHTML(this.localize('names:47'))}</dd>
            <dt>${this.localize('names:746')}</dt>
            <dd class="type">${this.localize('names:92')}</dd>
            <dd>${unsafeHTML(this.localize('names:104'))}</dd>
            <dt>${this.localize('names:747')}</dt>
            <dd class="type">${this.localize('names:46')}</dd>
            <dd>${unsafeHTML(this.localize('names:47'))}</dd>
            <dt>${this.localize('names:748')}</dt>
            <dd>${unsafeHTML(this.localize('names:749'))}</dd>
            <dt>${this.localize('names:750')}</dt>
            <dd class="type">${this.localize('names:46')}</dd>
            <dd>${unsafeHTML(this.localize('names:47'))}</dd>
            <dt>${this.localize('names:751')}</dt>
            <dd class="type">${this.localize('names:752')}</dd>
            <dd>${unsafeHTML(this.localize('names:425'))}</dd>
            <dt>${this.localize('names:753')}</dt>
            <dd class="type">${this.localize('names:48')}</dd>
            <dd>${unsafeHTML(this.localize('names:49'))}</dd>
            <dt id="mara">${this.localize('names:754')}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:755'))}</dd>
            <dd>${unsafeHTML(this.localize('names:756'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:757'))}</dd>
            <dt>${this.localize('names:758')}</dt>
            <dd class="type">${this.localize('names:92')}</dd>
            <dd>${unsafeHTML(this.localize('names:759'))}</dd>
            <dt>${this.localize('names:760')}</dt>
            <dd class="type">${this.localize('names:46')}</dd>
            <dd>${unsafeHTML(this.localize('names:47'))}</dd>
            <dt>${this.localize('names:760')}</dt>
            <dd class="type">${this.localize('names:761')}</dd>
            <dd>${unsafeHTML(this.localize('names:762'))}</dd>
            <dt>${this.localize('names:763')}</dt>
            <dd class="type">${this.localize('names:41')}</dd>
            <dd>${unsafeHTML(this.localize('names:764'))}</dd>
            <dt>${this.localize('names:765')}</dt>
            <dd class="type">${this.localize('names:162')}</dd>
            <dd>${unsafeHTML(this.localize('names:49'))}</dd>
            <dt id="medakathalika">${this.localize('names:766')}</dt>
            <dd class="type">${this.localize('names:767')}</dd>
            <dd>${unsafeHTML(this.localize('names:768'))}</dd>
            <dt>${this.localize('names:769')}</dt>
            <dd class="type">${this.localize('names:46')}</dd>
            <dd>${unsafeHTML(this.localize('names:47'))}</dd>
            <dt>${this.localize('names:770')}</dt>
            <dd class="type">${this.localize('names:41')}</dd>
            <dd>${unsafeHTML(this.localize('names:294'))}</dd>
            <dt>${this.localize('names:771')}</dt>
            <dd class="type">${this.localize('names:443')}</dd>
            <dd>${unsafeHTML(this.localize('names:772'))}</dd>
            <dt>${this.localize('names:773')}</dt>
            <dd class="type">${this.localize('names:46')}</dd>
            <dd>${unsafeHTML(this.localize('names:47'))}</dd>
            <dt>${this.localize('names:774')}</dt>
            <dd class="type">${this.localize('names:72')}</dd>
            <dd>${unsafeHTML(this.localize('names:775'))}</dd>
            <dt>${this.localize('names:776')}</dt>
            <dd class="type">${this.localize('names:777')}</dd>
            <dd>${unsafeHTML(this.localize('names:668'))}</dd>
            <dt>${this.localize('names:778')}</dt>
            <dd class="type">${this.localize('names:41')}</dd>
            <dd>${unsafeHTML(this.localize('names:779'))}</dd>
            <dt id="migara">${this.localize('names:780')}</dt>
            <dd>${unsafeHTML(this.localize('names:781'))}</dd>
            <dt id="migaramom">${this.localize('names:782')}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:783'))}</dd>
            <dd>${unsafeHTML(this.localize('names:784'))}</dd>
            <dt>${this.localize('names:785')}</dt>
            <dd>${unsafeHTML(this.localize('names:786'))}</dd>
            <dt>${this.localize('names:787')}</dt>
            <dd class="type">${this.localize('names:95')}</dd>
            <dd>${unsafeHTML(this.localize('names:788'))}</dd>
            <dt>${this.localize('names:789')}</dt>
            <dd class="type">${this.localize('names:290')}</dd>
            <dd>${unsafeHTML(this.localize('names:790'))}</dd>
            <dt id="moggallana">${this.localize('names:791')}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:792'))}</dd>
            <dd>${unsafeHTML(this.localize('names:793'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:794'))}</dd>
            <dt>${this.localize('names:795')}</dt>
            <dd class="type">${this.localize('names:796')}</dd>
            <dd>${unsafeHTML(this.localize('names:797'))}</dd>
            <dt>${this.localize('names:798')}</dt>
            <dd class="type">${this.localize('names:72')}</dd>
            <dd>${unsafeHTML(this.localize('names:799'))}</dd>
            <dt>${this.localize('names:800')}</dt>
            <dd>${unsafeHTML(this.localize('names:801'))}</dd>
            <dt>${this.localize('names:802')}</dt>
            <dd class="type">${this.localize('names:72')}</dd>
            <dd>${unsafeHTML(this.localize('names:803'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:804'))}</dd>
            <dt>${this.localize('names:805')}</dt>
            <dd class="type">${this.localize('names:80')}</dd>
            <dd>${unsafeHTML(this.localize('names:98'))}</dd>
            <dt>${this.localize('names:806')}</dt>
            <dd class="type">${this.localize('names:807')}</dd>
            <dd>${unsafeHTML(this.localize('names:808'))}</dd>
            <dt>${this.localize('names:809')}</dt>
            <dd>${unsafeHTML(this.localize('names:810'))}</dd>
            <dt>${this.localize('names:811')}</dt>
            <dd class="type">${this.localize('names:41')}</dd>
            <dd>${unsafeHTML(this.localize('names:812'))}</dd>
            <dt>${this.localize('names:813')}</dt>
            <dd class="type">${this.localize('names:290')}</dd>
            <dd>${unsafeHTML(this.localize('names:814'))}</dd>
          </dl>
          <h2 id="n">${this.localize('names:815')}</h2>
          <dl>
            <dt>${this.localize('names:816')}</dt>
            <dd class="type">${this.localize('names:139')}</dd>
            <dd>${unsafeHTML(this.localize('names:49'))}</dd>
            <dt>${this.localize('names:817')}</dt>
            <dd class="type">${this.localize('names:95')}</dd>
            <dd>${unsafeHTML(this.localize('names:818'))}</dd>
            <dt>${this.localize('names:819')}</dt>
            <dd class="type">${this.localize('names:77')}</dd>
            <dd>${unsafeHTML(this.localize('names:820'))}</dd>
            <dt>${this.localize('names:821')}</dt>
            <dd class="type">${this.localize('names:41')}</dd>
            <dd>${unsafeHTML(this.localize('names:822'))}</dd>
            <dt>${this.localize('names:823')}</dt>
            <dd class="type">${this.localize('names:41')}</dd>
            <dd>${unsafeHTML(this.localize('names:824'))}</dd>
            <dt>${this.localize('names:825')}</dt>
            <dd class="type">${this.localize('names:826')}</dd>
            <dd>${unsafeHTML(this.localize('names:827'))}</dd>
            <dt>${this.localize('names:828')}</dt>
            <dd class="type">${this.localize('names:829')}</dd>
            <dd>${unsafeHTML(this.localize('names:830'))}</dd>
            <dt>${this.localize('names:831')}</dt>
            <dd class="type">${this.localize('names:92')}</dd>
            <dd>${unsafeHTML(this.localize('names:301'))}</dd>
            <dt>${this.localize('names:832')}</dt>
            <dd>${unsafeHTML(this.localize('names:170'))}</dd>
            <dt>${this.localize('names:832')}</dt>
            <dd class="type">${this.localize('names:219')}</dd>
            <dd>${unsafeHTML(this.localize('names:833'))}</dd>
            <dt>${this.localize('names:834')}</dt>
            <dd class="type">${this.localize('names:95')}</dd>
            <dd>${unsafeHTML(this.localize('names:835'))}</dd>
            <dt>${this.localize('names:836')}</dt>
            <dd class="type">${this.localize('names:153')}</dd>
            <dd>${unsafeHTML(this.localize('names:837'))}</dd>
            <dt id="namuci">${this.localize('names:838')}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:839'))}</dd>
            <dd>${unsafeHTML(this.localize('names:840'))}</dd>
            <dt>${this.localize('names:838')}</dt>
            <dd class="type">${this.localize('names:210')}</dd>
            <dd>${unsafeHTML(this.localize('names:49'))}</dd>
            <dt>${this.localize('names:841')}</dt>
            <dd class="type">${this.localize('names:46')}</dd>
            <dd>${unsafeHTML(this.localize('names:47'))}</dd>
            <dt>${this.localize('names:842')}</dt>
            <dd class="type">${this.localize('names:843')}</dd>
            <dd>${unsafeHTML(this.localize('names:844'))}</dd>
            <dt>${this.localize('names:841')}</dt>
            <dd class="type">${this.localize('names:845')}</dd>
            <dd>${unsafeHTML(this.localize('names:846'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:847'))}</dd>
            <dt>${this.localize('names:841')}</dt>
            <dd class="type">${this.localize('names:72')}</dd>
            <dd>${unsafeHTML(this.localize('names:848'))}</dd>
            <dt>${this.localize('names:841')}</dt>
            <dd class="type">${this.localize('names:849')}</dd>
            <dd>${unsafeHTML(this.localize('names:78'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:850'))}</dd>
            <dt>${this.localize('names:851')}</dt>
            <dd class="type">${this.localize('names:41')}</dd>
            <dd>${unsafeHTML(this.localize('names:852'))}</dd>
            <dt>${this.localize('names:851')}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:853'))}</dd>
            <dd>${unsafeHTML(this.localize('names:854'))}</dd>
            <dt>${this.localize('names:855')}</dt>
            <dd class="type">${this.localize('names:856')}</dd>
            <dd>${unsafeHTML(this.localize('names:857'))}</dd>
            <dt>${this.localize('names:858')}</dt>
            <dd class="type">${this.localize('names:41')}</dd>
            <dd>${unsafeHTML(this.localize('names:859'))}</dd>
            <dt>${this.localize('names:858')}</dt>
            <dd class="type">${this.localize('names:446')}</dd>
            <dd>${unsafeHTML(this.localize('names:860'))}</dd>
            <dt>${this.localize('names:861')}</dt>
            <dd class="type">${this.localize('names:41')}</dd>
            <dd>${unsafeHTML(this.localize('names:812'))}</dd>
            <dt>${this.localize('names:862')}</dt>
            <dd>${unsafeHTML(this.localize('names:660'))}</dd>
            <dt>${this.localize('names:863')}</dt>
            <dd class="type">${this.localize('names:86')}</dd>
            <dd>${unsafeHTML(this.localize('names:104'))}</dd>
            <dt id="navak">${this.localize('names:864')}</dt>
            <dd class="type">${this.localize('names:153')}</dd>
            <dd>${unsafeHTML(this.localize('names:865'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:866'))}</dd>
            <dt>${this.localize('names:867')}</dt>
            <dd class="type">${this.localize('names:77')}</dd>
            <dd>${unsafeHTML(this.localize('names:868'))}</dd>
            <dt>${this.localize('names:869')}</dt>
            <dd class="type">${this.localize('names:86')}</dd>
            <dd>${unsafeHTML(this.localize('names:104'))}</dd>
            <dt>${this.localize('names:870')}</dt>
            <dd class="type">${this.localize('names:92')}</dd>
            <dd>${unsafeHTML(this.localize('names:104'))}</dd>
            <dt>${this.localize('names:871')}</dt>
            <dd class="type">${this.localize('names:46')}</dd>
            <dd>${unsafeHTML(this.localize('names:47'))}</dd>
            <dt>${this.localize('names:872')}</dt>
            <dd class="type">${this.localize('names:55')}</dd>
            <dd>${unsafeHTML(this.localize('names:873'))}</dd>
            <dt>${this.localize('names:874')}</dt>
            <dd class="type">${this.localize('names:92')}</dd>
            <dd>${unsafeHTML(this.localize('names:104'))}</dd>
            <dt>${this.localize('names:875')}</dt>
            <dd class="type">${this.localize('names:92')}</dd>
            <dd>${unsafeHTML(this.localize('names:104'))}</dd>
            <dt id="nataputta">${this.localize('names:876')}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:877'))}</dd>
            <dd>${unsafeHTML(this.localize('names:878'))}</dd>
            <dt id="nigantha">${this.localize('names:879')}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:880'))}</dd>
            <dd>${unsafeHTML(this.localize('names:881'))}</dd>
            <dt>${this.localize('names:882')}</dt>
            <dd class="type">${this.localize('names:41')}</dd>
            <dd>${unsafeHTML(this.localize('names:883'))}</dd>
            <dt>${this.localize('names:884')}</dt>
            <dd class="type">${this.localize('names:41')}</dd>
            <dd>${unsafeHTML(this.localize('names:885'))}</dd>
            <dt>${this.localize('names:886')}</dt>
            <dd>${unsafeHTML(this.localize('names:887'))}</dd>
            <dt>${this.localize('names:888')}</dt>
            <dd>${unsafeHTML(this.localize('names:98'))}</dd>
            <dt>${this.localize('names:889')}</dt>
            <dd class="type">${this.localize('names:48')}</dd>
            <dd>${unsafeHTML(this.localize('names:890'))}</dd>
            <dt>${this.localize('names:891')}</dt>
            <dd class="type">${this.localize('names:892')}</dd>
            <dd>${unsafeHTML(this.localize('names:893'))}</dd>
            <dt>${this.localize('names:894')}</dt>
            <dd class="type">${this.localize('names:41')}</dd>
            <dd>${unsafeHTML(this.localize('names:895'))}</dd>
            <dt>${this.localize('names:896')}</dt>
            <dd class="type">${this.localize('names:46')}</dd>
            <dd>${unsafeHTML(this.localize('names:47'))}</dd>
          </dl>
          <h2 id="o">${this.localize('names:897')}</h2>
          <dl>
            <dt>${this.localize('names:898')}</dt>
            <dd class="type">${this.localize('names:92')}</dd>
            <dd>${unsafeHTML(this.localize('names:104'))}</dd>
            <dt>${this.localize('names:899')}</dt>
            <dd class="type">${this.localize('names:95')}</dd>
            <dd>${unsafeHTML(this.localize('names:247'))}</dd>
            <dt>${this.localize('names:900')}</dt>
            <dd class="type">${this.localize('names:92')}</dd>
            <dd>${unsafeHTML(this.localize('names:104'))}</dd>
          </dl>
          <h2 id="pq">${this.localize('names:901')}</h2>
          <dl>
            <dt>${this.localize('names:902')}</dt>
            <dd class="type">${this.localize('names:46')}</dd>
            <dd>${unsafeHTML(this.localize('names:47'))}</dd>
            <dt>${this.localize('names:903')}</dt>
            <dd class="type">${this.localize('names:667')}</dd>
            <dd>${unsafeHTML(this.localize('names:904'))}</dd>
            <dt>${this.localize('names:905')}</dt>
            <dd class="type">${this.localize('names:46')}</dd>
            <dd>${unsafeHTML(this.localize('names:47'))}</dd>
            <dt>${this.localize('names:906')}</dt>
            <dd class="type">${this.localize('names:46')}</dd>
            <dd>${unsafeHTML(this.localize('names:47'))}</dd>
            <dt>${this.localize('names:907')}</dt>
            <dd class="type">${this.localize('names:210')}</dd>
            <dd>${unsafeHTML(this.localize('names:49'))}</dd>
            <dt>${this.localize('names:908')}</dt>
            <dd class="type">${this.localize('names:502')}</dd>
            <dd>${unsafeHTML(this.localize('names:909'))}</dd>
            <dt>${this.localize('names:910')}</dt>
            <dd class="type">${this.localize('names:667')}</dd>
            <dd>${unsafeHTML(this.localize('names:797'))}</dd>
            <dt>${this.localize('names:911')}</dt>
            <dd class="type">${this.localize('names:92')}</dd>
            <dd>${unsafeHTML(this.localize('names:301'))}</dd>
            <dt>${this.localize('names:912')}</dt>
            <dd class="type">${this.localize('names:913')}</dd>
            <dd>${unsafeHTML(this.localize('names:914'))}</dd>
            <dt>${this.localize('names:915')}</dt>
            <dd class="type">${this.localize('names:162')}</dd>
            <dd>${unsafeHTML(this.localize('names:49'))}</dd>
            <dt>${this.localize('names:915')}</dt>
            <dd class="type">${this.localize('names:92')}</dd>
            <dd>${unsafeHTML(this.localize('names:104'))}</dd>
            <dt>${this.localize('names:916')}</dt>
            <dd class="type">${this.localize('names:443')}</dd>
            <dd>${unsafeHTML(this.localize('names:917'))}</dd>
            <dt>${this.localize('names:918')}</dt>
            <dd class="type">${this.localize('names:46')}</dd>
            <dd>${unsafeHTML(this.localize('names:47'))}</dd>
            <dt>${this.localize('names:919')}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:920'))}</dd>
            <dd>${unsafeHTML(this.localize('names:921'))}</dd>
            <dt>${this.localize('names:922')}</dt>
            <dd class="type">${this.localize('names:123')}</dd>
            <dd>${unsafeHTML(this.localize('names:174'))}</dd>
            <dt>${this.localize('names:923')}</dt>
            <dd class="type">${this.localize('names:924')}</dd>
            <dd>${unsafeHTML(this.localize('names:925'))}</dd>
            <dt>${this.localize('names:923')}</dt>
            <dd class="type">${this.localize('names:92')}</dd>
            <dd>${unsafeHTML(this.localize('names:104'))}</dd>
            <dt>${this.localize('names:926')}</dt>
            <dd class="type">${this.localize('names:162')}</dd>
            <dd>${unsafeHTML(this.localize('names:49'))}</dd>
            <dt>${this.localize('names:927')}</dt>
            <dd class="type">${this.localize('names:48')}</dd>
            <dd>${unsafeHTML(this.localize('names:49'))}</dd>
            <dt>${this.localize('names:928')}</dt>
            <dd class="type">${this.localize('names:86')}</dd>
            <dd>${unsafeHTML(this.localize('names:104'))}</dd>
            <dt>${this.localize('names:929')}</dt>
            <dd class="type">${this.localize('names:930')}</dd>
            <dd>${unsafeHTML(this.localize('names:49'))}</dd>
            <dt>${this.localize('names:931')}</dt>
            <dd class="type">${this.localize('names:48')}</dd>
            <dd>${unsafeHTML(this.localize('names:890'))}</dd>
            <dt id="parasiri">${this.localize('names:932')}</dt>
            <dd class="type">${this.localize('names:153')}</dd>
            <dd>${unsafeHTML(this.localize('names:558'))}</dd>
            <dt id="pari">${this.localize('names:933')}</dt>
            <dd class="type">${this.localize('names:95')}</dd>
            <dd>${unsafeHTML(this.localize('names:934'))}</dd>
            <dt id="pasenadi">${this.localize('names:935')}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:936'))}</dd>
            <dd>${unsafeHTML(this.localize('names:937'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:938'))}</dd>
            <dt>${this.localize('names:939')}</dt>
            <dd class="type">${this.localize('names:46')}</dd>
            <dd>${unsafeHTML(this.localize('names:47'))}</dd>
            <dt>${this.localize('names:940')}</dt>
            <dd>${unsafeHTML(this.localize('names:941'))}</dd>
            <dt>${this.localize('names:942')}</dt>
            <dd class="type">${this.localize('names:943')}</dd>
            <dd>${unsafeHTML(this.localize('names:944'))}</dd>
            <dt>${this.localize('names:945')}</dt>
            <dd class="type">${this.localize('names:219')}</dd>
            <dd>${unsafeHTML(this.localize('names:98'))}</dd>
            <dt>${this.localize('names:946')}</dt>
            <dd class="type">${this.localize('names:95')}</dd>
            <dd>${unsafeHTML(this.localize('names:947'))}</dd>
            <dt>${this.localize('names:948')}</dt>
            <dd class="type">${this.localize('names:949')}</dd>
            <dd>${unsafeHTML(this.localize('names:950'))}</dd>
            <dt>${this.localize('names:951')}</dt>
            <dd class="type">${this.localize('names:95')}</dd>
            <dd>${unsafeHTML(this.localize('names:952'))}</dd>
            <dt>${this.localize('names:953')}</dt>
            <dd>${unsafeHTML(this.localize('names:954'))}</dd>
            <dt>${this.localize('names:955')}</dt>
            <dd class="type">${this.localize('names:46')}</dd>
            <dd>${unsafeHTML(this.localize('names:47'))}</dd>
            <dt>${this.localize('names:955')}</dt>
            <dd class="type">${this.localize('names:443')}</dd>
            <dd>${unsafeHTML(this.localize('names:956'))}</dd>
            <dt>${this.localize('names:957')}</dt>
            <dd class="type">${this.localize('names:41')}</dd>
            <dd>${unsafeHTML(this.localize('names:812'))}</dd>
            <dt>${this.localize('names:958')}</dt>
            <dd class="type">${this.localize('names:959')}</dd>
            <dd>${unsafeHTML(this.localize('names:960'))}</dd>
            <dd>${unsafeHTML(this.localize('names:961'))}</dd>
            <dd>${unsafeHTML(this.localize('names:781'))}</dd>
            <dt>${this.localize('names:962')}</dt>
            <dd>${unsafeHTML(this.localize('names:963'))}</dd>
            <dt>${this.localize('names:964')}</dt>
            <dd class="type">${this.localize('names:965')}</dd>
            <dd>${unsafeHTML(this.localize('names:966'))}</dd>
            <dt>${this.localize('names:967')}</dt>
            <dd class="type">${this.localize('names:46')}</dd>
            <dd>${unsafeHTML(this.localize('names:47'))}</dd>
            <dt id="pindola">${this.localize('names:968')}</dt>
            <dd class="type">${this.localize('names:41')}</dd>
            <dd>${unsafeHTML(this.localize('names:969'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:970'))}</dd>
            <dt>${this.localize('names:971')}</dt>
            <dd class="type">${this.localize('names:153')}</dd>
            <dd>${unsafeHTML(this.localize('names:972'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:973'))}</dd>
            <dt>${this.localize('names:974')}</dt>
            <dd class="type">${this.localize('names:72')}</dd>
            <dd>${unsafeHTML(this.localize('names:975'))}</dd>
            <dt>${this.localize('names:976')}</dt>
            <dd>${unsafeHTML(this.localize('names:977'))}</dd>
            <dt>${this.localize('names:978')}</dt>
            <dd class="type">${this.localize('names:95')}</dd>
            <dd>${unsafeHTML(this.localize('names:98'))}</dd>
            <dt>${this.localize('names:979')}</dt>
            <dd class="type">${this.localize('names:46')}</dd>
            <dd>${unsafeHTML(this.localize('names:47'))}</dd>
            <dt>${this.localize('names:980')}</dt>
            <dd class="type">${this.localize('names:72')}</dd>
            <dd>${unsafeHTML(this.localize('names:981'))}</dd>
            <dt>${this.localize('names:982')}</dt>
            <dd>${unsafeHTML(this.localize('names:983'))}</dd>
            <dt>${this.localize('names:984')}</dt>
            <dd>${unsafeHTML(this.localize('names:321'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:985'))}</dd>
            <dt>${this.localize('names:986')}</dt>
            <dd>${unsafeHTML(this.localize('names:98'))}</dd>
            <dt>${this.localize('names:987')}</dt>
            <dd class="type">${this.localize('names:41')}</dd>
            <dd>${unsafeHTML(this.localize('names:240'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:988'))}</dd>
            <dt>${this.localize('names:989')}</dt>
            <dd class="type">${this.localize('names:41')}</dd>
            <dd>${unsafeHTML(this.localize('names:651'))}</dd>
            <dt>${this.localize('names:990')}</dt>
            <dd class="type">${this.localize('names:41')}</dd>
            <dd>${unsafeHTML(this.localize('names:991'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:992'))}</dd>
            <dt>${this.localize('names:993')}</dt>
            <dd class="type">${this.localize('names:41')}</dd>
            <dd>${unsafeHTML(this.localize('names:994'))}</dd>
            <dt>${this.localize('names:995')}</dt>
            <dd class="type">${this.localize('names:290')}</dd>
            <dd>${unsafeHTML(this.localize('names:996'))}</dd>
            <dt>${this.localize('names:990')}</dt>
            <dd class="type">${this.localize('names:997')}</dd>
            <dd>${unsafeHTML(this.localize('names:478'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:998'))}</dd>
            <dt>${this.localize('names:999')}</dt>
            <dd class="type">${this.localize('names:92')}</dd>
            <dd>${unsafeHTML(this.localize('names:104'))}</dd>
            <dt>${this.localize('names:999')}</dt>
            <dd class="type">${this.localize('names:72')}</dd>
            <dd>${unsafeHTML(this.localize('names:1000'))}</dd>
            <dt>${this.localize('names:1001')}</dt>
            <dd class="type">${this.localize('names:41')}</dd>
            <dd>${unsafeHTML(this.localize('names:1002'))}</dd>
            <dt>${this.localize('names:1003')}</dt>
            <dd class="type">${this.localize('names:290')}</dd>
            <dd>${unsafeHTML(this.localize('names:1004'))}</dd>
            <dt>${this.localize('names:1005')}</dt>
            <dd class="type">${this.localize('names:913')}</dd>
            <dd>${unsafeHTML(this.localize('names:1006'))}</dd>
          </dl>
          <h2 id="r">${this.localize('names:1007')}</h2>
          <dl>
            <dt>${this.localize('names:1008')}</dt>
            <dd class="type">${this.localize('names:41')}</dd>
            <dd>${unsafeHTML(this.localize('names:1009'))}</dd>
            <dt>${this.localize('names:1010')}</dt>
            <dd class="type">${this.localize('names:1011')}</dd>
            <dd>${unsafeHTML(this.localize('names:1012'))}</dd>
            <dt>${this.localize('names:1013')}</dt>
            <dd class="type">${this.localize('names:1014')}</dd>
            <dd>${unsafeHTML(this.localize('names:1015'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:1016'))}</dd>
            <dt>${this.localize('names:1017')}</dt>
            <dd class="type">${this.localize('names:92')}</dd>
            <dd>${unsafeHTML(this.localize('names:104'))}</dd>
            <dt>${this.localize('names:1018')}</dt>
            <dd class="type">${this.localize('names:41')}</dd>
            <dd>${unsafeHTML(this.localize('names:1019'))}</dd>
            <dt>${this.localize('names:1020')}</dt>
            <dd class="type">${this.localize('names:1021')}</dd>
            <dd>${unsafeHTML(this.localize('names:1022'))}</dd>
            <dt>${this.localize('names:1023')}</dt>
            <dd class="type">${this.localize('names:46')}</dd>
            <dd>${unsafeHTML(this.localize('names:47'))}</dd>
            <dt>${this.localize('names:1024')}</dt>
            <dd class="type">${this.localize('names:219')}</dd>
            <dd>${unsafeHTML(this.localize('names:98'))}</dd>
            <dt>${this.localize('names:1025')}</dt>
            <dd class="type">${this.localize('names:41')}</dd>
            <dd>${unsafeHTML(this.localize('names:1026'))}</dd>
            <dt>${this.localize('names:1027')}</dt>
            <dd class="type">${this.localize('names:153')}</dd>
            <dd>${unsafeHTML(this.localize('names:1028'))}</dd>
            <dt>${this.localize('names:1029')}</dt>
            <dd class="type">${this.localize('names:41')}</dd>
            <dd>${unsafeHTML(this.localize('names:668'))}</dd>
            <dt>${this.localize('names:1030')}</dt>
            <dd>${unsafeHTML(this.localize('names:1031'))}</dd>
            <dt>${this.localize('names:1032')}</dt>
            <dd class="type">${this.localize('names:41')}</dd>
            <dd></dd>
            <dd>${unsafeHTML(this.localize('names:1033'))}</dd>
            <dt>${this.localize('names:1034')}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:1035'))}</dd>
            <dd>${unsafeHTML(this.localize('names:781'))}</dd>
            <dt>${this.localize('names:1036')}</dt>
            <dd class="type">${this.localize('names:290')}</dd>
            <dd>${unsafeHTML(this.localize('names:1037'))}</dd>
            <dt>${this.localize('names:1038')}</dt>
            <dd class="type">${this.localize('names:1039')}</dd>
            <dd>${unsafeHTML(this.localize('names:270'))}</dd>
            <dt>${this.localize('names:1040')}</dt>
            <dd class="type">${this.localize('names:48')}</dd>
            <dd>${unsafeHTML(this.localize('names:49'))}</dd>
            <dt>${this.localize('names:1041')}</dt>
            <dd class="type">${this.localize('names:193')}</dd>
            <dd>${unsafeHTML(this.localize('names:1042'))}</dd>
            <dt>${this.localize('names:1043')}</dt>
            <dd class="type">${this.localize('names:1044')}</dd>
            <dd>${unsafeHTML(this.localize('names:696'))}</dd>
            <dt>${this.localize('names:1045')}</dt>
            <dd class="type">${this.localize('names:48')}</dd>
            <dd>${unsafeHTML(this.localize('names:49'))}</dd>
          </dl>
          <h2 id="s">${this.localize('names:1046')}</h2>
          <dl>
            <dt>${this.localize('names:1047')}</dt>
            <dd class="type">${this.localize('names:41')}</dd>
            <dd>${unsafeHTML(this.localize('names:868'))}</dd>
            <dt>${this.localize('names:1048')}</dt>
            <dd class="type">${this.localize('names:1049')}</dd>
            <dd>${unsafeHTML(this.localize('names:1050'))}</dd>
            <dt>${this.localize('names:1051')}</dt>
            <dd class="type">${this.localize('names:46')}</dd>
            <dd>${unsafeHTML(this.localize('names:47'))}</dd>
            <dt>${this.localize('names:1052')}</dt>
            <dd class="type">${this.localize('names:48')}</dd>
            <dd>${unsafeHTML(this.localize('names:49'))}</dd>
            <dt>${this.localize('names:1053')}</dt>
            <dd class="type">${this.localize('names:48')}</dd>
            <dd>${unsafeHTML(this.localize('names:49'))}</dd>
            <dt>${this.localize('names:1054')}</dt>
            <dd class="type">${this.localize('names:48')}</dd>
            <dd>${unsafeHTML(this.localize('names:49'))}</dd>
            <dt>${this.localize('names:1055')}</dt>
            <dd class="type">${this.localize('names:95')}</dd>
            <dd>${unsafeHTML(this.localize('names:1056'))}</dd>
            <dt>${this.localize('names:1057')}</dt>
            <dd class="type">${this.localize('names:162')}</dd>
            <dd>${unsafeHTML(this.localize('names:49'))}</dd>
            <dt>${this.localize('names:1058')}</dt>
            <dd class="type">${this.localize('names:930')}</dd>
            <dd>${unsafeHTML(this.localize('names:1059'))}</dd>
            <dt>${this.localize('names:1060')}</dt>
            <dd class="type">${this.localize('names:95')}</dd>
            <dd>${unsafeHTML(this.localize('names:1061'))}</dd>
            <dt id="sakka">${this.localize('names:1062')}</dt>
            <dd class="type">${this.localize('names:1063')}</dd>
            <dd>${unsafeHTML(this.localize('names:1064'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:1065'))}</dd>
            <dt>${this.localize('names:1066')}</dt>
            <dd class="type">${this.localize('names:77')}</dd>
            <dd>${unsafeHTML(this.localize('names:1067'))}</dd>
            <dt id="sakula">${this.localize('names:1068')}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:1069'))}</dd>
            <dd>${unsafeHTML(this.localize('names:81'))}</dd>
            <dt>${this.localize('names:446')}</dt>
            <dd class="type">${this.localize('names:80')}</dd>
            <dd>${unsafeHTML(this.localize('names:1070'))}</dd>
            <dt>${this.localize('names:1071')}</dt>
            <dd class="type">${this.localize('names:1072')}</dd>
            <dd>${unsafeHTML(this.localize('names:1073'))}</dd>
            <dt>${this.localize('names:1074')}</dt>
            <dd class="type">${this.localize('names:77')}</dd>
            <dd>${unsafeHTML(this.localize('names:696'))}</dd>
            <dt>${this.localize('names:1075')}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:1076'))}</dd>
            <dd>${unsafeHTML(this.localize('names:781'))}</dd>
            <dt>${this.localize('names:1075')}</dt>
            <dd class="type">${this.localize('names:41')}</dd>
            <dd>${unsafeHTML(this.localize('names:98'))}</dd>
            <dt>${this.localize('names:1077')}</dt>
            <dd class="type">${this.localize('names:48')}</dd>
            <dd>${unsafeHTML(this.localize('names:49'))}</dd>
            <dt>${this.localize('names:1078')}</dt>
            <dd class="type">${this.localize('names:965')}</dd>
            <dd>${unsafeHTML(this.localize('names:1079'))}</dd>
            <dt id="samavati">${this.localize('names:1080')}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:1081'))}</dd>
            <dd>${unsafeHTML(this.localize('names:1082'))}</dd>
            <dt>${this.localize('names:1083')}</dt>
            <dd class="type">${this.localize('names:41')}</dd>
            <dd>${unsafeHTML(this.localize('names:1084'))}</dd>
            <dt>${this.localize('names:1085')}</dt>
            <dd class="type">${this.localize('names:930')}</dd>
            <dd>${unsafeHTML(this.localize('names:1086'))}</dd>
            <dt>${this.localize('names:1087')}</dt>
            <dd class="type">${this.localize('names:41')}</dd>
            <dd>${unsafeHTML(this.localize('names:1088'))}</dd>
            <dt>${this.localize('names:1089')}</dt>
            <dd class="type">${this.localize('names:41')}</dd>
            <dd>${unsafeHTML(this.localize('names:1090'))}</dd>
            <dt>${this.localize('names:1091')}</dt>
            <dd class="type">${this.localize('names:153')}</dd>
            <dd>${unsafeHTML(this.localize('names:1092'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:1093'))}</dd>
            <dt>${this.localize('names:1094')}</dt>
            <dd class="type">${this.localize('names:46')}</dd>
            <dd>${unsafeHTML(this.localize('names:47'))}</dd>
            <dt>${this.localize('names:1095')}</dt>
            <dd class="type">${this.localize('names:443')}</dd>
            <dd>${unsafeHTML(this.localize('names:390'))}</dd>
            <dt>${this.localize('names:1096')}</dt>
            <dd class="type">${this.localize('names:41')}</dd>
            <dd>${unsafeHTML(this.localize('names:1097'))}</dd>
            <dt>${this.localize('names:1098')}</dt>
            <dd class="type">${this.localize('names:46')}</dd>
            <dd>${unsafeHTML(this.localize('names:47'))}</dd>
            <dt>${this.localize('names:1099')}</dt>
            <dd class="type">${this.localize('names:162')}</dd>
            <dd>${unsafeHTML(this.localize('names:630'))}</dd>
            <dt>${this.localize('names:1100')}</dt>
            <dd class="type">${this.localize('names:1101')}</dd>
            <dd>${unsafeHTML(this.localize('names:98'))}</dd>
            <dt>${this.localize('names:1102')}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:1103'))}</dd>
            <dd>${unsafeHTML(this.localize('names:81'))}</dd>
            <dt>${this.localize('names:1104')}</dt>
            <dd class="type">${this.localize('names:1105')}</dd>
            <dd>${unsafeHTML(this.localize('names:1106'))}</dd>
            <dt>${this.localize('names:1107')}</dt>
            <dd class="type">${this.localize('names:41')}</dd>
            <dd>${unsafeHTML(this.localize('names:1108'))}</dd>
            <dt>${this.localize('names:1109')}</dt>
            <dd class="type">${this.localize('names:46')}</dd>
            <dd>${unsafeHTML(this.localize('names:47'))}</dd>
            <dt>${this.localize('names:1110')}</dt>
            <dd class="type">${this.localize('names:55')}</dd>
            <dd>${unsafeHTML(this.localize('names:56'))}</dd>
            <dt>${this.localize('names:1111')}</dt>
            <dd class="type">${this.localize('names:62')}</dd>
            <dd>${unsafeHTML(this.localize('names:98'))}</dd>
            <dt>${this.localize('names:1112')}</dt>
            <dd class="type">${this.localize('names:55')}</dd>
            <dd>${unsafeHTML(this.localize('names:58'))}</dd>
            <dt id="sariputta">${this.localize('names:1113')}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:1114'))}</dd>
            <dd>${unsafeHTML(this.localize('names:1115'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:1116'))}</dd>
            <dt>${this.localize('names:1117')}</dt>
            <dd class="type">${this.localize('names:443')}</dd>
            <dd>${unsafeHTML(this.localize('names:49'))}</dd>
            <dt>${this.localize('names:1118')}</dt>
            <dd class="type">${this.localize('names:92')}</dd>
            <dd>${unsafeHTML(this.localize('names:104'))}</dd>
            <dt>${this.localize('names:1119')}</dt>
            <dd class="type">${this.localize('names:1120')}</dd>
            <dd>${unsafeHTML(this.localize('names:1121'))}</dd>
            <dt>${this.localize('names:1122')}</dt>
            <dd class="type">${this.localize('names:62')}</dd>
            <dd>${unsafeHTML(this.localize('names:98'))}</dd>
            <dt>${this.localize('names:1123')}</dt>
            <dd class="type">${this.localize('names:1124')}</dd>
            <dd>${unsafeHTML(this.localize('names:98'))}</dd>
            <dt>${this.localize('names:1125')}</dt>
            <dd class="type">${this.localize('names:46')}</dd>
            <dd>${unsafeHTML(this.localize('names:47'))}</dd>
            <dt>${this.localize('names:1126')}</dt>
            <dd class="type">${this.localize('names:162')}</dd>
            <dd>${unsafeHTML(this.localize('names:1127'))}</dd>
            <dt id="savatthi">${this.localize('names:1128')}</dt>
            <dd class="type">${this.localize('names:1129')}</dd>
            <dd>${unsafeHTML(this.localize('names:1130'))}</dd>
            <dt>${this.localize('names:1131')}</dt>
            <dd class="type">${this.localize('names:46')}</dd>
            <dd>${unsafeHTML(this.localize('names:47'))}</dd>
            <dt>${this.localize('names:1132')}</dt>
            <dd class="type">${this.localize('names:77')}</dd>
            <dd>${unsafeHTML(this.localize('names:1133'))}</dd>
            <dt>${this.localize('names:1134')}</dt>
            <dd class="type">${this.localize('names:290')}</dd>
            <dd>${unsafeHTML(this.localize('names:1135'))}</dd>
            <dt>${this.localize('names:1136')}</dt>
            <dd class="type">${this.localize('names:1137')}</dd>
            <dd>${unsafeHTML(this.localize('names:478'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:1138'))}</dd>
            <dt>${this.localize('names:1139')}</dt>
            <dd class="type">${this.localize('names:92')}</dd>
            <dd>${unsafeHTML(this.localize('names:104'))}</dd>
            <dt>${this.localize('names:1140')}</dt>
            <dd class="type">${this.localize('names:95')}</dd>
            <dd>${unsafeHTML(this.localize('names:1141'))}</dd>
            <dt>${this.localize('names:1142')}</dt>
            <dd class="type">${this.localize('names:46')}</dd>
            <dd>${unsafeHTML(this.localize('names:47'))}</dd>
            <dt>${this.localize('names:1143')}</dt>
            <dd>${unsafeHTML(this.localize('names:1144'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:1145'))}</dd>
            <dt>${this.localize('names:1146')}</dt>
            <dd class="type">${this.localize('names:1147')}</dd>
            <dd>${unsafeHTML(this.localize('names:1148'))}</dd>
            <dt>${this.localize('names:1149')}</dt>
            <dd class="type">${this.localize('names:1150')}</dd>
            <dd>${unsafeHTML(this.localize('names:104'))}</dd>
            <dt>${this.localize('names:1149')}</dt>
            <dd class="type">${this.localize('names:46')}</dd>
            <dd>${unsafeHTML(this.localize('names:47'))}</dd>
            <dt>${this.localize('names:1151')}</dt>
            <dd class="type">${this.localize('names:469')}</dd>
            <dd>${unsafeHTML(this.localize('names:1152'))}</dd>
            <dt>${this.localize('names:1153')}</dt>
            <dd class="type">${this.localize('names:568')}</dd>
            <dd>${unsafeHTML(this.localize('names:1154'))}</dd>
            <dt>${this.localize('names:1155')}</dt>
            <dd class="type">${this.localize('names:443')}</dd>
            <dd>${unsafeHTML(this.localize('names:1156'))}</dd>
            <dt>${this.localize('names:1157')}</dt>
            <dd class="type">${this.localize('names:41')}</dd>
            <dd>${unsafeHTML(this.localize('names:1158'))}</dd>
            <dt>${this.localize('names:1159')}</dt>
            <dd class="type">${this.localize('names:41')}</dd>
            <dd>${unsafeHTML(this.localize('names:1160'))}</dd>
            <dt>${this.localize('names:1161')}</dt>
            <dd class="type">${this.localize('names:41')}</dd>
            <dd>${unsafeHTML(this.localize('names:1162'))}</dd>
            <dt>${this.localize('names:1163')}</dt>
            <dd class="type">${this.localize('names:290')}</dd>
            <dd>${unsafeHTML(this.localize('names:1164'))}</dd>
            <dt>${this.localize('names:1165')}</dt>
            <dd class="type">${this.localize('names:41')}</dd>
            <dd>${unsafeHTML(this.localize('names:1166'))}</dd>
            <dt>${this.localize('names:1165')}</dt>
            <dd class="type">${this.localize('names:92')}</dd>
            <dd>${unsafeHTML(this.localize('names:1167'))}</dd>
            <dt>${this.localize('names:1168')}</dt>
            <dd class="type">${this.localize('names:46')}</dd>
            <dd>${unsafeHTML(this.localize('names:47'))}</dd>
            <dt id="soma">${this.localize('names:1169')}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:1170'))}</dd>
            <dd>${unsafeHTML(this.localize('names:81'))}</dd>
            <dt>${this.localize('names:1169')}</dt>
            <dd class="type">${this.localize('names:290')}</dd>
            <dd>${unsafeHTML(this.localize('names:1171'))}</dd>
            <dt>${this.localize('names:1172')}</dt>
            <dd class="type">${this.localize('names:92')}</dd>
            <dd>${unsafeHTML(this.localize('names:104'))}</dd>
            <dt>${this.localize('names:1173')}</dt>
            <dd class="type">${this.localize('names:1174')}</dd>
            <dd>${unsafeHTML(this.localize('names:1175'))}</dd>
            <dt>${this.localize('names:1176')}</dt>
            <dd class="type">${this.localize('names:41')}</dd>
            <dd>${unsafeHTML(this.localize('names:1177'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:1178'))}</dd>
            <dt>${this.localize('names:1179')}</dt>
            <dd>${unsafeHTML(this.localize('names:956'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:1180'))}</dd>
            <dt>${this.localize('names:1181')}</dt>
            <dd class="type">${this.localize('names:41')}</dd>
            <dd>${unsafeHTML(this.localize('names:1182'))}</dd>
            <dt>${this.localize('names:1183')}</dt>
            <dd class="type">${this.localize('names:1184')}</dd>
            <dd>${unsafeHTML(this.localize('names:1185'))}</dd>
            <dt>${this.localize('names:1186')}</dt>
            <dd class="type">${this.localize('names:46')}</dd>
            <dd>${unsafeHTML(this.localize('names:47'))}</dd>
            <dt>${this.localize('names:1187')}</dt>
            <dd class="type">${this.localize('names:46')}</dd>
            <dd>${unsafeHTML(this.localize('names:47'))}</dd>
            <dt>${this.localize('names:1188')}</dt>
            <dd class="type">${this.localize('names:46')}</dd>
            <dd>${unsafeHTML(this.localize('names:47'))}</dd>
            <dt>${this.localize('names:1189')}</dt>
            <dd class="type">${this.localize('names:290')}</dd>
            <dd>${unsafeHTML(this.localize('names:1190'))}</dd>
            <dt>${this.localize('names:1188')}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:1191'))}</dd>
            <dd>${unsafeHTML(this.localize('names:1192'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:1193'))}</dd>
            <dt>${this.localize('names:1194')}</dt>
            <dd class="type">${this.localize('names:1195')}</dd>
            <dd>${unsafeHTML(this.localize('names:98'))}</dd>
            <dt>${this.localize('names:1194')}</dt>
            <dd class="type">${this.localize('names:1196')}</dd>
            <dd>${unsafeHTML(this.localize('names:98'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:1197'))}</dd>
            <dt>${this.localize('names:1194')}</dt>
            <dd class="type">${this.localize('names:41')}</dd>
            <dd>${unsafeHTML(this.localize('names:98'))}</dd>
            <dt>${this.localize('names:1198')}</dt>
            <dd class="type">${this.localize('names:469')}</dd>
            <dd>${unsafeHTML(this.localize('names:208'))}</dd>
            <dt>${this.localize('names:1199')}</dt>
            <dd class="type">${this.localize('names:41')}</dd>
            <dd>${unsafeHTML(this.localize('names:1200'))}</dd>
            <dt>${this.localize('names:1201')}</dt>
            <dd class="type">${this.localize('names:930')}</dd>
            <dd>${unsafeHTML(this.localize('names:49'))}</dd>
            <dt>${this.localize('names:1202')}</dt>
            <dd class="type">${this.localize('names:210')}</dd>
            <dd>${unsafeHTML(this.localize('names:49'))}</dd>
            <dt>${this.localize('names:1203')}</dt>
            <dd class="type">${this.localize('names:46')}</dd>
            <dd>${unsafeHTML(this.localize('names:47'))}</dd>
            <dt>${this.localize('names:1203')}</dt>
            <dd class="type">${this.localize('names:1204')}</dd>
            <dd>${unsafeHTML(this.localize('names:1205'))}</dd>
            <dt>${this.localize('names:1206')}</dt>
            <dd class="type">${this.localize('names:46')}</dd>
            <dd>${unsafeHTML(this.localize('names:47'))}</dd>
            <dt>${this.localize('names:1207')}</dt>
            <dd class="type">${this.localize('names:1208')}</dd>
            <dd>${unsafeHTML(this.localize('names:98'))}</dd>
            <dt>${this.localize('names:1207')}</dt>
            <dd>${unsafeHTML(this.localize('names:1209'))}</dd>
            <dt>${this.localize('names:1210')}</dt>
            <dd class="type">${this.localize('names:1211')}</dd>
            <dd>${unsafeHTML(this.localize('names:170'))}</dd>
            <dt>${this.localize('names:1212')}</dt>
            <dd class="type">${this.localize('names:290')}</dd>
            <dd>${unsafeHTML(this.localize('names:1213'))}</dd>
            <dt>${this.localize('names:1212')}</dt>
            <dd class="type">${this.localize('names:1214')}</dd>
            <dd>${unsafeHTML(this.localize('names:98'))}</dd>
            <dt>${this.localize('names:1212')}</dt>
            <dd class="type">${this.localize('names:1215')}</dd>
            <dd>${unsafeHTML(this.localize('names:1216'))}</dd>
            <dt>${this.localize('names:1217')}</dt>
            <dd class="type">${this.localize('names:48')}</dd>
            <dd>${unsafeHTML(this.localize('names:49'))}</dd>
            <dt>${this.localize('names:1218')}</dt>
            <dd class="type">${this.localize('names:41')}</dd>
            <dd>${unsafeHTML(this.localize('names:632'))}</dd>
            <dt>${this.localize('names:1218')}</dt>
            <dd class="type">${this.localize('names:52')}</dd>
            <dd>${unsafeHTML(this.localize('names:140'))}</dd>
            <dt>${this.localize('names:1218')}</dt>
            <dd class="type">${this.localize('names:92')}</dd>
            <dd>${unsafeHTML(this.localize('names:104'))}</dd>
            <dt>${this.localize('names:1219')}</dt>
            <dd class="type">${this.localize('names:46')}</dd>
            <dd>${unsafeHTML(this.localize('names:47'))}</dd>
            <dt>${this.localize('names:1219')}</dt>
            <dd class="type">${this.localize('names:41')}</dd>
            <dd>${unsafeHTML(this.localize('names:1220'))}</dd>
            <dt>${this.localize('names:1221')}</dt>
            <dd>${unsafeHTML(this.localize('names:1222'))}</dd>
            <dt>${this.localize('names:1223')}</dt>
            <dd class="type">${this.localize('names:46')}</dd>
            <dd>${unsafeHTML(this.localize('names:47'))}</dd>
            <dt>${this.localize('names:1223')}</dt>
            <dd class="type">${this.localize('names:132')}</dd>
            <dd>${unsafeHTML(this.localize('names:1133'))}</dd>
            <dt>${this.localize('names:1224')}</dt>
            <dd class="type">${this.localize('names:92')}</dd>
            <dd>${unsafeHTML(this.localize('names:104'))}</dd>
            <dt>${this.localize('names:1225')}</dt>
            <dd class="type">${this.localize('names:41')}</dd>
            <dd>${unsafeHTML(this.localize('names:1226'))}</dd>
            <dt>${this.localize('names:1227')}</dt>
            <dd class="type">${this.localize('names:407')}</dd>
            <dd>${unsafeHTML(this.localize('names:1228'))}</dd>
            <dt>${this.localize('names:1229')}</dt>
            <dd class="type">${this.localize('names:123')}</dd>
            <dd>${unsafeHTML(this.localize('names:991'))}</dd>
            <dt>${this.localize('names:1230')}</dt>
            <dd class="type">${this.localize('names:46')}</dd>
            <dd>${unsafeHTML(this.localize('names:47'))}</dd>
            <dt>${this.localize('names:1231')}</dt>
            <dd class="type">${this.localize('names:41')}</dd>
            <dd>${unsafeHTML(this.localize('names:1232'))}</dd>
            <dt>${this.localize('names:1233')}</dt>
            <dd class="type">${this.localize('names:55')}</dd>
            <dd>${unsafeHTML(this.localize('names:58'))}</dd>
            <dt id="sundarika">${this.localize('names:1234')}</dt>
            <dd class="type">${this.localize('names:41')}</dd>
            <dd>${unsafeHTML(this.localize('names:58'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:1235'))}</dd>
            <dt>${this.localize('names:1236')}</dt>
            <dd class="type">${this.localize('names:153')}</dd>
            <dd>${unsafeHTML(this.localize('names:98'))}</dd>
            <dt>${this.localize('names:1237')}</dt>
            <dd class="type">${this.localize('names:162')}</dd>
            <dd>${unsafeHTML(this.localize('names:630'))}</dd>
            <dt>${this.localize('names:1238')}</dt>
            <dd class="type">${this.localize('names:1239')}</dd>
            <dd>${unsafeHTML(this.localize('names:1240'))}</dd>
            <dt>${this.localize('names:1241')}</dt>
            <dd class="type">${this.localize('names:1242')}</dd>
            <dd>${unsafeHTML(this.localize('names:49'))}</dd>
            <dt>${this.localize('names:1243')}</dt>
            <dd class="type">${this.localize('names:1244')}</dd>
            <dd>${unsafeHTML(this.localize('names:1245'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:1246'))}</dd>
            <dt>${this.localize('names:1247')}</dt>
            <dd class="type">${this.localize('names:92')}</dd>
            <dd>${unsafeHTML(this.localize('names:104'))}</dd>
            <dt>${this.localize('names:1248')}</dt>
            <dd class="type">${this.localize('names:95')}</dd>
            <dd>${unsafeHTML(this.localize('names:200'))}</dd>
            <dt>${this.localize('names:1249')}</dt>
            <dd class="type">${this.localize('names:46')}</dd>
            <dd>${unsafeHTML(this.localize('names:47'))}</dd>
            <dt>${this.localize('names:1250')}</dt>
            <dd class="type">${this.localize('names:41')}</dd>
            <dd>${unsafeHTML(this.localize('names:1251'))}</dd>
            <dt>${this.localize('names:1252')}</dt>
            <dd class="type">${this.localize('names:123')}</dd>
            <dd>${unsafeHTML(this.localize('names:174'))}</dd>
            <dt>${this.localize('names:1253')}</dt>
            <dd class="type">${this.localize('names:162')}</dd>
            <dd>${unsafeHTML(this.localize('names:49'))}</dd>
            <dt>${this.localize('names:1254')}</dt>
            <dd class="type">${this.localize('names:92')}</dd>
            <dd>${unsafeHTML(this.localize('names:104'))}</dd>
            <dt>${this.localize('names:1255')}</dt>
            <dd class="type">${this.localize('names:41')}</dd>
            <dd>${unsafeHTML(this.localize('names:1256'))}</dd>
            <dt>${this.localize('names:1257')}</dt>
            <dd class="type">${this.localize('names:41')}</dd>
            <dd>${unsafeHTML(this.localize('names:1258'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:1259'))}</dd>
            <dt>${this.localize('names:1260')}</dt>
            <dd class="type">${this.localize('names:46')}</dd>
            <dd>${unsafeHTML(this.localize('names:47'))}</dd>
            <dt>${this.localize('names:1261')}</dt>
            <dd class="type">${this.localize('names:41')}</dd>
            <dd>${unsafeHTML(this.localize('names:1262'))}</dd>
            <dt>${this.localize('names:1263')}</dt>
            <dd class="type">${this.localize('names:162')}</dd>
            <dd>${unsafeHTML(this.localize('names:630'))}</dd>
          </dl>
          <h2 id="t">${this.localize('names:1264')}</h2>
          <dl>
            <dt>${this.localize('names:1265')}</dt>
            <dd class="type">${this.localize('names:1266')}</dd>
            <dd>${unsafeHTML(this.localize('names:49'))}</dd>
            <dt>${this.localize('names:1267')}</dt>
            <dd class="type">${this.localize('names:46')}</dd>
            <dd>${unsafeHTML(this.localize('names:47'))}</dd>
            <dt>${this.localize('names:1268')}</dt>
            <dd class="type">${this.localize('names:46')}</dd>
            <dd>${unsafeHTML(this.localize('names:1269'))}</dd>
            <dt>${this.localize('names:1270')}</dt>
            <dd class="type">${this.localize('names:1271')}</dd>
            <dd>${unsafeHTML(this.localize('names:1272'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:1273'))}</dd>
            <dt>${this.localize('names:1274')}</dt>
            <dd class="type">${this.localize('names:1275')}</dd>
            <dd>${unsafeHTML(this.localize('names:1276'))}</dd>
            <dt>${this.localize('names:1277')}</dt>
            <dd>${unsafeHTML(this.localize('names:1278'))}</dd>
            <dt>${this.localize('names:1279')}</dt>
            <dd class="type">${this.localize('names:46')}</dd>
            <dd>${unsafeHTML(this.localize('names:47'))}</dd>
            <dt>${this.localize('names:1280')}</dt>
            <dd class="type">${this.localize('names:92')}</dd>
            <dd>${unsafeHTML(this.localize('names:104'))}</dd>
            <dt>${this.localize('names:1281')}</dt>
            <dd class="type">${this.localize('names:92')}</dd>
            <dd>${unsafeHTML(this.localize('names:104'))}</dd>
            <dt>${this.localize('names:1282')}</dt>
            <dd class="type">${this.localize('names:92')}</dd>
            <dd>${unsafeHTML(this.localize('names:104'))}</dd>
            <dt>${this.localize('names:1283')}</dt>
            <dd class="type">${this.localize('names:92')}</dd>
            <dd>${unsafeHTML(this.localize('names:104'))}</dd>
            <dt>${this.localize('names:1284')}</dt>
            <dd class="type">${this.localize('names:41')}</dd>
            <dd>${unsafeHTML(this.localize('names:1285'))}</dd>
            <dt>${this.localize('names:1286')}</dt>
            <dd class="type">${this.localize('names:95')}</dd>
            <dd>${unsafeHTML(this.localize('names:668'))}</dd>
            <dt>${this.localize('names:1287')}</dt>
            <dd class="type">${this.localize('names:219')}</dd>
            <dd>${unsafeHTML(this.localize('names:1288'))}</dd>
            <dt>${this.localize('names:1289')}</dt>
            <dd class="type">${this.localize('names:162')}</dd>
            <dd>${unsafeHTML(this.localize('names:49'))}</dd>
            <dt>${this.localize('names:1290')}</dt>
            <dd class="type">${this.localize('names:46')}</dd>
            <dd>${unsafeHTML(this.localize('names:47'))}</dd>
            <dt>${this.localize('names:1290')}</dt>
            <dd class="type">${this.localize('names:1291')}</dd>
            <dd>${unsafeHTML(this.localize('names:1292'))}</dd>
            <dt>${this.localize('names:1290')}</dt>
            <dd class="type">${this.localize('names:930')}</dd>
            <dd>${unsafeHTML(this.localize('names:49'))}</dd>
            <dt>${this.localize('names:1293')}</dt>
            <dd class="type">${this.localize('names:72')}</dd>
            <dd>${unsafeHTML(this.localize('names:1294'))}</dd>
            <dt id="todeyya">${this.localize('names:1295')}</dt>
            <dd class="type">${this.localize('names:72')}</dd>
            <dd>${unsafeHTML(this.localize('names:1296'))}</dd>
            <dt>${this.localize('names:1297')}</dt>
            <dd class="type">${this.localize('names:219')}</dd>
            <dd>${unsafeHTML(this.localize('names:634'))}</dd>
            <dt>${this.localize('names:1298')}</dt>
            <dd class="type">${this.localize('names:48')}</dd>
            <dd>${unsafeHTML(this.localize('names:1299'))}</dd>
            <dt>${this.localize('names:1300')}</dt>
            <dd>${unsafeHTML(this.localize('names:98'))}</dd>
          </dl>
          <h2 id="u">${this.localize('names:1301')}</h2>
          <dl>
            <dt id="ubbiri">${this.localize('names:1302')}</dt>
            <dd class="type">${this.localize('names:290')}</dd>
            <dd>${unsafeHTML(this.localize('names:545'))}</dd>
            <dt>${this.localize('names:1303')}</dt>
            <dd class="type">${this.localize('names:46')}</dd>
            <dd>${unsafeHTML(this.localize('names:47'))}</dd>
            <dt>${this.localize('names:1304')}</dt>
            <dd class="type">${this.localize('names:46')}</dd>
            <dd>${unsafeHTML(this.localize('names:47'))}</dd>
            <dt>${this.localize('names:1305')}</dt>
            <dd class="type">${this.localize('names:77')}</dd>
            <dd>${unsafeHTML(this.localize('names:81'))}</dd>
            <dt>${this.localize('names:1306')}</dt>
            <dd class="type">${this.localize('names:72')}</dd>
            <dd>${unsafeHTML(this.localize('names:1307'))}</dd>
            <dt id="udayibhadda">${this.localize('names:1308')}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:1309'))}</dd>
            <dd>${unsafeHTML(this.localize('names:660'))}</dd>
            <dt>${this.localize('names:1310')}</dt>
            <dd class="type">${this.localize('names:1311')}</dd>
            <dd>${unsafeHTML(this.localize('names:1312'))}</dd>
            <dt>${this.localize('names:1313')}</dt>
            <dd class="type">${this.localize('names:1314')}</dd>
            <dd>${unsafeHTML(this.localize('names:1315'))}</dd>
            <dt id="udena">${this.localize('names:1316')}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:1317'))}</dd>
            <dd>${unsafeHTML(this.localize('names:1318'))}</dd>
            <dt>${this.localize('names:1319')}</dt>
            <dd class="type">${this.localize('names:62')}</dd>
            <dd>${unsafeHTML(this.localize('names:98'))}</dd>
            <dt>${this.localize('names:1320')}</dt>
            <dd>${unsafeHTML(this.localize('names:786'))}</dd>
            <dt>${this.localize('names:1321')}</dt>
            <dd>${unsafeHTML(this.localize('names:810'))}</dd>
            <dt>${this.localize('names:1322')}</dt>
            <dd class="type">${this.localize('names:95')}</dd>
            <dd>${unsafeHTML(this.localize('names:1323'))}</dd>
            <dt>${this.localize('names:1324')}</dt>
            <dd class="type">${this.localize('names:153')}</dd>
            <dd>${unsafeHTML(this.localize('names:1325'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:1326'))}</dd>
            <dt>${this.localize('names:1327')}</dt>
            <dd class="type">${this.localize('names:290')}</dd>
            <dd>${unsafeHTML(this.localize('names:1328'))}</dd>
            <dt>${this.localize('names:1329')}</dt>
            <dd class="type">${this.localize('names:1330')}</dd>
            <dd>${unsafeHTML(this.localize('names:1028'))}</dd>
            <dt>${this.localize('names:1331')}</dt>
            <dd class="type">${this.localize('names:46')}</dd>
            <dd>${unsafeHTML(this.localize('names:47'))}</dd>
            <dt>${this.localize('names:1332')}</dt>
            <dd class="type">${this.localize('names:41')}</dd>
            <dd>${unsafeHTML(this.localize('names:1333'))}</dd>
            <dt>${this.localize('names:1334')}</dt>
            <dd class="type">${this.localize('names:46')}</dd>
            <dd>${unsafeHTML(this.localize('names:47'))}</dd>
            <dt>${this.localize('names:1335')}</dt>
            <dd class="type">${this.localize('names:46')}</dd>
            <dd>${unsafeHTML(this.localize('names:47'))}</dd>
            <dt>${this.localize('names:1336')}</dt>
            <dd class="type">${this.localize('names:46')}</dd>
            <dd>${unsafeHTML(this.localize('names:47'))}</dd>
            <dt>${this.localize('names:1337')}</dt>
            <dd class="type">${this.localize('names:46')}</dd>
            <dd>${unsafeHTML(this.localize('names:47'))}</dd>
            <dt>${this.localize('names:1338')}</dt>
            <dd class="type">${this.localize('names:46')}</dd>
            <dd>${unsafeHTML(this.localize('names:47'))}</dd>
            <dt>${this.localize('names:1339')}</dt>
            <dd class="type">${this.localize('names:41')}</dd>
            <dd>${unsafeHTML(this.localize('names:1340'))}</dd>
            <dt>${this.localize('names:1341')}</dt>
            <dd class="type">${this.localize('names:41')}</dd>
            <dd>${unsafeHTML(this.localize('names:1342'))}</dd>
            <dt>${this.localize('names:1343')}</dt>
            <dd class="type">${this.localize('names:46')}</dd>
            <dd>${unsafeHTML(this.localize('names:47'))}</dd>
            <dt>${this.localize('names:1344')}</dt>
            <dd class="type">${this.localize('names:72')}</dd>
            <dd>${unsafeHTML(this.localize('names:1345'))}</dd>
            <dt>${this.localize('names:1346')}</dt>
            <dd class="type">${this.localize('names:46')}</dd>
            <dd>${unsafeHTML(this.localize('names:47'))}</dd>
            <dt>${this.localize('names:1346')}</dt>
            <dd class="type">${this.localize('names:1347')}</dd>
            <dd>${unsafeHTML(this.localize('names:1348'))}</dd>
            <dt>${this.localize('names:1349')}</dt>
            <dd class="type">${this.localize('names:41')}</dd>
            <dd>${unsafeHTML(this.localize('names:98'))}</dd>
            <dt>${this.localize('names:1350')}</dt>
            <dd class="type">${this.localize('names:265')}</dd>
            <dd>${unsafeHTML(this.localize('names:685'))}</dd>
            <dt>${this.localize('names:1351')}</dt>
            <dd class="type">${this.localize('names:46')}</dd>
            <dd>${unsafeHTML(this.localize('names:47'))}</dd>
            <dt>${this.localize('names:1352')}</dt>
            <dd class="type">${this.localize('names:46')}</dd>
            <dd>${unsafeHTML(this.localize('names:47'))}</dd>
            <dt>${this.localize('names:1353')}</dt>
            <dd class="type">${this.localize('names:1354')}</dd>
            <dd>${unsafeHTML(this.localize('names:1355'))}</dd>
            <dt>${this.localize('names:1356')}</dt>
            <dd class="type">${this.localize('names:95')}</dd>
            <dd>${unsafeHTML(this.localize('names:1357'))}</dd>
            <dt>${this.localize('names:1358')}</dt>
            <dd class="type">${this.localize('names:95')}</dd>
            <dd>${unsafeHTML(this.localize('names:1359'))}</dd>
            <dt>${this.localize('names:1360')}</dt>
            <dd class="type">${this.localize('names:46')}</dd>
            <dd>${unsafeHTML(this.localize('names:47'))}</dd>
            <dt>${this.localize('names:1361')}</dt>
            <dd class="type">${this.localize('names:41')}</dd>
            <dd>${unsafeHTML(this.localize('names:390'))}</dd>
            <dt>${this.localize('names:1362')}</dt>
            <dd class="type">${this.localize('names:290')}</dd>
            <dd>${unsafeHTML(this.localize('names:1363'))}</dd>
            <dt>${this.localize('names:1364')}</dt>
            <dd class="type">${this.localize('names:46')}</dd>
            <dd>${unsafeHTML(this.localize('names:47'))}</dd>
            <dt>${this.localize('names:1364')}</dt>
            <dd class="type">${this.localize('names:1365')}</dd>
            <dd>${unsafeHTML(this.localize('names:1366'))}</dd>
            <dt>${this.localize('names:1364')}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:1367'))}</dd>
            <dd>${unsafeHTML(this.localize('names:558'))}</dd>
            <dt>${this.localize('names:1368')}</dt>
            <dd class="type">${this.localize('names:1369')}</dd>
            <dd>${unsafeHTML(this.localize('names:104'))}</dd>
            <dt>${this.localize('names:1370')}</dt>
            <dd class="type">${this.localize('names:313')}</dd>
            <dd>${unsafeHTML(this.localize('names:1371'))}</dd>
          </dl>
          <h2 id="v">${this.localize('names:1372')}</h2>
          <dl>
            <dt>${this.localize('names:1373')}</dt>
            <dd class="type">${this.localize('names:313')}</dd>
            <dd>${unsafeHTML(this.localize('names:1374'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:1375'))}</dd>
            <dt>${this.localize('names:1376')}</dt>
            <dd class="type">${this.localize('names:55')}</dd>
            <dd>${unsafeHTML(this.localize('names:1377'))}</dd>
            <dt>${this.localize('names:1378')}</dt>
            <dd class="type">${this.localize('names:290')}</dd>
            <dd>${unsafeHTML(this.localize('names:1379'))}</dd>
            <dt>${this.localize('names:1380')}</dt>
            <dd class="type">${this.localize('names:92')}</dd>
            <dd>${unsafeHTML(this.localize('names:1381'))}</dd>
            <dt>${this.localize('names:1382')}</dt>
            <dd class="type">${this.localize('names:1383')}</dd>
            <dd></dd>
            <dd>${unsafeHTML(this.localize('names:837'))}</dd>
            <dt>${this.localize('names:1384')}</dt>
            <dd class="type">${this.localize('names:123')}</dd>
            <dd>${unsafeHTML(this.localize('names:1385'))}</dd>
            <dt>${this.localize('names:1386')}</dt>
            <dd class="type">${this.localize('names:629')}</dd>
            <dd>${unsafeHTML(this.localize('names:1387'))}</dd>
            <dt>${this.localize('names:1388')}</dt>
            <dd class="type">${this.localize('names:41')}</dd>
            <dd>${unsafeHTML(this.localize('names:1389'))}</dd>
            <dt>${this.localize('names:1390')}</dt>
            <dd class="type">${this.localize('names:41')}</dd>
            <dd>${unsafeHTML(this.localize('names:1391'))}</dd>
            <dt>${this.localize('names:1392')}</dt>
            <dd class="type">${this.localize('names:126')}</dd>
            <dd>${unsafeHTML(this.localize('names:127'))}</dd>
            <dt>${this.localize('names:1393')}</dt>
            <dd class="type">${this.localize('names:126')}</dd>
            <dd>${unsafeHTML(this.localize('names:127'))}</dd>
            <dt>${this.localize('names:1394')}</dt>
            <dd class="type">${this.localize('names:41')}</dd>
            <dd>${unsafeHTML(this.localize('names:1395'))}</dd>
            <dt>${this.localize('names:1396')}</dt>
            <dd>${unsafeHTML(this.localize('names:1166'))}</dd>
            <dt>${this.localize('names:1397')}</dt>
            <dd class="type">${this.localize('names:1398')}</dd>
            <dd>${unsafeHTML(this.localize('names:1399'))}</dd>
            <dt>${this.localize('names:1400')}</dt>
            <dd class="type">${this.localize('names:123')}</dd>
            <dd>${unsafeHTML(this.localize('names:174'))}</dd>
            <dt id="varanasi">${this.localize('names:1401')}</dt>
            <dd class="type">${this.localize('names:1402')}</dd>
            <dd>${unsafeHTML(this.localize('names:1403'))}</dd>
            <dt>${this.localize('names:1404')}</dt>
            <dd class="type">${this.localize('names:48')}</dd>
            <dd>${unsafeHTML(this.localize('names:49'))}</dd>
            <dt>${this.localize('names:1404')}</dt>
            <dd class="type">${this.localize('names:92')}</dd>
            <dd>${unsafeHTML(this.localize('names:1405'))}</dd>
            <dt>${this.localize('names:1406')}</dt>
            <dd class="type">${this.localize('names:1407')}</dd>
            <dd>${unsafeHTML(this.localize('names:837'))}</dd>
            <dt>${this.localize('names:1408')}</dt>
            <dd class="type">${this.localize('names:162')}</dd>
            <dd>${unsafeHTML(this.localize('names:1409'))}</dd>
            <dt>${this.localize('names:1410')}</dt>
            <dd class="type">${this.localize('names:48')}</dd>
            <dd>${unsafeHTML(this.localize('names:49'))}</dd>
            <dt>${this.localize('names:1411')}</dt>
            <dd class="type">${this.localize('names:162')}</dd>
            <dd>${unsafeHTML(this.localize('names:630'))}</dd>
            <dt>${this.localize('names:1412')}</dt>
            <dd class="type">${this.localize('names:126')}</dd>
            <dd>${unsafeHTML(this.localize('names:127'))}</dd>
            <dt>${this.localize('names:1413')}</dt>
            <dd class="type">${this.localize('names:290')}</dd>
            <dd>${unsafeHTML(this.localize('names:788'))}</dd>
            <dt>${this.localize('names:1414')}</dt>
            <dd>${unsafeHTML(this.localize('names:247'))}</dd>
            <dt>${this.localize('names:1415')}</dt>
            <dd>${unsafeHTML(this.localize('names:1416'))}</dd>
            <dt>${this.localize('names:1417')}</dt>
            <dd class="type">${this.localize('names:46')}</dd>
            <dd>${unsafeHTML(this.localize('names:47'))}</dd>
            <dt>${this.localize('names:1418')}</dt>
            <dd class="type">${this.localize('names:443')}</dd>
            <dd>${unsafeHTML(this.localize('names:1419'))}</dd>
            <dt>${this.localize('names:1420')}</dt>
            <dd class="type">${this.localize('names:1421')}</dd>
            <dd>${unsafeHTML(this.localize('names:572'))}</dd>
            <dt>${this.localize('names:1422')}</dt>
            <dd class="type">${this.localize('names:48')}</dd>
            <dd>${unsafeHTML(this.localize('names:49'))}</dd>
            <dt>${this.localize('names:1423')}</dt>
            <dd class="type">${this.localize('names:77')}</dd>
            <dd>${unsafeHTML(this.localize('names:186'))}</dd>
            <dt>${this.localize('names:1424')}</dt>
            <dd class="type">${this.localize('names:162')}</dd>
            <dd>${unsafeHTML(this.localize('names:49'))}</dd>
            <dt>${this.localize('names:1425')}</dt>
            <dd class="type">${this.localize('names:210')}</dd>
            <dd>${unsafeHTML(this.localize('names:1426'))}</dd>
            <dt>${this.localize('names:1427')}</dt>
            <dd class="type">${this.localize('names:443')}</dd>
            <dd>${unsafeHTML(this.localize('names:1428'))}</dd>
            <dt>${this.localize('names:1429')}</dt>
            <dd class="type">${this.localize('names:1430')}</dd>
            <dd>${unsafeHTML(this.localize('names:1431'))}</dd>
            <dt>${this.localize('names:1432')}</dt>
            <dd class="type">${this.localize('names:1433')}</dd>
            <dd>${unsafeHTML(this.localize('names:1434'))}</dd>
            <dt>${this.localize('names:1435')}</dt>
            <dd class="type">${this.localize('names:210')}</dd>
            <dd>${unsafeHTML(this.localize('names:49'))}</dd>
            <dt>${this.localize('names:1436')}</dt>
            <dd class="type">${this.localize('names:95')}</dd>
            <dd>${unsafeHTML(this.localize('names:1437'))}</dd>
            <dt>${this.localize('names:1438')}</dt>
            <dd class="type">${this.localize('names:1439')}</dd>
            <dd>${unsafeHTML(this.localize('names:104'))}</dd>
            <dt>${this.localize('names:1440')}</dt>
            <dd class="type">${this.localize('names:126')}</dd>
            <dd>${unsafeHTML(this.localize('names:127'))}</dd>
            <dt>${this.localize('names:1440')}</dt>
            <dd class="type">${this.localize('names:92')}</dd>
            <dd>${unsafeHTML(this.localize('names:104'))}</dd>
            <dt>${this.localize('names:1440')}</dt>
            <dd class="type">${this.localize('names:1441')}</dd>
            <dd>${unsafeHTML(this.localize('names:49'))}</dd>
            <dt>${this.localize('names:1442')}</dt>
            <dd class="type">${this.localize('names:667')}</dd>
            <dd>${unsafeHTML(this.localize('names:1443'))}</dd>
            <dt>${this.localize('names:1444')}</dt>
            <dd class="type">${this.localize('names:162')}</dd>
            <dd>${unsafeHTML(this.localize('names:49'))}</dd>
            <dt>${this.localize('names:1445')}</dt>
            <dd class="type">${this.localize('names:1446')}</dd>
            <dd>${unsafeHTML(this.localize('names:98'))}</dd>
            <dt>${this.localize('names:1447')}</dt>
            <dd class="type">${this.localize('names:48')}</dd>
            <dd>${unsafeHTML(this.localize('names:49'))}</dd>
            <dt id="videha">${this.localize('names:1448')}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:1449'))}</dd>
            <dd>${unsafeHTML(this.localize('names:1450'))}</dd>
            <dt>${this.localize('names:1451')}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:1452'))}</dd>
            <dd>${unsafeHTML(this.localize('names:1453'))}</dd>
            <dt>${this.localize('names:1454')}</dt>
            <dd class="type">${this.localize('names:290')}</dd>
            <dd>${unsafeHTML(this.localize('names:1455'))}</dd>
            <dt>${this.localize('names:1456')}</dt>
            <dd class="type">${this.localize('names:46')}</dd>
            <dd>${unsafeHTML(this.localize('names:47'))}</dd>
            <dt>${this.localize('names:1457')}</dt>
            <dd class="type">${this.localize('names:41')}</dd>
            <dd>${unsafeHTML(this.localize('names:1458'))}</dd>
            <dt>${this.localize('names:1459')}</dt>
            <dd class="type">${this.localize('names:46')}</dd>
            <dd>${unsafeHTML(this.localize('names:47'))}</dd>
            <dt>${this.localize('names:1460')}</dt>
            <dd class="type">${this.localize('names:1461')}</dd>
            <dd>${unsafeHTML(this.localize('names:1462'))}</dd>
            <dt>${this.localize('names:1463')}</dt>
            <dd class="type">${this.localize('names:41')}</dd>
            <dd>${unsafeHTML(this.localize('names:1464'))}</dd>
            <dt>${this.localize('names:1465')}</dt>
            <dd class="type">${this.localize('names:1466')}</dd>
            <dd>${unsafeHTML(this.localize('names:104'))}</dd>
            <dt>${this.localize('names:1467')}</dt>
            <dd class="type">${this.localize('names:1468')}</dd>
            <dd>${unsafeHTML(this.localize('names:301'))}</dd>
            <dt>${this.localize('names:1469')}</dt>
            <dd class="type">${this.localize('names:807')}</dd>
            <dd>${unsafeHTML(this.localize('names:1470'))}</dd>
            <dt id="visakha1">${this.localize('names:1471')}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:1472'))}</dd>
            <dd>${unsafeHTML(this.localize('names:1473'))}</dd>
            <dt>${this.localize('names:1474')}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:1475'))}</dd>
            <dd>${unsafeHTML(this.localize('names:375'))}</dd>
            <dt>${this.localize('names:1476')}</dt>
            <dd class="type">${this.localize('names:1477')}</dd>
            <dd>${unsafeHTML(this.localize('names:104'))}</dd>
            <dt>${this.localize('names:1478')}</dt>
            <dd class="type">${this.localize('names:162')}</dd>
            <dd>${unsafeHTML(this.localize('names:49'))}</dd>
            <dt>${this.localize('names:1479')}</dt>
            <dd>${unsafeHTML(this.localize('names:1480'))}</dd>
            <dt>${this.localize('names:1481')}</dt>
            <dd>${unsafeHTML(this.localize('names:1482'))}</dd>
          </dl>
          <h2 id="wxyz">${this.localize('names:1483')}</h2>
          <dl>
            <dt>${this.localize('names:1484')}</dt>
            <dd class="type">${this.localize('names:162')}</dd>
            <dd>${unsafeHTML(this.localize('names:1485'))}</dd>
            <dt>${this.localize('names:1486')}</dt>
            <dd class="type">${this.localize('names:41')}</dd>
            <dd>${unsafeHTML(this.localize('names:1487'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:1488'))}</dd>
            <dt>${this.localize('names:1489')}</dt>
            <dd class="type">${this.localize('names:126')}</dd>
            <dd>${unsafeHTML(this.localize('names:127'))}</dd>
            <dt>${this.localize('names:1490')}</dt>
            <dd class="type">${this.localize('names:55')}</dd>
            <dd>${unsafeHTML(this.localize('names:1491'))}</dd>
            <dt>${this.localize('names:1492')}</dt>
            <dd class="type">${this.localize('names:41')}</dd>
            <dd>${unsafeHTML(this.localize('names:1493'))}</dd>
            <dt>${this.localize('names:1494')}</dt>
            <dd class="type">${this.localize('names:46')}</dd>
            <dd>${unsafeHTML(this.localize('names:47'))}</dd>
            <dt>${this.localize('names:1495')}</dt>
            <dd class="type">${this.localize('names:41')}</dd>
            <dd>${unsafeHTML(this.localize('names:1496'))}</dd>
            <dt>${this.localize('names:1497')}</dt>
            <dd class="type">${this.localize('names:1498')}</dd>
            <dd>${unsafeHTML(this.localize('names:1499'))}</dd>
            <dt>${this.localize('names:1500')}</dt>
            <dd class="type">${this.localize('names:1501')}</dd>
            <dd>${unsafeHTML(this.localize('names:1502'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:1503'))}</dd>
            <dt>${this.localize('names:1504')}</dt>
            <dd class="type">${this.localize('names:92')}</dd>
            <dd>${unsafeHTML(this.localize('names:104'))}</dd>
          </dl>
          <aside class="about-index">
            <p>${unsafeHTML(this.localize('names:2'))}</p>
            <ul>
              <li>${this.localize('names:3')}</li>
              <li>${this.localize('names:4')}</li>
              <li>${this.localize('names:5')}</li>
              <li>${this.localize('names:6')}</li>
              <li>${this.localize('names:7')}</li>
              <li>${unsafeHTML(this.localize('names:8'))}</li>
            </ul>
            <p>${this.localize('names:9')}</p>
            <ul>
              <li>${this.localize('names:10')}</li>
              <li>${this.localize('names:11')}</li>
              <li>${this.localize('names:12')}</li>
              <li>${this.localize('names:13')}</li>
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
