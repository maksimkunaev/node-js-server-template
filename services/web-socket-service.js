const { Server } = require("socket.io");

async function onClientMessageReceive(msg) {
	console.log("onClientMessageReceive", { msg })
}

function sendMessageToClient(io, data) {
	console.log("sendMessageToClient", data)
  io.emit('message', data);
}

function webSocket (server, clientOrigin) {
  const io = new Server(server,  {
    cors: {
      origin: clientOrigin,
      methods: ["GET", "POST"]
    }
  });
  
  io.on('connection', (socket) => {
    socket.on('message', (msg) => {
      onClientMessageReceive(msg)
      
      setTimeout(() => sendMessageToClient(io, {response: "we received your message"}), 1000)
    }); 
  });
}

module.exports = {
  webSocket
};