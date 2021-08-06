import React, { useRef, useEffect, useState } from "react";

//import WheelComponent from 'react-wheel-of-prizes'
import StaticWheel from "./StaticWheel";
import SpinningWheel from "./SpinningWheel";
import "react-wheel-of-prizes/dist/index.css";

const Wheel = (props) => {
  const [size, setSize] = useState(10);
  const [inc, setInc] = useState(0);
  const wheelContainerRef = useRef();
  const wheelText = "";
  const segColors = ["#EE4040", "#F0CF50"];
  const onFinished = (winner) => {
    //props.postWinner(winner);
  };
  /*
  const handleResize = () => {
    try {
      console.log(wheelContainerRef.current.clientHeight)
      setSize(wheelContainerRef.current.getBoundingClientRect().width > 600 ? 600 : wheelContainerRef.current.getBoundingClientRect().width)
    } catch (error){
    }
      
  };
  */

  useEffect(() => {
    let tmp = props.wRef.current.getBoundingClientRect().width / 6;
    setSize(tmp > 600 ? 600 : tmp);
    setInc(inc + 1);
  }, []);

  const jackpotAmount = () => {
    console.log(props.participantsList)
    let tmp = 0;
    props.participantsList.map((p) => tmp += p.itemv)
    return (
      <div className="m-auto w-min pb-2">
        <p className="w-max text-yellow-400 sm:text-3xl text-xs">Jackpot</p>
      <p className="w-max text-yellow-400 sm:text-5xl text-xs m-auto">{tmp}</p>
      </div>
    )
  }

  return (
    <div className="w-full" ref={wheelContainerRef}>
      <div className="w-full">
      {
        jackpotAmount()
      }
      </div>
      {props.spin.spin ? (
        <SpinningWheel
          segments={props.participantsList}
          segColors={segColors}
          winningSegment={props.spin.winner}
          onFinished={(winner) => onFinished(winner)}
          primaryColor=""
          contrastColor=""
          buttonText={wheelText}
          isOnlyOnce={false}
          size={size}
          upDuration={1000}
          downDuration={1000}
          doneSpinning={props.doneSpinning}
          setDoneSpinning={props.setDoneSpinning}
        />
      ) : (
        <StaticWheel
          key={inc}
          segments={props.participantsList}
          segColors={segColors}
          winningSegment={props.winner}
          onFinished={(winner) => onFinished(winner)}
          primaryColor=""
          contrastColor=""
          buttonText={wheelText}
          isOnlyOnce={false}
          size={size}
          upDuration={100}
          downDuration={1000}
        />
      )}
    </div>
  );
};

export default Wheel;
