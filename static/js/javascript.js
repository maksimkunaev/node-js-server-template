async function postData(url = '', data = {}) {
  const response = await fetch(url, {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
      'Content-Type': 'application/json'
    },
  });
  return await response.json()
}

function submit() {
	postData('/api/send-mail', { message: 'hello there' })
	  .then((data) => {
			console.log(data);
	  });
}

const button = document.querySelector('button')
button.addEventListener('click', submit)