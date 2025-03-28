# SuttaCentral ChangeLog

## 2025.3.19

- Optimize search sorting. 

## 2025.3.18

- Fix sorting error caused by more than one dot in a uid.

## 2025.3.15

- Optimize suttaplex entry layout on small screens.

## 2025.3.14

- Rewrite the code for handling quotes in search strings and test it.
- For prev/next buttons, if there is no translation name or root name, try using acronym instead.
- fix: when in suttaplex page, do not display toc button. 

## 2025.3.13

- Fixed a previous/next button bug and optimized the code. 

## 2025.1.21

- Enhance: Add text-wrap: balance to headings, adjust suttaplex styles. 

## 2025.1.4

- Change the location of the language badge in suttaplex. 

## 2025.1.3

- Optimize code.
- Modify the color of the language badge. 

## 2025.1.2

- Add language badge to suttplex.

## 2024.12.6

- Enhance: If view different versions of the same sutta, the hash will be inherited.

## 2024.12.4

- Enhance: Literal vs. non-literal keyword searches(Modify all filters involved)
- Fix: Double blank dictionary results are returned for uppādetv match partial.
- Fix a url parameter error. 

## 2024.11.30

- Enhance: Literal vs. non-literal keyword searches.
- Enhance: If there are no search results on SERP, check to see if user's site language and search document language match. 

## 2024.11.27

- Fix: Weird results for dictionaries when searching Chinese.
- Fix: If no document languages are selected, then explicitly search in all documents.

## 2024.11.26

- Enhance: Added link to the list of authors on the language page.

## 2024.11.25

- Enhance: Change author: filter to by:

## 2024.11.21

- Enhance: use list + language code list all related documents. 

## 2024.11.19

- Enhance: Keep ref id in url when switching to root or alternative translation. 

## 2024.11.12

- Enhance: Add prev/next to bare suttaplex cards. 

## 2024.11.10

- Fix: URLs not behaving as 'expected' .

## 2024.11.8

- Enhance: dynamically index the content of the subject page.

## 2024.11.4

- Enhance: Link Pali word results to DPD. 

## 2024.10.31

- changes to static license page to localize.
- Enhance: Vinaya parallels improvements.
- Update frontend dependencies.
- fix CICD error. 

## 2024.10.23

- change hardcoded white to var(--sc-inverted-text-color) .

## 2024.10.22

- Improve SCBadge visibility handling, remove unexpected refreshes on search page.

## 2024.10.20

- Enhance chinese full text search.

## 2024.10.15

- Remove !important from main style tags.

## 2024.10.4

- Improved suttaplex translation title acquisition algorithm. 

## 2024.9.24

- Fix a ref display bug in firefox.

## 2024.9.17

- Add T Shortcut for toggling PTS Refs.

## 2024.9.13

- Add I O P Shortcuts.
- Only one tab to focus on newly opened panels.

## 2024.9.4

- Fix: double arrow in Safari for parallel.

## 2024.9.3

- Fix: table of contents icon in page header disappears when clicked.

## 2024.9.1

- Add N shortcut for notes.
- Fix notes shortcut bug.
- Add M and R shortcuts for toggling references.

## 2024.8.31

- Add Toasts for changing ref/notes Display Types.
- Use <kbd> instead of code.key for shortcut icons.

## 2024.8.30

- Tap "S" to open search dialog.

## 2024.8.18

- Add keyboard shortcut: "V" to toggle between TextViews.

## 2024.8.8

- modify js and json files to localize new bits on home and footer.

## 2024.8.6

- Fix: some minor suttas do not display the next/prev buttons. 

## 2024.8.4

- Fix: a bug where some suttas did not display the next/prex buttons. 

## 2024.7.27

- Fix: problem with an author having multiple translation languages.

## 2024.7.21

- Upgrade the Aksharamukha version to 2.2.2.
- adjust styles about readingfaithfully content.

## 2024.7.19

- Enhance: Punctuation should be ignored in all places and ways in database search results.

## 2024.7.18

