importScripts('node_modules/workbox-sw/build/workbox-sw.js');

workbox.clientsClaim();
workbox.skipWaiting();

// Cache API requests
workbox.routing.registerRoute(
    new RegExp('http://localhost/api/(.*)'),
    workbox.strategies.networkFirst()
);

workbox.routing.registerRoute(
    new RegExp('https://(?:staging.)suttacentral.net/api/(.*)'),
    workbox.strategies.networkFirst()
);

// Cache assets (images and fonts)
workbox.routing.registerRoute(
    new RegExp('https://(?:staging.)suttacentral.net/(?:img|files)/(.*)'),
    workbox.strategies.cacheFirst({
        cacheName: "assets",
        cacheExpiration: {
            maxAgeSeconds: 7 * 24 * 60 * 60
        },
        cacheableResponse: { statuses: [0, 200] }
    })
);

// Cache Google fonts
workbox.routing.registerRoute(
    new RegExp('^https://fonts.(?:googleapis|gstatic).com/(.*)'),
    workbox.strategies.cacheFirst()
);

// Cache Stripe scripts
workbox.routing.registerRoute(
    new RegExp('^https://(?:js|m).stripe.com/(.*)'),
    workbox.strategies.cacheFirst()
);


workbox.precaching.precacheAndRoute(self.__precacheManifest);

// For the production version, register a base route for all offline navigation requests.
// This returns the cached value for '/' (index.html) when the user requests a URL like suttacentral.net/home
// instead of just looking for the cached match for suttacentral.net/home, which doesn't exist.
caches.keys().then(keys => {
    const cacheName = keys.filter(name => name.includes('suttacentral'))[0];
    caches.open(cacheName).then(cache => {
        const cacheOptions = {
            blacklist: [
                /^\/img\/.*/,
                /^\/files\/.*/
            ]
        };
        if (cache.match('index.html')) {
            workbox.routing.registerNavigationRoute('index.html', cacheOptions);
        }
        else if (cache.match('/')) {
            workbox.routing.registerNavigationRoute('/', cacheOptions);
        }
    });
});

