import React, { useState, useRef, useEffect } from "react";

import socketService from "../services/socketService";

import MainPage from "../views/MainPage";

const Game = (props) => {
  // Props
  const username = props.username;

  // Refs
  const socketRef = useRef(null);

  // State
  const [countdown, setCountdown] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [winner, setWinner] = useState("");
  const [balance, setBalance] = useState(props.balance);
  const [bettingPlayers, setBettingPlayers] = useState([]);

  useEffect(() => {
    socketRef.current = socketService.createSocket();

    return () => socketRef.current.disconnect();
  }, []);

  useEffect(() => {
    socketRef.current.on("requestPlayerData", () => {
      socketRef.current.emit("sendPlayerData", { username, balance });
    });
    socketRef.current.on("spinWheel", (data) => {
      setWinner(data);
    });
    socketRef.current.on("countdown", (data) => {
      setCountdown(data);
    });

    socketRef.current.on("allPlayers", (data) => {
      setParticipants(data.players);
    });

    socketRef.current.on("bettingPlayers", (data) => {
      if (data.players.length !== 0) {
        setBettingPlayers(data.players);
      }
    });

    socketRef.current.on("updateBalance", (data) => {
      setBalance(data);
    });

    socketRef.current.emit("requestPlayers");
  }, []);

  return (
    <>
      <MainPage
        socket={socketRef}
        countdown={countdown}
        user={{ name: username, funds: balance }}
        winner={winner}
        bettingPlayers={bettingPlayers}
        participants={participants}
      />
    </>
  );
};

export default Game;