- make noai version.
- Enhance: Segmented Bilara texts should always take priority over legacy texts in suttaplex.

## 2024.7.16

- Remove unnecessary replacement code.

## 2024.7.14

- Use ISOPali to instead of ISO in script convert.

## 2024.7.10

- Fix: Last chapter of Pali Dhammapada should not lead you "Next" to the Udānavarga.

## 2024.7.9

- Fix: Unsupported browser page still links to legacy site.

## 2024.6.29

- Adjust cache strategy.
- Adjust nginx config.
- Re-add date information to publication files.
- Adjust webpack config.
- Refactor publication frontend code.

## 2024.6.28

- Upgrade frontend dependencies.
- Adjust path-to-regexp version.

## 2024.6.25

- Update DPD dictionary.
- Fix: handle author and collection filters anywhere in search string.
- Fix typo in no search result message.

## 2024.6.13

- Fix: Change styling of summary marker to not show in Safari

## 2024.5.22

- Modify publication download url format.

## 2024.5.17

- Update Pirivenas project page title.

## 2024.5.13

- Update publication download links.

## 2024.5.10

- Rewrite Pali lookup according to DPD.

## 2024.5.9

- Fix typo in arangodb.py.

## 2024.5.7

- Add dpd word lookup.

## 2024.5.6

- Update ebook download links.

## 2024.5.2

- Adjust pirivenas page styles.

## 2024.4.30

- Fix: Results for an author: search are not sorted in natural order.
- Upgrade dependencies version.
- Upgrade nodejs version.

## 2024.4.26

- Fix: "Adjacent Terms" on definition page gets cut off/overflows the window.

## 2024.4.15

- Add pirivena manks walking phoro.
- Update publications file info and add test download link code.
- Add: SuttaCentral Translations For Pirivenas' page.

## 2024.4.12

- Fix: Root language titles should not be searched in unless that language is selected.
- Fix: a problem with incomplete list authors command query results.
- remove fonts, css and more for fictional languages

## 2024.4.10

- fix swagger at /api/docs.
- Fix: Issues with some Myanmar(Burmese) menu text displays.

## 2024.4.8

- Rewrite test cases for instant search.

## 2024.4.5

- Add more localization support.

## 2024.3.30

- Fix: Chapters should not return in title results because they are not texts.
- Support Čeština localization.
- Modify: adjust the text format of the reference anchor.
- Show dates on Bilara translations in Suttaplex.
- Fix: Adjust badge container style.

## 2024.3.28

- Fix: SERP has problems with title: filter.

## 2024.3.27

- Fix: Segment links take you to the wrong segment in suttas with ranges such as AN2.11-20.
- Use main instead of master.

## 2024.3.26

- Replace spaces in url Search params with + sign.

## 2024.3.25

- Fix: Highlighted Pali search keywords are missing diacritics on the SERP.

## 2024.3.21

- Fix: Document Language list does not update on auto-complete-list dialog when settings change.

## 2024.3.20

- Fix: Currency drop down on form on donate-now page drops up and hides behind header.
- Let VSCode Debugging to work on the server.

## 2024.3.19

- Fix: link to "giving" search broken on Donation success page.

## 2024.3.15

- Fix: Texts without any subheadings are sometimes getting TOC buttons and empty overlays. #3035
- Fix: old link to downloads page leads to blank page.
- Refactor hasError() method in SCSuttaplexList class.
- Add localized segments.

## 2024.3.14

- Exclude NOT from instant search keywords.

## 2024.3.13

- Enhance: list authors should only list authors for the manuscripts and languages selected #2971
- Fix: Document Language list does not update on SERP when settings change.

## 2024.3.12

- Fix: Incorrect "You're offline" message for invalid URLs.

## 2024.3.11

- Redesign search result html based on feedback.
- Enhance: In the Algolia search, operators should not be searched as keywords.

## 2024.3.9

- Redesign search results, use div instead of table.

## 2024.3.8

- Put UIDs in list authors table.

## 2024.3.6

- improve the volpage results IDEAS.
- change pointers as mentioned in issue.
- Adjust sc voice links.

