import React from "react";

//import WheelComponent from 'react-wheel-of-prizes'
import StaticWheel from "./StaticWheel";
import SpinningWheel from "./SpinningWheel";
import "react-wheel-of-prizes/dist/index.css";

const Wheel = (props) => {
  const wheelText = "Jackpot";
  const segColors = [
    "#EE4040",
    "#F0CF50",
    "#815CD1",
    "#3DA5E0",
    "#34A24F",
    "#F9AA1F",
    "#EC3F3F",
    "#FF9000",
  ];
  const onFinished = (winner) => {
    props.postWinner(winner);
  };
  return (
    <div>
      {props.spin ? (
        <SpinningWheel
          segments={props.participantsList}
          segColors={segColors}
          winningSegment={props.winner}
          onFinished={(winner) => onFinished(winner)}
          primaryColor="black"
          contrastColor="white"
          buttonText={wheelText}
          isOnlyOnce={false}
          size={300}
          upDuration={100}
          downDuration={1000}
          doneSpinning={props.doneSpinning}
          setDoneSpinning={props.setDoneSpinning}
        />
      ) : (
        <StaticWheel
          segments={props.participantsList}
          segColors={segColors}
          winningSegment={props.winner}
          onFinished={(winner) => onFinished(winner)}
          primaryColor="black"
          contrastColor="white"
          buttonText={wheelText}
          isOnlyOnce={false}
          size={300}
          upDuration={100}
          downDuration={1000}
        />
      )}
    </div>
  );
};

export default Wheel;
