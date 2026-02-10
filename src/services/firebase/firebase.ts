import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDY19E_3Uv8GugzxOwb6o9ONMuCyB2jZig",
  authDomain: "hangman-db-fc4a9.firebaseapp.com",
  projectId: "hangman-db-fc4a9",
  storageBucket: "hangman-db-fc4a9.firebasestorage.app",
  messagingSenderId: "377801546733",
  appId: "1:377801546733:web:fe781b9eb4f1dc4f27e5e4",
  measurementId: "G-M3XB4K499C"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
