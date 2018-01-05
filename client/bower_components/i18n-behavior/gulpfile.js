/*
@license https://github.com/t2ym/i18n-behavior/blob/master/LICENSE.md
Copyright (c) 2016, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/
const gulp = require('gulp');
const gulpif = require('gulp-if');
const size = require('gulp-size');
const debug = require('gulp-debug');
const gutil = require('gulp-util');
const sort = require('gulp-sort');
const fs = require('fs');
const path = require('path');
const del = require('del');
const merge = require('merge-stream');
const runSequence = require('run-sequence');
const through = require('through2');
const JSONstringify = require('json-stringify-safe');
//const babel = require('gulp-babel');
const crisper = require('gulp-crisper');
const minifyHtml = require('gulp-minify-html');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const vulcanize = require('gulp-vulcanize');
const replace = require('gulp-replace');
const i18nPreprocess = require('gulp-i18n-preprocess');
const i18nLeverage = require('gulp-i18n-leverage');

// Global object to store localizable attributes repository
var attributesRepository = {};

// Store Bundles for i18n-behavior
var bundles = {};

gulp.task('clean', function() {
  return del([ 
    'test/src-lite',
    'test/preprocess',
    'test/preprocess-lite',
    'test/preprocess-raw',
    'test/vulcanize',
    'test/vulcanize-lite',
    'test/minify',
    'test/minify-lite'
  ]);
});

// Scan HTMLs and construct localizable attributes repository
gulp.task('scan', function () {
  return gulp.src([ 'test/src/**/*.html', '!test/src/**/*-test.html' ]) // input custom element HTMLs
    .pipe(i18nPreprocess({
      constructAttributesRepository: true, // construct attributes repository
      attributesRepository: attributesRepository, // output object
      srcPath: 'test/src', // path to source root
      attributesRepositoryPath: 'i18n-attr-repo.html', // path to i18n-attr-repo.html
      dropHtml: true // drop HTMLs
    }))
    .pipe(gulp.dest('test/preprocess')); // no outputs; dummy output path
});

gulp.task('src-lite', function () {
  return gulp.src([ 'test/src/**/*' ])
    .pipe(gulpif('*-test.html', 
      replace('../webcomponentsjs/webcomponents.min.js',
              '../webcomponentsjs/webcomponents-lite.min.js')))
    .pipe(gulp.dest('test/src-lite'));
});

// Preprocess templates and externalize JSON
gulp.task('preprocess', function () {
  console.log('attributesRepository = ' + JSON.stringify(attributesRepository, null, 2));
  var elements = gulp.src([ 'test/src/**/*.html', '!test/src/**/*-test.html' ]) // input custom element HTMLs
    .pipe(i18nPreprocess({
      replacingText: true, // replace UI texts with {{annotations}}
      jsonSpace: 2, // JSON format with 2 spaces
      srcPath: 'test/src', // path to source root
      attributesRepository: attributesRepository // input attributes repository
    }))
    .pipe(gulp.dest('test/preprocess')); // output preprocessed HTMLs and default JSON files to dist

  var html = gulp.src([ 'test/src/**/*-test.html' ]) // non-custom-element HTMLs
    .pipe(i18nPreprocess({
      replacingText: true, // replace UI texts with {{annotations}}
      jsonSpace: 2, // JSON format with 2 spaces
      srcPath: 'test/src', // path to source root
      force: true, // force processing even without direct i18n-behavior.html import
      attributesRepository: attributesRepository // input attributes repository
     }))
    .pipe(gulp.dest('test/preprocess'));

  var js = gulp.src([ 'test/src/**/*.js' ])
    .pipe(gulp.dest('test/preprocess'));

  return merge(elements, html, js)
    .pipe(size({title: 'preprocess'}));
});

// Merge code changes into JSON
gulp.task('leverage', function () {
  return gulp.src([ 'test/src/**/locales/*.json' ]) // input localized JSON files in source
    .pipe(i18nLeverage({
      jsonSpace: 2, // JSON format with 2 spaces
      srcPath: 'test/src', // path to source root
      distPath: 'test/preprocess', // path to dist root to fetch next default JSON files
      finalize: false, // leave meta
      bundles: bundles // output bundles object
    }))
    //.pipe(debug())
    .pipe(gulp.dest('test/preprocess')); // path to output next localized JSON files
});

