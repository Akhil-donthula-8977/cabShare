import { createServer, Server as HttpServer } from "http";
import next from "next";
import { Server as SocketServer, Socket } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;

// Initialize Next.js app
const app = next({ dev });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  // Create HTTP server using the Next.js request handler
  const httpServer: HttpServer = createServer(handler);

  // Initialize Socket.io server and attach it to the HTTP server
  const io: SocketServer = new SocketServer(httpServer);

  // Socket.io connection event
  io.on("connection", (socket: Socket) => {
    console.log("A client connected");

    // Handle socket events
    socket.on("disconnect", () => {
      console.log("A client disconnected");
    });

    socket.on("sendMessage", (message: string) => {
      console.log("Received message:", message);
      // Broadcast the message to all connected clients
      io.emit("message", message);
    });
  });

  // Start the HTTP server
  httpServer.once("error", (err: Error) => {
    console.error(err);
    process.exit(1);
  });

  httpServer.listen(port, hostname, () => {
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});
