import MainPage from "./views/MainPage";
import React, { useState } from "react";
import UserInputComponent from "./components/UserInputComponent";

import Game from "./components/Game";

function App() {
  const [isClientLoaded, setIsClientLoaded] = useState(true);
  const [user, setUser] = useState(undefined);

  return (
    <div className="h-screen w-full bg-gradient-to-r from-green-400 to-blue-500 font-mono">
      {user ? (
        <Game username={user.name} balance={user.funds} />
      ) : (
        <div className="pt-10 h-min w-min m-auto">
          <UserInputComponent setUser={setUser} />
        </div>
      )}
    </div>
  );
}

export default App;
