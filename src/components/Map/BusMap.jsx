import { useEffect, useState } from "react";

import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    Polyline,
    Tooltip
} from "react-leaflet";

import L from "leaflet";

import { listenToBuses } from "../../services/firebase/busService";
import { getRoutes } from "../../services/firebase/routeService";

const busIcon = L.divIcon({
    html: '<div style="font-size: 45px;">🚌</div>',
    className: "bus-icon",
    iconSize: [35, 35],
    iconAnchor: [17, 17]
});

// Destination icon
const destinationIcon = L.divIcon({
    html: '<div style="font-size: 30px;">🏁</div>',
    className: "destination-icon",
    iconSize: [30, 30],
    iconAnchor: [15, 15]
});

function BusMap() {
    const [buses, setBuses] = useState([]);
    const [routes, setRoutes] = useState([]);

    // Listen for live bus locations
    useEffect(() => {
        const unsubscribe = listenToBuses((data) => {
            setBuses(data);
        });

        return () => unsubscribe();
    }, []);

    // Load routes from Firebase
    useEffect(() => {
        async function loadRoutes() {
            try {
                const data = await getRoutes();

                setRoutes(data);

                console.log("🗺️ Routes loaded:", data);
            } catch (error) {
                console.error(
                    "❌ Error loading routes:",
                    error
                );
            }
        }

        loadRoutes();
    }, []);

    return (
        <div style={{ position: "relative" }}>
            <MapContainer
                center={[12.9716, 77.5946]}
                zoom={13}
                style={{
                    height: "500px",
                    width: "100%"
                }}
            >
                <TileLayer
                    attribution="&copy; OpenStreetMap contributors"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* Draw routes */}
                {routes.map((route, index) => {
                    if (!route.points) {
                        return null;
                    }

                    const routeCoordinates =
                        route.points.map((point) => [
                            point.latitude,
                            point.longitude
                        ]);

                    return (
                        <Polyline
                            key={route.id}
                            positions={routeCoordinates}
                            pathOptions={{
                                weight: 5,
                                dashArray:
                                    index % 2 === 0
                                        ? undefined
                                        : "10, 10"
                            }}
                        />
                    );
                })}

                {/* Show moving buses */}
                {buses.map((bus) => (
                    <Marker
                        key={bus.id}
                        position={[
                            bus.latitude,
                            bus.longitude
                        ]}
                        icon={busIcon}
                    >
                        {/* Bus information */}
                        <Tooltip
                            permanent
                            direction="top"
                            offset={[0, -15]}
                        >
                            🚌 Bus {bus.busNumber}
                            <br />
                            ETA: {bus.eta ?? "Calculating"} min
                        </Tooltip>

                        {/* Detailed bus information */}
                        <Popup>
                            <strong>
                                🚌 Bus {bus.busNumber}
                            </strong>

                            <br />

                            Route: {bus.route}

                            <br />

                            ETA: {bus.eta ?? "Calculating"} minutes

                            <br />

                            Status: {bus.status}

                            <br />

                            Speed: {bus.speed} km/h

                            <br />

                            Location:{" "}
                            {bus.latitude.toFixed(6)},{" "}
                            {bus.longitude.toFixed(6)}
                        </Popup>
                    </Marker>
                ))}

                {/* Destination markers */}
                {buses.map((bus) => {
                    if (
                        bus.destinationLatitude == null ||
                        bus.destinationLongitude == null
                    ) {
                        return null;
                    }

                    return (
                        <Marker
                            key={`destination-${bus.id}`}
                            position={[
                                bus.destinationLatitude,
                                bus.destinationLongitude
                            ]}
                            icon={destinationIcon}
                        >
                            <Tooltip
                                permanent
                                direction="top"
                            >
                                🏁{" "}
                                {bus.route
                                    ?.split("→")[1]
                                    ?.trim() ||
                                    "Destination"}
                            </Tooltip>

                            <Popup>
                                <strong>
                                    🏁 Destination
                                </strong>

                                <br />

                                {bus.route
                                    ?.split("→")[1]
                                    ?.trim() ||
                                    "Destination"}
                            </Popup>
                        </Marker>
                    );
                })}
            </MapContainer>

            {/* Map Legend */}
            <div
                style={{
                    position: "absolute",
                    bottom: "20px",
                    right: "20px",
                    backgroundColor: "#ffffff",
                    color: "#000000",
                    padding: "12px 16px",
                    borderRadius: "8px",
                    boxShadow:
                        "0 2px 8px rgba(0,0,0,0.25)",
                    zIndex: 1000,
                    fontSize: "14px",
                    lineHeight: "1.6"
                }}
            >
                <strong>Map Legend</strong>

                <div style={{ marginTop: "8px" }}>
                    🚌 Bus = Live bus
                </div>

                <div>
                    🏁 Flag = Destination
                </div>

                <div>
                    ━ Route = Bus route
                </div>

                <div>
                    ╌╌ Dashed = Other route
                </div>
            </div>
        </div>
    );
}

export default BusMap;