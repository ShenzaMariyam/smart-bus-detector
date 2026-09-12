import { useState, useEffect } from "react";

import Home from "./pages/Home";
import Buses from "./pages/Buses";
import MapPage from "./pages/MapPage";
import BusDetails from "./pages/BusDetails";
import SplashScreen from "./components/SplashScreen";

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [currentPath, setCurrentPath] = useState(
    window.location.pathname
  );

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener(
        "popstate",
        handlePopState
      );
    };
  }, []);

  const navigate = (path) => {
    window.history.pushState({}, "", path);
    setCurrentPath(path);
  };

  const renderContent = () => {
    // Bus Details
    if (currentPath.startsWith("/buses/")) {
      const busId = currentPath.split("/")[2];

      return (
        <BusDetails
          busId={busId}
          onNavigate={navigate}
        />
      );
    }

    // Buses
    if (currentPath === "/buses") {
      return (
        <Buses
          onNavigate={navigate}
        />
      );
    }

    // Map
    if (currentPath === "/map") {
      return <MapPage />;
    }

    // Home
    return (
      <Home
        onNavigate={navigate}
      />
    );
  };

  return (
    <>
      {showSplash && (
        <SplashScreen onFinish={() => setShowSplash(false)} />
      )}
      {renderContent()}
    </>
  );
}

export default App;