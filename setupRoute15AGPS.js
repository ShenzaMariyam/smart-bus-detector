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

async function setupRoute15A() {
  const routeRef = db
    .collection("routes")
    .doc("city_route_15A");

  const busRef = db
    .collection("buses")
    .doc("bus_KA19B7567");

  // Route 15A:
  // Mangaladevi → Morgan Gate → Nandigudda → Kankanady
  // → Mallikatte → Kadri Market → Nanthur → Akashavani
  // → Bejai → KSRTC → Bharat Mall → Lalbagh → Ladyhill
  // → Kuloor → Baikampady → Surathkal → Krishnapur → Katipalla

  await routeRef.update({
    points: [
      {
        name: "Mangaladevi",
        latitude: 12.8491,
        longitude: 74.8432
      },
      {
        name: "Morgan Gate",
        latitude: 12.8530,
        longitude: 74.8490
      },
      {
        name: "Nandigudda",
        latitude: 12.85436,
        longitude: 74.85350
      },
      {
        name: "Kankanady",
        latitude: 12.86359,
        longitude: 74.86060
      },
      {
        name: "Mallikatte",
        latitude: 12.87830,
        longitude: 74.85533
      },
      {
        name: "Kadri Market",
        latitude: 12.87959,
        longitude: 74.85761
      },
      {
        name: "Nanthur",
        latitude: 12.88477,
        longitude: 74.86077
      },
      {
        name: "Akashavani",
        latitude: 12.8880,
        longitude: 74.8600
      },
      {
        name: "Bejai",
        latitude: 12.8919,
        longitude: 74.8463
      },
      {
        name: "KSRTC Bus Stand",
        latitude: 12.88524,
        longitude: 74.84168
      },
      {
        name: "Bharat Mall",
        latitude: 12.88653,
        longitude: 74.8410
      },
      {
        name: "Lalbagh",
        latitude: 12.8848,
        longitude: 74.8383
      },
      {
        name: "Ladyhill",
        latitude: 12.88837,
        longitude: 74.83737
      },
      {
        name: "Kuloor",
        latitude: 12.92300,
        longitude: 74.83130
      },
      {
        name: "Baikampady",
        latitude: 12.95659,
        longitude: 74.80756
      },
      {
        name: "Surathkal",
        latitude: 12.98902,
        longitude: 74.80172
      },
      {
        name: "Krishnapur",
        latitude: 13.00014,
        longitude: 74.82067
      },
      {
        name: "Katipalla",
        latitude: 13.00038,
        longitude: 74.83099
      }
    ]
  });

  // Update Bus 15A
  await busRef.update({
    destinationLatitude: 13.00038,
    destinationLongitude: 74.83099,
    speed: 25,
    demoMode: true
  });

  console.log("✅ Route 15A GPS points added.");
  console.log("📍 Total GPS points: 18");

  console.log("✅ Bus 15A destination GPS updated.");

  console.log(
    "🚌 Route: Mangaladevi → Katipalla"
  );
}

setupRoute15A()
  .then(() => {
    console.log("🎉 Route 15A GPS setup completed.");
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ Setup failed:", error);
    process.exit(1);
  });