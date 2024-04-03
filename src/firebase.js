// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCJySLuAsl9Kb1Uk-cHa8EaH4pE4ueoaBo",
  authDomain: "package-dekstop.firebaseapp.com",
  databaseURL: "https://package-dekstop-default-rtdb.firebaseio.com",
  projectId: "package-dekstop",
  storageBucket: "package-dekstop.appspot.com",
  messagingSenderId: "313409620631",
  appId: "1:313409620631:web:dc32e6863aefe64c20b7d2",
  measurementId: "G-SFS57HKY7V",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
