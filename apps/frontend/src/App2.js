import React, { useState } from "react";
import Wheel from "./components/Wheel";

function App2(props) {
  const [reload, setReload] = useState(1);
  const [betAmount, setBetAmount] = useState(50);
  const [spin, setSpin] = useState({ spin: false, winner: undefined });
  const [winnings, setWinnings] = useState([]);
  const [participants, setParticipants] = useState([
    { item: "One", itemv: 1 },
    { item: "Two", itemv: 2 },
    { item: "Three", itemv: 3 },
  ]);
  const [doneSpinning, setDoneSpinning] = useState(false);

  const mapToWheelValues = () => {
    const tmp = props.bettingPlayers.map((player) => ({
      item: player.id,
      itemv: 1,
    }));
    return tmp;
  };

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
    <div className="h-screen w-full bg-gradient-to-r from-green-400 to-blue-500 font-mono">
        <button onClick={() => setSpin({ spin: true, winner: "one" })}>Spin</button>
      <Wheel
        key={reload}
        spin={spin}
        doneSpinning={doneSpinning}
        setDoneSpinning={setDoneSpinning}
        postWinner={addWinner}
        participantsList={mapToWheelValues()}
      />
    </div>
  );
}

export default App2;
