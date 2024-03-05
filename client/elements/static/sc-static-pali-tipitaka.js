import { html } from 'lit';

import { SCStaticPage } from '../addons/sc-static-page';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

export class SCStaticPaliTipitaka extends SCStaticPage {
  createRenderRoot() {
    return this;
  }

  constructor() {
    super();
    this.localizedStringsPath = '/localization/elements/pali-tipitaka';
  }

  render() {
    return html`
      <style>
        span {
          display: inline-block;
          padding: 0.5rem 1rem;
        }

        main {
          display: flex;

          min-height: 100vh;
          margin: 2em;

          justify-content: center;
        }

        ul {
          display: flex;

          margin: 0;
          padding: 0;

          list-style-type: none;
        }

        li {
          line-height: 1.25;

          display: inline-block;
        }

        .vertical {
          flex-direction: column;

          text-align: left;
        }

        .horizontal {
          flex-direction: row;

          text-align: center;
        }

        h1 {
          font-size: var(--sc-font-size-xxxl);
          font-weight: normal;

          font-variant-caps: all-small-caps;
        }

        .second {
          font-size: var(--sc-font-size-xxl);
        }

        .second a {
          display: block;

          margin: 1rem 1rem 0;
          padding: 1rem 0.5rem 0.5rem;

          border-bottom: 1px solid #ccc;
        }

        .third a {
          height: 3.8rem;
          margin: 0;

          border-bottom: none;
          border-radius: 0.5rem;
        }

        .third {
          font-size: var(--sc-font-size-md);
          font-weight: bold;

          margin: 0.5rem 1em 0;

          text-align: left;
        }

        .fourth {
          font-size: var(--sc-font-size-md);
          font-weight: normal;

          width: 16rem;
        }

        .fourth a {
          padding-top: 0.5rem;
        }

        .fifth {
          font-style: italic;

          padding-left: 1rem;
        }

        .vertical .third {
          font-weight: bold;
        }

        root {
          display: block;

          font-family: var(--sc-serif-font);
        }

        translation {
          font-family: var(--sc-sans-font);

          color: var(--sc-on-primary-secondary-text-color);
        }

        li a {
          text-decoration: none;
        }

        li a:hover {
          background-color: var(--sc-tertiary-background-color);

          text-decoration: none;
        }

        li a:hover translation {
          color: var(--sc-primary-color);
        }

        @media only screen and (max-width: 2400px) {
          .horizontal .second {
            flex-direction: column;

            align-items: center;
          }
        }

        @media only screen and (max-width: 1300px) {
          .horizontal .third {
            flex-direction: column;

            align-items: center;
          }
        }
      </style>
      <main>
        <article>
          <ul class="horizontal first">
            <li>
              <h1>
                <root>Pāḷi Tipiṭaka</root>
                <translation>${unsafeHTML(this.localize('palitipitaka:palitipitaka'))}</translation>
              </h1>
              <ul class="horizontal second">
                <li>
                  <a href="https://suttacentral.net/pli-tv-vi">
                    <root>Vinayapiṭaka</root>
                    <translation>${unsafeHTML(this.localize('palitipitaka:vinayapitaka'))}</translation>
                  </a>
                  <ul class="horizontal third">
                    <li>
                      <a href="https://suttacentral.net/">
                        <root>Suttavibhaṅga</root>
                        <translation>${unsafeHTML(this.localize('vinayapitaka:suttavibhanga'))}</translation>
                      </a>
                      <ul class="vertical fourth">
                        <li>
                          <a href="https://suttacentral.net/pli-tv-bu-vb">
                            <root>Bhikkhuvibhaṅga</root>
                            <translation>${unsafeHTML(this.localize('suttavibhanga:bhikkhuvibhanga'))}</translation>
                          </a>
                          <ul class="vertical fifth">
                            <li>
                              <a href="https://suttacentral.net/pli-tv-bu-vb-pj">
                                <root>Pārājika</root>
                                <translation>${unsafeHTML(this.localize('bhikkhuvibhanga:parajika'))}</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/pli-tv-bu-vb-ss">
                                <root>Saṅghādisesa</root>
                                <translation>${unsafeHTML(this.localize('bhikkhuvibhanga:sanghadisesa'))}</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/pli-tv-bu-vb-ay">
                                <root>Aniyata</root>
                                <translation>${unsafeHTML(this.localize('bhikkhuvibhanga:aniyata'))}</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/pli-tv-bu-vb-np">
                                <root>Nissaggiya Pācittiya</root>
                                <translation>${unsafeHTML(this.localize('bhikkhuvibhanga:nissaggiyaPacittiya'))}</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/pli-tv-bu-vb-pc">
                                <root>Pācittiya</root>
                                <translation>${unsafeHTML(this.localize('bhikkhuvibhanga:pacittiya'))}</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/pli-tv-bu-vb-pd">
                                <root>Pāṭidesanīya</root>
                                <translation>${unsafeHTML(this.localize('bhikkhuvibhanga:patidesaniya'))}</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/pli-tv-bu-vb-sk">
                                <root>Sekhiya</root>
                                <translation>${unsafeHTML(this.localize('bhikkhuvibhanga:sekhiya'))}</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/pli-tv-bu-vb-as">
                                <root>Adhikaraṇasamatha</root>
                                <translation>${unsafeHTML(this.localize('bhikkhuvibhanga:adhikaranasamatha'))}</translation>
                              </a>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <a href="https://suttacentral.net/pli-tv-bi-vb">
                            <root>Bhikkhunīvibhaṅga</root>
                            <translation>${unsafeHTML(this.localize('suttavibhanga:bhikkhunivibhanga'))}</translation>
                          </a>
                          <ul class="vertical fifth">
                            <li>
                              <a href="https://suttacentral.net/pli-tv-bi-vb-pj">
                                <root>Pārājika</root>
                                <translation>${unsafeHTML(this.localize('bhikkhunivibhanga:parajika'))}</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/pli-tv-bi-vb-ss">
                                <root>Saṅghādisesa</root>
                                <translation>${unsafeHTML(this.localize('bhikkhunivibhanga:sanghadisesa'))}</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/pli-tv-bi-vb-np">
                                <root>Nissaggiya Pācittiya</root>
                                <translation>${unsafeHTML(this.localize('bhikkhunivibhanga:nissaggiyaPacittiya'))}</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/pli-tv-bi-vb-pc">
                                <root>Pācittiya</root>
                                <translation>${unsafeHTML(this.localize('bhikkhunivibhanga:pacittiya'))}</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/pli-tv-bi-vb-pd">
                                <root>Pāṭidesanīya</root>
                                <translation>${unsafeHTML(this.localize('bhikkhunivibhanga:patidesaniya'))}</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/pli-tv-bi-vb-sk">
                                <root>Sekhiya</root>
                                <translation>${unsafeHTML(this.localize('bhikkhunivibhanga:sekhiya'))}</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/pli-tv-bi-vb-as">
                                <root>Adhikaraṇasamatha</root>
                                <translation>${unsafeHTML(this.localize('bhikkhunivibhanga:adhikaranasamatha'))}</translation>
                              </a>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a href="https://suttacentral.net/pli-tv-kd">
                        <root>Khandhaka</root>
                        <translation>${unsafeHTML(this.localize('vinayapitaka:khandhaka'))}</translation>
                      </a>
                      <ul class="vertical fourth">
                        <li>
                          <a href="https://suttacentral.net/">
                            <root>Mahāvagga</root>
                            <translation>${unsafeHTML(this.localize('vinayapitaka:mahavagga'))}</translation>
                          </a>
                          <ul class="vertical fifth">
                            <li>
                              <a href="https://suttacentral.net/pli-tv-kd1">
                                <root>Mahākhandhaka</root>
                                <translation>${unsafeHTML(this.localize('mahavagga:mahakhandhaka'))}</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/pli-tv-kd2">
                                <root>Uposathakkhandhaka</root>
                                <translation>${unsafeHTML(this.localize('mahavagga:uposathakkhandhaka'))}</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/pli-tv-kd3">
                                <root>Vassūpanāyikakkhandhaka</root>
                                <translation>${unsafeHTML(this.localize('mahavagga:vassupanayikakkhandhaka'))}</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/pli-tv-kd4">
                                <root>Pavāraṇākkhandhaka</root>
                                <translation>${unsafeHTML(this.localize('mahavagga:pavaranakkhandhaka'))}</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/pli-tv-kd5">
                                <root>Cammakkhandhaka</root>
                                <translation>${unsafeHTML(this.localize('mahavagga:cammakkhandhaka'))}</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/pli-tv-kd6">
                                <root>Bhesajjakkhandhaka</root>
                                <translation>${unsafeHTML(this.localize('mahavagga:bhesajjakkhandhaka'))}</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/pli-tv-kd7">
                                <root>Kathinakkhandhaka</root>
                                <translation>${unsafeHTML(this.localize('mahavagga:kathinakkhandhaka'))}</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/pli-tv-kd8">
                                <root>Cīvarakkhandhaka</root>
                                <translation>${unsafeHTML(this.localize('mahavagga:civarakkhandhaka'))}</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/pli-tv-kd9">
                                <root>Campeyyakkhandhaka</root>
                                <translation>${unsafeHTML(this.localize('mahavagga:campeyyakkhandhaka'))}</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/pli-tv-kd10">
                                <root>Kosambakakkhandhaka</root>
                                <translation>${unsafeHTML(this.localize('mahavagga:kosambakakkhandhaka'))}</translation>
                              </a>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <a href="https://suttacentral.net/">
                            <root>Cūḷavagga</root>
                            <translation>${unsafeHTML(this.localize('vinayapitaka:culavagga'))}</translation>
                          </a>
                          <ul class="vertical fifth">
                            <li>
                              <a href="https://suttacentral.net/pli-tv-kd11">
                                <root>Kammakkhandhaka</root>
                                <translation>${unsafeHTML(this.localize('culavagga:kammakkhandhaka'))}</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/pli-tv-kd12">
                                <root>Pārivāsikakkhandhaka</root>
                                <translation>${unsafeHTML(this.localize('culavagga:parivasikakkhandhaka'))}</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/pli-tv-kd13">
                                <root>Samuccayakkhandhaka</root>
                                <translation>${unsafeHTML(this.localize('culavagga:samuccayakkhandhaka'))}</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/pli-tv-kd14">
                                <root>Samathakkhandhaka</root>
                                <translation>${unsafeHTML(this.localize('culavagga:samathakkhandhaka'))}</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/pli-tv-kd15">
                                <root>Khuddakavatthukkhandhaka</root>
                                <translation>${unsafeHTML(this.localize('culavagga:khuddakavatthukkhandhaka'))}</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/pli-tv-kd16">
                                <root>Senāsanakkhandhaka</root>
                                <translation>${unsafeHTML(this.localize('culavagga:senasanakkhandhaka'))}</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/pli-tv-kd17">
                                <root>Saṁghabhedakakkhandhaka</root>
                                <translation>${unsafeHTML(this.localize('culavagga:samghabhedakakkhandhaka'))}</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/pli-tv-kd18">
                                <root>Vattakkhandhaka</root>
                                <translation>${unsafeHTML(this.localize('culavagga:vattakkhandhaka'))}</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/pli-tv-kd19">
                                <root>Pātimokkhaṭṭhapanakkhandhaka</root>
                                <translation>${unsafeHTML(this.localize('culavagga:patimokkhatthapanakkhandhaka'))}</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/pli-tv-kd20">
                                <root>Bhikkhunikkhandhaka</root>
                                <translation>${unsafeHTML(this.localize('culavagga:bhikkhunikkhandhaka'))}</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/pli-tv-kd21">
                                <root>Pañcasatikakkhandhaka</root>
                                <translation>${unsafeHTML(this.localize('culavagga:pancasatikakkhandhaka'))}</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/pli-tv-kd22">
                                <root>Sattasatikakkhandhaka</root>
                                <translation>${unsafeHTML(this.localize('culavagga:sattasatikakkhandhaka'))}</translation>
                              </a>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a href="https://suttacentral.net/pli-tv-pvr">
                        <root>Parivāra</root>
                        <translation>${unsafeHTML(this.localize('vinayapitaka:parivara'))}</translation>
                      </a>
                      <ul class="vertical fourth">
                        <li>
                          <a href="https://suttacentral.net/pli-tv-pvr1.1">
                            <root>Katthapaññattivāra</root>
                            <translation>${unsafeHTML(this.localize('parivara:katthapannattivara1'))}</translation>
                          </a>
                        </li>
                        <li>
                          <a href="https://suttacentral.net/pli-tv-pvr2.1">
                            <root>Katthapaññattivāra</root>
                            <translation>${unsafeHTML(this.localize('parivara:katthapannattivara2'))}</translation>
                          </a>
                        </li>
                        <li>
                          <a href="https://suttacentral.net/pli-tv-pvr3">
                            <root>Samuṭṭhānasīsasaṅkhepa</root>
                            <translation>${unsafeHTML(this.localize('parivara:samutthanasisasankhepa'))}</translation>
                          </a>
                        </li>
                        <li>
                          <a href="https://suttacentral.net/pli-tv-pvr4">
                            <root>Antarapeyyāla</root>
                            <translation>${unsafeHTML(this.localize('parivara:antarapeyyala'))}</translation>
                          </a>
                        </li>
                        <li>
                          <a href="https://suttacentral.net/pli-tv-pvr5">
                            <root>Samathabheda</root>
                            <translation>${unsafeHTML(this.localize('parivara:samathabheda'))}</translation>
                          </a>
                        </li>
                        <li>
                          <a href="https://suttacentral.net/pli-tv-pvr6">
                            <root>Khandhakapucchāvāra</root>
                            <translation>${unsafeHTML(this.localize('parivara:khandhakapucchavara'))}</translation>
                          </a>
                        </li>
                        <li>
                          <a href="https://suttacentral.net/pli-tv-pvr7">
                            <root>Ekuttarikanaya</root>
                            <translation>${unsafeHTML(this.localize('parivara:ekuttarikanaya'))}</translation>
                          </a>
                        </li>
                        <li>
                          <a href="https://suttacentral.net/pli-tv-pvr8">
                            <root>Uposathādipucchāvissajjanā</root>
                            <translation>${unsafeHTML(this.localize('parivara:uposathadipucchavissajjana'))}</translation>
                          </a>
                        </li>
                        <li>
                          <a href="https://suttacentral.net/pli-tv-pvr9">
                            <root>Atthavasapakaraṇa</root>
                            <translation>${unsafeHTML(this.localize('parivara:atthavasapakarana'))}</translation>
                          </a>
                        </li>
                        <li>
                          <a href="https://suttacentral.net/pli-tv-pvr10">
                            <root>Gāthāsaṅgaṇika</root>
                            <translation>${unsafeHTML(this.localize('parivara:gathasanganika'))}</translation>
                          </a>
                        </li>
                        <li>
                          <a href="https://suttacentral.net/pli-tv-pvr11">
                            <root>Adhikaraṇabheda</root>
                            <translation>${unsafeHTML(this.localize('parivara:adhikaranabheda'))}</translation>
                          </a>
                        </li>
                        <li>
                          <a href="https://suttacentral.net/pli-tv-pvr12">
                            <root>Codanādipucchāvissajjanā</root>
                            <translation>${unsafeHTML(this.localize('parivara:codanadipucchavissajjana'))}</translation>
                          </a>
                        </li>
                        <li>
                          <a href="https://suttacentral.net/pli-tv-pvr13">
                            <root>Codanākaṇḍa</root>
                            <translation>${unsafeHTML(this.localize('parivara:codanakanda'))}</translation>
                          </a>
                        </li>
                        <li>
                          <a href="https://suttacentral.net/pli-tv-pvr14">
                            <root>Anuvijjakassapaṭipatti</root>
                            <translation>${unsafeHTML(this.localize('parivara:anuvijjakassapatipatti'))}</translation>
                          </a>
                        </li>
                        <li>
                          <a href="https://suttacentral.net/pli-tv-pvr15">
                            <root>Mahāsaṅgāma</root>
                            <translation>${unsafeHTML(this.localize('parivara:mahasangama'))}</translation>
                          </a>
                        </li>
                        <li>
                          <a href="https://suttacentral.net/pli-tv-pvr16">
                            <root>Kathinabheda</root>
                            <translation>${unsafeHTML(this.localize('parivara:kathinabheda'))}</translation>
                          </a>
                        </li>
                        <li>
                          <a href="https://suttacentral.net/pli-tv-pvr17">
                            <root>Upālipañcaka</root>
                            <translation>${unsafeHTML(this.localize('parivara:upalipajncaka'))}</translation>
                          </a>
                        </li>
                        <li>
                          <a href="https://suttacentral.net/pli-tv-pvr18">
                            <root>Atthāpattisamuṭṭhāna</root>
                            <translation>${unsafeHTML(this.localize('parivara:atthapattisamutthana'))}</translation>
                          </a>
                        </li>
                        <li>
                          <a href="https://suttacentral.net/pli-tv-pvr19">
                            <root>Dutiyagāthāsaṅgaṇika</root>
                            <translation>${unsafeHTML(this.localize('parivara:dutiyagathasanganik'))}</translation>
                          </a>
                        </li>
                        <li>
                          <a href="https://suttacentral.net/pli-tv-pvr20">
                            <root>Sedamocanagāthā</root>
                            <translation>${unsafeHTML(this.localize('parivara:sedamocanagatha'))}</translation>
                          </a>
                        </li>
                        <li>
                          <a href="https://suttacentral.net/pli-tv-pvr21">
                            <root>Pañcavagga</root>
                            <translation>${unsafeHTML(this.localize('parivara:pajncavagga'))}</translation>
                          </a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="https://suttacentral.net/sutta">
                    <root>Suttapiṭaka</root>
                    <translation>${unsafeHTML(this.localize('palitipitaka:suttapitaka'))}</translation>
                  </a>
                  <ul class="horizontal third">
                    <li>
                      <a href="https://suttacentral.net/dn">
                        <root>Dīghanikāya</root>
                        <translation>${unsafeHTML(this.localize('suttapitaka:dighanikaya'))}</translation>
                      </a>
                      <ul class="vertical fourth">
                        <li>
                          <a href="https://suttacentral.net/dn-silakkhandhavagga">
                            <root>Sīlakkhandhavagga</root>
                            <translation>${unsafeHTML(this.localize('dighanikaya:silakkhandhavagga'))}</translation>
                          </a>
                        </li>
                        <li>
                          <a href="https://suttacentral.net/dn-mahavagga">
                            <root>Mahāvagga</root>
                            <translation>${unsafeHTML(this.localize('dighanikaya:mahavagga'))}</translation>
                          </a>
                        </li>
                        <li>
                          <a href="https://suttacentral.net/dn-pathikavagga">
                            <root>Pāthikavagga</root>
                            <translation>${unsafeHTML(this.localize('dighanikaya:pathikavagga'))}</translation>
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a href="https://suttacentral.net/mn">
                        <root>Majjhimanikāya</root>
                        <translation>${unsafeHTML(this.localize('suttapitaka:majjhimanikaya'))}</translation>
                      </a>
                      <ul class="vertical fourth">
                        <li>
                          <a href="https://suttacentral.net/mn-mulapannasa">
                            <root>Mūlapaṇṇāsa</root>
                            <translation>${unsafeHTML(this.localize('majjhimanikaya:mulapannasa'))}</translation>
                          </a>
                          <ul class="vertical fifth">
                            <li>
                              <a href="https://suttacentral.net/mn-mulapariyayavagga">
                                <root>Mūlapariyāyavagga</root>
                                <translation>${unsafeHTML(this.localize('mulapannasa:mulapariyayavagga'))}</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/mn-sihanadavagga">
                                <root>Sīhanādavagga</root>
                                <translation>${unsafeHTML(this.localize('mulapannasa:sihanadavagga'))}</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/mn-opammavagga">
                                <root>Opammavagga</root>
                                <translation>${unsafeHTML(this.localize('mulapannasa:opammavagga'))}</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/mn-mahayamakavagga">
                                <root>Mahāyamakavagga</root>
                                <translation>${unsafeHTML(this.localize('mulapannasa:mahayamakavagg'))}</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/mn-culayamakavagga">
                                <root>Cūḷayamakavagga</root>
                                <translation>${unsafeHTML(this.localize('mulapannasa:culayamakavagga'))}</translation>
                              </a>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <a href="https://suttacentral.net/mn-majjhimapannasa">
                            <root>Majjhimapaṇṇāsa</root>
                            <translation>${unsafeHTML(this.localize('majjhimanikaya:majjhimapannasa'))}</translation>
                          </a>
                          <ul class="vertical fifth">
                            <li>
                              <a href="https://suttacentral.net/mn-gahapativagga">
                                <root>Gahapativagga</root>
                                <translation>${unsafeHTML(this.localize('majjhimapannasa:gahapativagga'))}</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/mn-bhikkhuvagga">
                                <root>Bhikkhuvagga</root>
                                <translation>${unsafeHTML(this.localize('majjhimapannasa:bhikkhuvagga'))}</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/mn-paribbajakavagga">
                                <root>Paribbājakavagga</root>
                                <translation>${unsafeHTML(this.localize('majjhimapannasa:paribbajakavagga'))}</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/mn-rajavagga">
                                <root>Rājavagga</root>
                                <translation>${unsafeHTML(this.localize('majjhimapannasa:rajavagga'))}</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/mn-brahmanavagga">
                                <root>Brāhmaṇavagga</root>
                                <translation>${unsafeHTML(this.localize('majjhimapannasa:brahmanavagga'))}</translation>
                              </a>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <a href="https://suttacentral.net/mn-uparipannasa">
                            <root>Uparipaṇṇāsa</root>
                            <translation>${unsafeHTML(this.localize('majjhimanikaya:uparipannasa'))}</translation>
                          </a>
                          <ul class="vertical fifth">
                            <li>
                              <a href="https://suttacentral.net/mn-devadahavagga">
                                <root>Devadahavagga</root>
                                <translation>${unsafeHTML(this.localize('uparipannasa:devadahavagga'))}</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/mn-anupadavagga">
                                <root>Anupadavagga</root>
                                <translation>${unsafeHTML(this.localize('uparipannasa:anupadavagga'))}</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/mn-sunnatavagga">
                                <root>Suññatavagga</root>
                                <translation>${unsafeHTML(this.localize('uparipannasa:sujnjnatavagga'))}</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/mn-vibhangavagga">
                                <root>Vibhaṅgavagga</root>
                                <translation>${unsafeHTML(this.localize('uparipannasa:vibhangavagga'))}</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/mn-salayatanavagga">
                                <root>Saḷāyatanavagga</root>
                                <translation>${unsafeHTML(this.localize('uparipannasa:salayatanavagga'))}</translation>
                              </a>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a href="https://suttacentral.net/pitaka/sutta/linked/sn">
                        <root>Saṁyuttanikāya</root>
                        <translation>${unsafeHTML(this.localize('suttapitaka:samyuttanikaya'))}</translation>
                      </a>
                      <ul class="vertical fourth">
                        <li>
                          <a href="https://suttacentral.net/sn-sagathavaggasamyutta">
                            <root>Sagāthāvaggasaṁyutta</root>
                            <translation>${unsafeHTML(this.localize('samyuttanikaya:sagathavaggasamyutta'))}</translation>
                          </a>
                          <ul class="vertical fifth samyutta">
                            <li>
                              <a href="https://suttacentral.net/sn1">
                                <root>Devatāsaṁyutta</root>
                                <translation>${unsafeHTML(this.localize('sagathavaggasamyutta:devatasamyutta'))}</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/sn2">
                                <root>Devaputtasaṁyutta</root>
                                <translation>${unsafeHTML(this.localize('sagathavaggasamyutta:devaputtasamyutta'))}</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/sn3">
                                <root>Kosalasaṁyutta</root>
                                <translation>${unsafeHTML(this.localize('sagathavaggasamyutta:kosalasamyutta'))}</translation
                                >
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/sn4">
                                <root>Mārasaṁyutta</root>
                                <translation>${unsafeHTML(this.localize('sagathavaggasamyutta:marasamyutta'))}</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/sn5">
                                <root>Bhikkhunīsaṁyutta</root>
                                <translation>${unsafeHTML(this.localize('sagathavaggasamyutta:bhikkhunisamyutta'))}</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/sn6">
                                <root>Brahmasaṁyutta</root>
                                <translation>${unsafeHTML(this.localize('sagathavaggasamyutta:brahmasamyutta'))}</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/sn7">
                                <root>Brāhmaṇasaṁyutta</root>
                                <translation>${unsafeHTML(this.localize('sagathavaggasamyutta:brahmanasamyutta'))}</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/sn8">
                                <root>Vaṅgīsasaṁyutta</root>
                                <translation>${unsafeHTML(this.localize('sagathavaggasamyutta:vangisasamyutta'))}</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/sn9">
                                <root>Vanasaṁyutta</root>
                                <translation>${unsafeHTML(this.localize('sagathavaggasamyutta:vanasamyutta'))}</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/sn10">
                                <root>Yakkhasaṁyutta</root>
                                <translation>${unsafeHTML(this.localize('sagathavaggasamyutta:yakkhasamyutta'))}</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/sn11">
                                <root>Sakkasaṁyutta</root>
                                <translation>${unsafeHTML(this.localize('sagathavaggasamyutta:sakkasamyutta'))}</translation>
                              </a>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <a href="https://suttacentral.net/sn-nidanavaggasamyutta">
                            <root>Nidānavaggasaṁyutta</root>
                            <translation>${unsafeHTML(this.localize('samyuttanikaya:nidanavaggasamyutta'))}</translation
                            >
                          </a>
                          <ul class="vertical fifth samyutta">
                            <li>
                              <a href="https://suttacentral.net/sn12">
                                <root>Nidānasaṁyutta</root>
                                <translation>${unsafeHTML(this.localize('nidanavaggasamyutta:nidanasamyutta'))}</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/sn13">
                                <root>Abhisamayasaṁyutta</root>
                                <translation>${unsafeHTML(this.localize('nidanavaggasamyutta:abhisamayasamyutta'))}</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/sn14">
                                <root>Dhātusaṁyutta</root>
                                <translation>${unsafeHTML(this.localize('nidanavaggasamyutta:dhatusamyutta'))}</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/sn15">
                                <root>Anamataggasaṁyutta</root>
                                <translation>${unsafeHTML(this.localize('nidanavaggasamyutta:anamataggasamyutta'))}</translation
                                >
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/sn16">
                                <root>Kassapasaṁyutta</root>
                                <translation>${unsafeHTML(this.localize('nidanavaggasamyutta:kassapasamyutta'))}</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/sn17">
                                <root>Lābhasakkārasaṁyutta</root>
                                <translation>${unsafeHTML(this.localize('nidanavaggasamyutta:labhasakkarasamyutta'))}</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/sn18">
                                <root>Rāhulasaṁyutta</root>
                                <translation>${unsafeHTML(this.localize('nidanavaggasamyutta:rahulasamyutta'))}</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/sn19">
                                <root>Lakkhaṇasaṁyutta</root>
                                <translation>${unsafeHTML(this.localize('nidanavaggasamyutta:lakkhanasamyutta'))}</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/sn20">
                                <root>Opammasaṁyutta</root>
                                <translation>${unsafeHTML(this.localize('nidanavaggasamyutta:opammasamyutta'))}</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/sn21">
                                <root>Bhikkhusaṁyutta</root>
                                <translation>${unsafeHTML(this.localize('nidanavaggasamyutta:bhikkhusamyutta'))}</translation>
                              </a>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <a href="https://suttacentral.net/sn-khandhavaggasamyutta">
                            <root>Khandhavaggasaṁyutta</root>
                            <translation>${unsafeHTML(this.localize('samyuttanikaya:khandhavaggasamyutta'))}</translation>
                          </a>
                          <ul class="vertical fifth samyutta">
                            <li>
                              <a href="https://suttacentral.net/sn22">
                                <root>Khandhasaṁyutta</root>
                                <translation>${unsafeHTML(this.localize('khandhavaggasamyutta:khandhasamyutta'))}</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/sn23">
                                <root>Rādhasaṁyutta</root>
                                <translation>${unsafeHTML(this.localize('khandhavaggasamyutta:radhasamyutta'))}</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/sn24">
                                <root>Diṭṭhisaṁyutta</root>
                                <translation>${unsafeHTML(this.localize('khandhavaggasamyutta:ditthisamyutta'))}</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/sn25">
                                <root>Okkantasaṁyutta</root>
                                <translation>${unsafeHTML(this.localize('khandhavaggasamyutta:okkantasamyutta'))}</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/sn26">
                                <root>Uppādasaṁyutta</root>
                                <translation>${unsafeHTML(this.localize('khandhavaggasamyutta:uppadasamyutta'))}</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/sn27">
                                <root>Kilesasaṁyutta</root>
                                <translation>${unsafeHTML(this.localize('khandhavaggasamyutta:kilesasamyutta'))}</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/sn28">
                                <root>Sāriputtasaṁyutta</root>
                                <translation>${unsafeHTML(this.localize('khandhavaggasamyutta:sariputtasamyutta'))}</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/sn29">
                                <root>Nāgasaṁyutta</root>
                                <translation>${unsafeHTML(this.localize('khandhavaggasamyutta:nagasamyutta'))}</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/sn30">
                                <root>Supaṇṇasaṁyutta</root>
                                <translation>${unsafeHTML(this.localize('khandhavaggasamyutta:supannasamyutta'))}</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/sn31">
                                <root>Gandhabbakāyasaṁyutta</root>
                                <translation>${unsafeHTML(this.localize('khandhavaggasamyutta:gandhabbakayasamyutta'))}</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/sn32">
                                <root>Valāhakasaṁyutta</root>
                                <translation>${unsafeHTML(this.localize('khandhavaggasamyutta:valahakasamyutta'))}</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/sn33">
                                <root>Vacchagottasaṁyutta</root>
                                <translation>${unsafeHTML(this.localize('khandhavaggasamyutta:vacchagottasamyutta'))}</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/sn34">
                                <root>Jhānasaṁyutta</root>
                                <translation>${unsafeHTML(this.localize('khandhavaggasamyutta:jhanasamyutta'))}</translation>
                              </a>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <a href="https://suttacentral.net/sn-salayatanavaggasamyutta">
                            <root>Saḷāyatanavaggasaṁyutta</root>
                            <translation>${unsafeHTML(this.localize('samyuttanikaya:salayatanavaggasamyutta'))}</translation>
                          </a>
                          <ul class="vertical fifth samyutta">
                            <li>
                              <a href="https://suttacentral.net/sn35">
                                <root>Saḷāyatanasaṁyutta</root>
                                <translation>${unsafeHTML(this.localize('salayatanavaggasamyutta:salayatanasamyutta'))}</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/sn36">
                                <root>Vedanāsaṁyutta</root>
                                <translation>${unsafeHTML(this.localize('salayatanavaggasamyutta:vedanasamyutta'))}</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/sn37">
                                <root>Mātugāmasaṁyutta</root>
                                <translation>${unsafeHTML(this.localize('salayatanavaggasamyutta:matugamasamyutta'))}</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/sn38">
                                <root>Jambukhādakasaṁyutta</root>
                                <translation>${unsafeHTML(this.localize('salayatanavaggasamyutta:jambukhadakasamyutta'))}</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/sn39">
                                <root>Sāmaṇḍakasaṁyutta</root>
                                <translation>${unsafeHTML(this.localize('salayatanavaggasamyutta:samandakasamyutta'))}</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/sn40">
                                <root>Moggallānasaṁyutta</root>
                                <translation>${unsafeHTML(this.localize('salayatanavaggasamyutta:moggallanasamyutta'))}</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/sn41">
                                <root>Cittasaṁyutta</root>
                                <translation>${unsafeHTML(this.localize('salayatanavaggasamyutta:cittasamyutta'))}</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/sn42">
                                <root>Gāmaṇisaṁyutta</root>
                                <translation>${unsafeHTML(this.localize('salayatanavaggasamyutta:gamanisamyutta'))}</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/sn43">
                                <root>Asaṅkhatasaṁyutta</root>
                                <translation>${unsafeHTML(this.localize('salayatanavaggasamyutta:asankhatasamyutta'))}</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/sn44">
                                <root>Abyākatasaṁyutta</root>
                                <translation>${unsafeHTML(this.localize('salayatanavaggasamyutta:abyakatasamyutta'))}</translation>
                              </a>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <a href="https://suttacentral.net/sn-mahavaggasamyutta">
                            <root>Mahāvaggasaṁyutta</root>
                            <translation>${unsafeHTML(this.localize('samyuttanikaya:mahavaggasamyutta'))}</translation>
                          </a>
                          <ul class="vertical fifth samyutta">
                            <li>
                              <a href="https://suttacentral.net/sn45">
                                <root>Maggasaṁyutta</root>
                                <translation>${unsafeHTML(this.localize('mahavaggasamyutta:maggasamyutta'))}</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/sn46">
                                <root>Bojjhaṅgasaṁyutta</root>
                                <translation>${unsafeHTML(this.localize('mahavaggasamyutta:bojjhangasamyutta'))}</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/sn47">
                                <root>Satipaṭṭhānasaṁyutta</root>
                                <translation>${unsafeHTML(this.localize('mahavaggasamyutta:satipatthanasamyutta'))}</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/sn48">
                                <root>Indriyasaṁyutta</root>
                                <translation>${unsafeHTML(this.localize('mahavaggasamyutta:indriyasamyutta'))}</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/sn49">
                                <root>Sammappadhānasaṁyutta</root>
                                <translation>${unsafeHTML(this.localize('mahavaggasamyutta:sammappadhanasamyutta'))}</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/sn50">
                                <root>Balasaṁyutta</root>
                                <translation>${unsafeHTML(this.localize('mahavaggasamyutta:balasamyutta'))}</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/sn51">
                                <root>Iddhipādasaṁyutta</root>
                                <translation>${unsafeHTML(this.localize('mahavaggasamyutta:iddhipadasamyutta'))}</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/sn52">
                                <root>Anuruddhasaṁyutta</root>
                                <translation>${unsafeHTML(this.localize('mahavaggasamyutta:anuruddhasamyutta'))}</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/sn53">
                                <root>Jhānasaṁyutta</root>
                                <translation>${unsafeHTML(this.localize('mahavaggasamyutta:jhanasamyutta'))}</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/sn54">
                                <root>Ānāpānasaṁyutta</root>
                                <translation>${unsafeHTML(this.localize('mahavaggasamyutta:anapanasamyutta'))}</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/sn55">
                                <root>Sotāpattisaṁyutta</root>
                                <translation>${unsafeHTML(this.localize('mahavaggasamyutta:sotapattisamyutta'))}</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/sn56">
                                <root>Saccasaṁyutta</root>
                                <translation>${unsafeHTML(this.localize('mahavaggasamyutta:saccasamyutta'))}</translation>
                              </a>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a href="https://suttacentral.net/pitaka/sutta/numbered/an">
                        <root>Aṅguttaranikāya</root>
                        <translation>${unsafeHTML(this.localize('suttapitaka:anguttaranikaya'))}</translation>
                      </a>
                      <ul class="vertical fourth">
                        <li>
                          <a href="https://suttacentral.net/an1">
                            <root>Ekakanipāta</root>
                            <translation>${unsafeHTML(this.localize('anguttaranikaya:ekakanipata'))}</translation>
                          </a>
                        </li>
                        <li>
                          <a href="https://suttacentral.net/an2">
                            <root>Dukanipāta</root>
                            <translation>${unsafeHTML(this.localize('anguttaranikaya:dukanipata'))}</translation>
                          </a>
                        </li>
                        <li>
                          <a href="https://suttacentral.net/an3">
                            <root>Tikanipāta</root>
                            <translation>${unsafeHTML(this.localize('anguttaranikaya:tikanipata'))}</translation>
                          </a>
                        </li>
                        <li>
                          <a href="https://suttacentral.net/an4">
                            <root>Catukkanipāta</root>
                            <translation>${unsafeHTML(this.localize('anguttaranikaya:catukkanipata'))}</translation>
                          </a>
                        </li>
                        <li>
                          <a href="https://suttacentral.net/an5">
                            <root>Pañcakanipāta</root>
                            <translation>${unsafeHTML(this.localize('anguttaranikaya:pajncakanipata'))}</translation>
                          </a>
                        </li>
                        <li>
                          <a href="https://suttacentral.net/an6">
                            <root>Chakkanipāta</root>
                            <translation>${unsafeHTML(this.localize('anguttaranikaya:chakkanipata'))}</translation>
                          </a>
                        </li>
                        <li>
                          <a href="https://suttacentral.net/an7">
                            <root>Sattakanipāta</root>
                            <translation>${unsafeHTML(this.localize('anguttaranikaya:sattakanipata'))}</translation>
                          </a>
                        </li>
                        <li>
                          <a href="https://suttacentral.net/an8">
                            <root>Aṭṭhakanipāta</root>
                            <translation>${unsafeHTML(this.localize('anguttaranikaya:atthakanipata'))}</translation>
                          </a>
                        </li>
                        <li>
                          <a href="https://suttacentral.net/an9">
                            <root>Navakanipāta</root>
                            <translation>${unsafeHTML(this.localize('anguttaranikaya:navakanipata'))}</translation>
                          </a>
                        </li>
                        <li>
                          <a href="https://suttacentral.net/an10">
                            <root>Dasakanipāta</root>
                            <translation>${unsafeHTML(this.localize('anguttaranikaya:dasakanipata'))}</translation>
                          </a>
                        </li>
                        <li>
                          <a href="https://suttacentral.net/an11">
                            <root>Ekādasakanipāta</root>
                            <translation>${unsafeHTML(this.localize('anguttaranikaya:ekadasakanipata'))}</translation>
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a href="https://suttacentral.net/kn">
                        <root>Khuddakanikāya</root>
                        <translation>${unsafeHTML(this.localize('suttapitaka:khuddakanikaya'))}</translation>
                      </a>
                      <ul class="vertical fourth">
                        <li>
                          <a href="https://suttacentral.net/kp">
                            <root>Khuddakapāṭha</root>
                            <translation>${unsafeHTML(this.localize('khuddakanikaya:khuddakapatha'))}</translation>
                          </a>
                        </li>
                        <li>
                          <a href="https://suttacentral.net/dhp">
                            <root>Dhammapada</root>
                            <translation>${unsafeHTML(this.localize('khuddakanikaya:dhammapada'))}</translation>
                          </a>
                        </li>
                        <li>
                          <a href="https://suttacentral.net/ud">
                            <root>Udāna</root>
                            <translation>${unsafeHTML(this.localize('khuddakanikaya:udana'))}</translation>
                          </a>
                        </li>
                        <li>
                          <a href="https://suttacentral.net/iti">
                            <root>Itivuttaka</root>
                            <translation>${unsafeHTML(this.localize('khuddakanikaya:itivuttaka'))}</translation>
                          </a>
                        </li>
                        <li>
                          <a href="https://suttacentral.net/snp">
                            <root>Suttanipāta</root>
                            <translation>${unsafeHTML(this.localize('khuddakanikaya:suttanipata'))}</translation>
                          </a>
                        </li>
                        <li>
                          <a href="https://suttacentral.net/vv">
                            <root>Vimānavatthu</root>
                            <translation>${unsafeHTML(this.localize('khuddakanikaya:vimanavatthu'))}</translation>
                          </a>
                        </li>
                        <li>
                          <a href="https://suttacentral.net/pv">
                            <root>Petavatthu</root>
                            <translation>${unsafeHTML(this.localize('khuddakanikaya:petavatthu'))}</translation>
                          </a>
                        </li>
                        <li>
                          <a href="https://suttacentral.net/thag">
                            <root>Theragāthā</root>
                            <translation>${unsafeHTML(this.localize('khuddakanikaya:theragatha'))}</translation>
                          </a>
                        </li>
                        <li>
                          <a href="https://suttacentral.net/thig">
                            <root>Therīgāthā</root>
                            <translation>${unsafeHTML(this.localize('khuddakanikaya:therigatha'))}</translation>
                          </a>
                        </li>
                        <li>
                          <a href="https://suttacentral.net/tha-ap">
                            <root>Therāpadāna</root>
                            <translation>${unsafeHTML(this.localize('khuddakanikaya:therapadana'))}</translation>
                          </a>
                        </li>
                        <li>
                          <a href="https://suttacentral.net/thi-ap">
                            <root>Therīapadāna</root>
                            <translation>${unsafeHTML(this.localize('khuddakanikaya:theriapadana'))}</translation>
                          </a>
                        </li>
                        <li>
                          <a href="https://suttacentral.net/bv">
                            <root>Buddhavaṁsa</root>
                            <translation>${unsafeHTML(this.localize('khuddakanikaya:buddhavamsa'))}</translation>
                          </a>
                        </li>
                        <li>
                          <a href="https://suttacentral.net/cp">
                            <root>Cariyāpiṭaka</root>
                            <translation>${unsafeHTML(this.localize('khuddakanikaya:cariyapitaka'))}</translation>
                          </a>
                        </li>
                        <li>
                          <a href="https://suttacentral.net/ja">
                            <root>Jātaka</root>
                            <translation>${unsafeHTML(this.localize('khuddakanikaya:jataka'))}</translation>
                          </a>
                        </li>
                        <li>
                          <a href="https://suttacentral.net/mnd">
                            <root>Mahāniddesa</root>
                            <translation>${unsafeHTML(this.localize('khuddakanikaya:mahaniddesa'))}</translation>
                          </a>
                        </li>
                        <li>
                          <a href="https://suttacentral.net/cnd">
                            <root>Cūḷaniddesa</root>
                            <translation>${unsafeHTML(this.localize('khuddakanikaya:culaniddesa'))}</translation>
                          </a>
                        </li>
                        <li>
                          <a href="https://suttacentral.net/ps">
                            <root>Paṭisambhidāmagga</root>
                            <translation>${unsafeHTML(this.localize('khuddakanikaya:patisambhidamagga'))}</translation>
                          </a>
                        </li>
                        <li>
                          <a href="https://suttacentral.net/ne">
                            <root>Netti</root>
                            <translation>${unsafeHTML(this.localize('khuddakanikaya:netti'))}</translation>
                          </a>
                        </li>
                        <li>
                          <a href="https://suttacentral.net/pe">
                            <root>Peṭakopadesa</root>
                            <translation>${unsafeHTML(this.localize('khuddakanikaya:petakopadesa'))}</translation>
                          </a>
                        </li>
                        <li>
                          <a href="https://suttacentral.net/mil">
                            <root>Milindapañha</root>
                            <translation>${unsafeHTML(this.localize('khuddakanikaya:milindapajnha'))}</translation>
                          </a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="https://suttacentral.net/pli-tv-ab">
                    <root>Abhidhamma Piṭaka</root>
                    <translation>${unsafeHTML(this.localize('palitipitaka:abhidhammaPitaka'))}</translation>
                  </a>
                  <ul class="horizontal third">
                    <li>
                      <ul class="vertical fourth abhidhamma">
                        <li>
                          <a href="https://suttacentral.net/ds">
                            <root>Dhammasaṅgaṇī</root>
                            <translation>${unsafeHTML(this.localize('abhidhammaPitaka:dhammasangani'))}</translation>
                          </a>
                        </li>
                        <li>
                          <a href="https://suttacentral.net/vb">
                            <root>Vibhaṅga</root>
                            <translation>${unsafeHTML(this.localize('abhidhammaPitaka:vibhanga'))}</translation>
                          </a>
                        </li>
                        <li>
                          <a href="https://suttacentral.net/dt">
                            <root>Dhātukathā</root>
                            <translation>${unsafeHTML(this.localize('abhidhammaPitaka:dhatukatha'))}</translation>
                          </a>
                        </li>
                        <li>
                          <a href="https://suttacentral.net/pp">
                            <root>Puggalapaññatti</root>
                            <translation>${unsafeHTML(this.localize('abhidhammaPitaka:puggalapajnjnatti'))}</translation>
                          </a>
                        </li>
                        <li>
                          <a href="https://suttacentral.net/kv">
                            <root>Kathāvatthu</root>
                            <translation>${unsafeHTML(this.localize('abhidhammaPitaka:kathavatthu'))}</translation>
                          </a>
                        </li>
                        <li>
                          <a href="https://suttacentral.net/ya">
                            <root>Yamaka</root>
                            <translation>${unsafeHTML(this.localize('abhidhammaPitaka:yamaka'))}</translation>
                          </a>
                        </li>
                        <li>
                          <a href="https://suttacentral.net/patthana">
                            <root>Paṭṭhāna</root>
                            <translation>${unsafeHTML(this.localize('abhidhammaPitaka:patthana'))}</translation>
                          </a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </article>
      </main>
    `;
  }
}

customElements.define('sc-static-pali-tipitaka', SCStaticPaliTipitaka);
