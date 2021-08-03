import React, { useState } from "react";

import ClientSocket from "./components/ClientSocket";

function App() {
  const [isClientLoaded, setIsClientLoaded] = useState(true);

  return (
    <>
      <button onClick={() => setIsClientLoaded((prevState) => !prevState)}>
        {isClientLoaded ? "Disconnect" : "Connect"}
      </button>
      {isClientLoaded ? <ClientSocket username="Cristi" balance={200} /> : null}
    </>
  );
}

export default App;
