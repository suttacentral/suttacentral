
# SuttaCentral ChangeLog

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



