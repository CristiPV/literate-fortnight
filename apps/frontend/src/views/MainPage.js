import React, { useState } from "react";
import Wheel from "../components/Wheel";
import UserInputComponent from "../components/UserInputComponent";
import ListofParticipants from "../components/ListofParticipants";

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
          <div className="flex flex-row">
            <div className="m-auto w-min"/>
            <ListofParticipants setUser={setUser}/>
          </div>          
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
            <div className="absolute right-10 rounded h-4/5">
              <p className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-red-800 to-white">
                Winning History
              </p>
              <div className="h-1 bg-green-300 m-2" />
              <div className="h-full overflow-y-auto border border-2 border-t-4 border-r-4 border-red-300 p-2 text-white">
                {winnings.map((item, i) => (
                  <p key={i} className="text-2xl m-auto w-min p-2">
                    {item.name}
                  </p>
                ))}
              </div>
            </div>
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