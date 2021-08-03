import React, { useEffect } from "react";

import socketService from "../services/socketService";

function Game(props) {
  // Props
  const username = props.username;
  const balance = props.balance;

  useEffect(() => {
    const socket = socketService.createSocket();

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

export default Game;
