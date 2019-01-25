import { html } from '@polymer/lit-element/lit-element.js';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';

import { staticStyles } from '../styles/static-styles.js';
import { SCStaticPage } from '../addons/sc-static-page.js';
import _ from '../../localization/macro.js';

class AcknowledgmentsPage extends SCStaticPage {
  render() {
    return html`
    ${staticStyles}
    <div id="page-wrap">
      <main>
        <section>
          <article>
            <h1>
              ${_`Acknowledgements`}
            </h1>
            <p>
              ${_`SuttaCentral was conceived by Venerable Anālayo (Germany), Rod Bucknell (Australia), and Bhante Sujato (Australia), based on sutta correspondence tables compiled by Rod Bucknell and Ven. Anālayo. The site founders are Rod Bucknell, Bhante Sujato, and John Kelly.`}
            </p>
            <h2>
              ${_`Version 1—2005`}
            </h2>
            <p>
              ${_`The initial launch of the site was in 2005. Key people involved with that launch were:`}
            </p>
            <table>
              <tr>
                <td>
                  ${_`Ong Yong Peng`}
                </td>
                <td>
                  ${_`System, database and web design; web programming.`}
                </td>
              </tr>
              <tr>
                <td>
                  ${_`John Kelly`}
                </td>
                <td>
                  ${_`Project coordination; system and database design; database and data administration; data entry.`}
                </td>
              </tr>
              <tr>
                <td>
                  ${_`Hugo Gayosso, Chris Kang`}
                </td>
                <td>
                  ${_`Data entry.`}
                </td>
              </tr>
            </table>
            <h2>
              ${_`Version 2—2012`}
            </h2>
            <p>
              ${_`In late 2012 we began a new redesign, with the core team being Rod Bucknell, John Kelly, and Bhante Sujato. This was originally spurred by John Kelly’s work assisting Bhikkhu Bodhi on the Aṅguttara Nikāya translation, which resulted in a number of new parallels being discovered. However we decided to go beyond just making some additions, and have embarked on a complete redesign. While the data structure has been retained with only incremental improvements, the entire code for the website has been rewritten. For this new edition, the main team is as follows.`}
            </p>
            <table>
              <tr>
                <td>
                  ${_`Rod Bucknell`}
                </td>
                <td>
                  ${_`Lead researcher, parallels and references.`}
                </td>
              </tr>
              <tr>
                <td>
                  ${_`Bhante Sujato`}
                </td>
                <td>
                  ${_`Design; project coordination; text preparation; translation.`}
                </td>
              </tr>
              <tr>
                <td>
                  ${_`John Kelly`}
                </td>
                <td>
                  ${_`Project coordination; system and database design; database and data administration; data entry.`}
                </td>
              </tr>
              <tr>
                <td>
                  ${_`Blake Walsh (formerly Bhante Nandiya)`}
                </td>
                <td>
                  ${_`Chief developer, web programming, text preparation, general hacking.`}
                </td>
              </tr>
              <tr>
                <td>
                  ${_`Bhante Jhanarato (JR)`}
                </td>
                <td>
                  ${_`Web service scripting.`}
                </td>
              </tr>
            </table>
            <h2>
              ${_`Version 3—2018`}
            </h2>
            <p>
              ${_`While the 2012 rebuild has served us well, we have seen the need for a systematic upgrade. We have made a series of incremental changes, each one of which must be added to the original structure somehow, and things get a bit creaky after a while. At a certain point it’s better to rebuild in a cleaner and more systematic way. We embarked on this process in 2017. Key underlying changes include internationalization, integration of Sutta, Vinaya, and verse parallels, and addition of segmented translations. The core development team for this process has been as follows.`}
            </p>
            <table>
              <tr>
                <td>
                  ${_`Bhante Sujato`}
                </td>
                <td>
                  ${_`Design; project coordination; text preparation; translation.`}
                </td>
              </tr>
              <tr>
                <td>
                  ${_`Ven. Vimala`}
                </td>
                <td>
                  ${_`Programming; text preparation; community coordination; preparation and integration of parallels.`}
                </td>
              </tr>
              <tr>
                <td>
                  ${_`Blake Walsh`}
                </td>
                <td>
                  ${_`Lead programmer.`}
                </td>
              </tr>
            </table>
            <p>
              ${_`The development was brought to completion thanks to the fine work of the team at STXNext: Małgorzata Maksimczyk, Jakub Semik, Hubert Dworczynski, Wioletta Jaźwiecka, and Krzysiek Woźniak.`}
            </p>
            <h2>
              ${_`SuttaCentral Development Trust`}
            </h2>
            <p>
              ${_`In order to enable donations through the site, we set up a non-profit charity. This is incorporated in Australia, and manages the finances for SuttaCentral. Special thanks to Deepika Weerakoon, who set it up and acts as Financial Officer. Trustees are Bhante Sujato, Bhante Brahmali, and John Kelly.`}
            </p>
            <h2>
              ${_`Our volunteers and helpers`}
            </h2>
            <p>
              ${_`In addition, we express our grateful thanks to the following. SuttaCentral exists to draw together the diverse strands of the early Buddhist tradition, and we can only do this through the help of many people. This list is very incomplete, so please let us know if we missed anyone out.`}
            </p>
            <table>
              <tr>
                <td>
                  ${_`Agra Premaratne`}
                </td>
                <td>
                  ${_`Soundtrack.`}
                </td>
              </tr>
              <tr>
                <td>
                  ${_`Akincano Marc Weber`}
                </td>
                <td>
                  ${_`German translations: consultation and advice.`}
                </td>
              </tr>
              <tr>
                <td>
                  ${_`Alain René Bernay`}
                </td>
                <td>
                  ${_`French translations: sourcing and text preparation.`}
                </td>
              </tr>
              <tr>
                <td>
                  ${_`Alex Genaud`}
                </td>
                <td>
                  ${_`Consultation.`}
                </td>
              </tr>
              <tr>
                <td>
                  ${_`Alexander баян купи-ка`}
                </td>
                <td>
                  ${_`Russian translations.`}
                </td>
              </tr>
              <tr>
                <td>
                  ${_`Alfred Conlan`}
                </td>
                <td>
                  ${_`Developer, text preparation.`}
                </td>
              </tr>
              <tr>
                <td>
                  ${_`Alpesh Raval, Jatin, and the team at Hi-Tech`}
                </td>
                <td>
                  ${_`Typing and markup of several texts, including the English translations of the Pali Vinaya, Vibhaṅga, and Kathāvatthu, and several Hindi texts.`}
                </td>
              </tr>
              <tr>
                <td>
                  ${_`Amaradasa Liyanagamage`}
                </td>
                <td>
                  ${_`Consultation and liason.`}
                </td>
              </tr>
              <tr>
                <td>
                  ${_`Aminah Borg-Luck`}
                </td>
                <td>
                  ${_`Team manager, text-preparation, forum moderation.`}
                </td>
              </tr>
              <tr>
                <td>
                  ${_`Anāgārikā Pasannā (Michelle Koen)`}
                </td>
                <td>
                  ${_`Forum moderation.`}
                </td>
              </tr>
              <tr>
                <td>
                  ${_`Anāgārikā Sabbamittā (Maria Backes)`}
                </td>
                <td>
                  ${_`German translations: text preparation and organisation of fund-raising events.`}
                </td>
              </tr>
              <tr>
                <td>
                  ${_`Andrew Glass`}
                </td>
                <td>
                  ${_`Advice regarding font encodings.`}
                </td>
              </tr>
              <tr>
                <td>
                  ${_`Antoni Baron`}
                </td>
                <td>
                  ${_`Spanish translations: consultation.`}
                </td>
              </tr>
              <tr>
                <td>
                  ${_`Arya Whisnu Karniawan`}
                </td>
                <td>
                  ${_`Indonesian translations.`}
                </td>
              </tr>
              <tr>
                <td>
                  ${_`Ashok Tapase`}
                </td>
                <td>
                  ${_`Marathi translations.`}
                </td>
              </tr>
              <tr>
                <td>
                  ${_`Ayyā Agganyani`}
                </td>
                <td>
                  ${_`German translations: consultation and advice on Abhidhamma, text preparation.`}
                </td>
              </tr>
              <tr>
                <td>
                  ${_`Ayyā Araññadevī`}
                </td>
                <td>
                  ${_`English translations: corrections for dictionaries.`}
                </td>
              </tr>
              <tr>
                <td>
                  ${_`Ayyā Kathrin`}
                </td>
                <td>
                  ${_`German & English translations: text preparation.`}
                </td>
              </tr>
              <tr>
                <td>
                  ${_`Ayyā Pāsādā`}
                </td>
                <td>
                  ${_`Proofreading.`}
                </td>
              </tr>
              <tr>
                <td>
                  ${_`Ben Arasu`}
                </td>
                <td>
                  ${_`Tamil translations.`}
                </td>
              </tr>
              <tr>
                <td>
                  ${_`Ben Mitchell of Rosetta Type`}
                </td>
                <td>
                  ${_`Help with fonts.`}
                </td>
              </tr>
              <tr>
                <td>
                  ${_`Bhikkhu Anālayo`}
                </td>
                <td>
                  ${_`English translation of the Saṁyuktāgama, help with parallels.`}
                </td>
              </tr>
              <tr>
                <td>
                  ${_`Bhikkhu Ānandajoti`}
                </td>
                <td>
                  ${_`Consultation and advice on texts and metres, translations and parallels.`}
                </td>
              </tr>
              <tr>
                <td>
                  ${_`Bhikkhu Bodhi`}
                </td>
                <td>
                  ${_`English translations.`}
                </td>
              </tr>
              <tr>
                <td>
                  ${_`Bhikkhu Brahmāli`}
                </td>
                <td>
                  ${_`English translation of the Pali Vinaya.`}
                </td>
              </tr>
              <tr>
                <td>
                  ${_`Bhikkhu Dhammadāsa (AKA Brother Joe Smith)`}
                </td>
                <td>
                  ${_`English translations: text preparation.`}
                </td>
              </tr>
              <tr>
                <td>
                  ${_`Bhikkhu Indacanda`}
                </td>
                <td>
                  ${_`Vietnamese translations.`}
                </td>
              </tr>
              <tr>
                <td>
                  ${_`Bhikkhu Jaganātha`}
                </td>
                <td>
                  ${_`English translation: preparation of <em>The Book of the Discipline</em>.`}
                </td>
              </tr>
              <tr>
                <td>
                  ${_`Bhikkhu Jodoshinshu`}
                </td>
                <td>
                  ${_`Japanese translations: permission to link to his site.`}
                </td>
              </tr>
              <tr>
                <td>
                  ${_`Bhikkhu Karunabangsha (Kbangsha Bhante)`}
                </td>
                <td>
                  ${_`Bengali translations: translator and support.`}
                </td>
              </tr>
              <tr>
                <td>
                  ${_`Bhikkhu Khemacāro (박석현)`}
                </td>
                <td>
                  ${_`Korean translations.`}
                </td>
              </tr>
              <tr>
                <td>
                  ${_`Bhikkhu Kheminda (Бхиккху Кхеминда)`}
                </td>
                <td>
                  ${_`Russian translations: support.`}
                </td>
              </tr>
              <tr>
                <td>
                  ${_`Bhikkhu Mettavihāri`}
                </td>
                <td>
                  ${_`Sinhala translations: support.`}
                </td>
              </tr>
              <tr>
                <td>
                  ${_`Bhikkhu Mettiko`}
                </td>
                <td>
                  ${_`German translation of the Majjhima Nikāya.`}
                </td>
              </tr>
              <tr>
                <td>
                  ${_`Bhikkhu Ñāṇatusita`}
                </td>
                <td>
                  ${_`Permission to use Bhikkhu Bodhi’s Dīgha translations and John Ireland’s Udāna and Itivuttaka.`}
                </td>
              </tr>
              <tr>
                <td>
                  ${_`Bhikkhu Pāsādika`}
                </td>
                <td>
                  ${_`English translation of the Ekottarikāgama.`}
                </td>
              </tr>
              <tr>
                <td>
                  ${_`Bhikkhu Yuttadhammo`}
                </td>
                <td>
                  ${_`Pali-English dictionary, Pali lookup code, Pali transliteration code.`}
                </td>
              </tr>
              <tr>
                <td>
                  ${_`Bhikkhunī Dhammadinnā`}
                </td>
                <td>
                  ${_`English translation of the Upāyikā.`}
                </td>
              </tr>
              <tr>
                <td>
                  ${_`Bhikkhunī Nibbidā`}
                </td>
                <td>
                  ${_`English translation: preparation of <em>The Book of the Discipline</em>.`}
                </td>
              </tr>
              <tr>
                <td>
                  ${_`Binh Anson`}
                </td>
                <td>
                  ${_`Vietnamese translations: text preparation.`}
                </td>
              </tr>
              <tr>
                <td>
                  ${_`Brenna Artinger`}
                </td>
                <td>
                  ${_`Forum moderation, publicity.`}
                </td>
              </tr>
              <tr>
                <td>
                  ${_`Buddhist Library (Sydney)`}
                </td>
                <td>
                  ${_`Use of facilities.`}
                </td>
              </tr>
              <tr>
                <td>
                  ${_`Buddhist Society of WA`}
                </td>
                <td>
                  ${_`Use of facilities.`}
                </td>
              </tr>
              <tr>
                <td>
                  ${_`Buddhist Studies Review`}
                </td>
                <td>
                  ${_`Permission to use the English translation of the Ekottarikāgama.`}
                </td>
              </tr>
              <tr>
                <td>
                  ${_`Cara Dibdin`}
                </td>
                <td>
                  ${_`Forum moderation, publicity.`}
                </td>
              </tr>
              <tr>
                <td>
                  ${_`Claralynn Nunamaker`}
                </td>
                <td>
                  ${_`Forum moderation.`}
                </td>
              </tr>
              <tr>
                <td>
                  ${_`Charles Muller`}
                </td>
                <td>
                  ${_`Digital Dictionary of Buddhism.`}
                </td>
              </tr>
              <tr>
                <td>
                  ${_`Dave Strandberg`}
                </td>
                <td>
                  ${_`SASS and JS enhancements.`}
                </td>
              </tr>
              <tr>
                <td>
                  ${_`David Březina of Rosetta Type`}
                </td>
                <td>
                  ${_`Help with fonts.`}
                </td>
              </tr>
              <tr>
                <td>
                  ${_`David Dargie and Michelle Styles-Williams`}
                </td>
                <td>
                  ${_`Transcription of Sanskrit texts.`}
                </td>
              </tr>
              <tr>
                <td>
                  ${_`Deepika Weerakoon`}
                </td>
                <td>
                  ${_`General support, Financial Officer for SuttaCentral Development Trust.`}
                </td>
              </tr>
              <tr>
                <td>
                  ${_`Derek Sola`}
                </td>
                <td>
                  ${_`Proofreading of suttas.`}
                </td>
              </tr>
              <tr>
                <td>
                  ${_`Dheerayupa Sukonthapanthu`}
                </td>
                <td>
                  ${_`Thai translations: coordination, consultation, and text preparation.`}
                </td>
              </tr>
              <tr>
                <td>
                  ${_`Dilbag Bhangu`}
                </td>
                <td>
                  ${_`Hindi translations: support.`}
                </td>
              </tr>
              <tr>
                <td>
                  ${_`Dr. Mark Allon`}
                </td>
                <td>
                  ${_`Consultation.`}
                </td>
              </tr>
              <tr>
                <td>
                  ${_`Dustin Cheah`}
                </td>
                <td>
                  ${_`General support.`}
                </td>
              </tr>
              <tr>
                <td>
                  ${_`Enzo Alfano`}
                </td>
                <td>
                  ${_`Italian translations.`}
                </td>
              </tr>
              <tr>
                <td>
                  ${_`G. Radhakrishnan`}
                </td>
                <td>
                  ${_`General support.`}
                </td>
              </tr>
              <tr>
                <td>
                  ${_`Gabriel Laera`}
                </td>
                <td>
                  ${_`Portuguese translations: preparation and creation of Pali→Portugese dictionary.`}
                </td>
              </tr>
              <tr>
                <td>
                  ${_`Gia Hieu Nguyen`}
                </td>
                <td>
                  ${_`General support.`}
                </td>
              </tr>
              <tr>
                <td>
                  ${_`Handaka Vijjananda`}
                </td>
                <td>
                  ${_`General support.`}
                </td>
              </tr>
              <tr>
                <td>
                  ${_`Hero Barua`}
                </td>
                <td>
                  ${_`Bengali translations: support.`}
                </td>
              </tr>
              <tr>
                <td>
                  ${_`Indra Anggara`}
                </td>
                <td>
                  ${_`Indonesian translations.`}
                </td>
              </tr>
              <tr>
                <td>
                  ${_`Jacqueline Rodgers`}
                </td>
                <td>
                  ${_`Japanese translations: support.`}
                </td>
              </tr>
              <tr>
                <td>
                  ${_`Janaka Liyanage`}
                </td>
                <td>
                  ${_`Sinhala translations: text preparation and support.`}
                </td>
              </tr>
              <tr>
                <td>
                  ${_`Jessica Hefes`}
                </td>
                <td>
                  ${_`French translations: text preparation.`}
                </td>
              </tr>
              <tr>
                <td>
                  ${_`John Kelly`}
                </td>
                <td>
                  ${_`Proofreading of suttas.`}
                </td>
              </tr>
              <tr>
                <td>
                  ${_`John Nishinaga`}
                </td>
                <td>
                  ${_`Setting up VPS, managing shift from PHP to Python, IT consultant and technician.`}
                </td>
              </tr>
              <tr>
                <td>
                  ${_`Kancana Thilakasiri`}
                </td>
                <td>
                  ${_`Forum moderation.`}
                </td>
              </tr>
              <tr>
                <td>
                  ${_`Kåre A. Lie`}
                </td>
                <td>
                  ${_`Norwegian translations.`}
                </td>
              </tr>
              <tr>
                <td>
                  ${_`Karel Chromovský`}
                </td>
                <td>
                  ${_`Czech translations.`}
                </td>
              </tr>
              <tr>
                <td>
                  ${_`Ken Yifer`}
                </td>
                <td>
                  ${_`Dharmapada parallels of the Taisho texts.`}
                </td>
              </tr>
              <tr>
                <td>
                  ${_`Kumārī Jayawardena`}
                </td>
                <td>
                  ${_`Sinhala translations: permission to use the work by her father, A.P. de Zoysa.`}
                </td>
              </tr>
              <tr>
                <td>
                  ${_`Lynn Kelly`}
                </td>
                <td>
                  ${_`Proofreading of suttas.`}
                </td>
              </tr>
              <tr>
                <td>
                  ${_`Maithri Panagoda`}
                </td>
                <td>
                  ${_`Sinhala translations: support.`}
                </td>
              </tr>
              <tr>
                <td>
                  ${_`Manfred Wierich`}
                </td>
                <td>
                  ${_`German translations: text preparation and support.`}
                </td>
              </tr>
              <tr>
                <td>
                  ${_`Marco A. Montava Belda and friends at Buddhismo Theravada Hispano`}
                </td>
                <td>
                  ${_`Pali→Spanish Dictionary.`}
                </td>
              </tr>
              <tr>
                <td>
                  ${_`Marcus Bingenheimer`}
                </td>
                <td>
                  ${_`Permission to use translations of the shorter Saṁyuktāgama, consultation.`}
                </td>
              </tr>
              <tr>
                <td>
                  ${_`Mark Lin`}
                </td>
                <td>
                  ${_`Consultation with Chinese & Sanskrit Dharmapadas`}
                </td>
              </tr>
              <tr>
                <td>
                  ${_`Michael Beisert`}
                </td>
                <td>
                  ${_`Portuguese translations.`}
                </td>
              </tr>
              <tr>
                <td>
                  ${_`Mukta Barua`}
                </td>
                <td>
                  ${_`Bengali translations: support.`}
                </td>
              </tr>
              <tr>
                <td>
                  ${_`Nadine Bucich`}
                </td>
                <td>
                  ${_`Forum moderation.`}
                </td>
              </tr>
              <tr>
                <td>
                  ${_`Nathan Win`}
                </td>
                <td>
                  ${_`Burmese translations: support.`}
                </td>
              </tr>
              <tr>
                <td>
                  ${_`Patcharaporn Sahaponghirun`}
                </td>
                <td>
                  ${_`Thai translations: text preparation.`}
                </td>
              </tr>
              <tr>
                <td>
                  ${_`Penny Jordan`}
                </td>
                <td>
                  ${_`General text preparation.`}
                </td>
              </tr>
              <tr>
                <td>
                  ${_`Peter van Loosbroek`}
                </td>
                <td>
                  ${_`Dutch translations.`}
                </td>
              </tr>
              <tr>
                <td>
                  ${_`Piotr Marcinow`}
                </td>
                <td>
                  ${_`Polish translations: text preparation.`}
                </td>
              </tr>
              <tr>
                <td>
                  ${_`Premalal Mirihagalla`}
                </td>
                <td>
                  ${_`General support.`}
                </td>
              </tr>
              <tr>
                <td>
                  ${_`Prof. Kobus Kruger`}
                </td>
                <td>
                  ${_`Afrikaans translations.`}
                </td>
              </tr>
              <tr>
                <td>
                  ${_`Randolph Alwis`}
                </td>
                <td>
                  ${_`Legal advice.`}
                </td>
              </tr>
              <tr>
                <td>
                  ${_`Raimund Beyerlein and Verlag Beyerlein-Steinschulte`}
                </td>
                <td>
                  ${_`German translations: copyrights and advice.`}
                </td>
              </tr>
              <tr>
                <td>
                  ${_`Rémy Zins`}
                </td>
                <td>
                  ${_`French translations and text preparation.`}
                </td>
              </tr>
              <tr>
                <td>
                  ${_`Sarah “Samurai” Lappin`}
                </td>
                <td>
                  ${_`Japanese translations: support.`}
                </td>
              </tr>
              <tr>
                <td>
                  ${_`Seniya Ariyakumara`}
                </td>
                <td>
                  ${_`Indonesian translations.`}
                </td>
              </tr>
              <tr>
                <td>
                  ${_`Shai Schwartz`}
                </td>
                <td>
                  ${_`Hebrew translations.`}
                </td>
              </tr>
              <tr>
                <td>
                  ${_`Shikha Panjwani, Rahul Patel, and the team at Edatamine Services`}
                </td>
                <td>
                  ${_`Typing and markup of several Hindi texts.`}
                </td>
              </tr>
              <tr>
                <td>
                  ${_`Shisanu Tongchim`}
                </td>
                <td>
                  ${_`Thai translations: technical assistance.`}
                </td>
              </tr>
              <tr>
                <td>
                  ${_`Shravasti Dhammika`}
                </td>
                <td>
                  ${_`Geographic consultation, dictionary of nature and environment.`}
                </td>
              </tr>
              <tr>
                <td>
                  ${_`Sidat de Silva`}
                </td>
                <td>
                  ${_`Cinematography.`}
                </td>
              </tr>
              <tr>
                <td>
                  ${_`Sirisumana Godage`}
                </td>
                <td>
                  ${_`Sinhala translations: support.`}
                </td>
              </tr>
              <tr>
                <td>
                  ${_`Sister Uppalavanna`}
                </td>
                <td>
                  ${_`Draft English translations of most of the nikayas.`}
                </td>
              </tr>
              <tr>
                <td>
                  ${_`Štěpán Chromovský`}
                </td>
                <td>
                  ${_`Czech translations.`}
                </td>
              </tr>
              <tr>
                <td>
                  ${_`Udayan Barua`}
                </td>
                <td>
                  ${_`Bengali translations: support.`}
                </td>
              </tr>
              <tr>
                <td>
                  ${_`Vipassana Research Institute`}
                </td>
                <td>
                  ${_`Permission to use translations of the Mahā­satipaṭṭhāna Sutta.`}
                </td>
              </tr>
              <tr>
                <td>
                  ${_`Yasoj`}
                </td>
                <td>
                  ${_`Text preparation.`}
                </td>
              </tr>
            </table>
          </article>
        </section>
      </main>
    </div>`;
  }

  constructor() {
    super();
    this.localizedStringsPath = '/localization/elements/static_acknowledgments-page';
  }
}


customElements.define('sc-acknowledgments-page', AcknowledgmentsPage);
