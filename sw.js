const staticCacheName = 'site-static-v9.4';
const dynamicCacheName = 'site-dynamic-v9.4';
const assets = [
  './index.html',
  './brain.js',
  './all.html',
  './manifest.json',
  './skin.css',
  './swhandle.js',
  './subtle-background-black.png',
  './subtle-background.png',
  './settings icon.png',
  './db.json',
  './timetable.jpeg',
  './assests/icon96.png',
  './assests/icon72.png',
  './assests/icon512.png',
  './assests/icon384.png',
  './assests/icon192.png',
  './assests/icon152.png',
  './assests/icon144.png',
  './assests/icon128.png',
  'https://img.icons8.com/material-outlined/16/1a237e/external-link.png',
  'https://use.fontawesome.com/releases/v5.0.13/css/all.css',
  'https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0-beta/css/materialize.min.css',
  'https://code.jquery.com/jquery-3.3.1.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0-beta/js/materialize.min.js',
  'https://web-dev.imgix.net/image/tcFciHGuF3MxnTr1y5ue01OGLBn2/LvIq0sbMK73ycjb2yomw.svg'
];

// install event
self.addEventListener('install', evt => {
  //console.log('service worker installed');
  evt.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      console.log('caching shell assets');
      cache.addAll(assets);
    })
  );
});

// activate event
self.addEventListener('activate', evt => {
  //console.log('service worker activated');
  evt.waitUntil(
    caches.keys().then(keys => {
      //console.log(keys);
      return Promise.all(keys
        .filter(key => key !== staticCacheName && key !== dynamicCacheName)
        .map(key => caches.delete(key))
      );
    })
  );
});

// fetch event
self.addEventListener('fetch', evt => {
  //console.log('fetch event', evt);
  evt.respondWith(
    caches.match(evt.request).then(cacheRes => {
      return cacheRes || fetch(evt.request).then(fetchRes => {
        return caches.open(dynamicCacheName).then(cache => {
          cache.put(evt.request.url, fetchRes.clone());
          return fetchRes;
        })
      });
    }).catch(() => caches.match('./downpage.html'))
  );
});