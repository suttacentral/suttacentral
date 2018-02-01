importScripts('/node_modules/workbox-sw/build/importScripts/workbox-sw.dev.v2.1.2.js');

const staticAssets = [
    './',
    './manifest.json',
    '/bower_components/webcomponentsjs/webcomponents-lite.js',
    'img/home-page/*',
    'img/static-pages/*',
    'img/*.svg',
    'img/favicon-32x32.png',
    'img/favicon.ico',
    'img/*.html',
    'localization/elements/**/*'
];

const workboxSW = new WorkboxSW();
workboxSW.precache(staticAssets);

workboxSW.router.registerRoute('http://localhost/api/(.*)', workboxSW.strategies.networkFirst());