## 2024.3.5

- Adjust search button event code logic.
- Use @web/test-runner to instead of jest and upgrade dependencies.
- localize publication edition page.

## 2024.3.4

- Refactor search functionality and Redux actions.

## 2023.3.2

- Optimize volpage filter search logic.
- localize /pali-tipitaka.

## 2024.3.1

- Update sc voice link for segmented text page.
- Put unique page title of static pages first in tab title.

## 2024.2.29

- Initial removal of tool tips.
- Enhance: Add a search button to the input field on SERP.
- Enhance: adjust the order of page title structure.

## 2024.2.28

- Add author uid parameter to SC Voice link of text page.
- In search, if the command is list authors, highlight snippet sorting is not performed.
- Update SC Voice links.

## 2024.2.27

- Switch the conversion character set to ISOPali.
- fix link style on donate-now.
- Fix the style problem of navigation card on mobile phone.

## 2024.2.26

- Update filter overlay documentation.
- add missing localization and remove title attributes.
- Bump string constants.
- Remove headless Chrome from dependencies.
- Add a little high level intro to the README.
- Remove Unused Numpy Dependency.

## 2024.2.25

- Add i18n for previous/next buttons.

## 2024.2.23

- Refactor sc-site-layout.js.
- Fix: Instant search is no longer instant enough.

## 2024.2.22

- Add padding around search result breadcrumbs.
- Clicking outside of "views" overlay doesn't always close it.

## 2024.2.21

- Added Marathi localization support.
- Fix broken package-lock file.

## 2024.2.20

- Fix bug regarding volpage filter, adjust highlight clips sort logic.

## 2024.2.19

- Search icons "languages" and "filter" are missing the yellow underline when open.

## 2024.2.16

- localize sc-static-donation-success.js.
- Fix: Some search excerpts are out of order on database SERP page.
- Hide the SC Voice button when opening legacy text pages.
- Hide the SC Voice button when opening suttaplex card list.

## 2024.2.10

- Fix: Partial Search can't find ekībhāva.

## 2024.2.7

- Open the SC Voice link in a new browser tab.

## 2024.2.6

- Add SC Voice icon in the segmented text page.

## 2024.2.4

- Modify the code logic of the Suttaplex card regarding displaying the voice icon.

## 2024.2.3

- Update SC Voice link in suttaplex card and refactor related code.

## 2024.2.1

- Several fixes and improvements.

## 2024.1.30

- Show included languages in search results.

## 2024.1.25

- Remove the donation banner.

## 2024.1.24

- Optimize the code logic for setting the default site language.
- Fix: Language and Filter interface for search broken on mobile.
- Adjust search pages based on feedback.
- Format css.
- Localize sc-bottom-sheet.
- Fix a bug regarding keyword extraction.
- Modify the position of the Algolia icon and fix an error in search results.

## 2024.1.22

- Add buddhism.net info to the home page.
- Set the SC site language according to the browser language.

## 2024.1.20

- Reorganize localization files and modify related frontend code.

## 2024.1.12

- Improve search result highlight code logic.

## 2024.1.11

- Fixed an issue with duplicate highlights.
- Upgrade frontend dependencies.
- Adjust md components styles.
- Adjust styles.

## 2024.1.10

- Adjust instant search dialog styles.

## 2024.1.6

- Fix two frontend bugs.

## 2024.1.4

- Improve static page content search based on feedback.

## 2024.1.2

- Support in:article filter in search.

- Index static page content to support search.

- Downgrade the Vite version.

## 2023.12.20

- Add root language information to search results.

## 2023.12.19

- Adjust the breadcrumb title.

## 2023.12.18

- Randomly obtain the contents of whyweread and epigraph.
- Show more meta data in search results list to give more context.

## 2023.12.15

- Add explicit indicator of no modern translation found on SuttaPlex card.
- Upgrade node dependencies.

## 2023.12.14

- Enhance: text page parameters don't alter saved settings.

## 2023.12.11

