import { html } from '@polymer/lit-element/lit-element.js';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';

import { staticStyles } from '../styles/static-styles.js';
import { SCStaticPage } from '../addons/sc-static-page.js';
import _ from '../../localization/macro.js';

class SCSimiles extends SCStaticPage {
  render() {
    return html`
    ${staticStyles}
    <div id="page-wrap">
      <main>
        <section>
          <article>
            <h1>
              ${_`Index of Similes`}
            </h1>
            <p>
              ${_`This is a modified version of the <a href="https://www.accesstoinsight.org/index-similes.html" rel="noopener" target="_blank">Index of Similes</a> from Access to Insight. We adapt this useful resource with gratitude. Changes include:`}
            </p>
            <ul>
              <li>
                ${_`Removing all later texts and references, retaining only references directly to the early texts.`}
              </li>
              <li>
                ${_`In a few cases, terminology and definitions have been changed, corrected, or deleted. However, the bulk of the content is identical.`}
              </li>
              <li>
                ${_`HTML structure is modified.`}
              </li>
              <li>
                ${_`Diacritical marks have added.`}
              </li>
              <li>
                ${_`Links go to SuttaCentral.`}
              </li>
              <li>
                ${_`In most cases, <a href="https://www.accesstoinsight.org/abbrev.html" rel="noopener" target="_blank" title="Access to Insight abbreviations">Access to Insight</a> and <a href="/abbreviations" rel="noopener" target="_blank" title="SuttaCentral abbreviations">SuttaCentral</a> use the same reference conventions. However, in a few cases they differ; for example Sutta Nipāta is Sn in Access to Insight and Snp in SuttaCentral. In such cases the references have been changed to SuttaCentral’s system.`}
              </li>
            </ul>
            <p>
              ${_`The caveats expressed by the author of the original index still apply:`}
            </p>
            <blockquote>
              ${_`Only the imagery that illustrates points of Dhamma is included here; imagery that serves primarily a literary or narrative function is not included.`}
            </blockquote>
            <p>
              ${_`In addition, note the following:`}
            </p>
            <ul>
              <li>
                ${_`References only include the Pali texts.`}
              </li>
              <li>
                ${_`The list is incomplete.`}
              </li>
            </ul>
            <nav class="contents">
              <ul class="entry-list">
                <li>
                  ${_`<a href="#a">A</a>`}
                </li>
                <li>
                  ${_`<a href="#b">B</a>`}
                </li>
                <li>
                  ${_`<a href="#c">C</a>`}
                </li>
                <li>
                  ${_`<a href="#d">D</a>`}
                </li>
                <li>
                  ${_`<a href="#e">E</a>`}
                </li>
                <li>
                  ${_`<a href="#f">F</a>`}
                </li>
                <li>
                  ${_`<a href="#g">G</a>`}
                </li>
                <li>
                  ${_`<a href="#h">H</a>`}
                </li>
                <li>
                  ${_`<a href="#i">I</a>`}
                </li>
                <li>
                  ${_`<a href="#j">J</a>`}
                </li>
                <li>
                  ${_`<a href="#k">K</a>`}
                </li>
                <li>
                  ${_`<a href="#l">L</a>`}
                </li>
                <li>
                  ${_`<a href="#m">M</a>`}
                </li>
                <li>
                  ${_`<a href="#n">N</a>`}
                </li>
                <li>
                  ${_`<a href="#o">O</a>`}
                </li>
                <li>
                  ${_`<a href="#p">P</a>`}
                </li>
                <li>
                  ${_`<a href="#qq">Q</a>`}
                </li>
                <li>
                  ${_`<a href="#r">R</a>`}
                </li>
                <li>
                  ${_`<a href="#s">S</a>`}
                </li>
                <li>
                  ${_`<a href="#t">T</a>`}
                </li>
                <li>
                  ${_`<a href="#u">U</a>`}
                </li>
                <li>
                  ${_`<a href="#v">V</a>`}
                </li>
                <li>
                  ${_`<a href="#w">W</a>`}
                </li>
                <li>
                  ${_`<a href="#xyz">XYZ</a>`}
                </li>
              </ul>
            </nav>
            <h2>
              ${_`<a id="a">A</a>`}
            </h2>
            <dl>
              <dt>
                ${_`Acrobats`}
              </dt>
              <dd>
                ${_`<span class="subject">watching after oneself/others</span> <a class="ref" href="/sn47.19">SN 47.19</a>`}
              </dd>
              <dt>
                ${_`Ancient city`}
              </dt>
              <dd>
                ${_`<span class="subject">awakening</span> <a class="ref" href="/sn12.65">SN 12.65</a>`}
              </dd>
              <dt>
                ${_`Animals bound together by a rope`}
              </dt>
              <dd>
                ${_`<span class="subject">lack of mindfulness</span> <a class="ref" href="/sn35.206">SN 35.206</a>`}
              </dd>
              <dt id="archer">
                ${_`Archer`}
              </dt>
              <dd>
                ${_`<span class="subject">brevity of life</span>`}
              </dd>
              <dd>
                ${_`<span class="subject">heedfulness</span> <a class="ref" href="/sn20.6">SN 20.6</a>`}
              </dd>
              <dd>
                ${_`archer’s apprentice <span class="subject">jhāna</span> <a class="ref" href="/an9.36">AN 9.36</a>`}
              </dd>
              <dd>
                ${_`See also <a href="#arrow">Arrow</a>, <a href="#fletcher">Fletcher</a>.`}
              </dd>
              <dt id="arrow">
                ${_`Arrow`}
              </dt>
              <dd>
                ${_`<span class="subject">dukkha</span> <a class="ref" href="/snp3.8">Snp 3.8</a>`}
              </dd>
              <dd>
                ${_`poisoned <span class="subject">speculative views</span> <a class="ref" href="/mn63">MN 63</a>, <span class="subject">craving</span> <a class="ref" href="/mn105">MN 105</a>, <span class="subject">contagiousness of evil</span> <a class="ref" href="/iti76">Iti 76</a>`}
              </dd>
              <dd>
                ${_`person shot with two ~ <span class="subject">physical and mental pain</span> <a class="ref" href="/sn36.6">SN 36.6</a>`}
              </dd>
              <dd>
                ${_`in the heart <span class="subject">sensuality</span> <a class="ref" href="/snp4.15">Snp 4.15</a>`}
              </dd>
              <dd>
                ${_`piercing a horsehair <span class="subject">subtlety of Dhamma</span> <a class="ref" href="/sn56.45">SN 56.45</a>`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/thag1.26">Thag 1.26</a>`}
              </dd>
              <dd>
                ${_`removed <span class="subject">greed</span> <a class="ref" href="/sn1.5">SN 1.5</a>`}
              </dd>
              <dd>
                ${_`shot into the night <span class="subject">bad people</span> <a class="ref" href="/dhp304">Dhp 304</a>`}
              </dd>
              <dd>
                ${_`straightened by a fletcher (see <a href="#fletcher">Fletcher</a> )`}
              </dd>
              <dd>
                ${_`See also <a href="#doctor">Doctor</a>, <a href="#fletcher">Fletcher</a>.`}
              </dd>
            </dl>
            <h2>
              ${_`<a id="b">B</a>`}
            </h2>
            <dl>
              <dt>
                ${_`Bamboo`}
              </dt>
              <dd>
                ${_`destroyed by its own fruit <span class="subject">evil</span> <a class="ref" href="/dhp164">Dhp 164</a>, <a class="ref" href="/iti50">Iti 50</a>`}
              </dd>
              <dd>
                ${_`spreading <span class="subject">solitude in the wilderness</span> <a class="ref" href="/snp1.3">Snp 1.3</a>`}
              </dd>
              <dd>
              </dd>
              <dt>
                ${_`<a id="bathman">Bathman</a> or bathman’s apprentice`}
              </dt>
              <dd>
                ${_`<span class="subject">rapture of 1<sup>st</sup> jhāna</span> <a class="ref" href="/dn2">DN 2</a>, <a class="ref" href="/dn11">DN 11</a>, <a class="ref" href="/dn12">DN 12</a>, <a class="ref" href="/mn39">MN 39</a>, <a class="ref" href="/mn119">MN 119</a>, <a class="ref" href="/an5.28">AN 5.28</a>`}
              </dd>
              <dt>
                ${_`Bandits`}
              </dt>
              <dd>
                ${_`<span class="subject">external sense media</span> <a class="ref" href="/sn35.197">SN 35.197</a>`}
              </dd>
              <dt>
                ${_`Barley reaper`}
              </dt>
              <dd>
                ${_`<span class="subject">defilements</span> <a class="ref" href="/mil2.1.8">Mil 2.1.8</a>`}
              </dd>
              <dt>
                ${_`Beast of burden`}
              </dt>
              <dd>
                ${_`<span class="subject">persistence</span> <a class="ref" href="/snp1.4">Snp 1.4</a>`}
              </dd>
              <dt>
                ${_`Beauty queen`}
              </dt>
              <dd>
                ${_`<span class="subject">mindfulness</span> <a class="ref" href="/sn47.20">SN 47.20</a>`}
              </dd>
              <dt>
                ${_`Bee gathering nectar`}
              </dt>
              <dd>
                ${_`<span class="subject">sage</span> <a class="ref" href="/dhp49">Dhp 49</a>`}
              </dd>
              <dt>
                ${_`Bird`}
              </dt>
              <dd>
                ${_`escaping from net <span class="subject">rarity of heavenly birth</span> <a class="ref" href="/dhp174">Dhp 174</a>`}
              </dd>
              <dd>
                ${_`leaving no track <span class="subject">arahant</span> <a class="ref" href="/dhp92">Dhp 92</a>`}
              </dd>
              <dd>
                ${_`sighting shore <span class="subject">seeking the Buddha</span>`}
              </dd>
              <dd>
                ${_`<span class="subject">meaning of Tathāgata</span> <a class="ref" href="/dn11">DN 11</a>, <a class="ref" href="/an6.54">AN 6.54</a>`}
              </dd>
              <dd>
                ${_`spattered with dirt <span class="subject">mindfulness</span> <a class="ref" href="/sn9.1">SN 9.1</a>`}
              </dd>
              <dd>
                ${_`with wings as its only burden <span class="subject">contentment</span> <a class="ref" href="/dn2">DN 2</a>, <a class="ref" href="/dn11">DN 11</a>, <a class="ref" href="/mn38">MN 38</a>,`}
              </dd>
              <dd>
              </dd>
              <dt>
                ${_`Blindness`}
              </dt>
              <dd>
                ${_`<span class="subject">ignorance</span> <a class="ref" href="/mn75">MN 75</a>`}
              </dd>
              <dt>
                ${_`Blind men`}
              </dt>
              <dd>
                ${_`row of <span class="subject">ignorance</span> <a class="ref" href="/mn95">MN 95</a>`}
              </dd>
              <dd>
                ${_`and the elephant <span class="subject">ignorance</span> <a class="ref" href="/ud6.4">Ud 6.4</a>`}
              </dd>
              <dd>
              </dd>
              <dt>
                ${_`Boat being bailed out`}
              </dt>
              <dd>
                ${_`<span class="subject">defilements</span> <a class="ref" href="/dhp369">Dhp 369</a>`}
              </dd>
              <dt>
                ${_`Bog`}
              </dt>
              <dd>
                ${_`<span class="subject">sensuality</span> <a class="ref" href="/snp4.15">Snp 4.15</a>`}
              </dd>
              <dt>
                ${_`Boil, festering`}
              </dt>
              <dd>
                ${_`<span class="subject">the body</span> <a class="ref" href="/an9.15">AN 9.15</a>`}
              </dd>
              <dt>
                ${_`Boiling the River Ganges`}
              </dt>
              <dd>
                ${_`<span class="subject">speech</span> <a class="ref" href="/mn21">MN 21</a>`}
              </dd>
              <dt>
                ${_`Bones`}
              </dt>
              <dd>
                ${_`chain or heap <span class="subject">sensuality</span> <a class="ref" href="/mn54">MN 54</a>, <a class="ref" href="/an5.76">AN 5.76</a>`}
              </dd>
              <dd>
                ${_`mountain <span class="subject">length of samsara</span> <a class="ref" href="/iti24">Iti 24</a>`}
              </dd>
              <dd>
              </dd>
              <dt>
                ${_`Bottomless chasm`}
              </dt>
              <dd>
                ${_`<span class="subject">painful feeling</span> <a class="ref" href="/sn36.4">SN 36.4</a>`}
              </dd>
              <dt>
                ${_`Boulder thrown into lake`}
              </dt>
              <dd>
                ${_`<span class="subject">kamma</span> <a class="ref" href="/sn42.6">SN 42.6</a>`}
              </dd>
              <dt>
                ${_`Bowl of poison`}
              </dt>
              <dd>
                ${_`<span class="subject">passion</span> <a class="ref" href="/thig14">Thig 14</a>`}
              </dd>
              <dt>
                ${_`Branch, man grasping a`}
              </dt>
              <dd>
                ${_`<span class="subject">self-view</span> <a class="ref" href="/an4.178">AN 4.178</a>`}
              </dd>
              <dt>
                ${_`Bubble on water`}
              </dt>
              <dd>
                ${_`<span class="subject">appropriate attention</span> <a class="ref" href="/sn22.95">SN 22.95</a>`}
              </dd>
              <dt id="bull">
                ${_`Bull`}
              </dt>
              <dd>
                ${_`born into a herd of cattle <span class="subject">arahant</span> <a class="ref" href="/an5.179">AN 5.179</a>`}
              </dd>
              <dd>
                ${_`yoked to a load <span class="subject">endurance</span> <a class="ref" href="/thag14.2">Thag 14.2</a>`}
              </dd>
              <dd>
                ${_`See also <a href="#cow">Cow</a>.`}
              </dd>
              <dt>
                ${_`Burning ghee or oil`}
              </dt>
              <dd>
                ${_`<span class="subject">meditation on the fire property</span> <a class="ref" href="/ud8.9">Ud 8.9</a>, <a class="ref" href="/ud8.10">Ud 8.10</a>`}
              </dd>
              <dt>
                ${_`Burning grass or leaves`}
              </dt>
              <dd>
                ${_`<span class="subject">not-self</span> <a class="ref" href="/sn35.101">SN 35.101</a>`}
              </dd>
              <dt>
                ${_`Burning refuge`}
              </dt>
              <dd>
                ${_`<span class="subject">dukkha</span> <a class="ref" href="/snp3.8">Snp 3.8</a>`}
              </dd>
              <dt>
                ${_`<a id="butcher">Butcher</a> or butcher’s apprentice`}
              </dt>
              <dd>
                ${_`<span class="subject">meditation on the four properties</span> <a class="ref" href="/dn22">DN 22</a>, <a class="ref" href="/mn119">MN 119</a>`}
              </dd>
              <dd>
                ${_`<span class="subject">trance of non-breathing</span> <a class="ref" href="/mn36">MN 36</a>`}
              </dd>
              <dd>
                ${_`See also <a href="#bull">Bull</a>, <a href="#cow">Cow</a>.`}
              </dd>
              <dt>
                ${_`Butcher of goats`}
              </dt>
              <dd>
                ${_`<span class="subject">kamma</span> <a class="ref" href="/an3.99">AN 3.99</a>`}
              </dd>
              <dt>
                ${_`Butter from water`}
              </dt>
              <dd>
                ${_`<span class="subject">wrong view</span> <a class="ref" href="/mn126">MN 126</a>`}
              </dd>
            </dl>
            <h2>
              ${_`<a id="c">C</a>`}
            </h2>
            <dl>
              <dt>
                ${_`Calf not seeing its mother`}
              </dt>
              <dd>
                ${_`<span class="subject">change &amp; alteration</span> <a class="ref" href="/sn22.80">SN 22.80</a>. See also <a href="#cow">Cow</a>.`}
              </dd>
              <dt id="carpenter">
                ${_`Carpenter`}
              </dt>
              <dd>
                ${_`<span class="subject">wearing down the effluents</span> <a class="ref" href="/sn22.101">SN 22.101</a>`}
              </dd>
              <dd>
                ${_`<span class="subject">self-control</span> <a class="ref" href="/dhp80">Dhp 80</a>, <a class="ref" href="/dhp145">Dhp 145</a>`}
              </dd>
              <dd>
                ${_`<span class="subject">applied thought</span> <a class="ref" href="/mil2.3.13">Mil 2.3.13</a>`}
              </dd>
              <dd>
              </dd>
              <dt>
                ${_`Cart wheel`}
              </dt>
              <dd>
                ${_`<span class="subject">suffering</span> <a class="ref" href="/dhp1">Dhp 1</a>`}
              </dd>
              <dt>
                ${_`Catching arrows`}
              </dt>
              <dd>
                ${_`<span class="subject">brevity of life</span>`}
              </dd>
              <dd>
                ${_`<span class="subject">heedfulness</span> <a class="ref" href="/sn20.6">SN 20.6</a>`}
              </dd>
              <dd>
              </dd>
              <dt>
                ${_`Cave`}
              </dt>
              <dd>
                ${_`<span class="subject">the body</span>`}
              </dd>
              <dd>
                ${_`<span class="subject">sensuality</span> <a class="ref" href="/snp4.2">Snp 4.2</a>`}
              </dd>
              <dd>
              </dd>
              <dt>
                ${_`Cesspool difficult to clean`}
              </dt>
              <dd>
                ${_`<span class="subject">impurities</span> <a class="ref" href="/snp2.6">Snp 2.6</a>`}
              </dd>
              <dt>
                ${_`Chaff`}
              </dt>
              <dd>
                ${_`<span class="subject">corrupt person</span> <a class="ref" href="/snp1.5">Snp 1.5</a>, <a class="ref" href="/snp2.6">Snp 2.6</a>`}
              </dd>
              <dd>
                ${_`<span class="subject">dead body</span> <a class="ref" href="/sn35.69">SN 35.69</a>`}
              </dd>
              <dd>
                ${_`<span class="subject">others’ faults</span> <a class="ref" href="/dhp252">Dhp 252</a>`}
              </dd>
              <dd>
              </dd>
              <dt>
                ${_`Charcoals`}
              </dt>
              <dd>
                ${_`<span class="subject">passions</span> <a class="ref" href="/an8.28">AN 8.28</a>`}
              </dd>
              <dt>
                ${_`Chariot`}
              </dt>
              <dd>
                ${_`<span class="subject">anger</span> <a class="ref" href="/dhp222">Dhp 222</a>`}
              </dd>
              <dd>
                ${_`<span class="subject">the body</span> <a class="ref" href="/dhp151">Dhp 151</a>`}
              </dd>
              <dd>
                ${_`<span class="subject">concentration</span> <a class="ref" href="/an5.28">AN 5.28</a>`}
              </dd>
              <dd>
                ${_`<span class="subject">mindfulness</span> <a class="ref" href="/mn119">MN 119</a>`}
              </dd>
              <dd>
                ${_`<span class="subject">world</span> <a class="ref" href="/dhp171">Dhp 171</a>`}
              </dd>
              <dd>
              </dd>
              <dt>
                ${_`Chariots, relay`}
              </dt>
              <dd>
                ${_`<span class="subject">stages of insight</span> <a class="ref" href="/mn24">MN 24</a>`}
              </dd>
              <dt id="charioteer">
                ${_`Charioteer`}
              </dt>
              <dd>
                ${_`<span class="subject">sense-restraint</span> <a class="ref" href="/dhp94">Dhp 94</a>`}
              </dd>
              <dt>
                ${_`Cheater`}
              </dt>
              <dd>
                ${_`<span class="subject">others’ errors</span> <a class="ref" href="/dhp252">Dhp 252</a>`}
              </dd>
              <dt>
                ${_`Children playing with sand castles`}
              </dt>
              <dd>
                ${_`<span class="subject">aggregates</span> <a class="ref" href="/sn23.2">SN 23.2</a>`}
              </dd>
              <dt>
                ${_`City of bones`}
              </dt>
              <dd>
                ${_`<span class="subject">the body</span> <a class="ref" href="/dhp150">Dhp 150</a>`}
              </dd>
              <dt>
                ${_`City superintendent at a crossroads`}
              </dt>
              <dd>
                ${_`<span class="subject">consciousness</span> <a class="ref" href="/mil2.3.12">Mil 2.3.12</a>`}
              </dd>
              <dt>
                ${_`Cleansing of the body with scouring balls and bath powder`}
              </dt>
              <dd>
                ${_`<span class="subject">cleansing the mind</span> <a class="ref" href="/an3.70">AN 3.70</a>`}
              </dd>
              <dt>
                ${_`Cleansing of the head with paste and clay`}
              </dt>
              <dd>
                ${_`<span class="subject">cleansing the mind</span> <a class="ref" href="/an3.70">AN 3.70</a>`}
              </dd>
              <dt>
                ${_`Cliff, frightful`}
              </dt>
              <dd>
                ${_`<span class="subject">fear of birth, aging, and death</span> <a class="ref" href="/sn56.42">SN 56.42</a>`}
              </dd>
              <dt>
                ${_`Cloth, person covered with white`}
              </dt>
              <dd>
                ${_`<span class="subject">4<sup>th</sup> jhāna</span> <a class="ref" href="/dn2">DN 2</a>, <a class="ref" href="/dn11">DN 11</a>, <a class="ref" href="/dn12">DN 12</a>, <a class="ref" href="/mn39">MN 39</a>, <a class="ref" href="/an5.28">AN 5.28</a>`}
              </dd>
              <dd>
                ${_`soiled <span class="subject">conceit</span> <a class="ref" href="/sn22.89">SN 22.89</a>`}
              </dd>
              <dd>
                ${_`to be dyed <span class="subject">defiled and undefiled mind</span> <a class="ref" href="/mn7">MN 7</a>, <a class="ref" href="/ud5.3">Ud 5.3</a>`}
              </dd>
              <dd>
              </dd>
              <dt>
                ${_`Cock’s feather in fire`}
              </dt>
              <dd>
                ${_`<span class="subject">unattractiveness</span> <a class="ref" href="/an7.46">AN 7.46</a>`}
              </dd>
              <dt>
                ${_`Conch-trumpet blower`}
              </dt>
              <dd>
                ${_`<span class="subject">sublime attitudes</span> <a class="ref" href="/sn42.8">SN 42.8</a>`}
              </dd>
              <dt>
                ${_`Constellations`}
              </dt>
              <dd>
                ${_`<span class="subject">heedfulness</span> <a class="ref" href="/an10.15">AN 10.15</a>`}
              </dd>
              <dt>
                ${_`Cosmos`}
              </dt>
              <dd>
                ${_`walking to the end of the <span class="subject">suffering</span> <a class="ref" href="/an9.38">AN 9.38</a>`}
              </dd>
              <dt>
                ${_`Cotton tuft`}
              </dt>
              <dd>
                ${_`<span class="subject">rapture</span> <a class="ref" href="/thag1.104">Thag 1.104</a>`}
              </dd>
              <dt>
                ${_`Couple eating their child`}
              </dt>
              <dd>
                ${_`<span class="subject">purpose of food</span> <a class="ref" href="/sn12.63">SN 12.63</a>`}
              </dd>
              <dt id="cow">
                ${_`Cow`}
              </dt>
              <dd>
                ${_`butchered <span class="subject">meditation on the four properties</span> <a class="ref" href="/dn22">DN 22</a>, <a class="ref" href="/mn119">MN 119</a>`}
              </dd>
              <dd>
                ${_`flayed <span class="subject">contact</span> <a class="ref" href="/sn12.63">SN 12.63</a>`}
              </dd>
              <dd>
                ${_`led to slaughter <span class="subject">inevitability of death</span> <a class="ref" href="/an7.70">AN 7.70</a>, <a class="ref" href="/snp3.8">Snp 3.8</a>`}
              </dd>
              <dd>
                ${_`milked dry <span class="subject">lack of moderation</span> <a class="ref" href="/mn33">MN 33</a>, <a class="ref" href="/an11.18">AN 11.18</a>`}
              </dd>
              <dd>
                ${_`producing milk, curds, butter, ghee, etc. <span class="subject">practice for oneself and others</span> <a class="ref" href="/an4.95">AN 4.95</a>`}
              </dd>
              <dd>
                ${_`roaming in the mountains <span class="subject">mastery of jhāna</span> <a class="ref" href="/an9.35">AN 9.35</a>`}
              </dd>
              <dd>
                ${_`skinned <span class="subject">sensuality</span> <a class="ref" href="/mn146">MN 146</a>`}
              </dd>
              <dd>
                ${_`that runs away <span class="subject">fool</span> <a class="ref" href="/sn11.5">SN 11.5</a>`}
              </dd>
              <dd>
                ${_`udder <span class="subject">brief time</span> <a class="ref" href="/sn20.4">SN 20.4</a>`}
              </dd>
              <dd>
                ${_`See also <a href="#bull">Bull</a>, <a href="#butcher">Butcher</a>.`}
              </dd>
              <dt id="cowherd">
                ${_`Cowherd`}
              </dt>
              <dd>
                ${_`competent <span class="subject">skillfulness</span> <a class="ref" href="/mn33">MN 33</a>, <a class="ref" href="/an11.18">AN 11.18</a>`}
              </dd>
              <dd>
                ${_`counting another’s cattle <span class="subject">heedlessness</span> <a class="ref" href="/dhp19">Dhp 19</a>`}
              </dd>
              <dd>
                ${_`driving cattle <span class="subject">aging and death</span> <a class="ref" href="/dhp135">Dhp 135</a>`}
              </dd>
              <dd>
                ${_`incompetent <span class="subject">unskillfulness</span> <a class="ref" href="/mn33">MN 33</a>, <a class="ref" href="/an11.18">AN 11.18</a>`}
              </dd>
              <dd>
                ${_`mindful of his cows <span class="subject">skillfulness</span> <a class="ref" href="/mn19">MN 19</a>`}
              </dd>
              <dd>
                ${_`prodding and poking his cows <span class="subject">skillfulness</span> <a class="ref" href="/mn19">MN 19</a>`}
              </dd>
              <dd>
                ${_`reflecting on the places his cattle have wandered <span class="subject">uposatha</span> <a class="ref" href="/an3.70">AN 3.70</a>`}
              </dd>
              <dd>
                ${_`See also <a href="#bull">Bull</a>, <a href="#cow">Cow</a>.`}
              </dd>
              <dt id="crafts">
                ${_`Crafts, Trades, and Professions`}
              </dt>
              <dd>
                ${_`See <a href="#archer">Archer</a>, <a href="#bathman">Bathman</a>, <a href="#butcher">Butcher</a>, <a href="#carpenter">Carpenter</a>, <a href="#charioteer">Charioteer</a>, <a href="#cowherd">Cowherd</a>, <a href="#doctor">Doctor</a>, <a href="#e-tamer">Elephant tamer</a>, <a href="#fletcher">Fletcher</a>, <a href="#goldsmith">Goldsmith</a>, <a href="#horsetrainer">Horsetrainer</a>, <a href="#irrigator">Irrigator</a>, <a href="#ivory">Ivory carver</a>, <a href="#king">King</a>, <a href="#magician">Magician</a>, <a href="#potter">Potter</a>, <a href="#silversmith">Silversmith</a>, <a href="#trader">Trader</a>, <a href="#turner">Turner</a>, <a href="#warrior">Warrior</a>, <a href="#weigher">Weigher</a>.`}
              </dd>
              <dt>
                ${_`Creeper pod`}
              </dt>
              <dd>
                ${_`<span class="subject">future dangers</span> <a class="ref" href="/mn45">MN 45</a>`}
              </dd>
              <dt>
                ${_`Crooked chariot wheels`}
              </dt>
              <dd>
                ${_`<span class="subject">faults</span> <a class="ref" href="/an3.15">AN 3.15</a>`}
              </dd>
              <dt>
                ${_`Cymbals striking together`}
              </dt>
              <dd>
                ${_`<span class="subject">contact</span> <a class="ref" href="/mil2.3.8">Mil 2.3.8</a>`}
              </dd>
            </dl>
            <h2>
              ${_`<a id="d">D</a>`}
            </h2>
            <dl>
              <dt>
                ${_`Darkness, intergalactic`}
              </dt>
              <dd>
                ${_`<span class="subject">fear of birth, aging, and death</span> <a class="ref" href="/sn56.46">SN 56.46</a>`}
              </dd>
              <dt>
                ${_`Debt`}
              </dt>
              <dd>
                ${_`<span class="subject">conviction</span> <a class="ref" href="/an6.45">AN 6.45</a>`}
              </dd>
              <dt>
                ${_`Deer that wanders in the wilderness`}
              </dt>
              <dd>
                ${_`<span class="subject">solitude</span> <a class="ref" href="/snp1.3">Snp 1.3</a>`}
              </dd>
              <dt>
                ${_`Dewdrop on tip of grass blade`}
              </dt>
              <dd>
                ${_`<span class="subject">brevity of life</span> <a class="ref" href="/an7.70">AN 7.70</a>`}
              </dd>
              <dt>
                ${_`Digging in earth`}
              </dt>
              <dd>
                ${_`<span class="subject">speech</span> <a class="ref" href="/mn21">MN 21</a>`}
              </dd>
              <dt>
                ${_`Dirt-washer`}
              </dt>
              <dd>
                ${_`<span class="subject">purifying the mind</span> <a href="an03.100.1-10">AN 3.100 (i-x)</a>`}
              </dd>
              <dt id="doctor">
                ${_`Doctor`}
              </dt>
              <dd>
                ${_`<span class="subject">the Buddha</span> <a class="ref" href="/mn63">MN 63</a>, <a class="ref" href="/mn105">MN 105</a>. See also <a href="#arrow">Arrow</a>.`}
              </dd>
              <dt>
                ${_`Dog`}
              </dt>
              <dd>
                ${_`chasing swine <span class="subject">gratitude</span> <a class="ref" href="/sn7.14">SN 7.14</a>`}
              </dd>
              <dd>
                ${_`gnawing on a chain of bones <span class="subject">sensuality</span> <a class="ref" href="/mn54">MN 54</a>`}
              </dd>
              <dd>
                ${_`tied to a post <span class="subject">self-view</span> <a class="ref" href="/sn22.99">SN 22.99</a>, <a class="ref" href="/sn22.100">SN 22.100</a>`}
              </dd>
              <dd>
              </dd>
              <dt>
                ${_`Donkey that thinks it’s a cow`}
              </dt>
              <dd>
                ${_`<span class="subject">insincerity with regard to the Dhamma</span> <a class="ref" href="/an3.81">AN 3.81</a>`}
              </dd>
              <dt>
                ${_`Drawing pictures in space`}
              </dt>
              <dd>
                ${_`<span class="subject">speech</span> <a class="ref" href="/mn21">MN 21</a>`}
              </dd>
              <dt>
                ${_`Dream, waking from`}
              </dt>
              <dd>
                ${_`<span class="subject">sensuality</span> <a class="ref" href="/mn54">MN 54</a>`}
              </dd>
              <dd>
                ${_`<span class="subject">death</span> <a class="ref" href="/snp4.6">Snp 4.6</a>`}
              </dd>
              <dd>
              </dd>
              <dt>
                ${_`Drinking water`}
              </dt>
              <dd>
                ${_`<span class="subject">subduing hatred</span> from a clear pool <a class="ref" href="/an5.162">AN 5.162</a>`}
              </dd>
              <dd>
                ${_`from a dirty pool <a class="ref" href="/an5.162">AN 5.162</a>`}
              </dd>
              <dd>
                ${_`from a puddle in a hoofprint <a class="ref" href="/an5.162">AN 5.162</a>`}
              </dd>
              <dd>
              </dd>
              <dt>
                ${_`Drum peg`}
              </dt>
              <dd>
                ${_`<span class="subject">listening to Dhamma</span> <a class="ref" href="/sn20.7">SN 20.7</a>`}
              </dd>
              <dt>
                ${_`Dry piece of wood`}
              </dt>
              <dd>
                ${_`<span class="subject">mindfulness</span> <a class="ref" href="/mn119">MN 119</a>`}
              </dd>
              <dt>
                ${_`Dung beetle`}
              </dt>
              <dd>
                ${_`<span class="subject">pride</span> <a class="ref" href="/sn17.5">SN 17.5</a>`}
              </dd>
              <dt>
                ${_`Dust`}
              </dt>
              <dd>
                ${_`on a fingertip <span class="subject">dukkha</span> <a class="ref" href="/sn13.1">SN 13.1</a>, <span class="subject">rarity of human birth</span> <a class="ref" href="/sn20.2">SN 20.2</a>`}
              </dd>
              <dd>
                ${_`thrown into wind <span class="subject">evil</span> <a class="ref" href="/dhp125">Dhp 125</a>`}
              </dd>
              <dd>
              </dd>
              <dt>
                ${_`Dusty road`}
              </dt>
              <dd>
                ${_`<span class="subject">household life</span> <a class="ref" href="/dn2">DN 2</a>, <a class="ref" href="/dn11">DN 11</a>, <a class="ref" href="/dn12">DN 12</a>, <a class="ref" href="/mn36">MN 36</a>, <a class="ref" href="/mn125">MN 125</a>`}
              </dd>
            </dl>
            <h2>
              ${_`<a id="e">E</a>`}
            </h2>
            <dl>
              <dt>
                ${_`Earth`}
              </dt>
              <dd>
                ${_`<span class="subject">arahant</span> <a class="ref" href="/dhp95">Dhp 95</a>`}
              </dd>
              <dt id="elephant">
                ${_`Elephant`}
              </dt>
              <dd>
                ${_`and the blind men <span class="subject">ignorance</span> <a class="ref" href="/ud6.4">Ud 6.4</a>`}
              </dd>
              <dd>
                ${_`footprint <span class="subject">four noble truths</span> <a class="ref" href="/mn28">MN 28</a>, <span class="subject">heedfulness</span> <a class="ref" href="/sn3.17">SN 3.17</a>, <a class="ref" href="/an10.15">AN 10.15</a>`}
              </dd>
              <dd>
                ${_`in battle <span class="subject">patient endurance</span> <a class="ref" href="/dhp320">Dhp 320</a>, <a class="ref" href="/thag3.8">Thag 3.8</a>`}
              </dd>
              <dd>
                ${_`in battle <span class="subject">sensual passion</span> <a class="ref" href="/an5.139">AN 5.139</a>, <span class="subject">sense-restraint</span> <a class="ref" href="/an5.140">AN 5.140</a>`}
              </dd>
              <dd>
                ${_`in rut <span class="subject">self-control</span> <a class="ref" href="/dhp324">Dhp 324</a>, <a class="ref" href="/dhp326">Dhp 326</a>`}
              </dd>
              <dd>
                ${_`in the wild <span class="subject">mature companion</span> <a class="ref" href="/snp1.3">Snp 1.3</a>`}
              </dd>
              <dd>
                ${_`relieves an itch <span class="subject">solitude in the wilderness</span> <a class="ref" href="/an9.40">AN 9.40</a>`}
              </dd>
              <dd>
                ${_`renouncing its herd <span class="subject">solitude in the wilderness</span> <a class="ref" href="/snp1.3">Snp 1.3</a>`}
              </dd>
              <dd>
                ${_`snared <span class="subject">attachments</span> <a class="ref" href="/mn66">MN 66</a>`}
              </dd>
              <dd>
                ${_`stuck in mud <span class="subject">heedfulness</span> <a class="ref" href="/dhp327">Dhp 327</a>`}
              </dd>
              <dd>
                ${_`tamable <span class="subject">factors for exertion</span> <a class="ref" href="/mn90">MN 90</a>`}
              </dd>
              <dd>
                ${_`tamed <span class="subject">self-training</span> <a class="ref" href="/dhp322">Dhp 322</a>`}
              </dd>
              <dd>
              </dd>
              <dt id="e-tamer">
                ${_`Elephant-tamer`}
              </dt>
              <dd>
                ${_`<span class="subject">renunciation</span> <a class="ref" href="/mn125">MN 125</a>`}
              </dd>
              <dt>
                ${_`Embers in a pit`}
              </dt>
              <dd>
                ${_`<span class="subject">passion</span> <a class="ref" href="/thig14">Thig 14</a>`}
              </dd>
              <dt>
                ${_`Empty water pot`}
              </dt>
              <dd>
                ${_`<span class="subject">mindfulness</span> <a class="ref" href="/mn119">MN 119</a>`}
              </dd>
              <dt>
                ${_`Executioner`}
              </dt>
              <dd>
                ${_`five <span class="subject">aggregates</span> <a class="ref" href="/sn35.197">SN 35.197</a>`}
              </dd>
              <dd>
                ${_`sixth <span class="subject">passion/delight</span> <a class="ref" href="/sn35.197">SN 35.197</a>`}
              </dd>
              <dd>
              </dd>
              <dt>
                ${_`Eyes, man opening and closing his`}
              </dt>
              <dd>
                ${_`<span class="subject">faculties</span> <a class="ref" href="/mn152">MN 152</a>`}
              </dd>
            </dl>
            <h2>
              ${_`<a id="f">F</a>`}
            </h2>
            <dl>
              <dt>
                ${_`False path in the forest`}
              </dt>
              <dd>
                ${_`<span class="subject">wrong eightfold path</span> <a class="ref" href="/mn19">MN 19</a>`}
              </dd>
              <dt>
                ${_`Farmer’s urgent duties`}
              </dt>
              <dd>
                ${_`<span class="subject">self-training</span> <a class="ref" href="/an3.91">AN 3.91</a>`}
              </dd>
              <dt>
                ${_`Field`}
              </dt>
              <dd>
                ${_`neglecting one’s own <span class="subject">teaching Dhamma</span> <a class="ref" href="/dn12">DN 12</a>`}
              </dd>
              <dd>
                ${_`spoiled by weeds <span class="subject">passion</span> <a class="ref" href="/dhp356">Dhp 356</a>`}
              </dd>
              <dd>
              </dd>
              <dt id="fire">
                ${_`Fire`}
              </dt>
              <dd>
                ${_`<span class="subject">clinging</span> <a class="ref" href="/sn12.52">SN 12.52</a>, <a class="ref" href="/sn35.28">SN 35.28</a>, <a class="ref" href="/sn44.9">SN 44.9</a>`}
              </dd>
              <dd>
                ${_`<span class="subject">discernment</span> <a class="ref" href="/thag1.3">Thag 1.3</a>`}
              </dd>
              <dd>
                ${_`<span class="subject">heedfulness</span> <a class="ref" href="/dhp31">Dhp 31</a>`}
              </dd>
              <dd>
                ${_`<span class="subject">passion</span> <a class="ref" href="/dhp251">Dhp 251</a>`}
              </dd>
              <dd>
                ${_`<span class="subject">restlessness</span> <a class="ref" href="/sn46.53">SN 46.53</a>`}
              </dd>
              <dd>
                ${_`<span class="subject">sluggishness</span> <a class="ref" href="/sn46.53">SN 46.53</a>`}
              </dd>
              <dd>
                ${_`fire’s destination <span class="subject">nibbana</span> <a class="ref" href="/ud8.10">Ud 8.10</a>`}
              </dd>
              <dd>
                ${_`fire not returning <span class="subject">solitude in the wilderness</span> <a class="ref" href="/snp1.3">Snp 1.3</a>`}
              </dd>
              <dd>
                ${_`hidden in ashes <span class="subject">unskillful action</span> <a class="ref" href="/dhp71">Dhp 71</a>`}
              </dd>
              <dd>
                ${_`different types of fire <span class="subject">classes of consciousness</span> <a class="ref" href="/mn38">MN 38</a>`}
              </dd>
              <dd>
                ${_`different types of fire <span class="subject">virtue and results thereof</span> <a class="ref" href="/mn93">MN 93</a>`}
              </dd>
              <dd>
              </dd>
              <dt>
                ${_`Fire-stick`}
              </dt>
              <dd>
                ${_`<span class="subject">sensuality</span> <a class="ref" href="/mn36">MN 36</a>`}
              </dd>
              <dd>
                ${_`<span class="subject">feeling</span> <a class="ref" href="/sn48.39">SN 48.39</a>`}
              </dd>
              <dd>
              </dd>
              <dt>
                ${_`Firebrand with excrement`}
              </dt>
              <dd>
                ${_`<span class="subject">practicing Dhamma for no one’s benefit</span> <a class="ref" href="/an4.95">AN 4.95</a>`}
              </dd>
              <dd>
                ${_`<span class="subject">failing to practice Dhamma</span> <a class="ref" href="/sn22.80">SN 22.80</a>, <a class="ref" href="/iti91">Iti 91</a>`}
              </dd>
              <dd>
              </dd>
              <dt>
                ${_`Fish`}
              </dt>
              <dd>
                ${_`caught in net <span class="subject">solitude in the wilderness</span> <a class="ref" href="/snp1.3">Snp 1.3</a>, <span class="subject">sensuality</span> <a class="ref" href="/thag4.8">Thag 4.8</a>`}
              </dd>
              <dd>
                ${_`caught in trap <span class="subject">sensuality</span> <a class="ref" href="/ud7.4">Ud 7.4</a>`}
              </dd>
              <dd>
                ${_`caught on a hook <span class="subject">six senses</span> <a class="ref" href="/sn35.189">SN 35.189</a>`}
              </dd>
              <dd>
                ${_`in dried-up puddle <span class="subject">self-view</span> <a class="ref" href="/snp4.2">Snp 4.2</a>, <a class="ref" href="/sn5.10">SN 5.10</a>`}
              </dd>
              <dd>
                ${_`flip-flapping on dry land <span class="subject">unsteady mind</span> <a class="ref" href="/dhp34">Dhp 34</a>`}
              </dd>
              <dd>
                ${_`rising through the water <span class="subject">recognizing a wise person</span> <a class="ref" href="/an4.192">AN 4.192</a>`}
              </dd>
              <dd>
                ${_`rotten and wrapped in grass <span class="subject">associating with fools</span> <a class="ref" href="/iti76">Iti 76</a>`}
              </dd>
              <dd>
                ${_`struggling in water <span class="subject">quarreling</span> <a class="ref" href="/snp4.15">Snp 4.15</a>`}
              </dd>
              <dd>
              </dd>
              <dt>
                ${_`Fisherman`}
              </dt>
              <dd>
                ${_`<span class="subject">Māra</span> <a class="ref" href="/sn35.189">SN 35.189</a>`}
              </dd>
              <dt>
                ${_`Flame`}
              </dt>
              <dd>
                ${_`overthrown by wind<span class="subject">arahant</span> <a class="ref" href="/snp5.6">Snp 5.6</a>`}
              </dd>
              <dd>
                ${_`passed from one lamp to another <span class="subject">rebirth</span> <a class="ref" href="/mil3.5.5">Mil 3.5.5</a>`}
              </dd>
              <dd>
                ${_`unbinding of <span class="subject">nibbana</span> <a class="ref" href="/thig5.10">Thig 5.10</a>`}
              </dd>
              <dd>
              </dd>
              <dt>
                ${_`<a id="fletcher">Fletcher</a> straightening an arrow`}
              </dt>
              <dd>
                ${_`<span class="subject">exertion</span> <a class="ref" href="/mn101">MN 101</a>`}
              </dd>
              <dd>
                ${_`<span class="subject">training the mind</span> <a class="ref" href="/dhp33">Dhp 33</a>, <a class="ref" href="/thag1.29">Thag 1.29</a>`}
              </dd>
              <dd>
                ${_`<span class="subject">restraint</span> <a class="ref" href="/dhp145">Dhp 145</a>, <a class="ref" href="/dhp80">Dhp 80</a>`}
              </dd>
              <dd>
                ${_`See also <a href="#arrow">Arrow</a>.`}
              </dd>
              <dt>
                ${_`Flies’ eggs`}
              </dt>
              <dd>
                ${_`<span class="subject">sensuality</span> <a class="ref" href="/mn33">MN 33</a>, <a class="ref" href="/an11.18">AN 11.18</a>`}
              </dd>
              <dt id="flood">
                ${_`Flood`}
              </dt>
              <dd>
                ${_`<span class="subject">craving, sensuality, becoming, ignorance</span> <a class="ref" href="/sn1.1">SN 1.1</a>, <a class="ref" href="/sn45.171">SN 45.171</a>`}
              </dd>
              <dd>
                ${_`<span class="subject">greed</span> <a class="ref" href="/snp4.15">Snp 4.15</a>`}
              </dd>
              <dd>
                ${_`sweeping away a sleeping village <span class="subject">death</span> <a class="ref" href="/dhp47">Dhp 47</a>, <a class="ref" href="/dhp286">Dhp 286</a>`}
              </dd>
              <dd>
                ${_`See also <a href="#river">River</a>, <a href="#ocean">Ocean</a>.`}
              </dd>
              <dt id="flower">
                ${_`Flower`}
              </dt>
              <dd>
                ${_`blossom <span class="subject">speech</span> <a class="ref" href="/dhp51">Dhp 51</a>`}
              </dd>
              <dd>
                ${_`heap <span class="subject">skillfulness</span> <a class="ref" href="/dhp53">Dhp 53</a>`}
              </dd>
              <dd>
                ${_`scent <span class="subject">integrity</span> <a class="ref" href="/dhp54">Dhp 54</a>`}
              </dd>
              <dd>
                ${_`See also <a href="#lotus">Lotus</a>.`}
              </dd>
              <dt>
                ${_`Flower-arranger`}
              </dt>
              <dd>
                ${_`<span class="subject">Dhamma follower</span> <a class="ref" href="/dhp44">Dhp 44</a>`}
              </dd>
              <dt>
                ${_`Foam`}
              </dt>
              <dd>
                ${_`<span class="subject">the body/form</span> <a class="ref" href="/sn22.95">SN 22.95</a>, <a class="ref" href="/dhp46">Dhp 46</a>`}
              </dd>
              <dt>
                ${_`Fords`}
              </dt>
              <dd>
                ${_`<span class="subject">asking questions</span> <a class="ref" href="/mn33">MN 33</a>, <a class="ref" href="/an11.18">AN 11.18</a>`}
              </dd>
              <dt>
                ${_`Forest`}
              </dt>
              <dd>
                ${_`<span class="subject">desire</span> <a class="ref" href="/dhp283">Dhp 283</a>`}
              </dd>
              <dd>
                ${_`<span class="subject">Dhamma</span> <a class="ref" href="/snp2.1">Snp 2.1</a>`}
              </dd>
              <dd>
              </dd>
              <dt>
                ${_`Fort`}
              </dt>
              <dd>
                ${_`<span class="subject">mind</span> <a class="ref" href="/dhp40">Dhp 40</a>`}
              </dd>
              <dt>
                ${_`Fragrances`}
              </dt>
              <dd>
                ${_`<span class="subject">heedfulness</span> flower <a class="ref" href="/an10.15">AN 10.15</a>`}
              </dd>
              <dd>
                ${_`root <a class="ref" href="/an10.15">AN 10.15</a>`}
              </dd>
              <dd>
                ${_`wood <a class="ref" href="/an10.15">AN 10.15</a>`}
              </dd>
              <dd>
              </dd>
              <dt>
                ${_`Frontier fortress`}
              </dt>
              <dd>
                ${_`<span class="subject">the body</span> <a class="ref" href="/sn35.204">SN 35.204</a>`}
              </dd>
              <dd>
                ${_`<span class="subject">seven skillful qualities</span> <a class="ref" href="/an7.63">AN 7.63</a>`}
              </dd>
              <dd>
                ${_`<span class="subject">liberation is not for everyone</span> <a class="ref" href="/an10.95">AN 10.95</a>`}
              </dd>
              <dd>
                ${_`<span class="subject">guarding oneself</span> <a class="ref" href="/dhp315">Dhp 315</a>, <a class="ref" href="/thag14.1">Thag 14.1</a>`}
              </dd>
              <dd>
                ${_`foundation post <span class="subject">conviction</span> <a class="ref" href="/an7.63">AN 7.63</a>`}
              </dd>
              <dd>
                ${_`moat <span class="subject">shame</span> <a class="ref" href="/an7.63">AN 7.63</a>`}
              </dd>
              <dd>
                ${_`encircling road <span class="subject">concern</span> <a class="ref" href="/an7.63">AN 7.63</a>`}
              </dd>
              <dd>
                ${_`weapons <span class="subject">learning</span> <a class="ref" href="/an7.63">AN 7.63</a>`}
              </dd>
              <dd>
                ${_`army <span class="subject">persistence</span> <a class="ref" href="/an7.63">AN 7.63</a>`}
              </dd>
              <dd>
                ${_`gate-keeper <span class="subject">mindfulness</span> <a class="ref" href="/an7.63">AN 7.63</a>`}
              </dd>
              <dd>
                ${_`ramparts <span class="subject">discernment</span> <a class="ref" href="/an7.63">AN 7.63</a>`}
              </dd>
              <dd>
                ${_`stores of grass <span class="subject">1<sup>st</sup> jhāna</span> <a class="ref" href="/an7.63">AN 7.63</a>`}
              </dd>
              <dd>
                ${_`stores of rice <span class="subject">2<sup>nd</sup> jhāna</span> <a class="ref" href="/an7.63">AN 7.63</a>`}
              </dd>
              <dd>
                ${_`stores of sesame <span class="subject">3<sup>rd</sup> jhāna</span> <a class="ref" href="/an7.63">AN 7.63</a>`}
              </dd>
              <dd>
                ${_`stores of tonics <span class="subject">4<sup>th</sup> jhāna</span> <a class="ref" href="/an7.63">AN 7.63</a>`}
              </dd>
              <dd>
              </dd>
              <dt>
                ${_`Fruit, ripe`}
              </dt>
              <dd>
                ${_`<span class="subject">death</span> <a class="ref" href="/snp3.8">Snp 3.8</a>`}
              </dd>
              <dt>
                ${_`Full moon`}
              </dt>
              <dd>
                ${_`<span class="subject">discernment</span> <a class="ref" href="/thig1.3">Thig 1.3</a>. See <a href="#moon">Moon</a>.`}
              </dd>
              <dt>
                ${_`Full water pot`}
              </dt>
              <dd>
                ${_`<span class="subject">mindfulness</span> <a class="ref" href="/mn119">MN 119</a>`}
              </dd>
              <dt>
                ${_`Fumigation`}
              </dt>
              <dd>
                ${_`<span class="subject">teaching Dhamma</span> <a class="ref" href="/mn33">MN 33</a>, <a class="ref" href="/an11.18">AN 11.18</a>`}
              </dd>
            </dl>
            <h2>
              ${_`<a id="g">G</a>`}
            </h2>
            <dl>
              <dt>
                ${_`Gem with colored thread inside`}
              </dt>
              <dd>
                ${_`<span class="subject">clear seeing</span> <a class="ref" href="/dn2">DN 2</a>, <a class="ref" href="/dn11">DN 11</a>, <a class="ref" href="/dn12">DN 12</a>`}
              </dd>
              <dt>
                ${_`Gift of food`}
              </dt>
              <dd>
                ${_`<span class="subject">love</span> <a class="ref" href="/sn20.4">SN 20.4</a>`}
              </dd>
              <dt>
                ${_`Goat butcher`}
              </dt>
              <dd>
                ${_`<span class="subject">kamma</span> <a class="ref" href="/an3.99">AN 3.99</a>`}
              </dd>
              <dt>
                ${_`Gold`}
              </dt>
              <dd>
                ${_`coins raining <span class="subject">sensuality</span> <a class="ref" href="/dhp186">Dhp 186</a>`}
              </dd>
              <dd>
                ${_`disappearance of <span class="subject">disappearance of Dhamma</span> <a class="ref" href="/sn16.13">SN 16.13</a>`}
              </dd>
              <dd>
                ${_`ingot <span class="subject">discernment and virtue</span> <a class="ref" href="/dhp229">Dhp 229</a>`}
              </dd>
              <dd>
                ${_`mountain <span class="subject">sensuality</span> <a class="ref" href="/sn4.20">SN 4.20</a>`}
              </dd>
              <dd>
                ${_`ornament <span class="subject">arahant</span> <a class="ref" href="/an4.28">AN 4.28</a>`}
              </dd>
              <dd>
              </dd>
              <dt id="goldsmith">
                ${_`Goldsmith`}
              </dt>
              <dd>
                ${_`purifying gold <span class="subject">purifying the mind</span> <a href="an03.100.1-10">AN 3.100 (i-x)</a>, <a href="an03.100.11-15#goldsmith">AN 3.100 (xi-xv)</a>`}
              </dd>
              <dd>
                ${_`crafting any kind of article <span class="subject">supranormal powers</span> <a class="ref" href="/dn2">DN 2</a>, <a class="ref" href="/dn11">DN 11</a>`}
              </dd>
              <dd>
              </dd>
              <dt>
                ${_`Gong`}
              </dt>
              <dd>
                ${_`<span class="subject">applied and sustained thought</span> <a class="ref" href="/mil2.3.14">Mil 2.3.14</a>`}
              </dd>
              <dt>
                ${_`Gourds in autumn`}
              </dt>
              <dd>
                ${_`<span class="subject">bones</span> <a class="ref" href="/dhp149">Dhp 149</a>`}
              </dd>
              <dt>
                ${_`Grass`}
              </dt>
              <dd>
                ${_`with sharp blades<span class="subject">wrong practice</span> <a class="ref" href="/dhp311">Dhp 311</a>`}
              </dd>
              <dd>
                ${_`wild grass after rain <span class="subject">dukkha</span> <a class="ref" href="/dhp335">Dhp 335</a>`}
              </dd>
              <dd>
              </dd>
              <dt>
                ${_`Green reed cut down`}
              </dt>
              <dd>
                ${_`<span class="subject">foolish person</span> <a class="ref" href="/sn1.10">SN 1.10</a>`}
              </dd>
              <dt>
                ${_`Ground far from the sky`}
              </dt>
              <dd>
                ${_`<span class="subject">foolish person</span> <a class="ref" href="/sn5.10">SN 5.10</a>`}
              </dd>
              <dt>
                ${_`Guest house`}
              </dt>
              <dd>
                ${_`<span class="subject">feelings in the body</span> <a class="ref" href="/sn36.14">SN 36.14</a>`}
              </dd>
              <dt>
                ${_`Guest refusing the host’s food`}
              </dt>
              <dd>
                ${_`<span class="subject">insulting behavior</span> <a class="ref" href="/sn7.2">SN 7.2</a>`}
              </dd>
            </dl>
            <h2>
              ${_`<a id="h">H</a>`}
            </h2>
            <dl>
              <dt>
                ${_`Handful of leaves`}
              </dt>
              <dd>
                ${_`<span class="subject">Dhamma</span> <a class="ref" href="/sn56.31">SN 56.31</a>`}
              </dd>
              <dt>
                ${_`Hands clapping`}
              </dt>
              <dd>
                ${_`<span class="subject">contact</span> <a class="ref" href="/mil2.3.8">Mil 2.3.8</a>`}
              </dd>
              <dt>
                ${_`Hawk attacking quail`}
              </dt>
              <dd>
                ${_`<span class="subject">mindfulness</span> <a class="ref" href="/sn47.6">SN 47.6</a>`}
              </dd>
              <dt>
                ${_`Head of snake`}
              </dt>
              <dd>
                ${_`<span class="subject">sensuality</span> <a class="ref" href="/snp4.1">Snp 4.1</a>`}
              </dd>
              <dt>
                ${_`Head on fire`}
              </dt>
              <dd>
                ${_`See <a href="#turban">Turban on fire</a>`}
              </dd>
              <dt>
                ${_`Head sliced open with sword`}
              </dt>
              <dd>
                ${_`<span class="subject">pain</span> <a class="ref" href="/mn36">MN 36</a>`}
              </dd>
              <dt>
                ${_`Heartwood`}
              </dt>
              <dd>
                ${_`<span class="subject">goal of the Dhamma</span> <a class="ref" href="/mn29">MN 29</a>, <a class="ref" href="/mn30">MN 30</a>, <a class="ref" href="/mn35">MN 35</a>`}
              </dd>
              <dd>
                ${_`<span class="subject">the Buddha</span> <a class="ref" href="/mn18">MN 18</a>, <a class="ref" href="/mn138">MN 138</a>`}
              </dd>
              <dd>
                ${_`<span class="subject">appropriate attention</span> <a class="ref" href="/sn22.95">SN 22.95</a>`}
              </dd>
              <dd>
                ${_`<span class="subject">not-self</span> <a class="ref" href="/sn35.193">SN 35.193</a>`}
              </dd>
              <dd>
              </dd>
              <dt>
                ${_`Hell, saved from`}
              </dt>
              <dd>
                ${_`<span class="subject">Dhamma</span> <a class="ref" href="/dn12">DN 12</a>`}
              </dd>
              <dt>
                ${_`Hen covering her eggs`}
              </dt>
              <dd>
                ${_`<span class="subject">virtue, etc.</span> <a class="ref" href="/mn53">MN 53</a>, <a class="ref" href="/sn22.101">SN 22.101</a>`}
              </dd>
              <dt>
                ${_`Herd of cattle`}
              </dt>
              <dd>
                ${_`<span class="subject">arahant</span> <a class="ref" href="/an3.57">AN 3.57</a>`}
              </dd>
              <dt>
                ${_`Herons wasting away`}
              </dt>
              <dd>
                ${_`<span class="subject">falling short of celibacy</span> <a class="ref" href="/dhp155">Dhp 155</a>`}
              </dd>
              <dt>
                ${_`Himalayas`}
              </dt>
              <dd>
                ${_`<span class="subject">good people</span> <a class="ref" href="/dhp304">Dhp 304</a>`}
              </dd>
              <dt>
                ${_`Hog, fat and lazy`}
              </dt>
              <dd>
                ${_`<span class="subject">foolish person</span> <a class="ref" href="/dhp325">Dhp 325</a>`}
              </dd>
              <dt>
                ${_`Honey ball`}
              </dt>
              <dd>
                ${_`<span class="subject">flavor of Dhamma</span> <a class="ref" href="/mn18">MN 18</a>`}
              </dd>
              <dt>
                ${_`Hooks`}
              </dt>
              <dd>
                ${_`<span class="subject">six senses</span> <a class="ref" href="/sn35.189">SN 35.189</a>`}
              </dd>
              <dt id="horse">
                ${_`Horse`}
              </dt>
              <dd>
                ${_`awakened by the whip <span class="subject">conscience</span> <a class="ref" href="/sn1.18">SN 1.18</a>`}
              </dd>
              <dd>
                ${_`deprived of fodder <span class="subject">father of fools</span> <a class="ref" href="/sn7.14">SN 7.14</a>`}
              </dd>
              <dd>
                ${_`fast <span class="subject">wise person</span> <a class="ref" href="/dhp29">Dhp 29</a>`}
              </dd>
              <dd>
                ${_`stallion <span class="subject">self-training</span> <a class="ref" href="/dhp94">Dhp 94</a>, <a class="ref" href="/dhp144">Dhp 144</a>, <a class="ref" href="/dhp380">Dhp 380</a>`}
              </dd>
              <dd>
                ${_`stirred by a goad-stick <span class="subject">trainable person</span> <a class="ref" href="/an4.113">AN 4.113</a>`}
              </dd>
              <dd>
                ${_`tamed <span class="subject">self-tamed person</span> <a class="ref" href="/dhp322">Dhp 322</a>`}
              </dd>
              <dd>
                ${_`thoroughbred <span class="subject">arahant</span> <a class="ref" href="/thag2.27">Thag 2.27</a>, <a class="ref" href="/thig5.10">Thig 5.10</a>`}
              </dd>
              <dd>
                ${_`thoroughbred <span class="subject">jhāna</span> <a class="ref" href="/an11.10">AN 11.10</a>`}
              </dd>
              <dd>
                ${_`thoroughbred <span class="subject">qualities of a consummate monk</span> <a class="ref" href="/an3.94">AN 3.94</a>, <a class="ref" href="/an8.13">AN 8.13</a>`}
              </dd>
              <dd>
                ${_`unbroken colt <span class="subject">jhāna</span> <a class="ref" href="/an11.10">AN 11.10</a>`}
              </dd>
              <dd>
              </dd>
              <dt id="horsetrainer">
                ${_`Horsetrainer`}
              </dt>
              <dd>
                ${_`<span class="subject">trainable person</span> <a class="ref" href="/an4.111">AN 4.111</a>`}
              </dd>
              <dt id="house">
                ${_`House`}
              </dt>
              <dd>
                ${_`built from the bottom up <span class="subject">four noble truths</span> <a class="ref" href="/sn56.44">SN 56.44</a>`}
              </dd>
              <dd>
                ${_`fireproof <span class="subject">mindfulness/awareness</span> <a class="ref" href="/sn35.202">SN 35.202</a>`}
              </dd>
              <dd>
                ${_`flammable <span class="subject">mindfulness/awareness</span> <a class="ref" href="/sn35.202">SN 35.202</a>`}
              </dd>
              <dd>
                ${_`on fire <span class="subject">the body</span> <a class="ref" href="/sn1.41">SN 1.41</a>`}
              </dd>
              <dd>
                ${_`with poor roof <span class="subject">unguarded mind</span> <a class="ref" href="/an3.105">AN 3.105</a>`}
              </dd>
              <dd>
              </dd>
            </dl>
            <h2>
              ${_`<a id="i">I</a>`}
            </h2>
            <dl>
              <dt>
                ${_`Illness, man recovering from`}
              </dt>
              <dd>
                ${_`<span class="subject">hindrances</span> <a class="ref" href="/dn2">DN 2</a>, <a class="ref" href="/dn11">DN 11</a>, <a class="ref" href="/dn12">DN 12</a>, <a class="ref" href="/mn39">MN 39</a>`}
              </dd>
              <dt>
                ${_`Incense wrapped in leaf`}
              </dt>
              <dd>
                ${_`<span class="subject">associating with people of integrity</span> <a class="ref" href="/iti76">Iti 76</a>`}
              </dd>
              <dt>
                ${_`Indra’s pillar`}
              </dt>
              <dd>
                ${_`<span class="subject">arahant</span> <a class="ref" href="/dhp95">Dhp 95</a>`}
              </dd>
              <dt>
                ${_`Inscription in rock or water`}
              </dt>
              <dd>
                ${_`<span class="subject">anger</span> <a class="ref" href="/an3.130">AN 3.130</a>`}
              </dd>
              <dt>
                ${_`Insects falling into flame`}
              </dt>
              <dd>
                ${_`<span class="subject">ignorance</span> <a class="ref" href="/ud6.9">Ud 6.9</a>`}
              </dd>
              <dt>
                ${_`Iron ball aflame, eating or swallowing an`}
              </dt>
              <dd>
                ${_`<span class="subject">restraint</span> <a class="ref" href="/dhp307">Dhp 307</a>, <a class="ref" href="/iti48">Iti 48</a>, <a class="ref" href="/iti91">Iti 91</a>`}
              </dd>
              <dd>
                ${_`<span class="subject">sensuality</span> <a class="ref" href="/dhp371">Dhp 371</a>`}
              </dd>
              <dd>
              </dd>
              <dt id="irrigator">
                ${_`Irrigator`}
              </dt>
              <dd>
                ${_`<span class="subject">self-control</span> <a class="ref" href="/dhp80">Dhp 80</a>, <a class="ref" href="/dhp145">Dhp 145</a>`}
              </dd>
              <dt>
                ${_`Island`}
              </dt>
              <dd>
                ${_`<span class="subject">refuge in Dhamma</span> <a class="ref" href="/dn16">DN 16</a>, <a class="ref" href="/dn26">DN 26</a>, <a class="ref" href="/sn22.43">SN 22.43</a>, <a class="ref" href="/sn47.13">SN 47.13</a>, <a class="ref" href="/dhp25">Dhp 25</a>, <a class="ref" href="/dhp236">Dhp 236</a>, <a class="ref" href="/dhp238">Dhp 238</a>, <a class="ref" href="/snp5.10">Snp 5.10</a>`}
              </dd>
              <dt>
                ${_`<a id="ivory">Ivory carver</a> or his assistant`}
              </dt>
              <dd>
                ${_`<span class="subject">supranormal powers</span> <a class="ref" href="/dn2">DN 2</a>, <a class="ref" href="/dn11">DN 11</a>`}
              </dd>
            </dl>
            <h2>
              ${_`<a id="j">J</a>`}
            </h2>
            <dl>
              <dt>
                ${_`Jackal`}
              </dt>
              <dd>
                ${_`<span class="subject">the perils of fame</span> <a class="ref" href="/sn17.8">SN 17.8</a>`}
              </dd>
              <dt>
                ${_`Jail, person thrown in`}
              </dt>
              <dd>
                ${_`<span class="subject">kamma</span> <a class="ref" href="/an3.99">AN 3.99</a>`}
              </dd>
              <dt id="jar">
                ${_`Jar`}
              </dt>
              <dd>
                ${_`filled with water <span class="subject">right concentration</span> <a class="ref" href="/an5.28">AN 5.28</a>`}
              </dd>
              <dd>
                ${_`filled with ghee or oil <span class="subject">virtue</span> <a class="ref" href="/sn42.6">SN 42.6</a>, <a class="ref" href="/sn55.21">SN 55.21</a>`}
              </dd>
              <dd>
                ${_`made of clay <span class="subject">the body</span> <a class="ref" href="/dhp40">Dhp 40</a>`}
              </dd>
              <dd>
              </dd>
            </dl>
            <h2>
              ${_`<a id="k">K</a>`}
            </h2>
            <dl>
              <dt id="king">
                ${_`King`}
              </dt>
              <dd>
                ${_`hearing a lute <span class="subject">not-self</span> <a class="ref" href="/sn35.205">SN 35.205</a>`}
              </dd>
              <dd>
                ${_`renouncing kingdom <span class="subject">solitude in the wilderness</span> <a class="ref" href="/snp1.3">Snp 1.3</a>, <a class="ref" href="/dhp329">Dhp 329</a>`}
              </dd>
              <dd>
                ${_`seeing no danger after victory <span class="subject">virtue</span> <a class="ref" href="/dn2">DN 2</a>, <a class="ref" href="/dn11">DN 11</a>`}
              </dd>
              <dd>
              </dd>
            </dl>
            <h2>
              ${_`<a id="l">L</a>`}
            </h2>
            <dl>
              <dt id="lake">
                ${_`Lake`}
              </dt>
              <dd>
                ${_`deep and calm <span class="subject">wise people</span> <a class="ref" href="/dhp82">Dhp 82</a>`}
              </dd>
              <dd>
                ${_`dried-up <span class="subject">virtue</span> <a class="ref" href="/dhp155">Dhp 155</a>`}
              </dd>
              <dd>
                ${_`free of mud <span class="subject">arahant</span> <a class="ref" href="/dhp95">Dhp 95</a>`}
              </dd>
              <dd>
                ${_`person stranded in the middle <span class="subject">clinging</span> <a class="ref" href="/snp5.10">Snp 5.10</a>`}
              </dd>
              <dd>
                ${_`spring-fed <span class="subject">jhāna</span> <a class="ref" href="/dn2">DN 2</a>, <a class="ref" href="/dn11">DN 11</a>, <a class="ref" href="/dn12">DN 12</a>, <a class="ref" href="/mn39">MN 39</a>, <a class="ref" href="/mn119">MN 119</a>, <a class="ref" href="/an5.28">AN 5.28</a>`}
              </dd>
              <dd>
                ${_`unruffled by wind <span class="subject">arahant</span> <a class="ref" href="/iti92">Iti 92</a>`}
              </dd>
              <dd>
              </dd>
              <dt>
                ${_`Lamp`}
              </dt>
              <dd>
                ${_`going out<span class="subject">detachment</span> <a class="ref" href="/sn54.8">SN 54.8</a>`}
              </dd>
              <dd>
                ${_`in a dark house <span class="subject">insight</span> <a class="ref" href="/mil2.1.14">Mil 2.1.14</a>`}
              </dd>
              <dd>
                ${_`passing its flame to another <span class="subject">rebirth</span> <a class="ref" href="/mil3.5.5">Mil 3.5.5</a>`}
              </dd>
              <dd>
                ${_`in the dark <span class="subject">stock exclamation of appreciation of the Dhamma</span> — see <a href="#upright">Uprighting what had been overturned</a>`}
              </dd>
              <dd>
              </dd>
              <dt>
                ${_`Leaf, yellowed`}
              </dt>
              <dd>
                ${_`<span class="subject">aging</span> <a class="ref" href="/dhp235">Dhp 235</a>`}
              </dd>
              <dt>
                ${_`Leaky boat`}
              </dt>
              <dd>
                ${_`<span class="subject">pain</span> <a class="ref" href="/snp4.1">Snp 4.1</a>`}
              </dd>
              <dt>
                ${_`Leaves`}
              </dt>
              <dd>
                ${_`blown from a tree <span class="subject">unwholesome states</span> <a class="ref" href="/thag17.2">Thag 17.2</a>`}
              </dd>
              <dd>
                ${_`handful of <span class="subject">Dhamma</span> <a class="ref" href="/sn56.31">SN 56.31</a>`}
              </dd>
              <dd>
              </dd>
              <dt>
                ${_`Leper covered with sores`}
              </dt>
              <dd>
                ${_`<span class="subject">sensuality</span> <a class="ref" href="/mn75">MN 75</a>`}
              </dd>
              <dt>
                ${_`Lily/lotus crushed in hand`}
              </dt>
              <dd>
                ${_`<span class="subject">self-view</span> <a class="ref" href="/dhp285">Dhp 285</a>`}
              </dd>
              <dt>
                ${_`Limb falling from tree`}
              </dt>
              <dd>
                ${_`<span class="subject">nibbana</span> <a class="ref" href="/sn47.13">SN 47.13</a>`}
              </dd>
              <dt>
                ${_`Linchpin in a moving cart`}
              </dt>
              <dd>
                ${_`<span class="subject">generosity and kindness</span> <a class="ref" href="/an4.32">AN 4.32</a>`}
              </dd>
              <dt id="lion">
                ${_`Lion`}
              </dt>
              <dd>
                ${_`in the wild <span class="subject">solitude in the wilderness</span> <a class="ref" href="/snp1.3">Snp 1.3</a>, <a class="ref" href="/snp3.1">Snp 3.1</a>`}
              </dd>
              <dd>
                ${_`unstartled by sounds <span class="subject">wise person</span> <a class="ref" href="/snp1.3">Snp 1.3</a>, <a class="ref" href="/snp1.12">Snp 1.12</a>`}
              </dd>
              <dd>
              </dd>
              <dt>
                ${_`Line drawn on water`}
              </dt>
              <dd>
                ${_`<span class="subject">brevity of life</span> <a class="ref" href="/an7.70">AN 7.70</a>`}
              </dd>
              <dt>
                ${_`Loan, man taking out a`}
              </dt>
              <dd>
                ${_`<span class="subject">hindrances</span> <a class="ref" href="/dn2">DN 2</a>, <a class="ref" href="/dn11">DN 11</a>, <a class="ref" href="/dn12">DN 12</a>, <a class="ref" href="/mn39">MN 39</a>`}
              </dd>
              <dt>
                ${_`Log in a stream`}
              </dt>
              <dd>
                ${_`<span class="subject">path of practice</span> <a class="ref" href="/sn35.200">SN 35.200</a>. See also <a href="#stream">Stream</a>.`}
              </dd>
              <dt>
                ${_`Lost caravan leader`}
              </dt>
              <dd>
                ${_`<span class="subject">virtue</span> <a class="ref" href="/snp4.13">Snp 4.13</a>`}
              </dd>
              <dt id="lotus">
                ${_`Lotus`}
              </dt>
              <dd>
                ${_`crushed in the hand <span class="subject">self-view</span> <a class="ref" href="/dhp285">Dhp 285</a>`}
              </dd>
              <dd>
                ${_`pond <span class="subject">jhāna</span> <a class="ref" href="/dn2">DN 2</a>, <a class="ref" href="/dn11">DN 11</a>, <a class="ref" href="/dn12">DN 12</a>, <a class="ref" href="/mn39">MN 39</a>, <a class="ref" href="/mn119">MN 119</a>, <a class="ref" href="/an5.28">AN 5.28</a>`}
              </dd>
              <dd>
                ${_`pond <span class="subject">the world</span> <a class="ref" href="/mn26">MN 26</a>`}
              </dd>
              <dd>
                ${_`rising above the water <span class="subject">Tathāgata</span> <a class="ref" href="/an10.81">AN 10.81</a>`}
              </dd>
              <dd>
                ${_`scent of <span class="subject">self-view</span> <a class="ref" href="/sn22.89">SN 22.89</a>`}
              </dd>
              <dd>
                ${_`unsmeared by water <span class="subject">solitude in the wilderness</span> <a class="ref" href="/snp1.3">Snp 1.3</a>, <a class="ref" href="/snp1.12">Snp 1.12</a>`}
              </dd>
              <dd>
                ${_`unsmeared by water <span class="subject">sensuality</span> <a class="ref" href="/snp4.9">Snp 4.9</a>`}
              </dd>
              <dd>
                ${_`See also <a href="#flower">Flower</a>, <a href="#waterlotus">Water on a lotus</a>.`}
              </dd>
              <dt>
                ${_`Lute, disassembled`}
              </dt>
              <dd>
                ${_`<span class="subject">not-self</span> <a class="ref" href="/sn35.205">SN 35.205</a>`}
              </dd>
            </dl>
            <h2>
              ${_`<a id="m">M</a>`}
            </h2>
            <dl>
              <dt>
                ${_`Magic show`}
              </dt>
              <dd>
                ${_`<span class="subject">the body</span> <a class="ref" href="/thig14">Thig 14</a>`}
              </dd>
              <dt id="magician">
                ${_`Magician`}
              </dt>
              <dd>
                ${_`<span class="subject">consciousness</span> <a class="ref" href="/sn22.95">SN 22.95</a>`}
              </dd>
              <dt id="man">
                ${_`Man`}
              </dt>
              <dd>
                ${_`burning different kinds of wood <span class="subject">persistence and exertion</span> <a class="ref" href="/mn90">MN 90</a>`}
              </dd>
              <dd>
                ${_`carrying burning grass torch <span class="subject">sensuality</span> <a class="ref" href="/mn54">MN 54</a>`}
              </dd>
              <dd>
                ${_`pursuing a woman <span class="subject">unworthy teacher</span> <a class="ref" href="/dn12">DN 12</a>`}
              </dd>
              <dd>
                ${_`repaid by king <span class="subject">feeling</span> <a class="ref" href="/mil2.3.9">Mil 2.3.9</a>`}
              </dd>
              <dd>
                ${_`returning home after long absence <span class="subject">kamma</span> <a class="ref" href="/dhp219">Dhp 219</a>`}
              </dd>
              <dd>
                ${_`seeking heartwood <span class="subject">seeking the goal of the Dhamma</span> <a class="ref" href="/mn29">MN 29</a>, <a class="ref" href="/mn30">MN 30</a>, <a class="ref" href="/mn35">MN 35</a>`}
              </dd>
              <dd>
                ${_`seeking heartwood <span class="subject">seeking the Buddha</span> <a class="ref" href="/mn18">MN 18</a>, <a class="ref" href="/mn138">MN 138</a>`}
              </dd>
              <dd>
                ${_`seeking heartwood <span class="subject">appropriate attention</span> <a class="ref" href="/sn22.95">SN 22.95</a>`}
              </dd>
              <dd>
                ${_`seeking heartwood <span class="subject">not-self</span> <a class="ref" href="/sn35.193">SN 35.193</a>`}
              </dd>
              <dd>
                ${_`with borrowed goods <span class="subject">sensuality</span> <a class="ref" href="/mn54">MN 54</a>`}
              </dd>
              <dd>
              </dd>
              <dt>
                ${_`Man & woman in love <span class="subject">desire</span>"`}
              </dt>
              <dd>
                ${_`<a class="ref" href="/mn101">MN 101</a>`}
              </dd>
              <dt>
                ${_`Meat thrown into a fire`}
              </dt>
              <dd>
                ${_`<span class="subject">brevity of life</span> <a class="ref" href="/an7.70">AN 7.70</a>`}
              </dd>
              <dt>
                ${_`Merchant with caravan`}
              </dt>
              <dd>
                ${_`<span class="subject">avoiding evil</span> <a class="ref" href="/dhp123">Dhp 123</a>`}
              </dd>
              <dt>
                ${_`Middle of the sea`}
              </dt>
              <dd>
                ${_`<span class="subject">stillness of mind</span> <a class="ref" href="/snp4.14">Snp 4.14</a>`}
              </dd>
              <dt>
                ${_`Milk`}
              </dt>
              <dd>
                ${_`<span class="subject">evil deed</span> <a class="ref" href="/dhp71">Dhp 71</a>`}
              </dd>
              <dd>
                ${_`from a cow <span class="subject">self-view</span> <a class="ref" href="/dn9">DN 9</a>`}
              </dd>
              <dd>
                ${_`from a cow’s horn <span class="subject">wrong view</span> <a class="ref" href="/mn126">MN 126</a>`}
              </dd>
              <dd>
                ${_`See also <a href="#cow">Cow</a>.`}
              </dd>
              <dt>
                ${_`Mirage`}
              </dt>
              <dd>
                ${_`<span class="subject">the body</span> <a class="ref" href="/dhp46">Dhp 46</a>, <a class="ref" href="/thig14">Thig 14</a>`}
              </dd>
              <dd>
                ${_`<span class="subject">perception</span> <a class="ref" href="/sn22.95">SN 22.95</a>`}
              </dd>
              <dd>
              </dd>
              <dt>
                ${_`Mire, person stuck in the`}
              </dt>
              <dd>
                ${_`<span class="subject">ignorance</span> <a class="ref" href="/mn8">MN 8</a>`}
              </dd>
              <dt>
                ${_`Mirror of the Dhamma`}
              </dt>
              <dd>
                ${_`<span class="subject">stream-entry</span> <a class="ref" href="/dn16">DN 16</a>`}
              </dd>
              <dt>
                ${_`Money`}
              </dt>
              <dd>
                ${_`<span class="subject">uposatha observance</span> <a class="ref" href="/an10.46">AN 10.46</a>`}
              </dd>
              <dt id="monkey">
                ${_`Monkey`}
              </dt>
              <dd>
                ${_`caught in tar trap <span class="subject">mindfulness</span> <a class="ref" href="/sn47.7">SN 47.7</a>`}
              </dd>
              <dd>
                ${_`in forest <span class="subject">heedlessness</span> <a class="ref" href="/dhp334">Dhp 334</a>`}
              </dd>
              <dd>
                ${_`swinging from branch to branch <span class="subject">untrained in Dhamma</span>`}
              </dd>
              <dd>
                ${_`<span class="subject">inconstancy of mind</span> <a class="ref" href="/sn12.61">SN 12.61</a>, <a class="ref" href="/snp4.4">Snp 4.4</a>`}
              </dd>
              <dd>
              </dd>
              <dt id="moon">
                ${_`Moon`}
              </dt>
              <dd>
                ${_`<span class="subject">arahant</span> <a class="ref" href="/dhp413">Dhp 413</a>`}
              </dd>
              <dd>
                ${_`<span class="subject">love</span> <a class="ref" href="/iti27">Iti 27</a>`}
              </dd>
              <dd>
                ${_`<span class="subject">heedfulness</span> <a class="ref" href="/an10.15">AN 10.15</a>`}
              </dd>
              <dd>
                ${_`<span class="subject">jhāna</span> <a class="ref" href="/dhp387">Dhp 387</a>`}
              </dd>
              <dd>
                ${_`full <span class="subject">arahant</span> <a class="ref" href="/thig1.3">Thig 1.3</a>`}
              </dd>
              <dd>
                ${_`set free from a cloud <span class="subject">heedfulness, skillfulness</span> <a class="ref" href="/dhp172">Dhp 172</a>, <a class="ref" href="/dhp382">Dhp 382</a>, <a class="ref" href="/iti74">Iti 74</a>`}
              </dd>
              <dd>
                ${_`waning <span class="subject">unvirtuous person</span> <a class="ref" href="/dn31">DN 31</a>, <a class="ref" href="/sn5.10">SN 5.10</a>`}
              </dd>
              <dd>
                ${_`waxing <span class="subject">virtuous person</span> <a class="ref" href="/dn31">DN 31</a>`}
              </dd>
              <dd>
              </dd>
              <dt>
                ${_`Morning star`}
              </dt>
              <dd>
                ${_`<span class="subject">love</span> <a class="ref" href="/iti27">Iti 27</a>`}
              </dd>
              <dt>
                ${_`Mother risking life for child`}
              </dt>
              <dd>
                ${_`<span class="subject">love</span> <a class="ref" href="/snp1.8">Snp 1.8</a>`}
              </dd>
              <dt>
                ${_`Mountain`}
              </dt>
              <dd>
                ${_`of gold <span class="subject">sensuality</span> <a class="ref" href="/sn4.20">SN 4.20</a>`}
              </dd>
              <dd>
                ${_`of solid rock <span class="subject">arahant</span> <a class="ref" href="/ud3.4">Ud 3.4</a>, <a class="ref" href="/thag14.1">Thag 14.1</a>`}
              </dd>
              <dd>
                ${_`of solid rock <span class="subject">imperturbability</span> <a class="ref" href="/an6.55">AN 6.55</a>`}
              </dd>
              <dd>
                ${_`of solid rock <span class="subject">restraint</span> <a class="ref" href="/dhp7">Dhp 7</a>`}
              </dd>
              <dd>
              </dd>
              <dt>
                ${_`Mountains crushing in from all directions`}
              </dt>
              <dd>
                ${_`<span class="subject">brevity of life</span> <a class="ref" href="/sn3.25">SN 3.25</a>`}
              </dd>
              <dt>
                ${_`Mules, tamed`}
              </dt>
              <dd>
                ${_`<span class="subject">self-tamed person</span> <a class="ref" href="/dhp322">Dhp 322</a>`}
              </dd>
              <dt>
                ${_`Muñja grass`}
              </dt>
              <dd>
                ${_`<span class="subject">resolve and determination</span> <a class="ref" href="/snp3.2">Snp 3.2</a>`}
              </dd>
              <dt>
                ${_`Mural painted on wall`}
              </dt>
              <dd>
                ${_`<span class="subject">the body</span> <a class="ref" href="/thig14">Thig 14</a>`}
              </dd>
              <dt>
                ${_`Murderer with sword`}
              </dt>
              <dd>
                ${_`<span class="subject">disenchantment</span> <a class="ref" href="/an6.103">AN 6.103</a>`}
              </dd>
              <dd>
                ${_`<span class="subject">heedfulness</span> <a class="ref" href="/an7.46">AN 7.46</a>`}
              </dd>
              <dd>
              </dd>
              <dt id="mustardseed">
                ${_`Mustard seed`}
              </dt>
              <dd>
                ${_`<span class="subject">passion</span> <a class="ref" href="/dhp407">Dhp 407</a>`}
              </dd>
              <dd>
                ${_`<span class="subject">sensuality</span> <a class="ref" href="/dhp401">Dhp 401</a>.`}
              </dd>
              <dd>
                ${_`(<strong>Note:</strong> the famous parable in which the Buddha challenges a grieving Kisa Gotamī to fetch a mustard seed from any household that has never known death is found in the Commentaries to <a class="ref" href="/thig10.1">Thig 10.1</a> and <a class="ref" href="/dhp114">Dhp 114</a>.)`}
              </dd>
            </dl>
            <h2>
              ${_`<a id="n">N</a>`}
            </h2>
            <dl>
              <dt>
                ${_`Noise from a soft catskin bag`}
              </dt>
              <dd>
                ${_`<span class="subject">speech</span> <a class="ref" href="/mn21">MN 21</a>`}
              </dd>
            </dl>
            <h2>
              ${_`<a id="o">O</a>`}
            </h2>
            <dl>
              <dt id="ocean">
                ${_`Ocean`}
              </dt>
              <dd>
                ${_`an abode for mighty creatures <span class="subject">Dhamma-vinaya</span> <a class="ref" href="/ud5.5">Ud 5.5</a>`}
              </dd>
              <dd>
                ${_`crossing over the <span class="subject">arahant</span> <a class="ref" href="/sn35.187">SN 35.187</a>, <a class="ref" href="/iti69">Iti 69</a>`}
              </dd>
              <dd>
                ${_`slope of ~ floor <span class="subject">progress of Dhamma practice</span> <a class="ref" href="/ud5.5">Ud 5.5</a>`}
              </dd>
              <dd>
                ${_`greatness of <span class="subject">stream-entry</span> <a class="ref" href="/sn13.8">SN 13.8</a>`}
              </dd>
              <dd>
                ${_`intolerance to dead bodies <span class="subject">unvirtuous person</span> <a class="ref" href="/ud5.5">Ud 5.5</a>`}
              </dd>
              <dd>
                ${_`many treasures of <span class="subject">37 wings to awakening</span> <a class="ref" href="/ud5.5">Ud 5.5</a>`}
              </dd>
              <dd>
                ${_`middle of ~ is calm <span class="subject">stillness of mind</span> <a class="ref" href="/snp4.14">Snp 4.14</a>`}
              </dd>
              <dd>
                ${_`polluted by a pot of poison <span class="subject">abuse towards the Tathāgata</span> <a class="ref" href="/iti89">Iti 89</a>`}
              </dd>
              <dd>
                ${_`salty taste of <span class="subject">release</span> <a class="ref" href="/ud5.5">Ud 5.5</a>`}
              </dd>
              <dd>
                ${_`stability of <span class="subject">restraint of the Vinaya</span> <a class="ref" href="/ud5.5">Ud 5.5</a>`}
              </dd>
              <dd>
                ${_`steady level of <span class="subject">nibbana</span> <a class="ref" href="/ud5.5">Ud 5.5</a>`}
              </dd>
              <dd>
                ${_`See also <a href="#flood">Flood</a>.`}
              </dd>
              <dt>
                ${_`Oil from gravel`}
              </dt>
              <dd>
                ${_`<span class="subject">wrong view</span> <a class="ref" href="/mn126">MN 126</a>`}
              </dd>
              <dt>
                ${_`Oil lamp`}
              </dt>
              <dd>
                ${_`depends on wick and fuel <span class="subject">feeling</span> <a class="ref" href="/sn36.7">SN 36.7</a>`}
              </dd>
              <dd>
                ${_`flickering of <span class="subject">six senses</span> <a class="ref" href="/mn146">MN 146</a>`}
              </dd>
              <dd>
              </dd>
              <dt>
                ${_`Ornament of gold`}
              </dt>
              <dd>
                ${_`<span class="subject">arahant</span> <a class="ref" href="/an4.28">AN 4.28</a>`}
              </dd>
              <dt id="ox">
                ${_`Ox`}
              </dt>
              <dd>
                ${_`<span class="subject">suffering</span> <a class="ref" href="/dhp1">Dhp 1</a>`}
              </dd>
              <dd>
                ${_`<span class="subject">person who doesn’t listen</span> <a class="ref" href="/dhp152">Dhp 152</a>`}
              </dd>
              <dd>
                ${_`eating corn <span class="subject">sensuality</span> <a class="ref" href="/sn35.205">SN 35.205</a>`}
              </dd>
              <dd>
                ${_`joined by a single yoke <span class="subject">sense-bases and their objects</span> <a class="ref" href="/sn35.191">SN 35.191</a>`}
              </dd>
              <dd>
              </dd>
            </dl>
            <h2>
              ${_`<a id="p">P</a>`}
            </h2>
            <dl>
              <dt>
                ${_`Painting of a woman or man`}
              </dt>
              <dd>
                ${_`<span class="subject">not-self</span> <a class="ref" href="/sn22.100">SN 22.100</a>`}
              </dd>
              <dd>
                ${_`<span class="subject">nutriment</span> <a class="ref" href="/sn12.64">SN 12.64</a>`}
              </dd>
              <dd>
              </dd>
              <dt>
                ${_`Palm leaf dropping away`}
              </dt>
              <dd>
                ${_`<span class="subject">aversion</span> <a class="ref" href="/iti88">Iti 88</a>`}
              </dd>
              <dt>
                ${_`Palm tree`}
              </dt>
              <dd>
                ${_`with top cut off <span class="subject">awakening</span> <a class="ref" href="/mn105">MN 105</a>`}
              </dd>
              <dd>
                ${_`uprooted <span class="subject">awakening</span> <a class="ref" href="/mn49">MN 49</a>, <a class="ref" href="/sn22.3">SN 22.3</a>, <a class="ref" href="/sn41.7">SN 41.7</a>, <a class="ref" href="/sn44.1">SN 44.1</a>`}
              </dd>
              <dd>
              </dd>
              <dt>
                ${_`Pastures`}
              </dt>
              <dd>
                ${_`<span class="subject">mindfulness</span> <a class="ref" href="/mn33">MN 33</a>, <a class="ref" href="/an11.18">AN 11.18</a>`}
              </dd>
              <dt>
                ${_`Path, man showing the`}
              </dt>
              <dd>
                ${_`<span class="subject">Tathāgata</span> <a class="ref" href="/sn22.84">SN 22.84</a>`}
              </dd>
              <dt>
                ${_`Peacock`}
              </dt>
              <dd>
                ${_`<span class="subject">jhāna</span> <a class="ref" href="/snp1.12">Snp 1.12</a>`}
              </dd>
              <dt>
                ${_`Peg in drum`}
              </dt>
              <dd>
                ${_`<span class="subject">listening to Dhamma</span> <a class="ref" href="/sn20.7">SN 20.7</a>`}
              </dd>
              <dt>
                ${_`Person looking down from a rocky crag`}
              </dt>
              <dd>
                ${_`<span class="subject">wise person</span> <a class="ref" href="/iti38">Iti 38</a>`}
              </dd>
              <dt>
                ${_`Person reflecting on another`}
              </dt>
              <dd>
                ${_`<span class="subject">higher knowledges</span> <a class="ref" href="/an5.28">AN 5.28</a>`}
              </dd>
              <dt>
                ${_`Person riding a small wooden plank in the great ocean`}
              </dt>
              <dd>
                ${_`<span class="subject">laziness</span> <a class="ref" href="/iti78">Iti 78</a>`}
              </dd>
              <dt>
                ${_`Pillar at a bathing ford`}
              </dt>
              <dd>
                ${_`<span class="subject">wise person</span> <a class="ref" href="/snp1.12">Snp 1.12</a>`}
              </dd>
              <dt>
                ${_`Pit of embers`}
              </dt>
              <dd>
                ${_`<span class="subject">intellectual intention</span> <a class="ref" href="/sn12.63">SN 12.63</a>`}
              </dd>
              <dd>
                ${_`<span class="subject">sensuality</span> <a class="ref" href="/mn54">MN 54</a>, <a class="ref" href="/thig14">Thig 14</a>`}
              </dd>
              <dd>
              </dd>
              <dt>
                ${_`Plow`}
              </dt>
              <dd>
                ${_`<span class="subject">discernment</span> <a class="ref" href="/snp1.4">Snp 1.4</a>. See also <a href="#yokes">Yokes</a>.`}
              </dd>
              <dt>
                ${_`Poison`}
              </dt>
              <dd>
                ${_`<span class="subject">evil deeds</span> <a class="ref" href="/dhp123">Dhp 123</a>`}
              </dd>
              <dt>
                ${_`Poison, man drinking`}
              </dt>
              <dd>
                ${_`<span class="subject">restraint</span> <a class="ref" href="/mn105">MN 105</a>`}
              </dd>
              <dd>
                ${_`<span class="subject">volition</span> <a class="ref" href="/mil2.3.11">Mil 2.3.11</a>`}
              </dd>
              <dd>
              </dd>
              <dt>
                ${_`Polished shell`}
              </dt>
              <dd>
                ${_`<span class="subject">life as a bhikkhu</span> <a class="ref" href="/dn2">DN 2</a>, <a class="ref" href="/dn11">DN 11</a>, <a class="ref" href="/dn12">DN 12</a>, <a class="ref" href="/mn36">MN 36</a>, <a class="ref" href="/mn125">MN 125</a>, <a class="ref" href="/ud5.6">Ud 5.6</a>`}
              </dd>
              <dt>
                ${_`Pond`}
              </dt>
              <dd>
                ${_`<span class="subject">integrity</span> delightful, <a class="ref" href="/sn3.19">SN 3.19</a>`}
              </dd>
              <dd>
                ${_`haunted, <a class="ref" href="/sn3.19">SN 3.19</a>`}
              </dd>
              <dd>
              </dd>
              <dt id="pool">
                ${_`Pool of water`}
              </dt>
              <dd>
                ${_`clear or muddy <span class="subject">mind</span> <a href="an01.45-046">AN 1.45-46</a>`}
              </dd>
              <dd>
                ${_`in a mountain glen <span class="subject">arahant</span> <a class="ref" href="/dn2">DN 2</a>, <a class="ref" href="/dn11">DN 11</a>, <a class="ref" href="/dn12">DN 12</a>, <a class="ref" href="/mn39">MN 39</a>`}
              </dd>
              <dd>
              </dd>
              <dt>
                ${_`Poor person`}
              </dt>
              <dd>
                ${_`<span class="subject">fetters</span> <a class="ref" href="/mn66">MN 66</a>`}
              </dd>
              <dd>
                ${_`<span class="subject">speech</span> <a class="ref" href="/an10.24">AN 10.24</a>`}
              </dd>
              <dd>
              </dd>
              <dt id="pot">
                ${_`Pot`}
              </dt>
              <dd>
                ${_`flattened metal <span class="subject">nibbana</span> <a class="ref" href="/dhp134">Dhp 134</a>`}
              </dd>
              <dd>
                ${_`of pickled greens <span class="subject">passion</span> <a class="ref" href="/thig1.1">Thig 1.1</a>`}
              </dd>
              <dd>
                ${_`smashed by stone <span class="subject">delusion</span> <a class="ref" href="/snp3.2">Snp 3.2</a>`}
              </dd>
              <dd>
              </dd>
              <dt>
                ${_`<a id="potter">Potter</a> or potter’s apprentice`}
              </dt>
              <dd>
                ${_`<span class="subject">supranormal powers</span> <a class="ref" href="/dn2">DN 2</a>, <a class="ref" href="/dn11">DN 11</a>, <a class="ref" href="/dn12">DN 12</a>`}
              </dd>
              <dt>
                ${_`Potter’s clay vessels`}
              </dt>
              <dd>
                ${_`<span class="subject">inevitability of death</span> <a class="ref" href="/snp3.8">Snp 3.8</a>`}
              </dd>
              <dt>
                ${_`Princes of wattle-and-daub towns`}
              </dt>
              <dd>
                ${_`<span class="subject">heedfulness</span> <a class="ref" href="/an10.15">AN 10.15</a>`}
              </dd>
              <dt>
                ${_`Prison, man released from`}
              </dt>
              <dd>
                ${_`<span class="subject">hindrances</span> <a class="ref" href="/dn2">DN 2</a>, <a class="ref" href="/dn11">DN 11</a>, <a class="ref" href="/dn12">DN 12</a>, <a class="ref" href="/mn39">MN 39</a>`}
              </dd>
              <dt>
                ${_`Propagation of plants`}
              </dt>
              <dd>
                ${_`<span class="subject">aggregates</span> <a class="ref" href="/sn22.54">SN 22.54</a>`}
              </dd>
            </dl>
            <h2>
              ${_`<a id="qq">Q</a>`}
            </h2>
            <dl>
              <dt>
                ${_`Quail snared by a rotten creeper`}
              </dt>
              <dd>
                ${_`<span class="subject">attachments</span> <a class="ref" href="/mn66">MN 66</a>`}
              </dd>
            </dl>
            <h2>
              ${_`<a id="r">R</a>`}
            </h2>
            <dl>
              <dt>
                ${_`Rabbit caught in snare`}
              </dt>
              <dd>
                ${_`<span class="subject">fetters</span> <a class="ref" href="/dhp342">Dhp 342</a>`}
              </dd>
              <dt>
                ${_`Raft`}
              </dt>
              <dd>
                ${_`<span class="subject">eightfold path</span> <a class="ref" href="/mn22">MN 22</a>, <a class="ref" href="/sn35.197">SN 35.197</a>, <a class="ref" href="/snp1.2">Snp 1.2</a>`}
              </dd>
              <dt>
                ${_`Rafters of house`}
              </dt>
              <dd>
                ${_`<span class="subject">defilements</span> <a class="ref" href="/dhp153">Dhp 153</a>`}
              </dd>
              <dd>
                ${_`<span class="subject">heedfulness</span> <a class="ref" href="/an10.15">AN 10.15</a>`}
              </dd>
              <dd>
              </dd>
              <dt>
                ${_`Rag, saving the good part of a`}
              </dt>
              <dd>
                ${_`<span class="subject">subduing hatred</span> <a class="ref" href="/an5.162">AN 5.162</a>`}
              </dd>
              <dt id="rain">
                ${_`Rain`}
              </dt>
              <dd>
                ${_`<span class="subject">austerity</span> <a class="ref" href="/snp1.4">Snp 1.4</a>`}
              </dd>
              <dd>
                ${_`entering hut <span class="subject">passion</span> <a class="ref" href="/dhp13">Dhp 13</a>`}
              </dd>
              <dd>
                ${_`from a cloud <span class="subject">generosity</span> <a class="ref" href="/iti75">Iti 75</a>`}
              </dd>
              <dd>
                ${_`from a cloud <span class="subject">concentration</span> <a class="ref" href="/sn54.9">SN 54.9</a>`}
              </dd>
              <dd>
                ${_`from a thunderhead <span class="subject">discernment</span> <a class="ref" href="/an4.102">AN 4.102</a>`}
              </dd>
              <dd>
                ${_`sent by devas <span class="subject">brevity of life</span> <a class="ref" href="/an7.70">AN 7.70</a>`}
              </dd>
              <dd>
                ${_`stilling a cloud of dust <span class="subject">silencing one’s thoughts</span> <a class="ref" href="/iti87">Iti 87</a>, <a class="ref" href="/thag15.1">Thag 15.1</a>`}
              </dd>
              <dd>
              </dd>
              <dt>
                ${_`Rams butting heads`}
              </dt>
              <dd>
                ${_`<span class="subject">contact</span> <a class="ref" href="/mil2.3.8">Mil 2.3.8</a>`}
              </dd>
              <dt>
                ${_`Reeds or rushes`}
              </dt>
              <dd>
                ${_`destroyed by their own fruit <span class="subject">defilements</span> <a class="ref" href="/sn3.23">SN 3.23</a>`}
              </dd>
              <dd>
                ${_`drawn from their sheaths<span class="subject">supranormal powers</span> <a class="ref" href="/dn2">DN 2</a>, <a class="ref" href="/dn11">DN 11</a>, <a class="ref" href="/dn12">DN 12</a>`}
              </dd>
              <dd>
                ${_`matted <span class="subject">craving</span> <a class="ref" href="/an4.199">AN 4.199</a>`}
              </dd>
              <dd>
              </dd>
              <dt>
                ${_`Reflection of one’s face in mirror`}
              </dt>
              <dd>
                ${_`<span class="subject">mind-reading</span> <a class="ref" href="/dn2">DN 2</a>, <a class="ref" href="/dn11">DN 11</a>, <a class="ref" href="/dn12">DN 12</a>, <a class="ref" href="/an10.54">AN 10.54</a>`}
              </dd>
              <dd>
                ${_`<span class="subject">"I am" with possessiveness</span> <a class="ref" href="/sn22.83">SN 22.83</a>`}
              </dd>
              <dd>
              </dd>
              <dt>
                ${_`Reservoir with four inlets and outlets`}
              </dt>
              <dd>
                ${_`<span class="subject">virtuous conduct</span> <a class="ref" href="/an8.54">AN 8.54</a>`}
              </dd>
              <dt>
                ${_`Rhinoceros`}
              </dt>
              <dd>
                ${_`<span class="subject">solitude in the wilderness</span> <a class="ref" href="/snp1.3">Snp 1.3</a>`}
              </dd>
              <dt>
                ${_`Rich person`}
              </dt>
              <dd>
                ${_`<span class="subject">speech</span> <a class="ref" href="/an10.24">AN 10.24</a>`}
              </dd>
              <dt>
                ${_`Riddle tree`}
              </dt>
              <dd>
                ${_`<span class="subject">purity of vision</span> <a class="ref" href="/sn35.204">SN 35.204</a>`}
              </dd>
              <dt>
                ${_`Ridge-pole of house`}
              </dt>
              <dd>
                ${_`<span class="subject">ignorance</span> <a class="ref" href="/dhp153">Dhp 153</a>`}
              </dd>
              <dt id="river">
                ${_`River`}
              </dt>
              <dd>
                ${_`<span class="subject">craving</span> <a class="ref" href="/dhp251">Dhp 251</a>, <a class="ref" href="/iti109">Iti 109</a>`}
              </dd>
              <dd>
                ${_`flow down to the sea <span class="subject">heedfulness</span> <a class="ref" href="/an10.15">AN 10.15</a>`}
              </dd>
              <dd>
                ${_`carrying everything with it <span class="subject">brevity of life</span> <a class="ref" href="/an7.70">AN 7.70</a>`}
              </dd>
              <dd>
                ${_`swift current <span class="subject">hunger</span> <a class="ref" href="/snp4.15">Snp 4.15</a>, <span class="subject">hindrances</span> <a class="ref" href="/an5.51">AN 5.51</a>`}
              </dd>
              <dd>
                ${_`gives up its name upon reaching the sea <span class="subject">going-forth</span> <a class="ref" href="/ud5.5">Ud 5.5</a>`}
              </dd>
              <dd>
                ${_`person swept away by a <span class="subject">not-self</span> <a class="ref" href="/sn22.93">SN 22.93</a>`}
              </dd>
              <dd>
                ${_`See also <a href="#flood">Flood</a>.`}
              </dd>
              <dt>
                ${_`Road`}
              </dt>
              <dd>
                ${_`<span class="subject">eightfold path</span> <a class="ref" href="/mn33">MN 33</a>, <a class="ref" href="/an11.18">AN 11.18</a>`}
              </dd>
              <dd>
                ${_`dangerous <span class="subject">evil deeds</span> <a class="ref" href="/dhp123">Dhp 123</a>`}
              </dd>
              <dd>
              </dd>
              <dt>
                ${_`Rock`}
              </dt>
              <dd>
                ${_`broken in two <span class="subject">sphere of nothingness</span> <a class="ref" href="/mn105">MN 105</a>`}
              </dd>
              <dd>
                ${_`in wind <span class="subject">wise person</span> <a class="ref" href="/dhp81">Dhp 81</a>`}
              </dd>
              <dd>
              </dd>
              <dt>
                ${_`Roots, medicinal`}
              </dt>
              <dd>
                ${_`<span class="subject">craving</span> <a class="ref" href="/dhp337">Dhp 337</a>`}
              </dd>
              <dt>
                ${_`Rubbish pile with lotus`}
              </dt>
              <dd>
                ${_`<span class="subject">Buddha</span> <a class="ref" href="/dhp58">Dhp 58</a>`}
              </dd>
              <dt>
                ${_`Rust eating iron`}
              </dt>
              <dd>
                ${_`<span class="subject">evil deeds</span> <a class="ref" href="/dhp240">Dhp 240</a>`}
              </dd>
            </dl>
            <h2>
              ${_`<a id="s">S</a>`}
            </h2>
            <dl>
              <dt>
                ${_`Sack full of grains`}
              </dt>
              <dd>
                ${_`<span class="subject">the body</span> <a class="ref" href="/dn22">DN 22</a>, <a class="ref" href="/mn119">MN 119</a>`}
              </dd>
              <dt>
                ${_`Salt`}
              </dt>
              <dd>
                ${_`in water <span class="subject">evil deed</span> <a class="ref" href="/an3.99">AN 3.99</a>`}
              </dd>
              <dd>
                ${_`taste of ocean <span class="subject">Dhamma</span> <a class="ref" href="/ud5.5">Ud 5.5</a>`}
              </dd>
              <dd>
              </dd>
              <dt>
                ${_`Sand castles`}
              </dt>
              <dd>
                ${_`<span class="subject">aggregates</span> <a class="ref" href="/sn23.2">SN 23.2</a>`}
              </dd>
              <dt>
                ${_`Saw used by an attacking bandit`}
              </dt>
              <dd>
                ${_`<span class="subject">patient endurance</span> <a class="ref" href="/mn21">MN 21</a>, <a class="ref" href="/mn28">MN 28</a>`}
              </dd>
              <dt>
                ${_`Seed`}
              </dt>
              <dd>
                ${_`<span class="subject">conviction</span> <a class="ref" href="/snp1.4">Snp 1.4</a>`}
              </dd>
              <dd>
                ${_`bitter <span class="subject">wrong view</span> <a class="ref" href="/an10.104">AN 10.104</a>`}
              </dd>
              <dd>
                ${_`capable of sprouting <span class="subject">kamma</span> <a class="ref" href="/an3.33">AN 3.33</a>`}
              </dd>
              <dd>
                ${_`mustard ~ <span class="subject">sensuality</span> <a class="ref" href="/dhp401">Dhp 401</a>`}
              </dd>
              <dd>
                ${_`mustard ~ <span class="subject">passion</span> <a class="ref" href="/dhp407">Dhp 407</a>`}
              </dd>
              <dd>
                ${_`rotting in a field: <a class="ref" href="/sn5.10">SN 5.10</a>`}
              </dd>
              <dd>
                ${_`sweet: <a class="ref" href="/an10.104">AN 10.104</a>`}
              </dd>
              <dd>
                ${_`See also <a href="#mustardseed">Mustard seed</a>.`}
              </dd>
              <dt>
                ${_`Seedling not watered`}
              </dt>
              <dd>
                ${_`<span class="subject">change &amp; alteration</span> <a class="ref" href="/sn22.80">SN 22.80</a>.`}
              </dd>
              <dt>
                ${_`Seizure`}
              </dt>
              <dd>
                ${_`<span class="subject">anger</span> <a class="ref" href="/dhp251">Dhp 251</a>`}
              </dd>
              <dt>
                ${_`Servant murdering his master`}
              </dt>
              <dd>
                ${_`<span class="subject">not-self</span> <a class="ref" href="/sn22.85">SN 22.85</a>`}
              </dd>
              <dt>
                ${_`Shack, flammable`}
              </dt>
              <dd>
                ${_`<span class="subject">mindfulness/awareness</span> <a class="ref" href="/sn35.202">SN 35.202</a>. See also <a href="#house">House</a>.`}
              </dd>
              <dt>
                ${_`Shadow that never leaves`}
              </dt>
              <dd>
                ${_`<span class="subject">kamma</span> <a class="ref" href="/sn3.4">SN 3.4</a>, <a class="ref" href="/sn3.20">SN 3.20</a>, <a class="ref" href="/dhp1">Dhp 1</a>`}
              </dd>
              <dt>
                ${_`Sheaf of barley thrashed repeatedly`}
              </dt>
              <dd>
                ${_`<span class="subject">foolish person</span> <a class="ref" href="/sn35.207">SN 35.207</a>`}
              </dd>
              <dt>
                ${_`Sheaves of reeds`}
              </dt>
              <dd>
                ${_`<span class="subject">dependent co-arising</span> <a class="ref" href="/sn12.67">SN 12.67</a>`}
              </dd>
              <dt>
                ${_`Ship left ashore over winter`}
              </dt>
              <dd>
                ${_`<span class="subject">fetters</span> <a class="ref" href="/sn22.101">SN 22.101</a>`}
              </dd>
              <dt id="shore">
                ${_`Shore`}
              </dt>
              <dd>
                ${_`far <span class="subject">nibbana</span> <a class="ref" href="/sn35.197">SN 35.197</a>`}
              </dd>
              <dd>
                ${_`far <span class="subject">external sense media</span> <a class="ref" href="/sn35.200">SN 35.200</a>`}
              </dd>
              <dd>
                ${_`near <span class="subject">self-view</span> <a class="ref" href="/sn35.197">SN 35.197</a>`}
              </dd>
              <dd>
                ${_`near <span class="subject">internal sense media</span> <a class="ref" href="/sn35.200">SN 35.200</a>`}
              </dd>
              <dd>
                ${_`See also <a href="#stream">Stream</a>.`}
              </dd>
              <dt>
                ${_`Shot with arrow`}
              </dt>
              <dd>
                ${_`<span class="subject">craving</span> <a class="ref" href="/snp2.10">Snp 2.10</a>, <a class="ref" href="/snp4.1">Snp 4.1</a>`}
              </dd>
              <dd>
                ${_`<span class="subject">present kamma</span> <a class="ref" href="/mn101">MN 101</a>`}
              </dd>
              <dd>
              </dd>
              <dt>
                ${_`Shuttle`}
              </dt>
              <dd>
                ${_`<span class="subject">wise person</span> <a class="ref" href="/snp1.12">Snp 1.12</a>`}
              </dd>
              <dt id="silversmith">
                ${_`Silversmith`}
              </dt>
              <dd>
                ${_`<span class="subject">purifying the mind</span> <a class="ref" href="/dhp239">Dhp 239</a>, <a class="ref" href="/snp4.16">Snp 4.16</a>`}
              </dd>
              <dt>
                ${_`Sick man, taking pity on a`}
              </dt>
              <dd>
                ${_`<span class="subject">hatred</span> <a class="ref" href="/an5.162">AN 5.162</a>`}
              </dd>
              <dt>
                ${_`Slavery, man freed from`}
              </dt>
              <dd>
                ${_`<span class="subject">hindrances</span> <a class="ref" href="/dn2">DN 2</a>, <a class="ref" href="/dn11">DN 11</a> <a class="ref" href="/dn12">DN 12</a>, <a class="ref" href="/mn39">MN 39</a>`}
              </dd>
              <dt id="snake">
                ${_`Snake`}
              </dt>
              <dd>
                ${_`giving one’s hand to a poisonous ~ <span class="subject">sense-restraint</span> <a class="ref" href="/mn105">MN 105</a>`}
              </dd>
              <dd>
                ${_`pulled from its slough <span class="subject">mind-made body</span> <a class="ref" href="/dn2">DN 2</a>, <a class="ref" href="/dn11">DN 11</a>`}
              </dd>
              <dd>
                ${_`shedding its skin <span class="subject">defilements</span> <a class="ref" href="/snp1.1">Snp 1.1</a>`}
              </dd>
              <dd>
                ${_`water-snake bites man <span class="subject">wrong grasp of Dhamma</span> <a class="ref" href="/mn22">MN 22</a>`}
              </dd>
              <dd>
              </dd>
              <dt>
                ${_`Snapping one’s fingers`}
              </dt>
              <dd>
                ${_`<span class="subject">equanimity</span> <a class="ref" href="/mn152">MN 152</a>`}
              </dd>
              <dt>
                ${_`Snare`}
              </dt>
              <dd>
                ${_`<span class="subject">delusion</span> <a class="ref" href="/dhp251">Dhp 251</a>`}
              </dd>
              <dt>
                ${_`Sound of drums`}
              </dt>
              <dd>
                ${_`<span class="subject">clairaudience</span> <a class="ref" href="/dn2">DN 2</a>, <a class="ref" href="/dn11">DN 11</a>, <a class="ref" href="/dn12">DN 12</a>`}
              </dd>
              <dt>
                ${_`Soup tasted by ladle`}
              </dt>
              <dd>
                ${_`<span class="subject">wise person and fool</span> <a class="ref" href="/dhp64">Dhp 64</a>`}
              </dd>
              <dt>
                ${_`Space gathered under the term "house"`}
              </dt>
              <dd>
                ${_`<span class="subject">form</span> <a class="ref" href="/mn28">MN 28</a>`}
              </dd>
              <dt>
                ${_`Spear`}
              </dt>
              <dd>
                ${_`<span class="subject">good-will</span> <a class="ref" href="/sn20.5">SN 20.5</a>`}
              </dd>
              <dt>
                ${_`Spider snared in its own web`}
              </dt>
              <dd>
                ${_`<span class="subject">passion</span> <a class="ref" href="/dhp347">Dhp 347</a>`}
              </dd>
              <dt>
                ${_`Spitting`}
              </dt>
              <dd>
                ${_`<span class="subject">equanimity</span> <a class="ref" href="/mn152">MN 152</a>`}
              </dd>
              <dt>
                ${_`Spring-fed lake`}
              </dt>
              <dd>
                ${_`See <a href="#lake">Lake</a>.`}
              </dd>
              <dt>
                ${_`Staircase build at a crossroads`}
              </dt>
              <dd>
                ${_`<span class="subject">wrong view</span> <a class="ref" href="/dn9">DN 9</a>`}
              </dd>
              <dt>
                ${_`Stallion`}
              </dt>
              <dd>
                ${_`See <a href="#horse">Horse</a>.`}
              </dd>
              <dt>
                ${_`Stick thrown up into the air`}
              </dt>
              <dd>
                ${_`<span class="subject">rebirth</span> <a class="ref" href="/sn15.9">SN 15.9</a>`}
              </dd>
              <dt>
                ${_`Stone ball thrown into wet clay`}
              </dt>
              <dd>
                ${_`<span class="subject">mindfulness</span> <a class="ref" href="/mn119">MN 119</a>`}
              </dd>
              <dt>
                ${_`Storekeeper`}
              </dt>
              <dd>
                ${_`<span class="subject">perception</span> <a class="ref" href="/mil2.3.10">Mil 2.3.10</a>`}
              </dd>
              <dt>
                ${_`Storm cloud`}
              </dt>
              <dd>
                ${_`<span class="subject">evil</span> <a class="ref" href="/thag14.1">Thag 14.1</a>`}
              </dd>
              <dt id="stream">
                ${_`Stream`}
              </dt>
              <dd>
                ${_`sinking in the middle of <span class="subject">passion</span> <a class="ref" href="/sn35.200">SN 35.200</a>`}
              </dd>
              <dd>
                ${_`snared by a whirlpool <span class="subject">sensuality</span> <a class="ref" href="/sn35.200">SN 35.200</a>`}
              </dd>
              <dd>
                ${_`washed up on high ground of <span class="subject">conceit</span> <a class="ref" href="/sn35.200">SN 35.200</a>`}
              </dd>
              <dd>
                ${_`See also <a href="#shore">Shore</a>.`}
              </dd>
              <dt>
                ${_`String, ball of`}
              </dt>
              <dd>
                ${_`<span class="subject">craving</span> <a class="ref" href="/an4.199">AN 4.199</a>`}
              </dd>
              <dd>
                ${_`thrown against a door <span class="subject">mindfulness</span> <a class="ref" href="/mn119">MN 119</a>`}
              </dd>
              <dd>
                ${_`unwinding to its end <span class="subject">end of suffering</span> <a class="ref" href="/dn2">DN 2</a>`}
              </dd>
              <dd>
              </dd>
              <dt>
                ${_`Strong man`}
              </dt>
              <dd>
                ${_`nourished on royal food <span class="subject">foolish person</span> <a class="ref" href="/snp4.8">Snp 4.8</a>`}
              </dd>
              <dd>
                ${_`extending his arm <span class="subject">appearance/disappearance of devas</span> <a class="ref" href="/dn20">DN 20</a>, <a class="ref" href="/sn6.1">SN 6.1</a>, <a class="ref" href="/sn6.2">SN 6.2</a>`}
              </dd>
              <dd>
                ${_`extending his arm <span class="subject">equanimity</span> <a class="ref" href="/mn152">MN 152</a>`}
              </dd>
              <dd>
              </dd>
              <dt>
                ${_`Suckling calf going to its mother`}
              </dt>
              <dd>
                ${_`<span class="subject">desire</span> <a class="ref" href="/dhp284">Dhp 284</a>, <a class="ref" href="/ud7.4">Ud 7.4</a>. See also <a href="#cow">Cow</a>.`}
              </dd>
              <dt>
                ${_`Sun`}
              </dt>
              <dd>
                ${_`dispelling the dark <span class="subject">absence of delusion</span> <a class="ref" href="/iti88">Iti 88</a>`}
              </dd>
              <dd>
                ${_`filling the sky <span class="subject">heedfulness</span> <a class="ref" href="/an10.15">AN 10.15</a>`}
              </dd>
              <dd>
                ${_`filling the sky <span class="subject">awakening</span> <a class="ref" href="/ud1.3">Ud 1.3</a>`}
              </dd>
              <dd>
                ${_`speed of <span class="subject">death</span> <a class="ref" href="/sn20.6">SN 20.6</a>`}
              </dd>
              <dd>
              </dd>
              <dt>
                ${_`Sunlight`}
              </dt>
              <dd>
                ${_`<span class="subject">merit</span> <a class="ref" href="/iti27">Iti 27</a>`}
              </dd>
              <dd>
                ${_`<span class="subject">virtue/concentration/discernment</span> <a class="ref" href="/iti59">Iti 59</a>`}
              </dd>
              <dd>
                ${_`not landing on ground <span class="subject">consciousness</span> <a class="ref" href="/sn12.64">SN 12.64</a>`}
              </dd>
              <dd>
              </dd>
              <dt>
                ${_`Surgeon`}
              </dt>
              <dd>
                ${_`see <a href="#doctor">Doctor</a>`}
              </dd>
              <dt>
                ${_`Swans`}
              </dt>
              <dd>
                ${_`flying <span class="subject">enlightened ones</span> <a class="ref" href="/dhp175">Dhp 175</a>`}
              </dd>
              <dd>
                ${_`taking off from a lake <span class="subject">mindful ones</span> <a class="ref" href="/dhp91">Dhp 91</a>`}
              </dd>
              <dd>
              </dd>
              <dt>
                ${_`Swift pair of messengers`}
              </dt>
              <dd>
                ${_`<span class="subject">samatha-vipassana</span> <a class="ref" href="/sn35.204">SN 35.204</a>`}
              </dd>
              <dt>
                ${_`Sword drawn from its scabbard`}
              </dt>
              <dd>
                ${_`<span class="subject">mind-made body</span> <a class="ref" href="/dn2">DN 2</a>, <a class="ref" href="/dn11">DN 11</a>, <a class="ref" href="/dn12">DN 12</a>`}
              </dd>
            </dl>
            <h2>
              ${_`<a id="t">T</a>`}
            </h2>
            <dl>
              <dt>
                ${_`Tall building in central square`}
              </dt>
              <dd>
                ${_`<span class="subject">passing away and re-appearance of beings</span> <a class="ref" href="/dn2">DN 2</a>, <a class="ref" href="/dn11">DN 11</a>, <a class="ref" href="/dn12">DN 12</a>, <a class="ref" href="/mn39">MN 39</a>`}
              </dd>
              <dt>
                ${_`Tangle`}
              </dt>
              <dd>
                ${_`<a class="ref" href="/sn7.6">SN 7.6</a>`}
              </dd>
              <dt>
                ${_`Tangled skein`}
              </dt>
              <dd>
                ${_`<span class="subject">craving</span> <a class="ref" href="/an4.199">AN 4.199</a>`}
              </dd>
              <dt>
                ${_`Tank filled with water`}
              </dt>
              <dd>
                ${_`<span class="subject">supranormal powers</span> <a class="ref" href="/an5.28">AN 5.28</a>`}
              </dd>
              <dt>
                ${_`Tendon in fire`}
              </dt>
              <dd>
                ${_`<span class="subject">perception of the unattractive</span> <a class="ref" href="/an7.46">AN 7.46</a>`}
              </dd>
              <dt>
                ${_`Thief shot with spears`}
              </dt>
              <dd>
                ${_`<span class="subject">consciousness</span> <a class="ref" href="/sn12.63">SN 12.63</a>`}
              </dd>
              <dt>
                ${_`Thoroughbred`}
              </dt>
              <dd>
                ${_`See <a href="#horse">Horse</a>.`}
              </dd>
              <dt>
                ${_`Thundercloud`}
              </dt>
              <dd>
                ${_`<span class="subject">conviction</span> <a class="ref" href="/sn3.24">SN 3.24</a>`}
              </dd>
              <dd>
                ${_`<span class="subject">discernment</span> <a class="ref" href="/an4.102">AN 4.102</a>`}
              </dd>
              <dd>
              </dd>
              <dt>
                ${_`Tortoise evading a jackal`}
              </dt>
              <dd>
                ${_`<span class="subject">sense-restraint</span> <a class="ref" href="/sn35.199">SN 35.199</a>`}
              </dd>
              <dt>
                ${_`Track of ox`}
              </dt>
              <dd>
                ${_`<span class="subject">kamma</span> <a class="ref" href="/dhp1">Dhp 1</a>`}
              </dd>
              <dt>
                ${_`Trades`}
              </dt>
              <dd>
                ${_`See <a href="#crafts">Crafts and Trades</a>.`}
              </dd>
              <dt>
                ${_`<a id="trader">Trader</a> watching over a fine steed`}
              </dt>
              <dd>
                ${_`<span class="subject">self-training</span> <a class="ref" href="/dhp380">Dhp 380</a>`}
              </dd>
              <dt>
                ${_`Trail in space`}
              </dt>
              <dd>
                ${_`<span class="subject">arahant</span> <a class="ref" href="/dhp254">Dhp 254</a>`}
              </dd>
              <dt>
                ${_`Travel`}
              </dt>
              <dd>
                ${_`from village to village <span class="subject">recollection of past lives</span> <a class="ref" href="/dn2">DN 2</a>, <a class="ref" href="/dn11">DN 11</a>, <a class="ref" href="/dn12">DN 12</a>, <a class="ref" href="/mn39">MN 39</a>`}
              </dd>
              <dd>
                ${_`in desolate country <span class="subject">hindrances</span> <a class="ref" href="/dn2">DN 2</a>, <a class="ref" href="/dn11">DN 11</a>, <a class="ref" href="/dn12">DN 12</a>, <a class="ref" href="/mn39">MN 39</a>`}
              </dd>
              <dd>
              </dd>
              <dt>
                ${_`Treasure, doorways leading to`}
              </dt>
              <dd>
                ${_`<span class="subject">doors to the Deathless</span> <a class="ref" href="/mn52">MN 52</a>, <a class="ref" href="/an11.17">AN 11.17</a>`}
              </dd>
              <dt id="tree">
                ${_`Tree`}
              </dt>
              <dd>
                ${_`changing <span class="subject">inconstancy</span> <a class="ref" href="/mn146">MN 146</a>`}
              </dd>
              <dd>
                ${_`gold <span class="subject">the body</span> <a class="ref" href="/thig14">Thig 14</a>`}
              </dd>
              <dd>
                ${_`growing back after having been cut <span class="subject">craving</span> <a class="ref" href="/dhp338">Dhp 338</a>`}
              </dd>
              <dd>
                ${_`growing on mountain <span class="subject">craving</span> <a class="ref" href="/an3.48">AN 3.48</a>`}
              </dd>
              <dd>
                ${_`haven for birds <span class="subject">conviction</span> <a class="ref" href="/an5.38">AN 5.38</a>`}
              </dd>
              <dd>
                ${_`killed by vine <span class="subject">vice</span> <a class="ref" href="/dhp162">Dhp 162</a>, <span class="subject">three unskillful roots</span> <a class="ref" href="/an3.69">AN 3.69</a>`}
              </dd>
              <dd>
                ${_`leaning to the east <span class="subject">virtue</span> <a class="ref" href="/sn55.22">SN 55.22</a>`}
              </dd>
              <dd>
                ${_`overcome by wind <span class="subject">restraint</span> <a class="ref" href="/dhp7">Dhp 7</a>`}
              </dd>
              <dd>
                ${_`pliant <span class="subject">the mind</span> <a class="ref" href="/an1.47">AN 1.47</a>`}
              </dd>
              <dd>
                ${_`shedding its leaves <span class="subject">solitude in the wilderness</span> <a href="snp/snp.1.3">Snp 1.3</a>`}
              </dd>
              <dd>
                ${_`with delicious fruit <span class="subject">sensuality</span> <a class="ref" href="/mn54">MN 54</a>`}
              </dd>
              <dd>
                ${_`with roots cut <span class="subject">aggregates</span> <a class="ref" href="/thig5.8">Thig 5.8</a>`}
              </dd>
              <dd>
              </dd>
              <dt>
                ${_`Tuning a stringed instrument`}
              </dt>
              <dd>
                ${_`<span class="subject">right effort</span> <a class="ref" href="/an6.55">AN 6.55</a>`}
              </dd>
              <dt>
                ${_`<a id="turban">Turban</a> or head on fire, person with`}
              </dt>
              <dd>
                ${_`<span class="subject">aroused persistence</span> <a class="ref" href="/an06.20">AN 6.20</a>, <a class="ref" href="/an10.51">AN 10.51</a>, <a class="ref" href="/an10.54">AN 10.54</a>, <a class="ref" href="/thag1.39">Thag 1.39</a>`}
              </dd>
              <dt>
                ${_`Turban tightening around one’s head`}
              </dt>
              <dd>
                ${_`<span class="subject">pain</span> <a class="ref" href="/mn36">MN 36</a>`}
              </dd>
              <dt>
                ${_`<a id="turner">Turner</a> or turner’s apprentice`}
              </dt>
              <dd>
                ${_`<span class="subject">mindfulness</span> <a class="ref" href="/dn22">DN 22</a>`}
              </dd>
              <dt>
                ${_`Turtle`}
              </dt>
              <dd>
                ${_`lanced by harpoon <span class="subject">the perils of fame</span> <a class="ref" href="/sn17.3">SN 17.3</a>`}
              </dd>
              <dd>
                ${_`blind sea turtle poking its head up through a yoke <span class="subject">rarity of human birth</span> <a class="ref" href="/mn129">MN 129</a>, <a class="ref" href="/sn56.48">SN 56.48</a>`}
              </dd>
              <dd>
              </dd>
              <dt>
                ${_`Tusker`}
              </dt>
              <dd>
                ${_`see <a href="#elephant">Elephant</a>.`}
              </dd>
            </dl>
            <h2>
              ${_`<a id="u">U</a>`}
            </h2>
            <dl>
              <dt id="upright">
                ${_`Uprighting what had been overturned`}
              </dt>
              <dd>
                ${_`<span class="subject">stock exclamation of appreciation of the Dhamma</span> <a class="ref" href="/dn2">DN 2</a>, <a class="ref" href="/dn12">DN 12</a>, <a class="ref" href="/dn16">DN 16</a>, <a class="ref" href="/dn31">DN 31</a>, <a class="ref" href="/mn4">MN 4</a>, <a class="ref" href="/mn41">MN 41</a>, <a class="ref" href="/mn57">MN 57</a>, <a class="ref" href="/mn58">MN 58</a>, <a class="ref" href="/mn72">MN 72</a>, <a class="ref" href="/mn75">MN 75</a>, <a class="ref" href="/mn107">MN 107</a>, <a class="ref" href="/mn135">MN 135</a>, <a class="ref" href="/sn3.1">SN 3.1</a>, <a class="ref" href="/sn7.2">SN 7.2</a>, <a class="ref" href="/sn7.6">SN 7.6</a>, <a class="ref" href="/sn7.14">SN 7.14</a>, <a class="ref" href="/sn7.17">SN 7.17</a>, <a class="ref" href="/sn12.48">SN 12.48</a>, <a class="ref" href="/sn35.127">SN 35.127</a>, <a class="ref" href="/sn42.2">SN 42.2</a>, <a class="ref" href="/sn42.3">SN 42.3</a>, <a class="ref" href="/sn42.6">SN 42.6</a>, <a class="ref" href="/sn42.8">SN 42.8</a>, <a class="ref" href="/sn42.9">SN 42.9</a>, <a class="ref" href="/sn51.15">SN 51.15</a>, <a class="ref" href="/an3.65">AN 3.65</a>, <a class="ref" href="/an3.72">AN 3.72</a>, <a class="ref" href="/an4.111">AN 4.111</a>, <a class="ref" href="/an4.184">AN 4.184</a>, <a class="ref" href="/an10.176">AN 10.176</a>, <a class="ref" href="/an10.177">AN 10.177</a>, <a class="ref" href="/ud5.3">Ud 5.3</a>`}
              </dd>
            </dl>
            <h2>
              ${_`<a id="v">V</a>`}
            </h2>
            <dl>
              <dt>
                ${_`Village`}
              </dt>
              <dd>
                ${_`empty <span class="subject">internal sense media</span> <a class="ref" href="/sn35.197">SN 35.197</a>`}
              </dd>
              <dd>
                ${_`leaving one’s <span class="subject">jhāna</span> <a class="ref" href="/mn105">MN 105</a>`}
              </dd>
              <dd>
              </dd>
              <dt id="vine">
                ${_`Vine`}
              </dt>
              <dd>
                ${_`creeping <span class="subject">craving</span> <a class="ref" href="/dhp334">Dhp 334</a>`}
              </dd>
              <dd>
                ${_`killing a tree <span class="subject">vice</span> <a class="ref" href="/dhp162">Dhp 162</a>`}
              </dd>
              <dd>
              </dd>
              <dt>
                ${_`Vipers`}
              </dt>
              <dd>
                ${_`<span class="subject">elements</span> <a class="ref" href="/sn35.197">SN 35.197</a>`}
              </dd>
              <dt>
                ${_`Vomit, person eating his or her own`}
              </dt>
              <dd>
                ${_`<span class="subject">fetters</span> <a class="ref" href="/mn105">MN 105</a>`}
              </dd>
              <dt>
                ${_`Vulture forced to drop his prey`}
              </dt>
              <dd>
                ${_`<span class="subject">sensuality</span> <a class="ref" href="/mn54">MN 54</a>`}
              </dd>
            </dl>
            <h2>
              ${_`<a id="w">W</a>`}
            </h2>
            <dl>
              <dt id="warrior">
                ${_`Warrior`}
              </dt>
              <dd>
                ${_`<span class="subject">celibacy</span> <a class="ref" href="/an5.75">AN 5.75</a>, <a class="ref" href="/an5.76">AN 5.76</a>`}
              </dd>
              <dd>
                ${_`<span class="subject">Buddha</span> <a class="ref" href="/dhp387">Dhp 387</a>`}
              </dd>
              <dd>
                ${_`untrained <span class="subject">hindrances</span> <a class="ref" href="/sn3.24">SN 3.24</a>, <span class="subject">worthy monk</span> <a class="ref" href="/an4.181">AN 4.181</a>`}
              </dd>
              <dd>
              </dd>
              <dt>
                ${_`Waste-water pool`}
              </dt>
              <dd>
                ${_`<span class="subject">ignorance</span> <a class="ref" href="/an4.178">AN 4.178</a>`}
              </dd>
              <dt id="water">
                ${_`Water`}
              </dt>
              <dd>
                ${_`container filled to brim <span class="subject">mindfulness</span> <a class="ref" href="/mn119">MN 119 </a>`}
              </dd>
              <dd>
                ${_`drawn from a pond <span class="subject">stream-entry</span> <a class="ref" href="/sn13.2">SN 13.2</a>`}
              </dd>
              <dd>
                ${_`drops in a hot pan <span class="subject">mindfulness</span> <a class="ref" href="/mn66">MN 66</a>, <a class="ref" href="/sn35.203">SN 35.203</a>, <span class="subject">equanimity</span> <a class="ref" href="/mn152">MN 152</a>`}
              </dd>
              <dd>
                ${_`filling a jar <span class="subject">evil</span> <a class="ref" href="/dhp121">Dhp 121</a>`}
              </dd>
              <dd>
                ${_`person sinking in <span class="subject">factors of awakening</span> <a class="ref" href="/an7.15">AN 7.15</a>`}
              </dd>
              <dd>
                ${_`ripples <span class="subject">preoccupations</span> <a class="ref" href="/snp4.15">Snp 4.15</a>`}
              </dd>
              <dd>
                ${_`<a id="waterlotus">rolling off a lotus leaf</a> <span class="subject">equanimity</span> <a class="ref" href="/mn152">MN 152</a>, <span class="subject">dukkha</span> <a class="ref" href="/snp4.6">Snp 4.6</a>, <a class="ref" href="/dhp336">Dhp 336</a>, <span class="subject">sensuality</span> <a class="ref" href="/dhp401">Dhp 401</a>, <span class="subject">greed</span> <a class="ref" href="/iti88">Iti 88</a>`}
              </dd>
              <dd>
              </dd>
              <dt>
                ${_`<a id="weigher">Weigher</a> holding a scale`}
              </dt>
              <dd>
                ${_`<span class="subject">virtuous conduct</span> <a class="ref" href="/an8.54">AN 8.54</a>`}
              </dd>
              <dt>
                ${_`Well in desert`}
              </dt>
              <dd>
                ${_`<span class="subject">nibbana</span> <a class="ref" href="/sn12.68">SN 12.68</a>`}
              </dd>
              <dt>
                ${_`Wet piece of wood`}
              </dt>
              <dd>
                ${_`<span class="subject">mindfulness</span> <a class="ref" href="/mn119">MN 119</a>`}
              </dd>
              <dt>
                ${_`Wheels`}
              </dt>
              <dd>
                ${_`four <span class="subject">prosperity</span> <a class="ref" href="/an4.31">AN 4.31</a>`}
              </dd>
              <dd>
                ${_`of cart <span class="subject">kamma</span> <a class="ref" href="/dhp1">Dhp 1</a>`}
              </dd>
              <dd>
              </dd>
              <dt>
                ${_`Wild deer`}
              </dt>
              <dd>
                ${_`<span class="subject">arahant</span> <a class="ref" href="/ud2.10">Ud 2.10</a>`}
              </dd>
              <dd>
                ${_`<span class="subject">sensuality</span> <a class="ref" href="/mn26">MN 26</a>`}
              </dd>
              <dt id="wind">
                ${_`Wind`}
              </dt>
              <dd>
                ${_`blowing across the sky <span class="subject">feeling</span> <a class="ref" href="/sn36.12">SN 36.12</a>`}
              </dd>
              <dd>
                ${_`blowing cotton fluff <span class="subject">dukkha</span> <a class="ref" href="/snp3.8">Snp 3.8</a>`}
              </dd>
              <dd>
                ${_`blowing leaves from a tree <span class="subject">awakening</span> <a class="ref" href="/thag17.2">Thag 17.2</a>`}
              </dd>
              <dd>
                ${_`coming out of bellows <span class="subject">exertion</span> <a class="ref" href="/mn36">MN 36</a>`}
              </dd>
              <dd>
                ${_`overcoming a tree <span class="subject">restraint</span> <a class="ref" href="/dhp7">Dhp 7</a>`}
              </dd>
              <dd>
                ${_`unsnared by a net <span class="subject">solitude in the wilderness</span> <a class="ref" href="/snp1.3">Snp 1.3</a>, <span class="subject">wise person</span> <a class="ref" href="/snp1.12">Snp 1.12</a>`}
              </dd>
              <dd>
              </dd>
              <dt>
                ${_`Winnowing`}
              </dt>
              <dd>
                ${_`<span class="subject">faults of others</span> <a class="ref" href="/dhp252">Dhp 252</a>`}
              </dd>
              <dt>
                ${_`Woman meeting her father-in-law`}
              </dt>
              <dd>
                ${_`<span class="subject">urgency</span> <a class="ref" href="/mn28">MN 28</a>`}
              </dd>
              <dt>
                ${_`Wood scrap`}
              </dt>
              <dd>
                ${_`<span class="subject">the body</span> <a class="ref" href="/dhp41">Dhp 41</a>`}
              </dd>
              <dt>
                ${_`Wounded man wandering in jungle`}
              </dt>
              <dd>
                ${_`<span class="subject">restraint</span> <a class="ref" href="/sn35.206">SN 35.206</a>`}
              </dd>
              <dt>
                ${_`Wounds, dressing`}
              </dt>
              <dd>
                ${_`<span class="subject">restraint</span> <a class="ref" href="/mn33">MN 33</a>, <a class="ref" href="/an11.18">AN 11.18</a>`}
              </dd>
            </dl>
            <h2>
              ${_`<a id="xyz">XYZ</a>`}
            </h2>
            <dl>
              <dt>
                ${_`Yellow leaf`}
              </dt>
              <dd>
                ${_`<span class="subject">aging</span> <a class="ref" href="/dhp235">Dhp 235</a>`}
              </dd>
              <dd>
                ${_`turning green <span class="subject">imperturbable</span> <a class="ref" href="/mn105">MN 105</a>`}
              </dd>
              <dd>
              </dd>
              <dt id="yokes">
                ${_`Yokes`}
              </dt>
              <dd>
                ${_`<span class="subject">sense-bases and their objects</span> <a class="ref" href="/sn35.191">SN 35.191</a>`}
              </dd>
              <dd>
                ${_`<span class="subject">rarity of human birth</span> <a class="ref" href="/sn56.48">SN 56.48</a>`}
              </dd>
              <dd>
                ${_`<span class="subject">sensuality, becoming, etc.</span> <a class="ref" href="/an4.10">AN 4.10</a>`}
              </dd>
              <dd>
                ${_`<span class="subject">discernment</span> <a class="ref" href="/snp1.4">Snp 1.4</a>`}
              </dd>
            </dl>
            <aside class="static-copyright">
              <p>
                ${_`The original source of this Index was released under the following terms:`}
              </p>
              <blockquote>
                ${_`© 2007 Access to Insight. The text of this page (“Index of Similes”, by Access to Insight) is licensed under a Creative Commons Attribution 4.0 International License. To view a copy of the license, visit <a href="http://creativecommons.org/licenses/by/4.0/" rel="noopener" target="_blank">this page</a>.`}
              </blockquote>
              <p>
                ${_`The same license also applies to this modified version by SuttaCentral, 2018.`}
              </p>
            </aside>
          </article>
        </section>
      </main>
    </div>`;
  }

  constructor() {
    super();
    this.localizedStringsPath = '/localization/elements/static_similes-page';
  }
}


customElements.define('sc-similes-page', SCSimiles);
