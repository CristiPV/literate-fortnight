import socketIOClient from "socket.io-client";

const ENDPOINT = process.env.REACT_APP_SERVER_ENDPOINT;

const createSocket = () => {
  const socket = socketIOClient(ENDPOINT, { transports: ["websocket"] });
  return socket;
};

const socketService = { createSocket };

export default socketService;