- fix the presentation of rules related in fallenleaves.
- Fixed localization issue on the map page.
- Refactor lang param setting code.

## 2023.12.8

- Viewing a non-site lang page should not change your lang setting.
- Make top part of editions view 2 columns.

## 2023.12.7

- Replace Vinaya publications cover.

## 2023.12.6

-Adjust the autocomplete filter and publication page.

## 2023.12.5

- Add lang key for Epigraphs and Whyweread info.
- Adjust publication code.

## 2023.12.4

- Optimize publications download link generate logic.

## 2023.12.3

- Instant search adjustments and new sutta extraction API.
- Adjust extract sutta API.
- Add support for Vinaya to extract sutta API.

## 2023.12.1

- Refactor `sc-auto-complete-list.js`.

## 2023.11.30

- Fix logo style.
- Update SC Logo.

## 2023.11.29

- Adjust home page and instant search component.
- Add algolia link and adjust the search limit.

## 2023.11.28

- fix: legacy texts without footer display the info text of previously viewed sutta.
- Add restrictions to instant search.

## 2023.11.27

- Reorganize the Algolia index, and adjust the relevant frontend code.
- If the search keyword contains numbers, use Orama search.
- Tuning instant search.
- Adjust algolia search filter param.

## 2023.11.24

- Add donations banner.
- Localization donation banner.
- Add NL localization support, and adjust styles.

## 2023.11.23

- Add spinner to "Load more" search results button.

## 2023.11.22

- Adjust arango search index and search logic.

## 2023.11.20

- Upgrade lit, nodejs, orama, vite to latest version.
- Update sc-suttaplex.js localization info.

## 2023.11.18

- Optimize search result total calculation logic and fix bugs.

## 2023.11.17

- Support searching with diacritics ignored.

## 2023.11.16

- Refactor views.py, dictionary.py,publication_v2.py.

## 2023.11.15

- Refactor arangoload.py and add_instant_search.

## 2023.11.14

- When searching, if it is pali text, suttaplex matching is also performed.
- Format instant search python code.
- Refactor fulltext search python code.

## 2023.11.13

- Tuning instant search, localize some pages.

## 2023.11.10

- Adjust instant search result styles.
- Localization updates.

## 2023.11.7

- Refine instant search.
- Refine fulltext search.

## 2023.11.5

- Refactor sc-auto-complete-list.js.

## 2023.11.4

- Improve instant search result.

## 2023.11.2

- Apply full text search to instant search.
- Fix publication links in navigation page.

## 2023.11.1

- Filter search results based on the user's selected language.
- Remove unnecessary code from search module.

## 2023.10.31

- Fix the problem of html tags displayed in browser titles.

## 2023.10.28

- Sujato responsive page search.
- Format styles.
- Fix for highlighting style.

## 2023.10.23

- Using Algolia to drive instant search.
- Adjust CSP.

## 2023.10.22

- OPtimize instant search AQL.

## 2023.10.21

- Adjust search results and code about index.

## 2023.10.20

-Upgrade flask and some packages to latest version.

## 2023.10.19

- Apply Element Internals Polyfill.
- make cooler responsive design for editions page.
- Remove element-internals-polyfill in universal toolbar.

## 2023.10.18

- Try to fix the problem of incorrect menu layout in ios 16.1 and below.

## 2023.10.17

- Improve oarama search, adjust search strategy and other.
- Adjust vinaya publication links.

## 2023.10.13

- Exclude some content from search indexing and upgrade nginx.
- Adjust menu html structure.

## 2023.10.12

- Upgrade ArangoDB, Lit, Python, Nodejs to latest version.

## 2023.10.11

- Supports using shortcut keys to open and close the instant search dialog.

## 2023.10.10

- show search icon in md text field (fix reversion, typo in js)
- ensure text fields and nav items are evenly aligned (fix style reversion)
- use max-height: calc(100vh - 160px) to ensure the sheet footer is always visible (needs testing!)
- reduce size of footer a little
- adjust display of nav items for better responsiveness
- make text suggestion more like md text field, especially on long queries
- Enable in: keyword to support uid search, adjust styles.

