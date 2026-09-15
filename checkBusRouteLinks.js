import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import fs from "fs";

const serviceAccount = JSON.parse(
  fs.readFileSync("./serviceAccountKey.json", "utf8")
);

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

async function checkBusRouteLinks() {
  const snapshot = await db.collection("buses").get();

  console.log("\n🚌 BUS → ROUTE CONNECTIONS\n");

  snapshot.forEach((doc) => {
    const bus = doc.data();

    console.log(
      `Bus ${bus.routeNumber} | ` +
      `Registration: ${bus.registrationNumber} | ` +
      `routeId: ${bus.routeId}`
    );
  });

  console.log(`\nTotal buses: ${snapshot.size}`);
}

checkBusRouteLinks()
  .then(() => {
    console.log("\n✅ Check completed.");
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n❌ Error:", error);
    process.exit(1);
  });