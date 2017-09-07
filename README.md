# SuttaCentral server and client repositry
[![Build Status](https://travis-ci.org/suttacentral/next-sc.svg?branch=development)](https://travis-ci.org/suttacentral/next-sc)

## Running the project
0. Install [docker](https://docs.docker.com/engine/installation/) and [docker-compose](https://docs.docker.com/compose/install/)
1. Clone the repo `git clone git@github.com:suttacentral/next-sc.git`
2. Cd into the repo `cd next-sc`
3. Checkout to the development branch `git checkout development`
4. run `make prepare-host` in order to make some small adjustment on the host machine so that we can run elasticsearch
5. run `make build-all` in order to build all images
6. run `make run-dev` to start our services in the development mode.
7. in order to load the data run `make load_data`. It might take a while.
8. To index data in elasticsearch run `make index_elasticsearch`

## Loading the data
In order to load the data to the db:
0. If you don't have the data folder yet
 * run `cd server && git clone git@github.com:suttacentral/nextdata.git`
 * Rebuild sc-flasks container `make rebuild-flask`
1. ensure server is up and run `make load_data`

## Docs
API documentation is available at `/api/docs`.

Swagger documentation is generated from doc strings in api methods. The docstring should use 
[OpenAPI specification 2.0](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#operation-object) yaml format. 
This yaml docstring will be interpreted as OpenAPI's Operation Object. 

## Docker modes
There are different modes available for our project. All of them can be run with command `make run-<env name>`


#### Development
In this mode server, nignx, client dirs are mounted in Docker's containers so that any local changes take place in the container as well.

In addition `Uwsgi+Flask` expose port `5000` on local host, arangodb port `8529` and elasticsearch ports `9200` and `9300`.

## Makefile
There is a Makefile with following commands:
* `prepare-host` - Set `vm.max_map_count` to `262144` because otherwise ElasticSearch won't work
* `build-all` - Build all containers:
    * `build-flask`
    * `build-arangodb`
    * `build-nginx`
    * `build-elasticsearch`
    * `build-swagger`
* `rebuild-all` - Remove all containers and volumes and rebuilds them.
    * `rebuild-flask`
    * `rebuild-arangodb`
    * `rebuild-nginx`
    * `rebuild-elasticsearch`
    * `rebuild-swagger`
* `run-dev` - Run containers in development mode
* `run-dev-no-logs` - Run containers in development mode without output to the console
* `stop` - Stops all containers:
    * `stop-arangodb`
    * `stop-flask`
    * `stop-nginx`
    * `stop-elasticsearch`
    * `stop-swagger`
* `rm` - Remove all containers:
    * `rm-arangodb`
    * `rm-flask`
    * `rm-nginx`
    * `rm-elasticsearch`
    * `rm-swagger`
* `rm-all-volumes` - Remove all volumes:
    * `rm-db-volume`
    * `rm-elasticsearch-volume`
    * `rm-nginx-volume`
    * `rm-socket-volume`
* `clean-all` - Remove all containers and volumes:
    * `clean-arangodb`
    * `clean-flask`
    * `clean-nignx`
    * `clean-elasticsearch`
    * `clean-swagger`
* `shell-arangodb` - Opens Bash shell in arangodb container
* `shell-flask` - Opens Bash shell in flask container
* `shell-nginx` - Opens Bash shell in nginx container
* `shell-elasticsearch` - Opens Bash shell in elasticsearch container
* `shell-swagger`
* `logs` - Output all logs to the terminal.:
    * `logs-flask`
    * `logs-arangodb`
    * `logs-nginx`
    * `logs-elasticsearch`
    * `logs-swagger`
* `reload-nginx` - Reloads nginx
* `reload-uwsgi` - Reloads uWSGI+Flask
* `prepare-tests` - Starts containers in test mode and wait for start-ups to finnish
* `test` - Run tests inside containers.
* `load_data` - Loads data from `server/nextdata` folder to the db


## Working with ArangoDB
Our project is using [ArangoDB](https://www.arangodb.com/) on the back-end. In the development mode it exposes port 8529 on the localhost.
You can access it's web interface on <http://127.0.0.1:8529>.

In the code that is running in the docker containers you can access the database on the adress `sc-arangodb` on the same port.

In the development mode:
    
**Login**: `root`

**password**: `test`

In order to change password you have to change `ARANGO_ROOT_PASSWORD` in env's `.env` fiel eg. If you want to change it in development env you have to edit `.dev.env` file.

## Nginx proxy
Our project is using nginx as a HTTP reverse proxy. It is responsible for serving static files and passing `/api/*` endpoints to the uwsgi+flask server.

## Working with elasticsearch
Expose ports `9200` and `9300`.

## Flask + uWSGI
Flask is hidden behind uWSGI. uWsgi communicate with nignx with unix socket. The socket file (`uwsgi.sock`) is in `socket-volume` shared beetwen `nginx` and `flask+uwsgi`

### Creating db migrations
In order to create database migration in out app you have to follow those simple steps:
1. in `server/server/migrations/migrations` folder create file with name `<migration_name>_<id of the last migration + 1>.py`
2. Add this line at the top of the file: `from ._base import Migration`
3. Create class that inherits from `Migration` class
4. Set `migration_id` class attribute to match the file name
5. create some tasks. Each task should be separate method accepting only `self` as a parameter.
6. Set tasks = `['first_task', 'second_task', ...]` in class attributes.
7. You are good to go just remember to never change the 'migration_id'
otherwise your migrations might fail.
 
For example:
```python
from common.arangodb import get_db
from migrations.base import Migration


class InitialMigration(Migration):
    migration_id = 'initial_migration_001'
    tasks = ['create_collections']

    def create_collections(self):
        """
        Creates collections of suttas and collection of edges between them.
        """
        db = get_db()
        graph = db.create_graph('suttas_graph')
        suttas = graph.create_vertex_collection('suttas')
        parallels = graph.create_edge_definition(
            name='parallels',
            from_collections=['suttas'],
            to_collections=['suttas']
        )
```

## Flask manage tasks
1. `python manage.py migrate` - Run migrations
2. `python manage.py list_routes` - Lists all available routes/URLs.


# Client

The following is and overview of the SC-Next elements and the work that still needs to be done on them.

Next to the below issues, the CSS has to be changed in places by Bhante Sujato.

Fonts will also need to be installed.

I have not been very consistent with the "notify: true" and with the function names starting with or without a "_" so this needs to be cleaned up.

The main issues for the backend would involve the suttaplex-card and -view, which is discussed under the relevant section below.

# sc-navdrawer.html
Is the first element that is called and it loads the navigation-drawer (`app-drawer`) and populates this with the menu-tree through `paper-tree-sc` (**paper-tree.html** and **paper-tree-node.html**), parses the route through `app-route` and feeds all information through to the **page-selector.html**.

## app-drawer
The `app-drawer` is populated with data from ../data/menu/discoursetree.json. This is just mockup data and not the real data.

Issues that need to be fixed:
  - The paper-tree menu needs to be populated with real data. An overview of what it should become you can find here: https://discourse.suttacentral.net/t/overall-text-hierarchy-for-sc-next/6101
  - The paper-tree menu needs to open at the relevant place when a url is given (right now it only opens when you go through the menu but not when somebody f.i. types /dn1/bodhi as a url)
  - The paper-tree menus for Vinaya / Abhidhamma have to be made also.

## iron-location and app-rout
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


# sc-page-static.html
The static pages are rather straightforward. An additional larger toolbar is added and depending on the route it chooses one of 4 different elements through `iron-pages` that are filed in the `/static` folder. The texts are just mockup and Bhante Sujato needs to re-write them.


# sc-page-search.html
The search page opens when a search string is typed into the search-input-box in the toolbar. 
At the moment it only opens one of 3 possible mockup files `../data/search/results.json`, `results2.json` and `results3.json`. The main difference is the length of each to test various properties of the page. This has to be replaced by the real search results from Elasticsearch but gives an input-format for the json files.

The loading is done within an iron-scroll-threshold in case there are very large numbers of results.

If the results are in more than one category of root texts, translations, and dictionaries, and there are more than ten results in total, a dropdown selection menu appears at the top.


# sc-page-dictionary.html
The dictionary results page shows the results found in all dictionaries of a specific word. The route `/define/dictionaryterm`shows which terms is searched for. All dictionaries are ready and in `../data/dictionaries` accept the pts-dictionary, which is still being edited by Bhante Sujato.

Related items are in a drawer on the right, which can be opened from a menu-item at the top-right. 

Issues that need to be fixed:
  - Bhante Sujato to fix the pts-dictionary and Ayya Vimala to jsonify it.
  - The related items are now loaded straight from a mockup file in `../data/dictionaries/related.json`. This will have to be changed to relevant terms. Check on the live SC site how adjacent and similar terms are calculated and create a function to do this.


# sc-page-text.html
This element loads the plain html pages which are at the moment defined as all pages that have an author which is not "sujato" or "pali". It only loads English pages at the moment. Files are loaded from the mockup directory in `../data/texts/en/bodhi`. The paragraph numbers are loaded from `../data/paragraphtitles.json`(this file is complete and correct).

The relevant suttaplex card is shown at the top, hidden behind a dropdown (`addons/sc-text-node.html`).

Via the settings-menu in the toolbar, paragraph numbers can be displayed or hidden as requested.

Title, full Author name and Meta data are fired back to the page-selector for use in the toolbar.

Issues that need to be fixed:
  - Other language suttas need to be loaded and displayed correctly as well depending on how this will work with the backend.


# sc-segmented-text.html
This element loads the segmented text pages that are created in Pootle, which are at the moment defined as all pages that have an author which is "sujato" or "pali". This only works with texts translated by Sujato at the moment but will in the long run have to extend also to pali text pages where there is no translation available.

This elements first loads the html markup file from `../data/texts/markup`, then the translation by Sujato from `../data/texts/en/sujato` and the pali from `../data/texts/pi` as well as the file that contains the paragraph numbers from `../data/paragraphtitles.json`. 

The relevant suttaplex card is shown at the top, hidden behind a dropdown (`addons/sc-text-node.html`).

Via the settings-menu in the toolbar, paragraph numbers can be displayed or hidden as requested. Via this menu, also the type of view (none, side-by-side, line-by-line or popup) can be chosen to display the english and pali in relation to each other.
The type of script used for the pali can be chosen.

Title, full Author name and Meta data are fired back to the page-selector for use in the toolbar.

Issues that need to be fixed:
  - Right now it only works for the segmented translations by Sujato and for the pali thereof and only for the files I have for that with is all AN, SN, MN1-123. DN is not yet in there so the DN file that is shown in the menu under DN1 is actually MN1 just to try things out but will need to be replaced.
  - The pali lookup tool does not yet work. See remarks below under `settings-menu.html`.
  - Only sujato is recognised as an author so that might have to change. It also only works for the pali right now if a translated file for Sujato exists too.


# sc-view-suttaplex.html
This element displays a range of suttaplex cards or just one, depending on the route chosen. 
It loads a (mockup) file from `../data/list`which lists the relevant Nikaya's name in pali, in various translations and the descriptions in various translations. It also lists which vaggas are part of this (with translated names and descriptions) and which suttas are part of which vagga.

The various translations in the json file are shown when another site-language is chosen.

For more info: https://discourse.suttacentral.net/t/suttaplex-list-pages/4762

When a range of suttaplex cards is displayed, it also displays the title and vaggas, etc. with some text in an expander above.
This will need to be discussed further with Sujato with regards to the new structure he wants in the navigation-drawer.
For instance `/dn` would result in a list of all suttaplex-cards for the DN, sorted per vagga with relevant vagga titles and explanatory texts in expanders, `/dn/vagga1` would result in a list of just the first vagga, while `/dn1` would result in just one opened suttaplex-card for that specific sutta.

Issues that need to be fixed:
  - This system now works for the DN and MN but for more complex texts like the AN and SN it will not work yet. It is also not entirely clear to me how Sujato wants to do this. For instance, in the old system we had `/sn`and `/sn1` as lists but now Sujato would like it to be different and have something like `/sn`, `sn/vagga1`, `/sn/vagga1/samyutta1`, `/sn/vagga1/samyutta1/pannasa1`and `/sn/vagga1/samyutta1/pannasa1/vagga1`all as various possible list-choices with the relevant headers and explanatory texts (which do not yet exist but the system in this suttaplex element can work without that i.e. if no explanatory text exists, it simply does not display the expander either). So the would mean the `/sn1` no longer exists as a choice but for instance `/sn1.1` will show the one opened suttaplex-card for that specific sutta.
  - This element can now only distinguish between vaggas and individual suttas and defines the latter as anything with a number in it, so that is rather limited and will have to change once the new structure is clear.
  - I have been toying with the idea to merge the two lists i.e. the list imported here that is used for the suttaplex-view and the list that is imported for the paper-tree in the navigation-drawer. Both list overlapping information so that might be an idea.
  - Instead of a `dom-repeat` of the suttaplex-cards in the array, it might be better to use an `iron-list` because for some of these there are thousands of cards so it might become too slow otherwise.

## suttaplex-card (`/suttaplex`)
The suttaplex-card consists of 3 elements. **sc-suttaplex.html**, **sc-view-parallels.html** and **sc-parallels.html**.

The **sc-suttaplex.html** loads a file for the relevant sutta from `../data/suttas`. Each sutta has it's own file here but this might have to be structured better. This is the actual outline of the card, including various titles and info in the relevant chosen site-language if it exists. 
This element then also loads the **sc-view-parallels.html**, which is the outline of the parallels-table.
This parallels-table is further populated with the additional info for each relevant parallel sutta, which is loaded from `../data/suttas` in **sc-parallels.html**.

If a card in the list is opened, this info is fired back to the `sc-view-suttaplex.html`.


# Other elements
Other elements should be self-explanatory. Just some issues that need to be fixed:

## menus/sc-toolbar.html
Issues:
  - The paper badge that appears only on text-pages next to the link to the Discourse forum now only shows the number 20 but it should show the correct search results instead.
  - The paper badge has the annoying habbit of occasionally disappearing for no apparent reason. It seems that it calculates the position too far to the right so as to go off the screen. `this.$$('paper-badge').updatePosition();` does not seem to work to rectify this. It seems to also show this behavior here: https://github.com/PolymerElements/paper-badge/pull/12 and briefly show in the correct position but then disappear to the right.

## menus/settings-menu.html and addons/sc-dictionary-lookup.html
Issues: 
    -The dictionary lookup does not work yet. There are two of them: Pali to various languages and Chinese to English. A mockup dictionary is in `data/dictionaries/pi2en.json` but this is not the latest version, only for testing. The matching should be fuzzy so no direct word-to-word lookup.
  - The repository with the basic code for this tool is https://github.com/blake-sc/palilookup but is broken.