import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";

const ENDPOINT = process.env.REACT_APP_SERVER_ENDPOINT;

function App() {
  const [response, setResponse] = useState("");

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("FromAPI", (data) => {
      setResponse(data);
    });
  }, []);

  return (
    <div>
      <p>
        It's <time dateTime={response}>{response}</time>
      </p>
    </div>
  );
}

export default App;
