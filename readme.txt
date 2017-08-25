The following is and overview of the SC-Next elements and the work that still needs to be done on them.

# sc-navdrawer.html
Is the first element that is called and it loads the navigation-drawer (`app-drawer`) and populates this with the menu-tree through `paper-tree-sc` (**paper-tree.html** and **paper-tree-node.html**), parses the route through `app-route` and feeds all information through to the **page-selector.html**.

**app-drawer**
The `app-drawer` is populated with data from ../data/menu/discoursetree.json. This is just mockup data and not the real data.

Issues that need to be fixed:
    - The paper-tree menu needs to be populated with real data. An overview of what it should become you can find here: https://discourse.suttacentral.net/t/overall-text-hierarchy-for-sc-next/6101
    - The paper-tree menu needs to open at the relevant place when a url is given (right now it only opens when you go through the menu but not when somebody f.i. types /dn1/bodhi as a url)
    - The paper-tree menus for Vinaya / Abhidhamma have to be made also.

**iron-location** and **app-rout**
These parse the url given but at the moment only deal with the following url:
    - search pages: `/search?query=searchterm`
    - url with one or two terms i.e. `/`, `/dons`, `/dn`, `/dn/vagga1`, `/mn123/sujato', `/define/dictionaryterm`, etc. but not with more than 2 terms.

Issues that need to be fixed:
    - It should be possible to parse longer url with more terms. This depends on the various possibilities in the new menu with real data.  For instance, it should be able to parse something like `/sn/vagga1/samyutta1/pannasa1/vagga1` but this is to be discussed with Bhante Sujato. This also has an effect on the **page-selector.html** and the **sc-view-suttaplex.html**.


# page-selector.html
The page-selector loads the top header-bar and the toolbar within that. Depending on the selected page, the header will have a different appearance and different items in the toolbar.

The page-selector also parses the input-data and loads one of 6 possible page-views depending on the input given:
    - static pages: **sc-page-static.html**
    - search page: **sc-page-search.html**
    - dictionary page: **sc-page-dictionary.html**
    - normal html text pages: **sc-page-text.html**
    - segmented text pages from pootle output: **sc-segmented-text.html**
    - suttaplex list: **sc-view-suttaplex.html**

Issues that need to be fixed:
    - Right now it is only possible to parse routes with only 2 terms. It should be possible to parse longer routes (see description under **sc-navdrawer.html**). This is probably only important for the suttaplex list so if a longer route exists, it might be sufficient to just forward that to **sc-view-suttaplex.html** and parse it there further.


# This readme file is still under construction!