// Save attributes respository in test/preprocess just for testing
gulp.task('attributes-repository', function (callback) {
  var DEST_DIR = 'test' + path.sep + 'preprocess';

  fs.writeFileSync(DEST_DIR + path.sep + 'attributes-repository.json', 
                    JSONstringify(attributesRepository, null, 2));
  callback();
});

gulp.task('preprocess-raw', function () {
  return gulp.src([ 'test/preprocess/**/*' ])
    //.pipe(debug())
    .pipe(gulp.dest('test/preprocess-raw'));
});

gulp.task('preprocess-lite', function () {
  return gulp.src([ 'test/preprocess/**/*' ])
    .pipe(gulpif('*-test.html', 
      replace('../webcomponentsjs/webcomponents.min.js',
              '../webcomponentsjs/webcomponents-lite.min.js')))
    .pipe(gulp.dest('test/preprocess-lite'));
});

gulp.task('clone', function () {
  return gulp.src([ '*.html', '*.js', 'test/preprocess/**/*' ], { base: '.' })
    //.pipe(debug())
    .pipe(gulp.dest('bower_components/i18n-behavior'));
});

gulp.task('vulcanize', function() {
  return gulp.src(['bower_components/i18n-behavior/test/preprocess/*-test.html'])
    .pipe(vulcanize({
      excludes: [
        'bower_components/webcomponentsjs/webcomponents.min.js',
        'bower_components/webcomponentsjs/webcomponents-lite.min.js',
        'bower_components/web-component-tester/browser.js'
      ],
      stripComments: true,
      inlineCss: true,
      inlineScripts: true
    }))
    .pipe(gulp.dest('test/vulcanize'))
    .pipe(size({title: 'vulcanize'}));
});

gulp.task('clean-clone', function() {
  return del(['bower_components/i18n-behavior']);
});

gulp.task('clone-lite', function () {
  return gulp.src([ '*.html', '*.js', 'test/preprocess-lite/**/*' ], { base: '.' })
    //.pipe(debug())
    .pipe(gulp.dest('bower_components/i18n-behavior'));
});

gulp.task('vulcanize-lite', function() {
  return gulp.src(['bower_components/i18n-behavior/test/preprocess-lite/*-test.html'])
    .pipe(vulcanize({
      excludes: [
        'bower_components/webcomponentsjs/webcomponents.min.js',
        'bower_components/webcomponentsjs/webcomponents-lite.min.js',
        'bower_components/web-component-tester/browser.js'
      ],
      stripComments: true,
      inlineCss: true,
      inlineScripts: true
    }))
    .pipe(gulp.dest('test/vulcanize-lite'))
    .pipe(size({title: 'vulcanize-lite'}));
});

gulp.task('clean-clone-lite', function() {
  return del(['bower_components/i18n-behavior']);
});

gulp.task('bundles', function (callback) {
  var DEST_DIR = 'test' + path.sep + 'vulcanize';
  var DEST_DIR_LITE = 'test' + path.sep + 'vulcanize-lite';
  var localesPath = DEST_DIR + path.sep + 'locales';
  var localesPathLite = DEST_DIR_LITE + path.sep + 'locales';

  try {
    fs.mkdirSync(localesPath);
    fs.mkdirSync(localesPathLite);
  }
  catch (e) {}
  for (var lang in bundles) {
    bundles[lang].bundle = true;
    if (lang) {
      fs.writeFileSync(localesPath + path.sep + 'bundle.' + lang + '.json', 
                        JSONstringify(bundles[lang], null, 2));
      fs.writeFileSync(localesPathLite + path.sep + 'bundle.' + lang + '.json', 
                        JSONstringify(bundles[lang], null, 2));
    }
    else {
      // This is not required for deployment
      fs.writeFileSync(DEST_DIR + path.sep + 'bundle.json', 
                        JSONstringify(bundles[lang], null, 2));
      fs.writeFileSync(DEST_DIR_LITE + path.sep + 'bundle.json', 
                        JSONstringify(bundles[lang], null, 2));
    }
  }
  callback();
});

gulp.task('bundle-ru', function () {
  return gulp.src(['test/vulcanize/**/locales/bundle.ru.json'])
    .pipe(gulp.dest('test/preprocess'));
});

