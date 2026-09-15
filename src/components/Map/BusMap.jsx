import { useEffect, useState } from "react";

import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    Polyline,
    CircleMarker,
    useMap
} from "react-leaflet";

import L from "leaflet";

import "leaflet/dist/leaflet.css";

import {
    getRoutes,
    getRoadRoute
} from "../../services/firebase/routeService";


// --------------------------------------------------
// Fix Leaflet marker icons in Vite
// --------------------------------------------------

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",

    iconUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",

    shadowUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png"
});


// --------------------------------------------------
// Create bus icon with route number
// Example:
// 27A
// 🚌
// --------------------------------------------------

function createRouteIcon(routeNumber, selected = false) {

    return L.divIcon({

        className: "route-bus-marker",

        html: `
            <div style="
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                width: 62px;
                height: 62px;
            ">

                <div style="
                    background: ${selected ? "#D32F2F" : "#1976D2"};
                    color: white;
                    padding: 4px 9px;
                    border-radius: 8px;
                    font-size: 14px;
                    font-weight: bold;
                    min-width: 38px;
                    text-align: center;
                    box-shadow: 0 2px 6px rgba(0,0,0,0.3);
                    margin-bottom: -4px;
                    z-index: 2;
                ">
                    ${routeNumber}
                </div>

                <div style="
                    font-size: 30px;
                    line-height: 30px;
                    filter: drop-shadow(
                        0 2px 2px rgba(0,0,0,0.3)
                    );
                ">
                    🚌
                </div>

            </div>
        `,

        iconSize: [62, 62],

        iconAnchor: [31, 31],

        popupAnchor: [0, -30]
    });
}


// --------------------------------------------------
// Automatically fit map to selected route
// --------------------------------------------------

function RouteAutoFit({ coordinates }) {

    const map = useMap();

    useEffect(() => {

        if (
            !coordinates ||
            coordinates.length < 2
        ) {
            return;
        }

        const bounds =
            L.latLngBounds(coordinates);

        map.fitBounds(
            bounds,
            {
                padding: [40, 40]
            }
        );

        console.log(
            "🗺️ Map fitted to selected route."
        );

    }, [
        coordinates,
        map
    ]);

    return null;
}


// --------------------------------------------------
// Main Bus Map
// --------------------------------------------------

