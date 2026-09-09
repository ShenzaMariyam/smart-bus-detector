import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

import {
    listenToBuses
} from "../services/firebase/busService";

import {
    calculateDistance,
    calculateETA
} from "../services/eta/etaCalculator";

function BusDetails({ busId, onNavigate }) {
    const [bus, setBus] = useState(null);

    useEffect(() => {
        const unsubscribe = listenToBuses((buses) => {
            const selectedBus = buses.find(
                (item) => item.id === busId
            );

            setBus(selectedBus || null);
        });

        return () => unsubscribe();
    }, [busId]);

    if (!bus) {
        return (
            <>
                <Navbar />

                <main
                    style={{
                        padding: "40px",
                        textAlign: "center"
                    }}
                >
                    <h1>Bus Not Found 🚌</h1>

                    <button
                        onClick={() => onNavigate("/buses")}
                    >
                        Back to Buses
                    </button>
                </main>
            </>
        );
    }

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
        <>
            <Navbar />

            <main
                style={{
                    padding: "30px",
                    maxWidth: "1000px",
                    margin: "0 auto"
                }}
            >
                {/* Header */}
                <section
                    style={{
                        textAlign: "center",
                        marginBottom: "30px"
                    }}
                >
                    <h1>
                        🚌 Bus {bus.busNumber}
                    </h1>

                    <p
                        style={{
                            fontSize: "18px"
                        }}
                    >
                        {bus.route}
                    </p>
                </section>

                {/* Main Card */}
                <div
                    style={{
                        backgroundColor: "#1b2b49",
                        border: "1px solid #2875e8",
                        borderRadius: "12px",
                        padding: "30px",
                        color: "white",
                        boxShadow:
                            "0 4px 15px rgba(0,0,0,0.25)"
                    }}
                >
                    <h2
                        style={{
                            marginBottom: "25px"
                        }}
                    >
                        Bus Information
                    </h2>

                    {/* Information Grid */}
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns:
                                "repeat(auto-fit, minmax(200px, 1fr))",
                            gap: "20px"
                        }}
                    >
                        {/* Bus Number */}
                        <div>
                            <strong>
                                🚌 Bus Number
                            </strong>

                            <p>
                                {bus.busNumber}
                            </p>
                        </div>

                        {/* Status */}
                        <div>
                            <strong>
                                🟢 Status
                            </strong>

                            <p>
                                {bus.status}
                            </p>
                        </div>

                        {/* Speed */}
                        <div>
                            <strong>
                                🚗 Speed
                            </strong>

                            <p>
                                {bus.speed} km/h
                            </p>
                        </div>

                        {/* Distance */}
                        <div>
                            <strong>
                                📏 Distance
                            </strong>

                            <p>
                                {distance.toFixed(2)} km
                            </p>
                        </div>

                        {/* ETA */}
                        <div>
                            <strong>
                                ⏱️ Estimated Arrival
                            </strong>

                            <p>
                                {calculatedETA} minutes
                            </p>
                        </div>
                    </div>

                    {/* Current Location */}
                    <div
                        style={{
                            marginTop: "30px",
                            paddingTop: "25px",
                            borderTop:
                                "1px solid rgba(255,255,255,0.2)"
                        }}
                    >
                        <h3>
                            📍 Current Location
                        </h3>

                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns:
                                    "repeat(auto-fit, minmax(250px, 1fr))",
                                gap: "20px",
                                marginTop: "15px"
                            }}
                        >
                            <div>
                                <strong>
                                    Latitude
                                </strong>

                                <p>
                                    {bus.latitude.toFixed(
                                        6
                                    )}
                                </p>
                            </div>

                            <div>
                                <strong>
                                    Longitude
                                </strong>

                                <p>
                                    {bus.longitude.toFixed(
                                        6
                                    )}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Destination */}
                    <div
                        style={{
                            marginTop: "20px",
                            paddingTop: "20px",
                            borderTop:
                                "1px solid rgba(255,255,255,0.2)"
                        }}
                    >
                        <h3>
                            🏁 Destination
                        </h3>

                        <p>
                            {bus.route
                                ?.split("→")[1]
                                ?.trim() ||
                                "Destination"}
                        </p>
                    </div>

                    {/* Buttons */}
                    <div
                        style={{
                            marginTop: "30px",
                            display: "flex",
                            gap: "12px",
                            flexWrap: "wrap"
                        }}
                    >
                        <button
                            onClick={() =>
                                onNavigate("/map")
                            }
                        >
                            🗺️ View on Map
                        </button>

                        <button
                            onClick={() =>
                                onNavigate("/buses")
                            }
                        >
                            ← Back to Buses
                        </button>
                    </div>
                </div>
            </main>
        </>
    );
}

export default BusDetails;