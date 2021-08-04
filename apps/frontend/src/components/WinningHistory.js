import React from "react";

const WinningHistory = (props) => {
  return (
    <div className="absolute right-10 rounded h-4/5">
    <p className="text-5xl font-extrabold text-red-300 pb-1">
      Winning History
    </p>
    <div className="h-full overflow-y-auto p-2 bg-red-300 bg-opacity-50">
      {props.winnings.map((item, i) => (
        <p key={i} className="text-2xl m-auto w-min p-2 text-green-300 font-bold">
          {item.name}
        </p>
      ))}
    </div>
  </div>
  );
};

export default WinningHistory;
