import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import fs from "fs";

// ======================================================
// FIREBASE SETUP
// ======================================================

const serviceAccount = JSON.parse(
  fs.readFileSync("./serviceAccountKey.json", "utf8")
);

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

// ======================================================
// SETTINGS
// ======================================================

// Wait at least 1 second between Nominatim requests.
const GEOCODE_DELAY = 1100;

// If true:
// Routes that already have 2 or more points will be skipped.
const SKIP_COMPLETED_ROUTES = true;

// ======================================================
// STOP COORDINATE CACHE
// ======================================================

// This prevents searching for the same stop repeatedly.
//
// If a stop is found once, other routes using the same
// stop can reuse its coordinates.
//
// We also store known difficult stops here when we find them.
const stopCache = {};

// ======================================================
// HELPER: WAIT
// ======================================================

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

// ======================================================
// HELPER: GEOCODE ONE STOP
// ======================================================

async function geocodeStop(stopName) {
  // Check cache first.
  if (stopCache[stopName]) {
    console.log(
      `♻️ Using cached coordinates for: ${stopName}`
    );

    return stopCache[stopName];
  }

  const query = encodeURIComponent(
    `${stopName}, Mangaluru, Karnataka, India`
  );

  const url =
    `https://nominatim.openstreetmap.org/search` +
    `?q=${query}` +
    `&format=jsonv2` +
    `&limit=1` +
    `&countrycodes=in`;

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "SmartBusDetector/1.0 college-project"
      }
    });

    if (!response.ok) {
      throw new Error(
        `Geocoding failed: ${response.status}`
      );
    }

    const results = await response.json();

    if (!results.length) {
      return null;
    }

    const coordinates = {
      latitude: Number(results[0].lat),
      longitude: Number(results[0].lon)
    };

    // Save successful result in cache.
    stopCache[stopName] = coordinates;

    return coordinates;

  } catch (error) {
    console.log(
      `❌ Error searching ${stopName}:`,
      error.message
    );

    return null;
  }
}

// ======================================================
// PROCESS ONE ROUTE
// ======================================================

async function processRoute(document) {
  const route = document.data();

  const routeId = document.id;
  const routeNumber = route.routeNumber || routeId;

  console.log("\n==========================================");
  console.log(`🚌 Route: ${routeNumber}`);
  console.log(
    `📍 ${route.startPoint || "Unknown"} → ${
      route.destination || "Unknown"
    }`
  );
  console.log(`🆔 Firebase ID: ${routeId}`);
  console.log("==========================================");

  // ----------------------------------------------------
  // CHECK STOPS
  // ----------------------------------------------------

  if (!route.stops || route.stops.length === 0) {
    console.log("⚠️ This route has no stops.");
    return {
      routeId,
      routeNumber,
      status: "NO_STOPS",
      found: 0,
      total: 0,
      missing: []
    };
  }

  // ----------------------------------------------------
  // SKIP ALREADY COMPLETED ROUTES
  // ----------------------------------------------------

  if (
    SKIP_COMPLETED_ROUTES &&
    route.points &&
    route.points.length >= 2
  ) {
    console.log(
      `⏭️ Skipping — already has ${route.points.length} coordinates.`
    );

    return {
      routeId,
      routeNumber,
      status: "SKIPPED",
      found: route.points.length,
      total: route.stops.length,
      missing: []
    };
  }

  console.log(
    `🔎 Found ${route.stops.length} stops.`
  );

  const points = [];
  const missing = [];

  // ----------------------------------------------------
  // GEOCODE STOPS
  // ----------------------------------------------------

  for (const stop of route.stops) {
    console.log(`\n🔍 Searching: ${stop}`);

    const result = await geocodeStop(stop);

    if (!result) {
      console.log(
        `⚠️ No result found for: ${stop}`
      );

      missing.push(stop);
    } else {
      console.log(
        `✅ ${stop}: ${result.latitude}, ${result.longitude}`
      );

      points.push({
        name: stop,
        latitude: result.latitude,
        longitude: result.longitude
      });
    }

    // Respect Nominatim's public API rate limit.
    await sleep(GEOCODE_DELAY);
  }

  // ----------------------------------------------------
  // SUMMARY
  // ----------------------------------------------------

  console.log(
    `\n📍 Successfully found ${points.length}/${route.stops.length} stops.`
  );

  if (missing.length > 0) {
    console.log(
      `⚠️ Missing ${missing.length} stops:`
    );

    missing.forEach((stop) => {
      console.log(`   - ${stop}`);
    });
  }

  // ----------------------------------------------------
  // SAVE TO FIREBASE
  // ----------------------------------------------------

  if (points.length >= 2) {
    await db
      .collection("routes")
      .doc(routeId)
      .update({
        points: points
      });

    console.log(
      "\n✅ Route coordinates saved to Firebase."
    );

    return {
      routeId,
      routeNumber,
      status: "UPDATED",
      found: points.length,
      total: route.stops.length,
      missing
    };

  } else {
    console.log(
      "\n❌ Not enough coordinates."
    );

    console.log(
      "⚠️ Firebase was NOT changed for this route."
    );

    return {
      routeId,
      routeNumber,
      status: "FAILED",
      found: points.length,
      total: route.stops.length,
      missing
    };
  }
}

