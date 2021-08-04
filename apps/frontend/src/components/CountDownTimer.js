import React from "react";

const CountDownTimer = (props) => {
  const renderTimer = () => {
    let tmpArray = [];
    if (props.value.length === 1) {
        tmpArray.push("0")
        tmpArray.push(props.value[0])
    } else {
      for (let index = 0; index < props.value.length; index++) {
        tmpArray.push(props.value[index]);
      }
    }

    return (
      <div className="flex flex-row space-x-2">
          <p className="text-green-300 text-3xl w-max m-auto ">Time left: </p>
        {tmpArray.map((k, i) => (
          <p key={i} className="text-4xl text-red-400 pl-1 pr-1 bg-green-300 rounded">
            {k}
          </p>
        ))}
      </div>
    );
  };
  return <div>{renderTimer()}</div>;
};

export default CountDownTimer;
