import React, { useState, useRef } from "react";
import Wheel from "../components/Wheel";
import UserInputComponent from "../components/UserInputComponent";
export default function MainPage() {
  const [spin, setSpin] = useState(false);
  const [winnings, setWinnings] = useState([]);
  const [participants, setParticipants] = useState([
    { item: "One", itemv: 1 },
    { item: "Two", itemv: 2 },
    { item: "Three", itemv: 3 },
  ]);
  const [wheelId, setWheelId] = useState(1);
  const addWinner = (winner) => {
    setWinnings((oldArray) => [
      ...oldArray,
      {
        id: oldArray.length,
        name: winner,
      },
    ]);
  };

  return (
    <div>
      <button onClick={() => setSpin(!spin)}>Spin</button>
      <button onClick={() => setSpin(false)}>Reset</button>
      <Wheel
        key={wheelId}
        spin={spin}
        winner={""}
        postWinner={addWinner}
        participantsList={participants}
      />
      {winnings.map((item, i) => (
        <p key={i}>{item.name}</p>
      ))}
      <UserInputComponent/>
    </div>
  );
}
