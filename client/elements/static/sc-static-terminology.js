import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

import { layoutSimpleStyles } from '../styles/sc-layout-simple-styles';
import { typographyCommonStyles } from '../styles/sc-typography-common-styles';
import { typographyStaticStyles } from '../styles/sc-typography-static-styles';
import { SCStaticPage } from '../addons/sc-static-page';

class SCStaticTerminology extends SCStaticPage {
  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <style>
        ${layoutSimpleStyles}
        ${typographyCommonStyles}
        ${typographyStaticStyles}
      </style>
      <main>
        <article>
          <h1>${unsafeHTML(this.localize('terminology:1'))}</h1>
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
          <h2 id="a">${unsafeHTML(this.localize('terminology:24'))}</h2>
          <dl>
            <dt id="abhidhamma">${unsafeHTML(this.localize('terminology:25'))}</dt>
            <dd>
              <ol>
                <li>${unsafeHTML(this.localize('terminology:26'))}</li>
                <li>${unsafeHTML(this.localize('terminology:27'))}</li>
              </ol>
            </dd>
            <dt id="abhinna">${unsafeHTML(this.localize('terminology:28'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:29'))}</dd>
            <dt id="acariya">${unsafeHTML(this.localize('terminology:30'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:31'))}</dd>
            <dt id="adhitthana">${unsafeHTML(this.localize('terminology:32'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:33'))}</dd>
            <dt id="akaliko">${unsafeHTML(this.localize('terminology:34'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:35'))}</dd>
            <dt id="akusala">${unsafeHTML(this.localize('terminology:36'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:37'))}</dd>
            <dt id="anagami">${unsafeHTML(this.localize('terminology:38'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:39'))}</dd>
            <dt id="anapanasati">${unsafeHTML(this.localize('terminology:40'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:41'))}</dd>
            <dt id="anatta">${unsafeHTML(this.localize('terminology:42'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:43'))}</dd>
            <dt id="anicca">${unsafeHTML(this.localize('terminology:44'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:45'))}</dd>
            <dt id="anupadisesa-nibbana">${unsafeHTML(this.localize('terminology:46'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:47'))}</dd>
            <dt id="anupubbi">${unsafeHTML(this.localize('terminology:48'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:49'))}</dd>
            <dt id="anusaya">${unsafeHTML(this.localize('terminology:50'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:51'))}</dd>
            <dt id="apaya-bhumi">${unsafeHTML(this.localize('terminology:52'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:53'))}</dd>
            <dt id="appamada">${unsafeHTML(this.localize('terminology:54'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:55'))}</dd>
            <dt id="arahant">${unsafeHTML(this.localize('terminology:56'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:57'))}</dd>
            <dt id="arammana">${unsafeHTML(this.localize('terminology:58'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:59'))}</dd>
            <dt id="ariya">${unsafeHTML(this.localize('terminology:60'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:61'))}</dd>
            <dt id="ariyadhana">${unsafeHTML(this.localize('terminology:62'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:63'))}</dd>
            <dt id="ariya-puggala">${unsafeHTML(this.localize('terminology:64'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:65'))}</dd>
            <dt id="ariya-sacca">${unsafeHTML(this.localize('terminology:66'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:67'))}</dd>
            <dt id="asava">${unsafeHTML(this.localize('terminology:68'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:69'))}</dd>
            <dt id="asubha">${unsafeHTML(this.localize('terminology:70'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:71'))}</dd>
            <dt id="asura">${unsafeHTML(this.localize('terminology:72'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:73'))}</dd>
            <dt id="avijja">${unsafeHTML(this.localize('terminology:74'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:75'))}</dd>
            <dt id="ayatana">${unsafeHTML(this.localize('terminology:76'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:77'))}</dd>
          </dl>
          <h2 id="b">${unsafeHTML(this.localize('terminology:78'))}</h2>
          <dl>
            <dt id="bhante">${unsafeHTML(this.localize('terminology:79'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:80'))}</dd>
            <dt id="bhava">${unsafeHTML(this.localize('terminology:81'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:82'))}</dd>
            <dt id="bhavana">${unsafeHTML(this.localize('terminology:83'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:84'))}</dd>
            <dt id="bhikkhu">${unsafeHTML(this.localize('terminology:85'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:86'))}</dd>
            <dt id="bhikkhuni">${unsafeHTML(this.localize('terminology:87'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:88'))}</dd>
            <dt id="bodhi-pakkhiya-dhamma">${unsafeHTML(this.localize('terminology:89'))}</dt>
            <dd>
              ${unsafeHTML(this.localize('terminology:90'))}
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
            <dt id="bodhisatta">${unsafeHTML(this.localize('terminology:98'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:99'))}</dd>
            <dt id="brahma">${unsafeHTML(this.localize('terminology:100'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:101'))}</dd>
            <dt id="brahma-vihara">${unsafeHTML(this.localize('terminology:102'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:103'))}</dd>
            <dt id="brahman">${unsafeHTML(this.localize('terminology:104'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:105'))}</dd>
            <dt id="buddha">${unsafeHTML(this.localize('terminology:106'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:107'))}</dd>
          </dl>
          <h2 id="c">${unsafeHTML(this.localize('terminology:108'))}</h2>
          <dl>
            <dt id="cankama">${unsafeHTML(this.localize('terminology:109'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:110'))}</dd>
            <dt id="cetasika">${unsafeHTML(this.localize('terminology:111'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:112'))}</dd>
            <dt>${unsafeHTML(this.localize('terminology:113'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:114'))}</dd>
            <dt id="citta">${unsafeHTML(this.localize('terminology:115'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:116'))}</dd>
          </dl>
          <h2 id="d">${unsafeHTML(this.localize('terminology:117'))}</h2>
          <dl>
            <dt id="dana">${unsafeHTML(this.localize('terminology:118'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:119'))}</dd>
            <dt>${unsafeHTML(this.localize('terminology:120'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:121'))}</dd>
            <dt id="deva">${unsafeHTML(this.localize('terminology:122'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:123'))}</dd>
            <dt id="devadatta">${unsafeHTML(this.localize('terminology:124'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:125'))}</dd>
            <dt id="dhamma">${unsafeHTML(this.localize('terminology:126'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:127'))}</dd>
            <dt id="dhamma-vinaya">${unsafeHTML(this.localize('terminology:128'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:129'))}</dd>
            <dt id="dhana">${unsafeHTML(this.localize('terminology:130'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:131'))}</dd>
            <dt id="dhatu">${unsafeHTML(this.localize('terminology:132'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:133'))}</dd>
            <dt id="dhutanga">${unsafeHTML(this.localize('terminology:134'))}</dt>
            <dd>
              ${unsafeHTML(this.localize('terminology:135'))}
              <ol>
                <li>${unsafeHTML(this.localize('terminology:136'))}</li>
                <li>${unsafeHTML(this.localize('terminology:137'))}</li>
                <li>${unsafeHTML(this.localize('terminology:138'))}</li>
                <li>${unsafeHTML(this.localize('terminology:139'))}</li>
                <li>${unsafeHTML(this.localize('terminology:140'))}</li>
                <li>${unsafeHTML(this.localize('terminology:141'))}</li>
                <li>${unsafeHTML(this.localize('terminology:142'))}</li>
                <li>${unsafeHTML(this.localize('terminology:143'))}</li>
                <li>${unsafeHTML(this.localize('terminology:144'))}</li>
                <li>${unsafeHTML(this.localize('terminology:145'))}</li>
                <li>${unsafeHTML(this.localize('terminology:146'))}</li>
                <li>${unsafeHTML(this.localize('terminology:147'))}</li>
                <li>${unsafeHTML(this.localize('terminology:148'))}</li>
              </ol>
            </dd>
            <dt id="dosa">${unsafeHTML(this.localize('terminology:149'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:150'))}</dd>
            <dt id="dukkha">${unsafeHTML(this.localize('terminology:151'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:152'))}</dd>
          </dl>
          <h2 id="e">${unsafeHTML(this.localize('terminology:153'))}</h2>
          <dl>
            <dt id="ekaggatarammana">${unsafeHTML(this.localize('terminology:154'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:155'))}</dd>
            <dt id="ekayana">${unsafeHTML(this.localize('terminology:156'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:157'))}</dd>
          </dl>
          <h2 id="f">${unsafeHTML(this.localize('terminology:158'))}</h2>
          <dl>
            <dt>${unsafeHTML(this.localize('terminology:159'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:160'))}</dd>
            <dt id="frame">${unsafeHTML(this.localize('terminology:161'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:162'))}</dd>
          </dl>
          <h2 id="g">${unsafeHTML(this.localize('terminology:163'))}</h2>
          <dl>
            <dt id="gotarabhu">${unsafeHTML(this.localize('terminology:164'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:165'))}</dd>
          </dl>
          <h2 id="h">${unsafeHTML(this.localize('terminology:166'))}</h2>
          <dl>
            <dt id="hiri-ottappa">${unsafeHTML(this.localize('terminology:167'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:168'))}</dd>
          </dl>
          <h2 id="i">${unsafeHTML(this.localize('terminology:169'))}</h2>
          <dl>
            <dt id="idappaccayata">${unsafeHTML(this.localize('terminology:170'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:171'))}</dd>
            <dt id="indriya">${unsafeHTML(this.localize('terminology:172'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:173'))}</dd>
          </dl>
          <h2 id="j">${unsafeHTML(this.localize('terminology:174'))}</h2>
          <dl>
            <dt id="jhana">${unsafeHTML(this.localize('terminology:175'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:176'))}</dd>
          </dl>
          <h2 id="k">${unsafeHTML(this.localize('terminology:177'))}</h2>
          <dl>
            <dt id="kalyanamitta">${unsafeHTML(this.localize('terminology:178'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:179'))}</dd>
            <dt id="kamaguna">${unsafeHTML(this.localize('terminology:180'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:181'))}</dd>
            <dt id="kamma">${unsafeHTML(this.localize('terminology:182'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:183'))}</dd>
            <dt id="karuna">${unsafeHTML(this.localize('terminology:184'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:185'))}</dd>
            <dt id="kathina">${unsafeHTML(this.localize('terminology:186'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:187'))}</dd>
            <dt id="kaya">${unsafeHTML(this.localize('terminology:188'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:189'))}</dd>
            <dt id="kayagata-sati">${unsafeHTML(this.localize('terminology:190'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:191'))}</dd>
            <dt id="khandha">${unsafeHTML(this.localize('terminology:192'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:193'))}</dd>
            <dt id="khanti">${unsafeHTML(this.localize('terminology:194'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:195'))}</dd>
            <dt id="kilesa">${unsafeHTML(this.localize('terminology:196'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:197'))}</dd>
            <dt id="kusala">${unsafeHTML(this.localize('terminology:198'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:199'))}</dd>
          </dl>
          <h2 id="l">${unsafeHTML(this.localize('terminology:200'))}</h2>
          <dl>
            <dt id="lakkhana">${unsafeHTML(this.localize('terminology:201'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:202'))}</dd>
            <dt id="lobha">${unsafeHTML(this.localize('terminology:203'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:204'))}</dd>
            <dt id="loka-dhamma">${unsafeHTML(this.localize('terminology:205'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:206'))}</dd>
            <dt id="lokavidu">${unsafeHTML(this.localize('terminology:207'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:208'))}</dd>
            <dt id="lokuttara">${unsafeHTML(this.localize('terminology:209'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:210'))}</dd>
          </dl>
          <h2 id="m">${unsafeHTML(this.localize('terminology:211'))}</h2>
          <dl>
            <dt id="magga">${unsafeHTML(this.localize('terminology:212'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:213'))}</dd>
            <dt id="majjhima">${unsafeHTML(this.localize('terminology:214'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:215'))}</dd>
            <dt id="mara">${unsafeHTML(this.localize('terminology:216'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:217'))}</dd>
            <dt id="metta">${unsafeHTML(this.localize('terminology:218'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:219'))}</dd>
            <dt id="moha">${unsafeHTML(this.localize('terminology:220'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:221'))}</dd>
            <dt id="mudita">${unsafeHTML(this.localize('terminology:222'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:223'))}</dd>
            <dt id="mula">${unsafeHTML(this.localize('terminology:224'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:225'))}</dd>
          </dl>
          <h2 id="n">${unsafeHTML(this.localize('terminology:226'))}</h2>
          <dl>
            <dt id="naga">${unsafeHTML(this.localize('terminology:227'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:228'))}</dd>
            <dt id="nama">${unsafeHTML(this.localize('terminology:229'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:230'))}</dd>
            <dt id="nama-rupa">${unsafeHTML(this.localize('terminology:231'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:232'))}</dd>
            <dt id="nekkhamma">${unsafeHTML(this.localize('terminology:233'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:234'))}</dd>
            <dt id="nibbana">${unsafeHTML(this.localize('terminology:235'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:236'))}</dd>
            <dt id="nibbida">${unsafeHTML(this.localize('terminology:237'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:238'))}</dd>
            <dt id="nimitta">${unsafeHTML(this.localize('terminology:239'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:240'))}</dd>
            <dt id="nirodha">${unsafeHTML(this.localize('terminology:241'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:242'))}</dd>
            <dt id="nivarana">${unsafeHTML(this.localize('terminology:243'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:244'))}</dd>
          </dl>
          <h2 id="o">${unsafeHTML(this.localize('terminology:245'))}</h2>
          <dl>
            <dt id="opanayiko">${unsafeHTML(this.localize('terminology:246'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:247'))}</dd>
          </dl>
          <h2 id="pq">${unsafeHTML(this.localize('terminology:248'))}</h2>
          <dl>
            <dt id="pabbajja">${unsafeHTML(this.localize('terminology:249'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:250'))}</dd>
            <dt id="paccattam">${unsafeHTML(this.localize('terminology:251'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:252'))}</dd>
            <dt id="pacceka">${unsafeHTML(this.localize('terminology:253'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:254'))}</dd>
            <dt id="panna">${unsafeHTML(this.localize('terminology:255'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:256'))}</dd>
            <dt>${unsafeHTML(this.localize('terminology:257'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:258'))}</dd>
            <dt id="papanca">${unsafeHTML(this.localize('terminology:259'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:260'))}</dd>
            <dt id="parami">${unsafeHTML(this.localize('terminology:261'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:262'))}</dd>
            <dt id="parinibbana">${unsafeHTML(this.localize('terminology:263'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:264'))}</dd>
            <dt id="parisa">${unsafeHTML(this.localize('terminology:265'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:266'))}</dd>
            <dt id="pariyatti">${unsafeHTML(this.localize('terminology:267'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:268'))}</dd>
            <dt id="ps">${unsafeHTML(this.localize('terminology:269'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:270'))}</dd>
            <dt id="patimokkha">${unsafeHTML(this.localize('terminology:271'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:272'))}</dd>
            <dt id="patipada">${unsafeHTML(this.localize('terminology:273'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:274'))}</dd>
            <dt id="patipatti">${unsafeHTML(this.localize('terminology:275'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:276'))}</dd>
            <dt id="pativedha">${unsafeHTML(this.localize('terminology:277'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:278'))}</dd>
            <dt id="peta">${unsafeHTML(this.localize('terminology:279'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:280'))}</dd>
            <dt id="phala">${unsafeHTML(this.localize('terminology:281'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:282'))}</dd>
            <dt id="piti">${unsafeHTML(this.localize('terminology:283'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:284'))}</dd>
            <dt id="puja">${unsafeHTML(this.localize('terminology:285'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:286'))}</dd>
            <dt id="punna">${unsafeHTML(this.localize('terminology:287'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:288'))}</dd>
            <dt id="puthujjana">${unsafeHTML(this.localize('terminology:289'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:290'))}</dd>
          </dl>
          <h2 id="r">${unsafeHTML(this.localize('terminology:291'))}</h2>
          <dl>
            <dt id="raga">${unsafeHTML(this.localize('terminology:292'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:293'))}</dd>
            <dt id="rupa">${unsafeHTML(this.localize('terminology:294'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:295'))}</dd>
          </dl>
          <h2 id="s">${unsafeHTML(this.localize('terminology:296'))}</h2>
          <dl>
            <dt id="sacca">${unsafeHTML(this.localize('terminology:297'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:298'))}</dd>
            <dt id="saddha">${unsafeHTML(this.localize('terminology:299'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:300'))}</dd>
            <dt id="sadhu">${unsafeHTML(this.localize('terminology:301'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:302'))}</dd>
            <dt id="sagga">${unsafeHTML(this.localize('terminology:303'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:304'))}</dd>
            <dt id="sakadagami">${unsafeHTML(this.localize('terminology:305'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:306'))}</dd>
            <dt id="sakkaya-ditthi">${unsafeHTML(this.localize('terminology:307'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:308'))}</dd>
            <dt id="sakyamuni">${unsafeHTML(this.localize('terminology:309'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:310'))}</dd>
            <dt id="sakya-putta">${unsafeHTML(this.localize('terminology:311'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:312'))}</dd>
            <dt id="sallekha-dhamma">${unsafeHTML(this.localize('terminology:313'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:314'))}</dd>
            <dt id="samadhi">${unsafeHTML(this.localize('terminology:315'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:316'))}</dd>
            <dt id="samana">${unsafeHTML(this.localize('terminology:317'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:318'))}</dd>
            <dt>${unsafeHTML(this.localize('terminology:319'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:320'))}</dd>
            <dt id="sambhavesin">${unsafeHTML(this.localize('terminology:321'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:322'))}</dd>
            <dt id="sammuti">${unsafeHTML(this.localize('terminology:323'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:324'))}</dd>
            <dt id="sampajanna">${unsafeHTML(this.localize('terminology:325'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:326'))}</dd>
            <dt id="samsara">${unsafeHTML(this.localize('terminology:327'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:328'))}</dd>
            <dt id="samvega">${unsafeHTML(this.localize('terminology:329'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:330'))}</dd>
            <dt id="samyojana">${unsafeHTML(this.localize('terminology:331'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:332'))}</dd>
            <dt id="sanditthiko">${unsafeHTML(this.localize('terminology:333'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:334'))}</dd>
            <dt id="sangha">${unsafeHTML(this.localize('terminology:335'))}</dt>
            <dd>
              ${unsafeHTML(this.localize('terminology:336'))}
              <ul>
                <li>${unsafeHTML(this.localize('terminology:337'))}</li>
                <li>${unsafeHTML(this.localize('terminology:338'))}</li>
              </ul>
              ${unsafeHTML(this.localize('terminology:339'))}
              <a href="#parisa">${unsafeHTML(this.localize('terminology:340'))}</a>
              ${unsafeHTML(this.localize('terminology:341'))}
            </dd>
            <dt id="sankhara">${unsafeHTML(this.localize('terminology:342'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:343'))}</dd>
            <dt id="sanna">${unsafeHTML(this.localize('terminology:344'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:345'))}</dd>
            <dt id="sanyojana">${unsafeHTML(this.localize('terminology:346'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:347'))}</dd>
            <dt id="sasana">${unsafeHTML(this.localize('terminology:348'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:349'))}</dd>
            <dt id="sati">${unsafeHTML(this.localize('terminology:350'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:351'))}</dd>
            <dt id="satipatthana">${unsafeHTML(this.localize('terminology:352'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:353'))}</dd>
            <dt id="sa-upadisesa-nibbana">${unsafeHTML(this.localize('terminology:354'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:355'))}</dd>
            <dt id="savaka">${unsafeHTML(this.localize('terminology:356'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:357'))}</dd>
            <dt id="sekha">${unsafeHTML(this.localize('terminology:358'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:359'))}</dd>
            <dt id="sila">${unsafeHTML(this.localize('terminology:360'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:361'))}</dd>
            <dt id="sima">${unsafeHTML(this.localize('terminology:362'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:363'))}</dd>
            <dt id="sotapanna">${unsafeHTML(this.localize('terminology:364'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:365'))}</dd>
            <dt>${unsafeHTML(this.localize('terminology:366'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:367'))}</dd>
            <dt>${unsafeHTML(this.localize('terminology:368'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:369'))}</dd>
            <dt id="stupa">${unsafeHTML(this.localize('terminology:370'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:371'))}</dd>
            <dt id="sugati">${unsafeHTML(this.localize('terminology:372'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:373'))}</dd>
            <dt id="sugato">${unsafeHTML(this.localize('terminology:374'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:375'))}</dd>
            <dt id="sukha">${unsafeHTML(this.localize('terminology:376'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:377'))}</dd>
            <dt id="sutta">${unsafeHTML(this.localize('terminology:378'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:379'))}</dd>
          </dl>
          <h2 id="t">${unsafeHTML(this.localize('terminology:380'))}</h2>
          <dl>
            <dt id="tanha">${unsafeHTML(this.localize('terminology:381'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:382'))}</dd>
            <dt id="tapas">${unsafeHTML(this.localize('terminology:383'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:384'))}</dd>
            <dt id="tathagata">${unsafeHTML(this.localize('terminology:385'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:386'))}</dd>
            <dt id="ti-lakkhana">${unsafeHTML(this.localize('terminology:387'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:388'))}</dd>
            <dt id="tipitaka">${unsafeHTML(this.localize('terminology:389'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:390'))}</dd>
            <dt id="tiratana">${unsafeHTML(this.localize('terminology:391'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:392'))}</dd>
            <dt id="tisarana">${unsafeHTML(this.localize('terminology:393'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:394'))}</dd>
          </dl>
          <h2 id="u">${unsafeHTML(this.localize('terminology:395'))}</h2>
          <dl>
            <dt id="ugghatitannu">${unsafeHTML(this.localize('terminology:396'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:397'))}</dd>
            <dt id="upadana">${unsafeHTML(this.localize('terminology:398'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:399'))}</dd>
            <dt id="upasampada">${unsafeHTML(this.localize('terminology:400'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:401'))}</dd>
            <dt id="upasika">${unsafeHTML(this.localize('terminology:402'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:403'))}</dd>
            <dt id="upekkha">${unsafeHTML(this.localize('terminology:404'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:405'))}</dd>
            <dt id="uposatha">${unsafeHTML(this.localize('terminology:406'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:407'))}</dd>
          </dl>
          <h2 id="v">${unsafeHTML(this.localize('terminology:408'))}</h2>
          <dl>
            <dt id="vassa">${unsafeHTML(this.localize('terminology:409'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:410'))}</dd>
            <dt id="vatta">${unsafeHTML(this.localize('terminology:411'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:412'))}</dd>
            <dt id="vedana">${unsafeHTML(this.localize('terminology:413'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:414'))}</dd>
            <dt id="vesak">${unsafeHTML(this.localize('terminology:415'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:416'))}</dd>
            <dt id="vicara">${unsafeHTML(this.localize('terminology:417'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:418'))}</dd>
            <dt id="vijja">${unsafeHTML(this.localize('terminology:419'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:420'))}</dd>
            <dt id="vijja-carana">${unsafeHTML(this.localize('terminology:421'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:422'))}</dd>
            <dt id="vimutti">${unsafeHTML(this.localize('terminology:423'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:424'))}</dd>
            <dt id="vinaya">${unsafeHTML(this.localize('terminology:425'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:426'))}</dd>
            <dt id="vinnana">${unsafeHTML(this.localize('terminology:427'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:428'))}</dd>
            <dt id="vipaka">${unsafeHTML(this.localize('terminology:429'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:430'))}</dd>
            <dt id="vipassana">${unsafeHTML(this.localize('terminology:431'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:432'))}</dd>
            <dt id="viriya">${unsafeHTML(this.localize('terminology:433'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:434'))}</dd>
            <dt id="vitakka">${unsafeHTML(this.localize('terminology:435'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:436'))}</dd>
          </dl>
          <h2 id="wxyz">${unsafeHTML(this.localize('terminology:437'))}</h2>
          <dl>
            <dt id="yakkha">${unsafeHTML(this.localize('terminology:438'))}</dt>
            <dd>${unsafeHTML(this.localize('terminology:439'))}</dd>
          </dl>
          <aside class="about-index">
            <p>${unsafeHTML(this.localize('terminology:440'))}</p>
            <ul>
              <li>${unsafeHTML(this.localize('terminology:441'))}</li>
              <li>${unsafeHTML(this.localize('terminology:442'))}</li>
              <li>${unsafeHTML(this.localize('terminology:443'))}</li>
            </ul>
            <p>${unsafeHTML(this.localize('terminology:444'))}</p>
            <ul>
              <li>${unsafeHTML(this.localize('terminology:445'))}</li>
              <li>${unsafeHTML(this.localize('terminology:446'))}</li>
            </ul>
          </aside>
          <aside class="static-copyright">
            <p>${unsafeHTML(this.localize('terminology:447'))}</p>
            <blockquote>${unsafeHTML(this.localize('terminology:448'))}</blockquote>
            <p>${unsafeHTML(this.localize('terminology:449'))}</p>
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
