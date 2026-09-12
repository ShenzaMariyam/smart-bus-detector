import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

import {
    listenToBuses
} from "../services/firebase/busService";

import {
    calculateDistance,
    calculateETA
} from "../services/eta/etaCalculator";

import { getUserLocation } from "../services/location/userLocation";

function BusDetails({ busId, onNavigate }) {
    const [bus, setBus] = useState(null);
    const [userLocation, setUserLocation] =
        useState(null);

    useEffect(() => {
        const unsubscribe = listenToBuses((buses) => {
            const selectedBus = buses.find(
                (item) => item.id === busId
            );

            setBus(selectedBus || null);
        });



        return () => unsubscribe();
    }, [busId]);

    // Get user's current location
    useEffect(() => {
        async function loadUserLocation() {
            try {
                const location =
                    await getUserLocation();

                setUserLocation(location);

                console.log(
                    "📍 User location in Bus Details:",
                    location
                );
            } catch (error) {
                console.error(
                    "❌ Could not get user location:",
                    error
                );
            }
        }

        loadUserLocation();
    }, []);

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

    let distanceFromUser = null;

    if (userLocation) {
        distanceFromUser =
            calculateDistance(
                userLocation.latitude,
                userLocation.longitude,
                bus.latitude,
                bus.longitude
            );
    }

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
                    <h1 style={{ color: "#B71C1C", margin: "0 0 8px", fontSize: "32px", fontWeight: "800" }}>
                        🚌 Bus {bus.busNumber}
                    </h1>

                    <p
                        style={{
                            fontSize: "18px",
                            color: "#555555",
                            margin: 0
                        }}
                    >
                        {bus.route}
                    </p>
                </section>

                {/* Main Card */}
                <div
                    style={{
                        backgroundColor: "#FFFFFF",
                        border: "1px solid #FFCDD2",
                        borderLeft: "6px solid #D32F2F",
                        borderRadius: "14px",
                        padding: "32px",
                        color: "#222222",
                        boxShadow:
                            "0 4px 20px rgba(211, 47, 47, 0.08)"
                    }}
                >
                    <h2
                        style={{
                            marginBottom: "25px",
                            color: "#B71C1C",
                            fontSize: "22px",
                            fontWeight: "700"
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
                        <div style={{ background: "#FDF7F7", padding: "16px", borderRadius: "10px", border: "1px solid #FFEBEE" }}>
                            <strong style={{ color: "#B71C1C", display: "block", marginBottom: "6px" }}>
                                🚌 Bus Number
                            </strong>

                            <p style={{ margin: 0, fontSize: "16px", fontWeight: "600" }}>
                                {bus.busNumber}
                            </p>
                        </div>

                        {/* Status */}
                        <div style={{ background: "#FDF7F7", padding: "16px", borderRadius: "10px", border: "1px solid #FFEBEE" }}>
                            <strong style={{ color: "#B71C1C", display: "block", marginBottom: "6px" }}>
                                🔴 Status
                            </strong>

                            <p style={{ margin: 0, fontSize: "16px", fontWeight: "600" }}>
                                {bus.status}
                            </p>
                        </div>

                        {/* Distance from User */}
                        <div style={{ background: "#FDF7F7", padding: "16px", borderRadius: "10px", border: "1px solid #FFEBEE" }}>
                            <strong style={{ color: "#B71C1C", display: "block", marginBottom: "6px" }}>
                                📍 Distance from You
                            </strong>

                            <p style={{ margin: 0, fontSize: "16px", fontWeight: "600" }}>
                                {distanceFromUser !== null
                                    ? `${distanceFromUser.toFixed(2)} km`
                                    : "Locating..."}
                            </p>
                        </div>

                        {/* ETA */}
                        <div style={{ background: "#FFEBEE", padding: "16px", borderRadius: "10px", border: "1px solid #FFCDD2" }}>
                            <strong style={{ color: "#B71C1C", display: "block", marginBottom: "6px" }}>
                                ⏱️ Estimated Arrival
                            </strong>

                            <p style={{ margin: 0, fontSize: "18px", fontWeight: "700", color: "#D32F2F" }}>
                                {calculatedETA} minutes
                            </p>
                        </div>
                    </div>

                    {/* Destination */}
                    <div
                        style={{
                            marginTop: "20px",
                            paddingTop: "20px",
                            borderTop:
                                "1px solid #FFEBEE"
                        }}
                    >
                        <h3 style={{ color: "#B71C1C", margin: "0 0 10px", fontSize: "18px" }}>
                            🏁 Destination
                        </h3>

                        <p style={{ margin: 0, fontSize: "16px", color: "#333333", fontWeight: "500" }}>
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
                            style={{
                                padding: "11px 20px",
                                backgroundColor: "#D32F2F",
                                color: "#FFFFFF",
                                border: "none",
                                borderRadius: "8px",
                                fontWeight: "600",
                                cursor: "pointer"
                            }}
                        >
                            🗺️ View on Map
                        </button>

                        <button
                            onClick={() =>
                                onNavigate("/buses")
                            }
                            style={{
                                padding: "11px 20px",
                                backgroundColor: "#FFEBEE",
                                color: "#B71C1C",
                                border: "1px solid #FFCDD2",
                                borderRadius: "8px",
                                fontWeight: "600",
                                cursor: "pointer"
                            }}
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