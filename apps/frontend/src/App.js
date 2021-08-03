import React, { useState } from "react";

import Game from "./components/Game";

function App() {
  const [isClientLoaded, setIsClientLoaded] = useState(true);

  return (
    <>
      <button onClick={() => setIsClientLoaded((prevState) => !prevState)}>
        {isClientLoaded ? "Join game" : "Leave game"}
      </button>
      {isClientLoaded ? <Game username="Cristi" balance={200} /> : null}
    </>
  );
}

export default App;
