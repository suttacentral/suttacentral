try {
    importScripts('/sw-generated.js');
} catch (e) {
    console.warn('' +
        'The precaching service worker did not load correctly!' +
        'Local resources will not be cached for offline use.' +
        'Ignore this if you are running in development mode.');
    importScripts('/node_modules/workbox-sw/build/importScripts/workbox-sw.dev.v2.1.2.js');
}

const sw = new WorkboxSW();

// Cache API requests
sw.router.registerRoute(
    new RegExp('http://localhost/api/(.*)'),
    sw.strategies.networkFirst()
);

sw.router.registerRoute(
    new RegExp('https://next.suttacentral.net/api/(.*)'),
    sw.strategies.networkFirst()
);

// Cache Google fonts
sw.router.registerRoute(
    new RegExp('^https://fonts.(?:googleapis|gstatic).com/(.*)'),
    sw.strategies.cacheFirst()
);

// Cache Stripe scripts
sw.router.registerRoute(
    new RegExp('^https://(?:js|m).stripe.com/(.*)'),
    sw.strategies.cacheFirst()
);

const host = self.location.hostname;
if (host === 'localhost') {
    // sw.router.registerNavigationRoute('http://localhost/');
}
