import { useEffect, useState } from "react";

import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    Polyline,
    useMap
} from "react-leaflet";

import L from "leaflet";

import "leaflet/dist/leaflet.css";

import { listenToBuses } from "../../services/firebase/busService";

import {
    getRoute,
    getRoadRoute
} from "../../services/firebase/routeService";



// Fix Leaflet marker icons in Vite
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",

    iconUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",

    shadowUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png"
});



// Bus icon
const busIcon = L.divIcon({
    className: "bus-map-icon",
    html: `
        <div style="
            font-size: 38px;
            line-height: 38px;
            width: 45px;
            height: 45px;
            display: flex;
            align-items: center;
            justify-content: center;
        ">
            🚌
        </div>
    `,
    iconSize: [45, 45],
    iconAnchor: [22, 22],
    popupAnchor: [0, -22]
});



// Automatically fit map to selected route
function RouteAutoFit({ coordinates }) {
    const map = useMap();

    useEffect(() => {
        if (!coordinates || coordinates.length < 2) {
            return;
        }

        const bounds = L.latLngBounds(coordinates);

        map.fitBounds(bounds, {
            padding: [30, 30]
        });

        console.log(
            "🗺️ Map fitted to selected route."
        );

    }, [coordinates, map]);

    return null;
}



function BusMap() {

    const [buses, setBuses] = useState([]);

    const [selectedBus, setSelectedBus] = useState(null);

    const [route, setRoute] = useState(null);

    const [roadRoute, setRoadRoute] = useState([]);

    const [urlBusId, setUrlBusId] = useState(null);

    const [urlRouteId, setUrlRouteId] = useState(null);



    // Read bus or route ID from URL
    useEffect(() => {

        const params = new URLSearchParams(
            window.location.search
        );

        const busId = params.get("bus");
        const routeId = params.get("route");

        setUrlBusId(busId);
        setUrlRouteId(routeId);

        console.log(
            "🔎 Bus ID from URL:",
            busId
        );

        console.log(
            "🔎 Route ID from URL:",
            routeId
        );

    }, []);



    // Listen to buses from Firebase
    useEffect(() => {

        const unsubscribe = listenToBuses((data) => {

            setBuses(data);

            console.log(
                "🚌 Buses received by map:",
                data
            );

        });

        return () => {
            unsubscribe();
        };

    }, []);



    // Select bus from URL
    useEffect(() => {

        if (!urlBusId || buses.length === 0) {
            return;
        }

        console.log(
            "🔎 Looking for bus:",
            urlBusId
        );

        const bus = buses.find(
            (item) => item.id === urlBusId
        );

        if (bus) {

            console.log(
                "✅ Bus selected:",
                bus
            );

            setSelectedBus(bus);

        } else {

            console.error(
                "❌ Bus ID not found in Firebase:",
                urlBusId
            );

        }

    }, [urlBusId, buses]);



    // Load route from bus OR route URL
    useEffect(() => {

        async function loadRoute() {

            try {

                let routeId = null;



                // If a route was selected from Buses page
                if (urlRouteId) {

                    routeId = urlRouteId;

                    console.log(
                        "🛣️ Loading route directly:",
                        routeId
                    );

                }



                // If a bus was selected
                else if (selectedBus) {

                    routeId =
                        selectedBus.routeId;

                    console.log(
                        "🛣️ Loading route for bus:",
                        routeId
                    );

                }



                if (!routeId) {

                    setRoute(null);
                    setRoadRoute([]);

                    return;
                }



                // Get route from Firebase
                const routeData =
                    await getRoute(routeId);



                if (!routeData) {

                    console.error(
                        "❌ Route document not found:",
                        routeId
                    );

                    setRoute(null);
                    setRoadRoute([]);

                    return;
                }



                console.log(
                    "✅ Route loaded:",
                    routeData
                );

                setRoute(routeData);



                // Check route points
                if (
                    !routeData.points ||
                    routeData.points.length < 2
                ) {

                    console.error(
                        "❌ Not enough route points:",
                        routeData.points
                    );

                    setRoadRoute([]);

                    return;
                }



                // Get road-following route
                console.log(
                    "🛣️ Requesting road-following route..."
                );



                const roadCoordinates =
                    await getRoadRoute(
                        routeData.points
                    );



                if (
                    roadCoordinates &&
                    roadCoordinates.length >= 2
                ) {

                    console.log(
                        "✅ Road route loaded:",
                        roadCoordinates.length,
                        "points"
                    );

                    setRoadRoute(
                        roadCoordinates
                    );

                } else {

                    console.error(
                        "❌ Road route returned no usable coordinates"
                    );

                    setRoadRoute([]);

                }

            } catch (error) {

                console.error(
                    "❌ Error loading route:",
                    error
                );

                setRoute(null);
                setRoadRoute([]);

            }

        }



        loadRoute();

    }, [selectedBus, urlRouteId]);



    // Only buses with valid coordinates
    const busesWithLocation =
        buses.filter(
            (bus) =>
                Number.isFinite(
                    Number(bus.latitude)
                ) &&
                Number.isFinite(
                    Number(bus.longitude)
                )
        );



    // Original stop coordinates
    const routeCoordinates =
        route?.points
            ?.map((point) => [
                Number(point.latitude),
                Number(point.longitude)
            ])
            .filter(
                (point) =>
                    Number.isFinite(point[0]) &&
                    Number.isFinite(point[1])
            ) || [];



    console.log(
        "📍 Stop coordinates:",
        routeCoordinates
    );



    console.log(
        "🛣️ Road route coordinates:",
        roadRoute
    );



    // Mangaluru center
    const mapCenter = [
        12.9141,
        74.8560
    ];



    return (
        <div
            style={{
                width: "100%",
                height: "500px",
                marginTop: "20px"
            }}
        >

            <MapContainer
                center={mapCenter}
                zoom={12}
                style={{
                    width: "100%",
                    height: "100%"
                }}
            >

                <TileLayer
                    attribution="&copy; OpenStreetMap contributors"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />



                <RouteAutoFit
                    coordinates={roadRoute}
                />



                {/* Selected route */}
                {roadRoute.length >= 2 && (

                    <Polyline
                        positions={roadRoute}
                        pathOptions={{
                            color: "#D32F2F",
                            weight: 5
                        }}
                    />

                )}



                {/* Fallback route */}
                {roadRoute.length < 2 &&
                    routeCoordinates.length >= 2 && (

                    <Polyline
                        positions={routeCoordinates}
                        pathOptions={{
                            color: "#D32F2F",
                            weight: 5
                        }}
                    />

                )}



                {/* Bus markers */}
                {busesWithLocation.map(
                    (bus) => (

                        <Marker
                            key={bus.id}
                            position={[
                                Number(bus.latitude),
                                Number(bus.longitude)
                            ]}
                            icon={busIcon}
                            eventHandlers={{
                                click: () => {

                                    setSelectedBus(bus);
                                    setUrlRouteId(null);

                                    console.log(
                                        "🚌 Bus clicked:",
                                        bus
                                    );

                                }
                            }}
                        >

                            <Popup>

                                <strong>
                                    🚌 Route {bus.routeNumber}
                                </strong>

                                <br />

                                Registration:{" "}
                                {bus.registrationNumber}

                                <br />

                                Route:{" "}
                                {bus.startPoint} →{" "}
                                {bus.destination}

                                <br />

                                Status:{" "}
                                {bus.status}

                                <br />

                                <strong>
                                    Click the bus to show its route
                                </strong>

                            </Popup>

                        </Marker>

                    )
                )}

            </MapContainer>



            {buses.length > 0 &&
                busesWithLocation.length === 0 && (

                <p
                    style={{
                        textAlign: "center",
                        marginTop: "10px"
                    }}
                >
                    🚌 Bus routes loaded. Live GPS
                    locations are not available yet.
                </p>

            )}

        </div>
    );
}



export default BusMap;