gulp.task('bundle-ru-lite', function () {
  return gulp.src(['test/vulcanize-lite/**/locales/bundle.ru.json'])
    .pipe(gulp.dest('test/preprocess-lite'));
});

gulp.task('empty-ja', function () {
  return gulp.src(['test/src/**/locales/null-template-default-lang-element.ja.json'])
    .pipe(gulp.dest('test/preprocess'));
});

gulp.task('empty-bundle-ja', function (done) {
  del('test/vulcanize/locales/bundle.ja.json');
  del('test/vulcanize-lite/locales/bundle.ja.json');
  done();
});

gulp.task('empty-mini-bundle-ja', function (done) {
  del('test/minify/locales/bundle.ja.json');
  del('test/minify-lite/locales/bundle.ja.json');
  done();
});

gulp.task('minify', function() {
  return gulp.src(['test/vulcanize/**/*', '!test/vulcanize/bundle.json'])
    .pipe(gulpif('*.html', crisper({
      scriptInHead: false
    })))
    .pipe(gulpif('*.html', minifyHtml({
      quotes: true,
      empty: true,
      spare: true
    })))
    .pipe(gulpif('*.js', uglify({
      preserveComments: 'some'
    })))
    .pipe(gulp.dest('test/minify'))
    .pipe(size({title: 'minify'}));
});

gulp.task('minify-lite', function() {
  return gulp.src(['test/vulcanize-lite/**/*', '!test/vulcanize-lite/bundle.json'])
    .pipe(gulpif('*.html', crisper({
      scriptInHead: false
    })))
    .pipe(gulpif('*.html', minifyHtml({
      quotes: true,
      empty: true,
      spare: true
    })))
    .pipe(gulpif('*.js', uglify({
      preserveComments: 'some'
    })))
    .pipe(gulp.dest('test/minify-lite'))
    .pipe(size({title: 'minify-lite'}));
});

gulp.task('mini-bundles', function (callback) {
  var DEST_DIR = 'test' + path.sep + 'minify';
  var DEST_DIR_LITE = 'test' + path.sep + 'minify-lite';
  var localesPath = DEST_DIR + path.sep + 'locales';
  var localesPathLite = DEST_DIR_LITE + path.sep + 'locales';

  try {
    fs.mkdirSync(localesPath);
    fs.mkdirSync(localesPathLite);
  }
  catch (e) {}
  for (var lang in bundles) {
    bundles[lang].bundle = true;
    if (lang) {
      fs.writeFileSync(localesPath + path.sep + 'bundle.' + lang + '.json', 
                        JSONstringify(bundles[lang], null, 0));
      fs.writeFileSync(localesPathLite + path.sep + 'bundle.' + lang + '.json', 
                        JSONstringify(bundles[lang], null, 0));
    }
  }
  callback();
});

gulp.task('fake-server', function() {
  var fakeContents = {};
  var fakeServerFiles = [];
  var fakeServerTemplate = '"use strict";\nvar fakeServerContents =\n%%%CONTENTS%%%;\n';

  return gulp.src(['test/**/*.json', '!test/*-wct.conf.json', '!test/coverage*', '!test/bower*.json'])
    .pipe(sort())
    .pipe(through.obj(function (file, enc, callback) {
      fakeServerFiles.push(file);
      callback();
    }, function (callback) {
      var base = fakeServerFiles[0].base;
      var cwd = fakeServerFiles[0].cwd;
      var file;
      var match;
      var suite;
      while (fakeServerFiles.length > 0) {
        file = fakeServerFiles.shift();
        match = file.path.substr(file.base.length).match(/^([^\/]*)(\/.*)$/);
        fakeContents[match[1]] = fakeContents[match[1]] || {};
        fakeContents[match[1]][match[2]] = String(file.contents);
      }
      for (suite in fakeContents) {
        this.push(new gutil.File({
          cwd: cwd,
          base: base,
          path: path.join(base, suite, 'fake-server.js'),
          contents: new Buffer(fakeServerTemplate
            .replace(/%%%CONTENTS%%%/g, JSONstringify(fakeContents[suite], null, 2)))
        }));
      }
      callback();
    }))
    .pipe(debug({ title: 'fake-server' }))
    .pipe(gulp.dest('test'))
    .pipe(size({ title: 'fake-server' }));
});

