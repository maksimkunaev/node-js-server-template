self.addEventListener('message', function(event) {
  console.log('ServiceWorker: custom-push received');
  self.registration.showNotification('title from WS', { body: 'body' })
});

self.addEventListener('notificationclick', function(event) {
  console.log('notificationclick', event.action)
  const clickedNotification = event.notification;
  clickedNotification.close();
  // // Do something as the result of the notification click
  const promiseChain = doSomething();
  event.waitUntil(promiseChain);
});

function doSomething() {}