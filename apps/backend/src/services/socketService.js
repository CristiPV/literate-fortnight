const socketIo = require("socket.io");

let io = null;

/**
 * Creates the io for a given server and returns it.
 * @param {http.Server} server
 * @returns io
 */
const createIo = (server) => {
  io = socketIo(server);
  return io;
};

/**
 * Returns the io or throws and error if the io hasn't been created.
 * @returns io
 * @throws Error - io not created
 */
const getIo = () => {
  if (io == null) throw Error("Io not created.");
  return io;
};

module.exports = {
  createIo,
  getIo,
};
