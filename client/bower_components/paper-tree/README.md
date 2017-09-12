# \<paper-tree\>

[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg?style=flat-square)](https://beta.webcomponents.org/element/vpusher/paper-tree)

Display a browsable tree of nodes (`<paper-tree-node>`) with expandable/collapsible capabilities and actions menu for each node.

Each node is defined by a **name**, an **icon**, an **open** state (expanded/collapsed) and an **actions** menu.

Example:
<!---
```
<custom-element-demo>
  <template>
    <script src="../webcomponentsjs/webcomponents-lite.js"></script>
    <link rel="import" href="../iron-icons/notification-icons.html">
    <link rel="import" href="../iron-icons/av-icons.html">
    <link rel="import" href="paper-tree.html">
    <next-code-block></next-code-block>
  </template>
</custom-element-demo>
```
-->
```html
<paper-tree data='{
    "name": "Media Center",
    "icon": "weekend",
    "open": true,
    "children": [{
        "name": "Movies",
        "icon": "av:movie",
        "children": [{
            "name": "Interstellar",
            "icon": "theaters"
        }, {
            "name": "The Godfather",
            "icon": "theaters"
        }, {
            "name": "Pulp Fiction",
            "icon": "theaters"
        }]
    }, {
        "name": "TV Shows",
        "icon": "notification:live-tv",
        "children": [{
            "name": "Breaking Bad",
            "icon": "theaters"
        }, {
            "name": "Game of Thrones",
            "icon": "theaters"
        }]
    }]}'
    actions='[{
        "label": "Play",
        "event": "play"
    }]'>
 </paper-tree>
```

## Installation

First, make sure you have [Bower](https://bower.io/) and the [Polymer CLI](https://www.npmjs.com/package/polymer-cli) installed.

Then,

```
bower install
polymer serve -o
```

## Usage

Add a `<paper-tree>` element to your page and set the `data` attribute:

```
<paper-tree data='{"name": "root"}'><paper-tree>
```

See documentation to know the options and structure of the `data` attribute.

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## History

* **1.0.3:** lazy loading enablement.
* **1.0.2:** full shadow dom support.
* **1.0.1:** ability to select a node clicking the icon.
* **1.0.0:** initial release.

## License

MIT license
