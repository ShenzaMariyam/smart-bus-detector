import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import fs from "fs";

const serviceAccountPath = "./serviceAccountKey.json";

if (!fs.existsSync(serviceAccountPath)) {
    console.error("❌ serviceAccountKey.json was not found.");
    console.error(
        "Make sure serviceAccountKey.json is in the same folder as this file."
    );
    process.exit(1);
}

const serviceAccount = JSON.parse(
    fs.readFileSync(serviceAccountPath, "utf8")
);

if (!getApps().length) {
    initializeApp({
        credential: cert(serviceAccount),
    });
}

const db = getFirestore();

const buses = [
    {
        id: "bus_KA19AA8026",
        routeId: "route_1",
        routeNumber: "1",
        registrationNumber: "KA 19 AA 8026",
        operator: "SJEC",
        startPoint: "Puttur",
        destination: "SJEC",
        status: "Active",
    },

    {
        id: "bus_KA19C8586",
        routeId: "route_2",
        routeNumber: "2",
        registrationNumber: "KA 19 C 8586",
        operator: "SJEC",
        startPoint: "Madanthyar",
        destination: "SJEC",
        status: "Active",
    },

    {
        id: "bus_KA01AK5742",
        routeId: "route_3",
        routeNumber: "3",
        registrationNumber: "KA 01 AK 5742",
        operator: "SJEC",
        startPoint: "Kinnigoli",
        destination: "SJEC",
        status: "Active",
    },

    {
        id: "bus_KA19D7001",
        routeId: "route_4",
        routeNumber: "4",
        registrationNumber: "KA 19 D 7001",
        operator: "SJEC",
        startPoint: "Karkala",
        destination: "SJEC",
        status: "Active",
    },

    {
        id: "bus_KA09B8786",
        routeId: "route_6",
        routeNumber: "6",
        registrationNumber: "KA 09 B 8786",
        operator: "SJEC",
        startPoint: "Deralakatte",
        destination: "SJEC",
        status: "Active",
    },

    {
        id: "bus_KA30A0725",
        routeId: "route_7",
        routeNumber: "7",
        registrationNumber: "KA 30 A 0725",
        operator: "SJEC",
        startPoint: "Kodical Junction",
        destination: "SJEC",
        status: "Active",
    },

    {
        id: "bus_KA19AB2363",
        routeId: "route_8",
        routeNumber: "8",
        registrationNumber: "KA 19 AB 2363",
        operator: "SJEC",
        startPoint: "Highland Hospital",
        destination: "SJEC",
        status: "Active",
    },

    {
        id: "bus_KA51AF6349",
        routeId: "route_9",
        routeNumber: "9",
        registrationNumber: "KA 51 AF 6349",
        operator: "SJEC",
        startPoint: "Mannagudda",
        destination: "SJEC",
        status: "Active",
    },

    {
        id: "bus_KA09B8894",
        routeId: "route_10",
        routeNumber: "10",
        registrationNumber: "KA 09 B 8894",
        operator: "SJEC",
        startPoint: "Balmatta",
        destination: "SJEC",
        status: "Active",
    },

    {
        id: "bus_KA19AE7512",
        routeId: "route_1A",
        routeNumber: "1A",
        registrationNumber: "KA 19 AE 7512",
        operator: "SJEC",
        startPoint: "Vitla Church",
        destination: "SJEC",
        status: "Active",
    },

    {
        id: "bus_KA19B7567",
        routeId: "route_15A",
        routeNumber: "15A",
        registrationNumber: "KA 19 B 7567",
        operator: "Mangaluru City Bus",
        startPoint: "Mangaladevi",
        destination: "Katipalla",
        status: "Active",
    },
];

