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

const routes = [
    {
        id: "city_route_1",
        routeNumber: "1",
        operator: "Mangaluru City Bus",
        startPoint: "State Bank",
        destination: "Kunjathbail",
        stops: [
            "State Bank",
            "Car Street",
            "Mannagudda",
            "Ladyhill",
            "Chilimbi",
            "Urva Stores",
            "Kavoor",
            "MCF Colony",
            "Kunjathbail"
        ]
    },

    {
        id: "city_route_1A",
        routeNumber: "1A",
        operator: "Mangaluru City Bus",
        startPoint: "State Bank",
        destination: "Thannir Bavi",
        stops: [
            "State Bank",
            "Lalbagh",
            "Urva Stores",
            "Kulur",
            "Thannir Bavi"
        ]
    },

    {
        id: "city_route_1B",
        routeNumber: "1B",
        operator: "Mangaluru City Bus",
        startPoint: "State Bank",
        destination: "Kodikal",
        stops: [
            "State Bank",
            "Car Street",
            "Mannagudda",
            "Ladyhill",
            "Chilimbi",
            "Urva Stores",
            "Kodikal"
        ]
    },

    {
        id: "city_route_1C",
        routeNumber: "1C",
        operator: "Mangaluru City Bus",
        startPoint: "State Bank",
        destination: "Kodikal",
        stops: [
            "State Bank",
            "Hampankatta",
            "Shedigudde",
            "Lal Bagh",
            "Lady Hill",
            "Kodikal Cross",
            "Kodikal"
        ]
    },

    {
        id: "city_route_2",
        routeNumber: "2",
        operator: "Mangaluru City Bus",
        startPoint: "State Bank",
        destination: "Mukka",
        stops: [
            "State Bank",
            "Lalbagh",
            "Ashoknagar",
            "Baikampady",
            "Surathkal",
            "Mukka"
        ]
    },

    {
        id: "city_route_2A",
        routeNumber: "2A",
        operator: "Mangaluru City Bus",
        startPoint: "State Bank",
        destination: "Sasihitlu",
        stops: [
            "State Bank",
            "Lalbagh",
            "Ashoknagar",
            "Baikampady",
            "Surathkal",
            "Mukka",
            "Sasihitlu"
        ]
    },

    {
        id: "city_route_2B",
        routeNumber: "2B",
        operator: "Mangaluru City Bus",
        startPoint: "Bengare",
        destination: "Bajpe",
        stops: [
            "Bengare",
            "Tannirbavi",
            "Kulur",
            "Panamboor",
            "Jokatta",
            "Kaana",
            "Port Temple",
            "Bajpe"
        ]
    },

    {
        id: "city_route_2C",
        routeNumber: "2C",
        operator: "Mangaluru City Bus",
        startPoint: "State Bank",
        destination: "Jokatte",
        stops: [
            "State Bank",
            "Lalbagh",
            "Ashoknagar",
            "Baikampady",
            "Baikampady Industrial Estate",
            "Jokatte"
        ]
    },

    {
        id: "city_route_2D",
        routeNumber: "2D",
        operator: "Mangaluru City Bus",
        startPoint: "State Bank",
        destination: "Parkodi",
        stops: [
            "State Bank",
            "Lalbagh",
            "Ashoknagar",
            "Baikampady",
            "Baikampady Industrial Estate",
            "Jokatte",
            "Parkodi"
        ]
    },

    {
        id: "city_route_2E",
        routeNumber: "2E",
        operator: "Mangaluru City Bus",
        startPoint: "Kankanady",
        destination: "Bajpe",
        stops: [
            "Kankanady",
            "Jyothi",
            "Lalbagh",
            "Ashoknagar",
            "Baikampady",
            "Baikampady Industrial Estate",
            "Jokatte",
            "Kalavar",
            "Bajpe"
        ]
    },

    {
        id: "city_route_2F",
        routeNumber: "2F",
        operator: "Mangaluru City Bus",
        startPoint: "Kankanady",
        destination: "Bajpe",
        stops: [
            "Kankanady",
            "Jyothi",
            "Lalbagh",
            "Ashoknagar",
            "Baikampady",
            "Baikampady Industrial Estate",
            "Jokatte",
            "Kalavar",
            "Bajpe"
        ]
    },

    {
        id: "city_route_3",
        routeNumber: "3",
        operator: "Mangaluru City Bus",
        startPoint: "State Bank",
        destination: "Moodushedde",
        stops: [
            "State Bank",
            "Falnir",
            "Bendoorwell",
            "Mallikatte",
            "Kadri",
            "Bikkarnakatta",
            "Kulshekar",
            "Kudupu",
            "Vamanjoor",
            "Moodushedde"
        ]
    },

    {
        id: "city_route_3A",
        routeNumber: "3A",
        operator: "Mangaluru City Bus",
        startPoint: "State Bank",
        destination: "Moodushedde",
        stops: [
            "State Bank",
            "Jyothi",
            "Bendoorwell",
            "Mallikatte",
            "Kadri",
            "Bikkarnakatta",
            "Kulshekar",
            "Kudupu",
            "Vamanjoor",
            "Moodushedde"
        ]
    },

    {
        id: "city_route_3B",
        routeNumber: "3B",
        operator: "Mangaluru City Bus",
        startPoint: "Mangaladevi",
        destination: "Moodushedde",
        stops: [
            "Mangaladevi",
            "Kankanady",
            "Mallikatte",
            "Kadri",
            "Bikkarnakatta",
            "Kulshekar",
            "Kudupu",
            "Vamanjoor",
            "Moodushedde"
        ]
    },

    {
        id: "city_route_3C",
        routeNumber: "3C",
        operator: "Mangaluru City Bus",
        startPoint: "Mangaldevi",
        destination: "Moodushedde",
        stops: [
            "Mangaldevi",
            "Valencia",
            "Nantoor",
            "Kudpu Temple",
            "Mangala Jyoti",
            "Moodushedde"
        ]
    },

    {
        id: "city_route_3D",
        routeNumber: "3D",
        operator: "Mangaluru City Bus",
        startPoint: "State Bank",
        destination: "Ulaibettu",
        stops: [
            "State Bank",
            "Jyothi",
            "Bunts Hostel",
            "Kadri",
            "Vamanjoor",
            "Ulaibettu"
        ]
    },

    {
        id: "city_route_4",
        routeNumber: "4",
        operator: "Mangaluru City Bus",
        startPoint: "State Bank",
        destination: "Kulshekar Chowki",
        stops: [
            "State Bank",
            "Falnir",
            "Kankanady",
            "Bendoorwell",
            "Mallikatte",
            "Kadri",
            "Bikkarnakatta",
            "Kulshekar",
            "Kulshekar Chowki"
        ]
    },

    {
        id: "city_route_4A",
        routeNumber: "4A",
        operator: "Mangaluru City Bus",
        startPoint: "State Bank",
        destination: "Merlapadavu",
        stops: [
            "State Bank",
            "Falnir",
            "Kankanady",
            "Bendoorwell",
            "Mallikatte",
            "Kadri",
            "Nanthur",
            "Kulshekar",
            "Kaikamba",
            "Neermarga",
            "Merlapadavu"
        ]
    },

    {
        id: "city_route_4C",
        routeNumber: "4C",
        operator: "Mangaluru City Bus",
        startPoint: "State Bank",
        destination: "Neermarga",
        stops: [
            "State Bank",
            "Falnir",
            "Kankanady",
            "Bendoorwell",
            "Mallikatte",
            "Kadri",
            "Nanthur",
            "Kulshekar",
            "Kaikamba",
            "Neermarga"
        ]
    },

    {
        id: "city_route_5",
        routeNumber: "5",
        operator: "Mangaluru City Bus",
        startPoint: "State Bank",
        destination: "Morgan Gate",
        stops: [
            "State Bank",
            "Jyothi",
            "Bendoorwell",
            "Kankanady",
            "Nandigudda",
            "Marnamikatta",
            "Morgan Gate"
        ]
    },

    {
        id: "city_route_6A",
        routeNumber: "6A",
        operator: "Mangaluru City Bus",
        startPoint: "State Bank",
        destination: "Shaktinagar",
        stops: [
            "State Bank",
            "Jyothi",
            "Bendoorwell",
            "Mallikatte",
            "Kadri",
            "Bikkarnakatta",
            "Kulshekar",
            "Shaktinagar"
        ]
    },

    {
        id: "city_route_6B",
        routeNumber: "6B",
        operator: "Mangaluru City Bus",
        startPoint: "State Bank",
        destination: "Shaktinagar",
        stops: [
            "State Bank",
            "Falnir",
            "Kankanady",
            "Bendoorwell",
            "Mallikatte",
            "Kadri",
            "Bikkarnakatta",
            "Kulshekar",
            "Shaktinagar"
        ]
    },

    {
        id: "city_route_6C",
        routeNumber: "6C",
        operator: "Mangaluru City Bus",
        startPoint: "State Bank",
        destination: "Shaktinagar",
        stops: [
            "State Bank",
            "Jyothi",
            "Bunts Hostel",
            "Mallikatte",
            "Kadri",
            "Bikkarnakatta",
            "Kulshekar",
            "Shaktinagar"
        ]
    },

    {
        id: "city_route_7",
        routeNumber: "7",
        operator: "Mangaluru City Bus",
        startPoint: "State Bank",
        destination: "Urva Stores",
        stops: [
            "State Bank",
            "Car Street",
            "Alake",
            "Mannagudda",
            "Ladyhill",
            "Chilimbi",
            "Urva Stores"
        ]
    },

    {
        id: "city_route_9A",
        routeNumber: "9A",
        operator: "Mangaluru City Bus",
        startPoint: "State Bank",
        destination: "J.M. Road",
        stops: [
            "State Bank",
            "Pandeshwar",
            "Jeppu",
            "Morgan Gate",
            "Jeppupatna",
            "Ekkur",
            "Mugeru",
            "Bajal",
            "Bajal Pakkaladka",
            "J.M. Road"
        ]
    },

    {
        id: "city_route_9B",
        routeNumber: "9B",
        operator: "Mangaluru City Bus",
        startPoint: "State Bank",
        destination: "J.M. Road",
        stops: [
            "State Bank",
            "Jyothi",
            "Pumpwell",
            "Ekkur",
            "Mugeru",
            "Bajal",
            "Bajal Pakkaladka",
            "J.M. Road"
        ]
    },

    {
        id: "city_route_10A",
        routeNumber: "10A",
        operator: "Mangaluru City Bus",
        startPoint: "State Bank",
        destination: "Adyar Launch Jetty",
        stops: [
            "State Bank",
            "Balmatta",
            "Jyothi",
            "Kankanady",
            "Pumpwell",
            "Nagori",
            "Padil",
            "Kannurbettu",
            "Adyar",
            "Adyar Launch Jetty"
        ]
    },

    {
        id: "city_route_10B",
        routeNumber: "10B",
        operator: "Mangaluru City Bus",
        startPoint: "State Bank",
        destination: "Adyar Launch Jetty",
        stops: [
            "State Bank",
            "Jyothi",
            "Balmatta",
            "Kankanady",
            "Pumpwell",
            "Nagori",
            "Padil",
            "Kannurbettu",
            "Adyar",
            "Adyar Launch Jetty"
        ]
    },

    {
        id: "city_route_11A",
        routeNumber: "11A",
        operator: "Mangaluru City Bus",
        startPoint: "State Bank",
        destination: "Kannurbettu",
        stops: [
            "State Bank",
            "Falnir",
            "Kankanady",
            "Nagori",
            "Garodi",
            "Padil",
            "Kannurbettu"
        ]
    },

    {
        id: "city_route_11B",
        routeNumber: "11B",
        operator: "Mangaluru City Bus",
        startPoint: "State Bank",
        destination: "Jalligudde",
        stops: [
            "State Bank",
            "Falnir",
            "Kankanady",
            "Nagori",
            "Garodi",
            "Padil",
            "Jalligudde"
        ]
    },

    {
        id: "city_route_12A",
        routeNumber: "12A",
        operator: "Mangaluru City Bus",
        startPoint: "State Bank",
        destination: "Polali",
        stops: [
            "State Bank",
            "Jyothi",
            "Bunts Hostel",
            "Mallikatte",
            "Kadri",
            "Bikkarnakatta",
            "Kulshekar",
            "Kudupu",
            "Vamanjoor",
            "Gurupura",
            "Kaikamba",
            "Addoor",
            "Polali"
        ]
    },

    {
        id: "city_route_12B",
        routeNumber: "12B",
        operator: "Mangaluru City Bus",
        startPoint: "State Bank",
        destination: "Kolthamajal",
        stops: [
            "State Bank",
            "Jyothi",
            "Bunts Hostel",
            "Mallikatte",
            "Kadri",
            "Bikkarnakatta",
            "Kulshekar",
            "Kudupu",
            "Vamanjoor",
            "Gurupura",
            "Kaikamba",
            "Addoor",
            "Polali",
            "Kolthamajal"
        ]
    },

    {
        id: "city_route_13",
        routeNumber: "13",
        operator: "Mangaluru City Bus",
        startPoint: "State Bank",
        destination: "Urva Stores",
        stops: [
            "State Bank",
            "Car Street",
            "Mannagudda",
            "Ladyhill",
            "Chilimbi",
            "Urva Stores"
        ]
    },

    {
        id: "city_route_13A",
        routeNumber: "13A",
        operator: "Mangaluru City Bus",
        startPoint: "State Bank",
        destination: "Kottara (Infosys)",
        stops: [
            "State Bank",
            "Car Street",
            "Mannagudda",
            "Ladyhill",
            "Chilimbi",
            "Urva Stores",
            "Kottara"
        ]
    },

    {
        id: "city_route_13C",
        routeNumber: "13C",
        operator: "Mangaluru City Bus",
        startPoint: "State Bank",
        destination: "Bondel",
        stops: [
            "State Bank",
            "K.S. Rao Road",
            "Lalbagh",
            "Ladyhill",
            "Kuloor",
            "Kudremukh Housing Colony",
            "Hudco Colony",
            "Govt. Womens Polytechnic",
            "Govt. Quarters",
            "Kavoor",
            "Bondel"
        ]
    },

    {
        id: "city_route_13D",
        routeNumber: "13D",
        operator: "Mangaluru City Bus",
        startPoint: "State Bank",
        destination: "Beggari Colony",
        stops: [
            "State Bank",
            "K.S. Rao Road",
            "Lalbagh",
            "Ladyhill",
            "Kuloor",
            "Kudremukh Housing Colony",
            "Hudco Colony",
            "Govt. Womens Polytechnic",
            "Govt. Quarters",
            "Kavoor",
            "Bondel",
            "Padangady",
            "Pacchanady Beggari Colony"
        ]
    },

    {
        id: "city_route_13E",
        routeNumber: "13E",
        operator: "Mangaluru City Bus",
        startPoint: "Mangaladevi",
        destination: "Bondel",
        stops: [
            "Mangaladevi",
            "Bendoorwell",
            "Jyothi",
            "Lalbagh",
            "Ladyhill",
            "Kuloor",
            "Kudremukh Housing Colony",
            "Hudco Colony",
            "Govt. Womens Polytechnic",
            "Govt. Quarters",
            "Kavoor",
            "Bondel"
        ]
    },

    {
        id: "city_route_14A",
        routeNumber: "14A",
        operator: "Mangaluru City Bus",
        startPoint: "State Bank",
        destination: "Bondel",
        stops: [
            "State Bank",
            "Jyothi",
            "Bendoorwell",
            "Mallikatte",
            "Kadri",
            "Nanthur",
            "Akashavani",
            "K.P.T",
            "Yeyyadi",
            "Konchadi",
            "Padangady",
            "Bondel"
        ]
    },

    {
        id: "city_route_14B",
        routeNumber: "14B",
        operator: "Mangaluru City Bus",
        startPoint: "State Bank",
        destination: "Bondel",
        stops: [
            "State Bank",
            "Falnir",
            "Bendoorwell",
            "Mallikatte",
            "Kadri",
            "Nanthur",
            "Akashavani",
            "K.P.T",
            "Yeyyadi",
            "Konchadi",
            "Padangady",
            "Bondel"
        ]
    },

    {
        id: "city_route_14C",
        routeNumber: "14C",
        operator: "Mangaluru City Bus",
        startPoint: "Mangaladevi",
        destination: "Bondel",
        stops: [
            "Mangaladevi",
            "Morgan Gate",
            "Attavara",
            "Yemmekere",
            "Nandigudda",
            "Kankanady",
            "Mallikatte",
            "Kadri",
            "Nanthur",
            "Akashavani",
            "K.P.T",
            "Yeyyadi",
            "Konchadi",
            "Padangady",
            "Bondel"
        ]
    },

    {
        id: "city_route_15",
        routeNumber: "15",
        operator: "Mangaluru City Bus",
        startPoint: "Mangaladevi",
        destination: "Surathkal",
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
            "Surathkal"
        ]
    },

    {
        id: "city_route_15A",
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
            "Katipalla"
        ]
    },

    {
        id: "city_route_15B",
        routeNumber: "15B",
        operator: "Mangaluru City Bus",
        startPoint: "Mangaladevi",
        destination: "Chelairpadavu",
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
            "Chelairpadavu"
        ]
    },

    {
        id: "city_route_16",
        routeNumber: "16",
        operator: "Mangaluru City Bus",
        startPoint: "State Bank",
        destination: "Sulthan Battery",
        stops: [
            "State Bank",
            "Mission Street",
            "Azizzudin Road",
            "Kandathpalli",
            "Mandi",
            "Gokarnath Temple",
            "Kudroli",
            "Bokkapatna",
            "Boloor",
            "Sulthan Battery"
        ]
    },

    {
        id: "city_route_16A",
        routeNumber: "16A",
        operator: "Mangaluru City Bus",
        startPoint: "State Bank",
        destination: "Sulthan Battery",
        stops: [
            "State Bank",
            "Car Street",
            "Alake",
            "Kudroli",
            "Bokkapatna",
            "Boloor",
            "Sulthan Battery"
        ]
    },

    {
        id: "city_route_17",
        routeNumber: "17",
        operator: "Mangaluru City Bus",
        startPoint: "State Bank",
        destination: "Kunjathbail",
        stops: [
            "State Bank",
            "K.S. Rao Road",
            "PVS",
            "Empire Mall",
            "Ballalbagh",
            "Lalbagh",
            "Saibeen Complex",
            "Bharat Mall",
            "KSRTC Bus Stand",
            "Kapikad",
            "Balebail",
            "Kottara Cross",
            "Kuntikana",
            "Konchadi",
            "Mullakadu",
            "Kavoor",
            "Maravoor",
            "Kunjathbail"
        ]
    },

    {
        id: "city_route_17A",
        routeNumber: "17A",
        operator: "Mangaluru City Bus",
        startPoint: "State Bank",
        destination: "Kunjathbail",
        stops: [
            "State Bank",
            "K.S. Rao Road",
            "PVS",
            "Empire Mall",
            "Ballalbagh",
            "Lalbagh",
            "Saibeen Complex",
            "Bharat Mall",
            "KSRTC Bus Stand",
            "Kapikad",
            "Balebail",
            "Kottara Cross",
            "Kuntikana",
            "Konchadi",
            "Mullakadu",
            "Kavoor",
            "Maravoor",
            "Kunjathbail"
        ]
    },

    {
        id: "city_route_17B",
        routeNumber: "17B",
        operator: "Mangaluru City Bus",
        startPoint: "State Bank",
        destination: "Kunjathbail",
        stops: [
            "State Bank",
            "K.S. Rao Road",
            "PVS",
            "Empire Mall",
            "Ballalbagh",
            "Lalbagh",
            "Saibeen Complex",
            "Bharat Mall",
            "KSRTC Bus Stand",
            "Kapikad",
            "Balebail",
            "Kottara Cross",
            "Kuntikana",
            "Konchadi",
            "Mullakadu",
            "Kavoor",
            "Maravoor",
            "Kunjathbail"
        ]
    },

    {
        id: "city_route_18",
        routeNumber: "18",
        operator: "Mangaluru City Bus",
        startPoint: "State Bank",
        destination: "Morgan Gate",
        stops: [
            "State Bank",
            "Pandeshwar",
            "Hoige Bazar",
            "Bolar",
            "Jeppu Market",
            "Morgan Gate"
        ]
    },

    {
        id: "city_route_19",
        routeNumber: "19",
        operator: "Mangaluru City Bus",
        startPoint: "State Bank",
        destination: "Pacchanady",
        stops: [
            "State Bank",
            "Hampankatta",
            "Jyothi",
            "PVS",
            "Empire Mall",
            "Ballalbagh",
            "Lalbagh",
            "Saibeen Complex",
            "Bharat Mall",
            "KSRTC Bus Stand",
            "Bejai",
            "K.P.T",
            "Yeyyadi",
            "Konchadi",
            "Padavinangadi",
            "Bondel",
            "Pacchanady"
        ]
    },

    {
        id: "city_route_21",
        routeNumber: "21",
        operator: "Mangaluru City Bus",
        startPoint: "State Bank",
        destination: "Neermarga",
        stops: [
            "State Bank",
            "Jyothi",
            "Bunts Hostel",
            "Mallikatte",
            "Kadri",
            "Nanthur",
            "Bikkarnakatta",
            "Kulshekar",
            "Kaikamba",
            "Neermarga"
        ]
    },

    {
        id: "city_route_22",
        routeNumber: "22",
        operator: "Mangaluru City Bus",
        startPoint: "State Bank",
        destination: "Bajpe",
        stops: [
            "State Bank",
            "Jyothi",
            "Bunts Hostel",
            "Mallikatte",
            "Nanthur",
            "Bikkarnakatta",
            "Kulshekar",
            "Vamanjoor",
            "Gurupura",
            "Kaikamba",
            "Bajpe"
        ]
    },

    {
        id: "city_route_22A",
        routeNumber: "22A",
        operator: "Mangaluru City Bus",
        startPoint: "State Bank",
        destination: "Bajpe Airport (Mangalore International Airport IXE)",
        stops: [
            "State Bank",
            "Jyothi",
            "Bunts Hostel",
            "Mallikatte",
            "Nanthur",
            "Bikkarnakatta",
            "Kulshekar",
            "Vamanjoor",
            "Gurupura",
            "Kaikamba",
            "Bajpe",
            "Bajpe Aerodrome"
        ]
    },

    {
        id: "city_route_23",
        routeNumber: "23",
        operator: "Mangaluru City Bus",
        startPoint: "State Bank",
        destination: "Faisalnagar",
        stops: [
            "State Bank",
            "Jyothi",
            "Balmatta",
            "Kankanady",
            "Pumpwell",
            "Nagori",
            "Garodi",
            "Padil",
            "Faisalnagar"
        ]
    },

    {
        id: "city_route_27",
        routeNumber: "27",
        operator: "Mangaluru City Bus",
        startPoint: "State Bank",
        destination: "Mangaladevi",
        stops: [
            "State Bank",
            "Attavar",
            "Nandigudda",
            "Marnamikatta",
            "Mangaladevi"
        ]
    },

    {
        id: "city_route_27A",
        routeNumber: "27A",
        operator: "Mangaluru City Bus",
        startPoint: "State Bank",
        destination: "Mulihitlu",
        stops: [
            "State Bank",
            "Attavar",
            "Nandigudda",
            "Marnamikatta",
            "Mangaladevi",
            "Mulihitlu"
        ]
    },

    {
        id: "city_route_29",
        routeNumber: "29",
        operator: "Mangaluru City Bus",
        startPoint: "State Bank",
        destination: "Morgan Gate",
        stops: [
            "State Bank",
            "Pandeshwar",
            "Yemmekere",
            "Bolar",
            "Jeppu Market",
            "Morgan Gate"
        ]
    },

    {
        id: "city_route_30",
        routeNumber: "30",
        operator: "Mangaluru City Bus",
        startPoint: "State Bank",
        destination: "Padil",
        stops: [
            "State Bank",
            "Jyothi",
            "Balmatta",
            "Kankanady",
            "Mallikatte",
            "Kadri",
            "Nanthur",
            "Bikkarnakatta",
            "Maroli",
            "Padil"
        ]
    },

    {
        id: "city_route_30A",
        routeNumber: "30A",
        operator: "Mangaluru City Bus",
        startPoint: "State Bank",
        destination: "Adyar",
        stops: [
            "State Bank",
            "Jyothi",
            "Balmatta",
            "Kankanady",
            "Mallikatte",
            "Kadri",
            "Nanthur",
            "Bikkarnakatta",
            "Maroli",
            "Padil",
            "Kannurbettu",
            "Adyar"
        ]
    },

    {
        id: "city_route_30B",
        routeNumber: "30B",
        operator: "Mangaluru City Bus",
        startPoint: "State Bank",
        destination: "Adyar Launch Jetty",
        stops: [
            "State Bank",
            "Jyothi",
            "Balmatta",
            "Kankanady",
            "Mallikatte",
            "Kadri",
            "Nanthur",
            "Bikkarnakatta",
            "Maroli",
            "Padil",
            "Kannurbettu",
            "Adyar",
            "Adyar Launch Jetty"
        ]
    },

    {
        id: "city_route_31",
        routeNumber: "31",
        operator: "Mangaluru City Bus",
        startPoint: "State Bank",
        destination: "Shediguri",
        stops: [
            "State Bank",
            "PVS",
            "Canara College",
            "Empire Mall",
            "Ballalbagh",
            "Mannagudda",
            "Urva Market",
            "Shediguri"
        ]
    },

    {
        id: "city_route_31A",
        routeNumber: "31A",
        operator: "Mangaluru City Bus",
        startPoint: "State Bank",
        destination: "Ashoknagar",
        stops: [
            "State Bank",
            "K.S. Rao Road",
            "PVS",
            "Canara College",
            "Empire Mall",
            "Ballalbagh",
            "Lalbagh",
            "Ladyhill",
            "Urva Market",
            "Ashoknagar"
        ]
    },

    {
        id: "city_route_31B",
        routeNumber: "31B",
        operator: "Mangaluru City Bus",
        startPoint: "State Bank",
        destination: "Dombel",
        stops: [
            "State Bank",
            "Car Street",
            "Mannagudda",
            "Urva Market",
            "Ashoknagar",
            "Dombel"
        ]
    },

    {
        id: "city_route_33",
        routeNumber: "33",
        operator: "Mangaluru City Bus",
        startPoint: "State Bank",
        destination: "Aakashbhavan",
        stops: [
            "State Bank",
            "K.S. Rao Road",
            "PVS",
            "Empire Mall",
            "Ballalbagh",
            "Lalbagh",
            "Saibeen Complex",
            "Bharat Mall",
            "KSRTC Bus Stand",
            "Kapikad",
            "Balebail",
            "Kottara Cross",
            "Kuntikana",
            "Derebail",
            "Konchadi",
            "Akashbhavan"
        ]
    },

    {
        id: "city_route_37",
        routeNumber: "37",
        operator: "Mangaluru City Bus",
        startPoint: "State Bank",
        destination: "Padil",
        stops: [
            "State Bank",
            "Jyothi",
            "Balmatta",
            "Kankanady",
            "Mallikatte",
            "Kadri",
            "Nanthur",
            "Bikkarnakatta",
            "Maroli",
            "Padil"
        ]
    },

    {
        id: "city_route_41A",
        routeNumber: "41A",
        operator: "Mangaluru City Bus",
        startPoint: "State Bank",
        destination: "Chelairpadavu",
        stops: [
            "State Bank",
            "K.S. Rao Road",
            "PVS",
            "Empire Mall",
            "Ballalbagh",
            "Lalbagh",
            "Ladyhill",
            "Kuloor",
            "Baikampady",
            "Surathkal",
            "Krishnapur",
            "Katipalla",
            "Chelairpadavu"
        ]
    },

    {
        id: "city_route_42",
        routeNumber: "42",
        operator: "Mangaluru City Bus",
        startPoint: "State Bank",
        destination: "Talapady",
        stops: [
            "State Bank",
            "Balmatta",
            "Jyothi",
            "Kankanady",
            "Pumpwell",
            "Thokkottu",
            "Kotekar",
            "Beeri",
            "Talapady"
        ]
    },

    {
        id: "city_route_43",
        routeNumber: "43",
        operator: "Mangaluru City Bus",
        startPoint: "State Bank",
        destination: "Kinya",
        stops: [
            "State Bank",
            "Balmatta",
            "Jyothi",
            "Kankanady",
            "Pumpwell",
            "Thokkottu",
            "Kotekar",
            "Beeri",
            "Talapady",
            "Kinya"
        ]
    },

    {
        id: "city_route_44A",
        routeNumber: "44A",
        operator: "Mangaluru City Bus",
        startPoint: "State Bank",
        destination: "Someshwar",
        stops: [
            "State Bank",
            "Balmatta",
            "Jyothi",
            "Kankanady",
            "Pumpwell",
            "Thokkottu",
            "Ullal",
            "Someshwar"
        ]
    },

    {
        id: "city_route_44B",
        routeNumber: "44B",
        operator: "Mangaluru City Bus",
        startPoint: "State Bank",
        destination: "Eliaradavu",
        stops: [
            "State Bank",
            "Balmatta",
            "Jyothi",
            "Kankanady",
            "Pumpwell",
            "Thokkottu",
            "Kotekar",
            "Eliaradavu"
        ]
    },

    {
        id: "city_route_44C",
        routeNumber: "44C",
        operator: "Mangaluru City Bus",
        startPoint: "State Bank",
        destination: "Ullal Launch Jetty",
        stops: [
            "State Bank",
            "Balmatta",
            "Jyothi",
            "Kankanady",
            "Pumpwell",
            "Thokkottu",
            "Ullal",
            "Ullal Launch Jetty"
        ]
    },

    {
        id: "city_route_44D",
        routeNumber: "44D",
        operator: "Mangaluru City Bus",
        startPoint: "State Bank",
        destination: "Kotepura",
        stops: [
            "State Bank",
            "Balmatta",
            "Jyothi",
            "Kankanady",
            "Pumpwell",
            "Thokkottu",
            "Ullal",
            "Kotepura"
        ]
    },

    {
        id: "city_route_45",
        routeNumber: "45",
        operator: "Mangaluru City Bus",
        startPoint: "State Bank",
        destination: "Katipalla",
        stops: [
            "State Bank",
            "K.S. Rao Road",
            "PVS",
            "Empire Mall",
            "Ballalbagh",
            "Lalbagh",
            "Ladyhill",
            "Chilimbi",
            "Urva Store",
            "Kottara Chowki",
            "Kuloor",
            "Panambur",
            "Surathkal",
            "Kana",
            "Krishnapur",
            "Katipalla"
        ]
    },

    {
        id: "city_route_45A",
        routeNumber: "45A",
        operator: "Mangaluru City Bus",
        startPoint: "State Bank",
        destination: "Chokkabettu",
        stops: [
            "State Bank",
            "K.S. Rao Road",
            "PVS",
            "Empire Mall",
            "Ballalbagh",
            "Lalbagh",
            "Ladyhill",
            "Chilimbi",
            "Urva Store",
            "Kottara Chowki",
            "Kuloor",
            "Panambur",
            "Surathkal",
            "Kana",
            "Krishnapur",
            "Katipalla",
            "Chokkabettu"
        ]
    },

    {
        id: "city_route_45B",
        routeNumber: "45B",
        operator: "Mangaluru City Bus",
        startPoint: "State Bank",
        destination: "Chokkabettu",
        stops: [
            "State Bank",
            "K.S. Rao Road",
            "PVS",
            "Empire Mall",
            "Ballalbagh",
            "Lalbagh",
            "Ladyhill",
            "Chilimbi",
            "Urva Store",
            "Kottara Chowki",
            "Kuloor",
            "Panambur",
            "Surathkal",
            "Kana",
            "Krishnapur",
            "Katipalla",
            "Chokkabettu"
        ]
    },

    {
        id: "city_route_45C",
        routeNumber: "45C",
        operator: "Mangaluru City Bus",
        startPoint: "State Bank",
        destination: "Kaikamba",
        stops: [
            "State Bank",
            "K.S. Rao Road",
            "PVS",
            "Empire Mall",
            "Ballalbagh",
            "Lalbagh",
            "Ladyhill",
            "Chilimbi",
            "Urva Store",
            "Kottara Chowki",
            "Kuloor",
            "Panambur",
            "Surathkal",
            "Kana",
            "Krishnapur",
            "Katipalla",
            "Mangalpete",
            "Kaikamba"
        ]
    },

    {
        id: "city_route_45D",
        routeNumber: "45D",
        operator: "Mangaluru City Bus",
        startPoint: "State Bank",
        destination: "Kuthethur",
        stops: [
            "State Bank",
            "K.S. Rao Road",
            "PVS",
            "Empire Mall",
            "Ballalbagh",
            "Lalbagh",
            "Ladyhill",
            "Chilimbi",
            "Urva Store",
            "Kottara Chowki",
            "Kuloor",
            "Panambur",
            "Surathkal",
            "Kana",
            "Krishnapur",
            "Katipalla",
            "Mangalpete",
            "MRPL",
            "Kuthethur"
        ]
    },

    {
        id: "city_route_45E",
        routeNumber: "45E",
        operator: "Mangaluru City Bus",
        startPoint: "State Bank",
        destination: "Kaithakurneri",
        stops: [
            "State Bank",
            "K.S. Rao Road",
            "PVS",
            "Empire Mall",
            "Ballalbagh",
            "Lalbagh",
            "Ladyhill",
            "Chilimbi",
            "Urva Store",
            "Kottara Chowki",
            "Kuloor",
            "Panambur",
            "Surathkal",
            "Kana",
            "Krishnapur",
            "Katipalla",
            "Mangalpete",
            "MRPL",
            "Kaithakurneri"
        ]
    },

    {
        id: "city_route_45F",
        routeNumber: "45F",
        operator: "Mangaluru City Bus",
        startPoint: "State Bank",
        destination: "Kaikamba",
        stops: [
            "State Bank",
            "K.S. Rao Road",
            "PVS",
            "Empire Mall",
            "Ballalbagh",
            "Lalbagh",
            "Ladyhill",
            "Chilimbi",
            "Urva Store",
            "Kottara Chowki",
            "Kuloor",
            "Panambur",
            "Surathkal",
            "Kana",
            "Krishnapur",
            "Katipalla",
            "Kaikamba"
        ]
    },

    {
        id: "city_route_45G",
        routeNumber: "45G",
        operator: "Mangaluru City Bus",
        startPoint: "State Bank",
        destination: "Janatha Colony",
        stops: [
            "State Bank",
            "K.S. Rao Road",
            "PVS",
            "Empire Mall",
            "Ballalbagh",
            "Lalbagh",
            "Ladyhill",
            "Chilimbi",
            "Urva Store",
            "Kottara Chowki",
            "Kuloor",
            "Panambur",
            "Surathkal",
            "Kana",
            "Mason Road",
            "Janatha Colony"
        ]
    },

    {
        id: "city_route_45H",
        routeNumber: "45H",
        operator: "Mangaluru City Bus",
        startPoint: "State Bank",
        destination: "Madhyapadavu",
        stops: [
            "State Bank",
            "K.S. Rao Road",
            "PVS",
            "Empire Mall",
            "Ballalbagh",
            "Lalbagh",
            "Ladyhill",
            "Chilimbi",
            "Urva Store",
            "Kottara Chowki",
            "Kuloor",
            "Panambur",
            "Surathkal",
            "Kana",
            "Krishnapur",
            "Katipalla",
            "Madhyapadavu"
        ]
    },

    {
        id: "city_route_47",
        routeNumber: "47",
        operator: "Mangaluru City Bus",
        startPoint: "State Bank",
        destination: "Bajpe",
        stops: [
            "State Bank",
            "K.S. Rao Road",
            "PVS",
            "Empire Mall",
            "Ballalbagh",
            "Lalbagh",
            "Saibeen Complex",
            "Bharat Mall",
            "KSRTC Bus Stand",
            "Kapikad",
            "Balebail",
            "Kottara Cross",
            "Kuntikana",
            "Kavoor",
            "Maravoor",
            "Bajpe"
        ]
    },

    {
        id: "city_route_47A",
        routeNumber: "47A",
        operator: "Mangaluru City Bus",
        startPoint: "State Bank",
        destination: "Bajpe",
        stops: [
            "State Bank",
            "K.S. Rao Road",
            "PVS",
            "Empire Mall",
            "Ballalbagh",
            "Lalbagh",
            "Saibeen Complex",
            "Bharat Mall",
            "KSRTC Bus Stand",
            "Kapikad",
            "Balebail",
            "Kottara Cross",
            "Kuntikana",
            "Kavoor",
            "Maravoor",
            "Bajpe"
        ]
    },

    {
        id: "city_route_47B",
        routeNumber: "47B",
        operator: "Mangaluru City Bus",
        startPoint: "State Bank",
        destination: "Bajpe Airport (Mangalore International Airport IXE)",
        stops: [
            "State Bank",
            "K.S. Rao Road",
            "PVS",
            "Empire Mall",
            "Ballalbagh",
            "Lalbagh",
            "Saibeen Complex",
            "Bharat Mall",
            "KSRTC Bus Stand",
            "Kapikad",
            "Balebail",
            "Kottara Cross",
            "Kuntikana",
            "Kavoor",
            "Maravoor",
            "Bajpe",
            "Bajpe Aerodrome"
        ]
    },

    {
        id: "city_route_47C",
        routeNumber: "47C",
        operator: "Mangaluru City Bus",
        startPoint: "State Bank",
        destination: "Kattalsara",
        stops: [
            "State Bank",
            "K.S. Rao Road",
            "PVS",
            "Empire Mall",
            "Ballalbagh",
            "Lalbagh",
            "Saibeen Complex",
            "Bharat Mall",
            "KSRTC Bus Stand",
            "Kapikad",
            "Balebail",
            "Kottara Cross",
            "Kuntikana",
            "Kavoor",
            "Maravoor",
            "Bajpe",
            "Bajpe Aerodrome",
            "Bhatrakere",
            "Kattalsara"
        ]
    },

    {
        id: "city_route_48",
        routeNumber: "48",
        operator: "Mangaluru City Bus",
        startPoint: "State Bank",
        destination: "Bajpe",
        stops: [
            "State Bank",
            "Jyothi",
            "Bunts Hostel",
            "Mallikatta",
            "Kadri",
            "Nanthur Cross",
            "KPT",
            "Yeyyadi",
            "Konchadi",
            "Bondel",
            "Kavoor",
            "Maravoor",
            "Bajpe"
        ]
    },

    {
        id: "city_route_48A",
        routeNumber: "48A",
        operator: "Mangaluru City Bus",
        startPoint: "State Bank",
        destination: "Bajpe",
        stops: [
            "State Bank",
            "Hampankatta",
            "Jyothi",
            "PVS",
            "Empire Mall",
            "Ballalbagh",
            "Lalbagh",
            "Saibeen Complex",
            "Bharat Mall",
            "KSRTC Bus Stand",
            "Bejai",
            "Bejai Church",
            "Yeyyadi",
            "Konchadi",
            "Bondel",
            "Kavoor",
            "Maravoor",
            "Bajpe"
        ]
    },

    {
        id: "city_route_51",
        routeNumber: "51",
        operator: "Mangaluru City Bus",
        startPoint: "State Bank",
        destination: "Konaje",
        stops: [
            "State Bank",
            "Balmatta",
            "Jyothi",
            "Kankanady",
            "Pumpwell",
            "Thokkottu",
            "Deralakatte",
            "Mangalore University",
            "Konaje"
        ]
    },

    {
        id: "city_route_51A",
        routeNumber: "51A",
        operator: "Mangaluru City Bus",
        startPoint: "State Bank",
        destination: "Inoli",
        stops: [
            "State Bank",
            "Balmatta",
            "Jyothi",
            "Kankanady",
            "Pumpwell",
            "Thokkottu",
            "Deralakatte",
            "Mangalore University",
            "Konaje",
            "Inoli"
        ]
    },

    {
        id: "city_route_53",
        routeNumber: "53",
        operator: "Mangaluru City Bus",
        startPoint: "State Bank",
        destination: "Tibar",
        stops: [
            "State Bank",
            "K.S. Rao Road",
            "PVS",
            "Empire Mall",
            "Ballalbagh",
            "Lalbagh",
            "Ladyhill",
            "Chilimbi",
            "Urva Store",
            "Kottara Chowki",
            "Kuloor",
            "Panambur",
            "Surathkal",
            "Kana",
            "Krishnapur",
            "Katipalla",
            "Soorinje",
            "Tibar"
        ]
    },

    {
        id: "city_route_53A",
        routeNumber: "53A",
        operator: "Mangaluru City Bus",
        startPoint: "Kankanady",
        destination: "Tibar",
        stops: [
            "Kankanady",
            "Pumpwell",
            "Nanthur",
            "Kadri",
            "Kuloor",
            "Surathkal",
            "Chokkabettu",
            "Katipalla",
            "Soorinje",
            "Tibar"
        ]
    },

    {
        id: "city_route_54",
        routeNumber: "54",
        operator: "Mangaluru City Bus",
        startPoint: "State Bank",
        destination: "Thaudugoli",
        stops: [
            "State Bank",
            "Balmatta",
            "Jyothi",
            "Kankanady",
            "Pumpwell",
            "Thokkottu",
            "Beeri",
            "Maddur",
            "Natekal",
            "Manjanady",
            "Thaudugoli"
        ]
    },

    {
        id: "city_route_54A",
        routeNumber: "54A",
        operator: "Mangaluru City Bus",
        startPoint: "State Bank",
        destination: "Thaudugoli",
        stops: [
            "State Bank",
            "Balmatta",
            "Jyothi",
            "Kankanady",
            "Pumpwell",
            "Thokkottu",
            "Deralakatte",
            "Natekal",
            "Manjanady",
            "Thaudugoli"
        ]
    },

    {
        id: "city_route_55",
        routeNumber: "55",
        operator: "Mangaluru City Bus",
        startPoint: "State Bank",
        destination: "Pavoor",
        stops: [
            "State Bank",
            "Balmatta",
            "Jyothi",
            "Kankanady",
            "Pumpwell",
            "Thokkottu",
            "Kuthar",
            "Deralakatte",
            "Natekal",
            "Konaje",
            "Fajir",
            "Harekal",
            "Pavoor"
        ]
    },

    {
        id: "city_route_59",
        routeNumber: "59",
        operator: "Mangaluru City Bus",
        startPoint: "State Bank",
        destination: "Surathkal",
        stops: [
            "State Bank",
            "K.S. Rao Road",
            "PVS",
            "Empire Mall",
            "Ballalbagh",
            "Lalbagh",
            "Ladyhill",
            "Kuloor",
            "Baikampady",
            "Chitrapur",
            "Hosabettu",
            "Surathkal"
        ]
    },

    {
        id: "city_route_60",
        routeNumber: "60",
        operator: "Mangaluru City Bus",
        startPoint: "Anandanagar",
        destination: "Gorigudde",
        stops: [
            "Anandanagar",
            "Nandanapura",
            "Malemar",
            "Ladyhill",
            "Bejai Museum",
            "Kadri Temple",
            "Kankanady",
            "Valencia",
            "Gorigudde"
        ]
    },

    {
        id: "city_route_61",
        routeNumber: "61",
        operator: "Mangaluru City Bus",
        startPoint: "Kodikal",
        destination: "Kankanadi",
        stops: [
            "Kodikal",
            "Kodikal Cross",
            "Lady Hill",
            "Bejai Museum",
            "Kadri Temple",
            "Pumpwell",
            "Padil",
            "Kankanadi"
        ]
    },

    {
        id: "city_route_62A",
        routeNumber: "62A",
        operator: "Mangaluru City Bus",
        startPoint: "Padil Railway Station",
        destination: "Kaatipalla",
        stops: [
            "Padil Railway Station",
            "KPT",
            "Bondel",
            "Kavoor",
            "Kulur",
            "Kaikamba",
            "Kaatipalla"
        ]
    },

    {
        id: "city_route_64",
        routeNumber: "64",
        operator: "Mangaluru City Bus",
        startPoint: "Moodushedde",
        destination: "Kuthethoor",
        stops: [
            "Moodushedde",
            "Vamanjuru",
            "Kudpu Temple",
            "Govt. Dairy Bikarnakatte",
            "Nantoor",
            "K.P.T.",
            "Yeyyady",
            "Maryhill",
            "Bondel",
            "Kavoor",
            "Kulur",
            "Panamboor",
            "Chitrapur Temple",
            "Hosabettu",
            "Suratkal",
            "Chokkabettu",
            "Kaatipalla",
            "Mangalapete",
            "Kuthethoor"
        ]
    }
];

async function importRoutes() {
    console.log("🚌 Starting Mangaluru city bus route import...");

    for (const route of routes) {
        const routeRef = db.collection("routes").doc(route.id);

        await routeRef.set(route, { merge: true });

        console.log(
            `✅ Bus ${route.routeNumber}: ${route.startPoint} → ${route.destination}`
        );
    }

    console.log("");
    console.log("🎉 Mangaluru city bus routes imported successfully.");
    console.log(`🚌 Total routes added/updated: ${routes.length}`);
}

importRoutes()
    .then(() => {
        process.exit(0);
    })
    .catch((error) => {
        console.error("❌ Import failed:", error);
        process.exit(1);
    });