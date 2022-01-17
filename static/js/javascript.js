// async function postData(url = '', data = {}) {
//   const response = await fetch(url, {
// 		method: 'POST',
// 		body: JSON.stringify(data),
// 		headers: {
//       'Content-Type': 'application/json'
//     },
//   });
//   return await response.json()
// }

function submit() {
	// postData('/api/send-mail', { message: 'hello there' })
	//   .then((data) => {
	// 		console.log(data);
	//   });
}
let serviceWorkerRegistration;

const button = document.querySelector('button')
button.addEventListener('click', showNotification)

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw-test/sw.js', {scope: './sw-test/'})
	  .then((reg) => {
	    // registration worked
	    serviceWorkerRegistration = reg;
	    console.log('Registration succeeded. Scope is ' + reg.scope);

	    if (window.Notification.permission !== 'granted') {
		    requestPermission()
	    }
	  }).catch((error) => {
	    // registration failed
	    console.log('Registration failed with ' + error);
	  });
}

function showNotification() {
	console.log('1',navigator.serviceWorker)

	// navigator.serviceWorker.ready.then(worker=>{
	// 	console.log('2',worker)
 //    worker.showNotification('title')
 //  })
	navigator.serviceWorker.ready.then(worker=>{
		console.log('3',worker)

		worker.active.postMessage('text');
	})
};

function requestPermission() {
  Notification.requestPermission(function(result) {
    if (result === 'granted') {
	console.log(result)

      navigator.serviceWorker.ready.then(function(registration) {
        registration.showNotification('Vibration Sample', {
          body: 'Buzz! Buzz!',
          icon: '../images/touch/chrome-touch-icon-192x192.png',
          vibrate: [200, 100, 200, 100, 200, 100, 200],
          tag: 'vibration-sample'
        });
      });
    }
  });
}