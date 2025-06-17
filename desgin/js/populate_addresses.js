import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getFirestore, collection, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

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

async function populateAddresses() {
  try {
    // Nagpur addresses
    const nagpurDocRef = doc(collection(db, "addresses"), "Nagpur");
    await setDoc(nagpurDocRef, { city: "Nagpur" });

    const nagpurAddresses = [
      {
        id: "address1",
        street: "Wardha Road",
        area: "Mahal",
        pincode: "440012",
        coordinates: { lat: 21.146633, lon: 79.088860 }
      },
      {
        id: "address2",
        street: "Central Avenue",
        area: "Gandhibagh",
        pincode: "440018",
        coordinates: { lat: 21.152389, lon: 79.099128 }
      },
      {
        id: "address3",
        street: "Hingna Road",
        area: "Manish Nagar",
        pincode: "440015",
        coordinates: { lat: 21.103456, lon: 79.052789 }
      }
    ];

    for (const address of nagpurAddresses) {
      await setDoc(doc(collection(nagpurDocRef, "individual_addresses"), address.id), {
        street: address.street,
        area: address.area,
        pincode: address.pincode,
        coordinates: address.coordinates
      });
    }

    // Mumbai addresses
    const mumbaiDocRef = doc(collection(db, "addresses"), "Mumbai");
    await setDoc(mumbaiDocRef, { city: "Mumbai" });

    const mumbaiAddresses = [
      {
        id: "address1",
        street: "S V Road",
        area: "Andheri West",
        pincode: "400058",
        coordinates: { lat: 19.119697, lon: 72.845055 }
      },
      {
        id: "address2",
        street: "Link Road",
        area: "Borivali West",
        pincode: "400092",
        coordinates: { lat: 19.229354, lon: 72.847938 }
      },
      {
        id: "address3",
        street: "Marine Drive",
        area: "Churchgate",
        pincode: "400020",
        coordinates: { lat: 18.944012, lon: 72.823456 }
      }
    ];

    for (const address of mumbaiAddresses) {
      await setDoc(doc(collection(mumbaiDocRef, "individual_addresses"), address.id), {
        street: address.street,
        area: address.area,
        pincode: address.pincode,
        coordinates: address.coordinates
      });
    }

    console.log("Addresses successfully added to Firestore!");
  } catch (error) {
    console.error("Error populating addresses: ", error);
  }
}

// Run the function
populateAddresses();