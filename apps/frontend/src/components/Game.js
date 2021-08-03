import React, { useRef, useEffect } from "react";

import socketService from "../services/socketService";

function Game(props) {
  // Props
  const username = props.username;
  const balance = props.balance;

  // Refs
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = socketService.createSocket();

    socketRef.current.on("requestPlayerData", () => {
      socketRef.current.emit("sendPlayerData", { username, balance });
    });

    return () => socketRef.current.disconnect();
  }, [username, balance]);

  return (
    <>
      <div>
        Player {username} joined with {balance} credits !
      </div>
      <button onClick={() => socketRef.current.emit("placedBet", 50)}>
        Bet 50 credits
      </button>
    </>
  );
}

export default Game;
