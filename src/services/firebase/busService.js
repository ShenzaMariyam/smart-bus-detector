import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  updateDoc
} from "firebase/firestore";

import { db } from "./firebase";

export async function getBuses() {
  const snapshot = await getDocs(
    collection(db, "buses")
  );

  return snapshot.docs.map((document) => ({
    id: document.id,
    ...document.data()
  }));
}

export function listenToBuses(callback) {
  return onSnapshot(
    collection(db, "buses"),
    (snapshot) => {
      const buses = snapshot.docs.map((document) => ({
        id: document.id,
        ...document.data()
      }));

      callback(buses);
    }
  );
}

export async function updateBusLocation(
  busId,
  latitude,
  longitude
) {
  try {
    const busRef = doc(db, "buses", busId);

    await updateDoc(busRef, {
      latitude: latitude,
      longitude: longitude
    });

    console.log(
      "✅ Firebase updated:",
      busId,
      latitude,
      longitude
    );
  } catch (error) {
    console.error(
      "❌ Firebase update failed:",
      error
    );
  }
}