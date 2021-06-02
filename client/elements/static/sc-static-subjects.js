import { html } from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';

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
          <h1>${this.localize('subjects:1')}</h1>
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
          <h2 id="a">${this.localize('subjects:26')}</h2>
          <dl>
            <dt id="adhitthana">${this.localize('subjects:27')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:28'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:29'))}</dd>
            <dt id="adinava">${this.localize('subjects:30')}</dt>
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
            <dt>${this.localize('subjects:41')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:42'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:43'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:44'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:45'))}</dd>
            <dt id="aging">${this.localize('subjects:46')}</dt>
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
            <dt id="anapanasati">${this.localize('subjects:57')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:58'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:59'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:60'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:61'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:62'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:63'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:64'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:65'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:66'))}</dd>
            <dt id="anatta">${this.localize('subjects:67')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:68'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:69'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:70'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:71'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:40'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:72'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:73'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:74'))}</dd>
            <dt id="anger">${this.localize('subjects:75')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:76'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:77'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:78'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:79'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:80'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:81'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:82'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:83'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:84'))}</dd>
            <dt id="anicca">${this.localize('subjects:85')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:86'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:71'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:40'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:87'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:88'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:89'))}</dd>
            <dt id="anusaya">${this.localize('subjects:90')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:91'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:92'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:93'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:94'))}</dd>
            <dt>${this.localize('subjects:95')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:96'))}</dd>
            <dt id="apaya-mukha">${this.localize('subjects:97')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:98'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:99'))}</dd>
            <dt id="appamada">${this.localize('subjects:100')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:101'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:102'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:103'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:104'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:105'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:106'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:107'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:108'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:109'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:110'))}</dd>
            <dt>${this.localize('subjects:111')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:112'))}</dd>
            <dt id="arahant">${this.localize('subjects:113')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:114'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:115'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:116'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:117'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:118'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:119'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:120'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:121'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:122'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:123'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:124'))}</dd>
            <dd>${this.localize('subjects:125')}</dd>
            <dd>${this.localize('subjects:126')}</dd>
            <dd>${unsafeHTML(this.localize('subjects:127'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:128'))}</dd>
            <dt>${this.localize('subjects:129')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:130'))}</dd>
            <dt>${this.localize('subjects:131')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:132'))}</dd>
            <dt id="asava">${this.localize('subjects:133')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:134'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:135'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:50'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:136'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:137'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:138'))}</dd>
            <dt id="ascetic">${this.localize('subjects:139')}</dt>
            <dd>${unsafeHTML(this.localize('subjects:140'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:141'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:142'))}</dd>
            <dt id="asubha">${this.localize('subjects:143')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:144'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:145'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:146'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:147'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:148'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:149'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:150'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:151'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:152'))}</dd>
            <dt id="attachment">${this.localize('subjects:153')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:154'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:155'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:156'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:157'))}</dd>
            <dt id="attha-sila">${this.localize('subjects:158')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:159'))}</dd>
            <dt id="aversion">${this.localize('subjects:160')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:161'))}</dd>
            <dt id="avijja">${this.localize('subjects:162')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:163'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:164'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:165'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:166'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:167'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:168'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:169'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:50'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:170'))}</dd>
            <dt id="awakening">${this.localize('subjects:171')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:172'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:173'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:174'))}</dd>
            <dt id="awareness">${this.localize('subjects:175')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:176'))}</dd>
            <dt id="ayoniso">${this.localize('subjects:177')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:178'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:179'))}</dd>
          </dl>
          <h2 id="b">${this.localize('subjects:180')}</h2>
          <dl>
            <dt>${this.localize('subjects:181')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:182'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:183'))}</dd>
            <dt id="beauty">${this.localize('subjects:184')}</dt>
            <dd>${unsafeHTML(this.localize('subjects:185'))}</dd>
            <dt id="bhava">${this.localize('subjects:186')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:187'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:164'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:165'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:188'))}</dd>
            <dt>${this.localize('subjects:189')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:190'))}</dd>
            <dt>${this.localize('subjects:191')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:190'))}</dd>
            <dd>${this.localize('subjects:192')}</dd>
            <dd>${unsafeHTML(this.localize('subjects:193'))}</dd>
            <dt>${this.localize('subjects:194')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:195'))}</dd>
            <dt id="bodhipakkhiya-dhamma">${this.localize('subjects:196')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:197'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:198'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:199'))}</dd>
            <dt>${this.localize('subjects:200')}</dt>
            <dd>${unsafeHTML(this.localize('subjects:201'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:202'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:203'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:204'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:205'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:206'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:207'))}</dd>
            <dt id="body">${this.localize('subjects:208')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:209'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:210'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:211'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:212'))}</dd>
            <dt id="bojjhanga">${this.localize('subjects:213')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:214'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:215'))}</dd>
            <dd>${this.localize('subjects:216')}</dd>
            <dt id="brahmavihara">${this.localize('subjects:217')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:218'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:219'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:220'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:221'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:222'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:223'))}</dd>
            <dt>${this.localize('subjects:224')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:225'))}</dd>
            <dt id="buddha">${this.localize('subjects:226')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:227'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:228'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:229'))}</dd>
          </dl>
          <h2 id="c">${this.localize('subjects:230')}</h2>
          <dl>
            <dt id="caste">${this.localize('subjects:231')}</dt>
            <dd>${unsafeHTML(this.localize('subjects:232'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:233'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:234'))}</dd>
            <dt id="celibacy">${this.localize('subjects:235')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:236'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:237'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:238'))}</dd>
            <dt>${this.localize('subjects:239')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:240'))}</dd>
            <dt id="chanting">${this.localize('subjects:241')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:242'))}</dd>
            <dt id="children">${this.localize('subjects:243')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:244'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:245'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:246'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:247'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:248'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:249'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:250'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:251'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:252'))}</dd>
            <dt>${this.localize('subjects:253')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:254'))}</dd>
            <dt id="communal">${this.localize('subjects:255')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:256'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:257'))}</dd>
            <dt id="comparative">${this.localize('subjects:258')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:259'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:260'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:261'))}</dd>
            <dt>${this.localize('subjects:262')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:263'))}</dd>
            <dt>${this.localize('subjects:264')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:265'))}</dd>
            <dt>${this.localize('subjects:266')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:267'))}</dd>
            <dt id="conflict">${this.localize('subjects:268')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:269'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:270'))}</dd>
            <dt>${this.localize('subjects:271')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:272'))}</dd>
            <dt>${this.localize('subjects:273')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:274'))}</dd>
            <dt>${this.localize('subjects:275')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:276'))}</dd>
            <dt id="contentment">${this.localize('subjects:277')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:278'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:279'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:280'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:281'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:282'))}</dd>
            <dt>${this.localize('subjects:283')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:284'))}</dd>
            <dt>${this.localize('subjects:285')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:286'))}</dd>
            <dt>${this.localize('subjects:287')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:288'))}</dd>
          </dl>
          <h2 id="d">${this.localize('subjects:289')}</h2>
          <dl>
            <dt id="dana">${this.localize('subjects:290')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:291'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:292'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:293'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:294'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:228'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:295'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:296'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:297'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:298'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:299'))}</dd>
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
            <dd>${this.localize('subjects:312')}</dd>
            <dt id="dasasila">${this.localize('subjects:313')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:314'))}</dd>
            <dt id="death">${this.localize('subjects:315')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:316'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:317'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:50'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:318'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:146'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:319'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:320'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:321'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:322'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:323'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:324'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:325'))}</dd>
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
            <dd>
              ${this.localize('subjects:336')}
              <ul>
                <li>${unsafeHTML(this.localize('subjects:337'))}</li>
                <li>${unsafeHTML(this.localize('subjects:338'))}</li>
                <li>${unsafeHTML(this.localize('subjects:339'))}</li>
                <li>${unsafeHTML(this.localize('subjects:340'))}</li>
                <li>${unsafeHTML(this.localize('subjects:341'))}</li>
              </ul>
            </dd>
            <dt id="deathless">${this.localize('subjects:342')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:343'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:344'))}</dd>
            <dt>${this.localize('subjects:345')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:346'))}</dd>
            <dt>${this.localize('subjects:347')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:348'))}</dd>
            <dt id="desire">${this.localize('subjects:349')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:350'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:351'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:352'))}</dd>
            <dt id="lobha">${this.localize('subjects:349')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:353'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:166'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:167'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:354'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:355'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:356'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:357'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:358'))}</dd>
            <dt id="deva">${this.localize('subjects:359')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:360'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:361'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:362'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:363'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:364'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:365'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:366'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:367'))}</dd>
            <dt id="devotion">${this.localize('subjects:368')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:369'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:370'))}</dd>
            <dt id="dhamma">${this.localize('subjects:371')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:372'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:373'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:374'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:375'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:228'))}</dd>
            <dt id="dhana">${this.localize('subjects:376')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:377'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:378'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:379'))}</dd>
            <dt id="dhatu">${this.localize('subjects:380')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:381'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:382'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:383'))}</dd>
            <dt>${this.localize('subjects:384')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:385'))}</dd>
            <dt>${this.localize('subjects:386')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:387'))}</dd>
            <dt id="ditthi">${this.localize('subjects:388')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:389'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:165'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:164'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:390'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:391'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:392'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:393'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:394'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:395'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:396'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:397'))}</dd>
            <dt id="divine">${this.localize('subjects:398')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:399'))}</dd>
            <dt id="doubt">${this.localize('subjects:400')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:401'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:166'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:167'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:402'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:403'))}</dd>
            <dt id="downfall">${this.localize('subjects:404')}</dt>
            <dd>${unsafeHTML(this.localize('subjects:405'))}</dd>
            <dt>${this.localize('subjects:406')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:407'))}</dd>
            <dt>${this.localize('subjects:408')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:409'))}</dd>
            <dt id="dreams">${this.localize('subjects:410')}</dt>
            <dd>${unsafeHTML(this.localize('subjects:411'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:412'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:413'))}</dd>
            <dt>${this.localize('subjects:414')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:415'))}</dd>
            <dt id="dukkha">${this.localize('subjects:416')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:417'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:418'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:138'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:419'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:71'))}</dd>
          </dl>
          <h2 id="e">${this.localize('subjects:420')}</h2>
          <dl>
            <dt>${this.localize('subjects:421')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:422'))}</dd>
            <dt>${this.localize('subjects:345')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:423'))}</dd>
            <dt>${this.localize('subjects:424')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:425'))}</dd>
            <dt>${this.localize('subjects:426')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:130'))}</dd>
            <dt id="emotion">${this.localize('subjects:427')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:428'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:429'))}</dd>
            <dt id="emptiness">${this.localize('subjects:430')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:431'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:432'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:433'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:434'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:435'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:436'))}</dd>
            <dt id="engaged">${this.localize('subjects:437')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:438'))}</dd>
            <dt>${this.localize('subjects:439')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:440'))}</dd>
            <dt>${this.localize('subjects:441')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:442'))}</dd>
          </dl>
          <h2 id="f">${this.localize('subjects:443')}</h2>
          <dl>
            <dt>${this.localize('subjects:444')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:445'))}</dd>
            <dt>${this.localize('subjects:446')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:284'))}</dd>
            <dt id="family">${this.localize('subjects:447')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:448'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:449'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:450'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:451'))}</dd>
            <dt id="fear">${this.localize('subjects:452')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:453'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:454'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:455'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:456'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:457'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:458'))}</dd>
            <dt>${this.localize('subjects:459')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:460'))}</dd>
            <dt>${this.localize('subjects:461')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:423'))}</dd>
            <dt>${this.localize('subjects:462')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:463'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:464'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:465'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:466'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:467'))}</dd>
            <dt id="fool">${this.localize('subjects:468')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:469'))}</dd>
            <dt id="food">${this.localize('subjects:470')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:471'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:472'))}</dd>
            <dt id="forest">${this.localize('subjects:473')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:474'))}</dd>
            <dt>${this.localize('subjects:475')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:476'))}</dd>
            <dt id="fourtruths">${this.localize('subjects:477')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:478'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:479'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:50'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:480'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:481'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:482'))}</dd>
            <dt>${this.localize('subjects:483')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:484'))}</dd>
          </dl>
          <h2 id="g">${this.localize('subjects:485')}</h2>
          <dl>
            <dt>${this.localize('subjects:486')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:487'))}</dd>
            <dt>${this.localize('subjects:488')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:487'))}</dd>
            <dt>${this.localize('subjects:489')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:490'))}</dd>
            <dt id="god">${this.localize('subjects:491')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:492'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:493'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:494'))}</dd>
            <dt>${this.localize('subjects:495')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:496'))}</dd>
            <dt>${this.localize('subjects:497')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:498'))}</dd>
            <dt id="gradual">${this.localize('subjects:499')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:500'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:501'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:502'))}</dd>
            <dt id="gradual_training">${this.localize('subjects:503')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:504'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:505'))}</dd>
            <dt id="gratitude">${this.localize('subjects:506')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:507'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:292'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:508'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:509'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:510'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:511'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:512'))}</dd>
            <dt id="grief">${this.localize('subjects:513')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:453'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:514'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:515'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:516'))}</dd>
            <dt>${this.localize('subjects:517')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:518'))}</dd>
          </dl>
          <h2 id="h">${this.localize('subjects:519')}</h2>
          <dl>
            <dt>${this.localize('subjects:520')}</dt>
            <dd>${unsafeHTML(this.localize('subjects:521'))}</dd>
            <dt id="happiness">${this.localize('subjects:522')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:523'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:524'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:525'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:526'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:527'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:528'))}</dd>
            <dt>${this.localize('subjects:529')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:530'))}</dd>
            <dt>${this.localize('subjects:531')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:532'))}</dd>
            <dt>${this.localize('subjects:533')}</dt>
            <dd>${unsafeHTML(this.localize('subjects:534'))}</dd>
            <dt>${this.localize('subjects:535')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:536'))}</dd>
            <dt>${this.localize('subjects:537')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:538'))}</dd>
            <dt id="hell">${this.localize('subjects:539')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:540'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:541'))}</dd>
            <dd>${this.localize('subjects:542')}</dd>
            <dd>${unsafeHTML(this.localize('subjects:543'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:544'))}</dd>
            <dt>${this.localize('subjects:545')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:546'))}</dd>
            <dt id="hiri">${this.localize('subjects:547')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:548'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:549'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:550'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:551'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:552'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:553'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:294'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:554'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:555'))}</dd>
            <dt>${this.localize('subjects:556')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:557'))}</dd>
            <dt id="householder">${this.localize('subjects:558')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:559'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:250'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:560'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:561'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:562'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:307'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:563'))}</dd>
            <dt id="humility">${this.localize('subjects:564')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:565'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:292'))}</dd>
          </dl>
          <h2 id="i">${this.localize('subjects:566')}</h2>
          <dl>
            <dt id="iddhipada">${this.localize('subjects:567')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:568'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:569'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:570'))}</dd>
            <dt>${this.localize('subjects:571')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:572'))}</dd>
            <dt id="ill">${this.localize('subjects:573')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:574'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:575'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:576'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:577'))}</dd>
            <dt id="illness">${this.localize('subjects:578')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:579'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:580'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:581'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:582'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:583'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:584'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:585'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:586'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:587'))}</dd>
            <dt>${this.localize('subjects:588')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:589'))}</dd>
            <dt id="indriya">${this.localize('subjects:590')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:591'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:592'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:593'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:594'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:595'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:596'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:597'))}</dd>
            <dd>${this.localize('subjects:598')}</dd>
            <dt id="insight">${this.localize('subjects:599')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:600'))}</dd>
            <dt id="integrity">${this.localize('subjects:601')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:602'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:603'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:604'))}</dd>
            <dt>${this.localize('subjects:605')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:606'))}</dd>
          </dl>
          <h2 id="j">${this.localize('subjects:607')}</h2>
          <dl>
            <dt>${this.localize('subjects:608')}</dt>
            <dd class="description">${this.localize('subjects:609')}</dd>
            <dd>${unsafeHTML(this.localize('subjects:610'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:611'))}</dd>
            <dt id="jati">${this.localize('subjects:612')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:613'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:50'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:614'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:615'))}</dd>
            <dt id="jhana">${this.localize('subjects:616')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:617'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:618'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:619'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:620'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:621'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:622'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:623'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:624'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:625'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:626'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:627'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:628'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:629'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:630'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:631'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:632'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:633'))}</dd>
            <dt id="joy">${this.localize('subjects:634')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:635'))}</dd>
            <dt>${this.localize('subjects:636')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:637'))}</dd>
          </dl>
          <h2 id="k">${this.localize('subjects:638')}</h2>
          <dl>
            <dt id="kalyanamittata">${this.localize('subjects:639')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:640'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:641'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:642'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:643'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:644'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:645'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:646'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:647'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:648'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:649'))}</dd>
            <dt id="kamma">${this.localize('subjects:650')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:651'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:652'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:653'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:654'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:138'))}</dd>
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
            <dd>${unsafeHTML(this.localize('subjects:668'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:669'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:670'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:671'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:672'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:673'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:674'))}</dd>
            <dt id="karuna">${this.localize('subjects:675')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:676'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:677'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:678'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:679'))}</dd>
            <dt id="kayagatasati">${this.localize('subjects:680')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:681'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:682'))}</dd>
            <dt id="khandha">${this.localize('subjects:683')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:684'))}</dd>
            <dd>${this.localize('subjects:685')}</dd>
            <dd>${unsafeHTML(this.localize('subjects:686'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:687'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:688'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:689'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:690'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:691'))}</dd>
            <dd>
              ${this.localize('subjects:692')}
              <ul>
                <li>${this.localize('subjects:693')}</li>
                <li>${unsafeHTML(this.localize('subjects:694'))}</li>
                <li>${unsafeHTML(this.localize('subjects:695'))}</li>
                <li>${unsafeHTML(this.localize('subjects:696'))}</li>
                <li>${unsafeHTML(this.localize('subjects:697'))}</li>
              </ul>
            </dd>
            <dt id="khanti">${this.localize('subjects:698')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:699'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:292'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:700'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:701'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:702'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:703'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:704'))}</dd>
            <dt id="kilesa">${this.localize('subjects:705')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:706'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:707'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:708'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:709'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:710'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:711'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:712'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:713'))}</dd>
            <dt id="killing">${this.localize('subjects:714')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:715'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:716'))}</dd>
            <dt id="kusala">${this.localize('subjects:717')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:718'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:719'))}</dd>
          </dl>
          <h2 id="l">${this.localize('subjects:720')}</h2>
          <dl>
            <dt id="lay">${this.localize('subjects:721')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:722'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:723'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:317'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:724'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:725'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:726'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:727'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:728'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:729'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:730'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:731'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:732'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:733'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:734'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:735'))}</dd>
            <dt id="laziness">${this.localize('subjects:736')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:737'))}</dd>
            <dt id="listen">${this.localize('subjects:738')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:42'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:739'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:740'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:741'))}</dd>
            <dt id="samma-ajivo">${this.localize('subjects:742')}</dt>
            <dd>${unsafeHTML(this.localize('subjects:743'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:744'))}</dd>
            <dt id="lokadhamma">${this.localize('subjects:745')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:746'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:747'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:748'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:749'))}</dd>
            <dt>${this.localize('subjects:750')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:496'))}</dd>
            <dt>${this.localize('subjects:751')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:752'))}</dd>
          </dl>
          <h2 id="m">${this.localize('subjects:753')}</h2>
          <dl>
            <dt id="mana">${this.localize('subjects:754')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:755'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:756'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:757'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:758'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:167'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:166'))}</dd>
            <dt id="manners">${this.localize('subjects:759')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:760'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:761'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:762'))}</dd>
            <dt id="mara">${this.localize('subjects:763')}</dt>
            <dd>${unsafeHTML(this.localize('subjects:764'))}</dd>
            <dt id="maranassati">${this.localize('subjects:765')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:766'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:767'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:768'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:228'))}</dd>
            <dt id="marriage">${this.localize('subjects:769')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:770'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:771'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:772'))}</dd>
            <dt id="meditation">${this.localize('subjects:773')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:774'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:775'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:776'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:777'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:778'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:779'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:780'))}</dd>
            <dt id="merit">${this.localize('subjects:781')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:782'))}</dd>
            <dt id="metta">${this.localize('subjects:783')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:784'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:785'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:786'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:677'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:678'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:787'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:788'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:789'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:790'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:791'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:792'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:793'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:679'))}</dd>
            <dt>${this.localize('subjects:794')}</dt>
            <dd>${unsafeHTML(this.localize('subjects:795'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:796'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:797'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:798'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:799'))}</dd>
            <dt id="mindfulness">${this.localize('subjects:800')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:176'))}</dd>
            <dt>${this.localize('subjects:801')}</dt>
            <dd>${unsafeHTML(this.localize('subjects:802'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:803'))}</dd>
            <dt id="moderation">${this.localize('subjects:804')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:278'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:805'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:806'))}</dd>
            <dt>${this.localize('subjects:807')}</dt>
            <dd>${unsafeHTML(this.localize('subjects:280'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:808'))}</dd>
            <dt id="monastic">${this.localize('subjects:809')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:810'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:811'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:812'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:813'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:814'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:815'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:816'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:817'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:818'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:819'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:820'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:821'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:822'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:823'))}</dd>
            <dt id="money">${this.localize('subjects:824')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:825'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:826'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:827'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:828'))}</dd>
            <dt>${this.localize('subjects:829')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:190'))}</dd>
            <dt>${this.localize('subjects:830')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:409'))}</dd>
            <dt>${this.localize('subjects:831')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:272'))}</dd>
            <dt>${this.localize('subjects:832')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:442'))}</dd>
            <dt id="mudita">${this.localize('subjects:833')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:834'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:677'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:835'))}</dd>
            <dt id="murder">${this.localize('subjects:836')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:453'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:837'))}</dd>
          </dl>
          <h2 id="n">${this.localize('subjects:838')}</h2>
          <dl>
            <dt id="namarupa">${this.localize('subjects:839')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:840'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:50'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:841'))}</dd>
            <dt id="nekkhamma">${this.localize('subjects:842')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:843'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:844'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:845'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:846'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:847'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:848'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:849'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:850'))}</dd>
            <dt id="nibbana">${this.localize('subjects:851')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:852'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:853'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:854'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:855'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:856'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:857'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:858'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:859'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:860'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:861'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:862'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:863'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:864'))}</dd>
            <dt id="nibbida">${this.localize('subjects:865')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:866'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:867'))}</dd>
            <dt id="nirvana">${this.localize('subjects:868')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:490'))}</dd>
            <dt id="nivarana">${this.localize('subjects:869')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:870'))}</dd>
            <dd>
              ${this.localize('subjects:871')}
              <ul>
                <li>${unsafeHTML(this.localize('subjects:872'))}</li>
                <li>${unsafeHTML(this.localize('subjects:873'))}</li>
                <li>${unsafeHTML(this.localize('subjects:874'))}</li>
                <li>${unsafeHTML(this.localize('subjects:875'))}</li>
                <li>${unsafeHTML(this.localize('subjects:876'))}</li>
              </ul>
            </dd>
            <dd>${unsafeHTML(this.localize('subjects:877'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:878'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:879'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:880'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:881'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:882'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:883'))}</dd>
            <dt id="eightfold">${this.localize('subjects:884')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:885'))}</dd>
            <dd>
              ${this.localize('subjects:886')}
              <dl>
                <dt>${this.localize('subjects:887')}</dt>
                <dd class="description">${unsafeHTML(this.localize('subjects:888'))}</dd>
                <dd>${unsafeHTML(this.localize('subjects:889'))}</dd>
                <dd>${unsafeHTML(this.localize('subjects:890'))}</dd>
                <dd>${unsafeHTML(this.localize('subjects:891'))}</dd>
                <dt>${this.localize('subjects:892')}</dt>
                <dd class="description">${unsafeHTML(this.localize('subjects:893'))}</dd>
                <dd>${unsafeHTML(this.localize('subjects:894'))}</dd>
                <dt>${this.localize('subjects:895')}</dt>
                <dd class="description">${unsafeHTML(this.localize('subjects:896'))}</dd>
                <dd>${unsafeHTML(this.localize('subjects:897'))}</dd>
                <dt>${this.localize('subjects:898')}</dt>
                <dd class="description">${unsafeHTML(this.localize('subjects:899'))}</dd>
                <dt>${this.localize('subjects:900')}</dt>
                <dd class="description">${unsafeHTML(this.localize('subjects:901'))}</dd>
                <dt>${this.localize('subjects:902')}</dt>
                <dd class="description">${unsafeHTML(this.localize('subjects:903'))}</dd>
                <dt>${this.localize('subjects:904')}</dt>
                <dd class="description">${unsafeHTML(this.localize('subjects:905'))}</dd>
                <dt>${this.localize('subjects:906')}</dt>
                <dd class="description">${unsafeHTML(this.localize('subjects:907'))}</dd>
                <dd>${unsafeHTML(this.localize('subjects:908'))}</dd>
              </dl>
            </dd>
            <dt id="silence">${this.localize('subjects:909')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:910'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:911'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:912'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:913'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:914'))}</dd>
            <dt>${this.localize('subjects:915')}</dt>
            <dd>${unsafeHTML(this.localize('subjects:916'))}</dd>
            <dt id="ahimsa">${this.localize('subjects:917')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:918'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:919'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:920'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:921'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:922'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:923'))}</dd>
            <dd>${this.localize('subjects:924')}</dd>
            <dt>${this.localize('subjects:925')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:926'))}</dd>
            <dt id="nutriment">${this.localize('subjects:927')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:928'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:929'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:930'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:931'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:932'))}</dd>
            <dt>${this.localize('subjects:933')}</dt>
            <dd>${unsafeHTML(this.localize('subjects:934'))}</dd>
          </dl>
          <h2 id="o">${this.localize('subjects:935')}</h2>
          <dl>
            <dt id="ottappa">${this.localize('subjects:936')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:937'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:550'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:294'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:554'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:552'))}</dd>
          </dl>
          <h2 id="p">${this.localize('subjects:938')}</h2>
          <dl>
            <dt id="pain">${this.localize('subjects:939')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:940'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:941'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:942'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:943'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:326'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:944'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:945'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:946'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:947'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:948'))}</dd>
            <dt id="pancasila">${this.localize('subjects:949')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:950'))}</dd>
            <dt id="panna">${this.localize('subjects:951')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:952'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:953'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:954'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:955'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:956'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:294'))}</dd>
            <dt id="papanca">${this.localize('subjects:957')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:958'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:959'))}</dd>
            <dt id="parami">${this.localize('subjects:960')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:961'))}</dd>
            <dd>
              ${this.localize('subjects:962')}
              <ul>
                <li>${unsafeHTML(this.localize('subjects:963'))}</li>
                <li>${unsafeHTML(this.localize('subjects:964'))}</li>
                <li>${unsafeHTML(this.localize('subjects:965'))}</li>
                <li>${unsafeHTML(this.localize('subjects:966'))}</li>
                <li>${unsafeHTML(this.localize('subjects:967'))}</li>
                <li>${unsafeHTML(this.localize('subjects:968'))}</li>
                <li>${unsafeHTML(this.localize('subjects:969'))}</li>
                <li>${unsafeHTML(this.localize('subjects:970'))}</li>
                <li>${unsafeHTML(this.localize('subjects:971'))}</li>
                <li>${unsafeHTML(this.localize('subjects:972'))}</li>
              </ul>
            </dd>
            <dt id="parents">${this.localize('subjects:973')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:974'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:975'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:976'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:977'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:978'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:979'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:246'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:980'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:251'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:981'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:982'))}</dd>
            <dt id="parinibbana">${this.localize('subjects:983')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:984'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:985'))}</dd>
            <dt id="parisa">${this.localize('subjects:986')}</dt>
            <dd class="description">${this.localize('subjects:987')}</dd>
            <dd>${unsafeHTML(this.localize('subjects:988'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:989'))}</dd>
            <dt id="pasada">${this.localize('subjects:990')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:991'))}</dd>
            <dt id="ps">${this.localize('subjects:992')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:993'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:994'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:995'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:996'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:997'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:998'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:999'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1000'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1001'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1002'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1003'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1004'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1005'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1006'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1007'))}</dd>
            <dd>
              ${this.localize('subjects:1008')}
              <ul>
                <li>${unsafeHTML(this.localize('subjects:1009'))}</li>
                <li>${unsafeHTML(this.localize('subjects:1010'))}</li>
                <li>${unsafeHTML(this.localize('subjects:697'))}</li>
                <li>${unsafeHTML(this.localize('subjects:1011'))}</li>
                <li>${unsafeHTML(this.localize('subjects:1012'))}</li>
                <li>${unsafeHTML(this.localize('subjects:1013'))}</li>
                <li>${unsafeHTML(this.localize('subjects:694'))}</li>
                <li>${unsafeHTML(this.localize('subjects:1014'))}</li>
                <li>${unsafeHTML(this.localize('subjects:1015'))}</li>
                <li>${unsafeHTML(this.localize('subjects:1016'))}</li>
                <li>${unsafeHTML(this.localize('subjects:1017'))}</li>
                <li>${unsafeHTML(this.localize('subjects:1018'))}</li>
              </ul>
            </dd>
            <dt>${this.localize('subjects:1019')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1020'))}</dd>
            <dt id="patimokkha">${this.localize('subjects:1021')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1022'))}</dd>
            <dt>${this.localize('subjects:1023')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1024'))}</dd>
            <dt>${this.localize('subjects:1025')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1026'))}</dd>
            <dt id="peta">${this.localize('subjects:1027')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1028'))}</dd>
            <dt id="phassa">${this.localize('subjects:1029')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1030'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1031'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:50'))}</dd>
            <dt id="piti">${this.localize('subjects:1032')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1033'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1034'))}</dd>
            <dt id="planes">${this.localize('subjects:1035')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1036'))}</dd>
            <dt id="pleasure">${this.localize('subjects:1037')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1038'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1039'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1040'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1041'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:945'))}</dd>
            <dt id="precepts">${this.localize('subjects:1042')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1043'))}</dd>
            <dd>
              ${this.localize('subjects:1044')}
              <dl>
                <dt>${this.localize('subjects:1045')}</dt>
                <dd class="description">${unsafeHTML(this.localize('subjects:1046'))}</dd>
                <dd>${unsafeHTML(this.localize('subjects:1047'))}</dd>
                <dd>${unsafeHTML(this.localize('subjects:1048'))}</dd>
                <dd>${unsafeHTML(this.localize('subjects:1049'))}</dd>
                <dt>${this.localize('subjects:1050')}</dt>
                <dd class="description">${unsafeHTML(this.localize('subjects:1051'))}</dd>
                <dd>${unsafeHTML(this.localize('subjects:1052'))}</dd>
                <dd>${unsafeHTML(this.localize('subjects:1053'))}</dd>
                <dt>${this.localize('subjects:1054')}</dt>
                <dd class="description">${unsafeHTML(this.localize('subjects:1055'))}</dd>
                <dt>${unsafeHTML(this.localize('subjects:1056'))}</dt>
              </dl>
            </dd>
            <dt id="present">${this.localize('subjects:1057')}</dt>
            <dd>${unsafeHTML(this.localize('subjects:1058'))}</dd>
            <dt id="protection">${this.localize('subjects:1059')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1060'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1061'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1062'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1063'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1064'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1065'))}</dd>
            <dt>${this.localize('subjects:1066')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1067'))}</dd>
            <dt id="punna">${this.localize('subjects:1068')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1069'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1070'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1071'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1072'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1073'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1074'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1075'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1076'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1077'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1078'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1079'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1080'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1081'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1082'))}</dd>
          </dl>
          <h2 id="qq">${this.localize('subjects:1083')}</h2>
          <dl>
            <dt>${this.localize('subjects:1084')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1085'))}</dd>
            <dt id="questions">${this.localize('subjects:1086')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1087'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1088'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1089'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1090'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1091'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1092'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1093'))}</dd>
            <dd>${this.localize('subjects:1094')}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1095'))}</dd>
          </dl>
          <h2 id="r">${this.localize('subjects:1096')}</h2>
          <dl>
            <dt>${this.localize('subjects:1097')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1098'))}</dd>
            <dt id="radiant">${this.localize('subjects:1099')}</dt>
            <dd>${unsafeHTML(this.localize('subjects:1100'))}</dd>
            <dt>${this.localize('subjects:1101')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1102'))}</dd>
            <dt>${this.localize('subjects:1103')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1104'))}</dd>
            <dt id="rebirth">${this.localize('subjects:1105')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1106'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1107'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1108'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1109'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1110'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1111'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1112'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1113'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1114'))}</dd>
            <dt id="recollections">${this.localize('subjects:1115')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1116'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1117'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1118'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1119'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1120'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1121'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1122'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1123'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1124'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1125'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1126'))}</dd>
            <dt id="reconciliation">${this.localize('subjects:1127')}</dt>
            <dt id="refuge">${this.localize('subjects:1128')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1129'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1130'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1131'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1132'))}</dd>
            <dt>${this.localize('subjects:1133')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1134'))}</dd>
            <dt id="relics">${this.localize('subjects:1135')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1136'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1137'))}</dd>
            <dt id="remorse">${this.localize('subjects:1138')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1139'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1140'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1141'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1142'))}</dd>
            <dt>${this.localize('subjects:1143')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1144'))}</dd>
            <dt id="respect">${this.localize('subjects:1145')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1146'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1147'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1148'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:292'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:551'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1149'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1150'))}</dd>
            <dt id="restlessness">${this.localize('subjects:1151')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1152'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1153'))}</dd>
            <dt id="restraint">${this.localize('subjects:1154')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1155'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1156'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1157'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1158'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1159'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1160'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1161'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1162'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1163'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1164'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1165'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1166'))}</dd>
            <dt id="revenge">${this.localize('subjects:1167')}</dt>
            <dd>${unsafeHTML(this.localize('subjects:1168'))}</dd>
            <dt>${this.localize('subjects:898')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:130'))}</dd>
            <dt>${this.localize('subjects:906')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:130'))}</dd>
            <dt>${this.localize('subjects:902')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:130'))}</dd>
            <dt>${this.localize('subjects:1169')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:130'))}</dd>
            <dt>${this.localize('subjects:900')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:130'))}</dd>
            <dt>${this.localize('subjects:904')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:130'))}</dd>
            <dt>${this.localize('subjects:1170')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:130'))}</dd>
            <dt>${this.localize('subjects:895')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:130'))}</dd>
            <dt>${this.localize('subjects:887')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:130'))}</dd>
            <dt id="rituals">${this.localize('subjects:1171')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1172'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1173'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1174'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1175'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1176'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1177'))}</dd>
          </dl>
          <h2 id="s">${this.localize('subjects:1178')}</h2>
          <dl>
            <dt id="sacca">${this.localize('subjects:1179')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1180'))}</dd>
            <dt id="saddha">${this.localize('subjects:1181')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1182'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1183'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1184'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1185'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:294'))}</dd>
            <dt id="sagga">${this.localize('subjects:1186')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1187'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1188'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1189'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1190'))}</dd>
            <dt id="sakkaya">${this.localize('subjects:1191')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1192'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:166'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:167'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1193'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1194'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1195'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1196'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1197'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:70'))}</dd>
            <dt id="salayatana">${this.localize('subjects:1198')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1199'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1200'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:50'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1201'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1202'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1203'))}</dd>
            <dd>${this.localize('subjects:1204')}</dd>
            <dt id="samadhi">${this.localize('subjects:1205')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1206'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1207'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1208'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1209'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1210'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1211'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1212'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1213'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1214'))}</dd>
            <dt id="samatha">${this.localize('subjects:1215')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1216'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1217'))}</dd>
            <dt id="sammappadhana">${this.localize('subjects:1218')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1219'))}</dd>
            <dt id="sampajanna">${this.localize('subjects:1220')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1221'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1222'))}</dd>
            <dt id="samsara">${this.localize('subjects:1223')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1224'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1225'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1226'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1227'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1228'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1229'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1230'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1231'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1232'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1113'))}</dd>
            <dd>${this.localize('subjects:1233')}</dd>
            <dt id="samvega">${this.localize('subjects:1234')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1235'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1236'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1237'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1238'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1239'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1240'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1241'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1242'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1243'))}</dd>
            <dt id="sangha">${this.localize('subjects:1244')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1245'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1246'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1247'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1248'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:62'))}</dd>
            <dt id="sankhara">${this.localize('subjects:1249')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1250'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:50'))}</dd>
            <dt id="sanyojana">${this.localize('subjects:1251')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1252'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1253'))}</dd>
            <dt id="sanna">${this.localize('subjects:1254')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1255'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1256'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:138'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1257'))}</dd>
            <dt id="sati">${this.localize('subjects:1258')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1259'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1260'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1261'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:280'))}</dd>
            <dt id="satipatthana">${this.localize('subjects:1262')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1263'))}</dd>
            <dd>${this.localize('subjects:1264')}</dd>
            <dd>${unsafeHTML(this.localize('subjects:793'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1265'))}</dd>
            <dt>${this.localize('subjects:1266')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1267'))}</dd>
            <dt>${this.localize('subjects:1268')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1269'))}</dd>
            <dt id="sensuality">${this.localize('subjects:1270')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1271'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:165'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:164'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1272'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1273'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1274'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1275'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1276'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1277'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1278'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1279'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1280'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:138'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1281'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1282'))}</dd>
            <dt id="separation">${this.localize('subjects:1283')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1284'))}</dd>
            <dt id="sex">${this.localize('subjects:1285')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1286'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1287'))}</dd>
            <dt id="wrongsex">${this.localize('subjects:1288')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1060'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1289'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1290'))}</dd>
            <dt>${this.localize('subjects:1291')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:272'))}</dd>
            <dt id="sickness">${this.localize('subjects:1292')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1293'))}</dd>
            <dt id="sila">${this.localize('subjects:1294')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1295'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1296'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1297'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:550'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:228'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:294'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1298'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1299'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:326'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1300'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1301'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1302'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:726'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1303'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1304'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1305'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1306'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1307'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1308'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1309'))}</dd>
            <dt>${this.localize('subjects:1310')}</dt>
            <dd>${unsafeHTML(this.localize('subjects:280'))}</dd>
            <dt id="sleep">${this.localize('subjects:1311')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1312'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1313'))}</dd>
            <dt id="sleepiness">${this.localize('subjects:1314')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:737'))}</dd>
            <dt id="sloth">${this.localize('subjects:1315')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1316'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1317'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1318'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1319'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1320'))}</dd>
            <dt id="smile">${this.localize('subjects:1321')}</dt>
            <dd>${unsafeHTML(this.localize('subjects:1322'))}</dd>
            <dt id="social">${this.localize('subjects:1323')}</dt>
            <dd>${unsafeHTML(this.localize('subjects:1324'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:728'))}</dd>
            <dt>${this.localize('subjects:1325')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1267'))}</dd>
            <dt>${unsafeHTML(this.localize('subjects:1326'))}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1327'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1328'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:897'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1329'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1330'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1331'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1332'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1333'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1334'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1335'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1336'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1337'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1338'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1339'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1340'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1341'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1342'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1343'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1344'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1345'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:914'))}</dd>
            <dt id="stream">${this.localize('subjects:1346')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1347'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1348'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1349'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1350'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1351'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:734'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1352'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:727'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1353'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1354'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1355'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1356'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1357'))}</dd>
            <dt id="suicide">${this.localize('subjects:1358')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:453'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1359'))}</dd>
            <dt id="supranormal">${this.localize('subjects:1360')}</dt>
            <dd>${unsafeHTML(this.localize('subjects:1361'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1362'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1363'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1364'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1365'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1366'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1367'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1368'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1369'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1370'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1371'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1372'))}</dd>
          </dl>
          <h2 id="t">${this.localize('subjects:1373')}</h2>
          <dl>
            <dt>${this.localize('subjects:1374')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:423'))}</dd>
            <dt id="tanha">${this.localize('subjects:1375')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1376'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:756'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:50'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1377'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1378'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1379'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1380'))}</dd>
            <dd>${this.localize('subjects:1381')}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1382'))}</dd>
            <dt id="teaching">${this.localize('subjects:1383')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1384'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1385'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1386'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1387'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1388'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1389'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1390'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1391'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1392'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1393'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1394'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1395'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1396'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1397'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1398'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1399'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1400'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1401'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1402'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1403'))}</dd>
            <dt id="tevijja">${this.localize('subjects:1404')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1405'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1406'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1407'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1408'))}</dd>
            <dt>${this.localize('subjects:1409')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1410'))}</dd>
            <dt id="thought">${this.localize('subjects:1411')}</dt>
            <dd>${unsafeHTML(this.localize('subjects:1412'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1413'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1414'))}</dd>
            <dt>${this.localize('subjects:1415')}</dt>
            <dd>${unsafeHTML(this.localize('subjects:1416'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1417'))}</dd>
            <dt id="tilakkhana">${this.localize('subjects:1418')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1419'))}</dd>
            <dt>${this.localize('subjects:1420')}</dt>
            <dd>${unsafeHTML(this.localize('subjects:1421'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1422'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1423'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1424'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1425'))}</dd>
            <dt id="tiratana">${this.localize('subjects:1426')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1427'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1428'))}</dd>
            <dt id="tisarana">${this.localize('subjects:1429')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1430'))}</dd>
            <dt>${this.localize('subjects:1431')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1432'))}</dd>
          </dl>
          <h2 id="u">${this.localize('subjects:1433')}</h2>
          <dl>
            <dt>${this.localize('subjects:1434')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1435'))}</dd>
            <dt>${this.localize('subjects:1436')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:490'))}</dd>
            <dt>${this.localize('subjects:1437')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:288'))}</dd>
            <dt id="upadana">${this.localize('subjects:1438')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1439'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:50'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1440'))}</dd>
            <dt id="upekkha">${this.localize('subjects:1441')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1442'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:677'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:678'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1443'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1444'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:679'))}</dd>
            <dt id="uposatha">${this.localize('subjects:1445')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1446'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1447'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1448'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1449'))}</dd>
          </dl>
          <h2 id="v">${this.localize('subjects:1450')}</h2>
          <dl>
            <dt id="vedana">${this.localize('subjects:1451')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1452'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:50'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1453'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1454'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1455'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1456'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:138'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1457'))}</dd>
            <dd>${this.localize('subjects:1458')}</dd>
            <dt>${this.localize('subjects:1459')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1460'))}</dd>
            <dt id="veggie">${this.localize('subjects:1461')}</dt>
            <dt id="views">${this.localize('subjects:1462')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1463'))}</dd>
            <dt id="vimutti">${this.localize('subjects:1464')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1465'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1466'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1467'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1468'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1469'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1470'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1471'))}</dd>
            <dt id="vinaya">${this.localize('subjects:1472')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1473'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1474'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:819'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1475'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1476'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:828'))}</dd>
            <dd>${this.localize('subjects:1477')}</dd>
            <dd>${this.localize('subjects:1478')}</dd>
            <dt id="vinnana">${this.localize('subjects:1479')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1480'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:50'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1481'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1482'))}</dd>
            <dt>${this.localize('subjects:1483')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1484'))}</dd>
            <dt id="vipassana">${this.localize('subjects:1485')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1486'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1487'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1488'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1489'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1490'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1491'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1492'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1493'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1494'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1495'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1496'))}</dd>
            <dt id="viraga">${this.localize('subjects:1497')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1498'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1499'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1500'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1501'))}</dd>
            <dt id="viriya">${this.localize('subjects:1502')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1503'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1504'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:110'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:280'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1505'))}</dd>
            <dt>${this.localize('subjects:1506')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:442'))}</dd>
            <dt id="viveka">${this.localize('subjects:1507')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1508'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1509'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1510'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1511'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1512'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1513'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1514'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1515'))}</dd>
          </dl>
          <h2 id="w">${this.localize('subjects:1516')}</h2>
          <dl>
            <dt id="wakefulness">${this.localize('subjects:1517')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1518'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:550'))}</dd>
            <dt id="walking">${this.localize('subjects:1519')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1520'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1521'))}</dd>
            <dt id="war">${this.localize('subjects:1522')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1523'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1524'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1525'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1526'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1527'))}</dd>
            <dt id="wealth">${this.localize('subjects:1528')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1529'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1530'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1531'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1532'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1533'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:826'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1534'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1535'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1536'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1537'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1538'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1539'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1540'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1541'))}</dd>
            <dt>${this.localize('subjects:1542')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1543'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1544'))}</dd>
            <dt id="wilderness">${this.localize('subjects:1545')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1546'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1547'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1548'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1549'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1550'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1551'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1552'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1553'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1554'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1555'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1556'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1557'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1558'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1559'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1560'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1561'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1562'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1563'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1564'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1565'))}</dd>
            <dt>${this.localize('subjects:1566')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1567'))}</dd>
            <dt>${this.localize('subjects:1568')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:385'))}</dd>
            <dt id="wiseperson">${this.localize('subjects:1569')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1570'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1571'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1572'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1512'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1573'))}</dd>
            <dt>${this.localize('subjects:1574')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1575'))}</dd>
            <dt id="women">${this.localize('subjects:1576')}</dt>
            <dd>${unsafeHTML(this.localize('subjects:1577'))}</dd>
            <dd>${this.localize('subjects:1578')}</dd>
            <dd>${this.localize('subjects:1579')}</dd>
            <dd>${this.localize('subjects:1478')}</dd>
            <dt id="monkwork">${this.localize('subjects:1580')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1581'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1582'))}</dd>
            <dt>${this.localize('subjects:1583')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:288'))}</dd>
            <dt>${this.localize('subjects:1584')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1585'))}</dd>
          </dl>
          <h2 id="xyz">${this.localize('subjects:1586')}</h2>
          <dl>
            <dt id="yoniso">${this.localize('subjects:1587')}</dt>
            <dd class="description">${unsafeHTML(this.localize('subjects:1588'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1589'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1590'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1591'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1592'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1593'))}</dd>
            <dd>${unsafeHTML(this.localize('subjects:1594'))}</dd>
          </dl>
          <aside class="about-index">
            <p>${unsafeHTML(this.localize('subjects:1595'))}</p>
            <ul>
              <li>${this.localize('subjects:1596')}</li>
              <li>${this.localize('subjects:1597')}</li>
              <li>${this.localize('subjects:1598')}</li>
              <li>${this.localize('subjects:1599')}</li>
              <li>${this.localize('subjects:1600')}</li>
              <li>${unsafeHTML(this.localize('subjects:1601'))}</li>
            </ul>
            <p>${this.localize('subjects:1602')}</p>
            <blockquote>${this.localize('subjects:1603')}</blockquote>
            <p>${this.localize('subjects:1604')}</p>
            <ul>
              <li>${this.localize('subjects:1605')}</li>
              <li>${this.localize('subjects:1606')}</li>
            </ul>
          </aside>
          <aside class="static-copyright">
            <p>${this.localize('subjects:1607')}</p>
            <blockquote>${unsafeHTML(this.localize('subjects:1608'))}</blockquote>
            <p>${this.localize('subjects:1609')}</p>
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
