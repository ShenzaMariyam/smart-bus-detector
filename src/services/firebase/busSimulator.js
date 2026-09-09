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

export function startBusSimulation() {
  const interval = setInterval(async () => {
    try {
      const busSnapshot = await getDocs(
        collection(db, "buses")
      );

      const routeSnapshot = await getDocs(
        collection(db, "routes")
      );

      const routes = routeSnapshot.docs.map((document) => ({
        id: document.id,
        ...document.data()
      }));

      busSnapshot.docs.forEach(async (document) => {
        const bus = document.data();

        // Find the route belonging to this bus
        const route = routes.find(
          (item) => item.id === bus.routeId
        );

        if (!route || !route.points || route.points.length < 2) {
          console.log(
            `⚠️ Route not found for Bus ${bus.busNumber}`
          );
          return;
        }

        const points = route.points;

        // Create progress information for this bus
        if (!busProgress[document.id]) {
          busProgress[document.id] = {
            pointIndex: 0,
            progress: 0
          };
        }

        const movement = busProgress[document.id];

        // Move 10% toward the next point
        movement.progress += 0.1;

        // If the bus reaches the next point
        if (movement.progress >= 1) {
          movement.progress = 0;

          movement.pointIndex =
            (movement.pointIndex + 1) % (points.length - 1);
        }

        const startPoint =
          points[movement.pointIndex];

        const endPoint =
          points[movement.pointIndex + 1];

        // Calculate intermediate position
        const newLatitude =
          startPoint.latitude +
          (endPoint.latitude - startPoint.latitude) *
            movement.progress;

        const newLongitude =
          startPoint.longitude +
          (endPoint.longitude - startPoint.longitude) *
            movement.progress;

        // Calculate remaining distance
        const distance = calculateDistance(
          newLatitude,
          newLongitude,
          bus.destinationLatitude,
          bus.destinationLongitude
        );

        // Calculate ETA
        const newETA = calculateETA(
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
          `🚌 Bus ${bus.busNumber} is moving`
        );

        console.log(
          `📍 Location: ${newLatitude.toFixed(6)}, ${newLongitude.toFixed(6)}`
        );

        console.log(
          `📏 Distance: ${distance.toFixed(2)} km`
        );

        console.log(
          `⏱️ ETA: ${newETA} minutes`
        );
      });

    } catch (error) {
      console.error(
        "❌ Error updating bus route:",
        error
      );
    }
  }, 5000);

  return () => clearInterval(interval);
}