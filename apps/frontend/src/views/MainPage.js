import React, { useEffect, useState, useRef } from "react";
import Wheel from "../components/Wheel";
import CountDownTimer from "../components/CountDownTimer";
import WinningHistory from "../components/WinningHistory";
import BetInput from "../components/BetInput";
import UserInfo from "../components/UserInfo";
import ListofParticipants from "../components/ListofParticipants";

export default function MainPage(props) {
  const [reload, setReload] = useState(1);
  const [betAmount, setBetAmount] = useState(50);
  const [spin, setSpin] = useState({ spin: false, winner: undefined });
  const [winnings, setWinnings] = useState([]);
  const [doneSpinning, setDoneSpinning] = useState(false);
  const ref = useRef();

  const mapToParticipantsValues = () => {
    const p = props.participants.map((participant) => ({
      item: participant.username,
      id: participant.id,
    }));
    return p;
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
    const tmp = props.bettingPlayers.map((player) => ({
      item: player.id,
      itemv: 1,
    }));
    return tmp;
  };

  useEffect(() => {
    setSpin({ spin: false, winner: undefined });
    setReload(reload + 1);
  }, [props.bettingPlayers]);

  useEffect(() => {
    console.log(props.winner);
    if (props.winner.id) {
      setSpin({ spin: true, winner: props.winner.id });
    }
  }, [props.winner]);

  useEffect(() => {
    if (doneSpinning) {
      addWinner(props.winner.id);
      setDoneSpinning(false);
    }
  }, [doneSpinning]);

  return (
    <div className="h-full w-full" ref={ref}>
        <div className="flex sm:flex-row flex-col p-4 space-x-4 w-min m-auto">
          <UserInfo user={props.user} />
          <BetInput
            socket={props.socket}
            betAmount={betAmount}
            currentBalance={props.user.funds}
            setBetAmount={setBetAmount}
          />
          <CountDownTimer value={"" + props.countdown} />
        </div>
        <div className="flex flex-row overflow-hidden h-3/4">
          <ListofParticipants participants={mapToParticipantsValues()} />
          <div className="w-min m-auto">
            {props.bettingPlayers.length > 0 ? (
              <Wheel
                key={reload}
                wRef={ref}
                spin={spin}
                doneSpinning={doneSpinning}
                setDoneSpinning={setDoneSpinning}
                postWinner={addWinner}
                participantsList={mapToWheelValues()}
              />
            ) : (
              <p>W8ing for more players</p>
            )}
          </div>
          <WinningHistory winnings={winnings} />
        </div>
    </div>
  );
}
