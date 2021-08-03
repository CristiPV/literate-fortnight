import React, { useState } from "react";
import Wheel from "../components/Wheel";

export default function MainPage() {
  const [spin, setSpin] = useState(false);
  const [winnings, setWinnings] = useState([]);
  const [participants] = useState([
    { item: "One", itemv: 1 },
    { item: "Two", itemv: 2 },
    { item: "Three", itemv: 3 },
  ]);
  const addWinner = (winner) => {
    setWinnings((oldArray) => [
      ...oldArray,
      {
        id: oldArray.length,
        name: winner,
      },
    ]);
  };

  const buttonStyle =
    "bg-red-300 hover:bg-pink-400 rounded pt-2 pb-2 pl-3 pr-3 w-max";

  return (
    <div className="relative h-full w-full">
      <div className="space-x-4 w-min m-auto flex flex-row p-4">
        <button className={buttonStyle} onClick={() => setSpin(!spin)}>
          Spin Wheel
        </button>
        <button className={buttonStyle} onClick={() => setSpin(false)}>
          Reset Wheel
        </button>
      </div>
      <div className="flex flex-row">
        <div className="m-auto w-min">
          <Wheel
            spin={spin}
            winner={""}
            postWinner={addWinner}
            participantsList={participants}
          />
        </div>
        <div className="absolute right-10">
          <p className="text-4xl font-bold">Winning History</p>
          {winnings.map((item, i) => (
            <p key={i}>{item.name}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
