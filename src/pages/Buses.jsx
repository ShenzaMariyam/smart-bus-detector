import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

import {
  listenToBuses,
  updateBusLocation
} from "../services/firebase/busService";

import {
  calculateDistance,
  calculateETA
} from "../services/eta/etaCalculator";

function Buses() {
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = listenToBuses((data) => {
      setBuses(data);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      <Navbar />

      <main>
        <section className="page-header">
          <h1>Available Buses 🚌</h1>

          <p>Select a bus to view its details.</p>
        </section>

        {loading ? (
          <p>Loading buses...</p>
        ) : (
          <div className="bus-list">
            {buses.map((bus) => {
              const distance = calculateDistance(
                bus.latitude,
                bus.longitude,
                bus.destinationLatitude,
                bus.destinationLongitude
              );

              const calculatedETA = calculateETA(
                distance,
                bus.speed
              );

              return (
                <div className="bus-card" key={bus.id}>
                  <h2>🚌 Bus {bus.busNumber}</h2>

                  <p>
                    <strong>Route:</strong> {bus.route}
                  </p>

                  <p>
                    <strong>ETA:</strong> {calculatedETA} minutes
                  </p>

                  <p>
                    <strong>Distance:</strong>{" "}
                    {distance.toFixed(2)} km
                  </p>

                  <p>
                    <strong>Status:</strong> {bus.status}
                  </p>

                  <p>
                    <strong>Speed:</strong> {bus.speed} km/h
                  </p>

                  <p>
                    <strong>Location:</strong>{" "}
                    {bus.latitude}, {bus.longitude}
                  </p>

                  <button
                    onClick={() =>
                      updateBusLocation(
                        bus.id,
                        bus.latitude + 0.001,
                        bus.longitude + 0.001
                      )
                    }
                  >
                    Move Bus
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </>
  );
}

export default Buses;