gulp.task('clean2', function() {
  return del([ 
    'test/src2-min',
    'test/preprocess2',
    'test/preprocess2-min',
    'test/preprocess2-raw',
    'test/vulcanize2',
    'test/vulcanize2-min',
    'test/minify2',
    'test/minify2-min'
  ]);
});

gulp.task('patchshadycss', () => {
  return gulp.src([ 'bower_components/shadycss/shadycss.min.js' ])
    .pipe(replace(/\n}\)[.]call\(this\)\n/, '\n}).call(this);\n', 'g'))
    .pipe(debug())
    .pipe(gulp.dest('bower_components/shadycss/'));
});

gulp.task('polyfillclone', () => {
  return gulp.src([ 'test/webcomponents-lite.min.html' ])
    .pipe(debug())
    .pipe(gulp.dest('bower_components/webcomponentsjs/'));
});

gulp.task('webcomponents-min', () => {
  return gulp.src([ 'bower_components/webcomponentsjs/webcomponents-lite.min.html' ], { base: 'bower_components/webcomponentsjs/' })
    .pipe(vulcanize({
      abspath: '',
      excludes: [],
      stripExcludes: false,
      inlineScripts: true
    }))
    .pipe(crisper({
      scriptInHead: false
    }))
    .pipe(gulpif('*.js', uglify()))
    .pipe(debug())
    .pipe(gulp.dest('test/webcomponentsjs/'));
});

gulp.task('patch-polyserve', () => {
  return gulp.src([
    'node_modules/polyserve/lib/start_server.js',
    'node_modules/polyserve/lib/transform-middleware.js',
    'node_modules/web-component-tester/node_modules/polyserve/lib/start_server.js',
    'node_modules/web-component-tester/node_modules/polyserve/lib/transform-middleware.js' ], 
    { base: 'node_modules' })
    .pipe(gulpif('**/start_server.js', replace(
      "if (options.compile === 'auto' || options.compile === 'always')",
      "app._delayedAppConfig = () => {\n    if (/* patched */ options.compile === 'auto' || options.compile === 'always')", 'g')))
    .pipe(gulpif('**/start_server.js', replace(
      "return app;",
      "}\n    return /* patched */ app;", 'g')))
    .pipe(gulpif('**/transform-middleware.js', replace(
                    "newBody = transformer.transform(req, res, body);",`
                    let tmpBody = body;
                    if (Array.isArray(req._transformers)) {
                        req._transformers.forEach(_transformer => {
                            tmpBody = _transformer.transform(req, res, tmpBody);
                        });
                    }
                    newBody = transformer.transform(req, res, tmpBody);`, 'g')))
    .pipe(gulp.dest('node_modules'));
});

// Scan HTMLs and construct localizable attributes repository
gulp.task('scan2', function () {
  return gulp.src([ 'test/src2/**/*.html', '!test/src2/**/*-test.html' ]) // input custom element HTMLs
    .pipe(i18nPreprocess({
      constructAttributesRepository: true, // construct attributes repository
      attributesRepository: attributesRepository, // output object
      srcPath: 'test/src2', // path to source root
      attributesRepositoryPath: 'i18n-attr-repo.html', // path to i18n-attr-repo.html
      dropHtml: true, // drop HTMLs,
      targetVersion: 2
    }))
    .pipe(gulp.dest('test/preprocess2')); // no outputs; dummy output path
});

gulp.task('src2-min', function () {
  return gulp.src([ 'test/src2/**/*' ])
    .pipe(gulpif('*-test.html', 
      replace('../../../webcomponentsjs/webcomponents-lite.js',
              '../webcomponentsjs/webcomponents-lite.min.js')))
    .pipe(gulp.dest('test/src2-min'));
});

