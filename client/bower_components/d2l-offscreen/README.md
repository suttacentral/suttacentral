# d2l-offscreen
[![Bower version][bower-image]][bower-url]
[![Build status][ci-image]][ci-url]

This component contains a [Polymer](https://www.polymer-project.org/1.0/)-based web component and mixin, as well as a [Sass mixin](http://sass-lang.com/). Any of these can be used to position elements off the screen in an accessible manor.

For further information on this and other D2L UI components, see the docs at [ui.valence.d2l.com](http://ui.valence.d2l.com/).

## Installation

`d2l-offscreen` can be installed from [Bower][bower-url]:
```shell
bower install d2l-offscreen
```

## Usage

Off-screen elements are valuable from an accessibility perspective when you wish to have elements which are only visible to screen readers. For more information, read [WebAIM's article on Invisible Content](http://webaim.org/techniques/css/invisiblecontent/).

### Polymer Web component

Include the [webcomponents.js](http://webcomponents.org/polyfills/) "lite" polyfill (for browsers who don't natively support web components), then import `d2l-offscreen.html`.

```html
<head>
	<script src="https://s.brightspace.com/lib/webcomponentsjs/0.7.21/webcomponents-lite.min.js"></script>
	<link rel="import" href="../d2l-offscreen/d2l-offscreen.html">
</head>
```

The `<d2l-offscreen>` custom element can now be used in your markup, the children of which will be hidden offscreen.

```html
<d2l-offscreen>This message will only be visible to assistive technology, such as a screen reader.</d2l-offscreen>
```

### Polymer Mixin

Alternatively, you can apply the offscreen styles to an existing element using the mixin.

You'll still include the web component polyfill, but instead of importing `d2l-offscreen.html`, import `d2l-offscreen-shared-styles.html`. Include `d2l-offscreen-shared-styles` on your style block and apply the `--d2l-offscreen` mixin to any CSS selector:

```html
<link rel="import" href="../d2l-offscreen/d2l-offscreen-shared-styles.html">
<style include="d2l-offscreen-shared-styles">
my-element {
	@apply(--d2l-offscreen);
}
```

More on [Polymer shared style modules](https://www.polymer-project.org/1.0/docs/devguide/styling#style-modules)...

### Sass Mixin

Alternatively, to position an element offscreen using the Sass mixin, apply the `d2l-offscreen()` mixin to any CSS selector.

For example, to hide this message:
```html
<p class="offscreen">This message will only be visible to assistive technology, such as a screen reader.</p>
```

SCSS:
```scss
@import 'bower_components/d2l-offscreen/offscreen.scss';
.offscreen {
	@include d2l-offscreen();
}
```

## Coding styles

See the [VUI Best Practices & Style Guide](https://github.com/Brightspace/valence-ui-docs/wiki/Best-Practices-&-Style-Guide) for information on D2L UI naming conventions, plus information about the [EditorConfig](http://editorconfig.org) rules used in this repo.

[bower-url]: http://bower.io/search/?q=d2l-offscreen
[bower-image]: https://img.shields.io/bower/v/d2l-offscreen.svg
[ci-image]: https://travis-ci.org/BrightspaceUI/offscreen.svg?branch=master
[ci-url]: https://travis-ci.org/BrightspaceUI/offscreen
