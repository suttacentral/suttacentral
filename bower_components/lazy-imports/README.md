# \<lazy-imports\>

Declarative lazy HTML imports

## Examples

```html
<link rel="import" href="../../polymer/polymer.html">
<link rel="import" href="../../paper-button/paper-button.html">
<link rel="import" href="../lazy-imports.html">
<dom-module id="upgrade-button">
  <link rel="lazy-import" href="lazy-element.html" group="lazy">
  <template>
    <paper-button id="button" on-click="buttonPressed">Upgrade Element</paper-button>
    <lazy-element id="lazy">When upgraded, this element will have a red border</lazy-element>
  </template>
  <script>
  Polymer({
    is: 'upgrade-button',
    properties: {
    },
    buttonPressed: function(oldValue, newValue) {
      this.importLazyGroup("lazy").then((results) => {
        console.log(results);
        this.fire("import-loaded", results);
      });
    },
    behaviors: [LazyImportsBehavior]
  })
  </script>
</dom-module>
```