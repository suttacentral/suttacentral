[![Build Status](https://travis-ci.org/t2ym/i18n-number.svg?branch=master)](https://travis-ci.org/t2ym/i18n-number)
[![Coverage Status](https://coveralls.io/repos/github/t2ym/i18n-number/badge.svg?branch=master&build=26)](https://coveralls.io/github/t2ym/i18n-number?branch=master)
[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/t2ym/i18n-number)
[![Bower](https://img.shields.io/bower/v/i18n-number.svg)](https://customelements.io/t2ym/i18n-number/)

### i18n-number

Wrapper element for [Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat).

[Demo](https://www.webcomponents.org/element/t2ym/i18n-number/demo/demo/index.html) and [API Docs](https://www.webcomponents.org/element/t2ym/i18n-number/elements/i18n-number)

<img src="https://raw.githubusercontent.com/wiki/t2ym/i18n-number/i18n-number-demo.gif" width="600px">

### Install

```
    bower install --save i18n-number
```

### Import

```html
    <link rel="import" href="/path/to/bower_components/i18n-number/i18n-number.html">
```

### Usage

```html
    <i18n-number 
      lang="en"
      options='{ "style": "currency", "currency": "USD" }' 
      >123456.78</i18n-number>
```

This renders as follows:

```
    $123,456.78
```

### License

[BSD-2-Clause](https://github.com/t2ym/i18n-number/blob/master/LICENSE.md)
