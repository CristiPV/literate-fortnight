require("dotenv").config();
const socketService = require("./services/socketService.js");
const http = require("http");
const express = require("express");

// Environment variables
const PORT = process.env.PORT || 8080;

// Routes
const index = require("./routes/index").router;

const app = express();

app.use(index);

const httpServer = http.createServer(app);
const io = socketService.createIo(httpServer);
const gameService = require("./services/gameService.js");

// IO
io.on("connection", (socket) => {
  console.log("Socket connected", socket.id);

  // Request the player data on connection
  socket.emit("requestPlayerData");

  // Request a list of betting players
  socket.on("requestPlayers", (bettingOnly) => {
    gameService.sendBettingPlayers();
    gameService.sendAllPlayers();
  });

  // Saves the player data in the socket
  socket.on("sendPlayerData", (data) => {
    socket.player = data;
    if (!socket.player.balance) {
      socket.player.balance = 0;
    }

    gameService.sendAllPlayers();

    console.log("Player connected", socket.player);
  });

  socket.on("addFunds", (data) => {
    socket.emit("updateBalance", gameService.updateBalance(data, socket));
  });

  // Saves the bet amount in the player data and places the socket in the game room
  socket.on("placedBet", (data) => {
    if (!socket.player) {
      socket.player = {};
    }
    socket.player.betAmount = data;
    socket.join("gameRoom");

    gameService.increaseJackpot(data);

    // Check if game can start
    if (gameService.gameCanStart()) {
      gameService.startGame();
    }

    socket.emit(
      "updateBalance",
      gameService.updateBalance(-Number(data), socket)
    );

    gameService.sendBettingPlayers();

    console.log(
      "Player",
      socket.player,
      "joined the game room with",
      data,
      "credits"
    );
  });

  socket.on("disconnect", () => {
    console.log("Socket disconnected", socket.id);
    gameService.sendAllPlayers();
    gameService.sendBettingPlayers();
  });
});

const server = httpServer.listen(PORT, (error) => {
  if (error) console.log(error);

  console.log("The server has started on port", server.address().port);
});
