import React from "react";

const BetInput = (props) => {
  return (
    <div>
      <input value={props.betAmount} onChange={(e) => (props.setBetAmount(e.target.value))} />
      <button
        className="bg-red-300 hover:bg-pink-400 rounded pt-2 pb-2 pl-3 pr-3 w-max"
        onClick={() => props.socket.current.emit("placedBet", props.betAmount)}
      >
        Bet {props.betAmount}
      </button>
    </div>
  );
};

export default BetInput;
