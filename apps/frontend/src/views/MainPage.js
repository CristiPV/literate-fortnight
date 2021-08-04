import React, { useState } from "react";
import Wheel from "../components/Wheel";
import UserInputComponent from "../components/UserInputComponent";
import CountDownTimer from "../components/CountDownTimer";
import WinningHistory from "../components/WinningHistory";
export default function MainPage() {
  const [spin, setSpin] = useState(false);
  const [winnings, setWinnings] = useState([]);
  const [user, setUser] = useState(undefined);
  const [participants, setParticipants] = useState([
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
      {user ? (
        <div>
          <div className="space-x-4 w-min m-auto flex flex-row p-4">
            <button className={buttonStyle} onClick={() => setSpin(!spin)}>
              Spin Wheel
            </button>
            <button className={buttonStyle} onClick={() => setSpin(false)}>
              Reset Wheel
            </button>
            <CountDownTimer value={"" + 10}/>
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
            <WinningHistory winnings={winnings}/>
          </div>
        </div>
      ) : (
        <div className="pt-10 h-min w-min m-auto">
          <UserInputComponent setUser={setUser} />
        </div>
      )}
    </div>
  );
}
