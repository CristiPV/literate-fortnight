import React from "react";

import ClientSocket from "./components/ClientSocket";

const ENDPOINT = process.env.REACT_APP_SERVER_ENDPOINT;

function App() {
  return (
    <>
      <ClientSocket />
    </>
  );
}

export default App;