// ======================================================
// MAIN FUNCTION
// ======================================================

async function processAllRoutes() {
  console.log("\n🚌 SMART BUS DETECTOR");
  console.log("==============================");
  console.log("🌍 Automatic route geocoding");
  console.log("==============================\n");

  console.log(
    "📡 Loading routes from Firebase..."
  );

  const snapshot = await db
    .collection("routes")
    .get();

  console.log(
    `📊 Total route documents found: ${snapshot.size}`
  );

  const results = [];

  // ----------------------------------------------------
  // PROCESS ROUTES
  // ----------------------------------------------------

  for (const document of snapshot.docs) {
    try {
      const result =
        await processRoute(document);

      results.push(result);

    } catch (error) {
      console.error(
        `❌ Error processing ${document.id}:`,
        error.message
      );

      results.push({
        routeId: document.id,
        routeNumber:
          document.data().routeNumber ||
          document.id,
        status: "ERROR",
        found: 0,
        total:
          document.data().stops?.length || 0,
        missing: []
      });
    }
  }

  // ====================================================
  // FINAL REPORT
  // ====================================================

  console.log("\n\n");
  console.log("==========================================");
  console.log("🎉 ALL ROUTES PROCESSING FINISHED");
  console.log("==========================================");

  console.log("\n📊 SUMMARY:\n");

  const updated = results.filter(
    (item) => item.status === "UPDATED"
  );

  const skipped = results.filter(
    (item) => item.status === "SKIPPED"
  );

  const failed = results.filter(
    (item) =>
      item.status === "FAILED" ||
      item.status === "ERROR"
  );

  const noStops = results.filter(
    (item) => item.status === "NO_STOPS"
  );

  console.log(
    `✅ Routes updated: ${updated.length}`
  );

  console.log(
    `⏭️ Routes skipped: ${skipped.length}`
  );

  console.log(
    `❌ Routes failed: ${failed.length}`
  );

  console.log(
    `⚠️ Routes with no stops: ${noStops.length}`
  );

  // ----------------------------------------------------
  // ROUTE-BY-ROUTE REPORT
  // ----------------------------------------------------

  console.log("\n==========================================");
  console.log("📋 ROUTE DETAILS");
  console.log("==========================================\n");

  results.forEach((result) => {
    console.log(
      `${result.status.padEnd(10)} | ` +
      `${String(result.routeNumber).padEnd(5)} | ` +
      `${result.found}/${result.total}`
    );

    if (
      result.missing &&
      result.missing.length > 0
    ) {
      console.log(
        `             Missing: ${result.missing.join(", ")}`
      );
    }
  });

  // ----------------------------------------------------
  // UNIQUE MISSING STOPS
  // ----------------------------------------------------

  const allMissingStops = [];

  results.forEach((result) => {
    if (result.missing) {
      allMissingStops.push(
        ...result.missing
      );
    }
  });

  const uniqueMissingStops = [
    ...new Set(allMissingStops)
  ];

  console.log("\n==========================================");
  console.log("⚠️ UNIQUE MISSING STOPS");
  console.log("==========================================");

  if (uniqueMissingStops.length === 0) {
    console.log(
      "🎉 No missing stops!"
    );
  } else {
    uniqueMissingStops.forEach(
      (stop, index) => {
        console.log(
          `${index + 1}. ${stop}`
        );
      }
    );
  }

  console.log("\n==========================================");
  console.log("✅ Done!");
  console.log("==========================================\n");
}

// ======================================================
// RUN
// ======================================================

processAllRoutes()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error(
      "\n❌ Fatal error:",
      error
    );

    process.exit(1);
  });