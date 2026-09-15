import {
    collection,
    getDocs
} from "firebase/firestore";

import { db } from "./firebase";

import {
    updateBusLocation
} from "./busService";


// Stores movement progress for each bus
const busProgress = {};


// Prevent multiple simulators from running
let simulationInterval = null;


export function startBusSimulation() {

    // If simulation is already running,
    // don't start another one
    if (simulationInterval) {

        console.log(
            "⚠️ Bus simulation is already running."
        );

        return () => {};
    }


    console.log(
        "🚌 Bus simulation started."
    );


    simulationInterval = setInterval(
        async () => {

            try {

                // Get buses
                const busSnapshot =
                    await getDocs(
                        collection(
                            db,
                            "buses"
                        )
                    );


                // Get routes
                const routeSnapshot =
                    await getDocs(
                        collection(
                            db,
                            "routes"
                        )
                    );


                // Convert routes into an array
                const routes =
                    routeSnapshot.docs.map(
                        (document) => ({
                            id: document.id,
                            ...document.data()
                        })
                    );


                // Move every bus
                for (
                    const document
                    of busSnapshot.docs
                ) {

                    const bus =
                        document.data();


                    // Find the route belonging
                    // to this bus
                    const route =
                        routes.find(
                            (item) =>
                                item.id ===
                                bus.routeId
                        );


                    // Skip bus if its route
                    // doesn't exist
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


                    const points =
                        route.points;


                    // Create movement progress
                    // for this bus
                    if (
                        !busProgress[
                            document.id
                        ]
                    ) {

                        busProgress[
                            document.id
                        ] = {
                            pointIndex: 0,
                            progress: 0
                        };

                    }


                    const movement =
                        busProgress[
                            document.id
                        ];


                    // Move toward the next
                    // route point
                    movement.progress += 0.1;


                    // Move to the next point
                    if (
                        movement.progress >= 1
                    ) {

                        movement.progress = 0;


                        movement.pointIndex =
                            (
                                movement.pointIndex +
                                1
                            ) %
                            (
                                points.length - 1
                            );

                    }


                    const startPoint =
                        points[
                            movement.pointIndex
                        ];


                    const endPoint =
                        points[
                            movement.pointIndex + 1
                        ];


                    // Calculate new latitude
                    const newLatitude =
                        startPoint.latitude +
                        (
                            endPoint.latitude -
                            startPoint.latitude
                        ) *
                        movement.progress;


                    // Calculate new longitude
                    const newLongitude =
                        startPoint.longitude +
                        (
                            endPoint.longitude -
                            startPoint.longitude
                        ) *
                        movement.progress;


                    // Update bus location
                    // in Firebase
                    await updateBusLocation(
                        document.id,
                        newLatitude,
                        newLongitude
                    );


                    console.log(
                        `🚌 Bus ${bus.routeNumber} moved`
                    );


                    console.log(
                        `📍 ${newLatitude.toFixed(6)}, ${newLongitude.toFixed(6)}`
                    );

                }

            } catch (error) {

                console.error(
                    "❌ Bus simulation error:",
                    error
                );

            }

        },
        10000
    );


    // Return function to stop simulation
    return () => {

        if (simulationInterval) {

            clearInterval(
                simulationInterval
            );

            simulationInterval = null;


            console.log(
                "🛑 Bus simulation stopped."
            );

        }

    };

}