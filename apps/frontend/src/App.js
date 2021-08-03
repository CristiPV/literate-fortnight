import React, { useState } from "react";

import ClientSocket from "./components/ClientSocket";

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
