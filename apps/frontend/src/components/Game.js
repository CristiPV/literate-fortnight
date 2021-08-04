import React, { useState, useRef, useEffect } from "react";
import ListofParticipants from "./ListofParticipants";

import Countdown from "./Countdown";

import socketService from "../services/socketService";

import MainPage from "../views/MainPage";

const Game = (props) => {
  // Props
  const username = props.username;
  const balance = props.balance;

  // Refs
  const socketRef = useRef(null);

  // State
  const [countdown, setCountdown] = useState(null);
  const [participant, setParticipant] = useState([]);
  const [winner, setWinner] = useState("");

  useEffect(() => {
    socketRef.current = socketService.createSocket();

    socketRef.current.on("requestPlayerData", () => {
      socketRef.current.emit("sendPlayerData", { username, balance });
    });
    socketRef.current.on("spinWheel", (data) => {
      console.log(data);
      console.log(socketRef.current);
      setWinner(data);
    });
    socketRef.current.on("countdown", (data) => {
      setCountdown(data);
    });

    return () => socketRef.current.disconnect();
  }, [username, balance]);

  return (
    <>
    <MainPage socket={socketRef} countdown={countdown} user={{name: username, funds: balance}} winner={winner} />
      <div>
        Player {username} joined with {balance} credits !
      </div>
      <button onClick={() => socketRef.current.emit("placedBet", 50)}>
        Bet 50 credits
      </button>
      <Countdown countdown={countdown} />
      {winner ? (
        <div>
          <p>{winner.winner.id}</p>
          <p>{socketRef.current.toString()}</p>
        </div>
      ) : null}
    </>
  );
};

export default Game;
