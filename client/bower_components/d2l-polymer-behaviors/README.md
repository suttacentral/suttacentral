# d2l-polymer-behaviors
[![Bower version][bower-image]][bower-url]
[![Build status][ci-image]][ci-url]

Shared [Polymer](https://www.polymer-project.org/1.0/)-based behaviors and modules for implementing and consuming web components.

## Installation

`d2l-polymer-behaviors` can be installed from [Bower][bower-url]:
```shell
bower install d2l-polymer-behaviors
```

## Usage

Include the [webcomponents.js](http://webcomponents.org/polyfills/) "lite" polyfill (for browsers who don't natively support web components), then import the component or scripts as needed.

```html
<head>
	<script src="https://s.brightspace.com/lib/webcomponentsjs/0.7.21/webcomponents-lite.min.js"></script>
	<link rel="import" href="../d2l-polymer-behaviors/d2l-dom-focus.html">
</head>
```

#### Methods

**D2L.Dom**

```javascript
// returns null or the closest ancestor that fulfills the specified predicate fxn
D2L.Dom.findComposedAncestor(node, predicate);

// gets the composed children (including shadow children & distributed children)
D2L.Dom.getComposedChildren(element);

// gets the composed parent (including shadow host & insertion points)
D2L.Dom.getComposedParent(node);

// returns true/false whether the specified ancestorNode is an ancestor of node
D2L.Dom.isComposedAncestor(ancestorNode, node);
```

**D2L.Dom.Focus**

```javascript
// get first focusable child or descendant
D2L.Dom.Focus.getFirstFocusableDescendant(element);

// get last focusable child or descendant
D2L.Dom.Focus.getLastFocusableDescendant(element);

// get the next focusable child, sibling, etc.
D2L.Dom.Focus.getNextFocusable(element);

// get the previous focusable child, sibling, etc.
D2L.Dom.Focus.getPreviousFocusable(element);

// get the nearest focusable ancestor
D2L.Dom.Focus.getPreviousFocusableAncestor(element);

// check is focusable (tabindex or white-listed elements)
D2L.Dom.Focus.isFocusable(element);
```

**D2L.Dom.Visibility**

```javascript
// checks DOM visibility (includes inline & computed style of element and ancestors)
// ... does not check opacity, elements hidden due to overflow or scrolled out of view
D2L.Dom.Visibility.isVisible(element);
```

**D2L.Gestures.Swipe**

```javascript
// sets up event listeners for swipe gesture
D2L.Gestures.Swipe.register(element);

// listen for custom swipe event
element.addEventListener('d2l-swipe', function (e) {
	console.log(
		e.detail.distance,             // .x/.y
		e.detail.direction.angle,      // deg
		e.detail.direction.horizontal, // left/right
		e.detail.direction.vertical,   // up/down
		e.detail.duration              // ms
	);
}.bind(this));

// unregister event listeners for swipe gesture
D2L.Gestures.Swipe.unregister(element);
```

**D2L.Id**

```javascript
// gets a unique indexed id (for lifetime of page)
D2L.Id.getUniqueId();
```

### Usage in Production

In production, it's recommended to use a build tool like [Vulcanize](https://github.com/Polymer/vulcanize) to combine all your web components into a single import file. [More from the Polymer Docs: Optimize for Production](https://www.polymer-project.org/1.0/tools/optimize-for-production.html)...

## Coding styles

See the [VUI Best Practices & Style Guide](https://github.com/Brightspace/valence-ui-docs/wiki/Best-Practices-&-Style-Guide) for information on VUI naming conventions, plus information about the [EditorConfig](http://editorconfig.org) rules used in this repo.

[bower-url]: http://bower.io/search/?q=d2l-polymer-behaviors
[bower-image]: https://img.shields.io/bower/v/d2l-polymer-behaviors.svg
[ci-url]: https://travis-ci.org/Brightspace/d2l-polymer-behaviors-ui
[ci-image]: https://travis-ci.org/Brightspace/d2l-polymer-behaviors-ui.svg?branch=master
