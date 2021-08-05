require("dotenv").config();
const http = require("http");
const { Server } = require("socket.io");
const Client = require("socket.io-client");

describe("Testing Game Logic", () => {
  let io, serverSocket, clientSocket, socketService, gameService;
  beforeAll((done) => {
    const httpServer = http.createServer();
    socketService = require("../services/socketService");
    io = socketService.createIo(httpServer);
    gameService = require("../services/gameService");
    httpServer.listen(() => {
      const port = httpServer.address().port;
      clientSocket = new Client(`http://localhost:${port}`);
      io.on("connection", (socket) => {
        serverSocket = socket;
      });
      clientSocket.on("connect", done);
    });
  });

  afterAll(() => {
    io.close();
    clientSocket.close();
  });

  test("Add 200 to the jackpot", (done) => {
    expect(gameService.increaseJackpot(200)).toBe(200);
    done();
  });

  test("Add 400 to the existing jackpot of 200", (done) => {
    expect(gameService.increaseJackpot(400)).toBe(600);
    done();
  });

  test("Remove 100 from the existing jackpot of 600", (done) => {
    expect(gameService.increaseJackpot(-100)).toBe(500);
    done();
  });
});

describe("Testing Game Service", () => {
  let io, serverSocket, clientSocket, socketService, gameService;
  beforeAll((done) => {
    const httpServer = http.createServer();
    socketService = require("../services/socketService");
    io = socketService.createIo(httpServer);
    gameService = require("../services/gameService");
    httpServer.listen(() => {
      const port = httpServer.address().port;
      clientSocket = new Client(`http://localhost:${port}`);
      io.on("connection", (socket) => {
        serverSocket = socket;
      });
      clientSocket.on("connect", done);
    });
  });

  afterAll(() => {
    io.close();
    clientSocket.close();
  });

  test("Send player data SERVER to CLIENT", (done) => {
    serverSocket.on("sendPlayerData", (arg) => {
      expect(arg).toEqual({ balance: 100 });
    });
    clientSocket.emit("sendPlayerData", { balance: 100 });
    done();
  });

  test("Send player data from CLIENT to SERVER", (done) => {
    clientSocket.on("sendPlayerData", (arg) => {
      expect(arg).toEqual({ balance: 100 });
      done();
    });
    serverSocket.emit("sendPlayerData", { balance: 100 });
  });
});
