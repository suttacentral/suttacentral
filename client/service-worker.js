/* eslint-disable import/no-extraneous-dependencies */
import { clientsClaim } from 'workbox-core';
import { ExpirationPlugin } from 'workbox-expiration';
import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate, CacheFirst, NetworkFirst } from 'workbox-strategies';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';

clientsClaim();
self.skipWaiting();

precacheAndRoute([
  { url: '/localization/elements/static_home-page/en.json', revision: null },
  { url: '/localization/elements/sc-site-layout/en.json', revision: null },
  { url: '/localization/elements/sc-universal-action-items/en.json', revision: null },
  { url: '/files/fonts/RaloksSansPEVFWeb-Its_0.3.woff2', revision: null },
  { url: '/files/fonts/RaloksSansPEVFWeb-Ups_0.3.woff2', revision: null },
  { url: '/fonts/RaloksPEVFWeb-Ups_0.3.woff2', revision: null },
  { url: '/fonts/RaloksPEVFWeb-Its_0.3.woff2', revision: null },
]);
precacheAndRoute(self.__WB_MANIFEST);

registerRoute(
  new RegExp('/api/((?!ebook).*)'),
  new StaleWhileRevalidate({
    cacheName: 'api-cache',
    matchOptions: {
      ignoreVary: true,
    },
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);

registerRoute(
  /\.(?:js|css|html|map|json|ico)$/,
  new StaleWhileRevalidate({
    cacheName: 'static-files-cache',
    matchOptions: {
      ignoreVary: true,
    },
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);

registerRoute(
  new RegExp('/node_modules/(.*)'),
  new StaleWhileRevalidate({
    cacheName: 'node_modules-cache',
    matchOptions: {
      ignoreVary: true,
    },
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);

registerRoute(
  new RegExp('/search'),
  new NetworkFirst({
    cacheName: 'search-cache',
    matchOptions: {
      ignoreVary: true,
    },
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);

registerRoute(
  new RegExp('/(?:img|files)/(.*)'),
  new CacheFirst({
    cacheName: 'img-files-cache',
    matchOptions: {
      ignoreVary: true,
    },
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxAgeSeconds: 7 * 24 * 60 * 60,
      }),
    ],
  })
);

registerRoute(
  new RegExp('^https://(?:js|m).stripe.com/(.*)'),
  new CacheFirst({
    cacheName: 'stripe-cache',
    matchOptions: {
      ignoreVary: true,
    },
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);
