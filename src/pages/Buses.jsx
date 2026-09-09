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

import {
  requestNotificationPermission,
  showBusNotification
} from "../services/notifications/notificationService";

import { startBusSimulation } from "../services/firebase/busSimulator";

// Keeps track of buses that already sent a notification
const notifiedBuses = new Set();

function Buses({ onNavigate }) {
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);

  const [notificationEnabled, setNotificationEnabled] =
    useState(
      "Notification" in window &&
      Notification.permission === "granted"
    );

  // Start bus simulation
  useEffect(() => {
    const stopSimulation = startBusSimulation();

    return () => {
      stopSimulation();
    };
  }, []);

  // Listen for live bus updates
  useEffect(() => {
    const unsubscribe = listenToBuses((data) => {
      setBuses(data);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // Enable browser notifications
  const enableNotifications = async () => {
    const granted =
      await requestNotificationPermission();

    setNotificationEnabled(granted);

    if (granted) {
      alert("🔔 Notifications enabled!");
    } else {
      alert(
        "❌ Notifications were not enabled."
      );
    }
  };

  // Check whether a bus is close enough for notification
  useEffect(() => {
    if (!notificationEnabled) {
      return;
    }

    buses.forEach((bus) => {
      const distance =
        calculateDistance(
          bus.latitude,
          bus.longitude,
          bus.destinationLatitude,
          bus.destinationLongitude
        );

      const calculatedETA =
        calculateETA(
          distance,
          bus.speed
        );

      console.log(
        `🚌 Bus ${bus.busNumber} | ETA: ${calculatedETA} min`
      );

      // Send notification when bus is 2 minutes away or less
      if (
        calculatedETA !== null &&
        calculatedETA <= 2 &&
        !notifiedBuses.has(bus.id)
      ) {
        console.log(
          `🔔 Sending notification for Bus ${bus.busNumber}`
        );

        showBusNotification(
          bus.busNumber,
          calculatedETA
        );

        notifiedBuses.add(bus.id);
      }

      // Reset notification when bus moves away
      if (
        calculatedETA === null ||
        calculatedETA > 15
      ) {
        notifiedBuses.delete(bus.id);
      }
    });
  }, [buses, notificationEnabled]);

  return (
    <>
      <Navbar />

      <main>
        <section className="page-header">
          <h1>Available Buses 🚌</h1>

          <p>
            Select a bus to view its details.
          </p>

          <button
            onClick={enableNotifications}
            disabled={notificationEnabled}
            style={{
              marginTop: "15px",
              padding: "10px 18px",
              border: "none",
              borderRadius: "8px",
              backgroundColor: notificationEnabled
                ? "#16a34a"
                : "#2563eb",
              color: "white",
              cursor: notificationEnabled
                ? "default"
                : "pointer"
            }}
          >
            {notificationEnabled
              ? "🔔 Notifications Enabled"
              : "🔔 Enable Notifications"}
          </button>
        </section>

        {loading ? (
          <p>Loading buses...</p>
        ) : (
          <div className="bus-list">
            {buses.map((bus) => {
              const distance =
                calculateDistance(
                  bus.latitude,
                  bus.longitude,
                  bus.destinationLatitude,
                  bus.destinationLongitude
                );

              const calculatedETA =
                calculateETA(
                  distance,
                  bus.speed
                );

              return (
                <div
                  className="bus-card"
                  key={bus.id}
                >
                  <h2>
                    🚌 Bus{" "}
                    {bus.busNumber}
                  </h2>

                  <p>
                    <strong>
                      Route:
                    </strong>{" "}
                    {bus.route}
                  </p>

                  <p>
                    <strong>
                      ETA:
                    </strong>{" "}
                    {calculatedETA} minutes
                  </p>

                  <p>
                    <strong>
                      Distance:
                    </strong>{" "}
                    {distance.toFixed(2)} km
                  </p>

                  <p>
                    <strong>
                      Status:
                    </strong>{" "}
                    {bus.status}
                  </p>

                  <p>
                    <strong>
                      Speed:
                    </strong>{" "}
                    {bus.speed} km/h
                  </p>

                  <p>
                    <strong>
                      Location:
                    </strong>{" "}
                    {bus.latitude},{" "}
                    {bus.longitude}
                  </p>

                  <button
                    onClick={() =>
                      onNavigate(
                        `/buses/${bus.id}`
                      )
                    }
                  >
                    View Details
                  </button>

                  <button
                    onClick={() =>
                      updateBusLocation(
                        bus.id,
                        bus.latitude + 0.001,
                        bus.longitude + 0.001
                      )
                    }
                    style={{
                      marginLeft: "10px"
                    }}
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