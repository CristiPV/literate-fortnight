import React from "react";

const ListofParticipants = (props) => {
  var list = props.participants;

  return (
    <div className="rounded w-1/4">
      <p className="sm:text-3xl text-xs font-extrabold text-red-300 pb-1 m-auto w-max">
        Participants
      </p>
      <div className="h-full overflow-y-auto p-2 bg-red-300 bg-opacity-50">
        {list.map((participant, id) => (
          <p
            key={id}
            className="sm:text-2xl text-sm m-auto w-min p-2 text-green-300 font-bold"
          >
            {participant.item}
          </p>
        ))}
      </div>
    </div>
  );
};

export default ListofParticipants;
