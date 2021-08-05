import React, { useEffect, useState } from "react";
import Wheel from "../components/Wheel";
import CountDownTimer from "../components/CountDownTimer";
import WinningHistory from "../components/WinningHistory";
import BetInput from "../components/BetInput";
import UserInfo from "../components/UserInfo";
import ListofParticipants from "../components/ListofParticipants";


export default function MainPage(props) {
  const [reload, setReload] = useState(1);
  const [betAmount, setBetAmount] = useState(50);
  const [spin, setSpin] = useState({spin: false, winner: undefined});
  const [winnings, setWinnings] = useState([]);
  const [participants, setParticipants] = useState([
    { item: "One", itemv: 1 },
    { item: "Two", itemv: 2 },
    { item: "Three", itemv: 3 },
  ]);
  const [doneSpinning, setDoneSpinning] = useState(false);

  const addParticipant = (participant) =>{
    setParticipants((oldArray)=>[
      ...oldArray,
      {
      id: oldArray.length,
      name: participant,
      },
    ]);
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

  const mapToWheelValues = () => {
    const tmp = props.bettingPlayers.map((player) => (
      {item: player.id, itemv: 1}
    ))
    return tmp
  }

  useEffect(() => {
    setSpin({spin: false, winner: undefined})
    setReload(reload + 1)
  },[props.bettingPlayers])

  
  useEffect(() => {
    console.log(props.winner)
    if(props.winner.id)
    {
      setSpin({spin: true, winner: props.winner.id})
    }
    
  },[props.winner])

  useEffect(() => {
    if(doneSpinning)
    {
      addWinner(props.winner.id)
      setDoneSpinning(false);
    }
    
  }, [doneSpinning])
  

  const buttonStyle =
    "bg-red-300 hover:bg-pink-400 rounded pt-2 pb-2 pl-3 pr-3 w-max";

  return (
    <div className="relative h-full w-full">
      <div>
        <WinningHistory winnings={winnings} />
        <ListofParticipants participants={participants}/>
        <div className="space-x-4 w-min m-auto flex flex-row p-4">
          <UserInfo user={props.user} />
          <BetInput
            socket={props.socket}
            betAmount={betAmount}
            setBetAmount={setBetAmount}
          />
          <CountDownTimer value={"" + props.countdown} />
        </div>
        <div className="flex flex-row">
          <div className="m-auto w-min">
            {props.bettingPlayers.length > 0 ? (
              <Wheel
              key={reload}
              spin={spin}
              doneSpinning={doneSpinning}
              setDoneSpinning={setDoneSpinning}
              postWinner={addWinner}
              participantsList={mapToWheelValues()}
            />
            ): <p>W8ing for more players</p>}
            
          </div>
        </div>
      </div>
    </div>
  );
}