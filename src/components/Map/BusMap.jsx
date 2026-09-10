import { useEffect, useState } from "react";

import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    Polyline,
    Tooltip,
    useMap
} from "react-leaflet";

import L from "leaflet";

import { listenToBuses } from "../../services/firebase/busService";
import { getRoutes } from "../../services/firebase/routeService";
import { getUserLocation } from "../../services/location/userLocation";

const busIcon = L.divIcon({
    html: '<div style="font-size: 45px;">🚌</div>',
    className: "bus-icon",
    iconSize: [35, 35],
    iconAnchor: [17, 17]
});

const destinationIcon = L.divIcon({
    html: '<div style="font-size: 30px;">🏁</div>',
    className: "destination-icon",
    iconSize: [30, 30],
    iconAnchor: [15, 15]
});

const userIcon = L.divIcon({
    html: '<div style="font-size: 30px;">📍</div>',
    className: "user-icon",
    iconSize: [30, 30],
    iconAnchor: [15, 30]
});

function MapCenterUpdater({ userLocation }) {
    const map = useMap();

    useEffect(() => {
        if (userLocation) {
            map.setView(
                [
                    userLocation.latitude,
                    userLocation.longitude
                ],
                13
            );
        }
    }, [userLocation, map]);

    return null;
}

function BusMap() {
    const [buses, setBuses] = useState([]);
    const [routes, setRoutes] = useState([]);
    const [userLocation, setUserLocation] = useState(null);
    const [locationError, setLocationError] = useState("");

    // Listen for live bus updates
    useEffect(() => {
        const unsubscribe = listenToBuses((data) => {
            setBuses(data);
        });

        return () => unsubscribe();
    }, []);

    // Load routes
    useEffect(() => {
        async function loadRoutes() {
            try {
                const data = await getRoutes();

                setRoutes(data);

                console.log(
                    "🗺️ Routes loaded:",
                    data
                );
            } catch (error) {
                console.error(
                    "❌ Error loading routes:",
                    error
                );
            }
        }

        loadRoutes();
    }, []);

    // Get user's current location
    useEffect(() => {
        async function loadUserLocation() {
            try {
                const location =
                    await getUserLocation();

                setUserLocation(location);

                console.log(
                    "📍 User location loaded:",
                    location
                );
            } catch (error) {
                console.error(
                    "❌ Could not get user location:",
                    error
                );

                setLocationError(
                    "Unable to access your location."
                );
            }
        }

        loadUserLocation();
    }, []);

    return (
        <div style={{ position: "relative" }}>

            <MapContainer
                center={[12.8735, 74.8535]}
                zoom={13}
                style={{
                    height: "500px",
                    width: "100%"
                }}
            >
                <MapCenterUpdater
        userLocation={userLocation}
    />

                <TileLayer
                    attribution="&copy; OpenStreetMap contributors"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* Bus Routes */}
                {routes.map((route, index) => {

                    if (!route.points) {
                        return null;
                    }

                    const routeCoordinates =
                        route.points.map(
                            (point) => [
                                point.latitude,
                                point.longitude
                            ]
                        );

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

                {/* Live Buses */}
                {buses.map((bus) => (
                    <Marker
                        key={bus.id}
                        position={[
                            bus.latitude,
                            bus.longitude
                        ]}
                        icon={busIcon}
                    >
                        <Tooltip
                            permanent
                            direction="top"
                            offset={[0, -15]}
                        >
                            🚌 Bus {bus.busNumber}
                            <br />
                            ETA:{" "}
                            {bus.eta ??
                                "Calculating"}{" "}
                            min
                        </Tooltip>

                        <Popup>
                            <strong>
                                🚌 Bus{" "}
                                {bus.busNumber}
                            </strong>

                            <br />

                            Route: {bus.route}

                            <br />

                            ETA:{" "}
                            {bus.eta ??
                                "Calculating"}{" "}
                            minutes

                            <br />

                            Status: {bus.status}

                            <br />

                            Speed:{" "}
                            {bus.speed} km/h

                            <br />

                            Location:{" "}
                            {bus.latitude.toFixed(6)},{" "}
                            {bus.longitude.toFixed(6)}
                        </Popup>
                    </Marker>
                ))}

                {/* Bus Destinations */}
                {buses.map((bus) => {

                    if (
                        bus.destinationLatitude ==
                            null ||
                        bus.destinationLongitude ==
                            null
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

                {/* User Location */}
                {userLocation && (
                    <Marker
                        position={[
                            userLocation.latitude,
                            userLocation.longitude
                        ]}
                        icon={userIcon}
                    >
                        <Tooltip
                            permanent
                            direction="top"
                            offset={[0, -25]}
                        >
                            📍 You are here
                        </Tooltip>

                        <Popup>
                            <strong>
                                📍 Your Location
                            </strong>

                            <br />

                            Latitude:{" "}
                            {userLocation.latitude.toFixed(
                                6
                            )}

                            <br />

                            Longitude:{" "}
                            {userLocation.longitude.toFixed(
                                6
                            )}
                        </Popup>
                    </Marker>
                )}

            </MapContainer>

            {/* Location Status */}
            {locationError && (
                <div
                    style={{
                        position: "absolute",
                        top: "20px",
                        left: "20px",
                        backgroundColor: "white",
                        color: "red",
                        padding: "10px 15px",
                        borderRadius: "8px",
                        boxShadow:
                            "0 2px 8px rgba(0,0,0,0.25)",
                        zIndex: 1000
                    }}
                >
                    📍 {locationError}
                </div>
            )}

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

                <div
                    style={{
                        marginTop: "8px"
                    }}
                >
                    🚌 Bus = Live bus
                </div>

                <div>
                    📍 You = Your location
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