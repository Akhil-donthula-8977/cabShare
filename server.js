const { createServer } = require('http');
const next = require('next');
const { Server } = require('socket.io');

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = 3000;

const app = next({ dev });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);
  const io = new Server(httpServer);

  io.on('connection', (socket) => {
    console.log('A client connected');

    socket.on('notify', (data) => {
      console.log("check datas",data)
      const recipientSocket = io.sockets.sockets.get(data.socketID);
      if (!recipientSocket) {
        console.error('Recipient socket not found');
        return;
      }
        console.log("crt")
      io.to(data.socketID).emit("requestNotification", data);
    
    })
    
    socket.on("requestAccept",(data)=>{
      console.log("socket check",data)
      io.to(data.socketId).emit("requestAccepted",data)
    })

    socket.on('sendMessage', (message) => {
      console.log("polo")
      io.to(message.receiver).emit('message', message);

    });
    socket.on("test", () => {
      console.log("hello world")
    })
    socket.on('disconnect', () => {
      console.log('A client disconnected');
    });



  });

  httpServer.once('error', (err) => {
    console.error(err);
    process.exit(1);
  });

  httpServer.listen(port, hostname, () => {
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});
