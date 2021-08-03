import React, { useState } from "react";

import ClientSocket from "./components/ClientSocket";

const ENDPOINT = process.env.REACT_APP_SERVER_ENDPOINT;

function App() {
  const [isClientLoaded, setIsClientLoaded] = useState(true);

  return (
    <>
      <button onClick={() => setIsClientLoaded((prevState) => !prevState)}>
        {isClientLoaded ? "Disconnect" : "Connect"}
      </button>
      {isClientLoaded ? <ClientSocket /> : null}
    </>
  );
}

export default App;
