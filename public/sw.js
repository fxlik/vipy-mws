const vipyCache = 'vipy-v1';
let filesToCache = [
    '.',
    'index.html',
    'human.png',
    'map.png',
    'responsive.css',
    'style.css',
    'v.png'
];

self.addEventListener('install', event => {
    console.log('Persiapan Cache');
    event.waitUntil(
        caches.open(vipyCache)
        .then(cache => {
            return cache.addAll(filesToCache);
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
        .then(ada_response => {
            if(ada_response){
                return ada_response;
            }
            else{
                return fetch(event.request)
            }
        })
        .catch(error => {
            return new Response("Opps " + error);
        })
    );
});