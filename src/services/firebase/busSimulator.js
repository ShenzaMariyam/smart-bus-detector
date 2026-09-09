import {
    collection,
    getDocs
} from "firebase/firestore";

import { db } from "./firebase";
import { updateBusLocation } from "./busService";

import {
    calculateDistance,
    calculateETA
} from "../eta/etaCalculator";

// Stores movement progress for each bus
const busProgress = {};

// Prevent multiple simulators from running
let simulationInterval = null;

export function startBusSimulation() {
    // If simulation is already running, don't start another one
    if (simulationInterval) {
        console.log("⚠️ Bus simulation is already running.");
        return () => {};
    }

    console.log("🚌 Bus simulation started.");

    simulationInterval = setInterval(async () => {
        try {
            const busSnapshot = await getDocs(
                collection(db, "buses")
            );

            const routeSnapshot = await getDocs(
                collection(db, "routes")
            );

            const routes = routeSnapshot.docs.map(
                (document) => ({
                    id: document.id,
                    ...document.data()
                })
            );

            for (const document of busSnapshot.docs) {
                const bus = document.data();

                const route = routes.find(
                    (item) => item.id === bus.routeId
                );

                if (
                    !route ||
                    !route.points ||
                    route.points.length < 2
                ) {
                    console.log(
                        `⚠️ Route not found for Bus ${bus.busNumber}`
                    );

                    continue;
                }

                const points = route.points;

                // Create progress for this bus
                if (!busProgress[document.id]) {
                    busProgress[document.id] = {
                        pointIndex: 0,
                        progress: 0
                    };
                }

                const movement =
                    busProgress[document.id];

                // Move toward the next route point
                movement.progress += 0.1;

                // Move to the next point
                if (movement.progress >= 1) {
                    movement.progress = 0;

                    movement.pointIndex =
                        (movement.pointIndex + 1) %
                        (points.length - 1);
                }

                const startPoint =
                    points[movement.pointIndex];

                const endPoint =
                    points[movement.pointIndex + 1];

                // Calculate new position
                const newLatitude =
                    startPoint.latitude +
                    (endPoint.latitude -
                        startPoint.latitude) *
                        movement.progress;

                const newLongitude =
                    startPoint.longitude +
                    (endPoint.longitude -
                        startPoint.longitude) *
                        movement.progress;

                // Calculate distance to destination
                const distance =
                    calculateDistance(
                        newLatitude,
                        newLongitude,
                        bus.destinationLatitude,
                        bus.destinationLongitude
                    );

                // Calculate ETA
                const newETA =
                    calculateETA(
                        distance,
                        bus.speed
                    );

                // Update Firebase
                await updateBusLocation(
                    document.id,
                    newLatitude,
                    newLongitude,
                    newETA
                );

                console.log(
                    `🚌 Bus ${bus.busNumber} moved`
                );

                console.log(
                    `📍 ${newLatitude.toFixed(6)}, ${newLongitude.toFixed(6)}`
                );

                console.log(
                    `⏱️ ETA: ${newETA} minutes`
                );
            }
        } catch (error) {
            console.error(
                "❌ Bus simulation error:",
                error
            );
        }
    }, 10000);

    // Return function to stop simulation
    return () => {
        if (simulationInterval) {
            clearInterval(simulationInterval);
            simulationInterval = null;

            console.log(
                "🛑 Bus simulation stopped."
            );
        }
    };
}