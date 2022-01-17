self.addEventListener('message', function(event) {
  console.log('ServiceWorker: custom-push received');
  self.registration.showNotification('title from WS', { body: 'body' })
});