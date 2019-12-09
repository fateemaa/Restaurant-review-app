const ststicCachName='sitestatic';
const dynamicCache ='site-dynamic';
const assets=[
                '/',
                '/index.html',
                './restaurant.html',
                '/css/styles.css',
                '/data/restaurants.json',
                '/js/dbhelper.js',
                '/js/main.js',
                '/js/restaurant_info.js',
                '/js/regisrer-sw.js',
                '/img/1.jpg',
                '/img/2.jpg',
                '/img/3.jpg',
                '/img/4.jpg',
                '/img/5.jpg',
                '/img/6.jpg',
                '/img/7.jpg',
                '/img/8.jpg',
                '/img/9.jpg',
                '/img/10.jpg',
                'pk.eyJ1IjoiZmF0aW1haGhhbWVkIiwiYSI6ImNrM2lzdDkzazAybXEzbW50eWt0dnVqY24ifQ.aWUhtNRZSzsJFTT5gCxxhg',
];

//install service worker
self.addEventListener('install',evt => {
   // console.log('service worker has been installed');
   evt.waitUntil(
   caches.open(ststicCachName).then(cache =>{
    console.log('caching shell assets');
    cache.addAll(assets);
   })
  );
});

//activate service worker
self.addEventListener('activate', evt => {
   // console.log('service worker has been activated')
   evt.waitUntil(
    caches.keys().then(keys => {
        return Promis.all(keys
            .filter(key => key !== staticCacheName)
            .map(key => caches.delete(key))

            )
    })
    );
});

//fetch events
self.addEventListener('fetch', evt => {
    //console.log('fetch event',evt);
    evt.respondWith(
        caches.match(evt.request).then(cachResponds => {
            return cachResponds || fetch(evt.request) .then(fetchResponds => {
                return caches.open(dynamicCache).then(cache=> {
                    cache.put(evt.request.url, fetchResponds.clone());
                    return fetchResponds;

                })
            });
        })

        );
});
