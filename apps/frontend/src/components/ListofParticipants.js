import React from "react";

const ListofParticipants = (props) => {
    
    return(
            <div className="absolute left-6 h-3/4">
            <p className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-red-800 to-white">
                List of Opponents
            </p>
            <div className="h-1 bg-green-300 m-2" />
                <div className="h-full overflow-y-auto border border-2 border-t-4 border-r-4 border-red-300 p-2 text-white">
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