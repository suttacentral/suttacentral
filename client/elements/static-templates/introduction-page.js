import { html } from '@polymer/lit-element/lit-element.js';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';

import { staticStyles } from '../styles/static-styles.js';
import { SCStaticPage } from '../addons/sc-static-page.js';
import _ from '../../localization/macro.js';

class SCIntroduction extends SCStaticPage {
  render() {
    return html`
    ${staticStyles}
    <div id="page-wrap">
      <main>
        <section>
          <h1>
            ${_`Introduction to SuttaCentral`}
          </h1>
          <h2>
            ${_`The Buddha’s words`}
          </h2>
          <p>
            ${_`SuttaCentral contains early Buddhist texts, known as the Tipiṭaka or “Three Baskets”. This is a large collection of teachings attributed to the Buddha or his earliest disciples, who were teaching in India around 2500 years ago. They are regarded as sacred canon in all schools of Buddhism.`}
          </p>
          <p>
            ${_`There are several Buddhist traditions, and each has passed down a set of scriptures from ancient times. SuttaCentral is specially focused on the scriptures of the <a href="http://en.wikipedia.org/wiki/Pre-sectarian_Buddhism" rel="noopener" target="_blank" title="Wikipedia article on pre-sectarian Buddhism">earliest period of Buddhism</a>, and hosts texts in over thirty languages. We believe this is the largest collection of early Buddhist texts ever made.`}
          </p>
          <p>
            ${_`SuttaCentral hosts the texts in orginal languages, translations in modern languages, and extensive sets of parallels that show the relationship between them all.`}
          </p>
          <picture>
            <source srcset="/img/static-pages/Life_of_Buddha_Burmese_Manuscript_22_Volume_1_Wellcom.webp" type="image/webp"/>
            <source srcset="/img/static-pages/Life_of_Buddha_Burmese_Manuscript_22_Volume_1_Wellcom.jpg" type="image/jpeg"/>
            <img alt="${_`Cover and binding to a Burmese manuscript on the Life of Buddha in red tooled leather with text in\n               gold letters. Burma, late 19th century.`}" class="image-home-full" src="/img/static-pages/Life_of_Buddha_Burmese_Manuscript_22_Volume_1_Wellcom.jpg" title="${_`Life of Buddha Burmese Manuscript 22, Volume 1`}" width="640px"/>
          </picture>
          <h2>
            ${_`Themes`}
          </h2>
          <p>
            ${_`What are these texts about? The Buddha’s overriding concern was with freedom from suffering. The teachings cover a wide range of topics, including ethics, meditation, family life, renunciation, the nature of wisdom and true understanding, and the path to peace.`}
          </p>
          <p>
            ${_`The teachings show how to live well so as to be free of suffering. They teach non-violence and compassion, and emphasize the value of the spiritual over the material. Many discourses discuss meditation, while others are concerned with ethics, or with a rational and clear understanding of the world as perceived. They show the Buddha engaging with people from all walks of life and discussing a diverse range of topics. But he said that all of his words have one taste, the taste of freedom.`}
          </p>
          <p>
            ${_`While there are plenty of summaries and interpretations of his teaching, there’s nothing quite like encountering it in his own words. The early texts depict the Buddha in a vivid and diverse range of contexts, speaking with monastics, ascetics, criminals, kings, businessmen, lepers, prostitutes, paupers, wives, skeptics, friends, and enemies. It’s not just what he says, but the way he deals with this spectrum of humanity, always with kindness, clarity, dignity, and respect.`}
          </p>
          <h2>
            ${_`Content`}
          </h2>
          <p>
            <picture>
              <source srcset="/img/static-pages/birchbark_w400.webp" type="image/webp"/>
              <source srcset="/img/static-pages/birchbark_w400.jpg" type="image/jpeg"/>
              <img alt="${_`Fragment of Gandhari manuscript on birch bark, acquired by University of Washington. Afghanistan, \n            circa 1st or 2nd century CE.`}" class="image-home" src="/img/static-pages/birchbark_w400.jpg" title="${_`Abhidharma commentary on suffering`}" />
            </picture>
            ${_`\n            Buddhist texts are traditionally classified as the “Three\n            Baskets”, spelled `}
            <i lang="pli">
              ${_`tipiṭaka`}
            </i>
            ${_` in Pali or `}
            <i lang="san">
              ${_`tripiṭaka`}
            </i>
            ${_` in Sanskrit. These are:\n          `}
          </p>
          <ul>
            <li>
              ${_`<a href="/discourses" title="SuttaCentral article on Discourses"><strong>Discourses:</strong></a> <i lang="pli">Sutta</i> in Pali, <i lang="san">sūtra</i> in Sanskrit. These are the primary texts, consisting of records of teachings or conversations by the Buddha or his disciples, and arranged by litarary style or subject matter.`}
            </li>
            <li>
              ${_`<a href="/vinaya" title="SuttaCentral article on Vinaya"><strong>Monastic Law:</strong></a> <i lang="pli">Vinaya</i> in both Pali and Sanskrit. These contain the famous list of rules for monks and nuns (<i>pātimokkha</i>). But they are much more than that, including many details of community life, and a multitude of stories about life in ancient India.`}
            </li>
            <li>
              ${_`<a href="/abhidhamma" title="SuttaCentral article on Abhidhamma"><strong>Abhidhamma:</strong></a> Spelled <i lang="san">abhidharma</i> in Sanskrit. Abhidhamma texts are systematic summaries and analyses of the teachings drawn from the earlier discourses.`}
            </li>
          </ul>
          <p>
            ${_`Each Buddhist tradition has passed down separate collections for well over a thousand years. Yet when we look at the Discourses and the Monastic Law, in all major features, and many minor details, they are similar or identical. Since the 19th century, a series of scholars have noted these correspondences and compiled them.`}
          </p>
          <p>
            ${_`Most of the early texts have been digitized. For the history of this process, see the article <a href="https://books.google.com/books?id=NFpcAgAAQBAJ&amp;pg=PA288" rel="noopener" target="_blank" title="Article on Digital Input of Buddhist Texts in Encyclopedia of Buddhism">Digital Input of Buddhist Texts</a> by Lewis Lancaster in the <cite>Encyclopedia of Buddhism</cite>. In addition, translations have been produced in multiple languages, mostly focusing on the better-known texts of the Pali discourses.`}
          </p>
          <p>
            ${_`SuttaCentral draws on this long history to present three main kinds of content.`}
          </p>
          <ul>
            <li>
              <strong>
                ${_`Original texts:`}
              </strong>
              ${_` SuttaCentral presents the original texts in the original languages,\n              including:\n              `}
              <ul>
                <li>
                  ${_`The <a href="http://en.wikipedia.org/wiki/P%C4%81li" rel="noopener" target="_blank" title="Wikipedia article on Pali">Pali</a> canon (or <a href="http://en.wikipedia.org/wiki/Pali_Canon" rel="noopener" target="_blank" title="Wikipedia article on the Pali Canon">Tipiṭaka</a>) of the <a href="http://en.wikipedia.org/wiki/Theravada" rel="noopener" target="_blank" title="Wikipedia article on Theravāda">Theravāda</a> school. Our text is the Mahāsaṅgīti edition of the Sixth Council recension.`}
                </li>
                <li>
                  ${_`The early <a href="http://en.wikipedia.org/wiki/%C4%80gama_(Buddhism)" rel="noopener" target="_blank" title="Wikipedia article on Āgamas">Āgama</a> and <a href="https://en.wikipedia.org/wiki/Vinaya" rel="noopener" target="_blank" title="Wikipedia article on Vinaya">Vinaya</a> texts from the <a href="http://en.wikipedia.org/wiki/Taisho_Tripitaka" rel="noopener" target="_blank" title="Wikipedia article on Taishō Tripiṭaka">Taishō edition</a> of the <a href="http://en.wikipedia.org/wiki/Chinese_Buddhist_canon" rel="noopener" target="_blank" title="Wikipedia article on Chinese Canon">Chinese canon</a>. For our digital source we rely on <a href="http://www.cbeta.org/" rel="noopener" target="_blank" title="Chinese Buddhist Electronic Text Association">CBETA</a>.`}
                </li>
                <li>
                  ${_`A much smaller range of early texts from the <a href="http://en.wikipedia.org/wiki/Kangyur" rel="noopener" target="_blank" title="Wikipedia article on Tibetan Kangyur">Tibetan Kangyur</a>.`}
                </li>
                <li>
                  ${_`Such fragments and chance findings as are available in <a href="http://www.ancient-buddhist-texts.net/Buddhist-Texts/XX-Early-Buddhist-Texts/index.htm" rel="noopener" target="_blank" title="Introduction to the Early Buddhist Texts in Sanskritised Prākrit">Sanskrit</a>, <a href="https://en.wikipedia.org/wiki/Gandh%C4%81ran_Buddhist_texts" rel="noopener" target="_blank">Gandhārī</a>, and other Indic languages.`}
                </li>
              </ul>
            </li>
            <li>
              ${_`<strong>Translations:</strong> We have gathered translations of early texts in over thirty modern languages. Notable English translations include classic works by <a href="http://en.wikipedia.org/wiki/Bhikkhu_Bodhi" rel="noopener" target="_blank" title="Wikipedia article on Bhikkhu Bodhi">Bhikkhu Bodhi</a>, new English translations of Chinese <a href="/sa1-100">Saṁyukta Āgama</a> texts by <a href="http://www.buddhismuskunde.uni-hamburg.de/fileadmin/pdf/analayo/publications.htm" rel="noopener" target="_blank" title="Publications by Anālayo">Bhikkhu Anālayo</a>, and fresh translations from the Tibetan <a href="/up">Upāyikā</a> by Bhikkhuni Dhammadinnā. In addition, we are developing our own sets of new translations, in the belief that complete, accurate, and easy to read modern translations should be freely available for everyone. We have published an entirely new translation of the four Pali nikāyas by Bhikkhu Sujato, which is the first complete and consistent English translation of these core texts. And Bhikkhu Brahmāli is producing a much-needed modern and accurate translation of the Pali Vinaya.`}
            </li>
            <li>
              ${_`<strong>Parallels:</strong> The foundation of SuttaCentral is our sets of parallels. These detail tens of thousands of cases where texts in different collections or languages correspond with each other. The existence of these parallels shows the connections between of the scriptures underlying all Buddhist traditions, a connection that harks back to the Buddha himself.`}
            </li>
          </ul>
          <h2>
            ${_`Relations`}
          </h2>
          <p>
            <picture>
              <source srcset="/img/static-pages/dn20.webp" type="image/webp"/>
              <source srcset="/img/static-pages/dn20.jpg" type="image/jpeg"/>
              <img alt="${_`Visual representation of relationships for DN 20`}" class="image-home" src="/img/static-pages/dn20.jpg" title="${_`Relationships for DN 20`}" width="640px"/>
            </picture>
            ${_`\n            Suttas aren’t independent entities. They form a vast interconnected web\n            of teachings. Often the key to understanding one passage lies in a different text. In this way, the Buddhist\n            canons are a little like the internet, with individual pages connected by a web of hidden links.`}
          </p>
          <p>
            ${_`Most suttas appear in very similar form in more than one collection. We use “parallel” for variant texts that appear to be descended from a common ancestor. Often the texts are so close that this identification is simple. Sometimes, however, there is a less close relationship between two given texts. In such cases we indicate a “resembling parallel”. This doesn’t imply any particular kind of relationship between the resembling parallel and the basic text. It simply suggests that if you are studying the basic text, you might want to look at the resembling parallel, too. For a detailed discussion, see <a href="/methodology">our page on Methodology</a>.`}
          </p>
          <p>
            ${_`It is no trivial matter to discern what texts should be regarded as parallel. Texts often agree in many details, and disagree in others. When does a text stop being a full parallel and start being a resembling parallel? And when does it become merely a text that bears certain similar features? There are no black and white answers to such questions. Rather, making these identifications draws on the accumulated learning and experience of a succession of scholars. Inevitably there will be disagreements in detail; yet in the main, there is a broad consensus as to what constitutes a parallel. Ultimately, the important point is that these identifications help the student to study and learn from related texts in diverse collections.`}
          </p>
          <h2>
            ${_`Finding Your Way Around`}
          </h2>
          <p>
            ${_`The Buddhist canons have been organized and maintained as highly structured bodies of literature, and this complex hierarchy can be intimidating. We’ve tried to present our material in a way that will be convenient for both experts and beginners. Let’s review how Buddhist texts are organized. Then we’ll see how this is implemented in SuttaCentral.`}
          </p>
          <h3>
            ${_`How the Tipiṭaka is organized`}
          </h3>
          <p>
            ${_`We have already mentioned the overarching concept of the Tipiṭaka. Now let’s look at the sublevels of the structure. For simplicity, we’ll focus mainly on the Pali canon.`}
          </p>
          <h4>
            ${_`Nikāyas`}
          </h4>
          <p>
            ${_`The Pali Discourses are grouped in five main <i>nikāyas</i> or “divisions”. These are not organized by content, but by literary form. The first two—Long and Middle—are organized by length, the Saṁyutta or “Linked” division is organized by topic, and the Aṅguttara or “Numbered” division is organized by numerical sets. These four collections are synoptic; they constitute one largely unified body of text and doctrine, organized mainly for the convenience of the reciters who memorized it.`}
          </p>
          <p>
            ${_`The fifth <i>nikāya</i> is a rather different kind of collection. The core of it is a set of early texts that are mostly verse. To this was added a series of later texts of very different kinds, showing that this section was considered more open and flexible.`}
          </p>
          <h4>
            ${_`Intermediate levels`}
          </h4>
          <p>
            ${_`The Pali texts have a rather bewildering range of terms for intermediate levels of text structure, corresponding to what we might call a “part” or a “chapter”. Sometimes these sections are crucial for making sense of a text. For example, the <i>saṁyutta</i> is used in the Saṁyutta Nikāya for groups of discourses on the same topic, and the <i>nipāta</i> is used in the Aṅguttara Nikāya for groups of discourses with the same number of items. In the Vinaya, the <i>khandhaka</i> is likewise an essential structural feature. Elsewhere, however, we find structures of less importance, such as the <i>pannāsa</i> or group of fifty discourses. Originally these may have helped organize the texts into manuscripts, but these days they are retained for historical purposes.`}
          </p>
          <h4>
            ${_`Vagga`}
          </h4>
          <p>
            ${_`The smallest level of organization is the <i>vagga</i>, usually translated “chapter” but in fact a set of (usually) ten discourses or other texts. <i>Vaggas</i> may gather texts sorted by a meaningful theme. For example, the “Chapter on Kings” of the Middle Discourses contains ten discussions involving kings. In many cases, however, the <i>vagga</i> is merely a structural convention, and is simply named after its first discourse.`}
          </p>
          <h3>
            ${_`Sidebar`}
          </h3>
          <p>
            ${_`The main navigation is through the sidebar, which is available on every page. This lists all the collections with their various subdivisions. You can go directly to a full collection such as a <i>nikāya</i>, or else drill down to the precise group that you want.`}
          </p>
          <h4>
            ${_`Discourses`}
          </h4>
          <p>
            ${_`For the four main <i>nikāyas</i>, we’ve grouped the Chinese Āgamas together with their Pali parallels. Note that in the Chinese canon, as well as a main full Āgama, there’s usually some extra material; either individually translated suttas, or partial collections.`}
          </p>
          <p>
            ${_`In the “Minor” section, as well as the eponymous Khuddaka Nikāya in Pali, we include similar material in Chinese and Sanskrit. These are mostly Dhammapada-style texts.`}
          </p>
          <p>
            ${_`Under “Other” we include the relatively small quantity of material in Tibetan, Sanskrit, and other ancient Indic languages. In many cases, it might be possible to classify this material under one of the five <i>nikāyas</i>. However, the identification is complex and uncertain, so we simply leave it here.`}
          </p>
          <h4>
            ${_`Monastic Code`}
          </h4>
          <p>
            ${_`Unlike the Discourses, for the Vinaya texts we almost always have a clear sectarian affiliation. We therefore use this as the primary means of classification.`}
          </p>
          <p>
            ${_`All the Vinayas have a similar structure.`}
          </p>
          <ul>
            <li>
              ${_`<strong>Bhikkhu and Bhikkhunī Vibhaṅga:</strong> rules for monks and nuns, together with explanations and commentary.`}
            </li>
            <li>
              ${_`<strong>Khandhakas:</strong> This section, named and organized somewhat differently in the various versions, deals with monastic procedures and lifestyle.`}
            </li>
            <li>
              ${_`<strong>Supplements:</strong> Most Vinayas include some kind of supplement or summary, such as the Parivāra in Pali.`}
            </li>
          </ul>
          <p>
            ${_`The organization and names of these sections vary, and we follow the sequence found in each text.`}
          </p>
          <h4>
            ${_`Abhidhamma`}
          </h4>
          <p>
            ${_`The relatively few Abhidhamma texts are organized by school and language. Note that <i>abhidhamma</i> is a generic term, and is applied to many later treatises as well. Here we only include canonical texts.`}
          </p>
          <h3>
            ${_`Sutta card list`}
          </h3>
          <p>
            ${_`When you click a link in the sidebar, it opens a list of the corresponding texts, organized as a list of “cards”. Each card contains a complex of information about the relevant text, including references, description, and links to texts and translations. Click on the expander to see the parallels.`}
          </p>
          <p>
            ${_`A list may be any level of the hierarchy, such as a <i>nikāya</i>, a <i>vagga</i>, etc. You can navigate these at your convenience.`}
          </p>
          <h3>
            ${_`Text pages`}
          </h3>
          <p>
            ${_`You can read the original texts or translations. For original texts, a variety of helpful tools such as dictionary lookup, text-critical highlighting, and so on, is available.`}
          </p>
          <p>
            ${_`We are moving to a new system based on segmented texts. Not all our texts work this way, but where they do, you can view the text and translation side by side.`}
          </p>
        </section>
      </main>
    </div>`;
  }

  constructor() {
    super();
    this.localizedStringsPath = '/localization/elements/static_introduction-page';
  }
}


customElements.define('sc-introduction', SCIntroduction);
