import { html } from '@polymer/lit-element/lit-element.js';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';

import { staticStyles } from '../styles/static-styles.js';
import { SCStaticPage } from '../addons/sc-static-page.js';
import _ from '../../localization/macro.js';

class SCTerminology extends SCStaticPage {
  render() {
    return html`
    ${staticStyles}
    <div id="page-wrap">
      <main>
        <section>
          <article>
            <h1>
              ${_`Basic Pali Terminology`}
            </h1>
            <p>
              ${_`This is a modified version of the <a href="https://www.accesstoinsight.org/glossary.html" rel="noopener" target="_blank">Glossary of Terms</a> from Access to Insight. We adapt this useful resource with gratitude. Changes include:`}
            </p>
            <ul>
              <li>
                ${_`Removing all later texts and references, retaining only references directly to the early texts.`}
              </li>
              <li>
                ${_`In quite a few cases, terminology and definitions have been changed, corrected, or deleted. However, most of the content is identical.`}
              </li>
              <li>
                ${_`HTML structure is modified.`}
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
                ${_`The list is not meant to be complete, but merely offers a handy guide to some common terms in their most important meanings.`}
              </li>
            </ul>
            <nav class="contents">
              <ul class="entry-list">
                <li>
                  ${_`<a href="#a" title="as">A</a>`}
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
              <dt id="abhidhamma">
                ${_`Abhidhamma`}
              </dt>
              <dd>
                <ol>
                  <li>
                    ${_`In the discourses of the Pali canon, this term simply means “about the Dhamma”, and refers to discussions about sometimes abstruse points in the teachings.`}
                  </li>
                  <li>
                    ${_`A later collection of analytical treatises based on lists of categories drawn from the teachings in the discourses, added to the Canon several centuries after the Buddha’s life.`}
                  </li>
                </ol>
              </dd>
              <dt id="abhinna">
                ${_`abhiññā`}
              </dt>
              <dd>
                ${_`Intuitive powers that come from the practice of concentration: the ability to display psychic powers, clairvoyance, clairaudience, the ability to know the thoughts of others, recollection of past lifetimes, and the knowledge that does away with mental defilements (see <a href="#asava"><i>āsava</i></a>).`}
              </dd>
              <dt id="acariya">
                ${_`ācariya`}
              </dt>
              <dd>
                ${_`Teacher; mentor. See <i><a href="#kalyanamitta">kalyāṇamitta</a></i>. Note that this term is not a title, nor is it used for monastics specifically, but refers to anyone in a teaching role.`}
              </dd>
              <dt id="adhitthana">
                ${_`adhiṭṭhāna`}
              </dt>
              <dd>
                ${_`Determination; resolution; sometimes a term for defilements.`}
              </dd>
              <dt id="akaliko">
                ${_`akāliko`}
              </dt>
              <dd>
                ${_`Timeless; without interval; in this very life.`}
              </dd>
              <dt id="akusala">
                ${_`akusala`}
              </dt>
              <dd>
                ${_`Unwholesome, unskillful, demeritorious. See its opposite, <a href="#kusala"><i>kusala</i></a>.`}
              </dd>
              <dt id="anagami">
                ${_`anāgāmī`}
              </dt>
              <dd>
                ${_`Non-returner. A person who has abandoned the five lower fetters that bind the mind to the cycle of rebirth (see <a href="#samyojana"><i>saṃyojana</i></a>), and who after death will appear in one of the Brahmā worlds called the <a href="https://www.accesstoinsight.org/ptf/dhamma/sagga/loka.html#plane27">Pure Abodes</a>, there to attain <a href="#nibbana"><i>nibbāna</i></a>, never again to return to this world. This is the third of the four stages of awakening.`}
              </dd>
              <dt id="anapanasati">
                ${_`ānāpānasati`}
              </dt>
              <dd>
                ${_`Mindfulness of breathing. A meditation practice in which one maintains one’s attention and mindfulness on the sensations of breathing.`}
              </dd>
              <dt id="anatta">
                ${_`anattā`}
              </dt>
              <dd>
                ${_`Not-self; ownerless.`}
              </dd>
              <dt id="anicca">
                ${_`anicca`}
              </dt>
              <dd>
                ${_`Inconstant; unsteady; impermanent.`}
              </dd>
              <dt id="anupadisesa-nibbana">
                ${_`anupādisesa-nibbāna`}
              </dt>
              <dd>
                ${_`<a href="#nibbana"><i>Nibbāna</i></a> with no fuel remaining (the analogy is to an extinguished fire whose embers are cold)—the <a href="#nibbana"><i>nibbāna</i></a> of the arahant after his passing away. Cf. <i><a href="#sa-upadisesa-nibbana">sa-upādisesa-nibbāna</a></i>.`}
              </dd>
              <dt id="anupubbi">
                ${_`anupubbī-kathā`}
              </dt>
              <dd>
                ${_`Gradual instruction. The Buddha’s method of teaching Dhamma that guides his listeners progressively through increasingly advanced topics: generosity (see <a href="#dana"><i>dāna</i></a>), virtue (see <a href="#sila"><i>sīla</i></a>), heavens, drawbacks, renunciation, and the four noble truths.`}
              </dd>
              <dt id="anusaya">
                ${_`anusaya`}
              </dt>
              <dd>
                ${_`Underlying tendency. (The etymology of this term means “lying down with”.) There are seven major underlying tendencies to which the mind returns over and over again: sensual passion (<i>kāma-rāgānusaya</i>), resistance (<i>paṭighānusaya</i>), views (<i>diṭṭhānusaya</i>), uncertainty (<i>vicikicchānusaya</i>), conceit (<i>mānānusaya</i>), desire to be reborn (<i>bhava-rāgānusaya</i>), and ignorance (<i>avijjānusaya</i>). Compare <i><a href="#samyojana">saṃyojana</a></i>.`}
              </dd>
              <dt id="apaya-bhumi">
                ${_`apāya-bhūmi`}
              </dt>
              <dd>
                ${_`State of deprivation; the four lower levels of existence into which one might be reborn as a result of past unskillful actions (see <i><a href="#kamma">kamma</a>):</i> rebirth in hell, as a hungry ghost (see <a href="#peta"><i>peta</i></a>), as an angry demon (see <i><a href="#asura">asura</a></i>), or as a common animal. None of these states is permanent. Compare <i><a href="#sugati">sugati</a></i>.`}
              </dd>
              <dt id="appamada">
                ${_`appamāda`}
              </dt>
              <dd>
                ${_`Heedfulness; diligence; zeal. The cornerstone of all skillful mental states, and one of such fundamental import that the Buddha stressed it in his <a href="https://www.accesstoinsight.org/tipitaka/sn/sn06/sn06.015.than.html">parting words to his disciples</a>: “Conditions fall apart. Persist with diligence”. (<i>appamādena sampādetha</i>).`}
              </dd>
              <dt id="arahant">
                ${_`arahant`}
              </dt>
              <dd>
                ${_`A “worthy one” or “perfected one”; a person whose mind is free of defilement (see <a href="#kilesa"><i>kilesa</i></a>), who has abandoned all ten of the fetters that bind the mind to the cycle of rebirth (see <a href="#samyojana"><i>saṃyojana</i></a>), whose heart is free of mental defilements (see <a href="#asava"><i>āsava</i></a>), and who is thus not destined for further rebirth. A title for the Buddha and the highest level of his noble disciples.`}
              </dd>
              <dt id="arammana">
                ${_`ārammaṇa`}
              </dt>
              <dd>
                ${_`Basis or cause. In the early texts this does not yet have the later sense of “mental object”.`}
              </dd>
              <dt id="ariya">
                ${_`ariya`}
              </dt>
              <dd>
                ${_`Noble, ideal. Also, a “Noble One” (see <i><a href="#ariya-puggala">ariya-puggala</a></i>).`}
              </dd>
              <dt id="ariyadhana">
                ${_`ariyadhana`}
              </dt>
              <dd>
                ${_`Noble Wealth; qualities that serve as “capital” in the quest for liberation: faith (see <i><a href="#saddha">saddhā</a></i>), virtue (see <i><a href="#sila">sīla</a></i>), conscience, prudence, erudition, generosity (see <i><a href="#dana">dāna</a></i>), and wisdom (see <i><a href="#panna">paññā</a></i>).`}
              </dd>
              <dt id="ariya-puggala">
                ${_`ariya-puggala`}
              </dt>
              <dd>
                ${_`Noble person; enlightened individual. An individual who has entered at least the lowest of the four noble paths (see <a href="#magga"><i>magga</i></a>). Compare <a href="#puthujjana"><i>puthujjana</i></a> (ordinary person).`}
              </dd>
              <dt id="ariya-sacca">
                ${_`ariya-sacca`}
              </dt>
              <dd>
                ${_`Noble Truth. The sense is that the truth itself is noble, and it “ennobles” the one who realizes it. There are four: stress, the origin of stress, the disbanding of stress, and the path of practice leading to the disbanding of stress.`}
              </dd>
              <dt id="asava">
                ${_`āsava`}
              </dt>
              <dd>
                ${_`Mental defilement, pollutant, or corruption. Four qualities—sensuality, views, desire for rebirth, and ignorance—that “flow out” of the mind and create the flood of the round of death and rebirth.`}
              </dd>
              <dt id="asubha">
                ${_`asubha`}
              </dt>
              <dd>
                ${_`Unattractiveness, loathsomeness, foulness. The Buddha recommends contemplation of this aspect of the body as an antidote to lust and complacency. See also <i><a href="#kayagata-sati">kāyagatā-sati</a></i>.`}
              </dd>
              <dt id="asura">
                ${_`asura`}
              </dt>
              <dd>
                ${_`A race of beings who, like the Titans of Greek mythology, fought the <a href="#deva"><i>devas</i></a> for sovereignty over the heavens and lost. See <a href="#apaya-bhumi"><i>apāya-bhūmi</i>.</a>`}
              </dd>
              <dt id="avijja">
                ${_`avijjā`}
              </dt>
              <dd>
                ${_`Unawareness; ignorance; obscured awareness; not seeing the Four Noble Truths. See also <i><a href="#moha">moha</a></i>.`}
              </dd>
              <dt id="ayatana">
                ${_`āyatana`}
              </dt>
              <dd>
                ${_`Sense field. The inner sense fields are the sense organs: eyes, ears, nose, tongue, body, and mind. The outer sense media are their respective stimuli.`}
              </dd>
            </dl>
            <h2 id="b">
              ${_`B`}
            </h2>
            <dl>
              <dt id="bhante">
                ${_`bhante`}
              </dt>
              <dd>
                ${_`Venerable sir. In the Pali texts, this is used as a vocative in addressing the Buddha or a Buddhist monk. In modern usage it is often used also as a title.`}
              </dd>
              <dt id="bhava">
                ${_`bhava`}
              </dt>
              <dd>
                ${_`Existence, life, or rebirth. States of existence that develop first in the mind and can then be experienced as internal worlds and/or as worlds on an external level. There are three levels of existence: on the sensual level, the level of form, and the level of formlessness.`}
              </dd>
              <dt id="bhavana">
                ${_`bhāvanā`}
              </dt>
              <dd>
                ${_`Mental cultivation or development; meditation. The third of the three grounds for meritorious action. See also <a href="#dana"><i>dāna</i></a> and <a href="#sila"><i>sīla</i></a>.`}
              </dd>
              <dt id="bhikkhu">
                ${_`bhikkhu`}
              </dt>
              <dd>
                ${_`Mendicant; Buddhist monk; a man who has given up the householder’s life to live a life of heightened virtue (see <a href="#sila"><i>sīla</i></a>) in accordance with the <a href="#vinaya"><i>Vinaya</i></a> in general, and the <a href="#patimokkha"><i>Pātimokkha</i></a> rules in particular. The root of the word means “mendicant”, i.e. one who lives by alms. As the masculine is used as default gender in Pali, the term <i>bhikkhu</i> often includes nuns as well, so “mendicant” can be used as a gender-neutral translation. See <a href="#sangha"><i>saṅgha</i></a>, <a href="#parisa"><i>parisā</i></a>, <a href="#upasampada"><i>upasampadā</i></a>.`}
              </dd>
              <dt id="bhikkhuni">
                ${_`bhikkhunī`}
              </dt>
              <dd>
                ${_`Female mendicant; Buddhist nun; a woman who has given up the householder’s life to live a life of heightened virtue (see <a href="#sila"><i>sīla</i></a>) in accordance with the <a href="#vinaya"><i>Vinaya</i></a> in general, and the <a href="#patimokkha"><i>Pātimokkha</i></a> rules in particular. See <a href="#sangha"><i>saṅgha</i></a>, <a href="#parisa"><i>parisā</i></a>, <a href="#upasampada"><i>upasampadā</i></a>.`}
              </dd>
              <dt id="bodhi-pakkhiya-dhamma">
                ${_`bodhi-pakkhiya-dhammā`}
              </dt>
              <dd>
                ${_`“Qualities that lead to awakening”—seven sets of principles that are conducive to Awakening and that,\n                according to the Buddha, form the heart of his teaching:\n                `}
                <ol>
                  <li>
                    ${_`the four kinds of mindfulness meditation (see <a href="#satipatthana"><i>satipaṭṭhāna</i></a>);`}
                  </li>
                  <li>
                    ${_`four right efforts (<i>sammappadhāna</i>)—the effort to prevent unskillful states from arising in the mind, to abandon whatever unskillful states have already arisen, to give rise to the good, and to maintain the good that has arisen;`}
                  </li>
                  <li>
                    ${_`four bases of success (<i>iddhipāda</i>)—desire, energy, higher consciousness, inquiry;`}
                  </li>
                  <li>
                    ${_`five dominant factors (<i><a href="#indriya">indriya</a></i>)—faith, energy, mindfulness, immersion, wisdom;`}
                  </li>
                  <li>
                    ${_`five strengths (<i>bala</i>)—identical with [4];`}
                  </li>
                  <li>
                    ${_`seven factors for Awakening (<i>bojjhaṅga</i>)—mindfulness, investigation of principles, energy, rapture (see <a href="#piti"><i>pīti</i></a>), tranquility, immersion, equanimity; and`}
                  </li>
                  <li>
                    ${_`the eightfold path (<a href="#magga"><i>magga</i></a>)—Right View, Right Thought, Right Speech, Right Action, Right Livelihood, Right Effort, Right Mindfulness, Right Immersion.`}
                  </li>
                </ol>
              </dd>
              <dt id="bodhisatta">
                ${_`bodhisatta`}
              </dt>
              <dd>
                ${_`In the early texts, this term is used primarily for Siddhattha after leaving home to strive for awakening. The notion that in a past life a bodhisatta makes an aspiration for awakening does not occur on the early texts. (Sanskrit: <i>bodhisattva</i>)`}
              </dd>
              <dt id="brahma">
                ${_`brahmā`}
              </dt>
              <dd>
                ${_`A high divinity; an inhabitant of the non-sensual heavens of form or formlessness. Regarded by himself and brahmins as Lord and creator of the universe.`}
              </dd>
              <dt id="brahma-vihara">
                ${_`brahma-vihāra`}
              </dt>
              <dd>
                ${_`The four “sublime” or “divine” abodes that are attained through the development of boundless <i><a href="#metta">mettā</a></i> (goodwill), <i><a href="#karuna">karuṇā</a></i> (compassion), <i><a href="#mudita">muditā</a></i> (rejoicing), and <i><a href="#upekkha">upekkhā</a></i> (equanimity).`}
              </dd>
              <dt id="brahman">
                ${_`brahman (from Pali <i>brāhmaṇa</i>)`}
              </dt>
              <dd>
                ${_`The brahman (brahmin) caste of India is a inherited class with special priestly and sacred functions, especially the maintainance of the ancient Vedic texts and rites. However, many brahmins lived secular lives, while others practiced as renunciates. Nevertheless, they long maintained that by their birth, they are worthy of the highest respect. Buddhism borrowed the term brahman to apply to those who have attained the goal, to show that respect is earned not by birth, race, or caste, but by spiritual attainment. Used in the Buddhist sense, this term is synonymous with <i><a href="#arahant">arahant</a></i>.`}
              </dd>
              <dt id="buddha">
                ${_`Buddha`}
              </dt>
              <dd>
                ${_`The name given to one who rediscovers for himself the liberating path of Dhamma, after a long period of its having been forgotten by the world. According to tradition, a long line of Buddhas stretches off into the distant past. The most recent Buddha was born Siddhattha Gotama in India around 500 BCE. A well-educated and wealthy young man, he relinquished his family and his princely inheritance in the prime of his life to search for true freedom and an end to suffering (<i><a href="#dukkha">dukkha</a></i>). After seven years of austerities in the forest, he rediscovered the “middle way” and achieved his goal, becoming Buddha.`}
              </dd>
            </dl>
            <h2 id="c">
              ${_`C`}
            </h2>
            <dl>
              <dt id="cankama">
                ${_`caṅkama`}
              </dt>
              <dd>
                ${_`Walking meditation, usually in the form of walking back and forth along a prescribed path.`}
              </dd>
              <dt id="cetasika">
                ${_`cetasika`}
              </dt>
              <dd>
                ${_`“Mental”. In the later Abhidhamma, this acquired a special technical sense of “mental concomitant”, in other words, the various psychological factors that accompany consciousness.`}
              </dd>
              <dt>
                ${_`ceto-vimutti`}
              </dt>
              <dd>
                ${_`See <a href="#vimutti"><i>vimutti</i></a>.`}
              </dd>
              <dt id="citta">
                ${_`citta`}
              </dt>
              <dd>
                ${_`Mind; heart; state of consciousness.`}
              </dd>
            </dl>
            <h2 id="d">
              ${_`D`}
            </h2>
            <dl>
              <dt id="dana">
                ${_`dāna`}
              </dt>
              <dd>
                ${_`Giving, liberality; offering, alms. Often refers to giving of any of the four requisites to the monastic order. More generally, the inclination to give, without expecting any form of repayment from the recipient. <i>Dāna</i> is the first theme in the Buddha’s system of gradual training (see <a href="#anupubbi"><i>anupubbī-kathā</i></a>), the first of the ten <a href="#parami"><i>pāramīs</i></a>, one of the seven treasures (see <a href="#dhana"><i>dhana</i></a>), and the first of the three grounds for meritorious action (see <a href="#sila"><i>sīla</i></a> and <a href="#bhavana"><i>bhāvanā</i></a>).`}
              </dd>
              <dt>
                ${_`Defilements`}
              </dt>
              <dd>
                ${_`Used as a translation for <i>kilesa</i> or <a href="#asava"><i>āsava</i></a>.`}
              </dd>
              <dt id="deva">
                ${_`deva; devatā; devaputta`}
              </dt>
              <dd>
                ${_`God or deity; literally, “shining one”—an inhabitant of the heavenly realms (see <i><a href="#sagga">sagga</a></i> and <i><a href="#sugati">sugati</a></i>). The three terms are synonyms.`}
              </dd>
              <dt id="devadatta">
                ${_`Devadatta`}
              </dt>
              <dd>
                ${_`A cousin of the Buddha who tried to effect a schism in the saṅgha and who has since become emblematic for all Buddhists who work knowingly or unknowingly to undermine the religion from within.`}
              </dd>
              <dt id="dhamma">
                ${_`dhamma`}
              </dt>
              <dd>
                ${_`(1) Phenomenon; anything that occurs and is knowable; (2) mental phenomenon, “thought”; (3) principle, especially the principles of causality; (4) doctrine, teaching. Also, principles of behavior that human beings ought to follow so as to fit in with the right natural order of things; qualities of mind they should develop so as to realize the inherent quality of the mind in and of itself. By extension, “Dhamma” (usually capitalized) is used also to denote any doctrine that teaches such things. Thus the Dhamma of the Buddha denotes both his teachings and the realities described by that teaching. (Sanskrit: <i>dharma</i>)`}
              </dd>
              <dt id="dhamma-vinaya">
                ${_`Dhamma-vinaya`}
              </dt>
              <dd>
                ${_`“doctrine (<a href="#dhamma"><i>dhamma</i></a>) and discipline (<a href="#vinaya"><i>vinaya</i></a>)”. The Buddha’s own name for the religion he founded.`}
              </dd>
              <dt id="dhana">
                ${_`dhana`}
              </dt>
              <dd>
                ${_`Treasure(s). The seven qualities of faith (<a href="#saddha"><i>saddhā</i></a>), virtue (<a href="#sila"><i>sīla</i></a>), conscience and prudence (<i><a href="#hiri-ottappa">hiri-ottappa</a></i>), learning (<i>suta</i>), generosity (<a href="#dana"><i>dāna</i></a>), and wisdom (<i><a href="#panna">paññā</a></i>).`}
              </dd>
              <dt id="dhatu">
                ${_`dhātu`}
              </dt>
              <dd>
                ${_`Element; property, impersonal condition. The four physical elements or properties are earth (solidity), water (liquidity), wind (motion), and fire (heat). The six elements include the above four plus space and consciousness.`}
              </dd>
              <dt id="dhutanga">
                ${_`dhutaṅga`}
              </dt>
              <dd>
                ${_`Voluntary ascetic practices that monks and other meditators may undertake from time to time or as a\n                long-term commitment in order to cultivate renunciation and contentment, and to stir up energy.\n                Mentioned informally in the early texts, these became standardized as thirteen in the commentarial\n                tradition:\n                `}
                <ol>
                  <li>
                    ${_`using only patched-up robes;`}
                  </li>
                  <li>
                    ${_`using only one set of three robes;`}
                  </li>
                  <li>
                    ${_`going for alms;`}
                  </li>
                  <li>
                    ${_`not by-passing any donors on one’s alms path;`}
                  </li>
                  <li>
                    ${_`eating no more than one meal a day;`}
                  </li>
                  <li>
                    ${_`eating only from the alms-bowl;`}
                  </li>
                  <li>
                    ${_`refusing any food offered after the alms-round;`}
                  </li>
                  <li>
                    ${_`living in the forest;`}
                  </li>
                  <li>
                    ${_`living under a tree;`}
                  </li>
                  <li>
                    ${_`living under the open sky;`}
                  </li>
                  <li>
                    ${_`living in a cemetery;`}
                  </li>
                  <li>
                    ${_`being content with whatever dwelling one has;`}
                  </li>
                  <li>
                    ${_`not lying down.`}
                  </li>
                </ol>
              </dd>
              <dt id="dosa">
                ${_`dosa`}
              </dt>
              <dd>
                ${_`Aversion; hatred; anger. One of three unwholesome roots (<i><a href="#mula">mūla</a></i>) in the mind.`}
              </dd>
              <dt id="dukkha">
                ${_`dukkha`}
              </dt>
              <dd>
                ${_`Suffering; pain; distress; discontent.`}
              </dd>
            </dl>
            <h2 id="e">
              ${_`E`}
            </h2>
            <dl>
              <dt id="ekaggatarammana">
                ${_`ekaggatārammana`}
              </dt>
              <dd>
                ${_`Unification of mind. The complete absorption or immersion of the mind in one tranquil, balanced, and pure state of consciousness. See <i><a href="#jhana">jhāna</a></i>.`}
              </dd>
              <dt id="ekayana">
                ${_`ekāyana-magga`}
              </dt>
              <dd>
                ${_`The path to convergence or oneness. An epithet derived from the brahmanical Upanishads. In Buddhism, practise of the four kinds of mindfulness meditation leads to immersion or oneness of mind.`}
              </dd>
            </dl>
            <h2 id="f">
              ${_`F`}
            </h2>
            <dl>
              <dt>
                ${_`foundation of mindfulness`}
              </dt>
              <dd>
                ${_`see <a href="#satipatthana"><i>Satipaṭṭhāna</i></a>.`}
              </dd>
              <dt id="frame">
                ${_`frame of reference`}
              </dt>
              <dd>
                ${_`see <a href="#satipatthana"><i>Satipaṭṭhāna</i></a>.`}
              </dd>
            </dl>
            <h2 id="g">
              ${_`G`}
            </h2>
            <dl>
              <dt id="gotarabhu">
                ${_`gotrabhū`}
              </dt>
              <dd>
                ${_`In the early texts this refers to one who is a “member of the spiritual family”. In the commentarial scheme of insight knowledges, <i>gotrabhū-ñāṇa</i> (“change of lineage knowledge”) refers to the glimpse of <a href="#nibbana"><i>nibbāna</i></a> that changes one from an ordinary person (<a href="#puthujjana"><i>puthujjana</i></a>) to a Noble One (<a href="#ariya-puggala"><i>ariya-puggala</i></a>).`}
              </dd>
            </dl>
            <h2 id="h">
              ${_`H`}
            </h2>
            <dl>
              <dt id="hiri-ottappa">
                ${_`hiri-ottappa`}
              </dt>
              <dd>
                ${_`“Conscience and prudence”; “moral shame and moral dread”. These twin emotions—the “guardians of the world”—are associated with all skillful actions. <i>Hiri</i> is an inner conscience that restrains us from doing deeds that would jeopardize our own self-respect; <i>ottappa</i> is a healthy fear of committing unskillful deeds that might bring about harm to ourselves or others. See <i><a href="#kamma">kamma</a></i>.`}
              </dd>
            </dl>
            <h2 id="i">
              ${_`I`}
            </h2>
            <dl>
              <dt id="idappaccayata">
                ${_`idappaccayatā`}
              </dt>
              <dd>
                ${_`Specific conditionality. This name for the causal principle the Buddha discovered on the night of his Awakening stresses the point that, for the purposes of ending suffering and stress, the processes of causality can be understood entirely in terms of forces and conditions that are experienced in the realm of direct experience, with no need to refer to forces operating outside of that realm. Rather than postulating a simple principle of universal causality or interdependence, the Buddha identified <em>specific</em> causal relations between knowable phenomena.`}
              </dd>
              <dt id="indriya">
                ${_`indriya`}
              </dt>
              <dd>
                ${_`Faculties; mental factors. In the suttas the term can refer either to the six sense media (<i><a href="#ayatana">āyatana</a></i>) or to the five mental factors of <i><a href="#saddha">saddhā</a></i> (faith), <i><a href="#viriya">viriya</a></i> (energy), <i><a href="#sati">sati</a></i> (mindfulness), <i><a href="#samadhi">samādhi</a></i> (immersion), and <i><a href="#panna">paññā</a></i> (wisdom); see <a href="#bodhi-pakkhiya-dhamma"><i>bodhi-pakkhiya-dhammā</i></a>.`}
              </dd>
            </dl>
            <h2 id="j">
              ${_`J`}
            </h2>
            <dl>
              <dt id="jhana">
                ${_`jhāna`}
              </dt>
              <dd>
                ${_`Mental absorption. A state of strong immersion that is the outcome of the proper development of mindfulness meditation. The word <i>jhāna</i> conveys the twin qualities of “absorption” and “illumination”. Development of <i>jhāna</i> arises from the sustained suspension of the five hindrances (see <a href="#nivarana"><i>nīvaraṇa</i></a>) through the development of five mental factors: <a href="#vitakka"><i>vitakka</i></a> (application or placing of the mind), <a href="#vicara"><i>vicāra</i></a> (sustained application, keeping in place), <a href="#piti"><i>pīti</i></a> (rapture), <a href="#sukha"><i>sukha</i></a> (pleasure), and <a href="#ekaggatarammana"><i>ekaggatārammana</i></a> (oneness of mind). The early texts usually describe four such states, each of gradually deepening purity, simplicity, and stability. (Sanskrit: <i>dhyāna</i>)`}
              </dd>
            </dl>
            <h2 id="k">
              ${_`K`}
            </h2>
            <dl>
              <dt id="kalyanamitta">
                ${_`kalyāṇamitta`}
              </dt>
              <dd>
                ${_`Admirable friend; a mentor or teacher of Dhamma.`}
              </dd>
              <dt id="kamaguna">
                ${_`kāmaguṇa`}
              </dt>
              <dd>
                ${_`Kinds of sensual stimuli. The stimuli of the five physical senses: sights, sounds, smells, flavors, and touches.`}
              </dd>
              <dt id="kamma">
                ${_`kamma`}
              </dt>
              <dd>
                ${_`Intentional acts that result in good or bad experiences in this life or future lives. (Sanskrit: <i>karma</i>)`}
              </dd>
              <dt id="karuna">
                ${_`karuṇā`}
              </dt>
              <dd>
                ${_`Compassion; sympathy; the aspiration to find a way to be truly helpful to oneself and others. One of the four “sublime abodes” (<i><a href="#brahma-vihara">brahma-vihāra</a></i>).`}
              </dd>
              <dt id="kathina">
                ${_`kaṭhina`}
              </dt>
              <dd>
                ${_`A ceremony, held in the fourth month of the rainy season, in which a Saṅgha of mendicants receives a gift of cloth from lay people, bestows it on one of their members, and then makes it into a robe before dawn of the following day.`}
              </dd>
              <dt id="kaya">
                ${_`kāya`}
              </dt>
              <dd>
                ${_`Body. Sometimes refers to the physical body (<i>rūpa-kāya;</i> see <i><a href="#rupa">rūpa</a></i>), but has a range of meanings, not unlike the word “body” in English. In some contexts it has the sense of a direct, personal experience.`}
              </dd>
              <dt id="kayagata-sati">
                ${_`kāyagatā-sati`}
              </dt>
              <dd>
                ${_`Mindfulness immersed in the body. This is a blanket term covering several meditation themes: keeping the breath in mind; being mindful of the body’s posture; being mindful of one’s activities; analyzing the body into its parts; analyzing the body into its physical properties (see <a href="#dhatu"><i>dhātu</i></a>); contemplating the fact that the body is inevitably subject to death and disintegration.`}
              </dd>
              <dt id="khandha">
                ${_`khandha`}
              </dt>
              <dd>
                ${_`Heap; group; aggregate. Physical and mental components of the personality and of sensory experience in general. In the early texts, these are almost always referred to as the “grasping aggregates” (see <a href="#upadana"><i>upadāna</i></a>). The implication is that the aggregates are <em>produced by grasping</em> (due to attachments in past lives); they are what <em>stimulate grasping</em>; and they are the mechanism that <em>enables grasping</em> to work. In particular, they are phenomena that are often mistaken as a “self”. See: <a href="#nama"><i>nāma</i></a> (mental phenomenon), <a href="#rupa"><i>rūpa</i></a> (physical phenomenon), <a href="#vedana"><i>vedanā</i></a> (feeling), <a href="#sanna"><i>saññā</i></a> (perception), <a href="#sankhara"><i>saṅkhāra</i></a> (choices), and <a href="#vinnana"><i>viññāṇa</i></a> (consciousness).`}
              </dd>
              <dt id="khanti">
                ${_`khanti`}
              </dt>
              <dd>
                ${_`Patience; forbearance. One of the ten perfections (<i><a href="#parami">pāramīs</a></i>).`}
              </dd>
              <dt id="kilesa">
                ${_`kilesa`}
              </dt>
              <dd>
                ${_`Defilement—<i><a href="#lobha">lobha</a></i> (passion), <a href="#dosa"><i>dosa</i></a> (aversion), and <a href="#moha"><i>moha</i></a> (delusion) in their various forms, which include such things as greed, malevolence, anger, rancor, hypocrisy, arrogance, envy, miserliness, dishonesty, boastfulness, obstinacy, violence, pride, conceit, intoxication, and complacency. Note that the term <i>kilesa</i> is used fairly rarely in the early texts, and does not have an established technical meaning; <i>āsava</i> is the normal term.`}
              </dd>
              <dt id="kusala">
                ${_`kusala`}
              </dt>
              <dd>
                ${_`Wholesome, skillful, good, meritorious. An action characterized by this moral quality (<i>kusala-kamma</i>) is bound to result (eventually) in happiness and a favorable outcome. Actions characterized by its opposite (<i>akusala-kamma</i>) lead to sorrow. See <a href="#kamma"><i>kamma</i></a>.`}
              </dd>
            </dl>
            <h2 id="l">
              ${_`L`}
            </h2>
            <dl>
              <dt id="lakkhana">
                ${_`lakkhaṇa`}
              </dt>
              <dd>
                ${_`See <a href="#ti-lakkhana"><i>ti-lakkhaṇa</i></a>.`}
              </dd>
              <dt id="lobha">
                ${_`lobha`}
              </dt>
              <dd>
                ${_`Greed; passion; unskillful desire. Also <i><a href="#raga">rāga</a></i>. One of three unwholesome roots (<i><a href="#mula">mūla</a></i>) in the mind.`}
              </dd>
              <dt id="loka-dhamma">
                ${_`loka-dhamma`}
              </dt>
              <dd>
                ${_`Affairs or phenomena of the world. The standard list gives eight: wealth, loss of wealth, status, loss of status, praise, criticism, pleasure, and pain.`}
              </dd>
              <dt id="lokavidu">
                ${_`lokavidū`}
              </dt>
              <dd>
                ${_`Knower of the cosmos. An epithet for the Buddha.`}
              </dd>
              <dt id="lokuttara">
                ${_`lokuttara`}
              </dt>
              <dd>
                ${_`Transcendent; supramundane (see <a href="#magga"><i>magga</i></a>, <a href="#phala"><i>phala</i></a>, and <a href="#nibbana"><i>nibbāna</i></a>).`}
              </dd>
            </dl>
            <h2 id="m">
              ${_`M`}
            </h2>
            <dl>
              <dt id="magga">
                ${_`magga`}
              </dt>
              <dd>
                ${_`Path. Specifically, the path to the cessation of suffering and stress. The four transcendent paths—or rather, one path with four levels of refinement—are the path to <a href="#sotapanna"><i>stream-entry</i></a> (entering the stream to <a href="#nibbana"><i>nibbāna</i></a>, which ensures that one will be reborn at most only seven more times), the path to once-returning, the path to non-returning, and the path to arahantship. See <a href="#phala"><i>phala</i></a>.`}
              </dd>
              <dt id="majjhima">
                ${_`majjhimā`}
              </dt>
              <dd>
                ${_`Middle; appropriate; just right.`}
              </dd>
              <dt id="mara">
                ${_`Māra`}
              </dt>
              <dd>
                ${_`The personification of evil and temptation. In the early texts, treated both as a deity of the sense sphere realm and as a metaphor.`}
              </dd>
              <dt id="metta">
                ${_`mettā`}
              </dt>
              <dd>
                ${_`Love, loving-kindness; goodwill. One of the ten perfections (<i><a href="#parami">pāramīs</a></i>) and one of the four “sublime abodes” (<i><a href="#brahma-vihara">brahma-vihāra</a></i>).`}
              </dd>
              <dt id="moha">
                ${_`moha`}
              </dt>
              <dd>
                ${_`Delusion; ignorance (<i><a href="#avijja">avijjā</a></i>). One of three unwholesome roots (<i><a href="#mula">mūla</a></i>) in the mind.`}
              </dd>
              <dt id="mudita">
                ${_`muditā`}
              </dt>
              <dd>
                ${_`Rejoicing, appreciative/sympathetic joy. Taking delight in one’s own goodness and that of others. One of the four “sublime abodes” (<i><a href="#brahma-vihara">brahma-vihāra</a></i>).`}
              </dd>
              <dt id="mula">
                ${_`mūla`}
              </dt>
              <dd>
                ${_`Literally, “root”. The fundamental conditions in the mind that determine the moral quality—skillful (<i><a href="#kusala">kusala</a></i>) or unskillful (<i><a href="#akusala">akusala</a></i>)—of one’s intentional actions (see <i><a href="#kamma">kamma</a></i>). The three unskillful roots are <i><a href="#lobha">lobha</a></i> (greed), <i><a href="#dosa">dosa</a></i> (aversion), and <a href="#moha"><i>moha</i></a> (delusion); the skillful roots are their opposites. See <i><a href="#kilesa">kilesa</a></i> (defilements).`}
              </dd>
            </dl>
            <h2 id="n">
              ${_`N`}
            </h2>
            <dl>
              <dt id="naga">
                ${_`nāga`}
              </dt>
              <dd>
                ${_`Dragon, elephant, giant snake, spiritual giant. Worship of <i>nāgas</i> is a prominent feature of local religious practice in India. In Buddhism, it is also used to refer to those who have attained the goal of the practice.`}
              </dd>
              <dt id="nama">
                ${_`nāma`}
              </dt>
              <dd>
                ${_`Name, mental phenomena. Originally this referred to the central psychological function of conceptualizing and naming things. Gradually it evolved to encompass all mental phenomena. In the suttas it is sometimes defined as <i><a href="#vedana">vedanā</a></i> (feeling), <i><a href="#sanna">saññā</a></i> (perception), <i>cetana</i> (intention, volition), <i>phassa</i> (sensory contact), and <i>manasikāra</i> (attention, advertence). Compare <i><a href="#rupa">rūpa</a></i>. In the Abhidhamma, <i>nāma</i> came to refer to the mental components of the five <i><a href="#khandha">khandhas</a></i>.`}
              </dd>
              <dt id="nama-rupa">
                ${_`nāma-rūpa`}
              </dt>
              <dd>
                ${_`Name-and-form; mental and physical phenomena. The entirety of mental phenomena <i><a href="#nama">(nāma)</a></i> and physical phenomena <i><a href="#rupa">(rūpa)</a></i>, conditioned by consciousness (<i><a href="#vinnana">viññāṇa</a></i>) in the causal chain of dependent origination <a href="#ps"><i>(paṭicca-samuppāda</i>)</a>.`}
              </dd>
              <dt id="nekkhamma">
                ${_`nekkhamma`}
              </dt>
              <dd>
                ${_`Renunciation; literally, “freedom from sensual lust”.`}
              </dd>
              <dt id="nibbana">
                ${_`nibbāna`}
              </dt>
              <dd>
                ${_`Extinguishment, quenching; literally, the extinguishment of suffering (see <a href="#asava"><i>āsava</i></a>), defilements (see <a href="#kilesa"><i>kilesa</i></a>), and the round of rebirth (see <a href="#vatta"><i>vaṭṭa</i></a>). Like the extinguishing of a fire, it carries the connotations of stilling, cooling, and peace. “Total nibbāna” (<i>parinibbāna</i>) in some contexts denotes the experience of Awakening; in others, the final passing away of an <a href="#arahant"><i>arahant</i></a>. (Sanskrit: <i>nirvāna</i>)`}
              </dd>
              <dt id="nibbida">
                ${_`nibbidā`}
              </dt>
              <dd>
                ${_`Disenchantment; disillusionment; aversion; disgust; weariness. The skillful turning-away of the mind from the conditioned samsaric world towards the unconditioned <a href="#nibbana"><i>nibbāna</i></a>.`}
              </dd>
              <dt id="nimitta">
                ${_`nimitta`}
              </dt>
              <dd>
                ${_`In the early texts, this means a sign or aspect or cause. In meditation, it refers to an aspect of experience which, when focused on, promotes the growth of similar or related qualities. In later texts it refers to an image or vision that may arise as a sign that meditation has reached a certain depth. However, the suttas refer to these as <i>rūpa</i> (visions, forms), <i>obhāsa</i> (light), etc.`}
              </dd>
              <dt id="nirodha">
                ${_`nirodha`}
              </dt>
              <dd>
                ${_`Cessation; disbanding; stopping.`}
              </dd>
              <dt id="nivarana">
                ${_`nīvaraṇa`}
              </dt>
              <dd>
                ${_`Hindrances to immersion—sensual desire, ill will, sloth & drowsiness, restlessness & anxiety, and doubt.`}
              </dd>
            </dl>
            <h2 id="o">
              ${_`O`}
            </h2>
            <dl>
              <dt id="opanayiko">
                ${_`opanayiko`}
              </dt>
              <dd>
                ${_`Referring inwardly; to be brought inward; in reference to oneself. An epithet for the Dhamma.`}
              </dd>
            </dl>
            <h2 id="pq">
              ${_`PQ`}
            </h2>
            <dl>
              <dt id="pabbajja">
                ${_`pabbajjā`}
              </dt>
              <dd>
                ${_`“Going forth (from home to the homeless life)”. In the earliest period, this was used together with <i>upasampadā</i> (“full acceptance”) to refer to ordination as a mendicant. Gradually, however, the “going forth” came to be applied to ordination as a <i><a href="#samanera">samaṇera (samaṇeri)</a></i>, or novice monk (nun). See <a href="#upasampada"><i>upasampadā</i></a>.`}
              </dd>
              <dt id="paccattam">
                ${_`paccattaṃ`}
              </dt>
              <dd>
                ${_`Personal; individual.`}
              </dd>
              <dt id="pacceka">
                ${_`paccekabuddha`}
              </dt>
              <dd>
                ${_`Private Buddha. One who, like a Buddha, has gained Awakening without the benefit of a teacher, but who lives a solitary life without establishing a dispensation. The early texts refer to them a number of times but with few details.`}
              </dd>
              <dt id="panna">
                ${_`paññā`}
              </dt>
              <dd>
                ${_`Discernment; insight; wisdom; intelligence; common sense; ingenuity.`}
              </dd>
              <dt>
                ${_`paññā-vimutti`}
              </dt>
              <dd>
                ${_`See <a href="#vimutti"><i>vimutti</i></a>.`}
              </dd>
              <dt id="papanca">
                ${_`papañca`}
              </dt>
              <dd>
                ${_`The tendency of the mind to proliferate issues from the sense of “self”.`}
              </dd>
              <dt id="parami">
                ${_`pāramī, pāramitā`}
              </dt>
              <dd>
                ${_`Perfection of the character. Not found in the technical sense in the early texts. According to later traditions, a group of ten qualities developed over many lifetimes by a <i><a href="#bodhisatta">bodhisatta</a></i>: generosity (<i><a href="#dana">dāna</a></i>), virtue (<i><a href="#sila">sīla</a></i>), renunciation (<i><a href="#nekkhamma">nekkhamma</a></i>), wisdom (<i><a href="#panna">paññā</a></i>), energy/energy (<i><a href="#viriya">viriya</a></i>), patience/forbearance (<i><a href="#khanti">khanti</a></i>), truthfulness (<i><a href="#sacca">sacca</a></i>), determination (<i><a href="#adhitthana">adhiṭṭhāna</a></i>), good will (<i><a href="#metta">mettā</a></i>), and equanimity (<i><a href="#upekkha">upekkhā</a></i>).`}
              </dd>
              <dt id="parinibbana">
                ${_`parinibbāna`}
              </dt>
              <dd>
                ${_`Total extinguishment or quenching. In the early texts, usually simply a synonym of <i>nibbāna</i>, but sometimes taken to refer specifically to the complete cessation of the <a href="#khandha"><i>khandhas</i></a> that occurs upon the death of an <a href="#arahant"><i>arahant</i></a>.`}
              </dd>
              <dt id="parisa">
                ${_`parisā`}
              </dt>
              <dd>
                ${_`Following; assembly. The four groups of the Buddha’s following that include monks, nuns, laymen, and laywomen. Compare <a href="#sangha"><i>saṅgha</i></a>. See <i><a href="#bhikkhu">bhikkhu</a></i>, <a href="#bhikkhuni"><i>bhikkhunī</i></a>, <a href="#upasika"><i>upāsaka/upāsikā</i></a>.`}
              </dd>
              <dt id="pariyatti">
                ${_`pariyatti`}
              </dt>
              <dd>
                ${_`Theoretical understanding of <a href="#dhamma"><i>Dhamma</i></a> obtained through reading, study, and learning. See <i><a href="#patipatti">paṭipatti</a></i> and <i><a href="#pativedha">paṭivedha</a></i>.`}
              </dd>
              <dt id="ps">
                ${_`paṭicca-samuppāda`}
              </dt>
              <dd>
                ${_`Dependent origination. A map of twelve links showing the way ignorance (<i><a href="#avijja">avijjā</a></i>) and craving (<i><a href="#tanha">taṇhā</a></i>) give rise to suffering (<i><a href="#dukkha">dukkha</a></i>) in the endless process of transmigration. There are several versions of <i>paṭicca-samuppāda</i> given in the suttas, but the standard set of twelve links is by far the most common.`}
              </dd>
              <dt id="patimokkha">
                ${_`Pātimokkha`}
              </dt>
              <dd>
                ${_`The basic code of monastic discipline, consisting of 227 rules for monks (<a href="#bhikkhu"><i>bhikkhus</i></a>) and 311 for nuns (<a href="#bhikkhuni"><i>bhikkhunīs</i></a>). See <a href="#vinaya"><i>Vinaya</i></a>.`}
              </dd>
              <dt id="patipada">
                ${_`paṭipadā`}
              </dt>
              <dd>
                ${_`Road, path, way; the means of reaching a goal or destination. The “Middle way” (<i>majjhima-paṭipadā</i>) taught by the Buddha; the path of practice described in the fourth noble truth (<i>dukkhanirodhagāminī-paṭīpadā</i>).`}
              </dd>
              <dt id="patipatti">
                ${_`paṭipatti`}
              </dt>
              <dd>
                ${_`The practice of <a href="#dhamma"><i>Dhamma</i></a>, as application of theoretical knowledge (<i><a href="#pariyatti">pariyatti</a></i>). See also <i><a href="#pativedha">paṭivedha</a></i>.`}
              </dd>
              <dt id="pativedha">
                ${_`paṭivedha`}
              </dt>
              <dd>
                ${_`Direct, first-hand realization of the <a href="#dhamma"><i>Dhamma</i>.</a> See also <i><a href="#pariyatti">pariyatti</a></i> and <i><a href="#patipatti">paṭipatti</a></i>.`}
              </dd>
              <dt id="peta">
                ${_`peta`}
              </dt>
              <dd>
                ${_`A “hungry shade” or “hungry ghost”—one of a class of beings in the lower realms, sometimes capable of appearing to human beings. The petas are often depicted in Buddhist art as starving beings with pinhole-sized mouths through which they can never pass enough food to ease their hunger. (Sanskrit: <i>preta</i>)`}
              </dd>
              <dt id="phala">
                ${_`phala`}
              </dt>
              <dd>
                ${_`Fruition. Specifically, the fruition of any of the four transcendent paths (see <a href="#magga"><i>magga</i></a>).`}
              </dd>
              <dt id="piti">
                ${_`pīti`}
              </dt>
              <dd>
                ${_`Rapture; bliss; delight. In meditation, a pleasurable quality in the mind that reaches full maturity upon the development of the second level of <i><a href="#jhana">jhāna</a></i>.`}
              </dd>
              <dt id="puja">
                ${_`pūjā`}
              </dt>
              <dd>
                ${_`Honor; respect; devotional observance; worship and offerings to deities.`}
              </dd>
              <dt id="punna">
                ${_`puñña`}
              </dt>
              <dd>
                ${_`Merit; good deeds.`}
              </dd>
              <dt id="puthujjana">
                ${_`puthujjana`}
              </dt>
              <dd>
                ${_`One of the many-folk; a “worlding” or ordinary person who has not yet realized any of the four stages of Awakening (see <a href="#magga"><i>magga</i></a>). Compare <a href="#ariya-puggala"><i>ariya-puggala</i></a>.`}
              </dd>
            </dl>
            <h2 id="r">
              ${_`R`}
            </h2>
            <dl>
              <dt id="raga">
                ${_`rāga`}
              </dt>
              <dd>
                ${_`Lust; greed. See <i><a href="#lobha">lobha</a></i>.`}
              </dd>
              <dt id="rupa">
                ${_`rūpa`}
              </dt>
              <dd>
                ${_`Body; physical phenomenon; sight; form. The basic meaning of this word is “appearance” or “form”. It refers in a general sense to any kind of knowable physical phenomena or property, including both matter and energy, and even physical properties like light that are experienced purely in the mind. It is used in a number of different contexts, taking on different shades of meaning in each. In lists of the objects of the senses, it is given as the object of the sense of sight. As one of the <i><a href="#khandha">khandha</a></i>, it refers to physical phenomena or sensations, including ones’ own body and anything physical that the body experiences. This is also the meaning it carries when used with <i><a href="#nama">nāma</a></i>, or mental phenomena.`}
              </dd>
            </dl>
            <h2 id="s">
              ${_`S`}
            </h2>
            <dl>
              <dt id="sacca">
                ${_`sacca`}
              </dt>
              <dd>
                ${_`Truth.`}
              </dd>
              <dt id="saddha">
                ${_`saddhā`}
              </dt>
              <dd>
                ${_`Faith. A confidence in the Buddha that gives one the willingness to put his teachings into practice. Faith becomes unshakable upon the attainment of stream-entry (see <a href="#sotapanna"><i>sotāpanna</i></a>), as the teachings have been confirmed in ones’ own experience.`}
              </dd>
              <dt id="sadhu">
                ${_`sādhu`}
              </dt>
              <dd>
                ${_`(exclamation) “It is well”; an expression showing appreciation or agreement.`}
              </dd>
              <dt id="sagga">
                ${_`sagga`}
              </dt>
              <dd>
                ${_`Heaven, heavenly realm. The dwelling place of the <i><a href="#deva">devas</a></i>. Rebirth in the heavens is said to be one of the rewards for practicing generosity (see <i><a href="#dana">dāna</a></i>) and virtue (see <i><a href="#sila">sīla</a></i>). Like all waystations in <i><a href="#samsara">saṃsāra</a>,</i> however, rebirth here is temporary. See also <i><a href="#sugati">sugati.</a></i>`}
              </dd>
              <dt id="sakadagami">
                ${_`sakadāgāmī`}
              </dt>
              <dd>
                ${_`Once-returner. A person who has abandoned the first three of the fetters that bind the mind to the cycle of rebirth (see <a href="#samyojana"><i>saṃyojana</i></a>), has weakened the fetters of sensual passion and resistance, and who after death is destined to be reborn in this world only once more.`}
              </dd>
              <dt id="sakkaya-ditthi">
                ${_`sakkāya-diṭṭhi`}
              </dt>
              <dd>
                ${_`Self-identification view. The view that mistakenly identifies any of the <i><a href="#khandha">khandha</a></i> as “self”; the first of the ten fetters (<i><a href="#samyojana">saṃyojana</a></i>). Abandonment of <i>sakkāya-diṭṭhi</i> is one of the hallmarks of stream-entry (see <i><a href="#sotapanna">sotāpanna</a></i>).`}
              </dd>
              <dt id="sakyamuni">
                ${_`Sākyamuni`}
              </dt>
              <dd>
                ${_`“Sage of the Sakyans”; an epithet for the Buddha.`}
              </dd>
              <dt id="sakya-putta">
                ${_`sākya-putta`}
              </dt>
              <dd>
                ${_`A member of the Sakyan clan. Contrary to modern usage, in the early texts, <i>sākya-putta</i> refers not to monks, but to the the Buddha, while the mendicants are referred to as “ascetic followers of the Sakyan” (<i>samaṇā sakyaputtiyā</i>).`}
              </dd>
              <dt id="sallekha-dhamma">
                ${_`sallekha-dhamma`}
              </dt>
              <dd>
                ${_`Topics of effacement (effacing defilement)—having few wants, being content with what one has, seclusion, uninvolvement in companionship, energy, virtue (see <a href="#sila"><i>sīla</i></a>), immersion, wisdom, release, and the direct knowing and seeing of release.`}
              </dd>
              <dt id="samadhi">
                ${_`samādhi`}
              </dt>
              <dd>
                ${_`Immersion; the practice of centering the mind in a single sensation or preoccupation, usually to the point of <i><a href="#jhana">jhāna</a></i>.`}
              </dd>
              <dt id="samana">
                ${_`samaṇa`}
              </dt>
              <dd>
                ${_`Ascetic or contemplative. Stems from a root <i>śram</i> meaning to wear away or subdue.`}
              </dd>
              <dt>
                ${_`<a id="samanera">samaṇera</a> (samaṇerī)`}
              </dt>
              <dd>
                ${_`Literally, a small <a href="#samana"><i>samaṇa</i></a>. A kind of ordination originally set up to cater for young people below the age of twenty to take ordination, but without the responsibilities and privileges of full ordination. Later evolved to become a stage prior to full ordination regardless of age. A novice observes ten precepts, and when they reach twenty years from conception they may become a candidate for full ordination to the order of <a href="#bhikkhu"><i>bhikkhus</i></a> or <i><a href="#bhikkhuni">bhikkhunīs</a></i>. See <a href="#pabbajja"><i>pabbajjā</i></a>.`}
              </dd>
              <dt id="sambhavesin">
                ${_`sambhavesin`}
              </dt>
              <dd>
                ${_`A being in the process of becoming reborn.`}
              </dd>
              <dt id="sammuti">
                ${_`sammuti`}
              </dt>
              <dd>
                ${_`Conventional reality; convention; relative truth; supposition; anything conjured into being by the mind.`}
              </dd>
              <dt id="sampajanna">
                ${_`sampajañña`}
              </dt>
              <dd>
                ${_`Situational awareness; presence of mind; clear comprehension. See <i><a href="#sati">sati</a></i>.`}
              </dd>
              <dt id="samsara">
                ${_`saṃsāra`}
              </dt>
              <dd>
                ${_`Transmigration; the round of death and rebirth. See <a href="#vatta"><i>vaṭṭa</i></a>.`}
              </dd>
              <dt id="samvega">
                ${_`saṃvega`}
              </dt>
              <dd>
                ${_`A sense of awe or inspiration when confronted with spiritual realities; especially a sense of urgency to practice.`}
              </dd>
              <dt id="samyojana">
                ${_`saṃyojana`}
              </dt>
              <dd>
                ${_`Fetter that binds the mind to the cycle of rebirth (see <a href="#vatta"><i>vaṭṭa</i></a>)—self-identification views (<i><a href="#sakkaya-ditthi">sakkāya-diṭṭhi</a></i>), uncertainty (<i>vicikiccha</i>), grasping at precepts and practices (<i>sīlabbata-parāmāsa);</i> sensual passion (<i>kāma-rāga</i>), aversion (<i>vyāpāda);</i> desire to be reborn in a realm of luminous form (<i>rūpa-rāga</i>), desire to be reborn in a formless realm (<i>arūpa-rāga</i>), conceit (<i>māna</i>), restlessness (<i>uddhacca</i>), and ignorance (<i><a href="#avijja">avijjā</a></i>). Compare <i><a href="#anusaya">anusaya</a></i>.`}
              </dd>
              <dt id="sanditthiko">
                ${_`sandiṭṭhiko`}
              </dt>
              <dd>
                ${_`Effective in this very life; immediately apparent; visible here and now. An epithet for the Dhamma.`}
              </dd>
              <dt id="sangha">
                ${_`saṅgha`}
              </dt>
              <dd>
                ${_`This term denotes both:\n                `}
                <ul>
                  <li>
                    ${_`the “monastic Saṅgha” (communities of Buddhist monks and nuns) in whom lay followers take refuge;`}
                  </li>
                  <li>
                    ${_`those followers of the Buddha, lay or ordained, who have attained at least stream-entry (see <a href="#sotapanna"><i>sotāpanna</i></a>), the first of the transcendent paths (see <a href="#magga"><i>magga</i></a>) culminating in <a href="#nibbana"><i>nibbāna</i></a>.`}
                  </li>
                </ul>
                ${_`\n                Recently in the US, the term “sangha” has been transformed to mean the wider sense of “community of\n                followers on the Buddhist path,” although this usage finds no basis in the Pali canon. The term `}
                <a href="#parisa">
                  ${_`<i>parisā</i>`}
                </a>
                ${_` is used in this broader sense in the early texts.\n              `}
              </dd>
              <dt id="sankhara">
                ${_`saṅkhāra`}
              </dt>
              <dd>
                ${_`Condition, conditioned phenomena, choice, intention, cause—the forces and factors that fashion things (physical or mental), the process of fashioning, and the fashioned things that result. <i>Saṅkhāra</i> can refer to anything formed or created by conditions, or, more specifically, (as one of the five <i><a href="#khandha">khandhas</a></i>) thought-formations within the mind.`}
              </dd>
              <dt id="sanna">
                ${_`saññā`}
              </dt>
              <dd>
                ${_`Perception; recognition; interpretation. See <i><a href="#khandha">khandha</a></i>.`}
              </dd>
              <dt id="sanyojana">
                ${_`sanyojana`}
              </dt>
              <dd>
                ${_`See <a href="#samyojana"><i>saṃyojana</i></a>.`}
              </dd>
              <dt id="sasana">
                ${_`sāsana`}
              </dt>
              <dd>
                ${_`Message, instruction, bidding. The dispensation, doctrine, and legacy of the Buddha; the Buddhist religion (see <a href="#dhamma-vinaya"><i>Dhamma-vinaya</i></a>).`}
              </dd>
              <dt id="sati">
                ${_`sati`}
              </dt>
              <dd>
                ${_`Mindfulness, memory, powers of reference and retention. In some contexts, the word <i>sati</i> when used alone covers alertness (<i><a href="#sampajanna">sampajañña</a></i>) as well.`}
              </dd>
              <dt id="satipatthana">
                ${_`satipaṭṭhāna`}
              </dt>
              <dd>
                ${_`Kinds of mindfulness meditation; foundations or establishments of mindfulness—body, feelings, mind, and the principles of the causality that govern the mind. The seventh of the eight path factors, this refers primarily to “meditation”, in other words, what we do when we sit to meditate. The four aspects represent a gradually deepening process of meditation, as exemplified in mindfulness of breathing, which is the primary example of this practice. The first three of these are focused on settling and stilling the mind, and the last on developing insight.`}
              </dd>
              <dt id="sa-upadisesa-nibbana">
                ${_`sa-upādisesa-nibbāna`}
              </dt>
              <dd>
                ${_`Nibbāna with fuel remaining (the analogy is to an extinguished fire whose embers are still glowing)—liberation as experienced in this lifetime by an arahant. Cf. <i><a href="#anupadisesa-nibbana">anupādisesa-nibbāna</a></i>.`}
              </dd>
              <dt id="savaka">
                ${_`sāvaka`}
              </dt>
              <dd>
                ${_`Literally, “hearer”. A disciple of the Buddha, especially a noble disciple (see <i><a href="#ariya-puggala">ariya-puggala</a></i>.)`}
              </dd>
              <dt id="sekha">
                ${_`sekha`}
              </dt>
              <dd>
                ${_`A “learner” or “one in training”; a noble disciple (<i><a href="#ariya-puggala">ariya-puggala</a></i>) who has not yet attained arahantship.`}
              </dd>
              <dt id="sila">
                ${_`sīla`}
              </dt>
              <dd>
                ${_`Virtue, morality. The quality of ethical and moral purity that prevents one from falling away from the eightfold path. Also, the training precepts that restrain one from performing unskillful actions. Sīla is the second theme in the gradual training (see <a href="#anupubbi"><i>anupubbī-kathā</i></a>), the second of the seven treasures (see <a href="#dhana"><i>dhana</i></a>), and the first of the three grounds for meritorious action (see <a href="#dana"><i>dāna</i></a> and <a href="#bhavana"><i>bhāvanā</i></a>).`}
              </dd>
              <dt id="sima">
                ${_`sīma`}
              </dt>
              <dd>
                ${_`Boundary or territory which defines the limits of a particular monastic Saṅgha for the purpose of formal acts such as <a href="#upasampada"><i>upasampadā</i></a>, <a href="#patimokkha"><i>pātimokkha</i></a> recitation, settling of disputes, etc.`}
              </dd>
              <dt id="sotapanna">
                ${_`sotāpanna`}
              </dt>
              <dd>
                ${_`Stream winner. A person who has abandoned the first three of the fetters that bind the mind to the cycle of rebirth (see <a href="#samyojana"><i>saṃyojana</i></a>) and has thus entered the “stream” flowing inexorably to <a href="#nibbana"><i>nibbāna</i></a>, ensuring that one will be reborn at most only seven more times, and only into human or higher realms.`}
              </dd>
              <dt>
                ${_`stream-entry, stream-winner`}
              </dt>
              <dd>
                ${_`see <a href="#sotapanna"><i>sotāpanna</i></a>.`}
              </dd>
              <dt>
                ${_`stress`}
              </dt>
              <dd>
                ${_`See <a href="#dukkha"><i>dukkha</i></a>.`}
              </dd>
              <dt id="stupa">
                ${_`stupa (Pali: <i>thūpa</i>)`}
              </dt>
              <dd>
                ${_`Originally, a tumulus or burial mound enshrining relics of a holy person—such as the Buddha—or objects associated with his life. Over the centuries this has developed into the tall, spired monuments familiar in temples in Thailand, Sri Lanka, and Burma; and into the pagodas of China, Korea, and Japan.`}
              </dd>
              <dt id="sugati">
                ${_`sugati`}
              </dt>
              <dd>
                ${_`Happy destinations; the two higher levels of existence into which one might be reborn as a result of past skillful actions (see <i><a href="#kamma">kamma</a>):</i> rebirth in the human world or in the heavens (See <i><a href="#sagga">sagga</a></i>). None of these states is permanent. Compare <i><a href="#apaya-bhumi">apāya-bhūmi</a></i>.`}
              </dd>
              <dt id="sugato">
                ${_`sugata`}
              </dt>
              <dd>
                ${_`Well-faring; going (or gone) to a good destination. An epithet for the Buddha.`}
              </dd>
              <dt id="sukha">
                ${_`sukha`}
              </dt>
              <dd>
                ${_`Pleasure; ease; satisfaction. In meditation, a mental quality that reaches full maturity upon the development of the third level of <i><a href="#jhana">jhāna</a></i>. Also used in an existential sense for the bliss of extinguishment that is beyond all feeling.`}
              </dd>
              <dt id="sutta">
                ${_`sutta`}
              </dt>
              <dd>
                ${_`Literally, “thread”; a discourse or sermon by the Buddha or his contemporary disciples. In the early texts, the term <i>sutta</i> is used in its familiar sense as a discourse, but it is also used in a more restricted sense to refer to a section of the discourses, probably referring to summaries or brief expositions. In this sense it is used of the monastic code (<i>pātimokkha</i>), too. After the Buddha’s death the suttas were originally passed down in oral tradition. The various schools of Buddhism maintained their own collections, which varied somewhat in organization, but were mostly identical in content. (Sanskrit: <i>sūtra</i>)`}
              </dd>
            </dl>
            <h2 id="t">
              ${_`T`}
            </h2>
            <dl>
              <dt id="tanha">
                ${_`taṇhā`}
              </dt>
              <dd>
                ${_`Craving—for sensuality, for rebirth, or for annihilation (see <i><a href="#bhava">bhava</a></i>). See also <a href="#lobha"><i>lobha</i> (greed; passion)</a>`}
              </dd>
              <dt id="tapas">
                ${_`tāpas`}
              </dt>
              <dd>
                ${_`The purifying “heat” of ascetic practices. In pre-Buddhist systems like the Jains, this refers to self-mortification, which was believed to create a physical heat in the body that burned off defilements. The Buddha adapted it to refer to his own path in a purely psychological sense.`}
              </dd>
              <dt id="tathagata">
                ${_`Tathāgata`}
              </dt>
              <dd>
                ${_`The “Realized One”, a frequent epithet for the Buddha, although occasionally it also denotes any of his arahant disciples. The sense is that of someone who has realized or embodied the truth in its highest form. The term became subject to extensive exegesis in the commentaries.`}
              </dd>
              <dt id="ti-lakkhana">
                ${_`ti-lakkhaṇa`}
              </dt>
              <dd>
                ${_`Three characteristics exhibited by all conditioned phenomena—being impermanent (<i><a href="#anicca">anicca</a></i>), suffering (<i><a href="#dukkha">dukkha</a></i>), and not-self (<i><a href="#anatta">anattā</a></i>).`}
              </dd>
              <dt id="tipitaka">
                ${_`tipiṭaka`}
              </dt>
              <dd>
                ${_`The Buddhist Canon. Literally, “three baskets,” in reference to the three principal divisions of the Canon: the <a href="#vinaya"><i>Vinaya Piṭaka</i></a> (disciplinary rules and procedures for monastic training); <a href="#sutta"><i>Sutta Piṭaka</i></a> (discourses); and <a href="#abhidhamma"><i>Abhidhamma Piṭaka</i></a> (abstract philosophical treatises). The term is not found in the early texts. (Sanskrit: <i>tripiṭaka</i>)`}
              </dd>
              <dt id="tiratana">
                ${_`tiratana`}
              </dt>
              <dd>
                ${_`The “Triple Gem” consisting of the Buddha, <a href="#dhamma">Dhamma</a>, and <a href="#sangha">Saṅgha</a>—ideals to which all Buddhists turn for refuge. See <a href="#tisarana"><i>tisarana</i></a>.`}
              </dd>
              <dt id="tisarana">
                ${_`tisaraṇa`}
              </dt>
              <dd>
                ${_`The “Threefold Refuge”—the Buddha, <a href="#dhamma">Dhamma</a>, and <a href="#sangha">Saṅgha</a>. In this context, the refuge for the lay community is the mendicant Saṅgha. See <a href="#tiratana"><i>tiratana</i></a>.`}
              </dd>
            </dl>
            <h2 id="u">
              ${_`U`}
            </h2>
            <dl>
              <dt id="ugghatitannu">
                ${_`ugghaṭitaññu`}
              </dt>
              <dd>
                ${_`Of swift understanding. After the Buddha attained Awakening and was considering whether or not to teach the Dhamma, he perceived that there were four categories of beings: those of swift understanding, who would gain Awakening after a short explanation of the Dhamma; those who would gain Awakening only after a lengthy explanation (<i>vipacitaññu</i>); those who would gain Awakening only after being led through the practice (<i>neyya</i>); and those who, instead of gaining Awakening, would at best gain only a verbal understanding of the Dhamma (<i>padaparama</i>).`}
              </dd>
              <dt id="upadana">
                ${_`upādāna`}
              </dt>
              <dd>
                ${_`Grasping; attachment; sustenance for becoming and birth—attachment to sensuality, to views, to precepts and practices, and to theories of the self.`}
              </dd>
              <dt id="upasampada">
                ${_`upasampadā`}
              </dt>
              <dd>
                ${_`Acceptance; full ordination as a <a href="#bhikkhu"><i>bhikkhu</i></a> or <a href="#bhikkhu"><i>bhikkhunī</i></a>. See <a href="#pabbajja"><i>pabbajjā</i></a>.`}
              </dd>
              <dt id="upasika">
                ${_`upāsaka/upāsikā`}
              </dt>
              <dd>
                ${_`A male/female lay follower of the Buddha. Compare <a href="#parisa"><i>parisā</i></a>.`}
              </dd>
              <dt id="upekkha">
                ${_`upekkhā`}
              </dt>
              <dd>
                ${_`Equanimity. One of the four “sublime abodes” (<i><a href="#brahma-vihara">brahma-vihāra</a></i>).`}
              </dd>
              <dt id="uposatha">
                ${_`uposatha`}
              </dt>
              <dd>
                ${_`Observance day or “sabbath”, corresponding to the phases of the moon, on which Buddhist lay people gather to listen to the Dhamma and to observe special precepts. On the new-moon and full-moon uposatha days monks assemble to recite the <a href="#patimokkha"><i>Pātimokkha</i></a> rules.`}
              </dd>
            </dl>
            <h2 id="v">
              ${_`V`}
            </h2>
            <dl>
              <dt id="vassa">
                ${_`vassa`}
              </dt>
              <dd>
                ${_`Rains Retreat. A period from July to October, corresponding roughly to the rainy season, in which each monk is required to live settled in a single place and not wander freely about.`}
              </dd>
              <dt id="vatta">
                ${_`vaṭṭa`}
              </dt>
              <dd>
                ${_`The cycle of birth, death, and rebirth. See <a href="#samsara"><i>saṃsāra</i></a>.`}
              </dd>
              <dt id="vedana">
                ${_`vedanā`}
              </dt>
              <dd>
                ${_`Feeling—pleasure (ease), pain (suffering), or neither pleasure nor pain. See <i><a href="#khandha">khandha</a></i>.`}
              </dd>
              <dt id="vesak">
                ${_`Vesak, Vesakha, Visakha, Wesak, etc. (visākha)`}
              </dt>
              <dd>
                ${_`The ancient name for the Indian lunar month in spring corresponding to our April-May. According to tradition, the Buddha’s birth, Awakening, and <a href="#parinibbana"><i>Parinibbāna</i></a> each took place on the full-moon night in the month of Visākha. These events are commemorated on that day in the Visākha festival, which is celebrated annually throughout the world of Theravāda Buddhism.`}
              </dd>
              <dt id="vicara">
                ${_`vicāra`}
              </dt>
              <dd>
                ${_`Reflection, considering; sustained application of mind. In meditation, <i>vicāra</i> is the mental factor that keeps one’s attention sustained on the chosen meditation subject. <i>Vicāra</i> and its companion factor <i><a href="#vitakka">vitakka</a></i> reach full maturity upon the development of the first level of <i><a href="#jhana">jhāna</a></i>.`}
              </dd>
              <dt id="vijja">
                ${_`vijjā`}
              </dt>
              <dd>
                ${_`Clear knowledge; genuine awareness; science (specifically, the cognitive powers developed through the practice of immersion and wisdom).`}
              </dd>
              <dt id="vijja-carana">
                ${_`vijjā-caraṇa-sampanno`}
              </dt>
              <dd>
                ${_`Consummate in knowledge and conduct; accomplished in the conduct leading to awareness or cognitive skill. An epithet for the Buddha.`}
              </dd>
              <dt id="vimutti">
                ${_`vimutti`}
              </dt>
              <dd>
                ${_`Release; freedom from suffering. The suttas distinguish between two kinds of release. Wisdom-release (<i>paññā-vimutti</i>) describes the mind of the <a href="#arahant"><i>arahant</i></a>, which is free of the <i><a href="#asava">āsavas</a></i>. Awareness-release (<i>ceto-vimutti</i>) is used to describe either the sustained suppression of the <i><a href="#kilesa">kilesas</a></i> during the practice of <a href="#jhana"><i>jhāna</i></a> and the four <i><a href="#brahma-vihara">brahma-vihāras</a></i>, or the state of freedom of the arahant’s mind.`}
              </dd>
              <dt id="vinaya">
                ${_`Vinaya`}
              </dt>
              <dd>
                ${_`Training; guidelines; monastic discipline. In the early Suttas, <i>vinaya</i> is most commonly paired with <i>dhamma</i>, where it means “theory and practice” as a general term for the Buddha’s religion. It is also commonly used in the sense of guiding away or getting rid of defilements. It was also applied to the growing set of rules and procedures governing monastic discipline, and that meaning grew to become the dominant one in later years. The Vinaya as Monastic Law spans six volumes in printed text, whose rules and traditions define every aspect of the <a href="#bhikkhu"><i>bhikkhus’</i></a> and <a href="#bhikkhuni"><i>bhikkhunīs’</i></a> way of life. The essence of the rules for monastics is contained in the <a href="#patimokkha"><i>Pātimokkha</i>.</a>`}
              </dd>
              <dt id="vinnana">
                ${_`viññāṇa`}
              </dt>
              <dd>
                ${_`Consciousness; cognizance; the act of being aware of sense data and ideas as they occur. The Buddha emphatically declared that all consciousness is conditioned. See <i><a href="#khandha">khandha</a></i>.`}
              </dd>
              <dt id="vipaka">
                ${_`vipāka`}
              </dt>
              <dd>
                ${_`The consequence and result of a past choice (<i><a href="#kamma">kamma</a></i>).`}
              </dd>
              <dt id="vipassana">
                ${_`vipassanā`}
              </dt>
              <dd>
                ${_`Clear intuitive insight or discernment into physical and mental phenomena as they arise and disappear, seeing them for what they actually are—in and of themselves—in terms of the three characteristics (see <a href="#ti-lakkhana"><i>ti-lakkhaṇa</i></a>) and in terms of suffering, its origin, its cessation, and the way leading to its cessation (see <a href="#ariya-sacca"><i>ariya-sacca</i></a>).`}
              </dd>
              <dt id="viriya">
                ${_`viriya`}
              </dt>
              <dd>
                ${_`Energy; energy. One of the five faculties (<i>bala;</i> see <a href="#bodhi-pakkhiya-dhamma"><i>bodhi-pakkhiya-dhammā</i></a>), and the five strengths/dominant factors (<i><a href="#indriya">indriya</a>;</i> see <a href="#bodhi-pakkhiya-dhamma"><i>bodhi-pakkhiya-dhammā</i></a>).`}
              </dd>
              <dt id="vitakka">
                ${_`vitakka`}
              </dt>
              <dd>
                ${_`Thought. In meditation, <i>vitakka</i> is the mental factor by which one’s attention is applied to the chosen meditation object. <i>Vitakka</i> and its companion factor <i><a href="#vicara">vicāra</a></i> reach full maturity upon the development of the first level of <i><a href="#jhana">jhāna</a></i>.`}
              </dd>
            </dl>
            <h2 id="wxyz">
              ${_`WXYZ`}
            </h2>
            <dl>
              <dt id="yakkha">
                ${_`yakkha`}
              </dt>
              <dd>
                ${_`Spirit. One of a class of powerful “non-human” beings—sometimes kindly, sometimes murderous and cruel—corresponding roughly to the fairies and ogres of Western fairy tales. In later years, these came to be considered mainly malevolent, but in the Buddha’s day they were morally ambiguous, and in fact were commonly worshiped as deities.`}
              </dd>
            </dl>
            <aside class="static-copyright">
              <p>
                ${_`The original source of this Glossary was released under the following terms:`}
              </p>
              <blockquote>
                ${_`© 2005 Anonymous. The text of this page (“A Glossary of Pali and Buddhist Terms”, by Anonymous) is licensed under a Creative Commons Attribution 4.0 International License. To view a copy of the license, visit <a href="http://creativecommons.org/licenses/by/4.0/" rel="noopener" target="_blank">this page</a>.`}
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
    this.localizedStringsPath = '/localization/elements/static_terminology-page';
  }
}


customElements.define('sc-terminology-page', SCTerminology);