// Preprocess templates and externalize JSON
gulp.task('preprocess2', function () {
  console.log('attributesRepository = ' + JSON.stringify(attributesRepository, null, 2));
  var elements = gulp.src([ 'test/src2/**/*.html', '!test/src2/**/*-test.html' ]) // input custom element HTMLs
    .pipe(i18nPreprocess({
      replacingText: true, // replace UI texts with {{annotations}}
      jsonSpace: 2, // JSON format with 2 spaces
      srcPath: 'test/src2', // path to source root
      attributesRepository: attributesRepository, // input attributes repository
      targetVersion: 2
    }))
    .pipe(gulp.dest('test/preprocess2')); // output preprocessed HTMLs and default JSON files to dist

  var html = gulp.src([ 'test/src2/**/*-test.html' ]) // non-custom-element HTMLs
    .pipe(i18nPreprocess({
      replacingText: true, // replace UI texts with {{annotations}}
      jsonSpace: 2, // JSON format with 2 spaces
      srcPath: 'test/src2', // path to source root
      force: true, // force processing even without direct i18n-behavior.html import
      attributesRepository: attributesRepository, // input attributes repository
      targetVersion: 2
     }))
    .pipe(gulp.dest('test/preprocess2'));

  var js = gulp.src([ 'test/src2/**/*.js' ])
    .pipe(gulp.dest('test/preprocess2'));

  return merge(elements, html, js)
    .pipe(size({title: 'preprocess2'}));
});

// Merge code changes into JSON
gulp.task('leverage2', function () {
  return gulp.src([ 'test/src2/**/locales/*.json' ]) // input localized JSON files in source
    .pipe(i18nLeverage({
      jsonSpace: 2, // JSON format with 2 spaces
      srcPath: 'test/src2', // path to source root
      distPath: 'test/preprocess2', // path to dist root to fetch next default JSON files
      finalize: false, // leave meta
      bundles: bundles // output bundles object
    }))
    //.pipe(debug())
    .pipe(gulp.dest('test/preprocess2')); // path to output next localized JSON files
});

// Save attributes respository in test/preprocess just for testing
gulp.task('attributes-repository2', function (callback) {
  var DEST_DIR = 'test' + path.sep + 'preprocess2';

  fs.writeFileSync(DEST_DIR + path.sep + 'attributes-repository.json', 
                    JSONstringify(attributesRepository, null, 2));
  callback();
});

gulp.task('preprocess2-raw', function () {
  return gulp.src([ 'test/preprocess2/**/*' ])
    //.pipe(debug())
    .pipe(gulp.dest('test/preprocess2-raw'));
});

gulp.task('preprocess2-min', function () {
  return gulp.src([ 'test/preprocess2/**/*' ])
    .pipe(gulpif('*-test.html', 
      replace('../../../webcomponentsjs/webcomponents-lite.js',
              '../webcomponentsjs/webcomponents-lite.min.js')))
    .pipe(gulp.dest('test/preprocess2-min'));
});

gulp.task('clone2', function () {
  return gulp.src([ '*.html', '*.js', 'test/preprocess2/**/*' ], { base: '.' })
    //.pipe(debug())
    .pipe(gulp.dest('bower_components/i18n-behavior'));
});

gulp.task('vulcanize2', function() {
  return gulp.src([
      'bower_components/i18n-behavior/test/preprocess2/*-test.html',
      'bower_components/i18n-behavior/test/preprocess2/*-test-imports.html',
      'bower_components/i18n-behavior/test/preprocess2/**/*.json'
    ])
    .pipe(gulpif('*-test-imports.html', vulcanize({
      excludes: [
        'bower_components/webcomponentsjs/webcomponents-lite.js',
        'bower_components/webcomponentsjs/webcomponents-lite.min.js',
        'bower_components/web-component-tester/browser.js'
      ],
      stripComments: true,
      inlineCss: true,
      inlineScripts: true
    })))
    .pipe(gulp.dest('test/vulcanize2'))
    .pipe(size({title: 'vulcanize2'}));
});

gulp.task('clean-clone2', function() {
  return del(['bower_components/i18n-behavior']);
});

gulp.task('clone2-min', function () {
  return gulp.src([ '*.html', '*.js', 'test/preprocess2-min/**/*' ], { base: '.' })
    //.pipe(debug())
    .pipe(gulp.dest('bower_components/i18n-behavior'));
});

gulp.task('vulcanize2-min', function() {
  return gulp.src([
      'bower_components/i18n-behavior/test/preprocess2-min/*-test.html',
      'bower_components/i18n-behavior/test/preprocess2-min/*-test-imports.html',
      'bower_components/i18n-behavior/test/preprocess2-min/**/*.json'
    ])
    .pipe(gulpif('*-test-imports.html', vulcanize({
      excludes: [
        'bower_components/webcomponentsjs/webcomponents-lite.js',
        'bower_components/webcomponentsjs/webcomponents-lite.min.js',
        'bower_components/web-component-tester/browser.js'
      ],
      stripComments: true,
      inlineCss: true,
      inlineScripts: true
    })))
    .pipe(gulp.dest('test/vulcanize2-min'))
    .pipe(size({title: 'vulcanize2-min'}));
});