## 2023.10.09

- Adjust instant search data storage logic.
- Adjust instant data merge logic.

## 2023.10.08

- Upgrade stripe and oramasearch.

## 2023.10.07

- Hide topsheets when clicked parallels link.

## 2023.10.6

- Close the top sheet when clicking the parallels top sheet link.

## 2023.10.03

- Adjust menu styles.
- Adjust universal toolbar shadow style.
- Adjust universal toolbar styles.

## 2023.10.02

- Replace the last m2 component.

## 2023.09.27

- fix padding in instant search dialogue.

## 2023.09.25

- Optimize the loading logic of instant search data and update it every seven days instead of loading it from the server every time.
- In fulltext search, add support for in:ebs, in:ebt, in:ebct.
- Optimize the structure of fulltext data sources to speed up retrieval.
- Supports searching for all uids. e.g. in:kn, in:ud, in:iti.
- Adjust some styles and fix some bugs.

## 2023.09.20

- optimize instant search data source, adjust html.

## 2023.09.18

- Use ebs filter instead of ebt, adjust styles.

## 2023.09.15

- Remove m2 components and fix instant search bugs.

## 2023.09.11

- Fix search bug.
- Adjust m3 styles.

## 2023.09.08

- Support localization of toolbar icon button text.

## 2023.09.07

- Upgrade m3 components and adjust relative code.

## 2023.09.05

- Adjust and merge m3 styles, fix a button display bug.

## 2023.09.04

- Modified the instant search component and search page. #2743

## 2023.08.29

- Refresh home design #2741

## 2023.08.28

- Use oramasearch to implement instant search. #2734

## 2023.07.29

- Enhance:site language should be shareable via URL on every page. #2704

## 2023.07.27

- Optimize home page load speed #2702

## 2023.07.20

- Text excerpt in search result should always show search term #2723
- Refactor navigation module. #2725

## 2023.07.19

- Fix: the dictionary will appear twice in the search results. #2721

## 2023.07.18

- Add new component for jump in feature. #2720

## 2023.07.10

- Fix bugs reported by sentry. #2714

## 2023.07.08

- Added "jump to" feature.

## 2023.07.05

- FIx: Start and end of lines are not visible in legacy text in mobile phone browser.

## 2023.07.04

- Localization additions to some pages.

## 2023.07.03

- purge all references to mailgun as no longer used.
- Localize`sc-badge.js` and footer.

## 2023.07.02

- Enhance: site language should be shareable via URL on every page.

## 2023.06.27

- Optimize home page load speed.

## 2023.06.24

- Refactoring navigation code.

## 2023.06.23

- Fix the problem that the small screen always displays the root text in plain mode.

## 2023.06.22

- Fix footer bugs.

## 2023.06.16

- Extended the NOT operator search feature.

## 2023.06.05

- Optimize the home page code to improve loading speed.

## 2023.06.03

- Support `in:sutta`, `in:vinaya`, `in:abhidhamma` for search.

## 2023.05.31

- Upgrade nginx, nodejs, python, python packages.

## 2023.05.30

- Enhance: adding sutta after a word should prioritize whole sutta responses.

## 2023.05.29

- Adjust the code to adapt to the new ArangoDB version.

## 2023.05.25

- Enhance: filter to search by reference number.

## 2023.05.24

- Add map.

## 2023.05.22

- Fix: make load-data refuses to update local data because of "changed …files.

## 2023.05.19

- Enhance: add NOT operator for search.

## 2023.05.18

- Enhance sc-badge.js

## 2023.05.17

- Enhance: show verse number in suttaplex nerdy row.

## 2023.05.15

- Refactor sc-navigation-new.js and other.
- Try to speed up the home page loading speed on mobile.

## 2023.05.12

- Enhance badge and other.
- Adjust menu of share this sutta.

## 2023.05.11

- Fix: pages do not display under certain conditions

## 2023.05.10

- Ehance: add badges on suttaplex for "aligned" and "annotated"

## 2023.05.04

- Fix the bug about searching uid.

