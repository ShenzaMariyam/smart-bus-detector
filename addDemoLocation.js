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

async function addDemoLocation() {
  const busRef = db.collection("buses").doc("bus_KA19B7567");

  await busRef.update({
    latitude: 12.8491,
    longitude: 74.8432,
    speed: 25,
    demoMode: true
  });

  console.log("✅ Demo GPS location added to Route 15A");
  console.log("📍 Latitude:", 12.8491);
  console.log("📍 Longitude:", 74.8432);
}

addDemoLocation()
  .then(() => {
    console.log("🎉 Done.");
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ Failed:", error);
    process.exit(1);
  });