gulp.task('clean-clone2-min', function() {
  return del(['bower_components/i18n-behavior']);
});

gulp.task('bundles2', function (callback) {
  var DEST_DIR = 'test' + path.sep + 'vulcanize2';
  var DEST_DIR_LITE = 'test' + path.sep + 'vulcanize2-min';
  var localesPath = DEST_DIR + path.sep + 'locales';
  var localesPathLite = DEST_DIR_LITE + path.sep + 'locales';

  try {
    fs.mkdirSync(localesPath);
    fs.mkdirSync(localesPathLite);
  }
  catch (e) {}
  for (var lang in bundles) {
    bundles[lang].bundle = true;
    if (lang) {
      fs.writeFileSync(localesPath + path.sep + 'bundle.' + lang + '.json', 
                        JSONstringify(bundles[lang], null, 2));
      fs.writeFileSync(localesPathLite + path.sep + 'bundle.' + lang + '.json', 
                        JSONstringify(bundles[lang], null, 2));
    }
    else {
      // This is not required for deployment
      fs.writeFileSync(DEST_DIR + path.sep + 'bundle.json', 
                        JSONstringify(bundles[lang], null, 2));
      fs.writeFileSync(DEST_DIR_LITE + path.sep + 'bundle.json', 
                        JSONstringify(bundles[lang], null, 2));
    }
  }
  callback();
});

gulp.task('bundle-ru2', function () {
  return gulp.src(['test/vulcanize2/**/locales/bundle.ru.json'])
    .pipe(gulp.dest('test/preprocess2'));
});

gulp.task('bundle-ru2-min', function () {
  return gulp.src(['test/vulcanize2-min/**/locales/bundle.ru.json'])
    .pipe(gulp.dest('test/preprocess2-min'));
});

gulp.task('empty-ja2', function () {
  return gulp.src(['test/src2/**/locales/null-template-default-lang-element.ja.json'])
    .pipe(gulp.dest('test/preprocess2'));
});

gulp.task('empty-bundle-ja2', function (done) {
  del('test/vulcanize2/locales/bundle.ja.json');
  del('test/vulcanize2-min/locales/bundle.ja.json');
  done();
});

gulp.task('empty-mini-bundle-ja2', function (done) {
  del('test/minify2/locales/bundle.ja.json');
  del('test/minify2-min/locales/bundle.ja.json');
  done();
});

gulp.task('minify2', function() {
  return gulp.src(['test/vulcanize2/**/*', '!test/vulcanize2/bundle.json'])
    //.pipe(gulpif('*-test.html', 
    //  replace('<!-- <script src="..\/..\/..\/custom-elements\/src\/native-shim.js"><\/script> -->',
    //          '<script src="..\/..\/..\/custom-elements\/src\/native-shim.js"><\/script>', 'g')))
    .pipe(gulpif('*.html', crisper({
      scriptInHead: false
    })))
    .pipe(gulpif('*.js', babel({ 
      "presets": [ /* 'es2015' */ ],
      "plugins": [
        'check-es2015-constants',
        'transform-es2015-arrow-functions',
        'transform-es2015-block-scoped-functions',
        'transform-es2015-block-scoping',
        'transform-es2015-classes',
        'transform-es2015-computed-properties',
        'transform-es2015-destructuring',
        'transform-es2015-duplicate-keys',
        'transform-es2015-for-of',
        'transform-es2015-function-name',
        'transform-es2015-literals',
        //'transform-es2015-modules-commonjs',
        'transform-es2015-object-super',
        'transform-es2015-parameters',
        'transform-es2015-shorthand-properties',
        'transform-es2015-spread',
        'transform-es2015-sticky-regex',
        'transform-es2015-template-literals',
        'transform-es2015-typeof-symbol',
        'transform-es2015-unicode-regex',
        'transform-regenerator'
      ]
    })))
    .pipe(gulpif('*.js', uglify({ mangle: false })))
    .pipe(gulpif('*.html', minifyHtml({
      quotes: true,
      empty: true,
      spare: true
    })))
    .pipe(gulp.dest('test/minify2'))
    .pipe(size({title: 'minify2'}));
});