## 2023.05.01

- Tweaked search results, adding partial match options.

## 2023.04.27

- Adjust instant_search view.
- Adjust search page styles.

## 2023.04.26

- Support AND operator for search.
- Update search filter.

## 2023.04.24

- Adjust search index.

## 2023.04.24

- Refactor search code, improve search speed.

## 2023.04.19

- Improve volpage search.

## 2023.04.13

- Fix search bug.

## 2023.04.12

- Remove ElasticSearch related code and other.

## 2023.04.06

- Use pyenchant to solve the problem of English synonyms search.

## 2023.04.03

- Enhance: Search results should include suttaplex.
- Optimize arangosearch index.

## 2023.03.30

- Improve search speed.

## 2023.03.29

- Fix: In:MN returns nothing AND in:mn returns suttas both in MN and mnd.

## 2023.03.27

- Add an index of segmented text to search so that partial word matches can be done.
- In the search, make changes to the ranges that `EBT` includes.
- Searching for "firefly" "fire-fly" and "fire fly" should return the same results.
- Optimize Search UI.

## 2023.03.20

- fix: fixes bugs with scroll-based toolbar animation improves anim.

## 2023.03.13

- Enhance search and fix bugs

## 2023.03.03

- Adjust to support multiple volumes
- Apply new search.
- Sujato publication volumes style
- Fix:"share this sutta" is broken.

## 2023.01.14

- Update dependencies.

## 2023.01.11

- Fix footer display bug.

## 2023.01.09

- Do not print footer.

## 2023.01.04

- Fix acronym display error in suttaplex list.

## 2022.12.24

- Do not display vinaya's publication info.
- Fix nav bug.

## 2022.12.23

- Auto obtain publication action last run date.
- Fix blurbs display error in publication info card.

## 2022.12.22

- Add publication info to eligible nav cards.

## 2022.12.15

- Fix publication pages bugs.

## 2022.12.13

- Fix yellow brick road stat error.

## 2022.12.9

- Upgrade nginx to latest version and adjusted conf.

## 2022.12.7

- Upgrade python version to 3.11 and upgrade packages. #2574

## 2022.12.5

- Improve display of markers icons in list on static map page.
- Exclude null items in publication EditionMainmatter API.
- Fix sc-chrome-headless build error.
- Upgrade frontend dependencies.
- Remove downloads page.

## 2022.11.30

- Copy localization files to localization dir.

## 2022.11.29

- Fix map layers icon. https://github.com/suttacentral/suttacentral/pull/2563

## 2022.11.28

- style up the maps

## 2022.11.25

- Use slice instead of possibly deprecated substr.
- Upgrade nodejs version to 18.12.1

## 2022.11.24

- Optimize code.

## 2022.11.23

- Introducing leaflet styles. https://github.com/suttacentral/suttacentral/pull/2554
- Fix sc-map.js styles problem. https://github.com/suttacentral/suttacentral/pull/2552

## 2022.11.22

- Update editions page. https://github.com/suttacentral/suttacentral/pull/2546
- Add Map data to arangoDB and add related map API. https://github.com/suttacentral/suttacentral/pull/2551
- Refactoring backend code and upgrade python version. https://github.com/suttacentral/suttacentral/pull/2544

## 2022.11.21

- Custom map https://github.com/suttacentral/suttacentral/pull/2505

## 2022.11.07

- Add separate fallen-leaves data and apply to frontend. https://github.com/suttacentral/suttacentral/issues/2525

## 2022.11.03

- Clean and optimize frontend code. 

## 2022.10.29

- Get breadcrumbs translation titles only from the API. https://github.com/suttacentral/suttacentral/issues/2299

## 2022.10.24

- Update dependencies.

## 2022.10.17

- Fix: error when executing make load-data.

## 2022.10.02

- Upgrade ArangoDB version to `3.9.3`.

## 2022.09.26

- Format acronym by rules. https://github.com/suttacentral/suttacentral/issues/2483

## 2022.09.05

- Generate Abbreviations page from data. https://github.com/suttacentral/suttacentral/issues/2485

