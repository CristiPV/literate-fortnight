import React from "react";

const Countdown = (props) => {
  // Props
  const countdown = props.countdown;
  return <div>{countdown ? <div>{countdown}</div> : <></>}</div>;
};

export default Countdown;
