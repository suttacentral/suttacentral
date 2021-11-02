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
            <dd class="type">${this.localize('names:32')}</dd>
            <dd>${unsafeHTML(this.localize('names:33'))}</dd>
            <dt>${this.localize('names:34')}</dt>
            <dd class="type">${this.localize('names:35')}</dd>
            <dd>${unsafeHTML(this.localize('names:36'))}</dd>
            <dt>${this.localize('names:37')}</dt>
            <dd class="type">${this.localize('names:38')}</dd>
            <dd>${unsafeHTML(this.localize('names:39'))}</dd>
            <dt>${this.localize('names:40')}</dt>
            <dd class="type">${this.localize('names:41')}</dd>
            <dd>${unsafeHTML(this.localize('names:42'))}</dd>
            <dt>${this.localize('names:43')}</dt>
            <dd class="type">${this.localize('names:44')}</dd>
            <dd>${unsafeHTML(this.localize('names:45'))}</dd>
            <dt>${this.localize('names:46')}</dt>
            <dd class="type">${this.localize('names:47')}</dd>
            <dd>${unsafeHTML(this.localize('names:48'))}</dd>
            <dt>${this.localize('names:49')}</dt>
            <dd class="type">${this.localize('names:50')}</dd>
            <dd>${unsafeHTML(this.localize('names:51'))}</dd>
            <dt>${this.localize('names:52')}</dt>
            <dd class="type">${this.localize('names:53')}</dd>
            <dd>${unsafeHTML(this.localize('names:54'))}</dd>
            <dt>${this.localize('names:55')}</dt>
            <dd class="type">${this.localize('names:56')}</dd>
            <dd>${unsafeHTML(this.localize('names:57'))}</dd>
            <dt>${this.localize('names:58')}</dt>
            <dd class="type">${this.localize('names:59')}</dd>
            <dd>${unsafeHTML(this.localize('names:60'))}</dd>
            <dt id="ajatasattu">${this.localize('names:61')}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:62'))}</dd>
            <dd>${unsafeHTML(this.localize('names:63'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:64'))}</dd>
            <dt>${this.localize('names:65')}</dt>
            <dd class="type">${this.localize('names:66')}</dd>
            <dd>${unsafeHTML(this.localize('names:67'))}</dd>
            <dt>${this.localize('names:68')}</dt>
            <dd>${unsafeHTML(this.localize('names:69'))}</dd>
            <dt>${this.localize('names:70')}</dt>
            <dd class="type">${this.localize('names:71')}</dd>
            <dd>${unsafeHTML(this.localize('names:72'))}</dd>
            <dt id="akasa">${this.localize('names:73')}</dt>
            <dd class="type">${this.localize('names:74')}</dd>
            <dd>${unsafeHTML(this.localize('names:75'))}</dd>
            <dt id="akkosaka">${this.localize('names:76')}</dt>
            <dd class="type">${this.localize('names:77')}</dd>
            <dd>${unsafeHTML(this.localize('names:78'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:79'))}</dd>
            <dt>${this.localize('names:80')}</dt>
            <dd class="type">${this.localize('names:81')}</dd>
            <dd>${unsafeHTML(this.localize('names:82'))}</dd>
            <dt>${this.localize('names:83')}</dt>
            <dd class="type">${this.localize('names:84')}</dd>
            <dd>${unsafeHTML(this.localize('names:85'))}</dd>
            <dt>${this.localize('names:86')}</dt>
            <dd class="type">${this.localize('names:87')}</dd>
            <dd>${unsafeHTML(this.localize('names:88'))}</dd>
            <dt>${this.localize('names:89')}</dt>
            <dd class="type">${this.localize('names:90')}</dd>
            <dd>${unsafeHTML(this.localize('names:91'))}</dd>
            <dt>${this.localize('names:92')}</dt>
            <dd class="type">${this.localize('names:93')}</dd>
            <dd>${unsafeHTML(this.localize('names:94'))}</dd>
            <dt>${this.localize('names:95')}</dt>
            <dd class="type">${this.localize('names:96')}</dd>
            <dd>${unsafeHTML(this.localize('names:97'))}</dd>
            <dt>${this.localize('names:98')}</dt>
            <dd class="type">${this.localize('names:99')}</dd>
            <dd>${unsafeHTML(this.localize('names:100'))}</dd>
            <dt>${this.localize('names:101')}</dt>
            <dd class="type">${this.localize('names:102')}</dd>
            <dd>${unsafeHTML(this.localize('names:103'))}</dd>
            <dt>${this.localize('names:104')}</dt>
            <dd class="type">${this.localize('names:105')}</dd>
            <dd>${unsafeHTML(this.localize('names:106'))}</dd>
            <dt>${this.localize('names:107')}</dt>
            <dd class="type">${this.localize('names:108')}</dd>
            <dd>${unsafeHTML(this.localize('names:109'))}</dd>
            <dt id="ananda">${this.localize('names:110')}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:111'))}</dd>
            <dd>${unsafeHTML(this.localize('names:112'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:113'))}</dd>
            <dt>${this.localize('names:114')}</dt>
            <dd class="type">${this.localize('names:115')}</dd>
            <dd>${unsafeHTML(this.localize('names:116'))}</dd>
            <dt id="anathapindika">${this.localize('names:117')}</dt>
            <dd class="type">${this.localize('names:118')}</dd>
            <dd>${unsafeHTML(this.localize('names:119'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:120'))}</dd>
            <dt id="anathapindika-park">${this.localize('names:121')}</dt>
            <dd>${unsafeHTML(this.localize('names:122'))}</dd>
            <dt>${this.localize('names:123')}</dt>
            <dd class="type">${this.localize('names:124')}</dd>
            <dd>${unsafeHTML(this.localize('names:125'))}</dd>
            <dt>${this.localize('names:126')}</dt>
            <dd class="type">${this.localize('names:127')}</dd>
            <dd>${unsafeHTML(this.localize('names:128'))}</dd>
            <dt>${this.localize('names:129')}</dt>
            <dd class="type">${this.localize('names:130')}</dd>
            <dd>${unsafeHTML(this.localize('names:131'))}</dd>
            <dt>${this.localize('names:132')}</dt>
            <dd class="type">${this.localize('names:133')}</dd>
            <dd>${unsafeHTML(this.localize('names:134'))}</dd>
            <dt>${this.localize('names:135')}</dt>
            <dd class="type">${this.localize('names:136')}</dd>
            <dd>${unsafeHTML(this.localize('names:137'))}</dd>
            <dt>${this.localize('names:138')}</dt>
            <dd class="type">${this.localize('names:139')}</dd>
            <dd>${unsafeHTML(this.localize('names:140'))}</dd>
            <dt>${this.localize('names:141')}</dt>
            <dd class="type">${this.localize('names:142')}</dd>
            <dd>${unsafeHTML(this.localize('names:143'))}</dd>
            <dt>${this.localize('names:144')}</dt>
            <dd class="type">${this.localize('names:145')}</dd>
            <dd>${unsafeHTML(this.localize('names:146'))}</dd>
            <dt>${this.localize('names:147')}</dt>
            <dd class="type">${this.localize('names:148')}</dd>
            <dd>${unsafeHTML(this.localize('names:149'))}</dd>
            <dt>${this.localize('names:150')}</dt>
            <dd class="type">${this.localize('names:151')}</dd>
            <dd>${unsafeHTML(this.localize('names:152'))}</dd>
            <dt>${this.localize('names:153')}</dt>
            <dd class="type">${this.localize('names:154')}</dd>
            <dd>${unsafeHTML(this.localize('names:155'))}</dd>
            <dt>${this.localize('names:156')}</dt>
            <dd class="type">${this.localize('names:157')}</dd>
            <dd>${unsafeHTML(this.localize('names:158'))}</dd>
            <dt id="anuruddha">${this.localize('names:159')}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:160'))}</dd>
            <dd>${unsafeHTML(this.localize('names:161'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:162'))}</dd>
            <dt>${this.localize('names:163')}</dt>
            <dd class="type">${this.localize('names:164')}</dd>
            <dd>${unsafeHTML(this.localize('names:165'))}</dd>
            <dt>${this.localize('names:166')}</dt>
            <dd class="type">${this.localize('names:167')}</dd>
            <dd>${unsafeHTML(this.localize('names:168'))}</dd>
            <dt>${this.localize('names:169')}</dt>
            <dd class="type">${this.localize('names:170')}</dd>
            <dd>${unsafeHTML(this.localize('names:171'))}</dd>
            <dt>${this.localize('names:172')}</dt>
            <dd class="type">${this.localize('names:173')}</dd>
            <dd>${unsafeHTML(this.localize('names:174'))}</dd>
            <dt>${this.localize('names:175')}</dt>
            <dd>${unsafeHTML(this.localize('names:176'))}</dd>
            <dt>${this.localize('names:177')}</dt>
            <dd class="type">${this.localize('names:178')}</dd>
            <dd>${unsafeHTML(this.localize('names:179'))}</dd>
            <dt>${this.localize('names:180')}</dt>
            <dd class="type">${this.localize('names:181')}</dd>
            <dd>${unsafeHTML(this.localize('names:182'))}</dd>
            <dt>${this.localize('names:183')}</dt>
            <dd class="type">${this.localize('names:184')}</dd>
            <dd>${unsafeHTML(this.localize('names:185'))}</dd>
            <dt>${this.localize('names:186')}</dt>
            <dd class="type">${this.localize('names:187')}</dd>
            <dd>${unsafeHTML(this.localize('names:188'))}</dd>
            <dt>${this.localize('names:189')}</dt>
            <dd class="type">${this.localize('names:190')}</dd>
            <dd>${unsafeHTML(this.localize('names:191'))}</dd>
            <dt>${this.localize('names:192')}</dt>
            <dd class="type">${this.localize('names:193')}</dd>
            <dd>${unsafeHTML(this.localize('names:194'))}</dd>
            <dt>${this.localize('names:195')}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:196'))}</dd>
            <dd>${unsafeHTML(this.localize('names:197'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:198'))}</dd>
            <dt>${this.localize('names:199')}</dt>
            <dd class="type">${this.localize('names:200')}</dd>
            <dd>${unsafeHTML(this.localize('names:201'))}</dd>
            <dt>${this.localize('names:202')}</dt>
            <dd class="type">${this.localize('names:203')}</dd>
            <dd>${unsafeHTML(this.localize('names:204'))}</dd>
            <dt>${this.localize('names:205')}</dt>
            <dd class="type">${this.localize('names:206')}</dd>
            <dd>${unsafeHTML(this.localize('names:207'))}</dd>
            <dt>${this.localize('names:208')}</dt>
            <dd class="type">${this.localize('names:209')}</dd>
            <dd>${unsafeHTML(this.localize('names:210'))}</dd>
            <dt>${this.localize('names:211')}</dt>
            <dd class="type">${this.localize('names:212')}</dd>
            <dd>${unsafeHTML(this.localize('names:213'))}</dd>
            <dt>${this.localize('names:214')}</dt>
            <dd class="type">${this.localize('names:215')}</dd>
            <dd>${unsafeHTML(this.localize('names:216'))}</dd>
            <dt>${this.localize('names:217')}</dt>
            <dd class="type">${this.localize('names:218')}</dd>
            <dd>${unsafeHTML(this.localize('names:219'))}</dd>
            <dt>${this.localize('names:220')}</dt>
            <dd class="type">${this.localize('names:221')}</dd>
            <dd>${unsafeHTML(this.localize('names:222'))}</dd>
            <dt>${this.localize('names:223')}</dt>
            <dd class="type">${this.localize('names:224')}</dd>
            <dd>${unsafeHTML(this.localize('names:225'))}</dd>
            <dt>${this.localize('names:226')}</dt>
            <dd class="type">${this.localize('names:227')}</dd>
            <dd>${unsafeHTML(this.localize('names:228'))}</dd>
            <dt>${this.localize('names:229')}</dt>
            <dd class="type">${this.localize('names:230')}</dd>
            <dd>${unsafeHTML(this.localize('names:231'))}</dd>
            <dt>${this.localize('names:232')}</dt>
            <dd class="type">${this.localize('names:233')}</dd>
            <dd>${unsafeHTML(this.localize('names:234'))}</dd>
            <dt>${this.localize('names:235')}</dt>
            <dd class="type">${this.localize('names:236')}</dd>
            <dd>${unsafeHTML(this.localize('names:237'))}</dd>
            <dt>${this.localize('names:238')}</dt>
            <dd>${unsafeHTML(this.localize('names:239'))}</dd>
            <dt>${this.localize('names:240')}</dt>
            <dd class="type">${this.localize('names:241')}</dd>
            <dd>${unsafeHTML(this.localize('names:242'))}</dd>
            <dt>${this.localize('names:243')}</dt>
            <dd class="type">${this.localize('names:244')}</dd>
            <dd>${unsafeHTML(this.localize('names:245'))}</dd>
            <dt>${this.localize('names:246')}</dt>
            <dd class="type">${this.localize('names:247')}</dd>
            <dd>${unsafeHTML(this.localize('names:248'))}</dd>
          </dl>
          <h2 id="b">${this.localize('names:249')}</h2>
          <dl>
            <dt>${this.localize('names:250')}</dt>
            <dd class="type">${this.localize('names:251')}</dd>
            <dd>${unsafeHTML(this.localize('names:252'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:253'))}</dd>
            <dt>${this.localize('names:254')}</dt>
            <dd class="type">${this.localize('names:255')}</dd>
            <dd>${unsafeHTML(this.localize('names:256'))}</dd>
            <dt>${this.localize('names:257')}</dt>
            <dd class="type">${this.localize('names:258')}</dd>
            <dd>${unsafeHTML(this.localize('names:259'))}</dd>
            <dt>${this.localize('names:260')}</dt>
            <dd class="type">${this.localize('names:261')}</dd>
            <dd>${unsafeHTML(this.localize('names:262'))}</dd>
            <dt>${this.localize('names:263')}</dt>
            <dd class="type">${this.localize('names:264')}</dd>
            <dd>${unsafeHTML(this.localize('names:265'))}</dd>
            <dt>${this.localize('names:266')}</dt>
            <dd>${unsafeHTML(this.localize('names:267'))}</dd>
            <dt>${this.localize('names:268')}</dt>
            <dd class="type">${this.localize('names:269')}</dd>
            <dd>${unsafeHTML(this.localize('names:270'))}</dd>
            <dt>${this.localize('names:271')}</dt>
            <dd class="type">${this.localize('names:272')}</dd>
            <dd>${unsafeHTML(this.localize('names:273'))}</dd>
            <dt>${this.localize('names:274')}</dt>
            <dd>${unsafeHTML(this.localize('names:275'))}</dd>
            <dt>${this.localize('names:276')}</dt>
            <dd>${unsafeHTML(this.localize('names:277'))}</dd>
            <dt>${this.localize('names:278')}</dt>
            <dd class="type">${this.localize('names:279')}</dd>
            <dd>${unsafeHTML(this.localize('names:280'))}</dd>
            <dt>${this.localize('names:281')}</dt>
            <dd class="type">${this.localize('names:282')}</dd>
            <dd>${unsafeHTML(this.localize('names:283'))}</dd>
            <dt>${this.localize('names:284')}</dt>
            <dd>${unsafeHTML(this.localize('names:285'))}</dd>
            <dt id="bhadda">${this.localize('names:286')}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:287'))}</dd>
            <dd>${unsafeHTML(this.localize('names:288'))}</dd>
            <dt>${this.localize('names:289')}</dt>
            <dd class="type">${this.localize('names:290')}</dd>
            <dd>${unsafeHTML(this.localize('names:291'))}</dd>
            <dt id="bhaddiya">${this.localize('names:292')}</dt>
            <dd class="type">${this.localize('names:293')}</dd>
            <dd>${unsafeHTML(this.localize('names:294'))}</dd>
            <dt>${this.localize('names:295')}</dt>
            <dd class="type">${this.localize('names:296')}</dd>
            <dd>${unsafeHTML(this.localize('names:297'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:298'))}</dd>
            <dt>${this.localize('names:299')}</dt>
            <dd>${unsafeHTML(this.localize('names:300'))}</dd>
            <dt>${this.localize('names:301')}</dt>
            <dd class="type">${this.localize('names:302')}</dd>
            <dd>${unsafeHTML(this.localize('names:303'))}</dd>
            <dt>${this.localize('names:304')}</dt>
            <dd class="type">${this.localize('names:305')}</dd>
            <dd>${unsafeHTML(this.localize('names:306'))}</dd>
            <dt>${this.localize('names:307')}</dt>
            <dd class="type">${this.localize('names:308')}</dd>
            <dd>${unsafeHTML(this.localize('names:309'))}</dd>
            <dt>${this.localize('names:310')}</dt>
            <dd class="type">${this.localize('names:311')}</dd>
            <dd>${unsafeHTML(this.localize('names:312'))}</dd>
            <dt>${this.localize('names:313')}</dt>
            <dd class="type">${this.localize('names:314')}</dd>
            <dd>${unsafeHTML(this.localize('names:315'))}</dd>
            <dt>${this.localize('names:316')}</dt>
            <dd class="type">${this.localize('names:317')}</dd>
            <dd>${unsafeHTML(this.localize('names:318'))}</dd>
            <dt>${this.localize('names:319')}</dt>
            <dd>${unsafeHTML(this.localize('names:320'))}</dd>
            <dt>${this.localize('names:321')}</dt>
            <dd class="type">${this.localize('names:322')}</dd>
            <dd>${unsafeHTML(this.localize('names:323'))}</dd>
            <dt>${this.localize('names:324')}</dt>
            <dd>${unsafeHTML(this.localize('names:325'))}</dd>
            <dt>${this.localize('names:326')}</dt>
            <dd>${unsafeHTML(this.localize('names:327'))}</dd>
            <dt>${this.localize('names:328')}</dt>
            <dd>${unsafeHTML(this.localize('names:329'))}</dd>
            <dt>${this.localize('names:330')}</dt>
            <dd>${unsafeHTML(this.localize('names:331'))}</dd>
            <dt>${this.localize('names:332')}</dt>
            <dd>${unsafeHTML(this.localize('names:333'))}</dd>
            <dt>${this.localize('names:334')}</dt>
            <dd>${unsafeHTML(this.localize('names:335'))}</dd>
            <dt>${this.localize('names:336')}</dt>
            <dd class="type">${this.localize('names:337')}</dd>
            <dd>${unsafeHTML(this.localize('names:338'))}</dd>
            <dt>${this.localize('names:339')}</dt>
            <dd class="type">${this.localize('names:340')}</dd>
            <dd>${unsafeHTML(this.localize('names:341'))}</dd>
            <dt>${this.localize('names:342')}</dt>
            <dd class="type">${this.localize('names:343')}</dd>
            <dd>${unsafeHTML(this.localize('names:344'))}</dd>
            <dt>${this.localize('names:345')}</dt>
            <dd class="type">${this.localize('names:346')}</dd>
            <dd>${unsafeHTML(this.localize('names:347'))}</dd>
            <dt>${this.localize('names:348')}</dt>
            <dd class="type">${this.localize('names:349')}</dd>
            <dd>${unsafeHTML(this.localize('names:350'))}</dd>
            <dt>${this.localize('names:351')}</dt>
            <dd class="type">${this.localize('names:352')}</dd>
            <dd>${unsafeHTML(this.localize('names:353'))}</dd>
            <dt>${this.localize('names:354')}</dt>
            <dd class="type">${this.localize('names:355')}</dd>
            <dd>${unsafeHTML(this.localize('names:356'))}</dd>
            <dt>${this.localize('names:357')}</dt>
            <dd class="type">${this.localize('names:358')}</dd>
            <dd>${unsafeHTML(this.localize('names:359'))}</dd>
            <dt>${this.localize('names:360')}</dt>
            <dd class="type">${this.localize('names:361')}</dd>
            <dd>${unsafeHTML(this.localize('names:362'))}</dd>
            <dt>${unsafeHTML(this.localize('names:363'))}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:364'))}</dd>
            <dd>${unsafeHTML(this.localize('names:365'))}</dd>
            <dt>${this.localize('names:366')}</dt>
            <dd class="type">${this.localize('names:367')}</dd>
            <dd>${unsafeHTML(this.localize('names:368'))}</dd>
            <dt>${this.localize('names:369')}</dt>
            <dd>${unsafeHTML(this.localize('names:370'))}</dd>
            <dt>${this.localize('names:371')}</dt>
            <dd class="type">${this.localize('names:372')}</dd>
            <dd>${unsafeHTML(this.localize('names:373'))}</dd>
            <dt>${this.localize('names:374')}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:375'))}</dd>
            <dd>${unsafeHTML(this.localize('names:376'))}</dd>
            <dt>${this.localize('names:377')}</dt>
            <dd class="type">${this.localize('names:378')}</dd>
            <dd>${unsafeHTML(this.localize('names:379'))}</dd>
          </dl>
          <h2 id="c">${this.localize('names:380')}</h2>
          <dl>
            <dt>${this.localize('names:381')}</dt>
            <dd class="type">${this.localize('names:382')}</dd>
            <dd>${unsafeHTML(this.localize('names:383'))}</dd>
            <dt>${this.localize('names:384')}</dt>
            <dd class="type">${this.localize('names:385')}</dd>
            <dd>${unsafeHTML(this.localize('names:386'))}</dd>
            <dt>${this.localize('names:387')}</dt>
            <dd class="type">${this.localize('names:388')}</dd>
            <dd>${unsafeHTML(this.localize('names:389'))}</dd>
            <dt>${this.localize('names:390')}</dt>
            <dd class="type">${this.localize('names:391')}</dd>
            <dd>${unsafeHTML(this.localize('names:392'))}</dd>
            <dt>${this.localize('names:393')}</dt>
            <dd class="type">${this.localize('names:394')}</dd>
            <dd>${unsafeHTML(this.localize('names:395'))}</dd>
            <dt>${this.localize('names:396')}</dt>
            <dd class="type">${this.localize('names:397')}</dd>
            <dd>${unsafeHTML(this.localize('names:398'))}</dd>
            <dt>${this.localize('names:399')}</dt>
            <dd class="type">${this.localize('names:400')}</dd>
            <dd>${unsafeHTML(this.localize('names:401'))}</dd>
            <dt>${this.localize('names:402')}</dt>
            <dd class="type">${this.localize('names:403')}</dd>
            <dd>${unsafeHTML(this.localize('names:404'))}</dd>
            <dt>${this.localize('names:405')}</dt>
            <dd class="type">${this.localize('names:406')}</dd>
            <dd>${unsafeHTML(this.localize('names:407'))}</dd>
            <dt>${this.localize('names:408')}</dt>
            <dd class="type">${this.localize('names:409')}</dd>
            <dd>${unsafeHTML(this.localize('names:410'))}</dd>
            <dt>${this.localize('names:411')}</dt>
            <dd class="type">${this.localize('names:412')}</dd>
            <dd>${unsafeHTML(this.localize('names:413'))}</dd>
            <dt>${this.localize('names:414')}</dt>
            <dd class="type">${this.localize('names:415')}</dd>
            <dd>${unsafeHTML(this.localize('names:416'))}</dd>
            <dt id="ciravasi">${this.localize('names:417')}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:418'))}</dd>
            <dd>${unsafeHTML(this.localize('names:419'))}</dd>
            <dt>${this.localize('names:420')}</dt>
            <dd class="type">${this.localize('names:421')}</dd>
            <dd>${unsafeHTML(this.localize('names:422'))}</dd>
            <dt>${this.localize('names:423')}</dt>
            <dd>${unsafeHTML(this.localize('names:424'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:425'))}</dd>
            <dt>${this.localize('names:426')}</dt>
            <dd class="type">${this.localize('names:427')}</dd>
            <dd>${unsafeHTML(this.localize('names:428'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:429'))}</dd>
            <dt>${this.localize('names:430')}</dt>
            <dd class="type">${this.localize('names:431')}</dd>
            <dd>${unsafeHTML(this.localize('names:432'))}</dd>
            <dt>${this.localize('names:433')}</dt>
            <dd class="type">${this.localize('names:434')}</dd>
            <dd>${unsafeHTML(this.localize('names:435'))}</dd>
            <dt>${this.localize('names:436')}</dt>
            <dd>${unsafeHTML(this.localize('names:437'))}</dd>
            <dt>${this.localize('names:438')}</dt>
            <dd class="type">${this.localize('names:439')}</dd>
            <dd>${unsafeHTML(this.localize('names:440'))}</dd>
            <dt>${this.localize('names:441')}</dt>
            <dd class="type">${this.localize('names:442')}</dd>
            <dd>${unsafeHTML(this.localize('names:443'))}</dd>
            <dt>${this.localize('names:444')}</dt>
            <dd class="type">${this.localize('names:445')}</dd>
            <dd>${unsafeHTML(this.localize('names:446'))}</dd>
            <dt>${this.localize('names:447')}</dt>
            <dd class="type">${this.localize('names:448')}</dd>
            <dd>${unsafeHTML(this.localize('names:449'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:450'))}</dd>
            <dt>${this.localize('names:451')}</dt>
            <dd>${unsafeHTML(this.localize('names:452'))}</dd>
            <dt>${this.localize('names:453')}</dt>
            <dd class="type">${this.localize('names:454')}</dd>
            <dd>${unsafeHTML(this.localize('names:455'))}</dd>
          </dl>
          <h2 id="d">${this.localize('names:456')}</h2>
          <dl>
            <dt>${this.localize('names:457')}</dt>
            <dd class="type">${this.localize('names:458')}</dd>
            <dd>${unsafeHTML(this.localize('names:459'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:460'))}</dd>
            <dt>${this.localize('names:461')}</dt>
            <dd class="type">${this.localize('names:462')}</dd>
            <dd>${unsafeHTML(this.localize('names:463'))}</dd>
            <dt>${this.localize('names:464')}</dt>
            <dd class="type">${this.localize('names:465')}</dd>
            <dd>${unsafeHTML(this.localize('names:466'))}</dd>
            <dt>${this.localize('names:467')}</dt>
            <dd class="type">${this.localize('names:468')}</dd>
            <dd>${unsafeHTML(this.localize('names:469'))}</dd>
            <dt>${this.localize('names:470')}</dt>
            <dd>${unsafeHTML(this.localize('names:471'))}</dd>
            <dt>${this.localize('names:472')}</dt>
            <dd class="type">${this.localize('names:473')}</dd>
            <dd>${unsafeHTML(this.localize('names:474'))}</dd>
            <dt>${this.localize('names:475')}</dt>
            <dd class="type">${this.localize('names:476')}</dd>
            <dd>${unsafeHTML(this.localize('names:477'))}</dd>
            <dt>${this.localize('names:478')}</dt>
            <dd class="type">${this.localize('names:479')}</dd>
            <dd>${unsafeHTML(this.localize('names:480'))}</dd>
            <dt>${this.localize('names:481')}</dt>
            <dd class="type">${this.localize('names:482')}</dd>
            <dd>${unsafeHTML(this.localize('names:483'))}</dd>
            <dt>${this.localize('names:484')}</dt>
            <dd class="type">${this.localize('names:485')}</dd>
            <dd>${unsafeHTML(this.localize('names:486'))}</dd>
            <dt>${this.localize('names:487')}</dt>
            <dd class="type">${this.localize('names:488')}</dd>
            <dd>${unsafeHTML(this.localize('names:489'))}</dd>
            <dt>${this.localize('names:490')}</dt>
            <dd class="type">${this.localize('names:491')}</dd>
            <dd>${unsafeHTML(this.localize('names:492'))}</dd>
            <dt>${this.localize('names:493')}</dt>
            <dd class="type">${this.localize('names:494')}</dd>
            <dd>${unsafeHTML(this.localize('names:495'))}</dd>
            <dt>${this.localize('names:496')}</dt>
            <dd class="type">${this.localize('names:497')}</dd>
            <dd>${unsafeHTML(this.localize('names:498'))}</dd>
            <dt id="dhammadinna">${this.localize('names:499')}</dt>
            <dd class="type">${this.localize('names:500')}</dd>
            <dd>${unsafeHTML(this.localize('names:501'))}</dd>
            <dt>${this.localize('names:502')}</dt>
            <dd class="type">${this.localize('names:503')}</dd>
            <dd>${unsafeHTML(this.localize('names:504'))}</dd>
            <dt>${this.localize('names:505')}</dt>
            <dd>${unsafeHTML(this.localize('names:506'))}</dd>
            <dt>${this.localize('names:507')}</dt>
            <dd class="type">${this.localize('names:508')}</dd>
            <dd>${unsafeHTML(this.localize('names:509'))}</dd>
            <dt>${this.localize('names:510')}</dt>
            <dd class="type">${this.localize('names:511')}</dd>
            <dd>${unsafeHTML(this.localize('names:512'))}</dd>
            <dt>${this.localize('names:513')}</dt>
            <dd class="type">${this.localize('names:514')}</dd>
            <dd>${unsafeHTML(this.localize('names:515'))}</dd>
            <dt>${this.localize('names:516')}</dt>
            <dd class="type">${this.localize('names:517')}</dd>
            <dd>${unsafeHTML(this.localize('names:518'))}</dd>
            <dt>${this.localize('names:519')}</dt>
            <dd class="type">${this.localize('names:520')}</dd>
            <dd>${unsafeHTML(this.localize('names:521'))}</dd>
            <dt>${this.localize('names:522')}</dt>
            <dd class="type">${this.localize('names:523')}</dd>
            <dd>${unsafeHTML(this.localize('names:524'))}</dd>
            <dt>${this.localize('names:525')}</dt>
            <dd class="type">${this.localize('names:526')}</dd>
            <dd>${unsafeHTML(this.localize('names:527'))}</dd>
            <dt id="dighajanu">${this.localize('names:528')}</dt>
            <dd class="type">${this.localize('names:529')}</dd>
            <dd>${unsafeHTML(this.localize('names:530'))}</dd>
            <dt id="dighavu">${this.localize('names:531')}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:532'))}</dd>
            <dd>${unsafeHTML(this.localize('names:533'))}</dd>
            <dt>${this.localize('names:534')}</dt>
            <dd class="type">${this.localize('names:535')}</dd>
            <dd>${unsafeHTML(this.localize('names:536'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:537'))}</dd>
            <dt id="dighiti">${this.localize('names:538')}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:539'))}</dd>
            <dd>${unsafeHTML(this.localize('names:540'))}</dd>
            <dt>${this.localize('names:541')}</dt>
            <dd class="type">${this.localize('names:542')}</dd>
            <dd>${unsafeHTML(this.localize('names:543'))}</dd>
            <dt>${this.localize('names:544')}</dt>
            <dd class="type">${this.localize('names:545')}</dd>
            <dd>${unsafeHTML(this.localize('names:546'))}</dd>
            <dt>${this.localize('names:547')}</dt>
            <dd class="type">${this.localize('names:548')}</dd>
            <dd>${unsafeHTML(this.localize('names:549'))}</dd>
          </dl>
          <h2 id="e">${this.localize('names:550')}</h2>
          <dl>
            <dt>${this.localize('names:551')}</dt>
            <dd class="type">${this.localize('names:552')}</dd>
            <dd>${unsafeHTML(this.localize('names:553'))}</dd>
            <dt>${this.localize('names:554')}</dt>
            <dd class="type">${this.localize('names:555')}</dd>
            <dd>${unsafeHTML(this.localize('names:556'))}</dd>
            <dt>${this.localize('names:557')}</dt>
            <dd class="type">${this.localize('names:558')}</dd>
            <dd>${unsafeHTML(this.localize('names:559'))}</dd>
            <dt>${this.localize('names:560')}</dt>
            <dd class="type">${this.localize('names:561')}</dd>
            <dd>${unsafeHTML(this.localize('names:562'))}</dd>
            <dt>${this.localize('names:563')}</dt>
            <dd class="type">${this.localize('names:564')}</dd>
            <dd>${unsafeHTML(this.localize('names:565'))}</dd>
          </dl>
          <h2 id="f">${this.localize('names:566')}</h2>
          <dl>
            <dt>${this.localize('names:567')}</dt>
            <dd class="type">${this.localize('names:568')}</dd>
            <dd>${unsafeHTML(this.localize('names:569'))}</dd>
          </dl>
          <h2 id="g">${this.localize('names:570')}</h2>
          <dl>
            <dt>${this.localize('names:571')}</dt>
            <dd class="type">${this.localize('names:572')}</dd>
            <dd>${unsafeHTML(this.localize('names:573'))}</dd>
            <dt>${this.localize('names:574')}</dt>
            <dd class="type">${this.localize('names:575')}</dd>
            <dd>${unsafeHTML(this.localize('names:576'))}</dd>
            <dt>${this.localize('names:577')}</dt>
            <dd class="type">${this.localize('names:578')}</dd>
            <dd>${unsafeHTML(this.localize('names:579'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:580'))}</dd>
            <dt id="gandhabhaka">${this.localize('names:581')}</dt>
            <dd class="type">${this.localize('names:582')}</dd>
            <dd>${unsafeHTML(this.localize('names:583'))}</dd>
            <dt>${this.localize('names:584')}</dt>
            <dd class="type">${this.localize('names:585')}</dd>
            <dd>${unsafeHTML(this.localize('names:586'))}</dd>
            <dt>${this.localize('names:587')}</dt>
            <dd class="type">${this.localize('names:588')}</dd>
            <dd>${unsafeHTML(this.localize('names:589'))}</dd>
            <dt>${this.localize('names:590')}</dt>
            <dd class="type">${this.localize('names:591')}</dd>
            <dd>${unsafeHTML(this.localize('names:592'))}</dd>
            <dt>${this.localize('names:593')}</dt>
            <dd class="type">${this.localize('names:594')}</dd>
            <dd>${unsafeHTML(this.localize('names:595'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:596'))}</dd>
            <dt>${this.localize('names:597')}</dt>
            <dd class="type">${this.localize('names:598')}</dd>
            <dd>${unsafeHTML(this.localize('names:599'))}</dd>
            <dt>${this.localize('names:600')}</dt>
            <dd class="type">${this.localize('names:601')}</dd>
            <dd>${unsafeHTML(this.localize('names:602'))}</dd>
            <dt>${this.localize('names:603')}</dt>
            <dd class="type">${this.localize('names:604')}</dd>
            <dd>${unsafeHTML(this.localize('names:605'))}</dd>
            <dt>${this.localize('names:606')}</dt>
            <dd class="type">${this.localize('names:607')}</dd>
            <dd>${unsafeHTML(this.localize('names:608'))}</dd>
            <dt>${this.localize('names:609')}</dt>
            <dd>${unsafeHTML(this.localize('names:610'))}</dd>
            <dt>${this.localize('names:611')}</dt>
            <dd class="type">${this.localize('names:612')}</dd>
            <dd>${unsafeHTML(this.localize('names:613'))}</dd>
            <dt>${this.localize('names:614')}</dt>
            <dd class="type">${this.localize('names:615')}</dd>
            <dd>${unsafeHTML(this.localize('names:616'))}</dd>
            <dt>${this.localize('names:617')}</dt>
            <dd class="type">${this.localize('names:618')}</dd>
            <dd>${unsafeHTML(this.localize('names:619'))}</dd>
            <dt>${this.localize('names:620')}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:621'))}</dd>
            <dd>${unsafeHTML(this.localize('names:622'))}</dd>
            <dt>${this.localize('names:623')}</dt>
            <dd class="type">${this.localize('names:624')}</dd>
            <dd>${unsafeHTML(this.localize('names:625'))}</dd>
            <dt>${this.localize('names:626')}</dt>
            <dd class="type">${this.localize('names:627')}</dd>
            <dd>${unsafeHTML(this.localize('names:628'))}</dd>
            <dt>${this.localize('names:629')}</dt>
            <dd class="type">${this.localize('names:630')}</dd>
            <dd>${unsafeHTML(this.localize('names:631'))}</dd>
            <dt>${this.localize('names:632')}</dt>
            <dd class="type">${this.localize('names:633')}</dd>
            <dd>${unsafeHTML(this.localize('names:634'))}</dd>
            <dt>${this.localize('names:635')}</dt>
            <dd class="type">${this.localize('names:636')}</dd>
            <dd>${unsafeHTML(this.localize('names:637'))}</dd>
            <dt>${this.localize('names:638')}</dt>
            <dd class="type">${this.localize('names:639')}</dd>
            <dd>${unsafeHTML(this.localize('names:640'))}</dd>
            <dt>${this.localize('names:641')}</dt>
            <dd class="type">${this.localize('names:642')}</dd>
            <dd>${unsafeHTML(this.localize('names:643'))}</dd>
            <dt>${this.localize('names:644')}</dt>
            <dd class="type">${this.localize('names:645')}</dd>
            <dd>${unsafeHTML(this.localize('names:646'))}</dd>
            <dt>${this.localize('names:647')}</dt>
            <dd class="type">${this.localize('names:648')}</dd>
            <dd>${unsafeHTML(this.localize('names:649'))}</dd>
          </dl>
          <h2 id="h">${this.localize('names:650')}</h2>
          <dl>
            <dt>${this.localize('names:651')}</dt>
            <dd>${unsafeHTML(this.localize('names:652'))}</dd>
            <dt>${this.localize('names:653')}</dt>
            <dd class="type">${this.localize('names:654')}</dd>
            <dd>${unsafeHTML(this.localize('names:655'))}</dd>
            <dt>${this.localize('names:656')}</dt>
            <dd class="type">${this.localize('names:657')}</dd>
            <dd>${unsafeHTML(this.localize('names:658'))}</dd>
            <dt>${this.localize('names:659')}</dt>
            <dd class="type">${this.localize('names:660')}</dd>
            <dd>${unsafeHTML(this.localize('names:661'))}</dd>
            <dt>${this.localize('names:662')}</dt>
            <dd class="type">${this.localize('names:663')}</dd>
            <dd>${unsafeHTML(this.localize('names:664'))}</dd>
            <dt>${this.localize('names:665')}</dt>
            <dd class="type">${this.localize('names:666')}</dd>
            <dd>${unsafeHTML(this.localize('names:667'))}</dd>
            <dt>${this.localize('names:668')}</dt>
            <dd class="type">${this.localize('names:669')}</dd>
            <dd>${unsafeHTML(this.localize('names:670'))}</dd>
            <dt>${this.localize('names:671')}</dt>
            <dd class="type">${this.localize('names:672')}</dd>
            <dd>${unsafeHTML(this.localize('names:673'))}</dd>
            <dt>${this.localize('names:674')}</dt>
            <dd class="type">${this.localize('names:675')}</dd>
            <dd>${unsafeHTML(this.localize('names:676'))}</dd>
            <dt>${this.localize('names:677')}</dt>
            <dd class="type">${this.localize('names:678')}</dd>
            <dd>${unsafeHTML(this.localize('names:679'))}</dd>
            <dt>${this.localize('names:680')}</dt>
            <dd class="type">${this.localize('names:681')}</dd>
            <dd>${unsafeHTML(this.localize('names:682'))}</dd>
            <dt>${this.localize('names:683')}</dt>
            <dd class="type">${this.localize('names:684')}</dd>
            <dd>${unsafeHTML(this.localize('names:685'))}</dd>
          </dl>
          <h2 id="i">${this.localize('names:686')}</h2>
          <dl>
            <dt>${this.localize('names:687')}</dt>
            <dd class="type">${this.localize('names:688')}</dd>
            <dd>${unsafeHTML(this.localize('names:689'))}</dd>
            <dt>${this.localize('names:690')}</dt>
            <dd class="type">${this.localize('names:691')}</dd>
            <dd>${unsafeHTML(this.localize('names:692'))}</dd>
            <dt>${this.localize('names:693')}</dt>
            <dd class="type">${this.localize('names:694')}</dd>
            <dd>${unsafeHTML(this.localize('names:695'))}</dd>
            <dt>${this.localize('names:696')}</dt>
            <dd class="type">${this.localize('names:697')}</dd>
            <dd>${unsafeHTML(this.localize('names:698'))}</dd>
            <dt>${this.localize('names:699')}</dt>
            <dd class="type">${this.localize('names:700')}</dd>
            <dd>${unsafeHTML(this.localize('names:701'))}</dd>
            <dt>${this.localize('names:702')}</dt>
            <dd class="type">${this.localize('names:703')}</dd>
            <dd>${unsafeHTML(this.localize('names:704'))}</dd>
            <dt>${this.localize('names:705')}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:706'))}</dd>
            <dd>${unsafeHTML(this.localize('names:707'))}</dd>
          </dl>
          <h2 id="j">${this.localize('names:708')}</h2>
          <dl>
            <dt id="jains">${this.localize('names:709')}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:710'))}</dd>
            <dd>${unsafeHTML(this.localize('names:711'))}</dd>
            <dt>${this.localize('names:712')}</dt>
            <dd class="type">${this.localize('names:713')}</dd>
            <dd>${unsafeHTML(this.localize('names:714'))}</dd>
            <dt>${this.localize('names:715')}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:716'))}</dd>
            <dd>${unsafeHTML(this.localize('names:717'))}</dd>
            <dt>${this.localize('names:718')}</dt>
            <dd class="type">${this.localize('names:719')}</dd>
            <dd>${unsafeHTML(this.localize('names:720'))}</dd>
            <dt>${this.localize('names:721')}</dt>
            <dd class="type">${this.localize('names:722')}</dd>
            <dd>${unsafeHTML(this.localize('names:723'))}</dd>
            <dt>${this.localize('names:724')}</dt>
            <dd class="type">${this.localize('names:725')}</dd>
            <dd>${unsafeHTML(this.localize('names:726'))}</dd>
            <dt>${this.localize('names:727')}</dt>
            <dd class="type">${this.localize('names:728')}</dd>
            <dd>${unsafeHTML(this.localize('names:729'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:730'))}</dd>
            <dt id="jata">${this.localize('names:731')}</dt>
            <dd>${unsafeHTML(this.localize('names:732'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:733'))}</dd>
            <dt>${this.localize('names:734')}</dt>
            <dd class="type">${this.localize('names:735')}</dd>
            <dd>${unsafeHTML(this.localize('names:736'))}</dd>
            <dt>${this.localize('names:737')}</dt>
            <dd class="type">${this.localize('names:738')}</dd>
            <dd>${unsafeHTML(this.localize('names:739'))}</dd>
            <dt>${this.localize('names:740')}</dt>
            <dd class="type">${this.localize('names:741')}</dd>
            <dd>${unsafeHTML(this.localize('names:742'))}</dd>
            <dt>${this.localize('names:743')}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:744'))}</dd>
            <dd>${unsafeHTML(this.localize('names:745'))}</dd>
            <dt>${this.localize('names:746')}</dt>
            <dd class="type">${this.localize('names:747')}</dd>
            <dd>${unsafeHTML(this.localize('names:748'))}</dd>
            <dt>${this.localize('names:749')}</dt>
            <dd class="type">${this.localize('names:750')}</dd>
            <dd>${unsafeHTML(this.localize('names:751'))}</dd>
            <dt>${this.localize('names:752')}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:753'))}</dd>
            <dd>${unsafeHTML(this.localize('names:754'))}</dd>
            <dt>${this.localize('names:755')}</dt>
            <dd class="type">${this.localize('names:756')}</dd>
            <dd>${unsafeHTML(this.localize('names:757'))}</dd>
            <dt>${this.localize('names:758')}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:759'))}</dd>
            <dd>${unsafeHTML(this.localize('names:760'))}</dd>
            <dt>${this.localize('names:761')}</dt>
            <dd>${unsafeHTML(this.localize('names:762'))}</dd>
            <dt>${this.localize('names:763')}</dt>
            <dd class="type">${this.localize('names:764')}</dd>
            <dd>${unsafeHTML(this.localize('names:765'))}</dd>
            <dt>${this.localize('names:766')}</dt>
            <dd class="type">${this.localize('names:767')}</dd>
            <dd>${unsafeHTML(this.localize('names:768'))}</dd>
          </dl>
          <h2 id="k">${this.localize('names:769')}</h2>
          <dl>
            <dt>${this.localize('names:770')}</dt>
            <dd class="type">${this.localize('names:771')}</dd>
            <dd>${unsafeHTML(this.localize('names:772'))}</dd>
            <dt>${this.localize('names:773')}</dt>
            <dd class="type">${this.localize('names:774')}</dd>
            <dd>${unsafeHTML(this.localize('names:775'))}</dd>
            <dt>${this.localize('names:776')}</dt>
            <dd class="type">${this.localize('names:777')}</dd>
            <dd>${unsafeHTML(this.localize('names:778'))}</dd>
            <dt>${this.localize('names:779')}</dt>
            <dd>${unsafeHTML(this.localize('names:780'))}</dd>
            <dt>${this.localize('names:781')}</dt>
            <dd class="type">${this.localize('names:782')}</dd>
            <dd>${unsafeHTML(this.localize('names:783'))}</dd>
            <dt>${this.localize('names:784')}</dt>
            <dd class="type">${this.localize('names:785')}</dd>
            <dd>${unsafeHTML(this.localize('names:786'))}</dd>
            <dt>${this.localize('names:787')}</dt>
            <dd class="type">${this.localize('names:788')}</dd>
            <dd>${unsafeHTML(this.localize('names:789'))}</dd>
            <dt>${this.localize('names:790')}</dt>
            <dd class="type">${this.localize('names:791')}</dd>
            <dd>${unsafeHTML(this.localize('names:792'))}</dd>
            <dt>${this.localize('names:793')}</dt>
            <dd class="type">${this.localize('names:794')}</dd>
            <dd>${unsafeHTML(this.localize('names:795'))}</dd>
            <dt>${this.localize('names:796')}</dt>
            <dd class="type">${this.localize('names:797')}</dd>
            <dd>${unsafeHTML(this.localize('names:798'))}</dd>
            <dt>${this.localize('names:799')}</dt>
            <dd class="type">${this.localize('names:800')}</dd>
            <dd>${unsafeHTML(this.localize('names:801'))}</dd>
            <dt>${this.localize('names:802')}</dt>
            <dd>${unsafeHTML(this.localize('names:803'))}</dd>
            <dt>${this.localize('names:804')}</dt>
            <dd class="type">${this.localize('names:805')}</dd>
            <dd>${unsafeHTML(this.localize('names:806'))}</dd>
            <dt>${this.localize('names:807')}</dt>
            <dd class="type">${this.localize('names:808')}</dd>
            <dd>${unsafeHTML(this.localize('names:809'))}</dd>
            <dt>${this.localize('names:810')}</dt>
            <dd class="type">${this.localize('names:811')}</dd>
            <dd>${unsafeHTML(this.localize('names:812'))}</dd>
            <dt>${this.localize('names:813')}</dt>
            <dd class="type">${this.localize('names:814')}</dd>
            <dd>${unsafeHTML(this.localize('names:815'))}</dd>
            <dt>${this.localize('names:816')}</dt>
            <dd class="type">${this.localize('names:817')}</dd>
            <dd>${unsafeHTML(this.localize('names:818'))}</dd>
            <dt>${this.localize('names:819')}</dt>
            <dd class="type">${this.localize('names:820')}</dd>
            <dd>${unsafeHTML(this.localize('names:821'))}</dd>
            <dt>${this.localize('names:822')}</dt>
            <dd class="type">${this.localize('names:823')}</dd>
            <dd>${unsafeHTML(this.localize('names:824'))}</dd>
            <dt>${this.localize('names:825')}</dt>
            <dd class="type">${this.localize('names:826')}</dd>
            <dd>${unsafeHTML(this.localize('names:827'))}</dd>
            <dt>${this.localize('names:828')}</dt>
            <dd class="type">${this.localize('names:829')}</dd>
            <dd>${unsafeHTML(this.localize('names:830'))}</dd>
            <dt>${unsafeHTML(this.localize('names:831'))}</dt>
            <dd class="type">${this.localize('names:832')}</dd>
            <dd>${unsafeHTML(this.localize('names:833'))}</dd>
            <dt>${this.localize('names:834')}</dt>
            <dd class="type">${this.localize('names:835')}</dd>
            <dd>${unsafeHTML(this.localize('names:836'))}</dd>
            <dt>${this.localize('names:837')}</dt>
            <dd class="type">${this.localize('names:838')}</dd>
            <dd>${unsafeHTML(this.localize('names:839'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:840'))}</dd>
            <dt>${this.localize('names:841')}</dt>
            <dd class="type">${this.localize('names:842')}</dd>
            <dd>${unsafeHTML(this.localize('names:843'))}</dd>
            <dt>${this.localize('names:844')}</dt>
            <dd class="type">${this.localize('names:845')}</dd>
            <dd>${unsafeHTML(this.localize('names:846'))}</dd>
            <dt>${this.localize('names:847')}</dt>
            <dd class="type">${this.localize('names:848')}</dd>
            <dd>${unsafeHTML(this.localize('names:849'))}</dd>
            <dt>${this.localize('names:850')}</dt>
            <dd class="type">${this.localize('names:851')}</dd>
            <dd>${unsafeHTML(this.localize('names:852'))}</dd>
            <dt>${this.localize('names:853')}</dt>
            <dd class="type">${this.localize('names:854')}</dd>
            <dd>${unsafeHTML(this.localize('names:855'))}</dd>
            <dt>${this.localize('names:856')}</dt>
            <dd class="type">${this.localize('names:857')}</dd>
            <dd>${unsafeHTML(this.localize('names:858'))}</dd>
            <dt>${this.localize('names:859')}</dt>
            <dd class="type">${this.localize('names:860')}</dd>
            <dd>${unsafeHTML(this.localize('names:861'))}</dd>
            <dt id="kasi">${this.localize('names:862')}</dt>
            <dd class="type">${this.localize('names:863')}</dd>
            <dd>${unsafeHTML(this.localize('names:864'))}</dd>
            <dt id="kasibharadvaja">${this.localize('names:865')}</dt>
            <dd class="type">${this.localize('names:866')}</dd>
            <dd>${unsafeHTML(this.localize('names:867'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:868'))}</dd>
            <dt>${this.localize('names:869')}</dt>
            <dd class="type">${this.localize('names:870')}</dd>
            <dd>${unsafeHTML(this.localize('names:871'))}</dd>
            <dt>${this.localize('names:872')}</dt>
            <dd class="type">${this.localize('names:873')}</dd>
            <dd>${unsafeHTML(this.localize('names:874'))}</dd>
            <dt>${unsafeHTML(this.localize('names:875'))}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:876'))}</dd>
            <dd>${unsafeHTML(this.localize('names:877'))}</dd>
            <dt>${this.localize('names:878')}</dt>
            <dd class="type">${this.localize('names:879')}</dd>
            <dd>${unsafeHTML(this.localize('names:880'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:881'))}</dd>
            <dt>${this.localize('names:882')}</dt>
            <dd>${unsafeHTML(this.localize('names:883'))}</dd>
            <dt>${this.localize('names:884')}</dt>
            <dd class="type">${this.localize('names:885')}</dd>
            <dd>${unsafeHTML(this.localize('names:886'))}</dd>
            <dt>${this.localize('names:887')}</dt>
            <dd class="type">${this.localize('names:888')}</dd>
            <dd>${unsafeHTML(this.localize('names:889'))}</dd>
            <dt>${this.localize('names:890')}</dt>
            <dd class="type">${this.localize('names:891')}</dd>
            <dd>${unsafeHTML(this.localize('names:892'))}</dd>
            <dt>${this.localize('names:893')}</dt>
            <dd class="type">${this.localize('names:894')}</dd>
            <dd>${unsafeHTML(this.localize('names:895'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:896'))}</dd>
            <dt>${this.localize('names:897')}</dt>
            <dd class="type">${this.localize('names:898')}</dd>
            <dd>${unsafeHTML(this.localize('names:899'))}</dd>
            <dt>${this.localize('names:900')}</dt>
            <dd class="type">${this.localize('names:901')}</dd>
            <dd>${unsafeHTML(this.localize('names:902'))}</dd>
            <dt>${this.localize('names:903')}</dt>
            <dd class="type">${this.localize('names:904')}</dd>
            <dd>${unsafeHTML(this.localize('names:905'))}</dd>
            <dt>${this.localize('names:906')}</dt>
            <dd class="type">${this.localize('names:907')}</dd>
            <dd>${unsafeHTML(this.localize('names:908'))}</dd>
            <dt>${this.localize('names:909')}</dt>
            <dd class="type">${this.localize('names:910')}</dd>
            <dd>${unsafeHTML(this.localize('names:911'))}</dd>
            <dt>${this.localize('names:912')}</dt>
            <dd class="type">${this.localize('names:913')}</dd>
            <dd>${unsafeHTML(this.localize('names:914'))}</dd>
            <dt>${this.localize('names:915')}</dt>
            <dd class="type">${this.localize('names:916')}</dd>
            <dd>${unsafeHTML(this.localize('names:917'))}</dd>
            <dt>${this.localize('names:918')}</dt>
            <dd class="type">${this.localize('names:919')}</dd>
            <dd>${unsafeHTML(this.localize('names:920'))}</dd>
            <dt>${this.localize('names:921')}</dt>
            <dd class="type">${this.localize('names:922')}</dd>
            <dd>${unsafeHTML(this.localize('names:923'))}</dd>
            <dt>${this.localize('names:924')}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:925'))}</dd>
            <dt>${this.localize('names:926')}</dt>
            <dd class="type">${this.localize('names:927')}</dd>
            <dd>${unsafeHTML(this.localize('names:928'))}</dd>
            <dt>${this.localize('names:929')}</dt>
            <dd class="type">${this.localize('names:930')}</dd>
            <dd>${unsafeHTML(this.localize('names:931'))}</dd>
            <dt>${this.localize('names:932')}</dt>
            <dd class="type">${this.localize('names:933')}</dd>
            <dd>${unsafeHTML(this.localize('names:934'))}</dd>
            <dt>${this.localize('names:935')}</dt>
            <dd class="type">${this.localize('names:936')}</dd>
            <dd>${unsafeHTML(this.localize('names:937'))}</dd>
            <dt>${this.localize('names:938')}</dt>
            <dd class="type">${this.localize('names:939')}</dd>
            <dd>${unsafeHTML(this.localize('names:940'))}</dd>
            <dt>${this.localize('names:941')}</dt>
            <dd class="type">${this.localize('names:942')}</dd>
            <dd>${unsafeHTML(this.localize('names:943'))}</dd>
            <dt>${this.localize('names:944')}</dt>
            <dd class="type">${this.localize('names:945')}</dd>
            <dd>${unsafeHTML(this.localize('names:946'))}</dd>
            <dt>${this.localize('names:947')}</dt>
            <dd class="type">${this.localize('names:948')}</dd>
            <dd>${unsafeHTML(this.localize('names:949'))}</dd>
            <dt>${this.localize('names:950')}</dt>
            <dd class="type">${this.localize('names:951')}</dd>
            <dd>${unsafeHTML(this.localize('names:952'))}</dd>
            <dt>${this.localize('names:953')}</dt>
            <dd>${unsafeHTML(this.localize('names:954'))}</dd>
            <dt>${this.localize('names:955')}</dt>
            <dd class="type">${this.localize('names:956')}</dd>
            <dd>${unsafeHTML(this.localize('names:957'))}</dd>
            <dt>${this.localize('names:958')}</dt>
            <dd class="type">${this.localize('names:959')}</dd>
            <dd>${unsafeHTML(this.localize('names:960'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:961'))}</dd>
            <dt>${this.localize('names:962')}</dt>
            <dd class="type">${this.localize('names:963')}</dd>
            <dd>${unsafeHTML(this.localize('names:964'))}</dd>
            <dt>${this.localize('names:965')}</dt>
            <dd class="type">${this.localize('names:966')}</dd>
            <dd>${unsafeHTML(this.localize('names:967'))}</dd>
            <dt id="kosala">${this.localize('names:968')}</dt>
            <dd class="type">${this.localize('names:969')}</dd>
            <dd>${unsafeHTML(this.localize('names:970'))}</dd>
            <dt id="kosambi">${this.localize('names:971')}</dt>
            <dd>${unsafeHTML(this.localize('names:972'))}</dd>
            <dt>${this.localize('names:973')}</dt>
            <dd class="type">${this.localize('names:974')}</dd>
            <dd>${unsafeHTML(this.localize('names:975'))}</dd>
            <dt>${this.localize('names:976')}</dt>
            <dd class="type">${this.localize('names:977')}</dd>
            <dd>${unsafeHTML(this.localize('names:978'))}</dd>
            <dt>${this.localize('names:979')}</dt>
            <dd class="type">${this.localize('names:980')}</dd>
            <dd>${unsafeHTML(this.localize('names:981'))}</dd>
            <dt>${this.localize('names:982')}</dt>
            <dd class="type">${this.localize('names:983')}</dd>
            <dd>${unsafeHTML(this.localize('names:984'))}</dd>
            <dt>${this.localize('names:985')}</dt>
            <dd class="type">${this.localize('names:986')}</dd>
            <dd>${unsafeHTML(this.localize('names:987'))}</dd>
            <dt id="kusavati">${this.localize('names:988')}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:989'))}</dd>
            <dd>${unsafeHTML(this.localize('names:990'))}</dd>
            <dt id="kusinara">${this.localize('names:991')}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:992'))}</dd>
            <dd>${unsafeHTML(this.localize('names:993'))}</dd>
            <dt>${this.localize('names:994')}</dt>
            <dd class="type">${this.localize('names:995')}</dd>
            <dd>${unsafeHTML(this.localize('names:996'))}</dd>
            <dt>${this.localize('names:997')}</dt>
            <dd class="type">${this.localize('names:998')}</dd>
            <dd>${unsafeHTML(this.localize('names:999'))}</dd>
            <dt>${this.localize('names:1000')}</dt>
            <dd class="type">${this.localize('names:1001')}</dd>
            <dd>${unsafeHTML(this.localize('names:1002'))}</dd>
          </dl>
          <h2 id="l">${this.localize('names:1003')}</h2>
          <dl>
            <dt>${this.localize('names:1004')}</dt>
            <dd class="type">${this.localize('names:1005')}</dd>
            <dd>${unsafeHTML(this.localize('names:1006'))}</dd>
            <dt>${this.localize('names:1007')}</dt>
            <dd class="type">${this.localize('names:1008')}</dd>
            <dd>${unsafeHTML(this.localize('names:1009'))}</dd>
            <dt id="licchavi">${this.localize('names:1010')}</dt>
            <dd class="type">${this.localize('names:1011')}</dd>
            <dd>${unsafeHTML(this.localize('names:1012'))}</dd>
            <dt>${this.localize('names:1013')}</dt>
            <dd class="type">${this.localize('names:1014')}</dd>
            <dd>${unsafeHTML(this.localize('names:1015'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:1016'))}</dd>
            <dt>${this.localize('names:1017')}</dt>
            <dd class="type">${this.localize('names:1018')}</dd>
            <dd>${unsafeHTML(this.localize('names:1019'))}</dd>
            <dt>${this.localize('names:1020')}</dt>
            <dd class="type">${this.localize('names:1021')}</dd>
            <dd>${unsafeHTML(this.localize('names:1022'))}</dd>
          </dl>
          <h2 id="m">${this.localize('names:1023')}</h2>
          <dl>
            <dt>${this.localize('names:1024')}</dt>
            <dd class="type">${this.localize('names:1025')}</dd>
            <dd>${unsafeHTML(this.localize('names:1026'))}</dd>
            <dt>${this.localize('names:1027')}</dt>
            <dd class="type">${this.localize('names:1028')}</dd>
            <dd>${unsafeHTML(this.localize('names:1029'))}</dd>
            <dt>${this.localize('names:1030')}</dt>
            <dd class="type">${this.localize('names:1031')}</dd>
            <dd>${unsafeHTML(this.localize('names:1032'))}</dd>
            <dt id="magadha">${this.localize('names:1033')}</dt>
            <dd class="type">${this.localize('names:1034')}</dd>
            <dd>${unsafeHTML(this.localize('names:1035'))}</dd>
            <dt>${this.localize('names:1036')}</dt>
            <dd class="type">${this.localize('names:1037')}</dd>
            <dd>${unsafeHTML(this.localize('names:1038'))}</dd>
            <dt>${this.localize('names:1039')}</dt>
            <dd class="type">${this.localize('names:1040')}</dd>
            <dd>${unsafeHTML(this.localize('names:1041'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:1042'))}</dd>
            <dt>${this.localize('names:1043')}</dt>
            <dd class="type">${this.localize('names:1044')}</dd>
            <dd>${unsafeHTML(this.localize('names:1045'))}</dd>
            <dt>${this.localize('names:1046')}</dt>
            <dd class="type">${this.localize('names:1047')}</dd>
            <dd>${unsafeHTML(this.localize('names:1048'))}</dd>
            <dt>${this.localize('names:1049')}</dt>
            <dd>${unsafeHTML(this.localize('names:1050'))}</dd>
            <dt>${this.localize('names:1051')}</dt>
            <dd class="type">${this.localize('names:1052')}</dd>
            <dd>${unsafeHTML(this.localize('names:1053'))}</dd>
            <dt>${this.localize('names:1054')}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:1055'))}</dd>
            <dd>${unsafeHTML(this.localize('names:1056'))}</dd>
            <dt>${this.localize('names:1057')}</dt>
            <dd class="type">${this.localize('names:1058')}</dd>
            <dd>${unsafeHTML(this.localize('names:1059'))}</dd>
            <dt>${this.localize('names:1060')}</dt>
            <dd class="type">${this.localize('names:1061')}</dd>
            <dd>${unsafeHTML(this.localize('names:1062'))}</dd>
            <dt>${this.localize('names:1063')}</dt>
            <dd class="type">${this.localize('names:1064')}</dd>
            <dd>${unsafeHTML(this.localize('names:1065'))}</dd>
            <dt>${this.localize('names:1066')}</dt>
            <dd class="type">${this.localize('names:1067')}</dd>
            <dd>${unsafeHTML(this.localize('names:1068'))}</dd>
            <dt>${this.localize('names:1069')}</dt>
            <dd>${unsafeHTML(this.localize('names:1070'))}</dd>
            <dt>${this.localize('names:1071')}</dt>
            <dd class="type">${this.localize('names:1072')}</dd>
            <dd>${unsafeHTML(this.localize('names:1073'))}</dd>
            <dt>${this.localize('names:1074')}</dt>
            <dd class="type">${this.localize('names:1075')}</dd>
            <dd>${unsafeHTML(this.localize('names:1076'))}</dd>
            <dt>${this.localize('names:1077')}</dt>
            <dd class="type">${this.localize('names:1078')}</dd>
            <dd>${unsafeHTML(this.localize('names:1079'))}</dd>
            <dt>${this.localize('names:1080')}</dt>
            <dd class="type">${this.localize('names:1081')}</dd>
            <dd>${unsafeHTML(this.localize('names:1082'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:1083'))}</dd>
            <dt>${this.localize('names:1084')}</dt>
            <dd class="type">${this.localize('names:1085')}</dd>
            <dd>${unsafeHTML(this.localize('names:1086'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:1087'))}</dd>
            <dt>${this.localize('names:1088')}</dt>
            <dd class="type">${this.localize('names:1089')}</dd>
            <dd>${unsafeHTML(this.localize('names:1090'))}</dd>
            <dt>${this.localize('names:1091')}</dt>
            <dd class="type">${this.localize('names:1092')}</dd>
            <dd>${unsafeHTML(this.localize('names:1093'))}</dd>
            <dt>${this.localize('names:1094')}</dt>
            <dd class="type">${this.localize('names:1095')}</dd>
            <dd>${unsafeHTML(this.localize('names:1096'))}</dd>
            <dt>${this.localize('names:1097')}</dt>
            <dd>${unsafeHTML(this.localize('names:1098'))}</dd>
            <dt>${this.localize('names:1099')}</dt>
            <dd class="type">${this.localize('names:1100')}</dd>
            <dd>${unsafeHTML(this.localize('names:1101'))}</dd>
            <dt>${this.localize('names:1102')}</dt>
            <dd class="type">${this.localize('names:1103')}</dd>
            <dd>${unsafeHTML(this.localize('names:1104'))}</dd>
            <dt>${this.localize('names:1105')}</dt>
            <dd class="type">${this.localize('names:1106')}</dd>
            <dd>${unsafeHTML(this.localize('names:1107'))}</dd>
            <dt id="mara">${this.localize('names:1108')}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:1109'))}</dd>
            <dd>${unsafeHTML(this.localize('names:1110'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:1111'))}</dd>
            <dt>${this.localize('names:1112')}</dt>
            <dd class="type">${this.localize('names:1113')}</dd>
            <dd>${unsafeHTML(this.localize('names:1114'))}</dd>
            <dt>${this.localize('names:1115')}</dt>
            <dd class="type">${this.localize('names:1116')}</dd>
            <dd>${unsafeHTML(this.localize('names:1117'))}</dd>
            <dt>${this.localize('names:1118')}</dt>
            <dd class="type">${this.localize('names:1119')}</dd>
            <dd>${unsafeHTML(this.localize('names:1120'))}</dd>
            <dt>${this.localize('names:1121')}</dt>
            <dd class="type">${this.localize('names:1122')}</dd>
            <dd>${unsafeHTML(this.localize('names:1123'))}</dd>
            <dt>${this.localize('names:1124')}</dt>
            <dd class="type">${this.localize('names:1125')}</dd>
            <dd>${unsafeHTML(this.localize('names:1126'))}</dd>
            <dt id="medakathalika">${this.localize('names:1127')}</dt>
            <dd class="type">${this.localize('names:1128')}</dd>
            <dd>${unsafeHTML(this.localize('names:1129'))}</dd>
            <dt>${this.localize('names:1130')}</dt>
            <dd class="type">${this.localize('names:1131')}</dd>
            <dd>${unsafeHTML(this.localize('names:1132'))}</dd>
            <dt>${this.localize('names:1133')}</dt>
            <dd class="type">${this.localize('names:1134')}</dd>
            <dd>${unsafeHTML(this.localize('names:1135'))}</dd>
            <dt>${this.localize('names:1136')}</dt>
            <dd class="type">${this.localize('names:1137')}</dd>
            <dd>${unsafeHTML(this.localize('names:1138'))}</dd>
            <dt>${this.localize('names:1139')}</dt>
            <dd class="type">${this.localize('names:1140')}</dd>
            <dd>${unsafeHTML(this.localize('names:1141'))}</dd>
            <dt>${this.localize('names:1142')}</dt>
            <dd class="type">${this.localize('names:1143')}</dd>
            <dd>${unsafeHTML(this.localize('names:1144'))}</dd>
            <dt>${this.localize('names:1145')}</dt>
            <dd class="type">${this.localize('names:1146')}</dd>
            <dd>${unsafeHTML(this.localize('names:1147'))}</dd>
            <dt>${this.localize('names:1148')}</dt>
            <dd class="type">${this.localize('names:1149')}</dd>
            <dd>${unsafeHTML(this.localize('names:1150'))}</dd>
            <dt id="migara">${this.localize('names:1151')}</dt>
            <dd>${unsafeHTML(this.localize('names:1152'))}</dd>
            <dt id="migaramom">${this.localize('names:1153')}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:1154'))}</dd>
            <dd>${unsafeHTML(this.localize('names:1155'))}</dd>
            <dt>${this.localize('names:1156')}</dt>
            <dd>${unsafeHTML(this.localize('names:1157'))}</dd>
            <dt>${this.localize('names:1158')}</dt>
            <dd class="type">${this.localize('names:1159')}</dd>
            <dd>${unsafeHTML(this.localize('names:1160'))}</dd>
            <dt>${this.localize('names:1161')}</dt>
            <dd class="type">${this.localize('names:1162')}</dd>
            <dd>${unsafeHTML(this.localize('names:1163'))}</dd>
            <dt id="moggallana">${this.localize('names:1164')}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:1165'))}</dd>
            <dd>${unsafeHTML(this.localize('names:1166'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:1167'))}</dd>
            <dt>${this.localize('names:1168')}</dt>
            <dd class="type">${this.localize('names:1169')}</dd>
            <dd>${unsafeHTML(this.localize('names:1170'))}</dd>
            <dt>${this.localize('names:1171')}</dt>
            <dd class="type">${this.localize('names:1172')}</dd>
            <dd>${unsafeHTML(this.localize('names:1173'))}</dd>
            <dt>${this.localize('names:1174')}</dt>
            <dd>${unsafeHTML(this.localize('names:1175'))}</dd>
            <dt>${this.localize('names:1176')}</dt>
            <dd class="type">${this.localize('names:1177')}</dd>
            <dd>${unsafeHTML(this.localize('names:1178'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:1179'))}</dd>
            <dt>${this.localize('names:1180')}</dt>
            <dd class="type">${this.localize('names:1181')}</dd>
            <dd>${unsafeHTML(this.localize('names:1182'))}</dd>
            <dt>${this.localize('names:1183')}</dt>
            <dd class="type">${this.localize('names:1184')}</dd>
            <dd>${unsafeHTML(this.localize('names:1185'))}</dd>
            <dt>${this.localize('names:1186')}</dt>
            <dd>${unsafeHTML(this.localize('names:1187'))}</dd>
            <dt>${this.localize('names:1188')}</dt>
            <dd class="type">${this.localize('names:1189')}</dd>
            <dd>${unsafeHTML(this.localize('names:1190'))}</dd>
            <dt>${this.localize('names:1191')}</dt>
            <dd class="type">${this.localize('names:1192')}</dd>
            <dd>${unsafeHTML(this.localize('names:1193'))}</dd>
          </dl>
          <h2 id="n">${this.localize('names:1194')}</h2>
          <dl>
            <dt>${this.localize('names:1195')}</dt>
            <dd class="type">${this.localize('names:1196')}</dd>
            <dd>${unsafeHTML(this.localize('names:1197'))}</dd>
            <dt>${this.localize('names:1198')}</dt>
            <dd class="type">${this.localize('names:1199')}</dd>
            <dd>${unsafeHTML(this.localize('names:1200'))}</dd>
            <dt>${this.localize('names:1201')}</dt>
            <dd class="type">${this.localize('names:1202')}</dd>
            <dd>${unsafeHTML(this.localize('names:1203'))}</dd>
            <dt>${this.localize('names:1204')}</dt>
            <dd class="type">${this.localize('names:1205')}</dd>
            <dd>${unsafeHTML(this.localize('names:1206'))}</dd>
            <dt>${this.localize('names:1207')}</dt>
            <dd class="type">${this.localize('names:1208')}</dd>
            <dd>${unsafeHTML(this.localize('names:1209'))}</dd>
            <dt>${this.localize('names:1210')}</dt>
            <dd class="type">${this.localize('names:1211')}</dd>
            <dd>${unsafeHTML(this.localize('names:1212'))}</dd>
            <dt>${this.localize('names:1213')}</dt>
            <dd class="type">${this.localize('names:1214')}</dd>
            <dd>${unsafeHTML(this.localize('names:1215'))}</dd>
            <dt>${this.localize('names:1216')}</dt>
            <dd class="type">${this.localize('names:1217')}</dd>
            <dd>${unsafeHTML(this.localize('names:1218'))}</dd>
            <dt>${this.localize('names:1219')}</dt>
            <dd>${unsafeHTML(this.localize('names:1220'))}</dd>
            <dt>${this.localize('names:1221')}</dt>
            <dd class="type">${this.localize('names:1222')}</dd>
            <dd>${unsafeHTML(this.localize('names:1223'))}</dd>
            <dt>${this.localize('names:1224')}</dt>
            <dd class="type">${this.localize('names:1225')}</dd>
            <dd>${unsafeHTML(this.localize('names:1226'))}</dd>
            <dt>${this.localize('names:1227')}</dt>
            <dd class="type">${this.localize('names:1228')}</dd>
            <dd>${unsafeHTML(this.localize('names:1229'))}</dd>
            <dt id="namuci">${this.localize('names:1230')}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:1231'))}</dd>
            <dd>${unsafeHTML(this.localize('names:1232'))}</dd>
            <dt>${this.localize('names:1233')}</dt>
            <dd class="type">${this.localize('names:1234')}</dd>
            <dd>${unsafeHTML(this.localize('names:1235'))}</dd>
            <dt>${this.localize('names:1236')}</dt>
            <dd class="type">${this.localize('names:1237')}</dd>
            <dd>${unsafeHTML(this.localize('names:1238'))}</dd>
            <dt>${this.localize('names:1239')}</dt>
            <dd class="type">${this.localize('names:1240')}</dd>
            <dd>${unsafeHTML(this.localize('names:1241'))}</dd>
            <dt>${this.localize('names:1242')}</dt>
            <dd class="type">${this.localize('names:1243')}</dd>
            <dd>${unsafeHTML(this.localize('names:1244'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:1245'))}</dd>
            <dt>${this.localize('names:1246')}</dt>
            <dd class="type">${this.localize('names:1247')}</dd>
            <dd>${unsafeHTML(this.localize('names:1248'))}</dd>
            <dt>${this.localize('names:1249')}</dt>
            <dd class="type">${this.localize('names:1250')}</dd>
            <dd>${unsafeHTML(this.localize('names:1251'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:1252'))}</dd>
            <dt>${this.localize('names:1253')}</dt>
            <dd class="type">${this.localize('names:1254')}</dd>
            <dd>${unsafeHTML(this.localize('names:1255'))}</dd>
            <dt>${this.localize('names:1256')}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:1257'))}</dd>
            <dd>${unsafeHTML(this.localize('names:1258'))}</dd>
            <dt>${this.localize('names:1259')}</dt>
            <dd class="type">${this.localize('names:1260')}</dd>
            <dd>${unsafeHTML(this.localize('names:1261'))}</dd>
            <dt>${this.localize('names:1262')}</dt>
            <dd class="type">${this.localize('names:1263')}</dd>
            <dd>${unsafeHTML(this.localize('names:1264'))}</dd>
            <dt>${this.localize('names:1265')}</dt>
            <dd class="type">${this.localize('names:1266')}</dd>
            <dd>${unsafeHTML(this.localize('names:1267'))}</dd>
            <dt>${this.localize('names:1268')}</dt>
            <dd class="type">${this.localize('names:1269')}</dd>
            <dd>${unsafeHTML(this.localize('names:1270'))}</dd>
            <dt>${this.localize('names:1271')}</dt>
            <dd>${unsafeHTML(this.localize('names:1272'))}</dd>
            <dt>${this.localize('names:1273')}</dt>
            <dd class="type">${this.localize('names:1274')}</dd>
            <dd>${unsafeHTML(this.localize('names:1275'))}</dd>
            <dt id="navak">${this.localize('names:1276')}</dt>
            <dd class="type">${this.localize('names:1277')}</dd>
            <dd>${unsafeHTML(this.localize('names:1278'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:1279'))}</dd>
            <dt>${this.localize('names:1280')}</dt>
            <dd class="type">${this.localize('names:1281')}</dd>
            <dd>${unsafeHTML(this.localize('names:1282'))}</dd>
            <dt>${this.localize('names:1283')}</dt>
            <dd class="type">${this.localize('names:1284')}</dd>
            <dd>${unsafeHTML(this.localize('names:1285'))}</dd>
            <dt>${this.localize('names:1286')}</dt>
            <dd class="type">${this.localize('names:1287')}</dd>
            <dd>${unsafeHTML(this.localize('names:1288'))}</dd>
            <dt>${this.localize('names:1289')}</dt>
            <dd class="type">${this.localize('names:1290')}</dd>
            <dd>${unsafeHTML(this.localize('names:1291'))}</dd>
            <dt>${this.localize('names:1292')}</dt>
            <dd class="type">${this.localize('names:1293')}</dd>
            <dd>${unsafeHTML(this.localize('names:1294'))}</dd>
            <dt>${this.localize('names:1295')}</dt>
            <dd class="type">${this.localize('names:1296')}</dd>
            <dd>${unsafeHTML(this.localize('names:1297'))}</dd>
            <dt>${this.localize('names:1298')}</dt>
            <dd class="type">${this.localize('names:1299')}</dd>
            <dd>${unsafeHTML(this.localize('names:1300'))}</dd>
            <dt id="nataputta">${this.localize('names:1301')}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:1302'))}</dd>
            <dd>${unsafeHTML(this.localize('names:1303'))}</dd>
            <dt id="nigantha">${this.localize('names:1304')}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:1305'))}</dd>
            <dd>${unsafeHTML(this.localize('names:1306'))}</dd>
            <dt>${this.localize('names:1307')}</dt>
            <dd class="type">${this.localize('names:1308')}</dd>
            <dd>${unsafeHTML(this.localize('names:1309'))}</dd>
            <dt>${this.localize('names:1310')}</dt>
            <dd class="type">${this.localize('names:1311')}</dd>
            <dd>${unsafeHTML(this.localize('names:1312'))}</dd>
            <dt>${this.localize('names:1313')}</dt>
            <dd>${unsafeHTML(this.localize('names:1314'))}</dd>
            <dt>${this.localize('names:1315')}</dt>
            <dd>${unsafeHTML(this.localize('names:1316'))}</dd>
            <dt>${this.localize('names:1317')}</dt>
            <dd class="type">${this.localize('names:1318')}</dd>
            <dd>${unsafeHTML(this.localize('names:1319'))}</dd>
            <dt>${this.localize('names:1320')}</dt>
            <dd class="type">${this.localize('names:1321')}</dd>
            <dd>${unsafeHTML(this.localize('names:1322'))}</dd>
            <dt>${this.localize('names:1323')}</dt>
            <dd class="type">${this.localize('names:1324')}</dd>
            <dd>${unsafeHTML(this.localize('names:1325'))}</dd>
            <dt>${this.localize('names:1326')}</dt>
            <dd class="type">${this.localize('names:1327')}</dd>
            <dd>${unsafeHTML(this.localize('names:1328'))}</dd>
          </dl>
          <h2 id="o">${this.localize('names:1329')}</h2>
          <dl>
            <dt>${this.localize('names:1330')}</dt>
            <dd class="type">${this.localize('names:1331')}</dd>
            <dd>${unsafeHTML(this.localize('names:1332'))}</dd>
            <dt>${this.localize('names:1333')}</dt>
            <dd class="type">${this.localize('names:1334')}</dd>
            <dd>${unsafeHTML(this.localize('names:1335'))}</dd>
            <dt>${this.localize('names:1336')}</dt>
            <dd class="type">${this.localize('names:1337')}</dd>
            <dd>${unsafeHTML(this.localize('names:1338'))}</dd>
          </dl>
          <h2 id="pq">${this.localize('names:1339')}</h2>
          <dl>
            <dt>${this.localize('names:1340')}</dt>
            <dd class="type">${this.localize('names:1341')}</dd>
            <dd>${unsafeHTML(this.localize('names:1342'))}</dd>
            <dt>${this.localize('names:1343')}</dt>
            <dd class="type">${this.localize('names:1344')}</dd>
            <dd>${unsafeHTML(this.localize('names:1345'))}</dd>
            <dt>${this.localize('names:1346')}</dt>
            <dd class="type">${this.localize('names:1347')}</dd>
            <dd>${unsafeHTML(this.localize('names:1348'))}</dd>
            <dt>${this.localize('names:1349')}</dt>
            <dd class="type">${this.localize('names:1350')}</dd>
            <dd>${unsafeHTML(this.localize('names:1351'))}</dd>
            <dt>${this.localize('names:1352')}</dt>
            <dd class="type">${this.localize('names:1353')}</dd>
            <dd>${unsafeHTML(this.localize('names:1354'))}</dd>
            <dt>${this.localize('names:1355')}</dt>
            <dd class="type">${this.localize('names:1356')}</dd>
            <dd>${unsafeHTML(this.localize('names:1357'))}</dd>
            <dt>${this.localize('names:1358')}</dt>
            <dd class="type">${this.localize('names:1359')}</dd>
            <dd>${unsafeHTML(this.localize('names:1360'))}</dd>
            <dt>${this.localize('names:1361')}</dt>
            <dd class="type">${this.localize('names:1362')}</dd>
            <dd>${unsafeHTML(this.localize('names:1363'))}</dd>
            <dt>${this.localize('names:1364')}</dt>
            <dd class="type">${this.localize('names:1365')}</dd>
            <dd>${unsafeHTML(this.localize('names:1366'))}</dd>
            <dt>${this.localize('names:1367')}</dt>
            <dd class="type">${this.localize('names:1368')}</dd>
            <dd>${unsafeHTML(this.localize('names:1369'))}</dd>
            <dt>${this.localize('names:1370')}</dt>
            <dd class="type">${this.localize('names:1371')}</dd>
            <dd>${unsafeHTML(this.localize('names:1372'))}</dd>
            <dt>${this.localize('names:1373')}</dt>
            <dd class="type">${this.localize('names:1374')}</dd>
            <dd>${unsafeHTML(this.localize('names:1375'))}</dd>
            <dt>${this.localize('names:1376')}</dt>
            <dd class="type">${this.localize('names:1377')}</dd>
            <dd>${unsafeHTML(this.localize('names:1378'))}</dd>
            <dt>${this.localize('names:1379')}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:1380'))}</dd>
            <dd>${unsafeHTML(this.localize('names:1381'))}</dd>
            <dt>${this.localize('names:1382')}</dt>
            <dd class="type">${this.localize('names:1383')}</dd>
            <dd>${unsafeHTML(this.localize('names:1384'))}</dd>
            <dt>${this.localize('names:1385')}</dt>
            <dd class="type">${this.localize('names:1386')}</dd>
            <dd>${unsafeHTML(this.localize('names:1387'))}</dd>
            <dt>${this.localize('names:1388')}</dt>
            <dd class="type">${this.localize('names:1389')}</dd>
            <dd>${unsafeHTML(this.localize('names:1390'))}</dd>
            <dt>${this.localize('names:1391')}</dt>
            <dd class="type">${this.localize('names:1392')}</dd>
            <dd>${unsafeHTML(this.localize('names:1393'))}</dd>
            <dt>${this.localize('names:1394')}</dt>
            <dd class="type">${this.localize('names:1395')}</dd>
            <dd>${unsafeHTML(this.localize('names:1396'))}</dd>
            <dt>${this.localize('names:1397')}</dt>
            <dd class="type">${this.localize('names:1398')}</dd>
            <dd>${unsafeHTML(this.localize('names:1399'))}</dd>
            <dt>${this.localize('names:1400')}</dt>
            <dd class="type">${this.localize('names:1401')}</dd>
            <dd>${unsafeHTML(this.localize('names:1402'))}</dd>
            <dt>${this.localize('names:1403')}</dt>
            <dd class="type">${this.localize('names:1404')}</dd>
            <dd>${unsafeHTML(this.localize('names:1405'))}</dd>
            <dt id="parasiri">${this.localize('names:1406')}</dt>
            <dd class="type">${this.localize('names:1407')}</dd>
            <dd>${unsafeHTML(this.localize('names:1408'))}</dd>
            <dt id="pari">${this.localize('names:1409')}</dt>
            <dd class="type">${this.localize('names:1410')}</dd>
            <dd>${unsafeHTML(this.localize('names:1411'))}</dd>
            <dt id="pasenadi">${this.localize('names:1412')}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:1413'))}</dd>
            <dd>${unsafeHTML(this.localize('names:1414'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:1415'))}</dd>
            <dt>${this.localize('names:1416')}</dt>
            <dd class="type">${this.localize('names:1417')}</dd>
            <dd>${unsafeHTML(this.localize('names:1418'))}</dd>
            <dt>${this.localize('names:1419')}</dt>
            <dd>${unsafeHTML(this.localize('names:1420'))}</dd>
            <dt>${this.localize('names:1421')}</dt>
            <dd class="type">${this.localize('names:1422')}</dd>
            <dd>${unsafeHTML(this.localize('names:1423'))}</dd>
            <dt>${this.localize('names:1424')}</dt>
            <dd class="type">${this.localize('names:1425')}</dd>
            <dd>${unsafeHTML(this.localize('names:1426'))}</dd>
            <dt>${this.localize('names:1427')}</dt>
            <dd class="type">${this.localize('names:1428')}</dd>
            <dd>${unsafeHTML(this.localize('names:1429'))}</dd>
            <dt>${this.localize('names:1430')}</dt>
            <dd class="type">${this.localize('names:1431')}</dd>
            <dd>${unsafeHTML(this.localize('names:1432'))}</dd>
            <dt>${this.localize('names:1433')}</dt>
            <dd class="type">${this.localize('names:1434')}</dd>
            <dd>${unsafeHTML(this.localize('names:1435'))}</dd>
            <dt>${this.localize('names:1436')}</dt>
            <dd>${unsafeHTML(this.localize('names:1437'))}</dd>
            <dt>${this.localize('names:1438')}</dt>
            <dd class="type">${this.localize('names:1439')}</dd>
            <dd>${unsafeHTML(this.localize('names:1440'))}</dd>
            <dt>${this.localize('names:1441')}</dt>
            <dd class="type">${this.localize('names:1442')}</dd>
            <dd>${unsafeHTML(this.localize('names:1443'))}</dd>
            <dt>${this.localize('names:1444')}</dt>
            <dd class="type">${this.localize('names:1445')}</dd>
            <dd>${unsafeHTML(this.localize('names:1446'))}</dd>
            <dt>${this.localize('names:1447')}</dt>
            <dd class="type">${this.localize('names:1448')}</dd>
            <dd>${unsafeHTML(this.localize('names:1449'))}</dd>
            <dd>${unsafeHTML(this.localize('names:1450'))}</dd>
            <dd>${unsafeHTML(this.localize('names:1451'))}</dd>
            <dt>${this.localize('names:1452')}</dt>
            <dd>${unsafeHTML(this.localize('names:1453'))}</dd>
            <dt>${this.localize('names:1454')}</dt>
            <dd class="type">${this.localize('names:1455')}</dd>
            <dd>${unsafeHTML(this.localize('names:1456'))}</dd>
            <dt>${this.localize('names:1457')}</dt>
            <dd class="type">${this.localize('names:1458')}</dd>
            <dd>${unsafeHTML(this.localize('names:1459'))}</dd>
            <dt id="pindola">${this.localize('names:1460')}</dt>
            <dd class="type">${this.localize('names:1461')}</dd>
            <dd>${unsafeHTML(this.localize('names:1462'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:1463'))}</dd>
            <dt>${this.localize('names:1464')}</dt>
            <dd class="type">${this.localize('names:1465')}</dd>
            <dd>${unsafeHTML(this.localize('names:1466'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:1467'))}</dd>
            <dt>${this.localize('names:1468')}</dt>
            <dd class="type">${this.localize('names:1469')}</dd>
            <dd>${unsafeHTML(this.localize('names:1470'))}</dd>
            <dt>${this.localize('names:1471')}</dt>
            <dd>${unsafeHTML(this.localize('names:1472'))}</dd>
            <dt>${this.localize('names:1473')}</dt>
            <dd class="type">${this.localize('names:1474')}</dd>
            <dd>${unsafeHTML(this.localize('names:1475'))}</dd>
            <dt>${this.localize('names:1476')}</dt>
            <dd class="type">${this.localize('names:1477')}</dd>
            <dd>${unsafeHTML(this.localize('names:1478'))}</dd>
            <dt>${this.localize('names:1479')}</dt>
            <dd class="type">${this.localize('names:1480')}</dd>
            <dd>${unsafeHTML(this.localize('names:1481'))}</dd>
            <dt>${this.localize('names:1482')}</dt>
            <dd>${unsafeHTML(this.localize('names:1483'))}</dd>
            <dt>${this.localize('names:1484')}</dt>
            <dd>${unsafeHTML(this.localize('names:1485'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:1486'))}</dd>
            <dt>${this.localize('names:1487')}</dt>
            <dd>${unsafeHTML(this.localize('names:1488'))}</dd>
            <dt>${this.localize('names:1489')}</dt>
            <dd class="type">${this.localize('names:1490')}</dd>
            <dd>${unsafeHTML(this.localize('names:1491'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:1492'))}</dd>
            <dt>${this.localize('names:1493')}</dt>
            <dd class="type">${this.localize('names:1494')}</dd>
            <dd>${unsafeHTML(this.localize('names:1495'))}</dd>
            <dt>${this.localize('names:1496')}</dt>
            <dd class="type">${this.localize('names:1497')}</dd>
            <dd>${unsafeHTML(this.localize('names:1498'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:1499'))}</dd>
            <dt>${this.localize('names:1500')}</dt>
            <dd class="type">${this.localize('names:1501')}</dd>
            <dd>${unsafeHTML(this.localize('names:1502'))}</dd>
            <dt>${this.localize('names:1503')}</dt>
            <dd class="type">${this.localize('names:1504')}</dd>
            <dd>${unsafeHTML(this.localize('names:1505'))}</dd>
            <dt>${this.localize('names:1506')}</dt>
            <dd class="type">${this.localize('names:1507')}</dd>
            <dd>${unsafeHTML(this.localize('names:1508'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:1509'))}</dd>
            <dt>${this.localize('names:1510')}</dt>
            <dd class="type">${this.localize('names:1511')}</dd>
            <dd>${unsafeHTML(this.localize('names:1512'))}</dd>
            <dt>${this.localize('names:1513')}</dt>
            <dd class="type">${this.localize('names:1514')}</dd>
            <dd>${unsafeHTML(this.localize('names:1515'))}</dd>
            <dt>${this.localize('names:1516')}</dt>
            <dd class="type">${this.localize('names:1517')}</dd>
            <dd>${unsafeHTML(this.localize('names:1518'))}</dd>
            <dt>${this.localize('names:1519')}</dt>
            <dd class="type">${this.localize('names:1520')}</dd>
            <dd>${unsafeHTML(this.localize('names:1521'))}</dd>
            <dt>${this.localize('names:1522')}</dt>
            <dd class="type">${this.localize('names:1523')}</dd>
            <dd>${unsafeHTML(this.localize('names:1524'))}</dd>
          </dl>
          <h2 id="r">${this.localize('names:1525')}</h2>
          <dl>
            <dt>${this.localize('names:1526')}</dt>
            <dd class="type">${this.localize('names:1527')}</dd>
            <dd>${unsafeHTML(this.localize('names:1528'))}</dd>
            <dt>${this.localize('names:1529')}</dt>
            <dd class="type">${this.localize('names:1530')}</dd>
            <dd>${unsafeHTML(this.localize('names:1531'))}</dd>
            <dt>${this.localize('names:1532')}</dt>
            <dd class="type">${this.localize('names:1533')}</dd>
            <dd>${unsafeHTML(this.localize('names:1534'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:1535'))}</dd>
            <dt>${this.localize('names:1536')}</dt>
            <dd class="type">${this.localize('names:1537')}</dd>
            <dd>${unsafeHTML(this.localize('names:1538'))}</dd>
            <dt>${this.localize('names:1539')}</dt>
            <dd class="type">${this.localize('names:1540')}</dd>
            <dd>${unsafeHTML(this.localize('names:1541'))}</dd>
            <dt>${this.localize('names:1542')}</dt>
            <dd class="type">${this.localize('names:1543')}</dd>
            <dd>${unsafeHTML(this.localize('names:1544'))}</dd>
            <dt>${this.localize('names:1545')}</dt>
            <dd class="type">${this.localize('names:1546')}</dd>
            <dd>${unsafeHTML(this.localize('names:1547'))}</dd>
            <dt>${this.localize('names:1548')}</dt>
            <dd class="type">${this.localize('names:1549')}</dd>
            <dd>${unsafeHTML(this.localize('names:1550'))}</dd>
            <dt>${this.localize('names:1551')}</dt>
            <dd class="type">${this.localize('names:1552')}</dd>
            <dd>${unsafeHTML(this.localize('names:1553'))}</dd>
            <dt>${this.localize('names:1554')}</dt>
            <dd class="type">${this.localize('names:1555')}</dd>
            <dd>${unsafeHTML(this.localize('names:1556'))}</dd>
            <dt>${this.localize('names:1557')}</dt>
            <dd class="type">${this.localize('names:1558')}</dd>
            <dd>${unsafeHTML(this.localize('names:1559'))}</dd>
            <dt>${this.localize('names:1560')}</dt>
            <dd>${unsafeHTML(this.localize('names:1561'))}</dd>
            <dt>${this.localize('names:1562')}</dt>
            <dd class="type">${this.localize('names:1563')}</dd>
            <dd></dd>
            <dd>${unsafeHTML(this.localize('names:1564'))}</dd>
            <dt>${this.localize('names:1565')}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:1566'))}</dd>
            <dd>${unsafeHTML(this.localize('names:1567'))}</dd>
            <dt>${this.localize('names:1568')}</dt>
            <dd class="type">${this.localize('names:1569')}</dd>
            <dd>${unsafeHTML(this.localize('names:1570'))}</dd>
            <dt>${this.localize('names:1571')}</dt>
            <dd class="type">${this.localize('names:1572')}</dd>
            <dd>${unsafeHTML(this.localize('names:1573'))}</dd>
            <dt>${this.localize('names:1574')}</dt>
            <dd class="type">${this.localize('names:1575')}</dd>
            <dd>${unsafeHTML(this.localize('names:1576'))}</dd>
            <dt>${this.localize('names:1577')}</dt>
            <dd class="type">${this.localize('names:1578')}</dd>
            <dd>${unsafeHTML(this.localize('names:1579'))}</dd>
            <dt>${this.localize('names:1580')}</dt>
            <dd class="type">${this.localize('names:1581')}</dd>
            <dd>${unsafeHTML(this.localize('names:1582'))}</dd>
            <dt>${this.localize('names:1583')}</dt>
            <dd class="type">${this.localize('names:1584')}</dd>
            <dd>${unsafeHTML(this.localize('names:1585'))}</dd>
          </dl>
          <h2 id="s">${this.localize('names:1586')}</h2>
          <dl>
            <dt>${this.localize('names:1587')}</dt>
            <dd class="type">${this.localize('names:1588')}</dd>
            <dd>${unsafeHTML(this.localize('names:1589'))}</dd>
            <dt>${this.localize('names:1590')}</dt>
            <dd class="type">${this.localize('names:1591')}</dd>
            <dd>${unsafeHTML(this.localize('names:1592'))}</dd>
            <dt>${this.localize('names:1593')}</dt>
            <dd class="type">${this.localize('names:1594')}</dd>
            <dd>${unsafeHTML(this.localize('names:1595'))}</dd>
            <dt>${this.localize('names:1596')}</dt>
            <dd class="type">${this.localize('names:1597')}</dd>
            <dd>${unsafeHTML(this.localize('names:1598'))}</dd>
            <dt>${this.localize('names:1599')}</dt>
            <dd class="type">${this.localize('names:1600')}</dd>
            <dd>${unsafeHTML(this.localize('names:1601'))}</dd>
            <dt>${this.localize('names:1602')}</dt>
            <dd class="type">${this.localize('names:1603')}</dd>
            <dd>${unsafeHTML(this.localize('names:1604'))}</dd>
            <dt>${this.localize('names:1605')}</dt>
            <dd class="type">${this.localize('names:1606')}</dd>
            <dd>${unsafeHTML(this.localize('names:1607'))}</dd>
            <dt>${this.localize('names:1608')}</dt>
            <dd class="type">${this.localize('names:1609')}</dd>
            <dd>${unsafeHTML(this.localize('names:1610'))}</dd>
            <dt>${this.localize('names:1611')}</dt>
            <dd class="type">${this.localize('names:1612')}</dd>
            <dd>${unsafeHTML(this.localize('names:1613'))}</dd>
            <dt>${this.localize('names:1614')}</dt>
            <dd class="type">${this.localize('names:1615')}</dd>
            <dd>${unsafeHTML(this.localize('names:1616'))}</dd>
            <dt id="sakka">${this.localize('names:1617')}</dt>
            <dd class="type">${this.localize('names:1618')}</dd>
            <dd>${unsafeHTML(this.localize('names:1619'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:1620'))}</dd>
            <dt>${this.localize('names:1621')}</dt>
            <dd class="type">${this.localize('names:1622')}</dd>
            <dd>${unsafeHTML(this.localize('names:1623'))}</dd>
            <dt id="sakula">${this.localize('names:1624')}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:1625'))}</dd>
            <dd>${unsafeHTML(this.localize('names:1626'))}</dd>
            <dt>${this.localize('names:1627')}</dt>
            <dd class="type">${this.localize('names:1628')}</dd>
            <dd>${unsafeHTML(this.localize('names:1629'))}</dd>
            <dt>${this.localize('names:1630')}</dt>
            <dd class="type">${this.localize('names:1631')}</dd>
            <dd>${unsafeHTML(this.localize('names:1632'))}</dd>
            <dt>${this.localize('names:1633')}</dt>
            <dd class="type">${this.localize('names:1634')}</dd>
            <dd>${unsafeHTML(this.localize('names:1635'))}</dd>
            <dt>${this.localize('names:1636')}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:1637'))}</dd>
            <dd>${unsafeHTML(this.localize('names:1638'))}</dd>
            <dt>${this.localize('names:1639')}</dt>
            <dd class="type">${this.localize('names:1640')}</dd>
            <dd>${unsafeHTML(this.localize('names:1641'))}</dd>
            <dt>${this.localize('names:1642')}</dt>
            <dd class="type">${this.localize('names:1643')}</dd>
            <dd>${unsafeHTML(this.localize('names:1644'))}</dd>
            <dt>${this.localize('names:1645')}</dt>
            <dd class="type">${this.localize('names:1646')}</dd>
            <dd>${unsafeHTML(this.localize('names:1647'))}</dd>
            <dt id="samavati">${this.localize('names:1648')}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:1649'))}</dd>
            <dd>${unsafeHTML(this.localize('names:1650'))}</dd>
            <dt>${this.localize('names:1651')}</dt>
            <dd class="type">${this.localize('names:1652')}</dd>
            <dd>${unsafeHTML(this.localize('names:1653'))}</dd>
            <dt>${this.localize('names:1654')}</dt>
            <dd class="type">${this.localize('names:1655')}</dd>
            <dd>${unsafeHTML(this.localize('names:1656'))}</dd>
            <dt>${this.localize('names:1657')}</dt>
            <dd class="type">${this.localize('names:1658')}</dd>
            <dd>${unsafeHTML(this.localize('names:1659'))}</dd>
            <dt>${this.localize('names:1660')}</dt>
            <dd class="type">${this.localize('names:1661')}</dd>
            <dd>${unsafeHTML(this.localize('names:1662'))}</dd>
            <dt>${this.localize('names:1663')}</dt>
            <dd class="type">${this.localize('names:1664')}</dd>
            <dd>${unsafeHTML(this.localize('names:1665'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:1666'))}</dd>
            <dt>${this.localize('names:1667')}</dt>
            <dd class="type">${this.localize('names:1668')}</dd>
            <dd>${unsafeHTML(this.localize('names:1669'))}</dd>
            <dt>${this.localize('names:1670')}</dt>
            <dd class="type">${this.localize('names:1671')}</dd>
            <dd>${unsafeHTML(this.localize('names:1672'))}</dd>
            <dt>${this.localize('names:1673')}</dt>
            <dd class="type">${this.localize('names:1674')}</dd>
            <dd>${unsafeHTML(this.localize('names:1675'))}</dd>
            <dt>${this.localize('names:1676')}</dt>
            <dd class="type">${this.localize('names:1677')}</dd>
            <dd>${unsafeHTML(this.localize('names:1678'))}</dd>
            <dt>${this.localize('names:1679')}</dt>
            <dd class="type">${this.localize('names:1680')}</dd>
            <dd>${unsafeHTML(this.localize('names:1681'))}</dd>
            <dt>${this.localize('names:1682')}</dt>
            <dd class="type">${this.localize('names:1683')}</dd>
            <dd>${unsafeHTML(this.localize('names:1684'))}</dd>
            <dt>${this.localize('names:1685')}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:1686'))}</dd>
            <dd>${unsafeHTML(this.localize('names:1687'))}</dd>
            <dt>${this.localize('names:1688')}</dt>
            <dd class="type">${this.localize('names:1689')}</dd>
            <dd>${unsafeHTML(this.localize('names:1690'))}</dd>
            <dt>${this.localize('names:1691')}</dt>
            <dd class="type">${this.localize('names:1692')}</dd>
            <dd>${unsafeHTML(this.localize('names:1693'))}</dd>
            <dt>${this.localize('names:1694')}</dt>
            <dd class="type">${this.localize('names:1695')}</dd>
            <dd>${unsafeHTML(this.localize('names:1696'))}</dd>
            <dt>${this.localize('names:1697')}</dt>
            <dd class="type">${this.localize('names:1698')}</dd>
            <dd>${unsafeHTML(this.localize('names:1699'))}</dd>
            <dt>${this.localize('names:1700')}</dt>
            <dd class="type">${this.localize('names:1701')}</dd>
            <dd>${unsafeHTML(this.localize('names:1702'))}</dd>
            <dt>${this.localize('names:1703')}</dt>
            <dd class="type">${this.localize('names:1704')}</dd>
            <dd>${unsafeHTML(this.localize('names:1705'))}</dd>
            <dt id="sariputta">${this.localize('names:1706')}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:1707'))}</dd>
            <dd>${unsafeHTML(this.localize('names:1708'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:1709'))}</dd>
            <dt>${this.localize('names:1710')}</dt>
            <dd class="type">${this.localize('names:1711')}</dd>
            <dd>${unsafeHTML(this.localize('names:1712'))}</dd>
            <dt>${this.localize('names:1713')}</dt>
            <dd class="type">${this.localize('names:1714')}</dd>
            <dd>${unsafeHTML(this.localize('names:1715'))}</dd>
            <dt>${this.localize('names:1716')}</dt>
            <dd class="type">${this.localize('names:1717')}</dd>
            <dd>${unsafeHTML(this.localize('names:1718'))}</dd>
            <dt>${this.localize('names:1719')}</dt>
            <dd class="type">${this.localize('names:1720')}</dd>
            <dd>${unsafeHTML(this.localize('names:1721'))}</dd>
            <dt>${this.localize('names:1722')}</dt>
            <dd class="type">${this.localize('names:1723')}</dd>
            <dd>${unsafeHTML(this.localize('names:1724'))}</dd>
            <dt>${this.localize('names:1725')}</dt>
            <dd class="type">${this.localize('names:1726')}</dd>
            <dd>${unsafeHTML(this.localize('names:1727'))}</dd>
            <dt>${this.localize('names:1728')}</dt>
            <dd class="type">${this.localize('names:1729')}</dd>
            <dd>${unsafeHTML(this.localize('names:1730'))}</dd>
            <dt id="savatthi">${this.localize('names:1731')}</dt>
            <dd class="type">${this.localize('names:1732')}</dd>
            <dd>${unsafeHTML(this.localize('names:1733'))}</dd>
            <dt>${this.localize('names:1734')}</dt>
            <dd class="type">${this.localize('names:1735')}</dd>
            <dd>${unsafeHTML(this.localize('names:1736'))}</dd>
            <dt>${this.localize('names:1737')}</dt>
            <dd class="type">${this.localize('names:1738')}</dd>
            <dd>${unsafeHTML(this.localize('names:1739'))}</dd>
            <dt>${this.localize('names:1740')}</dt>
            <dd class="type">${this.localize('names:1741')}</dd>
            <dd>${unsafeHTML(this.localize('names:1742'))}</dd>
            <dt>${this.localize('names:1743')}</dt>
            <dd class="type">${this.localize('names:1744')}</dd>
            <dd>${unsafeHTML(this.localize('names:1745'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:1746'))}</dd>
            <dt>${this.localize('names:1747')}</dt>
            <dd class="type">${this.localize('names:1748')}</dd>
            <dd>${unsafeHTML(this.localize('names:1749'))}</dd>
            <dt>${this.localize('names:1750')}</dt>
            <dd class="type">${this.localize('names:1751')}</dd>
            <dd>${unsafeHTML(this.localize('names:1752'))}</dd>
            <dt>${this.localize('names:1753')}</dt>
            <dd class="type">${this.localize('names:1754')}</dd>
            <dd>${unsafeHTML(this.localize('names:1755'))}</dd>
            <dt>${this.localize('names:1756')}</dt>
            <dd>${unsafeHTML(this.localize('names:1757'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:1758'))}</dd>
            <dt>${this.localize('names:1759')}</dt>
            <dd class="type">${this.localize('names:1760')}</dd>
            <dd>${unsafeHTML(this.localize('names:1761'))}</dd>
            <dt>${this.localize('names:1762')}</dt>
            <dd class="type">${this.localize('names:1763')}</dd>
            <dd>${unsafeHTML(this.localize('names:1764'))}</dd>
            <dt>${this.localize('names:1765')}</dt>
            <dd class="type">${this.localize('names:1766')}</dd>
            <dd>${unsafeHTML(this.localize('names:1767'))}</dd>
            <dt>${this.localize('names:1768')}</dt>
            <dd class="type">${this.localize('names:1769')}</dd>
            <dd>${unsafeHTML(this.localize('names:1770'))}</dd>
            <dt>${this.localize('names:1771')}</dt>
            <dd class="type">${this.localize('names:1772')}</dd>
            <dd>${unsafeHTML(this.localize('names:1773'))}</dd>
            <dt>${this.localize('names:1774')}</dt>
            <dd class="type">${this.localize('names:1775')}</dd>
            <dd>${unsafeHTML(this.localize('names:1776'))}</dd>
            <dt>${this.localize('names:1777')}</dt>
            <dd class="type">${this.localize('names:1778')}</dd>
            <dd>${unsafeHTML(this.localize('names:1779'))}</dd>
            <dt>${this.localize('names:1780')}</dt>
            <dd class="type">${this.localize('names:1781')}</dd>
            <dd>${unsafeHTML(this.localize('names:1782'))}</dd>
            <dt>${this.localize('names:1783')}</dt>
            <dd class="type">${this.localize('names:1784')}</dd>
            <dd>${unsafeHTML(this.localize('names:1785'))}</dd>
            <dt>${this.localize('names:1786')}</dt>
            <dd class="type">${this.localize('names:1787')}</dd>
            <dd>${unsafeHTML(this.localize('names:1788'))}</dd>
            <dt>${this.localize('names:1789')}</dt>
            <dd class="type">${this.localize('names:1790')}</dd>
            <dd>${unsafeHTML(this.localize('names:1791'))}</dd>
            <dt>${this.localize('names:1792')}</dt>
            <dd class="type">${this.localize('names:1793')}</dd>
            <dd>${unsafeHTML(this.localize('names:1794'))}</dd>
            <dt>${this.localize('names:1795')}</dt>
            <dd class="type">${this.localize('names:1796')}</dd>
            <dd>${unsafeHTML(this.localize('names:1797'))}</dd>
            <dt id="soma">${this.localize('names:1798')}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:1799'))}</dd>
            <dd>${unsafeHTML(this.localize('names:1800'))}</dd>
            <dt>${this.localize('names:1801')}</dt>
            <dd class="type">${this.localize('names:1802')}</dd>
            <dd>${unsafeHTML(this.localize('names:1803'))}</dd>
            <dt>${this.localize('names:1804')}</dt>
            <dd class="type">${this.localize('names:1805')}</dd>
            <dd>${unsafeHTML(this.localize('names:1806'))}</dd>
            <dt>${this.localize('names:1807')}</dt>
            <dd class="type">${this.localize('names:1808')}</dd>
            <dd>${unsafeHTML(this.localize('names:1809'))}</dd>
            <dt>${this.localize('names:1810')}</dt>
            <dd class="type">${this.localize('names:1811')}</dd>
            <dd>${unsafeHTML(this.localize('names:1812'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:1813'))}</dd>
            <dt>${this.localize('names:1814')}</dt>
            <dd>${unsafeHTML(this.localize('names:1815'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:1816'))}</dd>
            <dt>${this.localize('names:1817')}</dt>
            <dd class="type">${this.localize('names:1818')}</dd>
            <dd>${unsafeHTML(this.localize('names:1819'))}</dd>
            <dt>${this.localize('names:1820')}</dt>
            <dd class="type">${this.localize('names:1821')}</dd>
            <dd>${unsafeHTML(this.localize('names:1822'))}</dd>
            <dt>${this.localize('names:1823')}</dt>
            <dd class="type">${this.localize('names:1824')}</dd>
            <dd>${unsafeHTML(this.localize('names:1825'))}</dd>
            <dt>${this.localize('names:1826')}</dt>
            <dd class="type">${this.localize('names:1827')}</dd>
            <dd>${unsafeHTML(this.localize('names:1828'))}</dd>
            <dt>${this.localize('names:1829')}</dt>
            <dd class="type">${this.localize('names:1830')}</dd>
            <dd>${unsafeHTML(this.localize('names:1831'))}</dd>
            <dt>${this.localize('names:1832')}</dt>
            <dd class="type">${this.localize('names:1833')}</dd>
            <dd>${unsafeHTML(this.localize('names:1834'))}</dd>
            <dt>${this.localize('names:1835')}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:1836'))}</dd>
            <dd>${unsafeHTML(this.localize('names:1837'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:1838'))}</dd>
            <dt>${this.localize('names:1839')}</dt>
            <dd class="type">${this.localize('names:1840')}</dd>
            <dd>${unsafeHTML(this.localize('names:1841'))}</dd>
            <dt>${this.localize('names:1842')}</dt>
            <dd class="type">${this.localize('names:1843')}</dd>
            <dd>${unsafeHTML(this.localize('names:1844'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:1845'))}</dd>
            <dt>${this.localize('names:1846')}</dt>
            <dd class="type">${this.localize('names:1847')}</dd>
            <dd>${unsafeHTML(this.localize('names:1848'))}</dd>
            <dt>${this.localize('names:1849')}</dt>
            <dd class="type">${this.localize('names:1850')}</dd>
            <dd>${unsafeHTML(this.localize('names:1851'))}</dd>
            <dt>${this.localize('names:1852')}</dt>
            <dd class="type">${this.localize('names:1853')}</dd>
            <dd>${unsafeHTML(this.localize('names:1854'))}</dd>
            <dt>${this.localize('names:1855')}</dt>
            <dd class="type">${this.localize('names:1856')}</dd>
            <dd>${unsafeHTML(this.localize('names:1857'))}</dd>
            <dt>${this.localize('names:1858')}</dt>
            <dd class="type">${this.localize('names:1859')}</dd>
            <dd>${unsafeHTML(this.localize('names:1860'))}</dd>
            <dt>${this.localize('names:1861')}</dt>
            <dd class="type">${this.localize('names:1862')}</dd>
            <dd>${unsafeHTML(this.localize('names:1863'))}</dd>
            <dt>${this.localize('names:1864')}</dt>
            <dd class="type">${this.localize('names:1865')}</dd>
            <dd>${unsafeHTML(this.localize('names:1866'))}</dd>
            <dt>${this.localize('names:1867')}</dt>
            <dd class="type">${this.localize('names:1868')}</dd>
            <dd>${unsafeHTML(this.localize('names:1869'))}</dd>
            <dt>${this.localize('names:1870')}</dt>
            <dd class="type">${this.localize('names:1871')}</dd>
            <dd>${unsafeHTML(this.localize('names:1872'))}</dd>
            <dt>${this.localize('names:1873')}</dt>
            <dd>${unsafeHTML(this.localize('names:1874'))}</dd>
            <dt>${this.localize('names:1875')}</dt>
            <dd class="type">${this.localize('names:1876')}</dd>
            <dd>${unsafeHTML(this.localize('names:1877'))}</dd>
            <dt>${this.localize('names:1878')}</dt>
            <dd class="type">${this.localize('names:1879')}</dd>
            <dd>${unsafeHTML(this.localize('names:1880'))}</dd>
            <dt>${this.localize('names:1881')}</dt>
            <dd class="type">${this.localize('names:1882')}</dd>
            <dd>${unsafeHTML(this.localize('names:1883'))}</dd>
            <dt>${this.localize('names:1884')}</dt>
            <dd class="type">${this.localize('names:1885')}</dd>
            <dd>${unsafeHTML(this.localize('names:1886'))}</dd>
            <dt>${this.localize('names:1887')}</dt>
            <dd class="type">${this.localize('names:1888')}</dd>
            <dd>${unsafeHTML(this.localize('names:1889'))}</dd>
            <dt>${this.localize('names:1890')}</dt>
            <dd class="type">${this.localize('names:1891')}</dd>
            <dd>${unsafeHTML(this.localize('names:1892'))}</dd>
            <dt>${this.localize('names:1893')}</dt>
            <dd class="type">${this.localize('names:1894')}</dd>
            <dd>${unsafeHTML(this.localize('names:1895'))}</dd>
            <dt>${this.localize('names:1896')}</dt>
            <dd class="type">${this.localize('names:1897')}</dd>
            <dd>${unsafeHTML(this.localize('names:1898'))}</dd>
            <dt>${this.localize('names:1899')}</dt>
            <dd class="type">${this.localize('names:1900')}</dd>
            <dd>${unsafeHTML(this.localize('names:1901'))}</dd>
            <dt>${this.localize('names:1902')}</dt>
            <dd class="type">${this.localize('names:1903')}</dd>
            <dd>${unsafeHTML(this.localize('names:1904'))}</dd>
            <dt>${this.localize('names:1905')}</dt>
            <dd>${unsafeHTML(this.localize('names:1906'))}</dd>
            <dt>${this.localize('names:1907')}</dt>
            <dd class="type">${this.localize('names:1908')}</dd>
            <dd>${unsafeHTML(this.localize('names:1909'))}</dd>
            <dt>${this.localize('names:1910')}</dt>
            <dd class="type">${this.localize('names:1911')}</dd>
            <dd>${unsafeHTML(this.localize('names:1912'))}</dd>
            <dt>${this.localize('names:1913')}</dt>
            <dd class="type">${this.localize('names:1914')}</dd>
            <dd>${unsafeHTML(this.localize('names:1915'))}</dd>
            <dt>${this.localize('names:1916')}</dt>
            <dd class="type">${this.localize('names:1917')}</dd>
            <dd>${unsafeHTML(this.localize('names:1918'))}</dd>
            <dt>${this.localize('names:1919')}</dt>
            <dd class="type">${this.localize('names:1920')}</dd>
            <dd>${unsafeHTML(this.localize('names:1921'))}</dd>
            <dt>${this.localize('names:1922')}</dt>
            <dd class="type">${this.localize('names:1923')}</dd>
            <dd>${unsafeHTML(this.localize('names:1924'))}</dd>
            <dt>${this.localize('names:1925')}</dt>
            <dd class="type">${this.localize('names:1926')}</dd>
            <dd>${unsafeHTML(this.localize('names:1927'))}</dd>
            <dt>${this.localize('names:1928')}</dt>
            <dd class="type">${this.localize('names:1929')}</dd>
            <dd>${unsafeHTML(this.localize('names:1930'))}</dd>
            <dt>${this.localize('names:1931')}</dt>
            <dd class="type">${this.localize('names:1932')}</dd>
            <dd>${unsafeHTML(this.localize('names:1933'))}</dd>
            <dt id="sundarika">${this.localize('names:1934')}</dt>
            <dd class="type">${this.localize('names:1935')}</dd>
            <dd>${unsafeHTML(this.localize('names:1936'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:1937'))}</dd>
            <dt>${this.localize('names:1938')}</dt>
            <dd class="type">${this.localize('names:1939')}</dd>
            <dd>${unsafeHTML(this.localize('names:1940'))}</dd>
            <dt>${this.localize('names:1941')}</dt>
            <dd class="type">${this.localize('names:1942')}</dd>
            <dd>${unsafeHTML(this.localize('names:1943'))}</dd>
            <dt>${this.localize('names:1944')}</dt>
            <dd class="type">${this.localize('names:1945')}</dd>
            <dd>${unsafeHTML(this.localize('names:1946'))}</dd>
            <dt>${this.localize('names:1947')}</dt>
            <dd class="type">${this.localize('names:1948')}</dd>
            <dd>${unsafeHTML(this.localize('names:1949'))}</dd>
            <dt>${this.localize('names:1950')}</dt>
            <dd class="type">${this.localize('names:1951')}</dd>
            <dd>${unsafeHTML(this.localize('names:1952'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:1953'))}</dd>
            <dt>${this.localize('names:1954')}</dt>
            <dd class="type">${this.localize('names:1955')}</dd>
            <dd>${unsafeHTML(this.localize('names:1956'))}</dd>
            <dt>${this.localize('names:1957')}</dt>
            <dd class="type">${this.localize('names:1958')}</dd>
            <dd>${unsafeHTML(this.localize('names:1959'))}</dd>
            <dt>${this.localize('names:1960')}</dt>
            <dd class="type">${this.localize('names:1961')}</dd>
            <dd>${unsafeHTML(this.localize('names:1962'))}</dd>
            <dt>${this.localize('names:1963')}</dt>
            <dd class="type">${this.localize('names:1964')}</dd>
            <dd>${unsafeHTML(this.localize('names:1965'))}</dd>
            <dt>${this.localize('names:1966')}</dt>
            <dd class="type">${this.localize('names:1967')}</dd>
            <dd>${unsafeHTML(this.localize('names:1968'))}</dd>
            <dt>${this.localize('names:1969')}</dt>
            <dd class="type">${this.localize('names:1970')}</dd>
            <dd>${unsafeHTML(this.localize('names:1971'))}</dd>
            <dt>${this.localize('names:1972')}</dt>
            <dd class="type">${this.localize('names:1973')}</dd>
            <dd>${unsafeHTML(this.localize('names:1974'))}</dd>
            <dt>${this.localize('names:1975')}</dt>
            <dd class="type">${this.localize('names:1976')}</dd>
            <dd>${unsafeHTML(this.localize('names:1977'))}</dd>
            <dt>${this.localize('names:1978')}</dt>
            <dd class="type">${this.localize('names:1979')}</dd>
            <dd>${unsafeHTML(this.localize('names:1980'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:1981'))}</dd>
            <dt>${this.localize('names:1982')}</dt>
            <dd class="type">${this.localize('names:1983')}</dd>
            <dd>${unsafeHTML(this.localize('names:1984'))}</dd>
            <dt>${this.localize('names:1985')}</dt>
            <dd class="type">${this.localize('names:1986')}</dd>
            <dd>${unsafeHTML(this.localize('names:1987'))}</dd>
            <dt>${this.localize('names:1988')}</dt>
            <dd class="type">${this.localize('names:1989')}</dd>
            <dd>${unsafeHTML(this.localize('names:1990'))}</dd>
          </dl>
          <h2 id="t">${this.localize('names:1991')}</h2>
          <dl>
            <dt>${this.localize('names:1992')}</dt>
            <dd class="type">${this.localize('names:1993')}</dd>
            <dd>${unsafeHTML(this.localize('names:1994'))}</dd>
            <dt>${this.localize('names:1995')}</dt>
            <dd class="type">${this.localize('names:1996')}</dd>
            <dd>${unsafeHTML(this.localize('names:1997'))}</dd>
            <dt>${this.localize('names:1998')}</dt>
            <dd class="type">${this.localize('names:1999')}</dd>
            <dd>${unsafeHTML(this.localize('names:2000'))}</dd>
            <dt>${this.localize('names:2001')}</dt>
            <dd class="type">${this.localize('names:2002')}</dd>
            <dd>${unsafeHTML(this.localize('names:2003'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:2004'))}</dd>
            <dt>${this.localize('names:2005')}</dt>
            <dd class="type">${this.localize('names:2006')}</dd>
            <dd>${unsafeHTML(this.localize('names:2007'))}</dd>
            <dt>${this.localize('names:2008')}</dt>
            <dd>${unsafeHTML(this.localize('names:2009'))}</dd>
            <dt>${this.localize('names:2010')}</dt>
            <dd class="type">${this.localize('names:2011')}</dd>
            <dd>${unsafeHTML(this.localize('names:2012'))}</dd>
            <dt>${this.localize('names:2013')}</dt>
            <dd class="type">${this.localize('names:2014')}</dd>
            <dd>${unsafeHTML(this.localize('names:2015'))}</dd>
            <dt>${this.localize('names:2016')}</dt>
            <dd class="type">${this.localize('names:2017')}</dd>
            <dd>${unsafeHTML(this.localize('names:2018'))}</dd>
            <dt>${this.localize('names:2019')}</dt>
            <dd class="type">${this.localize('names:2020')}</dd>
            <dd>${unsafeHTML(this.localize('names:2021'))}</dd>
            <dt>${this.localize('names:2022')}</dt>
            <dd class="type">${this.localize('names:2023')}</dd>
            <dd>${unsafeHTML(this.localize('names:2024'))}</dd>
            <dt>${this.localize('names:2025')}</dt>
            <dd class="type">${this.localize('names:2026')}</dd>
            <dd>${unsafeHTML(this.localize('names:2027'))}</dd>
            <dt>${this.localize('names:2028')}</dt>
            <dd class="type">${this.localize('names:2029')}</dd>
            <dd>${unsafeHTML(this.localize('names:2030'))}</dd>
            <dt>${this.localize('names:2031')}</dt>
            <dd class="type">${this.localize('names:2032')}</dd>
            <dd>${unsafeHTML(this.localize('names:2033'))}</dd>
            <dt>${this.localize('names:2034')}</dt>
            <dd class="type">${this.localize('names:2035')}</dd>
            <dd>${unsafeHTML(this.localize('names:2036'))}</dd>
            <dt>${this.localize('names:2037')}</dt>
            <dd class="type">${this.localize('names:2038')}</dd>
            <dd>${unsafeHTML(this.localize('names:2039'))}</dd>
            <dt>${this.localize('names:2040')}</dt>
            <dd class="type">${this.localize('names:2041')}</dd>
            <dd>${unsafeHTML(this.localize('names:2042'))}</dd>
            <dt>${this.localize('names:2043')}</dt>
            <dd class="type">${this.localize('names:2044')}</dd>
            <dd>${unsafeHTML(this.localize('names:2045'))}</dd>
            <dt>${this.localize('names:2046')}</dt>
            <dd class="type">${this.localize('names:2047')}</dd>
            <dd>${unsafeHTML(this.localize('names:2048'))}</dd>
            <dt id="todeyya">${this.localize('names:2049')}</dt>
            <dd class="type">${this.localize('names:2050')}</dd>
            <dd>${unsafeHTML(this.localize('names:2051'))}</dd>
            <dt>${this.localize('names:2052')}</dt>
            <dd class="type">${this.localize('names:2053')}</dd>
            <dd>${unsafeHTML(this.localize('names:2054'))}</dd>
            <dt>${this.localize('names:2055')}</dt>
            <dd class="type">${this.localize('names:2056')}</dd>
            <dd>${unsafeHTML(this.localize('names:2057'))}</dd>
            <dt>${this.localize('names:2058')}</dt>
            <dd>${unsafeHTML(this.localize('names:2059'))}</dd>
          </dl>
          <h2 id="u">${this.localize('names:2060')}</h2>
          <dl>
            <dt id="ubbiri">${this.localize('names:2061')}</dt>
            <dd class="type">${this.localize('names:2062')}</dd>
            <dd>${unsafeHTML(this.localize('names:2063'))}</dd>
            <dt>${this.localize('names:2064')}</dt>
            <dd class="type">${this.localize('names:2065')}</dd>
            <dd>${unsafeHTML(this.localize('names:2066'))}</dd>
            <dt>${this.localize('names:2067')}</dt>
            <dd class="type">${this.localize('names:2068')}</dd>
            <dd>${unsafeHTML(this.localize('names:2069'))}</dd>
            <dt>${this.localize('names:2070')}</dt>
            <dd class="type">${this.localize('names:2071')}</dd>
            <dd>${unsafeHTML(this.localize('names:2072'))}</dd>
            <dt>${this.localize('names:2073')}</dt>
            <dd class="type">${this.localize('names:2074')}</dd>
            <dd>${unsafeHTML(this.localize('names:2075'))}</dd>
            <dt id="udayibhadda">${this.localize('names:2076')}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:2077'))}</dd>
            <dd>${unsafeHTML(this.localize('names:2078'))}</dd>
            <dt>${this.localize('names:2079')}</dt>
            <dd class="type">${this.localize('names:2080')}</dd>
            <dd>${unsafeHTML(this.localize('names:2081'))}</dd>
            <dt>${this.localize('names:2082')}</dt>
            <dd class="type">${this.localize('names:2083')}</dd>
            <dd>${unsafeHTML(this.localize('names:2084'))}</dd>
            <dt id="udena">${this.localize('names:2085')}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:2086'))}</dd>
            <dd>${unsafeHTML(this.localize('names:2087'))}</dd>
            <dt>${this.localize('names:2088')}</dt>
            <dd class="type">${this.localize('names:2089')}</dd>
            <dd>${unsafeHTML(this.localize('names:2090'))}</dd>
            <dt>${this.localize('names:2091')}</dt>
            <dd>${unsafeHTML(this.localize('names:2092'))}</dd>
            <dt>${this.localize('names:2093')}</dt>
            <dd>${unsafeHTML(this.localize('names:2094'))}</dd>
            <dt>${this.localize('names:2095')}</dt>
            <dd class="type">${this.localize('names:2096')}</dd>
            <dd>${unsafeHTML(this.localize('names:2097'))}</dd>
            <dt>${this.localize('names:2098')}</dt>
            <dd class="type">${this.localize('names:2099')}</dd>
            <dd>${unsafeHTML(this.localize('names:2100'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:2101'))}</dd>
            <dt>${this.localize('names:2102')}</dt>
            <dd class="type">${this.localize('names:2103')}</dd>
            <dd>${unsafeHTML(this.localize('names:2104'))}</dd>
            <dt>${this.localize('names:2105')}</dt>
            <dd class="type">${this.localize('names:2106')}</dd>
            <dd>${unsafeHTML(this.localize('names:2107'))}</dd>
            <dt>${this.localize('names:2108')}</dt>
            <dd class="type">${this.localize('names:2109')}</dd>
            <dd>${unsafeHTML(this.localize('names:2110'))}</dd>
            <dt>${this.localize('names:2111')}</dt>
            <dd class="type">${this.localize('names:2112')}</dd>
            <dd>${unsafeHTML(this.localize('names:2113'))}</dd>
            <dt>${this.localize('names:2114')}</dt>
            <dd class="type">${this.localize('names:2115')}</dd>
            <dd>${unsafeHTML(this.localize('names:2116'))}</dd>
            <dt>${this.localize('names:2117')}</dt>
            <dd class="type">${this.localize('names:2118')}</dd>
            <dd>${unsafeHTML(this.localize('names:2119'))}</dd>
            <dt>${this.localize('names:2120')}</dt>
            <dd class="type">${this.localize('names:2121')}</dd>
            <dd>${unsafeHTML(this.localize('names:2122'))}</dd>
            <dt>${this.localize('names:2123')}</dt>
            <dd class="type">${this.localize('names:2124')}</dd>
            <dd>${unsafeHTML(this.localize('names:2125'))}</dd>
            <dt>${this.localize('names:2126')}</dt>
            <dd class="type">${this.localize('names:2127')}</dd>
            <dd>${unsafeHTML(this.localize('names:2128'))}</dd>
            <dt>${this.localize('names:2129')}</dt>
            <dd class="type">${this.localize('names:2130')}</dd>
            <dd>${unsafeHTML(this.localize('names:2131'))}</dd>
            <dt>${this.localize('names:2132')}</dt>
            <dd class="type">${this.localize('names:2133')}</dd>
            <dd>${unsafeHTML(this.localize('names:2134'))}</dd>
            <dt>${this.localize('names:2135')}</dt>
            <dd class="type">${this.localize('names:2136')}</dd>
            <dd>${unsafeHTML(this.localize('names:2137'))}</dd>
            <dt>${this.localize('names:2138')}</dt>
            <dd class="type">${this.localize('names:2139')}</dd>
            <dd>${unsafeHTML(this.localize('names:2140'))}</dd>
            <dt>${this.localize('names:2141')}</dt>
            <dd class="type">${this.localize('names:2142')}</dd>
            <dd>${unsafeHTML(this.localize('names:2143'))}</dd>
            <dt>${this.localize('names:2144')}</dt>
            <dd class="type">${this.localize('names:2145')}</dd>
            <dd>${unsafeHTML(this.localize('names:2146'))}</dd>
            <dt>${this.localize('names:2147')}</dt>
            <dd class="type">${this.localize('names:2148')}</dd>
            <dd>${unsafeHTML(this.localize('names:2149'))}</dd>
            <dt>${this.localize('names:2150')}</dt>
            <dd class="type">${this.localize('names:2151')}</dd>
            <dd>${unsafeHTML(this.localize('names:2152'))}</dd>
            <dt>${this.localize('names:2153')}</dt>
            <dd class="type">${this.localize('names:2154')}</dd>
            <dd>${unsafeHTML(this.localize('names:2155'))}</dd>
            <dt>${this.localize('names:2156')}</dt>
            <dd class="type">${this.localize('names:2157')}</dd>
            <dd>${unsafeHTML(this.localize('names:2158'))}</dd>
            <dt>${this.localize('names:2159')}</dt>
            <dd class="type">${this.localize('names:2160')}</dd>
            <dd>${unsafeHTML(this.localize('names:2161'))}</dd>
            <dt>${this.localize('names:2162')}</dt>
            <dd class="type">${this.localize('names:2163')}</dd>
            <dd>${unsafeHTML(this.localize('names:2164'))}</dd>
            <dt>${this.localize('names:2165')}</dt>
            <dd class="type">${this.localize('names:2166')}</dd>
            <dd>${unsafeHTML(this.localize('names:2167'))}</dd>
            <dt>${this.localize('names:2168')}</dt>
            <dd class="type">${this.localize('names:2169')}</dd>
            <dd>${unsafeHTML(this.localize('names:2170'))}</dd>
            <dt>${this.localize('names:2171')}</dt>
            <dd class="type">${this.localize('names:2172')}</dd>
            <dd>${unsafeHTML(this.localize('names:2173'))}</dd>
            <dt>${this.localize('names:2174')}</dt>
            <dd class="type">${this.localize('names:2175')}</dd>
            <dd>${unsafeHTML(this.localize('names:2176'))}</dd>
            <dt>${this.localize('names:2177')}</dt>
            <dd class="type">${this.localize('names:2178')}</dd>
            <dd>${unsafeHTML(this.localize('names:2179'))}</dd>
            <dt>${this.localize('names:2180')}</dt>
            <dd class="type">${this.localize('names:2181')}</dd>
            <dd>${unsafeHTML(this.localize('names:2182'))}</dd>
            <dt>${this.localize('names:2183')}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:2184'))}</dd>
            <dd>${unsafeHTML(this.localize('names:2185'))}</dd>
            <dt>${this.localize('names:2186')}</dt>
            <dd class="type">${this.localize('names:2187')}</dd>
            <dd>${unsafeHTML(this.localize('names:2188'))}</dd>
            <dt>${this.localize('names:2189')}</dt>
            <dd class="type">${this.localize('names:2190')}</dd>
            <dd>${unsafeHTML(this.localize('names:2191'))}</dd>
          </dl>
          <h2 id="v">${this.localize('names:2192')}</h2>
          <dl>
            <dt>${this.localize('names:2193')}</dt>
            <dd class="type">${this.localize('names:2194')}</dd>
            <dd>${unsafeHTML(this.localize('names:2195'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:2196'))}</dd>
            <dt>${this.localize('names:2197')}</dt>
            <dd class="type">${this.localize('names:2198')}</dd>
            <dd>${unsafeHTML(this.localize('names:2199'))}</dd>
            <dt>${this.localize('names:2200')}</dt>
            <dd class="type">${this.localize('names:2201')}</dd>
            <dd>${unsafeHTML(this.localize('names:2202'))}</dd>
            <dt>${this.localize('names:2203')}</dt>
            <dd class="type">${this.localize('names:2204')}</dd>
            <dd>${unsafeHTML(this.localize('names:2205'))}</dd>
            <dt>${this.localize('names:2206')}</dt>
            <dd class="type">${this.localize('names:2207')}</dd>
            <dd></dd>
            <dd>${unsafeHTML(this.localize('names:2208'))}</dd>
            <dt>${this.localize('names:2209')}</dt>
            <dd class="type">${this.localize('names:2210')}</dd>
            <dd>${unsafeHTML(this.localize('names:2211'))}</dd>
            <dt>${this.localize('names:2212')}</dt>
            <dd class="type">${this.localize('names:2213')}</dd>
            <dd>${unsafeHTML(this.localize('names:2214'))}</dd>
            <dt>${this.localize('names:2215')}</dt>
            <dd class="type">${this.localize('names:2216')}</dd>
            <dd>${unsafeHTML(this.localize('names:2217'))}</dd>
            <dt>${this.localize('names:2218')}</dt>
            <dd class="type">${this.localize('names:2219')}</dd>
            <dd>${unsafeHTML(this.localize('names:2220'))}</dd>
            <dt>${this.localize('names:2221')}</dt>
            <dd class="type">${this.localize('names:2222')}</dd>
            <dd>${unsafeHTML(this.localize('names:2223'))}</dd>
            <dt>${this.localize('names:2224')}</dt>
            <dd class="type">${this.localize('names:2225')}</dd>
            <dd>${unsafeHTML(this.localize('names:2226'))}</dd>
            <dt>${this.localize('names:2227')}</dt>
            <dd class="type">${this.localize('names:2228')}</dd>
            <dd>${unsafeHTML(this.localize('names:2229'))}</dd>
            <dt>${this.localize('names:2230')}</dt>
            <dd>${unsafeHTML(this.localize('names:2231'))}</dd>
            <dt>${this.localize('names:2232')}</dt>
            <dd class="type">${this.localize('names:2233')}</dd>
            <dd>${unsafeHTML(this.localize('names:2234'))}</dd>
            <dt>${this.localize('names:2235')}</dt>
            <dd class="type">${this.localize('names:2236')}</dd>
            <dd>${unsafeHTML(this.localize('names:2237'))}</dd>
            <dt id="varanasi">${this.localize('names:2238')}</dt>
            <dd class="type">${this.localize('names:2239')}</dd>
            <dd>${unsafeHTML(this.localize('names:2240'))}</dd>
            <dt>${this.localize('names:2241')}</dt>
            <dd class="type">${this.localize('names:2242')}</dd>
            <dd>${unsafeHTML(this.localize('names:2243'))}</dd>
            <dt>${this.localize('names:2244')}</dt>
            <dd class="type">${this.localize('names:2245')}</dd>
            <dd>${unsafeHTML(this.localize('names:2246'))}</dd>
            <dt>${this.localize('names:2247')}</dt>
            <dd class="type">${this.localize('names:2248')}</dd>
            <dd>${unsafeHTML(this.localize('names:2249'))}</dd>
            <dt>${this.localize('names:2250')}</dt>
            <dd class="type">${this.localize('names:2251')}</dd>
            <dd>${unsafeHTML(this.localize('names:2252'))}</dd>
            <dt>${this.localize('names:2253')}</dt>
            <dd class="type">${this.localize('names:2254')}</dd>
            <dd>${unsafeHTML(this.localize('names:2255'))}</dd>
            <dt>${this.localize('names:2256')}</dt>
            <dd class="type">${this.localize('names:2257')}</dd>
            <dd>${unsafeHTML(this.localize('names:2258'))}</dd>
            <dt>${this.localize('names:2259')}</dt>
            <dd class="type">${this.localize('names:2260')}</dd>
            <dd>${unsafeHTML(this.localize('names:2261'))}</dd>
            <dt>${this.localize('names:2262')}</dt>
            <dd class="type">${this.localize('names:2263')}</dd>
            <dd>${unsafeHTML(this.localize('names:2264'))}</dd>
            <dt>${this.localize('names:2265')}</dt>
            <dd>${unsafeHTML(this.localize('names:2266'))}</dd>
            <dt>${this.localize('names:2267')}</dt>
            <dd>${unsafeHTML(this.localize('names:2268'))}</dd>
            <dt>${this.localize('names:2269')}</dt>
            <dd class="type">${this.localize('names:2270')}</dd>
            <dd>${unsafeHTML(this.localize('names:2271'))}</dd>
            <dt>${this.localize('names:2272')}</dt>
            <dd class="type">${this.localize('names:2273')}</dd>
            <dd>${unsafeHTML(this.localize('names:2274'))}</dd>
            <dt>${this.localize('names:2275')}</dt>
            <dd class="type">${this.localize('names:2276')}</dd>
            <dd>${unsafeHTML(this.localize('names:2277'))}</dd>
            <dt>${this.localize('names:2278')}</dt>
            <dd class="type">${this.localize('names:2279')}</dd>
            <dd>${unsafeHTML(this.localize('names:2280'))}</dd>
            <dt>${this.localize('names:2281')}</dt>
            <dd class="type">${this.localize('names:2282')}</dd>
            <dd>${unsafeHTML(this.localize('names:2283'))}</dd>
            <dt>${this.localize('names:2284')}</dt>
            <dd class="type">${this.localize('names:2285')}</dd>
            <dd>${unsafeHTML(this.localize('names:2286'))}</dd>
            <dt>${this.localize('names:2287')}</dt>
            <dd class="type">${this.localize('names:2288')}</dd>
            <dd>${unsafeHTML(this.localize('names:2289'))}</dd>
            <dt>${this.localize('names:2290')}</dt>
            <dd class="type">${this.localize('names:2291')}</dd>
            <dd>${unsafeHTML(this.localize('names:2292'))}</dd>
            <dt>${this.localize('names:2293')}</dt>
            <dd class="type">${this.localize('names:2294')}</dd>
            <dd>${unsafeHTML(this.localize('names:2295'))}</dd>
            <dt>${this.localize('names:2296')}</dt>
            <dd class="type">${this.localize('names:2297')}</dd>
            <dd>${unsafeHTML(this.localize('names:2298'))}</dd>
            <dt>${this.localize('names:2299')}</dt>
            <dd class="type">${this.localize('names:2300')}</dd>
            <dd>${unsafeHTML(this.localize('names:2301'))}</dd>
            <dt>${this.localize('names:2302')}</dt>
            <dd class="type">${this.localize('names:2303')}</dd>
            <dd>${unsafeHTML(this.localize('names:2304'))}</dd>
            <dt>${this.localize('names:2305')}</dt>
            <dd class="type">${this.localize('names:2306')}</dd>
            <dd>${unsafeHTML(this.localize('names:2307'))}</dd>
            <dt>${this.localize('names:2308')}</dt>
            <dd class="type">${this.localize('names:2309')}</dd>
            <dd>${unsafeHTML(this.localize('names:2310'))}</dd>
            <dt>${this.localize('names:2311')}</dt>
            <dd class="type">${this.localize('names:2312')}</dd>
            <dd>${unsafeHTML(this.localize('names:2313'))}</dd>
            <dt>${this.localize('names:2314')}</dt>
            <dd class="type">${this.localize('names:2315')}</dd>
            <dd>${unsafeHTML(this.localize('names:2316'))}</dd>
            <dt>${this.localize('names:2317')}</dt>
            <dd class="type">${this.localize('names:2318')}</dd>
            <dd>${unsafeHTML(this.localize('names:2319'))}</dd>
            <dt>${this.localize('names:2320')}</dt>
            <dd class="type">${this.localize('names:2321')}</dd>
            <dd>${unsafeHTML(this.localize('names:2322'))}</dd>
            <dt>${this.localize('names:2323')}</dt>
            <dd class="type">${this.localize('names:2324')}</dd>
            <dd>${unsafeHTML(this.localize('names:2325'))}</dd>
            <dt>${this.localize('names:2326')}</dt>
            <dd class="type">${this.localize('names:2327')}</dd>
            <dd>${unsafeHTML(this.localize('names:2328'))}</dd>
            <dt id="videha">${this.localize('names:2329')}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:2330'))}</dd>
            <dd>${unsafeHTML(this.localize('names:2331'))}</dd>
            <dt>${this.localize('names:2332')}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:2333'))}</dd>
            <dd>${unsafeHTML(this.localize('names:2334'))}</dd>
            <dt>${this.localize('names:2335')}</dt>
            <dd class="type">${this.localize('names:2336')}</dd>
            <dd>${unsafeHTML(this.localize('names:2337'))}</dd>
            <dt>${this.localize('names:2338')}</dt>
            <dd class="type">${this.localize('names:2339')}</dd>
            <dd>${unsafeHTML(this.localize('names:2340'))}</dd>
            <dt>${this.localize('names:2341')}</dt>
            <dd class="type">${this.localize('names:2342')}</dd>
            <dd>${unsafeHTML(this.localize('names:2343'))}</dd>
            <dt>${this.localize('names:2344')}</dt>
            <dd class="type">${this.localize('names:2345')}</dd>
            <dd>${unsafeHTML(this.localize('names:2346'))}</dd>
            <dt>${this.localize('names:2347')}</dt>
            <dd class="type">${this.localize('names:2348')}</dd>
            <dd>${unsafeHTML(this.localize('names:2349'))}</dd>
            <dt>${this.localize('names:2350')}</dt>
            <dd class="type">${this.localize('names:2351')}</dd>
            <dd>${unsafeHTML(this.localize('names:2352'))}</dd>
            <dt>${this.localize('names:2353')}</dt>
            <dd class="type">${this.localize('names:2354')}</dd>
            <dd>${unsafeHTML(this.localize('names:2355'))}</dd>
            <dt>${this.localize('names:2356')}</dt>
            <dd class="type">${this.localize('names:2357')}</dd>
            <dd>${unsafeHTML(this.localize('names:2358'))}</dd>
            <dt>${this.localize('names:2359')}</dt>
            <dd class="type">${this.localize('names:2360')}</dd>
            <dd>${unsafeHTML(this.localize('names:2361'))}</dd>
            <dt id="visakha1">${this.localize('names:2362')}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:2363'))}</dd>
            <dd>${unsafeHTML(this.localize('names:2364'))}</dd>
            <dt>${this.localize('names:2365')}</dt>
            <dd class="type">${unsafeHTML(this.localize('names:2366'))}</dd>
            <dd>${unsafeHTML(this.localize('names:2367'))}</dd>
            <dt>${this.localize('names:2368')}</dt>
            <dd class="type">${this.localize('names:2369')}</dd>
            <dd>${unsafeHTML(this.localize('names:2370'))}</dd>
            <dt>${this.localize('names:2371')}</dt>
            <dd class="type">${this.localize('names:2372')}</dd>
            <dd>${unsafeHTML(this.localize('names:2373'))}</dd>
            <dt>${this.localize('names:2374')}</dt>
            <dd>${unsafeHTML(this.localize('names:2375'))}</dd>
            <dt>${this.localize('names:2376')}</dt>
            <dd>${unsafeHTML(this.localize('names:2377'))}</dd>
          </dl>
          <h2 id="wxyz">${this.localize('names:2378')}</h2>
          <dl>
            <dt>${this.localize('names:2379')}</dt>
            <dd class="type">${this.localize('names:2380')}</dd>
            <dd>${unsafeHTML(this.localize('names:2381'))}</dd>
            <dt>${this.localize('names:2382')}</dt>
            <dd class="type">${this.localize('names:2383')}</dd>
            <dd>${unsafeHTML(this.localize('names:2384'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:2385'))}</dd>
            <dt>${this.localize('names:2386')}</dt>
            <dd class="type">${this.localize('names:2387')}</dd>
            <dd>${unsafeHTML(this.localize('names:2388'))}</dd>
            <dt>${this.localize('names:2389')}</dt>
            <dd class="type">${this.localize('names:2390')}</dd>
            <dd>${unsafeHTML(this.localize('names:2391'))}</dd>
            <dt>${this.localize('names:2392')}</dt>
            <dd class="type">${this.localize('names:2393')}</dd>
            <dd>${unsafeHTML(this.localize('names:2394'))}</dd>
            <dt>${this.localize('names:2395')}</dt>
            <dd class="type">${this.localize('names:2396')}</dd>
            <dd>${unsafeHTML(this.localize('names:2397'))}</dd>
            <dt>${this.localize('names:2398')}</dt>
            <dd class="type">${this.localize('names:2399')}</dd>
            <dd>${unsafeHTML(this.localize('names:2400'))}</dd>
            <dt>${this.localize('names:2401')}</dt>
            <dd class="type">${this.localize('names:2402')}</dd>
            <dd>${unsafeHTML(this.localize('names:2403'))}</dd>
            <dt>${this.localize('names:2404')}</dt>
            <dd class="type">${this.localize('names:2405')}</dd>
            <dd>${unsafeHTML(this.localize('names:2406'))}</dd>
            <dd class="life-events">${unsafeHTML(this.localize('names:2407'))}</dd>
            <dt>${this.localize('names:2408')}</dt>
            <dd class="type">${this.localize('names:2409')}</dd>
            <dd>${unsafeHTML(this.localize('names:2410'))}</dd>
          </dl>
          <aside class="about-index">
            <p>${unsafeHTML(this.localize('names:2411'))}</p>
            <ul>
              <li>${this.localize('names:2412')}</li>
              <li>${this.localize('names:2413')}</li>
              <li>${this.localize('names:2414')}</li>
              <li>${this.localize('names:2415')}</li>
              <li>${this.localize('names:2416')}</li>
              <li>${unsafeHTML(this.localize('names:2417'))}</li>
            </ul>
            <p>${this.localize('names:2418')}</p>
            <ul>
              <li>${this.localize('names:2419')}</li>
              <li>${this.localize('names:2420')}</li>
              <li>${this.localize('names:2421')}</li>
              <li>${this.localize('names:2422')}</li>
            </ul>
          </aside>
          <aside class="static-copyright">
            <p>${this.localize('names:2423')}</p>
            <blockquote>${unsafeHTML(this.localize('names:2424'))}</blockquote>
            <p>${this.localize('names:2425')}</p>
          </aside>
        </article>
      </main>
    `;
  }

  constructor() {
    super();
    this.localizedStringsPath = '/localization/elements/build/names';
  }
}

customElements.define('sc-static-names', SCStaticNames);
