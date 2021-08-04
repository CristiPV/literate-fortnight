
import MainPage from "./views/MainPage";
import React, { useState } from "react";

import Game from "./components/Game";

function App() {
  const [isClientLoaded, setIsClientLoaded] = useState(true);

  return (
    <div className="h-screen w-full bg-gradient-to-r from-green-400 to-blue-500 font-mono">
      <MainPage />
      <button onClick={() => setIsClientLoaded((prevState) => !prevState)}>
        {isClientLoaded ? "Join game" : "Leave game"}
      </button>
      {isClientLoaded ? <Game username="Cristi"/> : null}
    </div>
  );
}

export default App;
