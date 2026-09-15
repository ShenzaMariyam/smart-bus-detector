import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

import {
  getRoutes
} from "../services/firebase/routeService";

function Buses({ onNavigate }) {
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRoutes() {
      try {
        const data = await getRoutes();

        setRoutes(data);

        console.log(
          "🛣️ Routes loaded from Firebase:",
          data
        );

        setLoading(false);
      } catch (error) {
        console.error(
          "❌ Could not load routes:",
          error
        );

        setLoading(false);
      }
    }

    loadRoutes();
  }, []);

  return (
    <>
      <Navbar />

      <main>
        <section className="page-header">
          <h1>Available Buses 🚌</h1>

          <p>
            Select a bus to view its details.
          </p>
        </section>

        {loading ? (
          <p>Loading buses...</p>
        ) : (
          <div className="bus-list">
            {routes.map((route) => {
              return (
                <div
                  className="bus-card"
                  key={route.id}
                >
                  <h2>
                    🚌 Route{" "}
                    {route.routeNumber}
                  </h2>

                  <p>
                    <strong>
                      Operator:
                    </strong>{" "}
                    {route.operator ||
                      "Mangaluru City Bus"}
                  </p>

                  <p>
                    <strong>
                      Route:
                    </strong>{" "}
                    {route.startPoint} →{" "}
                    {route.destination}
                  </p>

                  <p>
                    <strong>
                      Status:
                    </strong>{" "}
                    Available
                  </p>

                  {route.stops && (
                    <p>
                      <strong>
                        Stops:
                      </strong>{" "}
                      {route.stops.length}
                    </p>
                  )}

                  {route.points &&
                    route.points.length >= 2 && (
                      <p>
                        <strong>
                          Route Map:
                        </strong>{" "}
                        Available
                      </p>
                    )}

                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      flexWrap: "wrap",
                      alignItems: "center"
                    }}
                  >
                    <button
                      onClick={() =>
                        onNavigate(
                          `/map?route=${route.id}`
                        )
                      }
                      style={{
                        backgroundColor:
                          "#FFEBEE",
                        color: "#B71C1C",
                        border:
                          "1px solid #FFCDD2"
                      }}
                    >
                      🗺️ View on Map
                    </button>
                  </div>
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