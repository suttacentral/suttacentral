# d2l-menu
[![Bower version][bower-image]][bower-url]
[![Build status][ci-image]][ci-url]

A [Polymer](https://www.polymer-project.org/1.0/)-based web component for menus.

## Installation

`d2l-menu` can be installed from [Bower][bower-url]:
```shell
bower install d2l-menu
```

## Usage

Include the [webcomponents.js](http://webcomponents.org/polyfills/) "lite" polyfill (for browsers who don't natively support web components), then import the opener and content components as needed:

```html
<head>
	<script src="https://s.brightspace.com/lib/webcomponentsjs/0.7.21/webcomponents-lite.min.js"></script>
</head>
```

### Menu

A basic menu can be defined using `d2l-menu` and a combination of `d2l-menu-item` and `d2l-menu-item-link`.  **Important**: specify a label on your `d2l-menu` for screen-readers.

```html
<link rel="import" href="../d2l-menu/d2l-menu.html">
<link rel="import" href="../d2l-menu/d2l-menu-item.html">

<d2l-menu label="Astronomy">
	<d2l-menu-item text="Introduction"></d2l-menu-item>
	<d2l-menu-item text="Searching the Heavens"></d2l-menu-item>
	...
</d2l-menu>
```

* `label` - required to announce menu text with screen-readers

**Note:** `d2l-menu` renders without an outer border since it's typically used in a context where a containing element defines a border (ex. `d2l-dropdown-menu` or side nav).

### Nested Menus

Nested menus can be defined by placing a `d2l-menu` inside a `d2l-menu-item`.  For nested menus, a `label` attribute is automatically applied using the text attribute of the `d2l-menu-item` that contains it - no need to duplicate this value.  A "return" menu item will be added to the top of the nested menu by default.

```html
<link rel="import" href="../d2l-menu/d2l-menu.html">
<link rel="import" href="../d2l-menu/d2l-menu-item.html">

<d2l-menu label="Astronomy">
	...
	<d2l-menu-item text="The Planets">
		<d2l-menu>
			<d2l-menu-item text="Mercury"></d2l-menu-item>
			<d2l-menu-item text="Venus"></d2l-menu-item>
			<d2l-menu-item text="Earth"></d2l-menu-item>
			...
		</d2l-menu>
	</d2l-menu-item>
	...
</d2l-menu>
```

### Menu Items

By default, there are several menu item types provided. These include `d2l-menu-item` (for JS handlers), `d2l-menu-item-link` (for navigating), and `d2l-menu-item-checkbox`/`d2l-menu-item-radio` (for selection).

While navigation can be done in JS too, `d2l-menu-item-link` gives users the ability to right-click and open in a new tab.  If providing a JS handler, wire-up to the `d2l-menu-item-select` event.  In addition, a `d2l-menu-item-separator` can be used to semantically separate menu items.

The selection menu items act as you would expect a checkbox or radio item to act. Multiple checkboxes in the same menu may be selected, but only one radio item in a given `<d2l-menu>` may be selected at once (i.e. selecting one option will deselect all the other `d2l-menu-item-radio` items).

```html
<link rel="import" href="../d2l-menu/d2l-menu.html">
<link rel="import" href="../d2l-menu/d2l-menu-item.html">
<link rel="import" href="../d2l-menu/d2l-menu-item-link.html">
<link rel="import" href="../d2l-menu/d2l-menu-item-separator.html">
<link rel="import" href="../d2l-menu/d2l-menu-item-checkbox.html">
<link rel="import" href="../d2l-menu/d2l-menu-item-radio.html">

<d2l-menu id="menu" label="Astronomy">
	<d2l-menu-item text="Introduction"></d2l-menu-item>
	<d2l-menu-item text="The Planets"></d2l-menu-item>
	<d2l-menu-item-separator></d2l-menu-item-separator>
	<d2l-menu-item-link href="http://...">Extra Stuff</d2l-menu-item-link>
	<d2l-menu-item-link href="http://..." prevent-default>Will not open automatically</d2l-menu-item-link>
</d2l-menu>

<d2l-menu id="checkbox-menu" label="Some Options">
	<d2l-menu-item-checkbox text="Checkbox 1" value="1"></d2l-menu-item-checkbox>
	<d2l-menu-item-checkbox text="Checkbox 2" value="2"></d2l-menu-item-checkbox>
	<d2l-menu-item-checkbox text="Checkbox 3" value="3"></d2l-menu-item-checkbox>
</d2l-menu>

<d2l-menu id="radio-menu" label="Some Options">
	<d2l-menu-item-radio text="Radio 1" value="1" selected></d2l-menu-item-radio>
	<d2l-menu-item-radio text="Radio 2" value="2"></d2l-menu-item-radio>
	<d2l-menu-item-radio text="Radio 3" value="3"></d2l-menu-item-radio>
</d2l-menu>
```

* `text` - required for `d2l-menu-item`
* `href` - required for `d2l-menu-item-link`
* `value` - required for `d2l-menu-item-checkbox`/`d2l-menu-item-radio`
* `prevent-default` - optional for `d2l-menu-item-link` - disables normal link behavior.  This can help if you want both a JS handler and the browser's 'open in new tab' functionality (e.g. popup window links).
* `selected` - optional for `d2l-menu-item-checkbox`/`d2l-menu-item-radio`, this will set the item to be selected by default.

```javascript
menu.addEventListener('d2l-menu-item-select', function(e) {
	console.log('item selected:', e.target);
});
```

### Usage in Production

In production, it's recommended to use a build tool like [Vulcanize](https://github.com/Polymer/vulcanize) to combine all your web components into a single import file. [More from the Polymer Docs: Optimize for Production](https://www.polymer-project.org/1.0/tools/optimize-for-production.html)...

## Coding styles

See the [VUI Best Practices & Style Guide](https://github.com/Brightspace/valence-ui-docs/wiki/Best-Practices-&-Style-Guide) for information on VUI naming conventions, plus information about the [EditorConfig](http://editorconfig.org) rules used in this repo.

[bower-url]: http://bower.io/search/?q=d2l-menu
[bower-image]: https://img.shields.io/bower/v/d2l-menu.svg
[ci-url]: https://travis-ci.org/BrightspaceUI/menu
[ci-image]: https://travis-ci.org/BrightspaceUI/menu.svg?branch=master
