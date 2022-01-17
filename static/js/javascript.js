document.querySelector('.show-button')
	.addEventListener('click', showNotification)

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js')
	  .then((reg) => {
	    console.log('Registration succeeded. Scope is ' + reg.scope);

	    if (window.Notification.permission !== 'granted') {
		    requestPermission()
	    }
	  }).catch((error) => {
	    console.log('Registration failed with ' + error);
	  });
}

function showNotification() {
	navigator.serviceWorker.ready.then(worker=>{
		console.log('client: worker.showNotification',worker.showNotification)
		worker.showNotification('title from client')
	})
};

function requestPermission() {
  Notification.requestPermission(function(result) {
    if (result === 'granted') {

      navigator.serviceWorker.ready.then(function(registration) {
        registration.showNotification('Vibration Sample', {
          body: 'Buzz! Buzz!',
          icon: '../images.png',
          vibrate: [200, 100, 200, 100, 200, 100, 200],
          tag: 'vibration-sample'
        });
      });
    }
  });
}