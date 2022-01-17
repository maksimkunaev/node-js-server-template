self.addEventListener('install', (event) => {
  console.log('ServiceWorker: installed:', event);
  // event.waitUntil(
  //   caches.open('v1').then((cache) => {
  //     return cache.addAll([
  //       './sw-test/',
  //       './sw-test/index.html',
  //       './sw-test/style.css',
  //       './sw-test/app.js',
  //       './sw-test/image-list.js',
  //       './sw-test/star-wars-logo.jpg',
  //       './sw-test/gallery/',
  //       './sw-test/gallery/bountyHunters.jpg',
  //       './sw-test/gallery/myLittleVader.jpg',
  //       './sw-test/gallery/snowTroopers.jpg'
  //     ]);
  //   })
  // );
});

self.addEventListener('message', async function handler (event) {
  console.log('ServiceWorker: received message:', event.data);
});

self.addEventListener('activate', (event) => {
  console.log('ServiceWorker: activated');
});

self.addEventListener('push', function(event) {
  console.log('ServiceWorker: push received');
  self.registration.showNotification('title', { body: 'body' })
});