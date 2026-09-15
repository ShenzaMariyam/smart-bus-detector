import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import BusMap from "../components/Map/BusMap";

import { startBusSimulation } from "../services/firebase/busSimulator";

function MapPage() {
  const [selectedBusId, setSelectedBusId] = useState(null);

  useEffect(() => {
    // Read the bus ID from the URL
    const params = new URLSearchParams(window.location.search);
    const busId = params.get("bus");

    setSelectedBusId(busId);
  }, []);

  useEffect(() => {
    const stopSimulation = startBusSimulation();

    return () => {
      stopSimulation();
    };
  }, []);

  return (
    <>
      <Navbar />

      <main>
        <section className="page-header">
          <h1>Bus Map 🗺️</h1>
          <p>Track buses in real time.</p>
        </section>

        <BusMap selectedBusId={selectedBusId} />
      </main>
    </>
  );
}

export default MapPage;