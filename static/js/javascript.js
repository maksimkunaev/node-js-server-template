async function postData(url = "", data = {}) {
  setStatus("Loading...");
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.status === 200) {
    setStatus(`Success. ${response.status}, ${response.statusText}`);
  } else {
    console.log(response);
    setStatus(`Error. ${response.status}, ${response.statusText}`);
  }
  return await response.json();
}

function submit() {
  postData("/api/send-mail", { message: "hello there" }).then((data) => {
    console.log(data);
  });
}

const button = document.querySelector("button");
button.addEventListener("click", submit);

function setStatus(statusText) {
  const statusEl = document.querySelector(".status");

  statusEl.textContent = statusText;
}
