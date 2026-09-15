import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import fs from "fs";

// Load Firebase service account
const serviceAccount = JSON.parse(
  fs.readFileSync("./serviceAccountKey.json", "utf8")
);

// Connect to Firebase
initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

async function cleanupSjecData() {
  console.log("🔍 Looking for SJEC buses...");

  // Find buses operated by SJEC
  const busesSnapshot = await db
    .collection("buses")
    .where("operator", "==", "SJEC")
    .get();

  console.log(
    `🚌 Found ${busesSnapshot.size} SJEC buses.`
  );

  // Delete SJEC buses
  for (const document of busesSnapshot.docs) {
    console.log(`🗑️ Deleting bus: ${document.id}`);

    await document.ref.delete();
  }

  // Find routes operated by SJEC
  const routesSnapshot = await db
    .collection("routes")
    .where("operator", "==", "SJEC")
    .get();

  console.log(
    `🛣️ Found ${routesSnapshot.size} SJEC routes.`
  );

  // Delete SJEC routes
  for (const document of routesSnapshot.docs) {
    console.log(`🗑️ Deleting route: ${document.id}`);

    await document.ref.delete();
  }

  console.log("");
  console.log("✅ SJEC college buses and routes removed.");
  console.log("🚌 City-bus data was not deleted.");
}

cleanupSjecData()
  .then(() => {
    console.log("🎉 Cleanup completed.");
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ Cleanup failed:", error);
    process.exit(1);
  });