const socketService = require("./socketService");

const io = socketService.getIo();
const startTimeout = process.env.BETTING_PHASE_DURATION || 120000; // 120.000 milliseconds ( 2 minutes )

let gameRunning = false;
let jackpot = 0;
let countdownInterval = startTimeout;
const countdownAmount = 1000; // 1000 milliseconds ( 1 second )

const increaseJackpot = (amount) => (jackpot += amount);
const resetJackpot = () => (jackpot = 0);

const countdown = (time) => {
  countdownInterval -= time;
  io.emit("countdown", countdownInterval);
};
const resetCountdown = () => (countdownInterval = startTimeout);

function startGame() {
  // Start game timer
  gameRunning = true;
  const startTimer = sleep(startTimeout);

  // Start countdown interval
  io.emit("countdown", countdownInterval);
  const clockInterval = setInterval(
    () => countdown(countdownAmount),
    countdownAmount
  );

  console.log(
    "Game has started.\nGame Room:",
    io.sockets.adapter.rooms.get("gameRoom")
  );

  startTimer.promise.then(() => {
    const players = calculatePlayerWeights();

    let winner = players[chooseItem(players)];
    const winnerSocket = io.sockets.sockets.get(winner.id);
    winner = {
      ...winner,
      ...winnerSocket.player,
      jackpot,
    };
    console.log("Selected winner:", winner);

    winnerSocket.emit(
      "updateBalance",
      updateBalance(jackpot, winnerSocket)
    );

    io.to("gameRoom").emit("spinWheel", winner);

    clearInterval(clockInterval);
    countdown(countdownAmount);

    console.log(
      "Game has ended.\nGame Room:",
      io.sockets.adapter.rooms.get("gameRoom")
    );
    resetGame();
  });
}

function resetGame() {
  gameRunning = false;
  io.socketsLeave("gameRoom");
  console.log(
    "Game has reset.\nGame Room:",
    io.sockets.adapter.rooms.get("gameRoom")
  );

  sendBettingPlayers();
  resetJackpot();
  resetCountdown();
}

/**
 * Checks it the game can start or not ( if there are at least 2 players or not ).
 * @returns true or false, depending on the game starting requirements.
 */
const gameCanStart = () => {
  if (
    io.sockets.adapter.rooms.get("gameRoom") &&
    io.sockets.adapter.rooms.get("gameRoom").size >= 2 &&
    !gameRunning
  ) {
    return true;
  }
  return false;
};

/**
 * Creates a list with the id and weight of each socket in the game room
 * @returns a list of objects with an id and a weight
 */
function calculatePlayerWeights() {
  const players = [];
  if (io.sockets.adapter.rooms.get("gameRoom")) {
    const playerIds = io.sockets.adapter.rooms.get("gameRoom");

    for (id of playerIds) {
      const player = {
        id: id,
        weight: io.sockets.sockets.get(id).player.betAmount / jackpot,
      };
      players.push(player);
    }
  }
  return players;
}

/**
 * Emits a list of all betting players to the client sockets.
 */
const sendBettingPlayers = () => {
  let players = calculatePlayerWeights();
  players = players.map((player) => {
    return { ...player, ...io.sockets.sockets.get(player.id).player, jackpot };
  });

  io.emit("bettingPlayers", { players: players });
};

/**
 * Emits a list of all players to the client sockets.
 */
const sendAllPlayers = () => {
  io.fetchSockets().then((sockets) => {
    const players = sockets.map((socket) => {
      player = { id: socket.id, ...socket.player };
      return player;
    });
    io.emit("allPlayers", { players: players });
  });
};

/**
 * Updates a given socket's balance with the given
 * @param {Number} amount
 * @param {Socket} socket
 * @returns the new balance
 */
const updateBalance = (amount, socket) => {
  if (socket.player && socket.player.balance) {
    socket.player.balance = Number(socket.player.balance) + Number(amount);
    return socket.player.balance;
  }
  return 0;
};

/**
 * Chooses an item in the given list randomly, based on its chance.
 * The weight can be seen as a predisposition of that item to be chosen.
 * Note: if the sum of all weights would be 100, they can be thought of as
 * percentages ( but they don't need to sum up to 100 ).
 * @param {Array} items - list of objects which contain a property called weight.
 * @returns the index of the chosen item.
 */
function chooseItem(items) {
  let accumulatedWeight = 0.0;
  const entries = [];

  for (let i in items) {
    accumulatedWeight += items[i].weight;
    entries.push({ accumulatedWeight, index: i });
  }

  const r = Math.random() * accumulatedWeight;

  const chosenEntry = entries.find((entry) => {
    return entry.accumulatedWeight >= r;
  });

  return chosenEntry.index;
}

/**
 * Creates a timeout for the given amount of milliseconds that is thenable and cancelable.
 * @param {Number} ms - amount of milliseconds to wait for.
 * @returns {Object} promise, cancelSleep - the promise of the timeout and the function to cancel it.
 */
function sleep(ms) {
  let cancelSleep;
  const promise = new Promise((resolve) => {
    const timeout = setTimeout(resolve, ms);
    cancelSleep = () => {
      clearTimeout(timeout);
    };
  });
  return { promise, cancelSleep };
}

module.exports = {
  gameCanStart,
  startGame,
  increaseJackpot,
  sendBettingPlayers,
  sendAllPlayers,
  updateBalance,
};
