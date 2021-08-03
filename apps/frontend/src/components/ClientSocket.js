import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";

const ENDPOINT = process.env.REACT_APP_SERVER_ENDPOINT;

function ClientSocket() {
  const [connectionTime, setConnectionTime] = useState("");

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT, { transports: ["websocket"] });
    socket.on("sendTime", (data) => {
      setConnectionTime(data);
    });

    return () => socket.disconnect();
  }, []);

  return (
    <div>
      <p>
        It's <time dateTime={connectionTime}>{connectionTime}</time>
      </p>
    </div>
  );
}

export default ClientSocket;