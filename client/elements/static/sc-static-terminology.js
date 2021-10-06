import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

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
              <li>${unsafeHTML(this.localize('terminology:24'))}</li>
              <li>${unsafeHTML(this.localize('terminology:25'))}</li>
              <li>${unsafeHTML(this.localize('terminology:26'))}</li>
              <li>${unsafeHTML(this.localize('terminology:27'))}</li>
              <li>${unsafeHTML(this.localize('terminology:28'))}</li>
              <li>${unsafeHTML(this.localize('terminology:29'))}</li>
              <li>${unsafeHTML(this.localize('terminology:30'))}</li>
            </ul>
          </nav>
          <h2 id="a">${this.localize('terminology:31')}</h2>
          <dl>
            <dt id="abhidhamma">${this.localize('terminology:32')}</dt>
            <dd>
              <ol>
                <li>${this.localize('terminology:33')}</li>
                <li>${this.localize('terminology:34')}</li>
              </ol>
            </dd>
            <dt id="abhinna">${this.localize('terminology:35')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:36'))}</dd>
            <dt id="acariya">${this.localize('terminology:37')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:38'))}</dd>
            <dt id="adhitthana">${this.localize('terminology:39')}</dt>
            <dd>${this.localize('terminology:40')}</dd>
            <dt id="akaliko">${this.localize('terminology:41')}</dt>
            <dd>${this.localize('terminology:42')}</dd>
            <dt id="akusala">${this.localize('terminology:43')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:44'))}</dd>
            <dt id="anagami">${this.localize('terminology:45')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:46'))}</dd>
            <dt id="anapanasati">${this.localize('terminology:47')}</dt>
            <dd>${this.localize('terminology:48')}</dd>
            <dt id="anatta">${this.localize('terminology:49')}</dt>
            <dd>${this.localize('terminology:50')}</dd>
            <dt id="anicca">${this.localize('terminology:51')}</dt>
            <dd>${this.localize('terminology:52')}</dd>
            <dt id="anupadisesa-nibbana">${this.localize('terminology:53')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:54'))}</dd>
            <dt id="anupubbi">${this.localize('terminology:55')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:56'))}</dd>
            <dt id="anusaya">${this.localize('terminology:57')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:58'))}</dd>
            <dt id="apaya-bhumi">${this.localize('terminology:59')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:60'))}</dd>
            <dt id="appamada">${this.localize('terminology:61')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:62'))}</dd>
            <dt id="arahant">${this.localize('terminology:63')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:64'))}</dd>
            <dt id="arammana">${this.localize('terminology:65')}</dt>
            <dd>${this.localize('terminology:66')}</dd>
            <dt id="ariya">${this.localize('terminology:67')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:68'))}</dd>
            <dt id="ariyadhana">${this.localize('terminology:69')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:70'))}</dd>
            <dt id="ariya-puggala">${this.localize('terminology:71')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:72'))}</dd>
            <dt id="ariya-sacca">${this.localize('terminology:73')}</dt>
            <dd>${this.localize('terminology:74')}</dd>
            <dt id="asava">${this.localize('terminology:75')}</dt>
            <dd>${this.localize('terminology:76')}</dd>
            <dt id="asubha">${this.localize('terminology:77')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:78'))}</dd>
            <dt id="asura">${this.localize('terminology:79')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:80'))}</dd>
            <dt id="avijja">${this.localize('terminology:81')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:82'))}</dd>
            <dt id="ayatana">${this.localize('terminology:83')}</dt>
            <dd>${this.localize('terminology:84')}</dd>
          </dl>
          <h2 id="b">${this.localize('terminology:85')}</h2>
          <dl>
            <dt id="bhante">${this.localize('terminology:86')}</dt>
            <dd>${this.localize('terminology:87')}</dd>
            <dt id="bhava">${this.localize('terminology:88')}</dt>
            <dd>${this.localize('terminology:89')}</dd>
            <dt id="bhavana">${this.localize('terminology:90')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:91'))}</dd>
            <dt id="bhikkhu">${this.localize('terminology:92')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:93'))}</dd>
            <dt id="bhikkhuni">${this.localize('terminology:94')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:95'))}</dd>
            <dt id="bodhi-pakkhiya-dhamma">${this.localize('terminology:96')}</dt>
            <dd>
              ${this.localize('terminology:97')}
              <ol>
                <li>${unsafeHTML(this.localize('terminology:98'))}</li>
                <li>${unsafeHTML(this.localize('terminology:99'))}</li>
                <li>${unsafeHTML(this.localize('terminology:100'))}</li>
                <li>${unsafeHTML(this.localize('terminology:101'))}</li>
                <li>${unsafeHTML(this.localize('terminology:102'))}</li>
                <li>${unsafeHTML(this.localize('terminology:103'))}</li>
                <li>${unsafeHTML(this.localize('terminology:104'))}</li>
              </ol>
            </dd>
            <dt id="bodhisatta">${this.localize('terminology:105')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:106'))}</dd>
            <dt id="brahma">${this.localize('terminology:107')}</dt>
            <dd>${this.localize('terminology:108')}</dd>
            <dt id="brahma-vihara">${this.localize('terminology:109')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:110'))}</dd>
            <dt id="brahman">${unsafeHTML(this.localize('terminology:111'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:112'))}</dd>
            <dt id="buddha">${this.localize('terminology:113')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:114'))}</dd>
          </dl>
          <h2 id="c">${this.localize('terminology:115')}</h2>
          <dl>
            <dt id="cankama">${this.localize('terminology:116')}</dt>
            <dd>${this.localize('terminology:117')}</dd>
            <dt id="cetasika">${this.localize('terminology:118')}</dt>
            <dd>${this.localize('terminology:119')}</dd>
            <dt>${this.localize('terminology:120')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:121'))}</dd>
            <dt id="citta">${this.localize('terminology:122')}</dt>
            <dd>${this.localize('terminology:123')}</dd>
          </dl>
          <h2 id="d">${this.localize('terminology:124')}</h2>
          <dl>
            <dt id="dana">${this.localize('terminology:125')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:126'))}</dd>
            <dt>${this.localize('terminology:127')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:128'))}</dd>
            <dt id="deva">${this.localize('terminology:129')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:130'))}</dd>
            <dt id="devadatta">${this.localize('terminology:131')}</dt>
            <dd>${this.localize('terminology:132')}</dd>
            <dt id="dhamma">${this.localize('terminology:133')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:134'))}</dd>
            <dt id="dhamma-vinaya">${this.localize('terminology:135')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:136'))}</dd>
            <dt id="dhana">${this.localize('terminology:137')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:138'))}</dd>
            <dt id="dhatu">${this.localize('terminology:139')}</dt>
            <dd>${this.localize('terminology:140')}</dd>
            <dt id="dhutanga">${this.localize('terminology:141')}</dt>
            <dd>
              ${this.localize('terminology:142')}
              <ol>
                <li>${this.localize('terminology:143')}</li>
                <li>${this.localize('terminology:144')}</li>
                <li>${this.localize('terminology:145')}</li>
                <li>${this.localize('terminology:146')}</li>
                <li>${this.localize('terminology:147')}</li>
                <li>${this.localize('terminology:148')}</li>
                <li>${this.localize('terminology:149')}</li>
                <li>${this.localize('terminology:150')}</li>
                <li>${this.localize('terminology:151')}</li>
                <li>${this.localize('terminology:152')}</li>
                <li>${this.localize('terminology:153')}</li>
                <li>${this.localize('terminology:154')}</li>
                <li>${this.localize('terminology:155')}</li>
              </ol>
            </dd>
            <dt id="dosa">${this.localize('terminology:156')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:157'))}</dd>
            <dt id="dukkha">${this.localize('terminology:158')}</dt>
            <dd>${this.localize('terminology:159')}</dd>
          </dl>
          <h2 id="e">${this.localize('terminology:160')}</h2>
          <dl>
            <dt id="ekaggatarammana">${this.localize('terminology:161')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:162'))}</dd>
            <dt id="ekayana">${this.localize('terminology:163')}</dt>
            <dd>${this.localize('terminology:164')}</dd>
          </dl>
          <h2 id="f">${this.localize('terminology:165')}</h2>
          <dl>
            <dt>${this.localize('terminology:166')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:167'))}</dd>
            <dt id="frame">${this.localize('terminology:168')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:167'))}</dd>
          </dl>
          <h2 id="g">${this.localize('terminology:169')}</h2>
          <dl>
            <dt id="gotarabhu">${this.localize('terminology:170')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:171'))}</dd>
          </dl>
          <h2 id="h">${this.localize('terminology:172')}</h2>
          <dl>
            <dt id="hiri-ottappa">${this.localize('terminology:173')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:174'))}</dd>
          </dl>
          <h2 id="i">${this.localize('terminology:175')}</h2>
          <dl>
            <dt id="idappaccayata">${this.localize('terminology:176')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:177'))}</dd>
            <dt id="indriya">${this.localize('terminology:178')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:179'))}</dd>
          </dl>
          <h2 id="j">${this.localize('terminology:180')}</h2>
          <dl>
            <dt id="jhana">${this.localize('terminology:181')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:182'))}</dd>
          </dl>
          <h2 id="k">${this.localize('terminology:183')}</h2>
          <dl>
            <dt id="kalyanamitta">${this.localize('terminology:184')}</dt>
            <dd>${this.localize('terminology:185')}</dd>
            <dt id="kamaguna">${this.localize('terminology:186')}</dt>
            <dd>${this.localize('terminology:187')}</dd>
            <dt id="kamma">${this.localize('terminology:188')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:189'))}</dd>
            <dt id="karuna">${this.localize('terminology:190')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:191'))}</dd>
            <dt id="kathina">${this.localize('terminology:192')}</dt>
            <dd>${this.localize('terminology:193')}</dd>
            <dt id="kaya">${this.localize('terminology:194')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:195'))}</dd>
            <dt id="kayagata-sati">${this.localize('terminology:196')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:197'))}</dd>
            <dt id="khandha">${this.localize('terminology:198')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:199'))}</dd>
            <dt id="khanti">${this.localize('terminology:200')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:201'))}</dd>
            <dt id="kilesa">${this.localize('terminology:202')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:203'))}</dd>
            <dt id="kusala">${this.localize('terminology:204')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:205'))}</dd>
          </dl>
          <h2 id="l">${this.localize('terminology:206')}</h2>
          <dl>
            <dt id="lakkhana">${this.localize('terminology:207')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:208'))}</dd>
            <dt id="lobha">${this.localize('terminology:209')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:210'))}</dd>
            <dt id="loka-dhamma">${this.localize('terminology:211')}</dt>
            <dd>${this.localize('terminology:212')}</dd>
            <dt id="lokavidu">${this.localize('terminology:213')}</dt>
            <dd>${this.localize('terminology:214')}</dd>
            <dt id="lokuttara">${this.localize('terminology:215')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:216'))}</dd>
          </dl>
          <h2 id="m">${this.localize('terminology:217')}</h2>
          <dl>
            <dt id="magga">${this.localize('terminology:218')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:219'))}</dd>
            <dt id="majjhima">${this.localize('terminology:220')}</dt>
            <dd>${this.localize('terminology:221')}</dd>
            <dt id="mara">${this.localize('terminology:222')}</dt>
            <dd>${this.localize('terminology:223')}</dd>
            <dt id="metta">${this.localize('terminology:224')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:225'))}</dd>
            <dt id="moha">${this.localize('terminology:226')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:227'))}</dd>
            <dt id="mudita">${this.localize('terminology:228')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:229'))}</dd>
            <dt id="mula">${this.localize('terminology:230')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:231'))}</dd>
          </dl>
          <h2 id="n">${this.localize('terminology:232')}</h2>
          <dl>
            <dt id="naga">${this.localize('terminology:233')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:234'))}</dd>
            <dt id="nama">${this.localize('terminology:235')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:236'))}</dd>
            <dt id="nama-rupa">${this.localize('terminology:237')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:238'))}</dd>
            <dt id="nekkhamma">${this.localize('terminology:239')}</dt>
            <dd>${this.localize('terminology:240')}</dd>
            <dt id="nibbana">${this.localize('terminology:241')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:242'))}</dd>
            <dt id="nibbida">${this.localize('terminology:243')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:244'))}</dd>
            <dt id="nimitta">${this.localize('terminology:245')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:246'))}</dd>
            <dt id="nirodha">${this.localize('terminology:247')}</dt>
            <dd>${this.localize('terminology:248')}</dd>
            <dt id="nivarana">${this.localize('terminology:249')}</dt>
            <dd>${this.localize('terminology:250')}</dd>
          </dl>
          <h2 id="o">${this.localize('terminology:251')}</h2>
          <dl>
            <dt id="opanayiko">${this.localize('terminology:252')}</dt>
            <dd>${this.localize('terminology:253')}</dd>
          </dl>
          <h2 id="pq">${this.localize('terminology:254')}</h2>
          <dl>
            <dt id="pabbajja">${this.localize('terminology:255')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:256'))}</dd>
            <dt id="paccattam">${this.localize('terminology:257')}</dt>
            <dd>${this.localize('terminology:258')}</dd>
            <dt id="pacceka">${this.localize('terminology:259')}</dt>
            <dd>${this.localize('terminology:260')}</dd>
            <dt id="panna">${this.localize('terminology:261')}</dt>
            <dd>${this.localize('terminology:262')}</dd>
            <dt>${this.localize('terminology:263')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:121'))}</dd>
            <dt id="papanca">${this.localize('terminology:264')}</dt>
            <dd>${this.localize('terminology:265')}</dd>
            <dt id="parami">${this.localize('terminology:266')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:267'))}</dd>
            <dt id="parinibbana">${this.localize('terminology:268')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:269'))}</dd>
            <dt id="parisa">${this.localize('terminology:270')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:271'))}</dd>
            <dt id="pariyatti">${this.localize('terminology:272')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:273'))}</dd>
            <dt id="ps">${this.localize('terminology:274')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:275'))}</dd>
            <dt id="patimokkha">${this.localize('terminology:276')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:277'))}</dd>
            <dt id="patipada">${this.localize('terminology:278')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:279'))}</dd>
            <dt id="patipatti">${this.localize('terminology:280')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:281'))}</dd>
            <dt id="pativedha">${this.localize('terminology:282')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:283'))}</dd>
            <dt id="peta">${this.localize('terminology:284')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:285'))}</dd>
            <dt id="phala">${this.localize('terminology:286')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:287'))}</dd>
            <dt id="piti">${this.localize('terminology:288')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:289'))}</dd>
            <dt id="puja">${this.localize('terminology:290')}</dt>
            <dd>${this.localize('terminology:291')}</dd>
            <dt id="punna">${this.localize('terminology:292')}</dt>
            <dd>${this.localize('terminology:293')}</dd>
            <dt id="puthujjana">${this.localize('terminology:294')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:295'))}</dd>
          </dl>
          <h2 id="r">${this.localize('terminology:296')}</h2>
          <dl>
            <dt id="raga">${this.localize('terminology:297')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:298'))}</dd>
            <dt id="rupa">${this.localize('terminology:299')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:300'))}</dd>
          </dl>
          <h2 id="s">${this.localize('terminology:301')}</h2>
          <dl>
            <dt id="sacca">${this.localize('terminology:302')}</dt>
            <dd>${this.localize('terminology:303')}</dd>
            <dt id="saddha">${this.localize('terminology:304')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:305'))}</dd>
            <dt id="sadhu">${this.localize('terminology:306')}</dt>
            <dd>${this.localize('terminology:307')}</dd>
            <dt id="sagga">${this.localize('terminology:308')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:309'))}</dd>
            <dt id="sakadagami">${this.localize('terminology:310')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:311'))}</dd>
            <dt id="sakkaya-ditthi">${this.localize('terminology:312')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:313'))}</dd>
            <dt id="sakyamuni">${this.localize('terminology:314')}</dt>
            <dd>${this.localize('terminology:315')}</dd>
            <dt id="sakya-putta">${this.localize('terminology:316')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:317'))}</dd>
            <dt id="sallekha-dhamma">${this.localize('terminology:318')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:319'))}</dd>
            <dt id="samadhi">${this.localize('terminology:320')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:321'))}</dd>
            <dt id="samana">${this.localize('terminology:322')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:323'))}</dd>
            <dt>${unsafeHTML(this.localize('terminology:324'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:325'))}</dd>
            <dt id="sambhavesin">${this.localize('terminology:326')}</dt>
            <dd>${this.localize('terminology:327')}</dd>
            <dt id="sammuti">${this.localize('terminology:328')}</dt>
            <dd>${this.localize('terminology:329')}</dd>
            <dt id="sampajanna">${this.localize('terminology:330')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:331'))}</dd>
            <dt id="samsara">${this.localize('terminology:332')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:333'))}</dd>
            <dt id="samvega">${this.localize('terminology:334')}</dt>
            <dd>${this.localize('terminology:335')}</dd>
            <dt id="samyojana">${this.localize('terminology:336')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:337'))}</dd>
            <dt id="sanditthiko">${this.localize('terminology:338')}</dt>
            <dd>${this.localize('terminology:339')}</dd>
            <dt id="sangha">${this.localize('terminology:340')}</dt>
            <dd>
              ${this.localize('terminology:341')}
              <ul>
                <li>${this.localize('terminology:342')}</li>
                <li>${unsafeHTML(this.localize('terminology:343'))}</li>
              </ul>
              ${this.localize('terminology:344')}
              <a href="#parisa">${unsafeHTML(this.localize('terminology:345'))}</a>
              ${this.localize('terminology:346')}
            </dd>
            <dt id="sankhara">${this.localize('terminology:347')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:348'))}</dd>
            <dt id="sanna">${this.localize('terminology:349')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:350'))}</dd>
            <dt id="sanyojana">${this.localize('terminology:351')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:352'))}</dd>
            <dt id="sasana">${this.localize('terminology:353')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:354'))}</dd>
            <dt id="sati">${this.localize('terminology:355')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:356'))}</dd>
            <dt id="satipatthana">${this.localize('terminology:357')}</dt>
            <dd>${this.localize('terminology:358')}</dd>
            <dt id="sa-upadisesa-nibbana">${this.localize('terminology:359')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:360'))}</dd>
            <dt id="savaka">${this.localize('terminology:361')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:362'))}</dd>
            <dt id="sekha">${this.localize('terminology:363')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:364'))}</dd>
            <dt id="sila">${this.localize('terminology:365')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:366'))}</dd>
            <dt id="sima">${this.localize('terminology:367')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:368'))}</dd>
            <dt id="sotapanna">${this.localize('terminology:369')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:370'))}</dd>
            <dt>${this.localize('terminology:371')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:372'))}</dd>
            <dt>${this.localize('terminology:373')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:374'))}</dd>
            <dt id="stupa">${unsafeHTML(this.localize('terminology:375'))}</dt>
            <dd>${this.localize('terminology:376')}</dd>
            <dt id="sugati">${this.localize('terminology:377')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:378'))}</dd>
            <dt id="sugato">${this.localize('terminology:379')}</dt>
            <dd>${this.localize('terminology:380')}</dd>
            <dt id="sukha">${this.localize('terminology:381')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:382'))}</dd>
            <dt id="sutta">${this.localize('terminology:383')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:384'))}</dd>
          </dl>
          <h2 id="t">${this.localize('terminology:385')}</h2>
          <dl>
            <dt id="tanha">${this.localize('terminology:386')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:387'))}</dd>
            <dt id="tapas">${this.localize('terminology:388')}</dt>
            <dd>${this.localize('terminology:389')}</dd>
            <dt id="tathagata">${this.localize('terminology:390')}</dt>
            <dd>${this.localize('terminology:391')}</dd>
            <dt id="ti-lakkhana">${this.localize('terminology:392')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:393'))}</dd>
            <dt id="tipitaka">${this.localize('terminology:394')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:395'))}</dd>
            <dt id="tiratana">${this.localize('terminology:396')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:397'))}</dd>
            <dt id="tisarana">${this.localize('terminology:398')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:399'))}</dd>
          </dl>
          <h2 id="u">${this.localize('terminology:400')}</h2>
          <dl>
            <dt id="ugghatitannu">${this.localize('terminology:401')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:402'))}</dd>
            <dt id="upadana">${this.localize('terminology:403')}</dt>
            <dd>${this.localize('terminology:404')}</dd>
            <dt id="upasampada">${this.localize('terminology:405')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:406'))}</dd>
            <dt id="upasika">${this.localize('terminology:407')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:408'))}</dd>
            <dt id="upekkha">${this.localize('terminology:409')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:410'))}</dd>
            <dt id="uposatha">${this.localize('terminology:411')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:412'))}</dd>
          </dl>
          <h2 id="v">${this.localize('terminology:413')}</h2>
          <dl>
            <dt id="vassa">${this.localize('terminology:414')}</dt>
            <dd>${this.localize('terminology:415')}</dd>
            <dt id="vatta">${this.localize('terminology:416')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:417'))}</dd>
            <dt id="vedana">${this.localize('terminology:418')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:419'))}</dd>
            <dt id="vesak">${this.localize('terminology:420')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:421'))}</dd>
            <dt id="vicara">${this.localize('terminology:422')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:423'))}</dd>
            <dt id="vijja">${this.localize('terminology:424')}</dt>
            <dd>${this.localize('terminology:425')}</dd>
            <dt id="vijja-carana">${this.localize('terminology:426')}</dt>
            <dd>${this.localize('terminology:427')}</dd>
            <dt id="vimutti">${this.localize('terminology:428')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:429'))}</dd>
            <dt id="vinaya">${this.localize('terminology:430')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:431'))}</dd>
            <dt id="vinnana">${this.localize('terminology:432')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:433'))}</dd>
            <dt id="vipaka">${this.localize('terminology:434')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:435'))}</dd>
            <dt id="vipassana">${this.localize('terminology:436')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:437'))}</dd>
            <dt id="viriya">${this.localize('terminology:438')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:439'))}</dd>
            <dt id="vitakka">${this.localize('terminology:440')}</dt>
            <dd>${unsafeHTML(this.localize('terminology:441'))}</dd>
          </dl>
          <h2 id="wxyz">${this.localize('terminology:442')}</h2>
          <dl>
            <dt id="yakkha">${this.localize('terminology:443')}</dt>
            <dd>${this.localize('terminology:444')}</dd>
          </dl>
          <aside class="about-index">
            <p>${unsafeHTML(this.localize('terminology:2'))}</p>
            <ul>
              <li>${this.localize('terminology:3')}</li>
              <li>${this.localize('terminology:4')}</li>
              <li>${this.localize('terminology:5')}</li>
            </ul>
            <p>${this.localize('terminology:6')}</p>
            <ul>
              <li>${this.localize('terminology:7')}</li>
              <li>${this.localize('terminology:8')}</li>
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
    this.localizedStringsPath = '/localization/elements/static_terminology-page';
  }
}

customElements.define('sc-static-terminology', SCStaticTerminology);
