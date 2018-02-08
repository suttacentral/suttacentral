# Changelog

## 3.0.0
- **BREAKING** updated to Polymer 2, nothing else changed on the element
  - updated element to use the Polymer 2 syntax
  - updated demo to use iron-demo-helpers
  - updated index documentation to version 3 of iron-component-page

## 2.0.0
- **BREAKING** Change the name of the `title` property to be `pageTitle`. This is friendlier with Googlebot, we've found.

## 1.2.1
- Add missing `dom-module` wrapper.

## 1.2.0
- Updated Polymer dependency to allowe newer versions of Polymer.
  - This makes Bower dependency resolution easier. Not sure why it was pinned to begin with.
- **BREAKING** Removed the explicit spaces around the `separator`.
  - If you were using the default value for this you'll notice no difference.
  - If you were specifying this property, you'll now need to add your own spaces.