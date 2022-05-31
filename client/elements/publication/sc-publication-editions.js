import { LitElement, html, css } from 'lit';

import { LitLocalized } from '../addons/sc-localization-mixin';
import { setNavigation } from '../navigation/sc-navigation-common';
import { SCPublicationEditionsStyles } from '../styles/sc-publication-editions-styles';
import { reduxActions } from '../addons/sc-redux-actions';
import { store } from '../../redux-store';

class ScPublicationEditions extends LitLocalized(LitElement) {
  static get styles() {
    return css`
      ${SCPublicationEditionsStyles}
      :host {
        display: block;
      }
    `;
  }

  static get properties() {
    return {};
  }

  // constructor() {
  //   super();
  // }

  firstUpdated() {
    this._updateNav();
    reduxActions.changeToolbarTitle('Publications editions');
  }

  _updateNav() {
    const navArray = store.getState().navigationArray;
    const currentPath = store.getState().currentRoute.path;
    navArray.length = 1;
    navArray.push({
      title: 'Publications editions',
      url: `${currentPath}`,
      type: 'PublicationPage',
    });
    setNavigation(navArray);
  }

  render() {
    return html`
      <main>
        <article>
          <header class="page-header">
            <h1>SuttaCentral Editions</h1>
            <p class="subtitle">Selected translations as books in multiple formats</p>
          </header>
          <figure class="book-pic"><img src="/img/publication-pages/editions.jpg" alt="" /></figure>
          <section class="down-all">
            <h2 class="down-all-notice">Download all editions as a zip file</h2>
            <a
              class="button"
              href="https://github.com/suttacentral/editions/archive/refs/heads/main.zip"
              >Download</a
            >
            <p>
              <a href="https://github.com/suttacentral/editions">Or go to the source on Github.</a>
            </p>
          </section>
          <section class="project">
            <a href="/publication-edition/dn">
              <header>
                <h2 class="translation_title">Long Discourses</h2>
                <span class="translation_subtitle">A faithful translation of the Dīgha Nikāya</span>
              </header>
            </a>
            <p class="creator_name">Bhikkhu Sujato</p>
            <p class="publication_blurb">
              The Long Discourses (Dīgha Nikāya, abbreviated DN) is a collection of 34 discourses in
              in the Pali canon (Tipiṭaka) of the Theravāda school. The word “long” refers to the
              length of the individual discourses, not the collection as a whole, which is in fact
              the smallest of the five Pali Nikāyas. It is one of the fundamental collections of
              early Buddhist teachings, depicting the Buddha in a lively range of settings. Many of
              its extended narratives in diverse literary styles feature interreligious dialog with
              brahmins and other non-Buddhists.
            </p>
          </section>
          <section class="project">
            <a href="/publication-edition/mn">
              <header>
                <h2 class="translation_title">Middle Discourses</h2>
                <span class="translation_subtitle">A lucid translation of the Majjhima Nikāya</span>
              </header>
            </a>
            <p class="creator_name">Bhikkhu Sujato</p>
            <p class="publication_blurb">
              The Middle Discourses (Majjhima Nikāya) is a collection of 152 discourses in the Pali
              Pali canon (Tipiṭaka) that are of “middle” length. It is perhaps the most popular
              collection of early discourses, its teachings ranging from practical morality for
              children to challenging and abstruse philosophy. These teachings emerge as the Buddha
              encounters people from all walks of life in ancient India. More than any other
              collection, it reveals the full range of the Buddha in inspiration and wonder, in
              closely reasoned argumentation, and in deep abiding compassion.
            </p>
          </section>
          <section class="project">
            <a href="/publication-edition/sn">
              <header>
                <h2 class="translation_title">Linked Discourses</h2>
                <span class="translation_subtitle">A plain translation of the Saṁyutta Nikāya</span>
              </header>
            </a>
            <p class="creator_name">Bhikkhu Sujato</p>
            <p class="publication_blurb">
              The “Linked” or “Connected” Discourses (Saṁyutta Nikāya) is a collection of over a
              thousand short discourses organized by either a theme of Dhamma or the person who is
              speaking. It is the primary source work for fundamental themes such the five
              aggregates, dependent origination, the noble eightfold path, mindfulness meditation,
              and the four noble truths. The radical significance of these teachings is unpacked
              through systematic analysis leavened with parables, anecdotes, and similes.
            </p>
          </section>
          <section class="project">
            <a href="/publication-edition/an">
              <header>
                <h2 class="translation_title">Numbered Discourses</h2>
                <span class="translation_subtitle"
                  >A sensible translation of the Aṅguttara Nikāya</span
                >
              </header>
            </a>
            <p class="creator_name">Bhikkhu Sujato</p>
            <p class="publication_blurb">
              The “Numbered” or “Numerical” Discourses (Aṅguttara Nikāya) organizes texts in
              numbered sets, from one to eleven. Within each numerical set we find a diverse range
              of teachings, with an emphasis on practical application and teaching of the Dhamma for
              both lay folk and monastics. The teachings are short, memorable, and focussed, aiming
              to convey the essence of one subject in one session. Whether it is the “five topics
              for frequent recollection” or the “three kinds of luxurious seat enjoyed by the
              Buddha”, the teachings are easily digested and recalled.
            </p>
          </section>
          <section class="project">
            <a href="/publication-edition/dhp">
              <header>
                <h2 class="translation_title">Sayings of the Dhamma</h2>
                <span class="translation_subtitle">A meaningful translation of the Dhammapada</span>
              </header>
            </a>
            <p class="creator_name">Bhikkhu Sujato</p>
            <p class="publication_blurb">
              The Pali version of this famous text, consisting of 423 verses organized into
              memorable themes. It is the most widely read of the early texts, and has been
              translated many times into many languages. Versions are found in Chinese, Tibetan, and
              several Indic languages, attesting to its timeless, universal appeal.
            </p>
          </section>
          <section class="project">
            <a href="/publication-edition/ud">
              <header>
                <h2 class="translation_title">Heartfelt Sayings</h2>
                <span class="translation_subtitle">An uplifting translation of the Udāna</span>
              </header>
            </a>
            <p class="creator_name">Bhikkhu Sujato</p>
            <p class='publication_blurb'>The “Heartfelt Sayings” (Udāna) consists of eighty short discourses in mixed prose
              verse that are inspiring, accessible, and epigrammatic. It forms an ideal introduction
              to the Buddha’s teachings, a combination of simple, catchy, and profound that remains
              as popular today as it has ever been. The collection speaks of meditation, wisdom, and
              freedom in the context of stories that are dramatic and sometimes quirky, finding
              meaning in small personal events.
            </p>
          </section>
          <section class="project">
            <a href="/publication-edition/iti">
              <header>
                <h2 class="translation_title">So It Was Said</h2>
                <span class="translation_subtitle">A delectable translation of the Itivuttaka</span>
              </header>
            </a>
            <p class="creator_name">Bhikkhu Sujato</p>
            <p class="publication_blurb">
              112 short discourses in mixed prose and verse, arranged in the Aṅguttara style of
              ascending numbered sets, from one to four. Alone among Buddhist texts, its survival is
              attributed not to the Saṅgha, but to a laywoman named Khujjuttarā. According to the
              Pali commentaries, she was a maid to the Queen of Kosambi, and memorized these
              teachings from the Buddha, earning her the title of the most learned of the laywomen
              disciples.
            </p>
          </section>
          <section class="project">
            <a href="/publication-edition/snp">
              <header>
                <h2 class="translation_title">Anthology of Discourses</h2>
                <span class="translation_subtitle"
                  >A refreshing translation of the Suttanipāta</span
                >
              </header>
            </a>
            <p class="creator_name">Bhikkhu Sujato</p>
            <p class="publication_blurb">
              The “Anthology of Discourses” (Suttanipāta) contains 74 short texts in verse or mixed
              prose and verse, arranged in five chapters. It contains some of the most beloved texts
              in popular Buddhism, such as the Ratana, Maṅgala, and Mettā Suttas, which are known to
              all Theravada Buddhists and recited as uplifting and protective chants at auspicious
              ceremonies. Certain sections—the “Rhinoceros Horn”, the “Chapter of the Eights”, and
              the “Way to the Beyond”—are regarded as among the earliest of the Buddhist scriptures.
              scriptures.
            </p>
          </section>
          <section class="project">
            <a href="/publication-edition/thag">
              <header>
                <h2 class="translation_title">Verses of the Senior Monks</h2>
                <span class="translation_subtitle"
                  >An approachable translation of the Theragāthā</span
                >
              </header>
            </a>
            <p class="creator_name">Bhikkhu Sujato</p>
            <p class="publication_blurb">
              The “Verses of the Senior Monks” is a collection of about 1288 verses attributed to
              264 of the senior monks alive in the Buddha’s time, or in a few cases, a little later.
              It is a pair with the Therīgāthā, the “Verses of the Senior Nuns”. These verses
              celebrate the joy of freedom and the life of meditation in the forest. Together these
              collections preserve the unique voices of hundreds of early practitioners.
            </p>
          </section>
          <section class="project">
            <a href="/publication-edition/thig">
              <header>
                <h2 class="translation_title">Verses of the Senior Nuns</h2>
                <span class="translation_subtitle">A friendly translation of the Therīgāthā</span>
              </header>
            </a>
            <p class="creator_name">Bhikkhu Sujato</p>
            <p class="publication_blurb">
              The “Verses of the Senior Nuns” is a collection of about 524 verses attributed to 73
              73 of the senior nuns alive in the Buddha’s time or a little later. Celebrating the
              bliss of freedom and the life of meditation, the verses are full of proud and joyous
              proclamations of the nuns’ spiritual attainments and their gratitude to other nuns as
              guides and teachers. The Therīgāthā is one of the oldest spiritual texts anywhere that
              records primarily women’s voices. It is a pair with the Theragāthā, the “Verses of the
              Senior Monks”.
            </p>
          </section>
          <section class="project">
            <a href="/publication-edition/pli-tv-vi">
              <header>
                <h2 class="translation_title">Monastic Law</h2>
                <span class="translation_subtitle"
                  >A translation of the Pali Vinaya Piṭaka into English</span
                >
              </header>
            </a>
            <p class="creator_name">Bhikkhu Brahmali</p>
            <p class="publication_blurb">
              The texts on Monastic Law (vinaya) detail the lifestyle, rules, and procedures for
              Buddhist monks and nuns. They provide the guidelines for Buddhist monastics to this
              day, and in addition, paint a detailed and vivid picture of everyday life in ancient
              India.
            </p>
          </section>
        </article>
      </main>
    `;
  }
}

customElements.define('sc-publication-editions', ScPublicationEditions);
