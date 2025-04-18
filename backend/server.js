// const express = require("express");
// const http = require("http");
// const { Server } = require("socket.io");
// const cors = require("cors");

// const app = express();
// const server = http.createServer(app);

// app.use(cors());

// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:3000", // Match frontend URL
//     methods: ["GET", "POST"],
//   },
// });

// io.on("connection", (socket) => {
//   console.log(`User connected: ${socket.id}`);

//   // Handle incoming message from client
//   socket.on("message", (data) => {
//     console.log(`Message received: ${data}`);

//     // Broadcast to all connected clients
//     io.emit("message", data);
//   });

//   socket.on("disconnect", () => {
//     console.log(`User disconnected: ${socket.id}`);
//   });
// });

// server.listen(3000, () => {
//   console.log("Server running on http://localhost:5000");
// });

const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

app.use(cors());

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Match frontend URL
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`); // Fixed backticks

  // Handle incoming message from client
  socket.on("message", (data) => {
    console.log(`Message received: ${data}`); // Fixed backticks

    // Broadcast to all connected clients
    io.emit("message", data);
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`); // Fixed backticks
  });
});

server.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
