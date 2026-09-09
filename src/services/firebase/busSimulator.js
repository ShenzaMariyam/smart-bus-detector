import {
  collection,
  getDocs
} from "firebase/firestore";

import { db } from "./firebase";
import { updateBusLocation } from "./busService";

export function startBusSimulation() {
  const interval = setInterval(async () => {
    try {
      const snapshot = await getDocs(
        collection(db, "buses")
      );

      console.log("Found buses:", snapshot.docs.length);

      snapshot.docs.forEach(async (document) => {
        const bus = document.data();

        console.log(
          "Moving bus:",
          document.id,
          bus.latitude,
          bus.longitude
        );

        const newLatitude = bus.latitude + 0.0005;
        const newLongitude = bus.longitude + 0.0005;

        await updateBusLocation(
          document.id,
          newLatitude,
          newLongitude
        );
      });

      console.log("🚌 Bus locations updated");
    } catch (error) {
      console.error("❌ Simulation error:", error);
    }
  }, 5000);

  return () => clearInterval(interval);
}