## 2022.09.04

- Add Jataka numbers to the top level navigation #2523

## 2022.09.01

- Upgrade `Aksharamukha` and support for more script transformations.
- Change `acro` to `acronym`. suttacentral/sc-data#145
- Add enjambment support.

## 2022.08.23

- Add publication web UI.
- Make sure HTML in sutta page ToC is rendered.
- Fix:"flash of footer" when switching pages with ATB.

## 2022.08.12

- Fix: navigation bug for bi-sk #2488
- Fix: individual suttas split from ranges have wrong content. #2499

## 2022.08.06

- Add author_uid to filter publication info. #2503

## 2022.07.21

- Normalize trailing spaces. #2454
- Remove code of frontend about add trailing spaces. #2454
- Update dependencies.

## 2022.07.14

- Use SVG <defs> to shrink code for SC logo.
- Change icons SVG tag to HTML tag.

## 2022.07.08

- Extract root title from root text.

## 2022.07.06

- Introduce sc-map element. suttacentral/suttacentral#939
- Generate `acronym` from `super_extra_info`.  suttacentral/suttacentral#2470 
- Update `super_nav_details` collection `acronym` info. suttacentral/suttacentral#2470 

## 2022.06.23

- Fix: when clicking on a Table of Contents item, the page title changes to "SuttaCentral—discourses".

## 2022.06.22

- Fix: Translation title extraction failed in some cases.

## 2022.06.08

- Fix: vagga-suttas have no voice link. #2288
- Fix: some translated titles are missing from API. #2457
- Fix: back button broken. #2455

## 2022.05.23

- Show sc-voice icon in suttaplex on sutta pages.
- Update voice list information.

## 2022.05.04

- Add `Github Suttacentral awesome` link.

## 2022.04.29

- Add localization support for French and Vietnamese.

## 2022.04.20

- Add edition volumes details to publication endpoint.
- Reduce or remove need for plurals. suttacentral/suttacentral#2265
- Order translations by translator. suttacentral/suttacentral#2408

## 2022.04.14

- Fix:Parallels card data not reloaded with site language change.
- Adopt translation with 90% translation completion (originally 95%).

## 2022.04.08

- Display vnp and vns reference numbers. suttacentral/suttacentral#2426
- Update dependencies.
- Add site footer. suttacentral/suttacentral#2407
- Add "skip top main nav" accessibility link. suttacentral/suttacentral#2367

## 2022.03.30

- Serve range suttaplexes per-sutta. suttacentral/suttacentral#2409
- "search:hint" just says search:hint, doesn't return proper value suttacentral/suttacentral#2384
- In universal toolbar, search result has search:search suttacentral/suttacentral#2405
- Put hcaptcha on donations page. suttacentral/suttacentral#2419

## 2022.03.10

- Make Suttaplex Tableview's link consistent with Normalview.
- Fix: Deep links on legacy texts broken. #2372

## 2022.02.23

- Add page Pali Tipitaka. #2237

## 2022.02.09

- Update fonts, use woff2 to instead of ttf,otf. #2347
- Serve range suttas per-sutta. #2296
- Fix: Info not present on root texts. #2378
- Fix: Fragment URLs involving /subjects display erratic behavior. #2380
- Update dependencies.

## 2022.01.12

- Lift main content into light DOM. #2334
- Identify user language on static pages.
- Update lit to latest version (2.1.1)

## 2021.12.16

- Clicking outside top sheet only cause top sheet to retract. #2328
- reduce sensitivity for toolbar appearance. #2327
- Execute the scroll event according to the scroll distance.
- Add option for positioning tool bar at top. #2337
- Update dependencies.
- Try to use Cloudflare web analytics.
- Implement comments for segmented texts. #2276
- Make the service worker not load pointless files. #2346

## 2021.11.19

- Fix: ATB and title for static page essays is buggy. #2315
- Use vite instead of webpack (development mode). #2319
- Modify the code to fit the new localization directory (development mode). #2321
- Ensure reference highlights work regardless of whether the reference is actually activated. #2323

