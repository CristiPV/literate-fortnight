require("dotenv").config();
const socketIo = require("socket.io");
const http = require("http");
const express = require("express");

// Environment variables
const PORT = process.env.PORT || 8080;

// Routes
const index = require("./routes/index").router;

const app = express();

app.use(index);

const httpServer = http.createServer(app);
const io = socketIo(httpServer);

io.on("connection", (socket) => {
  console.log("Socket connected", socket.id);

  // Request the player data on connection
  socket.emit("requestPlayerData");

  socket.on("sendPlayerData", (data) => {
    socket.player = data;

    console.log("Player connected", socket.player);
  });

  socket.on("disconnect", () => {
    console.log("Socket disconnected", socket.id);
  });
});

const server = httpServer.listen(PORT, (error) => {
  if (error) console.log(error);

  console.log("The server has started on port", server.address().port);
});
