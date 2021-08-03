import React, { useEffect } from "react";
import socketIOClient from "socket.io-client";

const ENDPOINT = process.env.REACT_APP_SERVER_ENDPOINT;

function ClientSocket(props) {
  // Props
  const username = props.username;
  const balance = props.balance;

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT, { transports: ["websocket"] });

    socket.on("requestPlayerData", () => {
      socket.emit("sendPlayerData", { username, balance });
    });

    return () => socket.disconnect();
  }, [username, balance]);

  return (
    <div>
      Player {username} joined with {balance} credits !
    </div>
  );
}

export default ClientSocket;
