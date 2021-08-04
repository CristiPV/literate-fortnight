import React from "react";

const BetInput = (props) => {
  return (
    <div className="flex flex-row">
      <input
        className="w-20 overflow-hidden rounded-l text-center"
        value={props.betAmount}
        onChange={(e) => props.setBetAmount(e.target.value)}
      />
      <button
        className="w-20 bg-red-300 hover:bg-pink-400 rounded-r pt-2 pb-2 pl-3 pr-3 w-max overflow-hidden"
        onClick={() => props.socket.current.emit("placedBet", props.betAmount)}
      >
        Bet
      </button>
    </div>
  );
};

export default BetInput;
