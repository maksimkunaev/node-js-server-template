const icons = {
	naughty: '../naughty.png'
}

const options = {
  icon: icons.naughty,
  vibrate: [200, 100, 200, 100, 200, 100, 200],
  tag: 'vibration-sample',
  requireInteraction: true,
	actions: [
    {
      action: 'coffee-action',
      title: 'Coffee',
      icon: icons.naughty 
    },
    {
      action: 'doughnut-action',
      title: 'Doughnut',
      icon: icons.naughty
    },
  ]
}

document.querySelector('.show-button')
	.addEventListener('click', showNotification)

document.querySelector('.unregister-button')
	.addEventListener('click', unregisterSW)

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js')
	  .then((reg) => {
	    if (window.Notification.permission !== 'granted') {
		    requestPermission()
	    }
	  }).catch((error) => {
	    console.log('Registration failed with ' + error);
	  });
}

function showNotification() {
	navigator.serviceWorker.ready.then(worker=>{
		worker.showNotification('New notify!', options)
	})
};

function requestPermission() {
  Notification.requestPermission(function(result) {
    if (result === 'granted') {
      navigator.serviceWorker.ready.then(function(registration) {
        registration.showNotification('Push notifications activated');
      });
    }
  });
}

function unregisterSW() {
	navigator.serviceWorker.getRegistrations().then(function(registrations) {
	 for(let registration of registrations) {
	  registration.unregister()
	}})
}