gulp.task('minify2-min', function() {
  return gulp.src(['test/vulcanize2-min/**/*', '!test/vulcanize2-min/bundle.json'])
    //.pipe(gulpif('*-test.html', 
    //  replace('<!-- <script src="..\/..\/..\/custom-elements\/src\/native-shim.js"><\/script> -->',
    //          '<script src="..\/..\/..\/custom-elements\/src\/native-shim.js"><\/script>', 'g')))
    .pipe(gulpif('*.html', crisper({
      scriptInHead: false
    })))
    .pipe(sourcemaps.init())
    .pipe(gulpif('*.js', babel({ 
      "presets": [ /*'es2015'*/ ],
      "plugins": [
        'check-es2015-constants',
        'transform-es2015-arrow-functions',
        'transform-es2015-block-scoped-functions',
        'transform-es2015-block-scoping',
        'transform-es2015-classes',
        'transform-es2015-computed-properties',
        'transform-es2015-destructuring',
        'transform-es2015-duplicate-keys',
        'transform-es2015-for-of',
        'transform-es2015-function-name',
        'transform-es2015-literals',
        //'transform-es2015-modules-commonjs',
        'transform-es2015-object-super',
        'transform-es2015-parameters',
        'transform-es2015-shorthand-properties',
        'transform-es2015-spread',
        'transform-es2015-sticky-regex',
        'transform-es2015-template-literals',
        'transform-es2015-typeof-symbol',
        'transform-es2015-unicode-regex',
        'transform-regenerator'
      ]
    })))
    .pipe(gulpif('*.js', uglify({ mangle: false })))
    .pipe(gulpif('*.html', minifyHtml({
      quotes: true,
      empty: true,
      spare: true
    })))
    .pipe(sourcemaps.write('sourcemaps'))
    .pipe(gulp.dest('test/minify2-min'))
    .pipe(size({title: 'minify2-min'}));
});

gulp.task('mini-bundles2', function (callback) {
  var DEST_DIR = 'test' + path.sep + 'minify2';
  var DEST_DIR_LITE = 'test' + path.sep + 'minify2-min';
  var localesPath = DEST_DIR + path.sep + 'locales';
  var localesPathLite = DEST_DIR_LITE + path.sep + 'locales';

  try {
    fs.mkdirSync(localesPath);
    fs.mkdirSync(localesPathLite);
  }
  catch (e) {}
  for (var lang in bundles) {
    bundles[lang].bundle = true;
    if (lang) {
      fs.writeFileSync(localesPath + path.sep + 'bundle.' + lang + '.json', 
                        JSONstringify(bundles[lang], null, 0));
      fs.writeFileSync(localesPathLite + path.sep + 'bundle.' + lang + '.json', 
                        JSONstringify(bundles[lang], null, 0));
    }
  }
  callback();
});

gulp.task('pretest', ['clean'], function(cb) {
  runSequence(
    'scan',
    'src-lite',
    'preprocess',
    'leverage',
    'attributes-repository',
    'preprocess-raw',
    'empty-ja',
    'preprocess-lite',
    'clone',
    'vulcanize',
    'clean-clone',
    'clone-lite',
    'vulcanize-lite',
    'clean-clone-lite',
    'bundles',
    'bundle-ru',
    'bundle-ru-lite',
    'empty-bundle-ja',
    'minify',
    'minify-lite',
    'mini-bundles',
    'empty-mini-bundle-ja',
    'fake-server',
    /*
    'feedback',
    */
    cb);
});

gulp.task('pretest2', ['clean2'], function(cb) {
  runSequence(
    //'patch-polyserve',
    'scan2',
    'src2-min',
    'preprocess2',
    'leverage2',
    'attributes-repository2',
    'preprocess2-raw',
    'empty-ja2',
    'preprocess2-min',
    /*
    'clone2',
    'vulcanize2',
    'clean-clone2',
    'clone2-min',
    'vulcanize2-min',
    'clean-clone2-min',
    'bundles2',
    'bundle-ru2',
    'bundle-ru2-min',
    'empty-bundle-ja2',
    'minify2',
    'minify2-min',
    'mini-bundles2',
    'empty-mini-bundle-ja2',
    */
    'fake-server',
    /*
    'feedback',
    */
    cb);
});

require('web-component-tester').gulp.init(gulp, [ 'pretest2' ]);

