import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


  const firebaseConfig = {
  apiKey: "AIzaSyAkb-21jiuKZG65TDmZNPwBvOQBLwd-djU",
  authDomain: "smart-bus-detector.firebaseapp.com",
  projectId: "smart-bus-detector",
  storageBucket: "smart-bus-detector.firebasestorage.app",
  messagingSenderId: "600277682260",
  appId: "1:600277682260:web:423da6fe66bb8dc3e285c1",
  measurementId: "G-M87N89FKK3"
};


const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);