## 2021.10.27

- When loading data, the duplicate values of blurbs and names are prompted. #2312
- Prev/next should show a translation if you are coming from a translation. #2300
- Apply:Stateful URLs for parallels. #2301
- Localization update. #2297
- Ensure prev/next works in Anguttara Ones and Twos and elsewhere. #2298
- Update D&D search when navigating suttas. #2303
- Make URLs case-insensitive. #2305
- Fix:Toolbar title is wrong in some cases. #2307
- Fix: Navigation bugs. #2311
- Update dependencies. #2295

## 2021.10.14

- Open parallels by default for suttaplex in individual sutta texts. #2281
- Fix:Sutta Titles extracted for suttaplax are not always correct. #2289
- Clicking on reference should not change <title>. #2294
- Fix: Back button has problems in some cases. #2293

## 2021.10.09

- Fix: Sometimes an error message appears when switching sutta.
- Fix a logic error in sc-text-page-selector.js.
- Optimize suttaplex list loading speed.

## 2021.10.07

- Fix: Bug in publication date for SA-2. #2266
- Update dependencies.
- Let users share state of text by extending URLs. #1907
- When the user modifies the view settings, update the URL #1907
- Fix:hash # in URLs does not work as expected. #2147 #2148
- Apply: patimokkha texts: a new model. #2013

## 2021.08.30

- Rewrite the navigation module.
- Update dependencies.
- Update aksharamukha to support more scripts conversion.
- Add missing aria-label for close search
- Fix bug about: https://discourse.suttacentral.net/t/suttacentral-2021-bug-reports-here/19609/116
- Remove sentry related code.

## 2021.08.21

- Configure Ngnix uwsgi_cache.
- Add indexes to ArangoDB collections.
- Lazy loading of parallels data.
- Rewrite the breadcrumb related code.
- Use micro-sentry instead of sentry(Need to observe whether it is effective ).
- Updating the font for the Sharada script in CSS.

## 2021.08.04

- Fix: Pages sometimes do not load #2206 (Need to be constantly observed).
- Optimize module dynamic loading code.
- Adjust size of language pill for three-letter languages.
- Upgrade dependencies.

## 2021.07.24

- Table view for parallels #2139
- Upgrade python packages.
- Upgrade js dependencies.
- Upgrade litElement to lit 2.0.0-rc.2. #2132
- Upgrade Nginx version from 1.12.1 to 1.21.1.
- Fix: Transliteration: Fonts missing for some scripts. #2116
- Remove some google related items from CSP.
- Add sentry to SC.

## 2021.06.30

- Fix: CSP blocks CC0 icon.
- If dictionary entry has no definition, display the cross-reference (xr) and grammar.
- Fix High LCP in mobile.
- Fix:PWA download fails #2197
- Improve formatting of volpage nerdy-row references  #2200
- Replace Upper Case E and O as well during transliteration #2205
- Apply new volpage/alt_volpage data to parallels.
- Apply new volpage/alt_volpage data to vinaya.
- The title attribute always be the simple "Volume and page".
- Sujato nerdy-row fix #2216
- Make "downloading" box on Offline page fixed width. #2196

## 2021.06.14

- Fix: Sometimes translated titles are not being used. #2181
- Fix: When changing site language, everything goes crazy. #2180
- Sujato verse HTML #2184
- make dl, ol, ul styles work with refs in bilara texts #2185
- Populate volpage and alt_volpage in text_extra_info.json. #2186
- Fix: Reference selections are not sticky. #2190
- Fix: Pali lookup fails in some cases. #2191

## 2021.06.02

- Use the Chinese system for component names. #2006
- Let googlebot see the site as a default user.
- Keep navigation data in sc-data/structure. #1915
- Add babel-loader to webpack to support new JS features.
- Optimize code with new JS features.
- Fix: Transliteration: Many of the script labels are gibberish. #2115
- Fix: Incorrect transliteration of /e/ and /o/ in some scripts. #2114
- Fix: The problem of invalid button click on donation page in iOS.



