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