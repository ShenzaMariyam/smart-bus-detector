import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Navbar from "../components/Navbar";
import sampleBuses from "../data/sampleBuses";

// Simple bus emoji marker icon
const busIcon = L.divIcon({
  className: "custom-marker-wrapper",
  html: `<div style="font-size: 28px; line-height: 1; text-align: center; cursor: pointer;">🚌</div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -16],
});

function MapPage({ onNavigate }) {
  // Center coordinates for map view
  const center = [12.9716, 77.5946];

  // Store buses in state so markers move when coordinates change
  const [buses, setBuses] = useState(sampleBuses);

  // Simulate GPS movement every 2.5 seconds
  useEffect(() => {
    // Step counter and direction (1: moving forward, -1: returning)
    let step = 0;
    let direction = 1;

    const intervalId = setInterval(() => {
      // Reverse direction after 8 steps so buses oscillate along their route
      step += direction;
      if (step >= 8 || step <= 0) {
        direction *= -1;
      }

      // Update each bus's latitude and longitude slightly
      setBuses((prevBuses) =>
        prevBuses.map((bus) => {
          // Bus 101 moves South-East / North-West
          // Bus 105 moves North-East / South-West
          const latDelta = bus.id === "bus101" ? 0.0003 * direction : -0.00025 * direction;
          const lngDelta = bus.id === "bus101" ? 0.00035 * direction : 0.0004 * direction;

          return {
            ...bus,
            lat: Number((bus.lat + latDelta).toFixed(6)),
            lng: Number((bus.lng + lngDelta).toFixed(6)),
          };
        })
      );
    }, 2500);

    // Clean up timer when user leaves the map page
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <Navbar onNavigate={onNavigate} />

      <main className="map-page-main">
        <h1>Smart Bus Map</h1>

        <div className="map-container-wrapper" style={{ height: "500px" }}>
          <MapContainer
            center={center}
            zoom={13}
            scrollWheelZoom={true}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* Display each moving bus as a marker on the map */}
            {buses.map((bus) => (
              <Marker
                key={bus.id}
                position={[bus.lat, bus.lng]}
                icon={busIcon}
              >
                <Popup>
                  <div className="bus-popup">
                    <h3>🚌 Bus {bus.busNumber}</h3>
                    <p><strong>Route:</strong> {bus.route}</p>
                    <p><strong>ETA:</strong> {bus.eta} mins</p>
                    <p>
                      <strong>Status:</strong>{" "}
                      <span className="status-tag status-ontime">{bus.status}</span>
                    </p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </main>
    </>
  );
}

export default MapPage;
