const { Server } = require("socket.io");

function sendMessageToClient(io, data) {
	console.log("sendMessageToClient", data)
 
}

function webSocket (server, clientOrigin) {
  const io = new Server(server,  {
    cors: {
      origin: clientOrigin,
      methods: ["GET", "POST"]
    }
  });
  
  io.on('connection', (socket) => {
    console.log('ws: a user connected', socket.id);
    console.log('\n')

    socket.on('disconnect', () => {
      console.log('ws: user disconnected', socket.id);
    });

    socket.on('message', (msg) => {
      console.log("ws: message from client", socket.id, { msg })
      console.log('\n')
      
      setTimeout(() =>  {
        io.to(socket.id).emit("message",{ responce: "we received your message" })
      }, 1000)
    }); 
  });


}

module.exports = {
  webSocket
};