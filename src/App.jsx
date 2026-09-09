import { useState, useEffect } from "react";

import Home from "./pages/Home";
import Buses from "./pages/Buses";
import MapPage from "./pages/MapPage";

import { startBusSimulation } from "./services/firebase/busSimulator";

function App() {
  const [currentPath, setCurrentPath] = useState(
    window.location.pathname
  );

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener("popstate", handlePopState);

    return () =>
      window.removeEventListener(
        "popstate",
        handlePopState
      );
  }, []);

  // Start bus simulation for the whole application
  useEffect(() => {
    const stopSimulation = startBusSimulation();

    return () => {
      stopSimulation();
    };
  }, []);

  if (currentPath === "/map") {
    return <MapPage onNavigate={setCurrentPath} />;
  }

  if (currentPath === "/buses") {
    return <Buses onNavigate={setCurrentPath} />;
  }

  return <Home onNavigate={setCurrentPath} />;
}

export default App;