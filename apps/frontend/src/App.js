
import MainPage from "./views/MainPage";
import React from "react";

//import ClientSocket from "./components/ClientSocket";

function App() {
  //const [isClientLoaded, setIsClientLoaded] = useState(true);

  return (
    <div className="h-screen w-full bg-gradient-to-r from-green-400 to-blue-500 font-mono">
      <MainPage />
    </div>
  );
}

export default App;
