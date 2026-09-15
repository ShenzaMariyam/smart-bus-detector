import {
  collection,
  doc,
  getDoc,
  getDocs
} from "firebase/firestore";

import { db } from "./firebase";

const routesCollection = collection(db, "routes");

export async function getRoutes() {
  const snapshot = await getDocs(routesCollection);

  return snapshot.docs.map((document) => ({
    id: document.id,
    ...document.data()
  }));
}

export async function getRoute(routeId) {
  const routeRef = doc(db, "routes", routeId);

  const snapshot = await getDoc(routeRef);

  if (!snapshot.exists()) {
    return null;
  }

  return {
    id: snapshot.id,
    ...snapshot.data()
  };
}


// Get actual road-following geometry for a route
export async function getRoadRoute(points) {
  if (!points || points.length < 2) {
    return [];
  }

  try {
    // OSRM expects:
    // longitude,latitude;longitude,latitude
    const coordinates = points
      .map(
        (point) =>
          `${Number(point.longitude)},${Number(point.latitude)}`
      )
      .join(";");

    const url =
      `https://router.project-osrm.org/route/v1/driving/${coordinates}` +
      `?overview=full&geometries=geojson`;

    console.log("🛣️ Requesting road route from OSRM...");

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `OSRM request failed: ${response.status}`
      );
    }

    const data = await response.json();

    if (data.code !== "Ok") {
      throw new Error(
        `OSRM routing failed: ${data.code}`
      );
    }

    const roadCoordinates =
      data.routes?.[0]?.geometry?.coordinates || [];

    // GeoJSON gives [longitude, latitude]
    // Leaflet needs [latitude, longitude]
    const leafletCoordinates = roadCoordinates.map(
      ([longitude, latitude]) => [
        latitude,
        longitude
      ]
    );

    console.log(
      "✅ Road route received:",
      leafletCoordinates.length,
      "points"
    );

    return leafletCoordinates;

  } catch (error) {
    console.error(
      "❌ Road route failed:",
      error
    );

    return [];
  }
}