import React, { useState, useRef, useEffect } from "react";

import socketService from "../services/socketService";

const Game = (props) => {
  // Props
  const username = props.username;
  const balance = props.balance;

  // Refs
  const socketRef = useRef(null);

  // State
  const [countdown, setCountdown] = useState(null);

  useEffect(() => {
    socketRef.current = socketService.createSocket();

    socketRef.current.on("requestPlayerData", () => {
      socketRef.current.emit("sendPlayerData", { username, balance });
    });

    socketRef.current.on("countdown", (data) => {
      setCountdown(data);
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
      {countdown ? <div>{countdown}</div> : <></>}
    </>
  );
};

export default Game;
