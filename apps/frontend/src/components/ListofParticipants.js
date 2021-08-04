import React from "react";

const ListofParticipants = (props) => {
    
    return(
            <div className="absolute left-5 rounded h-4/5 w-1/4">
                <p className="text-5xl font-extrabold text-red-300 pb-1 text-center">
                    Participants
                </p>                
                 <div className="h-full overflow-y-auto p-2 bg-red-300 bg-opacity-50">
                    {props.participants.map((item, i) => (
                    <p key={i} className="text-2xl m-auto w-min p-2 text-green-300 font-bold">
                        {item.item}
                    </p>
                    ))}
                </div>
            </div>
        )
}

export default ListofParticipants;