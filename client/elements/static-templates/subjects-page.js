import { html } from '@polymer/lit-element/lit-element.js';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';

import { staticStyles } from '../styles/static-styles.js';
import { SCStaticPage } from '../addons/sc-static-page.js';
import _ from '../../localization/macro.js';

class SCSubjects extends SCStaticPage {
  render() {
    return html`
    ${staticStyles}
    <div id="page-wrap">
      <main>
        <section>
          <article>
            <h1>
              ${_`Index of Subjects`}
            </h1>
            <p>
              ${_`This is a modified version of the <a href="https://www.accesstoinsight.org/index-subject.html" rel="noopener" target="_blank">General Index of subjects</a> from Access to Insight. We adapt this useful resource with gratitude. Changes include:`}
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
                ${_`In most cases, <a href="https://www.accesstoinsight.org/abbrev.html" rel="noopener" target="_blank" title="Access to Insight abbreviations">Access to Insight</a> and <a href="/abbreviations" title="SuttaCentral abbreviations">SuttaCentral</a> use the same reference conventions. However, in a few cases they differ; for example Sutta Nipāta is Sn in Access to Insight and Snp in SuttaCentral. In such cases the references have been changed to SuttaCentral’s system.`}
              </li>
            </ul>
            <p>
              ${_`The caveat expressed by the author of the original index still apply:`}
            </p>
            <blockquote>
              ${_`This is not an exhaustive index: not every text is indexed here, nor have I included references to each and every occurrence of a given topic in the texts. Nevertheless, I hope you find it helpful in steering you in the right direction.`}
            </blockquote>
            <p>
              ${_`In addition, note the following:`}
            </p>
            <ul>
              <li>
                ${_`References only include the Pali texts.`}
              </li>
              <li>
                ${_`A tilde (~) stands for the head-word in a given entry.`}
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
            <h2 id="a">
              ${_`A`}
            </h2>
            <dl>
              <dt id="adhitthana">
                ${_`Adhiṭṭhāna`}
              </dt>
              <dd class="description">
                ${_`<span class="translation">determination, resolution</span>`}
              </dd>
              <dd>
                ${_`Four determinations: <a class="ref" href="/mn140">MN 140</a>`}
              </dd>
              <dt id="adinava">
                ${_`Ādīnava`}
              </dt>
              <dd class="description">
                ${_`<span class="translation">drawbacks, dangers</span>. See also <a href="#gradual">Gradual instruction</a>.`}
              </dd>
              <dd>
                ${_`~ of feeling: <a class="ref" href="/mn13">MN 13</a>`}
              </dd>
              <dd>
                ${_`~ of form: <a class="ref" href="/mn13">MN 13</a>`}
              </dd>
              <dd>
                ${_`~ of sensuality: <a class="ref" href="/mn13">MN 13</a>, <a class="ref" href="/mn14">MN 14</a>, <a class="ref" href="/mn54">MN 54</a>, <a class="ref" href="/sn1.20">SN 1.20</a>, <a class="ref" href="/iti95">Iti 95</a>`}
              </dd>
              <dd>
                ${_`~ of clingable phenomena: <a class="ref" href="/sn12.52">SN 12.52</a>`}
              </dd>
              <dd>
                ${_`~ of aging, illness, and death: <a class="ref" href="/an3.62">AN 3.62</a>, <a class="ref" href="/an4.252">AN 4.252</a>`}
              </dd>
              <dd>
                ${_`~ of supranormal powers: <a class="ref" href="/dn11">DN 11</a>`}
              </dd>
              <dd>
                ${_`~ of unskillful thoughts: <a class="ref" href="/mn20">MN 20</a>`}
              </dd>
              <dd>
                ${_`~ of unskillful conduct: <a class="ref" href="/an2.18">AN 2.18</a>`}
              </dd>
              <dd>
                ${_`As one of ten perceptions: <a class="ref" href="/an10.60">AN 10.60</a>`}
              </dd>
              <dt>
                ${_`Admonishment`}
              </dt>
              <dd class="description">
                ${_`See also <a href="#speech">Speech</a>.`}
              </dd>
              <dd>
                ${_`Making oneself easy to admonish: <a class="ref" href="/mn21">MN 21</a>`}
              </dd>
              <dd>
                ${_`The Buddha’s strong words to his son Rahula: <a class="ref" href="/mn61">MN 61</a>`}
              </dd>
              <dd>
                ${_`What to do if someone just won’t listen to reason: <a class="ref" href="/an4.111">AN 4.111</a>`}
              </dd>
              <dt id="aging">
                ${_`Aging`}
              </dt>
              <dd class="description">
                ${_`See also <a href="#death">Death</a>; <a href="#divine">Divine messengers</a>; <a href="#illness">Illness</a>; four noble truths.`}
              </dd>
              <dd>
                ${_`The Buddha spits on ~: <a class="ref" href="/sn48.41">SN 48.41</a>`}
              </dd>
              <dd>
                ${_`Description of ~: <a class="ref" href="/mn9">MN 9</a>`}
              </dd>
              <dd>
                ${_`Understanding of ~ as a basis for Right View: <a class="ref" href="/mn9">MN 9</a>`}
              </dd>
              <dd>
                ${_`“Aging” chapter 11 in Dhammapada (<a class="ref" href="/dhp146">Dhp 146–156</a>)`}
              </dd>
              <dd>
                ${_`Effects of ~ on the body: <a class="ref" href="/thig13.1">Thig 13.1</a>`}
              </dd>
              <dd>
                ${_`How to train yourself when your body is old and decrepit: <a class="ref" href="/sn22">SN 22</a>`}
              </dd>
              <dd>
                ${_`You’re never too old to realize the Dhamma: <a class="ref" href="/thig5.8">Thig 5.8</a>`}
              </dd>
              <dd>
                ${_`Age is no measure of wisdom: <a class="ref" href="/sn3.1">SN 3.1</a>`}
              </dd>
              <dd>
                ${_`Advice to two aging brahmans: <a class="ref" href="/an3.51">AN 3.51</a>, <a class="ref" href="/an3.52">AN 3.52</a>`}
              </dd>
              <dt id="anapanasati">
                ${_`Ānāpānassati`}
              </dt>
              <dd class="description">
                ${_`<span class="translation">mindfulness of breathing</span>`}
              </dd>
              <dd>
                ${_`The Buddha’s principal teaching on ~: <a class="ref" href="/mn118">MN 118</a>`}
              </dd>
              <dd>
                ${_`How ~ leads to Awakening: <a class="ref" href="/sn54.13">SN 54.13</a>`}
              </dd>
              <dd>
                ${_`~ should be developed no matter how far along you are in your meditation practice: <a class="ref" href="/sn54.8">SN 54.8</a>`}
              </dd>
              <dd>
                ${_`As one of the ten Recollections: See <a href="#recollections">Recollections, ten</a>.`}
              </dd>
              <dd>
                ${_`As one of the ten Perceptions: <a class="ref" href="/an10.60">AN 10.60</a>`}
              </dd>
              <dd>
                ${_`As a method of subduing lust: <a class="ref" href="/sn8.4">SN 8.4</a>`}
              </dd>
              <dd>
                ${_`As a method of subduing annoying thoughts: <a class="ref" href="/iti85">Iti 85</a>`}
              </dd>
              <dd>
                ${_`Five qualities a practitioner of ~ should develop: <a class="ref" href="/an5.96">AN 5.96</a>, <a class="ref" href="/an5.97">AN 5.97</a>, <a class="ref" href="/an5.98">AN 5.98</a>`}
              </dd>
              <dt id="anatta">
                ${_`Anattā`}
              </dt>
              <dd class="description">
                ${_`<span class="translation">not-self</span>. See also <a href="#tilakkhana">Tilakkhaṇa</a> (three characteristics of existence)`}
              </dd>
              <dd>
                ${_`Reflection on ~ as a basis for insight: <a class="ref" href="/sn22.59">SN 22.59</a>`}
              </dd>
              <dd>
                ${_`Identifying the five <a href="#khandha">khandhas</a> as “self” is the cause of affliction: <a class="ref" href="/sn22.1">SN 22.1</a>`}
              </dd>
              <dd>
                ${_`As one of seven perceptions: <a class="ref" href="/an7.46">AN 7.46</a>`}
              </dd>
              <dd>
                ${_`As one of ten perceptions: <a class="ref" href="/an10.60">AN 10.60</a>`}
              </dd>
              <dd>
                ${_`Relation of ~ to dependent origination: <a class="ref" href="/dn15">DN 15</a>`}
              </dd>
              <dd>
                ${_`Contemplation of the six senses in terms of ~: <a class="ref" href="/mn148">MN 148</a>`}
              </dd>
              <dd>
                ${_`Not understanding ~ is like being a dog tied to a post: <a class="ref" href="/sn22.99">SN 22.99</a>`}
              </dd>
              <dt id="anger">
                ${_`Anger`}
              </dt>
              <dd class="description">
                ${_`See also <a href="#conflict">Conflict</a>; <a href="#ill">Ill-will</a> (vyāpāda); <a href="#kilesa">Kilesa</a> (defilements); <a href="#khanti">Khanti</a> (patience); <a href="#metta">Mettā</a> (love); <a href="#nivarana">Nīvaraṇa</a> (hindrances); <a href="#war">War</a>.`}
              </dd>
              <dd>
                ${_`As the only thing that’s good to kill: <a class="ref" href="/sn1.71">SN 1.71</a>`}
              </dd>
              <dd>
                ${_`What to do if someone is angry with you: <a class="ref" href="/sn7.2">SN 7.2</a>, <a class="ref" href="/sn11.4">SN 11.4</a>`}
              </dd>
              <dd>
                ${_`What to do when ~ arises: <a class="ref" href="/thag6.12">Thag 6.12</a>`}
              </dd>
              <dd>
                ${_`The best response to ~ (a debate between two deities): <a class="ref" href="/sn11.5">SN 11.5</a>`}
              </dd>
              <dd>
                ${_`~ can carve into you like an inscription in stone: <a class="ref" href="/an3.130">AN 3.130</a>`}
              </dd>
              <dd>
                ${_`~ can never be conquered with more ~: <a class="ref" href="/sn11.4">SN 11.4</a>, <a class="ref" href="/dhp3">Dhp 3</a>`}
              </dd>
              <dd>
                ${_`“Anger” chapter 17 in Dhammapada (<a class="ref" href="/dhp221">Dhp 221–234</a>)`}
              </dd>
              <dd>
                ${_`The dangers of giving in to ~: <a class="ref" href="/an7.60">AN 7.60</a>`}
              </dd>
              <dt id="anicca">
                ${_`Anicca`}
              </dt>
              <dd class="description">
                ${_`<span class="translation">Impermanence</span>. See also <a href="#tilakkhana">Tilakkhaṇa</a> (three characteristics of existence)`}
              </dd>
              <dd>
                ${_`As one of seven perceptions: <a class="ref" href="/an7.46">AN 7.46</a>`}
              </dd>
              <dd>
                ${_`As one of ten perceptions: <a class="ref" href="/an10.60">AN 10.60</a>`}
              </dd>
              <dd>
                ${_`Ponder ~ constantly: <a class="ref" href="/thag1.111">Thag 1.111</a>`}
              </dd>
              <dd>
                ${_`Contemplate ~ to overcome ignorance: <a class="ref" href="/iti85">Iti 85</a>`}
              </dd>
              <dd>
                ${_`Everything in the world is subject to disintegration: <a class="ref" href="/sn35.82">SN 35.82</a>`}
              </dd>
              <dt id="anusaya">
                ${_`Anusaya`}
              </dt>
              <dd class="description">
                ${_`<span class="translation">underlying tendency</span>`}
              </dd>
              <dd>
                ${_`Seven ~: <a class="ref" href="/an7.11">AN 7.11</a>; <a class="ref" href="/an7.12">AN 7.12</a>`}
              </dd>
              <dd>
                ${_`Three ~ in relationship to pleasant, painful, and neutral feeling: <a class="ref" href="/mn44">MN 44</a>; <a class="ref" href="/mn148">MN 148</a>; <a class="ref" href="/sn36.6">SN 36.6</a>`}
              </dd>
              <dd>
                ${_`With the end of the categories of objectification, the ~ come to an end: <a class="ref" href="/mn18">MN 18</a>`}
              </dd>
              <dt>
                ${_`Anussati`}
              </dt>
              <dd class="description">
                ${_`See <a href="#recollections">Recollections, ten</a>.`}
              </dd>
              <dt id="apaya-mukha">
                ${_`Apāya-mukha`}
              </dt>
              <dd class="description">
                ${_`<span class="translation">path to deprivation</span>`}
              </dd>
              <dd>
                ${_`Advice to laity on how to avoid the ~: <a class="ref" href="/an8.54">AN 8.54</a>, <a class="ref" href="/dn31">DN 31</a>`}
              </dd>
              <dt id="appamada">
                ${_`Appamāda`}
              </dt>
              <dd class="description">
                ${_`<span class="translation">heedfulness, diligence</span>`}
              </dd>
              <dd>
                ${_`Defined: <a class="ref" href="/sn35.97">SN 35.97</a>, <a class="ref" href="/sn48.56">SN 48.56</a>`}
              </dd>
              <dd>
                ${_`Difference between ~ and its opposite: <a class="ref" href="/sn35.97">SN 35.97</a>`}
              </dd>
              <dd>
                ${_`~ is the foremost skillful quality (ten similes): <a class="ref" href="/an10.15">AN 10.15</a>`}
              </dd>
              <dd>
                ${_`As the one quality that can provide security: <a class="ref" href="/sn3.17">SN 3.17</a>`}
              </dd>
              <dd>
                ${_`What constitutes living with ~: <a class="ref" href="/sn55.40">SN 55.40</a>`}
              </dd>
              <dd>
                ${_`The Buddha’s last words: <a class="ref" href="/dn16">DN 16</a>, <a class="ref" href="/sn6.15">SN 6.15</a>`}
              </dd>
              <dd>
                ${_`“Heedfulness” chapter 2 of Dhammapada (<a class="ref" href="/dhp21">Dhp 21–32</a>)`}
              </dd>
              <dd>
                ${_`Benefits of ~: <a class="ref" href="/iti23">Iti 23</a>`}
              </dd>
              <dd>
                ${_`Wake up!: <a class="ref" href="/snp2.10">Snp 2.10</a>`}
              </dd>
              <dt>
                ${_`Appropriate attention`}
              </dt>
              <dd class="description">
                ${_`See <a href="#yoniso">Yoniso-manasikāra</a>.`}
              </dd>
              <dt id="arahant">
                ${_`Arahant`}
              </dt>
              <dd class="description">
                ${_`<span class="translation">fully-awakened being</span>. See also <a href="#buddha">Buddha</a>; <a href="#nibbana">Nibbāna</a>.`}
              </dd>
              <dd>
                ${_`Stock passage describing attainment of arahantship: <a class="ref" href="/an6.55">AN 6.55</a>`}
              </dd>
              <dd>
                ${_`Stock passage describing the qualities of an ~: <a class="ref" href="/an6.55">AN 6.55</a>`}
              </dd>
              <dd>
                ${_`Who can find fault in an ~? <a class="ref" href="/ud7.6">Ud 7.6</a>`}
              </dd>
              <dd>
                ${_`Why an ~ continues meditating: <a class="ref" href="/sn16.5">SN 16.5</a>`}
              </dd>
              <dd>
                ${_`Does an ~ feel pain? <a class="ref" href="/sn1.38">SN 1.38</a>, <a class="ref" href="/sn4.13">SN 4.13</a>`}
              </dd>
              <dd>
                ${_`Does an ~ grieve? <a class="ref" href="/sn21.2">SN 21.2</a>`}
              </dd>
              <dd>
                ${_`An ~’s actions bear no kammic fruit, good or evil: <a class="ref" href="/an3.33">AN 3.33</a>, <a class="ref" href="/dhp39">Dhp 39</a>, <a class="ref" href="/dhp267">Dhp 267</a>, <a class="ref" href="/dhp412">Dhp 412</a>`}
              </dd>
              <dd>
                ${_`What is the difference between an ~ and a Buddha? <a class="ref" href="/sn22.58">SN 22.58</a>`}
              </dd>
              <dd>
                ${_`What is the difference between an ~ and a “learner” (<i>sekha</i>)? <a class="ref" href="/sn48.53">SN 48.53</a>`}
              </dd>
              <dd>
                ${_`How to recognize if you’re an ~: <a class="ref" href="/sn35.152">SN 35.152</a>`}
              </dd>
              <dd>
                ${_`“Arahants” (Dhammapada chapter 7)`}
              </dd>
              <dd>
                ${_`“Brahmans” (Dhammapada chapter 26)`}
              </dd>
              <dd>
                ${_`Fate of ~ after death: <a class="ref" href="/mn72">MN 72</a>, <a class="ref" href="/sn22.85">SN 22.85</a>, <a class="ref" href="/sn22.86">SN 22.86</a>`}
              </dd>
              <dd>
                ${_`Nine unskillful acts an ~ is incapable of doing: <a class="ref" href="/an9.7">AN 9.7</a>`}
              </dd>
              <dt>
                ${_`Ariya-aṭṭhaṅgika-magga`}
              </dt>
              <dd class="description">
                ${_`See <a href="#eightfold">Noble Eightfold Path</a>.`}
              </dd>
              <dt>
                ${_`Ariya-sacca`}
              </dt>
              <dd class="description">
                ${_`See <a href="#fourtruths">Four Noble Truths</a>.`}
              </dd>
              <dt id="asava">
                ${_`Āsava`}
              </dt>
              <dd class="description">
                ${_`<span class="translation">defilements, outflows, taints</span>. See also <a href="#kilesa">Kilesa</a>.`}
              </dd>
              <dd>
                ${_`The Buddha’s principal teaching on ~: <a class="ref" href="/mn2">MN 2</a>`}
              </dd>
              <dd>
                ${_`Understanding of ~ as a basis for Right View: <a class="ref" href="/mn9">MN 9</a>`}
              </dd>
              <dd>
                ${_`Three ~: <a class="ref" href="/iti56">Iti 56</a>, <a class="ref" href="/iti57">Iti 57</a>`}
              </dd>
              <dd>
                ${_`~ and right view: <a class="ref" href="/mn117">MN 117</a>`}
              </dd>
              <dd>
                ${_`Six important aspects of ~ to be understood: <a class="ref" href="/an6.63">AN 6.63</a>`}
              </dd>
              <dt id="ascetic">
                ${_`Ascetic practices`}
              </dt>
              <dd>
                ${_`Thirteen ~: <a class="ref" href="/thag16.7">Thag 16.7</a>`}
              </dd>
              <dd>
                ${_`The Buddha describes the ~ he practiced as a bodhisatta: <a class="ref" href="/mn12">MN 12</a>`}
              </dd>
              <dd>
                ${_`Which ascetic practices should be observed? <a class="ref" href="/an10.94">AN 10.94</a>`}
              </dd>
              <dt id="asubha">
                ${_`Asubha`}
              </dt>
              <dd class="description">
                ${_`<span class="translation">unattractiveness, loathsomeness</span>. See also <a href="#body">Body</a>; <a href="#nibbida">Nibbidā</a>; <a href="#sensuality">Sensuality</a>.`}
              </dd>
              <dd>
                ${_`Contemplation of ~ to maintain one’s resolve towards celibacy: <a class="ref" href="/sn35.127">SN 35.127</a>`}
              </dd>
              <dd>
                ${_`As one of seven beneficial reflections: <a class="ref" href="/an7.46">AN 7.46</a>`}
              </dd>
              <dd>
                ${_`Mastery of ~ is a quality to be developed: <a class="ref" href="/mn152">MN 152</a>`}
              </dd>
              <dd>
                ${_`Unattractiveness of the body as one of ten perceptions: <a class="ref" href="/an10.60">AN 10.60</a>`}
              </dd>
              <dd>
                ${_`The body as an unlanced boil: <a class="ref" href="/an9.15">AN 9.15</a>`}
              </dd>
              <dd>
                ${_`Using contemplation of ~ to subdue lust: <a class="ref" href="/iti85.">Iti 85.</a>`}
              </dd>
              <dd>
                ${_`Ven. Ānanda’s advice to Ven. Vaṅgīsa on overcoming lust: <a class="ref" href="/sn8.4">SN 8.4</a>`}
              </dd>
              <dd>
                ${_`Ven. Sister Subha plucks out an eye: <a class="ref" href="/thig14.1">Thig 14.1</a>`}
              </dd>
              <dt id="attachment">
                ${_`Attachment`}
              </dt>
              <dd class="description">
                ${_`See also <a href="#sensuality">Sensuality</a>; <a href="#tanha">Taṇhā</a> (craving).`}
              </dd>
              <dd>
                ${_`Does ~ to possessions really bring happiness? <a class="ref" href="/sn4.8">SN 4.8</a>`}
              </dd>
              <dd>
                ${_`~ to loved ones as a cause of sorrow: <a class="ref" href="/sn42.11">SN 42.11</a>, <a class="ref" href="/an5.30">AN 5.30</a>, <a class="ref" href="/ud8.8">Ud 8.8</a>`}
              </dd>
              <dd>
                ${_`~ to the body as a cause of further pain: <a class="ref" href="/snp4.2">Snp 4.2</a>`}
              </dd>
              <dt id="attha-sila">
                ${_`Aṭṭha-sīla`}
              </dt>
              <dd class="description">
                ${_`<span class="translation">the eight precepts</span>. See <a href="#precepts">Precepts</a>.`}
              </dd>
              <dt id="aversion">
                ${_`Aversion`}
              </dt>
              <dd class="description">
                ${_`See <a href="#ill">Ill-will</a> (vyāpāda).`}
              </dd>
              <dt id="avijja">
                ${_`Avijjā`}
              </dt>
              <dd class="description">
                ${_`<span class="translation">ignorance</span>. See also <a href="#kilesa">Kilesa</a> (defilements); <a href="#ps">Paṭicca-samuppāda</a> (dependent origination).`}
              </dd>
              <dd>
                ${_`As a flood: <a class="ref" href="/sn45.171">SN 45.171</a>`}
              </dd>
              <dd>
                ${_`As a yoke: <a class="ref" href="/an4.10">AN 4.10</a>`}
              </dd>
              <dd>
                ${_`As one of the fetters (<a href="#samyojana">Saṁyojana</a>): <a class="ref" href="/an10.13">AN 10.13</a>`}
              </dd>
              <dd>
                ${_`As one of the obsessions (<a href="#anusaya">Anusaya</a>): <a class="ref" href="/an7.11">AN 7.11</a>, <a class="ref" href="/an7.12">AN 7.12</a>`}
              </dd>
              <dd>
                ${_`As the cause of wrong view, wrong resolve, etc.: <a class="ref" href="/sn45.1">SN 45.1</a>`}
              </dd>
              <dd>
                ${_`What one thing must one abandon in order to overcome ~? <a class="ref" href="/sn35.80">SN 35.80</a>`}
              </dd>
              <dd>
                ${_`Understanding of ~ as a basis for Right View: <a class="ref" href="/mn9">MN 9</a>`}
              </dd>
              <dd>
                ${_`As an obstruction: <a class="ref" href="/iti14">Iti 14</a>`}
              </dd>
              <dt id="awakening">
                ${_`Awakening`}
              </dt>
              <dd class="description">
                ${_`See also <a href="#nibbana">Nibbāna</a>; <a href="#vimutti">Vimutti</a> (release).`}
              </dd>
              <dd>
                ${_`Factors for ~: see <a href="#bojjhanga">Bojjhaṅga</a>.`}
              </dd>
              <dd>
                ${_`Is ~ “gradual” or “sudden”? <a class="ref" href="/ud5.5">Ud 5.5</a>`}
              </dd>
              <dt id="awareness">
                ${_`Awareness`}
              </dt>
              <dd class="description">
                ${_`See <a href="#sati">Sati</a>.`}
              </dd>
              <dt id="ayoniso">
                ${_`Ayoniso manasikāra (inappropriate attention)`}
              </dt>
              <dd class="description">
                ${_`See also <a href="#yoniso">Yoniso manasikāra (appropriate attention)</a>.`}
              </dd>
              <dd>
                ${_`What to do when the mind is being consumed by unskillful thoughts: <a class="ref" href="/sn9.11">SN 9.11</a>`}
              </dd>
            </dl>
            <h2 id="b">
              ${_`B`}
            </h2>
            <dl>
              <dt>
                ${_`Bala`}
              </dt>
              <dd class="description">
                ${_`<span class="translation">the five strengths</span>. See also <a href="#bodhipakkhiya-dhamma">Bodhipakkhiya-dhamma</a>.`}
              </dd>
              <dd>
                ${_`Definition of the ~: <a class="ref" href="/an5.2">AN 5.2</a>`}
              </dd>
              <dt id="beauty">
                ${_`Beauty`}
              </dt>
              <dd>
                ${_`As a meditative attainment: <a class="ref" href="/sn14.11">SN 14.11</a>`}
              </dd>
              <dt id="bhava">
                ${_`Bhava`}
              </dt>
              <dd class="description">
                ${_`<span class="translation">existence, life, realm of rebirth</span>. See also <a href="#ps">Paṭicca-samuppāda</a> (dependent origination).`}
              </dd>
              <dd>
                ${_`As a flood: <a class="ref" href="/sn45.171">SN 45.171</a>`}
              </dd>
              <dd>
                ${_`As a yoke: <a class="ref" href="/an4.10">AN 4.10</a>`}
              </dd>
              <dd>
                ${_`Three levels on which ~ operates: <a class="ref" href="/an3.76">AN 3.76</a>, <a class="ref" href="/an3.77">AN 3.77</a>`}
              </dd>
              <dt>
                ${_`Bhikkhu (monk)`}
              </dt>
              <dd class="description">
                ${_`See <a href="#monastic">Monastic Life</a>.`}
              </dd>
              <dt>
                ${_`Bhikkhunī (nun)`}
              </dt>
              <dd class="description">
                ${_`See <a href="#monastic">Monastic Life</a>.`}
              </dd>
              <dd>
                ${_`The Therīgāthā (Thig) is a collection of verses by nuns.`}
              </dd>
              <dd>
                ${_`The Bhikkhunī Saṁyutta (<a class="ref" href="/sn5">SN 5</a>) is another collection with verses by nuns.`}
              </dd>
              <dt>
                ${_`Birth`}
              </dt>
              <dd class="description">
                ${_`See <a href="#jati">Jāti</a>.`}
              </dd>
              <dt id="bodhipakkhiya-dhamma">
                ${_`Bodhipakkhiya-dhamma`}
              </dt>
              <dd class="description">
                ${_`<span class="translation">37 factors leading to awakening</span>`}
              </dd>
              <dd>
                ${_`~ and their relation to the six senses: <a class="ref" href="/mn149">MN 149</a>`}
              </dd>
              <dd>
                ${_`Prerequisites for the development of the ~: <a class="ref" href="/an9.1">AN 9.1</a>`}
              </dd>
              <dt>
                ${_`Also look under each of its constituent seven sets:`}
              </dt>
              <dd>
                ${_`<a href="#satipatthana">Satipaṭṭhāna</a> (4 kinds of mindfulness meditation);`}
              </dd>
              <dd>
                ${_`<a href="#sammappadhana">Sammāppadhāna</a> (4 right efforts);`}
              </dd>
              <dd>
                ${_`<a href="#iddhipada">Iddhipada</a> (4 bases of psychic power);`}
              </dd>
              <dd>
                ${_`<a href="#indriya">Indriya</a> (5 faculties);`}
              </dd>
              <dd>
                ${_`<a href="#bala">Bala</a> (5 powers);`}
              </dd>
              <dd>
                ${_`<a href="#bojjhanga">Bojjhaṅga</a> (7 awakening factors);`}
              </dd>
              <dd>
                ${_`<a href="#eightfold">Noble Eightfold Path</a>.`}
              </dd>
              <dt id="body">
                ${_`Body`}
              </dt>
              <dd class="description">
                ${_`See also <a href="#asubha">Asubha</a>; <a href="#attachment">Attachment</a>; <a href="#sensuality">Sensuality</a>.`}
              </dd>
              <dd>
                ${_`Mindfulness of the ~: see <a href="#satipatthana">Satipaṭṭhāna</a>.`}
              </dd>
              <dd>
                ${_`Thirty-one parts of the ~: <a class="ref" href="/mn10">MN 10</a>`}
              </dd>
              <dd>
                ${_`Foulness of ~: <a class="ref" href="/an9.15">AN 9.15</a>, <a class="ref" href="/snp1.11">Snp 1.11</a>, <a class="ref" href="/thag10.5">Thag 10.5</a>`}
              </dd>
              <dt id="bojjhanga">
                ${_`Bojjhaṅga`}
              </dt>
              <dd class="description">
                ${_`<span class="translation">factors leading to awakening</span>. See also <a href="#bodhipakkhiya-dhamma">Bodhipakkhiya-dhamma</a>.`}
              </dd>
              <dd>
                ${_`The right and wrong times to cultivate the ~: <a class="ref" href="/sn46.53">SN 46.53</a>`}
              </dd>
              <dd>
                ${_`See the suttas in the Bojjhaṅga-saṁyutta of the Saṁyutta Nikāya`}
              </dd>
              <dt id="brahmavihara">
                ${_`Brahmavihāra`}
              </dt>
              <dd class="description">
                ${_`<span class="translation">Divine abodes; sublime states</span>. See also <a href="#metta">Mettā</a>; <a href="#karuna">Karuṇā</a>; <a href="#mudita">Muditā</a>; <a href="#upekkha">Upekkhā</a>.`}
              </dd>
              <dd>
                ${_`Systematic cultivation of ~: <a class="ref" href="/sn42.8">SN 42.8</a>, <a class="ref" href="/sn46.54">SN 46.54</a>, <a class="ref" href="/an10.208">AN 10.208</a>`}
              </dd>
              <dd>
                ${_`Practice of ~ as a door to the Deathless: <a class="ref" href="/mn52">MN 52</a>, <a class="ref" href="/an11.17">AN 11.17</a>`}
              </dd>
              <dd>
                ${_`Offering comfort and protection from the cold: <a class="ref" href="/thag6.2">Thag 6.2</a>`}
              </dd>
              <dd>
                ${_`Five realizations that arise from concentration based on the ~: <a class="ref" href="/an5.27">AN 5.27</a>`}
              </dd>
              <dd>
                ${_`Practicing any one of the ~ can take one all the way to fourth jhāna: <a class="ref" href="/an8.63">AN 8.63</a>`}
              </dd>
              <dt>
                ${_`Breath meditation`}
              </dt>
              <dd class="description">
                ${_`See <a href="#anapanasati">Ānāpānassati</a>.`}
              </dd>
              <dt id="buddha">
                ${_`Buddha`}
              </dt>
              <dd class="description">
                ${_`See also <a href="#arahant">Arahant</a>.`}
              </dd>
              <dd>
                ${_`As one of the ten Recollections: see <a href="#recollections">Recollections, ten</a>.`}
              </dd>
              <dd>
                ${_`Buddha’s Awakening: See <a href="#tevijja">Tevijjā</a> (Threefold Knowledge)`}
              </dd>
            </dl>
            <h2 id="c">
              ${_`C`}
            </h2>
            <dl>
              <dt id="caste">
                ${_`Caste system`}
              </dt>
              <dd>
                ${_`Caste (i.e. race, social class, national identity, etc.) does not determine one’s virtue or spiritual potential: <a class="ref" href="/mn90">MN 90</a>, <a class="ref" href="/mn93">MN 93</a>`}
              </dd>
              <dd>
                ${_`Even outcastes can become arahants: <a class="ref" href="/thag12.2">Thag 12.2</a>`}
              </dd>
              <dd>
                ${_`A bhikkhu has no caste: <a class="ref" href="/an10.48">AN 10.48</a>`}
              </dd>
              <dt id="celibacy">
                ${_`Celibacy`}
              </dt>
              <dd class="description">
                ${_`See also <a href="#nekkhamma">Nekkhamma</a> (renunciation); <a href="#restraint">Restraint</a>; <a href="#sensuality">Sensuality</a>.`}
              </dd>
              <dd>
                ${_`Tools to support one’s resolve towards ~: <a class="ref" href="/sn35.127">SN 35.127</a>`}
              </dd>
              <dd>
                ${_`Don’t pretend to be celibate if you’re not: <a class="ref" href="/iti48">Iti 48</a>`}
              </dd>
              <dt>
                ${_`Ceremonies`}
              </dt>
              <dd class="description">
                ${_`See <a href="#rituals">Rituals</a>.`}
              </dd>
              <dt id="chanting">
                ${_`Characteristics of existence`}
              </dt>
              <dd class="description">
                ${_`See <a href="#tilakkhana">Tilakkhaṇa</a>.`}
              </dd>
              <dt id="children">
                ${_`Children`}
              </dt>
              <dd class="description">
                ${_`See also <a href="#parents">Parents</a>; <a href="#family">Family</a>; <a href="#young">Young people</a> (readings for).`}
              </dd>
              <dd>
                ${_`Three types of sons and daughters: <a class="ref" href="/iti74">Iti 74</a>`}
              </dd>
              <dd>
                ${_`At one time or another, we have all been each other’s ~: <a class="ref" href="/sn15.14">SN 15.14</a>`}
              </dd>
              <dd>
                ${_`Grieving the death of ~: <a class="ref" href="/sn42.11">SN 42.11</a>, <a class="ref" href="/ud2.7">Ud 2.7</a>, <a class="ref" href="/ud8.8">Ud 8.8</a>`}
              </dd>
              <dd>
                ${_`The anguish an aging parent feels when his ~ show no gratitude: <a class="ref" href="/sn7.14">SN 7.14</a>`}
              </dd>
              <dd>
                ${_`Childish innocence should not be confused with wisdom: <a class="ref" href="/mn78">MN 78</a>`}
              </dd>
              <dd>
                ${_`Showing the proper respect to one’s parents: <a class="ref" href="/iti106">Iti 106</a>`}
              </dd>
              <dd>
                ${_`Childrens’ duties to their parents: <a class="ref" href="/dn31">DN 31</a>`}
              </dd>
              <dd>
                ${_`Parents’ duties to their ~: <a class="ref" href="/dn31">DN 31</a>`}
              </dd>
              <dt>
                ${_`Clinging`}
              </dt>
              <dd class="description">
                ${_`See <a href="#upadana">Upādāna</a>.`}
              </dd>
              <dt id="communal">
                ${_`Communal harmony`}
              </dt>
              <dd class="description">
                ${_`See also <a href="#Sangha">Monastic community</a> (Saṅgha).`}
              </dd>
              <dd>
                ${_`Six kinds of behavior that lead to amiability and communal harmony: <a class="ref" href="/an6.12">AN 6.12</a>`}
              </dd>
              <dt id="comparative">
                ${_`Comparative Religions`}
              </dt>
              <dd class="description">
                ${_`See also <a href="#god">God</a>.`}
              </dd>
              <dd>
                ${_`Do all religions point towards the same goal? <a class="ref" href="/dn21">DN 21</a>, <a class="ref" href="/thag1.86">Thag 1.86</a>`}
              </dd>
              <dd>
                ${_`Are all religious paths fruitful? <a class="ref" href="/an3.78">AN 3.78</a>`}
              </dd>
              <dt>
                ${_`Compassion`}
              </dt>
              <dd class="description">
                ${_`See <a href="#karuna">Karuṇā</a>.`}
              </dd>
              <dt>
                ${_`Conceit`}
              </dt>
              <dd class="description">
                ${_`See <a href="#mana">Māna</a>.`}
              </dd>
              <dt>
                ${_`Concentration`}
              </dt>
              <dd class="description">
                ${_`See <a href="#samadhi">Samādhi</a>.`}
              </dd>
              <dt id="conflict">
                ${_`Conflict`}
              </dt>
              <dd class="description">
                ${_`See also <a href="#anger">Anger</a>; <a href="#ill">Ill-will</a> (vyāpāda); <a href="#papanca">Papañca</a>; <a href="#war">War</a>.`}
              </dd>
              <dd>
                ${_`Causes of: <a class="ref" href="/snp4.8">Snp 4.8</a>, <a class="ref" href="/snp4.11">Snp 4.11</a>, <a class="ref" href="/snp4.15">Snp 4.15</a>`}
              </dd>
              <dt>
                ${_`Conscience`}
              </dt>
              <dd class="description">
                ${_`See <a href="#hiri">Hiri</a>.`}
              </dd>
              <dt>
                ${_`Consciousness`}
              </dt>
              <dd class="description">
                ${_`See <a href="#vinnana">Viññāṇa</a>.`}
              </dd>
              <dt>
                ${_`Contact`}
              </dt>
              <dd class="description">
                ${_`See <a href="#phassa">Phassa</a>.`}
              </dd>
              <dt id="contentment">
                ${_`Contentment with little`}
              </dt>
              <dd class="description">
                ${_`See also <a href="#restraint">Restraint</a>.`}
              </dd>
              <dd>
                ${_`As a vital support for practice: <a class="ref" href="/an4.28">AN 4.28</a>`}
              </dd>
              <dd>
                ${_`As a quality of a great person: <a class="ref" href="/an8.30">AN 8.30</a>`}
              </dd>
              <dd>
                ${_`Live like a flying bird, whose wings are its only burden: <a class="ref" href="/dn2">DN 2</a>, <a class="ref" href="/dn11">DN 11</a>`}
              </dd>
              <dd>
                ${_`One thing you should <i>not</i> be content with: <a class="ref" href="/an2.5">AN 2.5</a>`}
              </dd>
              <dt>
                ${_`Conviction`}
              </dt>
              <dd class="description">
                ${_`See <a href="#saddha">Saddhā</a>.`}
              </dd>
              <dt>
                ${_`Craving`}
              </dt>
              <dd class="description">
                ${_`See <a href="#tanha">Taṇhā</a>.`}
              </dd>
              <dt>
                ${_`Creation (of universe)`}
              </dt>
              <dd class="description">
                ${_`See <a href="#questions">Questions not worth asking</a>.`}
              </dd>
            </dl>
            <h2 id="d">
              ${_`D`}
            </h2>
            <dl>
              <dt id="dana">
                ${_`Dāna`}
              </dt>
              <dd class="description">
                ${_`<span class="translation">giving; charity</span>. See also <a href="#gradual">Gradual instruction</a>; <a href="#parami">Pāramī</a>.`}
              </dd>
              <dd>
                ${_`As one of the greatest protections/blessings: <a class="ref" href="/snp2.4">Snp 2.4</a>`}
              </dd>
              <dd>
                ${_`As a fundamental requirement for success on the Path: <a class="ref" href="/an5.254">AN 5.254</a>`}
              </dd>
              <dd>
                ${_`As a treasure: <a class="ref" href="/an7.6">AN 7.6</a>`}
              </dd>
              <dd>
                ${_`As one of the ten Recollections: see <a href="#recollections">Recollections, ten</a>.`}
              </dd>
              <dd>
                ${_`To whom should one give so as to reap the greatest fruit? <a class="ref" href="/sn3.24">SN 3.24</a>, <a class="ref" href="/an3.57">AN 3.57</a>`}
              </dd>
              <dd>
                ${_`Eight persons worthy of gifts: <a class="ref" href="/an8.59">AN 8.59</a>`}
              </dd>
              <dd>
                ${_`Giving to one who has abandoned the hindrances brings good results: <a class="ref" href="/sn3.24">SN 3.24</a>`}
              </dd>
              <dd>
                ${_`Never regret a generous gift you gave in the past: <a class="ref" href="/sn3.20">SN 3.20</a>`}
              </dd>
              <dd>
                ${_`Give while you’re able, before your house burns to the ground!: <a class="ref" href="/sn1.41">SN 1.41</a>`}
              </dd>
              <dd>
                ${_`Giving is best done at the proper time: <a class="ref" href="/an5.36">AN 5.36</a>`}
              </dd>
              <dd>
                ${_`The blessings inherent in the gift of food: <a class="ref" href="/an5.37">AN 5.37</a>`}
              </dd>
              <dd>
                ${_`Giving even one’s last meal: <a class="ref" href="/iti26">Iti 26</a>`}
              </dd>
              <dd>
                ${_`The fruits of giving that arises from various motives: <a class="ref" href="/an7.49">AN 7.49</a>`}
              </dd>
              <dd>
                ${_`The fruits of giving that can be reaped in this life: <a class="ref" href="/an5.34">AN 5.34</a>`}
              </dd>
              <dd>
                ${_`Two kinds of gifts: <a class="ref" href="/iti98">Iti 98</a>, <a class="ref" href="/iti100">Iti 100</a>`}
              </dd>
              <dd>
                ${_`Gifts of Dhamma: <a class="ref" href="/dhp354">Dhp 354</a>, <a class="ref" href="/iti98">Iti 98</a>, <a class="ref" href="/iti100">Iti 100</a>`}
              </dd>
              <dd>
                ${_`Citta the householder’s final teaching on generosity: <a class="ref" href="/sn41.10">SN 41.10</a>`}
              </dd>
              <dd>
                ${_`Give to many; don’t be like a rainless cloud: <a class="ref" href="/iti75">Iti 75</a>`}
              </dd>
              <dd>
                ${_`Giving is good, but there is still more to be done: <a class="ref" href="/an5.176">AN 5.176</a>`}
              </dd>
              <dd>
                ${_`The dangers faced by unvirtuous monks who enjoy pleasures, homage and gifts of the laity: <a class="ref" href="/an7.68">AN 7.68</a>`}
              </dd>
              <dd>
                ${_`The scale of good deeds: <a class="ref" href="/an9.20">AN 9.20</a>`}
              </dd>
              <dd>
                ${_`See the suttas in the Devatā-saṁyutta of the Saṁyutta Nikāya`}
              </dd>
              <dt id="dasasila">
                ${_`Dasa-sīla`}
              </dt>
              <dd class="description">
                ${_`<span class="translation">the ten precepts</span>. See <a href="#sila">Sīla</a> (ethics, morality).`}
              </dd>
              <dt id="death">
                ${_`Death`}
              </dt>
              <dd class="description">
                ${_`See also <a href="#aging">Aging</a>; <a href="#deathless">Deathless</a>; <a href="#divine">Divine messengers</a>; <a href="#grief">Grief</a>; <a href="#illness">Illness</a>; <a href="#maranassati">Maraṇassati</a> (mindfulness of death); <a href="#murder">Murder</a>; <a href="#samvega">Saṁvega</a> (spiritual urgency).`}
              </dd>
              <dd>
                ${_`Five subjects for frequent recollection: <a class="ref" href="/an5.57">AN 5.57</a>`}
              </dd>
              <dd>
                ${_`Understanding of ~ as a basis for Right View: <a class="ref" href="/mn9">MN 9</a>`}
              </dd>
              <dd>
                ${_`Why do we grieve when a loved one dies? <a class="ref" href="/sn42.11">SN 42.11</a>`}
              </dd>
              <dd>
                ${_`As one of seven beneficial reflections: <a class="ref" href="/an7.46">AN 7.46</a>`}
              </dd>
              <dd>
                ${_`As a call to abandon grief and lamentation: <a class="ref" href="/snp3.8">Snp 3.8</a>`}
              </dd>
              <dd>
                ${_`The greatest protection for the layperson: <a class="ref" href="/snp2.4">Snp 2.4</a>`}
              </dd>
              <dd>
                ${_`Overcoming ~ by regarding the world as empty: <a class="ref" href="/snp5.15">Snp 5.15</a>`}
              </dd>
              <dd>
                ${_`Overcoming fear of ~: <a class="ref" href="/an4.184">AN 4.184</a>, <a class="ref" href="/thag16.1">Thag 16.1</a>`}
              </dd>
              <dd>
                ${_`Heedlessness leads one to ~: <a class="ref" href="/dhp21">Dhp 21</a>`}
              </dd>
              <dd>
                ${_`No need for worry as ~ nears: <a class="ref" href="/sn55.21">SN 55.21</a>, <a class="ref" href="/sn55.22">SN 55.22</a>, <a class="ref" href="/an6.16">AN 6.16</a>`}
              </dd>
              <dd>
                ${_`Citta’s deathbed conversation with some devas: <a class="ref" href="/sn41.10">SN 41.10</a>`}
              </dd>
              <dd>
                ${_`Sāriputta’s teachings to a dying Anāthapiṇḍika: <a class="ref" href="/mn143">MN 143</a>`}
              </dd>
              <dd>
                ${_`Ven. Ānanda’s grief over Ven. Sāriputta’s ~: <a class="ref" href="/sn47.13">SN 47.13</a>`}
              </dd>
              <dd>
                ${_`The Buddha’s reaction to Ven. Sāriputta’s ~: <a class="ref" href="/sn47.14">SN 47.14</a>`}
              </dd>
              <dd>
                ${_`~ by a runaway cow: <a class="ref" href="/mn140">MN 140</a>, <a class="ref" href="/ud1.10">Ud 1.10</a>, <a class="ref" href="/ud5.3">Ud 5.3</a>`}
              </dd>
              <dd>
                ${_`~ by murder (see also <a href="#murder">Murder</a>): <a class="ref" href="/ud4.3">Ud 4.3</a>`}
              </dd>
              <dd>
                ${_`~ of daughter: <a class="ref" href="/thig3.5">Thig 3.5</a>`}
              </dd>
              <dd>
                ${_`~ of grandson: <a class="ref" href="/ud8.8">Ud 8.8</a>`}
              </dd>
              <dd>
                ${_`~ of son: <a class="ref" href="/mn87">MN 87</a>, <a class="ref" href="/sn42.11">SN 42.11</a> <a class="ref" href="/ud2.7">Ud 2.7</a>, <a class="ref" href="/thig6.1">Thig 6.1</a>`}
              </dd>
              <dd>
                ${_`~ of spouse: <a class="ref" href="/an5.49">AN 5.49</a>`}
              </dd>
              <dd>
                ${_`Honor your ancestors and deceased loved ones with gifts: <a class="ref" href="/pv1.5">Pv 1.5</a>`}
              </dd>
              <dd>
                ${_`Reflections on the brevity of life:\n                `}
                <ul>
                  <li>
                    ${_`Death comes rolling towards you, crushing everything in its path. Are you ready? <a class="ref" href="/sn3.25">SN 3.25</a>`}
                  </li>
                  <li>
                    ${_`Life flies by, faster than any arrow. What are we to do? <a class="ref" href="/sn20.6">SN 20.6</a>`}
                  </li>
                  <li>
                    ${_`No shelter from aging and death: <a class="ref" href="/sn2.19">SN 2.19</a>`}
                  </li>
                  <li>
                    ${_`Your last day approaches—this is no time to be heedless! <a class="ref" href="/thag6.13">Thag 6.13</a>`}
                  </li>
                  <li>
                    ${_`Life is brief—practice ardently! <a class="ref" href="/ud5.2">Ud 5.2</a>`}
                  </li>
                </ul>
              </dd>
              <dt id="deathless">
                ${_`Deathless`}
              </dt>
              <dd class="description">
                ${_`<span class="translation">Amata</span>. A synonym for <a href="#nibbana">Nibbāna</a>.`}
              </dd>
              <dd>
                ${_`Eleven modes of practice that lead to the deathless: <a class="ref" href="/mn52">MN 52</a>, <a class="ref" href="/an11.17">AN 11.17</a>`}
              </dd>
              <dt>
                ${_`Defilements`}
              </dt>
              <dd class="description">
                ${_`See <a href="#kilesa">Kilesa</a>.`}
              </dd>
              <dt>
                ${_`Dependent origination`}
              </dt>
              <dd class="description">
                ${_`See <a href="#ps">Paṭicca-samuppāda</a>.`}
              </dd>
              <dt id="desire">
                ${_`Desire`}
              </dt>
              <dd class="description">
                ${_`as part of the Path (<i>dhamma-chanda</i>)`}
              </dd>
              <dd>
                ${_`Does the ~ for Awakening get in the way of Awakening? <a class="ref" href="/mn126">MN 126</a>`}
              </dd>
              <dd>
                ${_`Ven. Ānanda’s instructions to Uṇṇābha: <a class="ref" href="/sn51.15">SN 51.15</a>`}
              </dd>
              <dt id="lobha">
                ${_`Desire`}
              </dt>
              <dd class="description">
                ${_`as defilement (<i>lobha, kāmacchanda, rāga</i>). See also <a href="#nivarana">Nīvaraṇa</a> (hindrances); <a href="#kilesa">Kilesa</a> (defilements); <a href="#tanha">Taṇhā</a> (craving).`}
              </dd>
              <dd>
                ${_`As one of the fetters (<a href="#samyojana">Saṁyojana</a>): <a class="ref" href="/an10.13">AN 10.13</a>`}
              </dd>
              <dd>
                ${_`As one of the obsessions (<a href="#anusaya">Anusaya</a>): <a class="ref" href="/an7.11">AN 7.11</a>, <a class="ref" href="/an7.12">AN 7.12</a>`}
              </dd>
              <dd>
                ${_`As the cause of suffering and stress: <a class="ref" href="/sn42.11">SN 42.11</a>`}
              </dd>
              <dd>
                ${_`~ ties down the world: <a class="ref" href="/sn1.69">SN 1.69</a>`}
              </dd>
              <dd>
                ${_`Why ~ and passion connected with the senses is worth abandoning: <a class="ref" href="/sn27.1">SN 27.1–8</a>`}
              </dd>
              <dd>
                ${_`Why ~ and passion connected with the <a href="#khandha">khandha</a> (aggregates) is worth abandoning: <a class="ref" href="/sn27.10">SN 27.10</a>`}
              </dd>
              <dd>
                ${_`Why ~ and passion connected with the <a href="#dhatu">dhātu</a> (elements) is worth abandoning: <a class="ref" href="/sn27.9">SN 27.9</a>`}
              </dd>
              <dt id="deva">
                ${_`Devas`}
              </dt>
              <dd class="description">
                ${_`<span class="translation">celestial beings</span>. See also <a href="#kamma">Kamma</a>; <a href="#planes">Planes of Existence, Thirty-one</a>; <a href="#sagga">Sagga</a> (heaven).`}
              </dd>
              <dd>
                ${_`Citta’s deathbed conversation with some ~: <a class="ref" href="/sn41.10">SN 41.10</a>`}
              </dd>
              <dd>
                ${_`Some ~ gather to see the Buddha on his deathbed: <a class="ref" href="/dn16">DN 16</a>`}
              </dd>
              <dd>
                ${_`A huge gathering of ~ visits the Buddha: <a class="ref" href="/dn20">DN 20</a>`}
              </dd>
              <dd>
                ${_`Conversations with the ~ as a basis for faith: <a class="ref" href="/dn11">DN 11</a>`}
              </dd>
              <dd>
                ${_`Occasions when the ~ raise a cheer for a meditator: <a class="ref" href="/iti82">Iti 82</a>`}
              </dd>
              <dd>
                ${_`Omens that a ~ is about to die: <a class="ref" href="/iti83">Iti 83</a>`}
              </dd>
              <dd>
                ${_`As one of the ten Recollections: see <a href="#recollections">Recollections, ten</a>`}
              </dd>
              <dt id="devotion">
                ${_`Devotion`}
              </dt>
              <dd class="description">
                ${_`See also <a href="#relics">Relics</a>; <a href="#rituals">Rituals and Ceremonies</a>.`}
              </dd>
              <dd>
                ${_`The four Buddhist pilgrimage sites: <a class="ref" href="/dn16">DN 16</a>`}
              </dd>
              <dt id="dhamma">
                ${_`Dhamma`}
              </dt>
              <dd class="description">
                ${_`See also <a href="#teaching">Teaching the Dhamma</a>.`}
              </dd>
              <dd>
                ${_`Basic principles: <a class="ref" href="/an8.53">AN 8.53</a>`}
              </dd>
              <dd>
                ${_`Five rewards of listening to ~: <a class="ref" href="/an5.202">AN 5.202</a>`}
              </dd>
              <dd>
                ${_`How to listen to the ~: <a class="ref" href="/an6.88">AN 6.88</a>`}
              </dd>
              <dd>
                ${_`As one of the ten Recollections: see <a href="#recollections">Recollections, ten</a>.`}
              </dd>
              <dt id="dhana">
                ${_`Dhana`}
              </dt>
              <dd class="description">
                ${_`<span class="translation">treasures</span>. See also <a href="#wealth">Wealth</a>.`}
              </dd>
              <dd>
                ${_`Buddha, Dhamma, and Saṅgha: <a class="ref" href="/kp6">Kp 6</a>`}
              </dd>
              <dd>
                ${_`Seven ~: <a class="ref" href="/an7.7">AN 7.7</a>`}
              </dd>
              <dt id="dhatu">
                ${_`Dhātu`}
              </dt>
              <dd class="description">
                ${_`<span class="translation">properties, elements</span>`}
              </dd>
              <dd>
                ${_`The Buddha’s explanation of the ~: <a class="ref" href="/mn140">MN 140</a>`}
              </dd>
              <dd>
                ${_`Why desire and passion connected with the ~ is worth abandoning: <a class="ref" href="/sn27.9">SN 27.9</a>`}
              </dd>
              <dt>
                ${_`Discernment`}
              </dt>
              <dd class="description">
                ${_`See <a href="#panna">Paññā</a>.`}
              </dd>
              <dt>
                ${_`Disenchantment`}
              </dt>
              <dd class="description">
                ${_`See <a href="#nibbida">Nibbidā</a>.`}
              </dd>
              <dt id="ditthi">
                ${_`Diṭṭhi`}
              </dt>
              <dd class="description">
                ${_`<span class="translation">views</span>. See also <a href="#questions">Questions</a>.`}
              </dd>
              <dd>
                ${_`As a yoke: <a class="ref" href="/an4.10">AN 4.10</a>`}
              </dd>
              <dd>
                ${_`As a flood: <a class="ref" href="/sn45.171">SN 45.171</a>`}
              </dd>
              <dd>
                ${_`Wisdom has nothing to do with holding to this or that viewpoint: <a class="ref" href="/an10.96">AN 10.96</a>`}
              </dd>
              <dd>
                ${_`What is wrong ~? <a class="ref" href="/mn117">MN 117</a>`}
              </dd>
              <dd>
                ${_`Distinguishing right ~ from wrong ~: <a class="ref" href="/an10.103">AN 10.103</a>, <a class="ref" href="/an10.104">AN 10.104</a>`}
              </dd>
              <dd>
                ${_`The many kinds of ~: <a class="ref" href="/dn1">DN 1</a>, <a class="ref" href="/mn63">MN 63</a>, <a class="ref" href="/sn41.3">SN 41.3</a>, <a class="ref" href="/an10.93">AN 10.93</a>, <a class="ref" href="/an10.95">AN 10.95</a>`}
              </dd>
              <dd>
                ${_`Speculative ~: <a class="ref" href="/dn1">DN 1</a>`}
              </dd>
              <dd>
                ${_`Even the view “I have no self” is wrong: <a class="ref" href="/mn22">MN 22</a>`}
              </dd>
              <dd>
                ${_`The thicket of wrong ~: <a class="ref" href="/mn72">MN 72</a>`}
              </dd>
              <dd>
                ${_`Attachment to ~ is the cause of disputes: <a class="ref" href="/snp4.8">Snp 4.8</a>`}
              </dd>
              <dt id="divine">
                ${_`Divine Messengers`}
              </dt>
              <dd class="description">
                ${_`See <a href="#aging">Aging</a>; <a href="#illness">Illness</a>; <a href="#death">Death</a>.`}
              </dd>
              <dt id="doubt">
                ${_`Doubt`}
              </dt>
              <dd class="description">
                ${_`<span class="translation">vicikicchā</span>. See also <a href="#nivarana">Nīvaraṇa</a> (hindrances); <a href="#saddha">Saddhā</a> (faith).`}
              </dd>
              <dd>
                ${_`As one of the fetters (<a href="#samyojana">Saṁyojana</a>): <a class="ref" href="/an10.13">AN 10.13</a>`}
              </dd>
              <dd>
                ${_`As one of the obsessions (<a href="#anusaya">Anusaya</a>): <a class="ref" href="/an7.11">AN 7.11</a>, <a class="ref" href="/an7.12">AN 7.12</a>`}
              </dd>
              <dd>
                ${_`How can one be freed of all ~? <a class="ref" href="/snp5.5">Snp 5.5</a>`}
              </dd>
              <dd>
                ${_`Development of <a href="#jhana">jhāna</a> as a means of overcoming ~: <a class="ref" href="/ud5.7">Ud 5.7</a>`}
              </dd>
              <dt id="downfall">
                ${_`Downfall`}
              </dt>
              <dd>
                ${_`Causes of ~: <a class="ref" href="/snp1.6">Snp 1.6</a>`}
              </dd>
              <dt>
                ${_`Drawbacks`}
              </dt>
              <dd class="description">
                ${_`See <a href="#adinava">Ādīnava</a>.`}
              </dd>
              <dt>
                ${_`Dread (moral)`}
              </dt>
              <dd class="description">
                ${_`See <a href="#ottappa">Ottappa</a>.`}
              </dd>
              <dt id="dreams">
                ${_`Dreams`}
              </dt>
              <dd>
                ${_`Five ~ that appeared to the Buddha: <a class="ref" href="/an5.196">AN 5.196</a>`}
              </dd>
              <dd>
                ${_`How to ensure good ~: <a class="ref" href="/an11.16">AN 11.16</a>`}
              </dd>
              <dd>
                ${_`Interpretation of ~ as a form of wrong livelihood for monks: <a class="ref" href="/dn2">DN 2</a>, <a class="ref" href="/dn11">DN 11</a>`}
              </dd>
              <dt>
                ${_`Drowsiness`}
              </dt>
              <dd class="description">
                ${_`See <a href="#laziness">Laziness</a>.`}
              </dd>
              <dt id="dukkha">
                ${_`Dukkha`}
              </dt>
              <dd class="description">
                ${_`<span class="translation">suffering</span>. See also <a href="#ps">Paṭicca-samuppāda</a> (dependent origination); <a href="#tilakkhana">Tilakkhaṇa</a> (three characteristics of conditioned phenomena).`}
              </dd>
              <dd>
                ${_`The Buddha teaches only ~ and its cessation: <a class="ref" href="/mn22">MN 22</a>`}
              </dd>
              <dd>
                ${_`Six important aspects of ~ to be understood: <a class="ref" href="/an6.63">AN 6.63</a>`}
              </dd>
              <dd>
                ${_`~ is inherent in everything the body and mind depend upon for nourishment: <a class="ref" href="/sn12.63">SN 12.63</a>`}
              </dd>
              <dd>
                ${_`As one of seven perceptions: <a class="ref" href="/an7.46">AN 7.46</a>`}
              </dd>
            </dl>
            <h2 id="e">
              ${_`E`}
            </h2>
            <dl>
              <dt>
                ${_`Ecology`}
              </dt>
              <dd class="description">
                ${_`See <a href="#nature">Nature</a>.`}
              </dd>
              <dt>
                ${_`Defilements`}
              </dt>
              <dd class="description">
                ${_`See <a href="#asava">Āsava</a>.`}
              </dd>
              <dt>
                ${_`Effort`}
              </dt>
              <dd class="description">
                ${_`See <a href="#viriya">Viriya</a>.`}
              </dd>
              <dt>
                ${_`Eightfold Path`}
              </dt>
              <dd class="description">
                ${_`See <a href="#eightfold">Noble Eightfold Path</a>.`}
              </dd>
              <dt id="emotion">
                ${_`Emotion`}
              </dt>
              <dd class="description">
                ${_`See also <a href="#pasada">Pasāda</a>; <a href="#psychology">Psychology</a>; <a href="#samvega">Saṁvega</a>; <a href="#vedana">Vedanā</a>.`}
              </dd>
              <dd>
                ${_`The source of ~: <a class="ref" href="/mn137">MN 137</a>`}
              </dd>
              <dt id="emptiness">
                ${_`Emptiness`}
              </dt>
              <dd class="description">
                ${_`<span class="translation">Suññatā</span>`}
              </dd>
              <dd>
                ${_`In what way is world empty? <a class="ref" href="/sn35.85">SN 35.85</a>`}
              </dd>
              <dd>
                ${_`Meditation practice that leads to the “entry into ~,” the doorway to liberation: <a class="ref" href="/mn121">MN 121</a>`}
              </dd>
              <dd>
                ${_`Practical aspects of developing a meditative dwelling in ~: <a class="ref" href="/mn122">MN 122</a>`}
              </dd>
              <dd>
                ${_`Conquering death by seeing the world as empty: <a class="ref" href="/snp5.15">Snp 5.15</a>`}
              </dd>
              <dd>
                ${_`Voidness of the five <a href="#khandha">khandha</a>: <a class="ref" href="/sn22.95">SN 22.95</a>`}
              </dd>
              <dt id="engaged">
                ${_`Engaged Buddhism`}
              </dt>
              <dd class="description">
                ${_`See <a href="#social">Social action</a>.`}
              </dd>
              <dt>
                ${_`Equanimity`}
              </dt>
              <dd class="description">
                ${_`See <a href="#upekkha">Upekkhā</a>.`}
              </dd>
              <dt>
                ${_`Ethics`}
              </dt>
              <dd class="description">
                ${_`See <a href="#sila">Sīla</a>.`}
              </dd>
            </dl>
            <h2 id="f">
              ${_`F`}
            </h2>
            <dl>
              <dt>
                ${_`Faculties, five mental`}
              </dt>
              <dd class="description">
                ${_`See <a href="#indriya">Indriya</a>.`}
              </dd>
              <dt>
                ${_`Faith`}
              </dt>
              <dd class="description">
                ${_`See <a href="#saddha">Saddhā</a>.`}
              </dd>
              <dt id="family">
                ${_`Family`}
              </dt>
              <dd class="description">
                ${_`See also <a href="#children">Children</a>; <a href="#lay">Lay Buddhist practice</a>; <a href="#parents">Parents</a>.`}
              </dd>
              <dd>
                ${_`How a ~ can preserve its wealth: <a class="ref" href="/an4.255">AN 4.255</a>`}
              </dd>
              <dd>
                ${_`Qualities that hold a ~ together: <a class="ref" href="/an4.32">AN 4.32</a>`}
              </dd>
              <dd>
                ${_`Causes of a ~’s downfall: <a class="ref" href="/sn42.9">SN 42.9</a>`}
              </dd>
              <dt id="fear">
                ${_`Fear`}
              </dt>
              <dd class="description">
                ${_`See also <a href="#death">Death</a>.`}
              </dd>
              <dd>
                ${_`In the wilderness, the Buddha comes face-to-face with his ~: <a class="ref" href="/mn4">MN 4</a>`}
              </dd>
              <dd>
                ${_`Ven. Adhimutta reveals his secret for overcoming ~: <a class="ref" href="/thag16">Thag 16</a>`}
              </dd>
              <dd>
                ${_`Four ways of overcoming ~ of death: <a class="ref" href="/an4.184">AN 4.184</a>`}
              </dd>
              <dd>
                ${_`Overcoming ~ by recollecting the Buddha, Dhamma, and Saṅgha: <a class="ref" href="/sn11.3">SN 11.3</a>`}
              </dd>
              <dd>
                ${_`Your ~ of birth, aging, and death should be greater than your ~ of a dangerous cliff: <a class="ref" href="/sn56.42">SN 56.42</a>`}
              </dd>
              <dt>
                ${_`Feeling`}
              </dt>
              <dd class="description">
                ${_`See <a href="#vedana">Vedanā</a>.`}
              </dd>
              <dt>
                ${_`Fermentations`}
              </dt>
              <dd class="description">
                ${_`See <a href="#asava">Āsava</a>.`}
              </dd>
              <dt>
                ${_`Fire imagery`}
              </dt>
              <dd class="description">
                ${_`See also “<a href="http://www.accesstoinsight.org/index-similes.html#fire">Fire</a>” in the Index of Similes.`}
              </dd>
              <dd>
                ${_`Used to describe the nature of clinging: <a class="ref" href="/sn12.52">SN 12.52</a>`}
              </dd>
              <dd>
                ${_`The Fire Sermon: <a class="ref" href="/sn35.28">SN 35.28</a>`}
              </dd>
              <dd>
                ${_`Fires of passion, aversion, and delusion: <a class="ref" href="/iti93">Iti 93</a>`}
              </dd>
              <dd>
                ${_`Fire as an illustration of the destiny of a fully Awakened being: <a class="ref" href="/mn72">MN 72</a>`}
              </dd>
              <dt id="fool">
                ${_`Fool`}
              </dt>
              <dd class="description">
                ${_`See <a href="#wiseperson">Wise person</a>.`}
              </dd>
              <dt id="food">
                ${_`Food`}
              </dt>
              <dd class="description">
                ${_`<span class="translation">physical and otherwise</span>. See also <a href="#nutriment">Nutriment (āhāra)</a>.`}
              </dd>
              <dd>
                ${_`Mindfulness as a preventative against overeating: <a class="ref" href="/sn3.13">SN 3.13</a>`}
              </dd>
              <dt id="forest">
                ${_`Forest traditions`}
              </dt>
              <dd class="description">
                ${_`See also <a href="#wilderness">Wilderness</a>.`}
              </dd>
              <dt>
                ${_`Forgiveness`}
              </dt>
              <dd class="description">
                ${_`See <a href="#reconciliation">Reconciliation</a>.`}
              </dd>
              <dt id="fourtruths">
                ${_`The Four Noble Truths`}
              </dt>
              <dd class="description">
                ${_`<span class="translation">cattāri ariyasaccāni</span>. See also <a href="#gradual">Gradual instruction</a>.`}
              </dd>
              <dd>
                ${_`The Buddha’s first teaching on ~: <a class="ref" href="/sn56.11">SN 56.11</a>`}
              </dd>
              <dd>
                ${_`Understanding of ~ as a basis for Right View: <a class="ref" href="/mn9">MN 9</a>`}
              </dd>
              <dd>
                ${_`Direct knowledge of ~ is a hallmark of a true contemplative: <a class="ref" href="/iti103">Iti 103</a>`}
              </dd>
              <dd>
                ${_`As a prequisite for awakening: <a class="ref" href="/sn56.44">SN 56.44</a>`}
              </dd>
              <dd>
                ${_`Relationship to the <a href="#khandha">Khandha</a>: <a class="ref" href="/mn28">MN 28</a>`}
              </dd>
              <dt>
                ${_`Friendship (admirable)`}
              </dt>
              <dd class="description">
                ${_`See <a href="#k">Kalyanamittata</a>.`}
              </dd>
            </dl>
            <h2 id="g">
              ${_`G`}
            </h2>
            <dl>
              <dt>
                ${_`Generosity`}
              </dt>
              <dd class="description">
                ${_`See <a href="#dana">Dāna</a>.`}
              </dd>
              <dt>
                ${_`Giving`}
              </dt>
              <dd class="description">
                ${_`See <a href="#dana">Dāna</a>.`}
              </dd>
              <dt>
                ${_`Goal of Buddhist practice`}
              </dt>
              <dd class="description">
                ${_`See <a href="#nibbana">Nibbāna</a>.`}
              </dd>
              <dt id="god">
                ${_`God`}
              </dt>
              <dd class="description">
                ${_`<span class="translation">supreme being, Creator, etc</span>. See also <a href="#comparative">Comparative Religions</a>.`}
              </dd>
              <dd>
                ${_`Belief in ~ (instead of in the law of <a href="#kamma">Kamma</a>) is a form of wrong view: <a class="ref" href="/an3.61">AN 3.61</a>`}
              </dd>
              <dd>
                ${_`Great Brahmā, the deva who mistakenly believes himself to be the supreme being: <a class="ref" href="/dn11">DN 11</a>`}
              </dd>
              <dt>
                ${_`Goodwill`}
              </dt>
              <dd class="description">
                ${_`See <a href="#metta">Mettā</a>.`}
              </dd>
              <dt>
                ${_`Goodness`}
              </dt>
              <dd class="description">
                ${_`See <a href="#punna">Puñña</a> (merit).`}
              </dd>
              <dt id="gradual">
                ${_`Gradual instruction`}
              </dt>
              <dd class="description">
                ${_`<span class="translation">anupubbi-kathā</span>`}
              </dd>
              <dd>
                ${_`Mentioned in: <a class="ref" href="/ud5.3">Ud 5.3</a>`}
              </dd>
              <dd>
                ${_`See each of its constituent topics: <a href="#dana">Dāna</a> (generosity), <a href="#sila">Sīla</a> (ethics), <a href="#sagga">Sagga</a> (heaven), <a href="#adinava">Ādīnava</a> (drawbacks), <a href="#nekkhamma">Nekkhamma</a> (renunciation), <a href="#fourtruths">Four Noble Truths</a>.`}
              </dd>
              <dt id="gradual_training">
                ${_`Gradual training`}
              </dt>
              <dd class="description">
                ${_`<span class="translation">anupubba-sikkhā</span>`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn2">DN 2</a>, <a class="ref" href="/mn107.">MN 107.</a>`}
              </dd>
              <dt id="gratitude">
                ${_`Gratitude`}
              </dt>
              <dd class="description">
                ${_`See also <a href="#integrity">Integrity</a>; <a href="#respect">Respect</a>.`}
              </dd>
              <dd>
                ${_`As one of the greatest protections/blessings: <a class="ref" href="/snp2.4">Snp 2.4</a>`}
              </dd>
              <dd>
                ${_`As a requisite for meaningful progress on the Path: <a class="ref" href="/an5.254">AN 5.254</a>`}
              </dd>
              <dd>
                ${_`A grateful person is rare: <a class="ref" href="/an2.119">AN 2.119</a>`}
              </dd>
              <dd>
                ${_`The dangers of enjoying a gift without showing the proper ~: <a class="ref" href="/an7.68">AN 7.68</a>`}
              </dd>
              <dd>
                ${_`How to repay the debt we owe to our parents: <a class="ref" href="/an2.32">AN 2.32</a>`}
              </dd>
              <dd>
                ${_`The anguish an aging parent feels when his children show no ~: <a class="ref" href="/sn7.14">SN 7.14</a>`}
              </dd>
              <dt id="grief">
                ${_`Grief`}
              </dt>
              <dd class="description">
                ${_`See also <a href="#death">Death</a>.`}
              </dd>
              <dd>
                ${_`How to move beyond obsessive grieving: <a class="ref" href="/an5.49">AN 5.49</a>`}
              </dd>
              <dd>
                ${_`Do arahants grieve? <a class="ref" href="/sn21.2">SN 21.2</a>`}
              </dd>
              <dd>
                ${_`Death and loss are inevitable, but is ~? <a class="ref" href="/snp3.8">Snp 3.8</a>`}
              </dd>
              <dt>
                ${_`Guilt`}
              </dt>
              <dd class="description">
                ${_`See <a href="#hiri">Hiri</a> (moral conscience).`}
              </dd>
            </dl>
            <h2 id="h">
              ${_`H`}
            </h2>
            <dl>
              <dt>
                ${_`Habitual patterns of thought`}
              </dt>
              <dd>
                ${_`Stopping of ~: <a class="ref" href="/mn19">MN 19</a>`}
              </dd>
              <dt id="happiness">
                ${_`Happiness`}
              </dt>
              <dd class="description">
                ${_`See also <a href="#vedana">Vedanā</a> (feeling).`}
              </dd>
              <dd>
                ${_`True ~ lies beyond the realm of sensual pleasure: <a class="ref" href="/mn75">MN 75</a>`}
              </dd>
              <dd>
                ${_`How Nibbāna is understood as happy and pleasant: <a class="ref" href="/an9.34">AN 9.34</a>`}
              </dd>
              <dd>
                ${_`Sometimes confused with suffering: <a class="ref" href="/snp3.12">Snp 3.12</a>`}
              </dd>
              <dd>
                ${_`Seeing even pleasurable feelings as stressful: <a class="ref" href="/sn36.5">SN 36.5</a>, <a class="ref" href="/iti53">Iti 53</a>`}
              </dd>
              <dd>
                ${_`There are many kinds and degrees of ~; which one do you want? <a class="ref" href="/dn2">DN 2</a>, <a class="ref" href="/mn59">MN 59</a>, <a class="ref" href="/sn36.19">SN 36.19</a>, <a class="ref" href="/sn36.31">SN 36.31</a>, <a class="ref" href="/iti73">Iti 73</a>`}
              </dd>
              <dt>
                ${_`Harmlessness`}
              </dt>
              <dd class="description">
                ${_`See <a href="#ahimsa">Non-harming</a>.`}
              </dd>
              <dt>
                ${_`Hatred`}
              </dt>
              <dd class="description">
                ${_`See <a href="#ill">Ill-will</a> (<i>vyāpāda</i>).`}
              </dd>
              <dt>
                ${_`Headache`}
              </dt>
              <dd>
                ${_`Ven. Sāriputta’s “slight” ~ <a class="ref" href="/ud4.4">Ud 4.4</a>`}
              </dd>
              <dt>
                ${_`Heaven realms`}
              </dt>
              <dd class="description">
                ${_`See <a href="#sagga">Sagga</a>.`}
              </dd>
              <dt>
                ${_`Heedfulness`}
              </dt>
              <dd class="description">
                ${_`See <a href="#appamada">Appamāda</a>.`}
              </dd>
              <dt id="hell">
                ${_`Hell`}
              </dt>
              <dd class="description">
                ${_`<span class="translation">realm</span>. See also <a href="#planes">Planes of Existence, Thirty-one</a>; <a href="#sagga">Sagga</a> (heaven); <a href="#kamma">Kamma</a>.`}
              </dd>
              <dd>
                ${_`As the destination for one with no discernment: <a class="ref" href="/dhp137">Dhp 137</a>`}
              </dd>
              <dd>
                ${_`“Hell” (Dhammapada chapter 12)`}
              </dd>
              <dd>
                ${_`Five grave deeds that lead to rebirth in ~: <a class="ref" href="/an5.129">AN 5.129</a>`}
              </dd>
              <dd>
                ${_`Causes of rebirth in ~: <a class="ref" href="/iti70">Iti 70</a>`}
              </dd>
              <dt>
                ${_`Hindrances`}
              </dt>
              <dd class="description">
                ${_`See <a href="#nivarana">Nīvaraṇa</a>.`}
              </dd>
              <dt id="hiri">
                ${_`Hiri`}
              </dt>
              <dd class="description">
                ${_`<span class="translation">conscience, moral shame</span>. See also <a href="#ottappa">Ottappa</a> (moral dread).`}
              </dd>
              <dd>
                ${_`Although your past bad deeds cannot be undone, you can overcome your guilt: <a class="ref" href="/sn42.8">SN 42.8</a>`}
              </dd>
              <dd>
                ${_`As a quality that distinguishes the true contemplative: <a class="ref" href="/mn39">MN 39</a>`}
              </dd>
              <dd>
                ${_`As a basis for acquiring discernment: <a class="ref" href="/an8.2">AN 8.2</a>`}
              </dd>
              <dd>
                ${_`As a quality that safeguards the world: <a class="ref" href="/iti42">Iti 42</a>`}
              </dd>
              <dd>
                ${_`As a rare and fine quality: <a class="ref" href="/sn1.18">SN 1.18</a>`}
              </dd>
              <dd>
                ${_`As a treasure: <a class="ref" href="/an7.6">AN 7.6</a>`}
              </dd>
              <dd>
                ${_`As a guardian: <a class="ref" href="/an2.9">AN 2.9</a>`}
              </dd>
              <dd>
                ${_`Associated with skillful qualities: <a class="ref" href="/iti40">Iti 40</a>`}
              </dd>
              <dt>
                ${_`Holidays`}
              </dt>
              <dd class="description">
                ${_`See <a href="#uposatha">Uposatha days</a>.`}
              </dd>
              <dt id="householder">
                ${_`Householders`}
              </dt>
              <dd class="description">
                ${_`See also <a href="#family">Family</a>; <a href="#lay">Lay Buddhist practice</a>; <a href="#marriage">Marriage</a>; <a href="#money">Money</a>; <a href="#precepts">Precepts</a>; <a href="#sensuality">Sensuality</a>.`}
              </dd>
              <dd>
                ${_`Showing the proper respect to one’s parents: <a class="ref" href="/iti106">Iti 106</a>`}
              </dd>
              <dd>
                ${_`~ are dependent on the monastic community (Saṅgha): <a class="ref" href="/iti107">Iti 107</a>`}
              </dd>
              <dd>
                ${_`~ should put aside all worries as death nears: <a class="ref" href="/an6.16">AN 6.16</a>`}
              </dd>
              <dd>
                ${_`Four kinds of bliss available to ~: <a class="ref" href="/an4.62">AN 4.62</a>`}
              </dd>
              <dd>
                ${_`Citta the householder’s final teaching on generosity: <a class="ref" href="/sn41.10">SN 41.10</a>`}
              </dd>
              <dd>
                ${_`Household life is crowded and dusty: <a class="ref" href="/snp3.1">Snp 3.1</a>, <a class="ref" href="/ud5.6">Ud 5.6</a>`}
              </dd>
              <dt id="humility">
                ${_`Humility`}
              </dt>
              <dd class="description">
                ${_`See also <a href="#integrity">Integrity</a>.`}
              </dd>
              <dd>
                ${_`As one of the greatest protections/blessings: <a class="ref" href="/snp2.4">Snp 2.4</a>`}
              </dd>
            </dl>
            <h2 id="i">
              ${_`I`}
            </h2>
            <dl>
              <dt id="iddhipada">
                ${_`Iddhipada`}
              </dt>
              <dd class="description">
                ${_`<span class="translation">the four bases of power</span>. See also <a href="#bodhipakkhiya-dhamma">Bodhipakkhiya-dhamma</a>.`}
              </dd>
              <dd>
                ${_`Benefits derived from: <a class="ref" href="/sn51.20">SN 51.20</a>`}
              </dd>
              <dd>
                ${_`The Buddha declines Māra’s invitation to use the ~ for worldly aims: <a class="ref" href="/sn4.20">SN 4.20</a>`}
              </dd>
              <dt>
                ${_`Ignorance`}
              </dt>
              <dd class="description">
                ${_`See <a href="#avijja">Avijjā</a>.`}
              </dd>
              <dt id="ill">
                ${_`Ill-will`}
              </dt>
              <dd class="description">
                ${_`<span class="translation">vyāpāda</span>. See also <a href="#anger">Anger</a>; <a href="#conflict">Conflict</a>; <a href="#kilesa">Kilesa</a> (defilements); <a href="#metta">Mettā</a> (goodwill); <a href="#nivarana">Nīvaraṇa</a> (hindrances).`}
              </dd>
              <dd>
                ${_`Ten reflections to help overcome hatred: <a class="ref" href="/an10.80">AN 10.80</a>`}
              </dd>
              <dd>
                ${_`~ can never be conquered with more ~: <a class="ref" href="/dhp3">Dhp 3</a>`}
              </dd>
              <dd>
                ${_`The sources of conflict and hostility: <a class="ref" href="/dn21">DN 21</a>, <a class="ref" href="/mn18">MN 18</a>`}
              </dd>
              <dt id="illness">
                ${_`Illness`}
              </dt>
              <dd class="description">
                ${_`See also <a href="#aging">Aging</a>; <a href="#death">Death</a>; <a href="#divine">Divine messengers</a>.`}
              </dd>
              <dd>
                ${_`The Buddha attends to a monk with dysentery: <a class="ref" href="/kd8#26.1">Kd 8.26.1–8</a>`}
              </dd>
              <dd>
                ${_`The Buddha’s advice to Mahā Kassapa during a painful illness: <a class="ref" href="/sn46.14">SN 46.14</a>`}
              </dd>
              <dd>
                ${_`One need not be sick in mind just because one is sick in body: <a class="ref" href="/sn22.1">SN 22.1</a>`}
              </dd>
              <dd>
                ${_`How even a sick person can realize Awakening: <a class="ref" href="/an5.121">AN 5.121</a>`}
              </dd>
              <dd>
                ${_`Ten perceptions that can heal body and mind: <a class="ref" href="/an10.60">AN 10.60</a>`}
              </dd>
              <dd>
                ${_`Even the best medicines for the body don’t always work; here’s one for the mind that does: <a class="ref" href="/an10.108">AN 10.108</a>`}
              </dd>
              <dd>
                ${_`Five qualities that make a sick person easy (or hard) to tend to: <a class="ref" href="/kd8#26.1">Kd 8.26.1–8</a>`}
              </dd>
              <dd>
                ${_`Five qualities that make a good (or bad) nurse: <a class="ref" href="/kd8#26.1">Kd 8.26.1–8</a>`}
              </dd>
              <dt>
                ${_`Impermanence`}
              </dt>
              <dd class="description">
                ${_`See <a href="#anicca">Anicca</a>.`}
              </dd>
              <dt id="indriya">
                ${_`Indriya`}
              </dt>
              <dd class="description">
                ${_`<span class="translation">five mental faculties</span>. See also <a href="#bodhipakkhiya-dhamma">Bodhipakkhiya-dhamma</a>. Look under:`}
              </dd>
              <dd>
                ${_`<a href="#saddha">Saddhā</a> (conviction, faith)`}
              </dd>
              <dd>
                ${_`<a href="#viriya">Viriya</a> (persistence, effort)`}
              </dd>
              <dd>
                ${_`<a href="#sati">Sati</a> (mindfulness)`}
              </dd>
              <dd>
                ${_`<a href="#samadhi">Samādhi</a> (concentration)`}
              </dd>
              <dd>
                ${_`<a href="#panna">Paññā</a> (discernment, wisdom)`}
              </dd>
              <dd>
                ${_`A summary of the five faculties: <a class="ref" href="/sn48.10">SN 48.10</a>`}
              </dd>
              <dd>
                ${_`See the suttas in the Indriya-saṁyutta of the Saṁyutta Nikāya`}
              </dd>
              <dt id="insight">
                ${_`Insight`}
              </dt>
              <dd class="description">
                ${_`See <a href="#vipassana">Vipassanā</a>.`}
              </dd>
              <dt id="integrity">
                ${_`Integrity`}
              </dt>
              <dd class="description">
                ${_`See also <a href="#gratitude">Gratitude</a>; <a href="#humility">Humility</a>; <a href="#respect">Respect</a>; <a href="#stream">Stream-entry (sotāpatti)</a>; <a href="#wiseperson">Wise person</a>.`}
              </dd>
              <dd>
                ${_`What is a person of ~: <a class="ref" href="/mn110">MN 110</a>, <a class="ref" href="/mn113">MN 113</a>, <a class="ref" href="/an2.31">AN 2.31</a>, <a class="ref" href="/an4.73">AN 4.73</a>`}
              </dd>
              <dd>
                ${_`How a person of ~ gives gifts: <a class="ref" href="/an5.148">AN 5.148</a>`}
              </dd>
              <dt>
                ${_`Intention, intentional action`}
              </dt>
              <dd class="description">
                ${_`See <a href="#kamma">Kamma</a>.`}
              </dd>
            </dl>
            <h2 id="j">
              ${_`J`}
            </h2>
            <dl>
              <dt>
                ${_`Jātaka tales`}
              </dt>
              <dd class="description">
                ${_`Stories from the Buddha’s previous lives.`}
              </dd>
              <dd>
                ${_`The chariot-maker: <a class="ref" href="/an3.15">AN 3.15</a>`}
              </dd>
              <dd>
                ${_`The story of prince Dīghāvu: <a class="ref" href="/kd10.2.3">Kd 10.2.3–20</a>`}
              </dd>
              <dt id="jati">
                ${_`Jāti`}
              </dt>
              <dd class="description">
                ${_`<span class="translation">birth</span>. See also <a href="#aging">Aging</a>; <a href="#death">Death</a>; <a href="#illness">Illness</a>; <a href="#rebirth">Rebirth</a>.`}
              </dd>
              <dd>
                ${_`Understanding of ~ as a basis for Right View: <a class="ref" href="/mn9">MN 9</a>`}
              </dd>
              <dd>
                ${_`Fear of ~ should be even greater than fear of a dangerous cliff: <a class="ref" href="/sn56.42">SN 56.42</a>`}
              </dd>
              <dd>
                ${_`The darkness of ~ is even greater than that of intergalactic space: <a class="ref" href="/sn56.46">SN 56.46</a>`}
              </dd>
              <dt id="jhana">
                ${_`Jhāna`}
              </dt>
              <dd class="description">
                ${_`<span class="translation">meditative absorption</span>. See also <a href="#samadhi">Immersion</a>; <a href="#nivarana">Nīvaraṇa</a> (Hindrances); <a href="#silence">Noble silence</a>; <a href="#samatha">Samatha</a> (tranquillity, calm).`}
              </dd>
              <dd>
                ${_`And mindfulness: <a class="ref" href="/sn2.7">SN 2.7</a>`}
              </dd>
              <dd>
                ${_`How ~ leads the meditator out from the confines of the mind: <a class="ref" href="/an9.42">AN 9.42</a>`}
              </dd>
              <dd>
                ${_`Role of ~ in the development of discernment: <a class="ref" href="/an9.44">AN 9.44</a>`}
              </dd>
              <dd>
                ${_`Goes hand-in-hand with discernment (paññā): <a class="ref" href="/dhp372">Dhp 372</a>`}
              </dd>
              <dd>
                ${_`Goes hand-in-hand with insight (vipassanā): <a class="ref" href="/an4.170">AN 4.170</a>`}
              </dd>
              <dd>
                ${_`How insight can be developed during or immediately after ~: <a class="ref" href="/mn111">MN 111</a>`}
              </dd>
              <dd>
                ${_`Paves the way to Nibbāna: <a class="ref" href="/dhp372">Dhp 372</a>`}
              </dd>
              <dd>
                ${_`Envied by the devas: <a class="ref" href="/dhp181">Dhp 181</a>`}
              </dd>
              <dd>
                ${_`Practiced by enlightened ones: <a class="ref" href="/dhp23">Dhp 23</a>`}
              </dd>
              <dd>
                ${_`A mark of heedfulness: <a class="ref" href="/dhp27">Dhp 27</a>, <a class="ref" href="/dhp371">Dhp 371</a>`}
              </dd>
              <dd>
                ${_`Frees one from Mara’s grasp: <a class="ref" href="/dhp276">Dhp 276</a>`}
              </dd>
              <dd>
                ${_`A hallmark of a true brahman: <a class="ref" href="/dhp386">Dhp 386</a>, <a class="ref" href="/dhp395">Dhp 395</a>, <a class="ref" href="/dhp414">Dhp 414</a>`}
              </dd>
              <dd>
                ${_`One day with ~ is better than a hundred years without: <a class="ref" href="/dhp110">Dhp 110</a>`}
              </dd>
              <dd>
                ${_`How does the Buddha practice ~ in the forest? <a class="ref" href="/sn7.18">SN 7.18</a><br/>`}
              </dd>
              <dd>
                ${_`Formless attainments leading to Nibbāna: <a class="ref" href="/mn52">MN 52</a>, <a class="ref" href="/mn106">MN 106</a>, <a class="ref" href="/an11.17">AN 11.17</a>`}
              </dd>
              <dd>
                ${_`Possible courses of rebirth from practicing ~: <a class="ref" href="/an4.123">AN 4.123</a>, <a class="ref" href="/an4.124">AN 4.124</a>`}
              </dd>
              <dt id="joy">
                ${_`Joy`}
              </dt>
              <dd class="description">
                ${_`See also <a href="#piti">Pīti (rapture; bliss)</a>.`}
              </dd>
              <dt>
                ${_`Joy, appreciative/sympathetic`}
              </dt>
              <dd class="description">
                ${_`See <a href="#mudita">Muditā</a>.`}
              </dd>
            </dl>
            <h2 id="k">
              ${_`K`}
            </h2>
            <dl>
              <dt id="kalyanamittata">
                ${_`Kalyanamittatā`}
              </dt>
              <dd class="description">
                ${_`<span class="translation">good friendship</span> See also <a href="#teaching">Teaching the Dhamma</a>.`}
              </dd>
              <dd>
                ${_`As a prerequisite for the development of the wings to Awakening: <a class="ref" href="/an9.1">AN 9.1</a>`}
              </dd>
              <dd>
                ${_`What is a true friend? <a class="ref" href="/an7.35">AN 7.35</a>, <a class="ref" href="/snp2.3">Snp 2.3</a>`}
              </dd>
              <dd>
                ${_`Benefits of ~: <a class="ref" href="/an9.1">AN 9.1</a>`}
              </dd>
              <dd>
                ${_`Having ~ is conducive to the ending of dukkha: <a class="ref" href="/dhp376">Dhp 376</a>`}
              </dd>
              <dd>
                ${_`As a crucial support for Dhamma practice: <a class="ref" href="/iti17">Iti 17</a>`}
              </dd>
              <dd>
                ${_`~ is the whole of the holy life: <a class="ref" href="/sn45.2">SN 45.2</a>`}
              </dd>
              <dd>
                ${_`Avoiding lazy people: <a class="ref" href="/iti78">Iti 78</a>`}
              </dd>
              <dd>
                ${_`Choose your friends carefully, for you become like them: <a class="ref" href="/iti76">Iti 76</a>`}
              </dd>
              <dd>
                ${_`What is good friendship for householders? <a class="ref" href="/an8.54">AN 8.54</a>`}
              </dd>
              <dt id="kamma">
                ${_`Kamma`}
              </dt>
              <dd class="description">
                ${_`<span class="translation">karma; intentional action</span>. See also <a href="#deva">Devas</a>; <a href="#hell">Hell</a>; <a href="#planes">Planes of Existence, Thirty-one</a>; <a href="#rebirth">Rebirth</a>; <a href="#sagga">Sagga</a> (heaven).`}
              </dd>
              <dd>
                ${_`The laws of ~ and rebirth are as inviolable as the law of gravity: <a class="ref" href="/sn42.6">SN 42.6</a>`}
              </dd>
              <dd>
                ${_`As one of the five subjects for frequent recollection: <a class="ref" href="/an5.57">AN 5.57</a>`}
              </dd>
              <dd>
                ${_`Reflect on your actions before, during, and after: <a class="ref" href="/mn61">MN 61</a>`}
              </dd>
              <dd>
                ${_`Six important aspects of ~ to be understood: <a class="ref" href="/an6.63">AN 6.63</a>`}
              </dd>
              <dd>
                ${_`Actions of body, speech, and mind determine one’s future course: <a class="ref" href="/mn41">MN 41</a>`}
              </dd>
              <dd>
                ${_`How to ease the inevitable bad results of one’s past bad deeds: <a class="ref" href="/sn42.8">SN 42.8</a>`}
              </dd>
              <dd>
                ${_`The rewards of skillful ~: <a class="ref" href="/an2.18">AN 2.18</a>, <a class="ref" href="/an8.40">AN 8.40</a>`}
              </dd>
              <dd>
                ${_`The results of unskillful ~: <a class="ref" href="/an2.18">AN 2.18</a>, <a class="ref" href="/an8.40">AN 8.40</a>`}
              </dd>
              <dd>
                ${_`The ten courses of skillful ~: <a class="ref" href="/an10.176">AN 10.176</a>`}
              </dd>
              <dd>
                ${_`The ten courses of unskillful ~: <a class="ref" href="/an10.176">AN 10.176</a>`}
              </dd>
              <dd>
                ${_`The difference between “old” and “new” ~: <a class="ref" href="/sn35.145">SN 35.145</a>`}
              </dd>
              <dd>
                ${_`Present happiness depends on both past and present ~: <a class="ref" href="/mn101">MN 101</a>`}
              </dd>
              <dd>
                ${_`Past ~ alone cannot account for present experience: <a class="ref" href="/sn36.21">SN 36.21</a>`}
              </dd>
              <dd>
                ${_`Past unskillful ~ can’t be “burned away” through ascetic practice: <a class="ref" href="/mn101">MN 101</a>`}
              </dd>
              <dd>
                ${_`The ~ that leads to the ending of ~: <a class="ref" href="/an4.235">AN 4.235</a>`}
              </dd>
              <dd>
                ${_`When I perform an action, am I the same person when I experience its results, or am I different? <a class="ref" href="/sn12.46">SN 12.46</a>`}
              </dd>
              <dd>
                ${_`Why do the results of bad deeds vary from one person to another? <a class="ref" href="/an3.99">AN 3.99</a>`}
              </dd>
              <dd>
                ${_`The influence of present and past ~ on the development of skillful qualities: <a class="ref" href="/an6.86">AN 6.86</a>`}
              </dd>
              <dd>
                ${_`Five bad actions that you should never do: <a class="ref" href="/an5.129">AN 5.129</a> (also <a class="ref" href="/an5.87">AN 5.87</a>)`}
              </dd>
              <dd>
                ${_`Trying to figure out the results of ~ is sure to drive you crazy: <a class="ref" href="/an4.77">AN 4.77</a>`}
              </dd>
              <dd>
                ${_`Inner goodness is measured by the goodness of one’s actions: <a class="ref" href="/an4.85">AN 4.85</a>`}
              </dd>
              <dd>
                ${_`Act like a dog, and that’s what you’ll become: <a class="ref" href="/mn57">MN 57</a>`}
              </dd>
              <dd>
                ${_`How ~ accounts for the fortune and misfortune of beings: <a class="ref" href="/mn135">MN 135</a>`}
              </dd>
              <dd>
                ${_`A more detailed explanation of ~: <a class="ref" href="/mn136">MN 136</a>`}
              </dd>
              <dt id="karuna">
                ${_`Karuṇā`}
              </dt>
              <dd class="description">
                ${_`<span class="translation">compassion</span>. See also <a href="#brahmavihara">Brahmavihāra</a>.`}
              </dd>
              <dd>
                ${_`As a factor leading to liberation: <a class="ref" href="/an6.13">AN 6.13</a>`}
              </dd>
              <dd>
                ${_`Systematic practice of ~: <a class="ref" href="/sn42.8">SN 42.8</a>`}
              </dd>
              <dd>
                ${_`Practicing ~ as a way to deal with annoying people: <a class="ref" href="/an5.161">AN 5.161</a>`}
              </dd>
              <dt id="kayagatasati">
                ${_`Kāyagatāsati`}
              </dt>
              <dd class="description">
                ${_`<span class="translation">mindfulness of the body</span> See also <a href="#satipatthana">Satipaṭṭhāna</a> (mindfulness meditation).`}
              </dd>
              <dd>
                ${_`The Buddha’s principal teaching on ~: <a class="ref" href="/mn119">MN 119</a>`}
              </dd>
              <dt id="khandha">
                ${_`Khandha`}
              </dt>
              <dd class="description">
                ${_`<span class="translation">the five grasping aggregates</span>. See also <a href="#body">Body</a>; <a href="#upadana">Upādāna</a> (clinging); <a href="#vipassana">Vipassanā</a> (insight).`}
              </dd>
              <dd>
                ${_`See the suttas in the Khandhavagga of the Saṁyutta Nikāya.`}
              </dd>
              <dd>
                ${_`How we define ourselves in terms of the ~: <a class="ref" href="/sn22.36">SN 22.36</a>`}
              </dd>
              <dd>
                ${_`A summary of the ~: <a class="ref" href="/sn22.48">SN 22.48</a>`}
              </dd>
              <dd>
                ${_`Identification with the ~ as the cause of self-view: <a class="ref" href="/sn22.1">SN 22.1</a>`}
              </dd>
              <dd>
                ${_`Identifying the five ~ as “self” is the cause of affliction: <a class="ref" href="/sn22.1">SN 22.1</a>`}
              </dd>
              <dd>
                ${_`Voidness of the ~: <a class="ref" href="/sn22.95">SN 22.95</a>`}
              </dd>
              <dd>
                ${_`Why desire and passion connected with the ~ is worth abandoning: <a class="ref" href="/sn27.10">SN 27.10</a>`}
              </dd>
              <dd>
                ${_`See each of its constituents:\n                `}
                <ul>
                  <li>
                    ${_`Rūpa (form, physical phenomena)`}
                  </li>
                  <li>
                    ${_`<a href="#vedana">Vedanā</a> (feeling)`}
                  </li>
                  <li>
                    ${_`<a href="#sanna">Saññā</a> (perception)`}
                  </li>
                  <li>
                    ${_`<a href="#sankhara">Saṅkhāra</a> (choice, intentions, conditions)`}
                  </li>
                  <li>
                    ${_`<a href="#vinnana">Viññāṇa</a> (consciousness)`}
                  </li>
                </ul>
              </dd>
              <dt id="khanti">
                ${_`Khanti`}
              </dt>
              <dd class="description">
                ${_`<span class="translation">patience, forbearance</span>. See also <a href="#anger">Anger</a>; <a href="#parami">Pāramīs</a>.`}
              </dd>
              <dd>
                ${_`As one of the greatest protections/blessings: <a class="ref" href="/snp2.4">Snp 2.4</a>`}
              </dd>
              <dd>
                ${_`Heals the angry person: <a class="ref" href="/sn11.4">SN 11.4</a>`}
              </dd>
              <dd>
                ${_`How to develop ~: <a class="ref" href="/mn21">MN 21</a>`}
              </dd>
              <dd>
                ${_`Cultivating ~ while being beaten and stabbed (Ven. Punna’s view): <a class="ref" href="/sn35.88">SN 35.88</a>`}
              </dd>
              <dd>
                ${_`A heated debate between two deities on the merits of ~: <a class="ref" href="/sn11.5">SN 11.5</a>`}
              </dd>
              <dd>
                ${_`The best response to the insults of others (a story): <a class="ref" href="/an6.54">AN 6.54</a>`}
              </dd>
              <dt id="kilesa">
                ${_`Kilesa`}
              </dt>
              <dd class="description">
                ${_`<span class="translation">defilements, corruptions</span>—passion (<i>lobha</i>), aversion (<i>dosa</i>), and delusion (<i>moha</i>)—in their various forms. See also <a href="#anger">Anger</a>; <a href="#asava">Āsava</a>; <a href="#avijja">Avijjā</a> (ignorance); <a href="#nivarana">Nīvaraṇa</a> (hindrances).`}
              </dd>
              <dd>
                ${_`As a source of harm and suffering in the world: <a class="ref" href="/sn3.23">SN 3.23</a>`}
              </dd>
              <dd>
                ${_`As putrefaction: <a class="ref" href="/an3.126">AN 3.126</a>`}
              </dd>
              <dd>
                ${_`As stains/enemies/murderers/etc.: <a class="ref" href="/iti88">Iti 88</a>`}
              </dd>
              <dd>
                ${_`Abandonment of ~ as a guarantee of non-return: <a class="ref" href="/iti1">Iti 1–8</a>`}
              </dd>
              <dd>
                ${_`~ form the root of unskillful action: <a class="ref" href="/iti50">Iti 50</a>`}
              </dd>
              <dd>
                ${_`~ burn like fire: <a class="ref" href="/iti93">Iti 93</a>`}
              </dd>
              <dd>
                ${_`~ are like dirty stains on an otherwise clean cloth: <a class="ref" href="/mn7">MN 7</a>`}
              </dd>
              <dt id="killing">
                ${_`Killing`}
              </dt>
              <dd class="description">
                ${_`See also <a href="#conflict">Conflict</a>, <a href="#precepts">Precepts</a>, <a href="#war">War</a>.`}
              </dd>
              <dd>
                ${_`The one and only thing whose ~ the Buddha approved: <a class="ref" href="/sn1.71">SN 1.71</a>`}
              </dd>
              <dt id="kusala">
                ${_`Kusala`}
              </dt>
              <dd class="description">
                ${_`<span class="translation">skillfulness, wholesomeness</span>. See also <a href="#manners">Manners</a>; <a href="#sila">Sīla</a> (virtue).`}
              </dd>
              <dd>
                ${_`Understanding ~ and its opposite as the basis for Right View: <a class="ref" href="/mn9">MN 9</a>`}
              </dd>
            </dl>
            <h2 id="l">
              ${_`L`}
            </h2>
            <dl>
              <dt id="lay">
                ${_`Lay Buddhist practice`}
              </dt>
              <dd class="description">
                ${_`See also <a href="#family">Family</a>; <a href="#householder">Householders</a>; <a href="#marriage">Marriage</a>; <a href="#parents">Parents</a>; <a href="#precepts">Precepts</a>.`}
              </dd>
              <dd>
                ${_`The definition of various kinds of lay followers: <a class="ref" href="/an8.25">AN 8.25</a>`}
              </dd>
              <dd>
                ${_`Five subjects for frequent recollection: <a class="ref" href="/an5.57">AN 5.57</a>`}
              </dd>
              <dd>
                ${_`Four qualities leading to a householder’s happiness: <a class="ref" href="/an8.54">AN 8.54</a>`}
              </dd>
              <dd>
                ${_`The duties of the layperson: <a class="ref" href="/snp2.14">Snp 2.14</a>`}
              </dd>
              <dd>
                ${_`The layperson’s code of conduct: <a class="ref" href="/dn31">DN 31</a>`}
              </dd>
              <dd>
                ${_`What it takes for a layperson to become a stream-winner: <a class="ref" href="/an10.92">AN 10.92</a>`}
              </dd>
              <dd>
                ${_`How a layperson can best work for the welfare of others: <a class="ref" href="/an8.26">AN 8.26</a>, <a class="ref" href="/an4.99">AN 4.99</a>`}
              </dd>
              <dd>
                ${_`Five qualities of a sincere lay follower: <a class="ref" href="/an5.175">AN 5.175</a>`}
              </dd>
              <dd>
                ${_`Five rewards a layperson can expect for having conviction: <a class="ref" href="/an5.38">AN 5.38</a>`}
              </dd>
              <dd>
                ${_`Actions that only lead to one’s downfall: <a class="ref" href="/snp1.6">Snp 1.6</a>`}
              </dd>
              <dd>
                ${_`How skillful actions and choices can protect you: <a class="ref" href="/snp2.4">Snp 2.4</a>, <a class="ref" href="/kp5">Kp 5</a>`}
              </dd>
              <dd>
                ${_`Development of the first six recollections can be done no matter how busy you are: <a class="ref" href="/an11.13">AN 11.13</a>`}
              </dd>
              <dd>
                ${_`How to recognize a lay stream-winner: <a class="ref" href="/an5.179">AN 5.179</a>`}
              </dd>
              <dd>
                ${_`Examples of lay stream-winners in the suttas (see <a href="#stream">Stream-entry</a>): Anāthapiṇḍika, Nakula’s mother (<a class="ref" href="/an6.16">AN 6.16</a>), Suppabuddha the leper (<a class="ref" href="/ud5.3">Ud 5.3</a>), Visākhā a.k.a. “Migāra’s Mother”, 500 women who perish in a fire (<a class="ref" href="/ud7.10">Ud 7.10</a>).`}
              </dd>
              <dt id="laziness">
                ${_`Laziness`}
              </dt>
              <dd class="description">
                ${_`See <a href="#sloth">Sloth and Drowsiness</a> (thīna-middha).`}
              </dd>
              <dt id="listen">
                ${_`Listening`}
              </dt>
              <dd class="description">
                ${_`See also <a href="#speech">Speech</a>.`}
              </dd>
              <dd>
                ${_`How to listen to the Dhamma: <a class="ref" href="/an6.88">AN 6.88</a>`}
              </dd>
              <dd>
                ${_`Five rewards in ~ to Dhamma: <a class="ref" href="/an5.202">AN 5.202</a>`}
              </dd>
              <dd>
                ${_`Importance of ~ critically to Dhamma: <a class="ref" href="/an2.46">AN 2.46</a>`}
              </dd>
              <dt id="samma-ajivo">
                ${_`Livelihood, Right`}
              </dt>
              <dd>
                ${_`Actors and comedians—Tālapuṭa’s lesson from the Buddha: <a class="ref" href="/sn42.2">SN 42.2</a>`}
              </dd>
              <dd>
                ${_`Soldiers—Yodhajīva’s lesson from the Buddha: <a class="ref" href="/sn42.3">SN 42.3</a>`}
              </dd>
              <dt id="lokadhamma">
                ${_`Lokadhamma`}
              </dt>
              <dd class="description">
                ${_`<span class="translation">worldly conditions</span>`}
              </dd>
              <dd>
                ${_`The failings of the world: <a class="ref" href="/an8.6">AN 8.6</a>`}
              </dd>
              <dd>
                ${_`Five kinds of loss, five kinds of gain: <a class="ref" href="/an5.130">AN 5.130</a>`}
              </dd>
              <dd>
                ${_`The perils of fame: <a class="ref" href="/sn17.3">SN 17.3</a>, <a class="ref" href="/sn17.5">SN 17.5</a>, <a class="ref" href="/sn17.8">SN 17.8</a>`}
              </dd>
              <dt>
                ${_`Loving-kindness`}
              </dt>
              <dd class="description">
                ${_`See <a href="#metta">Mettā</a>.`}
              </dd>
              <dt>
                ${_`Lust`}
              </dt>
              <dd class="description">
                ${_`See <a href="#sensuality">Sensuality</a>.`}
              </dd>
            </dl>
            <h2 id="m">
              ${_`M`}
            </h2>
            <dl>
              <dt id="mana">
                ${_`Māna`}
              </dt>
              <dd class="description">
                ${_`<span class="translation">conceit</span>`}
              </dd>
              <dd>
                ${_`As a motivation for practice: <a class="ref" href="/an4.159">AN 4.159</a>`}
              </dd>
              <dd>
                ${_`As a cause of grief: <a class="ref" href="/sn21.2">SN 21.2</a>`}
              </dd>
              <dd>
                ${_`Ven. Vaṅgīsa admonishes himself to abandon ~: <a class="ref" href="/thag21">Thag 21</a>`}
              </dd>
              <dd>
                ${_`As one of the obsessions (<a href="#anusaya">Anusaya</a>): <a class="ref" href="/an7.11">AN 7.11</a>, <a class="ref" href="/an7.12">AN 7.12</a>`}
              </dd>
              <dd>
                ${_`As one of the fetters (<a href="#samyojana">Saṁyojana</a>): <a class="ref" href="/an10.13">AN 10.13</a>`}
              </dd>
              <dt id="manners">
                ${_`Manners`}
              </dt>
              <dd class="description">
                ${_`See also <a href="#kusala">Kusala</a> (skillfulness); <a href="#sila">Sīla</a> (virtue).`}
              </dd>
              <dd>
                ${_`Respectable people have good ~: <a class="ref" href="/an7.64">AN 7.64</a>`}
              </dd>
              <dd>
                ${_`Etiquette and duties for monks: <a class="ref" href="/kd18">Kd 18</a>`}
              </dd>
              <dt id="mara">
                ${_`Māra`}
              </dt>
              <dd>
                ${_`Ten armies of: <a class="ref" href="/snp3.2">Snp 3.2</a>`}
              </dd>
              <dt id="maranassati">
                ${_`Maraṇassati`}
              </dt>
              <dd class="description">
                ${_`<span class="translation">mindfulness of death</span>. See also <a href="#death">Death</a>; <a href="#illness">Illness</a>; <a href="#satipatthana">Satipaṭṭhāna</a> (kinds of mindfulness meditation).`}
              </dd>
              <dd>
                ${_`Death can come at any time; are you ready? <a class="ref" href="/an6.20">AN 6.20</a>`}
              </dd>
              <dd>
                ${_`Mindfulness of death should be developed continuously: <a class="ref" href="/an6.19">AN 6.19</a>`}
              </dd>
              <dd>
                ${_`As one of the ten Recollections: see <a href="#recollections">Recollections, ten</a>.`}
              </dd>
              <dt id="marriage">
                ${_`Marriage`}
              </dt>
              <dd class="description">
                ${_`See also <a href="#lay">Lay Buddhist Practice</a>.`}
              </dd>
              <dd>
                ${_`How to ensure that you’ll be with your spouse in future lives: <a class="ref" href="/an4.55">AN 4.55</a>`}
              </dd>
              <dd>
                ${_`Spouses’ duties to each other: <a class="ref" href="/dn31">DN 31</a>`}
              </dd>
              <dt id="meditation">
                ${_`Meditation`}
              </dt>
              <dd class="description">
                ${_`See also <a href="#anapanasati">Ānāpānassati</a> (mindfulness of breathing); <a href="#maranassati">Maraṇassati</a> (mindfulness of death); <a href="#metta">Mettā</a> (goodwill); <a href="#recollections">Recollections, ten</a>; <a href="#satipatthana">Satipaṭṭhāna</a> (foundations of mindfulness).`}
              </dd>
              <dd>
                ${_`~ is practiced for both one’s own and others’ benefit: <a class="ref" href="/sn16.5">SN 16.5</a>, <a class="ref" href="/sn47.19">SN 47.19</a>, <a class="ref" href="/an5.20">AN 5.20</a>, <a class="ref" href="/an7.64">AN 7.64</a>`}
              </dd>
              <dd>
                ${_`Why bother meditating in the hopes of some future reward when sensual pleasures are available right now? <a class="ref" href="/sn1.20">SN 1.20</a>`}
              </dd>
              <dd>
                ${_`Isn’t ~ simply a useless and unproductive activity? <a class="ref" href="/sn7.17">SN 7.17</a>`}
              </dd>
              <dd>
                ${_`~ is a skill to be developed: <a class="ref" href="/an9.35">AN 9.35</a>, <a class="ref" href="/an9.36">AN 9.36</a>`}
              </dd>
              <dd>
                ${_`The danger of overestimating one’s progress in ~: <a class="ref" href="/mn105">MN 105</a>`}
              </dd>
              <dd>
                ${_`Formless attainments leading to Nibbāna: <a class="ref" href="/mn106">MN 106</a>`}
              </dd>
              <dt id="merit">
                ${_`Merit`}
              </dt>
              <dd class="description">
                ${_`See <a href="#punna">Puñña</a>.`}
              </dd>
              <dt id="metta">
                ${_`Mettā`}
              </dt>
              <dd class="description">
                ${_`<span class="translation">goodwill, loving-kindness</span>. See also <a href="#brahmavihara">Brahmavihāra</a>; <a href="#parami">Pāramīs</a>.`}
              </dd>
              <dd>
                ${_`Karaṇīya Mettā Sutta (Discourse on Loving-kindness): <a class="ref" href="/snp1.8">Snp 1.8</a> and <a class="ref" href="/kp9">Kp 9</a>`}
              </dd>
              <dd>
                ${_`As a protection against harm: <a class="ref" href="/kd15.6">Kd 15.6</a>, <a class="ref" href="/sn20.5">SN 20.5</a>, <a class="ref" href="/an4.67">AN 4.67</a>`}
              </dd>
              <dd>
                ${_`As a factor leading to liberation: <a class="ref" href="/an6.13">AN 6.13</a>`}
              </dd>
              <dd>
                ${_`Systematic practice of ~: <a class="ref" href="/sn42.8">SN 42.8</a>`}
              </dd>
              <dd>
                ${_`Eleven benefits of ~: <a class="ref" href="/an11.16">AN 11.16</a>`}
              </dd>
              <dd>
                ${_`Even more fruitful than giving: <a class="ref" href="/sn20.4">SN 20.4</a>`}
              </dd>
              <dd>
                ${_`Course of rebirths to be expected from those who cultivate ~: <a class="ref" href="/an4.125">AN 4.125</a>`}
              </dd>
              <dd>
                ${_`Maintain thoughts of ~ no matter how others address you: <a class="ref" href="/mn21">MN 21</a>`}
              </dd>
              <dd>
                ${_`No one is dearer to one than oneself: <a class="ref" href="/ud5.1">Ud 5.1</a>`}
              </dd>
              <dd>
                ${_`The radiant brightness of ~: <a class="ref" href="/iti27">Iti 27</a>`}
              </dd>
              <dd>
                ${_`As a basis for the development of jhāna: <a class="ref" href="/an8.63">AN 8.63</a>`}
              </dd>
              <dd>
                ${_`Practicing ~ as a way to deal with annoying people: <a class="ref" href="/an5.161">AN 5.161</a>`}
              </dd>
              <dt>
                ${_`Middle way`}
              </dt>
              <dd>
                ${_`<span class="translation">Majjhimā paṭipadā</span>`}
              </dd>
              <dd>
                ${_`Avoiding extreme views: <a class="ref" href="/sn12.15">SN 12.15</a>`}
              </dd>
              <dd>
                ${_`Buddha’s first teachings on the ~: <a class="ref" href="/sn56.11">SN 56.11</a>`}
              </dd>
              <dd>
                ${_`Middle way between indulgence in sensuality and adherence to fixed rituals and precepts: <a class="ref" href="/ud6.8">Ud 6.8</a>`}
              </dd>
              <dd>
                ${_`<a href="#ps">Dependent origination</a> as a “middle way” between extremes of views: <a class="ref" href="/sn12.48">SN 12.48</a>`}
              </dd>
              <dt id="mindfulness">
                ${_`Mindfulness`}
              </dt>
              <dd class="description">
                ${_`See <a href="#sati">Sati</a>.`}
              </dd>
              <dt>
                ${_`Mind-reading.`}
              </dt>
              <dd>
                ${_`One’s own mind: <a class="ref" href="/an10.51">AN 10.51</a>`}
              </dd>
              <dd>
                ${_`Another’s mind: See <a href="#supranormal">Supranormal powers</a>`}
              </dd>
              <dt id="moderation">
                ${_`Moderation`}
              </dt>
              <dd class="description">
                ${_`See also <a href="#restraint">Restraint</a>.`}
              </dd>
              <dd>
                ${_`~ with respect to the four requisites: <a class="ref" href="/an7.64">AN 7.64</a>`}
              </dd>
              <dd>
                ${_`~ in eating: <a class="ref" href="/mn39">MN 39</a>, <a class="ref" href="/mn53">MN 53</a>`}
              </dd>
              <dt>
                ${_`Modesty.`}
              </dt>
              <dd>
                ${_`As a quality of a great person: <a class="ref" href="/an8.30">AN 8.30</a>`}
              </dd>
              <dd>
                ${_`Rare in a person of wealth and power: <a class="ref" href="/an8.23">AN 8.23</a>`}
              </dd>
              <dt id="monastic">
                ${_`Monastic Life`}
              </dt>
              <dd class="description">
                ${_`See also <a href="#ascetic">Ascetic practices</a>; <a href="#vinaya">Vinaya</a>; <a href="#monkwork">Work, monastics’</a>.`}
              </dd>
              <dd>
                ${_`Permission from one’s parents is a prerequisite for ordination: <a class="ref" href="/mn82">MN 82</a>`}
              </dd>
              <dd>
                ${_`Why it took Ven. Sona so long to go forth: <a class="ref" href="/ud5.6">Ud 5.6</a>`}
              </dd>
              <dd>
                ${_`Ten things for monks to reflect on often: <a class="ref" href="/an10.48">AN 10.48</a>`}
              </dd>
              <dd>
                ${_`The fruits of the homeless life: <a class="ref" href="/dn2">DN 2</a>`}
              </dd>
              <dd>
                ${_`Gradual training for monks: <a class="ref" href="/mn107">MN 107</a>`}
              </dd>
              <dd>
                ${_`How to bring harmony to the community: <a class="ref" href="/an6.12">AN 6.12</a>`}
              </dd>
              <dd>
                ${_`Five exhortations for new monks: <a class="ref" href="/an5.114">AN 5.114</a>`}
              </dd>
              <dd>
                ${_`What it means to live free of society: <a class="ref" href="/sn22.3">SN 22.3</a>`}
              </dd>
              <dd>
                ${_`A monk’s duties: <a class="ref" href="/kd18">Kd 18</a>`}
              </dd>
              <dd>
                ${_`Wrong reasons for a monk to go on almsround: <a class="ref" href="/ud3.8">Ud 3.8</a>`}
              </dd>
              <dd>
                ${_`Do monks really do any useful work? <a class="ref" href="/snp1.4">Snp 1.4</a>`}
              </dd>
              <dd>
                ${_`Different kinds of monks ought not disparage each other: <a class="ref" href="/an6.46">AN 6.46</a>`}
              </dd>
              <dd>
                ${_`What makes a monk worthy of respect? <a class="ref" href="/an3.94">AN 3.94</a>`}
              </dd>
              <dt id="money">
                ${_`Money`}
              </dt>
              <dd class="description">
                ${_`See also <a href="#householder">Householders</a>; <a href="#wealth">Wealth</a>.`}
              </dd>
              <dd>
                ${_`~ can’t buy true happines: <a class="ref" href="/an10.46">AN 10.46</a>`}
              </dd>
              <dd>
                ${_`How to protect and preserve one’s wealth: <a class="ref" href="/an8.54">AN 8.54</a>`}
              </dd>
              <dd>
                ${_`Are monks allowed to use money? <a class="ref" href="/sn42.10">SN 42.10</a>`}
              </dd>
              <dt>
                ${_`Monk`}
              </dt>
              <dd class="description">
                ${_`See <a href="#monastic">Monastic Life</a>.`}
              </dd>
              <dt>
                ${_`Moral dread`}
              </dt>
              <dd class="description">
                ${_`See <a href="#ottappa">Ottappa</a>.`}
              </dd>
              <dt>
                ${_`Moral shame`}
              </dt>
              <dd class="description">
                ${_`See <a href="#hiri">Hiri</a>.`}
              </dd>
              <dt>
                ${_`Morality`}
              </dt>
              <dd class="description">
                ${_`See <a href="#sila">Sīla</a>.`}
              </dd>
              <dt id="mudita">
                ${_`Muditā`}
              </dt>
              <dd class="description">
                ${_`<span class="translation">appreciative/sympathetic joy</span>. See also <a href="#brahmavihara">Brahmavihāra</a>.`}
              </dd>
              <dd>
                ${_`As a factor leading to liberation: <a class="ref" href="/an6.13">AN 6.13</a>`}
              </dd>
              <dd>
                ${_`Systematic cultivation of ~: <a class="ref" href="/sn42.8">SN 42.8</a>`}
              </dd>
              <dt id="murder">
                ${_`Murder`}
              </dt>
              <dd class="description">
                ${_`See also <a href="#death">Death</a>.`}
              </dd>
              <dd>
                ${_`Fate of those who commit ~: <a class="ref" href="/mn135">MN 135</a>, <a class="ref" href="/sn3.25">SN 3.25</a>`}
              </dd>
            </dl>
            <h2 id="n">
              ${_`N`}
            </h2>
            <dl>
              <dt id="namarupa">
                ${_`Nama-rūpa`}
              </dt>
              <dd class="description">
                ${_`<span class="translation">name-and-form, mind-and-matter, mentality-materiality</span>. See also <a href="#ps">Paṭicca-samuppāda</a> (dependent origination).`}
              </dd>
              <dd>
                ${_`Understanding of ~ as a basis for Right View: <a class="ref" href="/mn9">MN 9</a>`}
              </dd>
              <dd>
                ${_`Mutual dependence of consciousness and ~: <a class="ref" href="/sn12.67">SN 12.67</a>`}
              </dd>
              <dt id="nekkhamma">
                ${_`Nekkhamma`}
              </dt>
              <dd class="description">
                ${_`<span class="translation">renunciation</span>. See also <a href="#celibacy">Celibacy</a>; <a href="#gradual">Gradual instruction</a>; <a href="#parami">Pāramīs</a>; <a href="#restraint">Restraint</a>; <a href="#sensuality">Sensuality</a>.`}
              </dd>
              <dd>
                ${_`The bliss of ~: <a class="ref" href="/ud2.10">Ud 2.10</a>`}
              </dd>
              <dd>
                ${_`Appreciating the value of ~ is a crucial first step in practice: <a class="ref" href="/an9.41">AN 9.41</a>`}
              </dd>
              <dd>
                ${_`~ goes “against the flow” (of craving): <a class="ref" href="/iti109">Iti 109</a>`}
              </dd>
              <dd>
                ${_`As the basis for shedding fear of death: <a class="ref" href="/an4.184">AN 4.184</a>`}
              </dd>
              <dd>
                ${_`As the escape from sensuality: <a class="ref" href="/iti72">Iti 72</a>`}
              </dd>
              <dd>
                ${_`As a cause for sleeping at ease: <a class="ref" href="/an3.34">AN 3.34</a>`}
              </dd>
              <dd>
                ${_`As a profound kind of rest: <a class="ref" href="/snp5.11">Snp 5.11</a>, <a class="ref" href="/an3.38">AN 3.38</a>`}
              </dd>
              <dt id="nibbana">
                ${_`Nibbāna`}
              </dt>
              <dd class="description">
                ${_`<span class="translation">extinguishment, quenching</span>. See also <a href="#arahant">Arahant</a>; <a href="#awakening">Awakening</a>; <a href="#deathless">Deathless</a>; <a href="#parinibbana">Parinibbana</a>; <a href="#stream">Stream-entry</a>; <a href="#vimutti">Vimutti</a> (release).`}
              </dd>
              <dd>
                ${_`The foremost: <a class="ref" href="/dhp184">Dhp 184</a>`}
              </dd>
              <dd>
                ${_`The foremost ease: <a class="ref" href="/dhp202">Dhp 202</a>`}
              </dd>
              <dd>
                ${_`Heedfulness leads one to ~: <a class="ref" href="/dhp21">Dhp 21</a>, <a class="ref" href="/dhp32">Dhp 32</a>`}
              </dd>
              <dd>
                ${_`A hallmark of a true brahman: <a class="ref" href="/dhp414">Dhp 414</a>`}
              </dd>
              <dd>
                ${_`What lies beyond ~? <a class="ref" href="/an4.174">AN 4.174</a>`}
              </dd>
              <dd>
                ${_`~ is the goal; there’s nothing beyond it: <a class="ref" href="/mn144">MN 144</a>`}
              </dd>
              <dd>
                ${_`~ is beyond Māra’s reach: <a class="ref" href="/sn4.19">SN 4.19</a>`}
              </dd>
              <dd>
                ${_`~ is not a “source” or “ground” from which phenomena (<i>dhamma</i>) arise: <a class="ref" href="/mn1">MN 1</a>`}
              </dd>
              <dd>
                ${_`~ is not itself a phenomenon, but is the final end of phenomena: <a class="ref" href="/an10.58">AN 10.58</a>`}
              </dd>
              <dd>
                ${_`Pleasure of ~ exceeds all others: <a class="ref" href="/an9.34">AN 9.34</a>`}
              </dd>
              <dd>
                ${_`Two forms of ~ (with fuel remaining, and without fuel remaining): <a class="ref" href="/iti44">Iti 44</a>`}
              </dd>
              <dd>
                ${_`Four qualities to develop that lead one towards ~: <a class="ref" href="/an4.37">AN 4.37</a>`}
              </dd>
              <dt id="nibbida">
                ${_`Nibbidā`}
              </dt>
              <dd class="description">
                ${_`<span class="translation">disenchantment, aversion, and weariness with regard to conditioned phenomena</span>. See also <a href="#asubha">Asubha</a>.`}
              </dd>
              <dd>
                ${_`As a mark of practicing Dhamma “in accordance with the Dhamma”: <a class="ref" href="/sn22.39">SN 22.39</a>`}
              </dd>
              <dt id="nirvana">
                ${_`Nirvāṇa`}
              </dt>
              <dd class="description">
                ${_`See <a href="#nibbana">Nibbāna</a>.`}
              </dd>
              <dt id="nivarana">
                ${_`Nīvaraṇa`}
              </dt>
              <dd class="description">
                ${_`<span class="translation">hindrances</span>. See also <a href="#anger">Anger</a>; <a href="#lobha">Desire</a>; <a href="#jhana">Jhāna</a>; <a href="#kilesa">Kilesa</a>.`}
              </dd>
              <dd>
                ${_`See each of the five hindrances individually:\n                `}
                <ul>
                  <li>
                    ${_`<a href="#lobha">Sensual desire</a> (kāmacchanda)`}
                  </li>
                  <li>
                    ${_`<a href="#ill">Ill-will</a> (vyāpāda)`}
                  </li>
                  <li>
                    ${_`<a href="#sloth">Sloth and Drowsiness</a> (thīna-middha)`}
                  </li>
                  <li>
                    ${_`<a href="#restlessness">Restlessness and worry</a> (uddhacca-kukkucca)`}
                  </li>
                  <li>
                    ${_`<a href="#doubt">Doubt</a> (vicikicchā)`}
                  </li>
                </ul>
              </dd>
              <dd>
                ${_`Feeding and starving the ~: <a class="ref" href="/sn46.51">SN 46.51</a>`}
              </dd>
              <dd>
                ${_`Antidote: direct the mind towards an inspiring object: <a class="ref" href="/sn47.10">SN 47.10</a>`}
              </dd>
              <dd>
                ${_`How to abandon the ~: <a class="ref" href="/an9.64">AN 9.64</a>`}
              </dd>
              <dd>
                ${_`Abandoning the ~ is a quality that distinguishes the true contemplative: <a class="ref" href="/mn39">MN 39</a>`}
              </dd>
              <dd>
                ${_`Giving to one who has abandoned the ~ brings good results: <a class="ref" href="/sn3.24">SN 3.24</a>`}
              </dd>
              <dd>
                ${_`~ are to be conquered in all postures: <a class="ref" href="/iti111">Iti 111</a>`}
              </dd>
              <dd>
                ${_`Like canals dissipating the force of a river current: <a class="ref" href="/an5.51">AN 5.51</a>`}
              </dd>
              <dt id="eightfold">
                ${_`Noble Eightfold Path`}
              </dt>
              <dd class="description">
                ${_`<span class="translation">ariya-aṭṭhaṅgika magga</span>. See also <a href="#bodhipakkhiya-dhamma">Bodhipakkhiya-dhamma</a>.`}
              </dd>
              <dd>
                ${_`The individual factors of the Path:\n                `}
                <dl>
                  <dt>
                    ${_`Right View`}
                  </dt>
                  <dd class="description">
                    ${_`<span class="translation">Sammā-diṭṭhi</span>`}
                  </dd>
                  <dd>
                    ${_`Conditions for the arising of ~: <a class="ref" href="/mn43">MN 43</a>`}
                  </dd>
                  <dd>
                    ${_`What is Right View? <a class="ref" href="/mn9">MN 9</a>`}
                  </dd>
                  <dd>
                    ${_`~ is to be used to the point of overcoming attachment to all views: <a class="ref" href="/snp4.3">Snp 4.3</a>`}
                  </dd>
                  <dt>
                    ${_`Right intention`}
                  </dt>
                  <dd class="description">
                    ${_`<span class="translation">Sammā-saṅkappa</span>. See also <a href="#ahimsa">Non-harming</a>.`}
                  </dd>
                  <dd>
                    ${_`~ is to be maintained in all postures: <a class="ref" href="/iti110">Iti 110</a>`}
                  </dd>
                  <dt>
                    ${_`Right Speech`}
                  </dt>
                  <dd class="description">
                    ${_`<span class="translation">sammā-vācā</span> See also <a href="#speech">Speech</a>.`}
                  </dd>
                  <dd>
                    ${_`Speak only words that do no harm: <a class="ref" href="/thag21">Thag 21</a>`}
                  </dd>
                  <dt>
                    ${_`Right Action`}
                  </dt>
                  <dd class="description">
                    ${_`<span class="translation">sammā-kammanta</span>`}
                  </dd>
                  <dt>
                    ${_`Right Livelihood`}
                  </dt>
                  <dd class="description">
                    ${_`<span class="translation">sammā-ājīva</span>`}
                  </dd>
                  <dt>
                    ${_`Right Effort`}
                  </dt>
                  <dd class="description">
                    ${_`<span class="translation">sammā-vāyāma</span>`}
                  </dd>
                  <dt>
                    ${_`Right Mindfulness`}
                  </dt>
                  <dd class="description">
                    ${_`<span class="translation">sammā-sati</span>`}
                  </dd>
                  <dt>
                    ${_`Right Immersion`}
                  </dt>
                  <dd class="description">
                    ${_`<span class="translation">sammā-samādhi</span>`}
                  </dd>
                  <dd>
                    ${_`The central role of ~ in the Eightfold Path: <a class="ref" href="/mn117">MN 117</a>`}
                  </dd>
                </dl>
              </dd>
              <dt id="silence">
                ${_`Noble silence`}
              </dt>
              <dd class="description">
                ${_`second <a href="#jhana">jhāna</a>`}
              </dd>
              <dd>
                ${_`~ explained: <a class="ref" href="/sn21.1">SN 21.1</a>`}
              </dd>
              <dd>
                ${_`No-thinking: <a class="ref" href="/thag14.1">Thag 14.1</a>`}
              </dd>
              <dd>
                ${_`As a cause for the arising of wisdom: <a class="ref" href="/an8.2">AN 8.2</a>`}
              </dd>
              <dd>
                ${_`Either speak Dhamma, or keep noble silence: <a class="ref" href="/ud2.2">Ud 2.2</a>`}
              </dd>
              <dt>
                ${_`Non-dualism.`}
              </dt>
              <dd>
                ${_`Non-dual awareness not the goal: <a class="ref" href="/an10.29">AN 10.29</a>`}
              </dd>
              <dt id="ahimsa">
                ${_`Non-harming, Non-violence`}
              </dt>
              <dd class="description">
                ${_`See also “Right Resolve” in <a href="#eightfold">Noble Eightfold Path</a>.`}
              </dd>
              <dd>
                ${_`Leads to happiness after death: <a class="ref" href="/dhp132">Dhp 132</a>`}
              </dd>
              <dd>
                ${_`As a supporting condition for Awakening: <a class="ref" href="/dhp270">Dhp 270</a>`}
              </dd>
              <dd>
                ${_`Isn’t all there is to the Buddhist path: <a class="ref" href="/mn78">MN 78</a>`}
              </dd>
              <dd>
                ${_`The story of Angulimala the bandit: <a class="ref" href="/mn86">MN 86</a>`}
              </dd>
              <dd>
                ${_`How a wise person moves in society: <a class="ref" href="/dhp49">Dhp 49</a>`}
              </dd>
              <dd>
                ${_`“The Rod” (Dhammapada chapter 10)`}
              </dd>
              <dt>
                ${_`Not-self`}
              </dt>
              <dd class="description">
                ${_`See <a href="#anatta">Anattā</a>.`}
              </dd>
              <dt id="nutriment">
                ${_`Nutriment`}
              </dt>
              <dd class="description">
                ${_`<span class="translation">āhāra</span>. See also <a href="#food">Food</a>.`}
              </dd>
              <dd>
                ${_`~ for the factors of Awakening: <a class="ref" href="/sn46.51">SN 46.51</a>`}
              </dd>
              <dd>
                ${_`Four types of physical and mental ~: <a class="ref" href="/sn12.63">SN 12.63</a>; <a class="ref" href="/sn12.64">SN 12.64</a>`}
              </dd>
              <dd>
                ${_`Its relationship to dependent origination: <a class="ref" href="/sn12.63">SN 12.63</a>; <a class="ref" href="/sn12.11">SN 12.11</a>`}
              </dd>
              <dd>
                ${_`The need for ~ is what all beings have in common: <a class="ref" href="/kp1">Kp 1</a>`}
              </dd>
              <dt>
                ${_`Nymphs, dove-footed`}
              </dt>
              <dd>
                ${_`<a class="ref" href="/ud3.2">Ud 3.2</a>`}
              </dd>
            </dl>
            <h2 id="o">
              ${_`O`}
            </h2>
            <dl>
              <dt id="ottappa">
                ${_`Ottappa`}
              </dt>
              <dd class="description">
                ${_`<span class="translation">prudence, discretion; concern for the results of evil actions</span>. See also <a href="#hiri">Hiri</a> (conscience).`}
              </dd>
              <dd>
                ${_`As a quality that distinguishes the true contemplative: <a class="ref" href="/mn39">MN 39</a>`}
              </dd>
              <dd>
                ${_`As a treasure: <a class="ref" href="/an7.6">AN 7.6</a>`}
              </dd>
              <dd>
                ${_`As a guardian: <a class="ref" href="/an2.9">AN 2.9</a>`}
              </dd>
              <dd>
                ${_`As a quality that safeguards the world: <a class="ref" href="/iti42">Iti 42</a>`}
              </dd>
            </dl>
            <h2 id="p">
              ${_`P`}
            </h2>
            <dl>
              <dt id="pain">
                ${_`Pain`}
              </dt>
              <dd class="description">
                ${_`See also <a href="#illness">Illness</a>; <a href="#vedana">Vedanā</a> (feeling).`}
              </dd>
              <dd>
                ${_`Don’t add mental ~ to your physical ~!: <a class="ref" href="/sn36.6">SN 36.6</a>`}
              </dd>
              <dd>
                ${_`Preventing physical ~ from invading the mind: <a class="ref" href="/sn52.10">SN 52.10</a>`}
              </dd>
              <dd>
                ${_`The Buddha shows by example how best to handle physical ~: <a class="ref" href="/sn1.38">SN 1.38</a>, <a class="ref" href="/sn4.13">SN 4.13</a>`}
              </dd>
              <dd>
                ${_`Sāriputta’s teachings to a dying Anāthapiṇḍika: <a class="ref" href="/mn143">MN 143</a>`}
              </dd>
              <dd>
                ${_`Mindfulness can protect you from falling into ~’s bottomless pit: <a class="ref" href="/sn36.4">SN 36.4</a>`}
              </dd>
              <dd>
                ${_`As one of the eight worldly conditions: <a class="ref" href="/an8.6">AN 8.6</a>`}
              </dd>
              <dd>
                ${_`Avoiding evil deeds as a way to avoid ~: <a class="ref" href="/ud5.4">Ud 5.4</a>`}
              </dd>
              <dd>
                ${_`The origin of pleasure and ~: <a class="ref" href="/sn12.25">SN 12.25</a>`}
              </dd>
              <dd>
                ${_`~ can’t be used to purify oneself of past misdeeds: <a class="ref" href="/mn14">MN 14</a>`}
              </dd>
              <dt id="pancasila">
                ${_`Pañca-sīla`}
              </dt>
              <dd class="description">
                ${_`<span class="translation">the five precepts</span>. See <a href="#precepts">Precepts</a>`}
              </dd>
              <dt id="panna">
                ${_`Paññā`}
              </dt>
              <dd class="description">
                ${_`<span class="translation">discernment, wisdom</span>. See also <a href="#parami">Pāramīs</a>; <a href="#wiseperson">Wise person</a>.`}
              </dd>
              <dd>
                ${_`Eye of ~: <a class="ref" href="/mn43">MN 43</a>`}
              </dd>
              <dd>
                ${_`Eight requisite conditions for ~: <a class="ref" href="/an8.2">AN 8.2</a>`}
              </dd>
              <dd>
                ${_`Which comes first: concentration or ~? <a class="ref" href="/an3.73">AN 3.73</a>`}
              </dd>
              <dd>
                ${_`Goes hand-in-hand with jhāna: <a class="ref" href="/dhp372">Dhp 372</a>`}
              </dd>
              <dd>
                ${_`As a treasure: <a class="ref" href="/an7.6">AN 7.6</a>`}
              </dd>
              <dt id="papanca">
                ${_`Papañca`}
              </dt>
              <dd class="description">
                ${_`<span class="translation">complication, objectification, proliferation</span>`}
              </dd>
              <dd>
                ${_`As a cause of conflict in the mind: <a class="ref" href="/mn18">MN 18</a>, <a class="ref" href="/dn21">DN 21</a>`}
              </dd>
              <dt id="parami">
                ${_`Pāramīs`}
              </dt>
              <dd class="description">
                ${_`<span class="translation">perfections</span>.`}
              </dd>
              <dd>
                ${_`Not found in the technical sense in the early texts. However, you can look under each of the\n                constituent factors:\n                `}
                <ul>
                  <li>
                    ${_`<a href="#dana">Dāna</a> (generous action)`}
                  </li>
                  <li>
                    ${_`<a href="#sila">Sīla</a> (virtue)`}
                  </li>
                  <li>
                    ${_`<a href="#nekkhamma">Nekkhamma</a> (renunciation)`}
                  </li>
                  <li>
                    ${_`<a href="#panna">Paññā</a> (wisdom, discernment)`}
                  </li>
                  <li>
                    ${_`<a href="#viriya">Viriya</a> (energy, effort)`}
                  </li>
                  <li>
                    ${_`<a href="#khanti">Khanti</a> (patience)`}
                  </li>
                  <li>
                    ${_`<a href="#sacca">Sacca</a> (truthfulness)`}
                  </li>
                  <li>
                    ${_`<a href="#adhitthana">Adhiṭṭhāna</a> (determination, resolution)`}
                  </li>
                  <li>
                    ${_`<a href="#metta">Mettā</a> (goodwill, loving-kindness)`}
                  </li>
                  <li>
                    ${_`<a href="#upekkha">Upekkhā</a> (equanimity)`}
                  </li>
                </ul>
              </dd>
              <dt id="parents">
                ${_`Parents`}
              </dt>
              <dd class="description">
                ${_`See also <a href="#children">Children</a>; <a href="#family">Family</a>.`}
              </dd>
              <dd>
                ${_`How to repay the debt we owe to our ~: <a class="ref" href="/an2.32">AN 2.32</a>`}
              </dd>
              <dd>
                ${_`The anguish an aging ~ feels when his children show no gratitude: <a class="ref" href="/sn7.14">SN 7.14</a>`}
              </dd>
              <dd>
                ${_`~ should at least make sure that their children grow up to respect the precepts: <a class="ref" href="/iti74">Iti 74</a>`}
              </dd>
              <dd>
                ${_`One’s ~ should be respected as great teachers and devas: <a class="ref" href="/iti106">Iti 106</a>`}
              </dd>
              <dd>
                ${_`Supporting one’s ~: <a class="ref" href="/snp2.4">Snp 2.4</a>`}
              </dd>
              <dd>
                ${_`At one time or another, we have all been each other’s ~: <a class="ref" href="/sn15.14">SN 15.14</a>`}
              </dd>
              <dd>
                ${_`Reverence for one’s ~ as a blessing: <a class="ref" href="/dhp332">Dhp 332</a>`}
              </dd>
              <dd>
                ${_`Childrens’ duties to their parents: <a class="ref" href="/dn31">DN 31</a>`}
              </dd>
              <dd>
                ${_`Parents’ duties to their children: <a class="ref" href="/dn31">DN 31</a>`}
              </dd>
              <dd>
                ${_`Permission from one’s ~ is a prerequisite for ordination: <a class="ref" href="/mn82">MN 82</a>`}
              </dd>
              <dt id="parinibbana">
                ${_`Parinibbana`}
              </dt>
              <dd class="description">
                ${_`<span class="translation">total release; complete liberation</span>. See also <a href="#nibbana">Nibbāna</a>.`}
              </dd>
              <dd>
                ${_`Eye-witness accounts of the Buddha’s ~: <a class="ref" href="/sn6.15">SN 6.15</a>`}
              </dd>
              <dt id="parisa">
                ${_`Parisā`}
              </dt>
              <dd class="description">
                ${_`The Buddha’s following`}
              </dd>
              <dd>
                ${_`The fourfold ~ (monks, nuns, laymen, laywomen) is essential for a full and complete dispensation: <a class="ref" href="/dn16">DN 16</a>, <a class="ref" href="/kd1">Kd 1</a>`}
              </dd>
              <dd>
                ${_`Householders and monastics depend upon each other: <a class="ref" href="/iti107">Iti 107</a>`}
              </dd>
              <dt id="pasada">
                ${_`Pasāda`}
              </dt>
              <dd class="description">
                ${_`<span class="translation">clarity and serene confidence</span>. See also <a href="#emotion">Emotion</a>; <a href="#samvega">Saṁvega</a>.`}
              </dd>
              <dt id="ps">
                ${_`Paṭicca-samuppāda`}
              </dt>
              <dd class="description">
                ${_`<span class="translation">dependent origination</span>. See also <a href="#Samsara">Saṁsāra</a>.`}
              </dd>
              <dd>
                ${_`If you think you understand ~, as did Ven. Ānanda, think again: <a class="ref" href="/dn15">DN 15</a>`}
              </dd>
              <dd>
                ${_`How the world arises and falls according to ~: <a class="ref" href="/sn12.44">SN 12.44</a>`}
              </dd>
              <dd>
                ${_`A synopsis of ~: <a class="ref" href="/sn12.2">SN 12.2</a>`}
              </dd>
              <dd>
                ${_`Mutual dependence of consciousness and name-and-form: <a class="ref" href="/sn12.67">SN 12.67</a>`}
              </dd>
              <dd>
                ${_`Buddha’s rediscovery of ~ on the eve of his Awakening: <a class="ref" href="/sn12.65">SN 12.65</a>`}
              </dd>
              <dd>
                ${_`Is there someone or something that lies behind the process of ~? <a class="ref" href="/sn12.35">SN 12.35</a>`}
              </dd>
              <dd>
                ${_`As a cause for the arising of right view: <a class="ref" href="/sn12.15">SN 12.15</a>`}
              </dd>
              <dd>
                ${_`As a cause for the cessation of wrong views: <a class="ref" href="/sn12.20">SN 12.20</a>`}
              </dd>
              <dd>
                ${_`As a cause for the ending of the <a href="#asava">Āsava (defilements)</a>: <a class="ref" href="/sn12.23">SN 12.23</a>`}
              </dd>
              <dd>
                ${_`As a “middle way” between extremes of views: <a class="ref" href="/sn12.35">SN 12.35</a>, <a class="ref" href="/sn12.48">SN 12.48</a>`}
              </dd>
              <dd>
                ${_`The Buddha reflects on ~ for seven days after his Awakening: <a class="ref" href="/ud1.1">Ud 1.1–3</a>`}
              </dd>
              <dd>
                ${_`The origin of pleasure and pain: <a class="ref" href="/sn12.25">SN 12.25</a>`}
              </dd>
              <dd>
                ${_`An extended treatment of ~ by the Buddha: <a class="ref" href="/dn15">DN 15</a>`}
              </dd>
              <dd>
                ${_`Its relationship to <a href="#nutriment">Nutriment (<i>āhāra</i>)</a>: <a class="ref" href="/sn12.63">SN 12.63</a>; <a class="ref" href="/sn12.11">SN 12.11</a>`}
              </dd>
              <dd>
                ${_`See each of its constituent factors:\n                `}
                <ul>
                  <li>
                    ${_`<a href="#avijja">Avijjā</a> (ignorance)`}
                  </li>
                  <li>
                    ${_`<a href="#sankhara">Saṅkhāra</a> (mental fabrications)`}
                  </li>
                  <li>
                    ${_`<a href="#vinnana">Viññāṇa</a> (consciousness)`}
                  </li>
                  <li>
                    ${_`<a href="#namarupa">Nama-rūpa</a> (name-and-form)`}
                  </li>
                  <li>
                    ${_`<a href="#salayatana">Saḷāyatana</a> (six sense-media)`}
                  </li>
                  <li>
                    ${_`<a href="#phassa">Phassa</a> (contact)`}
                  </li>
                  <li>
                    ${_`<a href="#vedana">Vedanā</a> (feeling)`}
                  </li>
                  <li>
                    ${_`<a href="#tanha">Taṇhā</a> (craving)`}
                  </li>
                  <li>
                    ${_`<a href="#upadana">Upādāna</a> (clinging)`}
                  </li>
                  <li>
                    ${_`<a href="#bhava">Bhava</a> (becoming)`}
                  </li>
                  <li>
                    ${_`<a href="#jati">Jāti</a> (birth)`}
                  </li>
                  <li>
                    ${_`<a href="#dukkha">Dukkha</a> (suffering, unsatisfactoriness).`}
                  </li>
                </ul>
              </dd>
              <dt>
                ${_`Patience`}
              </dt>
              <dd class="description">
                ${_`See <a href="#khanti">Khanti</a>.`}
              </dd>
              <dt id="patimokkha">
                ${_`Pātimokkha`}
              </dt>
              <dd class="description">
                ${_`<span class="translation">monks’ and nuns’ rules of conduct</span>. See <a href="#vinaya">Vinaya</a>.`}
              </dd>
              <dt>
                ${_`Perception`}
              </dt>
              <dd class="description">
                ${_`See <a href="#sanna">Saññā</a>.`}
              </dd>
              <dt>
                ${_`Perfections`}
              </dt>
              <dd class="description">
                ${_`See <a href="#parami">Pāramīs</a>.`}
              </dd>
              <dt id="peta">
                ${_`Peta loka`}
              </dt>
              <dd class="description">
                ${_`<span class="translation">realm of the hungry ghosts/shades</span>. See <a href="#planes">Planes of Existence, Thirty-one</a>.`}
              </dd>
              <dt id="phassa">
                ${_`Phassa`}
              </dt>
              <dd class="description">
                ${_`<span class="translation">contact</span>. See also <a href="#ps">Paṭicca-samuppāda</a> (dependent origination).`}
              </dd>
              <dd>
                ${_`As the conjunction of sense-base + sensory object + sense consciousness: <a class="ref" href="/mn148">MN 148</a>`}
              </dd>
              <dd>
                ${_`Understanding of ~ as a basis for Right View: <a class="ref" href="/mn9">MN 9</a>`}
              </dd>
              <dt id="piti">
                ${_`Pīti`}
              </dt>
              <dd class="description">
                ${_`<span class="translation">rapture; bliss</span>. See also <a href="#jhana">Jhāna</a>.`}
              </dd>
              <dd>
                ${_`The pleasure and joy of ~:<a class="ref" href="/an5.176">AN 5.176</a>`}
              </dd>
              <dt id="planes">
                ${_`Planes of Existence, Thirty-one`}
              </dt>
              <dd class="description">
                ${_`See <a href="#deva">Devas</a>; <a href="#hell">Hell</a>; <a href="#kamma">Kamma</a>; <a href="#peta">Peta loka</a> (realm of the hungry ghosts/shades); <a href="#sagga">Sagga</a> (heaven); <a href="#Samsara">Saṁsāra</a>.`}
              </dd>
              <dt id="pleasure">
                ${_`Pleasure`}
              </dt>
              <dd class="description">
                ${_`See also <a href="#happiness">Happiness</a>; <a href="#pain">Pain</a>; <a href="#sensuality">Sensuality</a>; <a href="#vedana">Vedanā</a> (feeling).`}
              </dd>
              <dd>
                ${_`The many kinds of pleasure: <a class="ref" href="/mn59">MN 59</a>`}
              </dd>
              <dd>
                ${_`The origin of ~ and pain: <a class="ref" href="/sn12.25">SN 12.25</a>`}
              </dd>
              <dd>
                ${_`Attending to the ~ of things instead of their <i>dukkha</i> gives rise to attachment: <a class="ref" href="/sn22.60">SN 22.60</a>`}
              </dd>
              <dd>
                ${_`As one of the eight worldly conditions: <a class="ref" href="/an8.6">AN 8.6</a>`}
              </dd>
              <dt id="precepts">
                ${_`Precepts`}
              </dt>
              <dd class="description">
                ${_`See also <a href="#lay">Lay Buddhist practice</a>; <a href="#refuge">Refuge</a>; <a href="#sila">Sīla</a>; <a href="#uposatha">Uposatha</a>`}
              </dd>
              <dd>
                ${_`Different levels of precepts:\n                `}
                <dl>
                  <dt>
                    ${_`Pañcasīla`}
                  </dt>
                  <dd class="description">
                    ${_`<span class="translation">the Five Precepts</span> (for lay men and women)`}
                  </dd>
                  <dd>
                    ${_`The precepts as a gift to oneself and others: <a class="ref" href="/an8.39">AN 8.39</a>`}
                  </dd>
                  <dd>
                    ${_`The rewards of observing the precepts: <a class="ref" href="/an8.39">AN 8.39</a>`}
                  </dd>
                  <dd>
                    ${_`The consequences of failing to observe the precepts: <a class="ref" href="/an8.40">AN 8.40</a>`}
                  </dd>
                  <dt>
                    ${_`Aṭṭhasīla`}
                  </dt>
                  <dd class="description">
                    ${_`<span class="translation">the Eight Precepts</span> (for lay men and women)`}
                  </dd>
                  <dd>
                    ${_`How the ~ practices are to be practiced: <a class="ref" href="/an8.43">AN 8.43</a>`}
                  </dd>
                  <dd>
                    ${_`Right and wrong ways of observing ~: <a class="ref" href="/an3.70">AN 3.70</a>`}
                  </dd>
                  <dt>
                    ${_`Dasasīla`}
                  </dt>
                  <dd class="description">
                    ${_`<span class="translation">the Ten Precepts</span> (for novice monks and nuns)`}
                  </dd>
                  <dt>
                    ${_`The Bhikkhu Pātimokkha (227 rules for ordained monks); Bhikkhunī Pātimokkha (311 rules for ordained nuns); see also <a href="#vinaya">Vinaya</a>.`}
                  </dt>
                </dl>
              </dd>
              <dt id="present">
                ${_`The present`}
              </dt>
              <dd>
                ${_`This present is all there is: <a class="ref" href="/mn131">MN 131</a>`}
              </dd>
              <dt id="protection">
                ${_`Protection`}
              </dt>
              <dd class="description">
                ${_`See also <a href="#precepts">Precepts</a>; <a href="#sila">Sīla</a>.`}
              </dd>
              <dd>
                ${_`The greatest ~ for the layperson: <a class="ref" href="/snp2.4">Snp 2.4</a>`}
              </dd>
              <dd>
                ${_`Restraint—the Buddha’s defense policy: <a class="ref" href="/sn3.5">SN 3.5</a>`}
              </dd>
              <dd>
                ${_`Mettā (goodwill) as a ~ against harm: <a class="ref" href="/sn20.5">SN 20.5</a>, <a class="ref" href="/an4.67">AN 4.67</a>`}
              </dd>
              <dd>
                ${_`Ten qualities that provide ~ for the mind: <a class="ref" href="/an10.17">AN 10.17</a>`}
              </dd>
              <dd>
                ${_`Watching over oneself, one protects others; watching over others, one protects oneself: <a class="ref" href="/sn47.19">SN 47.19</a>`}
              </dd>
              <dt>
                ${_`Psychic powers`}
              </dt>
              <dd class="description">
                ${_`See <a href="#supranormal">Supranormal powers</a>.`}
              </dd>
              <dt id="punna">
                ${_`Puñña`}
              </dt>
              <dd class="description">
                ${_`<span class="translation">merit, inner wealth, inner goodness</span>`}
              </dd>
              <dd>
                ${_`As a blessing: <a class="ref" href="/dhp331">Dhp 331</a>`}
              </dd>
              <dd>
                ${_`~ accumulates slowly, like water dripping into a pot: <a class="ref" href="/dhp122">Dhp 122</a>`}
              </dd>
              <dd>
                ${_`Benefits of ~ in this life and the next: <a class="ref" href="/dhp16">Dhp 16</a>, <a class="ref" href="/dhp18">Dhp 18</a>`}
              </dd>
              <dd>
                ${_`Infidelity erodes one’s accumulated ~: <a class="ref" href="/dhp310">Dhp 310</a>`}
              </dd>
              <dd>
                ${_`How to gain immeasurable ~: <a class="ref" href="/dhp195">Dhp 195</a>`}
              </dd>
              <dd>
                ${_`Do meritorious deeds to increase your store for future lives: <a class="ref" href="/sn3.20">SN 3.20</a>`}
              </dd>
              <dd>
                ${_`Don’t be afraid of ~: <a class="ref" href="/iti22">Iti 22</a>`}
              </dd>
              <dd>
                ${_`The arahant’s actions bear no kammic fruit, good or evil: <a class="ref" href="/dhp39">Dhp 39</a>, <a class="ref" href="/dhp267">Dhp 267</a>, <a class="ref" href="/dhp412">Dhp 412</a>`}
              </dd>
              <dd>
                ${_`Repeated performance of meritorious deeds brings ease: <a class="ref" href="/dhp118">Dhp 118</a>`}
              </dd>
              <dd>
                ${_`Three grounds for meritorious action: <a class="ref" href="/iti60">Iti 60</a>`}
              </dd>
              <dd>
                ${_`As a fund to be looked after: <a class="ref" href="/kp8">Kp 8</a>`}
              </dd>
              <dd>
                ${_`As the means of attaining true happiness: <a class="ref" href="/an5.43">AN 5.43</a>`}
              </dd>
              <dd>
                ${_`Is making ~ the best one can aspire to in this short life? <a class="ref" href="/sn2.19">SN 2.19</a>`}
              </dd>
            </dl>
            <h2 id="qq">
              ${_`Q`}
            </h2>
            <dl>
              <dt>
                ${_`Quarreling`}
              </dt>
              <dd class="description">
                ${_`See <a href="#conflict">Conflict</a>.`}
              </dd>
              <dt id="questions">
                ${_`Questions`}
              </dt>
              <dd class="description">
                ${_`See also <a href="#ditthi">Diṭṭhi</a> (views); <a href="#yoniso">Yoniso manasikāra</a> (appropriate attention).`}
              </dd>
              <dd>
                ${_`Four types of ~: <a class="ref" href="/an4.42">AN 4.42</a>`}
              </dd>
              <dd>
                ${_`Five motivations behind asking ~: <a class="ref" href="/an5.165">AN 5.165</a>`}
              </dd>
              <dd>
                ${_`How to answer ~: <a class="ref" href="/an3.67">AN 3.67</a>`}
              </dd>
              <dd>
                ${_`~ not worth asking: <a class="ref" href="/dn9">DN 9</a>, <a class="ref" href="/mn2">MN 2</a>, <a class="ref" href="/an4.77">AN 4.77</a>, <a class="ref" href="/an10.69">AN 10.69</a>`}
              </dd>
              <dd>
                ${_`~ best answered by silence: <a class="ref" href="/sn44.10">SN 44.10</a>`}
              </dd>
              <dd>
                ${_`~s that assume an abiding “self” are invalid: <a class="ref" href="/sn12.12">SN 12.12</a>`}
              </dd>
              <dd>
                ${_`~ the Buddha left unanswered: Avyākata Saṁyutta`}
              </dd>
              <dd>
                ${_`How the Buddha handles difficult ~: <a class="ref" href="/mn72">MN 72</a>`}
              </dd>
            </dl>
            <h2 id="r">
              ${_`R`}
            </h2>
            <dl>
              <dt>
                ${_`Racism`}
              </dt>
              <dd class="description">
                ${_`See <a href="#caste">Caste system</a>.`}
              </dd>
              <dt id="radiant">
                ${_`Radiant Mind`}
              </dt>
              <dd>
                ${_`The mind is radiant when freed from defilements: <a class="ref" href="/an1.49">AN 1.49</a>`}
              </dd>
              <dt>
                ${_`Rapture`}
              </dt>
              <dd class="description">
                ${_`See <a href="#piti">Pīti</a>.`}
              </dd>
              <dt>
                ${_`Realms of Existence`}
              </dt>
              <dd class="description">
                ${_`See <a href="#planes">Planes of Existence</a>.`}
              </dd>
              <dt id="rebirth">
                ${_`Rebirth`}
              </dt>
              <dd class="description">
                ${_`See also <a href="#hell">Hell</a>; <a href="#jati">Jāti</a> (birth); <a href="#kamma">Kamma</a>; <a href="#sagga">Sagga</a> (heaven).`}
              </dd>
              <dd>
                ${_`The skillfulness of one’s actions in life determine one’s destination after death: <a class="ref" href="/dhp17">Dhp 17</a>, <a class="ref" href="/dhp18">Dhp 18</a>, <a class="ref" href="/dhp240">Dhp 240</a>`}
              </dd>
              <dd>
                ${_`Causes of favorable or unfavorable ~: <a class="ref" href="/mn135">MN 135</a>, <a class="ref" href="/an3.65">AN 3.65</a>, <a class="ref" href="/dhp310">Dhp 310</a>, <a class="ref" href="/dhp316">Dhp 316</a>`}
              </dd>
              <dd>
                ${_`How to gain rebirth as an elephant or a horse: <a class="ref" href="/an10.177">AN 10.177</a>`}
              </dd>
              <dd>
                ${_`The laws of kamma and ~ are as inviolable as the law of gravity: <a class="ref" href="/sn42.6">SN 42.6</a>`}
              </dd>
              <dd>
                ${_`What’s so bad about being reborn? <a class="ref" href="/sn5.6">SN 5.6</a>`}
              </dd>
              <dd>
                ${_`Why not just settle for rebirth among the devas? <a class="ref" href="/sn5.7">SN 5.7</a>`}
              </dd>
              <dd>
                ${_`The preciousness of our human birth: <a class="ref" href="/sn20.2">SN 20.2</a>, <a class="ref" href="/sn56.48">SN 56.48</a>`}
              </dd>
              <dd>
                ${_`~ witnessed by Buddha on the night of his Awakening: See <a href="#awakening">Buddha’s Awakening</a>.`}
              </dd>
              <dt id="recollections">
                ${_`Recollections, ten`}
              </dt>
              <dd class="description">
                ${_`<span class="translation">anussati</span>`}
              </dd>
              <dd>
                ${_`Recollection of the Buddha (<i>buddhānussati</i>): <a class="ref" href="/sn11.3">SN 11.3</a>, <a class="ref" href="/an3.70">AN 3.70</a>, <a class="ref" href="/an11.12">AN 11.12</a>, <a class="ref" href="/an11.13">AN 11.13</a>, <a class="ref" href="/thag6.2">Thag 6.2</a>`}
              </dd>
              <dd>
                ${_`Recollection of the Dhamma (<i>dhammānussati</i>): <a class="ref" href="/sn11.3">SN 11.3</a>, <a class="ref" href="/an3.70">AN 3.70</a>, <a class="ref" href="/an11.12">AN 11.12</a>, <a class="ref" href="/an11.13">AN 11.13</a>, <a class="ref" href="/thag6.2">Thag 6.2</a>; as a governing principle: <a class="ref" href="/an3.40">AN 3.40</a>`}
              </dd>
              <dd>
                ${_`Recollection of the Saṅgha (<i>saṅghānussati</i>): <a class="ref" href="/sn11.3">SN 11.3</a>, <a class="ref" href="/an3.70">AN 3.70</a>, <a class="ref" href="/an11.12">AN 11.12</a>, <a class="ref" href="/an11.13">AN 11.13</a>, <a class="ref" href="/thag6.2">Thag 6.2</a>`}
              </dd>
              <dd>
                ${_`Recollection of one’s own virtues (<i>sīlānussati</i>): <a class="ref" href="/an3.70">AN 3.70</a>, <a class="ref" href="/an11.12">AN 11.12</a>, <a class="ref" href="/an11.13">AN 11.13</a>`}
              </dd>
              <dd>
                ${_`Recollection of one’s own generosity (<i>cagānussati</i>): <a class="ref" href="/an11.12">AN 11.12</a>, <a class="ref" href="/an11.13">AN 11.13</a>`}
              </dd>
              <dd>
                ${_`Recollection of the devas (<i>devatānussati</i>): <a class="ref" href="/an3.70">AN 3.70</a>, <a class="ref" href="/an11.12">AN 11.12</a>, <a class="ref" href="/an11.13">AN 11.13</a>`}
              </dd>
              <dd>
                ${_`<a href="#maranassati">Mindfulness of death</a> (<i>maraṇassati</i>) (see also <a href="#satipatthana">Satipaṭṭhāna</a>).`}
              </dd>
              <dd>
                ${_`<a href="#kayagatasati">Mindfulness of the body</a> (<i>kāyagatāsati</i>) (see also <a href="#satipatthana">Satipaṭṭhāna</a>).`}
              </dd>
              <dd>
                ${_`<a href="#anapanasati">Mindfulness of breathing</a> (<i>ānāpānassati</i>) (see also <a href="#satipatthana">Satipaṭṭhāna</a>).`}
              </dd>
              <dd>
                ${_`Recollection of peace (<i>upasamānussati</i>): <a class="ref" href="/iti90">Iti 90</a>`}
              </dd>
              <dt id="reconciliation">
                ${_`Reconciliation`}
              </dt>
              <dt id="refuge">
                ${_`Refuge`}
              </dt>
              <dd class="description">
                ${_`See also <a href="#precepts">Precepts</a>; <a href="#tiratana">Tiratana</a> (the Three Gems).`}
              </dd>
              <dd>
                ${_`The formula for going for ~: <a class="ref" href="/kp1">Kp 1</a>`}
              </dd>
              <dd>
                ${_`The supreme ~: <a class="ref" href="/dhp188">Dhp 188</a>`}
              </dd>
              <dd>
                ${_`The Dhamma as one’s island and ~: <a class="ref" href="/dn16">DN 16</a>, <a class="ref" href="/sn47.13">SN 47.13</a>, <a class="ref" href="/sn47.14">SN 47.14</a>`}
              </dd>
              <dt>
                ${_`Release`}
              </dt>
              <dd class="description">
                ${_`See <a href="#vimutti">Vimutti</a>.`}
              </dd>
              <dt id="relics">
                ${_`Relics`}
              </dt>
              <dd class="description">
                ${_`See also <a href="#devotion">Devotion</a>.`}
              </dd>
              <dd>
                ${_`Origin of relic-worship: <a class="ref" href="/dn16">DN 16</a>`}
              </dd>
              <dt id="remorse">
                ${_`Remorse`}
              </dt>
              <dd class="description">
                ${_`See also <a href="#sila">Sīla</a>.`}
              </dd>
              <dd>
                ${_`Two causes of ~: <a class="ref" href="/iti30">Iti 30</a>`}
              </dd>
              <dd>
                ${_`Two causes of no ~: <a class="ref" href="/iti31">Iti 31</a>`}
              </dd>
              <dd>
                ${_`Freedom from ~ is the purpose of developing sīla (virtue): <a class="ref" href="/an11.1">AN 11.1</a>, <a class="ref" href="/an11.2">AN 11.2</a>`}
              </dd>
              <dt>
                ${_`Renunciation`}
              </dt>
              <dd class="description">
                ${_`See <a href="#nekkhamma">Nekkhamma</a>.`}
              </dd>
              <dt id="respect">
                ${_`Respect`}
              </dt>
              <dd class="description">
                ${_`See also <a href="#children">Children</a>; <a href="#gratitude">Gratitude</a>; <a href="#parents">Parents</a>.`}
              </dd>
              <dd>
                ${_`What makes a person an elder worthy of ~? <a class="ref" href="/an2.38">AN 2.38</a>`}
              </dd>
              <dd>
                ${_`What makes a monk worthy of ~? <a class="ref" href="/an3.94">AN 3.94</a>`}
              </dd>
              <dd>
                ${_`As one of the greatest protections/blessings: <a class="ref" href="/snp2.4">Snp 2.4</a>`}
              </dd>
              <dd>
                ${_`As a basis for acquiring discernment: <a class="ref" href="/an8.2">AN 8.2</a>`}
              </dd>
              <dd>
                ${_`As a basis for keeping the Dhamma alive for a long time: <a class="ref" href="/an7.56">AN 7.56</a>`}
              </dd>
              <dd>
                ${_`Is there anyone worthy of greater respect than the Buddha? <a class="ref" href="/sn6.2">SN 6.2</a>`}
              </dd>
              <dt id="restlessness">
                ${_`Restless and worry`}
              </dt>
              <dd class="description">
                ${_`<span class="translation">uddhacca-kukkucca</span>`}
              </dd>
              <dd>
                ${_`Antidote for ~: <a class="ref" href="/sn46.53">SN 46.53</a>`}
              </dd>
              <dt id="restraint">
                ${_`Restraint`}
              </dt>
              <dd class="description">
                ${_`See also <a href="#celibacy">Celibacy</a>; <a href="#moderation">Moderation</a>; <a href="#contentment">Contentment with little</a>; <a href="#nekkhamma">Nekkhamma</a> (renunciation); <a href="#sensuality">Sensuality</a>.`}
              </dd>
              <dd>
                ${_`Definition of ~: <a class="ref" href="/sn35.206">SN 35.206</a>`}
              </dd>
              <dd>
                ${_`Benefits of ~: <a class="ref" href="/dhp7">Dhp 7</a>, <a class="ref" href="/dhp9">Dhp 9</a>, <a class="ref" href="/dhp116">Dhp 116</a>, <a class="ref" href="/dhp360">Dhp 360</a>, <a class="ref" href="/dhp362">Dhp 362</a>`}
              </dd>
              <dd>
                ${_`As the best protection against harm: <a class="ref" href="/sn3.5">SN 3.5</a>`}
              </dd>
              <dd>
                ${_`As a quality that distinguishes the true contemplative: <a class="ref" href="/mn39">MN 39</a>, <a class="ref" href="/dhp391">Dhp 391</a>`}
              </dd>
              <dd>
                ${_`~ paves the way to Nibbāna: <a class="ref" href="/dhp289">Dhp 289</a>`}
              </dd>
              <dd>
                ${_`As a refuge: <a class="ref" href="/an3.52">AN 3.52</a>`}
              </dd>
              <dd>
                ${_`As a support to meditation: <a class="ref" href="/dn2">DN 2</a>`}
              </dd>
              <dd>
                ${_`Like dressing a wound: <a class="ref" href="/mn33">MN 33</a>, <a class="ref" href="/an11.18">AN 11.18</a>`}
              </dd>
              <dd>
                ${_`Like a tortoise protecting itself by withdrawing safely into its shell: <a class="ref" href="/sn35.199">SN 35.199</a>`}
              </dd>
              <dd>
                ${_`Contentment with little: <a class="ref" href="/dn11">DN 11</a>`}
              </dd>
              <dd>
                ${_`A deva encourages a monk to restrain his wandering mind: <a class="ref" href="/sn9.1">SN 9.1</a>`}
              </dd>
              <dt id="revenge">
                ${_`Revenge`}
              </dt>
              <dd>
                ${_`The story of Prince Dīghāvu: <a class="ref" href="/kd10.2.3">Kd 10.2.3–20</a>`}
              </dd>
              <dt>
                ${_`Right Action`}
              </dt>
              <dd class="description">
                ${_`See <a href="#eightfold">Noble Eightfold Path</a>.`}
              </dd>
              <dt>
                ${_`Right Immersion`}
              </dt>
              <dd class="description">
                ${_`See <a href="#eightfold">Noble Eightfold Path</a>.`}
              </dd>
              <dt>
                ${_`Right Effort`}
              </dt>
              <dd class="description">
                ${_`See <a href="#eightfold">Noble Eightfold Path</a>.`}
              </dd>
              <dt>
                ${_`Right Intention`}
              </dt>
              <dd class="description">
                ${_`See <a href="#eightfold">Noble Eightfold Path</a>.`}
              </dd>
              <dt>
                ${_`Right Livelihood`}
              </dt>
              <dd class="description">
                ${_`See <a href="#eightfold">Noble Eightfold Path</a>.`}
              </dd>
              <dt>
                ${_`Right Mindfulness`}
              </dt>
              <dd class="description">
                ${_`See <a href="#eightfold">Noble Eightfold Path</a>.`}
              </dd>
              <dt>
                ${_`Right Resolve`}
              </dt>
              <dd class="description">
                ${_`See <a href="#eightfold">Noble Eightfold Path</a>.`}
              </dd>
              <dt>
                ${_`Right Speech`}
              </dt>
              <dd class="description">
                ${_`See <a href="#eightfold">Noble Eightfold Path</a>.`}
              </dd>
              <dt>
                ${_`Right View`}
              </dt>
              <dd class="description">
                ${_`See <a href="#eightfold">Noble Eightfold Path</a>.`}
              </dd>
              <dt id="rituals">
                ${_`Rituals`}
              </dt>
              <dd class="description">
                ${_`and ceremonies. See also <a href="#devotion">Devotion</a>; <a href="#lay">Lay Buddhist practice</a>.`}
              </dd>
              <dd>
                ${_`Rites don’t purify the heart; skillful actions do: <a class="ref" href="/an10.176">AN 10.176</a>`}
              </dd>
              <dd>
                ${_`Rituals alone can’t take one beyond aging and death: <a class="ref" href="/snp5.3">Snp 5.3</a>`}
              </dd>
              <dd>
                ${_`Rites and protective charms should be avoided by lay followers: <a class="ref" href="/an5.175">AN 5.175</a>`}
              </dd>
              <dd>
                ${_`The best protection comes not from rituals but from generous, moral, and wise actions: <a class="ref" href="/kp5">Kp 5</a>`}
              </dd>
              <dd>
                ${_`Water ablutions cannot wash away one’s past bad kamma: <a class="ref" href="/thig12.1">Thig 12.1</a>`}
              </dd>
            </dl>
            <h2 id="s">
              ${_`S`}
            </h2>
            <dl>
              <dt id="sacca">
                ${_`Sacca`}
              </dt>
              <dd class="description">
                ${_`<span class="translation">truthfulness</span>. See also <a href="#parami">Pāramīs</a>.`}
              </dd>
              <dt id="saddha">
                ${_`Saddhā`}
              </dt>
              <dd class="description">
                ${_`<span class="translation">faith; conviction</span>`}
              </dd>
              <dd>
                ${_`As a factor of <a href="#stream">stream-entry</a>: <a class="ref" href="/sn55.1">SN 55.1</a>`}
              </dd>
              <dd>
                ${_`~ underlies the practice all the way to the Deathless: <a class="ref" href="/mn70">MN 70</a>`}
              </dd>
              <dd>
                ${_`Five rewards a layperson can expect for having ~: <a class="ref" href="/an5.38">AN 5.38</a>`}
              </dd>
              <dd>
                ${_`As a treasure: <a class="ref" href="/an7.6">AN 7.6</a>`}
              </dd>
              <dt id="sagga">
                ${_`Sagga`}
              </dt>
              <dd class="description">
                ${_`<span class="translation">heaven realms</span>. See also <a href="#deva">Devas</a>; <a href="#gradual">Gradual instruction</a>; <a href="#hell">Hell</a>; <a href="#kamma">Kamma</a>; <a href="#planes">Planes of Existence, Thirty-one</a>.`}
              </dd>
              <dd>
                ${_`A rare destination: <a class="ref" href="/dhp174">Dhp 174</a>`}
              </dd>
              <dd>
                ${_`Causes of rebirth in ~: <a class="ref" href="/iti71">Iti 71</a>`}
              </dd>
              <dd>
                ${_`Proper use of wealth leads to rebirth in ~: <a class="ref" href="/sn3.19">SN 3.19</a>`}
              </dd>
              <dt id="sakkaya">
                ${_`Sakkāya-diṭṭhi`}
              </dt>
              <dd class="description">
                ${_`<span class="translation">self-identity view, personality-belief</span>. See also <a href="#ditthi">Diṭṭhi</a> (views).`}
              </dd>
              <dd>
                ${_`As one of the fetters (<a href="#samyojana">Saṁyojana</a>): <a class="ref" href="/an10.13">AN 10.13</a>`}
              </dd>
              <dd>
                ${_`As one of the obsessions (<a href="#anusaya">Anusaya</a>): <a class="ref" href="/an7.11">AN 7.11</a>, <a class="ref" href="/an7.12">AN 7.12</a>`}
              </dd>
              <dd>
                ${_`Like grabbing hold of a branch with a sticky hand: <a class="ref" href="/an4.178">AN 4.178</a>`}
              </dd>
              <dd>
                ${_`How ~ comes about: <a class="ref" href="/mn109">MN 109</a>`}
              </dd>
              <dd>
                ${_`How to develop ~: <a class="ref" href="/mn148">MN 148</a>`}
              </dd>
              <dd>
                ${_`How to relinquish ~: <a class="ref" href="/mn148">MN 148</a>`}
              </dd>
              <dd>
                ${_`What is the origin of self-view? <a class="ref" href="/sn41.3">SN 41.3</a>`}
              </dd>
              <dd>
                ${_`Identifying the five <a href="#khandha">khandhas</a> as “self” is the cause of affliction: <a class="ref" href="/sn22.1">SN 22.1</a>`}
              </dd>
              <dt id="salayatana">
                ${_`Saḷāyatana`}
              </dt>
              <dd class="description">
                ${_`<span class="translation">the six sense fields</span>. See also <a href="#ps">Paṭicca-samuppāda</a> (dependent origination); <a href="#sensuality">Sensuality</a>.`}
              </dd>
              <dd>
                ${_`Relation between the ~ and the emotions: <a class="ref" href="/mn137">MN 137</a>`}
              </dd>
              <dd>
                ${_`Understanding of ~ as a basis for Right View: <a class="ref" href="/mn9">MN 9</a>`}
              </dd>
              <dd>
                ${_`Contemplation of ~ in terms of not-self: <a class="ref" href="/mn148">MN 148</a>`}
              </dd>
              <dd>
                ${_`Why desire and passion connected with the ~ is worth abandoning: <a class="ref" href="/sn27.1">SN 27.1</a>`}
              </dd>
              <dd>
                ${_`How becoming consummate in the ~ leads to Awakening: <a class="ref" href="/sn35.153">SN 35.153</a>`}
              </dd>
              <dd>
                ${_`See the suttas in the Saḷāyatana-saṁyutta of the Saṁyutta Nikāya.`}
              </dd>
              <dt id="samadhi">
                ${_`Samādhi`}
              </dt>
              <dd class="description">
                ${_`<span class="translation">immersion, coalescence, convergence, oneness</span>. Often mistranslated as “concentration”. See also <a href="#jhana">Jhāna</a>; <a href="#samatha">Samatha</a> (tranquillity, calm).`}
              </dd>
              <dd>
                ${_`~ is to be developed in all postures: <a class="ref" href="/iti111">Iti 111</a>`}
              </dd>
              <dd>
                ${_`~ is a progressive practice: <a class="ref" href="/mn66">MN 66</a>`}
              </dd>
              <dd>
                ${_`Five-factored noble ~: <a class="ref" href="/an5.28">AN 5.28</a>`}
              </dd>
              <dd>
                ${_`Not every state of ~ is wholesome: <a class="ref" href="/mn108">MN 108</a>`}
              </dd>
              <dd>
                ${_`Five realizations that arise from ~ based on the Brahmavihāra (sublime states): <a class="ref" href="/an5.27">AN 5.27</a>`}
              </dd>
              <dd>
                ${_`How ~ leads to discernment: <a class="ref" href="/sn22.5">SN 22.5</a>`}
              </dd>
              <dd>
                ${_`Which comes first: ~ or wisdom? <a class="ref" href="/an3.73">AN 3.73</a>`}
              </dd>
              <dd>
                ${_`Four developments of ~: <a class="ref" href="/an4.41">AN 4.41</a>`}
              </dd>
              <dt id="samatha">
                ${_`Samatha`}
              </dt>
              <dd class="description">
                ${_`<span class="translation">tranquillity, calm</span>. See also <a href="#samadhi">Samādhi</a> (immersion); <a href="#vipassana">Vipassanā</a> (insight).`}
              </dd>
              <dd>
                ${_`~ is developed in tandem with <i>vipassanā</i> (insight): <a class="ref" href="/sn35.205">SN 35.205</a>, <a class="ref" href="/an2.30">AN 2.30</a>, <a class="ref" href="/an4.170">AN 4.170</a>, <a class="ref" href="/an10.71">AN 10.71</a>`}
              </dd>
              <dt id="sammappadhana">
                ${_`Sammāppadhāna`}
              </dt>
              <dd class="description">
                ${_`<span class="translation">the four right exertions</span>. See also <a href="#bodhipakkhiya-dhamma">Bodhipakkhiya-dhamma</a>; <a href="#viriya">Viriya</a> (persistence, effort).`}
              </dd>
              <dt id="sampajanna">
                ${_`Sampajañña`}
              </dt>
              <dd class="description">
                ${_`<span class="translation">situational awarenes, alertness, clear comprehension</span>`}
              </dd>
              <dd>
                ${_`As a component of mindfulness: <a class="ref" href="/sn48.10">SN 48.10</a>`}
              </dd>
              <dt id="samsara">
                ${_`Saṁsāra`}
              </dt>
              <dd class="description">
                ${_`<span class="translation">the round of rebirth</span>. See also <a href="#kamma">Kamma</a> (intentional action); <a href="#ps">Paṭicca-samuppāda</a> (dependent origination); <a href="#planes">Planes of Existence, Thirty-one</a>.`}
              </dd>
              <dd>
                ${_`Lasts long for fools: <a class="ref" href="/dhp60">Dhp 60</a>`}
              </dd>
              <dd>
                ${_`Four causes of our long journey in ~: <a class="ref" href="/an4.1">AN 4.1</a>`}
              </dd>
              <dd>
                ${_`All the blood we have shed in ~: <a class="ref" href="/sn15.13">SN 15.13</a>`}
              </dd>
              <dd>
                ${_`All the tears we have shed in ~: <a class="ref" href="/sn15.3">SN 15.3</a>`}
              </dd>
              <dd>
                ${_`We have suffered hardship in past times: <a class="ref" href="/sn15.11">SN 15.11</a>`}
              </dd>
              <dd>
                ${_`We have enjoyed happiness in past times: <a class="ref" href="/sn15.12">SN 15.12</a>`}
              </dd>
              <dd>
                ${_`We wander from birth to birth, as a falling stick sometimes lands on its side, sometimes on its end: <a class="ref" href="/sn15.9">SN 15.9</a>`}
              </dd>
              <dd>
                ${_`Is a difficult path: <a class="ref" href="/dhp414">Dhp 414</a>`}
              </dd>
              <dd>
                ${_`The preciousness of our human birth: <a class="ref" href="/sn20.2">SN 20.2</a>, <a class="ref" href="/sn56.48">SN 56.48</a>`}
              </dd>
              <dd>
                ${_`See the suttas from the Saṁyutta Nikāya on the topic of Saṁsāra.`}
              </dd>
              <dt id="samvega">
                ${_`Saṁvega`}
              </dt>
              <dd class="description">
                ${_`<span class="translation">spiritual urgency</span>. See also <a href="#death">Death</a>; <a href="#pasada">Pasāda</a>.`}
              </dd>
              <dd>
                ${_`Danger #1—death threatens from all sides: <a class="ref" href="/an5.77">AN 5.77</a>`}
              </dd>
              <dd>
                ${_`Danger #2—the conditions for practice may never again be so good: <a class="ref" href="/an5.78">AN 5.78</a>`}
              </dd>
              <dd>
                ${_`Danger #3—there may not always be good teachers around: <a class="ref" href="/an5.79">AN 5.79</a>`}
              </dd>
              <dd>
                ${_`Danger #4—the Saṅgha may someday decline: <a class="ref" href="/an5.80">AN 5.80</a>`}
              </dd>
              <dd>
                ${_`Who knows?—tomorrow, death may come: <a class="ref" href="/mn131">MN 131</a>`}
              </dd>
              <dd>
                ${_`A call to wake up: <a class="ref" href="/snp2.10">Snp 2.10</a>`}
              </dd>
              <dd>
                ${_`Death is crashing in on you, like a huge mountain: <a class="ref" href="/sn3.25">SN 3.25</a>`}
              </dd>
              <dd>
                ${_`Three urgent duties for meditators: <a class="ref" href="/an3.91">AN 3.91</a>`}
              </dd>
              <dt id="sangha">
                ${_`Saṅgha`}
              </dt>
              <dd class="description">
                ${_`<span class="translation">1. Monastic community; 2. Community of Noble (Awakened) Ones</span>. See also <a href="#monastic">Monastic life</a>; <a href="#tiratana">Tiratana</a> (Triple Gem).`}
              </dd>
              <dd>
                ${_`Seven conditions for no decline of the Saṅgha: <a class="ref" href="/an7.21">AN 7.21</a>`}
              </dd>
              <dd>
                ${_`Concord in the Saṅgha: <a class="ref" href="/iti19">Iti 19</a>`}
              </dd>
              <dd>
                ${_`Saṅgha members are dependent on the lay community: <a class="ref" href="/iti107">Iti 107</a>`}
              </dd>
              <dd>
                ${_`As one of the ten Recollections: See <a href="#recollections">Recollections, ten</a>.`}
              </dd>
              <dt id="sankhara">
                ${_`Saṅkhāra`}
              </dt>
              <dd class="description">
                ${_`<span class="translation">choices, intentions, acts, conditions, causes</span>. See also <a href="#khandha">Khandha</a> (clinging-aggregates); <a href="#ps">Paṭicca-samuppāda</a> (dependent origination).`}
              </dd>
              <dd>
                ${_`Understanding of ~ as a basis for Right View: <a class="ref" href="/mn9">MN 9</a>`}
              </dd>
              <dt id="sanyojana">
                ${_`Saṁyojana`}
              </dt>
              <dd class="description">
                ${_`<span class="translation">fetter</span>`}
              </dd>
              <dd>
                ${_`Listed: <a class="ref" href="/an10.13">AN 10.13</a>`}
              </dd>
              <dt id="sanna">
                ${_`Saññā`}
              </dt>
              <dd class="description">
                ${_`<span class="translation">perception, naming, labeling</span>. See also <a href="#khandha">Khandha</a> (clinging-aggregates).`}
              </dd>
              <dd>
                ${_`Four erroneous perceptions that keep you trapped in Saṁsāra: <a class="ref" href="/an4.49">AN 4.49</a>`}
              </dd>
              <dd>
                ${_`Six important aspects of ~ to be understood: <a class="ref" href="/an6.63">AN 6.63</a>`}
              </dd>
              <dd>
                ${_`Why desire and passion connected with ~ is worth abandoning: <a class="ref" href="/sn27.6">SN 27.6</a>`}
              </dd>
              <dt id="sati">
                ${_`Sati`}
              </dt>
              <dd class="description">
                ${_`<span class="translation">mindfulness</span>. See also <a href="#meditation">Meditation</a>; <a href="#satipatthana">Satipaṭṭhāna</a>.`}
              </dd>
              <dd>
                ${_`The Buddha praises Ven. Cula Panthaka’s mindfulness: <a class="ref" href="/ud5.10">Ud 5.10</a>`}
              </dd>
              <dd>
                ${_`Definition of ~: <a class="ref" href="/sn48.10">SN 48.10</a>`}
              </dd>
              <dd>
                ${_`As a quality of a great person: <a class="ref" href="/an8.30">AN 8.30</a>`}
              </dd>
              <dt id="satipatthana">
                ${_`Satipaṭṭhāna`}
              </dt>
              <dd class="description">
                ${_`<span class="translation">kinds of mindfulness meditation; foundations or establishments of mindfulness</span>. See also <a href="#anapanasati">Ānāpānassati</a> (mindfulness of breathing); <a href="#bodhipakkhiya-dhamma">Bodhipakkhiya-dhamma</a>; <a href="#kayagatasati">kāyagatāsati</a> (mindfulness of the body); <a href="#maranassati">Maraṇassati</a> (mindfulness of death); <a href="#sati">Sati</a> (mindfulness).`}
              </dd>
              <dd>
                ${_`See the suttas in the Satipaṭṭhāna-saṁyutta of the Saṁyutta Nikāya`}
              </dd>
              <dd>
                ${_`As a basis for the development of jhāna: <a class="ref" href="/an8.63">AN 8.63</a>`}
              </dd>
              <dd>
                ${_`Satipaṭṭhāna Sutta (The Discourse on the Kinds of Mindfulness Meditation <a class="ref" href="/mn10">MN 10</a>)`}
              </dd>
              <dt>
                ${_`Seclusion`}
              </dt>
              <dd class="description">
                ${_`See <a href="#viveka">Viveka</a>.`}
              </dd>
              <dt>
                ${_`Self-view`}
              </dt>
              <dd class="description">
                ${_`See <a href="#sakkaya">Sakkāya-diṭṭhi</a>.`}
              </dd>
              <dt id="sensuality">
                ${_`Sensuality`}
              </dt>
              <dd class="description">
                ${_`See also <a href="#asubha">Asubha</a> (unattractiveness, loathsomeness); <a href="#body">Body</a>; <a href="#nekkhamma">Nekkhamma</a> (renunciation); <a href="#pleasure">Pleasure</a>; <a href="#restraint">Restraint</a>; <a href="#salayatana">Saḷāyatana</a> (six sense-media); <a href="#upadana">Upādāna</a> (clinging).`}
              </dd>
              <dd>
                ${_`As a yoke: <a class="ref" href="/an4.10">AN 4.10</a>`}
              </dd>
              <dd>
                ${_`As a flood: <a class="ref" href="/sn45.171">SN 45.171</a>`}
              </dd>
              <dd>
                ${_`The allures and drawbacks of ~: <a class="ref" href="/mn13">MN 13</a>`}
              </dd>
              <dd>
                ${_`Dangers of: <a class="ref" href="/mn45">MN 45</a>`}
              </dd>
              <dd>
                ${_`What’s wrong with sensual pleasures? <a class="ref" href="/sn5.6">SN 5.6</a>`}
              </dd>
              <dd>
                ${_`Like falling into debt: <a class="ref" href="/an6.45">AN 6.45</a>`}
              </dd>
              <dd>
                ${_`Be careful with ~ as you would a venomous snake: <a class="ref" href="/snp4.1">Snp 4.1</a>`}
              </dd>
              <dd>
                ${_`Clinging to sense-pleasures is a fetter: <a class="ref" href="/ud7.3">Ud 7.3</a>`}
              </dd>
              <dd>
                ${_`Like a fish caught in a trap: <a class="ref" href="/ud7.4">Ud 7.4</a>`}
              </dd>
              <dd>
                ${_`Like a suckling calf dependent on its mother: <a class="ref" href="/ud7.4">Ud 7.4</a>`}
              </dd>
              <dd>
                ${_`Renouncing ~ brings an even higher happiness: <a class="ref" href="/ud3.2">Ud 3.2</a>`}
              </dd>
              <dd>
                ${_`Six important aspects of ~ to be understood: <a class="ref" href="/an6.63">AN 6.63</a>`}
              </dd>
              <dd>
                ${_`Ānanda’s advice to Vaṅgīsa on overcoming lust: <a class="ref" href="/thag21">Thag 21</a>`}
              </dd>
              <dd>
                ${_`The source of ~ lies in the mind’s passionate response to sense-objects, not in the objects themselves: <a class="ref" href="/an6.63">AN 6.63</a>`}
              </dd>
              <dt id="separation">
                ${_`Separation from what is dear and appealing`}
              </dt>
              <dd class="description">
                ${_`See also <a href="#dukkha">Dukkha</a>.`}
              </dd>
              <dt id="sex">
                ${_`Sexual intercourse`}
              </dt>
              <dd class="description">
                ${_`See also <a href="#sensuality">Sensuality</a>.`}
              </dd>
              <dd>
                ${_`~ is to be abandoned: <a class="ref" href="/an4.159">AN 4.159</a>`}
              </dd>
              <dt id="wrongsex">
                ${_`Sexual misconduct`}
              </dt>
              <dd class="description">
                ${_`See also <a href="#precepts">Precepts</a>; <a href="#sila">Sīla</a>.`}
              </dd>
              <dd>
                ${_`As a cause of one’s downfall: <a class="ref" href="/dhp309">Dhp 309</a>`}
              </dd>
              <dd>
                ${_`Causes of promiscuity: <a class="ref" href="/an2.9">AN 2.9</a>`}
              </dd>
              <dt>
                ${_`Shame (moral)`}
              </dt>
              <dd class="description">
                ${_`See <a href="#hiri">Hiri</a>.`}
              </dd>
              <dt id="sickness">
                ${_`Sickness`}
              </dt>
              <dd class="description">
                ${_`See <a href="#illness">Illness</a>.`}
              </dd>
              <dt id="sila">
                ${_`Sīla`}
              </dt>
              <dd class="description">
                ${_`<span class="translation">virtue; morality; ethics; behavior</span>. See also <a href="#gradual">Gradual instruction</a>; <a href="#manners">Manners</a>; <a href="#parami">Pāramīs</a>; <a href="#precepts">Precepts</a>; <a href="#uposatha">Uposatha</a>.`}
              </dd>
              <dd>
                ${_`If you truly care about your welfare, then develop your inner goodness: <a class="ref" href="/sn3.4">SN 3.4</a>`}
              </dd>
              <dd>
                ${_`As the foundation upon which the entire path is built: <a class="ref" href="/an11.1">AN 11.1</a>, <a class="ref" href="/an11.2">AN 11.2</a>`}
              </dd>
              <dd>
                ${_`As a quality that distinguishes the true contemplative: <a class="ref" href="/mn39">MN 39</a>`}
              </dd>
              <dd>
                ${_`As one of the ten Recollections: see <a href="#recollections">Recollections, ten</a>.`}
              </dd>
              <dd>
                ${_`As a treasure: <a class="ref" href="/an7.6">AN 7.6</a>`}
              </dd>
              <dd>
                ${_`Guard your ~ well: <a class="ref" href="/iti76">Iti 76</a>`}
              </dd>
              <dd>
                ${_`The Buddha’s instructions to his young son: <a class="ref" href="/mn61">MN 61</a>`}
              </dd>
              <dd>
                ${_`Sāriputta’s teachings to a dying Anāthapiṇḍika: <a class="ref" href="/mn143">MN 143</a>`}
              </dd>
              <dd>
                ${_`Admirable ~: <a class="ref" href="/iti97">Iti 97</a>`}
              </dd>
              <dd>
                ${_`How to recognize a virtuous person: <a class="ref" href="/an4.192">AN 4.192</a>, <a class="ref" href="/ud6.2">Ud 6.2</a>`}
              </dd>
              <dd>
                ${_`How to recognize a wise person: <a class="ref" href="/an3.2">AN 3.2</a>`}
              </dd>
              <dd>
                ${_`The layperson’s code of conduct: <a class="ref" href="/dn31">DN 31</a>`}
              </dd>
              <dd>
                ${_`Development of ~ as a way to ease the inevitable bad results of one’s past bad deeds: <a class="ref" href="/sn42.8">SN 42.8</a>`}
              </dd>
              <dd>
                ${_`Results of transgressing the precepts: <a class="ref" href="/an8.40">AN 8.40</a>`}
              </dd>
              <dd>
                ${_`Rewards of observing the precepts: <a class="ref" href="/an8.39">AN 8.39</a>`}
              </dd>
              <dd>
                ${_`Rewards of skillful conduct; drawbacks of unskillful conduct: <a class="ref" href="/an2.18">AN 2.18</a>`}
              </dd>
              <dd>
                ${_`Standards of ~ for contemplatives: <a class="ref" href="/dn2">DN 2</a>`}
              </dd>
              <dd>
                ${_`Claiming to be enlightened does not justify unrestrained behavior: <a class="ref" href="/mn105">MN 105</a>`}
              </dd>
              <dd>
                ${_`Heightened ~ (<i>adhisīla</i>): <a class="ref" href="/an3.88">AN 3.88</a>`}
              </dd>
              <dt>
                ${_`Simplicity.`}
              </dt>
              <dd>
                ${_`As a quality of a great person: <a class="ref" href="/an8.30">AN 8.30</a>`}
              </dd>
              <dt id="sleep">
                ${_`Sleep`}
              </dt>
              <dd class="description">
                ${_`See also <a href="#sloth">Sloth and Drowsiness</a> (thīna-middha).`}
              </dd>
              <dd>
                ${_`How to get a good night’s ~: <a class="ref" href="/sn10.8">SN 10.8</a>, <a class="ref" href="/an3.34">AN 3.34</a>, <a class="ref" href="/an11.16">AN 11.16</a>, <a class="ref" href="/dhp79">Dhp 79</a>, <a class="ref" href="/dhp168">Dhp 168</a>`}
              </dd>
              <dt id="sleepiness">
                ${_`Sleepiness`}
              </dt>
              <dd class="description">
                ${_`See <a href="#sloth">Sloth and Drowsiness</a> (thīna-middha).`}
              </dd>
              <dt id="sloth">
                ${_`Sloth and Drowsiness`}
              </dt>
              <dd class="description">
                ${_`<span class="translation">thīna-middha</span>. See also <a href="#nivarana">Nīvaraṇa</a> (hindrances); <a href="#sleep">Sleep</a>; <a href="#viriya">Viriya</a> (effort).`}
              </dd>
              <dd>
                ${_`Antidote for ~ in meditation: <a class="ref" href="/sn46.53">SN 46.53</a>, <a class="ref" href="/an7.58">AN 7.58</a>`}
              </dd>
              <dd>
                ${_`The eight grounds for laziness: <a class="ref" href="/an8.80">AN 8.80</a>`}
              </dd>
              <dd>
                ${_`Excuses: “It’s too cold to meditate. It’s too hot… It’s too…”: <a class="ref" href="/thag3.5">Thag 3.5</a>`}
              </dd>
              <dd>
                ${_`As an obstruction to Awakening: <a class="ref" href="/iti34">Iti 34</a>`}
              </dd>
              <dt id="smile">
                ${_`Smile`}
              </dt>
              <dd>
                ${_`What makes the Buddha ~: <a class="ref" href="/an5.180">AN 5.180</a>, <a class="ref" href="/thag12.2">Thag 12.2</a>`}
              </dd>
              <dt id="social">
                ${_`Social Action`}
              </dt>
              <dd>
                ${_`The Buddha attends to a monk with dysentery: <a class="ref" href="/kd8.26.1">Kd 8.26.1–8</a>`}
              </dd>
              <dd>
                ${_`How a layperson can best work for the welfare of others: <a class="ref" href="/an8.26">AN 8.26</a>, <a class="ref" href="/an4.99">AN 4.99</a>`}
              </dd>
              <dt>
                ${_`Solitude`}
              </dt>
              <dd class="description">
                ${_`See <a href="#viveka">Viveka</a>.`}
              </dd>
              <dt>
                ${_`<i>Speech</i>`}
              </dt>
              <dd class="description">
                ${_`See also <a href="#listen">Listening</a>; <a href="#silence">Noble silence</a>; “Right Speech” in <a href="#eightfold">Noble Eightfold Path</a>.`}
              </dd>
              <dd>
                ${_`The definition: <a class="ref" href="/sn45.8">SN 45.8</a>`}
              </dd>
              <dd>
                ${_`Speak only words that do no harm: <a class="ref" href="/thag21">Thag 21</a>`}
              </dd>
              <dd>
                ${_`Self-purification through well-chosen speech: <a class="ref" href="/an10.176">AN 10.176</a>`}
              </dd>
              <dd>
                ${_`Its relation to the other factors of the path: <a class="ref" href="/mn117">MN 117</a>`}
              </dd>
              <dd>
                ${_`The criteria for deciding what is worth saying: <a class="ref" href="/mn58">MN 58</a>, <a class="ref" href="/snp3.3">Snp 3.3</a>`}
              </dd>
              <dd>
                ${_`Reflect on your speech, before, during, and after speaking: <a class="ref" href="/mn61">MN 61</a>`}
              </dd>
              <dd>
                ${_`Kinds of speech to be avoided by contemplatives: <a class="ref" href="/dn2">DN 2</a>, <a class="ref" href="/sn56.9">SN 56.9</a>`}
              </dd>
              <dd>
                ${_`How to admonish another skillfully: <a class="ref" href="/an10.44">AN 10.44</a>`}
              </dd>
              <dd>
                ${_`The criteria for determining whether something should be said: <a class="ref" href="/mn58">MN 58</a>`}
              </dd>
              <dd>
                ${_`Five aspects of suitable ~: <a class="ref" href="/mn21">MN 21</a>`}
              </dd>
              <dd>
                ${_`Five keys to blameless ~: <a class="ref" href="/an5.198">AN 5.198</a>`}
              </dd>
              <dd>
                ${_`Ten kinds of praiseworthy ~: <a class="ref" href="/an10.70">AN 10.70</a>`}
              </dd>
              <dd>
                ${_`Four ways to answer a question: <a class="ref" href="/an4.42">AN 4.42</a>`}
              </dd>
              <dd>
                ${_`Lying is to be avoided: <a class="ref" href="/iti25">Iti 25</a>`}
              </dd>
              <dd>
                ${_`Sensual desire is usually the motive behind telling lies: <a class="ref" href="/sn3.7">SN 3.7</a>`}
              </dd>
              <dd>
                ${_`The nature of well-spoken ~: <a class="ref" href="/snp3.3">Snp 3.3</a>`}
              </dd>
              <dd>
                ${_`The results of various kinds of wrong ~: <a class="ref" href="/an8.40">AN 8.40</a>`}
              </dd>
              <dd>
                ${_`Right ~ does not mean total frankness or openness: <a class="ref" href="/an4.183">AN 4.183</a>`}
              </dd>
              <dd>
                ${_`Ten topics of proper conversation: <a class="ref" href="/an10.69">AN 10.69</a>`}
              </dd>
              <dd>
                ${_`Either speak Dhamma, or keep noble silence: <a class="ref" href="/ud2.2">Ud 2.2</a>`}
              </dd>
              <dt id="stream">
                ${_`Stream-entry`}
              </dt>
              <dd class="description">
                ${_`<span class="translation">sotapatti</span>. See also <a href="#nibbana">Nibbāna</a>; <a href="#lay">Lay Buddhist Practice</a> (for examples of lay stream-winners); <a href="#wiseperson">Wise person</a>.`}
              </dd>
              <dd>
                ${_`Better than ruling the world or going to heaven: <a class="ref" href="/sn55.1">SN 55.1</a>, <a class="ref" href="/dhp178">Dhp 178</a>`}
              </dd>
              <dd>
                ${_`Six rewards of ~: <a class="ref" href="/an6.97">AN 6.97</a>`}
              </dd>
              <dd>
                ${_`Upon ~, one does away with a vast amount of suffering: <a class="ref" href="/sn13.1">SN 13.1</a>, <a class="ref" href="/sn13.2">SN 13.2</a>, <a class="ref" href="/sn13.8">SN 13.8</a>`}
              </dd>
              <dd>
                ${_`Like a thirsty traveler looking into a well: <a class="ref" href="/sn12.68">SN 12.68</a>`}
              </dd>
              <dd>
                ${_`How to recognize a lay stream-winner: <a class="ref" href="/an5.179">AN 5.179</a>`}
              </dd>
              <dd>
                ${_`The kind of conviction and discernment required to attain ~: <a class="ref" href="/sn35.1">SN 35.1–10</a>`}
              </dd>
              <dd>
                ${_`What it takes for a layperson to become a stream-winner: <a class="ref" href="/an10.92">AN 10.92</a>`}
              </dd>
              <dd>
                ${_`How appropriate attention (<i>yoniso manasikāra</i>) leads to ~: <a class="ref" href="/sn22.122">SN 22.122</a>`}
              </dd>
              <dd>
                ${_`The four factors of ~ (and their variations): <a class="ref" href="/sn55.30">SN 55.30</a>, <a class="ref" href="/sn55.31">SN 55.31</a>, <a class="ref" href="/sn55.32">SN 55.32</a>, <a class="ref" href="/sn55.33">SN 55.33</a>, <a class="ref" href="/an10.92">AN 10.92</a>`}
              </dd>
              <dd>
                ${_`How to recognize—and become—a person of integrity: <a class="ref" href="/mn110">MN 110</a>`}
              </dd>
              <dd>
                ${_`Why doubt does not arise in a stream-winner: <a class="ref" href="/an7.51">AN 7.51</a>`}
              </dd>
              <dd>
                ${_`The teaching that led Ven. Ānanda to ~: <a class="ref" href="/sn22.83">SN 22.83</a>`}
              </dd>
              <dt id="suicide">
                ${_`Suicide`}
              </dt>
              <dd class="description">
                ${_`See also <a href="#death">Death</a>.`}
              </dd>
              <dd>
                ${_`Sappadasa chooses life: <a class="ref" href="/thag6.6">Thag 6.6</a>`}
              </dd>
              <dt id="supranormal">
                ${_`Supranormal powers`}
              </dt>
              <dd>
                ${_`Is the development of ~ a prerequisite for enlightenment? <a class="ref" href="/sn12.70">SN 12.70</a>`}
              </dd>
              <dd>
                ${_`Clairaudience: <a class="ref" href="/dn2">DN 2</a>, <a class="ref" href="/dn11">DN 11</a>`}
              </dd>
              <dd>
                ${_`Ending of the taints/defilements (<a href="#asava">Āsava</a>): <a class="ref" href="/dn2">DN 2</a>,<a class="ref" href="/dn11">DN 11</a>`}
              </dd>
              <dd>
                ${_`Mind-reading: <a class="ref" href="/dn2">DN 2</a>, <a class="ref" href="/dn11">DN 11</a>, <a class="ref" href="/an3.60">AN 3.60</a>`}
              </dd>
              <dd>
                ${_`Passing away and reappearance of beings: <a class="ref" href="/dn2">DN 2</a>, <a class="ref" href="/dn11">DN 11</a>`}
              </dd>
              <dd>
                ${_`Recollection of past lives: <a class="ref" href="/dn2">DN 2</a>, <a class="ref" href="/dn11">DN 11</a>`}
              </dd>
              <dd>
                ${_`As a miracle: <a class="ref" href="/an3.60">AN 3.60</a>`}
              </dd>
              <dd>
                ${_`As the fruit of five-factored noble concentration: <a class="ref" href="/an5.28">AN 5.28</a>`}
              </dd>
              <dd>
                ${_`How to reduce a pile of wood to its constituent elements: <a class="ref" href="/an6.41">AN 6.41</a>`}
              </dd>
              <dd>
                ${_`Drawbacks of ~: <a class="ref" href="/dn11">DN 11</a>`}
              </dd>
              <dd>
                ${_`A monk displays his ~: <a class="ref" href="/sn41.4">SN 41.4</a>`}
              </dd>
              <dd>
                ${_`Beware: you can’t hide from those with ~: <a class="ref" href="/an3.40">AN 3.40</a>`}
              </dd>
            </dl>
            <h2 id="t">
              ${_`T`}
            </h2>
            <dl>
              <dt>
                ${_`Taints`}
              </dt>
              <dd class="description">
                ${_`See <a href="#asava">Āsava</a>.`}
              </dd>
              <dt id="tanha">
                ${_`Taṇhā`}
              </dt>
              <dd class="description">
                ${_`<span class="translation">craving</span>. See also <a href="#kilesa">Kilesa</a> (defilements); <a href="#ps">Paṭicca-samuppāda</a> (dependent origination); <a href="#sensuality">Sensuality</a>.`}
              </dd>
              <dd>
                ${_`As a motivation for practice: <a class="ref" href="/an4.159">AN 4.159</a>`}
              </dd>
              <dd>
                ${_`Understanding of ~ as a basis for Right View: <a class="ref" href="/mn9">MN 9</a>`}
              </dd>
              <dd>
                ${_`As a fetter: <a class="ref" href="/iti15">Iti 15</a>`}
              </dd>
              <dd>
                ${_`Abandoning ~ for what one holds dear: <a class="ref" href="/snp5.8">Snp 5.8</a>`}
              </dd>
              <dd>
                ${_`The many kinds of thoughts motivated by ~: <a class="ref" href="/an4.199">AN 4.199</a>`}
              </dd>
              <dd>
                ${_`~ causes your thoughts to be influenced by the opinions of others: <a class="ref" href="/an4.200">AN 4.200</a>`}
              </dd>
              <dd>
                ${_`See the verses in the Dhammapada on craving.`}
              </dd>
              <dd>
                ${_`Why desire and passion connected with ~ is worth abandoning: <a class="ref" href="/sn27.8">SN 27.8</a>`}
              </dd>
              <dt id="teaching">
                ${_`Teaching the Dhamma`}
              </dt>
              <dd class="description">
                ${_`See also <a href="#kalyanamittata">Kalyanamittata</a>.`}
              </dd>
              <dd>
                ${_`The Buddha teaches only <i>dukkha</i> and its cessation: <a class="ref" href="/mn22">MN 22</a>`}
              </dd>
              <dd>
                ${_`The Buddha’s simile on ~: <a class="ref" href="/sn22.84">SN 22.84</a>`}
              </dd>
              <dd>
                ${_`Three kinds of mindfulness meditation for becoming a fit teacher: <a class="ref" href="/mn137">MN 137</a>`}
              </dd>
              <dd>
                ${_`Ven. Isidatta wisely declines a teaching invitation from his elders: <a class="ref" href="/sn41.3">SN 41.3</a>`}
              </dd>
              <dd>
                ${_`How to teach Dhamma: <a class="ref" href="/an4.111">AN 4.111</a>`}
              </dd>
              <dd>
                ${_`Meditators and Dhamma scholars: Do not disparage each other!: <a class="ref" href="/an6.46">AN 6.46</a>`}
              </dd>
              <dd>
                ${_`Don’t teach what you don’t know: <a class="ref" href="/an10.24">AN 10.24</a>`}
              </dd>
              <dd>
                ${_`The Buddha doesn’t hold back any esoteric teachings: <a class="ref" href="/dn16">DN 16</a>`}
              </dd>
              <dd>
                ${_`A skilled teacher is like a ferry-man: <a class="ref" href="/snp2.8">Snp 2.8</a>`}
              </dd>
              <dd>
                ${_`Dhamma should not be taught for the purpose of material reward: <a class="ref" href="/an5.159">AN 5.159</a>`}
              </dd>
              <dd>
                ${_`Five prerequisites to teaching the Dhamma to others: <a class="ref" href="/an5.159">AN 5.159</a>`}
              </dd>
              <dd>
                ${_`Teaching alone doesn’t mean you’re truly committed to the Dhamma: <a class="ref" href="/an5.73">AN 5.73</a>`}
              </dd>
              <dd>
                ${_`How to recognize authentic teachings: <a class="ref" href="/an3.72">AN 3.72</a>, <a class="ref" href="/an7.79">AN 7.79</a>, <a class="ref" href="/an8.53">AN 8.53</a>`}
              </dd>
              <dd>
                ${_`Examples of lay Dhamma teachers: Anāthapiṇḍika (<a class="ref" href="/an10.93">AN 10.93</a>); Citta (<a class="ref" href="/sn41.7">SN 41.7</a>)`}
              </dd>
              <dd>
                ${_`How to choose—and learn from—a teacher: <a class="ref" href="/mn95">MN 95</a>`}
              </dd>
              <dd>
                ${_`How to recognize a teacher: <a class="ref" href="/an4.192">AN 4.192</a>`}
              </dd>
              <dd>
                ${_`Three kinds of Dhamma teachers: <a class="ref" href="/dn12">DN 12</a>`}
              </dd>
              <dd>
                ${_`Dhamma teaching compared to medical treatment: <a class="ref" href="/an3.22">AN 3.22</a>`}
              </dd>
              <dd>
                ${_`The Buddha asks who is his teacher: <a class="ref" href="/dhp353">Dhp 353</a>`}
              </dd>
              <dt id="tevijja">
                ${_`Tevijjā`}
              </dt>
              <dd class="description">
                ${_`<span class="translation">Threefold knowledge realized by the Buddha during his Awakening</span>. See also <a href="#buddha">Buddha.</a>`}
              </dd>
              <dd>
                ${_`Descriptions of ~: <a class="ref" href="/mn19">MN 19</a>, <a class="ref" href="/mn125">MN 125</a>`}
              </dd>
              <dd>
                ${_`What makes one a <i>true</i> brahman: <a class="ref" href="/iti99">Iti 99</a>`}
              </dd>
              <dd>
                ${_`Various monks and nuns realize the ~: <a class="ref" href="/sn35.88">SN 35.88</a> (Ven. Punna), <a class="ref" href="/an8.30">AN 8.30</a> (Ven. Anuruddha), <a class="ref" href="/thag5.1">Thag 5.1</a> (Ven. Rājadatta), <a class="ref" href="/thag6.6">Thag 6.6</a> (Ven. Sappadasa), <a class="ref" href="/thag7.1">Thag 7.1</a> (Ven. Sundara Samudda), <a class="ref" href="/thig5.11">Thig 5.11</a> (Ven. Sister Paṭacāra), <a class="ref" href="/thig5.12">Thig 5.12</a> (Ven. Sister Candā), <a class="ref" href="/ud3.3">Ud 3.3</a> (500 monks)`}
              </dd>
              <dt>
                ${_`Thinking`}
              </dt>
              <dd class="description">
                ${_`See <a href="#thought">Thought</a>.`}
              </dd>
              <dt id="thought">
                ${_`Thought`}
              </dt>
              <dd>
                ${_`Habitual ways of thinking: <a class="ref" href="/mn19">MN 19</a>`}
              </dd>
              <dd>
                ${_`Three kinds of unskillful ~: <a class="ref" href="/iti87">Iti 87</a>`}
              </dd>
              <dd>
                ${_`Three kinds of skillful ~: <a class="ref" href="/iti87">Iti 87</a>`}
              </dd>
              <dt>
                ${_`Distracting thoughts.`}
              </dt>
              <dd>
                ${_`How to overcome speculative thinking: <a class="ref" href="/sn5.10">SN 5.10</a>`}
              </dd>
              <dd>
                ${_`The Relaxation of Thoughts (Vitakkasaṇṭhāna Sutta, <a class="ref" href="/mn20">MN 20</a>)`}
              </dd>
              <dt id="tilakkhana">
                ${_`Tilakkhaṇa`}
              </dt>
              <dd class="description">
                ${_`<span class="translation">the three characteristics of existence</span>. See also <a href="#vipassana">Vipassanā</a> (insight).`}
              </dd>
              <dt>
                ${_`See each one individually:`}
              </dt>
              <dd>
                ${_`<a href="#anicca">Anicca</a> (impermanence)`}
              </dd>
              <dd>
                ${_`<a href="#dukkha">Dukkha</a> (unsatisfactoriness)`}
              </dd>
              <dd>
                ${_`<a href="#anatta">Anattā</a> (not-self)`}
              </dd>
              <dd>
                ${_`As marking the path to Awakening: <a class="ref" href="/dhp277">Dhp 277–9</a>`}
              </dd>
              <dd>
                ${_`As true regardless of the existence of a Buddha: <a class="ref" href="/an3.134">AN 3.134</a>`}
              </dd>
              <dt id="tiratana">
                ${_`Tirataṇa`}
              </dt>
              <dd class="description">
                ${_`<span class="translation">the Triple Gem</span>. See also <a href="#refuge">Refuge</a>.`}
              </dd>
              <dd>
                ${_`Verified confidence in ~ as a factor of <a href="#stream">stream-entry</a>: <a class="ref" href="/sn55.1">SN 55.1</a>`}
              </dd>
              <dt id="tisarana">
                ${_`Tisaraṇa`}
              </dt>
              <dd class="description">
                ${_`<span class="translation">the Threefold Refuge</span>`}
              </dd>
              <dt>
                ${_`Truthfulness`}
              </dt>
              <dd class="description">
                ${_`See <a href="#sacca">Sacca</a>.`}
              </dd>
            </dl>
            <h2 id="u">
              ${_`U`}
            </h2>
            <dl>
              <dt>
                ${_`Unattractiveness`}
              </dt>
              <dd class="description">
                ${_`See <a href="#asubha">Asubha</a>.`}
              </dd>
              <dt>
                ${_`Unbinding`}
              </dt>
              <dd class="description">
                ${_`See <a href="#nibbana">Nibbāna</a>.`}
              </dd>
              <dt>
                ${_`Universe, origin and fate of`}
              </dt>
              <dd class="description">
                ${_`See <a href="#questions">Questions not worth asking</a>.`}
              </dd>
              <dt id="upadana">
                ${_`Upādāna`}
              </dt>
              <dd class="description">
                ${_`<span class="translation">clinging</span>. See also <a href="#khandha">Khandha</a>; <a href="#ps">Paṭicca-samuppāda</a> (dependent origination).`}
              </dd>
              <dd>
                ${_`Understanding of ~ as a basis for Right View: <a class="ref" href="/mn9">MN 9</a>`}
              </dd>
              <dd>
                ${_`Aṭṭhaka Vagga (The Octet Chapter)—<a class="ref" href="/snp4">Snp 4</a>`}
              </dd>
              <dt id="upekkha">
                ${_`Upekkhā`}
              </dt>
              <dd class="description">
                ${_`<span class="translation">equanimity</span>. See also <a href="#brahmavihara">Brahmavihāra</a>; <a href="#parami">Pāramīs</a>;`}
              </dd>
              <dd>
                ${_`As a factor leading to liberation: <a class="ref" href="/an6.13">AN 6.13</a>`}
              </dd>
              <dd>
                ${_`Systematic practice of ~: <a class="ref" href="/sn42.8">SN 42.8</a>`}
              </dd>
              <dd>
                ${_`~ with respect to the sense faculties: <a class="ref" href="/mn152">MN 152</a>`}
              </dd>
              <dd>
                ${_`Three kinds of ~: <a class="ref" href="/sn36.31">SN 36.31</a>`}
              </dd>
              <dd>
                ${_`Practicing ~ as a way to deal with annoying people: <a class="ref" href="/an5.161">AN 5.161</a>`}
              </dd>
              <dt id="uposatha">
                ${_`Uposatha`}
              </dt>
              <dd class="description">
                ${_`<span class="translation">sabbath, observance day</span>. See also <a href="#sila">Sīla</a>.`}
              </dd>
              <dd>
                ${_`How the eight ~ practices are to be practiced: <a class="ref" href="/an8.43">AN 8.43</a>`}
              </dd>
              <dd>
                ${_`Right and wrong ways of observing the ~: <a class="ref" href="/an3.70">AN 3.70</a>`}
              </dd>
              <dd>
                ${_`If you choose to observe the ~, do so consistently: <a class="ref" href="/an10.46">AN 10.46</a>`}
              </dd>
            </dl>
            <h2 id="v">
              ${_`V`}
            </h2>
            <dl>
              <dt id="vedana">
                ${_`Vedanā`}
              </dt>
              <dd class="description">
                ${_`<span class="translation">feeling</span>. See also <a href="#khandha">Khandha</a> (clinging-aggregates); <a href="#pain">Pain</a>; <a href="#ps">Paṭicca-samuppāda</a> (dependent origination).`}
              </dd>
              <dd>
                ${_`Understanding of ~ as a basis for Right View: <a class="ref" href="/mn9">MN 9</a>`}
              </dd>
              <dd>
                ${_`Whatever is felt is a form of dukkha: <a class="ref" href="/sn36.11">SN 36.11</a>`}
              </dd>
              <dd>
                ${_`Seeing even pleasurable ~ as stressful: <a class="ref" href="/sn36.5">SN 36.5</a>, <a class="ref" href="/iti53">Iti 53</a>`}
              </dd>
              <dd>
                ${_`Seeing ~ as not-self: <a class="ref" href="/dn15">DN 15</a>`}
              </dd>
              <dd>
                ${_`Three kinds of ~: <a class="ref" href="/iti52">Iti 52</a>, <a class="ref" href="/iti53">Iti 53</a>`}
              </dd>
              <dd>
                ${_`Six important aspects of ~ to be understood: <a class="ref" href="/an6.63">AN 6.63</a>`}
              </dd>
              <dd>
                ${_`Why desire and passion connected with ~ is worth abandoning: <a class="ref" href="/sn27.5">SN 27.5</a>`}
              </dd>
              <dd>
                ${_`See the suttas in the Vedanā-saṁyutta of the Saṁyutta Nikāya`}
              </dd>
              <dt>
                ${_`Vedanta`}
              </dt>
              <dd class="description">
                ${_`See <a href="#comparative">Comparative religions</a>.`}
              </dd>
              <dt id="veggie">
                ${_`Vegetarianism`}
              </dt>
              <dt id="views">
                ${_`Views`}
              </dt>
              <dd class="description">
                ${_`See <a href="#ditthi">Diṭṭhi</a>.`}
              </dd>
              <dt id="vimutti">
                ${_`Vimutti`}
              </dt>
              <dd class="description">
                ${_`<span class="translation">release, deliverance</span>. See also <a href="#awakening">Awakening</a>.`}
              </dd>
              <dd>
                ${_`From what is one released? <a class="ref" href="/an10.81">AN 10.81</a>`}
              </dd>
              <dd>
                ${_`Released through awareness: <a class="ref" href="/an6.13">AN 6.13</a>`}
              </dd>
              <dd>
                ${_`Four kinds of awareness-release: <a class="ref" href="/sn41.7">SN 41.7</a>`}
              </dd>
              <dd>
                ${_`Released through discernment: <a class="ref" href="/an9.44">AN 9.44</a>`}
              </dd>
              <dd>
                ${_`Released “both ways”: <a class="ref" href="/an9.45">AN 9.45</a>`}
              </dd>
              <dd>
                ${_`The Buddha’s question-and-answer session concerning release: <a class="ref" href="/snp5">Snp 5</a>`}
              </dd>
              <dt id="vinaya">
                ${_`Vinaya`}
              </dt>
              <dd class="description">
                ${_`See also <a href="#monastic">Monastic Life</a>.`}
              </dd>
              <dd>
                ${_`Basic principles of: <a class="ref" href="/an8.53">AN 8.53</a>`}
              </dd>
              <dd>
                ${_`A monk’s duties: <a class="ref" href="/kd18">Kd 18</a>`}
              </dd>
              <dd>
                ${_`How to know if a particular action is allowable: <a class="ref" href="/kd6.40.1">Kd 6.40.1</a>`}
              </dd>
              <dd>
                ${_`The standards of sīla for contemplatives: <a class="ref" href="/dn2">DN 2</a>`}
              </dd>
              <dd>
                ${_`Are monks allowed to use money? <a class="ref" href="/sn42.10">SN 42.10</a>`}
              </dd>
              <dd>
                ${_`The Bhikkhu Pātimokkha: The Bhikkhus’ Code of Discipline`}
              </dd>
              <dd>
                ${_`The Bhikkhunī Pātimokkha: The Bhikkhunīs’ Code of Discipline`}
              </dd>
              <dt id="vinnana">
                ${_`Viññāṇa`}
              </dt>
              <dd class="description">
                ${_`<span class="translation">consciousness</span>. See also <a href="#khandha">Khandha</a> (clinging-aggregates); <a href="#ps">Paṭicca-samuppāda</a> (dependent origination).`}
              </dd>
              <dd>
                ${_`Understanding of ~ as a basis for Right View: <a class="ref" href="/mn9">MN 9</a>`}
              </dd>
              <dd>
                ${_`Why desire and passion connected with ~ is worth abandoning: <a class="ref" href="/sn27.3">SN 27.3</a>`}
              </dd>
              <dd>
                ${_`Mutual dependence of ~ and name-and-form: <a class="ref" href="/sn12.67">SN 12.67</a>`}
              </dd>
              <dt>
                ${_`Violence`}
              </dt>
              <dd class="description">
                ${_`See <a href="#ahimsa">Non-violence</a>.`}
              </dd>
              <dt id="vipassana">
                ${_`Vipassanā`}
              </dt>
              <dd class="description">
                ${_`<span class="translation">insight</span>. See also <a href="#samatha">Samatha</a> (tranquillity); <a href="#tilakkhana">Tilakkhaṇa</a> (three characteristics of existence).`}
              </dd>
              <dd>
                ${_`~ is developed in tandem with <a href="#samatha">samatha</a> (tranquillity): <a class="ref" href="/sn35.205">SN 35.205</a>, <a class="ref" href="/an2.30">AN 2.30</a>, <a class="ref" href="/an4.170">AN 4.170</a>, <a class="ref" href="/an10.71">AN 10.71</a>`}
              </dd>
              <dd>
                ${_`How ~ can be developed during or immediately after <i>jhāna</i>: <a class="ref" href="/mn111">MN 111</a>`}
              </dd>
              <dd>
                ${_`As direct knowledge of the five aggregates (<a href="#khandha">khandha</a>):`}
              </dd>
              <dd>
                ${_`Analyzing the five aggregates until their appeal is shattered: <a class="ref" href="/sn23.2">SN 23.2</a>`}
              </dd>
              <dd>
                ${_`Developing skill in applying the four noble truths to the five aggregates: <a class="ref" href="/sn22.56">SN 22.56</a>`}
              </dd>
              <dd>
                ${_`Developing skill in seeing seven qualities in each of the five aggregates: <a class="ref" href="/sn22.57">SN 22.57</a>`}
              </dd>
              <dd>
                ${_`A contemplation for every meditator, from beginner to arahant: <a class="ref" href="/sn22.122">SN 22.122</a>`}
              </dd>
              <dd>
                ${_`Like taking apart a lute in search of its sound: <a class="ref" href="/sn35.205">SN 35.205</a>`}
              </dd>
              <dd>
                ${_`As direct knowledge of the six sense bases (<a href="#salayatana">saḷāyatana</a>): <a class="ref" href="/mn149">MN 149</a>`}
              </dd>
              <dd>
                ${_`Reflection on not-self as a basis for insight: <a class="ref" href="/sn22.59">SN 22.59</a>`}
              </dd>
              <dt id="viraga">
                ${_`Virāga`}
              </dt>
              <dd class="description">
                ${_`<span class="translation">dispassion</span>`}
              </dd>
              <dd>
                ${_`Highest of all Dhammas: <a class="ref" href="/iti90">Iti 90</a>, <a class="ref" href="/dhp273">Dhp 273</a>`}
              </dd>
              <dd>
                ${_`The arahant as having gone beyond both passion and ~: <a class="ref" href="/snp4.4">Snp 4.4</a>, <a class="ref" href="/snp4.6">Snp 4.6</a>, <a class="ref" href="/snp4.10">Snp 4.10</a>`}
              </dd>
              <dd>
                ${_`“In the seen there is only the seen…”: <a class="ref" href="/sn35.95">SN 35.95</a>, <a class="ref" href="/ud1.10">Ud 1.10</a>`}
              </dd>
              <dt id="viriya">
                ${_`Viriya`}
              </dt>
              <dd class="description">
                ${_`<span class="translation">effort, energy</span>. See also <a href="#parami">Pāramīs</a>; <a href="#samvega">Saṁvega</a>; <a href="#sloth">Sloth and Drowsiness</a> (thīna-middha).`}
              </dd>
              <dd>
                ${_`Needed for final attainment of truth: <a class="ref" href="/mn95">MN 95</a>`}
              </dd>
              <dd>
                ${_`Wake up!: <a class="ref" href="/snp2.10">Snp 2.10</a>`}
              </dd>
              <dd>
                ${_`As a quality of a great person: <a class="ref" href="/an8.30">AN 8.30</a>`}
              </dd>
              <dd>
                ${_`Five factors that sustain ~: <a class="ref" href="/an5.53">AN 5.53</a>`}
              </dd>
              <dt>
                ${_`Virtue`}
              </dt>
              <dd class="description">
                ${_`See <a href="#sila">Sīla</a>.`}
              </dd>
              <dt id="viveka">
                ${_`Viveka`}
              </dt>
              <dd class="description">
                ${_`<span class="translation">seclusion, solitude</span>. See also <a href="#wilderness">Wilderness</a>.`}
              </dd>
              <dd>
                ${_`Thoughts of ~ are the mark of a great person: <a class="ref" href="/an8.30">AN 8.30</a>`}
              </dd>
              <dd>
                ${_`The pleasure of ~: <a class="ref" href="/an5.30">AN 5.30</a>, <a class="ref" href="/an6.42">AN 6.42</a>`}
              </dd>
              <dd>
                ${_`True seclusion is found within: <a class="ref" href="/sn9.1">SN 9.1</a>, <a class="ref" href="/sn21.10">SN 21.10</a>`}
              </dd>
              <dd>
                ${_`It’s better to be alone than in the company of fools: <a class="ref" href="/dhp61">Dhp 61</a>, <a class="ref" href="/dhp328">Dhp 328–330</a>`}
              </dd>
              <dd>
                ${_`Delighting in the wilds—the mark of a wise person: <a class="ref" href="/dhp305">Dhp 305</a>, <a class="ref" href="/dhp395">Dhp 395</a>, <a class="ref" href="/thag3.8">Thag 3.8</a>`}
              </dd>
              <dd>
                ${_`“Wander alone, a rhinoceros”: <a class="ref" href="/snp1.3">Snp 1.3</a>`}
              </dd>
              <dd>
                ${_`The monks’ way of life in the wilds: <a class="ref" href="/snp3.11">Snp 3.11</a>, <a class="ref" href="/snp4.9">Snp 4.9</a>, <a class="ref" href="/snp4.16">Snp 4.16</a>`}
              </dd>
            </dl>
            <h2 id="w">
              ${_`W`}
            </h2>
            <dl>
              <dt id="wakefulness">
                ${_`Wakefulness`}
              </dt>
              <dd class="description">
                ${_`See also <a href="#appamada">Appamāda (heedfulness)</a>.`}
              </dd>
              <dd>
                ${_`As a quality that distinguishes the true contemplative: <a class="ref" href="/mn39">MN 39</a>`}
              </dd>
              <dt id="walking">
                ${_`Walking meditation`}
              </dt>
              <dd class="description">
                ${_`See also <a href="#meditation">Meditation</a>.`}
              </dd>
              <dd>
                ${_`Benefits of ~: <a class="ref" href="/an5.29">AN 5.29</a>`}
              </dd>
              <dt id="war">
                ${_`War`}
              </dt>
              <dd class="description">
                ${_`See also <a href="#anger">Anger</a>; <a href="#conflict">Conflict</a>.`}
              </dd>
              <dd>
                ${_`In ~, there is no winning side: <a class="ref" href="/sn3.14">SN 3.14</a>, <a class="ref" href="/sn3.15">SN 3.15</a>`}
              </dd>
              <dd>
                ${_`Only forbearance, never revenge, can bring an end to ~: <a class="ref" href="/kd10.2.3">Kd 10.2.3–20</a>`}
              </dd>
              <dd>
                ${_`Hostility can never be conquered with hostility: <a class="ref" href="/dhp3">Dhp 3</a>`}
              </dd>
              <dd>
                ${_`What kind of rebirth can a soldier expect? <a class="ref" href="/sn42.3">SN 42.3</a>`}
              </dd>
              <dt id="wealth">
                ${_`Wealth`}
              </dt>
              <dd class="description">
                ${_`See also <a href="#money">Money</a>; <a href="#dhana">Dhana</a> (treasures); <a href="#punna">Puñña</a> (merit, inner wealth).`}
              </dd>
              <dd>
                ${_`The ~ of a householder vs. the ~ of one who has lived the renunciate life to its culmination: <a class="ref" href="/snp1.2">Snp 1.2</a>`}
              </dd>
              <dd>
                ${_`Downfall caused by stinginess: <a class="ref" href="/snp1.6">Snp 1.6</a>`}
              </dd>
              <dd>
                ${_`How ~ should be both shared and enjoyed: <a class="ref" href="/sn3.19">SN 3.19</a>`}
              </dd>
              <dd>
                ${_`Actions that lead to the loss of one’s material ~: <a class="ref" href="/dn31">DN 31</a>`}
              </dd>
              <dd>
                ${_`~ can’t buy true happines: <a class="ref" href="/an10.46">AN 10.46</a>`}
              </dd>
              <dd>
                ${_`Focusing on material gain leads one away from Nibbāna: <a class="ref" href="/dhp75">Dhp 75</a>`}
              </dd>
              <dd>
                ${_`Five skillful ways of using one’s ~: <a class="ref" href="/an5.41">AN 5.41</a>`}
              </dd>
              <dd>
                ${_`How a family can preserve its ~: <a class="ref" href="/an4.255">AN 4.255</a>`}
              </dd>
              <dd>
                ${_`How to safeguard one’s material ~: <a class="ref" href="/an8.54">AN 8.54</a>`}
              </dd>
              <dd>
                ${_`Relative value of material and spiritual ~: <a class="ref" href="/ud2.2">Ud 2.2</a>`}
              </dd>
              <dd>
                ${_`The bliss that arises from using ~ wisely: <a class="ref" href="/an4.62">AN 4.62</a>`}
              </dd>
              <dd>
                ${_`Few are those who don’t get intoxicated by ~: <a class="ref" href="/sn3.6">SN 3.6</a>`}
              </dd>
              <dd>
                ${_`Contentment is the greatest ~: <a class="ref" href="/dhp204">Dhp 204</a>`}
              </dd>
              <dt>
                ${_`Wedding`}
              </dt>
              <dd class="description">
                ${_`See <a href="#marriage">Marriage</a>.`}
              </dd>
              <dd>
                ${_`Well, parable of the: <a class="ref" href="/ud7.9">Ud 7.9</a>`}
              </dd>
              <dt id="wilderness">
                ${_`Wilderness`}
              </dt>
              <dd class="description">
                ${_`See also <a href="#forest">Forest traditions</a>; <a href="#nature">Nature</a>; <a href="#viveka">Viveka</a> (seclusion, solitude).`}
              </dd>
              <dd>
                ${_`Where ardent meditators prefer to dwell: <a class="ref" href="/dhp99">Dhp 99</a>, <a class="ref" href="/dhp305">Dhp 305</a>, <a class="ref" href="/dhp395">Dhp 395</a>`}
              </dd>
              <dd>
                ${_`Mountains, forests, and grasslands: <a class="ref" href="/dhp188">Dhp 188</a>, <a class="ref" href="/thag1.41">Thag 1.41</a>, <a class="ref" href="/thag1.113">Thag 1.113</a>, <a class="ref" href="/thag3.5">Thag 3.5</a>, <a class="ref" href="/thag19">Thag 19</a>, <a class="ref" href="/thig3.4">Thig 3.4</a>`}
              </dd>
              <dd>
                ${_`Qualities required for living in the ~: <a class="ref" href="/an4.259">AN 4.259</a>`}
              </dd>
              <dd>
                ${_`As a suitable place for meditation: <a class="ref" href="/dn12">DN 12</a>, <a class="ref" href="/dn22">DN 22</a>, <a class="ref" href="/mn118">MN 118</a>, <a class="ref" href="/mn119">MN 119</a>, <a class="ref" href="/sn11.3">SN 11.3</a>, <a class="ref" href="/an5.76">AN 5.76</a>, <a class="ref" href="/an8.86">AN 8.86</a>, etc.`}
              </dd>
              <dd>
                ${_`As a place to sleep at ease: <a class="ref" href="/an3.34">AN 3.34</a>`}
              </dd>
              <dd>
                ${_`What can one possibly accomplish by living in the forest, just meditating? <a class="ref" href="/sn7.17">SN 7.17</a>`}
              </dd>
              <dd>
                ${_`In the ~, the Buddha comes face-to-face with his fear: <a class="ref" href="/mn4">MN 4</a>`}
              </dd>
              <dd>
                ${_`In the ~, the Buddha shows by example how best to handle physical pain: <a class="ref" href="/sn1.38">SN 1.38</a>, <a class="ref" href="/sn4.13">SN 4.13</a>`}
              </dd>
              <dd>
                ${_`Wandering like a wild deer: <a class="ref" href="/snp1.3">Snp 1.3</a>`}
              </dd>
              <dd>
                ${_`~ is for those not seeking sensual delight: <a class="ref" href="/dhp99">Dhp 99</a>`}
              </dd>
              <dd>
                ${_`The Buddha exhorts others to seek out ~: <a class="ref" href="/an5.114">AN 5.114</a>`}
              </dd>
              <dd>
                ${_`The hazards of the ~ as an incentive to meditate: <a class="ref" href="/an5.77">AN 5.77</a>`}
              </dd>
              <dd>
                ${_`Proper attitude for living with hardship in the ~: <a class="ref" href="/thag3.8">Thag 3.8</a>, <a class="ref" href="/thag5.8">Thag 5.8</a>`}
              </dd>
              <dd>
                ${_`Why do those who live in the forest look so happy? <a class="ref" href="/sn1.10">SN 1.10</a>`}
              </dd>
              <dd>
                ${_`Craving follows you, even into the ~: <a class="ref" href="/sn35.63">SN 35.63</a>`}
              </dd>
              <dd>
                ${_`A lonely monk briefly considers leaving the forest: <a class="ref" href="/sn9.9">SN 9.9</a>`}
              </dd>
              <dd>
                ${_`An early example of “wilderness poetry”: <a class="ref" href="/thag18">Thag 18</a>`}
              </dd>
              <dd>
                ${_`Ven. Mahā Kassapa’s life in the forest: <a class="ref" href="/thag18">Thag 18</a>`}
              </dd>
              <dd>
                ${_`Why Ven. Mahā Kassapa chose to live in the forest: <a class="ref" href="/sn16.5">SN 16.5</a>`}
              </dd>
              <dt>
                ${_`Wings to Awakening`}
              </dt>
              <dd class="description">
                ${_`See <a href="#bodhipakkhiya-dhamma">Bodhipakkhiya-dhamma</a>.`}
              </dd>
              <dt>
                ${_`Wisdom`}
              </dt>
              <dd class="description">
                ${_`See <a href="#panna">Paññā</a>.`}
              </dd>
              <dt id="wiseperson">
                ${_`Wise person`}
              </dt>
              <dd class="description">
                ${_`See also <a href="#panna">Paññā</a> (discernment, wisdom).`}
              </dd>
              <dd>
                ${_`How to recognize a ~: <a class="ref" href="/an3.2">AN 3.2</a>, <a class="ref" href="/an4.35">AN 4.35</a>, <a class="ref" href="/an4.192">AN 4.192</a>, <a class="ref" href="/ud6.2">Ud 6.2</a>`}
              </dd>
              <dd>
                ${_`What distinguishes the ~ from the fool: <a class="ref" href="/sn12.19">SN 12.19</a>, <a class="ref" href="/an2.21">AN 2.21</a>, <a class="ref" href="/an2.98">AN 2.98</a>, <a class="ref" href="/an4.115">AN 4.115</a>`}
              </dd>
              <dd>
                ${_`It’s better to be alone than in the company of fools: <a class="ref" href="/dhp61">Dhp 61</a>, <a class="ref" href="/dhp328">Dhp 328–330</a>`}
              </dd>
              <dd>
                ${_`What the ~ and the fool have in common: <a class="ref" href="/mn33">MN 33</a>, <a class="ref" href="/an11.18">AN 11.18</a>`}
              </dd>
              <dt>
                ${_`Wise reflection`}
              </dt>
              <dd class="description">
                ${_`See <a href="#yoniso">Yoniso manasikāra</a>.`}
              </dd>
              <dt id="women">
                ${_`Women`}
              </dt>
              <dd>
                ${_`The thought, “Women can’t attain Awakening” is not to be believed: <a class="ref" href="/sn5.2">SN 5.2</a>`}
              </dd>
              <dd>
                ${_`Bhikkhunī-saṁyutta—stories concerning nuns and their battles with Mara (from the Saṁyutta Nikāya)`}
              </dd>
              <dd>
                ${_`Verses of the Elder Nuns (Therīgāthā)`}
              </dd>
              <dd>
                ${_`The Bhikkhunī Pātimokkha: The Bhikkhunīs’ Code of Discipline`}
              </dd>
              <dt id="monkwork">
                ${_`Work, monastics’`}
              </dt>
              <dd class="description">
                ${_`See also <a href="#monastic">Monastic life</a>.`}
              </dd>
              <dd>
                ${_`Do contemplatives do any useful work? (various answers): <a class="ref" href="/sn7.17">SN 7.17</a>; <a class="ref" href="/thig13.2">Thig 13.2</a>; <a class="ref" href="/snp1.4">Snp 1.4</a>.`}
              </dd>
              <dt>
                ${_`World, origin of`}
              </dt>
              <dd class="description">
                ${_`See <a href="#questions">Questions not worth asking</a>.`}
              </dd>
              <dt>
                ${_`Worship`}
              </dt>
              <dd class="description">
                ${_`See <a href="#devotion">Devotion</a>.`}
              </dd>
            </dl>
            <h2 id="xyz">
              ${_`XYZ`}
            </h2>
            <dl>
              <dt id="yoniso">
                ${_`Yoniso manasikāra`}
              </dt>
              <dd class="description">
                ${_`<span class="translation">appropriate attention; wise reflection</span>. See also the first six of the <a href="#recollections">Ten Recollections</a>; <a href="#questions">Questions</a>.`}
              </dd>
              <dd>
                ${_`What things should one attend to with ~? <a class="ref" href="/sn22.122">SN 22.122</a>`}
              </dd>
              <dd>
                ${_`A remedy for a mind consumed by unskillful thoughts: <a class="ref" href="/sn9.11">SN 9.11</a>`}
              </dd>
              <dd>
                ${_`As a condition for right view: <a class="ref" href="/an2.125">AN 2.125–126</a>`}
              </dd>
              <dd>
                ${_`As the key to abandoning greed, hatred, delusion: <a class="ref" href="/an3.68">AN 3.68</a>`}
              </dd>
              <dd>
                ${_`As an important quality to develop: <a class="ref" href="/iti16">Iti 16</a>`}
              </dd>
              <dd>
                ${_`As a means to ending the <a href="#asava">Āsava</a>: <a class="ref" href="/mn2">MN 2</a>`}
              </dd>
            </dl>
            <aside class="static-copyright">
              <p>
                ${_`The original source of this Index was released under the following terms:`}
              </p>
              <blockquote>
                ${_`© 2007 Access to Insight. The text of this page (“General Index”, by Access to Insight) is licensed under a Creative Commons Attribution 4.0 International License. To view a copy of the license, visit <a href="http://creativecommons.org/licenses/by/4.0/" rel="noopener" target="_blank">this page</a>.`}
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
    this.localizedStringsPath = '/localization/elements/static_subjects-page';
  }
}


customElements.define('sc-subjects-page', SCSubjects);
