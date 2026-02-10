// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDY19E_3Uv8GugzxOwb6o9ONMuCyB2jZig",
  authDomain: "hangman-db-fc4a9.firebaseapp.com",
  projectId: "hangman-db-fc4a9",
  storageBucket: "hangman-db-fc4a9.firebasestorage.app",
  messagingSenderId: "377801546733",
  appId: "1:377801546733:web:fe781b9eb4f1dc4f27e5e4",
  measurementId: "G-M3XB4K499C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

export const db = getFirestore(app);