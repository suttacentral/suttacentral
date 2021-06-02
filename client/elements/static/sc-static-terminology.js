import { html } from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';

import { layoutSimpleStyles } from '../styles/sc-layout-simple-styles';
import { typographyCommonStyles } from '../styles/sc-typography-common-styles';
import { typographyStaticStyles } from '../styles/sc-typography-static-styles';
import { SCStaticPage } from '../addons/sc-static-page';

class SCStaticTerminology extends SCStaticPage {
  render() {
    return html`
      <style>
        ${layoutSimpleStyles}
        ${typographyCommonStyles}
        ${typographyStaticStyles}
      </style>
      <main>
        <article>
          <h1>${this.localize('terminology:1')}</h1>
          <nav class="contents">
            <ul class="entry-list">
              <li>${unsafeHTML(this.localize('terminology:2'))}</li>
              <li>${unsafeHTML(this.localize('terminology:3'))}</li>
              <li>${unsafeHTML(this.localize('terminology:4'))}</li>
              <li>${unsafeHTML(this.localize('terminology:5'))}</li>
              <li>${unsafeHTML(this.localize('terminology:6'))}</li>
              <li>${unsafeHTML(this.localize('terminology:7'))}</li>
              <li>${unsafeHTML(this.localize('terminology:8'))}</li>
              <li>${unsafeHTML(this.localize('terminology:9'))}</li>
              <li>${unsafeHTML(this.localize('terminology:10'))}</li>
              <li>${unsafeHTML(this.localize('terminology:11'))}</li>
              <li>${unsafeHTML(this.localize('terminology:12'))}</li>
              <li>${unsafeHTML(this.localize('terminology:13'))}</li>
              <li>${unsafeHTML(this.localize('terminology:14'))}</li>
              <li>${unsafeHTML(this.localize('terminology:15'))}</li>
              <li>${unsafeHTML(this.localize('terminology:16'))}</li>
              <li>${unsafeHTML(this.localize('terminology:17'))}</li>
              <li>${unsafeHTML(this.localize('terminology:18'))}</li>
              <li>${unsafeHTML(this.localize('terminology:19'))}</li>
              <li>${unsafeHTML(this.localize('terminology:20'))}</li>
              <li>${unsafeHTML(this.localize('terminology:21'))}</li>
              <li>${unsafeHTML(this.localize('terminology:22'))}</li>
              <li>${unsafeHTML(this.localize('terminology:23'))}</li>
            </ul>
          </nav>
          <h2 id="a">${this.localize('terminology:24')}</h2>
          <dl>
            <dt id="abhidhamma">${this.localize('terminology:25')}</dt>
            <dd>
              <ol>
                <li>${this.localize('terminology:26')}</li>
                <li>${this.localize('terminology:27')}</li>
              </ol>
            </dd>
            <dt id="abhinna">${this.localize('terminology:28')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:29'))}</dd>
            <dt id="acariya">${this.localize('terminology:30')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:31'))}</dd>
            <dt id="adhitthana">${this.localize('terminology:32')}</dt>
            <dd>${this.localize('terminology:33')}</dd>
            <dt id="akaliko">${this.localize('terminology:34')}</dt>
            <dd>${this.localize('terminology:35')}</dd>
            <dt id="akusala">${this.localize('terminology:36')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:37'))}</dd>
            <dt id="anagami">${this.localize('terminology:38')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:39'))}</dd>
            <dt id="anapanasati">${this.localize('terminology:40')}</dt>
            <dd>${this.localize('terminology:41')}</dd>
            <dt id="anatta">${this.localize('terminology:42')}</dt>
            <dd>${this.localize('terminology:43')}</dd>
            <dt id="anicca">${this.localize('terminology:44')}</dt>
            <dd>${this.localize('terminology:45')}</dd>
            <dt id="anupadisesa-nibbana">${this.localize('terminology:46')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:47'))}</dd>
            <dt id="anupubbi">${this.localize('terminology:48')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:49'))}</dd>
            <dt id="anusaya">${this.localize('terminology:50')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:51'))}</dd>
            <dt id="apaya-bhumi">${this.localize('terminology:52')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:53'))}</dd>
            <dt id="appamada">${this.localize('terminology:54')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:55'))}</dd>
            <dt id="arahant">${this.localize('terminology:56')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:57'))}</dd>
            <dt id="arammana">${this.localize('terminology:58')}</dt>
            <dd>${this.localize('terminology:59')}</dd>
            <dt id="ariya">${this.localize('terminology:60')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:61'))}</dd>
            <dt id="ariyadhana">${this.localize('terminology:62')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:63'))}</dd>
            <dt id="ariya-puggala">${this.localize('terminology:64')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:65'))}</dd>
            <dt id="ariya-sacca">${this.localize('terminology:66')}</dt>
            <dd>${this.localize('terminology:67')}</dd>
            <dt id="asava">${this.localize('terminology:68')}</dt>
            <dd>${this.localize('terminology:69')}</dd>
            <dt id="asubha">${this.localize('terminology:70')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:71'))}</dd>
            <dt id="asura">${this.localize('terminology:72')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:73'))}</dd>
            <dt id="avijja">${this.localize('terminology:74')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:75'))}</dd>
            <dt id="ayatana">${this.localize('terminology:76')}</dt>
            <dd>${this.localize('terminology:77')}</dd>
          </dl>
          <h2 id="b">${this.localize('terminology:78')}</h2>
          <dl>
            <dt id="bhante">${this.localize('terminology:79')}</dt>
            <dd>${this.localize('terminology:80')}</dd>
            <dt id="bhava">${this.localize('terminology:81')}</dt>
            <dd>${this.localize('terminology:82')}</dd>
            <dt id="bhavana">${this.localize('terminology:83')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:84'))}</dd>
            <dt id="bhikkhu">${this.localize('terminology:85')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:86'))}</dd>
            <dt id="bhikkhuni">${this.localize('terminology:87')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:88'))}</dd>
            <dt id="bodhi-pakkhiya-dhamma">${this.localize('terminology:89')}</dt>
            <dd>
              ${this.localize('terminology:90')}
              <ol>
                <li>${unsafeHTML(this.localize('terminology:91'))}</li>
                <li>${unsafeHTML(this.localize('terminology:92'))}</li>
                <li>${unsafeHTML(this.localize('terminology:93'))}</li>
                <li>${unsafeHTML(this.localize('terminology:94'))}</li>
                <li>${unsafeHTML(this.localize('terminology:95'))}</li>
                <li>${unsafeHTML(this.localize('terminology:96'))}</li>
                <li>${unsafeHTML(this.localize('terminology:97'))}</li>
              </ol>
            </dd>
            <dt id="bodhisatta">${this.localize('terminology:98')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:99'))}</dd>
            <dt id="brahma">${this.localize('terminology:100')}</dt>
            <dd>${this.localize('terminology:101')}</dd>
            <dt id="brahma-vihara">${this.localize('terminology:102')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:103'))}</dd>
            <dt id="brahman">${unsafeHTML(this.localize('terminology:104'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:105'))}</dd>
            <dt id="buddha">${this.localize('terminology:106')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:107'))}</dd>
          </dl>
          <h2 id="c">${this.localize('terminology:108')}</h2>
          <dl>
            <dt id="cankama">${this.localize('terminology:109')}</dt>
            <dd>${this.localize('terminology:110')}</dd>
            <dt id="cetasika">${this.localize('terminology:111')}</dt>
            <dd>${this.localize('terminology:112')}</dd>
            <dt>${this.localize('terminology:113')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:114'))}</dd>
            <dt id="citta">${this.localize('terminology:115')}</dt>
            <dd>${this.localize('terminology:116')}</dd>
          </dl>
          <h2 id="d">${this.localize('terminology:117')}</h2>
          <dl>
            <dt id="dana">${this.localize('terminology:118')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:119'))}</dd>
            <dt>${this.localize('terminology:120')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:121'))}</dd>
            <dt id="deva">${this.localize('terminology:122')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:123'))}</dd>
            <dt id="devadatta">${this.localize('terminology:124')}</dt>
            <dd>${this.localize('terminology:125')}</dd>
            <dt id="dhamma">${this.localize('terminology:126')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:127'))}</dd>
            <dt id="dhamma-vinaya">${this.localize('terminology:128')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:129'))}</dd>
            <dt id="dhana">${this.localize('terminology:130')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:131'))}</dd>
            <dt id="dhatu">${this.localize('terminology:132')}</dt>
            <dd>${this.localize('terminology:133')}</dd>
            <dt id="dhutanga">${this.localize('terminology:134')}</dt>
            <dd>
              ${this.localize('terminology:135')}
              <ol>
                <li>${this.localize('terminology:136')}</li>
                <li>${this.localize('terminology:137')}</li>
                <li>${this.localize('terminology:138')}</li>
                <li>${this.localize('terminology:139')}</li>
                <li>${this.localize('terminology:140')}</li>
                <li>${this.localize('terminology:141')}</li>
                <li>${this.localize('terminology:142')}</li>
                <li>${this.localize('terminology:143')}</li>
                <li>${this.localize('terminology:144')}</li>
                <li>${this.localize('terminology:145')}</li>
                <li>${this.localize('terminology:146')}</li>
                <li>${this.localize('terminology:147')}</li>
                <li>${this.localize('terminology:148')}</li>
              </ol>
            </dd>
            <dt id="dosa">${this.localize('terminology:149')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:150'))}</dd>
            <dt id="dukkha">${this.localize('terminology:151')}</dt>
            <dd>${this.localize('terminology:152')}</dd>
          </dl>
          <h2 id="e">${this.localize('terminology:153')}</h2>
          <dl>
            <dt id="ekaggatarammana">${this.localize('terminology:154')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:155'))}</dd>
            <dt id="ekayana">${this.localize('terminology:156')}</dt>
            <dd>${this.localize('terminology:157')}</dd>
          </dl>
          <h2 id="f">${this.localize('terminology:158')}</h2>
          <dl>
            <dt>${this.localize('terminology:159')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:160'))}</dd>
            <dt id="frame">${this.localize('terminology:161')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:160'))}</dd>
          </dl>
          <h2 id="g">${this.localize('terminology:162')}</h2>
          <dl>
            <dt id="gotarabhu">${this.localize('terminology:163')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:164'))}</dd>
          </dl>
          <h2 id="h">${this.localize('terminology:165')}</h2>
          <dl>
            <dt id="hiri-ottappa">${this.localize('terminology:166')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:167'))}</dd>
          </dl>
          <h2 id="i">${this.localize('terminology:168')}</h2>
          <dl>
            <dt id="idappaccayata">${this.localize('terminology:169')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:170'))}</dd>
            <dt id="indriya">${this.localize('terminology:171')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:172'))}</dd>
          </dl>
          <h2 id="j">${this.localize('terminology:173')}</h2>
          <dl>
            <dt id="jhana">${this.localize('terminology:174')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:175'))}</dd>
          </dl>
          <h2 id="k">${this.localize('terminology:176')}</h2>
          <dl>
            <dt id="kalyanamitta">${this.localize('terminology:177')}</dt>
            <dd>${this.localize('terminology:178')}</dd>
            <dt id="kamaguna">${this.localize('terminology:179')}</dt>
            <dd>${this.localize('terminology:180')}</dd>
            <dt id="kamma">${this.localize('terminology:181')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:182'))}</dd>
            <dt id="karuna">${this.localize('terminology:183')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:184'))}</dd>
            <dt id="kathina">${this.localize('terminology:185')}</dt>
            <dd>${this.localize('terminology:186')}</dd>
            <dt id="kaya">${this.localize('terminology:187')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:188'))}</dd>
            <dt id="kayagata-sati">${this.localize('terminology:189')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:190'))}</dd>
            <dt id="khandha">${this.localize('terminology:191')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:192'))}</dd>
            <dt id="khanti">${this.localize('terminology:193')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:194'))}</dd>
            <dt id="kilesa">${this.localize('terminology:195')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:196'))}</dd>
            <dt id="kusala">${this.localize('terminology:197')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:198'))}</dd>
          </dl>
          <h2 id="l">${this.localize('terminology:199')}</h2>
          <dl>
            <dt id="lakkhana">${this.localize('terminology:200')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:201'))}</dd>
            <dt id="lobha">${this.localize('terminology:202')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:203'))}</dd>
            <dt id="loka-dhamma">${this.localize('terminology:204')}</dt>
            <dd>${this.localize('terminology:205')}</dd>
            <dt id="lokavidu">${this.localize('terminology:206')}</dt>
            <dd>${this.localize('terminology:207')}</dd>
            <dt id="lokuttara">${this.localize('terminology:208')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:209'))}</dd>
          </dl>
          <h2 id="m">${this.localize('terminology:210')}</h2>
          <dl>
            <dt id="magga">${this.localize('terminology:211')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:212'))}</dd>
            <dt id="majjhima">${this.localize('terminology:213')}</dt>
            <dd>${this.localize('terminology:214')}</dd>
            <dt id="mara">${this.localize('terminology:215')}</dt>
            <dd>${this.localize('terminology:216')}</dd>
            <dt id="metta">${this.localize('terminology:217')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:218'))}</dd>
            <dt id="moha">${this.localize('terminology:219')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:220'))}</dd>
            <dt id="mudita">${this.localize('terminology:221')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:222'))}</dd>
            <dt id="mula">${this.localize('terminology:223')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:224'))}</dd>
          </dl>
          <h2 id="n">${this.localize('terminology:225')}</h2>
          <dl>
            <dt id="naga">${this.localize('terminology:226')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:227'))}</dd>
            <dt id="nama">${this.localize('terminology:228')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:229'))}</dd>
            <dt id="nama-rupa">${this.localize('terminology:230')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:231'))}</dd>
            <dt id="nekkhamma">${this.localize('terminology:232')}</dt>
            <dd>${this.localize('terminology:233')}</dd>
            <dt id="nibbana">${this.localize('terminology:234')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:235'))}</dd>
            <dt id="nibbida">${this.localize('terminology:236')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:237'))}</dd>
            <dt id="nimitta">${this.localize('terminology:238')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:239'))}</dd>
            <dt id="nirodha">${this.localize('terminology:240')}</dt>
            <dd>${this.localize('terminology:241')}</dd>
            <dt id="nivarana">${this.localize('terminology:242')}</dt>
            <dd>${this.localize('terminology:243')}</dd>
          </dl>
          <h2 id="o">${this.localize('terminology:244')}</h2>
          <dl>
            <dt id="opanayiko">${this.localize('terminology:245')}</dt>
            <dd>${this.localize('terminology:246')}</dd>
          </dl>
          <h2 id="pq">${this.localize('terminology:247')}</h2>
          <dl>
            <dt id="pabbajja">${this.localize('terminology:248')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:249'))}</dd>
            <dt id="paccattam">${this.localize('terminology:250')}</dt>
            <dd>${this.localize('terminology:251')}</dd>
            <dt id="pacceka">${this.localize('terminology:252')}</dt>
            <dd>${this.localize('terminology:253')}</dd>
            <dt id="panna">${this.localize('terminology:254')}</dt>
            <dd>${this.localize('terminology:255')}</dd>
            <dt>${this.localize('terminology:256')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:114'))}</dd>
            <dt id="papanca">${this.localize('terminology:257')}</dt>
            <dd>${this.localize('terminology:258')}</dd>
            <dt id="parami">${this.localize('terminology:259')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:260'))}</dd>
            <dt id="parinibbana">${this.localize('terminology:261')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:262'))}</dd>
            <dt id="parisa">${this.localize('terminology:263')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:264'))}</dd>
            <dt id="pariyatti">${this.localize('terminology:265')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:266'))}</dd>
            <dt id="ps">${this.localize('terminology:267')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:268'))}</dd>
            <dt id="patimokkha">${this.localize('terminology:269')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:270'))}</dd>
            <dt id="patipada">${this.localize('terminology:271')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:272'))}</dd>
            <dt id="patipatti">${this.localize('terminology:273')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:274'))}</dd>
            <dt id="pativedha">${this.localize('terminology:275')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:276'))}</dd>
            <dt id="peta">${this.localize('terminology:277')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:278'))}</dd>
            <dt id="phala">${this.localize('terminology:279')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:280'))}</dd>
            <dt id="piti">${this.localize('terminology:281')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:282'))}</dd>
            <dt id="puja">${this.localize('terminology:283')}</dt>
            <dd>${this.localize('terminology:284')}</dd>
            <dt id="punna">${this.localize('terminology:285')}</dt>
            <dd>${this.localize('terminology:286')}</dd>
            <dt id="puthujjana">${this.localize('terminology:287')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:288'))}</dd>
          </dl>
          <h2 id="r">${this.localize('terminology:289')}</h2>
          <dl>
            <dt id="raga">${this.localize('terminology:290')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:291'))}</dd>
            <dt id="rupa">${this.localize('terminology:292')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:293'))}</dd>
          </dl>
          <h2 id="s">${this.localize('terminology:294')}</h2>
          <dl>
            <dt id="sacca">${this.localize('terminology:295')}</dt>
            <dd>${this.localize('terminology:296')}</dd>
            <dt id="saddha">${this.localize('terminology:297')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:298'))}</dd>
            <dt id="sadhu">${this.localize('terminology:299')}</dt>
            <dd>${this.localize('terminology:300')}</dd>
            <dt id="sagga">${this.localize('terminology:301')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:302'))}</dd>
            <dt id="sakadagami">${this.localize('terminology:303')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:304'))}</dd>
            <dt id="sakkaya-ditthi">${this.localize('terminology:305')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:306'))}</dd>
            <dt id="sakyamuni">${this.localize('terminology:307')}</dt>
            <dd>${this.localize('terminology:308')}</dd>
            <dt id="sakya-putta">${this.localize('terminology:309')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:310'))}</dd>
            <dt id="sallekha-dhamma">${this.localize('terminology:311')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:312'))}</dd>
            <dt id="samadhi">${this.localize('terminology:313')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:314'))}</dd>
            <dt id="samana">${this.localize('terminology:315')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:316'))}</dd>
            <dt>${unsafeHTML(this.localize('terminology:317'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:318'))}</dd>
            <dt id="sambhavesin">${this.localize('terminology:319')}</dt>
            <dd>${this.localize('terminology:320')}</dd>
            <dt id="sammuti">${this.localize('terminology:321')}</dt>
            <dd>${this.localize('terminology:322')}</dd>
            <dt id="sampajanna">${this.localize('terminology:323')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:324'))}</dd>
            <dt id="samsara">${this.localize('terminology:325')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:326'))}</dd>
            <dt id="samvega">${this.localize('terminology:327')}</dt>
            <dd>${this.localize('terminology:328')}</dd>
            <dt id="samyojana">${this.localize('terminology:329')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:330'))}</dd>
            <dt id="sanditthiko">${this.localize('terminology:331')}</dt>
            <dd>${this.localize('terminology:332')}</dd>
            <dt id="sangha">${this.localize('terminology:333')}</dt>
            <dd>
              ${this.localize('terminology:334')}
              <ul>
                <li>${this.localize('terminology:335')}</li>
                <li>${unsafeHTML(this.localize('terminology:336'))}</li>
              </ul>
              ${this.localize('terminology:337')}
              <a href="#parisa">${unsafeHTML(this.localize('terminology:338'))}</a>
              ${this.localize('terminology:339')}
            </dd>
            <dt id="sankhara">${this.localize('terminology:340')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:341'))}</dd>
            <dt id="sanna">${this.localize('terminology:342')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:343'))}</dd>
            <dt id="sanyojana">${this.localize('terminology:344')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:345'))}</dd>
            <dt id="sasana">${this.localize('terminology:346')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:347'))}</dd>
            <dt id="sati">${this.localize('terminology:348')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:349'))}</dd>
            <dt id="satipatthana">${this.localize('terminology:350')}</dt>
            <dd>${this.localize('terminology:351')}</dd>
            <dt id="sa-upadisesa-nibbana">${this.localize('terminology:352')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:353'))}</dd>
            <dt id="savaka">${this.localize('terminology:354')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:355'))}</dd>
            <dt id="sekha">${this.localize('terminology:356')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:357'))}</dd>
            <dt id="sila">${this.localize('terminology:358')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:359'))}</dd>
            <dt id="sima">${this.localize('terminology:360')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:361'))}</dd>
            <dt id="sotapanna">${this.localize('terminology:362')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:363'))}</dd>
            <dt>${this.localize('terminology:364')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:365'))}</dd>
            <dt>${this.localize('terminology:366')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:367'))}</dd>
            <dt id="stupa">${unsafeHTML(this.localize('terminology:368'))}</dt>
            <dd>${this.localize('terminology:369')}</dd>
            <dt id="sugati">${this.localize('terminology:370')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:371'))}</dd>
            <dt id="sugato">${this.localize('terminology:372')}</dt>
            <dd>${this.localize('terminology:373')}</dd>
            <dt id="sukha">${this.localize('terminology:374')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:375'))}</dd>
            <dt id="sutta">${this.localize('terminology:376')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:377'))}</dd>
          </dl>
          <h2 id="t">${this.localize('terminology:378')}</h2>
          <dl>
            <dt id="tanha">${this.localize('terminology:379')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:380'))}</dd>
            <dt id="tapas">${this.localize('terminology:381')}</dt>
            <dd>${this.localize('terminology:382')}</dd>
            <dt id="tathagata">${this.localize('terminology:383')}</dt>
            <dd>${this.localize('terminology:384')}</dd>
            <dt id="ti-lakkhana">${this.localize('terminology:385')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:386'))}</dd>
            <dt id="tipitaka">${this.localize('terminology:387')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:388'))}</dd>
            <dt id="tiratana">${this.localize('terminology:389')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:390'))}</dd>
            <dt id="tisarana">${this.localize('terminology:391')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:392'))}</dd>
          </dl>
          <h2 id="u">${this.localize('terminology:393')}</h2>
          <dl>
            <dt id="ugghatitannu">${this.localize('terminology:394')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:395'))}</dd>
            <dt id="upadana">${this.localize('terminology:396')}</dt>
            <dd>${this.localize('terminology:397')}</dd>
            <dt id="upasampada">${this.localize('terminology:398')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:399'))}</dd>
            <dt id="upasika">${this.localize('terminology:400')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:401'))}</dd>
            <dt id="upekkha">${this.localize('terminology:402')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:403'))}</dd>
            <dt id="uposatha">${this.localize('terminology:404')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:405'))}</dd>
          </dl>
          <h2 id="v">${this.localize('terminology:406')}</h2>
          <dl>
            <dt id="vassa">${this.localize('terminology:407')}</dt>
            <dd>${this.localize('terminology:408')}</dd>
            <dt id="vatta">${this.localize('terminology:409')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:410'))}</dd>
            <dt id="vedana">${this.localize('terminology:411')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:412'))}</dd>
            <dt id="vesak">${this.localize('terminology:413')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:414'))}</dd>
            <dt id="vicara">${this.localize('terminology:415')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:416'))}</dd>
            <dt id="vijja">${this.localize('terminology:417')}</dt>
            <dd>${this.localize('terminology:418')}</dd>
            <dt id="vijja-carana">${this.localize('terminology:419')}</dt>
            <dd>${this.localize('terminology:420')}</dd>
            <dt id="vimutti">${this.localize('terminology:421')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:422'))}</dd>
            <dt id="vinaya">${this.localize('terminology:423')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:424'))}</dd>
            <dt id="vinnana">${this.localize('terminology:425')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:426'))}</dd>
            <dt id="vipaka">${this.localize('terminology:427')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:428'))}</dd>
            <dt id="vipassana">${this.localize('terminology:429')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:430'))}</dd>
            <dt id="viriya">${this.localize('terminology:431')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:432'))}</dd>
            <dt id="vitakka">${this.localize('terminology:433')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:434'))}</dd>
          </dl>
          <h2 id="wxyz">${this.localize('terminology:435')}</h2>
          <dl>
            <dt id="yakkha">${this.localize('terminology:436')}</dt>
            <dd>${this.localize('terminology:437')}</dd>
          </dl>
          <aside class="about-index">
            <p>${unsafeHTML(this.localize('terminology:438'))}</p>
            <ul>
              <li>${this.localize('terminology:439')}</li>
              <li>${this.localize('terminology:440')}</li>
              <li>${this.localize('terminology:441')}</li>
            </ul>
            <p>${this.localize('terminology:442')}</p>
            <ul>
              <li>${this.localize('terminology:443')}</li>
              <li>${this.localize('terminology:444')}</li>
            </ul>
          </aside>
          <aside class="static-copyright">
            <p>${this.localize('terminology:445')}</p>
            <blockquote>${unsafeHTML(this.localize('terminology:446'))}</blockquote>
            <p>${this.localize('terminology:447')}</p>
          </aside>
        </article>
      </main>
    `;
  }

  constructor() {
    super();
    this.localizedStringsPath = '/localization/elements/terminology';
  }
}

customElements.define('sc-static-terminology', SCStaticTerminology);
