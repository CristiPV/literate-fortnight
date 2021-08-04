import React, { useState, useRef, useEffect } from "react";
import ListofParticipants from "./ListofParticipants";

import Countdown from "./Countdown";

import socketService from "../services/socketService";

import MainPage from "../views/MainPage";

const Game = (props) => {
  // Props
  const username = props.username;

  // Refs
  const socketRef = useRef(null);

  // State
  const [countdown, setCountdown] = useState(null);
  const [participant, setParticipant] = useState([]);
  const [winner, setWinner] = useState("");
  const [balance, setBalance] = useState(props.balance);

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

    socketRef.current.on("allPlayers", (data) => {
      console.log("AllPlayers", data);
    });

    socketRef.current.on("bettingPlayers", (data) => {
      console.log("BettingPlayers", data);
    });

    socketRef.current.on("updateBalance", (data) => {
      setBalance(data);
    });
  }, [username, balance]);

  return (
    <>
    <MainPage socket={socketRef} countdown={countdown} user={{name: username, funds: balance}} winner={winner} />
      {winner ? (
        <div>
          <p>{winner.winner.id}</p>
        </div>
      ) : null}
    </>
  );
};

export default Game;
