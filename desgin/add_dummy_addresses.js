import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getFirestore, collection, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyC_KB-fCEA8QQqmDUj2y88Adfr8kx-SgPg",
  authDomain: "login-page-66094.firebaseapp.com",
  projectId: "login-page-66094",
  storageBucket: "login-page-66094.appspot.com",
  messagingSenderId: "173329262844",
  appId: "1:173329262844:web:c25c32cd33a5c1de9f8f79",
  measurementId: "G-973G312R99"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function addDummyAddresses() {
  try {
    // Pune addresses
    const puneDocRef = doc(collection(db, "addresses"), "Pune");
    await setDoc(puneDocRef, { city: "Pune" });

    const puneAddresses = [
      {
        id: "address1",
        street: "Baner Road",
        area: "Baner",
        pincode: "411045",
        coordinates: { lat: 18.559050, lon: 73.786750 }
      },
      {
        id: "address2",
        street: "Koregaon Park",
        area: "Koregaon Park",
        pincode: "411001",
        coordinates: { lat: 18.536210, lon: 73.893950 }
      },
      {
        id: "address3",
        street: "Hinjewadi Phase 1",
        area: "Hinjewadi",
        pincode: "411057",
        coordinates: { lat: 18.592320, lon: 73.738460 }
      }
    ];

    for (const address of puneAddresses) {
      await setDoc(doc(collection(puneDocRef, "individual_addresses"), address.id), {
        street: address.street,
        area: address.area,
        pincode: address.pincode,
        coordinates: address.coordinates
      });
      console.log(`Added Pune address: ${address.area}`);
    }

    // Delhi addresses
    const delhiDocRef = doc(collection(db, "addresses"), "Delhi");
    await setDoc(delhiDocRef, { city: "Delhi" });

    const delhiAddresses = [
      {
        id: "address1",
        street: "Connaught Place",
        area: "Connaught Place",
        pincode: "110001",
        coordinates: { lat: 28.630420, lon: 77.217900 }
      },
      {
        id: "address2",
        street: "Saket Road",
        area: "Saket",
        pincode: "110017",
        coordinates: { lat: 28.527280, lon: 77.216720 }
      },
      {
        id: "address3",
        street: "Vasant Vihar",
        area: "Vasant Vihar",
        pincode: "110057",
        coordinates: { lat: 28.557040, lon: 77.163720 }
      },
      {
        id: "address4",
        street: "Rohini Sector 7",
        area: "Rohini",
        pincode: "110085",
        coordinates: { lat: 28.704060, lon: 77.102490 }
      }
    ];

    for (const address of delhiAddresses) {
      await setDoc(doc(collection(delhiDocRef, "individual_addresses"), address.id), {
        street: address.street,
        area: address.area,
        pincode: address.pincode,
        coordinates: address.coordinates
      });
      console.log(`Added Delhi address: ${address.area}`);
    }

    console.log("All dummy addresses successfully added to Firestore!");
  } catch (error) {
    console.error("Error adding dummy addresses: ", error);
  }
}

// Run the function
addDummyAddresses();