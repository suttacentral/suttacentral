import { html } from '@polymer/lit-element/lit-element.js';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';

import { staticStyles } from '../styles/static-styles.js';
import { SCStaticPage } from '../addons/sc-static-page.js';
import _ from '../../localization/macro.js';


class SCNamesPage extends SCStaticPage {
  render() {
    return html`
    ${staticStyles}
    <div id="page-wrap">
      <main>
        <section>
          <article>
            <h1>
              ${_`Index of Names`}
            </h1>
            <p>
              ${_`This is a modified version of the <a href="https://www.accesstoinsight.org/index-names.html" rel="noopener" target="_blank">Index of Names</a> from Access to Insight. We adapt this useful resource with gratitude. Changes include:`}
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
                ${_`In most cases, <a href="https://www.accesstoinsight.org/abbrev.html" rel="noopener" target="_blank" title="Access to Insight abbreviations">Access to Insight</a> and <a href="/abbreviations" target="_blank" title="SuttaCentral abbreviations">SuttaCentral</a> use the same reference conventions. However, in a few cases they differ; for example Sutta Nipāta is Sn in Access to Insight and Snp in SuttaCentral. In such cases the references have been changed to SuttaCentral’s system.`}
              </li>
            </ul>
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
              <li>
                ${_`The spelling of proper names in Pali varies greatly between editions, and it is often impossible to determine the “correct” spelling for a specific name. Only a few variants are noted here.`}
              </li>
              <li>
                ${_`Significant life transitions (e.g. going for refuge, enlightenment, death) are shown on a separate line.`}
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
                  ${_`<a href="#pq">PQ</a>`}
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
                  ${_`<a href="#wxyz">WXYZ</a>`}
                </li>
              </ul>
            </nav>
            <h2 id="a">
              ${_`A`}
            </h2>
            <dl>
              <dt>
                ${_`Abhaya, Prince`}
              </dt>
              <dd>
                ${_`<a class="ref" href="/mn58">MN 58</a>`}
              </dd>
              <dd class="life-events">
                ${_`goes for refuge: <a class="ref" href="/mn58">MN 58</a>`}
              </dd>
              <dt>
                ${_`Abhaya`}
              </dt>
              <dd class="type">
                ${_`monk`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/thag1.26">Thag 1.26</a>`}
              </dd>
              <dt>
                ${_`Abhibhūta`}
              </dt>
              <dd class="type">
                ${_`monk`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/thag3.13">Thag 3.13</a>`}
              </dd>
              <dt>
                ${_`Accuta`}
              </dt>
              <dd class="type">
                ${_`private Buddha`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn116">MN 116</a>`}
              </dd>
              <dt>
                ${_`Accuta`}
              </dt>
              <dd class="type">
                ${_`deities (devas)`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn20">DN 20</a>`}
              </dd>
              <dt>
                ${_`Accutagāmabyāmaka`}
              </dt>
              <dd class="type">
                ${_`private Buddha`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn116">MN 116</a>`}
              </dd>
              <dt>
                ${_`Aciravata`}
              </dt>
              <dd class="type">
                ${_`novice`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn125">MN 125</a>`}
              </dd>
              <dt>
                ${_`Aciravatī`}
              </dt>
              <dd class="type">
                ${_`river`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/an10.15">AN 10.15</a>, <a class="ref" href="/ud5.5">Ud 5.5</a>`}
              </dd>
              <dt>
                ${_`Adhikakkā`}
              </dt>
              <dd class="type">
                ${_`river`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn7">MN 7</a>`}
              </dd>
              <dt>
                ${_`Adhimutta`}
              </dt>
              <dd class="type">
                ${_`monk`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/thag16.1">Thag 16.1</a>`}
              </dd>
              <dt>
                ${_`Aggāḷava`}
              </dt>
              <dd class="type">
                ${_`shrine`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/an8.23">AN 8.23</a>, <a class="ref" href="/an8.24">AN 8.24</a>`}
              </dd>
              <dt>
                ${_`Ajakalāpaka`}
              </dt>
              <dd class="type">
                ${_`shrine and spirit who lives there`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/ud1.7">Ud 1.7</a>`}
              </dd>
              <dt id="ajatasattu">
                ${_`Ajātasattu`}
              </dt>
              <dd class="type">
                ${_`king of <a href="#magadha">Magadha</a>; son of <a href="#videha">Queen Videha</a>; nephew of <a href="#pasenadi">King Pasenadi</a>; father of <a href="#udayibhadda">Prince Udayibhadda</a>`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn2">DN 2</a>, <a class="ref" href="/dn16">DN 16</a>, <a class="ref" href="/mn35">MN 35</a>, <a class="ref" href="/mn108">MN 108</a>, <a class="ref" href="/sn3.14">SN 3.14</a>, <a class="ref" href="/sn3.15">SN 3.15</a>`}
              </dd>
              <dd class="life-events">
                ${_`goes for refuge: <a class="ref" href="/dn2">DN 2</a>`}
              </dd>
              <dt>
                ${_`Ajita`}
              </dt>
              <dd class="type">
                ${_`brahmin ascetic`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/snp5.1">Snp 5.1</a>`}
              </dd>
              <dt>
                ${_`Ajita Kesakambalin`}
              </dt>
              <dd>
                ${_`<a class="ref" href="/dn2">DN 2</a>, <a class="ref" href="/dn16">DN 16</a>, <a class="ref" href="/mn30">MN 30</a>, <a class="ref" href="/sn3.1">SN 3.1</a>, <a class="ref" href="/sn44.9">SN 44.9</a>`}
              </dd>
              <dt>
                ${_`Ajjheya`}
              </dt>
              <dd class="type">
                ${_`town`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/sn35.200">SN 35.200</a>`}
              </dd>
              <dt id="akasa">
                ${_`Ākāsa`}
              </dt>
              <dd class="type">
                ${_`clan`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn90">MN 90</a>`}
              </dd>
              <dt id="akkosaka">
                ${_`Akkosaka Bhāradvāja`}
              </dt>
              <dd class="type">
                ${_`monk`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/sn7.2">SN 7.2</a>`}
              </dd>
              <dd class="life-events">
                ${_`goes for refuge, goes forth, becomes an arahant: <a class="ref" href="/sn7.2">SN 7.2</a>`}
              </dd>
              <dt>
                ${_`Āḷakamandā`}
              </dt>
              <dd class="type">
                ${_`heavenly city`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn16">DN 16</a>, <a class="ref" href="/dn32">DN 32</a>`}
              </dd>
              <dt>
                ${_`Āḷāra Kālāma`}
              </dt>
              <dd class="type">
                ${_`Buddha’s first meditation teacher`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn16">DN 16</a>, <a class="ref" href="/mn26">MN 26</a>, <a class="ref" href="/mn36">MN 36</a>`}
              </dd>
              <dt>
                ${_`Āḷavaka`}
              </dt>
              <dd class="type">
                ${_`spirit (yakkha)`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn32">DN 32</a>, <a class="ref" href="/sn10.12">SN 10.12</a>, <a class="ref" href="/snp1.10">Snp 1.10</a>`}
              </dd>
              <dt>
                ${_`Āḷavī`}
              </dt>
              <dd class="type">
                ${_`city`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/sn10.12">SN 10.12</a>, <a class="ref" href="/an3.34">AN 3.34</a>, <a class="ref" href="/an8.23">AN 8.23</a>, <a class="ref" href="/an8.24">AN 8.24</a>, <a class="ref" href="/snp1.10">Snp 1.10</a>`}
              </dd>
              <dt>
                ${_`Allakappa`}
              </dt>
              <dd class="type">
                ${_`city`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn16">DN 16</a>`}
              </dd>
              <dt>
                ${_`Ambalaṭṭhikā`}
              </dt>
              <dd class="type">
                ${_`city`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn16">DN 16</a>`}
              </dd>
              <dt>
                ${_`Ambapālī`}
              </dt>
              <dd class="type">
                ${_`bhikkhunī (nun); formerly a courtesan of Vesāli`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn16">DN 16</a>, <a class="ref" href="/thig13.1">Thig 13.1</a>`}
              </dd>
              <dt>
                ${_`Ambara-ambaravatī`}
              </dt>
              <dd class="type">
                ${_`heavenly city`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn32">DN 32</a>`}
              </dd>
              <dt>
                ${_`Ambāṭakavana`}
              </dt>
              <dd class="type">
                ${_`Plum-Mango Grove`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/sn41.5">SN 41.5</a>`}
              </dd>
              <dt>
                ${_`Ānanda`}
              </dt>
              <dd class="type">
                ${_`private Buddha`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn116">MN 116</a>`}
              </dd>
              <dt id="ananda">
                ${_`Ānanda`}
              </dt>
              <dd class="type">
                ${_`monk; a.k.a. the “Guardian of the Dhamma”; Buddha’s cousin; half-brother to <a href="#anuruddha">Ven. Anuruddha</a>; Buddha’s chief personal attendant for the last 25 years of the Buddha’s life`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/kd8.26.1">Kd 8.26.1–8</a>, <a class="ref" href="/dn15">DN 15</a>, <a class="ref" href="/dn16">DN 16</a>, <a class="ref" href="/mn18">MN 18</a>, <a class="ref" href="/mn26">MN 26</a>, <a class="ref" href="/mn52">MN 52</a>, <a class="ref" href="/mn53">MN 53</a>, <a class="ref" href="/mn59">MN 59</a>, <a class="ref" href="/mn90">MN 90</a>, <a class="ref" href="/mn108">MN 108</a>, <a class="ref" href="/mn118">MN 118</a>, <a class="ref" href="/mn121">MN 121</a>, <a class="ref" href="/mn122">MN 122</a>, <a class="ref" href="/mn136">MN 136</a>, <a class="ref" href="/mn143">MN 143</a>, <a class="ref" href="/mn152">MN 152</a>, <a class="ref" href="/sn12.68">SN 12.68</a>, <a class="ref" href="/sn12.70">SN 12.70</a>, <a class="ref" href="/sn6.15">SN 6.15</a>, <a class="ref" href="/sn8.4">SN 8.4</a>, <a class="ref" href="/sn12.25">SN 12.25</a>, <a class="ref" href="/sn21.2">SN 21.2</a>, <a class="ref" href="/sn22.81">SN 22.81</a>, <a class="ref" href="/sn22.83">SN 22.83</a>, <a class="ref" href="/sn22.90">SN 22.90</a>, <a class="ref" href="/sn35.85">SN 35.85</a>, <a class="ref" href="/sn35.193">SN 35.193</a>, <a class="ref" href="/sn36.15">SN 36.15</a>, <a class="ref" href="/sn44.10">SN 44.10</a>, <a class="ref" href="/sn45.2">SN 45.2</a>, <a class="ref" href="/sn47.13">SN 47.13</a>, <a class="ref" href="/sn48.41">SN 48.41</a>, <a class="ref" href="/sn51.15">SN 51.15</a>, <a class="ref" href="/sn54.9">SN 54.9</a>, <a class="ref" href="/sn54.13">SN 54.13</a>, <a class="ref" href="/sn56.45">SN 56.45</a>, <a class="ref" href="/an2.18">AN 2.18</a>, <a class="ref" href="/an3.60">AN 3.60</a>, <a class="ref" href="/an3.71">AN 3.71</a>, <a class="ref" href="/an3.72">AN 3.72</a>, <a class="ref" href="/an3.73">AN 3.73</a>, <a class="ref" href="/an3.76">AN 3.76</a>, <a class="ref" href="/an3.77">AN 3.77</a>, <a class="ref" href="/an3.78">AN 3.78</a>, <a class="ref" href="/an4.159">AN 4.159</a>, <a class="ref" href="/an4.170">AN 4.170</a>, <a class="ref" href="/an4.179">AN 4.179</a>, <a class="ref" href="/an5.114">AN 5.114</a>, <a class="ref" href="/an5.180">AN 5.180</a>, <a class="ref" href="/an6.51">AN 6.51</a>, <a class="ref" href="/an9.37">AN 9.37</a>, <a class="ref" href="/an9.41">AN 9.41</a>, <a class="ref" href="/an9.43">AN 9.43</a>, <a class="ref" href="/an9.44">AN 9.44</a>, <a class="ref" href="/an9.45">AN 9.45</a>, <a class="ref" href="/an10.6">AN 10.6</a>, <a class="ref" href="/an10.7">AN 10.7</a>, <a class="ref" href="/an10.95">AN 10.95</a>, <a class="ref" href="/an10.96">AN 10.96</a>, <a class="ref" href="/an11.1">AN 11.1</a>, <a class="ref" href="/an11.17">AN 11.17</a>, <a class="ref" href="/ud5.2">Ud 5.2</a>, <a class="ref" href="/ud5.5">Ud 5.5</a>, <a class="ref" href="/ud5.6">Ud 5.6</a>, <a class="ref" href="/ud3.3">Ud 3.3</a>, <a class="ref" href="/ud7.9">Ud 7.9</a>, <a class="ref" href="/thag21">Thag 21</a>`}
              </dd>
              <dd class="life-events">
                ${_`recalls the teachings that brought him to stream-entry: <a class="ref" href="/sn22.83">SN 22.83</a>; for Sāriputta’s list of qualities with which Ānanda is endowed, see <a class="ref" href="/an6.51">AN 6.51</a>.`}
              </dd>
              <dt>
                ${_`Anasava`}
              </dt>
              <dd class="type">
                ${_`private Buddha`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn116">MN 116</a>`}
              </dd>
              <dt id="anathapindika">
                ${_`Anāthapiṇḍika`}
              </dt>
              <dd class="type">
                ${_`lit. “Almsgiver to those without protection”; wealthy householder; his given name was Sudatta`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn143">MN 143</a>, <a class="ref" href="/sn10.8">SN 10.8</a>, <a class="ref" href="/an3.105">AN 3.105</a>, <a class="ref" href="/an4.62">AN 4.62</a>, <a class="ref" href="/an5.41">AN 5.41</a>, <a class="ref" href="/an5.43">AN 5.43</a>, <a class="ref" href="/an5.176">AN 5.176</a>, <a class="ref" href="/an5.179">AN 5.179</a>, <a class="ref" href="/an10.92">AN 10.92</a>; <a class="ref" href="/an10.93">AN 10.93</a>`}
              </dd>
              <dd class="life-events">
                ${_`first meets the Buddha: <a class="ref" href="/an10.8">AN 10.8</a>; teaches Dhamma: <a class="ref" href="/an10.93">AN 10.93</a>; dies: <a class="ref" href="/mn143">MN 143</a>`}
              </dd>
              <dt id="anathapindika-park">
                ${_`Anāthapiṇḍika’s park/monastery (Jeta’s Grove)`}
              </dt>
              <dd>
                ${_`<a class="ref" href="/dn9">DN 9</a>, <a class="ref" href="/mn2">MN 2</a>, <a class="ref" href="/mn4">MN 4</a>, <a class="ref" href="/mn7">MN 7</a>, <a class="ref" href="/mn8">MN 8</a>, <a class="ref" href="/mn9">MN 9</a>, <a class="ref" href="/mn11">MN 11</a>, <a class="ref" href="/mn13">MN 13</a>, <a class="ref" href="/mn19">MN 19</a>, <a class="ref" href="/mn20">MN 20</a>, <a class="ref" href="/mn22">MN 22</a>, <a class="ref" href="/mn24">MN 24</a>, <a class="ref" href="/mn26">MN 26</a>, <a class="ref" href="/mn27">MN 27</a>, <a class="ref" href="/mn28">MN 28</a>, <a class="ref" href="/mn33">MN 33</a>, <a class="ref" href="/mn38">MN 38</a>, <a class="ref" href="/mn43">MN 43</a>, <a class="ref" href="/mn49">MN 49</a>, <a class="ref" href="/mn59">MN 59</a>, <a class="ref" href="/mn62">MN 62</a>, <a class="ref" href="/mn63">MN 63</a>, <a class="ref" href="/mn72">MN 72</a>, <a class="ref" href="/mn78">MN 78</a>, <a class="ref" href="/mn86">MN 86</a>, <a class="ref" href="/mn87">MN 87</a>, <a class="ref" href="/mn93">MN 93</a>, <a class="ref" href="/mn111">MN 111</a>, <a class="ref" href="/mn117">MN 117</a>, <a class="ref" href="/mn119">MN 119</a>, <a class="ref" href="/mn130">MN 130</a>, <a class="ref" href="/mn131">MN 131</a>, <a class="ref" href="/mn135">MN 135</a>, <a class="ref" href="/mn137">MN 137</a>, <a class="ref" href="/mn138">MN 138</a>, <a class="ref" href="/mn146">MN 146</a>, <a class="ref" href="/mn149">MN 149</a>, <a class="ref" href="/sn1.1">SN 1.1</a>, <a class="ref" href="/sn1.41">SN 1.41</a>, <a class="ref" href="/sn3.1">SN 3.1</a>, <a class="ref" href="/sn4.8">SN 4.8</a>, <a class="ref" href="/sn8.4">SN 8.4</a>, <a class="ref" href="/sn11.5">SN 11.5</a>, <a class="ref" href="/sn12.11">SN 12.11</a>, <a class="ref" href="/sn12.31">SN 12.31</a>, <a class="ref" href="/sn16.13">SN 16.13</a>, <a class="ref" href="/sn23.2">SN 23.2</a>, <a class="ref" href="/sn13.1">SN 13.1</a>, <a class="ref" href="/sn22.5">SN 22.5</a>, <a class="ref" href="/sn22.57">SN 22.57</a>, <a class="ref" href="/sn22.85">SN 22.85</a>, <a class="ref" href="/sn44.1">SN 44.1</a>, <a class="ref" href="/sn45.1">SN 45.1</a>, <a class="ref" href="/sn45.8">SN 45.8</a>, <a class="ref" href="/sn47.13">SN 47.13</a>, <a class="ref" href="/sn47.42">SN 47.42</a>, <a class="ref" href="/sn54.13">SN 54.13</a>, <a class="ref" href="/an3.51">AN 3.51</a>, <a class="ref" href="/an3.52">AN 3.52</a>, <a class="ref" href="/an3.71">AN 3.71</a>, <a class="ref" href="/an4.45">AN 4.45</a>, <a class="ref" href="/an4.67">AN 4.67</a>, <a class="ref" href="/an5.28">AN 5.28</a>, <a class="ref" href="/an5.49">AN 5.49</a>, <a class="ref" href="/an6.49">AN 6.49</a>, <a class="ref" href="/an9.1">AN 9.1</a>, <a class="ref" href="/an10.51">AN 10.51</a>, <a class="ref" href="/an10.60">AN 10.60</a>, <a class="ref" href="/an10.70">AN 10.70</a>, <a class="ref" href="/an10.71">AN 10.71</a>, <a class="ref" href="/an11.1">AN 11.1</a>, <a class="ref" href="/snp2.4">Snp 2.4</a>, <a class="ref" href="/snp2.14">Snp 2.14</a>, <a class="ref" href="/snp3.3">Snp 3.3</a>, <a class="ref" href="/ud1.5">Ud 1.5</a>, <a class="ref" href="/ud1.10">Ud 1.10</a>, <a class="ref" href="/ud2.2">Ud 2.2</a>, <a class="ref" href="/ud2.3">Ud 2.3</a>, <a class="ref" href="/ud2.4">Ud 2.4</a>, <a class="ref" href="/ud2.5">Ud 2.5</a>, <a class="ref" href="/ud2.6">Ud 2.6</a>, <a class="ref" href="/ud2.7">Ud 2.7</a>, <a class="ref" href="/ud3.1">Ud 3.1</a>, <a class="ref" href="/ud3.2">Ud 3.2</a>, <a class="ref" href="/ud3.3">Ud 3.3</a>, <a class="ref" href="/ud3.4">Ud 3.4</a>, <a class="ref" href="/ud3.5">Ud 3.5</a>, <a class="ref" href="/ud3.8">Ud 3.8</a>, <a class="ref" href="/ud4.6">Ud 4.6</a>, <a class="ref" href="/ud4.7">Ud 4.7</a>, <a class="ref" href="/ud4.10">Ud 4.10</a>, <a class="ref" href="/ud5.1">Ud 5.1</a>, <a class="ref" href="/ud5.2">Ud 5.2</a>, <a class="ref" href="/ud5.4">Ud 5.4</a>, <a class="ref" href="/ud5.6">Ud 5.6</a>, <a class="ref" href="/ud5.7">Ud 5.7</a>, <a class="ref" href="/ud5.10">Ud 5.10</a>, <a class="ref" href="/ud6.3">Ud 6.3</a>, <a class="ref" href="/ud6.4">Ud 6.4</a>, <a class="ref" href="/ud6.5">Ud 6.5</a>, <a class="ref" href="/ud6.6">Ud 6.6</a>, <a class="ref" href="/ud6.7">Ud 6.7</a>, <a class="ref" href="/ud6.9">Ud 6.9</a>, <a class="ref" href="/ud7.1">Ud 7.1</a>, <a class="ref" href="/ud7.2">Ud 7.2</a>, <a class="ref" href="/ud7.3">Ud 7.3</a>, <a class="ref" href="/ud7.4">Ud 7.4</a>, <a class="ref" href="/ud7.5">Ud 7.5</a>, <a class="ref" href="/ud7.6">Ud 7.6</a>, <a class="ref" href="/ud8.1">Ud 8.1</a>, <a class="ref" href="/ud8.2">Ud 8.2</a>, <a class="ref" href="/ud8.3">Ud 8.3</a>, <a class="ref" href="/ud8.4">Ud 8.4</a>, <a class="ref" href="/ud8.9">Ud 8.9</a>, <a class="ref" href="/ud8.10">Ud 8.10</a>, <a class="ref" href="/thag17.3">Thag 17.3</a>`}
              </dd>
              <dt>
                ${_`Andhakavinda`}
              </dt>
              <dd class="type">
                ${_`city`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/sn6.13">SN 6.13</a>, <a class="ref" href="/an5.114">AN 5.114</a>`}
              </dd>
              <dt>
                ${_`Anejakā`}
              </dt>
              <dd class="type">
                ${_`deities (devas)`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn20">DN 20</a>`}
              </dd>
              <dt>
                ${_`Aṅga`}
              </dt>
              <dd class="type">
                ${_`private Buddha`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn116">MN 116</a>`}
              </dd>
              <dt>
                ${_`Aṅga`}
              </dt>
              <dd class="type">
                ${_`country`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn39">MN 39</a>, <a class="ref" href="/an3.70">AN 3.70</a>, <a class="ref" href="/thag5.9">Thag 5.9</a>`}
              </dd>
              <dt>
                ${_`Aṅgīrasa`}
              </dt>
              <dd class="type">
                ${_`brahmin sage`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn95">MN 95</a>, <a class="ref" href="/an7.49">AN 7.49</a>`}
              </dd>
              <dt>
                ${_`Aṅgulimāla`}
              </dt>
              <dd class="type">
                ${_`bandit; a.k.a. Gagga Mantāṇiputta`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn86">MN 86</a>, <a class="ref" href="/thag16.8">Thag 16.8</a>`}
              </dd>
              <dt>
                ${_`Aṅguttarāpan`}
              </dt>
              <dd class="type">
                ${_`people`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn66">MN 66</a>`}
              </dd>
              <dt>
                ${_`Anīgha`}
              </dt>
              <dd class="type">
                ${_`private Buddha`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn116">MN 116</a>`}
              </dd>
              <dt>
                ${_`Anopamā`}
              </dt>
              <dd class="type">
                ${_`the millionaire’s daughter`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/thig6.5">Thig 6.5</a>`}
              </dd>
              <dt>
                ${_`Anotatta`}
              </dt>
              <dd class="type">
                ${_`lake`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/thag6.10">Thag 6.10</a>`}
              </dd>
              <dt>
                ${_`Anupiya`}
              </dt>
              <dd class="type">
                ${_`city`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/ud2.10">Ud 2.10</a>`}
              </dd>
              <dt>
                ${_`Anurādha`}
              </dt>
              <dd class="type">
                ${_`monk`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/sn22.86">SN 22.86</a>`}
              </dd>
              <dt id="anuruddha">
                ${_`Anuruddha`}
              </dt>
              <dd class="type">
                ${_`monk; Buddha’s cousin; half-brother to <a href="#ananda">Ven. Ānanda</a>; a.k.a. “Master of the Divine Eye"`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn16">DN 16</a>, <a class="ref" href="/sn6.15">SN 6.15</a>, <a class="ref" href="/sn9.6">SN 9.6</a>, <a class="ref" href="/sn52.10">SN 52.10</a>, <a class="ref" href="/an8.30">AN 8.30</a>, <a class="ref" href="/ud1.5">Ud 1.5</a>, <a class="ref" href="/thag6.10">Thag 6.10</a>`}
              </dd>
              <dd class="life-events">
                ${_`becomes an arahant: <a class="ref" href="/an8.30">AN 8.30</a>`}
              </dd>
              <dt>
                ${_`Āpaṇa`}
              </dt>
              <dd class="type">
                ${_`market town`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn66">MN 66</a>`}
              </dd>
              <dt>
                ${_`Aparājita`}
              </dt>
              <dd class="type">
                ${_`private Buddha`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn116">MN 116</a>`}
              </dd>
              <dt>
                ${_`Araka`}
              </dt>
              <dd class="type">
                ${_`brahmin`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/an7.70">AN 7.70</a>`}
              </dd>
              <dt>
                ${_`Ariṭṭhakā`}
              </dt>
              <dd class="type">
                ${_`deities (devas)`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn20">DN 20</a>`}
              </dd>
              <dt>
                ${_`Ariṭṭha Formerly-of-the-Vulture-Killers`}
              </dt>
              <dd>
                ${_`<a class="ref" href="/mn22">MN 22</a>`}
              </dd>
              <dt>
                ${_`Ariṭṭha`}
              </dt>
              <dd class="type">
                ${_`monk`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/sn54.6">SN 54.6</a>`}
              </dd>
              <dt>
                ${_`Ariṭṭha`}
              </dt>
              <dd class="type">
                ${_`private Buddha`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn116">MN 116</a>`}
              </dd>
              <dt>
                ${_`Ariṭṭha`}
              </dt>
              <dd class="type">
                ${_`spirit (yakkha)`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn32">DN 32</a>`}
              </dd>
              <dt>
                ${_`Ariya`}
              </dt>
              <dd class="type">
                ${_`private Buddha`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn116">MN 116</a>`}
              </dd>
              <dt>
                ${_`Asamā`}
              </dt>
              <dd class="type">
                ${_`deity (deva)`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn20">DN 20</a>`}
              </dd>
              <dt>
                ${_`Asayha`}
              </dt>
              <dd class="type">
                ${_`private Buddha`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn116">MN 116</a>`}
              </dd>
              <dt>
                ${_`Asibandhakaputta`}
              </dt>
              <dd class="type">
                ${_`headman and disciple of the <a href="#nigantha">Nigaṇṭhas</a>`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/sn42.6">SN 42.6</a>, <a class="ref" href="/sn42.8">SN 42.8</a>; <a class="ref" href="/sn42.9">SN 42.9</a>`}
              </dd>
              <dd class="life-events">
                ${_`goes for refuge: a: <a class="ref" href="/sn42.9">SN 42.9</a>, b: <a class="ref" href="/sn42.9">SN 42.9</a>`}
              </dd>
              <dt>
                ${_`Asita`}
              </dt>
              <dd class="type">
                ${_`private Buddha`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn116">MN 116</a>`}
              </dd>
              <dt>
                ${_`Asita`}
              </dt>
              <dd class="type">
                ${_`the seer`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/snp3.11">Snp 3.11</a>`}
              </dd>
              <dt>
                ${_`Assaji`}
              </dt>
              <dd class="type">
                ${_`monk`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn35">MN 35</a>, <a class="ref" href="/mn70">MN 70</a>, <a class="ref" href="/kd1.23.1">Kd 1.23.1–10</a>`}
              </dd>
              <dt>
                ${_`Assaka`}
              </dt>
              <dd class="type">
                ${_`country`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/an3.70">AN 3.70</a>`}
              </dd>
              <dt>
                ${_`Assalāyana`}
              </dt>
              <dd class="type">
                ${_`brahmin`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn93">MN 93</a>`}
              </dd>
              <dt>
                ${_`Assapūra`}
              </dt>
              <dd class="type">
                ${_`town`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn39">MN 39</a>`}
              </dd>
              <dt>
                ${_`Assatara`}
              </dt>
              <dd class="type">
                ${_`city`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn20">DN 20</a>`}
              </dd>
              <dt>
                ${_`Asuras`}
              </dt>
              <dd class="type">
                ${_`demons`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn20">DN 20</a>, <a class="ref" href="/ud5.5">Ud 5.5</a>, <a class="ref" href="/snp3.11">Snp 3.11</a>`}
              </dd>
              <dt>
                ${_`Āṭānāṭā`}
              </dt>
              <dd class="type">
                ${_`heavenly city`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn32">DN 32</a>`}
              </dd>
              <dt>
                ${_`Aṭṭhaka`}
              </dt>
              <dd class="type">
                ${_`private Buddha`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn116">MN 116</a>`}
              </dd>
              <dt>
                ${_`Aṭṭhaka`}
              </dt>
              <dd class="type">
                ${_`brahmin sage`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn95">MN 95</a>, <a class="ref" href="/an7.49">AN 7.49</a>`}
              </dd>
              <dt>
                ${_`Aṭṭhakanagara`}
              </dt>
              <dd class="type">
                ${_`town`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn52">MN 52</a>, <a class="ref" href="/an11.17">AN 11.17</a>`}
              </dd>
              <dt>
                ${_`Aṭṭhama`}
              </dt>
              <dd class="type">
                ${_`private Buddha`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn116">MN 116</a>`}
              </dd>
              <dt>
                ${_`Atula`}
              </dt>
              <dd>
                ${_`<a class="ref" href="/dhp227">Dhp 227</a>`}
              </dd>
              <dt>
                ${_`Avanti`}
              </dt>
              <dd class="type">
                ${_`country`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/sn22.3">SN 22.3</a>, <a class="ref" href="/sn41.3">SN 41.3</a>, <a class="ref" href="/an3.70">AN 3.70</a>, <a class="ref" href="/ud5.6">Ud 5.6</a>`}
              </dd>
              <dt>
                ${_`Avīci`}
              </dt>
              <dd class="type">
                ${_`hell realm`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/iti89">Iti 89</a>`}
              </dd>
              <dt>
                ${_`Ayojjhans`}
              </dt>
              <dd class="type">
                ${_`people`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/sn22.95">SN 22.95</a>`}
              </dd>
            </dl>
            <h2 id="b">
              ${_`B`}
            </h2>
            <dl>
              <dt>
                ${_`Bāhiya of the Bark-cloth`}
              </dt>
              <dd class="type">
                ${_`praised by the Buddha as being foremost among the bhikkhus in terms of the speed of his understanding`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/ud1.10">Ud 1.10</a>`}
              </dd>
              <dd class="life-events">
                ${_`becomes an arahant, killed by a cow: <a class="ref" href="/ud1.10">Ud 1.10</a>`}
              </dd>
              <dt>
                ${_`Bāhukā`}
              </dt>
              <dd class="type">
                ${_`river`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn7">MN 7</a>`}
              </dd>
              <dt>
                ${_`Bāhumati`}
              </dt>
              <dd class="type">
                ${_`river`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn7">MN 7</a>`}
              </dd>
              <dt>
                ${_`Bāhuna`}
              </dt>
              <dd class="type">
                ${_`monk`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/an10.81">AN 10.81</a>`}
              </dd>
              <dt>
                ${_`Bahuputta`}
              </dt>
              <dd class="type">
                ${_`shrine`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn16">DN 16</a>`}
              </dd>
              <dt>
                ${_`Baka Brahmā`}
              </dt>
              <dd>
                ${_`<a class="ref" href="/mn49">MN 49</a>`}
              </dd>
              <dt>
                ${_`Bali`}
              </dt>
              <dd class="type">
                ${_`asura demon`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn20">DN 20</a>`}
              </dd>
              <dt>
                ${_`Bandhumā`}
              </dt>
              <dd class="type">
                ${_`private Buddha`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn116">MN 116</a>`}
              </dd>
              <dt>
                ${_`Banyan Park`}
              </dt>
              <dd>
                ${_`<a class="ref" href="/an3.73">AN 3.73</a>, <a class="ref" href="/an11.13">AN 11.13</a>, <a class="ref" href="/an11.12">AN 11.12</a>`}
              </dd>
              <dt>
                ${_`Bārāṇasī`}
              </dt>
              <dd>
                ${_`see <a href="#varanasi">Varanasi</a>`}
              </dd>
              <dt>
                ${_`Belaṭṭhasīsa`}
              </dt>
              <dd class="type">
                ${_`monk`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/thag1.16">Thag 1.16</a>`}
              </dd>
              <dt>
                ${_`Beḷuva`}
              </dt>
              <dd class="type">
                ${_`village`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn16">DN 16</a>`}
              </dd>
              <dt>
                ${_`Bhaddā`}
              </dt>
              <dd>
                ${_`<a class="ref" href="/dn16">DN 16</a>`}
              </dd>
              <dt id="bhadda">
                ${_`Bhaddā Kāpilānī`}
              </dt>
              <dd class="type">
                ${_`bhikkhunī, arahant, former wife of <a href="#kassapa">Mahā Kassapa</a>`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/thig4.1">Thig 4.1</a>`}
              </dd>
              <dt>
                ${_`Bhaddā Kuṇḍalakesā`}
              </dt>
              <dd class="type">
                ${_`bhikkhunī (nun); praised by the Buddha as being foremost among the bhikkhunīs in terms of the speed of her understanding`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/thig5.9">Thig 5.9</a>`}
              </dd>
              <dt id="bhaddiya">
                ${_`Bhaddiya Kāḷigodha`}
              </dt>
              <dd class="type">
                ${_`monk`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/ud2.10">Ud 2.10</a> <a class="ref" href="/thag16.7">Thag 16.7</a>`}
              </dd>
              <dt>
                ${_`Bhaddiya the Dwarf`}
              </dt>
              <dd class="type">
                ${_`monk`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/sn21.6">SN 21.6</a>, <a class="ref" href="/ud7.1">Ud 7.1</a>, <a class="ref" href="/ud7.2">Ud 7.2</a>, <a class="ref" href="/ud7.5">Ud 7.5</a>`}
              </dd>
              <dd class="life-events">
                ${_`becomes an arahant: <a class="ref" href="/ud7.1">Ud 7.1</a>`}
              </dd>
              <dt>
                ${_`Bhadraka`}
              </dt>
              <dd>
                ${_`see <a href="#gandhabhaka">Gandhabhaka</a>`}
              </dd>
              <dt>
                ${_`Bhadrāvudha`}
              </dt>
              <dd class="type">
                ${_`brahmin ascetic`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/snp5.12">Snp 5.12</a>`}
              </dd>
              <dt>
                ${_`Bhaggā`}
              </dt>
              <dd class="type">
                ${_`people`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/sn22.1">SN 22.1</a>, <a class="ref" href="/an4.55">AN 4.55</a>, <a class="ref" href="/an6.16">AN 6.16</a>, <a class="ref" href="/an7.58">AN 7.58</a>, <a class="ref" href="/an8.30">AN 8.30</a>`}
              </dd>
              <dt>
                ${_`Bhaggava`}
              </dt>
              <dd class="type">
                ${_`potter`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn140">MN 140</a>`}
              </dd>
              <dt>
                ${_`Bhagu`}
              </dt>
              <dd class="type">
                ${_`brahmin sage`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn95">MN 95</a>, <a class="ref" href="/an7.49">AN 7.49</a>`}
              </dd>
              <dt>
                ${_`Bhalliya`}
              </dt>
              <dd class="type">
                ${_`monk`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/thag1.7">Thag 1.7</a>`}
              </dd>
              <dt>
                ${_`Bhaṇḍa`}
              </dt>
              <dd class="type">
                ${_`village`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn16">DN 16</a>, <a class="ref" href="/an4.1">AN 4.1</a>`}
              </dd>
              <dt>
                ${_`Bhañña`}
              </dt>
              <dd>
                ${_`<a class="ref" href="/mn117">MN 117</a>`}
              </dd>
              <dt>
                ${_`Bhāradvāja`}
              </dt>
              <dd class="type">
                ${_`private Buddha`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn116">MN 116</a>`}
              </dd>
              <dt>
                ${_`Bhāradvāja, Ven. Akkosaka`}
              </dt>
              <dd>
                ${_`see <a href="#akkosaka">Akkosaka Bhāradvāja, Ven.</a>`}
              </dd>
              <dt>
                ${_`Bhāradvāja, Ven. Jaṭa`}
              </dt>
              <dd>
                ${_`see <a href="#jata">Jaṭa Bhāradvāja, Ven.</a>`}
              </dd>
              <dt>
                ${_`Bhāradvāja, Kasi`}
              </dt>
              <dd>
                ${_`see <a href="#kasiBh%C4%81radv%C4%81ja">Kasi Bhāradvāja</a>`}
              </dd>
              <dt>
                ${_`Bhāradvāja, Navakammika`}
              </dt>
              <dd>
                ${_`see <a href="#navak">Navakammika Bhāradvāja</a>`}
              </dd>
              <dt>
                ${_`Bhāradvāja, Ven. Piṇḍola`}
              </dt>
              <dd>
                ${_`see <a href="#pindola">Piṇḍola Bhāradvāja, Ven.</a>`}
              </dd>
              <dt>
                ${_`Bhāradvāja, Ven. Sundarika`}
              </dt>
              <dd>
                ${_`see <a href="#sundarika">Sundarika Bhāradvāja, Ven.</a>`}
              </dd>
              <dt>
                ${_`Bhāradvāja`}
              </dt>
              <dd class="type">
                ${_`ancient brahmin sage`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn95">MN 95</a>, <a class="ref" href="/an7.49">AN 7.49</a>`}
              </dd>
              <dt>
                ${_`Bhāradvāja`}
              </dt>
              <dd class="type">
                ${_`clan`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/sn7.18">SN 7.18</a>`}
              </dd>
              <dt>
                ${_`Bhāradvāja`}
              </dt>
              <dd class="type">
                ${_`spirit (yakkha)`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn32">DN 32</a>`}
              </dd>
              <dt>
                ${_`Bhāvitatta`}
              </dt>
              <dd class="type">
                ${_`private Buddha`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn116">MN 116</a>`}
              </dd>
              <dt>
                ${_`Bhesakala`}
              </dt>
              <dd class="type">
                ${_`grove`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/sn22.1">SN 22.1</a>, <a class="ref" href="/an4.55">AN 4.55</a>, <a class="ref" href="/an6.16">AN 6.16</a>, <a class="ref" href="/an8.30">AN 8.30</a>, <a class="ref" href="/thag1.18">Thag 1.18</a>`}
              </dd>
              <dt>
                ${_`Bhoganagara`}
              </dt>
              <dd class="type">
                ${_`city`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn16">DN 16</a>`}
              </dd>
              <dt>
                ${_`Bhoja`}
              </dt>
              <dd class="type">
                ${_`sky-walking deva`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/an4.45">AN 4.45</a>`}
              </dd>
              <dt>
                ${_`Bhūmija`}
              </dt>
              <dd class="type">
                ${_`monk`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/sn12.25">SN 12.25</a>`}
              </dd>
              <dt>
                ${_`Bhūta`}
              </dt>
              <dd class="type">
                ${_`monk`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/thag9">Thag 9</a>`}
              </dd>
              <dt>
                ${_`<a id="bimbisara">Bimbisara</a>, King Seniya`}
              </dt>
              <dd class="type">
                ${_`of <a href="#magadha">Magadha</a>`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn14">MN 14</a>, <a class="ref" href="/mn86">MN 86</a>, <a class="ref" href="/snp3.1">Snp 3.1</a>, <a class="ref" href="/ud2.2">Ud 2.2</a>, <a class="ref" href="/thag9">Thag 9</a>`}
              </dd>
              <dt>
                ${_`Bodhi`}
              </dt>
              <dd class="type">
                ${_`private Buddha`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn116">MN 116</a>`}
              </dd>
              <dt>
                ${_`Brahmā`}
              </dt>
              <dd>
                ${_`<a class="ref" href="/dn2">DN 2</a>, <a class="ref" href="/dn11">DN 11</a>, <a class="ref" href="/mn1">MN 1</a>, <a class="ref" href="/mn22">MN 22</a>, <a class="ref" href="/mn49">MN 49</a>, <a class="ref" href="/sn6.2">SN 6.2</a>, <a class="ref" href="/sn56.11">SN 56.11</a>, <a class="ref" href="/an4.28">AN 4.28</a>, <a class="ref" href="/ud7.6">Ud 7.6</a>, <a class="ref" href="/thig12">Thig 12</a>`}
              </dd>
              <dt>
                ${_`Brahmadatta`}
              </dt>
              <dd class="type">
                ${_`monk`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/thag6.12">Thag 6.12</a>`}
              </dd>
              <dt>
                ${_`Brahmadatta`}
              </dt>
              <dd class="type">
                ${_`king of <a href="#kasi">Kasi</a>`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/kd10.2.3">Kd 10.2.3–20</a>`}
              </dd>
              <dt>
                ${_`Bulī`}
              </dt>
              <dd class="type">
                ${_`clan`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn16">DN 16</a>`}
              </dd>
            </dl>
            <h2 id="c">
              ${_`C`}
            </h2>
            <dl>
              <dt>
                ${_`Cakkhupāla`}
              </dt>
              <dd class="type">
                ${_`monk`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/thag1.95">Thag 1.95</a>`}
              </dd>
              <dt>
                ${_`Calā`}
              </dt>
              <dd class="type">
                ${_`bhikkhunī (nun)`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/sn5.6">SN 5.6</a>`}
              </dd>
              <dt>
                ${_`Cālikā`}
              </dt>
              <dd class="type">
                ${_`village near a mountain`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/ud4.1">Ud 4.1</a>`}
              </dd>
              <dt>
                ${_`Campā`}
              </dt>
              <dd class="type">
                ${_`city`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn16">DN 16</a>, <a class="ref" href="/an7.49">AN 7.49</a>, <a class="ref" href="/an10.81">AN 10.81</a>, <a class="ref" href="/an10.94">AN 10.94</a>`}
              </dd>
              <dt>
                ${_`Caṇḍā`}
              </dt>
              <dd class="type">
                ${_`bhikkhunī (nun); a homeless beggar who became a nun`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/thig5.12">Thig 5.12</a>`}
              </dd>
              <dt>
                ${_`Candana`}
              </dt>
              <dd class="type">
                ${_`deity (deva)`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn20">DN 20</a>, <a class="ref" href="/dn32">DN 32</a>`}
              </dd>
              <dt>
                ${_`Caṅkī`}
              </dt>
              <dd class="type">
                ${_`brahmin`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn95">MN 95</a>`}
              </dd>
              <dt>
                ${_`Cāpāla`}
              </dt>
              <dd class="type">
                ${_`shrine`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn16">DN 16</a>`}
              </dd>
              <dt>
                ${_`Ceti`}
              </dt>
              <dd class="type">
                ${_`people`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/an3.70">AN 3.70</a>, <a class="ref" href="/an8.30">AN 8.30</a>, <a class="ref" href="/an6.46">AN 6.46</a>, <a class="ref" href="/an10.24">AN 10.24</a>`}
              </dd>
              <dt>
                ${_`Chabyāputta`}
              </dt>
              <dd class="type">
                ${_`royal snake lineage`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/an4.67">AN 4.67</a>`}
              </dd>
              <dt>
                ${_`Channa`}
              </dt>
              <dd class="type">
                ${_`monk; formerly, the Buddha’s horseman`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn16">DN 16</a>, <a class="ref" href="/sn22.90">SN 22.90</a>`}
              </dd>
              <dt>
                ${_`Channa`}
              </dt>
              <dd class="type">
                ${_`wandering ascetic`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/an3.71">AN 3.71</a>`}
              </dd>
              <dt id="ciravasi">
                ${_`Ciravāsī`}
              </dt>
              <dd class="type">
                ${_`son of <a href="#gandhabhaka">Gandhabhaka</a>`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/sn42.11">SN 42.11</a>`}
              </dd>
              <dt>
                ${_`Citra`}
              </dt>
              <dd class="type">
                ${_`garuda`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn20">DN 20</a>`}
              </dd>
              <dt>
                ${_`Citta the elephant trainer’s son`}
              </dt>
              <dd>
                ${_`<a class="ref" href="/dn9">DN 9</a>`}
              </dd>
              <dd class="life-events">
                ${_`goes for refuge, goes forth, becomes an arahant: <a class="ref" href="/dn9">DN 9</a>`}
              </dd>
              <dt>
                ${_`Citta the householder`}
              </dt>
              <dd class="type">
                ${_`praised by the Buddha both as a role-model for the lay disciples and as an expounder of Dhamma`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/sn41.3">SN 41.3</a>, <a class="ref" href="/sn41.4">SN 41.4</a>, <a class="ref" href="/sn41.5">SN 41.5</a>, <a class="ref" href="/sn41.6">SN 41.6</a>, <a class="ref" href="/sn41.7">SN 41.7</a>, <a class="ref" href="/sn41.10">SN 41.10</a>`}
              </dd>
              <dd class="life-events">
                ${_`dies: <a class="ref" href="/sn41.10">SN 41.10</a>`}
              </dd>
              <dt>
                ${_`Cittaka`}
              </dt>
              <dd class="type">
                ${_`monk`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/thag1.22">Thag 1.22</a>`}
              </dd>
              <dt>
                ${_`Cittasena`}
              </dt>
              <dd class="type">
                ${_`deity (deva)`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn20">DN 20</a>, <a class="ref" href="/dn32">DN 32</a>`}
              </dd>
              <dt>
                ${_`Crocodile Haunt`}
              </dt>
              <dd>
                ${_`<a class="ref" href="/sn22.1">SN 22.1</a>, <a class="ref" href="/an4.55">AN 4.55</a>, <a class="ref" href="/an6.16">AN 6.16</a>, <a class="ref" href="/an7.58">AN 7.58</a>`}
              </dd>
              <dt>
                ${_`Cūḷa Panthaka`}
              </dt>
              <dd class="type">
                ${_`monk`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/ud5.10">Ud 5.10</a>`}
              </dd>
              <dt>
                ${_`Cūḷaka`}
              </dt>
              <dd class="type">
                ${_`monk`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/thag2.46">Thag 2.46</a>`}
              </dd>
              <dt>
                ${_`Cunda`}
              </dt>
              <dd class="type">
                ${_`the novice`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/sn47.13">SN 47.13</a>`}
              </dd>
              <dt>
                ${_`Cunda`}
              </dt>
              <dd class="type">
                ${_`the silversmith`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn16">DN 16</a>, <a class="ref" href="/an10.176">AN 10.176</a>, <a class="ref" href="/ud8.5">Ud 8.5</a>, <a class="ref" href="/snp1.5">Snp 1.5</a>`}
              </dd>
              <dd class="life-events">
                ${_`goes for refuge: <a class="ref" href="/an10.176">AN 10.176</a>; offers a meal to the Buddha: <a class="ref" href="/ud8.5">Ud 8.5</a>`}
              </dd>
              <dt>
                ${_`Cunda, Ven. Mahā`}
              </dt>
              <dd>
                ${_`<a class="ref" href="/mn8">MN 8</a>, <a class="ref" href="/mn118">MN 118</a>, <a class="ref" href="/sn46.16">SN 46.16</a>, <a class="ref" href="/an6.46">AN 6.46</a>, <a class="ref" href="/an10.24">AN 10.24</a>, <a class="ref" href="/ud1.5">Ud 1.5</a>`}
              </dd>
              <dt>
                ${_`Cundaka`}
              </dt>
              <dd class="type">
                ${_`monk`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn16">DN 16</a>`}
              </dd>
            </dl>
            <h2 id="d">
              ${_`D`}
            </h2>
            <dl>
              <dt>
                ${_`Dabba Mallaputta`}
              </dt>
              <dd class="type">
                ${_`monk`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/ud8.9">Ud 8.9</a>, <a class="ref" href="/ud8.10">Ud 8.10</a>`}
              </dd>
              <dd class="life-events">
                ${_`attains Parinibbana: <a class="ref" href="/ud8.9">Ud 8.9</a>`}
              </dd>
              <dt>
                ${_`Dabbila`}
              </dt>
              <dd class="type">
                ${_`private Buddha`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn116">MN 116</a>`}
              </dd>
              <dt>
                ${_`Dadhimukha`}
              </dt>
              <dd class="type">
                ${_`spirit (yakkha)`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn32">DN 32</a>`}
              </dd>
              <dt>
                ${_`Dakkhiṇagiri`}
              </dt>
              <dd class="type">
                ${_`town`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/sn7.11">SN 7.11</a>, <a class="ref" href="/snp1.4">Snp 1.4</a>`}
              </dd>
              <dt>
                ${_`Daṇḍapāṇi`}
              </dt>
              <dd>
                ${_`<a class="ref" href="/mn18">MN 18</a>`}
              </dd>
              <dt>
                ${_`Dantikā`}
              </dt>
              <dd class="type">
                ${_`bhikkhunī (nun)`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/thig3.4">Thig 3.4</a>`}
              </dd>
              <dt>
                ${_`Dasaka`}
              </dt>
              <dd class="type">
                ${_`monk`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/sn22.89">SN 22.89</a>`}
              </dd>
              <dt>
                ${_`Dasama`}
              </dt>
              <dd class="type">
                ${_`householder of Aṭṭhakanāgara`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn52">MN 52</a>, <a class="ref" href="/an11.17">AN 11.17</a>`}
              </dd>
              <dt>
                ${_`Dasārahā`}
              </dt>
              <dd class="type">
                ${_`people`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/sn20.7">SN 20.7</a>`}
              </dd>
              <dt>
                ${_`Devadaha`}
              </dt>
              <dd class="type">
                ${_`town`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn101">MN 101</a>, <a class="ref" href="/sn22.2">SN 22.2</a>`}
              </dd>
              <dt>
                ${_`Devadatta`}
              </dt>
              <dd class="type">
                ${_`Buddha’s cousin`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn29">MN 29</a>, <a class="ref" href="/mn58">MN 58</a>, <a class="ref" href="/an8.7">AN 8.7</a>, <a class="ref" href="/iti89">Iti 89</a>`}
              </dd>
              <dt>
                ${_`Devala the Dark`}
              </dt>
              <dd class="type">
                ${_`brahmin seer`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn93">MN 93</a>`}
              </dd>
              <dt>
                ${_`Devasata`}
              </dt>
              <dd class="type">
                ${_`spirit (yakkha)`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn32">DN 32</a>`}
              </dd>
              <dt>
                ${_`Dhammā`}
              </dt>
              <dd class="type">
                ${_`bhikkhunī (nun)`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/thig1.17">Thig 1.17</a>`}
              </dd>
              <dt id="dhammadinna">
                ${_`Dhammadinnā`}
              </dt>
              <dd class="type">
                ${_`bhikkhunī (nun); praised by the Buddha as being the foremost Dhamma teacher among the bhikkhunīs`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn44">MN 44</a>`}
              </dd>
              <dt>
                ${_`Dhammika`}
              </dt>
              <dd class="type">
                ${_`monk`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/an6.54">AN 6.54</a>, <a class="ref" href="/thag4.10">Thag 4.10</a>`}
              </dd>
              <dt>
                ${_`Dhammika`}
              </dt>
              <dd>
                ${_`<a class="ref" href="/snp2.14">Snp 2.14</a>`}
              </dd>
              <dt>
                ${_`Dhanañjani`}
              </dt>
              <dd class="type">
                ${_`brahmin`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn97">MN 97</a>`}
              </dd>
              <dt>
                ${_`Dhanapāla`}
              </dt>
              <dd class="type">
                ${_`elephant`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dhp324">Dhp 324</a>`}
              </dd>
              <dt>
                ${_`Dharaṇī`}
              </dt>
              <dd class="type">
                ${_`lake`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn32">DN 32</a>`}
              </dd>
              <dt>
                ${_`Dhataraṭṭha`}
              </dt>
              <dd class="type">
                ${_`deity`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn20">DN 20</a> <a class="ref" href="/dn32">DN 32</a>`}
              </dd>
              <dt>
                ${_`Dhataraṭṭha`}
              </dt>
              <dd class="type">
                ${_`dragon`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn20">DN 20</a>`}
              </dd>
              <dt>
                ${_`Dhavajālikā (or Vaṭajālikā)`}
              </dt>
              <dd class="type">
                ${_`town`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/an8.8">AN 8.8</a>`}
              </dd>
              <dt>
                ${_`Dhotaka`}
              </dt>
              <dd class="type">
                ${_`brahmin ascetic`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/snp5.5">Snp 5.5</a>`}
              </dd>
              <dt id="dighajanu">
                ${_`Dīghajāṇu Vyagghapajja`}
              </dt>
              <dd class="type">
                ${_`“Tiger-Paw"`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/an8.54">AN 8.54</a>`}
              </dd>
              <dt id="dighavu">
                ${_`Dīghāvu`}
              </dt>
              <dd class="type">
                ${_`son of <a href="#dighiti">King Dighiti</a>`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/kd10.2.3">Kd 10.2.3–20</a>`}
              </dd>
              <dt>
                ${_`Dīghanakha Aggivessana`}
              </dt>
              <dd class="type">
                ${_`"Long-Nails”; a brahmin ascetic`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn74">MN 74</a>`}
              </dd>
              <dd class="life-events">
                ${_`goes for refuge: <a class="ref" href="/mn074">MN 074</a>`}
              </dd>
              <dt id="dighiti">
                ${_`Dīghīti`}
              </dt>
              <dd class="type">
                ${_`king of <a href="#kosala">Kosala</a>; father of <a href="#dighavu">Dīghāvu</a>`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/kd10.2.3">Kd 10.2.3–20</a>`}
              </dd>
              <dt>
                ${_`Doṇa`}
              </dt>
              <dd class="type">
                ${_`brahmin`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn16">DN 16</a>, <a class="ref" href="/an4.36">AN 4.36</a>`}
              </dd>
              <dt>
                ${_`Dummukha`}
              </dt>
              <dd class="type">
                ${_`the Licchavin`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn35">MN 35</a>`}
              </dd>
              <dt>
                ${_`Durannaya`}
              </dt>
              <dd class="type">
                ${_`private Buddha`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn116">MN 116</a>`}
              </dd>
            </dl>
            <h2 id="e">
              ${_`E`}
            </h2>
            <dl>
              <dt>
                ${_`Ekanāḷā`}
              </dt>
              <dd class="type">
                ${_`village`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/snp1.4">Snp 1.4</a>`}
              </dd>
              <dt>
                ${_`Ekuddāniya`}
              </dt>
              <dd class="type">
                ${_`monk`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/thag1.68">Thag 1.68</a>`}
              </dd>
              <dt>
                ${_`Eraka`}
              </dt>
              <dd class="type">
                ${_`monk`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/thag1.93">Thag 1.93</a>`}
              </dd>
              <dt>
                ${_`Erāpatha`}
              </dt>
              <dd class="type">
                ${_`royal snake lineage`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/an4.67">AN 4.67</a>`}
              </dd>
              <dt>
                ${_`Erāvaṇa`}
              </dt>
              <dd class="type">
                ${_`dragon`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn20">DN 20</a>`}
              </dd>
            </dl>
            <h2 id="f">
              ${_`F`}
            </h2>
            <dl>
              <dt>
                ${_`Frying Pan`}
              </dt>
              <dd class="type">
                ${_`the acrobat`}
              </dd>
              <dd>
                ${_`see <a href="#medakathalika">Medakathālika</a>`}
              </dd>
            </dl>
            <h2 id="g">
              ${_`G`}
            </h2>
            <dl>
              <dt>
                ${_`Gagga`}
              </dt>
              <dd class="type">
                ${_`clan`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn86">MN 86</a>`}
              </dd>
              <dt>
                ${_`Gaggara`}
              </dt>
              <dd class="type">
                ${_`lake`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/an7.49">AN 7.49</a>, <a class="ref" href="/an10.81">AN 10.81</a>, <a class="ref" href="/an10.94">AN 10.94</a>`}
              </dd>
              <dt>
                ${_`Gaṇaka Moggallāna`}
              </dt>
              <dd class="type">
                ${_`brahmin`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn107">MN 107</a>`}
              </dd>
              <dd class="life-events">
                ${_`<a href="https://www.accesstoinsight.org/tipitaka/mn/mn.107.horn.html#magnif">goes for refuge</a>`}
              </dd>
              <dt id="gandhabhaka">
                ${_`Gandhabhaka`}
              </dt>
              <dd class="type">
                ${_`a.k.a. Bhadraka`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/sn42.11">SN 42.11</a>`}
              </dd>
              <dt>
                ${_`Gandhāra`}
              </dt>
              <dd class="type">
                ${_`private Buddha`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn116">MN 116</a>`}
              </dd>
              <dt>
                ${_`Gandhāra`}
              </dt>
              <dd class="type">
                ${_`country`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/an3.70">AN 3.70</a>`}
              </dd>
              <dt>
                ${_`Gaṅgā`}
              </dt>
              <dd class="type">
                ${_`Ganges river`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn16">DN 16</a>, <a class="ref" href="/mn21">MN 21</a>, <a class="ref" href="/sn10.12">SN 10.12</a>, <a class="ref" href="/sn22.95">SN 22.95</a>, <a class="ref" href="/sn35.200">SN 35.200</a>, <a class="ref" href="/an3.99">AN 3.99</a>, <a class="ref" href="/an10.15">AN 10.15</a>, <a class="ref" href="/ud5.5">Ud 5.5</a>, <a class="ref" href="/snp1.10">Snp 1.10</a>, <a class="ref" href="/thag2.24">Thag 2.24</a>`}
              </dd>
              <dt>
                ${_`Gavesin`}
              </dt>
              <dd class="type">
                ${_`monk`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/an5.180">AN 5.180</a>`}
              </dd>
              <dd class="life-events">
                ${_`goes forth: <a class="ref" href="/an5.180">AN 5.180</a>; becomes an arahant: <a class="ref" href="/an5.180">AN 5.180</a>`}
              </dd>
              <dt>
                ${_`Gayā`}
              </dt>
              <dd class="type">
                ${_`city`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn26">MN 26</a>, <a class="ref" href="/sn35.28">SN 35.28</a>, <a class="ref" href="/ud1.9">Ud 1.9</a>`}
              </dd>
              <dt>
                ${_`Gayā`}
              </dt>
              <dd class="type">
                ${_`river`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn7">MN 7</a>`}
              </dd>
              <dt>
                ${_`Gayā Head`}
              </dt>
              <dd class="type">
                ${_`mountain`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/sn35.28">SN 35.28</a>, <a class="ref" href="/ud1.9">Ud 1.9</a>`}
              </dd>
              <dt>
                ${_`Ghaṭa`}
              </dt>
              <dd class="type">
                ${_`Sakyan`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn122">MN 122</a>`}
              </dd>
              <dt>
                ${_`Ghosita’s Park`}
              </dt>
              <dd>
                ${_`<a class="ref" href="/an3.72">AN 3.72</a>, <a class="ref" href="/an4.159">AN 4.159</a>, <a class="ref" href="/an4.170">AN 4.170</a>, <a class="ref" href="/sn12.68">SN 12.68</a>, <a class="ref" href="/sn51.15">SN 51.15</a>, <a class="ref" href="/sn22.85">SN 22.85</a>, <a class="ref" href="/sn35.127">SN 35.127</a>, <a class="ref" href="/sn35.193">SN 35.193</a>, <a class="ref" href="/sn48.53">SN 48.53</a>, <a class="ref" href="/ud7.10">Ud 7.10</a>`}
              </dd>
              <dt>
                ${_`Gijjhakūṭa`}
              </dt>
              <dd class="type">
                ${_`mountain`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn116">MN 116</a>`}
              </dd>
              <dt>
                ${_`Giribajja`}
              </dt>
              <dd class="type">
                ${_`mountains`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/thag10.2">Thag 10.2</a>`}
              </dd>
              <dt>
                ${_`Godatta`}
              </dt>
              <dd class="type">
                ${_`monk`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/sn41.4">SN 41.4</a>, <a class="ref" href="/thag14.2">Thag 14.2</a>`}
              </dd>
              <dt>
                ${_`Godha`}
              </dt>
              <dd class="type">
                ${_`father of <a href="#bhaddiya">Bhaddiya</a>`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/thag16.7">Thag 16.7</a>`}
              </dd>
              <dt>
                ${_`Gopāla`}
              </dt>
              <dd class="type">
                ${_`spirit (yakkha)`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn32">DN 32</a>`}
              </dd>
              <dt>
                ${_`Gosāla`}
              </dt>
              <dd class="type">
                ${_`monk`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/thag1.23">Thag 1.23</a>`}
              </dd>
              <dt>
                ${_`Gotama`}
              </dt>
              <dd class="type">
                ${_`monk`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/thag3.14">Thag 3.14</a>`}
              </dd>
              <dt>
                ${_`Gotamaka, Dark`}
              </dt>
              <dd class="type">
                ${_`royal snake lineage`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/an4.67">AN 4.67</a>`}
              </dd>
              <dt>
                ${_`Gotamaka`}
              </dt>
              <dd class="type">
                ${_`shrine`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn16">DN 16</a>, <a class="ref" href="/an3.123">AN 3.123</a>`}
              </dd>
              <dt>
                ${_`Guḷa`}
              </dt>
              <dd class="type">
                ${_`spirit (yakkha)`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn32">DN 32</a>`}
              </dd>
              <dt>
                ${_`Gundā`}
              </dt>
              <dd class="type">
                ${_`forest`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/an2.38">AN 2.38</a>`}
              </dd>
              <dt>
                ${_`Gutijjita`}
              </dt>
              <dd class="type">
                ${_`private Buddha`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn116">MN 116</a>`}
              </dd>
              <dt>
                ${_`Guttā`}
              </dt>
              <dd class="type">
                ${_`bhikkhunī (nun)`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/thig6.7">Thig 6.7</a>`}
              </dd>
            </dl>
            <h2 id="h">
              ${_`H`}
            </h2>
            <dl>
              <dt>
                ${_`Hāliddakāni`}
              </dt>
              <dd>
                ${_`<a class="ref" href="/sn22.3">SN 22.3</a>`}
              </dd>
              <dt>
                ${_`Haliddavasana`}
              </dt>
              <dd class="type">
                ${_`town`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn57">MN 57</a>`}
              </dd>
              <dt>
                ${_`Hāragajā`}
              </dt>
              <dd class="type">
                ${_`deities (devas)`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn20">DN 20</a>`}
              </dd>
              <dt>
                ${_`Hārita`}
              </dt>
              <dd class="type">
                ${_`monk`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/thag1.29">Thag 1.29</a>, <a class="ref" href="/thag3.15">Thag 3.15</a>`}
              </dd>
              <dt>
                ${_`Hatthaka`}
              </dt>
              <dd class="type">
                ${_`wealthy prince`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/an3.35">AN 3.35</a>, <a class="ref" href="/an8.23">AN 8.23</a>, <a class="ref" href="/an8.24">AN 8.24</a>`}
              </dd>
              <dt>
                ${_`Hatthigāma`}
              </dt>
              <dd class="type">
                ${_`village`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn16">DN 16</a>`}
              </dd>
              <dt>
                ${_`Hemaka`}
              </dt>
              <dd class="type">
                ${_`brahmin ascetic`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/snp5.8">Snp 5.8</a>`}
              </dd>
              <dt>
                ${_`Hemavata`}
              </dt>
              <dd class="type">
                ${_`spirit (yakkha)`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn32">DN 32</a>`}
              </dd>
              <dt>
                ${_`Himalaya (Himavanta)`}
              </dt>
              <dd class="type">
                ${_`mountains`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn20">DN 20</a>, <a class="ref" href="/sn4.20">SN 4.20</a>, <a class="ref" href="/sn46.1">SN 46.1</a>, <a class="ref" href="/sn47.7">SN 47.7</a>, <a class="ref" href="/an3.48">AN 3.48</a>, <a class="ref" href="/an5.196">AN 5.196</a>, <a class="ref" href="/dhp304">Dhp 304</a>, <a class="ref" href="/snp3.1">Snp 3.1</a>`}
              </dd>
              <dt>
                ${_`Hiṅga`}
              </dt>
              <dd class="type">
                ${_`private Buddha`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn116">MN 116</a>`}
              </dd>
              <dt>
                ${_`Hiraññavatī`}
              </dt>
              <dd class="type">
                ${_`river`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn16">DN 16</a>`}
              </dd>
              <dt>
                ${_`Hiri`}
              </dt>
              <dd class="type">
                ${_`spirit (yakkha)`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn32">DN 32</a>`}
              </dd>
            </dl>
            <h2 id="i">
              ${_`I`}
            </h2>
            <dl>
              <dt>
                ${_`Icchānaṅgala`}
              </dt>
              <dd class="type">
                ${_`village`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/an5.30">AN 5.30</a> <a class="ref" href="/an6.42">AN 6.42</a> <a class="ref" href="/an8.86">AN 8.86</a>`}
              </dd>
              <dt>
                ${_`Inda`}
              </dt>
              <dd class="type">
                ${_`yakhka`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn32">DN 32</a>`}
              </dd>
              <dt>
                ${_`Indra`}
              </dt>
              <dd class="type">
                ${_`deity (deva)`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn20">DN 20</a>, <a class="ref" href="/mn22">MN 22</a>, <a class="ref" href="/sn22.79">SN 22.79</a>, <a class="ref" href="/an11.10">AN 11.10</a>, <a class="ref" href="/dhp95">Dhp 95</a>, <a class="ref" href="/snp3.11">Snp 3.11</a>, <a class="ref" href="/thig5.11">Thig 5.11</a>, <a class="ref" href="/thag12.2">Thag 12.2</a>`}
              </dd>
              <dt>
                ${_`Īsāna`}
              </dt>
              <dd class="type">
                ${_`king of gods`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/sn11.3">SN 11.3</a>`}
              </dd>
              <dt>
                ${_`Isidatta`}
              </dt>
              <dd class="type">
                ${_`monk`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/sn41.3">SN 41.3</a>, <a class="ref" href="/thag1.120">Thag 1.120</a>`}
              </dd>
              <dt>
                ${_`Isigili`}
              </dt>
              <dd class="type">
                ${_`mountain`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn16">DN 16</a>, <a class="ref" href="/mn14">MN 14</a>, <a class="ref" href="/mn116">MN 116</a>`}
              </dd>
              <dt>
                ${_`Isipatana`}
              </dt>
              <dd class="type">
                ${_`suburb of <a href="#varanasi">Varanasi</a>`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn26">MN 26</a>, <a class="ref" href="/mn141">MN 141</a>, <a class="ref" href="/sn12.67">SN 12.67</a>, <a class="ref" href="/sn22.59">SN 22.59</a>, <a class="ref" href="/sn22.90">SN 22.90</a>, <a class="ref" href="/sn22.122">SN 22.122</a>, <a class="ref" href="/sn35.191">SN 35.191</a>, <a class="ref" href="/sn44.3">SN 44.3</a>, <a class="ref" href="/sn44.4">SN 44.4</a>, <a class="ref" href="/sn44.5">SN 44.5</a>, <a class="ref" href="/sn44.6">SN 44.6</a>, <a class="ref" href="/sn56.11">SN 56.11</a>, <a class="ref" href="/an3.15">AN 3.15</a>, <a class="ref" href="/an3.126">AN 3.126</a>`}
              </dd>
            </dl>
            <h2 id="j">
              ${_`J`}
            </h2>
            <dl>
              <dt id="jains">
                ${_`Jains`}
              </dt>
              <dd class="type">
                ${_`practitioners of Jainism; <a href="#nigantha">Nigaṇṭhas</a>`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/an3.70">AN 3.70</a>`}
              </dd>
              <dt>
                ${_`Jāḷi`}
              </dt>
              <dd class="type">
                ${_`private Buddha`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn116">MN 116</a>`}
              </dd>
              <dt>
                ${_`Jālinī`}
              </dt>
              <dd class="type">
                ${_`deity; former consort to <a href="#anuruddha">Ven. Anuruddha</a>`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/sn9.6">SN 9.6</a>`}
              </dd>
              <dt>
                ${_`Janesabha`}
              </dt>
              <dd class="type">
                ${_`spirit (yakkha)`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn32">DN 32</a>`}
              </dd>
              <dt>
                ${_`Janogha`}
              </dt>
              <dd class="type">
                ${_`heavenly city`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn32">DN 32</a>`}
              </dd>
              <dt>
                ${_`Jantu`}
              </dt>
              <dd class="type">
                ${_`village`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/ud4.1">Ud 4.1</a>`}
              </dd>
              <dt>
                ${_`Jaṇussoṇi`}
              </dt>
              <dd class="type">
                ${_`brahmin`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn4">MN 4</a>, <a class="ref" href="/mn27">MN 27</a>, <a class="ref" href="/an4.184">AN 4.184</a>, <a class="ref" href="/an10.177">AN 10.177</a>`}
              </dd>
              <dd class="life-events">
                ${_`goes for refuge: 1: <a class="ref" href="/an4.184">AN 4.184</a>, 2: <a class="ref" href="/an10.177">AN 10.177</a>`}
              </dd>
              <dt id="jata">
                ${_`Jaṭa Bhāradvāja, Ven.`}
              </dt>
              <dd>
                ${_`<a class="ref" href="/sn7.6">SN 7.6</a>`}
              </dd>
              <dd class="life-events">
                ${_`goes for refuge <a class="ref" href="/mn27">MN 27</a>, <a class="ref" href="/sn7.6">SN 7.6</a>; goes forth, becomes an arahant: <a class="ref" href="/sn7.6">SN 7.6</a>`}
              </dd>
              <dt>
                ${_`Jaṭilā Bhāgikā`}
              </dt>
              <dd class="type">
                ${_`bhikkhunī (nun)`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/an9.37">AN 9.37</a>`}
              </dd>
              <dt>
                ${_`Jatukaṇṇī`}
              </dt>
              <dd class="type">
                ${_`brahmin ascetic`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/snp5.11">Snp 5.11</a>`}
              </dd>
              <dt>
                ${_`Jayanta`}
              </dt>
              <dd class="type">
                ${_`private Buddha`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn116">MN 116</a>`}
              </dd>
              <dt>
                ${_`Jayasena, Prince`}
              </dt>
              <dd class="type">
                ${_`son of king <a href="#bimbisara">Bimbisara</a>`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn125">MN 125</a>, <a class="ref" href="/mn126">MN 126</a>`}
              </dd>
              <dt>
                ${_`Jenta`}
              </dt>
              <dd class="type">
                ${_`monk; the Royal Chaplain’s Son`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/thag1.111">Thag 1.111</a>, <a class="ref" href="/thag6.9">Thag 6.9</a>`}
              </dd>
              <dt>
                ${_`Jeta`}
              </dt>
              <dd class="type">
                ${_`private Buddha`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn116">MN 116</a>`}
              </dd>
              <dt>
                ${_`Jeta’s Grove`}
              </dt>
              <dd class="type">
                ${_`see <a href="#anathapindika-park">Anāthapiṇḍika’s park/monastery</a>`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/sn35.101">SN 35.101</a>`}
              </dd>
              <dt>
                ${_`Jita`}
              </dt>
              <dd class="type">
                ${_`private Buddha`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn116">MN 116</a>`}
              </dd>
              <dt>
                ${_`Jīva`}
              </dt>
              <dd class="type">
                ${_`<a href="#ubbiri">Ubbiri</a> ’s daughter`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/thig3.5">Thig 3.5</a>`}
              </dd>
              <dt>
                ${_`Jīvaka Komārabhacca`}
              </dt>
              <dd>
                ${_`<a class="ref" href="/an8.26">AN 8.26</a>`}
              </dd>
              <dt>
                ${_`Jīvaka`}
              </dt>
              <dd class="type">
                ${_`monk`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/thig14">Thig 14</a>`}
              </dd>
              <dt>
                ${_`Jotināmā`}
              </dt>
              <dd class="type">
                ${_`deities (devas)`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn20">DN 20</a>`}
              </dd>
            </dl>
            <h2 id="k">
              ${_`K`}
            </h2>
            <dl>
              <dt>
                ${_`Kaccāna, Ven. Mahā`}
              </dt>
              <dd class="type">
                ${_`praised by the Buddha for his mastery in analyzing the Dhamma and explaining it to others`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn18">MN 18</a>, <a class="ref" href="/mn118">MN 118</a>, <a class="ref" href="/mn138">MN 138</a>, <a class="ref" href="/sn22.3">SN 22.3</a>, <a class="ref" href="/an2.38">AN 2.38</a>, <a class="ref" href="/ud1.5">Ud 1.5</a>, <a class="ref" href="/ud5.6">Ud 5.6</a>`}
              </dd>
              <dt>
                ${_`Kaccāyana Gotta`}
              </dt>
              <dd class="type">
                ${_`monk`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/sn12.15">SN 12.15</a>, <a class="ref" href="/sn22.90">SN 22.90</a>`}
              </dd>
              <dt>
                ${_`Kajjaṅgala`}
              </dt>
              <dd class="type">
                ${_`people`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn152">MN 152</a>`}
              </dd>
              <dt>
                ${_`Kakkarapatta`}
              </dt>
              <dd>
                ${_`<a class="ref" href="/an8.54">AN 8.54</a>`}
              </dd>
              <dt>
                ${_`Kakusandha`}
              </dt>
              <dd class="type">
                ${_`previous Buddha; the fourth of the Buddhas mentioned in the Canon`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn32">DN 32</a>`}
              </dd>
              <dt>
                ${_`Kakuṭṭhā`}
              </dt>
              <dd class="type">
                ${_`river`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn16">DN 16</a>`}
              </dd>
              <dt>
                ${_`Kāla`}
              </dt>
              <dd class="type">
                ${_`private Buddha`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn116">MN 116</a>`}
              </dd>
              <dt>
                ${_`Kāla-khemaka`}
              </dt>
              <dd class="type">
                ${_`Sakyan`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn122">MN 122</a>`}
              </dd>
              <dt>
                ${_`Kālakañjas`}
              </dt>
              <dd class="type">
                ${_`race of asura demons`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn20">DN 20</a>`}
              </dd>
              <dt>
                ${_`Kalāma`}
              </dt>
              <dd class="type">
                ${_`region`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/an3.65">AN 3.65</a>`}
              </dd>
              <dt>
                ${_`Kali`}
              </dt>
              <dd class="type">
                ${_`slave`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn21">MN 21</a>`}
              </dd>
              <dt>
                ${_`Kaliṅga`}
              </dt>
              <dd>
                ${_`<a class="ref" href="/dn16">DN 16</a>`}
              </dd>
              <dt>
                ${_`Kallavāḷaputta`}
              </dt>
              <dd class="type">
                ${_`city`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/an7.58">AN 7.58</a>`}
              </dd>
              <dt>
                ${_`Kāmabhū`}
              </dt>
              <dd class="type">
                ${_`monk`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/sn41.5">SN 41.5</a>, <a class="ref" href="/sn41.6">SN 41.6</a>`}
              </dd>
              <dt>
                ${_`Kāmada`}
              </dt>
              <dd class="type">
                ${_`deity (deva)`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/sn2.6">SN 2.6</a>`}
              </dd>
              <dt>
                ${_`Kāmaseṭṭha`}
              </dt>
              <dd class="type">
                ${_`spirit (yakkha)`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn32">DN 32</a>`}
              </dd>
              <dt>
                ${_`Kambala`}
              </dt>
              <dd class="type">
                ${_`city`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn20">DN 20</a>`}
              </dd>
              <dt>
                ${_`Kamboja`}
              </dt>
              <dd class="type">
                ${_`country`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/an3.70">AN 3.70</a>`}
              </dd>
              <dt>
                ${_`Kammāsadamma`}
              </dt>
              <dd class="type">
                ${_`town`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn15">DN 15</a>, <a class="ref" href="/dn22">DN 22</a>, <a class="ref" href="/mn106">MN 106</a>, <a class="ref" href="/an10.20">AN 10.20</a>`}
              </dd>
              <dt>
                ${_`Kaṇha`}
              </dt>
              <dd class="type">
                ${_`private Buddha`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn116">MN 116</a>`}
              </dd>
              <dt>
                ${_`Kaṇhadinna`}
              </dt>
              <dd class="type">
                ${_`monk`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/thag2.30">Thag 2.30</a>`}
              </dd>
              <dt>
                ${_`<a id="revata">Kaṅkhārevata</a>.`}
              </dt>
              <dd class="type">
                ${_`“Revata the Doubter”, a monk`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/ud5.7">Ud 5.7</a>, <a class="ref" href="/thag1.3">Thag 1.3</a>`}
              </dd>
              <dt>
                ${_`Kaṇṇakatthala`}
              </dt>
              <dd class="type">
                ${_`deer park`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn90">MN 90</a>`}
              </dd>
              <dt>
                ${_`Kāpaṭika`}
              </dt>
              <dd class="type">
                ${_`brahmin student`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn95">MN 95</a>`}
              </dd>
              <dd class="life-events">
                ${_`goes for refuge: <a class="ref" href="/mn095">MN 95</a>`}
              </dd>
              <dt>
                ${_`Kapilavata`}
              </dt>
              <dd class="type">
                ${_`heavenly city`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn32">DN 32</a>`}
              </dd>
              <dt>
                ${_`Kapilavatthu`}
              </dt>
              <dd class="type">
                ${_`city`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn16">DN 16</a>, <a class="ref" href="/dn20">DN 20</a>, <a class="ref" href="/mn14">MN 14</a>, <a class="ref" href="/mn18">MN 18</a>, <a class="ref" href="/mn53">MN 53</a>, <a class="ref" href="/mn122">MN 122</a>, <a class="ref" href="/sn22.80">SN 22.80</a>, <a class="ref" href="/sn55.21">SN 55.21</a>, <a class="ref" href="/sn55.22">SN 55.22</a>, <a class="ref" href="/sn55.40">SN 55.40</a>, <a class="ref" href="/sn35.202">SN 35.202</a>, <a class="ref" href="/an3.73">AN 3.73</a>, <a class="ref" href="/an8.25">AN 8.25</a>, <a class="ref" href="/an10.46">AN 10.46</a>, <a class="ref" href="/an11.12">AN 11.12</a>, <a class="ref" href="/an11.13">AN 11.13</a>`}
              </dd>
              <dt>
                ${_`Kappa`}
              </dt>
              <dd class="type">
                ${_`brahmin ascetic`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/snp5.10">Snp 5.10</a>`}
              </dd>
              <dt>
                ${_`Kappa`}
              </dt>
              <dd class="type">
                ${_`monk`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/thag10.5">Thag 10.5</a>`}
              </dd>
              <dt>
                ${_`(Mahā) Kappina`}
              </dt>
              <dd class="type">
                ${_`monk`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn118">MN 118</a>, <a class="ref" href="/ud1.5">Ud 1.5</a>`}
              </dd>
              <dt>
                ${_`Karaṃvī`}
              </dt>
              <dd class="type">
                ${_`forest`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/thag1.22">Thag 1.22</a>`}
              </dd>
              <dt>
                ${_`Karatiya`}
              </dt>
              <dd class="type">
                ${_`spirit (yakkha)`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn32">DN 32</a>`}
              </dd>
              <dt id="kasi">
                ${_`Kasi`}
              </dt>
              <dd class="type">
                ${_`country`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/kd10.2.3">Kd 10.2.3–20</a>, <a class="ref" href="/dn12">DN 12</a>, <a class="ref" href="/mn70">MN 70</a>, <a class="ref" href="/mn87">MN 87</a>, <a class="ref" href="/sn3.14">SN 3.14</a>, <a class="ref" href="/sn3.15">SN 3.15</a>, <a class="ref" href="/an3.70">AN 3.70</a>, <a class="ref" href="/an10.29">AN 10.29</a>, <a class="ref" href="/thig14">Thig 14</a>, <a class="ref" href="/ud6.2">Ud 6.2</a>, <a class="ref" href="/thag5.9">Thag 5.9</a>`}
              </dd>
              <dt id="kasibharadvaja">
                ${_`Kasi Bhāradvāja`}
              </dt>
              <dd class="type">
                ${_`brahmin`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/snp1.4">Snp 1.4</a>`}
              </dd>
              <dd class="life-events">
                ${_`goes for refuge and goes forth: <a class="ref" href="/snp1.04">Snp 1.04</a>; becomes an arahant: <a class="ref" href="/snp1.04">Snp 1.04</a>`}
              </dd>
              <dt>
                ${_`Kassapa`}
              </dt>
              <dd class="type">
                ${_`previous Buddha; the sixth of the Buddhas mentioned in the Canon`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn32">DN 32</a>, <a class="ref" href="/an5.180">AN 5.180</a>`}
              </dd>
              <dt>
                ${_`Kassapa`}
              </dt>
              <dd class="type">
                ${_`brahmin sage`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn95">MN 95</a>, <a class="ref" href="/an7.49">AN 7.49</a>`}
              </dd>
              <dt>
                ${_`<a id="kassapa">Kassapa</a>, Ven. Mahā`}
              </dt>
              <dd class="type">
                ${_`a.k.a. “Father of the Sangha”; former husband to <a href="#bhadda">Bhaddā Kapilani</a>`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn16">DN 16</a>, <a class="ref" href="/mn118">MN 118</a>, <a class="ref" href="/sn16.5">SN 16.5</a>, <a class="ref" href="/sn46.14">SN 46.14</a>, <a class="ref" href="/thag18">Thag 18</a>, <a class="ref" href="/ud1.5">Ud 1.5</a>, <a class="ref" href="/ud1.6">Ud 1.6</a>, <a class="ref" href="/ud3.7">Ud 3.7</a>`}
              </dd>
              <dt>
                ${_`Kassapa`}
              </dt>
              <dd class="type">
                ${_`clothless ascetic`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/sn12.17">SN 12.17</a>`}
              </dd>
              <dd class="life-events">
                ${_`goes for refuge: <a class="ref" href="/sn12.17">SN 12.17</a>; goes forth: <a class="ref" href="/sn12.17">SN 12.17</a>; becomes an arahant: <a class="ref" href="/sn12.17">SN 12.17</a>`}
              </dd>
              <dt>
                ${_`Katissabha`}
              </dt>
              <dd>
                ${_`<a class="ref" href="/dn16">DN 16</a>`}
              </dd>
              <dt>
                ${_`Kaṭṭhaka`}
              </dt>
              <dd class="type">
                ${_`deities (devas)`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn20">DN 20</a>`}
              </dd>
              <dt>
                ${_`Kesaputta`}
              </dt>
              <dd class="type">
                ${_`city`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/an3.65">AN 3.65</a>`}
              </dd>
              <dt>
                ${_`Kesi`}
              </dt>
              <dd class="type">
                ${_`private Buddha`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn116">MN 116</a>`}
              </dd>
              <dt>
                ${_`Kesi`}
              </dt>
              <dd class="type">
                ${_`horse trainer`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/an4.111">AN 4.111</a>`}
              </dd>
              <dd class="life-events">
                ${_`goes for refuge: <a class="ref" href="/an4.111">AN 4.111</a>`}
              </dd>
              <dt>
                ${_`Ketumā`}
              </dt>
              <dd class="type">
                ${_`private Buddha`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn116">MN 116</a>`}
              </dd>
              <dt>
                ${_`Ketumbarāga`}
              </dt>
              <dd class="type">
                ${_`private Buddha`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn116">MN 116</a>`}
              </dd>
              <dt>
                ${_`Kevaṭṭa (Kevaddha)`}
              </dt>
              <dd class="type">
                ${_`householder`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn11">DN 11</a>`}
              </dd>
              <dt>
                ${_`Khema`}
              </dt>
              <dd class="type">
                ${_`monk`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/an6.49">AN 6.49</a>`}
              </dd>
              <dt>
                ${_`Khemā`}
              </dt>
              <dd class="type">
                ${_`bhikkhunī (nun)`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/sn44.1">SN 44.1</a>`}
              </dd>
              <dt>
                ${_`Khemābhirata`}
              </dt>
              <dd class="type">
                ${_`private Buddha`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn116">MN 116</a>`}
              </dd>
              <dt>
                ${_`Khemaka`}
              </dt>
              <dd class="type">
                ${_`monk`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/sn22.89">SN 22.89</a>`}
              </dd>
              <dt>
                ${_`Khemiyā`}
              </dt>
              <dd class="type">
                ${_`deities (devas)`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn20">DN 20</a>`}
              </dd>
              <dt>
                ${_`Khitaka`}
              </dt>
              <dd class="type">
                ${_`monk`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/thag1.104">Thag 1.104</a>`}
              </dd>
              <dt>
                ${_`Khujjuttarā`}
              </dt>
              <dd class="type">
                ${_`servant to <a href="#samavati">Queen Sāmāvatī</a>; praised by the Buddha as being foremost among the female lay disciples in terms of her learning`}
              </dd>
              <dt>
                ${_`Kimbila`}
              </dt>
              <dd class="type">
                ${_`monk`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/thag1.118">Thag 1.118</a>`}
              </dd>
              <dt>
                ${_`Kimikala`}
              </dt>
              <dd class="type">
                ${_`river`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/ud4.1">Ud 4.1</a>`}
              </dd>
              <dt>
                ${_`Kimila`}
              </dt>
              <dd class="type">
                ${_`monk`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/an7.56">AN 7.56</a>`}
              </dd>
              <dt>
                ${_`Kinnughaṇḍu`}
              </dt>
              <dd class="type">
                ${_`deity (deva)`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn20">DN 20</a>, <a class="ref" href="/dn32">DN 32</a>`}
              </dd>
              <dt>
                ${_`Kisa Gotamī`}
              </dt>
              <dd class="type">
                ${_`bhikkhunī (nun)`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/sn5.3">SN 5.3</a>, <a class="ref" href="/thig10">Thig 10</a>`}
              </dd>
              <dt>
                ${_`Kitagiri`}
              </dt>
              <dd class="type">
                ${_`town`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn70">MN 70</a>`}
              </dd>
              <dt>
                ${_`Kokanuda`}
              </dt>
              <dd class="type">
                ${_`wandering ascetic`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/an10.96">AN 10.96</a>`}
              </dd>
              <dt>
                ${_`Kolita`}
              </dt>
              <dd class="type">
                ${_`given name of Ven. Moggallāna`}
              </dd>
              <dd>
                ${_`see <a href="#moggallana">Ven. Moggallāna</a>`}
              </dd>
              <dt>
                ${_`Koliyan`}
              </dt>
              <dd class="type">
                ${_`clan`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn16">DN 16</a>, <a class="ref" href="/mn57">MN 57</a>, <a class="ref" href="/an8.54">AN 8.54</a>`}
              </dd>
              <dt>
                ${_`Komārabhacca, Jīvaka`}
              </dt>
              <dd>
                ${_`<a class="ref" href="/dn2">DN 2</a>`}
              </dd>
              <dt>
                ${_`Koṇāgamana`}
              </dt>
              <dd class="type">
                ${_`previous Buddha; the fifth of the Buddhas mentioned in the Canon`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn32">DN 32</a>`}
              </dd>
              <dt>
                ${_`Koṇḍañña`}
              </dt>
              <dd class="type">
                ${_`monk`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/sn56.11">SN 56.11</a>, <a class="ref" href="/ud7.6">Ud 7.6</a>, <a class="ref" href="/thag21">Thag 21</a>`}
              </dd>
              <dd class="life-events">
                ${_`becomes a stream-winner: <a class="ref" href="/sn56.11">SN 56.11</a>; becomes an arahant: <a class="ref" href="/sn22.59">SN 22.59</a>`}
              </dd>
              <dt>
                ${_`Koravya`}
              </dt>
              <dd class="type">
                ${_`king`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn82">MN 82</a>`}
              </dd>
              <dt>
                ${_`Kosala`}
              </dt>
              <dd class="type">
                ${_`private Buddha`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn116">MN 116</a>`}
              </dd>
              <dt id="kosala">
                ${_`Kosala`}
              </dt>
              <dd class="type">
                ${_`country`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/kd10.2.3">Kd 10.2.3–20</a>, <a class="ref" href="/dn12">DN 12</a>, <a class="ref" href="/mn41">MN 41</a>, <a class="ref" href="/mn60">MN 60</a>, <a class="ref" href="/mn87">MN 87</a>, <a class="ref" href="/sn4.20">SN 4.20</a>, <a class="ref" href="/sn7.17">SN 7.17</a>, <a class="ref" href="/sn7.18">SN 7.18</a>, <a class="ref" href="/sn9.1">SN 9.1</a>, <a class="ref" href="/sn9.6">SN 9.6</a>, <a class="ref" href="/sn9.11">SN 9.11</a>, <a class="ref" href="/sn9.14">SN 9.14</a>, <a class="ref" href="/sn42.9">SN 42.9</a>, <a class="ref" href="/an3.65">AN 3.65</a>, <a class="ref" href="/an5.30">AN 5.30</a>, <a class="ref" href="/an6.42">AN 6.42</a>, <a class="ref" href="/an7.68">AN 7.68</a>, <a class="ref" href="/an8.86">AN 8.86</a> <a class="ref" href="/an10.29">AN 10.29</a>, <a class="ref" href="/snp3.1">Snp 3.1</a>, <a class="ref" href="/ud5.9">Ud 5.9</a>, <a class="ref" href="/thag5.9">Thag 5.9</a>`}
              </dd>
              <dt id="kosambi">
                ${_`Kosambi`}
              </dt>
              <dd>
                ${_`<a class="ref" href="/dn16">DN 16</a>, <a class="ref" href="/sn22.81">SN 22.81</a>, <a class="ref" href="/sn22.89">SN 22.89</a>, <a class="ref" href="/sn35.127">SN 35.127</a>, <a class="ref" href="/sn35.193">SN 35.193</a>, <a class="ref" href="/sn51.15">SN 51.15</a>, <a class="ref" href="/sn56.31">SN 56.31</a>, <a class="ref" href="/sn48.53">SN 48.53</a>, <a class="ref" href="/an3.72">AN 3.72</a>, <a class="ref" href="/an4.159">AN 4.159</a>, <a class="ref" href="/an4.170">AN 4.170</a>, <a class="ref" href="/an5.159">AN 5.159</a>, <a class="ref" href="/an9.37">AN 9.37</a>, <a class="ref" href="/ud4.5">Ud 4.5</a> <a class="ref" href="/ud7.10">Ud 7.10</a>`}
              </dd>
              <dt>
                ${_`Koṭigāma`}
              </dt>
              <dd class="type">
                ${_`village`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn16">DN 16</a>`}
              </dd>
              <dt>
                ${_`(Mahā) Kotthita`}
              </dt>
              <dd class="type">
                ${_`monk`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn43">MN 43</a>, <a class="ref" href="/mn118">MN 118</a>, <a class="ref" href="/sn12.25">SN 12.25</a>, <a class="ref" href="/sn22.122">SN 22.122</a>, <a class="ref" href="/sn35.191">SN 35.191</a>, <a class="ref" href="/sn44.3">SN 44.3</a>, <a class="ref" href="/sn44.4">SN 44.4</a>, <a class="ref" href="/sn44.5">SN 44.5</a>, <a class="ref" href="/sn44.6">SN 44.6</a>, <a class="ref" href="/an4.174">AN 4.174</a>, <a class="ref" href="/an9.13">AN 9.13</a>, <a class="ref" href="/ud1.5">Ud 1.5</a>, <a class="ref" href="/thag1.2">Thag 1.2</a>`}
              </dd>
              <dt>
                ${_`Kukkuṭārāma`}
              </dt>
              <dd class="type">
                ${_`monastery`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn52">MN 52</a>, <a class="ref" href="/an11.17">AN 11.17</a>`}
              </dd>
              <dt>
                ${_`Kumbhīra`}
              </dt>
              <dd class="type">
                ${_`deity (deva)`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn20">DN 20</a>`}
              </dd>
              <dt>
                ${_`Kuru`}
              </dt>
              <dd class="type">
                ${_`country`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn15">DN 15</a>, <a class="ref" href="/dn22">DN 22</a>, <a class="ref" href="/mn82">MN 82</a>, <a class="ref" href="/mn106">MN 106</a> <a class="ref" href="/an3.70">AN 3.70</a>, <a class="ref" href="/an10.20">AN 10.20</a>`}
              </dd>
              <dt id="kusavati">
                ${_`Kusāvatī`}
              </dt>
              <dd class="type">
                ${_`city; later became <a href="#kusinara">Kusināra</a>`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn16">DN 16</a>`}
              </dd>
              <dt id="kusinara">
                ${_`Kusināra`}
              </dt>
              <dd class="type">
                ${_`city; formerly <a href="#kusavati">Kusāvatī</a>`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn16">DN 16</a>, <a class="ref" href="/sn6.15">SN 6.15</a>`}
              </dd>
              <dt>
                ${_`Kusināṭā`}
              </dt>
              <dd class="type">
                ${_`heavenly city`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn32">DN 32</a>`}
              </dd>
              <dt>
                ${_`Kuṭivihārin`}
              </dt>
              <dd class="type">
                ${_`monk`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/thag1.56">Thag 1.56</a>`}
              </dd>
              <dt>
                ${_`Kuvera`}
              </dt>
              <dd class="type">
                ${_`king of gods`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn20">DN 20</a>, <a class="ref" href="/dn32">DN 32</a>`}
              </dd>
            </dl>
            <h2 id="l">
              ${_`L`}
            </h2>
            <dl>
              <dt>
                ${_`Lāmaseṭṭhā`}
              </dt>
              <dd class="type">
                ${_`deities (devas)`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn20">DN 20</a>`}
              </dd>
              <dt>
                ${_`Lambītakā`}
              </dt>
              <dd class="type">
                ${_`deities (devas)`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn20">DN 20</a>`}
              </dd>
              <dt id="licchavi">
                ${_`Licchavi`}
              </dt>
              <dd class="type">
                ${_`clan`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn16">DN 16</a>, <a class="ref" href="/mn12">MN 12</a>, <a class="ref" href="/mn35">MN 35</a>, <a class="ref" href="/mn86">MN 86</a>, <a class="ref" href="/sn55.30">SN 55.30</a>, <a class="ref" href="/sn56.45">SN 56.45</a>`}
              </dd>
              <dt>
                ${_`Lohicca`}
              </dt>
              <dd class="type">
                ${_`brahmin`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn12">DN 12</a>`}
              </dd>
              <dd class="life-events">
                ${_`goes for refuge: <a class="ref" href="/dn.12.0">DN 12.0</a>`}
              </dd>
              <dt>
                ${_`Lomahaṃsa`}
              </dt>
              <dd class="type">
                ${_`private Buddha`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn116">MN 116</a>`}
              </dd>
              <dt>
                ${_`Lumbinī`}
              </dt>
              <dd class="type">
                ${_`Buddha’s birthplace`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/snp3.11">Snp 3.11</a>`}
              </dd>
            </dl>
            <h2 id="m">
              ${_`M`}
            </h2>
            <dl>
              <dt>
                ${_`Macchā`}
              </dt>
              <dd class="type">
                ${_`country`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/an3.70">AN 3.70</a>`}
              </dd>
              <dt>
                ${_`Macchikāsaṇḍa`}
              </dt>
              <dd class="type">
                ${_`city`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/sn41.3">SN 41.3</a>, <a class="ref" href="/sn41.4">SN 41.4</a>, <a class="ref" href="/sn41.5">SN 41.5</a>, <a class="ref" href="/sn41.6">SN 41.6</a>, <a class="ref" href="/sn41.7">SN 41.7</a>`}
              </dd>
              <dt>
                ${_`Maddakucchi`}
              </dt>
              <dd class="type">
                ${_`deer reserve`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/sn1.38">SN 1.38</a>, <a class="ref" href="/sn4.13">SN 4.13</a>`}
              </dd>
              <dt id="magadha">
                ${_`Magadha`}
              </dt>
              <dd class="type">
                ${_`country`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn16">DN 16</a>, <a class="ref" href="/mn14">MN 14</a>, <a class="ref" href="/mn26">MN 26</a>, <a class="ref" href="/mn108">MN 108</a>, <a class="ref" href="/mn140">MN 140</a>, <a class="ref" href="/sn38.14">SN 38.14</a>, <a class="ref" href="/sn47.13">SN 47.13</a>, <a class="ref" href="/an3.70">AN 3.70</a>, <a class="ref" href="/an4.35">AN 4.35</a>, <a class="ref" href="/an4.183">AN 4.183</a>, <a class="ref" href="/an5.114">AN 5.114</a>, <a class="ref" href="/an7.58">AN 7.58</a>, <a class="ref" href="/an10.65">AN 10.65</a>, <a class="ref" href="/an10.66">AN 10.66</a>, <a class="ref" href="/snp1.4">Snp 1.4</a>, <a class="ref" href="/snp3.1">Snp 3.1</a>, <a class="ref" href="/iti24">Iti 24</a>, <a class="ref" href="/thag5.9">Thag 5.9</a>`}
              </dd>
              <dt>
                ${_`Madhurā`}
              </dt>
              <dd class="type">
                ${_`town`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/an2.38">AN 2.38</a>`}
              </dd>
              <dt>
                ${_`Māgaṇḍiya`}
              </dt>
              <dd class="type">
                ${_`wandering ascetic`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn75">MN 75</a>, <a class="ref" href="/snp4.9">Snp 4.9</a>`}
              </dd>
              <dd class="life-events">
                ${_`goes for refuge, goes forth, becomes an arahant: <a class="ref" href="/mn075">MN 75</a>`}
              </dd>
              <dt>
                ${_`Mahāka`}
              </dt>
              <dd class="type">
                ${_`monk`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/sn41.4">SN 41.4</a>`}
              </dd>
              <dt>
                ${_`Mahākala`}
              </dt>
              <dd class="type">
                ${_`monk`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/thag2.16">Thag 2.16</a>`}
              </dd>
              <dt>
                ${_`Mahāli the Licchavi`}
              </dt>
              <dd>
                ${_`<a class="ref" href="/sn22.60">SN 22.60</a>`}
              </dd>
              <dt>
                ${_`Mahānama`}
              </dt>
              <dd class="type">
                ${_`private Buddha`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn116">MN 116</a>`}
              </dd>
              <dt>
                ${_`Mahānama, the Sakyan`}
              </dt>
              <dd class="type">
                ${_`cousin to the Buddha; brother of <a href="#anuruddha">Ven. Anuruddha</a>`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn14">MN 14</a>, <a class="ref" href="/mn53">MN 53</a>, <a class="ref" href="/sn55.21">SN 55.21</a>, <a class="ref" href="/sn55.22">SN 55.22</a>, <a class="ref" href="/sn55.54">SN 55.54</a>, <a class="ref" href="/an3.73">AN 3.73</a>, <a class="ref" href="/an8.25">AN 8.25</a>, <a class="ref" href="/an11.12">AN 11.12</a>, <a class="ref" href="/an11.13">AN 11.13</a>`}
              </dd>
              <dt>
                ${_`Mahāpajāpatī Gotamī`}
              </dt>
              <dd class="type">
                ${_`bhikkhunī (nun); Buddha’s aunt and stepmother`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn146">MN 146</a>, <a class="ref" href="/an8.53">AN 8.53</a>, <a class="ref" href="/thig6.6">Thig 6.6</a>`}
              </dd>
              <dt>
                ${_`Mahāsudassana`}
              </dt>
              <dd class="type">
                ${_`king`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn16">DN 16</a>`}
              </dd>
              <dt>
                ${_`Mahī`}
              </dt>
              <dd class="type">
                ${_`river`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/an10.15">AN 10.15</a>, <a class="ref" href="/ud5.5">Ud 5.5</a>`}
              </dd>
              <dt>
                ${_`Mahisavatthu`}
              </dt>
              <dd class="type">
                ${_`“Water Buffalo Ground”`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/an8.8">AN 8.8</a>`}
              </dd>
              <dt>
                ${_`Majjha`}
              </dt>
              <dd>
                ${_`<a class="ref" href="/thig6.5">Thig 6.5</a>`}
              </dd>
              <dt>
                ${_`Makkhali Gosāla`}
              </dt>
              <dd class="type">
                ${_`One of the six non-Buddhist ascetic teachers`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn2">DN 2</a>, <a class="ref" href="/dn16">DN 16</a>, <a class="ref" href="/mn30">MN 30</a>, <a class="ref" href="/sn3.1">SN 3.1</a>, <a class="ref" href="/sn44.9">SN 44.9</a>`}
              </dd>
              <dt>
                ${_`Makuṭabandhana`}
              </dt>
              <dd class="type">
                ${_`Buddha’s cremation site`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn16">DN 16</a>`}
              </dd>
              <dt>
                ${_`Mallā`}
              </dt>
              <dd class="type">
                ${_`clan`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn16">DN 16</a>, <a class="ref" href="/sn6.15">SN 6.15</a>, <a class="ref" href="/sn42.11">SN 42.11</a>, <a class="ref" href="/an3.70">AN 3.70</a>, <a class="ref" href="/an9.41">AN 9.41</a>, <a class="ref" href="/ud7.9">Ud 7.9</a>`}
              </dd>
              <dt>
                ${_`Mallikā`}
              </dt>
              <dd class="type">
                ${_`chief queen of King Pasenadi of Kosala`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn9">DN 9</a>, <a class="ref" href="/mn78">MN 78</a>, <a class="ref" href="/mn87">MN 87</a>, <a class="ref" href="/an5.49">AN 5.49</a>, <a class="ref" href="/ud5.1">Ud 5.1</a>`}
              </dd>
              <dd class="life-events">
                ${_`dies: <a class="ref" href="/an5.49">AN 5.49</a>`}
              </dd>
              <dt>
                ${_`Māluṅkyāputta`}
              </dt>
              <dd class="type">
                ${_`monk`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn63">MN 63</a>, <a class="ref" href="/sn35.95">SN 35.95</a>`}
              </dd>
              <dd class="life-events">
                ${_`becomes an arahant: <a class="ref" href="/sn35.95">SN 35.95</a>`}
              </dd>
              <dt>
                ${_`Mānatthaddha`}
              </dt>
              <dd class="type">
                ${_`private Buddha`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn116">MN 116</a>`}
              </dd>
              <dt>
                ${_`Mandiya`}
              </dt>
              <dd class="type">
                ${_`spirit (yakkha)`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn32">DN 32</a>`}
              </dd>
              <dt>
                ${_`Maṅgala`}
              </dt>
              <dd class="type">
                ${_`private Buddha`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn116">MN 116</a>`}
              </dd>
              <dt>
                ${_`Maṇicūḷaka`}
              </dt>
              <dd>
                ${_`<a class="ref" href="/sn42.10">SN 42.10</a>`}
              </dd>
              <dt>
                ${_`Manomaya`}
              </dt>
              <dd class="type">
                ${_`private Buddha`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn116">MN 116</a>`}
              </dd>
              <dt>
                ${_`Mantāṇī`}
              </dt>
              <dd class="type">
                ${_`brahmin lady`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn86">MN 86</a>`}
              </dd>
              <dt>
                ${_`Mānusā`}
              </dt>
              <dd class="type">
                ${_`deities (devas)`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn20">DN 20</a>`}
              </dd>
              <dt id="mara">
                ${_`Māra`}
              </dt>
              <dd class="type">
                ${_`a.k.a. <a href="#namuci">Namuci</a>, “ <a href="https://www.accesstoinsight.org/tipitaka/kn/thag/thag.04.08.than.html">Kinsman of the heedless</a> “`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn16">DN 16</a>, <a class="ref" href="/dn20">DN 20</a>, <a class="ref" href="/dn32">DN 32</a>, <a class="ref" href="/mn26">MN 26</a>, <a class="ref" href="/mn34">MN 34</a>, <a class="ref" href="/mn106">MN 106</a>, <a class="ref" href="/sn4.8">SN 4.8</a>, <a class="ref" href="/sn4.19">SN 4.19</a>, <a class="ref" href="/sn4.20">SN 4.20</a>, <a class="ref" href="/sn5.1">SN 5.1</a>, <a class="ref" href="/sn5.2">SN 5.2</a>, <a class="ref" href="/sn5.3">SN 5.3</a>, <a class="ref" href="/sn5.4">SN 5.4</a>, <a class="ref" href="/sn5.5">SN 5.5</a>, <a class="ref" href="/sn5.6">SN 5.6</a>, <a class="ref" href="/sn5.7">SN 5.7</a>, <a class="ref" href="/sn5.8">SN 5.8</a>, <a class="ref" href="/sn5.9">SN 5.9</a>, <a class="ref" href="/sn5.10">SN 5.10</a>, <a class="ref" href="/sn6.2">SN 6.2</a>, <a class="ref" href="/sn17.3">SN 17.3</a>, <a class="ref" href="/sn22.63">SN 22.63</a>, <a class="ref" href="/sn35.115">SN 35.115</a>, <a class="ref" href="/sn35.189">SN 35.189</a>, <a class="ref" href="/sn35.199">SN 35.199</a>, <a class="ref" href="/sn35.202">SN 35.202</a>, <a class="ref" href="/sn35.207">SN 35.207</a>, <a class="ref" href="/sn47.6">SN 47.6</a>, <a class="ref" href="/sn47.7">SN 47.7</a>, <a class="ref" href="/sn56.11">SN 56.11</a>, <a class="ref" href="/an4.49">AN 4.49</a>, <a class="ref" href="/an7.63">AN 7.63</a>, <a class="ref" href="/dhp7">Dhp 7</a>, <a class="ref" href="/dhp34">Dhp 34</a>, <a class="ref" href="/dhp37">Dhp 37</a>, <a class="ref" href="/dhp40">Dhp 40</a>, <a class="ref" href="/dhp46">Dhp 46</a>, <a class="ref" href="/dhp57">Dhp 57</a>, <a class="ref" href="/dhp104">Dhp 104</a>, <a class="ref" href="/dhp175">Dhp 175</a>, <a class="ref" href="/dhp274">Dhp 274</a>, <a class="ref" href="/dhp337">Dhp 337</a>, <a class="ref" href="/dhp350">Dhp 350</a>, <a class="ref" href="/iti38">Iti 38</a>, <a class="ref" href="/iti46">Iti 46</a>, <a class="ref" href="/iti57">Iti 57</a>, <a class="ref" href="/iti58">Iti 58</a>, <a class="ref" href="/iti59">Iti 59</a>, <a class="ref" href="/iti62">Iti 62</a>, <a class="ref" href="/iti68">Iti 68</a>, <a class="ref" href="/iti82">Iti 82</a>, <a class="ref" href="/iti93">Iti 93</a>, <a class="ref" href="/snp3.2">Snp 3.2</a>, <a class="ref" href="/snp3.12">Snp 3.12</a>, <a class="ref" href="/snp4.9">Snp 4.9</a>, <a class="ref" href="/snp5.10">Snp 5.10</a>, <a class="ref" href="/thag1.25">Thag 1.25</a>, <a class="ref" href="/thag21">Thag 21</a>, <a class="ref" href="/thig6.7">Thig 6.7</a>, <a class="ref" href="/thig13.5">Thig 13.5</a>`}
              </dd>
              <dd class="life-events">
                ${_`tries to outwit the Buddha: <a class="ref" href="/sn4">SN 4</a>; tries to outwit the nuns: <a class="ref" href="/sn5">SN 5</a>`}
              </dd>
              <dt>
                ${_`Mātali`}
              </dt>
              <dd class="type">
                ${_`spirit (yakkha)`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn20">DN 20</a>, <a class="ref" href="/dn32">DN 32</a>, <a class="ref" href="/sn11.4">SN 11.4</a>`}
              </dd>
              <dt>
                ${_`Mātaṅga`}
              </dt>
              <dd class="type">
                ${_`private Buddha`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn116">MN 116</a>`}
              </dd>
              <dt>
                ${_`Mātaṅga`}
              </dt>
              <dd class="type">
                ${_`wilderness area`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dhp329">Dhp 329</a>, <a class="ref" href="/snp1.3">Snp 1.3</a>`}
              </dd>
              <dt>
                ${_`Mātaṅgaputta`}
              </dt>
              <dd class="type">
                ${_`monk`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/thag3.5">Thag 3.5</a>`}
              </dd>
              <dt>
                ${_`Māyā`}
              </dt>
              <dd class="type">
                ${_`deity (deva)`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn20">DN 20</a>`}
              </dd>
              <dt id="medakathalika">
                ${_`Medakathālika`}
              </dt>
              <dd class="type">
                ${_`acrobat`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/sn47.19">SN 47.19</a>`}
              </dd>
              <dt>
                ${_`Megha`}
              </dt>
              <dd class="type">
                ${_`private Buddha`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn116">MN 116</a>`}
              </dd>
              <dt>
                ${_`Meghiya`}
              </dt>
              <dd class="type">
                ${_`monk`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/ud4.1">Ud 4.1</a>`}
              </dd>
              <dt>
                ${_`Meru`}
              </dt>
              <dd class="type">
                ${_`mountain`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn32">DN 32</a>, <a class="ref" href="/snp3.11">Snp 3.11</a>`}
              </dd>
              <dt>
                ${_`Methula`}
              </dt>
              <dd class="type">
                ${_`private Buddha`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn116">MN 116</a>`}
              </dd>
              <dt>
                ${_`Mettagū`}
              </dt>
              <dd class="type">
                ${_`brahmin ascetic`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/snp5.4">Snp 5.4</a>`}
              </dd>
              <dt>
                ${_`Migacīra`}
              </dt>
              <dd class="type">
                ${_`garden`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn82">MN 82</a>`}
              </dd>
              <dt>
                ${_`Migajāla`}
              </dt>
              <dd class="type">
                ${_`monk`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/sn35.63">SN 35.63</a>`}
              </dd>
              <dt id="migara">
                ${_`Migāra`}
              </dt>
              <dd>
                ${_`<a class="ref" href="/an3.66">AN 3.66</a>`}
              </dd>
              <dt id="migaramom">
                ${_`Migāra’s Mother’s Palace`}
              </dt>
              <dd class="type">
                ${_`see also <a href="#visakha1">Visākhā, a.k.a. “Migāra’s Mother"</a>`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn26">MN 26</a>, <a class="ref" href="/mn107">MN 107</a>, <a class="ref" href="/mn109">MN 109</a>, <a class="ref" href="/mn110">MN 110</a>, <a class="ref" href="/mn118">MN 118</a>, <a class="ref" href="/mn121">MN 121</a>, <a class="ref" href="/sn48.41">SN 48.41</a>, <a class="ref" href="/an3.66">AN 3.66</a>, <a class="ref" href="/an3.70">AN 3.70</a>, <a class="ref" href="/an8.43">AN 8.43</a>, <a class="ref" href="/snp3.12">Snp 3.12</a>, <a class="ref" href="/ud2.9">Ud 2.9</a>, <a class="ref" href="/ud5.5">Ud 5.5</a>, <a class="ref" href="/ud6.2">Ud 6.2</a>, <a class="ref" href="/ud8.8">Ud 8.8</a>`}
              </dd>
              <dt>
                ${_`Migāra Rohaneyya`}
              </dt>
              <dd>
                ${_`<a class="ref" href="/an7.7">AN 7.7</a>`}
              </dd>
              <dt>
                ${_`Mithilā`}
              </dt>
              <dd class="type">
                ${_`city`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/thig6.2">Thig 6.2</a>`}
              </dd>
              <dt>
                ${_`Mittakāḷī`}
              </dt>
              <dd class="type">
                ${_`bhikkhunī (nun)`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/thig5.6">Thig 5.6</a>`}
              </dd>
              <dt id="moggallana">
                ${_`(Mahā) Moggallāna`}
              </dt>
              <dd class="type">
                ${_`monk, a.k.a Kolita; praised by the Buddha as being foremost among the bhikkhus in terms of his mastery of psychic powers; he and <a href="#sariputta">Ven. Sāriputta</a> were the Buddha’s two chief disciples`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/kd1.23.1">Kd 1.23.01–10</a>, <a class="ref" href="/mn118">MN 118</a>, <a class="ref" href="/mn141">MN 141</a>, <a class="ref" href="/sn21.1">SN 21.1</a>, <a class="ref" href="/sn40.9">SN 40.9</a>, <a class="ref" href="/sn44.7">SN 44.7</a>, <a class="ref" href="/sn35.202">SN 35.202</a>, <a class="ref" href="/an7.58">AN 7.58</a>, <a class="ref" href="/ud1.5">Ud 1.5</a>, <a class="ref" href="/ud3.5">Ud 3.5</a>, <a class="ref" href="/ud4.4">Ud 4.4</a>, <a class="ref" href="/ud5.5">Ud 5.5</a>; <a class="ref" href="/thag17.2">Thag 17.2</a>, <a class="ref" href="/thag21">Thag 21</a>`}
              </dd>
              <dd class="life-events">
                ${_`becomes a stream-winner: <a class="ref" href="/kd1.23.1">Kd 1.23.01–10</a>.`}
              </dd>
              <dt>
                ${_`Moggallāna`}
              </dt>
              <dd class="type">
                ${_`the guardsman`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn108">MN 108</a>`}
              </dd>
              <dt>
                ${_`Mogharāja`}
              </dt>
              <dd class="type">
                ${_`brahmin ascetic`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/snp5.15">Snp 5.15</a>`}
              </dd>
              <dt>
                ${_`Moḷiya Phagguna`}
              </dt>
              <dd>
                ${_`<a class="ref" href="/sn12.12">SN 12.12</a>`}
              </dd>
              <dt>
                ${_`Moḷiyasīvaka`}
              </dt>
              <dd class="type">
                ${_`brahmin ascetic`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/sn36.21">SN 36.21</a>; <a class="ref" href="/an6.47">AN 6.47</a>`}
              </dd>
              <dd class="life-events">
                ${_`goes for refuge: <a class="ref" href="/sn36.21">SN 36.21</a>, <a class="ref" href="/an6.47">AN 6.47</a>`}
              </dd>
              <dt>
                ${_`Moriya`}
              </dt>
              <dd class="type">
                ${_`clan`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn16">DN 16</a>`}
              </dd>
              <dt>
                ${_`Muccalinda`}
              </dt>
              <dd class="type">
                ${_`dragon king`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/ud2.1">Ud 2.1</a>`}
              </dd>
              <dt>
                ${_`Muṇḍika`}
              </dt>
              <dd>
                ${_`<a class="ref" href="/mn78">MN 78</a>`}
              </dd>
              <dt>
                ${_`Musila`}
              </dt>
              <dd class="type">
                ${_`monk`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/sn12.68">SN 12.68</a>`}
              </dd>
              <dt>
                ${_`Muttā`}
              </dt>
              <dd class="type">
                ${_`bhikkhunī (nun)`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/thig1.11">Thig 1.11</a>`}
              </dd>
            </dl>
            <h2 id="n">
              ${_`N`}
            </h2>
            <dl>
              <dt>
                ${_`Nabhasa`}
              </dt>
              <dd class="type">
                ${_`lake`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn20">DN 20</a>`}
              </dd>
              <dt>
                ${_`Nādikā`}
              </dt>
              <dd class="type">
                ${_`city`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn16">DN 16</a>, <a class="ref" href="/an6.19">AN 6.19</a>, <a class="ref" href="/an11.10">AN 11.10</a>`}
              </dd>
              <dt>
                ${_`Nagaraka`}
              </dt>
              <dd class="type">
                ${_`town`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn121">MN 121</a>`}
              </dd>
              <dt>
                ${_`Nāgasamāla`}
              </dt>
              <dd class="type">
                ${_`monk`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn12">MN 12</a>`}
              </dd>
              <dt>
                ${_`Nāgita`}
              </dt>
              <dd class="type">
                ${_`monk`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/an5.30">AN 5.30</a>, <a class="ref" href="/an6.42">AN 6.42</a>, <a class="ref" href="/an8.86">AN 8.86</a>, <a class="ref" href="/thag1.86">Thag 1.86</a>`}
              </dd>
              <dt>
                ${_`Nakula’s parents`}
              </dt>
              <dd class="type">
                ${_`praised by the Buddha for their unwavering faithfulness to each other`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/an4.55">AN 4.55</a>, <a class="ref" href="/an6.16">AN 6.16</a>`}
              </dd>
              <dt>
                ${_`Nakulapita`}
              </dt>
              <dd class="type">
                ${_`Nakula’s father`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/sn22.1">SN 22.1</a>`}
              </dd>
              <dt>
                ${_`Naḷa`}
              </dt>
              <dd class="type">
                ${_`spirit (yakkha)`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn20">DN 20</a>, <a class="ref" href="/dn32">DN 32</a>`}
              </dd>
              <dt>
                ${_`Nālaka`}
              </dt>
              <dd>
                ${_`<a class="ref" href="/snp3.11">Snp 3.11</a>`}
              </dd>
              <dt>
                ${_`Nālaka`}
              </dt>
              <dd class="type">
                ${_`village`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/sn38.14">SN 38.14</a>, <a class="ref" href="/sn47.13">SN 47.13</a>, <a class="ref" href="/an10.65">AN 10.65</a>, <a class="ref" href="/an10.66">AN 10.66</a>`}
              </dd>
              <dt>
                ${_`Nāḷandā`}
              </dt>
              <dd class="type">
                ${_`city`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn11">DN 11</a>, <a class="ref" href="/dn16">DN 16</a>, <a class="ref" href="/sn42.6">SN 42.6</a>, <a class="ref" href="/sn42.8">SN 42.8</a>, <a class="ref" href="/sn42.9">SN 42.9</a>`}
              </dd>
              <dt>
                ${_`Nāḷijaṅgha`}
              </dt>
              <dd class="type">
                ${_`brahmin`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn87">MN 87</a>`}
              </dd>
              <dt id="namuci">
                ${_`Namuci`}
              </dt>
              <dd class="type">
                ${_`a.k.a. <a href="#mara">Māra</a>`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/snp3.2">Snp 3.2</a>`}
              </dd>
              <dt>
                ${_`Namuci`}
              </dt>
              <dd class="type">
                ${_`asura demon`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn20">DN 20</a>`}
              </dd>
              <dt>
                ${_`Nanda`}
              </dt>
              <dd class="type">
                ${_`private Buddha`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn116">MN 116</a>`}
              </dd>
              <dt>
                ${_`Nandā`}
              </dt>
              <dd class="type">
                ${_`bhikkhunī (nun); praised by the Buddha as being foremost among the bhikkhunīs in terms of her mastery of jhāna`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn16">DN 16</a>, <a class="ref" href="/thig5.4">Thig 5.4</a>`}
              </dd>
              <dt>
                ${_`Nanda`}
              </dt>
              <dd class="type">
                ${_`monk; half-brother of the Buddha`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/an8.9">AN 8.9</a>, <a class="ref" href="/ud1.5">Ud 1.5</a>, <a class="ref" href="/ud3.2">Ud 3.2</a>`}
              </dd>
              <dd class="life-events">
                ${_`becomes an arahant: <a class="ref" href="/ud3.2">Ud 3.2</a>`}
              </dd>
              <dt>
                ${_`Nanda`}
              </dt>
              <dd class="type">
                ${_`brahmin ascetic`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/snp5.7">Snp 5.7</a>`}
              </dd>
              <dt>
                ${_`Nanda`}
              </dt>
              <dd class="type">
                ${_`cowherd`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/sn35.200">SN 35.200</a>`}
              </dd>
              <dd class="life-events">
                ${_`goes forth, becomes an arahant: <a class="ref" href="/sn35.200">SN 35.200</a>`}
              </dd>
              <dt>
                ${_`Nandaka`}
              </dt>
              <dd class="type">
                ${_`monk`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn146">MN 146</a>, <a class="ref" href="/an3.66">AN 3.66</a>, <a class="ref" href="/thag2.27">Thag 2.27</a>`}
              </dd>
              <dt>
                ${_`Nandaka`}
              </dt>
              <dd class="type">
                ${_`chief minister of the <a href="#licchavi">Licchavi clan</a>`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/sn55.30">SN 55.30</a>`}
              </dd>
              <dt>
                ${_`Nandana`}
              </dt>
              <dd class="type">
                ${_`deva garden`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/sn9.6">SN 9.6</a>, <a class="ref" href="/sn55.1">SN 55.1</a>, <a class="ref" href="/an5.34">AN 5.34</a>`}
              </dd>
              <dt>
                ${_`Nandiya`}
              </dt>
              <dd class="type">
                ${_`monk`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/thag1.25">Thag 1.25</a>`}
              </dd>
              <dt>
                ${_`Nandiya`}
              </dt>
              <dd class="type">
                ${_`Sakyan`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/sn55.40">SN 55.40</a>`}
              </dd>
              <dt>
                ${_`Narada`}
              </dt>
              <dd class="type">
                ${_`monk`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/sn12.68">SN 12.68</a>`}
              </dd>
              <dt>
                ${_`Nṭta`}
              </dt>
              <dd>
                ${_`<a class="ref" href="/dn2">DN 2</a>`}
              </dd>
              <dt>
                ${_`Naṭapuriya`}
              </dt>
              <dd class="type">
                ${_`heavenly city`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn32">DN 32</a>`}
              </dd>
              <dt id="navak">
                ${_`Navakammika Bhāradvāja`}
              </dt>
              <dd class="type">
                ${_`brahmin`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/sn7.17">SN 7.17</a>`}
              </dd>
              <dd class="life-events">
                ${_`goes for refuge: <a class="ref" href="/sn7.17">SN 7.17</a>`}
              </dd>
              <dt>
                ${_`Ñātika`}
              </dt>
              <dd class="type">
                ${_`town`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/sn44.11">SN 44.11</a>`}
              </dd>
              <dt>
                ${_`Navanavutī`}
              </dt>
              <dd class="type">
                ${_`heavenly city`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn32">DN 32</a>`}
              </dd>
              <dt>
                ${_`Nemi`}
              </dt>
              <dd class="type">
                ${_`spirit (yakkha)`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn32">DN 32</a>`}
              </dd>
              <dt>
                ${_`Nemisa`}
              </dt>
              <dd class="type">
                ${_`private Buddha`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn116">MN 116</a>`}
              </dd>
              <dt>
                ${_`Nerañjara`}
              </dt>
              <dd class="type">
                ${_`river`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/sn6.1">SN 6.1</a>, <a class="ref" href="/sn6.2">SN 6.2</a>, <a class="ref" href="/snp3.2">Snp 3.2</a>, <a class="ref" href="/ud1.1">Ud 1.1</a>, <a class="ref" href="/ud1.2">Ud 1.2</a>, <a class="ref" href="/ud1.3">Ud 1.3</a>, <a class="ref" href="/ud2.1">Ud 2.1</a>, <a class="ref" href="/ud3.10">Ud 3.10</a>`}
              </dd>
              <dt>
                ${_`Netti`}
              </dt>
              <dd class="type">
                ${_`spirit (yakkha)`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn32">DN 32</a>`}
              </dd>
              <dt>
                ${_`Nighaṇḍu`}
              </dt>
              <dd class="type">
                ${_`spirit (yakkha)`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn32">DN 32</a>`}
              </dd>
              <dt id="nataputta">
                ${_`Nigaṇṭha Nātaputta`}
              </dt>
              <dd class="type">
                ${_`<a href="#jains">Jain</a> teacher; see also <a href="#nigantha">Nigaṇṭhas</a>`}
              </dd>
              <dd>
                ${_`DN 2 (1): <a class="ref" href="/dn.02.0">DN 2.0</a>, DN 2 (2): <a class="ref" href="/dn.02.0">DN 2.0</a>, <a class="ref" href="/dn16">DN 16</a>, <a class="ref" href="/mn14">MN 14</a>, <a class="ref" href="/mn30">MN 30</a>, <a class="ref" href="/mn58">MN 58</a>, <a class="ref" href="/sn3.1">SN 3.1</a>, <a class="ref" href="/sn42.8">SN 42.8</a>, <a class="ref" href="/sn42.9">SN 42.9</a>, <a class="ref" href="/sn44.9">SN 44.9</a>, <a class="ref" href="/an9.38">AN 9.38</a>`}
              </dd>
              <dt id="nigantha">
                ${_`Nigaṇṭhas`}
              </dt>
              <dd class="type">
                ${_`<a href="#jains">Jains</a>; see also <a href="#nataputta">Nigaṇṭha Nātaputta</a>`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/an3.70">AN 3.70</a>, <a class="ref" href="/mn14">MN 14</a>`}
              </dd>
              <dt>
                ${_`Nigrodha`}
              </dt>
              <dd class="type">
                ${_`monk`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/thag1.21">Thag 1.21</a>`}
              </dd>
              <dt>
                ${_`Nigrodhakappa`}
              </dt>
              <dd class="type">
                ${_`monk`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/thag21">Thag 21</a>`}
              </dd>
              <dt>
                ${_`Nigrodha Park`}
              </dt>
              <dd>
                ${_`<a class="ref" href="/sn55.21">SN 55.21</a>, <a class="ref" href="/sn55.22">SN 55.22</a>, <a class="ref" href="/an8.25">AN 8.25</a>`}
              </dd>
              <dt>
                ${_`Nikata`}
              </dt>
              <dd>
                ${_`<a class="ref" href="/dn16">DN 16</a>`}
              </dd>
              <dt>
                ${_`Nimmānaratī`}
              </dt>
              <dd class="type">
                ${_`deities (devas)`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn11">DN 11</a>, <a class="ref" href="/dn20">DN 20</a>, <a class="ref" href="/sn56.11">SN 56.11</a>`}
              </dd>
              <dt>
                ${_`Niraya`}
              </dt>
              <dd class="type">
                ${_`hell`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/snp2.6">Snp 2.6</a>, <a class="ref" href="/snp2.10">Snp 2.10</a>`}
              </dd>
              <dt>
                ${_`Nīta`}
              </dt>
              <dd class="type">
                ${_`monk`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/thag1.84">Thag 1.84</a>`}
              </dd>
              <dt>
                ${_`Nītha`}
              </dt>
              <dd class="type">
                ${_`private Buddha`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn116">MN 116</a>`}
              </dd>
            </dl>
            <h2 id="o">
              ${_`O`}
            </h2>
            <dl>
              <dt>
                ${_`Ojasi`}
              </dt>
              <dd class="type">
                ${_`spirit (yakkha)`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn32">DN 32</a>`}
              </dd>
              <dt>
                ${_`Okkala`}
              </dt>
              <dd class="type">
                ${_`city`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn117">MN 117</a>`}
              </dd>
              <dt>
                ${_`Opamañña`}
              </dt>
              <dd class="type">
                ${_`spirit (yakkha)`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn32">DN 32</a>`}
              </dd>
            </dl>
            <h2 id="pq">
              ${_`PQ`}
            </h2>
            <dl>
              <dt>
                ${_`Pabbata`}
              </dt>
              <dd class="type">
                ${_`private Buddha`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn116">MN 116</a>`}
              </dd>
              <dt>
                ${_`Pacetana`}
              </dt>
              <dd class="type">
                ${_`king`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/an3.15">AN 3.15</a>`}
              </dd>
              <dt>
                ${_`Paduma`}
              </dt>
              <dd class="type">
                ${_`private Buddha`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn116">MN 116</a>`}
              </dd>
              <dt>
                ${_`Padumuttara`}
              </dt>
              <dd class="type">
                ${_`private Buddha`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn116">MN 116</a>`}
              </dd>
              <dt>
                ${_`Pahārāda`}
              </dt>
              <dd class="type">
                ${_`asura demon`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn20">DN 20</a>`}
              </dd>
              <dt>
                ${_`Pajāpati`}
              </dt>
              <dd class="type">
                ${_`king of gods`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn32">DN 32</a>, <a class="ref" href="/mn1">MN 1</a>, <a class="ref" href="/mn22">MN 22</a>, <a class="ref" href="/mn49">MN 49</a>, <a class="ref" href="/sn11.3">SN 11.3</a>, <a class="ref" href="/sn22.79">SN 22.79</a>, <a class="ref" href="/an11.10">AN 11.10</a>`}
              </dd>
              <dt>
                ${_`Pajjota`}
              </dt>
              <dd class="type">
                ${_`king`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn108">MN 108</a>`}
              </dd>
              <dt>
                ${_`Pajunna`}
              </dt>
              <dd class="type">
                ${_`spirit (yakkha)`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn20">DN 20</a>, <a class="ref" href="/dn32">DN 32</a>`}
              </dd>
              <dt>
                ${_`Pakudha Kaccāyana`}
              </dt>
              <dd class="type">
                ${_`one of the six non-Buddhist ascetic teachers`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn16">DN 2</a>, <a class="ref" href="/dn16">DN 16</a>, <a class="ref" href="/mn30">MN 30</a>, <a class="ref" href="/sn3.1">SN 3.1</a>, <a class="ref" href="/sn44.9">SN 44.9</a>`}
              </dd>
              <dt>
                ${_`Panāda`}
              </dt>
              <dd class="type">
                ${_`deity (deva)`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn20">DN 20</a>`}
              </dd>
              <dt>
                ${_`Panāda`}
              </dt>
              <dd class="type">
                ${_`spirit (yakkha)`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn32">DN 32</a>`}
              </dd>
              <dt>
                ${_`Paṇḍava`}
              </dt>
              <dd class="type">
                ${_`mountain`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn116">MN 116</a>, <a class="ref" href="/snp3.1">Snp 3.1</a>, <a class="ref" href="/thag1.41">Thag 1.41</a>`}
              </dd>
              <dt>
                ${_`Paṅga`}
              </dt>
              <dd class="type">
                ${_`private Buddha`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn116">MN 116</a>`}
              </dd>
              <dt>
                ${_`Pañcakaṅga`}
              </dt>
              <dd class="type">
                ${_`carpenter to <a href="#pasenadi">King Pasenadi</a>`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn59">MN 59</a>, <a class="ref" href="/mn59">MN 59</a>, <a class="ref" href="/mn78">MN 78</a>, <a class="ref" href="/sn36.19">SN 36.19</a>`}
              </dd>
              <dt>
                ${_`Pañcāla`}
              </dt>
              <dd class="type">
                ${_`country`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/an3.70">AN 3.70</a>`}
              </dd>
              <dt>
                ${_`Pañcālacaṇḍa`}
              </dt>
              <dd class="type">
                ${_`deva’s son`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/sn2.7">SN 2.7</a>`}
              </dd>
              <dt>
                ${_`Pañcālacaṇḍa`}
              </dt>
              <dd class="type">
                ${_`spirit (yakkha)`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn32">DN 32</a>`}
              </dd>
              <dt>
                ${_`Pañcasikha`}
              </dt>
              <dd class="type">
                ${_`deity (deva)`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn20">DN 20</a>`}
              </dd>
              <dt>
                ${_`Pāragā`}
              </dt>
              <dd class="type">
                ${_`deities (devas)`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn20">DN 20</a>`}
              </dd>
              <dt>
                ${_`Parakusināṭā`}
              </dt>
              <dd class="type">
                ${_`heavenly city`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn32">DN 32</a>`}
              </dd>
              <dt>
                ${_`Paramatta`}
              </dt>
              <dd class="type">
                ${_`high divinity (brahmā)`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn20">DN 20</a>`}
              </dd>
              <dt>
                ${_`Paranimmita-vasavatti`}
              </dt>
              <dd class="type">
                ${_`deities (devas)`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn11">DN 11</a>, <a class="ref" href="/dn20">DN 20</a>, <a class="ref" href="/sn56.11">SN 56.11</a>`}
              </dd>
              <dt id="parasiri">
                ${_`Parasivi`}
              </dt>
              <dd class="type">
                ${_`brahmin`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn152">MN 152</a>`}
              </dd>
              <dt id="pari">
                ${_`Pārileyyaka`}
              </dt>
              <dd class="type">
                ${_`city`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/sn22.85">SN 22.85</a>, <a class="ref" href="/ud4.5">Ud 4.5</a>`}
              </dd>
              <dt id="pasenadi">
                ${_`Pasenadi`}
              </dt>
              <dd class="type">
                ${_`king of <a href="#kosala">Kosala</a>; uncle of <a href="#ajatasattu">King Ajātasattu</a>`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn12">DN 12</a>, <a class="ref" href="/mn24">MN 24</a>, <a class="ref" href="/mn35">MN 35</a>, <a class="ref" href="/mn86">MN 86</a>, <a class="ref" href="/mn87">MN 87</a>, <a class="ref" href="/mn90">MN 90</a>, <a class="ref" href="/sn3.1">SN 3.1</a>, <a class="ref" href="/sn3.4">SN 3.4</a>, <a class="ref" href="/sn3.5">SN 3.5</a>, <a class="ref" href="/sn3.6">SN 3.6</a>, <a class="ref" href="/sn3.7">SN 3.7</a>, <a class="ref" href="/sn3.13">SN 3.13</a>, <a class="ref" href="/sn3.14">SN 3.14</a>, <a class="ref" href="/sn3.15">SN 3.15</a>, <a class="ref" href="/sn3.17">SN 3.17</a>, <a class="ref" href="/sn3.19">SN 3.19</a>, <a class="ref" href="/sn3.20">SN 3.20</a>, <a class="ref" href="/sn3.23">SN 3.23</a>, <a class="ref" href="/sn3.24">SN 3.24</a>, <a class="ref" href="/sn3.25">SN 3.25</a>, <a class="ref" href="/sn44.1">SN 44.1</a>, <a class="ref" href="/an5.49">AN 5.49</a>, <a class="ref" href="/an10.29">AN 10.29</a>, <a class="ref" href="/ud2.2">Ud 2.2</a>, <a class="ref" href="/ud2.6">Ud 2.6</a>, <a class="ref" href="/ud2.9">Ud 2.9</a>, <a class="ref" href="/ud5.1">Ud 5.1</a>, <a class="ref" href="/ud6.2">Ud 6.2</a>`}
              </dd>
              <dd class="life-events">
                ${_`goes for refuge: <a class="ref" href="/sn3.1">SN 3.1</a>`}
              </dd>
              <dt>
                ${_`Passi`}
              </dt>
              <dd class="type">
                ${_`private Buddha`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn116">MN 116</a>`}
              </dd>
              <dt>
                ${_`Pasura`}
              </dt>
              <dd>
                ${_`<a class="ref" href="/snp4.8">Snp 4.8</a>`}
              </dd>
              <dt>
                ${_`Paṭācārā`}
              </dt>
              <dd class="type">
                ${_`bhikkhunī (nun); praised by the Buddha as being foremost among the bhikkhunīs in terms of her mastery of Vinaya`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/thig5.10">Thig 5.10</a>, <a class="ref" href="/thig5.11">Thig 5.11</a>, <a class="ref" href="/thig5.12">Thig 5.12</a>, <a class="ref" href="/thig6.1">Thig 6.1</a>`}
              </dd>
              <dt>
                ${_`Pātaligāma`}
              </dt>
              <dd class="type">
                ${_`village`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn16">DN 16</a>`}
              </dd>
              <dt>
                ${_`Pāṭaliputta`}
              </dt>
              <dd class="type">
                ${_`city`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn16">DN 16</a>, <a class="ref" href="/mn52">MN 52</a>, <a class="ref" href="/an11.17">AN 11.17</a>`}
              </dd>
              <dt>
                ${_`Paṭibhāna`}
              </dt>
              <dd class="type">
                ${_`"Inspiration" peak`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/sn56.42">SN 56.42</a>`}
              </dd>
              <dt>
                ${_`Pāvā`}
              </dt>
              <dd class="type">
                ${_`city`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn16">DN 16</a>, <a class="ref" href="/sn15.13">SN 15.13</a>, <a class="ref" href="/an10.176">AN 10.176</a>, <a class="ref" href="/ud1.7">Ud 1.7</a>`}
              </dd>
              <dt>
                ${_`Pāvārika’s mango grove`}
              </dt>
              <dd>
                ${_`<a class="ref" href="/dn11">DN 11</a>, <a class="ref" href="/dn16">DN 16</a>, <a class="ref" href="/sn42.6">SN 42.6</a>, <a class="ref" href="/sn42.8">SN 42.8</a>`}
              </dd>
              <dt>
                ${_`Pavatta`}
              </dt>
              <dd class="type">
                ${_`private Buddha`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn116">MN 116</a>`}
              </dd>
              <dt>
                ${_`Pavatta`}
              </dt>
              <dd class="type">
                ${_`mountain`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/ud5.6">Ud 5.6</a>`}
              </dd>
              <dt>
                ${_`Paviṭṭha`}
              </dt>
              <dd class="type">
                ${_`monk`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/sn12.68">SN 12.68</a>`}
              </dd>
              <dt>
                ${_`Payāga`}
              </dt>
              <dd class="type">
                ${_`ford on the Ganges (modern Allahabad)`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn20">DN 20</a>, <a class="ref" href="/mn7">MN 7</a>`}
              </dd>
              <dd>
                ${_`<a id="pekhuniya">Pekhuniya</a>`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/an3.66">AN 3.66</a>`}
              </dd>
              <dt>
                ${_`Pigeon Cave`}
              </dt>
              <dd>
                ${_`<a class="ref" href="/ud4.4">Ud 4.4</a>`}
              </dd>
              <dt>
                ${_`Pilotika Vacchāyana`}
              </dt>
              <dd class="type">
                ${_`wanderer`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn27">MN 27</a>`}
              </dd>
              <dt>
                ${_`Piṇḍola`}
              </dt>
              <dd class="type">
                ${_`private Buddha`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn116">MN 116</a>`}
              </dd>
              <dt id="pindola">
                ${_`Piṇḍola Bhāradvāja`}
              </dt>
              <dd class="type">
                ${_`monk`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/sn35.127">SN 35.127</a>, <a class="ref" href="/ud4.6">Ud 4.6</a>`}
              </dd>
              <dd class="life-events">
                ${_`goes for refuge: <a class="ref" href="/sn35.127">SN 35.127</a>`}
              </dd>
              <dt>
                ${_`Piṅgalakoccha`}
              </dt>
              <dd class="type">
                ${_`brahmin`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn30">MN 30</a>`}
              </dd>
              <dd class="life-events">
                ${_`goes for refuge: <a class="ref" href="/mn030">MN 30</a>`}
              </dd>
              <dt>
                ${_`Piṅgiya`}
              </dt>
              <dd class="type">
                ${_`brahmin ascetic`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/snp5.16">Snp 5.16</a>`}
              </dd>
              <dt>
                ${_`Pipphalī Cave`}
              </dt>
              <dd>
                ${_`<a class="ref" href="/ud1.6">Ud 1.6</a>, <a class="ref" href="/ud3.7">Ud 3.7</a>`}
              </dd>
              <dt>
                ${_`Pipphalīvana`}
              </dt>
              <dd class="type">
                ${_`city`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn16">DN 16</a>`}
              </dd>
              <dt>
                ${_`Piyadassī`}
              </dt>
              <dd class="type">
                ${_`private Buddha`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn116">MN 116</a>`}
              </dd>
              <dt>
                ${_`Posāla`}
              </dt>
              <dd class="type">
                ${_`brahmin ascetic`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/snp5.14">Snp 5.14</a>`}
              </dd>
              <dt>
                ${_`Potaliputta`}
              </dt>
              <dd>
                ${_`<a class="ref" href="/mn136">MN 136</a>`}
              </dd>
              <dt>
                ${_`Poṭṭhapāda`}
              </dt>
              <dd>
                ${_`<a class="ref" href="/dn9">DN 9</a>`}
              </dd>
              <dd class="life-events">
                ${_`goes for refuge: <a class="ref" href="/dn9">DN 9</a>`}
              </dd>
              <dt>
                ${_`Pukkusa`}
              </dt>
              <dd>
                ${_`<a class="ref" href="/dn16">DN 16</a>`}
              </dd>
              <dt>
                ${_`Pukkusāti`}
              </dt>
              <dd class="type">
                ${_`monk`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn140">MN 140</a>`}
              </dd>
              <dd class="life-events">
                ${_`killed by a cow: <a class="ref" href="/mn140">MN 140</a>`}
              </dd>
              <dt>
                ${_`Punabbasu`}
              </dt>
              <dd class="type">
                ${_`monk`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn70">MN 70</a>`}
              </dd>
              <dt>
                ${_`Puṇṇa`}
              </dt>
              <dd class="type">
                ${_`monk`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/sn35.88">SN 35.88</a>`}
              </dd>
              <dd class="life-events">
                ${_`becomes an arahant, <a class="ref" href="/sn35.88">SN 35.88</a>`}
              </dd>
              <dt>
                ${_`Puṇṇa Mantāṇiputta`}
              </dt>
              <dd class="type">
                ${_`monk`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn24">MN 24</a>, <a class="ref" href="/sn22.83">SN 22.83</a>`}
              </dd>
              <dt>
                ${_`Puṇṇā`}
              </dt>
              <dd class="type">
                ${_`bhikkhunī (nun)`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/thig1.3">Thig 1.3</a>`}
              </dd>
              <dt>
                ${_`Puṇṇa`}
              </dt>
              <dd class="type">
                ${_`ox-duty ascetic`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn57">MN 57</a>`}
              </dd>
              <dd class="life-events">
                ${_`goes for refuge: <a class="ref" href="/mn57">MN 57</a>`}
              </dd>
              <dt>
                ${_`Puṇṇaka`}
              </dt>
              <dd class="type">
                ${_`spirit (yakkha)`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn32">DN 32</a>`}
              </dd>
              <dt>
                ${_`Puṇṇaka`}
              </dt>
              <dd class="type">
                ${_`brahmin ascetic`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/an4.41">AN 4.41</a>, <a class="ref" href="/snp5.3">Snp 5.3</a>`}
              </dd>
              <dt>
                ${_`Puṇṇamāsa`}
              </dt>
              <dd class="type">
                ${_`monk`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/thag2.26">Thag 2.26</a>`}
              </dd>
              <dt>
                ${_`Puṇṇikā`}
              </dt>
              <dd class="type">
                ${_`bhikkhunī (nun)`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/thig12">Thig 12</a>`}
              </dd>
              <dt>
                ${_`Pūraṇa Kassapa`}
              </dt>
              <dd class="type">
                ${_`one of the six non-Buddhist ascetic teachers`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn2">DN 2</a>, <a class="ref" href="/dn16">DN 16</a>, <a class="ref" href="/mn30">MN 30</a>, <a class="ref" href="/sn3.1">SN 3.1</a>, <a class="ref" href="/sn22.60">SN 22.60</a>, <a class="ref" href="/sn44.9">SN 44.9</a>, <a class="ref" href="/an9.38">AN 9.38</a>`}
              </dd>
            </dl>
            <h2 id="r">
              ${_`R`}
            </h2>
            <dl>
              <dt>
                ${_`Rādha`}
              </dt>
              <dd class="type">
                ${_`monk`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/sn23.2">SN 23.2</a>`}
              </dd>
              <dt>
                ${_`Rāhu`}
              </dt>
              <dd class="type">
                ${_`asura king`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/an4.50">AN 4.50</a>`}
              </dd>
              <dt>
                ${_`Rāhula`}
              </dt>
              <dd class="type">
                ${_`monk; son of the Buddha`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn61">MN 61</a>, <a class="ref" href="/mn62">MN 62</a>, <a class="ref" href="/mn147">MN 147</a>, <a class="ref" href="/snp2.11">Snp 2.11</a>, <a class="ref" href="/thag4.8">Thag 4.8</a>`}
              </dd>
              <dd class="life-events">
                ${_`becomes an arahant: <a class="ref" href="/mn147">MN 147</a>`}
              </dd>
              <dt>
                ${_`Rāja`}
              </dt>
              <dd class="type">
                ${_`spirit (yakkha)`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn32">DN 32</a>`}
              </dd>
              <dt>
                ${_`Rājadatta`}
              </dt>
              <dd class="type">
                ${_`monk`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/thag5.1">Thag 5.1</a>`}
              </dd>
              <dt>
                ${_`Rājagaha`}
              </dt>
              <dd class="type">
                ${_`city, capital of Magadha`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/kd1.23.1">Kd 1.23.1</a>, <a class="ref" href="/dn2">DN 2</a>, <a class="ref" href="/dn16">DN 16</a>, <a class="ref" href="/dn20">DN 20</a>, <a class="ref" href="/dn31">DN 31</a>, <a class="ref" href="/mn14">MN 14</a>, <a class="ref" href="/mn24">MN 24</a>, <a class="ref" href="/mn29">MN 29</a>, <a class="ref" href="/mn44">MN 44</a>, <a class="ref" href="/mn58">MN 58</a>, <a class="ref" href="/mn61">MN 61</a>, <a class="ref" href="/mn74">MN 74</a>, <a class="ref" href="/mn97">MN 97</a>, <a class="ref" href="/mn108">MN 108</a>, <a class="ref" href="/mn116">MN 116</a>, <a class="ref" href="/mn125">MN 125</a>, <a class="ref" href="/mn126">MN 126</a>, <a class="ref" href="/mn136">MN 136</a>, <a class="ref" href="/mn140">MN 140</a>, <a class="ref" href="/mn141">MN 141</a>, <a class="ref" href="/mn146">MN 146</a>, <a class="ref" href="/sn1.20">SN 1.20</a>, <a class="ref" href="/sn1.38">SN 1.38</a>, <a class="ref" href="/sn2.19">SN 2.19</a>, <a class="ref" href="/sn4.13">SN 4.13</a>, <a class="ref" href="/sn7.2">SN 7.2</a>, <a class="ref" href="/sn10.8">SN 10.8</a>, <a class="ref" href="/sn12.17">SN 12.17</a>, <a class="ref" href="/sn12.70">SN 12.70</a>, <a class="ref" href="/sn15.13">SN 15.13</a>, <a class="ref" href="/sn16.5">SN 16.5</a>, <a class="ref" href="/sn21.10">SN 21.10</a>, <a class="ref" href="/sn35.69">SN 35.69</a>, <a class="ref" href="/sn36.21">SN 36.21</a>, <a class="ref" href="/sn42.2">SN 42.2</a>, <a class="ref" href="/sn42.10">SN 42.10</a>, <a class="ref" href="/sn46.14">SN 46.14</a>, <a class="ref" href="/sn46.16">SN 46.16</a>, <a class="ref" href="/sn56.42">SN 56.42</a>, <a class="ref" href="/an4.35">AN 4.35</a>, <a class="ref" href="/an4.183">AN 4.183</a>, <a class="ref" href="/an6.41">AN 6.41</a>, <a class="ref" href="/an6.55">AN 6.55</a>, <a class="ref" href="/an7.21">AN 7.21</a>, <a class="ref" href="/an8.7">AN 8.7</a>, <a class="ref" href="/an8.26">AN 8.26</a>, <a class="ref" href="/an9.7">AN 9.7</a>, <a class="ref" href="/an9.34">AN 9.34</a>, <a class="ref" href="/an10.96">AN 10.96</a>, <a class="ref" href="/snp3.1">Snp 3.1</a>, <a class="ref" href="/ud1.6">Ud 1.6</a>, <a class="ref" href="/ud3.7">Ud 3.7</a>, <a class="ref" href="/ud4.4">Ud 4.4</a>, <a class="ref" href="/ud4.9">Ud 4.9</a>, <a class="ref" href="/ud5.3">Ud 5.3</a>, <a class="ref" href="/ud6.8">Ud 6.8</a>`}
              </dd>
              <dt>
                ${_`Rakkhita`}
              </dt>
              <dd class="type">
                ${_`private Buddha`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn116">MN 116</a>`}
              </dd>
              <dt>
                ${_`Rāmagāma`}
              </dt>
              <dd class="type">
                ${_`village`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn16">DN 16</a>`}
              </dd>
              <dt>
                ${_`Rāmaṇeyyaka`}
              </dt>
              <dd class="type">
                ${_`monk`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/thag1.49">Thag 1.49</a>`}
              </dd>
              <dt>
                ${_`Rammaka`}
              </dt>
              <dd class="type">
                ${_`brahmin`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn26">MN 26</a>`}
              </dd>
              <dt>
                ${_`Raṭṭhapāla`}
              </dt>
              <dd class="type">
                ${_`monk`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn82">MN 82</a>`}
              </dd>
              <dt>
                ${_`Revata the Doubter`}
              </dt>
              <dd>
                ${_`see <a href="#revata">Kaṅkhārevata</a>`}
              </dd>
              <dt>
                ${_`(Mahā) Revata`}
              </dt>
              <dd class="type">
                ${_`monk`}
              </dd>
              <dd>
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn118">MN 118</a>, <a class="ref" href="/ud1.5">Ud 1.5</a>, <a class="ref" href="/thag14.1">Thag 14.1</a>`}
              </dd>
              <dt>
                ${_`Rohana`}
              </dt>
              <dd class="type">
                ${_`<a href="#pekhuniya">Pekhuniya</a> ’s grandson`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/an3.66">AN 3.66</a>`}
              </dd>
              <dt>
                ${_`Rohiṇī`}
              </dt>
              <dd class="type">
                ${_`bhikkhunī (nun)`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/thig13.2">Thig 13.2</a>`}
              </dd>
              <dt>
                ${_`Rohitassa`}
              </dt>
              <dd class="type">
                ${_`son of a deva`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/an4.45">AN 4.45</a>`}
              </dd>
              <dt>
                ${_`Rojā`}
              </dt>
              <dd class="type">
                ${_`deities (devas)`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn20">DN 20</a>`}
              </dd>
              <dt>
                ${_`Roruva`}
              </dt>
              <dd class="type">
                ${_`hell realm`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/sn3.20">SN 3.20</a>`}
              </dd>
              <dt>
                ${_`Rosika`}
              </dt>
              <dd class="type">
                ${_`the barber`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn12">DN 12</a>`}
              </dd>
              <dt>
                ${_`Rucira`}
              </dt>
              <dd class="type">
                ${_`deities (devas)`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn20">DN 20</a>`}
              </dd>
            </dl>
            <h2 id="s">
              ${_`S`}
            </h2>
            <dl>
              <dt>
                ${_`Sabhiya Kaccāna`}
              </dt>
              <dd class="type">
                ${_`monk`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/sn44.11">SN 44.11</a>`}
              </dd>
              <dt>
                ${_`Saccaka Aggivessana`}
              </dt>
              <dd class="type">
                ${_`Jain`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn35">MN 35</a>, <a class="ref" href="/mn36">MN 36</a>`}
              </dd>
              <dt>
                ${_`Saccanāma`}
              </dt>
              <dd class="type">
                ${_`private Buddha`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn116">MN 116</a>`}
              </dd>
              <dt>
                ${_`Sadāmattā`}
              </dt>
              <dd class="type">
                ${_`deities (devas)`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn20">DN 20</a>`}
              </dd>
              <dt>
                ${_`Sahabhū`}
              </dt>
              <dd class="type">
                ${_`deities (devas)`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn20">DN 20</a>`}
              </dd>
              <dt>
                ${_`Sahadhamma`}
              </dt>
              <dd class="type">
                ${_`deities (devas)`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn20">DN 20</a>`}
              </dd>
              <dt>
                ${_`Sahajāti`}
              </dt>
              <dd class="type">
                ${_`city`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/an10.24">AN 10.24</a>, <a class="ref" href="/an6.46">AN 6.46</a>`}
              </dd>
              <dt>
                ${_`Sahali`}
              </dt>
              <dd class="type">
                ${_`deity (deva)`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn20">DN 20</a>`}
              </dd>
              <dt>
                ${_`Sahampati`}
              </dt>
              <dd class="type">
                ${_`high divinity (brahmā)`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn26">MN 26</a>, <a class="ref" href="/dn16">DN 16</a>, <a class="ref" href="/sn6.1">SN 6.1</a>, <a class="ref" href="/sn6.2">SN 6.2</a>, <a class="ref" href="/sn6.13">SN 6.13</a>, <a class="ref" href="/sn6.15">SN 6.15</a>, <a class="ref" href="/sn22.80">SN 22.80</a>`}
              </dd>
              <dt>
                ${_`Sāketa`}
              </dt>
              <dd class="type">
                ${_`city`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn16">DN 16</a>, <a class="ref" href="/mn24">MN 24</a>, <a class="ref" href="/sn44.1">SN 44.1</a>, <a class="ref" href="/an4.24">AN 4.24</a>, <a class="ref" href="/an9.37">AN 9.37</a>, <a class="ref" href="/thig6.4">Thig 6.4</a>`}
              </dd>
              <dt id="sakka">
                ${_`Sakka`}
              </dt>
              <dd class="type">
                ${_`deva king; a.k.a. Vāsava, “powerful”; born of the Kosiya clan`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn16">DN 16</a>, <a class="ref" href="/dn20">DN 20</a>, <a class="ref" href="/dn21">DN 21</a>, <a class="ref" href="/sn6.15">SN 6.15</a>, <a class="ref" href="/sn11.3">SN 11.3</a>, <a class="ref" href="/sn11.4">SN 11.4</a>, <a class="ref" href="/sn11.5">SN 11.5</a>, <a class="ref" href="/sn35.207">SN 35.207</a>, <a class="ref" href="/an8.8">AN 8.8</a>, <a class="ref" href="/snp2.14">Snp 2.14</a>, <a class="ref" href="/thag21">Thag 21</a>, <a class="ref" href="/thig13.5">Thig 13.5</a>, <a class="ref" href="/ud3.7">Ud 3.7</a>`}
              </dd>
              <dd class="life-events">
                ${_`becomes a stream-winner: <a class="ref" href="/dn.21">DN 21</a>`}
              </dd>
              <dt>
                ${_`Sakkāra`}
              </dt>
              <dd class="type">
                ${_`town`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/sn45.2">SN 45.2</a>`}
              </dd>
              <dt id="sakula">
                ${_`Sakulā`}
              </dt>
              <dd class="type">
                ${_`sister of <a href="#soma">Soma</a>`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn90">MN 90</a>`}
              </dd>
              <dt>
                ${_`Sakyan`}
              </dt>
              <dd class="type">
                ${_`clan`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn16">DN 16</a>, <a class="ref" href="/dn20">DN 20</a>, <a class="ref" href="/mn14">MN 14</a>, <a class="ref" href="/mn18">MN 18</a>, <a class="ref" href="/mn53">MN 53</a>, <a class="ref" href="/mn101">MN 101</a>, <a class="ref" href="/mn122">MN 122</a>, <a class="ref" href="/sn22.2">SN 22.2</a>, <a class="ref" href="/sn22.80">SN 22.80</a>, <a class="ref" href="/sn45.2">SN 45.2</a>, <a class="ref" href="/sn55.21">SN 55.21</a>, <a class="ref" href="/sn55.22">SN 55.22</a>, <a class="ref" href="/sn55.40">SN 55.40</a>, <a class="ref" href="/an3.73">AN 3.73</a>, <a class="ref" href="/an8.25">AN 8.25</a>, <a class="ref" href="/an10.46">AN 10.46</a>, <a class="ref" href="/an11.12">AN 11.12</a>, <a class="ref" href="/an11.13">AN 11.13</a>`}
              </dd>
              <dt>
                ${_`Sālā`}
              </dt>
              <dd class="type">
                ${_`village in Kosala`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn41">MN 41</a>, <a class="ref" href="/mn60">MN 60</a>`}
              </dd>
              <dt>
                ${_`Sālavatikā`}
              </dt>
              <dd class="type">
                ${_`town`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn12">DN 12</a>`}
              </dd>
              <dt>
                ${_`Sāḷha`}
              </dt>
              <dd class="type">
                ${_`<a href="#migara">Migāra</a> ’s grandson`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/an3.66">AN 3.66</a>`}
              </dd>
              <dt>
                ${_`Sāḷha`}
              </dt>
              <dd class="type">
                ${_`monk`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn16">DN 16</a>`}
              </dd>
              <dt>
                ${_`Samānā`}
              </dt>
              <dd class="type">
                ${_`deities (devas)`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn20">DN 20</a>`}
              </dd>
              <dt>
                ${_`Sāmaṇḍakāni`}
              </dt>
              <dd class="type">
                ${_`wanderer`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/an10.65">AN 10.65</a>, <a class="ref" href="/an10.66">AN 10.66</a>`}
              </dd>
              <dt id="samavati">
                ${_`Sāmāvatī`}
              </dt>
              <dd class="type">
                ${_`chief queen of <a href="#udena">King Udena</a>; praised by the Buddha as being foremost among the female lay disciples in terms of her embodiment of loving-kindness`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/ud7.10">Ud 7.10</a>`}
              </dd>
              <dt>
                ${_`Samiddhi`}
              </dt>
              <dd class="type">
                ${_`monk`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn136">MN 136</a>, <a class="ref" href="/sn1.20">SN 1.20</a>, <a class="ref" href="/an9.14">AN 9.14</a>`}
              </dd>
              <dt>
                ${_`Sanaṅkumāra`}
              </dt>
              <dd class="type">
                ${_`high divinity (brahmā)`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn20">DN 20</a>, <a class="ref" href="/mn53">MN 53</a>`}
              </dd>
              <dt>
                ${_`Sandha`}
              </dt>
              <dd class="type">
                ${_`monk`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/an11.10">AN 11.10</a>`}
              </dd>
              <dt>
                ${_`Saṅgāmaji`}
              </dt>
              <dd class="type">
                ${_`monk`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/ud1.8">Ud 1.8</a>`}
              </dd>
              <dt>
                ${_`Saṅgārava`}
              </dt>
              <dd class="type">
                ${_`brahmin`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/an3.60">AN 3.60</a>`}
              </dd>
              <dd class="life-events">
                ${_`goes for refuge: <a class="ref" href="/an3.60">AN 3.60</a>`}
              </dd>
              <dt>
                ${_`Saṅgha`}
              </dt>
              <dd class="type">
                ${_`private Buddha`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn116">MN 116</a>`}
              </dd>
              <dt>
                ${_`Saṅkheyyaka`}
              </dt>
              <dd class="type">
                ${_`mountain`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/an8.8">AN 8.8</a>`}
              </dd>
              <dt>
                ${_`Saṅkicca`}
              </dt>
              <dd class="type">
                ${_`monk`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/thag11">Thag 11</a>`}
              </dd>
              <dt>
                ${_`Santacitta`}
              </dt>
              <dd class="type">
                ${_`private Buddha`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn116">MN 116</a>`}
              </dd>
              <dt>
                ${_`Santusita`}
              </dt>
              <dd class="type">
                ${_`deity (deva)`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn11">DN 11</a>`}
              </dd>
              <dt>
                ${_`Santuṭṭha`}
              </dt>
              <dd class="type">
                ${_`a disciple of the Buddha`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn16">DN 16</a>`}
              </dd>
              <dt>
                ${_`Sañjaya`}
              </dt>
              <dd class="type">
                ${_`brahmin of <a href="#akasa">Ākāsa</a> clan`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn90">MN 90</a>`}
              </dd>
              <dt>
                ${_`Sañjaya Belaṭṭhiputta`}
              </dt>
              <dd class="type">
                ${_`one of the six non-Budhist ascetic teachers`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/kd1.23.1">Kd 1.23.1–10</a>, <a class="ref" href="/dn2">DN 2</a>, <a class="ref" href="/dn16">DN 16</a>, <a class="ref" href="/mn30">MN 30</a>, <a class="ref" href="/sn3.1">SN 3.1</a>, <a class="ref" href="/sn44.9">SN 44.9</a>`}
              </dd>
              <dt>
                ${_`Sappadāsa`}
              </dt>
              <dd class="type">
                ${_`monk`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/thag6.6">Thag 6.6</a>`}
              </dd>
              <dt>
                ${_`Sarabhaṅga`}
              </dt>
              <dd class="type">
                ${_`private Buddha`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn116">MN 116</a>`}
              </dd>
              <dt>
                ${_`Sarabhū`}
              </dt>
              <dd class="type">
                ${_`river`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/an10.15">AN 10.15</a>, <a class="ref" href="/ud5.5">Ud 5.5</a>`}
              </dd>
              <dt>
                ${_`Sārandada`}
              </dt>
              <dd class="type">
                ${_`shrine`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn16">DN 16</a>`}
              </dd>
              <dt>
                ${_`Sarassati`}
              </dt>
              <dd class="type">
                ${_`river`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn7">MN 7</a>`}
              </dd>
              <dt id="sariputta">
                ${_`Sāriputta`}
              </dt>
              <dd class="type">
                ${_`monk; Upatissa; a.k.a. the “Marshal of the Dhamma”; praised by the Buddha as being foremost among the bhikkhus in terms of his discernment; he and <a href="#moggallana">Ven. Moggallāna</a> were the Buddha’s two chief disciples`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/kd1.23.1">Kd 1.23.1–10</a>, <a class="ref" href="/dn16">DN 16</a>, <a class="ref" href="/mn9">MN 9</a>, <a class="ref" href="/mn12">MN 12</a>, <a class="ref" href="/mn24">MN 24</a>, <a class="ref" href="/mn28">MN 28</a>, <a class="ref" href="/mn43">MN 43</a>, <a class="ref" href="/mn97">MN 97</a>, <a class="ref" href="/mn111">MN 111</a>, <a class="ref" href="/mn118">MN 118</a>, <a class="ref" href="/mn141">MN 141</a>, <a class="ref" href="/mn143">MN 143</a>, <a class="ref" href="/sn12.25">SN 12.25</a>, <a class="ref" href="/sn12.31">SN 12.31</a>, <a class="ref" href="/sn12.67">SN 12.67</a>, <a class="ref" href="/sn21.2">SN 21.2</a>, <a class="ref" href="/sn22.1">SN 22.1</a>, <a class="ref" href="/sn22.2">SN 22.2</a>, <a class="ref" href="/sn22.85">SN 22.85</a>, <a class="ref" href="/sn22.122">SN 22.122</a>, <a class="ref" href="/sn35.69">SN 35.69</a>, <a class="ref" href="/sn35.191">SN 35.191</a>, <a class="ref" href="/sn38.14">SN 38.14</a>, <a class="ref" href="/sn44.3">SN 44.3</a>, <a class="ref" href="/sn44.4">SN 44.4</a>, <a class="ref" href="/sn44.5">SN 44.5</a>, <a class="ref" href="/sn44.6">SN 44.6</a>, <a class="ref" href="/sn47.13">SN 47.13</a>, <a class="ref" href="/sn48.44">SN 48.44</a>, <a class="ref" href="/an4.79">AN 4.79</a>, <a class="ref" href="/an4.174">AN 4.174</a>, <a class="ref" href="/an4.179">AN 4.179</a>, <a class="ref" href="/an5.162">AN 5.162</a>, <a class="ref" href="/an5.176">AN 5.176</a>, <a class="ref" href="/an5.179">AN 5.179</a>, <a class="ref" href="/an6.41">AN 6.41</a>, <a class="ref" href="/an6.51">AN 6.51</a>, <a class="ref" href="/an7.34">AN 7.34</a>, <a class="ref" href="/an7.49">AN 7.49</a>, <a class="ref" href="/an8.28">AN 8.28</a>, <a class="ref" href="/an9.13">AN 9.13</a>, <a class="ref" href="/an9.14">AN 9.14</a>, <a class="ref" href="/an9.34">AN 9.34</a>, <a class="ref" href="/an10.7">AN 10.7</a>, <a class="ref" href="/an10.65">AN 10.65</a>, <a class="ref" href="/an10.66">AN 10.66</a>, <a class="ref" href="/ud1.5">Ud 1.5</a>, <a class="ref" href="/ud4.4">Ud 4.4</a>, <a class="ref" href="/ud4.7">Ud 4.7</a>, <a class="ref" href="/ud4.10">Ud 4.10</a>, <a class="ref" href="/ud7.1">Ud 7.1</a>, <a class="ref" href="/ud7.2">Ud 7.2</a>, <a class="ref" href="/snp4.16">Snp 4.16</a>, <a class="ref" href="/thag6.10">Thag 6.10</a>, <a class="ref" href="/thag21">Thag 21</a>`}
              </dd>
              <dd class="life-events">
                ${_`becomes a stream-winner: <a class="ref" href="/mv.01.23.01-10">mv.01.23.01-10</a>; dies: <a class="ref" href="/sn47.13">SN 47.13</a>.`}
              </dd>
              <dt>
                ${_`Sata`}
              </dt>
              <dd class="type">
                ${_`mountain`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn20">DN 20</a>`}
              </dd>
              <dt>
                ${_`Sātāgira`}
              </dt>
              <dd class="type">
                ${_`spirit (yakkha)`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn32">DN 32</a>`}
              </dd>
              <dt>
                ${_`Sāti`}
              </dt>
              <dd class="type">
                ${_`the fisherman’s son`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn38">MN 38</a>`}
              </dd>
              <dt>
                ${_`Sattambaka`}
              </dt>
              <dd class="type">
                ${_`shrine`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn16">DN 16</a>`}
              </dd>
              <dt>
                ${_`Sattapaṇṇi`}
              </dt>
              <dd class="type">
                ${_`cave`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn16">DN 16</a>`}
              </dd>
              <dt>
                ${_`Satthā`}
              </dt>
              <dd class="type">
                ${_`private Buddha`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn116">MN 116</a>`}
              </dd>
              <dt>
                ${_`Satullapa`}
              </dt>
              <dd class="type">
                ${_`deity (deva)`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/sn1.38">SN 1.38</a>`}
              </dd>
              <dt id="savatthi">
                ${_`Sāvatthī`}
              </dt>
              <dd class="type">
                ${_`city, capital of Kosala`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn9">DN 9</a>, <a class="ref" href="/dn16">DN 16</a>, <a class="ref" href="/mn2">MN 2</a>, <a class="ref" href="/mn4">MN 4</a>, <a class="ref" href="/mn7">MN 7</a>, <a class="ref" href="/mn8">MN 8</a>, <a class="ref" href="/mn9">MN 9</a>, <a class="ref" href="/mn11">MN 11</a>, <a class="ref" href="/mn13">MN 13</a>, <a class="ref" href="/mn19">MN 19</a>, <a class="ref" href="/mn20">MN 20</a>, <a class="ref" href="/mn21">MN 21</a>, <a class="ref" href="/mn22">MN 22</a>, <a class="ref" href="/mn24">MN 24</a>, <a class="ref" href="/mn26">MN 26</a>, <a class="ref" href="/mn27">MN 27</a>, <a class="ref" href="/mn28">MN 28</a>, <a class="ref" href="/mn30">MN 30</a>, <a class="ref" href="/mn33">MN 33</a>, <a class="ref" href="/mn38">MN 38</a>, <a class="ref" href="/mn43">MN 43</a>, <a class="ref" href="/mn49">MN 49</a>, <a class="ref" href="/mn59">MN 59</a>, <a class="ref" href="/mn62">MN 62</a>, <a class="ref" href="/mn63">MN 63</a>, <a class="ref" href="/mn72">MN 72</a>, <a class="ref" href="/mn78">MN 78</a>, <a class="ref" href="/mn86">MN 86</a>, <a class="ref" href="/mn87">MN 87</a>, <a class="ref" href="/mn93">MN 93</a>, <a class="ref" href="/mn107">MN 107</a>, <a class="ref" href="/mn109">MN 109</a>, <a class="ref" href="/mn110">MN 110</a>, <a class="ref" href="/mn111">MN 111</a>, <a class="ref" href="/mn113">MN 113</a>, <a class="ref" href="/mn117">MN 117</a>, <a class="ref" href="/mn118">MN 118</a>, <a class="ref" href="/mn119">MN 119</a>, <a class="ref" href="/mn121">MN 121</a>, <a class="ref" href="/mn130">MN 130</a>, <a class="ref" href="/mn135">MN 135</a>, <a class="ref" href="/mn137">MN 137</a>, <a class="ref" href="/mn138">MN 138</a>, <a class="ref" href="/mn146">MN 146</a>, <a class="ref" href="/mn149">MN 149</a>, <a class="ref" href="/sn1.1">SN 1.1</a>, <a class="ref" href="/sn1.41">SN 1.41</a>, <a class="ref" href="/sn2.7">SN 2.7</a>, <a class="ref" href="/sn3.1">SN 3.1</a>, <a class="ref" href="/sn3.4">SN 3.4</a>, <a class="ref" href="/sn3.5">SN 3.5</a>, <a class="ref" href="/sn3.6">SN 3.6</a>, <a class="ref" href="/sn3.7">SN 3.7</a>, <a class="ref" href="/sn3.14">SN 3.14</a>, <a class="ref" href="/sn3.15">SN 3.15</a>, <a class="ref" href="/sn3.17">SN 3.17</a>, <a class="ref" href="/sn3.19">SN 3.19</a>, <a class="ref" href="/sn3.20">SN 3.20</a>, <a class="ref" href="/sn3.23">SN 3.23</a>, <a class="ref" href="/sn3.24">SN 3.24</a>, <a class="ref" href="/sn3.25">SN 3.25</a>, <a class="ref" href="/sn4.8">SN 4.8</a>, <a class="ref" href="/sn4.19">SN 4.19</a>, <a class="ref" href="/sn5.1">SN 5.1</a>, <a class="ref" href="/sn5.2">SN 5.2</a>, <a class="ref" href="/sn5.3">SN 5.3</a>, <a class="ref" href="/sn5.4">SN 5.4</a>, <a class="ref" href="/sn5.5">SN 5.5</a>, <a class="ref" href="/sn5.6">SN 5.6</a>, <a class="ref" href="/sn5.7">SN 5.7</a>, <a class="ref" href="/sn5.8">SN 5.8</a>, <a class="ref" href="/sn5.9">SN 5.9</a>, <a class="ref" href="/sn5.10">SN 5.10</a>, <a class="ref" href="/sn7.6">SN 7.6</a>, <a class="ref" href="/sn7.14">SN 7.14</a>, <a class="ref" href="/sn8.4">SN 8.4</a>, <a class="ref" href="/sn11.3">SN 11.3</a>, <a class="ref" href="/sn11.5">SN 11.5</a>, <a class="ref" href="/sn12.11">SN 12.11</a>, <a class="ref" href="/sn12.12">SN 12.12</a>, <a class="ref" href="/sn12.46">SN 12.46</a>, <a class="ref" href="/sn12.61">SN 12.61</a>, <a class="ref" href="/sn13.1">SN 13.1</a>, <a class="ref" href="/sn13.2">SN 13.2</a>, <a class="ref" href="/sn13.8">SN 13.8</a>, <a class="ref" href="/sn12.19">SN 12.19</a>, <a class="ref" href="/sn12.25">SN 12.25</a>, <a class="ref" href="/sn12.48">SN 12.48</a>, <a class="ref" href="/sn12.31">SN 12.31</a>, <a class="ref" href="/sn12.44">SN 12.44</a>, <a class="ref" href="/sn12.52">SN 12.52</a>, <a class="ref" href="/sn14.11">SN 14.11</a>, <a class="ref" href="/sn15.3">SN 15.3</a>, <a class="ref" href="/sn15.9">SN 15.9</a>, <a class="ref" href="/sn15.11">SN 15.11</a>, <a class="ref" href="/sn15.12">SN 15.12</a>, <a class="ref" href="/sn15.14">SN 15.14</a>, <a class="ref" href="/sn12.2">SN 12.2</a>, <a class="ref" href="/sn12.15">SN 12.15</a>, <a class="ref" href="/sn12.20">SN 12.20</a>, <a class="ref" href="/sn12.23">SN 12.23</a>, <a class="ref" href="/sn12.64">SN 12.64</a>, <a class="ref" href="/sn12.65">SN 12.65</a>, <a class="ref" href="/sn15.3">SN 15.3</a>, <a class="ref" href="/sn16.13">SN 16.13</a>, <a class="ref" href="/sn17.5">SN 17.5</a>, <a class="ref" href="/sn17.8">SN 17.8</a>, <a class="ref" href="/sn20.2">SN 20.2</a>, <a class="ref" href="/sn20.4">SN 20.4</a>, <a class="ref" href="/sn20.5">SN 20.5</a>, <a class="ref" href="/sn20.6">SN 20.6</a>, <a class="ref" href="/sn20.7">SN 20.7</a>, <a class="ref" href="/sn21.1">SN 21.1</a>, <a class="ref" href="/sn21.2">SN 21.2</a>, <a class="ref" href="/sn21.6">SN 21.6</a>, <a class="ref" href="/sn22.5">SN 22.5</a>, <a class="ref" href="/sn22.22">SN 22.22</a>, <a class="ref" href="/sn22.23">SN 22.23</a>, <a class="ref" href="/sn22.36">SN 22.36</a>, <a class="ref" href="/sn22.39">SN 22.39</a>, <a class="ref" href="/sn22.40">SN 22.40</a>, <a class="ref" href="/sn22.41">SN 22.41</a>, <a class="ref" href="/sn22.42">SN 22.42</a>, <a class="ref" href="/sn22.48">SN 22.48</a>, <a class="ref" href="/sn22.53">SN 22.53</a>, <a class="ref" href="/sn22.54">SN 22.54</a>, <a class="ref" href="/sn22.57">SN 22.57</a>, <a class="ref" href="/sn22.58">SN 22.58</a>, <a class="ref" href="/sn22.79">SN 22.79</a>, <a class="ref" href="/sn22.83">SN 22.83</a>, <a class="ref" href="/sn22.84">SN 22.84</a>, <a class="ref" href="/sn22.85">SN 22.85</a>, <a class="ref" href="/sn22.93">SN 22.93</a>, <a class="ref" href="/sn22.99">SN 22.99</a>, <a class="ref" href="/sn22.100">SN 22.100</a>, <a class="ref" href="/sn22.101">SN 22.101</a>, <a class="ref" href="/sn22.121">SN 22.121</a>, <a class="ref" href="/sn23.2">SN 23.2</a>, <a class="ref" href="/sn35.63">SN 35.63</a>, <a class="ref" href="/sn35.197">SN 35.197</a>, <a class="ref" href="/sn44.1">SN 44.1</a>, <a class="ref" href="/sn45.1">SN 45.1</a>, <a class="ref" href="/sn45.8">SN 45.8</a>, <a class="ref" href="/sn46.53">SN 46.53</a>, <a class="ref" href="/sn47.13">SN 47.13</a>, <a class="ref" href="/sn47.35">SN 47.35</a>, <a class="ref" href="/sn47.37">SN 47.37</a>, <a class="ref" href="/sn47.41">SN 47.41</a>, <a class="ref" href="/sn47.42">SN 47.42</a>, <a class="ref" href="/sn48.41">SN 48.41</a>, <a class="ref" href="/sn48.44">SN 48.44</a>, <a class="ref" href="/sn52.10">SN 52.10</a>, <a class="ref" href="/sn54.6">SN 54.6</a>, <a class="ref" href="/sn54.13">SN 54.13</a>, <a class="ref" href="/sn55.1">SN 55.1</a>, <a class="ref" href="/an3.51">AN 3.51</a>, <a class="ref" href="/an3.52">AN 3.52</a>, <a class="ref" href="/an3.66">AN 3.66</a>, <a class="ref" href="/an3.70">AN 3.70</a>, <a class="ref" href="/an3.71">AN 3.71</a>, <a class="ref" href="/an4.45">AN 4.45</a>, <a class="ref" href="/an4.67">AN 4.67</a>, <a class="ref" href="/an5.28">AN 5.28</a>, <a class="ref" href="/an5.49">AN 5.49</a>, <a class="ref" href="/an6.49">AN 6.49</a>, <a class="ref" href="/an5.51">AN 5.51</a>, <a class="ref" href="/an8.43">AN 8.43</a>, <a class="ref" href="/an9.1">AN 9.1</a>, <a class="ref" href="/an10.70">AN 10.70</a>, <a class="ref" href="/an10.71">AN 10.71</a>, <a class="ref" href="/an10.93">AN 10.93</a>, <a class="ref" href="/an10.94">AN 10.94</a>, <a class="ref" href="/an11.1">AN 11.1</a>, <a class="ref" href="/an10.51">AN 10.51</a>, <a class="ref" href="/an10.60">AN 10.60</a>, <a class="ref" href="/snp2.4">Snp 2.4</a>, <a class="ref" href="/snp2.14">Snp 2.14</a>, <a class="ref" href="/snp3.3">Snp 3.3</a>, <a class="ref" href="/snp3.12">Snp 3.12</a>, <a class="ref" href="/ud1.5">Ud 1.5</a>, <a class="ref" href="/ud1.10">Ud 1.10</a>, <a class="ref" href="/ud2.2">Ud 2.2</a>, <a class="ref" href="/ud2.3">Ud 2.3</a>, <a class="ref" href="/ud2.4">Ud 2.4</a>, <a class="ref" href="/ud2.5">Ud 2.5</a>, <a class="ref" href="/ud2.6">Ud 2.6</a>, <a class="ref" href="/ud2.7">Ud 2.7</a>, <a class="ref" href="/ud2.9">Ud 2.9</a>, <a class="ref" href="/ud3.1">Ud 3.1</a>, <a class="ref" href="/ud3.2">Ud 3.2</a>, <a class="ref" href="/ud3.3">Ud 3.3</a>, <a class="ref" href="/ud3.4">Ud 3.4</a>, <a class="ref" href="/ud3.5">Ud 3.5</a>, <a class="ref" href="/ud3.8">Ud 3.8</a>, <a class="ref" href="/ud4.6">Ud 4.6</a>, <a class="ref" href="/ud4.7">Ud 4.7</a>, <a class="ref" href="/ud4.10">Ud 4.10</a>, <a class="ref" href="/ud5.1">Ud 5.1</a>, <a class="ref" href="/ud5.2">Ud 5.2</a>, <a class="ref" href="/ud5.4">Ud 5.4</a>, <a class="ref" href="/ud5.5">Ud 5.5</a>, <a class="ref" href="/ud5.6">Ud 5.6</a>, <a class="ref" href="/ud5.7">Ud 5.7</a>, <a class="ref" href="/ud5.10">Ud 5.10</a>, <a class="ref" href="/ud6.2">Ud 6.2</a>, <a class="ref" href="/ud6.3">Ud 6.3</a>, <a class="ref" href="/ud6.4">Ud 6.4</a>, <a class="ref" href="/ud6.5">Ud 6.5</a>, <a class="ref" href="/ud6.6">Ud 6.6</a>, <a class="ref" href="/ud6.7">Ud 6.7</a>, <a class="ref" href="/ud6.9">Ud 6.9</a>, <a class="ref" href="/ud7.1">Ud 7.1</a>, <a class="ref" href="/ud7.2">Ud 7.2</a>, <a class="ref" href="/ud7.3">Ud 7.3</a>, <a class="ref" href="/ud7.4">Ud 7.4</a>, <a class="ref" href="/ud7.5">Ud 7.5</a>, <a class="ref" href="/ud7.6">Ud 7.6</a>, <a class="ref" href="/ud8.1">Ud 8.1</a>, <a class="ref" href="/ud8.2">Ud 8.2</a>, <a class="ref" href="/ud8.3">Ud 8.3</a>, <a class="ref" href="/ud8.4">Ud 8.4</a>, <a class="ref" href="/ud8.8">Ud 8.8</a>, <a class="ref" href="/ud8.9">Ud 8.9</a>, <a class="ref" href="/ud8.10">Ud 8.10</a>`}
              </dd>
              <dt>
                ${_`Sayha`}
              </dt>
              <dd class="type">
                ${_`private Buddha`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn116">MN 116</a>`}
              </dd>
              <dt>
                ${_`Sedaka`}
              </dt>
              <dd class="type">
                ${_`town`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/sn47.19">SN 47.19</a>, <a class="ref" href="/sn47.20">SN 47.20</a>`}
              </dd>
              <dt>
                ${_`Selā`}
              </dt>
              <dd class="type">
                ${_`bhikkhunī (nun)`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/sn5.9">SN 5.9</a>`}
              </dd>
              <dt>
                ${_`Seniya`}
              </dt>
              <dd class="type">
                ${_`ascetic with vow to live like a dog`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn57">MN 57</a>`}
              </dd>
              <dd class="life-events">
                ${_`goes for refuge, becomes an arahant: <a class="ref" href="/mn57">MN 57</a>`}
              </dd>
              <dt>
                ${_`Serisakka`}
              </dt>
              <dd class="type">
                ${_`spirit (yakkha)`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn32">DN 32</a>`}
              </dd>
              <dt>
                ${_`Setabyā`}
              </dt>
              <dd class="type">
                ${_`city`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/an4.36">AN 4.36</a>`}
              </dd>
              <dt>
                ${_`Sīdarī`}
              </dt>
              <dd class="type">
                ${_`private Buddha`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn116">MN 116</a>`}
              </dd>
              <dt>
                ${_`Sigālaka`}
              </dt>
              <dd>
                ${_`<a class="ref" href="/dn31">DN 31</a>`}
              </dd>
              <dd class="life-events">
                ${_`goes for refuge: <a class="ref" href="/dn31">DN 31</a>`}
              </dd>
              <dt>
                ${_`Sīha`}
              </dt>
              <dd class="type">
                ${_`general`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/an5.34">AN 5.34</a>`}
              </dd>
              <dt>
                ${_`Sikhī`}
              </dt>
              <dd class="type">
                ${_`previous Buddha; the second of the Buddhas mentioned in the Canon`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn32">DN 32</a>`}
              </dd>
              <dt>
                ${_`Sikhī`}
              </dt>
              <dd class="type">
                ${_`private Buddha`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn116">MN 116</a>`}
              </dd>
              <dt>
                ${_`Siṃsapā`}
              </dt>
              <dd class="type">
                ${_`forest`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/sn56.31">SN 56.31</a>`}
              </dd>
              <dt>
                ${_`Sindh`}
              </dt>
              <dd class="type">
                ${_`region`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dhp322">Dhp 322</a>`}
              </dd>
              <dt>
                ${_`Sineru`}
              </dt>
              <dd class="type">
                ${_`mountain`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/sn22.99">SN 22.99</a>, <a class="ref" href="/thig14.1">Thig 14.1</a>`}
              </dd>
              <dt>
                ${_`Siṅgālakapitā`}
              </dt>
              <dd class="type">
                ${_`monk`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/thag1.18">Thag 1.18</a>`}
              </dd>
              <dt>
                ${_`Sirimaṇḍa`}
              </dt>
              <dd class="type">
                ${_`monk`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/thag6.13">Thag 6.13</a>`}
              </dd>
              <dt>
                ${_`Sirivaḍḍha`}
              </dt>
              <dd class="type">
                ${_`monk`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/thag1.41">Thag 1.41</a>`}
              </dd>
              <dt>
                ${_`Sisūpacālā`}
              </dt>
              <dd class="type">
                ${_`bhikkhunī (nun)`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/sn5.8">SN 5.8</a>`}
              </dd>
              <dt>
                ${_`Sīvaka`}
              </dt>
              <dd class="type">
                ${_`monk`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/thag1.14">Thag 1.14</a>`}
              </dd>
              <dt>
                ${_`Sīvaka`}
              </dt>
              <dd class="type">
                ${_`spirit (yakkha)`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn32">DN 32</a>, <a class="ref" href="/sn10.8">SN 10.8</a>`}
              </dd>
              <dt>
                ${_`Sobhita`}
              </dt>
              <dd class="type">
                ${_`private Buddha`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn116">MN 116</a>`}
              </dd>
              <dt id="soma">
                ${_`Somā`}
              </dt>
              <dd class="type">
                ${_`sister of <a href="#sakula">Sakulā</a>`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn90">MN 90</a>`}
              </dd>
              <dt>
                ${_`Somā`}
              </dt>
              <dd class="type">
                ${_`bhikkhunī (nun)`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/sn5.2">SN 5.2</a>`}
              </dd>
              <dt>
                ${_`Soma`}
              </dt>
              <dd class="type">
                ${_`spirit (yakkha)`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn32">DN 32</a>`}
              </dd>
              <dt>
                ${_`Soṇā`}
              </dt>
              <dd class="type">
                ${_`bhikkhunī (nun); mother of ten; praised by the Buddha as being foremost among the bhikkhunīs in terms of her energetic courage`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/thig5.8">Thig 5.8</a>`}
              </dd>
              <dt>
                ${_`Soṇa Koḷivisa`}
              </dt>
              <dd class="type">
                ${_`monk`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/an6.55">AN 6.55</a>, <a class="ref" href="/snp1.12">Snp 1.12</a>`}
              </dd>
              <dd class="life-events">
                ${_`becomes an arahant: <a class="ref" href="/an6.55">AN 6.55</a>`}
              </dd>
              <dt>
                ${_`Soṇa Koṭikaṇṇa`}
              </dt>
              <dd>
                ${_`<a class="ref" href="/ud5.6">Ud 5.6</a>`}
              </dd>
              <dd class="life-events">
                ${_`goes forth: <a class="ref" href="/ud5.6">Ud 5.6</a>`}
              </dd>
              <dt>
                ${_`Soṇa Poṭiriyaputta`}
              </dt>
              <dd class="type">
                ${_`monk`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/thag2.37">Thag 2.37</a>`}
              </dd>
              <dt>
                ${_`Soṇa`}
              </dt>
              <dd class="type">
                ${_`householder’s son`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/sn22.49">SN 22.49</a>`}
              </dd>
              <dt>
                ${_`Sorata`}
              </dt>
              <dd class="type">
                ${_`private Buddha`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn116">MN 116</a>`}
              </dd>
              <dt>
                ${_`Subāhu`}
              </dt>
              <dd class="type">
                ${_`private Buddha`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn116">MN 116</a>`}
              </dd>
              <dt>
                ${_`Subha`}
              </dt>
              <dd class="type">
                ${_`private Buddha`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn116">MN 116</a>`}
              </dd>
              <dt>
                ${_`Subhā`}
              </dt>
              <dd class="type">
                ${_`bhikkhunī (nun)`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/thig13.5">Thig 13.5</a>, <a class="ref" href="/thig14">Thig 14</a>`}
              </dd>
              <dt>
                ${_`Subha`}
              </dt>
              <dd class="type">
                ${_`brahman, son of <a href="#todeyya">Todeyya</a>`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn135">MN 135</a>`}
              </dd>
              <dd class="life-events">
                ${_`goes for refuge: <a class="ref" href="/mn135">MN 135</a>`}
              </dd>
              <dt>
                ${_`Subhadda`}
              </dt>
              <dd class="type">
                ${_`lay follower`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn16">DN 16</a>`}
              </dd>
              <dt>
                ${_`Subhadda`}
              </dt>
              <dd class="type">
                ${_`monk; "the Wanderer”; the last bhikkhu ordained by the Buddha`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn16">DN 16</a>`}
              </dd>
              <dd class="life-events">
                ${_`goes for refuge, goes forth, becomes an arahant: <a class="ref" href="/dn16">DN 16</a>`}
              </dd>
              <dt>
                ${_`Subhadda`}
              </dt>
              <dd class="type">
                ${_`monk`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn16">DN 16</a>`}
              </dd>
              <dt>
                ${_`Subhaga`}
              </dt>
              <dd class="type">
                ${_`forest`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn49">MN 49</a>`}
              </dd>
              <dt>
                ${_`Subhūti`}
              </dt>
              <dd class="type">
                ${_`monk`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/ud6.7">Ud 6.7</a>, <a class="ref" href="/thag1.1">Thag 1.1</a>`}
              </dd>
              <dt>
                ${_`Subrahmā`}
              </dt>
              <dd class="type">
                ${_`high divinity (brahmā)`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn20">DN 20</a>`}
              </dd>
              <dt>
                ${_`Sucitti`}
              </dt>
              <dd class="type">
                ${_`asura demon`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn20">DN 20</a>`}
              </dd>
              <dt>
                ${_`Sudassana`}
              </dt>
              <dd class="type">
                ${_`private Buddha`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn116">MN 116</a>`}
              </dd>
              <dt>
                ${_`Sudassana`}
              </dt>
              <dd class="type">
                ${_`brahmin youth`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/sn3.13">SN 3.13</a>`}
              </dd>
              <dt>
                ${_`Sudāṭha`}
              </dt>
              <dd class="type">
                ${_`private Buddha`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn116">MN 116</a>`}
              </dd>
              <dt>
                ${_`Sudatta`}
              </dt>
              <dd class="type">
                ${_`disciple of the Buddha`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn16">DN 16</a>`}
              </dd>
              <dt>
                ${_`Sudatta`}
              </dt>
              <dd>
                ${_`see <a href="#anathapindika">Anāthapiṇḍika</a>`}
              </dd>
              <dt>
                ${_`Suddhodana`}
              </dt>
              <dd class="type">
                ${_`Buddha’s father`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/snp3.11">Snp 3.11</a>`}
              </dd>
              <dt>
                ${_`Sujātā`}
              </dt>
              <dd class="type">
                ${_`bhikkhunī (nun)`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/thig6.4">Thig 6.4</a>`}
              </dd>
              <dt>
                ${_`Sujātā`}
              </dt>
              <dd class="type">
                ${_`laywoman`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn16">DN 16</a>`}
              </dd>
              <dt>
                ${_`Sujātā`}
              </dt>
              <dd class="type">
                ${_`asura maiden`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/ud3.7">Ud 3.7</a>`}
              </dd>
              <dt>
                ${_`Suleyyā`}
              </dt>
              <dd class="type">
                ${_`deities (devas)`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn20">DN 20</a>`}
              </dd>
              <dt>
                ${_`Sumana`}
              </dt>
              <dd class="type">
                ${_`monk`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/an6.49">AN 6.49</a>`}
              </dd>
              <dt>
                ${_`Sumana`}
              </dt>
              <dd class="type">
                ${_`novice`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/thag6.10">Thag 6.10</a>`}
              </dd>
              <dt>
                ${_`Sumana`}
              </dt>
              <dd class="type">
                ${_`spirit (yakkha)`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn32">DN 32</a>`}
              </dd>
              <dt>
                ${_`Sumaṅgala`}
              </dt>
              <dd class="type">
                ${_`private Buddha`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn116">MN 116</a>`}
              </dd>
              <dt>
                ${_`Sumaṅgala`}
              </dt>
              <dd class="type">
                ${_`monk`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/thag1.43">Thag 1.43</a>`}
              </dd>
              <dt>
                ${_`Sumaṅgala’s Mother`}
              </dt>
              <dd>
                ${_`<a class="ref" href="/thig2.3">Thig 2.3</a>`}
              </dd>
              <dt>
                ${_`Sumbha`}
              </dt>
              <dd class="type">
                ${_`private Buddha`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn116">MN 116</a>`}
              </dd>
              <dt>
                ${_`Sumbha`}
              </dt>
              <dd class="type">
                ${_`people`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/sn47.19">SN 47.19</a>, <a class="ref" href="/sn47.20">SN 47.20</a>`}
              </dd>
              <dt>
                ${_`Sumukha`}
              </dt>
              <dd class="type">
                ${_`spirit (yakkha)`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn32">DN 32</a>`}
              </dd>
              <dt>
                ${_`Sunāga`}
              </dt>
              <dd class="type">
                ${_`monk`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/thag1.85">Thag 1.85</a>`}
              </dd>
              <dt>
                ${_`Sunakkhatta`}
              </dt>
              <dd class="type">
                ${_`the Licchavin`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn12">MN 12</a>, <a class="ref" href="/mn105">MN 105</a>`}
              </dd>
              <dt>
                ${_`Sunāparanta`}
              </dt>
              <dd class="type">
                ${_`country`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/sn35.88">SN 35.88</a>`}
              </dd>
              <dt>
                ${_`Sundara`}
              </dt>
              <dd class="type">
                ${_`private Buddha`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn116">MN 116</a>`}
              </dd>
              <dt>
                ${_`Sundara Samudda`}
              </dt>
              <dd class="type">
                ${_`monk`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/thag7.1">Thag 7.1</a>`}
              </dd>
              <dt>
                ${_`Sundarikā`}
              </dt>
              <dd class="type">
                ${_`river`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn7">MN 7</a>`}
              </dd>
              <dt id="sundarika">
                ${_`Sundarika Bhāradvāja`}
              </dt>
              <dd class="type">
                ${_`monk`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn7">MN 7</a>`}
              </dd>
              <dd class="life-events">
                ${_`goes for refuge, goes forth, becomes an arahant: <a class="ref" href="/mn7">MN 7</a>`}
              </dd>
              <dt>
                ${_`Sunīdha`}
              </dt>
              <dd class="type">
                ${_`brahmin`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn16">DN 16</a>`}
              </dd>
              <dt>
                ${_`Sunimmita`}
              </dt>
              <dd class="type">
                ${_`deity (deva)`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn11">DN 11</a>`}
              </dd>
              <dt>
                ${_`Sunīta`}
              </dt>
              <dd class="type">
                ${_`outcaste`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/thag12.2">Thag 12.2</a>`}
              </dd>
              <dt>
                ${_`Supaṇṇa`}
              </dt>
              <dd class="type">
                ${_`phoenix (garuda)`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn20">DN 20</a>`}
              </dd>
              <dt>
                ${_`Suppabuddha`}
              </dt>
              <dd class="type">
                ${_`leper`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/ud5.3">Ud 5.3</a>`}
              </dd>
              <dd class="life-events">
                ${_`becomes a stream-winner: <a class="ref" href="/ud5.3">Ud 5.3</a>`}
              </dd>
              <dt>
                ${_`Suppagedha`}
              </dt>
              <dd class="type">
                ${_`spirit (yakkha)`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn32">DN 32</a>`}
              </dd>
              <dt>
                ${_`Suppāraka`}
              </dt>
              <dd class="type">
                ${_`city`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/ud1.10">Ud 1.10</a>`}
              </dd>
              <dt>
                ${_`Suppatiṭṭhita`}
              </dt>
              <dd class="type">
                ${_`private Buddha`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn116">MN 116</a>`}
              </dd>
              <dt>
                ${_`Suppiya`}
              </dt>
              <dd class="type">
                ${_`monk`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/thag1.32">Thag 1.32</a>`}
              </dd>
              <dt>
                ${_`Surasena`}
              </dt>
              <dd class="type">
                ${_`country`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/an3.70">AN 3.70</a>`}
              </dd>
              <dt>
                ${_`Suriyavacchasā`}
              </dt>
              <dd class="type">
                ${_`deity (deva)`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn20">DN 20</a>`}
              </dd>
              <dt>
                ${_`Sūra`}
              </dt>
              <dd class="type">
                ${_`spirit (yakkha)`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn32">DN 32</a>`}
              </dd>
              <dt>
                ${_`Susārada`}
              </dt>
              <dd class="type">
                ${_`monk`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/thag1.75">Thag 1.75</a>`}
              </dd>
              <dt>
                ${_`Susīma`}
              </dt>
              <dd class="type">
                ${_`monk`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/sn12.70">SN 12.70</a>`}
              </dd>
              <dd class="life-events">
                ${_`goes forth: <a class="ref" href="/sn12.70">SN 12.70</a>`}
              </dd>
              <dt>
                ${_`Sutava`}
              </dt>
              <dd class="type">
                ${_`private Buddha`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn116">MN 116</a>`}
              </dd>
              <dt>
                ${_`Sutavan`}
              </dt>
              <dd class="type">
                ${_`monk`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/an9.7">AN 9.7</a>`}
              </dd>
              <dt>
                ${_`Suyāma`}
              </dt>
              <dd class="type">
                ${_`deity (deva)`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn11">DN 11</a>`}
              </dd>
            </dl>
            <h2 id="t">
              ${_`T`}
            </h2>
            <dl>
              <dt>
                ${_`Tacchakā`}
              </dt>
              <dd class="type">
                ${_`dragons`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn20">DN 20</a>`}
              </dd>
              <dt>
                ${_`Tadādhimutta`}
              </dt>
              <dd class="type">
                ${_`private Buddha`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn116">MN 116</a>`}
              </dd>
              <dt>
                ${_`Tagarasikhī`}
              </dt>
              <dd class="type">
                ${_`private Buddha`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn116">MN 116</a>, <a class="ref" href="/sn3.20">SN 3.20</a>, <a class="ref" href="/ud5.3">Ud 5.3</a>`}
              </dd>
              <dt>
                ${_`Tālapuṭa`}
              </dt>
              <dd class="type">
                ${_`the performer`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/sn42.2">SN 42.2</a>, <a class="ref" href="/thag19">Thag 19</a>`}
              </dd>
              <dd class="life-events">
                ${_`goes for refuge: <a class="ref" href="/sn42.2">SN 42.2</a>, aspires to go forth: <a class="ref" href="/thag19">Thag 19</a>`}
              </dd>
              <dt>
                ${_`Tapoda`}
              </dt>
              <dd class="type">
                ${_`monastery and hot springs`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn16">DN 16</a>, <a class="ref" href="/sn1.20">SN 1.20</a>, <a class="ref" href="/an10.96">AN 10.96</a>`}
              </dd>
              <dt>
                ${_`Tapussa the householder`}
              </dt>
              <dd>
                ${_`<a class="ref" href="/an9.41">AN 9.41</a>`}
              </dd>
              <dt>
                ${_`Tatha`}
              </dt>
              <dd class="type">
                ${_`private Buddha`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn116">MN 116</a>`}
              </dd>
              <dt>
                ${_`Tatojasī`}
              </dt>
              <dd class="type">
                ${_`spirit (yakkha)`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn32">DN 32</a>`}
              </dd>
              <dt>
                ${_`Tatolā`}
              </dt>
              <dd class="type">
                ${_`spirit (yakkha)`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn32">DN 32</a>`}
              </dd>
              <dt>
                ${_`Tattalā`}
              </dt>
              <dd class="type">
                ${_`spirit (yakkha)`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn32">DN 32</a>`}
              </dd>
              <dt>
                ${_`Tejasi`}
              </dt>
              <dd class="type">
                ${_`spirit (yakkha)`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn32">DN 32</a>`}
              </dd>
              <dt>
                ${_`Thera`}
              </dt>
              <dd class="type">
                ${_`monk`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/sn21.10">SN 21.10</a>`}
              </dd>
              <dt>
                ${_`Thullakoṭṭhita`}
              </dt>
              <dd class="type">
                ${_`city`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn82">MN 82</a>`}
              </dd>
              <dt>
                ${_`Thūṇā`}
              </dt>
              <dd class="type">
                ${_`village`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/ud7.9">Ud 7.9</a>`}
              </dd>
              <dt>
                ${_`Timbaru`}
              </dt>
              <dd class="type">
                ${_`deity (deva)`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn20">DN 20</a>`}
              </dd>
              <dt>
                ${_`Tissa`}
              </dt>
              <dd class="type">
                ${_`private Buddha`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn116">MN 116</a>`}
              </dd>
              <dt>
                ${_`Tissa`}
              </dt>
              <dd class="type">
                ${_`monk; paternal cousin of the Buddha`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/sn22.84">SN 22.84</a>, <a class="ref" href="/thag1.39">Thag 1.39</a>`}
              </dd>
              <dt>
                ${_`Tissa`}
              </dt>
              <dd class="type">
                ${_`high divinity (brahmā)`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn20">DN 20</a>`}
              </dd>
              <dt>
                ${_`Tissa-metteyya`}
              </dt>
              <dd class="type">
                ${_`brahmin ascetic`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/snp4.7">Snp 4.7</a>, <a class="ref" href="/snp5.2">Snp 5.2</a>`}
              </dd>
              <dt id="todeyya">
                ${_`Todeyya`}
              </dt>
              <dd class="type">
                ${_`brahmin ascetic`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn135">MN 135</a>, <a class="ref" href="/snp5.9">Snp 5.9</a>`}
              </dd>
              <dt>
                ${_`Toraṇavatthu`}
              </dt>
              <dd class="type">
                ${_`village`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/sn44.1">SN 44.1</a>`}
              </dd>
              <dt>
                ${_`Tusitā`}
              </dt>
              <dd class="type">
                ${_`deities (devas)`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn20">DN 20</a>, <a class="ref" href="/sn56.11">SN 56.11</a>, <a class="ref" href="/snp4.16">Snp 4.16</a>`}
              </dd>
              <dt>
                ${_`Tuṭṭha`}
              </dt>
              <dd>
                ${_`<a class="ref" href="/dn16">DN 16</a>`}
              </dd>
            </dl>
            <h2 id="u">
              ${_`U`}
            </h2>
            <dl>
              <dt id="ubbiri">
                ${_`Ubbirī`}
              </dt>
              <dd class="type">
                ${_`bhikkhunī (nun)`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/thig3.5">Thig 3.5</a>`}
              </dd>
              <dt>
                ${_`Uccaṅgamāya`}
              </dt>
              <dd class="type">
                ${_`private Buddha`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn116">MN 116</a>`}
              </dd>
              <dt>
                ${_`Uccaya`}
              </dt>
              <dd class="type">
                ${_`private Buddha`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn116">MN 116</a>`}
              </dd>
              <dt>
                ${_`Udañña`}
              </dt>
              <dd class="type">
                ${_`town`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn90">MN 90</a>`}
              </dd>
              <dt>
                ${_`Udaya`}
              </dt>
              <dd class="type">
                ${_`brahmin ascetic`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/snp5.13">Snp 5.13</a>`}
              </dd>
              <dt id="udayibhadda">
                ${_`Udayibhadda`}
              </dt>
              <dd class="type">
                ${_`prince, son of <a href="#ajatasattu">King Ajātasattu</a>`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn2">DN 2</a>`}
              </dd>
              <dt>
                ${_`Udāyin`}
              </dt>
              <dd class="type">
                ${_`monk; a.k.a. Kāludāyin`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn59">MN 59</a>, <a class="ref" href="/mn59">MN 59</a>, <a class="ref" href="/mn66">MN 66</a>, <a class="ref" href="/mn136">MN 136</a>, <a class="ref" href="/sn36.19">SN 36.19</a>, <a class="ref" href="/sn35.193">SN 35.193</a>, <a class="ref" href="/an5.159">AN 5.159</a>, <a class="ref" href="/an9.34">AN 9.34</a>, <a class="ref" href="/an9.43">AN 9.43</a>, <a class="ref" href="/an9.44">AN 9.44</a>, <a class="ref" href="/an9.45">AN 9.45</a>, <a class="ref" href="/thag10.1">Thag 10.1</a>, <a class="ref" href="/thag15.2">Thag 15.2</a>`}
              </dd>
              <dt>
                ${_`Uddaka Rāmaputta`}
              </dt>
              <dd class="type">
                ${_`Buddha’s second meditation teacher`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn13">MN 13</a>, <a class="ref" href="/mn26">MN 26</a>`}
              </dd>
              <dt id="udena">
                ${_`Udena, King`}
              </dt>
              <dd class="type">
                ${_`King of <a href="#kosambi">Kosambi</a>; married to <a href="#samavati">Queen Sāmāvatī</a>`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/sn35.127">SN 35.127</a>, <a class="ref" href="/ud7.10">Ud 7.10</a>`}
              </dd>
              <dt>
                ${_`Udena`}
              </dt>
              <dd class="type">
                ${_`shrine`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn16">DN 16</a>`}
              </dd>
              <dt>
                ${_`Ugga`}
              </dt>
              <dd>
                ${_`<a class="ref" href="/an7.7">AN 7.7</a>`}
              </dd>
              <dt>
                ${_`Uggāhamāna`}
              </dt>
              <dd>
                ${_`<a class="ref" href="/mn78">MN 78</a>`}
              </dd>
              <dt>
                ${_`Ukkaṭṭha`}
              </dt>
              <dd class="type">
                ${_`city`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn1">MN 1</a>, <a class="ref" href="/mn49">MN 49</a>, <a class="ref" href="/an4.36">AN 4.36</a>`}
              </dd>
              <dt>
                ${_`Uṇṇābha`}
              </dt>
              <dd class="type">
                ${_`brahmin`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/sn51.15">SN 51.15</a>`}
              </dd>
              <dd class="life-events">
                ${_`goes for refuge: <a class="ref" href="/sn51.15">SN 51.15</a>`}
              </dd>
              <dt>
                ${_`Upacālā`}
              </dt>
              <dd class="type">
                ${_`bhikkhunī (nun)`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/sn5.7">SN 5.7</a>`}
              </dd>
              <dt>
                ${_`Upaka`}
              </dt>
              <dd class="type">
                ${_`naked ascetic (ājīvaka)`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn26">MN 26</a>`}
              </dd>
              <dt>
                ${_`Upakāla`}
              </dt>
              <dd class="type">
                ${_`private Buddha`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn116">MN 116</a>`}
              </dd>
              <dt>
                ${_`Upāli`}
              </dt>
              <dd class="type">
                ${_`monk`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/an7.79">AN 7.79</a>`}
              </dd>
              <dt>
                ${_`Upananda`}
              </dt>
              <dd class="type">
                ${_`private Buddha`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn116">MN 116</a>`}
              </dd>
              <dt>
                ${_`Upanemisa`}
              </dt>
              <dd class="type">
                ${_`private Buddha`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn116">MN 116</a>`}
              </dd>
              <dt>
                ${_`Upanīta`}
              </dt>
              <dd class="type">
                ${_`private Buddha`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn116">MN 116</a>`}
              </dd>
              <dt>
                ${_`Upariṭṭha`}
              </dt>
              <dd class="type">
                ${_`private Buddha`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn116">MN 116</a>`}
              </dd>
              <dt>
                ${_`Upāsabha`}
              </dt>
              <dd class="type">
                ${_`private Buddha`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn116">MN 116</a>`}
              </dd>
              <dt>
                ${_`Upasena`}
              </dt>
              <dd class="type">
                ${_`monk`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/sn35.69">SN 35.69</a>`}
              </dd>
              <dt>
                ${_`Upasena Vaṅgantaputta`}
              </dt>
              <dd class="type">
                ${_`monk`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/ud4.9">Ud 4.9</a>`}
              </dd>
              <dt>
                ${_`Upasīdarī`}
              </dt>
              <dd class="type">
                ${_`private Buddha`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn116">MN 116</a>`}
              </dd>
              <dt>
                ${_`Upasīva`}
              </dt>
              <dd class="type">
                ${_`brahmin ascetic`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/snp5.6">Snp 5.6</a>`}
              </dd>
              <dt>
                ${_`Upatissa`}
              </dt>
              <dd class="type">
                ${_`private Buddha`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn116">MN 116</a>`}
              </dd>
              <dt>
                ${_`Upatissa`}
              </dt>
              <dd class="type">
                ${_`given name of Ven. Sāriputta`}
              </dd>
              <dd>
                ${_`see <a href="#sariputta">Ven. Sāriputta</a>`}
              </dd>
              <dt>
                ${_`Upavāna`}
              </dt>
              <dd class="type">
                ${_`monk`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn16">DN 16</a>`}
              </dd>
              <dt>
                ${_`Upavattana`}
              </dt>
              <dd class="type">
                ${_`grove`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn16">DN 16</a>, <a class="ref" href="/sn6.15">SN 6.15</a>`}
              </dd>
              <dt>
                ${_`Uposatha`}
              </dt>
              <dd class="type">
                ${_`private Buddha`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn116">MN 116</a>`}
              </dd>
              <dt>
                ${_`Uppala`}
              </dt>
              <dd class="type">
                ${_`private Buddha`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn116">MN 116</a>`}
              </dd>
              <dt>
                ${_`Uppalavaṇṇā`}
              </dt>
              <dd class="type">
                ${_`bhikkhunī (nun); praised by the Buddha as being foremost among the bhikkhunīs in terms of her mastery of psychic powers`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/sn5.5">SN 5.5</a>, <a class="ref" href="/thig13.5">Thig 13.5</a>`}
              </dd>
              <dt>
                ${_`Uruvelā`}
              </dt>
              <dd class="type">
                ${_`city`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn26">MN 26</a>, <a class="ref" href="/sn6.1">SN 6.1</a>, <a class="ref" href="/sn6.2">SN 6.2</a>, <a class="ref" href="/ud1.1">Ud 1.1</a>, <a class="ref" href="/ud1.2">Ud 1.2</a>, <a class="ref" href="/ud1.3">Ud 1.3</a>, <a class="ref" href="/ud3.10">Ud 3.10</a>`}
              </dd>
              <dt>
                ${_`Uruvelakappa`}
              </dt>
              <dd class="type">
                ${_`city`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/sn42.11">SN 42.11</a>, <a class="ref" href="/an9.41">AN 9.41</a>`}
              </dd>
              <dt>
                ${_`Usabha`}
              </dt>
              <dd class="type">
                ${_`private Buddha`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn116">MN 116</a>`}
              </dd>
              <dt>
                ${_`Uttama`}
              </dt>
              <dd class="type">
                ${_`monk`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/an8.8">AN 8.8</a>`}
              </dd>
              <dt>
                ${_`Uttamā`}
              </dt>
              <dd class="type">
                ${_`bhikkhunī (nun)`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/thig3.2">Thig 3.2</a>`}
              </dd>
              <dt>
                ${_`Uttara`}
              </dt>
              <dd class="type">
                ${_`private Buddha`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn116">MN 116</a>`}
              </dd>
              <dt>
                ${_`Uttara`}
              </dt>
              <dd class="type">
                ${_`the Deva’s son`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/sn2.19">SN 2.19</a>`}
              </dd>
              <dt>
                ${_`Uttara`}
              </dt>
              <dd class="type">
                ${_`brahmin; son of <a href="#parasiri">Parasiri</a>`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn152">MN 152</a>`}
              </dd>
              <dt>
                ${_`Uttarakuru`}
              </dt>
              <dd class="type">
                ${_`northern continent`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn32">DN 32</a>`}
              </dd>
              <dt>
                ${_`Uttiya`}
              </dt>
              <dd class="type">
                ${_`wandering ascetic`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/an10.95">AN 10.95</a>`}
              </dd>
            </dl>
            <h2 id="v">
              ${_`V`}
            </h2>
            <dl>
              <dt>
                ${_`Vacchagotta`}
              </dt>
              <dd class="type">
                ${_`wandering ascetic`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn72">MN 72</a>, <a class="ref" href="/sn44.7">SN 44.7</a>, <a class="ref" href="/sn44.8">SN 44.8</a>, <a class="ref" href="/sn44.9">SN 44.9</a>, <a class="ref" href="/sn44.10">SN 44.10</a>, <a class="ref" href="/sn44.11">SN 44.11</a>, <a class="ref" href="/an3.57">AN 3.57</a>`}
              </dd>
              <dd class="life-events">
                ${_`goes for refuge: <a class="ref" href="/mn072">MN 72</a>`}
              </dd>
              <dt>
                ${_`Vaggamudā`}
              </dt>
              <dd class="type">
                ${_`river`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/ud3.3">Ud 3.3</a>`}
              </dd>
              <dt>
                ${_`Vajirā`}
              </dt>
              <dd class="type">
                ${_`bhikkhunī (nun)`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/sn5.10">SN 5.10</a>`}
              </dd>
              <dt>
                ${_`Vajirapāṇi`}
              </dt>
              <dd class="type">
                ${_`spirit (yakkha)`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn35">MN 35</a>,`}
              </dd>
              <dt>
                ${_`Vajirī`}
              </dt>
              <dd class="type">
                ${_`princess`}
              </dd>
              <dd>
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn87">MN 87</a>`}
              </dd>
              <dt>
                ${_`Vajjī`}
              </dt>
              <dd class="type">
                ${_`country`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn16">DN 16</a>, <a class="ref" href="/sn9.9">SN 9.9</a>, <a class="ref" href="/an3.70">AN 3.70</a>, <a class="ref" href="/an4.1">AN 4.1</a>, <a class="ref" href="/ud3.3">Ud 3.3</a>, <a class="ref" href="/thag5.9">Thag 5.9</a>`}
              </dd>
              <dt>
                ${_`Vajjiyamāhita`}
              </dt>
              <dd class="type">
                ${_`householder`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/an10.94">AN 10.94</a>`}
              </dd>
              <dt>
                ${_`Vakkali`}
              </dt>
              <dd class="type">
                ${_`monk`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/sn22.87">SN 22.87</a>, <a class="ref" href="/thag5.8">Thag 5.8</a>`}
              </dd>
              <dt>
                ${_`Valliya`}
              </dt>
              <dd class="type">
                ${_`monk`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/thag2.24">Thag 2.24</a>`}
              </dd>
              <dt>
                ${_`Vāmadeva`}
              </dt>
              <dd class="type">
                ${_`brahmin sage`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn95">MN 95</a>, <a class="ref" href="/an7.49">AN 7.49</a>`}
              </dd>
              <dt>
                ${_`Vāmaka`}
              </dt>
              <dd class="type">
                ${_`brahmin sage`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn95">MN 95</a>, <a class="ref" href="/an7.49">AN 7.49</a>`}
              </dd>
              <dt>
                ${_`Vanavaccha`}
              </dt>
              <dd class="type">
                ${_`monk`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/thag1.13">Thag 1.13</a>, <a class="ref" href="/thag1.113">Thag 1.113</a>`}
              </dd>
              <dt>
                ${_`Vanavaccha’s pupil`}
              </dt>
              <dd>
                ${_`<a class="ref" href="/thag1.14">Thag 1.14</a>`}
              </dd>
              <dt>
                ${_`Vaṅgīsa`}
              </dt>
              <dd class="type">
                ${_`monk and poet`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/sn8.4">SN 8.4</a>, <a class="ref" href="/snp3.3">Snp 3.3</a>`}
              </dd>
              <dt>
                ${_`Vaṅsa`}
              </dt>
              <dd class="type">
                ${_`country`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/an3.70">AN 3.70</a>`}
              </dd>
              <dt id="varanasi">
                ${_`Varanasi`}
              </dt>
              <dd class="type">
                ${_`a.k.a. Bārānasī; city`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/kd10.2.3">Kd 10.2.3–20</a>, <a class="ref" href="/mn26">MN 26</a>, <a class="ref" href="/sn22.59">SN 22.59</a>, <a class="ref" href="/sn22.90">SN 22.90</a>, <a class="ref" href="/sn35.191">SN 35.191</a>, <a class="ref" href="/sn44.3">SN 44.3</a>, <a class="ref" href="/sn44.4">SN 44.4</a>, <a class="ref" href="/sn44.5">SN 44.5</a>, <a class="ref" href="/sn44.6">SN 44.6</a>, <a class="ref" href="/sn56.11">SN 56.11</a>, <a class="ref" href="/an3.15">AN 3.15</a>, <a class="ref" href="/an3.126">AN 3.126</a>`}
              </dd>
              <dt>
                ${_`Varuṇa`}
              </dt>
              <dd class="type">
                ${_`deities (devas)`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn20">DN 20</a>`}
              </dd>
              <dt>
                ${_`Varuṇa`}
              </dt>
              <dd class="type">
                ${_`spirit (yakkha)`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn32">DN 32</a>, <a class="ref" href="/sn11.3">SN 11.3</a>`}
              </dd>
              <dt>
                ${_`Vāsabhā`}
              </dt>
              <dd class="type">
                ${_`queen`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn87">MN 87</a>`}
              </dd>
              <dt>
                ${_`Vāsava`}
              </dt>
              <dd class="type">
                ${_`deity (deva)`}
              </dd>
              <dd>
                ${_`see <a href="#sakka">Sakka</a>`}
              </dd>
              <dt>
                ${_`Vāsavanesī`}
              </dt>
              <dd class="type">
                ${_`deities (devas)`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn20">DN 20</a>`}
              </dd>
              <dt>
                ${_`Vasavattī`}
              </dt>
              <dd class="type">
                ${_`deity (deva)`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn11">DN 11</a>`}
              </dd>
              <dt>
                ${_`Vāseṭṭha`}
              </dt>
              <dd class="type">
                ${_`brahmin sage`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn95">MN 95</a>, <a class="ref" href="/an7.49">AN 7.49</a>`}
              </dd>
              <dt>
                ${_`Vāsiṭṭhī`}
              </dt>
              <dd class="type">
                ${_`bhikkhunī (nun)`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/thig6.2">Thig 6.2</a>`}
              </dd>
              <dt>
                ${_`Vassa`}
              </dt>
              <dd>
                ${_`<a class="ref" href="/mn117">MN 117</a>`}
              </dd>
              <dt>
                ${_`Vassakāra, the brahman`}
              </dt>
              <dd>
                ${_`<a class="ref" href="/dn16">DN 16</a>, <a class="ref" href="/mn108">MN 108</a>, <a class="ref" href="/an4.35">AN 4.35</a>, <a class="ref" href="/an4.183">AN 4.183</a>`}
              </dd>
              <dt>
                ${_`Vataraga`}
              </dt>
              <dd class="type">
                ${_`private Buddha`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn116">MN 116</a>`}
              </dd>
              <dt>
                ${_`Vebhāra`}
              </dt>
              <dd class="type">
                ${_`mountain`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn16">DN 16</a>, <a class="ref" href="/mn116">MN 116</a>, <a class="ref" href="/thag1.41">Thag 1.41</a>`}
              </dd>
              <dt>
                ${_`Vedehikā`}
              </dt>
              <dd class="type">
                ${_`lady of Sāvatthī`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn21">MN 21</a>`}
              </dd>
              <dt>
                ${_`Veghana`}
              </dt>
              <dd class="type">
                ${_`deities (devas)`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn20">DN 20</a>`}
              </dd>
              <dt>
                ${_`Veḷuvagāmaka`}
              </dt>
              <dd class="type">
                ${_`town`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn52">MN 52</a>, <a class="ref" href="/an11.17">AN 11.17</a>`}
              </dd>
              <dt>
                ${_`Veṇḍu`}
              </dt>
              <dd class="type">
                ${_`deity (deva)`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn20">DN 20</a>`}
              </dd>
              <dt>
                ${_`Vepacitti`}
              </dt>
              <dd class="type">
                ${_`asura demon`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn20">DN 20</a>, <a class="ref" href="/sn11.5">SN 11.5</a>, <a class="ref" href="/sn35.207">SN 35.207</a>`}
              </dd>
              <dt>
                ${_`Vepulla`}
              </dt>
              <dd class="type">
                ${_`mountain`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn20">DN 20</a>, <a class="ref" href="/mn116">MN 116</a>, <a class="ref" href="/iti24">Iti 24</a>`}
              </dd>
              <dt>
                ${_`Verahaccāni`}
              </dt>
              <dd class="type">
                ${_`brahmin clan`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/sn35.133">SN 35.133</a>`}
              </dd>
              <dt>
                ${_`Verambha`}
              </dt>
              <dd class="type">
                ${_`wind`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/an3.34">AN 3.34</a>`}
              </dd>
              <dt>
                ${_`Veroca`}
              </dt>
              <dd class="type">
                ${_`asura demon`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn20">DN 20</a>`}
              </dd>
              <dt>
                ${_`Vesāli`}
              </dt>
              <dd class="type">
                ${_`city`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn16">DN 16</a>, <a class="ref" href="/dn20">DN 20</a>, <a class="ref" href="/mn12">MN 12</a>, <a class="ref" href="/mn35">MN 35</a>, <a class="ref" href="/mn36">MN 36</a>, <a class="ref" href="/mn52">MN 52</a>, <a class="ref" href="/mn105">MN 105</a>, <a class="ref" href="/mn108">MN 108</a>, <a class="ref" href="/an3.83">AN 3.83</a>, <a class="ref" href="/an3.123">AN 3.123</a>, <a class="ref" href="/an5.34">AN 5.34</a>, <a class="ref" href="/an5.121">AN 5.121</a>, <a class="ref" href="/an8.53">AN 8.53</a>, <a class="ref" href="/an11.17">AN 11.17</a>, <a class="ref" href="/sn9.9">SN 9.9</a>, <a class="ref" href="/sn22.60">SN 22.60</a>, <a class="ref" href="/sn22.86">SN 22.86</a>, <a class="ref" href="/sn36.7">SN 36.7</a>, <a class="ref" href="/sn54.9">SN 54.9</a>, <a class="ref" href="/sn55.30">SN 55.30</a>, <a class="ref" href="/sn56.45">SN 56.45</a>`}
              </dd>
              <dt>
                ${_`Vessabhū`}
              </dt>
              <dd class="type">
                ${_`previous Buddha; the third of the Buddhas mentioned in the Canon`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn32">DN 32</a>`}
              </dd>
              <dt>
                ${_`Vessamitta`}
              </dt>
              <dd class="type">
                ${_`brahmin sage`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn95">MN 95</a>, <a class="ref" href="/an7.49">AN 7.49</a>`}
              </dd>
              <dt>
                ${_`Vessamitta`}
              </dt>
              <dd class="type">
                ${_`spirit (yakkha)`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn32">DN 32</a>`}
              </dd>
              <dt>
                ${_`Vessamitta`}
              </dt>
              <dd class="type">
                ${_`land`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn20">DN 20</a>`}
              </dd>
              <dt>
                ${_`Vessavaṇa`}
              </dt>
              <dd class="type">
                ${_`king`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn32">DN 32</a>, <a class="ref" href="/an8.8">AN 8.8</a>`}
              </dd>
              <dt>
                ${_`Veteṇḍu`}
              </dt>
              <dd class="type">
                ${_`deity (deva)`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn20">DN 20</a>`}
              </dd>
              <dt>
                ${_`Veṭṭhadīpa`}
              </dt>
              <dd class="type">
                ${_`brahmin settlement`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn16">DN 16</a>`}
              </dd>
              <dt>
                ${_`Vicakkhaṇa`}
              </dt>
              <dd class="type">
                ${_`deities (devas)`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn20">DN 20</a>`}
              </dd>
              <dt id="videha">
                ${_`Videha`}
              </dt>
              <dd class="type">
                ${_`queen, mother of <a href="#ajatasattu">King Ajātasattu</a>`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn2">DN 2</a>, <a class="ref" href="/dn16">DN 16</a>, <a class="ref" href="/sn3.14">SN 3.14</a>`}
              </dd>
              <dt>
                ${_`Viḍūḍabha`}
              </dt>
              <dd class="type">
                ${_`general, son of <a href="#pasenadi">King Pasenadi</a>`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn87">MN 87</a>, <a class="ref" href="/mn90">MN 90</a>`}
              </dd>
              <dt>
                ${_`Vijayā`}
              </dt>
              <dd class="type">
                ${_`bhikkhunī (nun)`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/sn5.4">SN 5.4</a>`}
              </dd>
              <dt>
                ${_`Vijita`}
              </dt>
              <dd class="type">
                ${_`private Buddha`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn116">MN 116</a>`}
              </dd>
              <dt>
                ${_`Vijitasena`}
              </dt>
              <dd class="type">
                ${_`monk`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/thag5.9">Thag 5.9</a>`}
              </dd>
              <dt>
                ${_`Vimala`}
              </dt>
              <dd class="type">
                ${_`private Buddha`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn116">MN 116</a>`}
              </dd>
              <dt>
                ${_`Vimalā`}
              </dt>
              <dd class="type">
                ${_`bhikkhunī (nun), former courtesan`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/thig5.2">Thig 5.2</a>`}
              </dd>
              <dt>
                ${_`Vimila`}
              </dt>
              <dd class="type">
                ${_`monk`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/thag1.50">Thag 1.50</a>`}
              </dd>
              <dt>
                ${_`Vipassī`}
              </dt>
              <dd class="type">
                ${_`previous Buddha; the first of the Buddhas mentioned in the Canon`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn32">DN 32</a>`}
              </dd>
              <dt>
                ${_`Virūḷha`}
              </dt>
              <dd class="type">
                ${_`ghost king`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn20">DN 20</a>, <a class="ref" href="/dn32">DN 32</a>`}
              </dd>
              <dt>
                ${_`Virūpakkha`}
              </dt>
              <dd class="type">
                ${_`dragon king`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn20">DN 20</a>, <a class="ref" href="/an4.67">AN 4.67</a>`}
              </dd>
              <dt id="visakha1">
                ${_`Visākhā`}
              </dt>
              <dd class="type">
                ${_`laywoman; a.k.a. “Migāra’s Mother”; chief patroness to the Buddha; see also <a href="#migaramom">Migāra’s Mother’s Palace</a>`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/an3.70">AN 3.70</a>, <a class="ref" href="/an8.43">AN 8.43</a>, <a class="ref" href="/ud2.9">Ud 2.9</a>, <a class="ref" href="/ud8.8">Ud 8.8</a>`}
              </dd>
              <dt>
                ${_`Visākha`}
              </dt>
              <dd class="type">
                ${_`layman; former husband of <a href="#dhammadinna">Bhikkhunī Dhammadinnā</a>`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn44">MN 44</a>`}
              </dd>
              <dt>
                ${_`Visāṇa`}
              </dt>
              <dd class="type">
                ${_`deva kingdom`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn32">DN 32</a>`}
              </dd>
              <dt>
                ${_`Viṭu`}
              </dt>
              <dd class="type">
                ${_`deity (deva)`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn20">DN 20</a>`}
              </dd>
              <dt>
                ${_`Vulture Peak`}
              </dt>
              <dd>
                ${_`<a class="ref" href="/an7.21">AN 7.21</a> <a class="ref" href="/an9.7">AN 9.7</a>`}
              </dd>
              <dt>
                ${_`Vyagghapajjā`}
              </dt>
              <dd>
                ${_`a clan of people; see <a href="#dighajanu">Dīghajanu</a>`}
              </dd>
            </dl>
            <h2 id="wxyz">
              ${_`WXYZ`}
            </h2>
            <dl>
              <dt>
                ${_`Yama`}
              </dt>
              <dd class="type">
                ${_`deity (deva)`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn11">DN 11</a>, <a class="ref" href="/dn20">DN 20</a>, <a class="ref" href="/mn130">MN 130</a>, <a class="ref" href="/sn56.11">SN 56.11</a>`}
              </dd>
              <dt>
                ${_`Yamaka`}
              </dt>
              <dd class="type">
                ${_`monk`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/sn22.85">SN 22.85</a>`}
              </dd>
              <dd class="life-events">
                ${_`becomes an arahant: <a class="ref" href="/sn22.85">SN 22.85</a>`}
              </dd>
              <dt>
                ${_`Yamataggi`}
              </dt>
              <dd class="type">
                ${_`brahmin sage`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn95">MN 95</a>, <a class="ref" href="/an7.49">AN 7.49</a>`}
              </dd>
              <dt>
                ${_`Yamunā`}
              </dt>
              <dd class="type">
                ${_`river`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn20">DN 20</a>, <a class="ref" href="/an10.15">AN 10.15</a>, <a class="ref" href="/ud5.5">Ud 5.5</a>`}
              </dd>
              <dt>
                ${_`Yasadatta`}
              </dt>
              <dd class="type">
                ${_`monk`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/thag5.10">Thag 5.10</a>`}
              </dd>
              <dt>
                ${_`Yasassī`}
              </dt>
              <dd class="type">
                ${_`private Buddha`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/mn116">MN 116</a>`}
              </dd>
              <dt>
                ${_`Yasoja`}
              </dt>
              <dd class="type">
                ${_`monk`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/ud3.3">Ud 3.3</a>, <a class="ref" href="/thag3.8">Thag 3.8</a>`}
              </dd>
              <dt>
                ${_`Yodha`}
              </dt>
              <dd class="type">
                ${_`nunk`}
              </dd>
              <dd>
                ${_`<a class="ref" href="https://discourse.suttacentral.net/t/dhamma-doodles-grin/7206/159">DD</a>`}
              </dd>
              <dt>
                ${_`Yodhajīva`}
              </dt>
              <dd class="type">
                ${_`warrior`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/sn42.3">SN 42.3</a>`}
              </dd>
              <dd class="life-events">
                ${_`goes for refuge: <a class="ref" href="/sn42.3">SN 42.3</a>`}
              </dd>
              <dt>
                ${_`Yugandhara`}
              </dt>
              <dd class="type">
                ${_`spirit (yakkha)`}
              </dd>
              <dd>
                ${_`<a class="ref" href="/dn32">DN 32</a>`}
              </dd>
            </dl>
            <aside class="static-copyright">
              <p>
                ${_`The original source of this Index was released under the following terms:`}
              </p>
              <blockquote>
                ${_`© 2007 Access to Insight. The text of this page (“Index of proper Names”, by Access to Insight) is licensed under a Creative Commons Attribution 4.0 International License. To view a copy of the license, visit <a href="http://creativecommons.org/licenses/by/4.0/" rel="noopener" target="_blank">this page</a>.`}
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
    this.localizedStringsPath = '/localization/elements/static_names-page';
  }
}


customElements.define('sc-names-page', SCNamesPage);
