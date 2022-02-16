import { html } from 'lit';

import { SCStaticPage } from '../addons/sc-static-page';

class SCStaticPaliTipitaka extends SCStaticPage {
  createRenderRoot() {
    return this;
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
          font-size: 2rem;
          font-weight: normal;

          font-variant-caps: all-small-caps;
        }

        .second {
          font-size: 1.5rem;
        }

        .second a {
          display: block;

          margin: 1rem 1rem 0;
          padding: 1rem 0.5rem 0.5rem;

          border-bottom: 1px solid #ccc;
        }

        .third a {
          height: 4.6rem;
          margin: 0;

          border-bottom: none;
          border-radius: 0.5rem;
        }

        .third {
          font-size: 1rem;
          font-weight: bold;

          margin: 0.5rem 1em 0;

          text-align: left;
        }

        .fourth {
          font-size: 1rem;
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
        }

        translation {
          font-family: 'skolar sans', sans-serif;

          color: #757575;
        }

        a {
          text-decoration: none;
        }

        a:hover {
          background-color: #eee;
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
                <translation>Three Baskets of the Pāḷi Canon</translation>
              </h1>
              <ul class="horizontal second">
                <li>
                  <a href="https://suttacentral.net/pli-tv-vi">
                    <root>Vinayapiṭaka</root>
                    <translation>Theravāda Monastic Law</translation>
                  </a>
                  <ul class="horizontal third">
                    <li>
                      <a href="https://suttacentral.net/">
                        <root>Suttavibhaṅga</root>
                        <translation>Rules and Their Analysis</translation>
                      </a>
                      <ul class="vertical fourth">
                        <li>
                          <a href="https://suttacentral.net/pli-tv-bu-vb">
                            <root>Bhikkhuvibhaṅga</root>
                            <translation>Monks’ Rules and Their Analysis</translation>
                          </a>
                          <ul class="vertical fifth">
                            <li>
                              <a href="https://suttacentral.net/pli-tv-bu-vb-pj">
                                <root>Pārājika</root>
                                <translation>Expulsion</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/pli-tv-bu-vb-ss">
                                <root>Saṅghādisesa</root>
                                <translation>Suspension</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/pli-tv-bu-vb-ay">
                                <root>Aniyata</root>
                                <translation>Undetermined</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/pli-tv-bu-vb-np">
                                <root>Nissaggiya Pācittiya</root>
                                <translation>Relinquishment With Confession</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/pli-tv-bu-vb-pc">
                                <root>Pācittiya</root>
                                <translation>Confession</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/pli-tv-bu-vb-pd">
                                <root>Pāṭidesanīya</root>
                                <translation>Acknowledgment</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/pli-tv-bu-vb-sk">
                                <root>Sekhiya</root>
                                <translation>Rules for Training</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/pli-tv-bu-vb-as">
                                <root>Adhikaraṇasamatha</root>
                                <translation>Settling Legal Issues</translation>
                              </a>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <a href="https://suttacentral.net/pli-tv-bi-vb">
                            <root>Bhikkhunīvibhaṅga</root>
                            <translation>Nuns’ Rules and Their Analysis</translation>
                          </a>
                          <ul class="vertical fifth">
                            <li>
                              <a href="https://suttacentral.net/pli-tv-bi-vb-pj">
                                <root>Pārājika</root>
                                <translation>Expulsion</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/pli-tv-bi-vb-ss">
                                <root>Saṅghādisesa</root>
                                <translation>Suspension</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/pli-tv-bi-vb-np">
                                <root>Nissaggiya Pācittiya</root>
                                <translation>Relinquishment With Confession</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/pli-tv-bi-vb-pc">
                                <root>Pācittiya</root>
                                <translation>Confession</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/pli-tv-bi-vb-pd">
                                <root>Pāṭidesanīya</root>
                                <translation>Acknowledgment</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/pli-tv-bi-vb-sk">
                                <root>Sekhiya</root>
                                <translation>Rules for Training</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/pli-tv-bi-vb-as">
                                <root>Adhikaraṇasamatha</root>
                                <translation>Settling Legal Issues</translation>
                              </a>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a href="https://suttacentral.net/pli-tv-kd">
                        <root>Khandhaka</root>
                        <translation>Chapters on Legal Topics</translation>
                      </a>
                      <ul class="vertical fourth">
                        <li>
                          <a href="https://suttacentral.net/">
                            <root>Mahāvagga</root>
                            <translation>The Great Chapter</translation>
                          </a>
                          <ul class="vertical fifth">
                            <li>
                              <a href="https://suttacentral.net/pli-tv-kd1">
                                <root>Mahākhandhaka</root>
                                <translation>Going Forth</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/pli-tv-kd2">
                                <root>Uposathakkhandhaka</root>
                                <translation>Sabbath</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/pli-tv-kd3">
                                <root>Vassūpanāyikakkhandhaka</root>
                                <translation>Rains Season</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/pli-tv-kd4">
                                <root>Pavāraṇākkhandhaka</root>
                                <translation>Invitation</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/pli-tv-kd5">
                                <root>Cammakkhandhaka</root>
                                <translation>Leather</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/pli-tv-kd6">
                                <root>Bhesajjakkhandhaka</root>
                                <translation>Medicine</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/pli-tv-kd7">
                                <root>Kathinakkhandhaka</root>
                                <translation>Robe-Making Season</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/pli-tv-kd8">
                                <root>Cīvarakkhandhaka</root>
                                <translation>Robes</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/pli-tv-kd9">
                                <root>Campeyyakkhandhaka</root>
                                <translation>At Campā</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/pli-tv-kd10">
                                <root>Kosambakakkhandhaka</root>
                                <translation>At Kosambi</translation>
                              </a>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <a href="https://suttacentral.net/">
                            <root>Cūḷavagga</root>
                            <translation>The Lesser Chapter</translation>
                          </a>
                          <ul class="vertical fifth">
                            <li>
                              <a href="https://suttacentral.net/pli-tv-kd11">
                                <root>Kammakkhandhaka</root>
                                <translation>Saṅgha Procedures</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/pli-tv-kd12">
                                <root>Pārivāsikakkhandhaka</root>
                                <translation>Probation</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/pli-tv-kd13">
                                <root>Samuccayakkhandhaka</root>
                                <translation>Collected Procedures</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/pli-tv-kd14">
                                <root>Samathakkhandhaka</root>
                                <translation>Settlement</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/pli-tv-kd15">
                                <root>Khuddakavatthukkhandhaka</root>
                                <translation>Minor Matters</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/pli-tv-kd16">
                                <root>Senāsanakkhandhaka</root>
                                <translation>Lodgings</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/pli-tv-kd17">
                                <root>Saṁghabhedakakkhandhaka</root>
                                <translation>Schism in the Saṅgha</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/pli-tv-kd18">
                                <root>Vattakkhandhaka</root>
                                <translation>Duties</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/pli-tv-kd19">
                                <root>Pātimokkhaṭṭhapanakkhandhaka</root>
                                <translation>Setting Aside the Sabbath</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/pli-tv-kd20">
                                <root>Bhikkhunikkhandhaka</root>
                                <translation>Nuns</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/pli-tv-kd21">
                                <root>Pañcasatikakkhandhaka</root>
                                <translation>Council of the Five Hundred</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/pli-tv-kd22">
                                <root>Sattasatikakkhandhaka</root>
                                <translation>Council of the Seven Hundred</translation>
                              </a>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a href="https://suttacentral.net/pli-tv-pvr">
                        <root>Parivāra</root>
                        <translation>The Compendium</translation>
                      </a>
                      <ul class="vertical fourth">
                        <li>
                          <a href="https://suttacentral.net/pli-tv-pvr1.1">
                            <root>Katthapaññattivāra</root>
                            <translation>Laying-Down-Where?</translation>
                          </a>
                        </li>
                        <li>
                          <a href="https://suttacentral.net/pli-tv-pvr2.1">
                            <root>Katthapaññattivāra</root>
                            <translation>Laying-Down-Where?</translation>
                          </a>
                        </li>
                        <li>
                          <a href="https://suttacentral.net/pli-tv-pvr3">
                            <root>Samuṭṭhānasīsasaṅkhepa</root>
                            <translation>Summary Of Origins</translation>
                          </a>
                        </li>
                        <li>
                          <a href="https://suttacentral.net/pli-tv-pvr4">
                            <root>Antarapeyyāla</root>
                            <translation>Consecutive Repetitions</translation>
                          </a>
                        </li>
                        <li>
                          <a href="https://suttacentral.net/pli-tv-pvr5">
                            <root>Samathabheda</root>
                            <translation>Synopsis of Settlements</translation>
                          </a>
                        </li>
                        <li>
                          <a href="https://suttacentral.net/pli-tv-pvr6">
                            <root>Khandhakapucchāvāra</root>
                            <translation>Questions on the Khandhakas</translation>
                          </a>
                        </li>
                        <li>
                          <a href="https://suttacentral.net/pli-tv-pvr7">
                            <root>Ekuttarikanaya</root>
                            <translation>Numbered sections</translation>
                          </a>
                        </li>
                        <li>
                          <a href="https://suttacentral.net/pli-tv-pvr8">
                            <root>Uposathādipucchāvissajjanā</root>
                            <translation>Questions on the Beginning of Sabbath</translation>
                          </a>
                        </li>
                        <li>
                          <a href="https://suttacentral.net/pli-tv-pvr9">
                            <root>Atthavasapakaraṇa</root>
                            <translation>Exposition Of Reasons</translation>
                          </a>
                        </li>
                        <li>
                          <a href="https://suttacentral.net/pli-tv-pvr10">
                            <root>Gāthāsaṅgaṇika</root>
                            <translation>Collection Of Stanzas</translation>
                          </a>
                        </li>
                        <li>
                          <a href="https://suttacentral.net/pli-tv-pvr11">
                            <root>Adhikaraṇabheda</root>
                            <translation>Synopsis Of Legal Questions</translation>
                          </a>
                        </li>
                        <li>
                          <a href="https://suttacentral.net/pli-tv-pvr12">
                            <root>Codanādipucchāvissajjanā</root>
                            <translation>An Additional Collection Of Stanzas</translation>
                          </a>
                        </li>
                        <li>
                          <a href="https://suttacentral.net/pli-tv-pvr13">
                            <root>Codanākaṇḍa</root>
                            <translation>Reproving</translation>
                          </a>
                        </li>
                        <li>
                          <a href="https://suttacentral.net/pli-tv-pvr14">
                            <root>Anuvijjakassapaṭipatti</root>
                            <translation>The Lesser Collection</translation>
                          </a>
                        </li>
                        <li>
                          <a href="https://suttacentral.net/pli-tv-pvr15">
                            <root>Mahāsaṅgāma</root>
                            <translation>The Greater Collection</translation>
                          </a>
                        </li>
                        <li>
                          <a href="https://suttacentral.net/pli-tv-pvr16">
                            <root>Kathinabheda</root>
                            <translation>Synopsis of Robe-Making Season</translation>
                          </a>
                        </li>
                        <li>
                          <a href="https://suttacentral.net/pli-tv-pvr17">
                            <root>Upālipañcaka</root>
                            <translation>Questionf of Upāli in Sets of Five</translation>
                          </a>
                        </li>
                        <li>
                          <a href="https://suttacentral.net/pli-tv-pvr18">
                            <root>Atthāpattisamuṭṭhāna</root>
                            <translation>Origins of Offenses</translation>
                          </a>
                        </li>
                        <li>
                          <a href="https://suttacentral.net/pli-tv-pvr19">
                            <root>Dutiyagāthāsaṅgaṇika</root>
                            <translation>Second Collection Of Stanzas</translation>
                          </a>
                        </li>
                        <li>
                          <a href="https://suttacentral.net/pli-tv-pvr20">
                            <root>Sedamocanagāthā</root>
                            <translation>The Sweat Inducing Stanzas</translation>
                          </a>
                        </li>
                        <li>
                          <a href="https://suttacentral.net/pli-tv-pvr21">
                            <root>Pañcavagga</root>
                            <translation>The Five Divisions</translation>
                          </a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="https://suttacentral.net/sutta">
                    <root>Suttapiṭaka</root>
                    <translation>Pāḷi Discourses</translation>
                  </a>
                  <ul class="horizontal third">
                    <li>
                      <a href="https://suttacentral.net/dn">
                        <root>Dīghanikāya</root>
                        <translation>Long Discourses</translation>
                      </a>
                      <ul class="vertical fourth">
                        <li>
                          <a href="https://suttacentral.net/dn-silakkhandhavagga">
                            <root>Sīlakkhandhavagga</root>
                            <translation>The Entire Spectrum of Ethics</translation>
                          </a>
                        </li>
                        <li>
                          <a href="https://suttacentral.net/dn-mahavagga">
                            <root>Mahāvagga</root>
                            <translation>The Great Chapter</translation>
                          </a>
                        </li>
                        <li>
                          <a href="https://suttacentral.net/dn-pathikavagga">
                            <root>Pāthikavagga</root>
                            <translation>About Pāṭikaputta</translation>
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a href="https://suttacentral.net/mn">
                        <root>Majjhimanikāya</root>
                        <translation>Middle Discourses</translation>
                      </a>
                      <ul class="vertical fourth">
                        <li>
                          <a href="https://suttacentral.net/mn-mulapannasa">
                            <root>Mūlapaṇṇāsa</root>
                            <translation>The First Fifty</translation>
                          </a>
                          <ul class="vertical fifth">
                            <li>
                              <a href="https://suttacentral.net/mn-mulapariyayavagga">
                                <root>Mūlapariyāyavagga</root>
                                <translation>The Chapter on the Root of All Things</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/mn-sihanadavagga">
                                <root>Sīhanādavagga</root>
                                <translation>The Chapter on the Lion’s Roar</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/mn-opammavagga">
                                <root>Opammavagga</root>
                                <translation>The Chapter of Similes</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/mn-mahayamakavagga">
                                <root>Mahāyamakavagga</root>
                                <translation>The Greater Chapter on Pairs</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/mn-culayamakavagga">
                                <root>Cūḷayamakavagga</root>
                                <translation>The Lesser Chapter on Pairs</translation>
                              </a>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <a href="https://suttacentral.net/mn-majjhimapannasa">
                            <root>Majjhimapaṇṇāsa</root>
                            <translation>The Middle Fifty</translation>
                          </a>
                          <ul class="vertical fifth">
                            <li>
                              <a href="https://suttacentral.net/mn-gahapativagga">
                                <root>Gahapativagga</root>
                                <translation>The Chapter on Householders</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/mn-bhikkhuvagga">
                                <root>Bhikkhuvagga</root>
                                <translation>The Chapter on Mendicants</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/mn-paribbajakavagga">
                                <root>Paribbājakavagga</root>
                                <translation>The Chapter on Wanderers</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/mn-rajavagga">
                                <root>Rājavagga</root>
                                <translation>The Chapter on Kings</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/mn-brahmanavagga">
                                <root>Brāhmaṇavagga</root>
                                <translation>The Chapter on Brahmins</translation>
                              </a>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <a href="https://suttacentral.net/mn-uparipannasa">
                            <root>Uparipaṇṇāsa</root>
                            <translation>The Final Fifty</translation>
                          </a>
                          <ul class="vertical fifth">
                            <li>
                              <a href="https://suttacentral.net/mn-devadahavagga">
                                <root>Devadahavagga</root>
                                <translation>The Chapter Beginning With Devadaha</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/mn-anupadavagga">
                                <root>Anupadavagga</root>
                                <translation>The Chapter Beginning with One By One</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/mn-sunnatavagga">
                                <root>Suññatavagga</root>
                                <translation>The Chapter Beginning with Emptiness</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/mn-vibhangavagga">
                                <root>Vibhaṅgavagga</root>
                                <translation>The Chapter on Analysis</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/mn-salayatanavagga">
                                <root>Saḷāyatanavagga</root>
                                <translation>The Chapter on the Six Senses</translation>
                              </a>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a href="https://suttacentral.net/pitaka/sutta/linked/sn">
                        <root>Saṁyuttanikāya</root>
                        <translation>Linked Discourses</translation>
                      </a>
                      <ul class="vertical fourth">
                        <li>
                          <a href="https://suttacentral.net/sn-sagathavaggasamyutta">
                            <root>Sagāthāvaggasaṁyutta</root>
                            <translation>The Group of Linked Discourses With Verses</translation>
                          </a>
                          <ul class="vertical fifth samyutta">
                            <li>
                              <a href="https://suttacentral.net/sn1">
                                <root>Devatāsaṁyutta</root>
                                <translation>Linked Discourses With Deities</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/sn2">
                                <root>Devaputtasaṁyutta</root>
                                <translation>Linked Discourses on Gods</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/sn3">
                                <root>Kosalasaṁyutta</root>
                                <translation>Linked Discourses With King Pasenadi of Kosala</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/sn4">
                                <root>Mārasaṁyutta</root>
                                <translation>Linked Discourses With Māra</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/sn5">
                                <root>Bhikkhunīsaṁyutta</root>
                                <translation>Linked Discourses With Nuns</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/sn6">
                                <root>Brahmasaṁyutta</root>
                                <translation>Linked Discourses With Brahmā Gods</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/sn7">
                                <root>Brāhmaṇasaṁyutta</root>
                                <translation>Linked Discourses with Brahmins</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/sn8">
                                <root>Vaṅgīsasaṁyutta</root>
                                <translation>Linked Discourses With Vaṅgīsa</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/sn9">
                                <root>Vanasaṁyutta</root>
                                <translation>Linked Discourses in the Woods</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/sn10">
                                <root>Yakkhasaṁyutta</root>
                                <translation>Linked Discourses with Spirits</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/sn11">
                                <root>Sakkasaṁyutta</root>
                                <translation>Linked Discourses with Sakka</translation>
                              </a>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <a href="https://suttacentral.net/sn-nidanavaggasamyutta">
                            <root>Nidānavaggasaṁyutta</root>
                            <translation>The Group of Linked Discourses Beginning With Causation</translation>
                          </a>
                          <ul class="vertical fifth samyutta">
                            <li>
                              <a href="https://suttacentral.net/sn12">
                                <root>Nidānasaṁyutta</root>
                                <translation>Linked Discourses on Causation</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/sn13">
                                <root>Abhisamayasaṁyutta</root>
                                <translation>Linked Discourses on Comprehension</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/sn14">
                                <root>Dhātusaṁyutta</root>
                                <translation>Linked Discourses on the Elements</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/sn15">
                                <root>Anamataggasaṁyutta</root>
                                <translation>Linked Discourses on the Unknowable Beginning</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/sn16">
                                <root>Kassapasaṁyutta</root>
                                <translation>Linked Discourses with Kassapa</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/sn17">
                                <root>Lābhasakkārasaṁyutta</root>
                                <translation>Linked Discourses on Gains and Honor</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/sn18">
                                <root>Rāhulasaṁyutta</root>
                                <translation>Linked Discourses with Rāhula</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/sn19">
                                <root>Lakkhaṇasaṁyutta</root>
                                <translation>Linked Discourses with Lakkhaṇa</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/sn20">
                                <root>Opammasaṁyutta</root>
                                <translation>Linked Discourses with Similes</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/sn21">
                                <root>Bhikkhusaṁyutta</root>
                                <translation>Linked Discourses with Monks</translation>
                              </a>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <a href="https://suttacentral.net/sn-khandhavaggasamyutta">
                            <root>Khandhavaggasaṁyutta</root>
                            <translation>The Group of Linked Discourses Beginning With the
                              Aggregates</translation>
                          </a>
                          <ul class="vertical fifth samyutta">
                            <li>
                              <a href="https://suttacentral.net/sn22">
                                <root>Khandhasaṁyutta</root>
                                <translation>Linked Discourses on the Aggregates</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/sn23">
                                <root>Rādhasaṁyutta</root>
                                <translation>Linked Discourses with Rādha</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/sn24">
                                <root>Diṭṭhisaṁyutta</root>
                                <translation>Linked Discourses on Views</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/sn25">
                                <root>Okkantasaṁyutta</root>
                                <translation>Linked Discourses on Arrival at the Truth</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/sn26">
                                <root>Uppādasaṁyutta</root>
                                <translation>Linked Discourses on Arising</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/sn27">
                                <root>Kilesasaṁyutta</root>
                                <translation>Linked Discourses on Corruptions</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/sn28">
                                <root>Sāriputtasaṁyutta</root>
                                <translation>Linked Discourses with Sāriputta</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/sn29">
                                <root>Nāgasaṁyutta</root>
                                <translation>Linked Discourses on Dragons</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/sn30">
                                <root>Supaṇṇasaṁyutta</root>
                                <translation>Linked Discourses on Phoenixes</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/sn31">
                                <root>Gandhabbakāyasaṁyutta</root>
                                <translation>Linked Discourses on Fairies</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/sn32">
                                <root>Valāhakasaṁyutta</root>
                                <translation>Linked Discourses on Cloud Gods</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/sn33">
                                <root>Vacchagottasaṁyutta</root>
                                <translation>Linked Discourses with Vacchagotta</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/sn34">
                                <root>Jhānasaṁyutta</root>
                                <translation>Linked Discourses on Absorption</translation>
                              </a>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <a href="https://suttacentral.net/sn-salayatanavaggasamyutta">
                            <root>Saḷāyatanavaggasaṁyutta</root>
                            <translation>The Group of Linked Discourses Beginning With the Six Sense
                              Fields</translation>
                          </a>
                          <ul class="vertical fifth samyutta">
                            <li>
                              <a href="https://suttacentral.net/sn35">
                                <root>Saḷāyatanasaṁyutta</root>
                                <translation>Linked Discourses on the Six Sense Fields</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/sn36">
                                <root>Vedanāsaṁyutta</root>
                                <translation>Linked Discourses on Feelings</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/sn37">
                                <root>Mātugāmasaṁyutta</root>
                                <translation>Linked Discourses on Females</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/sn38">
                                <root>Jambukhādakasaṁyutta</root>
                                <translation>Linked Discourses with Jambukhādaka</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/sn39">
                                <root>Sāmaṇḍakasaṁyutta</root>
                                <translation>Linked Discourses with Sāmaṇḍaka</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/sn40">
                                <root>Moggallānasaṁyutta</root>
                                <translation>Linked Discourses with Moggallāna</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/sn41">
                                <root>Cittasaṁyutta</root>
                                <translation>Linked Discourses with Citta the Householder</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/sn42">
                                <root>Gāmaṇisaṁyutta</root>
                                <translation>Linked Discourses with Chiefs</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/sn43">
                                <root>Asaṅkhatasaṁyutta</root>
                                <translation>Linked Discourses on the Unconditioned</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/sn44">
                                <root>Abyākatasaṁyutta</root>
                                <translation>Linked Discourses on the Undeclared</translation>
                              </a>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <a href="https://suttacentral.net/sn-mahavaggasamyutta">
                            <root>Mahāvaggasaṁyutta</root>
                            <translation>The Group of Linked Discourses on the Path</translation>
                          </a>
                          <ul class="vertical fifth samyutta">
                            <li>
                              <a href="https://suttacentral.net/sn45">
                                <root>Maggasaṁyutta</root>
                                <translation>Linked Discourses on the Eightfold Path</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/sn46">
                                <root>Bojjhaṅgasaṁyutta</root>
                                <translation>Linked Discourses on the Awakening Factors</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/sn47">
                                <root>Satipaṭṭhānasaṁyutta</root>
                                <translation>Linked Discourses on Mindfulness Meditation</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/sn48">
                                <root>Indriyasaṁyutta</root>
                                <translation>Linked Discourses on the Faculties</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/sn49">
                                <root>Sammappadhānasaṁyutta</root>
                                <translation>Linked Discourses on the Right Efforts</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/sn50">
                                <root>Balasaṁyutta</root>
                                <translation>Linked Discourses on the Five Powers</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/sn51">
                                <root>Iddhipādasaṁyutta</root>
                                <translation>Linked Discourses on the Bases of Psychic Power</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/sn52">
                                <root>Anuruddhasaṁyutta</root>
                                <translation>Linked Discourses with Anuruddha</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/sn53">
                                <root>Jhānasaṁyutta</root>
                                <translation>Linked Discourses on Absorption</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/sn54">
                                <root>Ānāpānasaṁyutta</root>
                                <translation>Linked Discourses on Breath Meditation</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/sn55">
                                <root>Sotāpattisaṁyutta</root>
                                <translation>Linked Discourses on Stream-Entry</translation>
                              </a>
                            </li>
                            <li>
                              <a href="https://suttacentral.net/sn56">
                                <root>Saccasaṁyutta</root>
                                <translation>Linked Discourses on the Truths</translation>
                              </a>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a href="https://suttacentral.net/pitaka/sutta/numbered/an">
                        <root>Aṅguttaranikāya</root>
                        <translation>Numbered Discourses</translation>
                      </a>
                      <ul class="vertical fourth">
                        <li>
                          <a href="https://suttacentral.net/an1">
                            <root>Ekakanipāta</root>
                            <translation>The Book of the Ones</translation>
                          </a>
                        </li>
                        <li>
                          <a href="https://suttacentral.net/an2">
                            <root>Dukanipāta</root>
                            <translation>The Book of the Twos</translation>
                          </a>
                        </li>
                        <li>
                          <a href="https://suttacentral.net/an3">
                            <root>Tikanipāta</root>
                            <translation>The Book of the Threes</translation>
                          </a>
                        </li>
                        <li>
                          <a href="https://suttacentral.net/an4">
                            <root>Catukkanipāta</root>
                            <translation>The Book of the Fours</translation>
                          </a>
                        </li>
                        <li>
                          <a href="https://suttacentral.net/an5">
                            <root>Pañcakanipāta</root>
                            <translation>The Book of the Fives</translation>
                          </a>
                        </li>
                        <li>
                          <a href="https://suttacentral.net/an6">
                            <root>Chakkanipāta</root>
                            <translation>The Book of the Sixes</translation>
                          </a>
                        </li>
                        <li>
                          <a href="https://suttacentral.net/an7">
                            <root>Sattakanipāta</root>
                            <translation>The Book of the Sevens</translation>
                          </a>
                        </li>
                        <li>
                          <a href="https://suttacentral.net/an8">
                            <root>Aṭṭhakanipāta</root>
                            <translation>The Book of the Eights</translation>
                          </a>
                        </li>
                        <li>
                          <a href="https://suttacentral.net/an9">
                            <root>Navakanipāta</root>
                            <translation>The Book of the Nines</translation>
                          </a>
                        </li>
                        <li>
                          <a href="https://suttacentral.net/an10">
                            <root>Dasakanipāta</root>
                            <translation>The Book of the Tens</translation>
                          </a>
                        </li>
                        <li>
                          <a href="https://suttacentral.net/an11">
                            <root>Ekādasakanipāta</root>
                            <translation>The Book of the Elevens</translation>
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a href="https://suttacentral.net/kn">
                        <root>Khuddakanikāya</root>
                        <translation>Minor Collection</translation>
                      </a>
                      <ul class="vertical fourth">
                        <li>
                          <a href="https://suttacentral.net/kp">
                            <root>Khuddakapāṭha</root>
                            <translation>Minor Readings</translation>
                          </a>
                        </li>
                        <li>
                          <a href="https://suttacentral.net/dhp">
                            <root>Dhammapada</root>
                            <translation>Sayings of the Dhamma</translation>
                          </a>
                        </li>
                        <li>
                          <a href="https://suttacentral.net/ud">
                            <root>Udāna</root>
                            <translation>Heartfelt Sayings</translation>
                          </a>
                        </li>
                        <li>
                          <a href="https://suttacentral.net/iti">
                            <root>Itivuttaka</root>
                            <translation>So It Was Said</translation>
                          </a>
                        </li>
                        <li>
                          <a href="https://suttacentral.net/snp">
                            <root>Suttanipāta</root>
                            <translation>Anthology of Discourses</translation>
                          </a>
                        </li>
                        <li>
                          <a href="https://suttacentral.net/vv">
                            <root>Vimānavatthu</root>
                            <translation>Stories of Heavenly Mansions</translation>
                          </a>
                        </li>
                        <li>
                          <a href="https://suttacentral.net/pv">
                            <root>Petavatthu</root>
                            <translation>Stories of Hungry Ghosts</translation>
                          </a>
                        </li>
                        <li>
                          <a href="https://suttacentral.net/thag">
                            <root>Theragāthā</root>
                            <translation>Verses of the Senior Monks</translation>
                          </a>
                        </li>
                        <li>
                          <a href="https://suttacentral.net/thig">
                            <root>Therīgāthā</root>
                            <translation>Verses of the Senior Nuns</translation>
                          </a>
                        </li>
                        <li>
                          <a href="https://suttacentral.net/tha-ap">
                            <root>Therāpadāna</root>
                            <translation>Past Life Legends of the Senior Monks</translation>
                          </a>
                        </li>
                        <li>
                          <a href="https://suttacentral.net/thi-ap">
                            <root>Therīapadāna</root>
                            <translation>Past Life Legends of the Senior Nuns</translation>
                          </a>
                        </li>
                        <li>
                          <a href="https://suttacentral.net/bv">
                            <root>Buddhavaṁsa</root>
                            <translation>Chronicle of the Buddhas</translation>
                          </a>
                        </li>
                        <li>
                          <a href="https://suttacentral.net/cp">
                            <root>Cariyāpiṭaka</root>
                            <translation>Canon of Conduct</translation>
                          </a>
                        </li>
                        <li>
                          <a href="https://suttacentral.net/ja">
                            <root>Jātaka</root>
                            <translation>Past Life Stories of the Buddha</translation>
                          </a>
                        </li>
                        <li>
                          <a href="https://suttacentral.net/mnd">
                            <root>Mahāniddesa</root>
                            <translation>Longer Exposition</translation>
                          </a>
                        </li>
                        <li>
                          <a href="https://suttacentral.net/cnd">
                            <root>Cūḷaniddesa</root>
                            <translation>Shorter Exposition</translation>
                          </a>
                        </li>
                        <li>
                          <a href="https://suttacentral.net/ps">
                            <root>Paṭisambhidāmagga</root>
                            <translation>The Path of Discrimination</translation>
                          </a>
                        </li>
                        <li>
                          <a href="https://suttacentral.net/ne">
                            <root>Netti</root>
                            <translation>The Guidebook</translation>
                          </a>
                        </li>
                        <li>
                          <a href="https://suttacentral.net/pe">
                            <root>Peṭakopadesa</root>
                            <translation>Interpretation of the Canon</translation>
                          </a>
                        </li>
                        <li>
                          <a href="https://suttacentral.net/mil">
                            <root>Milindapañha</root>
                            <translation>Questions of King Milinda</translation>
                          </a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="https://suttacentral.net/pli-tv-ab">
                    <root>Abhidhamma Piṭaka</root>
                    <translation>Theravāda Systematic Treatises</translation>
                  </a>
                  <ul class="horizontal third">
                    <li>
                      <ul class="vertical fourth abhidhamma">
                        <li>
                          <a href="https://suttacentral.net/ds">
                            <root>Dhammasaṅgaṇī</root>
                            <translation>Compendium of Phenomena</translation>
                          </a>
                        </li>
                        <li>
                          <a href="https://suttacentral.net/vb">
                            <root>Vibhaṅga</root>
                            <translation>Book of Analysis</translation>
                          </a>
                        </li>
                        <li>
                          <a href="https://suttacentral.net/dt">
                            <root>Dhātukathā</root>
                            <translation>Discussion of Elements</translation>
                          </a>
                        </li>
                        <li>
                          <a href="https://suttacentral.net/pp">
                            <root>Puggalapaññatti</root>
                            <translation>Description of Personality Types</translation>
                          </a>
                        </li>
                        <li>
                          <a href="https://suttacentral.net/kv">
                            <root>Kathāvatthu</root>
                            <translation>Points of Controversy</translation>
                          </a>
                        </li>
                        <li>
                          <a href="https://suttacentral.net/ya">
                            <root>Yamaka</root>
                            <translation>The Pairs</translation>
                          </a>
                        </li>
                        <li>
                          <a href="https://suttacentral.net/patthana">
                            <root>Paṭṭhāna</root>
                            <translation>Conditional Relations</translation>
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
