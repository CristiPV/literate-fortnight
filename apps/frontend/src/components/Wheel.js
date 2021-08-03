import React, { useState } from "react";

//import WheelComponent from 'react-wheel-of-prizes'
import WheelComponent from "./StaticWheel";
import WheelComponent2 from "./SpinningWheel";
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
    console.log(winner);
    props.postWinner(winner);
  };
  return (
    <div>
      {props.spin ? (
        <WheelComponent2
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
      ) : (
        <WheelComponent
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
