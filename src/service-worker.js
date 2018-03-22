var staticCacheName = 'my-neighborhood-v1';

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(staticCacheName).then(function(cache) {
      return cache.addAll([
        '/',
        'src/App.js',
        'public/index.html',
        'https://fonts.googleapis.com/css?family=Cabin+Sketch:400,700',
      ]);
    })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName.startsWith('wittr-') &&
                 cacheName != staticCacheName;
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('message',(m)=>{
  console.log(m);
  if(m.data.update) self.skipWaiting();
});

// TODO: listen for the "message" event, and call
// skipWaiting if you get the appropriate message