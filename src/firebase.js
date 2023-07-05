import { initializeApp } from "firebase/app";
import { ProviderId, getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase/compat/app";

const firebaseConfig = {
  apiKey: "AIzaSyCwqDKO1vsK0INwe1XiFWZhEd4TCJkFXcE",
  authDomain: "discord-2071a.firebaseapp.com",
  projectId: "discord-2071a",
  storageBucket: "discord-2071a.appspot.com",
  messagingSenderId: "726376188138",
  appId: "1:726376188138:web:0f685a4a97a854b933ef93",
  measurementId: "G-LFYW3LZ2MC",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, db };
