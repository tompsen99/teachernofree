const CACHE_NAME = 'tt-v1';
const ASSETS = ['/', '/index.html', '/config.js', '/tt-core.js', '/tools.json', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'];
self.addEventListener('install', e => e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS))));
self.addEventListener('fetch', e => e.respondWith(caches.match(e.request).then(res => res || fetch(e.request))));