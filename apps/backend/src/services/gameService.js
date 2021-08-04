const { count } = require("console");
const socketService = require("./socketService");

const io = socketService.getIo();
const startTimeout = 120000; // 120.000 milliseconds ( 2 minutes )

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
    const players = [];
    const playerIds = io.sockets.adapter.rooms.get("gameRoom");

    for (id of playerIds) {
      const player = {
        id: id,
        weight: io.sockets.sockets.get(id).player.betAmount / jackpot,
      };
      players.push(player);
    }
    const winner = players[chooseItem(players)];
    console.log("Selected winner:", winner);

    io.to("gameRoom").emit("spinWheel", { winner });

    clearInterval(clockInterval);
    countdown(countdownAmount);

    resetGame();
  });
}

function resetGame() {
  io.socketsLeave("gameRoom");
  console.log(
    "Game has ended.\nGame Room:",
    io.sockets.adapter.rooms.get("gameRoom")
  );
  console.log(countdownInterval);
  resetJackpot();
  resetCountdown();
}

/**
 * Checks it the game can start or not ( if there are at least 2 players or not ).
 * @returns true or false, depending on the game starting requirements.
 */
const gameCanStart = () => {
  if (io.sockets.adapter.rooms.get("gameRoom")) {
    return io.sockets.adapter.rooms.get("gameRoom").size >= 2;
  }
  return false;
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
  gameCanStart: gameCanStart,
  startGame: startGame,
  increaseJackpot: increaseJackpot,
};