function BusMap() {

    // All routes
    const [routes, setRoutes] =
        useState([]);

    // Selected route
    const [selectedRoute, setSelectedRoute] =
        useState(null);

    // Road-following coordinates
    const [roadRoute, setRoadRoute] =
        useState([]);

    // Route selected from URL
    const [urlRouteId, setUrlRouteId] =
        useState(null);

    // Loading state
    const [loading, setLoading] =
        useState(true);


    // --------------------------------------------------
    // Read route ID from URL
    //
    // Example:
    // /map?route=city_route_27A
    // --------------------------------------------------

    useEffect(() => {

        const params =
            new URLSearchParams(
                window.location.search
            );

        const routeId =
            params.get("route");

        setUrlRouteId(routeId);

        console.log(
            "🔎 Route ID from URL:",
            routeId
        );

    }, []);


    // --------------------------------------------------
    // Load ALL routes from Firebase
    // --------------------------------------------------

    useEffect(() => {

        async function loadRoutes() {

            try {

                setLoading(true);

                const data =
                    await getRoutes();

                console.log(
                    "🛣️ Routes loaded from Firebase:",
                    data
                );

                setRoutes(data);

                setLoading(false);

            } catch (error) {

                console.error(
                    "❌ Failed to load routes:",
                    error
                );

                setLoading(false);
            }
        }

        loadRoutes();

    }, []);


    // --------------------------------------------------
    // Select route from URL
    // --------------------------------------------------

    useEffect(() => {

        if (
            !urlRouteId ||
            routes.length === 0
        ) {
            return;
        }

        const route =
            routes.find(
                (item) =>
                    item.id === urlRouteId
            );

        if (route) {

            console.log(
                "✅ Route selected from URL:",
                route
            );

            setSelectedRoute(route);

        } else {

            console.error(
                "❌ Route not found:",
                urlRouteId
            );

        }

    }, [
        urlRouteId,
        routes
    ]);


    // --------------------------------------------------
    // Load road route whenever selected route changes
    // --------------------------------------------------

    useEffect(() => {

        async function loadSelectedRoadRoute() {

            if (!selectedRoute) {

                setRoadRoute([]);

                return;
            }

            if (
                !selectedRoute.points ||
                selectedRoute.points.length < 2
            ) {

                console.error(
                    "❌ Selected route does not have enough points."
                );

                setRoadRoute([]);

                return;
            }

            try {

                console.log(
                    "🛣️ Requesting road route for:",
                    selectedRoute.id
                );

                const roadCoordinates =
                    await getRoadRoute(
                        selectedRoute.points
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
                        "❌ OSRM returned no usable route."
                    );

                    setRoadRoute([]);

                }

            } catch (error) {

                console.error(
                    "❌ Failed to load road route:",
                    error
                );

                setRoadRoute([]);

            }
        }

        loadSelectedRoadRoute();

    }, [
        selectedRoute
    ]);


    // --------------------------------------------------
    // Get route number
    // --------------------------------------------------

    const getRouteNumber = (route) => {

        if (route.routeNumber) {
            return route.routeNumber;
        }

        if (route.number) {
            return route.number;
        }

        if (route.name) {
            return route.name;
        }

        if (route.id) {

            return route.id.replace(
                "city_route_",
                ""
            );

        }

        return "Bus";
    };


    // --------------------------------------------------
    // Get selected route coordinates
    // --------------------------------------------------

    const selectedRouteCoordinates =
        selectedRoute?.points
            ?.map(
                (point) => [
                    Number(point.latitude),
                    Number(point.longitude)
                ]
            )
            .filter(
                (point) =>
                    Number.isFinite(point[0]) &&
                    Number.isFinite(point[1])
            ) || [];


    // --------------------------------------------------
    // Get stop name
    //
    // Different route documents may store the stop
    // name differently, so check common fields.
    // --------------------------------------------------

    const getStopName = (
        point,
        index
    ) => {

        if (point.name) {
            return point.name;
        }

        if (point.stopName) {
            return point.stopName;
        }

        if (point.stop) {
            return point.stop;
        }

        if (point.title) {
            return point.title;
        }

        return `Stop ${index + 1}`;
    };


    // --------------------------------------------------
    // Get valid stops from selected route
    // --------------------------------------------------

    const selectedStops =
        selectedRoute?.points
            ?.map(
                (point, index) => {

                    const latitude =
                        Number(
                            point.latitude
                        );

                    const longitude =
                        Number(
                            point.longitude
                        );

                    if (
                        !Number.isFinite(
                            latitude
                        ) ||
                        !Number.isFinite(
                            longitude
                        )
                    ) {
                        return null;
                    }

                    return {
                        ...point,

                        latitude,

                        longitude,

                        stopName:
                            getStopName(
                                point,
                                index
                            ),

                        stopNumber:
                            index + 1
                    };
                }
            )
            .filter(
                Boolean
            ) || [];


    // --------------------------------------------------
    // Mangaluru map center
    // --------------------------------------------------

    const mapCenter = [
        12.9141,
        74.8560
    ];


    // --------------------------------------------------
    // Select a route
    // --------------------------------------------------

    const handleRouteClick = (
        route
    ) => {

        console.log(
            "🚌 Route clicked:",
            route
        );

        setSelectedRoute(
            route
        );

        setUrlRouteId(
            route.id
        );


        // Update browser URL
        const newUrl =
            `/map?route=${route.id}`;

        window.history.pushState(
            {},
            "",
            newUrl
        );

    };


    // --------------------------------------------------
    // Get marker position for each route
    //
    // The marker is placed at the first valid
    // coordinate of that route.
    // --------------------------------------------------

    const getRouteMarkerPosition = (
        route
    ) => {

        if (
            !route.points ||
            route.points.length === 0
        ) {
            return null;
        }

        for (
            const point
            of route.points
        ) {

            const latitude =
                Number(
                    point.latitude
                );

            const longitude =
                Number(
                    point.longitude
                );

            if (
                Number.isFinite(
                    latitude
                ) &&
                Number.isFinite(
                    longitude
                )
            ) {

                return [
                    latitude,
                    longitude
                ];
            }
        }

        return null;
    };


    // --------------------------------------------------
    // Render
    // --------------------------------------------------

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


                {/* ------------------------------------------
                    Automatically fit selected route
                ------------------------------------------ */}

                {selectedRoute &&
                    roadRoute.length >= 2 && (

                    <RouteAutoFit
                        coordinates={
                            roadRoute
                        }
                    />

                )}


                {/* ------------------------------------------
                    Selected road route
                ------------------------------------------ */}

                {selectedRoute &&
                    roadRoute.length >= 2 && (

                    <Polyline
                        positions={
                            roadRoute
                        }
                        pathOptions={{
                            color: "#D32F2F",
                            weight: 5,
                            opacity: 0.9
                        }}
                    />

                )}


                {/* ------------------------------------------
                    Fallback route
                ------------------------------------------ */}

                {selectedRoute &&
                    roadRoute.length < 2 &&
                    selectedRouteCoordinates.length >= 2 && (

                    <Polyline
                        positions={
                            selectedRouteCoordinates
                        }
                        pathOptions={{
                            color: "#D32F2F",
                            weight: 5,
                            opacity: 0.9
                        }}
                    />

                )}


                {/* ------------------------------------------
                    STOP MARKERS

                    These appear ONLY for the selected route.
                ------------------------------------------ */}

                {selectedStops.map(
                    (stop) => (

                    <CircleMarker
                        key={
                            `${selectedRoute.id}-${stop.stopNumber}`
                        }

                        center={[
                            stop.latitude,
                            stop.longitude
                        ]}

                        radius={7}

                        pathOptions={{
                            color: "#D32F2F",
                            fillColor: "#FFFFFF",
                            fillOpacity: 1,
                            weight: 3
                        }}
                    >

                        <Popup>

                            <div
                                style={{
                                    minWidth:
                                        "180px"
                                }}
                            >

                                <h4
                                    style={{
                                        margin:
                                            "0 0 8px 0",
                                        color:
                                            "#D32F2F"
                                    }}
                                >
                                    📍 Stop{" "}
                                    {stop.stopNumber}
                                </h4>


                                <p
                                    style={{
                                        margin:
                                            "5px 0"
                                    }}
                                >
                                    <strong>
                                        {stop.stopName}
                                    </strong>
                                </p>


                                <p
                                    style={{
                                        margin:
                                            "5px 0",
                                        fontSize:
                                            "12px",
                                        color:
                                            "#666"
                                    }}
                                >
                                    Route{" "}
                                    {
                                        getRouteNumber(
                                            selectedRoute
                                        )
                                    }
                                </p>

                            </div>

                        </Popup>

                    </CircleMarker>

                ))}


                {/* ------------------------------------------
                    ALL ROUTE BUS ICONS
                ------------------------------------------ */}

                {routes.map(
                    (route) => {

                        const position =
                            getRouteMarkerPosition(
                                route
                            );

                        if (!position) {
                            return null;
                        }

                        const routeNumber =
                            getRouteNumber(
                                route
                            );

                        const isSelected =
                            selectedRoute?.id ===
                            route.id;


                        return (

                            <Marker
                                key={
                                    route.id
                                }

                                position={
                                    position
                                }

                                icon={
                                    createRouteIcon(
                                        routeNumber,
                                        isSelected
                                    )
                                }

                                eventHandlers={{

                                    // --------------------------------
                                    // Hover over route icon
                                    // --------------------------------

                                    mouseover: (
                                        event
                                    ) => {

                                        event.target
                                            .openPopup();

                                    },


                                    // --------------------------------
                                    // Move mouse away
                                    // --------------------------------

                                    mouseout: (
                                        event
                                    ) => {

                                        event.target
                                            .closePopup();

                                    },


                                    // --------------------------------
                                    // Click route
                                    // --------------------------------

                                    click: () => {

                                        handleRouteClick(
                                            route
                                        );

                                    }

                                }}
                            >

                                <Popup>

                                    <div
                                        style={{
                                            minWidth:
                                                "220px"
                                        }}
                                    >

                                        <h3
                                            style={{
                                                margin:
                                                    "0 0 10px 0",
                                                color:
                                                    "#D32F2F"
                                            }}
                                        >
                                            🚌 Route{" "}
                                            {
                                                routeNumber
                                            }
                                        </h3>


                                        {/* From */}

                                        {route.startPoint && (

                                            <p>
                                                <strong>
                                                    From:
                                                </strong>{" "}
                                                {
                                                    route.startPoint
                                                }
                                            </p>

                                        )}


                                        {/* Destination */}

                                        {route.destination && (

                                            <p>
                                                <strong>
                                                    To:
                                                </strong>{" "}
                                                {
                                                    route.destination
                                                }
                                            </p>

                                        )}


                                        {/* Stops */}

                                        {route.points && (

                                            <p>
                                                <strong>
                                                    Stops:
                                                </strong>{" "}
                                                {
                                                    route.points
                                                        .filter(
                                                            (
                                                                point
                                                            ) =>
                                                                Number.isFinite(
                                                                    Number(
                                                                        point.latitude
                                                                    )
                                                                ) &&
                                                                Number.isFinite(
                                                                    Number(
                                                                        point.longitude
                                                                    )
                                                                )
                                                        )
                                                        .length
                                                }
                                            </p>

                                        )}


                                        {/* Route ID */}

                                        <p>
                                            <strong>
                                                Route ID:
                                            </strong>{" "}
                                            {
                                                route.id
                                            }
                                        </p>


                                        {/* Button */}

                                        <button
                                            onClick={() =>
                                                handleRouteClick(
                                                    route
                                                )
                                            }

                                            style={{
                                                width:
                                                    "100%",
                                                padding:
                                                    "8px",
                                                backgroundColor:
                                                    "#D32F2F",
                                                color:
                                                    "white",
                                                border:
                                                    "none",
                                                borderRadius:
                                                    "5px",
                                                cursor:
                                                    "pointer",
                                                fontWeight:
                                                    "bold"
                                            }}
                                        >
                                            🗺️ View Route
                                        </button>

                                    </div>

                                </Popup>

                            </Marker>

                        );

                    }
                )}

            </MapContainer>


            {/* ------------------------------------------
                Loading
            ------------------------------------------ */}

            {loading && (

                <p
                    style={{
                        textAlign:
                            "center",
                        marginTop:
                            "10px"
                    }}
                >
                    🚌 Loading bus routes...
                </p>

            )}


            {/* ------------------------------------------
                No routes
            ------------------------------------------ */}

            {!loading &&
                routes.length === 0 && (

                <p
                    style={{
                        textAlign:
                            "center",
                        marginTop:
                            "10px"
                    }}
                >
                    🚌 No bus routes available.
                </p>

            )}

        </div>
    );
}


export default BusMap;