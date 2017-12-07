**Looking for pre-Daylight icons?** They're [over here](https://github.com/BrightspaceUI/icons/tree/pre-daylight).

# d2l-icons
[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/BrightspaceUI/icons)
[![Bower version][bower-image]][bower-url]
[![Build status][ci-image]][ci-url]

`d2l-icons` contains SVGs, [Polymer](https://www.polymer-project.org/)-based web components and [Sass mixins](http://sass-lang.com) to incorporate D2L iconography into your application.

For further information on this and other Brightspace UI components, see the docs at [ui.developers.brightspace.com](http://ui.developers.brightspace.com/).

## Installation

`d2l-icons` can be installed from [Bower][bower-url]:
```shell
bower install d2l-icons
```

## Icon Categories

Each icon is grouped into a category, and every icon in a particular category has the same native size.

Currently, there are 5 icon categories:

| Category Name | Description | Samples | Size | List |
| :----: | --- | :---: | :---: | :---: |
| tier1 | minimal level of detail, solid style | ![print](https://rawgit.com/BrightspaceUI/icons/master/images/tier1/print.svg?raw=true)&nbsp;&nbsp; ![gear](https://rawgit.com/BrightspaceUI/icons/master/images/tier1/gear.svg?raw=true)&nbsp;&nbsp; ![save](https://rawgit.com/BrightspaceUI/icons/master/images/tier1/save.svg?raw=true) | `18px` x `18px` | [Full set](d2l-icons.md#tier1) |
| tier2 | medium level of detail, linear style | ![audio](https://rawgit.com/BrightspaceUI/icons/master/images/tier2/file-audio.svg?raw=true)&nbsp;&nbsp; ![copy](https://rawgit.com/BrightspaceUI/icons/master/images/tier2/copy.svg?raw=true)&nbsp;&nbsp; ![news](https://rawgit.com/BrightspaceUI/icons/master/images/tier2/news.svg?raw=true) | `24px` x `24px` | [Full set](d2l-icons.md#tier2) |
| tier3 | medium level of detail, linear style | ![notifications](https://rawgit.com/BrightspaceUI/icons/master/images/tier3/notification-bell.svg?raw=true)&nbsp;&nbsp; ![help](https://rawgit.com/BrightspaceUI/icons/master/images/tier3/help.svg?raw=true)&nbsp;&nbsp; ![search](https://rawgit.com/BrightspaceUI/icons/master/images/tier3/search.svg?raw=true) | `30px` x `30px` | [Full set](d2l-icons.md#tier3) |
| html-editor | for use in the HTML editor | ![](https://rawgit.com/BrightspaceUI/icons/master/images/html-editor/bold.svg?raw=true)&nbsp;&nbsp; ![](https://rawgit.com/BrightspaceUI/icons/master/images/html-editor/indent-decrease.svg?raw=true)&nbsp;&nbsp; ![](https://rawgit.com/BrightspaceUI/icons/master/images/html-editor/source-editor.svg?raw=true) | `18px` x `18px` | [Full set](d2l-icons.md#html-editor) |
| emoji | for all your emoji needs, same detail/style as tier1 | ![](https://rawgit.com/BrightspaceUI/icons/master/images/emoji/lol.svg?raw=true)&nbsp;&nbsp; ![](https://rawgit.com/BrightspaceUI/icons/master/images/emoji/happy.svg?raw=true)&nbsp;&nbsp; ![](https://rawgit.com/BrightspaceUI/icons/master/images/emoji/angry.svg?raw=true) | `18px` x `18px` | [Full set](d2l-icons.md#emoji) |

**[&gt; Browse ALL categories and icons](d2l-icons.md)**

**Note:** Always choose the icon whose native size best matches your desired icon size, ideally exactly.

## Usage

There are many ways to consume icons -- the best technique depends on your application, technology stack and use case.

### Polymer Icon Sets

If your application is using Google's [Polymer](https://www.polymer-project.org/1.0/) framework, `d2l-icons` exposes [iron-iconset-svg](https://elements.polymer-project.org/elements/iron-iconset-svg) collections for usage with the Polymer [iron-icon](https://elements.polymer-project.org/elements/iron-icon) web component.

An iconset collection is available for each category (tier1, tier2, etc.), named `{category}-icons.html`. Also, an HTML import which imports ALL categories is also available by including `d2l-icons.html`.

Here's an example which consumes the "bookmark-filled" icon from the "tier1" category using an `iron-icon` web component:
```html
<link rel="import" href="../polymer/polymer.html">
<link rel="import" href="../iron-icon/iron-icon.html">
<link rel="import" href="../d2l-icons/tier1-icons.html">
<button>
	<iron-icon icon="d2l-tier1:bookmark-filled"></iron-icon>
	Bookmark
</button>
```

You'll need to set the size (ideally 18px, 24px or 30px) and color (ferrite, `#565a5c`) of the icon. [d2l-colors](https://github.com/Brightspace/d2l-colors-ui) comes in handy:

```html
<link rel="import" href="../d2l-colors/d2l-colors.html">
<style include="d2l-colors">
iron-icon {
	color: var(--d2l-color-ferrite);
	--iron-icon-height: 18px;
	--iron-icon-width: 18px;
}
</style>
```

If you'd like a different color when the user hovers:
```css
button:hover iron-icon, button:focus iron-icon {
	color: var(--d2l-color-celestine-minus-1);
}
```

Advantages:
- color can be manipulated using CSS
- size can be manipulated using CSS

Disadvantages:
- requires Google Polymer
- default color (ferrite) must be set
- size must be set
- no automatic support for right-to-left icons

### &lt;d2l-icon&gt; Web Component

Using Google's [iron-iconset-svg](https://elements.polymer-project.org/elements/iron-iconset-svg) and [iron-icon](https://elements.polymer-project.org/elements/iron-icon) directly (see above) works just fine, however we've created a wrapper component called `<d2l-icon>` which will automatically set the correct icon size, color, and mirror the icon horizontally for right-to-left languages.

Use it identically to `<iron-icon>`:
```html
<link rel="import" href="../polymer/polymer.html">
<link rel="import" href="../d2l-icons/d2l-icon.html">
<link rel="import" href="../d2l-icons/tier1-icons.html">
<button>
	<d2l-icon icon="d2l-tier1:bookmark-filled"></d2l-icon>
	Bookmark
</button>
```

The color will default to ferrite, and the size will be set automatically based on the category name.

To swap the color on-hover:
```css
button:hover d2l-icon, button:focus d2l-icon  {
	color: var(--d2l-color-celestine-minus-1);
}
```

If you'd like to use a non-standard size, set the `d2l-icon-height/width` variables in a [custom style block](https://www.polymer-project.org/1.0/docs/devguide/styling#custom-style):
```html
<style is="custom-style">
d2l-icon.big-icon {
	--d2l-icon-height: 50px;
	--d2l-icon-width: 50px;
}
</style>
<d2l-icon class="big-icon" icon="..."></d2l-icon>
```

Advantages:
- color (ferrite) is automatically set
- size is automatically set based on the icon category
- color can be manipulated using CSS
- size can be manipulated using CSS
- automatic support for right-to-left icons

Disadvantages:
- requires Google Polymer

### Directly with an `<img>` element

Simply point an HTML `<img>` element's `src` attribute at the icon's SVG file. You can reference the files directly from `bower_components`, or copy the icons you need as part of your application's build process.

HTML:
```html
<img src="bower_components/d2l-icons/images/tier1/bookmark-filled.svg" alt="bookmarked" />
```

Don't forget to provide alternate text if the icon isn't accompanied by any other text.

Advantages:
- easy -- no other tech needed
- color (ferrite) is automatically set
- size is automatically set
- size can be manipulated using CSS

Disadvantages:
- no ability to change the color
- no automatic support for right-to-left icons

### Background Images

In cases where the icon is purely decorative (it doesn't provide any additional information) and is accompanied by text and/or a tooltip, applying the icon using a background image can be a good approach. It hides the icon from assistive technology (like a screen reader), allowing the accompanying text to stand alone.

First, create some CSS that points at the image you'd like and sets the correct size:

```
.my-app-bookmark-icon {
	background: url('bower_components/d2l-icons/tier1/bookmark-filled.svg');
	background-size: 18px 18px; /* needed for IE */
	display: inline-block;
	height: 18px;
	width: 18px;
}
```

Then apply the CSS class to an element:
```html
<button>
	<span class="my-app-bookmark-icon"></span>
	Bookmark
</button>
```

Advantages:
- easy -- no other tech needed
- color (ferrite) is automatically set
- size can be manipulated using CSS

Disadvantages:
- no ability to change the color
- size must be set
- no automatic support for right-to-left icons

#### Background images with invisible text

If you would prefer the text accompanying the icon to be invisible, the background image approach can be combined with off-screen text. The text will be positioned outside of the visible screen area using CSS, essentially hiding it for everyone except those using assistive devices.

To position something off-screen, you can either use the [vui-offscreen](https://github.com/Brightspace/d2l-offscreen-ui) component, or follow [WebAIM's text-indent technique](http://webaim.org/techniques/css/invisiblecontent/).

For example, a button which contains only an icon:
```html
<link rel="import" href="../d2l-offscreen/d2l-offscreen.html">
<button title="Bookmark">
	<span class="my-app-bookmark-icon"></span>
	<d2l-offscreen>Bookmark</d2l-offscreen>
</button>
```

We've used the `title` attribute in this example to display tooltips on-hover.

#### Sass Mixins

If you'd like to use the [Sass](http://sass-lang.com) extension language in your application, `d2l-icons` provides an `icons.scss` file you can import which contains mixins to generate the background image CSS.

Import the mixin file and [include it](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#including_a_mixin) in a CSS class for each of the icons you'd like to use:

```scss
@import "bower_components/d2l-icons/icons.scss";

.my-app-bookmark-icon {
	@include d2l-icon-tier1-bookmark-hollow();
}

.my-app-print-icon {
	@include d2l-icon-tier1-print();
}
```

The name of the mixin will correspond to its location within the `images` directory, plus the subdirectory/category (e.g. `tier1`, `tier2`), plus the icon's filename -- all separated by hyphens.

Finally, consume the CSS class in your markup as before.

```html
<button>
	<span class="my-app-bookmark-icon"></span>
	Bookmark
</button>
```

Advantages:
- color (ferrite) is automatically set
- size is automatically set

Disadvantages:
- requires Sass
- no ability to change the color
- no automatic support for right-to-left icons

## Coding styles

### Updating or contributing new icons

#### SVG format

When contributing changes to icons, the SVG files should be properly formatted. Follow these rules:
- native icon sizes need to be one of: 18, 24 or 30
- the `<svg>` element must:
  - have a `width` and `height` attribute which match the native size
  - not have an `id` or `data-name` attribute
- the `<svg>`'s `viewBox` attribute must:
  - have an origin beginning at `0 0`
  - be exactly square (e.g. `0 0 18 18`)
  - match the icon's native size
  - not contain negative values
- there should be no `<title>` element
- there should be no inline `<style>` -- all style for line fills should be applied directly to the SVG elements
- color of SVG elements should be "ferrite" (`#565a5c`)

The best way to have most of these rules applied for you automatically is to put the icon through [SVGOMG](https://jakearchibald.github.io/svgomg/) with the "remove title" and "prettify code" options selected.

Here's a sample of a properly formatted SVG:

```svg
<svg width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18">
  <path fill="#565a5c" d="..."/>
</svg>
```

#### Auto-generated files

The Polymer iconset files and Sass `icons.scss` file are automatically generated, so when making icon modifications, re-generate these files by running `npm run build`.

#### Bidirectionality

When rendered in a right-to-left direction, any icons which show directionality in terms of time (back/forward, next/previous, etc.) need to be mirrored horizontally. If the underlying `<svg>` element has a `mirror-rtl` attribute set, the `<d2l-icon>` component will do this automatically.

```svg
<svg mirror-in-rtl="true" ...>
  ...
</svg>
```

To learn more about how best to determine if an icon should be mirrored, refer to [Google's Material Design Bidirectionality](https://material.google.com/usability/bidirectionality.html) documentation.

[bower-url]: http://bower.io/search/?q=d2l-icons
[bower-image]: https://badge.fury.io/bo/d2l-icons.svg
[ci-url]: https://travis-ci.org/BrightspaceUI/icons
[ci-image]: https://travis-ci.org/BrightspaceUI/icons.svg?branch=master
