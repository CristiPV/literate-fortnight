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
  const [bettingPlayers, setBettingPlayers] = useState([]);

  useEffect(() => {
    socketRef.current = socketService.createSocket();

    socketRef.current.on("requestPlayerData", () => {
      socketRef.current.emit("sendPlayerData", { username, balance });
    });
    socketRef.current.on("spinWheel", (data) => {
      console.log(data);
      setWinner(data);
    });
    socketRef.current.on("countdown", (data) => {
      setCountdown(data);
    });

    socketRef.current.on("allPlayers", (data) => {
      console.log(data);
    });

    socketRef.current.on("bettingPlayers", (data) => {
      if(data.players.length !== 0)
      {
        console.log(data)
        setBettingPlayers(data.players);
      }
      
      
    });

    socketRef.current.on("updateBalance", (data) => {
      setBalance(data);
    });
  }, [username, balance]);

  return (
    <>
    <MainPage socket={socketRef} countdown={countdown} user={{name: username, funds: balance}} winner={winner} bettingPlayers={bettingPlayers} />
      {winner ? (
        <div>
          <p>{winner.id}</p>
        </div>
      ) : null}
      {/* buttons for testing the requestPlayers event. 
          It takes in a boolean argument (bettingOnly):
           - true for betting players only
           - false for all players
      */}
      <button onClick={() => {socketRef.current.emit("requestPlayers")}}> Players list </button>
    </>
  );
};

export default Game;