const routes = [
    {
        id: "route_1",
        routeNumber: "1",
        operator: "SJEC",
        startPoint: "Puttur",
        destination: "SJEC",
        stops: [
            "Puttur",
            "Nehru Nagar",
            "Mura",
            "Kabaka",
            "Mittur",
            "Kukrodi",
            "Nerla Katte",
            "Maani",
            "Soorikumeru",
            "Kudrebettu",
            "Kalladka",
            "Melkar",
            "Panemangaluru",
            "SJEC",
        ],
    },

    {
        id: "route_2",
        routeNumber: "2",
        operator: "SJEC",
        startPoint: "Madanthyar",
        destination: "SJEC",
        stops: [
            "Madanthyar",
            "Punjalkatte",
            "Moorje",
            "N.C. Road",
            "Kaval Katte",
            "Bambila",
            "Vogga",
            "Farla",
            "Manethar",
            "Jakribettu",
            "Bypass Junction",
            "B.C. Road",
            "Brahmarakotlu",
            "Thumbe",
            "Maaripalla",
            "Farangipet",
            "Arkula",
            "Adyar",
            "Kannur",
            "SJEC",
        ],
    },

    {
        id: "route_3",
        routeNumber: "3",
        operator: "SJEC",
        startPoint: "Kinnigoli",
        destination: "SJEC",
        stops: [
            "Kinnigoli",
            "Bhattakodi",
            "Padmanoor",
            "Hosakaveri",
            "S Kodi",
            "Punaroor",
            "Mulky Railway Station",
            "Kalipady",
            "Karnad Junction",
            "Mulky",
            "Karnad NH",
            "Pana Panambur",
            "Haleyangadi",
            "Pavanje",
            "Mukka",
            "NITK",
            "Surathkal",
            "Kulai",
            "Chithrapura",
            "Baikampady",
            "Panambur",
            "Kuloor",
            "Panjimogaru",
            "SJEC",
        ],
    },

    {
        id: "route_4",
        routeNumber: "4",
        operator: "SJEC",
        startPoint: "Karkala",
        destination: "SJEC",
        stops: [
            "Karkala",
            "Anekere",
            "By Pass",
            "Sanoor",
            "Barady Cross",
            "Kanthavara",
            "Beluvai",
            "Kesargadde",
            "Bannadka",
            "Alangar",
            "Moodbidri",
            "Handel",
            "Thodar",
            "Mijar",
            "Yedapadav",
            "Ganjimutt",
            "Kaikamba",
            "Gurupura",
            "SJEC",
        ],
    },

    {
        id: "route_6",
        routeNumber: "6",
        operator: "SJEC",
        startPoint: "Deralakatte",
        destination: "SJEC",
        stops: [
            "Deralakatte",
            "Kuthar",
            "Chembugudde",
            "Thokkottu",
            "Kallapu",
            "Jappina Mogaru",
            "Yekkur",
            "Gorigudda",
            "Pumpwell",
            "Naguri",
            "Padil Junction",
            "Maroli",
            "SJEC",
        ],
    },

    {
        id: "route_7",
        routeNumber: "7",
        operator: "SJEC",
        startPoint: "Kodical Junction",
        destination: "SJEC",
        stops: [
            "Kodical Junction",
            "Kottara Chowki",
            "Kottara",
            "Urvastore",
            "Chilimbi",
            "Ladyhill",
            "Bejai",
            "Kadri Kambla",
            "Kadri Dwara",
            "Mallikatte",
            "Nantoor",
            "Bikarnakatte",
            "KMF Dairy",
            "Baithurli",
            "SJEC",
        ],
    },

    {
        id: "route_8",
        routeNumber: "8",
        operator: "SJEC",
        startPoint: "Highland Hospital",
        destination: "SJEC",
        stops: [
            "Highland Hospital",
            "St Mary's School",
            "Malabar Gold",
            "Milagres",
            "RTO (AB Shetty Circle)",
            "Pandeshwar",
            "Monkey Stand",
            "Mangaladevi",
            "Cascia School",
            "Nandigudda",
            "Valencia",
            "Kankanady",
            "Bendoorwell",
            "Bendur Church",
            "Shivabgh (Abharan Jewellers)",
            "SJEC",
        ],
    },

    {
        id: "route_9",
        routeNumber: "9",
        operator: "SJEC",
        startPoint: "Mannagudda",
        destination: "SJEC",
        stops: [
            "Mannagudda",
            "Urva Market",
            "Daddalkad",
            "Kottara Cross",
            "Kuntikan (St Ann's High School)",
            "Derebail",
            "Konchady",
            "Mullerkad",
            "Kavoor Temple",
            "Kavoor",
            "KIOCL Township",
            "Bondel",
            "SJEC",
        ],
    },

    {
        id: "route_10",
        routeNumber: "10",
        operator: "SJEC",
        startPoint: "Balmatta",
        destination: "SJEC",
        stops: [
            "Balmatta",
            "Jyothi",
            "Bunts Hostel",
            "PVS",
            "Lalbagh",
            "KSRTC",
            "Kapikad – A.J. Hospital",
            "KPT",
            "Yeyyadi",
            "Padavinagady",
            "Bondel Church Cross",
            "Pachanady",
            "SJEC",
        ],
    },

    {
        id: "route_1A",
        routeNumber: "1A",
        operator: "SJEC",
        startPoint: "Vitla Church",
        destination: "SJEC",
        stops: [
            "Vitla Church",
            "Government ITI",
            "Mangalapadav",
            "Kelinja",
            "Veerakamba",
            "Golthmajal",
            "Kalladka",
            "Melkar",
            "Panemangaluru",
            "SJEC",
        ],
    },

    {
        id: "route_15A",
        routeNumber: "15A",
        operator: "Mangaluru City Bus",
        startPoint: "Mangaladevi",
        destination: "Katipalla",
        stops: [
            "Mangaladevi",
            "Morgan Gate",
            "Nandigudda",
            "Kankanady",
            "Mallikatte",
            "Kadri Market",
            "Nanthur",
            "Akashavani",
            "Bejai",
            "KSRTC Bus Stand",
            "Bharat Mall",
            "Lalbagh",
            "Ladyhill",
            "Kuloor",
            "Baikampady",
            "Surathkal",
            "Krishnapur",
            "Katipalla",
        ],
    },
];

async function importData() {
    console.log("🚌 Starting Firebase import...");

    const batch = db.batch();

    for (const bus of buses) {
        const { id, ...data } = bus;

        batch.set(
            db.collection("buses").doc(id),
            data,
            { merge: true }
        );
    }

    for (const route of routes) {
        const { id, ...data } = route;

        batch.set(
            db.collection("routes").doc(id),
            data,
            { merge: true }
        );
    }

    await batch.commit();

    console.log(`✅ Imported ${buses.length} buses.`);
    console.log(`✅ Imported ${routes.length} routes.`);
    console.log("🎉 Firebase import completed!");
}

importData().catch((error) => {
    console.error("❌ Import failed:", error);
    process.exit(1);
});