import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

import { layoutSimpleStyles } from '../styles/sc-layout-simple-styles';
import { typographyCommonStyles } from '../styles/sc-typography-common-styles';
import { typographyStaticStyles } from '../styles/sc-typography-static-styles';
import { SCStaticPage } from '../addons/sc-static-page';

class SCStaticSubjects extends SCStaticPage {
  render() {
    return html`
      <style>
        ${layoutSimpleStyles}
        ${typographyCommonStyles}
        ${typographyStaticStyles}
      </style>
      <main>
        <article>
          <h1>${unsafeHTML(this.localize('subjects:1'))}</h1>
          <nav class="contents">
            <ul class="entry-list">
              <li>${unsafeHTML(this.localize('subjects:2'))}</li>
              <li>${unsafeHTML(this.localize('subjects:3'))}</li>
              <li>${unsafeHTML(this.localize('subjects:4'))}</li>
              <li>${unsafeHTML(this.localize('subjects:5'))}</li>
              <li>${unsafeHTML(this.localize('subjects:6'))}</li>
              <li>${unsafeHTML(this.localize('subjects:7'))}</li>
              <li>${unsafeHTML(this.localize('subjects:8'))}</li>
              <li>${unsafeHTML(this.localize('subjects:9'))}</li>
              <li>${unsafeHTML(this.localize('subjects:10'))}</li>
              <li>${unsafeHTML(this.localize('subjects:11'))}</li>
              <li>${unsafeHTML(this.localize('subjects:12'))}</li>
              <li>${unsafeHTML(this.localize('subjects:13'))}</li>
              <li>${unsafeHTML(this.localize('subjects:14'))}</li>
              <li>${unsafeHTML(this.localize('subjects:15'))}</li>
              <li>${unsafeHTML(this.localize('subjects:16'))}</li>
              <li>${unsafeHTML(this.localize('subjects:17'))}</li>
              <li>${unsafeHTML(this.localize('subjects:18'))}</li>
              <li>${unsafeHTML(this.localize('subjects:19'))}</li>
              <li>${unsafeHTML(this.localize('subjects:20'))}</li>
              <li>${unsafeHTML(this.localize('subjects:21'))}</li>
              <li>${unsafeHTML(this.localize('subjects:22'))}</li>
              <li>${unsafeHTML(this.localize('subjects:23'))}</li>
              <li>${unsafeHTML(this.localize('subjects:24'))}</li>
              <li>${unsafeHTML(this.localize('subjects:25'))}</li>
            </ul>
          </nav>
          <h2 id="a">${unsafeHTML(this.localize('subjects:26'))}</h2>
          <dl>
            <dt id="adhitthana">${unsafeHTML(this.localize('subjects:27'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:28'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:29'))}</dd>
            <dt id="adinava">${unsafeHTML(this.localize('subjects:30'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:31'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:32'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:33'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:34'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:35'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:36'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:37'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:38'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:39'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:40'))}</dd>
            <dt>${unsafeHTML(this.localize('subjects:41'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:42'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:43'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:44'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:45'))}</dd>
            <dt id="aging">${unsafeHTML(this.localize('subjects:46'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:47'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:48'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:49'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:50'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:51'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:52'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:53'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:54'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:55'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:56'))}</dd>
            <dt id="anapanasati">${unsafeHTML(this.localize('subjects:57'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:58'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:59'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:60'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:61'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:62'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:63'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:64'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:65'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:66'))}</dd>
            <dt id="anatta">${unsafeHTML(this.localize('subjects:67'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:68'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:69'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:70'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:71'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:72'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:73'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:74'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:75'))}</dd>
            <dt id="anger">${unsafeHTML(this.localize('subjects:76'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:77'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:78'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:79'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:80'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:81'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:82'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:83'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:84'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:85'))}</dd>
            <dt id="anicca">${unsafeHTML(this.localize('subjects:86'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:87'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:88'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:89'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:90'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:91'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:92'))}</dd>
            <dt id="anusaya">${unsafeHTML(this.localize('subjects:93'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:94'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:95'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:96'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:97'))}</dd>
            <dt>${unsafeHTML(this.localize('subjects:98'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:99'))}</dd>
            <dt id="apaya-mukha">${unsafeHTML(this.localize('subjects:100'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:101'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:102'))}</dd>
            <dt id="appamada">${unsafeHTML(this.localize('subjects:103'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:104'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:105'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:106'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:107'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:108'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:109'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:110'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:111'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:112'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:113'))}</dd>
            <dt>${unsafeHTML(this.localize('subjects:114'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:115'))}</dd>
            <dt id="arahant">${unsafeHTML(this.localize('subjects:116'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:117'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:118'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:119'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:120'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:121'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:122'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:123'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:124'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:125'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:126'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:127'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:128'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:129'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:130'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:131'))}</dd>
            <dt>${unsafeHTML(this.localize('subjects:132'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:133'))}</dd>
            <dt>${unsafeHTML(this.localize('subjects:134'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:135'))}</dd>
            <dt id="asava">${unsafeHTML(this.localize('subjects:136'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:137'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:138'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:139'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:140'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:141'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:142'))}</dd>
            <dt id="ascetic">${unsafeHTML(this.localize('subjects:143'))}</dt>
            <dd>${unsafeHTML(this.localize('subjects:144'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:145'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:146'))}</dd>
            <dt id="asubha">${unsafeHTML(this.localize('subjects:147'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:148'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:149'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:150'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:151'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:152'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:153'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:154'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:155'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:156'))}</dd>
            <dt id="attachment">${unsafeHTML(this.localize('subjects:157'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:158'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:159'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:160'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:161'))}</dd>
            <dt id="attha-sila">${unsafeHTML(this.localize('subjects:162'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:163'))}</dd>
            <dt id="aversion">${unsafeHTML(this.localize('subjects:164'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:165'))}</dd>
            <dt id="avijja">${unsafeHTML(this.localize('subjects:166'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:167'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:168'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:169'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:170'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:171'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:172'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:173'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:174'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:175'))}</dd>
            <dt id="awakening">${unsafeHTML(this.localize('subjects:176'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:177'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:178'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:179'))}</dd>
            <dt id="awareness">${unsafeHTML(this.localize('subjects:180'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:181'))}</dd>
            <dt id="ayoniso">${unsafeHTML(this.localize('subjects:182'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:183'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:184'))}</dd>
          </dl>
          <h2 id="b">${unsafeHTML(this.localize('subjects:185'))}</h2>
          <dl>
            <dt>${unsafeHTML(this.localize('subjects:186'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:187'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:188'))}</dd>
            <dt id="beauty">${unsafeHTML(this.localize('subjects:189'))}</dt>
            <dd>${unsafeHTML(this.localize('subjects:190'))}</dd>
            <dt id="bhava">${unsafeHTML(this.localize('subjects:191'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:192'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:193'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:194'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:195'))}</dd>
            <dt>${unsafeHTML(this.localize('subjects:196'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:197'))}</dd>
            <dt>${unsafeHTML(this.localize('subjects:198'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:199'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:200'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:201'))}</dd>
            <dt>${unsafeHTML(this.localize('subjects:202'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:203'))}</dd>
            <dt id="bodhipakkhiya-dhamma">${unsafeHTML(this.localize('subjects:204'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:205'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:206'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:207'))}</dd>
            <dt>${unsafeHTML(this.localize('subjects:208'))}</dt>
            <dd>${unsafeHTML(this.localize('subjects:209'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:210'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:211'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:212'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:213'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:214'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:215'))}</dd>
            <dt id="body">${unsafeHTML(this.localize('subjects:216'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:217'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:218'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:219'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:220'))}</dd>
            <dt id="bojjhanga">${unsafeHTML(this.localize('subjects:221'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:222'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:223'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:224'))}</dd>
            <dt id="brahmavihara">${unsafeHTML(this.localize('subjects:225'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:226'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:227'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:228'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:229'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:230'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:231'))}</dd>
            <dt>${unsafeHTML(this.localize('subjects:232'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:233'))}</dd>
            <dt id="buddha">${unsafeHTML(this.localize('subjects:234'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:235'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:236'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:237'))}</dd>
          </dl>
          <h2 id="c">${unsafeHTML(this.localize('subjects:238'))}</h2>
          <dl>
            <dt id="caste">${unsafeHTML(this.localize('subjects:239'))}</dt>
            <dd>${unsafeHTML(this.localize('subjects:240'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:241'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:242'))}</dd>
            <dt id="celibacy">${unsafeHTML(this.localize('subjects:243'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:244'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:245'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:246'))}</dd>
            <dt>${unsafeHTML(this.localize('subjects:247'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:248'))}</dd>
            <dt id="chanting">${unsafeHTML(this.localize('subjects:249'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:250'))}</dd>
            <dt id="children">${unsafeHTML(this.localize('subjects:251'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:252'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:253'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:254'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:255'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:256'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:257'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:258'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:259'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:260'))}</dd>
            <dt>${unsafeHTML(this.localize('subjects:261'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:262'))}</dd>
            <dt id="communal">${unsafeHTML(this.localize('subjects:263'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:264'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:265'))}</dd>
            <dt id="comparative">${unsafeHTML(this.localize('subjects:266'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:267'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:268'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:269'))}</dd>
            <dt>${unsafeHTML(this.localize('subjects:270'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:271'))}</dd>
            <dt>${unsafeHTML(this.localize('subjects:272'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:273'))}</dd>
            <dt>${unsafeHTML(this.localize('subjects:274'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:275'))}</dd>
            <dt id="conflict">${unsafeHTML(this.localize('subjects:276'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:277'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:278'))}</dd>
            <dt>${unsafeHTML(this.localize('subjects:279'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:280'))}</dd>
            <dt>${unsafeHTML(this.localize('subjects:281'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:282'))}</dd>
            <dt>${unsafeHTML(this.localize('subjects:283'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:284'))}</dd>
            <dt id="contentment">${unsafeHTML(this.localize('subjects:285'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:286'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:287'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:288'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:289'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:290'))}</dd>
            <dt>${unsafeHTML(this.localize('subjects:291'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:292'))}</dd>
            <dt>${unsafeHTML(this.localize('subjects:293'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:294'))}</dd>
            <dt>${unsafeHTML(this.localize('subjects:295'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:296'))}</dd>
          </dl>
          <h2 id="d">${unsafeHTML(this.localize('subjects:297'))}</h2>
          <dl>
            <dt id="dana">${unsafeHTML(this.localize('subjects:298'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:299'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:300'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:301'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:302'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:303'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:304'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:305'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:306'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:307'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:308'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:309'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:310'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:311'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:312'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:313'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:314'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:315'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:316'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:317'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:318'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:319'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:320'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:321'))}</dd>
            <dt id="dasasila">${unsafeHTML(this.localize('subjects:322'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:323'))}</dd>
            <dt id="death">${unsafeHTML(this.localize('subjects:324'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:325'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:326'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:327'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:328'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:329'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:330'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:331'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:332'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:333'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:334'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:335'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:336'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:337'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:338'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:339'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:340'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:341'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:342'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:343'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:344'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:345'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:346'))}</dd>
            <dd>
              ${unsafeHTML(this.localize('subjects:347'))}
              <ul>
                <li>${unsafeHTML(this.localize('subjects:348'))}</li>
                <li>${unsafeHTML(this.localize('subjects:349'))}</li>
                <li>${unsafeHTML(this.localize('subjects:350'))}</li>
                <li>${unsafeHTML(this.localize('subjects:351'))}</li>
                <li>${unsafeHTML(this.localize('subjects:352'))}</li>
              </ul>
            </dd>
            <dt id="deathless">${unsafeHTML(this.localize('subjects:353'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:354'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:355'))}</dd>
            <dt>${unsafeHTML(this.localize('subjects:356'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:357'))}</dd>
            <dt>${unsafeHTML(this.localize('subjects:358'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:359'))}</dd>
            <dt id="desire">${unsafeHTML(this.localize('subjects:360'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:361'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:362'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:363'))}</dd>
            <dt id="lobha">${unsafeHTML(this.localize('subjects:364'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:365'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:366'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:367'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:368'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:369'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:370'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:371'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:372'))}</dd>
            <dt id="deva">${unsafeHTML(this.localize('subjects:373'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:374'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:375'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:376'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:377'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:378'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:379'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:380'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:381'))}</dd>
            <dt id="devotion">${unsafeHTML(this.localize('subjects:382'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:383'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:384'))}</dd>
            <dt id="dhamma">${unsafeHTML(this.localize('subjects:385'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:386'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:387'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:388'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:389'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:390'))}</dd>
            <dt id="dhana">${unsafeHTML(this.localize('subjects:391'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:392'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:393'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:394'))}</dd>
            <dt id="dhatu">${unsafeHTML(this.localize('subjects:395'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:396'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:397'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:398'))}</dd>
            <dt>${unsafeHTML(this.localize('subjects:399'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:400'))}</dd>
            <dt>${unsafeHTML(this.localize('subjects:401'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:402'))}</dd>
            <dt id="ditthi">${unsafeHTML(this.localize('subjects:403'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:404'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:405'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:406'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:407'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:408'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:409'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:410'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:411'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:412'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:413'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:414'))}</dd>
            <dt id="divine">${unsafeHTML(this.localize('subjects:415'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:416'))}</dd>
            <dt id="doubt">${unsafeHTML(this.localize('subjects:417'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:418'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:419'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:420'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:421'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:422'))}</dd>
            <dt id="downfall">${unsafeHTML(this.localize('subjects:423'))}</dt>
            <dd>${unsafeHTML(this.localize('subjects:424'))}</dd>
            <dt>${unsafeHTML(this.localize('subjects:425'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:426'))}</dd>
            <dt>${unsafeHTML(this.localize('subjects:427'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:428'))}</dd>
            <dt id="dreams">${unsafeHTML(this.localize('subjects:429'))}</dt>
            <dd>${unsafeHTML(this.localize('subjects:430'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:431'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:432'))}</dd>
            <dt>${unsafeHTML(this.localize('subjects:433'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:434'))}</dd>
            <dt id="dukkha">${unsafeHTML(this.localize('subjects:435'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:436'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:437'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:438'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:439'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:440'))}</dd>
          </dl>
          <h2 id="e">${unsafeHTML(this.localize('subjects:441'))}</h2>
          <dl>
            <dt>${unsafeHTML(this.localize('subjects:442'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:443'))}</dd>
            <dt>${unsafeHTML(this.localize('subjects:444'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:445'))}</dd>
            <dt>${unsafeHTML(this.localize('subjects:446'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:447'))}</dd>
            <dt>${unsafeHTML(this.localize('subjects:448'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:449'))}</dd>
            <dt id="emotion">${unsafeHTML(this.localize('subjects:450'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:451'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:452'))}</dd>
            <dt id="emptiness">${unsafeHTML(this.localize('subjects:453'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:454'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:455'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:456'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:457'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:458'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:459'))}</dd>
            <dt id="engaged">${unsafeHTML(this.localize('subjects:460'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:461'))}</dd>
            <dt>${unsafeHTML(this.localize('subjects:462'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:463'))}</dd>
            <dt>${unsafeHTML(this.localize('subjects:464'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:465'))}</dd>
          </dl>
          <h2 id="f">${unsafeHTML(this.localize('subjects:466'))}</h2>
          <dl>
            <dt>${unsafeHTML(this.localize('subjects:467'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:468'))}</dd>
            <dt>${unsafeHTML(this.localize('subjects:469'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:470'))}</dd>
            <dt id="family">${unsafeHTML(this.localize('subjects:471'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:472'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:473'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:474'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:475'))}</dd>
            <dt id="fear">${unsafeHTML(this.localize('subjects:476'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:477'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:478'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:479'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:480'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:481'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:482'))}</dd>
            <dt>${unsafeHTML(this.localize('subjects:483'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:484'))}</dd>
            <dt>${unsafeHTML(this.localize('subjects:485'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:486'))}</dd>
            <dt>${unsafeHTML(this.localize('subjects:487'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:488'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:489'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:490'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:491'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:492'))}</dd>
            <dt id="fool">${unsafeHTML(this.localize('subjects:493'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:494'))}</dd>
            <dt id="food">${unsafeHTML(this.localize('subjects:495'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:496'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:497'))}</dd>
            <dt id="forest">${unsafeHTML(this.localize('subjects:498'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:499'))}</dd>
            <dt>${unsafeHTML(this.localize('subjects:500'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:501'))}</dd>
            <dt id="fourtruths">${unsafeHTML(this.localize('subjects:502'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:503'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:504'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:505'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:506'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:507'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:508'))}</dd>
            <dt>${unsafeHTML(this.localize('subjects:509'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:510'))}</dd>
          </dl>
          <h2 id="g">${unsafeHTML(this.localize('subjects:511'))}</h2>
          <dl>
            <dt>${unsafeHTML(this.localize('subjects:512'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:513'))}</dd>
            <dt>${unsafeHTML(this.localize('subjects:514'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:515'))}</dd>
            <dt>${unsafeHTML(this.localize('subjects:516'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:517'))}</dd>
            <dt id="god">${unsafeHTML(this.localize('subjects:518'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:519'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:520'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:521'))}</dd>
            <dt>${unsafeHTML(this.localize('subjects:522'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:523'))}</dd>
            <dt>${unsafeHTML(this.localize('subjects:524'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:525'))}</dd>
            <dt id="gradual">${unsafeHTML(this.localize('subjects:526'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:527'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:528'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:529'))}</dd>
            <dt id="gradual_training">${unsafeHTML(this.localize('subjects:530'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:531'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:532'))}</dd>
            <dt id="gratitude">${unsafeHTML(this.localize('subjects:533'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:534'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:535'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:536'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:537'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:538'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:539'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:540'))}</dd>
            <dt id="grief">${unsafeHTML(this.localize('subjects:541'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:542'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:543'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:544'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:545'))}</dd>
            <dt>${unsafeHTML(this.localize('subjects:546'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:547'))}</dd>
          </dl>
          <h2 id="h">${unsafeHTML(this.localize('subjects:548'))}</h2>
          <dl>
            <dt>${unsafeHTML(this.localize('subjects:549'))}</dt>
            <dd>${unsafeHTML(this.localize('subjects:550'))}</dd>
            <dt id="happiness">${unsafeHTML(this.localize('subjects:551'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:552'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:553'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:554'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:555'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:556'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:557'))}</dd>
            <dt>${unsafeHTML(this.localize('subjects:558'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:559'))}</dd>
            <dt>${unsafeHTML(this.localize('subjects:560'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:561'))}</dd>
            <dt>${unsafeHTML(this.localize('subjects:562'))}</dt>
            <dd>${unsafeHTML(this.localize('subjects:563'))}</dd>
            <dt>${unsafeHTML(this.localize('subjects:564'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:565'))}</dd>
            <dt>${unsafeHTML(this.localize('subjects:566'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:567'))}</dd>
            <dt id="hell">${unsafeHTML(this.localize('subjects:568'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:569'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:570'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:571'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:572'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:573'))}</dd>
            <dt>${unsafeHTML(this.localize('subjects:574'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:575'))}</dd>
            <dt id="hiri">${unsafeHTML(this.localize('subjects:576'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:577'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:578'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:579'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:580'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:581'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:582'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:583'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:584'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:585'))}</dd>
            <dt>${unsafeHTML(this.localize('subjects:586'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:587'))}</dd>
            <dt id="householder">${unsafeHTML(this.localize('subjects:588'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:589'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:590'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:591'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:592'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:593'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:594'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:595'))}</dd>
            <dt id="humility">${unsafeHTML(this.localize('subjects:596'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:597'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:598'))}</dd>
          </dl>
          <h2 id="i">${unsafeHTML(this.localize('subjects:599'))}</h2>
          <dl>
            <dt id="iddhipada">${unsafeHTML(this.localize('subjects:600'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:601'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:602'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:603'))}</dd>
            <dt>${unsafeHTML(this.localize('subjects:604'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:605'))}</dd>
            <dt id="ill">${unsafeHTML(this.localize('subjects:606'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:607'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:608'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:609'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:610'))}</dd>
            <dt id="illness">${unsafeHTML(this.localize('subjects:611'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:612'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:613'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:614'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:615'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:616'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:617'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:618'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:619'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:620'))}</dd>
            <dt>${unsafeHTML(this.localize('subjects:621'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:622'))}</dd>
            <dt id="indriya">${unsafeHTML(this.localize('subjects:623'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:624'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:625'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:626'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:627'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:628'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:629'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:630'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:631'))}</dd>
            <dt id="insight">${unsafeHTML(this.localize('subjects:632'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:633'))}</dd>
            <dt id="integrity">${unsafeHTML(this.localize('subjects:634'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:635'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:636'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:637'))}</dd>
            <dt>${unsafeHTML(this.localize('subjects:638'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:639'))}</dd>
          </dl>
          <h2 id="j">${unsafeHTML(this.localize('subjects:640'))}</h2>
          <dl>
            <dt>${unsafeHTML(this.localize('subjects:641'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:642'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:643'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:644'))}</dd>
            <dt id="jati">${unsafeHTML(this.localize('subjects:645'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:646'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:647'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:648'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:649'))}</dd>
            <dt id="jhana">${unsafeHTML(this.localize('subjects:650'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:651'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:652'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:653'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:654'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:655'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:656'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:657'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:658'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:659'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:660'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:661'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:662'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:663'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:664'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:665'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:666'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:667'))}</dd>
            <dt id="joy">${unsafeHTML(this.localize('subjects:668'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:669'))}</dd>
            <dt>${unsafeHTML(this.localize('subjects:670'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:671'))}</dd>
          </dl>
          <h2 id="k">${unsafeHTML(this.localize('subjects:672'))}</h2>
          <dl>
            <dt id="kalyanamittata">${unsafeHTML(this.localize('subjects:673'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:674'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:675'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:676'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:677'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:678'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:679'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:680'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:681'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:682'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:683'))}</dd>
            <dt id="kamma">${unsafeHTML(this.localize('subjects:684'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:685'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:686'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:687'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:688'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:689'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:690'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:691'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:692'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:693'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:694'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:695'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:696'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:697'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:698'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:699'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:700'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:701'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:702'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:703'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:704'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:705'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:706'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:707'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:708'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:709'))}</dd>
            <dt id="karuna">${unsafeHTML(this.localize('subjects:710'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:711'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:712'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:713'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:714'))}</dd>
            <dt id="kayagatasati">${unsafeHTML(this.localize('subjects:715'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:716'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:717'))}</dd>
            <dt id="khandha">${unsafeHTML(this.localize('subjects:718'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:719'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:720'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:721'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:722'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:723'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:724'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:725'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:726'))}</dd>
            <dd>
              ${unsafeHTML(this.localize('subjects:727'))}
              <ul>
                <li>${unsafeHTML(this.localize('subjects:728'))}</li>
                <li>${unsafeHTML(this.localize('subjects:729'))}</li>
                <li>${unsafeHTML(this.localize('subjects:730'))}</li>
                <li>${unsafeHTML(this.localize('subjects:731'))}</li>
                <li>${unsafeHTML(this.localize('subjects:732'))}</li>
              </ul>
            </dd>
            <dt id="khanti">${unsafeHTML(this.localize('subjects:733'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:734'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:735'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:736'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:737'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:738'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:739'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:740'))}</dd>
            <dt id="kilesa">${unsafeHTML(this.localize('subjects:741'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:742'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:743'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:744'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:745'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:746'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:747'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:748'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:749'))}</dd>
            <dt id="killing">${unsafeHTML(this.localize('subjects:750'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:751'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:752'))}</dd>
            <dt id="kusala">${unsafeHTML(this.localize('subjects:753'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:754'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:755'))}</dd>
          </dl>
          <h2 id="l">${unsafeHTML(this.localize('subjects:756'))}</h2>
          <dl>
            <dt id="lay">${unsafeHTML(this.localize('subjects:757'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:758'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:759'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:760'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:761'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:762'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:763'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:764'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:765'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:766'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:767'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:768'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:769'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:770'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:771'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:772'))}</dd>
            <dt id="laziness">${unsafeHTML(this.localize('subjects:773'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:774'))}</dd>
            <dt id="listen">${unsafeHTML(this.localize('subjects:775'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:776'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:777'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:778'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:779'))}</dd>
            <dt id="samma-ajivo">${unsafeHTML(this.localize('subjects:780'))}</dt>
            <dd>${unsafeHTML(this.localize('subjects:781'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:782'))}</dd>
            <dt id="lokadhamma">${unsafeHTML(this.localize('subjects:783'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:784'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:785'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:786'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:787'))}</dd>
            <dt>${unsafeHTML(this.localize('subjects:788'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:789'))}</dd>
            <dt>${unsafeHTML(this.localize('subjects:790'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:791'))}</dd>
          </dl>
          <h2 id="m">${unsafeHTML(this.localize('subjects:792'))}</h2>
          <dl>
            <dt id="mana">${unsafeHTML(this.localize('subjects:793'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:794'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:795'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:796'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:797'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:798'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:799'))}</dd>
            <dt id="manners">${unsafeHTML(this.localize('subjects:800'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:801'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:802'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:803'))}</dd>
            <dt id="mara">${unsafeHTML(this.localize('subjects:804'))}</dt>
            <dd>${unsafeHTML(this.localize('subjects:805'))}</dd>
            <dt id="maranassati">${unsafeHTML(this.localize('subjects:806'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:807'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:808'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:809'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:810'))}</dd>
            <dt id="marriage">${unsafeHTML(this.localize('subjects:811'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:812'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:813'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:814'))}</dd>
            <dt id="meditation">${unsafeHTML(this.localize('subjects:815'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:816'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:817'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:818'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:819'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:820'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:821'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:822'))}</dd>
            <dt id="merit">${unsafeHTML(this.localize('subjects:823'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:824'))}</dd>
            <dt id="metta">${unsafeHTML(this.localize('subjects:825'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:826'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:827'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:828'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:829'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:830'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:831'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:832'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:833'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:834'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:835'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:836'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:837'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:838'))}</dd>
            <dt>${unsafeHTML(this.localize('subjects:839'))}</dt>
            <dd>${unsafeHTML(this.localize('subjects:840'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:841'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:842'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:843'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:844'))}</dd>
            <dt id="mindfulness">${unsafeHTML(this.localize('subjects:845'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:846'))}</dd>
            <dt>${unsafeHTML(this.localize('subjects:847'))}</dt>
            <dd>${unsafeHTML(this.localize('subjects:848'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:849'))}</dd>
            <dt id="moderation">${unsafeHTML(this.localize('subjects:850'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:851'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:852'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:853'))}</dd>
            <dt>${unsafeHTML(this.localize('subjects:854'))}</dt>
            <dd>${unsafeHTML(this.localize('subjects:855'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:856'))}</dd>
            <dt id="monastic">${unsafeHTML(this.localize('subjects:857'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:858'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:859'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:860'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:861'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:862'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:863'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:864'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:865'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:866'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:867'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:868'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:869'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:870'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:871'))}</dd>
            <dt id="money">${unsafeHTML(this.localize('subjects:872'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:873'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:874'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:875'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:876'))}</dd>
            <dt>${unsafeHTML(this.localize('subjects:877'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:878'))}</dd>
            <dt>${unsafeHTML(this.localize('subjects:879'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:880'))}</dd>
            <dt>${unsafeHTML(this.localize('subjects:881'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:882'))}</dd>
            <dt>${unsafeHTML(this.localize('subjects:883'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:884'))}</dd>
            <dt id="mudita">${unsafeHTML(this.localize('subjects:885'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:886'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:887'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:888'))}</dd>
            <dt id="murder">${unsafeHTML(this.localize('subjects:889'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:890'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:891'))}</dd>
          </dl>
          <h2 id="n">${unsafeHTML(this.localize('subjects:892'))}</h2>
          <dl>
            <dt id="namarupa">${unsafeHTML(this.localize('subjects:893'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:894'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:895'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:896'))}</dd>
            <dt id="nekkhamma">${unsafeHTML(this.localize('subjects:897'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:898'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:899'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:900'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:901'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:902'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:903'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:904'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:905'))}</dd>
            <dt id="nibbana">${unsafeHTML(this.localize('subjects:906'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:907'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:908'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:909'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:910'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:911'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:912'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:913'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:914'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:915'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:916'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:917'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:918'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:919'))}</dd>
            <dt id="nibbida">${unsafeHTML(this.localize('subjects:920'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:921'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:922'))}</dd>
            <dt id="nirvana">${unsafeHTML(this.localize('subjects:923'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:924'))}</dd>
            <dt id="nivarana">${unsafeHTML(this.localize('subjects:925'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:926'))}</dd>
            <dd>
              ${unsafeHTML(this.localize('subjects:927'))}
              <ul>
                <li>${unsafeHTML(this.localize('subjects:928'))}</li>
                <li>${unsafeHTML(this.localize('subjects:929'))}</li>
                <li>${unsafeHTML(this.localize('subjects:930'))}</li>
                <li>${unsafeHTML(this.localize('subjects:931'))}</li>
                <li>${unsafeHTML(this.localize('subjects:932'))}</li>
              </ul>
            </dd>
            <dd>${unsafeHTML(this.localize('subjects:933'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:934'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:935'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:936'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:937'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:938'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:939'))}</dd>
            <dt id="eightfold">${unsafeHTML(this.localize('subjects:940'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:941'))}</dd>
            <dd>
              ${unsafeHTML(this.localize('subjects:942'))}
              <dl>
                <dt>${unsafeHTML(this.localize('subjects:943'))}</dt>
                <dd class="description">${unsafeHTML(this.localize('subjects:944'))}</dd>
                <dd>${unsafeHTML(this.localize('subjects:945'))}</dd>
                <dd>${unsafeHTML(this.localize('subjects:946'))}</dd>
                <dd>${unsafeHTML(this.localize('subjects:947'))}</dd>
                <dt>${unsafeHTML(this.localize('subjects:948'))}</dt>
                <dd class="description">${unsafeHTML(this.localize('subjects:949'))}</dd>
                <dd>${unsafeHTML(this.localize('subjects:950'))}</dd>
                <dt>${unsafeHTML(this.localize('subjects:951'))}</dt>
                <dd class="description">${unsafeHTML(this.localize('subjects:952'))}</dd>
                <dd>${unsafeHTML(this.localize('subjects:953'))}</dd>
                <dt>${unsafeHTML(this.localize('subjects:954'))}</dt>
                <dd class="description">${unsafeHTML(this.localize('subjects:955'))}</dd>
                <dt>${unsafeHTML(this.localize('subjects:956'))}</dt>
                <dd class="description">${unsafeHTML(this.localize('subjects:957'))}</dd>
                <dt>${unsafeHTML(this.localize('subjects:958'))}</dt>
                <dd class="description">${unsafeHTML(this.localize('subjects:959'))}</dd>
                <dt>${unsafeHTML(this.localize('subjects:960'))}</dt>
                <dd class="description">${unsafeHTML(this.localize('subjects:961'))}</dd>
                <dt>${unsafeHTML(this.localize('subjects:962'))}</dt>
                <dd class="description">${unsafeHTML(this.localize('subjects:963'))}</dd>
                <dd>${unsafeHTML(this.localize('subjects:964'))}</dd>
              </dl>
            </dd>
            <dt id="silence">${unsafeHTML(this.localize('subjects:965'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:966'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:967'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:968'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:969'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:970'))}</dd>
            <dt>${unsafeHTML(this.localize('subjects:971'))}</dt>
            <dd>${unsafeHTML(this.localize('subjects:972'))}</dd>
            <dt id="ahimsa">${unsafeHTML(this.localize('subjects:973'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:974'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:975'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:976'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:977'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:978'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:979'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:980'))}</dd>
            <dt>${unsafeHTML(this.localize('subjects:981'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:982'))}</dd>
            <dt id="nutriment">${unsafeHTML(this.localize('subjects:983'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:984'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:985'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:986'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:987'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:988'))}</dd>
            <dt>${unsafeHTML(this.localize('subjects:989'))}</dt>
            <dd>${unsafeHTML(this.localize('subjects:990'))}</dd>
          </dl>
          <h2 id="o">${unsafeHTML(this.localize('subjects:991'))}</h2>
          <dl>
            <dt id="ottappa">${unsafeHTML(this.localize('subjects:992'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:993'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:994'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:995'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:996'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:997'))}</dd>
          </dl>
          <h2 id="p">${unsafeHTML(this.localize('subjects:998'))}</h2>
          <dl>
            <dt id="pain">${unsafeHTML(this.localize('subjects:999'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1000'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1001'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1002'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1003'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1004'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1005'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1006'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1007'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1008'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1009'))}</dd>
            <dt id="pancasila">${unsafeHTML(this.localize('subjects:1010'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1011'))}</dd>
            <dt id="panna">${unsafeHTML(this.localize('subjects:1012'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1013'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1014'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1015'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1016'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1017'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1018'))}</dd>
            <dt id="papanca">${unsafeHTML(this.localize('subjects:1019'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1020'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1021'))}</dd>
            <dt id="parami">${unsafeHTML(this.localize('subjects:1022'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1023'))}</dd>
            <dd>
              ${unsafeHTML(this.localize('subjects:1024'))}
              <ul>
                <li>${unsafeHTML(this.localize('subjects:1025'))}</li>
                <li>${unsafeHTML(this.localize('subjects:1026'))}</li>
                <li>${unsafeHTML(this.localize('subjects:1027'))}</li>
                <li>${unsafeHTML(this.localize('subjects:1028'))}</li>
                <li>${unsafeHTML(this.localize('subjects:1029'))}</li>
                <li>${unsafeHTML(this.localize('subjects:1030'))}</li>
                <li>${unsafeHTML(this.localize('subjects:1031'))}</li>
                <li>${unsafeHTML(this.localize('subjects:1032'))}</li>
                <li>${unsafeHTML(this.localize('subjects:1033'))}</li>
                <li>${unsafeHTML(this.localize('subjects:1034'))}</li>
              </ul>
            </dd>
            <dt id="parents">${unsafeHTML(this.localize('subjects:1035'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1036'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1037'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1038'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1039'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1040'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1041'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1042'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1043'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1044'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1045'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1046'))}</dd>
            <dt id="parinibbana">${unsafeHTML(this.localize('subjects:1047'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1048'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1049'))}</dd>
            <dt id="parisa">${unsafeHTML(this.localize('subjects:1050'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1051'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1052'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1053'))}</dd>
            <dt id="pasada">${unsafeHTML(this.localize('subjects:1054'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1055'))}</dd>
            <dt id="ps">${unsafeHTML(this.localize('subjects:1056'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1057'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1058'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1059'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1060'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1061'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1062'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1063'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1064'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1065'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1066'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1067'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1068'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1069'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1070'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1071'))}</dd>
            <dd>
              ${unsafeHTML(this.localize('subjects:1072'))}
              <ul>
                <li>${unsafeHTML(this.localize('subjects:1073'))}</li>
                <li>${unsafeHTML(this.localize('subjects:1074'))}</li>
                <li>${unsafeHTML(this.localize('subjects:1075'))}</li>
                <li>${unsafeHTML(this.localize('subjects:1076'))}</li>
                <li>${unsafeHTML(this.localize('subjects:1077'))}</li>
                <li>${unsafeHTML(this.localize('subjects:1078'))}</li>
                <li>${unsafeHTML(this.localize('subjects:1079'))}</li>
                <li>${unsafeHTML(this.localize('subjects:1080'))}</li>
                <li>${unsafeHTML(this.localize('subjects:1081'))}</li>
                <li>${unsafeHTML(this.localize('subjects:1082'))}</li>
                <li>${unsafeHTML(this.localize('subjects:1083'))}</li>
                <li>${unsafeHTML(this.localize('subjects:1084'))}</li>
              </ul>
            </dd>
            <dt>${unsafeHTML(this.localize('subjects:1085'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1086'))}</dd>
            <dt id="patimokkha">${unsafeHTML(this.localize('subjects:1087'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1088'))}</dd>
            <dt>${unsafeHTML(this.localize('subjects:1089'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1090'))}</dd>
            <dt>${unsafeHTML(this.localize('subjects:1091'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1092'))}</dd>
            <dt id="peta">${unsafeHTML(this.localize('subjects:1093'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1094'))}</dd>
            <dt id="phassa">${unsafeHTML(this.localize('subjects:1095'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1096'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1097'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1098'))}</dd>
            <dt id="piti">${unsafeHTML(this.localize('subjects:1099'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1100'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1101'))}</dd>
            <dt id="planes">${unsafeHTML(this.localize('subjects:1102'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1103'))}</dd>
            <dt id="pleasure">${unsafeHTML(this.localize('subjects:1104'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1105'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1106'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1107'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1108'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1109'))}</dd>
            <dt id="precepts">${unsafeHTML(this.localize('subjects:1110'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1111'))}</dd>
            <dd>
              ${unsafeHTML(this.localize('subjects:1112'))}
              <dl>
                <dt>${unsafeHTML(this.localize('subjects:1113'))}</dt>
                <dd class="description">${unsafeHTML(this.localize('subjects:1114'))}</dd>
                <dd>${unsafeHTML(this.localize('subjects:1115'))}</dd>
                <dd>${unsafeHTML(this.localize('subjects:1116'))}</dd>
                <dd>${unsafeHTML(this.localize('subjects:1117'))}</dd>
                <dt>${unsafeHTML(this.localize('subjects:1118'))}</dt>
                <dd class="description">${unsafeHTML(this.localize('subjects:1119'))}</dd>
                <dd>${unsafeHTML(this.localize('subjects:1120'))}</dd>
                <dd>${unsafeHTML(this.localize('subjects:1121'))}</dd>
                <dt>${unsafeHTML(this.localize('subjects:1122'))}</dt>
                <dd class="description">${unsafeHTML(this.localize('subjects:1123'))}</dd>
                <dt>${unsafeHTML(this.localize('subjects:1124'))}</dt>
              </dl>
            </dd>
            <dt id="present">${unsafeHTML(this.localize('subjects:1125'))}</dt>
            <dd>${unsafeHTML(this.localize('subjects:1126'))}</dd>
            <dt id="protection">${unsafeHTML(this.localize('subjects:1127'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1128'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1129'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1130'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1131'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1132'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1133'))}</dd>
            <dt>${unsafeHTML(this.localize('subjects:1134'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1135'))}</dd>
            <dt id="punna">${unsafeHTML(this.localize('subjects:1136'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1137'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1138'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1139'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1140'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1141'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1142'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1143'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1144'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1145'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1146'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1147'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1148'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1149'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1150'))}</dd>
          </dl>
          <h2 id="qq">${unsafeHTML(this.localize('subjects:1151'))}</h2>
          <dl>
            <dt>${unsafeHTML(this.localize('subjects:1152'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1153'))}</dd>
            <dt id="questions">${unsafeHTML(this.localize('subjects:1154'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1155'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1156'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1157'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1158'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1159'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1160'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1161'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1162'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1163'))}</dd>
          </dl>
          <h2 id="r">${unsafeHTML(this.localize('subjects:1164'))}</h2>
          <dl>
            <dt>${unsafeHTML(this.localize('subjects:1165'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1166'))}</dd>
            <dt id="radiant">${unsafeHTML(this.localize('subjects:1167'))}</dt>
            <dd>${unsafeHTML(this.localize('subjects:1168'))}</dd>
            <dt>${unsafeHTML(this.localize('subjects:1169'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1170'))}</dd>
            <dt>${unsafeHTML(this.localize('subjects:1171'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1172'))}</dd>
            <dt id="rebirth">${unsafeHTML(this.localize('subjects:1173'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1174'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1175'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1176'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1177'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1178'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1179'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1180'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1181'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1182'))}</dd>
            <dt id="recollections">${unsafeHTML(this.localize('subjects:1183'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1184'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1185'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1186'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1187'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1188'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1189'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1190'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1191'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1192'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1193'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1194'))}</dd>
            <dt id="reconciliation">${unsafeHTML(this.localize('subjects:1195'))}</dt>
            <dt id="refuge">${unsafeHTML(this.localize('subjects:1196'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1197'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1198'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1199'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1200'))}</dd>
            <dt>${unsafeHTML(this.localize('subjects:1201'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1202'))}</dd>
            <dt id="relics">${unsafeHTML(this.localize('subjects:1203'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1204'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1205'))}</dd>
            <dt id="remorse">${unsafeHTML(this.localize('subjects:1206'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1207'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1208'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1209'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1210'))}</dd>
            <dt>${unsafeHTML(this.localize('subjects:1211'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1212'))}</dd>
            <dt id="respect">${unsafeHTML(this.localize('subjects:1213'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1214'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1215'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1216'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1217'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1218'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1219'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1220'))}</dd>
            <dt id="restlessness">${unsafeHTML(this.localize('subjects:1221'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1222'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1223'))}</dd>
            <dt id="restraint">${unsafeHTML(this.localize('subjects:1224'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1225'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1226'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1227'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1228'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1229'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1230'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1231'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1232'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1233'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1234'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1235'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1236'))}</dd>
            <dt id="revenge">${unsafeHTML(this.localize('subjects:1237'))}</dt>
            <dd>${unsafeHTML(this.localize('subjects:1238'))}</dd>
            <dt>${unsafeHTML(this.localize('subjects:1239'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1240'))}</dd>
            <dt>${unsafeHTML(this.localize('subjects:1241'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1242'))}</dd>
            <dt>${unsafeHTML(this.localize('subjects:1243'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1244'))}</dd>
            <dt>${unsafeHTML(this.localize('subjects:1245'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1246'))}</dd>
            <dt>${unsafeHTML(this.localize('subjects:1247'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1248'))}</dd>
            <dt>${unsafeHTML(this.localize('subjects:1249'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1250'))}</dd>
            <dt>${unsafeHTML(this.localize('subjects:1251'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1252'))}</dd>
            <dt>${unsafeHTML(this.localize('subjects:1253'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1254'))}</dd>
            <dt>${unsafeHTML(this.localize('subjects:1255'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1256'))}</dd>
            <dt id="rituals">${unsafeHTML(this.localize('subjects:1257'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1258'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1259'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1260'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1261'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1262'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1263'))}</dd>
          </dl>
          <h2 id="s">${unsafeHTML(this.localize('subjects:1264'))}</h2>
          <dl>
            <dt id="sacca">${unsafeHTML(this.localize('subjects:1265'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1266'))}</dd>
            <dt id="saddha">${unsafeHTML(this.localize('subjects:1267'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1268'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1269'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1270'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1271'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1272'))}</dd>
            <dt id="sagga">${unsafeHTML(this.localize('subjects:1273'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1274'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1275'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1276'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1277'))}</dd>
            <dt id="sakkaya">${unsafeHTML(this.localize('subjects:1278'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1279'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1280'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1281'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1282'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1283'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1284'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1285'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1286'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1287'))}</dd>
            <dt id="salayatana">${unsafeHTML(this.localize('subjects:1288'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1289'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1290'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1291'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1292'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1293'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1294'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1295'))}</dd>
            <dt id="samadhi">${unsafeHTML(this.localize('subjects:1296'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1297'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1298'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1299'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1300'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1301'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1302'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1303'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1304'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1305'))}</dd>
            <dt id="samatha">${unsafeHTML(this.localize('subjects:1306'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1307'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1308'))}</dd>
            <dt id="sammappadhana">${unsafeHTML(this.localize('subjects:1309'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1310'))}</dd>
            <dt id="sampajanna">${unsafeHTML(this.localize('subjects:1311'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1312'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1313'))}</dd>
            <dt id="samsara">${unsafeHTML(this.localize('subjects:1314'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1315'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1316'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1317'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1318'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1319'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1320'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1321'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1322'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1323'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1324'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1325'))}</dd>
            <dt id="samvega">${unsafeHTML(this.localize('subjects:1326'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1327'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1328'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1329'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1330'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1331'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1332'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1333'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1334'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1335'))}</dd>
            <dt id="sangha">${unsafeHTML(this.localize('subjects:1336'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1337'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1338'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1339'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1340'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1341'))}</dd>
            <dt id="sankhara">${unsafeHTML(this.localize('subjects:1342'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1343'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1344'))}</dd>
            <dt id="sanyojana">${unsafeHTML(this.localize('subjects:1345'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1346'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1347'))}</dd>
            <dt id="sanna">${unsafeHTML(this.localize('subjects:1348'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1349'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1350'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1351'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1352'))}</dd>
            <dt id="sati">${unsafeHTML(this.localize('subjects:1353'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1354'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1355'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1356'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1357'))}</dd>
            <dt id="satipatthana">${unsafeHTML(this.localize('subjects:1358'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1359'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1360'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1361'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1362'))}</dd>
            <dt>${unsafeHTML(this.localize('subjects:1363'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1364'))}</dd>
            <dt>${unsafeHTML(this.localize('subjects:1365'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1366'))}</dd>
            <dt id="sensuality">${unsafeHTML(this.localize('subjects:1367'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1368'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1369'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1370'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1371'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1372'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1373'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1374'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1375'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1376'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1377'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1378'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1379'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1380'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1381'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1382'))}</dd>
            <dt id="separation">${unsafeHTML(this.localize('subjects:1383'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1384'))}</dd>
            <dt id="sex">${unsafeHTML(this.localize('subjects:1385'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1386'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1387'))}</dd>
            <dt id="wrongsex">${unsafeHTML(this.localize('subjects:1388'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1389'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1390'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1391'))}</dd>
            <dt>${unsafeHTML(this.localize('subjects:1392'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1393'))}</dd>
            <dt id="sickness">${unsafeHTML(this.localize('subjects:1394'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1395'))}</dd>
            <dt id="sila">${unsafeHTML(this.localize('subjects:1396'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1397'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1398'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1399'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1400'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1401'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1402'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1403'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1404'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1405'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1406'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1407'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1408'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1409'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1410'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1411'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1412'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1413'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1414'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1415'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1416'))}</dd>
            <dt>${unsafeHTML(this.localize('subjects:1417'))}</dt>
            <dd>${unsafeHTML(this.localize('subjects:1418'))}</dd>
            <dt id="sleep">${unsafeHTML(this.localize('subjects:1419'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1420'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1421'))}</dd>
            <dt id="sleepiness">${unsafeHTML(this.localize('subjects:1422'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1423'))}</dd>
            <dt id="sloth">${unsafeHTML(this.localize('subjects:1424'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1425'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1426'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1427'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1428'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1429'))}</dd>
            <dt id="smile">${unsafeHTML(this.localize('subjects:1430'))}</dt>
            <dd>${unsafeHTML(this.localize('subjects:1431'))}</dd>
            <dt id="social">${unsafeHTML(this.localize('subjects:1432'))}</dt>
            <dd>${unsafeHTML(this.localize('subjects:1433'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1434'))}</dd>
            <dt>${unsafeHTML(this.localize('subjects:1435'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1436'))}</dd>
            <dt>${unsafeHTML(this.localize('subjects:1437'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1438'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1439'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1440'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1441'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1442'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1443'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1444'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1445'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1446'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1447'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1448'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1449'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1450'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1451'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1452'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1453'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1454'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1455'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1456'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1457'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1458'))}</dd>
            <dt id="stream">${unsafeHTML(this.localize('subjects:1459'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1460'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1461'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1462'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1463'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1464'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1465'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1466'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1467'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1468'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1469'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1470'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1471'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1472'))}</dd>
            <dt id="suicide">${unsafeHTML(this.localize('subjects:1473'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1474'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1475'))}</dd>
            <dt id="supranormal">${unsafeHTML(this.localize('subjects:1476'))}</dt>
            <dd>${unsafeHTML(this.localize('subjects:1477'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1478'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1479'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1480'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1481'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1482'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1483'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1484'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1485'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1486'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1487'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1488'))}</dd>
          </dl>
          <h2 id="t">${unsafeHTML(this.localize('subjects:1489'))}</h2>
          <dl>
            <dt>${unsafeHTML(this.localize('subjects:1490'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1491'))}</dd>
            <dt id="tanha">${unsafeHTML(this.localize('subjects:1492'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1493'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1494'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1495'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1496'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1497'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1498'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1499'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1500'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1501'))}</dd>
            <dt id="teaching">${unsafeHTML(this.localize('subjects:1502'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1503'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1504'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1505'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1506'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1507'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1508'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1509'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1510'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1511'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1512'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1513'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1514'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1515'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1516'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1517'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1518'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1519'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1520'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1521'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1522'))}</dd>
            <dt id="tevijja">${unsafeHTML(this.localize('subjects:1523'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1524'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1525'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1526'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1527'))}</dd>
            <dt>${unsafeHTML(this.localize('subjects:1528'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1529'))}</dd>
            <dt id="thought">${unsafeHTML(this.localize('subjects:1530'))}</dt>
            <dd>${unsafeHTML(this.localize('subjects:1531'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1532'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1533'))}</dd>
            <dt>${unsafeHTML(this.localize('subjects:1534'))}</dt>
            <dd>${unsafeHTML(this.localize('subjects:1535'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1536'))}</dd>
            <dt id="tilakkhana">${unsafeHTML(this.localize('subjects:1537'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1538'))}</dd>
            <dt>${unsafeHTML(this.localize('subjects:1539'))}</dt>
            <dd>${unsafeHTML(this.localize('subjects:1540'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1541'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1542'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1543'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1544'))}</dd>
            <dt id="tiratana">${unsafeHTML(this.localize('subjects:1545'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1546'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1547'))}</dd>
            <dt id="tisarana">${unsafeHTML(this.localize('subjects:1548'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1549'))}</dd>
            <dt>${unsafeHTML(this.localize('subjects:1550'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1551'))}</dd>
          </dl>
          <h2 id="u">${unsafeHTML(this.localize('subjects:1552'))}</h2>
          <dl>
            <dt>${unsafeHTML(this.localize('subjects:1553'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1554'))}</dd>
            <dt>${unsafeHTML(this.localize('subjects:1555'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1556'))}</dd>
            <dt>${unsafeHTML(this.localize('subjects:1557'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1558'))}</dd>
            <dt id="upadana">${unsafeHTML(this.localize('subjects:1559'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1560'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1561'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1562'))}</dd>
            <dt id="upekkha">${unsafeHTML(this.localize('subjects:1563'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1564'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1565'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1566'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1567'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1568'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1569'))}</dd>
            <dt id="uposatha">${unsafeHTML(this.localize('subjects:1570'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1571'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1572'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1573'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1574'))}</dd>
          </dl>
          <h2 id="v">${unsafeHTML(this.localize('subjects:1575'))}</h2>
          <dl>
            <dt id="vedana">${unsafeHTML(this.localize('subjects:1576'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1577'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1578'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1579'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1580'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1581'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1582'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1583'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1584'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1585'))}</dd>
            <dt>${unsafeHTML(this.localize('subjects:1586'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1587'))}</dd>
            <dt id="veggie">${unsafeHTML(this.localize('subjects:1588'))}</dt>
            <dt id="views">${unsafeHTML(this.localize('subjects:1589'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1590'))}</dd>
            <dt id="vimutti">${unsafeHTML(this.localize('subjects:1591'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1592'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1593'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1594'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1595'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1596'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1597'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1598'))}</dd>
            <dt id="vinaya">${unsafeHTML(this.localize('subjects:1599'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1600'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1601'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1602'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1603'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1604'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1605'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1606'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1607'))}</dd>
            <dt id="vinnana">${unsafeHTML(this.localize('subjects:1608'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1609'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1610'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1611'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1612'))}</dd>
            <dt>${unsafeHTML(this.localize('subjects:1613'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1614'))}</dd>
            <dt id="vipassana">${unsafeHTML(this.localize('subjects:1615'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1616'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1617'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1618'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1619'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1620'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1621'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1622'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1623'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1624'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1625'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1626'))}</dd>
            <dt id="viraga">${unsafeHTML(this.localize('subjects:1627'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1628'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1629'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1630'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1631'))}</dd>
            <dt id="viriya">${unsafeHTML(this.localize('subjects:1632'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1633'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1634'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1635'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1636'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1637'))}</dd>
            <dt>${unsafeHTML(this.localize('subjects:1638'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1639'))}</dd>
            <dt id="viveka">${unsafeHTML(this.localize('subjects:1640'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1641'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1642'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1643'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1644'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1645'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1646'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1647'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1648'))}</dd>
          </dl>
          <h2 id="w">${unsafeHTML(this.localize('subjects:1649'))}</h2>
          <dl>
            <dt id="wakefulness">${unsafeHTML(this.localize('subjects:1650'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1651'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1652'))}</dd>
            <dt id="walking">${unsafeHTML(this.localize('subjects:1653'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1654'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1655'))}</dd>
            <dt id="war">${unsafeHTML(this.localize('subjects:1656'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1657'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1658'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1659'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1660'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1661'))}</dd>
            <dt id="wealth">${unsafeHTML(this.localize('subjects:1662'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1663'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1664'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1665'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1666'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1667'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1668'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1669'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1670'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1671'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1672'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1673'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1674'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1675'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1676'))}</dd>
            <dt>${unsafeHTML(this.localize('subjects:1677'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1678'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1679'))}</dd>
            <dt id="wilderness">${unsafeHTML(this.localize('subjects:1680'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1681'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1682'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1683'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1684'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1685'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1686'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1687'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1688'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1689'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1690'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1691'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1692'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1693'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1694'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1695'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1696'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1697'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1698'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1699'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1700'))}</dd>
            <dt>${unsafeHTML(this.localize('subjects:1701'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1702'))}</dd>
            <dt>${unsafeHTML(this.localize('subjects:1703'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1704'))}</dd>
            <dt id="wiseperson">${unsafeHTML(this.localize('subjects:1705'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1706'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1707'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1708'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1709'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1710'))}</dd>
            <dt>${unsafeHTML(this.localize('subjects:1711'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1712'))}</dd>
            <dt id="women">${unsafeHTML(this.localize('subjects:1713'))}</dt>
            <dd>${unsafeHTML(this.localize('subjects:1714'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1715'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1716'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1717'))}</dd>
            <dt id="monkwork">${unsafeHTML(this.localize('subjects:1718'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1719'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1720'))}</dd>
            <dt>${unsafeHTML(this.localize('subjects:1721'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1722'))}</dd>
            <dt>${unsafeHTML(this.localize('subjects:1723'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1724'))}</dd>
          </dl>
          <h2 id="xyz">${unsafeHTML(this.localize('subjects:1725'))}</h2>
          <dl>
            <dt id="yoniso">${unsafeHTML(this.localize('subjects:1726'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1727'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1728'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1729'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1730'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1731'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1732'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1733'))}</dd>
          </dl>
          <aside class="about-index">
            <p>${unsafeHTML(this.localize('subjects:1734'))}</p>
            <ul>
              <li>${unsafeHTML(this.localize('subjects:1735'))}</li>
              <li>${unsafeHTML(this.localize('subjects:1736'))}</li>
              <li>${unsafeHTML(this.localize('subjects:1737'))}</li>
              <li>${unsafeHTML(this.localize('subjects:1738'))}</li>
              <li>${unsafeHTML(this.localize('subjects:1739'))}</li>
              <li>${unsafeHTML(this.localize('subjects:1740'))}</li>
            </ul>
            <p>${unsafeHTML(this.localize('subjects:1741'))}</p>
            <blockquote>${unsafeHTML(this.localize('subjects:1742'))}</blockquote>
            <p>${unsafeHTML(this.localize('subjects:1743'))}</p>
            <ul>
              <li>${unsafeHTML(this.localize('subjects:1744'))}</li>
              <li>${unsafeHTML(this.localize('subjects:1745'))}</li>
            </ul>
          </aside>
          <aside class="static-copyright">
            <p>${unsafeHTML(this.localize('subjects:1746'))}</p>
            <blockquote>${unsafeHTML(this.localize('subjects:1747'))}</blockquote>
            <p>${unsafeHTML(this.localize('subjects:1748'))}</p>
          </aside>
        </article>
      </main>
    `;
  }

  constructor() {
    super();
    this.localizedStringsPath = '/localization/elements/subjects';
  }
}

customElements.define('sc-static-subjects', SCStaticSubjects);
