import React, { useState, useRef, useEffect } from "react";

import Countdown from "./Countdown";

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

    socketRef.current.on("allPlayers", (data) => {
      console.log("AllPlayers", data);
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
      <Countdown countdown={countdown}/>
    </>
  );
};

export default Game;
