import React from "react";
/*
const ListofParticipantp = [
    "test1","test2","test3"];
*/
/*
function ListItem(props){
    return <li>{props.value}</li>
}

function ParticipantList(props){
    var participants = props.participantsList;
    var listItems = participants.map((item)=>
    <ListItem key={item} value={Number} />
    );
    return(
        <ul>{listItems}</ul>
    );
}
*/
const ListofOpponents = (props) => {
    //var participantss = props.ParticipantList;
    return(
        <div className="absolute left-6 h-3/4">
            <p className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-red-800 to-white">
                List of Opponents
            </p>
            <div className="h-1 bg-green-300 m-2" />
                <div className="h-full overflow-y-auto border border-2 border-t-4 border-r-4 border-red-300 p-2 text-white">
                <p>{props.item}</p>
            </div>
        </div>
  )
}

export default ListofOpponents;