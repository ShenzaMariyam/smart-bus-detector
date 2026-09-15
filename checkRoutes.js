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

async function checkRoutes() {
    try {
        const snapshot = await db
            .collection("routes")
            .get();

        console.log("\n🗺️ ROUTES IN FIREBASE:\n");

        snapshot.forEach((document) => {
            const route = document.data();

            console.log(
                "ID:",
                document.id
            );

            console.log(
                "Route Number:",
                route.routeNumber
            );

            console.log(
                "Start:",
                route.startPoint
            );

            console.log(
                "Destination:",
                route.destination
            );

            console.log(
                "Number of points:",
                route.points
                    ? route.points.length
                    : 0
            );

            console.log(
                "-----------------------------"
            );
        });

        console.log(
            `\n✅ Total routes: ${snapshot.size}`
        );

    } catch (error) {

        console.error(
            "❌ Error:",
            error
        );

    }
}

checkRoutes();